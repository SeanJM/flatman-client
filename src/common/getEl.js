function getEl(x) {
  if (isCreateNode(x)) {
    return x;
  } else if (x.node && x.node.document) {
    if (isCreateNode(x.node.document)) {
      return x.node.document;
    } else {
      return getEl(x.node.document);
    }
  }
  return false;
}
