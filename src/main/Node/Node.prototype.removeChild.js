Node.prototype.removeChild = function (a) {
  if (Array.isArray(a)) {
    a.forEach(function (a) { a.remove(); });
  } else {
    a.remove();
  }
  return this;
};
