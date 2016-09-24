function removeClass (node, a) {
  var className = node.getAttribute('class') || '';

  if (Array.isArray(a)) {
    a.forEach(partial(removeClass, node));
  } else {
    className = className.split(' ')
      .map(trim)
      .filter(
        function (b) {
          return hasLength(b) && not(a, b);
        }
      )
      .sort()
      .join(' ');

    node.setAttribute('class', className);
  }
}
