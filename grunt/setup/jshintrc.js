const fs = require('fs');
const config = JSON.parse(fs.readFileSync('package.json')).gruntBuild;

const root = config.isSite
  ? 'src/application/'
  : 'src/';

try {
  fs.statSync('.jshintrc');
} catch (e) {
  // Create a jshintrc by default
  fs.writeFileSync(
    '.jshintrc',
    JSON.stringify({
      laxcomma : true,
      laxbreak : true,
      esnext : true
    })
  );
}
