(function () {

  // CSS Related
  var
    CLASS_PREFIX = '',
  
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
      var properties = ['transform'];
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
  

  function isDefined (a) {
    return typeof a !== 'undefined';
  }
  

  function isElement (a) {
    return a && typeof a.nodeType === 'number' && a.nodeType === 1;
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
    return !isNaN(Number(a));
  }
  

  function isObject (a) {
    return Object.prototype.toString.call(a) === '[object Object]';
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
  
    a = a.replace(/\{\{prefix}}/g, CLASS_PREFIX);
    i = className.indexOf(a);
  
    if (i === -1) {
      className.push(a);
      className.sort();
      node.className = className.join(' ');
    }
  }
  

  // From http://stackoverflow.com/questions/263743/caret-position-in-textarea-in-characters-from-the-start
  function appendChild (node, child) {
    var f;
  
    if (typeof child === 'string') {
      node.innerHTML = child;
    } else if (child instanceof CreateNode) {
      node.appendChild(child.node);
    } else if (isArray(child)) {
      // Is a node creation
      if (typeof child[0] === 'string') {
        node.appendChild(new CreateNode(child).node);
      } else {
        // Is a group
        f = new DocumentFragment();
        forEach(child, function (c) {
          appendChild(f, c);
        });
        node.appendChild(f);
      }
    } else if (isElement(child)) {
      node.appendChild(child);
    }
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

  function removeClass (node, a) {
    a = a.replace(/\{\{prefix}}/g, CLASS_PREFIX);
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
  
    if (isString(a) && isString(b)) {
      style(a, b);
    } else if (isString(a)) {
      node.setAttribute('style', a);
    } else if (isObject(a)) {
      for (var k in a) {
        setStyle(node, k, a[k]);
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
  

  CreateNode.classPrefix = function (name) {
    CLASS_PREFIX = name;
  };
  

  CreateNode.fn = function (name, callback) {
    CreateNode.prototype[name] = callback;
  };
  

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
      this.node = arguments[0].node;
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
    target = createNode(target);
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
  

  CreateNode.prototype.check = function () {
    this.node.checked = true;
    return this;
  };
  

  CreateNode.prototype.children = function () {
    var c = this.node.childNodes;
    return c.length ? map(filter(c, isElement), function (a) {
      return el(a);
    }) : false;
  };
  

  CreateNode.prototype.clone = function () {
    return createNode(this.node.cloneNode(true));
  };
  

  CreateNode.prototype.closest = function (selector) {
    var c = this.node.closest(selector);
    return c !== null ? createNode(c) : false;
  };
  

  CreateNode.prototype.contains = function (target) {
    if (target instanceof CreateNode) {
      return this.node.contains(target.node);
    }
    return this.node.contains(target);
  };
  

  CreateNode.prototype.copyAttributes = function (fromNode) {
    var i = 0,
        attr;
  
    if (fromNode instanceof CreateNode) {
      attr = fromNode.node.attributes;
    } else {
      attr = fromNode.attributes;
    }
  
    for (; i < attr.length; i++){
      this.node.setAttribute(attr[i].nodeName, attr[i].nodeValue);
    }
  
    return this;
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
    return createNode(filter(this.node.childNodes, isElement)[0]);
  };
  

  CreateNode.prototype.focus = function () {
    if (!this.node.getAttribute('tabindex')) {
      this.node.setAttribute('tabindex', '0');
    }
  
    this.node.focus();
  
    return this;
  };
  

  CreateNode.prototype.getSelector = function () {
    var attr = this.node.attributes;
    var tagName = this.node.tagName.toLowerCase();
    var siblings = this.siblings();
    var format = {
      class : function (value) {
        return '.' + value.replace(/[ ]+/g, ' ').trim().split(' ').join('.');
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
  
    return selector.join('');
  };
  

  CreateNode.prototype.hasClass = function (className) {
    return this.node.className.split(' ').indexOf(className) !== -1;
  };
  

  CreateNode.prototype.hasParent = function (target) {
    return target.contains(this.node);
  };
  

  CreateNode.prototype.isChecked = function () {
    return this.node.checked;
  };
  

  CreateNode.prototype.isDisabled = function () {
    return this.node.getAttribute('disabled') === 'disabled';
  };
  

  CreateNode.prototype.isFocused = function () {
    return document.activeElement === this.node;
  };
  

  CreateNode.prototype.isVisible = function () {
    var css = window.getComputedStyle(this.node);
    var rect = this.node.getBoundingClientRect();
    var offLeft = rect.left + rect.width < 0;
    var offRight = rect.left > window.innerWidth;
    var offTop = rect.top + rect.bottom + window.pageYOffset < 0;
    var offCanvas = offLeft || offRight || offTop;
    var zeroWH = !rect.width || !rect.height && css.overflow === 'hidden';
    var invisible = css.visibility === 'none' || css.display === 'none';
  
    return !(offCanvas || zeroWH || invisible);
  };
  

  CreateNode.prototype.lastChild = function () {
    return createNode(filter(this.node.childNodes, isElement).slice(-1)[0]);
  };
  

  CreateNode.prototype.nodeText = function () {
    return trim(this.node.innerHTML.replace(/<[^>]+?>/g, '')).replace(/\s+/g, ' ');
  };
  

  CreateNode.prototype.off = function (names, callback) {
    var self = this;
  
    names.split(',').map(trim).filter(hasLength).forEach(function (name) {
      var subscribers = self.subscribers;
  
      if (isFunction(callback)) {
        subscribers[name] = subscribers[name].filter(partial(not, callback));
        self.node.removeEventListener(name, callback, false);
      } else {
        while (subscribers[name].length) {
          self.node.removeEventListener(name, subscribers[name][0], false);
          subscribers[name].shift();
        }
      }
    });
  
    return this;
  };
  

  CreateNode.prototype.offset = function () {
    return this.node.getBoundingClientRect();
  };
  

  CreateNode.prototype.on = function (names, callback) {
    var self = this;
  
    forEach(names.split(',').map(trim).filter(hasLength), function (name) {
      if (typeof self.subscribers[name] === 'undefined') {
        self.subscribers[name] = [];
      }
      if (self.subscribers[name].indexOf(callback) === -1) {
        self.subscribers[name].push(callback);
        self.node.addEventListener(name, callback, false);
      }
    });
  };
  

  CreateNode.prototype.parent = function () {
    var p = this.node.parentNode;
    return isElement(p) ? new CreateNode(p) : false;
  };
  

  CreateNode.prototype.parents = function () {
    var parents = [];
    var p = this.node.parentNode;
  
    while (p) {
      parents.unshift(el(p));
      p = p.parentNode;
    }
  
    return parents;
  };
  

  CreateNode.prototype.prepend = function (node) {
    var children = this.children();
    if (children) {
      createNode(node).before(children[0]);
    } else {
      createNode(node).appendTo(this);
    }
  };
  

  CreateNode.prototype.prependTo = function (target) {
    var children = createNode(target).children();
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
    newNode = createNode(newNode);
  
    if (this.node.parentNode) {
      this.node.parentNode.replaceChild(newNode.node, this.node);
      return this;
    }
  
    this.node = newNode.node;
    return this;
  };
  

  CreateNode.prototype.scale = function (x, y) {
    var computed = window.getComputedStyle(this.node)[VENDOR_PREFIX.transform];
    var matrix = [];
  
    if (computed === 'none') {
      matrix = [
        1, 0, 0,
        1, 0, 0,
      ];
    } else {
      matrix = computed.slice(7, -1).split(',').map(function (a) {
        return Number(a);
      });
    }
  
    if (typeof y === 'undefined') {
      y = x;
    }
  
    matrix[0] = x;
    matrix[3] = y;
  
    this.node.style[VENDOR_PREFIX.transform] = 'matrix(' + matrix.join(',') + ')';
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
      return createNode(s);
    });
  };
  

  CreateNode.prototype.style = function (a, b) {
  
    /* The Problem
     * (A) node.style('property');
     * (B) node.style('property: value;');
     * (C) node.style({ property : value });
     * (D) node.style('property', 'value');
     */
  
    if (isString(a) && isUndefined(b)) {
      // Solve for (A)
      if (a.indexOf(':') === -1) {
        if (document.body.contains(this.node)) {
          return window.getComputedStyle(this.node)[arguments[0]];
        } else {
          c = this.node.cloneNode(true);
          c.style.position = 'absolute';
          c.style.left = '-10000000';
          document.body.appendChild(c);
          a = window.getComputedStyle(c)[arguments[0]];
          c.parentNode.removeChild(c);
          c = undefined;
          return a;
        }
      } else {
        // Solve for (B)
        this.node.setAttribute('style', a);
        return this;
      }
    }
  
    // Solve for (C) && (D)
    setStyle(this.node, a, b);
    return this;
  };
  

  CreateNode.prototype.tag = function (name) {
    var clone;
  
    if (typeof name === 'undefined') {
      return this.node.tagName.toLowerCase();
    }
  
    clone = new CreateNode(name);
    clone.text(this.node.innerHTML);
    clone.copyAttributes(this.node);
    this.replaceWith(clone);
    this.node = clone.node;
  
    return this;
  };
  

  CreateNode.prototype.text = function (value) {
    if (typeof value === 'string') {
      this.node.innerHTML = value;
    } else {
      return this.node.innerHTML;
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
    var self = this;
    var nameList = names.split(',').map(trim).filter(hasLength);
  
    if (typeof e === 'undefined') {
      e = { type : name, target : this.node };
    } else if (typeof e.type === 'undefined') {
      e.type = name;
    }
  
    if (!self.node.disabled) {
      forEach(nameList, function (name) {
        forEach(self.subscribers[name], function (callback) {
          callback(e);
        });
      });
    }
  };
  

  CreateNode.prototype.uncheck = function () {
    this.node.checked = false;
    return this;
  };
  

  CreateNode.prototype.value = function (value) {
    if (typeof value !== 'undefined') {
      this.node.value = value;
      return this;
    } else {
      return this.node.value;
    }
  };
  

  window.el = createNode;
  window.el.classPrefix = CreateNode.classPrefix;
  window.el.fn = CreateNode.fn;
  

}());