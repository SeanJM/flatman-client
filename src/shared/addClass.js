function addClass (node, a) {
  var className = filter(map(node.className.split(' '), trim), hasLength);
  var i = className.indexOf(a);

  if (i === -1) {
    className.push(a);
    node.className = className.join(' ');
  }
}
