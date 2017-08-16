const path = require('path');
const fs = require('fs');
const glob = require('glob');
const watch = require('./lib/watch');

function render() {
  let files = [];

  console.log("Rendering javascript at " + new Date());

  files = files
    .concat(glob.sync('src/constants/*.js'))
    .concat(glob.sync('src/common/*.js'))
    .concat(glob.sync('src/predicates/*.js'))
    .concat('node_modules/flatman-component/index.js')

    .concat('src/main/Node/Node.js')
    .concat(glob.sync('src/main/Node/Node.fn.js'))
    .concat(glob.sync('src/main/Node/Node.prototype.*.js'))

    .concat('src/main/createComponent.js')
    .concat('src/main/el.js')

    .concat([
      'src/init/initCustomEvent.js',
      'src/init/initDoubleClick.js',
      'src/init/initDragAndDrop.js',
      'src/init/initInputEvent.js',
      'src/init/initVendorPrefixes.js',
      'src/init/initComponentMethods.js',
      'src/init/init.js',
    ])

    .concat('src/exports/exports.js');

    fs.writeFileSync(
      path.resolve('index.js'),
      []
        .concat('(function (window) {\n')
        .concat(
          files
            .map(a => fs.readFileSync(path.resolve(a), 'utf8'))
        )
        .concat('}(window));')
        .join('\n\n')
    );
}

render();
if (process.env.ENV !== 'production') {
  watch('src/**/*.js', render);
  watch('node_modules/flatman-component/index.js', render);
}
