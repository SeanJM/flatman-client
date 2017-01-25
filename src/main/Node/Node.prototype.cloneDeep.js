Node.prototype.cloneDeep = function () {
  return el(this.node.cloneNode(true)).mapChildren();
};
