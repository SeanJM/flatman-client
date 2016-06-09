CreateNode.prototype.selectorPath = function () {
  var path = [this.getSelector()];
  var p = this._node_.parentNode;

  while (p) {
    path.unshift(new CreateNode(p).getSelector());

    if (p === document.body || p.id.length > 0) {
      return path.join(' ');
    }

    p = p.parentNode;
  }

  return path.join(' ');
};
