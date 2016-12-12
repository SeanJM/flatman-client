function addClass(a, b) {
  var node = isElement(a) ? el.getNode(a) : el.getNode(b);
  var string = typeof a === 'string' ? a : b;
  var className = node.getAttribute('class') || '';
  var classList = className.split(' ').map(trim).filter(hasLength);
  var i = classList.indexOf(string);

  if (i === -1) {
    classList.push(string);
    classList.sort();
    node.setAttribute('class', classList.join(' '));
  }
}
