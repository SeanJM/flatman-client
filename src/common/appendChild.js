function appendChild(node) {
  var children = [];
  var i = 1;
  var n = arguments.length;
  var f = document.createDocumentFragment();
  var temp;
  var e;

  function mount(node) {
    if (MOUNTED.indexOf(node) === -1) {
      node.dispatchEvent(e);
      [].forEach.call(node.childNodes, mount);
      MOUNTED.push(node);
    }
  }

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
      mount(children[i]);
    }
  }
}
