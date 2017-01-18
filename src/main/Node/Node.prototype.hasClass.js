Node.prototype.hasClass = function (a) {
  var classList = this.classList();

  if (Array.isArray(a)) {
    for (var i = 0, n = a.length; i < n; i++) {
      if (classList.indexOf(a[i]) === -1) {
        return false;
      }
    }

    return true;
  }

  return classList.indexOf(a) !== -1;
};
