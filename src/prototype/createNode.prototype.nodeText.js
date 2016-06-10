CreateNode.prototype.nodeText = function () {
  return trim(this.node.innerHTML.replace(/<[^>]+?>/g, '')).replace(/\s+/g, ' ');
};
