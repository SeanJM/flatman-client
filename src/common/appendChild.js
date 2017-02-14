function appendChild(element, children) {
  var f = document.createDocumentFragment();
  var childNodes = [];
  var childrenByNode = [];

  for (var i = 0, n = children.length; i < n; i++) {
    if (children[i]) {
      childrenByNode[i] = children[i].getNode
        ? children[i].getNode()
        : children[i];

      childNodes.push(childrenByNode[i]);
      element.childNodes.push(childrenByNode[i]);

      if (childrenByNode[i].node) {
        childrenByNode[i].parentNode = element;
        f.appendChild(childrenByNode[i].node);
      } else {
        f.appendChild(new Text(childrenByNode[i]));
      }
    }
  }

  element.node.appendChild(f);
  childNodes.forEach(mount);
}
