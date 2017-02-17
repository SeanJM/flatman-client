Node.prototype.appendTo = function (target) {
  if (isElement(target)) {
    appendChild(el(target), this);
  } else {
    appendChild(target, this);
  }
  return this;
};
