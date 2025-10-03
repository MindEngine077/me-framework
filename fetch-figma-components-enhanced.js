#!/usr/bin/env node
// Enhanced Figma component fetcher with:
// - State variant support (hover, active, etc.)
// - SVG icon download
// - Smart filtering

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

// CONFIGURATION
const CONFIG = {
  downloadIcons: true, // Download SVG files for icons
  includeVariants: true, // Generate CSS for variants
  maxIconsToShow: 10, // Max icons to show in console
  iconOutputDir: "src/ui/icons", // Where to save icons
};

if (!FIGMA_TOKEN) {
  console.error("❌ Missing FIGMA_TOKEN in .env");
  process.exit(1);
}

// Utility functions
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

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeFileOnce(filePath, content) {
  if (fs.existsSync(filePath)) return false;
  fs.writeFileSync(filePath, content, "utf8");
  return true;
}

function writeFileAlways(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

// Figma API functions
async function fetchComponents(fileKey) {
  const url = `https://api.figma.com/v1/files/${fileKey}/components`;
  const res = await fetch(url, {
    headers: { "X-Figma-Token": FIGMA_TOKEN },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Figma API error ${res.status}: ${text}`);
  }

  const json = await res.json();
  return json?.meta?.components ?? [];
}

async function fetchComponentSVG(fileKey, nodeId, componentName) {
  try {
    const url = `https://api.figma.com/v1/images/${fileKey}?ids=${encodeURIComponent(nodeId)}&format=svg`;
    const res = await fetch(url, {
      headers: { "X-Figma-Token": FIGMA_TOKEN },
    });

    if (!res.ok) {
      throw new Error(`SVG fetch error ${res.status}`);
    }

    const json = await res.json();
    const svgUrl = json?.images?.[nodeId];

    if (!svgUrl) {
      return null;
    }

    // Download the actual SVG
    const svgRes = await fetch(svgUrl);
    if (!svgRes.ok) {
      throw new Error(`SVG download error ${svgRes.status}`);
    }

    return await svgRes.text();
  } catch (error) {
    console.log(`   ⚠️  SVG failed for ${componentName}: ${error.message}`);
    return null;
  }
}

// Component grouping
function groupByBaseName(components) {
  const groups = new Map();

  for (const c of components) {
    const parts = (c.name || "").split("/").map(toKebab).filter(Boolean);
    if (!parts.length) continue;

    const base = parts[0];
    const variantParts = parts.slice(1);

    if (!groups.has(base)) {
      groups.set(base, {
        base,
        variants: [],
        components: [],
      });
    }

    const group = groups.get(base);
    group.components.push(c);

    if (variantParts.length > 0) {
      group.variants.push(variantParts.join("--"));
    }
  }

  // Make variants unique
  for (const [, v] of groups) {
    v.variants = unique(v.variants).filter(Boolean);
  }

  return groups;
}

// Scaffolding functions
function scaffoldComponent(base, variants = []) {
  const kebab = `me-${base}`;
  const dir = path.join(__dirname, "src", "ui", kebab);
  ensureDir(dir);
  const pascal = pascalCase(kebab);

  // Generate variant CSS
  let variantCSS = "";
  if (CONFIG.includeVariants && variants.length > 0) {
    variantCSS = "\n/* 🎨 Component Variants (from Figma) */\n";

    // Group variants by type (state, size, type, etc.)
    const stateVariants = variants.filter((v) => v.includes("state-") || v.match(/hover|active|disabled|focus/i));
    const sizeVariants = variants.filter((v) => v.includes("size-") || v.match(/\b(xs|sm|md|lg|xl)\b/));
    const typeVariants = variants.filter((v) => v.includes("type-") || v.match(/primary|secondary|ghost|danger/i));
    const otherVariants = variants.filter((v) => !stateVariants.includes(v) && !sizeVariants.includes(v) && !typeVariants.includes(v));

    if (stateVariants.length > 0) {
      variantCSS += "\n/* State variants */\n";
      stateVariants.slice(0, 5).forEach((v) => {
        variantCSS += `.${kebab}-${v} {\n  /* TODO: Add ${v} styles from Figma */\n}\n\n`;
      });
    }

    if (sizeVariants.length > 0) {
      variantCSS += "\n/* Size variants */\n";
      sizeVariants.slice(0, 5).forEach((v) => {
        variantCSS += `.${kebab}-${v} {\n  /* TODO: Add ${v} styles from Figma */\n}\n\n`;
      });
    }

    if (typeVariants.length > 0) {
      variantCSS += "\n/* Type variants */\n";
      typeVariants.slice(0, 5).forEach((v) => {
        variantCSS += `.${kebab}-${v} {\n  /* TODO: Add ${v} styles from Figma */\n}\n\n`;
      });
    }

    if (otherVariants.length > 0 && otherVariants.length <= 5) {
      variantCSS += "\n/* Other variants */\n";
      otherVariants.forEach((v) => {
        variantCSS += `.${kebab}-${v} {\n  /* TODO: Add ${v} styles from Figma */\n}\n\n`;
      });
    }
  }

  const html = `<!-- File: src/ui/${kebab}/${kebab}.html -->
<!-- Component: ${pascal} -->
<!-- Generated from Figma: ME | Components -->

<div class="${kebab}">
  <span class="${kebab}-label">${pascal}</span>
</div>

<!-- Usage Examples -->
${
  variants.length > 0
    ? `<!-- 
<div class="${kebab} ${kebab}-${variants[0] || "primary"}">Variant</div>
-->`
    : ""
}
`;

  const css = `/* File: src/ui/${kebab}/${kebab}.css
   Component: ${kebab}
   Variants: ${variants.length} detected
*/

/* Import design tokens */
@import "../../styles/tokens.css";
@import "../../styles/base.css";

/* Base component styles */
.${kebab} {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  /* Sizing */
  height: var(--component-height-md, 44px);
  min-width: var(--component-min-width, 44px);
  padding-inline: var(--space-md, 16px);
  
  /* Colors */
  background: var(--accent-primary, #5c6ef8);
  color: var(--text-100, #ffffff);
  border: 1px solid var(--border-base, rgba(255, 255, 255, 0.12));
  
  /* Border radius */
  border-radius: var(--radius-md, 12px);
  
  /* Typography */
  font-size: var(--font-size-body-md, 1rem);
  letter-spacing: var(--letter-spacing-xxs, 0.01em);
  line-height: 1;
  
  /* Interactions */
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: all 120ms ease;
}

/* Hover state */
.${kebab}:hover {
  filter: brightness(1.06);
}

/* Active state */
.${kebab}:active {
  transform: translateY(1px) scale(0.99);
}

/* Focus styles */
.${kebab}:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
${variantCSS}
/* Internal elements */
.${kebab}-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm, 8px);
}
`;

  const js = `/**
 * File: src/ui/${kebab}/${kebab}.js
 * Component: ${pascal}
 */
export function init${pascal}(root = document) {
  const nodes = root.querySelectorAll('.${kebab}');
  
  nodes.forEach((el) => {
    // Add your component logic here
    console.log('${pascal} initialized:', el);
  });
}

if (typeof window !== 'undefined') {
  window.requestAnimationFrame(() => init${pascal}());
}
`;

  const htmlCreated = writeFileOnce(path.join(dir, `${kebab}.html`), html);
  const cssCreated = writeFileOnce(path.join(dir, `${kebab}.css`), css);
  const jsCreated = writeFileOnce(path.join(dir, `${kebab}.js`), js);

  return {
    dir,
    created: htmlCreated || cssCreated || jsCreated,
  };
}

async function scaffoldIcon(base, nodeId, fileKey) {
  const kebab = toKebab(base);
  const dir = path.join(__dirname, CONFIG.iconOutputDir);
  ensureDir(dir);

  const svg = await fetchComponentSVG(fileKey, nodeId, base);

  if (svg) {
    const fileName = `${kebab}.svg`;
    const svgPath = path.join(dir, fileName);
    writeFileAlways(svgPath, svg);
    return { name: base, path: svgPath, fileName };
  }

  return null;
}

// Main execution
async function main() {
  console.log("🔄 Fetching Figma components…");
  const comps = await fetchComponents(FILE_KEY);

  if (!comps.length) {
    console.log("⚠️  No components found.");
    return;
  }

  console.log(`✅ Found ${comps.length} components\n`);

  const groups = groupByBaseName(comps);
  console.log(`📦 Base component groups: ${groups.size}\n`);

  // Filtering rules
  const ICON_PATTERNS = [/^name-fa7-/i, /^house-solid/i];

  const SKIP_PATTERNS = [
    /^flags-/i, // Too many flags
  ];

  const INCLUDE_ONLY = ["button", "input", "input-feedback", "header", "footer", "footnav", "topnav", "bottom", "top", "safe-top", "safe-bottom", "cg", "modal", "avatar", "divider", "checkbox", "form-field"];

  const created = [];
  const icons = [];
  let skipped = 0;

  // Process components
  for (const [base, info] of groups) {
    // Skip completely
    if (SKIP_PATTERNS.some((p) => p.test(base))) {
      skipped++;
      continue;
    }

    // Download icons
    if (CONFIG.downloadIcons && ICON_PATTERNS.some((p) => p.test(base))) {
      const firstComp = info.components[0];
      if (firstComp?.node_id) {
        const icon = await scaffoldIcon(base, firstComp.node_id, FILE_KEY);
        if (icon) {
          icons.push(icon);
        }
      }
      continue;
    }

    // Scaffold UI components
    if (INCLUDE_ONLY.includes(base)) {
      const result = scaffoldComponent(base, info.variants);
      created.push({
        base,
        dir: result.dir,
        variants: info.variants,
        wasCreated: result.created,
      });
    } else {
      skipped++;
    }
  }

  // Report results
  console.log(`⏭️  Skipped ${skipped} components\n`);

  if (icons.length > 0) {
    console.log(`🎨 Downloaded ${icons.length} SVG icons:`);
    icons.slice(0, CONFIG.maxIconsToShow).forEach((icon) => {
      console.log(`   ✓ ${icon.fileName}`);
    });
    if (icons.length > CONFIG.maxIconsToShow) {
      console.log(`   ... and ${icons.length - CONFIG.maxIconsToShow} more\n`);
    }
    console.log(`   📁 Saved to: ${CONFIG.iconOutputDir}\n`);
  }

  console.log("📁 Scaffolded components:");
  for (const c of created) {
    const status = c.wasCreated ? "✨ created" : "✓ exists";
    console.log(`   ${status}: me-${c.base}`);

    if (c.variants.length > 0 && c.variants.length <= 8) {
      console.log(`      variants: ${c.variants.join(", ")}`);
    } else if (c.variants.length > 8) {
      console.log(`      variants: ${c.variants.length} total (${c.variants.slice(0, 3).join(", ")}...)`);
    }
  }

  console.log("\n✅ Done!\n");
}

main().catch((e) => {
  console.error("❌ Failed:", e);
  process.exit(1);
});
