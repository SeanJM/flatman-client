CreateNode.prototype.scale = function (x, y) {
  var computed = window.getComputedStyle(this.node)[VENDOR_PREFIX.transform];
  var matrix = [];

  if (computed === 'none') {
    matrix = [
      1, 0, 0,
      1, 0, 0,
    ];
  } else {
    matrix = computed.slice(7, -1).split(',').map(function (a) {
      return Number(a);
    });
  }

  if (typeof y === 'undefined') {
    y = x;
  }

  matrix[0] = x;
  matrix[3] = y;

  this.node.style[VENDOR_PREFIX.transform] = 'matrix(' + matrix.join(',') + ')';
};
