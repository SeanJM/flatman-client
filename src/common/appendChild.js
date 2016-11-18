function appendChild(node, children) {
  var f = document.createDocumentFragment();
  node = getNode(node);

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      f.appendChild(getNode(children[i]));
    }
  } else {
    f.appendChild(getNode(children));
  }

  node.appendChild(f);
  mount(node);
}
