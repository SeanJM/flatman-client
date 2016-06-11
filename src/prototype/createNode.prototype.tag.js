CreateNode.prototype.tag = function (name) {
  var clone;

  if (typeof name === 'undefined') {
    return this.node.tagName.toLowerCase();
  }

  clone = new CreateNode(name);
  clone.text(this.node.innerHTML);
  clone.copyAttributes(this.node);
  this.replaceWith(clone);
  this.node = clone.node;

  return clone;
};
