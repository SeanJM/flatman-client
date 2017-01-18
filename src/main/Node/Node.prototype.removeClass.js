Node.prototype.removeClass = function (a) {
  var classList = this.classList();

  if (Array.isArray(a)) {
    a.forEach(function (b) {
      classList.splice(classList.indexOf(b), 1);
    });
  } else {
    classList.splice(classList.indexOf(a), 1);
  }

  this.node.className = classList.join(' ');
  return this;
};