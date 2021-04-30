const { rm } = require('shelljs');
const replace = require('replace-in-file');
const prompts = require('prompts');
const fs = require('fs')

const files = ['**/*.md', '**/*.json', '**/*.yml'];

async function run() {
  const { username } = await prompts({
    type: 'text',
    name: 'username',
    message: 'What is your Github username?',
  });

  replace.sync({
    files,
    //Replacement to make (string or regex)
    from: /chaoyangnz/g,
    to: username,
  });

  const { cli } = await prompts({
    type: 'text',
    name: 'cli',
    message: 'What do you want the cli to be called? (use kebab-case)',
  });

  replace.sync({
    files,
    //Replacement to make (string or regex)
    from: /node-cli-template/g,
    to: cli,
  });

  fs.renameSync('bin/node-cli-template', `bin/${cli}`)
  fs.renameSync('bin/node-cli-template.cmd', `bin/${cli}.cmd`)

  // delete this rename.ts
  replace.sync({
    files: ['package*.json'],
    //Replacement to make (string or regex)
    from: /ts\-node tools\/rename\.ts/g,
    to: '',
  });
  rm('-rf', 'tools')

  console.log('All done! Enjoy');
}

run();
