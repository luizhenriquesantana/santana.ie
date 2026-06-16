import { access, mkdir, copyFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const printPath = join(root, 'dist', 'resume', 'print', 'index.html');
const outputPath = join(root, 'dist', 'resume.pdf');
const publicOutputPath = join(root, 'public', 'resume.pdf');
const execFileAsync = promisify(execFile);
const chromeCandidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser'
].filter(Boolean);

async function findChrome() {
  for (const candidate of chromeCandidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next common browser path.
    }
  }
  console.warn('Warning: No Chrome/Chromium executable found. Skipping PDF generation and using the existing file.');
  return null;
}

await mkdir(dirname(outputPath), { recursive: true });

const chrome = await findChrome();
if (!chrome) {
  process.exit(0);
}

await execFileAsync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  `--print-to-pdf=${outputPath}`,
  '--print-to-pdf-no-header',
  `file://${printPath}`
]);

// Ensure the public folder exists and copy the generated PDF there so
// the file is available during `astro dev` (served from `public/`).
await mkdir(dirname(publicOutputPath), { recursive: true });
try {
  await copyFile(outputPath, publicOutputPath);
  console.log(`Copied resume PDF to ${publicOutputPath}`);
} catch (err) {
  // If copying fails, still surface the main output location.
  console.warn('Warning: failed to copy resume PDF to public folder.', err);
}

console.log(`Generated ${outputPath}`);
