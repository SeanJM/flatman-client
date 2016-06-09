CreateNode.prototype.select = function (start, end) {
  if (typeof start === 'undefined' && typeof end === 'undefined') {
    return getSelection(this._node_);
  }

  if (start === -1 && typeof end === 'undefined') {
    start = this._node_.value.length;
    end = this._node_.value.length;
  }

  if (typeof end === 'undefined' || end === -1) {
    end = this._node_.value.length;
  }

  this._node_.focus();
  setSelection(this._node_, start, end);
};
