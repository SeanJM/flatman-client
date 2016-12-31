function getNode(x) {
  if (isElement(x)) {
    return x;
  } else if (x instanceof Node) {
    return x.node;
  } else if (typeof x === 'string' || isNumber(x)) {
    return new Text(x);
  } else if (
    x
    && x.node
    && x.node.document
  ) {
    return getNode(x.node.document);
  }
  return false;
}
