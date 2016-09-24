function getNode(x) {
  if (isElement(x)) {
    return x;
  } else if (x instanceof CreateNode) {
    return x.node;
  } else if (typeof x === 'string' || isNumber(x)) {
    return new Text(x);
  } else if (
    x
    && x.node
    && x.node.document instanceof CreateNode
  ) {
    return x.node.document.node;
  }
  return false;
}
