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

  if (document.body.contains(node)) {
    i = 0;
    n = children.length;
    e = new Event('mount');

    for (; i < n; i++) {
      children[i].dispatchEvent(e);
    }
  }
}
