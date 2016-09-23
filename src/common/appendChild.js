function appendChild(node) {
  var i = 1;
  var n = arguments.length;
  var f = new DocumentFragment();

  function append(a) {
    appendChild(f, a);
  }

  node = node instanceof CreateNode
    ? node.node
    : node;

  for (; i < n; i++) {
    if (typeof arguments[i] === 'string') {
      f.appendChild(new Text(arguments[i]));
    } else if (arguments[i] instanceof CreateNode) {
      f.appendChild(arguments[i].node);
    } else if (arguments[i]
      && arguments[i].node
      && arguments[i].node.document instanceof CreateNode
    ) {
      f.appendChild(arguments[i].node.document.node)
    } else if (isArray(arguments[i])) {
      forEach(arguments[i], append);
    } else if (isElement(arguments[i])) {
      f.appendChild(arguments[i]);
    }
  }

  node.appendChild(f);
}
