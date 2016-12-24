'use strict';

const fs = require('mz/fs');
const Task = require('co-task');
const request = require('request');
const path = require('path');
const shell = require('shelljs');

const codegenDownloadUrl =
    'http://repo1.maven.org/maven2/io/swagger/swagger-codegen-cli/2.2.1/swagger-codegen-cli-2.2.1.jar';
const codegenPath = path.join(__dirname, 'bin', 'swagger-codegen-cli.jar');
const codegenDonePath = path.join(__dirname, 'bin', '.swagger-codegen-cli.done');

const {
    l: lang = null, help = null
}= require('minimist')(process.argv.slice(2));


function downloadFile(src, dst) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${src} to ${dst}...`);

    const req = request.get(src);
    let total = 0;
    let downloaded = 0;
    let lastReported = (new Date()).getTime();

    const stream = req
        .on('error', err => reject(err))
        .pipe(fs.createWriteStream(dst));

    stream.on('finish', () => {
      console.log('... done!');
      console.log();
      resolve();
    });

    req.on('response', data => {
      total = data.headers['content-length'];
    });

    req.on('data', chunk => {
      downloaded += chunk.length;
      let now = (new Date()).getTime();

      if (total > 0 && (now - lastReported) >= 2500) {
        lastReported = now;
        console.log(`... ${Math.floor((downloaded * 100.0) / total)} percent`);
      }
    });
  });
}

Task.spawn(function*() {
  if (help || lang === null) {
    console.log(`
  Usage: -l "target language"
  Usage: --help
  
  Output is saved to ./codegen/out/"language"
  
  Example Languages:
  csharp
`);

    return 0;
  }

  shell.mkdir('-p', path.join(__dirname, 'bin'));

  if (!(yield fs.exists(codegenPath)) || !(yield fs.exists(codegenDonePath))) {
    yield downloadFile(codegenDownloadUrl, codegenPath);
    yield fs.writeFile(codegenDonePath, '---');
  }

  const input = path.join(__dirname, '../api/swagger/swagger.yaml');
  const output = path.join(__dirname, `out/${lang}`);

  if (shell.exec(`java -jar ${codegenPath} generate -i ${input} -l ${lang} -o ${output}`).code !== 0) {
    console.log('!! failed to execute command');
    return -1;
  }

  console.log('successfuly generated!');
  return 0;
}).then(code => process.exit(code)).catch(err => {
  console.error(err);
  process.exit(-1);
});

module.exports = {};
