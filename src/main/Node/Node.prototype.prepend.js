Node.prototype.prepend = function (children) {
  this.children()[0].before(children)
};
