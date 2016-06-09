function setAttributes (node, opt) {
  var className;
  for (var k in opt) {
    if (k === 'class') {
      className = filter(map(opt[k].split(' '), trim), hasLength).sort();
      node.className = className.join(' ');
    } else if (k === 'text') {
      node.innerHTML = opt[k];
    } else if (k === 'style') {
      node.setAttribute(k, toStyleString(opt[k]));
    } else {
      node.setAttribute(k, opt[k]);
    }
  }
}
