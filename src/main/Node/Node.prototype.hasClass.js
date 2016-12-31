Node.prototype.hasClass = function (a) {
  return this.className().split(' ').indexOf(a) !== -1;
};
