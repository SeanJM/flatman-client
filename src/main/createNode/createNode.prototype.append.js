CreateNode.prototype.append = function (array) {
  if (Array.isArray(array)) {
    appendChild(this.node, array);
  } else if (arguments.length === 1) {
    appendChild(this.node, array);
  } else {
    throw 'Invalid argument type (' + typeof array + ') for .append';
  }
  return this;
};
