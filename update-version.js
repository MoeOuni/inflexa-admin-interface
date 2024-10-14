// update-version.js
import fs from 'fs';
import { execSync } from 'child_process';
// Read the current commit message
const commitMsg = execSync('git log -1 --pretty=%B').toString().trim();

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const currentVersion = packageJson.version;
let [major, minor, patch] = currentVersion.split('.').map(Number);

// Determine which part of the version to increment
if (/^(chore|hotfix|cleaning)/.test(commitMsg)) {
  // Increment patch version
  patch += 1;
} else if (/^feat/.test(commitMsg)) {
  // Increment minor version and reset patch
  minor += 1;
  patch = 0;
} else if (/^migration/.test(commitMsg)) {
  // Increment major version and reset minor and patch
  major += 1;
  minor = 0;
  patch = 0;
} else {
  console.log('No version bump required for this commit.');
  // eslint-disable-next-line no-undef
  process.exit(0); // Exit without updating package.json
}

// Update the version in package.json
const newVersion = `${major}.${minor}.${patch}`;
packageJson.version = newVersion;
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

console.log(`Version bumped to ${newVersion}`);
