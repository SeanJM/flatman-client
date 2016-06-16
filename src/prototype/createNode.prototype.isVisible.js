CreateNode.prototype.isVisible = function () {
  var parents = this.parents();
  var n = parents.length;
  var i = 0;

  function isVisible(node) {
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

  // Check parents for visibility
  if (isVisible(this.node)) {
    for (; i < n; i++) {
      if (!isVisible(parents[i].node)) {
        return false;
      }
    }
    return true;
  }
  return false;
};
