CreateNode.prototype.before = function () {
  var n = arguments.length;
  var i = 0;
  var f = document.createDocumentFragment();

  for (; i < n; i++) {
    f.append(
      el.getNode(arguments[i])
    );
  }

  this.node.parentNode.insertBefore(f, this.node);
  [].forEach.call(f, mount);

  return this;
};
