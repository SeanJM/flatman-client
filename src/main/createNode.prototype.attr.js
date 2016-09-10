CreateNode.prototype.attr = function () {
  if (arguments.length === 0) {
    return getAttributes(this.node);
  } else if (
    typeof arguments[0] === 'string'
    && typeof arguments[1] === 'string'
  ) {
    this.node.setAttribute(arguments[0], arguments[1]);
  } else if (typeof arguments[0] === 'string') {
    return this.node.getAttribute(arguments[0]);
  } else if (typeof arguments[0] === 'object') {
    setAttributes(this.node, arguments[0]);
  }

  return this;
};
