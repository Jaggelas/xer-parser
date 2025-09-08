const fs = require('fs');
const path = require('path');

function parseSchemaMaps(tsPath) {
  const src = fs.readFileSync(tsPath, 'utf8');
  const tableRegex = /table:\s*\[\s*'([^']+)'\s*,\s*'[^']+'\s*\][\s\S]*?columns:\s*\[([\s\S]*?)\]/g;
  const colRegex = /\[\s*'([^']+)'\s*,\s*'[^']+'\s*,\s*'(?:TEXT|OTEXT|NUMBER|ONUMBER|DATE|ODATE)'\s*\]/g;
  const map = new Map();
  let m;
  while ((m = tableRegex.exec(src)) !== null) {
    const table = m[1];
    const colsChunk = m[2];
    const cols = new Set();
    let c;
    while ((c = colRegex.exec(colsChunk)) !== null) {
      cols.add(c[1]);
    }
    map.set(table, cols);
  }
  return map;
}

function parseXerHeaders(xerPath) {
  const lines = fs.readFileSync(xerPath, 'utf8').split(/\r?\n/);
  const headers = new Map();
  let currentTable = null;
  for (const line of lines) {
    if (line.startsWith('%T\t')) {
      currentTable = line.split('\t')[1];
    } else if (line.startsWith('%F\t') && currentTable) {
      const cols = line.split('\t').slice(1); // remove %F
      headers.set(currentTable, cols);
      currentTable = null;
    }
  }
  return headers;
}

const root = process.cwd();
const schemaPath = path.join(root, 'src', 'schemas', 'file_schemas.ts');
const xerPath = path.join(root, 'tests', 'test.xer');

const schemaMap = parseSchemaMaps(schemaPath);
const xerHeaders = parseXerHeaders(xerPath);

const report = [];
for (const [table, cols] of xerHeaders.entries()) {
  const mapped = schemaMap.get(table) || new Set();
  const missing = cols.filter(c => !mapped.has(c));
  if (missing.length) {
    report.push({ table, missing });
  }
}

if (!report.length) {
  console.log('All headers in tests/test.xer are mapped.');
} else {
  for (const { table, missing } of report) {
    console.log(`TABLE ${table}: missing ${missing.length} header(s)`);
    console.log('  - ' + missing.join('\n  - '));
  }
}
