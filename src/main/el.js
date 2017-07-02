function el(tagName) {
  var props = {};
  var children = [];

  if (Array.isArray(arguments[1])) {
    children = arguments[1];
  } else {
    props = arguments[1];
    children = arguments[2] || children;
  }

  if (Component.function[tagName]) {
    return Component.function[tagName](props, children);
  } else if (Component.lib[tagName]) {
    return createComponent(tagName, props, children);
  } else if (typeof tagName === 'string') {
    return new Node(tagName, props, children);
  } else if (isElement(tagName)) {
    return new Node(tagName, props, children, true);
  } else {
    throw new Error('The first argument for "el" must be either a Component or a valid HTML tag name. eg: el("div")');
  }
}
