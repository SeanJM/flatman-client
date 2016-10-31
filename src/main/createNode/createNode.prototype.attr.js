CreateNode.prototype.attr = function () {
  var tagName = this.node.tagName.toLowerCase();
  if (arguments.length === 0) {
    return getAttributes(this.node);
  } else if (
    typeof arguments[0] === 'string'
    && typeof arguments[1] === 'string'
  ) {
    if (tagName === 'use' || tagName === 'svg') {
      this.node.setAttributeNS('http://www.w3.org/1999/xlink', arguments[0], arguments[1]);
    } else {
      this.node.setAttribute(arguments[0], arguments[1]);
    }
  } else if (typeof arguments[0] === 'string') {
    return this.node.getAttribute(arguments[0]);
  } else if (typeof arguments[0] === 'object') {
    for (var k in arguments[0]) {
      if (k === 'class') {
        className = arguments[0][k].split(' ').map(trim).filter(hasLength);
        if (this.isSVG) {
          this.node.setAttributeNS(null, 'class', className.sort().join(' '));
        } else {
          this.node.className = className.sort().join(' ');
        }
      } else if (k === 'style') {
        setStyle(this.node, arguments[0][k]);
      } else if (/on[A-Z][a-z]/.test(k.substr(0, 4))) {
        // A fast test to see if the property matches "onClick" or "onKeyup" or
        // "onScroll" pattern
        if (isFunction(arguments[0][k])) {
          this.on(k.substr(2).toLowerCase(), arguments[0][k]);
        } else {
          throw '\"' + k + '\" must have a function as a value.';
        }
      } else {
        this.node.setAttribute(attributeName(k), arguments[0][k]);
      }
    }
  }
  return this;
};
