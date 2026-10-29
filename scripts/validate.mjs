import { readFile, access, readdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const html = await readFile('dist/index.html','utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(new Set(ids).size,ids.length,'Duplicate element IDs');
for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(id),`Missing anchor: ${id}`);
for (const [,path] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!path.includes('://')) await access(`dist/${path}`);
}
assert(html.includes('lang="pt-BR"'));
assert.equal((await readdir('dist/assets')).filter(path=>path.endsWith('.svg')).length,12);
assert(html.includes('#F5ECE3') && html.includes('#B98E4A'));
console.log('Validated: local assets, 12 SVGs, unique IDs, all navigation anchors, pt-BR and official palette.');
