function appendChild(node) {
  var children = [];
  var i = 1;
  var n = arguments.length;
  var f = document.createDocumentFragment();
  var temp;
  var e;

  node = getNode(node);

  for (; i < n; i++) {
    temp = getNode(arguments[i]);
    f.appendChild(temp);
    children.push(temp);
  }

  node.appendChild(f);
  mount(node);
}
