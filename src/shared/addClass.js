function addClass (node, a) {
  var className = filter(map(node.className.split(' '), trim), hasLength);
  var i;

  i = className.indexOf(a);

  if (i === -1) {
    className.push(a);
    className.sort();
    node.className = className.join(' ');
  }
}
