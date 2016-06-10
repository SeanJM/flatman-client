function removeClass (node, a) {
  a = a.replace(/\{\{prefix}}/g, CLASS_PREFIX);
  node.className = filter(map(node.className.split(' '), trim), function (b) {
    return hasLength(b) && not(a, b);
  }).sort().join(' ');
}
