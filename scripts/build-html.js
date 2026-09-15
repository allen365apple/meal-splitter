// 把 index.html 與 manifest 複製到 docs/（GitHub Pages 直接吃這個資料夾），
// 並在 app.js / app.css 後面加上內容雜湊當版本號。
//
// 沒有雜湊的話，更新網站之後回訪的使用者會拿到瀏覽器快取的舊檔案，
// 看到的還是舊版本 —— 這在部署時是很常見又很難察覺的問題。
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
const out = path.join(root, 'docs');
fs.mkdirSync(out, { recursive: true });

const hash = (file) =>
  crypto.createHash('sha256').update(fs.readFileSync(path.join(out, file))).digest('hex').slice(0, 8);

const jsHash = hash('app.js');
const cssHash = hash('app.css');

let html = fs.readFileSync(path.join(root, 'src/index.html'), 'utf8');
html = html
  .replace('href="app.css"', `href="app.css?v=${cssHash}"`)
  .replace('src="app.js"', `src="app.js?v=${jsHash}"`);

fs.writeFileSync(path.join(out, 'index.html'), html);
console.log(`  src/index.html → docs/index.html  (app.js?v=${jsHash}, app.css?v=${cssHash})`);

fs.copyFileSync(path.join(root, 'manifest.webmanifest'), path.join(out, 'manifest.webmanifest'));
console.log('  manifest.webmanifest → docs/manifest.webmanifest');

// GitHub Pages 預設會跑 Jekyll，會忽略底線開頭的檔案；放 .nojekyll 關掉它
fs.writeFileSync(path.join(out, '.nojekyll'), '');
console.log('  建立 docs/.nojekyll');
