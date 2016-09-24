function addClass (node, a) {
  var className = node.getAttribute('class') || '';
  var i;

  if (Array.isArray(a)) {
    a.forEach(partial(addClass, node));
  } else {
    className = className.split(' ').map(trim).filter(hasLength);
    i = className.indexOf(a);

    if (i === -1) {
      className.push(a);
      className.sort();
      node.setAttribute('class', className.join(' '));
    }
  }
}
