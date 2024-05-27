const fs = require('fs-extra');
const path = require('path');

const templateDir = path.join(__dirname, 'resources');
const targetDir = process.cwd();

fs.copy(templateDir, targetDir, err => {
  if (err) return console.error(err);
  console.log('Template copied successfully!');
});
