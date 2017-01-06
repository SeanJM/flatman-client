function appendChild(element, children) {
  var f = document.createDocumentFragment();
  if (children.length) {
    children.forEach(function (child) {
      child.parentNode = element;
      f.appendChild(getNode(child));
    });

    getNode(element).appendChild(f);
    [].push.apply(element.childNodes, children);

    children.forEach(mount);
  }
}
