function removeClass (node, a) {
  if (isArray(a)) {
    forEach(a, partial(removeClass, node));
  } else {
    node.className = filter(map(node.className.split(' '), trim), function (b) {
      return hasLength(b) && not(a, b);
    }).sort().join(' ');
  }
}
