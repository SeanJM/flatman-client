function appendChildEach(element, child, childNodes, f) {
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

function appendChild(element, children) {
  var f = document.createDocumentFragment();
  var childNodes = [];

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      appendChildEach(element, children[i], childNodes, f);
    }
  } else {
    appendChildEach(element, children, childNodes, f);
  }

  element.node.appendChild(f);

  for (var i = 0, n = childNodes.length; i < n; i++) {
    mount(childNodes[i]);
  }
}
