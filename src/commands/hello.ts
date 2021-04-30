import { Command, flags } from '@oclif/command';

export class Config extends Command {
  static description = 'description here';

  static examples = [
    `$ raken config`,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [{ name: 'file' }];

  async run() {
    this.log('hello')
  }
}


