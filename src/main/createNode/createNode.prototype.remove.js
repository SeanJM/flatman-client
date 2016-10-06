CreateNode.prototype.remove = function () {
  var e;

  function unmount(node) {
    var index = MOUNTED.indexOf(node);
    if (index > -1) {
      node.dispatchEvent(e);
      [].forEach.call(node.childNodes, unmount);
      MOUNTED.splice(index, 1);
    }
  }

  if (isElement(this.node.parentNode)) {
    this.node.parentNode.removeChild(this.node);
    e = new Event('unmount');
    unmount(this.node);
  }

  return this;
};
