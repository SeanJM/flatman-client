/*
  Argument format
  CreateNode([String], [Object], [Text | CreateNode Object | Array | Node ])
*/

function CreateNode () {
  var attributes = {};
  var values = [];
  var className;

  this.subscribers = {};

  if (arguments[0] instanceof CreateNode) {
    this.node = arguments[0];
    this.subscribers = arguments[0].subscribers;
  } else if (isElement(arguments[0]) || arguments[0] === window) {
    this.node = arguments[0];
  } else if (isString(arguments[0])) {
    this.node = document.createElement(arguments[0]);
    if (isObject(arguments[1]) && !(arguments[1] instanceof CreateNode)) {
      attributes = arguments[1];
    }

    for (var i = 1, n = arguments.length; i < n; i++) {
      if (arguments[i] instanceof CreateNode) {
        this.node.appendChild(arguments[i].node);
      } else if (isString(arguments[i])) {
        this.node.innerHTML = arguments[i];
      }
    }

    for (var k in attributes) {
      if (k === 'class') {
        className = filter(map(attributes[k].split(' '), trim), hasLength);
        this.node.className = className.sort().join(' ').replace(/\{\{prefix}}/g, CLASS_PREFIX);
      } else if (k === 'style') {
        setStyle(this.node, attributes[k]);
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

  // Faster way to apply arguments
  switch (n) {
    case 1 :
    return new CreateNode(arguments[0]);
    case 2 :
    return new CreateNode(arguments[0], arguments[1]);
    case 3 :
    return new CreateNode(arguments[0], arguments[1], arguments[2]);
    case 4 :
    return new CreateNode(arguments[0], arguments[1], arguments[2], arguments[3]);
  }

  a = new Array(n);

  for (; i < n; i++) {
    a[i] = arguments[i];
  }

  function F() { return CreateNode.apply(this, a); }
  F.prototype = CreateNode.prototype;
  return new F();
}
