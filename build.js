const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, 'dist');
const srcDir = path.join(__dirname, 'src');
const assetsDir = path.join(__dirname, 'src', 'assets');

// 1. Clean dist directory
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir);

console.log('Created dist directory.');

// 2. Build Tailwind CSS
console.log('Building Tailwind CSS...');
try {
    execSync('npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify', { stdio: 'inherit' });
} catch (error) {
    console.error('Failed to build Tailwind CSS:', error);
    process.exit(1);
}

// 3. Copy index.html
const indexHtmlPath = path.join(srcDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
    // Read index.html
    let indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

    // Adjust CSS path if needed (in src it links to output.css, in dist it will also be typically next to it if we put it there)
    // <link href="output.css" rel="stylesheet">
    // We are outputting css to ./dist/output.css. 
    // And copying index.html to ./dist/index.html.
    // So relative path "output.css" matches.

    fs.writeFileSync(path.join(distDir, 'index.html'), indexHtml);
    console.log('Copied index.html');
} else {
    console.error('src/index.html not found!');
    process.exit(1);
}

// 4. Copy Assets
const distAssetsDir = path.join(distDir, 'assets');
if (fs.existsSync(assetsDir)) {
    fs.cpSync(assetsDir, distAssetsDir, { recursive: true });
    console.log('Copied assets directory.');
} else {
    console.log('No assets directory found in root to copy.');
}

// 5. Copy script.js (if exists)
// Checking src/script.js and root script.js just in case
const scriptInSrc = path.join(srcDir, 'script.js');
const scriptInRoot = path.join(__dirname, 'script.js');

if (fs.existsSync(scriptInSrc)) {
    fs.copyFileSync(scriptInSrc, path.join(distDir, 'script.js'));
    console.log('Copied script.js from src.');
} else if (fs.existsSync(scriptInRoot)) {
    fs.copyFileSync(scriptInRoot, path.join(distDir, 'script.js'));
    console.log('Copied script.js from root.');
} else {
    console.log('Warning: script.js referenced in HTML but not found in src or root.');
}

console.log('Build completed successfully!');