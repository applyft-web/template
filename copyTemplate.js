const fs = require('fs-extra');
const path = require('path');

const templateDir = path.join(__dirname, 'resources');
const destinationDir = process.cwd();

async function copyTemplate() {
  try {
    await fs.copy(templateDir, destinationDir);
    console.log('Template copied successfully!');
  } catch (err) {
    console.error('Error copying template:', err);
  }
}

copyTemplate();
