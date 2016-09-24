/*
  The first argument is always the node which is being checked
*/

function hasParent(node) {
  var parents = [];
  var i = 1;
  var n = arguments.length;

  node = node instanceof CreateNode
    ? node.node
    : node;

  for (; i < n; i++) {
    if (Array.isArray(arguments[i])) {
      [].push.apply(parents, arguments[i]);
    } else {
      parents.push(arguments[i]);
    }
  }

  i = 0;
  n = parents.length;

  for (; i < n; i++) {
    if (parents[i] && parents[i].contains(node)) {
      return true;
    }
  }

  return false;
}
