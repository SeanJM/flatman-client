Node.prototype.className = function (value) {
  if (typeof value === 'undefined') {
    return this.classList().join(' ');
  }

  value = Array.isArray(value) ? value.sort().join(' ') : value;

  if (this.isSVG) {
    this.node.setAttributeNS(null, 'class', value);
  } else {
    this.node.className = value;
  }

  return this;
};
