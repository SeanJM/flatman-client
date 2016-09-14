function addClass (node, a) {
  var className = node.getAttribute('class') || '';
  var i;

  if (isArray(a)) {
    forEach(a, partial(addClass, node));
  } else {
    className = filter(map(className.split(' '), trim), hasLength);
    i = className.indexOf(a);

    if (i === -1) {
      className.push(a);
      className.sort();
      node.setAttribute('class', className.join(' '));
    }
  }
}
