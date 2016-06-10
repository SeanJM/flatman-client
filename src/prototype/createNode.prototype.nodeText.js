CreateNode.prototype.nodeText = function () {
  return this.node.innerHTML.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
};
