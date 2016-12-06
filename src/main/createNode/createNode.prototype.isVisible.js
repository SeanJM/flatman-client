CreateNode.prototype.isVisible = function () {
  var maxLeft = window.innerWidth;
  var parents;

  function isVisible(node) {
    var rect = node.offset();
    var style = node.style();
    if (rect.right < 0) {
      return false;
    } else if (rect.left > maxLeft) {
      return false;
    } else if (rect.bottom < 0) {
      return false;
    } else if (style.display === 'none') {
      return false;
    } else if (style.visibility === 'hidden') {
      return false;
    } else if (style.overflow === 'hidden') {
      if (rect.height === 0 || rect.width === 0) {
        return false;
      }
      return true;
    }
    return true;
  }

  if (isVisible(this)) {
    parents = this.parents();
    var i = 0;
    var n = parents.length;
    for (; i < n; i++) {
      if (!isVisible(parents[i])) {
        return false;
      }
    }
    return true;
  }

  return false;
};
