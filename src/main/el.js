function el(tagName) {
  var i = 1;
  var n = arguments.length;

  var opt = {};
  var children = [];

  switch (arguments.length) {
    case 2 :
      if (Array.isArray(arguments[1])) {
        children = arguments[1];
      } else {
        opt = arguments[1];
      }
      break;
    case 3 :
      opt = arguments[1];
      children = arguments[2];
      break;
  }

  if (Component.lib[tagName]) {
    return createComponent(tagName, opt, children);
  } else if (typeof tagName === 'string') {
    return new Node(tagName, opt, children);
  } else if (isElement(tagName)) {
    return new Node(tagName, opt, children, true);
  } else {
    throw new Error('The first argument for "el" must be either a Component or a valid HTML tag name. eg: el("div")');
  }
}
