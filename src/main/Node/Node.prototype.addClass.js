Node.prototype.addClass = function (className) {
  var classList = this.classList();

  function addClass(a) {
    if (classList.indexOf(a) === -1) {
      classList.push(a);
    }
  }

  if (Array.isArray(className)) {
    className.forEach(addClass);
  } else {
    addClass(className);
  }

  this.node.setAttribute("class", classList.sort().join(' '));
  return this;
};
