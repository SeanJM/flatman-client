CreateNode.prototype.select = function (start, end) {
  if (typeof start === 'undefined' && typeof end === 'undefined') {
    return getSelection(this.node);
  }

  if (start === -1 && typeof end === 'undefined') {
    start = this.node.value.length;
    end = this.node.value.length;
  }

  if (typeof end === 'undefined' || end === -1) {
    end = this.node.value.length;
  }

  this.node.focus();
  setSelection(this.node, start, end);
};
