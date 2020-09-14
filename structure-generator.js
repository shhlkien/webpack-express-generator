#!/usr/bin/env node

const { promises: { readdir, writeFile } } = require('fs');
const { join, resolve } = require('path');

const BOILERPLATE_DIR = join(__dirname, 'boilerplate');

(async () => {

  try {
    const dirents = await readDir(BOILERPLATE_DIR, 1);
    const files = [];

    for (;;) {
      /* eslint-disable-next-line no-await-in-loop */
      const it = await dirents.next();
      if (it.done) break;
      files.push(it.value);
    }

    const sortedFiles = files.sort((f1, f2) => f2.level - f1.level);
    const content = `module.exports = ${JSON.stringify(sortedFiles, null, 2)}`;

    await writeFile(BOILERPLATE_DIR + '/file-map.js', content, 'utf8');
  }
  catch (err) {
    console.error(err);
  }
})();

async function* readDir(dir, level) {

  const files = await readdir(dir, { withFileTypes: true });
  const excludeFiles = ['eslint.js', 'file-map.js', 'package.js'];
  const excludeExtensions = ['.ejs', '.pug', '.hbs'];

  for (const file of files) {

    if (excludeFiles.includes(file.name) || excludeExtensions.some((ext) => file.name.endsWith(ext))) continue;

    const realPath = resolve(dir, file.name);

    if (file.isDirectory()) {

      yield* readDir(realPath, level + 1);
      yield {
        isDir: file.isDirectory(),
        level,
        name: realPath.replace(BOILERPLATE_DIR, ''),
      };
    }
    else yield {
      isDir: file.isDirectory(),
      level,
      name: realPath.replace(BOILERPLATE_DIR, ''),
    };
  }
}