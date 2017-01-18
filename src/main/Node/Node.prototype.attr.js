Node.prototype.attr = function () {
  var attr = this.node.attributes;
  var attrObject = {};
  var self = this;

  if (arguments.length === 0) {
    for (var i = 0, n = attr.length; i < n; i++) {
      attrObject[attr[i].nodeName] = attr[i].nodeValue;
    }
    return attrObject;
  } else if (
    typeof arguments[0] === 'string'
    && typeof arguments[1] === 'string'
  ) {
    if (this.isSVG) {
      this.node.setAttributeNS('http://www.w3.org/1999/xlink', arguments[0], arguments[1]);
    } else {
      this.node.setAttribute(arguments[0], arguments[1]);
    }
  } else if (typeof arguments[0] === 'string') {
    return this.node.getAttribute(arguments[0]);
  } else if (typeof arguments[0] === 'object') {
    for (var k in arguments[0]) {
      if (k === 'className') {
        this.className(arguments[0][k]);
      } else if (k === 'style') {
        this.style(arguments[0][k]);
      } else if ('once' === k.substr(0, 4)) {
        this.once(k.substr(4), arguments[0][k]);
      } else if ('on' === k.substr(0, 2)) {
        this.on(k.substr(2), arguments[0][k]);
      } else {
        this.node.setAttribute(k === 'tabindex' ? 'tabIndex' : k, arguments[0][k]);
      }
    }
  }
  return this;
};
