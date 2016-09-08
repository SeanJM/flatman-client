CreateNode.prototype.attr = function () {
  var attr;
  var res;
  if (typeof arguments[0] === 'string' && typeof arguments[1] === 'string') {
    this.node.setAttribute(arguments[0], arguments[1]);
  } else if (typeof arguments[0] === 'string') {
    return this.node.getAttribute(arguments[0]);
  } else if (typeof arguments[0] === 'object') {
    setAttributes(this.node, arguments[0]);
  } else if (!arguments.length) {
    attr = this.node.attributes;
    res = {};

    for (var i = 0, n = attr.length; i < n; i++) {
      res[attr[i].nodeName] = attr[i].nodeValue;
    }

    return res;
  }

  return this;
};
