Node.prototype.removeClass = function (a) {
  var classList = this.classList();

  function filter(b) {
    return b !== a;
  }

  if (Array.isArray(a)) {
    a.forEach(function (b) {
      classList = classList.filter(filter);
    });
  } else {
    classList = classList.filter(filter);
  }

  this.node.className = classList.join(' ');
  return this;
};