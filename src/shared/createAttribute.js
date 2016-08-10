function createAttribute(node, a, b) {
  var attr = document.createAttribute(a);
  attr.value = b;
  node.setAttributeNode(attr);
}
