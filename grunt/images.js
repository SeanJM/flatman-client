const m = require('match-file-utility');
const path = require('path');

let dest = {};
let files = m('src/', /\.(png|jpg|svg)$/);

let task = {
  imagemin : {},
  copy : {},
  watch : {}
};

files.forEach(function (file) {
  dest['bin/' + path.basename(file)] = file;
});

task.imagemin.images = {
  static : {
    options : {
      optimizationLevel : 3,
      svgoPlugins : [{ removeViewBox : false }],
      use : [],
    },
    files : dest
  }
};

task.copy = {
  expand : true,
  flatten : true,
  src : files,
  dest : 'bin/'
};

task.watch.images = {
  files : files,
  tasks : [ 'copy:images' ],
};

module.exports = {
  task : task,
  dest : dest,
  files : files
};
