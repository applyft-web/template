#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);

const templateDir = path.join(__dirname, 'resources');
const destinationDir = process.cwd();

async function copyTemplate() {
  try {
    await fs.copy(templateDir, destinationDir);
    console.log('Template copied successfully!');
    await installDependencies();
  } catch (err) {
    console.error('Error copying template:', err);
  }
}

async function installDependencies() {
  try {
    console.log('Installing dependencies...');
    const { stdout, stderr } = await execPromise('npm install');
    console.log(stdout);
    console.error(stderr);
    console.log('Dependencies installed successfully!');
  } catch (err) {
    console.error('Error installing dependencies:', err);
  }
}

copyTemplate();
