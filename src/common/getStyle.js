function getStyle(node, a) {
  var computedStyle = window.getComputedStyle(node);
  if (a) {
    return computedStyle[a];
  }
  return computedStyle;
}
