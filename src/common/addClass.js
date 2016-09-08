function addClass (node, a) {
  var className;
  var i;

  if (isArray(a)) {
    forEach(a, partial(addClass, node));
  } else {
    className = filter(map(node.className.split(' '), trim), hasLength);
    i = className.indexOf(a);

    if (i === -1) {
      className.push(a);
      className.sort();
      node.className = className.join(' ');
    }
  }
}
