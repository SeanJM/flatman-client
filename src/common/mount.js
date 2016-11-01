function mount(node) {
  var children = node.childNodes;
  var i = 0;
  var n = children.length;
  var e = new Event('mount');

  function each(child) {
    if (MOUNTED.indexOf(child) === -1) {
      child.dispatchEvent(e);
      [].forEach.call(child.childNodes, each);
      MOUNTED.push(child);
    }
  }

  if (document.body.contains(node)) {
    for (; i < n; i++) {
      each(children[i]);
    }
  }
}
