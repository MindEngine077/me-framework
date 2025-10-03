// File: fetch-figma-components.js
// Fetch Figma components and scaffold src/ui/me-<component>/*
// Reads token from FIGMA_TOKEN or FIGMA_API_TOKEN. Uses Authorization: Bearer.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FIGMA_TOKEN = process.env.FIGMA_TOKEN || process.env.FIGMA_API_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY || "UZN8LLFNOmFN47oDJJpDaS";

if (!FIGMA_TOKEN) {
  console.error("❌ Missing FIGMA_TOKEN (or FIGMA_API_TOKEN) in .env");
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
    .map((s) => s[0]?.toUpperCase() + s.slice(1))
    .join("");
}

async function fetchComponents(fileKey) {
  const url = `https://api.figma.com/v1/files/${fileKey}/components`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${FIGMA_TOKEN}`,
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
  const groups = new Map();
  for (const c of components) {
    const parts = (c.name || "").split("/").map(toKebab).filter(Boolean);
    if (!parts.length) continue;
    const base = parts[0];
    const variants = parts.slice(1);
    if (!groups.has(base)) groups.set(base, { base, variants: [] });
    groups.get(base).variants.push(variants.join("--"));
  }
  for (const [k, v] of groups) v.variants = unique(v.variants).filter(Boolean);
  return groups;
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}
function writeFileOnce(filePath, content) {
  if (fs.existsSync(filePath)) return;
  fs.writeFileSync(filePath, content, "utf8");
}

function scaffoldComponent(base) {
  const kebab = `me-${base}`;
  const dir = path.join(__dirname, "src", "ui", kebab);
  ensureDir(dir);
  const pascal = pascalCase(kebab);

  const html = `<!-- File: src/ui/${kebab}/${kebab}.html -->
<!-- Auto-generated scaffold from Figma components. Edit freely. -->
<button class="${kebab}" type="button" aria-label="${pascal}">
  <span class="${kebab}-label">${pascal}</span>
</button>
`;
  const css = `/* File: src/ui/${kebab}/${kebab}.css */
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
/* Add variants, e.g. .${kebab}--secondary, .${kebab}--ghost */
`;
  const js = `/**
 * File: src/ui/${kebab}/${kebab}.js
 * Minimal behavior scaffold.
 */
export function init${pascal}(root = document) {
  const nodes = root.querySelectorAll('.${kebab}[data-toggle="true"]');
  nodes.forEach((el) => {
    el.addEventListener('click', () => {
      const pressed = el.getAttribute('aria-pressed') === 'true';
      el.setAttribute('aria-pressed', String(!pressed));
    });
  });
}
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
  console.log("��� Fetching Figma components…");
  const comps = await fetchComponents(FILE_KEY);
  if (!comps.length) {
    console.log("⚠️ No components found. Check FILE_KEY permissions or visibility.");
    return;
  }
  console.log(`✅ Found ${comps.length} components`);

  const groups = groupByBaseName(comps);
  console.log(`��� Base component groups: ${groups.size}`);

  const created = [];
  for (const [base, info] of groups) {
    const dir = scaffoldComponent(base);
    created.push({ base, dir, variants: info.variants });
  }

  console.log("\n��� Scaffolded components:");
  for (const c of created) {
    console.log(` - me-${c.base} → ${c.dir}`);
    if (c.variants.length) console.log(`   variants: ${c.variants.join(", ")}`);
  }
}
main().catch((e) => {
  console.error("❌ Failed:", e);
  process.exit(1);
});
