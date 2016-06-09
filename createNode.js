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
    var n = isArray(array) || isNodelist(array) ? array.length : 0;
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
    var n = isArray(array) || isNodelist(array) ? array.length : 0;
  
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
  
  function isElement (a) {
    return typeof a.nodeType === 'number' && a.nodeType === 1;
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
  
  function isTextInput (node) {
    var types = ['text', 'password', 'phone', 'number'];
    var tagName = node.tagName;
    var isTextarea = tagName === 'TEXTAREA';
    var isText = tagName === 'INPUT' && types.indexOf(node.type) > -1;
    return isTextarea || isText;
  }
  
  function map (array, callback) {
    var i = 0;
    var n = isArray(array) || isNodelist(array) ? array.length : 0;
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
  function normalizeTextInput (self) {
    var values = [];
  
    if (IS_IE && isTextInput(self._node_)) {
      // Normalize IE 9 input event
      self._node_.addEventListener('keyup', function (e) {
        if (e.target === self._node_) {
          if (!values.length) {
            values = [
              self._node_.value,
              self._node_.value
            ];
          } else {
            values[0] = values[1];
            values[1] = self._node_.value;
          }
  
          if (values[0] !== values[1] && (e.which === IS_DELETE_KEY || e.which === IS_BACKSPACE_KEY)) {
            self.trigger('input', {
              type : 'input',
              which : e.which
            });
          }
        }
      }, false);
    }
  }
  
  function setAttributes (node, opt) {
    var className;
    for (var k in opt) {
      if (k === 'class') {
        className = filter(map(opt[k].split(' '), trim), hasLength).sort();
        node.className = className.join(' ');
      } else if (k === 'text') {
        node.innerHTML = opt[k];
      } else if (k === 'style') {
        node.setAttribute(k, toStyleString(opt[k]));
      } else {
        node.setAttribute(k, opt[k]);
      }
    }
  }
  
  function setNode (self, target) {
    if (typeof target === 'string') {
      self._node_ = document.createElement(target);
    } else if (target instanceof CreateNode) {
      self._class_ = target._class_;
      self._dimensions_ = target._class_;
      self._subscribers_ = target._subscribers_;
      self._node_ = target._node_;
    } else if (isNode(target) || target === window) {
      self._node_ = target;
    } else {
      throw 'Invalid arguments';
    }
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
  function setStyle(node, name, value) {
    if (typeof VENDOR_PREFIX[name] === 'string') {
      name = VENDOR_PREFIX[name];
    }
  
    if (TO_PIXEL.indexOf(name) !== -1 && !isNaN(Number(value))) {
      node.style[name] = value.toString().substr(-2) === 'px' ? value : value + 'px';
    } else {
      node.style[name] = value;
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
  
  function CreateNode (target, opt, text) {
    var self = this;
  
    this._class_ = [];
  
    this._subscribers_ = {};
  
    this._dimensions_ = {
      bottom : undefined,
      height : undefined,
      left : undefined,
      right : undefined,
      top : undefined,
      width : undefined,
    };
  
    setNode(this, target);
    setAttributes(this._node_, opt);
    normalizeTextInput(this);
  
    if (typeof text === 'string') {
      this._node_.innerHTML = text;
    }
  }
  
  function createNode (target, opt, text) {
    return new CreateNode(target, opt, text);
  }
  
  CreateNode.prototype.addClass = function (a) {
    var className = filter(map(this._node_.className.split(' '), trim), hasLength);
    var i = className.indexOf(a);
  
    if (i === -1) {
      className.push(a);
      className.sort();
      this._node_.className = className.join(' ');
    }
  
    return this;
  };
  
  CreateNode.prototype.append = function () {
    var n = arguments.length;
    var a = new Array(n);
    var i = 0;
    var child;
  
    for (; i < n; i++) {
      a[i] = arguments[i];
    }
  
    // Is a 'CreateNode' element
    if (a[0] instanceof CreateNode) {
      i = 0;
      for (; i < n; i++) {
        this._node_.appendChild(a[i]._node_);
      }
    } else {
      child = createNode.apply(null, a);
      this._node_.appendChild(child._node_);
    }
  
    return this;
  };
  
  CreateNode.prototype.appendTo = function (target) {
    if (target instanceof CreateNode) {
      target.append(this);
    } else if (isNode(target)) {
      target.appendChild(this._node_);
    } else if (typeof target === 'string') {
      document.querySelector(target).appendChild(this._node_);
    }
  
    return this;
  };
  
  CreateNode.prototype.attr = function () {
    var i = 0;
    var n = arguments.length;
    var a = new Array(n);
  
    for (; i < n; i++) {
      a[i] = arguments[i];
    }
  
    if (typeof a[0] === 'string' && typeof a[1] === 'string') {
      this._node_.setAttribute(a[0], a[1]);
    } else if (typeof a[0] === 'string') {
      return this._node_.getAttribute(a[0]);
    } else if (typeof a[0] === 'object') {
      setAttributes(this._node_, a[0]);
    } else if (!a.length) {
      return this._node_.attributes;
    }
  
    return this;
  };
  
  CreateNode.prototype.before = function (maybeNode) {
    var node = this._node_;
    var target = maybeNode instanceof CreateNode ? maybeNode._node_ : maybeNode;
    target.parentNode.insertBefore(node, target);
  };
  
  CreateNode.prototype.centerTo = function (targetNode) {
    var nodeRect = this._node_.getBoundingClientRect();
    var width = nodeRect.width;
    var height = nodeRect.height;
    var targetIsParent;
    var targetRect = {};
  
    if (targetNode === window) {
      targetRect.width = window.innerWidth;
      targetRect.height = window.innerHeight;
      targetIsParent = true;
    } else if (targetNode instanceof CreateNode) {
      targetRect = targetNode._node_.getBoundingClientRect();
      targetIsParent = targetNode._node_.contains(this._node_);
    } else {
      targetRect = targetNode.getBoundingClientRect();
      targetIsParent = targetNode.contains(this._node_);
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
    this._node_.checked = true;
  
    return this;
  };
  
  CreateNode.prototype.children = function () {
    return [].filter.call(this._node_.childNodes, function (node) {
      return node.nodeType === 1;
    });
  };
  
  CreateNode.prototype.clone = function () {
    return createNode(this._node_.cloneNode(true));
  };
  
  CreateNode.prototype.closest = function (selector) {
    return createNode(this._node_.closest(selector));
  };
  
  CreateNode.prototype.contains = function (target) {
    if (target instanceof CreateNode) {
      return this._node_.contains(target._node_);
    }
    return this._node_.contains(target);
  };
  
  CreateNode.prototype.copyAttributes = function (fromNode) {
    var i = 0,
        attr;
  
    if (fromNode instanceof CreateNode) {
      attr = fromNode._node_.attributes;
    } else {
      attr = fromNode.attributes;
    }
  
    for (; i < attr.length; i++){
      this._node_.setAttribute(attr[i].nodeName, attr[i].nodeValue);
    }
  
    return this;
  };
  
  CreateNode.prototype.disable = function () {
    this._node_.setAttribute('disabled', 'disabled');
    return this;
  };
  
  CreateNode.prototype.enable = function () {
    this._node_.removeAttribute('disabled');
    return this;
  };
  
  CreateNode.prototype.find = function (selector) {
    return [].map.call(this._node_.querySelectorAll(selector), function (node) {
      return new CreateNode(node);
    });
  };
  
  CreateNode.prototype.firstChild = function () {
    return createNode(filter(this.children(), isElement)[0]);
  };
  
  CreateNode.prototype.focus = function () {
    this._node_.focus();
    return this;
  };
  
  CreateNode.prototype.getSelector = function () {
    var attr = this._node_.attributes;
    var tagName = this._node_.tagName.toLowerCase();
    var siblings = this.siblings(true);
    var format = {
      class : function (value) {
        return '.' + value.replace(/[ ]+/g, ' ').trim().split(' ').join('.');
      },
      id : function (value) {
        return '#' + value;
      },
      name : function (value) {
        return value;
      },
      title : function (value) {
        return value;
      },
      value : function (value) {
        return value;
      },
      type : function (value) {
        return value;
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
  
    if (siblings.length > 1 && typeof this._node_.id === 'undefined') {
      selector.push(':nth-child(' + (siblings.indexOf(this._node_) + 1) + ')');
    }
  
    return selector.join('');
  };
  
  CreateNode.prototype.hasClass = function (className) {
    return this._node_.className.split(' ').indexOf(className) !== -1;
  };
  
  CreateNode.prototype.hasParent = function (target) {
    return target.contains(this._node_);
  };
  
  CreateNode.prototype.isChecked = function () {
    return this._node_.checked;
  };
  
  CreateNode.prototype.isFocused = function () {
    return document.activeElement === this._node_;
  };
  
  CreateNode.prototype.isVisible = function () {
    var css = window.getComputedStyle(this._node_);
    var rect = this._node_.getBoundingClientRect();
    var offLeft = rect.left + rect.width < 0;
    var offRight = rect.left > window.innerWidth;
    var offTop = rect.top + rect.bottom + window.pageYOffset < 0;
    var offCanvas = offLeft || offRight || offTop;
    var zeroWH = !rect.width || !rect.height && css.overflow === 'hidden';
    var invisible = css.visibility === 'none' || css.display === 'none';
  
    return !(offCanvas || zeroWH || invisible);
  };
  
  CreateNode.prototype.lastChild = function () {
    return createNode(filter(this.children(), isElement).slice(-1)[0]);
  };
  
  CreateNode.prototype.nodeText = function () {
    return this._node_.innerHTML.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  };
  
  CreateNode.prototype.off = function (names, callback) {
    var self = this;
  
    names.split(',').map(trim).filter(hasLength).forEach(function (name) {
      var subscribers = self._subscribers_;
  
      if (isFunction(callback)) {
        subscribers[name] = subscribers[name].filter(partial(not, callback));
        self._node_.removeEventListener(name, callback, false);
      } else {
        while (subscribers[name].length) {
          self._node_.removeEventListener(name, subscribers[name][0], false);
          subscribers[name].shift();
        }
      }
    });
  
    return this;
  };
  
  CreateNode.prototype.offset = function () {
    return this._node_.getBoundingClientRect();
  };
  
  CreateNode.prototype.on = function (names, callback) {
    var self = this;
  
    forEach(names.split(',').map(trim).filter(hasLength), function (name) {
      if (typeof self._subscribers_[name] === 'undefined') {
        self._subscribers_[name] = [];
      }
      if (self._subscribers_[name].indexOf(callback) === -1) {
        self._subscribers_[name].push(callback);
        self._node_.addEventListener(name, callback, false);
      }
    });
  };
  
  CreateNode.prototype.parent = function () {
    return new CreateNode(this._node_.parentNode);
  };
  
  CreateNode.prototype.parents = function () {
    var parents = [];
    var p = this._node_.parent;
  
    while (p) {
      parents.push(p);
      p = this._node_.parent;
    }
  
    return parents;
  };
  
  CreateNode.prototype.prepend = function (node) {
    var children = this.children();
    if (children.length) {
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
    this._node_.parentNode.removeChild(this._node_);
    return this;
  };
  
  CreateNode.prototype.removeClass = function (a) {
    this._node_.className = filter(map(this._node_.className.split(' '), trim), function (b) {
      return hasLength(b) && not(a, b);
    }).sort().join(' ');
    return this;
  };
  
  CreateNode.prototype.replaceWith = function (newNode) {
    var withNode = newNode instanceof CreateNode ? newNode._node_ : newNode;
  
    if (this._node_.parentNode) {
      this._node_.parentNode.replaceChild(withNode, this._node_);
    }
  
    this._node_ = withNode;
  
    return this;
  };
  
  CreateNode.prototype.scale = function (x, y) {
    var computed = window.getComputedStyle(this._node_)[createNode.prefix.transform];
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
  
    this._node_.style[VENDOR_PREFIX.transform] = 'matrix(' + matrix.join(',') + ')';
  };
  
  CreateNode.prototype.select = function (start, end) {
    if (typeof start === 'undefined' && typeof end === 'undefined') {
      return getSelection(this._node_);
    }
  
    if (start === -1 && typeof end === 'undefined') {
      start = this._node_.value.length;
      end = this._node_.value.length;
    }
  
    if (typeof end === 'undefined' || end === -1) {
      end = this._node_.value.length;
    }
  
    this._node_.focus();
    setSelection(this._node_, start, end);
  };
  
  CreateNode.prototype.selectorPath = function () {
    var path = [this.getSelector()];
    var p = this._node_.parentNode;
  
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
    return map(filter(node.parentNode.childNodes, isElement), createNode);
  };
  
  CreateNode.prototype.style = function () {
    var styles = window.getComputedStyle(this._node_);
    var i = 0;
    var n = arguments.length;
    var a = new Array(n);
  
    for (; i < n; i++) {
      a[i] = arguments[i];
    }
  
    if (typeof a[0] === 'string' && typeof a[1] === 'undefined') {
      return styles[a[0]];
    } else if (typeof a[0] === 'string' && typeof a[1] !== 'undefined') {
      setStyle(this._node_, a[0], a[1]);
    }
  
    if (typeof a[0] === 'object') {
      for (var k in a[0]) {
        setStyle(this._node_, k, a[0][k]);
      }
    }
  };
  
  CreateNode.prototype.tag = function (name) {
    var clone;
  
    if (typeof name === 'undefined') {
      return this._node_.tagName;
    }
  
    clone = new CreateNode(name);
    clone.text(this._node_.innerHTML);
    clone.copyAttributes(this._node_);
  
    this.replaceWith(clone);
  
    return this;
  };
  
  CreateNode.prototype.text = function (value) {
    if (typeof value === 'string') {
      this._node_.innerHTML = value;
    } else {
      return this._node_.innerHTML;
    }
  
    return this;
  };
  
  CreateNode.prototype.textNodes = function () {
    var walk = document.createTreeWalker(this._node_, NodeFilter.SHOW_TEXT, null, false);
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
      e = { type : name, target : this._node_ };
    } else if (typeof e.type === 'undefined') {
      e.type = name;
    }
  
    if (!self._node_.disabled) {
      forEach(nameList, function (name) {
        forEach(self._subscribers_[name], function (callback) {
          callback(e);
        });
      });
    }
  };
  
  CreateNode.prototype.uncheck = function () {
    this._node_.checked = false;
  };
  
  CreateNode.prototype.value = function (value) {
    if (typeof value !== 'undefined') {
      this._node_.value = value;
    } else {
      return this._node_.value;
    }
  };
  
  window.createNode = createNode;
  window.CreateNode = CreateNode;
}());