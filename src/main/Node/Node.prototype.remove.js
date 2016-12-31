Node.prototype.remove = function () {
  function unmount(element) {
    var index = MOUNTED.indexOf(element);
    if (index > -1) {
      element.trigger('unmount');
      element.childNodes.forEach(unmount);
      MOUNTED.splice(index, 1);
    }
  }

  if (isElement(this.node.parentNode)) {
    this.node.parentNode.removeChild(this.node);
    unmount(this);
  }

  return this;
};
