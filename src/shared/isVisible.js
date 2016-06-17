function isVisible() {
  function is(node) {
    var css = window.getComputedStyle(node);
    var rect = node.getBoundingClientRect();
    return ((
      rect.left + rect.width > 0 &&
      rect.left < window.innerWidth &&
      rect.top + rect.height + window.pageYOffset > 0
    ) && (
      rect.width > 0 &&
      rect.height > 0
    ) && (
      css.overflow !== 'hidden' &&
      css.visibility !== 'none' &&
      css.display !== 'none'
    ));
  }

  function check(element) {
    var parents = element.parents();
    var n = parents.length;
    var i = 0;

    // Check parents for visibility
    if (is(element.node)) {
      for (; i < n; i++) {
        if (!is(parents[i].node)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  for (var i = 0, n = arguments.length; i < n; i++) {
    if (!is(arguments[i])) {
      return false;
    }
  }
  return true;
}
