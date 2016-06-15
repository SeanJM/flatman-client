CreateNode.prototype.text = function (value) {
  if (isDefined(value)) {
    this.node.innerHTML = value;
  } else {
    return trim(this.node.innerHTML.replace(/<[^>]+?>/g, '')).replace(/\s+/g, ' ');
  }

  return this;
};
