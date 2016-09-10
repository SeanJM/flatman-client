CreateNode.prototype.children = function () {
  var children = this.node.childNodes;
  var output = [];

  var i = 0;
  var n = children.length;

  for (; i < n; i++) {
    if (isElement(children[i])) {
      output.push(createEl(children[i]));
    }
  }

  return output;
};
