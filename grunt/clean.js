const _ = require('lodash');
const m = require('match-file-utility');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('package.json')).gruntBuild;

const imageFiles = Object.keys(require('./images').dest);

const cssFiles = require('./css').files.dest;

const scriptFiles = _.map((
  config.isSite
    ? require('./scripts/site_files')
    : require('./scripts/plugin_files')
  ).dest[
    config.isProduction
      ? 'production'
      : 'development'
  ], a => a);

m('bin', /\.css$/).forEach(function (f) {
  if (cssFiles !== f) {
    fs.unlink(f);
  }
});

m('bin', /\.css\.map$/).forEach(function (f) {
  if (cssFiles + '.map' !== f) {
    fs.unlink(f);
  }
});

m('bin', /\.(png|svg|jpg)$/).forEach(function (f) {
  var lowres = f.replace(/.lowres/, '');
  if (imageFiles.indexOf(f) === -1 && imageFiles.indexOf(lowres) === -1) {
    fs.unlink(f);
  }
});

m('bin', /\.(js)$/).forEach(function (f) {
  if (scriptFiles.indexOf(f) === -1) {
    fs.unlink(f);
  }
});

m('bin', /\.(js\.map)$/).forEach(function (f) {
  if (scriptFiles.indexOf(f.slice(-4)) === -1) {
    fs.unlink(f);
  }
});
