CreateNode.prototype.style = function (name, value) {
  var node = this._node_;

  if (typeof value === 'undefined' && this._dimensions_.hasOwnProperty(name)) {
    this._dimensions_ = node.getBoundingClientRect();
    this._dimensions_.right = this._dimensions_.left + this._dimensions_.width;
    this._dimensions_.bottom = this._dimensions_.top + this._dimensions_.height;
    return this._dimensions_[name];
  } else if (typeof value === 'undefined') {
    return window.getComputedStyle(node)[name];
  }

  if (typeof VENDOR_PREFIX[name] === 'string') {
    name = VENDOR_PREFIX[name];
  }

  if (TO_PIXEL.indexOf(name) !== -1 && !isNaN(Number(value))) {
    node.style[name] = value.toString().substr(-2) === 'px' ? value : value + 'px';
  } else {
    node.style[name] = value;
  }

  if (this._dimensions_.hasOwnProperty(name)) {
    if (typeof value === 'number') {
      this._dimensions_[name] = value;
      value = value + 'px';
    } else {
      this._dimensions_[name] = parseInt(value, 10);
    }
    node.style[name] = value;
  }
};
