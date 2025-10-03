#!/usr/bin/env node
import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const COMPONENTS_FILE_KEY = process.env.FIGMA_FILE_KEY;
const VARIABLES_FILE_KEY = process.env.FIGMA_VARIABLES_FILE_KEY;

// Kleuren voor console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Haal Figma file data op
 */
async function fetchFigmaFile(fileKey, fileName) {
  try {
    log(`\n📥 Fetching ${fileName}...`, "blue");

    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    log(`✓ ${fileName} opgehaald (${data.name})`, "green");
    return data;
  } catch (error) {
    log(`✗ Fout bij ophalen ${fileName}: ${error.message}`, "red");
    return null;
  }
}

/**
 * Haal Figma variables op (voor design tokens)
 */
async function fetchFigmaVariables(fileKey) {
  try {
    log(`\n📥 Fetching Variables...`, "blue");

    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables/local`, {
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    log(`✓ Variables opgehaald (${Object.keys(data.meta?.variableCollections || {}).length} collections)`, "green");
    return data;
  } catch (error) {
    log(`✗ Fout bij ophalen variables: ${error.message}`, "red");
    return null;
  }
}

/**
 * Haal component metadata op
 */
async function fetchComponents(fileKey) {
  try {
    log(`\n📥 Fetching Components...`, "blue");

    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/components`, {
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const components = data.meta?.components || [];
    log(`✓ ${components.length} components gevonden`, "green");
    return components;
  } catch (error) {
    log(`✗ Fout bij ophalen components: ${error.message}`, "red");
    return [];
  }
}

/**
 * Sla data op als JSON backup
 */
async function saveBackup(data, filename) {
  try {
    const backupDir = path.join(process.cwd(), "figma-backup");
    await fs.mkdir(backupDir, { recursive: true });

    const filepath = path.join(backupDir, filename);
    await fs.writeFile(filepath, JSON.stringify(data, null, 2), "utf-8");

    log(`  💾 Backup opgeslagen: ${filename}`, "cyan");
  } catch (error) {
    log(`  ✗ Kon backup niet opslaan: ${error.message}`, "red");
  }
}

/**
 * Main sync functie
 */
async function syncFigma() {
  log("\n🚀 ME Framework - Figma Sync", "cyan");
  log("================================\n");

  // Check credentials
  if (!FIGMA_TOKEN) {
    log("✗ FIGMA_TOKEN niet gevonden in .env", "red");
    process.exit(1);
  }

  if (!COMPONENTS_FILE_KEY) {
    log("✗ FIGMA_FILE_KEY niet gevonden in .env", "red");
    process.exit(1);
  }

  if (!VARIABLES_FILE_KEY) {
    log("⚠ FIGMA_VARIABLES_FILE_KEY niet gevonden in .env", "yellow");
  }

  // Sync Variables file (design tokens)
  if (VARIABLES_FILE_KEY) {
    log("\n📦 1. Syncing ME | Variables...", "blue");

    const variablesFile = await fetchFigmaFile(VARIABLES_FILE_KEY, "ME | Variables");
    if (variablesFile) {
      await saveBackup(variablesFile, "variables-file.json");
    }

    const variables = await fetchFigmaVariables(VARIABLES_FILE_KEY);
    if (variables) {
      await saveBackup(variables, "variables-local.json");
    }
  }

  // Sync Components file
  log("\n📦 2. Syncing ME | Components...", "blue");

  const componentsFile = await fetchFigmaFile(COMPONENTS_FILE_KEY, "ME | Components");
  if (componentsFile) {
    await saveBackup(componentsFile, "components-file.json");
  }

  const components = await fetchComponents(COMPONENTS_FILE_KEY);
  if (components.length > 0) {
    await saveBackup({ meta: { components } }, "components-list.json");

    // Toon overzicht
    log("\n📋 Component Overzicht:", "cyan");
    const grouped = {};
    components.forEach((comp) => {
      const baseName = comp.name.split("/")[0];
      grouped[baseName] = (grouped[baseName] || 0) + 1;
    });

    Object.entries(grouped)
      .sort((a, b) => b[1] - a[1])
      .forEach(([name, count]) => {
        log(`  • ${name}: ${count} variant(s)`, "reset");
      });
  }

  // Samenvatting
  log("\n✅ Sync voltooid!", "green");
  log("\n📁 Backups opgeslagen in: ./figma-backup/", "cyan");
  log("\nVolgende stappen:", "yellow");
  log("  1. Controleer de backups in ./figma-backup/");
  log('  2. Run "npm run tokens:build" om tokens te updaten');
  log('  3. Run "npm run figma:scaffold" om nieuwe components te scaffolden\n');
}

// Run
syncFigma().catch((error) => {
  log(`\n✗ Sync gefaald: ${error.message}`, "red");
  process.exit(1);
});
