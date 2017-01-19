Node.prototype.cloneDeep = function () {
  var elNode = el(this.node.cloneNode(true));

  function getRel(elNode) {
    [].forEach.call(elNode.node.childNodes, function (node) {
      var childElNode;
      if (isElement(node)) {
        childElNode = el(node);
        elNode.childNodes.push(childElNode);
        childElNode.parentNode = elNode;
        getRel(childElNode);
      }
    });
  }

  getRel(elNode);
  return elNode;
};
