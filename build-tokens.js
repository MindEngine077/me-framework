// File: build-tokens.js
// Purpose: Convert Token Studio legacy JSON (in src/styles/import) → single CSS file: src/styles/tokens.css
// English code, mobile-first mindset. Keeps values as-is; no hardcoded hex/px introduced.

import { promises as fs } from "fs";
import path from "path";

const IMPORT_DIR = path.join("src", "styles", "import");
const OUTPUT_FILE = path.join("src", "styles", "tokens.css");

// Helpers
const isObject = (v) => v && typeof v === "object" && !Array.isArray(v);

/**
 * Token Studio legacy JSON shapes vary:
 * - Flat: { "color/brand/primary": { "value": "#fff" }, ... }
 * - Nested "tokens": { tokens: { color: { brand: { primary: { value:"#fff" }}}}}
 * - Files like $metadata.json, $themes.json (should be ignored)
 *
 * We collect any object that has a leaf with { value: <...> } and turn it into --kebab-name: value;
 */
async function readAllJsonFiles(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  let jsonPaths = [];
  for (const f of files) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      jsonPaths = jsonPaths.concat(await readAllJsonFiles(p));
    } else if (f.isFile() && f.name.endsWith(".json") && !f.name.startsWith("$")) {
      jsonPaths.push(p);
    }
  }
  return jsonPaths;
}

function toKebab(str) {
  return String(str)
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function joinName(parts) {
  return toKebab(parts.filter(Boolean).join("-"));
}

function collectTokens(obj, prefix = [], out = {}) {
  if (!isObject(obj)) return out;
  // Case: leaf token: { value: ... }
  if (Object.prototype.hasOwnProperty.call(obj, "value")) {
    const name = joinName(prefix);
    out[name] = obj.value;
    return out;
  }
  // Case: nested "tokens" wrapper
  if (isObject(obj.tokens)) {
    collectTokens(obj.tokens, prefix, out);
  }
  // Generic deep walk
  for (const [k, v] of Object.entries(obj)) {
    if (!isObject(v)) continue;
    if (k === "extensions" || k === "$metadata" || k === "$themes") continue;
    collectTokens(v, prefix.concat(k), out);
  }
  return out;
}

async function build() {
  // Ensure output dir exists
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });

  // Read JSON files
  let vars = {};
  const jsonFiles = await readAllJsonFiles(IMPORT_DIR);

  for (const file of jsonFiles) {
    try {
      const raw = await fs.readFile(file, "utf8");
      const data = JSON.parse(raw);
      const collected = collectTokens(data);
      // Merge; later files can override earlier ones
      vars = { ...vars, ...collected };
    } catch (e) {
      console.warn(`Skipping ${file}: ${e.message}`);
    }
  }

  // Emit CSS
  const lines = [":root {"];
  for (const [name, value] of Object.entries(vars)) {
    // If value is an object or empty, skip
    if (value == null || (typeof value === "object")) continue;
    lines.push(`  --${name}: ${value};`);
  }
  lines.push("}", "");

  await fs.writeFile(OUTPUT_FILE, lines.join("\n"), "utf8");

  console.log(`✅ Wrote ${OUTPUT_FILE} with ${Object.keys(vars).length} variables.`);
  console.log("Tip: point your app CSS to use var(--your-token-name) everywhere.");
}

build().catch((e) => {
  console.error("❌ Token build failed:", e);
  process.exit(1);
});
