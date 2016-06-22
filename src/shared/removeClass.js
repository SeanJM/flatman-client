function removeClass (node, a) {
  node.className = filter(map(node.className.split(' '), trim), function (b) {
    return hasLength(b) && not(a, b);
  }).sort().join(' ');
}
