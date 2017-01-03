function hasParent(node) {
  var i = 1;
  var n = arguments.length;
  var $arguments = [];
  var parents = [];
  var parent = getNode(node.parentNode);
  var selectorMap = [];

  while (parent) {
    parents.push(parent);
    parent = getNode(parent.parentNode);
  }

  // First check for elements in the array
  for (; i < n; i++) {
    $arguments = $arguments.concat(arguments[i]);
  }

  i = 0;
  n = $arguments.length;
  for (; i < n; i++) {
    if (parents.indexOf(getNode($arguments[i])) > -1) {
      return true;
    }
  }

  return false;
}
