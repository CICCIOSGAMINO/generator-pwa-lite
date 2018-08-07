'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
let path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the outstanding ' + chalk.red('generator-pwa-lite') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'pwaNameTag',
      message:
        'What would you like your PWA Tag to be called ? (pwa-lite)',
      default: 'pwa-lite'
    },
    {
      type: 'input',
      name: 'pwaDesc',
      message: 'Intro a brief PWA lite description ... (Ulta lite PWA) ',
      default: 'Chamaeleonidae ultra LITE PWA'
    },
    {
      type: 'input',
      name: 'themeColor',
      message: 'What would you like your theme color to be ? (#673AB7)',
      default: '#673AB7'
    },
    {
      type: 'input',
      name: 'secondaryColor',
      message: 'What would you like your secondary color to be ? (#FFEB3B)',
      default: '#FFEB3B'
    },
    {
      type: 'input',
      name: 'accentColor',
      message: 'What would you like your accent color to be ? (#76FF03)',
      default: '#76FF03'
    }
    ];

    return this.prompt(prompts).then(props => {
      // Define the className eg. pwa-lite > PwaLite
      props.className = props.pwaNameTag.split('-').map(x => {
        return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
      }).join('');

      // Define the App Name pwa-lite > Pwa Lite
      props.pwaName = props.pwaNameTag.split('-').map(x => {
        return x.charAt(0).toUpperCase() +
        x.slice(1).toLowerCase();
      }).join(' ');

      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // PWA Seed Path (folder with the PWA Seed files)
    let pwaPath = path.join(
      path.dirname(this.resolved), 'pwa-lite'
    );

    this.sourceRoot(pwaPath);

    // Ready to use the pwaNameTag
    const pwaNameTag = this.props.pwaNameTag;

    // Copy the images 
    this.fs.copy(
      `${this.templatePath()}/images/**/*`,
      `${this.destinationPath()}/images/`
    );

    // Copy the sw.js file 
    this.fs.copy(
      this.templatePath('service-worker.js'),
      this.destinationPath('service-worker.js')
    );

    // Copy the License File 
    this.fs.copy(
      this.templatePath('LICENSE.md'),
      this.destinationPath('LICENSE.md')
    );

    // Copy the README.md file 
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );

    // Copy the .gitignore file 
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    // Handle the index.html
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      this.props
    );

    // Handle the package.json
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );

    // Handle the manifest.json
    this.fs.copyTpl(
      this.templatePath('manifest.json'),
      this.destinationPath('manifest.json'),
      this.props
    );

    // Handle the polymer.json
    this.fs.copyTpl(
      this.templatePath('polymer.json'),
      this.destinationPath('polymer.json'),
      this.props
    );

    // Handle the Polymer Web Component Tester conf file 
    this.fs.copyTpl(
      this.templatePath('wct.conf.json'),
      this.destinationPath('wct.conf.json'),
      this.props
    );

    // Prepare and copy the web-app element with right tag name
    this.fs.copyTpl(
      this.templatePath('src/components/_my-pwa.js'),
      this.destinationPath(`src/components/${pwaNameTag}.js`),
      this.props
    );

    this.fs.copyTpl(
      `${this.templatePath()}/src/**/!(_)*`,
      `${this.destinationPath()}/src/`,
      this.props
    );

  }

  install() {
    // This.installDependencies();
    this.yarnInstall();
  }
};
