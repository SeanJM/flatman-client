const _ = require('lodash');

module.exports = function (text, testResults) {
  var passed = testResults && testResults.tests.filter(a => a.passed);
  var failed = testResults && testResults.tests.filter(a => !a.passed);

  text.push('***', '', '## Tests');

  text.push('', '```');

  passed.forEach(function (a) {
    text.push(
      _.padStart(a.index, 5, ' ') + '. ' + _.padEnd(a.name, 68, '.') + ' ✅'
    );
  });

  failed.forEach(function (a) {
    text.push(
      '\n' + _.padStart(a.index, 5, ' ') + '. ' + _.padEnd(a.name + ' ', 68, '.') + ' 🚫'
    );
  });

  text.push('```', '');
};
