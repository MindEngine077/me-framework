// File: build-tokens.js
// Converts Token Studio legacy JSON (in src/styles/import) -> src/styles/tokens.css
// - Resolves {aliases.like.this} -> var(--aliases-like-this)
// - Adds px to numeric widths/breakpoints/grid-columns
// - Maps lineheights-* = AUTO -> normal
// - Duplicates any "gird-*" token as "grid-*"
// English code, mobile-first.

import { promises as fs } from "fs";
import path from "path";

const IMPORT_DIR = path.join("src", "styles", "import");
const OUTPUT_FILE = path.join("src", "styles", "tokens.css");

const isObject = (v) => v && typeof v === "object" && !Array.isArray(v);

function toKebab(str) {
  return String(str)
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
function joinName(parts) {
  return toKebab(parts.filter(Boolean).join("-")).replace(/\.-/g, "-");
}

// Recursively collect tokens with { value: ... }
function collectTokens(obj, prefix = [], out = {}) {
  if (!isObject(obj)) return out;
  if (Object.prototype.hasOwnProperty.call(obj, "value")) {
    const name = joinName(prefix);
    out[name] = obj.value;
    return out;
  }
  // Token Studio often nests under "tokens"
  if (isObject(obj.tokens)) collectTokens(obj.tokens, prefix, out);

  for (const [k, v] of Object.entries(obj)) {
    if (!isObject(v)) continue;
    if (k === "extensions" || k === "$metadata" || k === "$themes") continue;
    collectTokens(v, prefix.concat(k), out);
  }
  return out;
}

async function readAllJsonFiles(dir) {
  let results = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) {
        results = results.concat(await readAllJsonFiles(p));
      } else if (e.isFile() && e.name.endsWith(".json") && !e.name.startsWith("$")) {
        results.push(p);
      }
    }
  } catch {
    // directory may not exist yet
  }
  return results;
}

const NUMERIC_RE = /^-?\d+(\.\d+)?$/i;
function normalizeValue(name, value) {
  // Map AUTO line-heights to normal
  if (/^lineheights-/.test(name) && String(value).toUpperCase() === "AUTO") return "normal";

  // Alias like "{text.300}" -> var(--text-300)
  const aliasMatch = typeof value === "string" && value.trim().match(/^\{([^}]+)\}$/);
  if (aliasMatch) {
    const aliasPath = aliasMatch[1].replace(/\./g, "-");
    return `var(--${toKebab(aliasPath)})`;
  }

  // Add px for certain numeric tokens
  const shouldPx =
    /^width-/.test(name) ||
    /^breakpoint/.test(name) ||
    /^breakpoints-/.test(name) ||
    /^grid-columns-/.test(name) ||
    /^gird-columns-/.test(name);
  if (shouldPx && (typeof value === "number" || (typeof value === "string" && NUMERIC_RE.test(value)))) {
    return `${value}px`;
  }

  return value;
}

async function build() {
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });

  // Collect tokens from all JSON files
  let tokens = {};
  const files = await readAllJsonFiles(IMPORT_DIR);
  for (const file of files) {
    try {
      const raw = await fs.readFile(file, "utf8");
      const data = JSON.parse(raw);
      const collected = collectTokens(data);
      tokens = { ...tokens, ...collected };
    } catch (e) {
      console.warn(`Skipping ${file}: ${e.message}`);
    }
  }

  // Normalize/resolve values
  const resolved = {};
  for (const [rawName, rawValue] of Object.entries(tokens)) {
    const name = toKebab(rawName.replace(/\//g, "-").replace(/\./g, "-"));
    const value = normalizeValue(name, rawValue);
    resolved[name] = value;

    // Duplicate gird-* to grid-*
    if (name.includes("gird-")) {
      const fixedName = name.replace(/gird-/g, "grid-");
      resolved[fixedName] = value;
    }
  }

  // Emit CSS
  const lines = [":root {"];
  for (const [name, value] of Object.entries(resolved)) {
    if (value == null || typeof value === "object") continue;
    lines.push(`  --${name}: ${value};`);
  }
  lines.push("}", "");

  await fs.writeFile(OUTPUT_FILE, lines.join("\n"), "utf8");

  const aliasCount = Object.values(tokens).filter(
    (v) => typeof v === "string" && /^\{[^}]+\}$/.test(v.trim())
  ).length;
  console.log(`✅ Wrote ${OUTPUT_FILE}`);
  console.log(`   Variables: ${Object.keys(resolved).length}`);
  console.log(`   Aliases resolved to var(--…): ${aliasCount}`);
}

build().catch((e) => {
  console.error("❌ Token build failed:", e);
  process.exit(1);
});
