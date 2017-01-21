Node.prototype.children = function (a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return this.childNodes.slice(a, b);
  }
  return typeof a === 'number' ? this.childNodes[a] : this.childNodes;
};
