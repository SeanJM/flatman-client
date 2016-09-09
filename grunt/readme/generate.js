const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const m = require('match-file-utility');

const pkg = JSON.parse(fs.readFileSync('package.json'));

const linkLicense = require('./linkLicense');
const exists = require('../lib/exists');
const padLeft = require('../lib/padLeft');
const padRight = require('../lib/padRight');
const smartCase = require('../lib/smartCase');
const printTests = require('./printTests');

const source = 'src/readme/';

function toLink(s) {
  return '#' + s.toLowerCase()
    .replace(/_|\s+|\./g,'-')
    .replace(/\//g, '--') + '-top';
}

function tableOfContents(text, content, i) {
  _.forEach(content, function (value, key) {
    if (typeof value === 'object') {
      text.push('', new Array(i).join('  ') + '- ' + smartCase(key));
    }

    if (Array.isArray(value)) {
      value.forEach(function (a) {
        let name = smartCase(path.basename(a).replace(/\.md$/, ''));
        var base = a.slice(source.length, -3);
        text.push(new Array(i + 1).join('  ') + '- [' + name + '](' + toLink(base) + ')');
      });
    } else if (typeof value === 'object') {
      tableOfContents(text, value, i + 1);
    } else if (typeof value === 'string') {
      var base = value.substr(source.length);
      text.push(new Array(i).join('  ') + '- [' + smartCase(key) + '](' + toLink(base) + '-top)');
    }
  });
}

function printContents(text, content, i) {
  _.forEach(content, function (value, key) {
    if (typeof value === 'object') {
      text.push(new Array(i + 2).join('#') + ' ' + smartCase(key));
    }

    if (Array.isArray(value)) {
      value.forEach(function (a) {
        let string = fs.readFileSync(a, 'utf8');
        var base = a.slice(source.length, -3).split(path.sep).map(smartCase).join(' / ');
        text.push(
          new Array(i + 3).join('#') + ' ' + base + ' \([top](#table-of-contents)\)',
          '',
          string
        );
      });
    } else if (typeof value === 'object') {
      printContents(text, value, i + 1);
    } else if (typeof value === 'string') {
      let string = fs.readFileSync(value, 'utf8');
      let name = smartCase(key);
      text.push(
        new Array(i + 3).join('#') + ' ' + name + ' \([top](#table-of-contents)\)',
        '',
        string
      );
    }
  });
}

function generate(test_results, callback) {
  let content = {};
  let text = [];
  var hasTests = test_results && test_results.int_total > 0;

  m(source, /\.md$/)
    .forEach(function (a) {
      var p = a.substr(source.length).split(path.sep);
      var s = p.slice(0, -1);

      if (s.length) {
        if (typeof _.get(content, s) === 'undefined') {
          _.set(content, s, []);
        } else if (typeof _.get(content, s) === 'string') {
          throw new Error('Invalid folder structure for "' + s.join(path.sep) + '"');
        }
        _.get(content, s).push(a);
      } else {
        content[ p[0].replace(/\.md$/, '') ] = a;
      }
    });


  text.push('# ' + smartCase(pkg.name) + ' ' + pkg.version);

  text.push('#### License: ' + linkLicense(pkg.license || 'MIT'));

  text.push('');

  if (hasTests) {
    if (test_results.int_passed === test_results.int_total) {
      text.push('#### ✅ All ' + test_results.int_total + ' tests pass');
    } else {
      text.push('#### 🚫 ' + test_results.int_passed + ' of ' + test_results.int_total + ' tests passed (' + Math.round((test_results.int_passed / test_results.int_total) * 100) + '%)');
    }
  } else {
    text.push('#### 🐛 No unit tests');
  }

  text.push('', '## Table of Contents');

  text.push('', '#### Overview', '');

  tableOfContents(text, content, 1);

  if (hasTests) {
    text.push('- [Tests](#tests)');
  }

  text.push('');

  printContents(text, content, 1);

  if (hasTests) {
    printTests(text, test_results);
  }

  fs.writeFileSync('README.md', text.join('\n'));
  callback();
}

module.exports = generate;
