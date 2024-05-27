#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const templateDir = path.join(__dirname, 'resources');
const destinationDir = process.cwd();

async function copyTemplate() {
  try {
    await fs.copy(templateDir, destinationDir);
    console.log('Template copied successfully!');
    installDependencies();
  } catch (err) {
    console.error('Error copying template:', err);
  }
}

function installDependencies() {
  console.log('Installing dependencies...');
  exec('npm install', (err, stdout, stderr) => {
    if (err) {
      console.error('Error installing dependencies:', err);
      return;
    }
    console.log(stdout);
    console.error(stderr);
    console.log('Dependencies installed successfully!');
  });
}

copyTemplate();
