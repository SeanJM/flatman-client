CreateNode.prototype.tag = function (name) {
  var clone;

  if (typeof name === 'undefined') {
    return this._node_.tagName;
  }

  clone = new CreateNode(name);
  clone.text(this._node_.innerHTML);
  clone.copyAttributes(this._node_);

  this.replaceWith(clone);

  return this;
};
