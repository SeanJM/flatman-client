function createEl() {
  var i = 0;
  var n = arguments.length;
  var a;

  function F() { return CreateNode.apply(this, a); }

  // Faster way to apply arguments
  if (typeof arguments[0] === 'function') {
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
