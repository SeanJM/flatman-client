(function (window) {


var VERSION = '1.3.8';

var TO_PIXEL = [
  'borderRadius',
  'bottom',
  'fontSize',
  'height',
  'left',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'right',
  'top',
  'translateX',
  'translateY',
  'translateZ',
  'width',
];

var TO_DEG = [
  'rotate'
];

var DEFAULT_STYLES = [
  'auto',
  'none'
];

var JS_PROPERTY_TO_CSS = {
  zIndex : 'z-index',

  marginLeft : 'margin-left',
  marginTop : 'margin-top',
  marginRight : 'margin-right',
  marginBottom : 'margin-bottom',

  paddingLeft : 'padding-left',
  paddingTop : 'padding-top',
  paddingRight : 'padding-right',
  paddingBottom : 'padding-bottom',
};

// Browser detection
var IS_IE = /^Mozilla\/(4\.0|5\.0|1\.22) \(((c|C)ompatible;|Windows; U;) MSIE 9\.0;/.test(window.navigator.userAgent);

// Keyboard keys
var IS_BACKSPACE_KEY = 8;
var IS_DELETE_KEY = 46;

var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
var SVG_TAGNAMES = ['svg', 'circle', 'line', 'path', 'use'];

// Vendor Prefixes
var CSS_PREFIXED_PROPERTIES = ['transform', 'userSelect', 'userModify', 'transition', 'animation'];
var PREFIXES = ['Moz', 'webkit', 'ms'];
var VENDOR_PREFIX;

var IE_INPUT = {
  node : [],
  value : []
};

var BODY;


function appendChildEach(element, child, childNodes, f) {
  if (child) {
    childNodes.push(child);
    element.childNodes.push(child);

    if (child.node) {
      child.parentNode = element;
      f.appendChild(child.node);
    } else {
      f.appendChild(new Text(child));
    }
  }
}

function appendChild(element, children) {
  var f = document.createDocumentFragment();
  var childNodes = [];

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      appendChildEach(element, children[i], childNodes, f);
    }
  } else {
    appendChildEach(element, children, childNodes, f);
  }

  element.node.appendChild(f);

  for (var i = 0, n = childNodes.length; i < n; i++) {
    mount(childNodes[i]);
  }
}


function bindDragAndDrop(self) {
  var subscribers = self.subscribers;

  function start() {
    if (subscribers.dragstart.length > 1) {
      document.body.style[VENDOR_PREFIX.userSelect] = 'none';
      document.body.style.cursor = 'default';
    }
  }

  function end() {
    if (subscribers.dragstart.length > 1) {
      document.body.style[VENDOR_PREFIX.userSelect] = '';
      document.body.style.cursor = '';
    }
  }

  if (
    subscribers.dragstart
    && subscribers.dragstart.indexOf(start) === -1
  ) {
    self.on('dragstart', start);
    self.on('dragend', end);
  }
}


function getNode(x) {
  if (isElement(x)) {
    return x;
  } else if (x instanceof Node) {
    return x.node;
  } else if (typeof x === 'string' || (typeof x === 'number' && !isNaN(x))) {
    return new Text(x);
  } else if (
    x
    && x.node
    && x.node.document
  ) {
    return getNode(x.node.document);
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

function getSelectorGroup(s) {
  var group = [];
  var open = false;
  var n = s.length;
  var i = 0;
  var cur = '';

  s = s.replace(/\s+/g, ' ');

  while (i < n) {
    if (s[i] === '[' && s[i - 1] !== '\'') {
      open = true;
      cur += s[i];
    } else if (s[i] === ']' && s[i - 1] !== '\'') {
      open = false;
      cur += s[i];
    } else if (s[i] === ' ' && !open) {
      group.push(cur);
      cur = '';
    } else {
      cur += s[i];
    }
    i++;
  }

  group.push(cur);
  return group;
};

function getSelectorObject(selector) {
  var classNames = selector.match(/\.[a-zA-Z0-9\-\_]+/g);
  var id = selector.match(/\#[a-zA-Z0-9\-\_]+/);
  var attr = selector.match(/\[[^\]]+?\]/g);
  var tagName = selector.match(/^[a-zA-Z0-9\-\_]+/);

  var selectorObject = {
    tagName : tagName ? tagName[0] : false,
    attributes : {}
  };

  if (classNames) {
    selectorObject.attributes.className = classNames.map(function (a) {
      return a.slice(1);
    });
  }

  if (id) {
    selectorObject.attributes.id = id[0].slice(1);
  }

  if (attr) {
    attr.forEach(function (string) {
      var value = string.match(/\[([a-zA-Z0-9\-\_]+)(?:(\*|\^|\$|)=([^\]]+?)\]|)/);
      value[1] = value[1] === 'class' ? 'className' : value[1];
      value[3] = value[3] ? value[3].slice(1, -1) : false;

      if (value[2]) {
        if (value[2] === '*') {
          selectorObject.attributes[value[1]] = new RegExp(value[3]);
        } else if (value[2] === '^') {
          selectorObject.attributes[value[1]] = new RegExp('^' + value[3]);
        } else if (value[2] === '$') {
          selectorObject.attributes[value[1]] = new RegExp(value[3] + '$');
        }
      } else if (value[3]) {
        selectorObject.attributes[value[1]] = new RegExp('^' + value[3] + '$');
      } else {
        selectorObject.attributes[value[1]] = new RegExp('.+');
      }
    });
  }

  return selectorObject;
}


function mount(child) {
  var c = child.document || child;
  if (document.body.contains(c.node)) {
    c
      .trigger('mount')
      .children()
      .forEach(mount);
  }
}

function parents(node) {
  var parents = [];
  var p = node.parentNode;
  var html = document.body.parentNode;

  while (p && p !== html) {
    parents.push(p);
    p = p.parentNode;
  }

  return parents;
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

function unmount(element) {
  if (element.trigger) {
    element.trigger('unmount');
    element.childNodes.forEach(unmount);
  }
}

function isCreateNode(a) {
  return a instanceof Node;
}


function isElement (a) {
  var validElements = ['HTML', 'SVGS', 'SVGU'];
  var stringValue = Object.prototype.toString.call(a).substr(8, 4);
  return validElements.indexOf(stringValue) !== -1;
}


function isNumber (a) {
  return typeof a === 'number' && !isNaN(a);
}


function isTextInput(node) {
  var types = ['text', 'password', 'phone', 'number'];
  var tagName = node.tagName;
  var isTextarea = tagName === 'TEXTAREA';
  var isText = tagName === 'INPUT' && types.indexOf(node.type) > -1;
  return isTextarea || isText;
}


function createComponentMethodProxy(method, methods) {
  return function () {
    var i = 0;
    var n = arguments.length;
    var $arguments = new Array(n);
    var result;

    for (;i < n; i++) {
      $arguments[i] = arguments[i];
    }

    result = methods[method].apply(this, $arguments);

    return result;
  };
}

function getRefs(self, node) {
  for (var i = 0, n = node.childNodes.length; i < n; i++) {
    if (node.childNodes[i].ref && !self.refs[node.childNodes[i].ref]) {
      self.refs[node.childNodes[i].ref] = node.childNodes[i];
    }

    if (node.childNodes[i].childNodes) {
      getRefs(self, node.childNodes[i]);
    }
  }
}

function createComponentConstructor(tagName, methods) {
  var C = function Component(a, b) {
    var props = {};
    var children = [];

    if (Array.isArray(a)) {
      children = a;
    } else if (typeof a === 'object') {
      props = a;
      children = b || children;
    }

    if (methods && methods.constructor) {
      methods.constructor.call(this, props);
    }

    this.tagName = tagName;
    this.childNodes = [];
    this.props = this.props || {};
    this.refs = this.refs || {};

    for (var k in props) {
      if (k === "ref") {
        this.ref = props[k];
      } else if (!this.props[k]) {
        this.props[k] = props[k];
      }
    }

    if (typeof this.render === 'function') {
      this.document = this.render(props);
      this.node = this.document.node;

      if (this.document) {
        if (this.document.childNodes.length) {
          [].push.apply(this.childNodes, this.document.childNodes);
        }

        getRefs(this, this);

        if (children.length) {
          this.append(children);
        }

      } else {
        throw new Error('Invalid component, component must return a node in the render function.');
      }
    }
  };

  var eventObject = {
    tagName : tagName,
    constructor : C
  };

  for (method in methods) {
    if (method !== 'constructor') {
      C.prototype[method] = createComponentMethodProxy(method, methods);
    } else {
      C.prototype[method] = methods[method];
    }
  }

  for (method in Component.prototype) {
    if (typeof C.prototype[method] === 'undefined') {
      C.prototype[method] = Component.prototype[method];
    }
  }

  for (var i = 0, n = Component.onCreateListeners.length; i < n; i++) {
    Component.onCreateListeners[i](eventObject);
  }

  return C;
}

function Component() {}

Component.lib = {};
Component.function = {};
Component.onCreateListeners = [];


Component.create = function (tagName, methods) {
  if (Component.lib[tagName]) {
    throw new Error(
      'Cannot create Component function: duplicate name \'' + tagName + '\''
    );
  }

  if (typeof methods === 'function') {
    Component.lib[tagName] = Component.create(tagName, {
      render: function (props) {
        return methods(props);
      }
    });
  } else {
    Component.lib[tagName] = createComponentConstructor(
      tagName,
      methods
    );
  }

  return Component.lib[tagName];
};


Component.find = function (name) {
  var matches = [];
  for (var k in Component.lib) {
    if (name.test(k)) {
      matches.push(k);
    }
  }
  return matches;
};


Component.fn = function (name, callback) {
  if (typeof name === "string" && typeof callback === "function") {
    Component.prototype[name] = callback;

    for (var k in Component.lib) {
      if (typeof Component.lib[k].prototype[name] === "undefined") {
        Component.lib[k].prototype[name] = callback;
      } else {
        console.log(
          "[Component] Warning: the method \"" + name + "\" could not be added to \"" + k + "\""
        );
      }
    }

  } else if (typeof name !== "string") {
    throw new Error(
      "Component.fn is missing the \"name\" argument."
    );
  } else if (typeof callback !== "function") {
    throw new Error(
      "Component.fn is missing the \"callback\" argument."
    );
  }
};


Component.off = function (names, callback) {
  function each(name, callback) {
    var subscribers = Component.subscribers[name];
    subscribers.splice(subscribers.indexOf(callback), 1);
  }

  names = names.toLowerCase().split(',');
  for (var i = 0, n = names.length; i < n; i++) {
    names[i] = names[i].trim();
    if (names[i].length && callback) {
      each(names[i], callback);
    } else while (Component.subscribers[names[i]].length) {
      each(names[i], Component.subscribers[names[i]][0]);
    }
  }

  return Component;
};


Component.onCreate = function (callback) {
  Component.onCreateListeners.push(callback);
  return Component;
};


Component.trigger = function () {
  var subscribers = Component.subscribers;
  var names;
  var detail;

  if (typeof arguments[0] === 'string') {
    names = arguments[0];
    detail = arguments[1] || {};
  } else {
    names = arguments[0].type;
    detail = arguments[0];
  }

  names = names.toLowerCase().split(',');

  if (!Component.node.disabled) {
    names.forEach(function (name) {
      name = name.trim();
      if (name.length && subscribers[name]) {
        subscribers[name].forEach(function (callback) {
          callback(Object.assign({}, detail, { type : name }));
        });
      }
    });
  }

  return Component;
};


Component.prototype.addClass = function (className) {
  this.document.addClass(className);
  return this;
};


Component.prototype.after = function (target) {
  this.document.after.call(this, target);
  return this;
};


Component.prototype.append = function (children) {
  this.document.append(children);
  this.mapChildrenToNode(children);
  [].push.apply(this.childNodes, children);
  return this;
};


Component.prototype.appendTo = function (parentNode) {
  this.document.appendTo(parentNode);
  this.parentNode = parentNode;
  return this;
};


Component.prototype.attr = function (a, b) {
  var n = arguments.length;
  if (n === 0) {
    return this.document.attr();
  } else if (n === 1) {
    return this.document.attr(a);
  } else {
    this.document.attr(a, b);
    return this;
  }
};


// 'this' is appended before target
Component.prototype.before = function (target) {
  this.document.before.call(this, target);
  return this;
};


Component.prototype.closest = function (selector) {
  return this.document.closest.call(this, selector);
};


Component.prototype.disable = function () {
  this.document.disable();
  this.document.childNodes.forEach(function (a) {
    a.disable();
  });
  return this;
};


Component.prototype.enable = function () {
  this.document.enable();
  this.document.childNodes.forEach(function (a) {
    a.enable();
  });
  return this;
};


Component.prototype.hasClass = function (className) {
  return this.document.hasClass(className);
};


Component.prototype.is = function (selector) {
  return this.document.is.call(this, selector);
};


Component.prototype.mapChildrenToNode = function (children) {
  var ref;

  children = Array.isArray(children)
    ? children
    : [ children ];

  for (var i = 0, n = children.length; i < n; i++) {
    ref = children[i].ref;
    children[i].parentNode = this;
    if (ref && !this.refs[ref]) {
      this.refs[ref] = children[i];
    }
  }

  return this;
};

Component.prototype.off = function (name, callback) {
  var self = this;

  if (typeof this.subscribers === 'undefined') {
    this.subscribers = {};
  }

  name
    .toLowerCase()
    .split(',')
    .forEach(function (a) {
      var i;

      a = a.trim();

      if (typeof self.subscribers[a] !== 'undefined') {
        i = self.subscribers[a].indexOf(callback);

        while (i !== -1) {
          self.subscribers[a].splice(i, 1);
          i = self.subscribers[a].indexOf(callback);
        }

        if (typeof callback === 'undefined') {
          while (self.subscribers[a].length) {
            self.subscribers[a].shift();
          }
        }
      }
    });

  return this;
};


Component.prototype.on = function (name, callback) {
  var self = this;

  if (typeof this.subscribers === 'undefined') {
    this.subscribers = {};
  }

  if (callback) {
    name
    .toLowerCase()
    .split(',')
    .forEach(function (a) {
      a = a.trim();
      if (a.length) {
        if (typeof self.subscribers[a] === 'undefined') {
          self.subscribers[a] = [];
        }

        if (self.subscribers[a].indexOf(callback) === -1) {
          self.subscribers[a].push(callback);
        }
      }
    });
  }


  return this;
};


Component.prototype.once = function (names, callback) {
  var self = this;

  function ref(e) {
    callback.call(self, e);
    self.off(names, ref);
  }

  if (callback) {
    this.on(names, ref);
  }

  return this;
};


Component.prototype.prepend = function (children) {
  this.document.prepend(children);
  this.mapChildrenToNode(children);
  this.childNodes = [].concat(children).concat(this.childNodes);
  return this;
};


Component.prototype.remove = function () {
  this.document.remove.call(this);
  return this;
};


Component.prototype.removeChild = function (child) {
  this.document.removeChild(child);
  this.childNodes.splice(this.childNodes.indexOf(child), 1);
  return this;
};


Component.prototype.removeClass = function (className) {
  this.document.removeClass(className);
  return this;
};


Component.prototype.trigger = function () {
  var self = this;
  var names = arguments[0];
  var object = arguments[1];
  var $names;

  function filterNames(names) {
    var split = names.split(',');
    var filter = [];
    for (i = 0, n = split.length; i < n; i++) {
      split[i] = split[i].trim();
      if (split[i].length && self.subscribers[split[i]]) {
        filter.push(split[i]);
      }
    }
    return filter;
  }

  this.subscribers = this.subscribers || {};

  if (typeof names === 'string') {
    object = typeof object !== "undefined" ? object : {};
    $names = filterNames(names.toLowerCase());
  } else {
    object = arguments[0];
    $names = filterNames(object.type.toLowerCase());
  }

  $names.forEach(function (name) {
    self.subscribers[name]
      .slice()
      .forEach(function (callback) {
        callback.call(self, object);
      });
  });

  return this;
};


if (typeof module !== 'undefined' && module.exports) {
  module.exports = Component;
}


/*
  Argument format
  Node([String], [Object], [Text | Node Object | Array | Node ])
*/

function Node(tagName, opt, children, isElement) {
  function getNode(node) {
    if (isElement || node === window) {
      return node;
    }

    this.isSVG = SVG_TAGNAMES.indexOf(node) !== -1;
    return node = this.isSVG
      ? document.createElementNS(SVG_NAMESPACE, node)
      : document.createElement(node);

    throw 'Invalid argument for el, the first argument can be either a node or a tagName';
  }

  this.subscribers = {};
  this.childNodes = [];
  this.node = getNode.call(this, tagName);
  this.tagName = this.node.tagName.toLowerCase();
  this.append(children);
  this.attr(opt);

  this.node.style.transform = this.node.style[VENDOR_PREFIX.transform];
  this.node.style.userSelect = this.node.style[VENDOR_PREFIX.userSelect];
  this.node.style.userModify = this.node.style[VENDOR_PREFIX.userModify];

  bindDragAndDrop(this);
}


Node.fn = function (name, callback) {
  Node.prototype[name] = callback;
};


Node.prototype.addClass = function (className) {
  var classList = this.classList();

  function addClass(a) {
    if (classList.indexOf(a) === -1) {
      classList.push(a);
    }
  }

  if (Array.isArray(className)) {
    className.forEach(addClass);
  } else {
    addClass(className);
  }

  this.node.setAttribute("class", classList.sort().join(' '));
  return this;
};


Node.prototype.after = function (children) {
  var sib = this.siblings();
  var index = sib.indexOf(this);
  if (index < sib.length - 1) {
    sib[index + 1].before(children);
  } else {
    appendChild(this.node.parentNode, children);
  }
};


Node.prototype.append = function (children) {
  if (arguments.length > 1) {
    throw 'You have too many arguments (' + arguments.length + ') for \'.append\', it takes a node or an array of nodes.';
  } else {
    appendChild(this, children);
  }
  return this;
};


Node.prototype.appendTo = function (target) {
  if (isElement(target)) {
    appendChild(el(target), this);
  } else {
    appendChild(target, this);
  }
  return this;
};


Node.prototype.attr = function () {
  var attrObject = {};
  var attr = this.node.attributes;
  var self = this;

  function setAttrPropValue(prop, value) {
    if (prop === 'className') {
      self.className(value);
    } else if (prop === 'style' && typeof value === 'object') {
      self.style(value);
    } else if (self.isSVG) {
      self.node.setAttributeNS('http://www.w3.org/1999/xlink', prop, value);
    } else if ('once' === prop.substr(0, 4)) {
      self.once(prop.substr(4), value);
    } else if ('on' === prop.substr(0, 2)) {
      self.on(prop.substr(2), value);
    } else if ('ref' === prop) {
      self.ref = value;
    } else {
      prop === 'tabindex'
        ? 'tabIndex'
        : prop;
      self.node.setAttribute(prop, value);
    }
    return self;
  }

  function setAttr(prop, value) {
    if (typeof prop === 'string' && typeof value !== 'undefined') {
      return setAttrPropValue(prop, value);
    } else if (typeof prop === 'string') {
      return self.node.getAttribute(prop);
    }
  }

  function setAttrObject(attr) {
    for (var k in attr) {
      setAttr(k, attr[k]);
    }
  }

  if (arguments.length === 0) {
    for (var i = 0, n = attr.length; i < n; i++) {
      attrObject[attr[i].nodeName] = attr[i].nodeValue;
    }
    return attrObject;
  }

  if (typeof arguments[0] === 'object') {
    return setAttrObject(arguments[0]);
  }

  return setAttr(arguments[0], arguments[1]);
};


Node.prototype.before = function (children) {
  var f = document.createDocumentFragment();
  var parentNode = this.parentNode;
  var childNodes = parentNode.childNodes;

  function each(child) {
    child.parentNode = parentNode;
    f.appendChild(child.node);
  }

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      each(children[i]);
    }
  } else {
    each(children);
  }

  this.node.parentNode.insertBefore(f, this.node);
  [].splice.apply(childNodes, [ childNodes.indexOf(this), 0].concat(children));
  [].forEach.call(f, mount);

  return this;
};


Node.prototype.check = function () {
  this.node.checked = true;
  return this;
};


Node.prototype.children = function (a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return this.childNodes.slice(a, b);
  } else if (Array.isArray(a)) {
    this.childNodes = [];
    this.node.innerHTML = '';
    this.append(a);
    return this;
  }

  return typeof a === 'number'
    ? this.childNodes[a]
    : this.childNodes;
};


Node.prototype.classList = function () {
  var className = (this.node.getAttribute('class') || '').split(' ');
  var classList = [];
  var temp;

  for (var i = 0, n = className.length; i < n; i++) {
    temp = className[i].trim();
    if (temp) {
      classList.push(temp);
    }
  }

  return classList;
};


Node.prototype.className = function (value) {
  if (typeof value === 'undefined') {
    return this.classList().join(' ');
  }

  value = Array.isArray(value) ? value.sort().filter(function (a) { return a; }).join(' ') : value;

  if (this.isSVG) {
    this.node.setAttributeNS(null, 'class', value);
  } else {
    this.node.className = value;
  }

  return this;
};


Node.prototype.clone = function () {
  return el(this.node.cloneNode(true));
};


Node.prototype.cloneDeep = function () {
  return el(this.node.cloneNode(true)).mapChildren();
};


Node.prototype.closest = function (selector) {
  var p = this.node.parentNode;
  var temp;

  while (p) {
    temp = el(p);
    if (temp.is(selector)) {
      return temp;
    }
    p = p.parentNode;
  }

  return false;
};


Node.prototype.contains = function (a) {
  if (Array.isArray(a)) {
    for (var i = 0, y = a.length; i < y; i++) {
      if (this.node.contains(a[i].node) && a[i].node !== this.node) {
        return true;
      }
    }
  }

  return this.node.contains(a.node);
};


Node.prototype.copy = function (node) {
  var elNode = el(node);
  this.attr(elNode.attr());
  this.html(elNode.html());
  return this;
};


Node.prototype.disable = function () {
  this.node.setAttribute('disabled', 'disabled');
  return this;
};


Node.prototype.enable = function () {
  this.node.removeAttribute('disabled');
  return this;
};


(function () {
  function findPredicate(predicate) {
    var found = [];

    function find(childNodes) {
      childNodes.forEach(function (element) {
        if (element.childNodes) {
          if (predicate(element)) {
            found.push(element);
          }
          find(element.childNodes);
        }
      });
    }

    find(this.childNodes);
    return found;
  }

  function findStringSelector(selector) {
    var list = getSelectorGroup(selector);
    var found = [ [ this ] ];

    function each (node) {
      found.push(findPredicate.call(node, function (element) {
        return element.is(list[0]);
      }));
    }

    while (list.length) {
      found[found.length - 1].forEach(each);
      list.shift();
    }

    return found.slice(-1)[0];
  }


  Node.prototype.find = function (selector) {
    if (typeof selector === 'string') {
      return findStringSelector.call(this, selector);
    } else if (typeof selector === 'function') {
      return findPredicate.call(this, selector);
    }
    throw new Error('Invalid selector for \'find\'');
  };
}());


Node.prototype.focus = function () {
  this.node.focus();
  return this;
};


Node.prototype.hasClass = function (a) {
  var classList = this.classList();

  if (Array.isArray(a)) {
    for (var i = 0, n = a.length; i < n; i++) {
      if (classList.indexOf(a[i]) === -1) {
        return false;
      }
    }

    return true;
  }

  return classList.indexOf(a) !== -1;
};


Node.prototype.html = function (a) {
  if (typeof a === 'undefined') {
    return this.node.innerHTML;
  } else if (a.length === 0) {
    this.childNodes = [];
  }

  this.node.innerHTML = a;
  return this;
};


Node.prototype.is = function (selector) {
  var selectorObject = getSelectorObject(selector);
  var attributes = this.attr();

  if (selectorObject.tagName) {
    if (selectorObject.tagName !== this.tagName) {
      return false;
    }
  }

  for (var k in selectorObject.attributes) {
    if (k === 'className') {
      if (!this.hasClass(selectorObject.attributes[k])) {
        return false;
      }
    } else if (selectorObject.attributes[k]) {
      if (typeof selectorObject.attributes[k] === 'string') {
        if (selectorObject.attributes[k] !== attributes[k]) {
          return false;
        }
      } else if (!selectorObject.attributes[k].test(attributes[k])) {
        return false;
      }
    }
  }

  return true;
};


Node.prototype.isChecked = function () {
  return this.node.checked;
};


Node.prototype.isDisabled = function () {
  return this.node.getAttribute('disabled') === 'disabled';
};


Node.prototype.isFocused = function () {
  return document.activeElement === this.node;
};


Node.prototype.isVisible = function () {
  var maxLeft = window.innerWidth;
  var parents;

  function isVisible(node) {
    var rect = node.offset();
    var style = node.style();
    if (rect.right < 0) {
      return false;
    } else if (rect.left > maxLeft) {
      return false;
    } else if (rect.bottom < 0) {
      return false;
    } else if (style.display === 'none') {
      return false;
    } else if (style.visibility === 'hidden') {
      return false;
    } else if (style.overflow === 'hidden') {
      if (rect.height === 0 || rect.width === 0) {
        return false;
      }
      return true;
    }
    return true;
  }

  if (isVisible(this)) {
    parents = this.parents();
    var i = 0;
    var n = parents.length;
    for (; i < n; i++) {
      if (!isVisible(parents[i])) {
        return false;
      }
    }
    return true;
  }

  return false;
};


Node.prototype.mapChildren = function () {
  function getRel(elNode) {
    [].forEach.call(elNode.node.childNodes, function (node) {
      var childElNode;
      if (isElement(node)) {
        childElNode = el(node);
        elNode.childNodes.push(childElNode);
        childElNode.parentNode = elNode;
        getRel(childElNode);
      }
    });
  }
  getRel(this);
  return this;
};


Node.prototype.name = function (value) {
  if (typeof value !== 'undefined') {
    this.node.setAttribute('name', value);
    return this;
  }
  return this.node.getAttribute('name');
};


Node.prototype.off = function (names, callback) {
  var self = this;

  function each(name, callback) {
    var subscribers = self.subscribers[name];
    self.node.removeEventListener(name, callback);
    subscribers.splice(subscribers.indexOf(callback), 1);
  }

  names = names.toLowerCase().split(',');
  for (var i = 0, n = names.length; i < n; i++) {
    names[i] = names[i].trim();
    if (names[i].length && callback) {
      each(names[i], callback);
    } else while (this.subscribers[names[i]].length) {
      each(names[i], this.subscribers[names[i]][0]);
    }
  }
  return this;
};


Node.prototype.offset = function () {
  var offset = this.node.getBoundingClientRect();
  return {
    width : offset.width,
    height : offset.height,
    left : offset.left,
    right : offset.right,
    bottom : offset.bottom,
    top : offset.top
  };
};


function onWrap(self, name) {
  return function (event) {
    self.trigger(name, event);
  };
}

Node.prototype.on = function (names, callback) {
  names = names.toLowerCase().split(',');

  for (var i = 0, n = names.length; i < n; i++) {
    names[i] = names[i].trim();
    if (names[i].length) {
      if ((names[i] === 'load' || names[i] === 'error') && this.tagName === 'img') {
        this.node[names[i]] = onWrap(this, names[i]);
      } else {
        this.subscribers[names[i]] = (this.subscribers[names[i]] || []).concat(callback);
        this.node.addEventListener(names[i], callback);
      }
    }
  }

  return this;
};


Node.prototype.once = function (names, callback) {
  var self = this;

  var ref = function (e) {
    callback.call(self, e);
    self.off(names, ref);
  };

  this.on(names, ref);

  return this;
};


Node.prototype.parent = function () {
  return this.parentNode;
};


Node.prototype.parents = function () {
  return parents(this.node).map(function (a) {
    return el(a);
  });
};


Node.prototype.prepend = function (children) {
  var fragment = document.createDocumentFragment();
  var childNodes = this.childNodes;
  var self = this;

  function each(child) {
    child.parentNode = self;
    fragment.appendChild(child.node);
  }

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      each(children[i]);
    }
  } else {
    each(children);
  }

  [].splice.apply(
    childNodes, [
      childNodes.indexOf(childNodes[0]),
      0
    ].concat(children)
  );

  if (childNodes.length) {
    this.node.insertBefore(fragment, this.node.childNodes[0]);
  } else {
    this.node.appendChild(fragment);
  }

  [].forEach.call(fragment, mount);

  return this;
};


Node.prototype.prependTo = function (target) {
  var children = target.node.childNodes;

  if (children.length) {
    target.node.insertBefore(this.node, children[0]);
  } else {
    target.node.appendChild(this.node);
  }

  target.childNodes.unshift(this);
  return this;
};


Node.prototype.remove = function () {
  var isOnBody = document.body.contains(this.node);
  var siblings = this.parentNode && this.parentNode.childNodes;

  if (this.node.parentNode) {
    this.node.parentNode
      .removeChild(this.node);

    siblings
      .splice(siblings.indexOf(this), 1);
  }

  if (isOnBody) {
    unmount(this);
  }

  return this;
};


Node.prototype.removeChild = function (a) {
  if (Array.isArray(a)) {
    a.forEach(function (a) { a.remove(); });
  } else {
    a.remove();
  }
  return this;
};


Node.prototype.removeClass = function (a) {
  var classList = this.classList();

  function filter(b) {
    return b !== a;
  }

  if (Array.isArray(a)) {
    a.forEach(function (b) {
      classList = classList.filter(filter);
    });
  } else {
    classList = classList.filter(filter);
  }

  this.node.className = classList.join(' ');
  return this;
};

Node.prototype.replaceWith = function (newNode) {
  unmount(this);

  if (this.node.parentNode) {
    this.node.parentNode.replaceChild(newNode.node, this.node);
  } else {
    this.node = newNode.node;
  }

  mount(newNode);
  return this;
};


Node.prototype.scrollHeight = function () {
  return this.node.scrollHeight;
};


Node.prototype.scrollTop = function (a) {
  if (typeof a === 'undefined') {
    return this.node.scrollTop;
  }
  
  this.node.scrollTop = a;
  return this;
};


Node.prototype.scrollWidth = function () {
  return this.node.scrollWidth;
};


Node.prototype.select = function (start, end) {
  if (['input', 'textarea'].indexOf(this.tagName) > -1) {
    if (
      typeof start === 'undefined'
      && typeof end === 'undefined'
    ) {
      return getSelection(this.node);
    }

    if (start < 0) {
      start = this.node.value.length + start;
    }

    if (end < 0) {
      end = this.node.value.length + end;
    }

    if (typeof end === 'undefined') {
      end = start;
    }

    this.node.focus();

    setSelection(this.node, start, end);

    return this;
  } else if (this.tagName === 'select') {
    if (typeof start === 'undefined') {
      return this.node.selectedIndex;
    } else {
      this.node.value = this.node.childNodes[start].value;
    }
  }
};


Node.prototype.siblings = function () {
  var p = this.parentNode;
  return p ? p.childNodes : [];
};


(function () {
  var process = {
    transform : function (value) {
      var str = [];

      if (typeof value === 'object') {
        for (var k in value) {
          if (typeof value[k] === 'number' || typeof value[k] === 'string') {
            str.push(k + '(' + toStyleUnit(k, value[k]) + ')');
          } else if (Array.isArray(value[k])) {
            str.push(
              k + '(' + value[k].map(partial(toPixel, k)).join(', ') + ')'
            );
          }
        }
        value = str.join(' ');
      }

      return value;
    }
  };

  function getStyle(node, property) {
    var computedStyle = window.getComputedStyle(node);
    var value = computedStyle[property];
    if (value) {
      return value.slice(-2) === 'px'
        ? Number(value.slice(0, -2))
        : value;
    }
    return computedStyle;
  }

  function toStyleUnit(name, value) {
    if (typeof value === 'number') {
      if (TO_PIXEL.indexOf(name) > -1) {
        return  value + 'px';
      } else if (TO_DEG.indexOf(name) > -1) {
        return value + 'deg';
      }
    }
    return value;
  }

  function style(node, property, value) {
    var prefixed = VENDOR_PREFIX[property] ? VENDOR_PREFIX[property] : property;
    if (typeof process[property] === 'function') {
      node.style[prefixed] = process[property](value);
    } else {
      node.style[prefixed] = toStyleUnit(property, value);
    }
  }

  Node.prototype.style = function (property, value) {
    if (typeof property === 'object') {
      for (var k in property) {
        style(this.node, k, property[k]);
      }
      return this;
    } else if (typeof property === 'string' && typeof value !== 'undefined') {
      style(this.node, property, value);
      return this;
    } else {
      return getStyle(this.node, property);
    }
  };
}());


Node.prototype.text = function (value) {
  if (typeof value !== 'undefined' && !(typeof value === 'boolean')) {
    this.node.textContent = value;
    return this;
  }
  return this.node.textContent.trim();
};


Node.prototype.textNodes = function () {
  var walk = document.createTreeWalker(this.node, NodeFilter.SHOW_TEXT, null, false);
  var nextNode = walk.nextNode();
  var nodeList = [];

  while (nextNode) {
    nodeList.push(nextNode);
    nextNode = walk.nextNode();
  }

  return nodeList;
};


Node.prototype.toggleClass = function (className) {
  if (this.hasClass(className)) {
    this.removeClass(className);
  } else {
    this.addClass(className);
  }
  return this;
};


Node.prototype.trigger = function (names, props) {
  var self = this;
  var subscribers = this.subscribers;
  names = names.toLowerCase().split(',');

  if (!this.node.disabled) {
    for (var i = 0, n = names.length; i < n; i++) {
      name = names[i].trim();
      if (name.length && subscribers[name]) {
        for (var x = 0, y = subscribers[name].length; x < y; x++) {
          subscribers[name][x].call(self, props);
        }
      }
    }
  }

  return this;
};


Node.prototype.uncheck = function () {
  this.node.checked = false;
  return this;
};


Node.prototype.value = function (value) {
  if (typeof value !== 'undefined') {
    this.node.value = value;
    return this;
  }

  return this.node.value
    ? this.node.value.trim()
    : this.node.value;
};


function createComponent(tagName, props, children) {
  var constructor = Component.lib[tagName];
  var component = new constructor(props, children);
  return component;
}


function el(tagName) {
  var props = {};
  var children = [];

  if (Array.isArray(arguments[1])) {
    children = arguments[1];
  } else {
    props = arguments[1];
    children = arguments[2] || children;
  }

  if (Component.lib[tagName]) {
    return createComponent(tagName, props, children);
  } else if (typeof tagName === 'string') {
    return new Node(tagName, props, children);
  } else if (isElement(tagName)) {
    return new Node(tagName, props, children, true);
  } else {
    throw new Error('The first argument for "el" must be either a Component or a valid HTML tag name. eg: el("div")');
  }
}


function initCustomEvent() {
  if (typeof window.CustomEvent !== 'function') {
    function CustomEvent (event, params) {
      var evt = document.createEvent('CustomEvent');

      params = params
      || {
        bubbles : false,
        cancelable : false,
        detail : undefined
      };

      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      );

      return evt;
    }

    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
  }
}


function initDoubleClick() {
  var isDoubleClick = false;

  // Double click
  document.addEventListener('click', function (e) {
    if (isDoubleClick) {
      e.target.dispatchEvent(
        new MouseEvent('doubleclick', {
          clientX : e.pageX,
          clientY : e.pageY,
          bubbles : true,
          cancelable : true
        })
      );

    } else {
      isDoubleClick = true;
    }

    setTimeout(function () {
      isDoubleClick = false;
    }, 250);

  });
}


function initDragAndDrop() {
  document.body.addEventListener('mousedown', function (e) {
    var startX = e.pageX;
    var startY = e.pageY;
    var isDrag = false;
    var target = e.target;

    function dragend(e) {
      var eve = new CustomEvent('dragend', {
        detail : {
          startX : startX,
          startY : startY,
          pageX : e.pageX,
          pageY : e.pageY,
          distanceX : e.pageX - startX,
          distanceY : e.pageY - startY,
        },
        target : target,
        bubbles : true,
        cancelable : true
      });

      document.body.removeEventListener('mousemove', dragmove);
      document.body.removeEventListener('mouseup', dragend);

      if (e.which === 1 && isDrag) {
        isDrag = false;
        document.body.style[ VENDOR_PREFIX.userSelect ] = '';
        document.body.style.cursor = '';
        target.dispatchEvent(eve);
      }
    }

    function dragmove(e) {
      var opt = {
        detail : {
          startX : startX,
          startY : startY,
          pageX : e.pageX,
          pageY : e.pageY,
          distanceX : e.pageX - startX,
          distanceY : e.pageY - startY,
        },
        target : target,
        bubbles : true,
        cancelable : true
      };

      if (
        Math.abs(startX - e.pageX) + Math.abs(startY - e.pageY) > 5
        && !isDrag
      ) {
        isDrag = true;
        target.dispatchEvent(new CustomEvent('dragstart', opt));
      } else if (isDrag) {
        target.dispatchEvent(new CustomEvent('dragmove', opt));
      }
    }

    // Ensure it's left click which starts the dragging
    if (e.which === 1) {
      document.body.addEventListener('mouseup', dragend);
      document.body.addEventListener('mousemove', dragmove);
    }
  });
}


// Normalize IE 9 input event
function initInputEvent() {
  if (IS_IE) {
    document.addEventListener(
      'keyup',
      function (e) {
        var index;

        if (isTextInput(e.target)) {
          index = IE_INPUT.node.indexOf(e.target);
          if (index === -1) {
            index = IE_INPUT.node.length;
            IE_INPUT.node.push(e.target);
            IE_INPUT.value.push([
              '',
              e.target.value
            ]);
          } else {
            IE_INPUT.value[index].shift();
            IE_INPUT.value[index].push(e.target.value);
          }

          if ((
            IE_INPUT.value[index][0] !== IE_INPUT.value[index][1]
          ) && (
            e.which === IS_DELETE_KEY || e.which === IS_BACKSPACE_KEY
          )) {
            e.target.dispatchEvent(
              new Event('input')
            );
          }
        }
      },
      false
    );
  }
}


function initVendorPrefixes() {
  var dummy = document.getElementsByTagName('*')[0];
  var styles = window.getComputedStyle(dummy);
  var prefix = false;
  var list = {};
  var property;

  for (var i = 0, n = PREFIXES.length; i < n; i++) {
    for (var x = 0, y = CSS_PREFIXED_PROPERTIES.length; x < y; x++) {
      property = PREFIXES[i] + CSS_PREFIXED_PROPERTIES[x][0].toUpperCase() + CSS_PREFIXED_PROPERTIES[x].slice(1);

      if (typeof styles[property] !== 'undefined') {
        if (!prefix) {
          prefix = PREFIXES[i];
        }
        list[CSS_PREFIXED_PROPERTIES[x]] = property;
      }
    }
  }

  VENDOR_PREFIX = list;
}


function initComponentMethods() {
  Component.fn("offset", function () {
    return this.document.offset();
  });
}


initCustomEvent();
initDoubleClick();
initDragAndDrop();
initInputEvent();
initComponentMethods();
initVendorPrefixes();

BODY = el(document.body);

el.fn = Node.fn;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    el : el,
    version : VERSION,
    Component : Component,
  };
} else if (typeof window !== 'undefined') {
  window.flatman = {
    el : el,
    version : VERSION,
    Component : Component,
  };
}

}(window));