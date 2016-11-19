function createComponent(constructor, opt, array) {
  var i = 1;
  var n = arguments.length;
  var k;

  var hasAppend = typeof constructor.prototype.append === 'function';
  var hasText = typeof constructor.prototype.text === 'function';
  var children = [];
  var strings = [];

  // Pass the objec to the constructor if it exists
  var component = new constructor(opt);

  if (hasText) {
    array.forEach(function (child) {
      if (typeof child === 'string' || typeof child === 'number') {
        strings.push(child);
      } else {
        children.push(child);
      }
    });
  } else {
    children = array;
  }

  // Check for an 'on' method
  for (k in opt) {
    if (k.slice(0, 4) === 'once') {
      if (typeof component.once === 'function') {
        component.once(k.substr(4).toLowerCase(), opt[k]);
      } else {
        throw 'Invalid constructor \'' + constructor.name + '\', your component must have a "once" method.';
      }
    } else if (k.slice(0, 2) === 'on') {
      if (typeof component.on === 'function') {
        component.on(k.substr(2).toLowerCase(), opt[k]);
      } else {
        throw 'Invalid constructor \'' + constructor.name + '\', your component must have an "on" method.';
      }
    } else if (k === 'class') {
      // Check for a class property, and it exists, add the class to the component
      if (typeof component.addClass === 'function') {
        component.addClass(opt[k]);
      }
    } else if (
      typeof component[k] === 'function'
    ) {
      component[k](opt[k]);
    } else if (typeof component[k] === 'undefined') {
      // Pass the value of 'opt' to 'this'
      component[k] = opt[k];
    }
  }

  if (children.length && hasAppend) {
    component.append(children);
  } else if (component.node && component.node.document) {
    component.node.document.append(children);
  } else {
    throw new Error('Invalid component \'' + constructor.name + '\' does not have an append method, or a ' + constructor.name + '.node.document');
  }

  if (strings.length) {
    component.text.apply(component, strings);
  }

  return component;
}
