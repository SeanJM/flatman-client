Node.prototype.children = function (a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return this.childNodes.slice(a, b);
  } else if (Array.isArray(a)) {
    this.childNodes = [];
    this.node.innerHTML = '';
    this.append(a);
    return this;
  }

  return typeof a === 'number'
    ? this.childNodes[a]
    : this.childNodes;
};
