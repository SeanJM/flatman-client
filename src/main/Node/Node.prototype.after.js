Node.prototype.after = function (children) {
  var sib = this.siblings();
  var index = sib.indexOf(this);
  if (index < sib.length - 1) {
    sib[index + 1].before(children);
  } else {
    appendChild(this.node.parentNode, children);
  }
};
