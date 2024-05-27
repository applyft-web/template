#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

const templateDir = path.join(__dirname, 'resources');
const destinationDir = process.cwd();

async function copyTemplate() {
  try {
    console.log('Copying template files...');
    await fs.copy(templateDir, destinationDir);
    console.log('Template copied successfully!');
    installDependencies();
  } catch (err) {
    console.error('Error copying template:', err);
  }
}

function installDependencies() {
  console.log('Starting npm install...');
  const install = spawn('npm', ['install'], { stdio: 'inherit', shell: true });

  install.on('error', (err) => {
    console.error('Failed to start npm install:', err);
  });

  install.on('close', (code) => {
    if (code !== 0) {
      console.error(`npm install process exited with code ${code}`);
    } else {
      console.log('Dependencies installed successfully!');
    }
  });
}

copyTemplate();
