function addClasses (node) {
  var i = 1;
  var n = arguments.length;
  var a;

  for (; i < n; i++) {
    a = trim(arguments[i]);
    if (hasLength(a)) {
      addClass(node, a);
    }
  }
}
