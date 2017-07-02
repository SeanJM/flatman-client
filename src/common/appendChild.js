function appendChild(element, children) {
  var f = document.createDocumentFragment();
  var childNodes = [];

  function eachChild(child) {
    if (child) {
      childNodes.push(child);
      element.childNodes.push(child);

      if (child.node) {
        child.parentNode = element;
        f.appendChild(child.node);
      } else {
        f.appendChild(new Text(child));
      }
    }
  }

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      eachChild(children[i]);
    }
  } else {
    eachChild(children);
  }

  element.node.appendChild(f);
  childNodes.forEach(mount);
}
