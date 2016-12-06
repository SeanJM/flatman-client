function el(tagName) {
  var i = 1;
  var n = arguments.length;

  var opt = {};
  var children = [];

  for (; i < n; i++) {
    if (Array.isArray(arguments[i])) {
      children = arguments[i];
    } else if (typeof arguments[i] === 'object') {
      opt = arguments[i];
    } else {
      throw new Error('Invaild argument of type: \'' + typeof arguments[i] + '\'');
    }
  }

  // Faster way to apply arguments
  // Guards against the [ OBJECT ] element which is a function and an HTML element
  if (!isElement(tagName) && typeof tagName === 'function') {
    return createComponent(tagName, opt, children);
  } else if (typeof tagName === 'string') {
    // Check for the possibility that they are passing a constructor as a string
    if (
      typeof tagName === 'string'
      && tagName[0] === tagName[0].toUpperCase()
      && tagName[1] === tagName[1].toLowerCase()
    ) {
      throw 'Invalid tag name: "' + tagName + '", it looks like you are passing a constructor name as a string.';
    }
    return new CreateNode(tagName, opt, children);
  } else if (isElement(tagName)) {
    return new CreateNode(tagName, opt, children);
  } else {
    throw new Error('The first argument for "el" must be either a Component or a valid HTML tag name. eg: el("div")');
  }
}
