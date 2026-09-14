// 把 index.html 與 manifest 複製到 docs/（GitHub Pages 直接吃這個資料夾）
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const out = path.join(root, 'docs');
fs.mkdirSync(out, { recursive: true });

const files = [
  ['src/index.html', 'docs/index.html'],
  ['manifest.webmanifest', 'docs/manifest.webmanifest'],
];

for (const [from, to] of files) {
  fs.copyFileSync(path.join(root, from), path.join(root, to));
  console.log(`  ${from} → ${to}`);
}

// GitHub Pages 預設會跑 Jekyll，會忽略底線開頭的檔案；放 .nojekyll 關掉它
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('  建立 docs/.nojekyll');
