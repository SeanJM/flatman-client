function createComponent() {
  var i = 1;
  var n = arguments.length;

  var hasAppend = typeof arguments[0].prototype.append === 'function';
  var hasText = typeof arguments[0].prototype.text === 'function';

  // Pass the objec to the constructor if it exists
  var component;

  var children = [];
  var strings = [];
  var init = [];

  var opt = {};
  var k;

  for (; i < n; i++) {
    if (
      isComponent(arguments[i])
      || arguments[i] instanceof CreateNode
    ) {
      if (hasAppend) {
        if (typeof arguments[i].appendTo === 'function') {
          children.push(arguments[i]);
        } else {
          throw '"' + (arguments[i].constructor.name || 'Anonymous component') + '" does not have an "appendTo" method';
        }
      } else {
        throw '"' + (arguments[0].name || 'Anonymous component') + '" does not have an "append" method';
      }
    } else if (typeof arguments[i] === 'string' || typeof arguments[i] === 'number') {
      if (!hasText) {
        throw 'Invalid argument "' + arguments[i] + '", component "' + arguments[0].name + '" does not have a "text" method.';
      }
      strings.push(arguments[i]);
    } else if (typeof arguments[i] === 'object') {
      for (k in arguments[i]) {
        opt[k] = arguments[i][k];
      }
    }
  }

  component = new arguments[0](opt);

  // Check for an 'on' method
  for (k in opt) {
    if (k.slice(0, 2) === 'on') {
      if (typeof component.on === 'function') {
        component.on(k.substr(2).toLowerCase(), opt[k]);
      } else {
        throw 'Invalid constructor \'' + arguments[0].name + '\', your constructor must have an "on" method.';
      }
    } else if (k === 'class') {
      // Check for a class property, and it exists, add the class to the component
      if (typeof component.addClass === 'function') {
        component.addClass(opt[k]);
      }
    } else if (k === 'init') {
      init = opt[k];
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
    component.append.apply(component, children);
  }

  if (strings.length) {
    component.text.apply(component, strings);
  }

  if (init.length) {
    for (i = 0, n = init.length; i < n; i++) {
      component[init[i]]();
    }
  }

  return component;
}
