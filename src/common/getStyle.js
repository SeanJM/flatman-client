function getStyle(node, a) {
  var computedStyle = window.getComputedStyle(node);
  var value;
  if (a) {
    value = computedStyle[a];
    if (value.slice(-2) === 'px') {
      return Number(value.slice(0, -2));
    }
    return computedStyle[a];
  }
  return computedStyle;
}
