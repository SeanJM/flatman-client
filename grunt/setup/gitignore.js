const fs = require('fs');
const config = JSON.parse(fs.readFileSync('package.json')).gruntBuild;

const root = config.isSite
  ? 'src/application/'
  : 'src/';


try {
  fs.statSync('.gitingore');
} catch (e) {
  // Create a gitingore by default
  fs.writeFileSync(
    '.gitignore',
    [
      'node_modules',
      '.DS_STORE'
    ].join('\n')
  );
}
