function appendChild(node) {
  var i = 1;
  var n = arguments.length;
  var f = new DocumentFragment();

  for (; i < n; i++) {
    f.appendChild(getNode(arguments[i]));
  }

  getNode(node).appendChild(f);
}
