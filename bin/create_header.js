#!/usr/bin/env node

const fs          = require('fs');
const prependFile = require('prepend-file');
const path        = require('path');

/**
 * Walk through the directory searching for files.
 *
 * Create a list of specific files and return the list.
 *
 * Recursive.
 */
walkDirectory = (dir, fileList, mainDir) => {
  let currentFileList = []

  if (fileList !== undefined) {
    currentFileList = fileList;
  }

  let files    = fs.readdirSync(dir);
  let baseDirectory  = ''

  if (mainDir !== undefined) {
    baseDirectory = mainDir
  } else {
    if (dir === './src/' || dir === './dist/') {
      baseDirectory = dir;
    }
  }

  files.forEach((file) => {
    if (fs.statSync(dir + file).isDirectory()) {
      // Recursive part.
      currentFileList = walkDirectory(dir + file + '/', currentFileList, baseDirectory);
    } else {
      let fullPath = dir + file;

      // Build the appropriate file object for Each type, src or dist.
      if (path.extname(file) === '.md' && baseDirectory === './src/') {
        // We only care about MD files.
        currentFileList.push({fileName: file, dir: fullPath, name: path.parse(file).name });
      } else if (path.extname(file) === '.js' && baseDirectory === './dist/') {
        // We only care about JS Files.
        currentFileList.push({fileName: file, dir: fullPath, name: path.parse(file).name });
      }
    }
  });

  return currentFileList;
}

let listOfMdFiles  = walkDirectory('./src/');
let listOfDistFiles = walkDirectory('./dist/');

// Prepend the MD file contents to that of the associated JS
// file in the dist directory.
for (let i = 0; i < listOfDistFiles.length; i++) {
  fs.readFile(listOfMdFiles[i].dir, (err, data) => {
    if (err) {
      console.log(err);
    }

    prependFile(listOfDistFiles[i].dir, data, (err) => {
      if (err) {
        console.log(err);
      }

      console.log(listOfDistFiles[i].name + ' Header comments added!');
    });
  });
}
