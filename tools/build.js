// SE を英単語ダンジョンの se.js から取り出して単一HTMLに埋め込む
const fs = require('fs'), path = require('path');
const seSrc = process.argv[2] || path.join(__dirname, '../../nochi-jpg/english-dungeon/se.js');
global.window = {}; eval(fs.readFileSync(seSrc, 'utf8'));
const keys = ['tap', 'ok', 'ng', 'decide', 'good', 'cheer'];
const obj = {}; keys.forEach(k => obj[k] = window.ED_SE[k]);
const inject = '// 効果音（効果音ラボ。nochi-jpg/english-dungeon の se.js から流用）\nwindow.KT_SE = ' + JSON.stringify(obj) + ';';
const tpl = fs.readFileSync(path.join(__dirname, '../src/index.template.html'), 'utf8');
fs.writeFileSync(path.join(__dirname, '../index.html'), tpl.replace('/*__SE__*/', inject));
console.log('built index.html', fs.statSync(path.join(__dirname, '../index.html')).size, 'bytes');
