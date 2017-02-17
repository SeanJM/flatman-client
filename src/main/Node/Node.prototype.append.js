Node.prototype.append = function (children) {
  if (arguments.length > 1) {
    throw 'You have too many arguments (' + arguments.length + ') for \'.append\', it takes a node or an array of nodes.';
  } else {
    appendChild(this, children);
  }
  return this;
};
