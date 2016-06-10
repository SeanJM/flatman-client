CreateNode.prototype.textNodes = function () {
  var walk = document.createTreeWalker(this.node, NodeFilter.SHOW_TEXT, null, false);
  var nextNode = walk.nextNode();
  var nodeList = [];

  while (nextNode) {
    nodeList.push(nextNode);
    nextNode = walk.nextNode();
  }

  return nodeList;
};
