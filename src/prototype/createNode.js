/*
  Argument format
  CreateNode([String], [Object], [Text | CreateNode Object | Array | Node ])
*/

function createComponent() {
  var i = 1;
  var n = arguments.length;

  var hasAppend = typeof arguments[0].prototype.append === 'function';

  // Pass the objec to the constructor if it exists
  var component = new arguments[0](
    typeof arguments[1] === 'object'
      ? arguments[1]
      : undefined
  );

  function appendComponent(a) {
    if (hasAppend) {
      if (typeof a.appendTo === 'function') {
        component.append(a);
      } else {
        throw '"' + a.constructor.name + '" does not have an "appendTo" method';
      } 
    } else {
      throw '"' + component.constructor.name + '" does not have an "append" method';
    }
  }
  
  for (; i < n; i++) {
    if (
      isComponent(arguments[i])
      || arguments[i] instanceof CreateNode
    ) {
      appendComponent(arguments[i]);
    } else if (typeof arguments[i] === 'string') {
      if (typeof component.text === 'function') {
        component.text(arguments[i]);
      } else {
        throw 'Invalid argument "' + arguments[i] + '", component "' + component.constructor.name + '" does not have a "text" method.';  
      }
    } else if (typeof arguments[i] === 'object') {

      // Check if it's an object, and if it is, it's going to be treated as
      // an options object.
      
      for (var k in arguments[i]) {
        // Check for an 'on' method
        if (
          typeof k === 'string'
          && k.slice(0, 2) === 'on'
        ) {
          if (typeof component.on === 'function') {
            component.on(k.slice[3].toLowerCase() + k.slice(3), arguments[i][k]);
          } else {
            throw 'Invalid constructor \'' + component.constructor.name + '\', your constructor must have an "on" method.';
          }
        } else if (k === 'class') {
          // Check for a class property, and it exists, add the class to the component
          if (typeof component.addClass === 'function') {
            component.addClass(arguments[i][k]);
          }
        } else if (isComponent(arguments[i][k])) {
          if (typeof component[k] === 'undefined') {
            component[k] = arguments[i][k];
            appendComponent(arguments[i][k]);
          } else {
            throw 'Couldn\'t attach "' + arguments[i][k].constructor.name + '" Invalid key "' + k + '", this name is already taken."';
          }
        } else if (
          typeof k === 'string'
          && typeof component[k] === 'function'
        ) {
          if (isArray(arguments[i][k])) {
            component[k].apply(component, arguments[i][k]);
          } else {
            component[k](arguments[i][k]);
          }
        } else if (component.hasOwnProperty(k)) {
          throw 'Could not initiate "' + component.constructor.name + '", invalid key: "' + k + '". Component properties must match a component method. Eg: ' + component.constructor.name + '.prototype.' + k;
        }
      }
    }
  }
  return component;
}

function CreateNode () {
  var attributes = {};
  var values = [];
  var i = 1;
  var n = arguments.length;
  var className;

  this.subscribers = {};

  if (arguments[0] instanceof CreateNode) {
    this.node = arguments[0].node;
    this.subscribers = arguments[0].subscribers;
  } else if (isElement(arguments[0]) || arguments[0] === window) {
    this.node = arguments[0];
  } else if (isString(arguments[0])) {
    this.node = document.createElement(arguments[0]);
    if (isObject(arguments[1]) && !(arguments[1] instanceof CreateNode)) {
      attributes = arguments[1];
    }

    for (i = 1; i < n; i++) {
      if (arguments[i] instanceof CreateNode) {
        this.node.appendChild(arguments[i].node);
      } else if (isString(arguments[i])) {
        this.node.innerHTML = arguments[i];
      } else if (
        typeof arguments[i].appendTo === 'function'
      ) {
        arguments[i].appendTo(this.node);
      }
    }

    for (var k in attributes) {
      if (k === 'class') {
        className = filter(map(attributes[k].split(' '), trim), hasLength);
        this.node.className = className.sort().join(' ');
      } else if (k === 'style') {
        setStyle(this.node, attributes[k]);
      } else if (/on[A-Z][a-z]/.test(k.substr(0, 4))) {
        // A fast test to see if the property matches "onClick" or "onKeyup" or
        // "onScroll" pattern
        if (isFunction(attributes[k])) {
          this.on(k.substr(2).toLowerCase(), attributes[k]);
        } else {
          throw '\"' + k + '\" must have a function as a value.';
        }
      } else {
        this.node.setAttribute(k, attributes[k]);
      }
    }
  }

  if (IS_IE && isTextInput(this.node)) {
    // Normalize IE 9 input event
    this.node.addEventListener('keyup', function (e) {
      if (e.target === this.node) {
        if (!values.length) {
          values = [
            this.node.value,
            this.node.value
          ];
        } else {
          values[0] = values[1];
          values[1] = this.node.value;
        }

        if (values[0] !== values[1] && (e.which === IS_DELETE_KEY || e.which === IS_BACKSPACE_KEY)) {
          this.trigger('input', {
            type : 'input',
            which : e.which
          });
        }
      }
    }, false);
  }
}

function createNode () {
  var i = 0;
  var n = arguments.length;
  var a;

  function F() { return CreateNode.apply(this, a); }
  
  // Faster way to apply arguments
  if (
    typeof arguments[0] === 'function'
    && arguments[0].name.length
  ) {
    if (arguments[0].name[0] === arguments[0].name[0].toUpperCase()) {
      switch (n) {
        case 1 :
          return createComponent(arguments[0]);

        case 2 :
          return createComponent(arguments[0], arguments[1]);

        case 3 :
          return createComponent(
            arguments[0],
            arguments[1],
            arguments[2]
          );

        case 4 :
          return createComponent(
            arguments[0],
            arguments[1],
            arguments[2],
            arguments[3]
          );

        case 5 :
          return createComponent(
            arguments[0],
            arguments[1],
            arguments[2],
            arguments[3],
            arguments[4]
          );

        default :
          a = new Array(n);
          for (; i < n; i++) {
            a[i] = arguments[i];
          }
          return createComponent.apply(null, a);
      }
    } else {
      throw 'Invalid constructor function, "el" expects a constructor to start with a capital letter, eg: "' + arguments[0].name[0].toUpperCase() + arguments[0].name.slice(1).toLowerCase() + '"';
    }
  } else if (typeof arguments[0] !== 'undefined') {
    // Check for the possibility that they are passing a constructor as a string
    if (
      typeof arguments[0] === 'string' 
      && arguments[0][0] === arguments[0][0].toUpperCase()
      && arguments[0][1] === arguments[0][1].toLowerCase()
    ) {
      throw 'Invalid tag name: "' + arguments[0] + '", it looks like you are passing a constructor name as a string.'; 
    }
    switch (n) {
      case 1 :
        return new CreateNode(arguments[0]);

      case 2 :
        return new CreateNode(
          arguments[0],
          arguments[1]
        );

      case 3 :
        return new CreateNode(
          arguments[0],
          arguments[1],
          arguments[2]
        );

      case 4 :
        return new CreateNode(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3]
        );

      case 5 :
        return new CreateNode(
          arguments[0],
          arguments[1],
          arguments[2],
          arguments[3],
          arguments[4]
        );

      default :
        a = new Array(n);

        for (; i < n; i++) {
          a[i] = arguments[i];
        }

        F.prototype = CreateNode.prototype;
        return new F();
    }
  }
}
