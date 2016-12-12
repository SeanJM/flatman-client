function addClass(name, node) {
  function curry(node) {
    var className = node.getAttribute('class') || '';
    var i;

    if (Array.isArray(name)) {
      name.forEach(partial(addClass, node));
    } else {
      className = className.split(' ').map(trim).filter(hasLength);
      i = className.indexOf(name);

      if (i === -1) {
        className.push(name);
        className.sort();
        node.setAttribute('class', className.join(' '));
      }
    }
  }

  if (arguments.length === 2) {
    return curry(node);
  } else if (arguments.length === 1) {
    return curry;
  } else {
    throw new Error('Invalid number of arguments for \"addClass\"');
  }
}
