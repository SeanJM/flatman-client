function isVisible() {
  var windowWidth = window.innerWidth;
  var windowTop = window.pageYOffset;
  var html = document.getElementsByTagName('html')[0];

  function is(node) {
    var css = window.getComputedStyle(node);
    var rect = node.getBoundingClientRect();
    return ((
      rect.left + rect.width > 0
        && rect.left < windowWidth
        && rect.top + rect.height + windowTop > 0
    ) && (
      rect.width > 0
        && rect.height > 0
    ) && (
      css.visibility !== 'none'
        && css.display !== 'none'
    ));
  }

  function isDeep(element) {
    var n;
    var i;
    var parent;

    var node = element instanceof CreateNode
      ? element.node
      : element;

    // Check parents for visibility
    if (!is(node)) {
      return false;
    } else {
      parent = node.parentNode;
      while (parent && parent !== html) {
        if (!is(parent)) {
          return false;
        }
        parent = parent.parentNode;
      }
    }
    return true;
  }

  for (var i = 0, n = arguments.length; i < n; i++) {
    if (!isDeep(arguments[i])) {
      return false;
    }
  }
  return true;
}
