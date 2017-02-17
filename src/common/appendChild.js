function appendChild(element, children) {
  var f = document.createDocumentFragment();
  var childNodes = [];
  var childrenByNode = [];

  function eachChild(child, i) {
    if (child) {
      childrenByNode[i] = child.getNode
        ? child.getNode()
        : child;

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

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      eachChild(children[i], i);
    }
  } else {
    eachChild(children, 0);
  }

  element.node.appendChild(f);
  childNodes.forEach(mount);
}
