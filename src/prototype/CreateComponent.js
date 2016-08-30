function createComponent() {
  var i = 1;
  var n = arguments.length;

  var hasAppend = typeof arguments[0].prototype.append === 'function';
  var hasText = typeof arguments[0].prototype.text === 'function';

  // Pass the objec to the constructor if it exists
  var component = new arguments[0](
    typeof arguments[1] === 'object'
      ? arguments[1]
      : undefined
  );

  var children = [];
  var strings = [];

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
        throw '"' + (component.constructor.name || 'Anonymous component') + '" does not have an "append" method';
      }
    } else if (typeof arguments[i] === 'string') {
      if (!hasText) {
        throw 'Invalid argument "' + arguments[i] + '", component "' + component.constructor.name + '" does not have a "text" method.';
      }
      strings.push(arguments[i]);
    } else if (typeof arguments[i] === 'object') {
      for (var k in arguments[i]) {
        // Check for an 'on' method
        if (
          k.slice(0, 2) === 'on'
        ) {
          if (typeof component.on === 'function') {
            component.on(k.substr(2).toLowerCase(), arguments[i][k]);
          } else {
            throw 'Invalid constructor \'' + component.constructor.name + '\', your constructor must have an "on" method.';
          }
        } else if (k === 'class') {
          // Check for a class property, and it exists, add the class to the component
          if (typeof component.addClass === 'function') {
            component.addClass(arguments[i][k]);
          }
        } else if (
          typeof component[k] === 'function'
        ) {
          component[k](arguments[i][k]);
        } else if (typeof component[k] === 'undefined') {
          // Pass the value of 'opt' to 'this'
          component[k] = arguments[i][k];
        }
      } // End for loop
    }
  }

  if (children.length) {
    component.append.apply(component, children);
  }

  if (strings.length) {
    component.text.apply(component, strings);
  }

  return component;
}
