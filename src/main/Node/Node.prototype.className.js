Node.prototype.className = function (value) {
  if (typeof value === 'undefined') {
    return this.classList().join(' ');
  }

  if (this.isSVG) {
    this.node.setAttributeNS(null, 'class', value);
  } else {
    this.node.className = value;
  }

  return this;
};
