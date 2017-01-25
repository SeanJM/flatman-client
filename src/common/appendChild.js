function appendChild(element, children) {
  var f = document.createDocumentFragment();
  var childNodes = [];

  for (var i = 0, n = children.length; i < n; i++) {
    if (children[i]) {
      children[i] = children[i].getNode
        ? children[i].getNode()
        : children[i];

      childNodes.push(children[i]);
      element.childNodes.push(children[i]);

      if (children[i].node) {
        children[i].parentNode = element;
        f.appendChild(children[i].node);
      } else {
        f.appendChild(new Text(children[i]));
      }
    }
  }

  element.node.appendChild(f);
  childNodes.forEach(mount);
}
