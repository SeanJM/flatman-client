(function () {

  // CSS Related
  var
    CSS_PROPERTY_IS_NUMBER = [
      'z-index',
      'opacity'
    ],
  
    TO_PIXEL = [
      'borderRadius',
      'bottom',
      'fontSize',
      'height',
      'left',
      'marginBottom',
      'marginLeft',
      'marginRight',
      'marginTop',
      'minHeight',
      'minWidth',
      'maxHeight',
      'maxWidth',
      'paddingBottom',
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'right',
      'top',
      'width',
    ],
  
    DEFAULT_STYLES = [
      'auto',
      'none'
    ],
  
    JS_PROPERTY_TO_CSS = {
      zIndex : 'z-index',
  
      marginLeft : 'margin-left',
      marginTop : 'margin-top',
      marginRight : 'margin-right',
      marginBottom : 'margin-bottom',
  
      paddingLeft : 'padding-left',
      paddingTop : 'padding-top',
      paddingRight : 'padding-right',
      paddingBottom : 'padding-bottom',
    },
  
    VENDOR_PREFIX = (function () {
      var styles = window.getComputedStyle(document.body);
      var properties = ['transform', 'userSelect', 'userModify'];
      var prefix = ['Moz', 'webkit', 'ms'];
      var list = {};
      var property;
  
      for (var i = 0, n = prefix.length; i < n; i++) {
        for (var x = 0, y = properties.length; x < y; x++) {
          property = prefix[i] + properties[x][0].toUpperCase() + properties[x].slice(1);
  
          if (typeof styles[property] !== 'undefined') {
            list[properties[x]] = property;
          }
  
        }
      }
  
      return list;
    }());
  
  // Browser detection
  var IS_IE = /^Mozilla\/(4\.0|5\.0|1\.22) \(((c|C)ompatible;|Windows; U;) MSIE 9\.0;/.test(window.navigator.userAgent);
  
  // Keyboard keys
  var
    IS_BACKSPACE_KEY = 8,
    IS_DELETE_KEY = 46;
  
  var
    SVG_NAMESPACE = 'http://www.w3.org/2000/svg',
    SVG_TAGNAMES = ['svg', 'circle', 'line', 'path'];
  

  function filter (array, callback) {
    var i = 0;
    var n = isArray(array) || isNodeList(array) ? array.length : 0;
    var a = [];
  
    for (; i < n; i++) {
      if (callback(array[i], i, array)) {
        a.push(array[i]);
      }
    }
  
    return a;
  }
  

  function forEach (array, callback) {
    var i = 0;
    var n = isArray(array) || isNodeList(array) ? array.length : 0;
  
    for (; i < n; i++) {
      callback(array[i], i, array);
    }
  }
  

  function hasLength (x) {
    return x.length > 0;
  }
  

  function isArray (array) {
    return Object.prototype.toString.call(array) === '[object Array]';
  }
  

  function isBoolean (a) {
    return typeof a === 'boolean';
  }
  

  function isComponent(C) {
    return (
      typeof C === 'object'
      && Object.prototype.toString.call(C) === '[object Object]'
      && C.constructor.name !== 'Object'
    );
  }
  

  function isCreateNode (a) {
    return a instanceof CreateNode;
  }
  

  function isDefined (a) {
    return typeof a !== 'undefined';
  }
  

  function isElement (a) {
    return Object.prototype.toString.call(a).substr(0, 12) === '[object HTML'; 
  }
  

  function isFunction (x) {
    return typeof x === 'function';
  }
  

  function isNode (a) {
    return /^\[object HTML/.test(Object.prototype.toString.call(a));
  }
  

  function isNodeList (list) {
    return Object.prototype.toString.call(list) === '[object NodeList]';
  }
  

  function isNumber (a) {
    return typeof a === 'number' && !isNaN(a);
  }
  

  function isObject (a) {
    return (
      Object.prototype.toString.call(a) === '[object Object]'
      && a.constructor.name === 'Object'
    );
  }
  

  function isString (a) {
    return typeof a === 'string';
  }
  

  function isTextInput (node) {
    var types = ['text', 'password', 'phone', 'number'];
    var tagName = node.tagName;
    var isTextarea = tagName === 'TEXTAREA';
    var isText = tagName === 'INPUT' && types.indexOf(node.type) > -1;
    return isTextarea || isText;
  }
  

  function isUndefined (a) {
    return typeof a === 'undefined';
  }
  

  function map (array, callback) {
    var i = 0;
    var n = isArray(array) || isNodeList(array) ? array.length : 0;
    var a = [];
  
    for (; i < n; i++) {
      a.push(callback(array[i], i, array));
    }
  
    return a;
  }
  

  function not (a, b) {
    return a !== b;
  }
  

  function partial(fn) {
    var left = new Array(arguments.length - 1);
    var leftIndex = 0;
  
    for (; leftIndex < left.length; leftIndex++) {
      left[leftIndex] = arguments[leftIndex + 1];
    }
  
    return function () {
      var right = new Array(arguments.length);
      var rightIndex = 0;
  
      for (; rightIndex < right.length; rightIndex++) {
        right[rightIndex] = arguments[rightIndex];
      }
  
      fn.apply(null, left.concat(right));
    };
  }
  

  function partialRight(fn) {
    var right = new Array(arguments.length - 1);
    var rightIndex = 0;
  
    for (; rightIndex < right.length; rightIndex++) {
      right[rightIndex] = arguments[rightIndex + 1];
    }
  
    return function () {
      var left = new Array(arguments.length);
      var leftIndex = 0;
  
      for (; leftIndex < left.length; leftIndex++) {
        left[leftIndex] = arguments[leftIndex];
      }
  
      fn.apply(null, left.concat(right));
    };
  }
  

  function trim (string) {
    return string.replace(/^\s+|\s+$/g, '');
  }
  

  function addClass (node, a) {
    var className = filter(map(node.className.split(' '), trim), hasLength);
    var i;
  
    i = className.indexOf(a);
  
    if (i === -1) {
      className.push(a);
      className.sort();
      node.className = className.join(' ');
    }
  }
  

  function appendChild (node) {
    var i = 1;
    var n = arguments.length;
  
    function append(a) {
      appendChild(node, a);
    }
  
    node = node instanceof CreateNode
      ? node.node
      : node;
  
    for (; i < n; i++) {
      if (typeof arguments[i] === 'string') {
        node.innerHTML = arguments[i];
      } else if (arguments[i] instanceof CreateNode) {
        node.appendChild(arguments[i].node);
      } else if (!!arguments[i] && typeof arguments[i].appendTo === 'function') {
        arguments[i].appendTo(node);
      } else if (isArray(arguments[i])) {
        forEach(arguments[i], append);
      } else if (isElement(arguments[i])) {
        node.appendChild(arguments[i]);
      }
    }
  }
  

  function contains(node) {
    var i = 1;
    var n = arguments.length;
    var x;
    var y;
  
    node = node instanceof CreateNode
      ? node.node
      : node;
  
    function each(a) {
      a = a instanceof CreateNode
        ? a.node
        : a;
  
      return node.contains(a) && a !== node;
    }
  
    for (; i < n; i++) {
      if (isArray(arguments[i])) {
        for (x = 0, y = arguments[i].length; x < y; x++) {
          if (each(arguments[i][x])) {
            return true;
          }
        }
      } else if (each(arguments[i])) {
        return true;
      }
    }
  
    return false;
  }
  

  // From http://stackoverflow.com/questions/263743/caret-position-in-textarea-in-characters-from-the-start
  function getSelection (node) {
    var
      start = 0,
      end = 0,
      normalized,
      range,
      textInputRange,
      endRange;
  
    if (typeof node.selectionStart === 'number') {
      start = node.selectionStart;
      end = node.selectionEnd;
    } else {
      range = document.selection.createRange();
  
      if (range && range.parentElement() === node) {
        normalized = node.value.replace(/\r\n/g, "\n");
  
        // Create a working TextRange that lives only in the input
        textInputRange = node.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());
  
        // Check if the start and end of the selection are at the very end
        // of the input, since moveStart/moveEnd doesn't return what we want
        // in those cases
        endRange = node.createTextRange();
        endRange.collapse(false);
  
        if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
          start = end = node.value.length;
        } else {
          start = -textInputRange.moveStart("character", -node.value.length);
          start += normalized.slice(0, start).split("\n").length - 1;
  
          if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
            end = node.value.length;
          } else {
            end = -textInputRange.moveEnd("character", -node.value.length);
            end += normalized.slice(0, end).split("\n").length - 1;
          }
        }
      }
    }
  
    return [ start, end ];
  }

  /*
    The first argument is always the node which is being checked
  */
  
  function hasParent(node) {
    var parents = [];
    var i = 1;
    var n = arguments.length;
  
    node = node instanceof CreateNode
      ? node.node
      : node;
  
    for (; i < n; i++) {
      if (isArray(arguments[i])) {
        [].push.apply(parents, arguments[i]);
      } else {
        parents.push(arguments[i]);
      }
    }
  
    i = 0;
    n = parents.length;
  
    for (; i < n; i++) {
      if (parents[i] && parents[i].contains(node)) {
        return true;
      }
    }
  
    return false;
  }
  

  function isVisible() {
    var windowWidth = window.innerWidth;
    var windowTop = window.pageYOffset;
    var html = document.getElementsByTagName('html')[0];
  
    function is(node) {
      var css = window.getComputedStyle(node);
      var rect = node.getBoundingClientRect();
  
      var isValidPosition = (
        rect.left + rect.width > 0
        && rect.left < windowWidth
        && rect.top + rect.height + windowTop > 0
      );
  
      var isClipped = (
        css.overflow === 'hidden'
        && (
          rect.width === 0
          || rect.height === 0
        )
      );
  
      var isVisible = (
        css.visibility !== 'none'
        && css.display !== 'none'
      );
  
      return isValidPosition && !isClipped && isVisible;
    }
  
    function isDeep(element) {
      var n;
      var i;
      var parent;
  
      var node = element instanceof CreateNode
        ? element.node
        : element;
  
      // Check parents for visibility
      if (!is(node)) {
        return false;
      } else {
        parent = node.parentNode;
        while (parent && parent !== html) {
          if (!is(parent)) {
            return false;
          }
          parent = parent.parentNode;
        }
      }
      return true;
    }
  
    for (var i = 0, n = arguments.length; i < n; i++) {
      if (!isDeep(arguments[i])) {
        return false;
      }
    }
    return true;
  }
  

  function removeClass (node, a) {
    node.className = filter(map(node.className.split(' '), trim), function (b) {
      return hasLength(b) && not(a, b);
    }).sort().join(' ');
  }
  

  function setSelection (node, start, end) {
    if (node.setSelectionRange) {
      node.setSelectionRange(start, end);
    } else if (node.createTextRange) {
      var range = node.createTextRange();
      range.collapse(true);
      range.moveStart('character', start);
      range.moveEnd('character', end);
      range.select();
    }
  }

  function setStyle(node, a, b) {
    function style(name, value) {
      if (typeof VENDOR_PREFIX[name] === 'string') {
        name = VENDOR_PREFIX[name];
      }
  
      if (isNumber(value) && TO_PIXEL.indexOf(name) !== -1) {
        value += 'px';
      }
  
      node.style[name] = value;
    }
  
    if (isString(a) && isDefined(b)) {
      style(a, b);
    } else if (isString(a)) {
      node.setAttribute('style', a);
    } else if (isObject(a)) {
      for (var k in a) {
        style(k, a[k]);
      }
    }
  }
  

  function toStyleString(styleObject) {
    var string = '';
    var property;
    var value;
  
    for (property in styleObject) {
      value = styleObject[property];
  
      if (JS_PROPERTY_TO_CSS.hasOwnProperty(property)) {
        property = JS_PROPERTY_TO_CSS[property];
      }
  
      if (typeof value === 'number' && CSS_PROPERTY_IS_NUMBER.indexOf(property) === -1) {
        value += 'px';
      }
  
      string += property + ': ' + value + '; ';
    }
  
    return string;
  }
  

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
          throw '"' + (a.constructor.name || 'Anonymous component') + '" does not have an "appendTo" method';
        }
      } else {
        throw '"' + (component.constructor.name || 'Anonymous component') + '" does not have an "append" method';
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
    return component;
  }
  

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
  

  CreateNode.fn = function (name, callback) {
    CreateNode.prototype[name] = callback;
  };
  

  /*
    Argument format
    CreateNode([String], [Object], [Text | CreateNode Object | Array | Node ])
  */
  
  function CreateNode () {
    var that = this;
    var doubleclick = false;
    var attributes = {};
    var values = [];
    var i = 1;
    var n = arguments.length;
    var isSVG = SVG_TAGNAMES.indexOf(arguments[0]) !== -1;
    var className;
  
    this.subscribers = {};
  
    if (arguments[0] instanceof CreateNode) {
      this.node = arguments[0].node;
      this.subscribers = arguments[0].subscribers;
    } else if (isElement(arguments[0]) || arguments[0] === window) {
      this.node = arguments[0];
    } else if (isString(arguments[0]) || isObject(arguments[0])) {
      if (isString(arguments[0])) {
        if (isSVG) {
          this.node = document.createElementNS(SVG_NAMESPACE, arguments[0]);
        } else {
          this.node = document.createElement(arguments[0]);
        }
        i = 1;
      } else if (isObject(arguments[0])) {
        this.node = document.createElement('div');
        i = 0;
      }
  
      if (isObject(arguments[i]) && !(arguments[i] instanceof CreateNode)) {
        attributes = arguments[i];
      }
  
      for (var k in attributes) {
        if (k === 'class') {
          className = filter(map(attributes[k].split(' '), trim), hasLength);
          if (isSVG) {
            this.node.setAttributeNS(null, 'class', className.sort().join(' '));
          } else {
            this.node.className = className.sort().join(' ');
          }
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
  
      for (; i < n; i++) {
        if (arguments[i] instanceof CreateNode) {
          this.node.appendChild(arguments[i].node);
        } else if (isString(arguments[i]) || isNumber(arguments[i])) {
          this.node.appendChild(new Text(arguments[i]));
        } else if (
          arguments[i]
          && typeof arguments[i].appendTo === 'function'
        ) {
          arguments[i].appendTo(this.node);
        }
      }
    } else if (typeof arguments[0] === 'undefined') {
      throw 'Invalid argument \'undefined\' for createNode.';
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
  
    // Double click
    this.node.addEventListener('click', function (e) {
      if (doubleclick) {
        that.trigger('doubleclick', e);
      } else {
        doubleclick = true;
      }
      setTimeout(function () {
        doubleclick = false;
      }, 250);
    });
  
    // Drag
    this.node.addEventListener('mousedown', function (e) {
      var dragstart = false;
      var startX = e.pageX;
      var startY = e.pageY;
  
      var dragmove;
      var dragend;
  
      // Ensure it's left click which starts the dragging
      if (e.which === 1) {
        document.body.addEventListener('mouseup', dragend = function (e) {
          var eve = {
            type : 'dragend',
            startX : startX,
            startY : startY,
            pageX : e.pageX,
            pageY : e.pageY,
            distanceX : startX - e.pageX,
            distanceY : startY - e.pageY,
            target : that
          };
  
          if (e.which === 1 && dragstart) {
            document.body.removeEventListener('mousemove', dragmove);
            document.body.removeEventListener('mouseup', dragend);
  
            dragstart = false;
            document.body.style[VENDOR_PREFIX.userSelect] = '';
            document.body.style.cursor = '';
            that.trigger('dragend', eve);
          }
        });
  
        document.body.addEventListener('mousemove', dragmove = function (e) {
          var eve = {
            type : 'dragstart',
            startX : startX,
            startY : startY,
            pageX : e.pageX,
            pageY : e.pageY,
            distanceX : e.pageX - startX,
            distanceY : e.pageY - startY,
            target : that
          };
  
          if (
            (Math.abs(startX - e.pageX) + Math.abs(startY - e.pageY)) > 5
            && !dragstart
          ) {
            that.trigger('dragstart', eve);
            dragstart = true;
            document.body.style[VENDOR_PREFIX.userSelect] = 'none';
            document.body.style.cursor = 'default';
          } else if (dragstart) {
            eve.type = 'dragmove';
            that.trigger('dragmove', eve);
          }
        });
      }
    });
  
    if (this.node.check) {
      this.check = this.node.check;
    }
    this.style = this.node.style;
    this.style.transform = this.style[VENDOR_PREFIX.transform];
    this.style.userSelect = this.style[VENDOR_PREFIX.userSelect];
    this.style.userModify = this.style[VENDOR_PREFIX.userModify];
  }
  

  CreateNode.prototype.addClass = function (a) {
    addClass(this.node, a);
    return this;
  };
  

  CreateNode.prototype.append = function () {
    var n = arguments.length;
    var i = 0;
  
    for (; i < n; i++) {
      appendChild(this.node, arguments[i]);
    }
  
    return this;
  };
  

  CreateNode.prototype.appendTo = function (target) {
    if (target instanceof CreateNode) {
      target.append(this);
    } else if (isNode(target)) {
      target.appendChild(this.node);
    } else if (typeof target === 'string') {
      document.querySelector(target).appendChild(this.node);
    }
  
    return this;
  };
  

  CreateNode.prototype.attr = function () {
    var attr;
    var res;
    if (typeof arguments[0] === 'string' && typeof arguments[1] === 'string') {
      this.node.setAttribute(arguments[0], arguments[1]);
    } else if (typeof arguments[0] === 'string') {
      return this.node.getAttribute(arguments[0]);
    } else if (typeof arguments[0] === 'object') {
      setAttributes(this.node, arguments[0]);
    } else if (!arguments.length) {
      attr = this.node.attributes;
      res = {};
  
      for (var i = 0, n = attr.length; i < n; i++) {
        res[attr[i].nodeName] = attr[i].nodeValue;
      }
  
      return res;
    }
  
    return this;
  };
  

  CreateNode.prototype.before = function (target) {
    target = createEl(target);
    target.node.parentNode.insertBefore(this.node, target.node);
  };
  

  CreateNode.prototype.centerTo = function (targetNode) {
    var nodeRect = this.node.getBoundingClientRect();
    var width = nodeRect.width;
    var height = nodeRect.height;
    var targetIsParent;
    var targetRect = {};
  
    if (targetNode === window) {
      targetRect.width = window.innerWidth;
      targetRect.height = window.innerHeight;
      targetIsParent = true;
    } else if (targetNode instanceof CreateNode) {
      targetRect = targetNode.node.getBoundingClientRect();
      targetIsParent = targetNode.node.contains(this.node);
    } else {
      targetRect = targetNode.getBoundingClientRect();
      targetIsParent = targetNode.contains(this.node);
    }
  
    if (targetIsParent) {
      this.style('left', (targetRect.width / 2) - (width / 2));
      this.style('top', (targetRect.height / 2) - (height / 2));
    } else {
      this.style('left', targetRect.left + (targetRect.width / 2) - (width / 2));
      this.style('top', window.pageYOffset + targetRect.top + (targetRect.height / 2) - (height / 2));
    }
  
    return this;
  };
  

  CreateNode.prototype.children = function () {
    var c = this.node.childNodes;
    return c.length ? map(filter(c, isElement), function (a) {
      return el(a);
    }) : false;
  };
  

  CreateNode.prototype.clone = function () {
    return createEl(this.node.cloneNode(true));
  };
  

  CreateNode.prototype.closest = function (selector) {
    var c = this.node.closest(selector);
    return c !== null ? createEl(c) : false;
  };
  

  CreateNode.prototype.contains = function () {
    var a = [];
    var i = 0;
    var n = arguments.length;
  
    for (; i < n; i++) {
      a.push(arguments[i]);
    }
  
    return contains.apply(null, [this.node].concat(a));
  };
  

  CreateNode.prototype.disable = function () {
    this.node.setAttribute('disabled', 'disabled');
    return this;
  };
  

  CreateNode.prototype.enable = function () {
    this.node.removeAttribute('disabled');
    return this;
  };
  

  CreateNode.prototype.find = function (selector) {
    return [].map.call(this.node.querySelectorAll(selector), function (node) {
      return new CreateNode(node);
    });
  };
  

  CreateNode.prototype.firstChild = function () {
    return createEl(filter(this.node.childNodes, isElement)[0]);
  };
  

  CreateNode.prototype.focus = function () {
    this.node.focus();
    return this;
  };
  

  CreateNode.prototype.getSelector = function () {
    var attr = this.node.attributes;
    var tagName = this.node.tagName.toLowerCase();
    var siblings = this.siblings();
    var format = {
      class : function (value) {
        return '.' + value.replace(/[ ]+/g, ' ')
          .trim()
          .split(' ')
          .filter(function (a) { return !/^\d+$/.test(a); })
          .join('.');
      },
      id : function (value) {
        return '#' + value;
      },
      name : function (value) {
        return '[name="'+ value + '"]';
      },
      title : function (value) {
        return '[title="'+ value + '"]';
      },
      value : function (value) {
        return '[value="'+ value + '"]';
      },
      type : function (value) {
        return '[type="'+ value + '"]';
      }
    };
    var selector = [];
  
    if (tagName === 'body') {
      return tagName;
    }
  
    // If a tag contains this character, it would be an invalid selector
    if (tagName.indexOf(':') === -1) {
      selector.push(tagName);
    }
  
  
    for (var i = 0; i < attr.length; i++) {
    	if (typeof format[attr[i].name] === 'function' && attr[i].value.length) {
  			selector.push(format[attr[i].name.toLowerCase()](attr[i].value));
      }
    }
  
    if (siblings.length > 1 && typeof this.node.id === 'undefined') {
      selector.push(':nth-child(' + (siblings.indexOf(this.node) + 1) + ')');
    }
  
    return selector.join('').replace(/\n/g, '');
  };
  

  CreateNode.prototype.hasClass = function (a) {
    return this.node.className.split(' ').indexOf(a) !== -1;
  };
  

  CreateNode.prototype.hasParent = function (target) {
    return hasParent(this.node, target);
  };
  

  CreateNode.prototype.html = function (a) {
    if (typeof a !== 'undefined') {
      this.node.innerHTML = a;
    } else {
      return this.node.innerHTML;
    }
  };
  

  CreateNode.prototype.isDisabled = function () {
    return this.node.getAttribute('disabled') === 'disabled';
  };
  

  CreateNode.prototype.isFocused = function () {
    return document.activeElement === this.node;
  };
  

  CreateNode.prototype.isVisible = function () {
    return isVisible(this.node);
  };
  

  CreateNode.prototype.lastChild = function () {
    return createEl(filter(this.node.childNodes, isElement).slice(-1)[0]);
  };
  

  CreateNode.prototype.off = function (names, callback) {
    var self = this;
  
    names = names.toLowerCase().split(',');
  
    for (var i = 0, n = names.length; i < n; i++) {
      names[i] = names[i].trim();
  
      if (names[i].length) {
        if (typeof callback === 'function') {
          self.subscribers[names[i]] = self.subscribers[names[i]].filter(partial(not, callback));
          self.node.removeEventListener(names[i], callback, false);
        } else {
          while (self.subscribers[names[i]].length) {
            self.node.removeEventListener(names[i], self.subscribers[names[i]][0], false);
            self.subscribers[names[i]].shift();
          }
        }
      }
    }
  
    return this;
  };
  

  CreateNode.prototype.offset = function () {
    return this.node.getBoundingClientRect();
  };
  

  CreateNode.prototype.on = function (names, callback) {
    names = names.toLowerCase().split(',');
  
    for (var i = 0, n = names.length; i < n; i++) {
      names[i] = names[i].trim();
      if (names[i].length) {
        if (typeof this.subscribers[names[i]] === 'undefined') {
          this.subscribers[names[i]] = [];
        }
        if (this.subscribers[names[i]].indexOf(callback) === -1) {
          this.subscribers[names[i]].push(callback);
          this.node.addEventListener(names[i], callback, false);
        }
      }
    }
  
    return this;
  };
  

  CreateNode.prototype.parent = function () {
    var p = this.node.parentNode;
    return isElement(p) ? new CreateNode(p) : false;
  };
  

  CreateNode.prototype.parents = function () {
    var parents = [];
    var p = this.node.parentNode;
    var html = document.body.parentNode;
  
    while (p && p !== html) {
      parents.push(el(p));
      p = p.parentNode;
    }
  
    return parents;
  };
  

  CreateNode.prototype.parentsUntil = function (predicate) {
    var p = this.node.parentNode;
    var html = document.body.parentNode;
  
    while (p && p !== html) {
      if (predicate(p)) {
        return createEl(p);
      }
      p = p.parentNode;
    }
  
    return false;
  };
  

  CreateNode.prototype.prepend = function (node) {
    var children = this.children();
    if (children) {
      createEl(node).before(children[0]);
    } else {
      createEl(node).appendTo(this);
    }
  };
  

  CreateNode.prototype.prependTo = function (target) {
    var children = createEl(target).children();
    if (children.length) {
      this.before(children[0]);
    } else {
      this.appendTo(target);
    }
  };
  

  CreateNode.prototype.remove = function () {
    if (isElement(this.node.parentNode)) {
      this.node.parentNode.removeChild(this.node);
    }
    return this;
  };
  

  CreateNode.prototype.removeClass = function (a) {
    removeClass(this.node, a);
    return this;
  };
  

  CreateNode.prototype.replaceWith = function (newNode) {
    newNode = createEl(newNode);
  
    if (this.node.parentNode) {
      this.node.parentNode.replaceChild(newNode.node, this.node);
      return this;
    }
  
    this.node = newNode.node;
    return this;
  };
  

  CreateNode.prototype.select = function (start, end) {
    if (typeof start === 'undefined' && typeof end === 'undefined') {
      return getSelection(this.node);
    }
  
    if (start === -1 && typeof end === 'undefined') {
      start = this.node.value.length;
      end = this.node.value.length;
    }
  
    if (typeof end === 'undefined' || end === -1) {
      end = this.node.value.length;
    }
  
    this.node.focus();
    setSelection(this.node, start, end);
    return this;
  };
  

  CreateNode.prototype.selectorPath = function () {
    var path = [this.getSelector()];
    var p = this.node.parentNode;
  
    while (p) {
      path.unshift(new CreateNode(p).getSelector());
  
      if (p === document.body || p.id.length > 0) {
        return path.join(' ');
      }
  
      p = p.parentNode;
    }
  
    return path.join(' ');
  };
  

  CreateNode.prototype.siblings = function () {
    var children = this.node.parentNode ? this.node.parentNode.childNodes : [];
    return map(filter(children, isElement), function (s) {
      return createEl(s);
    });
  };
  

  CreateNode.prototype.styles = function () {
    return window.getComputedStyle(this.node);
  };
  

  CreateNode.prototype.text = function (value) {
    if (isDefined(value) && !isBoolean(value)) {
      this.node.innerHTML = value;
    } else {
      return trim(this.node.innerHTML.replace(/<[^>]+?>/g, '')).replace(/\s+/g, ' ');
    }
  
    return this;
  };
  

  CreateNode.prototype.textNodes = function () {
    var walk = document.createTreeWalker(this.node, NodeFilter.SHOW_TEXT, null, false);
    var nextNode = walk.nextNode();
    var nodeList = [];
  
    while (nextNode) {
      nodeList.push(nextNode);
      nextNode = walk.nextNode();
    }
  
    return nodeList;
  };
  

  CreateNode.prototype.toggleClass = function (className) {
    if (this.hasClass(className)) {
      this.removeClass(className);
    } else {
      this.addClass(className);
    }
    return this;
  };
  

  CreateNode.prototype.trigger = function (names, e) {
    function trigger(callback) {
      callback(e);
    }
  
    if (e && typeof e.preventDefault === 'undefined') {
      e.defaultPrevented = false;
      e.preventDefault = function () {
        e.defaultPrevented = true;
      };
    }
  
    names = names.toLowerCase().split(',');
  
    if (typeof e === 'undefined') {
      e = { type : name, target : this.node };
    } else if (typeof e.type === 'undefined') {
      e.type = name;
    }
  
    if (!this.node.disabled) {
      for (var i = 0, n = names.length; i < n; i++) {
        names[i] = names[i].trim();
        if (names[i].length && this.subscribers[names[i]]) {
          for (var x = 0, y = this.subscribers[names[i]].length; x < y; x++) {
            trigger(this.subscribers[names[i]][x]);
          }
        }
      }
    }
  };
  

  CreateNode.prototype.value = function (value) {
    if (typeof value !== 'undefined') {
      this.node.value = value;
      return this;
    }
    
    return this.node.value;
  };
  

  // El assignments
  window.el = createEl;
  window.el.fn = CreateNode.fn;
  window.el.isVisible = isVisible;
  window.el.hasParent = hasParent;
  window.el.contains = contains;
  window.el.isElement = isElement;
  window.el.isComponent = isComponent;
  window.el.isCreateNode = isCreateNode;
  
  // Node environment
  if (typeof module === 'object' && module.exports) {
    module.exports = startText;
  }
  

}());