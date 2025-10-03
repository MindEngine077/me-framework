// File: fetch-figma-components.js
// Purpose: Fetch component names from a Figma file and scaffold UI component folders
// Output: creates src/ui/me-<component>/{me-<component>.html, me-<component>.css, me-<component>.js}
// Conventions: kebab-case + "me-" prefix; code & comments in English.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY || "UZN8LLFNOmFN47oDJJpDaS"; // default from your link

if (!FIGMA_TOKEN) {
  console.error("‚ùå Missing FIGMA_TOKEN in .env");
  process.exit(1);
}

function toKebab(str) {
  return String(str)
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}
function unique(arr) {
  return Array.from(new Set(arr));
}
function pascalCase(str) {
  return toKebab(str)
    .split("-")
    .filter(Boolean)
    .map(s => s[0]?.toUpperCase() + s.slice(1))
    .join("");
}

async function fetchComponents(fileKey) {
  const url = `https://api.figma.com/v1/files/${fileKey}/components`;
  const res = await fetch(url, {
    headers: {
      "X-Figma-Token": FIGMA_TOKEN,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API error ${res.status}: ${text}`);
  }
  const json = await res.json();
  return json?.meta?.components ?? [];
}

function groupByBaseName(components) {
  // Figma names like: "Button/Primary/Large"
  // base = "button", variants = ["primary", "large"]
  const groups = new Map();
  for (const c of components) {
    const parts = (c.name || "").split("/").map(toKebab).filter(Boolean);
    if (!parts.length) continue;
    const base = parts[0]; // e.g., "button"
    const variants = parts.slice(1); // ["primary","large"]

    if (!groups.has(base)) {
      groups.set(base, { base, variants: [] });
    }
    groups.get(base).variants.push(variants.join("--")); // "primary--large" as a hint
  }
  for (const [k, v] of groups) {
    v.variants = unique(v.variants).filter(Boolean);
  }
  return groups;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFileOnce(filePath, content) {
  if (fs.existsSync(filePath)) return; // don't overwrite
  fs.writeFileSync(filePath, content, "utf8");
}

function scaffoldComponent(base) {
  const dir = path.join(__dirname, "src", "ui", `me-${base}`);
  ensureDir(dir);

  const kebab = `me-${base}`;
  const pascal = pascalCase(`me-${base}`);

  // HTML
  const html = `<!-- File: src/ui/${kebab}/${kebab}.html -->
<!-- Auto-generated scaffold from Figma components. Edit freely. -->
<button class="${kebab}" type="button" aria-label="${pascal}">
  <span class="${kebab}-label">${pascal}</span>
</button>
`;
  // CSS
  const css = `/* File: src/ui/${kebab}/${kebab}.css
   Token-only styling, mobile-first.
   Add your variants as: .${kebab}--<variant>
*/
.${kebab} {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: var(--component-height-md, 44px);
  min-width: var(--component-min-width, 44px);
  padding-inline: var(--space-md, 16px);

  background: var(--accent-primary, #5c6ef8);
  color: var(--text-100, #ffffff);
  border: 1px solid var(--border-base, rgba(255,255,255,0.12));
  border-radius: var(--radius-md, 12px);

  font-size: var(--font-size-body-md, 1rem);
  letter-spacing: var(--letter-spacing-xxs, 0.01em);
  line-height: 1;

  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 120ms ease, filter 120ms ease, box-shadow 120ms ease;
}

.${kebab}:hover { filter: brightness(1.06); }
.${kebab}:active { transform: translateY(1px) scale(0.99); }
.${kebab}:focus { outline: none; }
.${kebab}:focus-visible { box-shadow: 0 0 0 3px color-mix(in oklab, var(--accent-primary, #5c6ef8) 40%, transparent); }

.${kebab}-label { display: inline-flex; align-items: center; gap: var(--space-sm, 8px); }

/* Add variant classes below, for example:
.${kebab}--primary {}
.${kebab}--secondary {}
.${kebab}--ghost {}
*/
`;
  // JS
  const js = `/**
 * File: src/ui/${kebab}/${kebab}.js
 * Minimal behavior scaffold for ${kebab}.
 */
export function init${pascal}(root = document) {
  // Example: toggle behavior if needed
  const nodes = root.querySelectorAll('.${kebab}[data-toggle="true"]');
  nodes.forEach((el) => {
    el.addEventListener('click', () => {
      const pressed = el.getAttribute('aria-pressed') === 'true';
      el.setAttribute('aria-pressed', String(!pressed));
    });
  });
}

// Auto-init if directly included
if (typeof window !== 'undefined') {
  window.requestAnimationFrame(() => init${pascal}());
}
`;

  writeFileOnce(path.join(dir, `${kebab}.html`), html);
  writeFileOnce(path.join(dir, `${kebab}.css`), css);
  writeFileOnce(path.join(dir, `${kebab}.js`), js);

  return dir;
}

async function main() {
  console.log("Ì¥ó Fetching Figma components‚Ä¶");
  const comps = await fetchComponents(FILE_KEY);
  if (!comps.length) {
    console.log("‚ö†Ô∏è No components found. Check your file key or permissions.");
    return;
  }
  console.log(`‚úÖ Found ${comps.length} components`);

  const groups = groupByBaseName(comps);
  console.log(`Ì∑≠ Base component groups: ${groups.size}`);

  const created = [];
  for (const [base, info] of groups) {
    const dir = scaffoldComponent(base);
    created.push({ base, dir, variants: info.variants });
  }

  // Log a tiny report
  console.log("\nÌ≥¶ Scaffolded components:");
  for (const c of created) {
    console.log(` - me-${c.base} ‚Üí ${c.dir}`);
    if (c.variants.length) {
      console.log(`   variants: ${c.variants.join(", ")}`);
    }
  }

  console.log("\n‚ú® Next:");
  console.log(" - Open each component CSS and add token-driven variants matching your Figma sets.");
  console.log(" - Import the CSS into index.html or your page to preview.");
}

main().catch((e) => {
  console.error("‚ùå Failed:", e);
  process.exit(1);
});
