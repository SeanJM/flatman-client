Node.prototype.after = function (children) {
  var sib = this.siblings();
  var index = sib.indexOf(this);
  console.log(sib, index, this);
  if (index < sib.length - 1) {
    sib[index + 1].before(children);
  } else {
    appendChild(this.getNode().parentNode, children);
  }
};
