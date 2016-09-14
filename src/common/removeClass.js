function removeClass (node, a) {
  var className = node.getAttribute('class') || '';

  if (isArray(a)) {
    forEach(a, partial(removeClass, node));
  } else {
    className = filter(
      map(className.split(' '), trim),
        function (b) {
          return hasLength(b) && not(a, b);
        }
      )
      .sort()
      .join(' ');

    node.setAttribute('class', className);
  }
}
