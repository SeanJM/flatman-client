const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('package.json')).gruntBuild;

function notGrunt(file) {
  return !/Gruntfile.js$/.test(file);
}

let src = {
  shared_vendor : m('src/shared/scripts/vendor/', /\.js$/).filter(notGrunt),
  shared_constants : m('src/shared/scripts/constants/', /\.js$/).filter(notGrunt),
  shared_predicates : m('src/shared/scripts/predicates/', /\.js$/).filter(notGrunt),
  shared_custom : m('src/shared/scripts/custom/', /\.js$/).filter(notGrunt),
  shared_components : m('src/shared/scripts/components/', /\.js$/).filter(notGrunt),
  shared_containers : m('src/shared/scripts/containers/', /\.js$/).filter(notGrunt),
  shared_collections : m('src/shared/scripts/collections/', /\.js$/).filter(notGrunt),
  shared_main : m('src/shared/scripts/main/', /\.js$/).filter(notGrunt),
  shared_init : m('src/shared/scripts/init/', /\.js$/).filter(notGrunt),
  shared_exports : m('src/shared/scripts/exports/', /\.js$/).filter(notGrunt),

  vendor : m('src/application/scripts/vendor/', /\.js$/).filter(notGrunt),
  constants : m('src/application/scripts/constants/', /\.js$/).filter(notGrunt),
  predicates : m('src/application/scripts/predicates/', /\.js$/).filter(notGrunt),
  custom : m('src/application/scripts/custom/', /\.js$/).filter(notGrunt),
  components : m('src/application/components/', /\.js$/).filter(notGrunt),
  containers : m('src/application/containers/', /\.js$/).filter(notGrunt),
  collections : m('src/application/collections/', /\.js$/).filter(notGrunt),
  main : m('src/application/scripts/main/', /\.js$/).filter(notGrunt),
  init : m('src/application/scripts/init/', /\.js$/).filter(notGrunt),
  exports : m('src/application/scripts/exports/', /\.js$/).filter(notGrunt)
};

let dest = {
  development : {},
  production : {
    bundle : config.scripts && config.bundle
      ? config.bundle
      : 'bin/bundle.js'
  }
};

if (config.isBundle) {
  dest.development.bundle = dest.production.bundle;
} else {
  for (var k in src) {
    if (src[k].length) {
      dest.development[k] = 'bin/' + k + '.js';
    }
  }
}


module.exports = {
  src : src,
  dest : dest,

  list : [].concat(
    src.shared_constants,
    src.shared_predicates,
    src.shared_vendor,
    src.shared_custom,
    src.shared_components,
    src.shared_containers,
    src.shared_collections,
    src.shared_main,
    src.shared_init,
    src.shared_exports,

    src.constants,
    src.predicates,
    src.vendor,
    src.custom,
    src.components,
    src.containers,
    src.collections,
    src.main,
    src.init,
    src.exports
  )
};
