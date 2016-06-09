function setStyle(node, name, value) {
  if (typeof VENDOR_PREFIX[name] === 'string') {
    name = VENDOR_PREFIX[name];
  }

  if (TO_PIXEL.indexOf(name) !== -1 && !isNaN(Number(value))) {
    node.style[name] = value.toString().substr(-2) === 'px' ? value : value + 'px';
  } else {
    node.style[name] = value;
  }
}
