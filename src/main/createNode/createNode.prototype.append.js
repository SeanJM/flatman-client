CreateNode.prototype.append = function (array) {
  if (arguments.length > 1) {
    throw 'You have too many arguments (' + arguments.length + ') for \'.append\', it takes a single array.';
  } else if (Array.isArray(array)) {
    appendChild(this.node, array);
  } else {
    throw 'Invalid argument type (' + typeof array + ') for .append';
  }
  return this;
};
