function getAttributes(node) {
  var attr = node.attributes;
  var res = {};

  for (var i = 0, n = attr.length; i < n; i++) {
    res[attr[i].nodeName] = attr[i].nodeValue;
  }

  return res;
}
