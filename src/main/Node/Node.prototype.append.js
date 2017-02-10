Node.prototype.append = function (array) {
  if (arguments.length > 1) {
    throw 'You have too many arguments (' + arguments.length + ') for \'.append\', it takes a node or an array of nodes.';
  } else if (Array.isArray(array)) {
    appendChild(this, array);
  } else {
    appendChild(this, [ array ]);
  }
  return this;
};
