function appendChild(element, children) {
  var f = document.createDocumentFragment();
  var node = getNode(element);

  if (children.length) {
    children.forEach(function (child) {
      child.parentNode = element;
      f.appendChild(getNode(child));
    });

    node.appendChild(f);
    [].push.apply(element.childNodes, children);
    mount(element);
  }
}
