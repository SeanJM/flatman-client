CreateNode.prototype.children = function (a, b) {
  var children = this.node.childNodes;
  var output = [];

  var i = 0;
  var n = children.length;

  for (; i < n; i++) {
    if (isElement(children[i])) {
      output.push(createEl(children[i]));
    }
  }

  if (arguments.length === 1) {
    return a < 0
      ? output[output.length + a]
      : output[a];
  } else if (arguments.length === 2) {
    return output.slice(a, b);
  }

  return output;
};
