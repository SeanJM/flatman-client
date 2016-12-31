Node.prototype.offset = function () {
  var offset = this.node.getBoundingClientRect();
  return {
    width : offset.width,
    height : offset.height,
    left : offset.left,
    right : offset.right,
    bottom : offset.bottom,
    top : offset.top
  };
};
