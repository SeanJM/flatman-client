function appendChild(element, children) {
  var f = document.createDocumentFragment();

  var childNodes = children.map(function (child) {
    return child.getNode
      ? child.getNode()
      : child;
  });

  childNodes.forEach(function (child) {
    if (child.node) { child.parentNode = element; }
    f.appendChild(child.node ? child.node : new Text(child));
  });

  element.childNodes = element.childNodes.concat(childNodes);
  element.node.appendChild(f);
  childNodes.forEach(mount);
}
