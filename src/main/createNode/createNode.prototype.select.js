CreateNode.prototype.select = function (start, end) {
  if (
    typeof start === 'undefined'
    && typeof end === 'undefined'
  ) {
    return getSelection(this.node);
  }

  if (start < 0) {
    start = this.node.value.length + start;
  }

  if (end < 0) {
    end = this.node.value.length + end;
  }

  if (typeof end === 'undefined') {
    end = start;
  }

  this.node.focus();

  setSelection(this.node, start, end);

  return this;
};
