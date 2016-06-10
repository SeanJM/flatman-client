function addClasses (node) {
  var i = 1;
  var n = arguments.length;

  for (; i < n; i++) {
    addClass(node, arguments[i]);
  }
}
