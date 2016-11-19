function createComponent(constructor) {
  var i = 1;
  var n = arguments.length;

  var hasAppend = typeof constructor.prototype.append === 'function';
  var hasText = typeof constructor.prototype.text === 'function';

  // Pass the objec to the constructor if it exists
  var component;

  var children = [];
  var strings = [];
  var init = [];

  var opt = {};
  var k;

  for (; i < n; i++) {
    if (Array.isArray(arguments[i])) {
      arguments[i].forEach(function (child) {
        if (typeof child === 'string' || typeof child === 'number') {
          strings.push(child);
        } else {
          children.push(child);
        }
      });
    } else if (typeof arguments[i] === 'object') {
      opt = arguments[i];
    } else {
      throw 'Invalid argument for createComponent, acceptable types are an {object} for Component options, and an array for children. You passed an argument of type \'' + typeof arguments[i] + '\'';
    }
  }

  component = new constructor(opt);

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

  if (children.length) {
    component.append(children);
  }

  if (strings.length) {
    component.text(strings);
  }

  return component;
}
