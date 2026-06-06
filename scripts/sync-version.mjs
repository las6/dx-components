import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const componentsDir = resolve(root, "components");
const pkgPath = resolve(root, "package.json");

const checkMode = process.argv.includes("--check");

const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
const version = pkg.version;

if (!version) {
  console.error("No version found in package.json");
  process.exit(1);
}

const files = readdirSync(componentsDir).filter((f) => f.endsWith(".tsx"));

if (files.length === 0) {
  console.log("No component files found.");
  process.exit(0);
}

let mismatches = 0;
let updates = 0;

for (const file of files) {
  const filePath = resolve(componentsDir, file);
  let content = readFileSync(filePath, "utf-8");
  const original = content;

  content = content.replace(
    /^(\/\/\s*@source\s+dx-components\/\S+\s+)v[\d.]+(\s*)$/m,
    `$1v${version}$2`,
  );

  content = content.replace(
    /(\bdata-dx-version\s*=\s*")[\d.]+(")/g,
    `$1${version}$2`,
  );

  if (content !== original) {
    if (checkMode) {
      mismatches++;
      console.error(`MISMATCH: ${file} (expected v${version})`);
    } else {
      writeFileSync(filePath, content, "utf-8");
      updates++;
      console.log(`UPDATED: ${file} → v${version}`);
    }
  } else {
    console.log(`OK: ${file} (v${version})`);
  }
}

if (checkMode) {
  if (mismatches > 0) {
    console.error(
      `\n${mismatches} file(s) have version mismatches. Run 'node scripts/sync-version.mjs' to fix.`,
    );
    process.exit(1);
  }
  console.log("\nAll component versions match package.json.");
  process.exit(0);
}

if (updates > 0) {
  console.log(`\nSynced ${updates} file(s) to v${version}.`);
} else {
  console.log(`\nAll files already at v${version}.`);
}
