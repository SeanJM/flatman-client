Node.prototype.addClass = function (className) {
  var classList = this.classList();

  if (Array.isArray(className)) {
    for (var i = 0, n = className.length; i < n; i++) {
      if (classList.indexOf(className[i]) === -1) {
        classList.push(className[i]);
      }
    }
  } else {
    if (classList.indexOf(className) === -1) {
      classList.push(className);
    }
  }

  classList.sort();
  this.node.className = classList.join(' ');

  return this;
};
