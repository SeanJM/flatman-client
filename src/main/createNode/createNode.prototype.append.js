CreateNode.prototype.append = function (array) {
  if (Array.isArray(array)) {
    appendChild(this.node, array);
  } else if (arguments.length === 1) {
    appendChild(this.node, array);
  } else if (arguments.length > 1) {
    throw 'You have too many arguments (' + arguments.length + ') for \'.append\', it takes an array or a single element.';
  } else {
    throw 'Invalid argument type (' + typeof array + ') for .append';
  }
  return this;
};
