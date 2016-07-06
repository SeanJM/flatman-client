/*
  The first argument is always the node which is being checked
*/

function hasParent(node) {
  var n;
  var parents;
  var i = 1;

  node = node instanceof CreateNode
    ? node.node
    : node;

  if (isArray(arguments[1])) {
    parents = arguments[1];
  } else {
    parents = [];
    for (i = 1, n = arguments.length; i < n; i++) {
      parents.push(arguments[i]);
    }
  }

  i = 0;
  n = parents.length;

  for (; i < n; i++) {
    if (parents[i].contains(node)) {
      return true;
    }
  }

  return false;
}
