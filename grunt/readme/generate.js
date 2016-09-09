const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const m = require('match-file-utility');

const pkg = JSON.parse(fs.readFileSync('package.json'));

const linkLicense = require('./linkLicense');
const exists = require('../lib/exists');
const padLeft = require('../lib/padLeft');
const padRight = require('../lib/padRight');

const source = 'src/readme/';

function capitalCase(string) {
  let spaced = string.trim().replace(/-|_/g, ' ').split(' ');
  let s = spaced.map(function (a) {
    return /^[A-Z]/.test(a) ? a : a[0].toUpperCase() + a.substr(1).toLowerCase();
  }).join(' ');

  return s[0].toUpperCase() + s.slice(1);
}

function tableOfContents(text, content, i) {
  _.forEach(content, function (value, key) {
    text.push('', new Array(i).join('  ') + '- ' + capitalCase(key));

    if (Array.isArray(value)) {
      value.forEach(function (a) {
        let name = capitalCase(path.basename(a).replace(/\.md$/, ''));
        text.push(new Array(i + 1).join('  ') + '- ' + name + ' ... \([top](#table-of-contents)\)');
      });
    } else {
      tableOfContents(text, value, i + 1);
    }
  });
}

function printContents(text, content, i) {
  _.forEach(content, function (value, key) {
    text.push(new Array(i + 1).join('#') + ' ' + capitalCase(key));

    if (Array.isArray(value)) {
      value.forEach(function (a) {
        let string = fs.readFileSync(a, 'utf8');
        let name = capitalCase(path.basename(a).replace(/\.md$/, ''));
        text.push(new Array(i + 2).join('#') + ' ... \([top](#table-of-contents)\)');
        text.push('');
        text.push(string);
      });
    } else {
      printContents(text, value, i + 1);
    }
  });
}

function generate(test_results, callback) {
  let description = source + 'description.md';
  let notes = source + 'notes.md';
  let example = source + 'example.md';
  let installation = source + 'installation.md';

  let content = {};

  m(source, /\.md$/).filter(function (a) {
    return path.dirname(a) + '/' !== source;
  }).forEach(function (a) {
    var p = a.substr(source.length).split(path.sep);

    if (typeof _.get(content, p.slice(0, -1)) === 'undefined') {
      _.set(content, p.slice(0, -1), []);
    } else if (typeof _.get(content, p.slice(0, -1)) === 'string') {
      throw new Error('Invalid folder structure for "' + p.slice(0, -1).join(path.sep) + '"');
    }

    _.get(content, p.slice(0, -1)).push(a);
  });

  let hasDescription = exists(description);
  let hasNotes = exists(notes);
  let hasExample = exists(example);
  let hasInstallation = exists(installation);

  let text = [];

  var hasTests = test_results && test_results.int_total > 0;

  text.push('# ' + capitalCase(pkg.name) + ' ' + pkg.version);

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

  text.push('- [Description](#description)');

  if (hasInstallation) {
    text.push('- [Installation](#installation)');
  }

  if (hasNotes) {
    text.push('- [Notes](#notes)');
  }

  if (hasExample) {
    text.push('- [Example](#example)');
  }

  tableOfContents(text, content, 1);

  if (hasTests) {
    text.push('- [Tests](#tests)');
  }

  text.push('', '## Description', '');

  if (hasDescription) {
    text.push(fs.readFileSync(description, 'utf8'));
  } else {
    text.push('No description provided');
  }

  if (hasInstallation) {
    text.push('', '## Installation', '');
    text.push(fs.readFileSync(installation, 'utf8'));
  }

  if (hasNotes) {
    text.push('', '## Notes', '');
    text.push(fs.readFileSync(notes, 'utf8'));
  }

  if (hasExample) {
    text.push('', '## Example', '');
    text.push(fs.readFileSync(example, 'utf8'));
  }

  text.push('');

  printContents(text, content, 1);

  if (hasTests) {
    text.push('***', '', '## Tests');

    text.push('', '```');

    for (var k in test_results.passed) {
      text.push(
        padLeft(test_results.passed[k].index, 5, ' ') + '. ' + padRight(test_results.passed[k].name, 68, '.') + ' ✅'
      );
    }

    for (k in test_results.failed) {
      text.push(
        '\n' + padLeft(test_results.failed[k].index, 5, ' ') + '. ' + padRight(test_results.failed[k].name + ' ', 68, '.') + ' 🚫'
      );

      if (test_results.failed[k].isCaught[0] || test_results.failed[k].isCaught[1]) {
        if (test_results.failed[k].isCaught[0]) {
          text.push(
            '      ' + test_results.failed[k].a.toString()
          );
        }
        if (test_results.failed[k].isCaught[1]) {
          text.push(
            '      ' + test_results.failed[k].b.toString()
          );
        }
      } else {
        text.push(
          '\n +' + '   Left: ' + padLeft(typeToString(test_results.failed[k].b), 66, ' ') +
          '\n -' + '  Right: ' + padLeft(typeToString(test_results.failed[k].a), 66, ' ')
        );
      }
    }

    text.push('```', '');
  }

  fs.writeFileSync('README.md', text.join('\n'));
  callback();
}

module.exports = generate;
