Node.prototype.removeChild = function (a) {
  var self = this;

  function removeChild(x) {
    var index = self.childNodes.indexOf(x);

    if (index === -1) {
      throw 'Node is not a child of it\'s parent. (' + self.node.tagName + ')';
    }

    x.remove();
  }

  if (Array.isArray(a)) {
    a.forEach(removeChild);
  } else {
    removeChild(a);
  }

  return this;
};
