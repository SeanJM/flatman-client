CreateNode.prototype.copyAttributes = function (fromNode) {
  var i = 0,
      attr;

  if (fromNode instanceof CreateNode) {
    attr = fromNode._node_.attributes;
  } else {
    attr = fromNode.attributes;
  }

  for (; i < attr.length; i++){
    this.node.setAttribute(attr[i].nodeName, attr[i].nodeValue);
  }

  return this;
};
