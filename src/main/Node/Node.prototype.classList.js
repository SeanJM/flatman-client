Node.prototype.classList = function () {
  var className = (this.node.getAttribute('class') || '').split(' ');
  var classList = [];
  var temp;

  for (var i = 0, n = className.length; i < n; i++) {
    temp = className[i].trim();
    if (temp) {
      classList.push(temp);
    }
  }

  return classList;
};
