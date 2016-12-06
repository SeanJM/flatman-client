function appendChild(node, children) {
  var f = document.createDocumentFragment();
  if (children.length) {
    node = getNode(node);

    for (var i = 0, n = children.length; i < n; i++) {
      f.appendChild(getNode(children[i]));
    }

    node.appendChild(f);
    mount(node);
  }
}
