CreateNode.prototype.centerTo = function (targetNode) {
  var nodeRect = this._node_.getBoundingClientRect();
  var width = nodeRect.width;
  var height = nodeRect.height;
  var targetIsParent;
  var targetRect = {};

  if (targetNode === window) {
    targetRect.width = window.innerWidth;
    targetRect.height = window.innerHeight;
    targetIsParent = true;
  } else if (targetNode instanceof CreateNode) {
    targetRect = targetNode._node_.getBoundingClientRect();
    targetIsParent = targetNode._node_.contains(this._node_);
  } else {
    targetRect = targetNode.getBoundingClientRect();
    targetIsParent = targetNode.contains(this._node_);
  }

  if (targetIsParent) {
    this.style('left', (targetRect.width / 2) - (width / 2));
    this.style('top', (targetRect.height / 2) - (height / 2));
  } else {
    this.style('left', targetRect.left + (targetRect.width / 2) - (width / 2));
    this.style('top', window.pageYOffset + targetRect.top + (targetRect.height / 2) - (height / 2));
  }

  return this;
};
