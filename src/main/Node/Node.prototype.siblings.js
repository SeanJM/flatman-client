Node.prototype.siblings = function () {
  var p = this.parentNode;
  return p ? p.childNodes : [];
};
