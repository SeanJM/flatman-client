function appendChild (node) {
  var i = 1;
  var n = arguments.length;

  function append(a) {
    appendChild(node, a);
  }

  node = node instanceof CreateNode
    ? node.node
    : node;

  for (; i < n; i++) {
    if (typeof arguments[i] === 'string') {
      node.innerHTML = arguments[i];
    } else if (arguments[i] instanceof CreateNode) {
      node.appendChild(arguments[i].node);
    } else if (!!arguments[i] && typeof arguments[i].appendTo === 'function') {
      arguments[i].appendTo(node);
    } else if (isArray(arguments[i])) {
      forEach(arguments[i], append);
    } else if (isElement(arguments[i])) {
      node.appendChild(arguments[i]);
    }
  }
}
