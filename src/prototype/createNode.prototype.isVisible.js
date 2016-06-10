CreateNode.prototype.isVisible = function () {
  var css = window.getComputedStyle(this.node);
  var rect = this.node.getBoundingClientRect();
  var offLeft = rect.left + rect.width < 0;
  var offRight = rect.left > window.innerWidth;
  var offTop = rect.top + rect.bottom + window.pageYOffset < 0;
  var offCanvas = offLeft || offRight || offTop;
  var zeroWH = !rect.width || !rect.height && css.overflow === 'hidden';
  var invisible = css.visibility === 'none' || css.display === 'none';

  return !(offCanvas || zeroWH || invisible);
};
