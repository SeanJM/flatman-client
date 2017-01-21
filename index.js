(function () {
function getNode(element) {
  var target = element && element.node
    ? element.node
    : element;

  var str = target.toString();

  if (str.substr(1, 6) === 'object' && str.substr(-8, 7) === 'Element') {
    return target;
  }

  return getNode(element.node.document);
}

if (typeof module === 'object') module.exports = getNode;

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

function Component() {}
Component.lib = {};

Component.create = function (name, methods) {
  var methodList = [];
  var C = function () {};

  function Constructor(fn) {
    return function (opt) {
      fn.call(this, opt);
    };
  }

  function wrapper(k) {
    return function () {
      var i = 0;
      var n = arguments.length;
      var $arguments = new Array(n);
      var result;

      for (;i < n; i++) {
        $arguments[i] = arguments[i];
      }

      result = methods[k].apply(this, $arguments);

      return result;
    };
  }

  for (var k in methods) {
    if (methods.hasOwnProperty(k)) {
      methodList.push(k);
      if (k === 'constructor') {
        C = Constructor(methods[k]);
      }
    }
  }

  for (method in methods) {
    if (method === 'append') {
      C.prototype.append = Component.facade.append(methods[method]);
    } else if (method !== 'constructor') {
      C.prototype[method] = wrapper(method);
    }
  }

  for (var method in Component.prototype) {
    if (typeof C.prototype[method] === 'undefined') {
      C.prototype[method] = Component.prototype[method];
    }
  }

  Component.lib[name] = C;
  return C;
};

Component.extend = function () {
  var i = 0;
  var n = arguments.length;

  function each(a) {
    if (typeof a.prototype.append === 'function') {
      a.prototype.append = Component.facade.append(a.prototype.append);
    }

    if (typeof a.prototype.remove === 'function') {
      a.prototype.remove = Component.facade.remove(a.prototype.remove);
    }

    for (var k in Component.prototype) {
      if (typeof a.prototype[k] === 'undefined') {
        a.prototype[k] = Component.prototype[k];
      }
    }
  }

  for (; i < n; i++) {
    each(arguments[i]);
  }
};

Component.facade = function (methods) {
  if (Array.isArray(methods)) {
    methods.forEach(function (method) {
      if (!Component.prototype[method]) {
        Component.prototype[method] = Component.facade.method(method);
      }
    });
  } else {
    throw 'Invalid argument for Component.facade. The argument must be an array of methods.';
  }
};

Component.facade.append = function (append) {
  return function (children) {
    append.call(this, children);
    this.mapChildrenToNode(children);
    return this;
  };
};

Component.facade.method = function (method) {
  return function () {
    var i = 0;
    var n = arguments.length;
    var $arguments = new Array(n);
    var root = this.node.document;
    var result;

    for (;i < n; i++) {
      $arguments[i] = arguments[i];
    }

    result = root[method].apply(root, $arguments);
    return typeof result === 'undefined' ? this : result;
  };
};
Component.prototype.after = function (target) {
  var childNodes = this.parentComponent.childNodes;

  if (typeof target === 'undefined') {
    return childNodes[childNodes.indexOf(target) + 1];
  }

  this.node.document.after(target);
  childNodes.splice(childNodes.indexOf(this) + 1, 0, target);

  return this;
};

Component.prototype.append = function (children) {
  this.mapChildrenToNode(children);
  this.node.document.append(children);
  return this;
};

Component.prototype.closest = function (selector) {
  var p = this.parentComponent;

  if (Component.lib[selector]) {
    selector = Component.lib[selector];
    while (p) {
      if (p instanceof selector) {
        return p;
      }
      p = p.parentComponent;
    }
  } else {
    return this.node.document.closest(selector);
  }

  return false;
};

Component.prototype.disable = function () {
  this.node.document.disable();
  this.node.document.childNodes.forEach(function (a) {
    a.disable();
  });
  return this;
};

Component.prototype.enable = function () {
  this.node.document.enable();
  this.node.document.childNodes.forEach(function (a) {
    a.enable();
  });
  return this;
};

Component.prototype.mapChildrenToNode = function (children) {
  var self = this;

  children.forEach(function (child) {
    var name = child.name && child.name();
    if (name) {
      self.node[name] = child;
    }
  });
  return this;
};

Component.prototype.mount = function () {
  function triggerMount(element) {
    element.trigger('mount');

    if (element.node.document) {
      element.node.document.trigger('mount');
    }
  }

  triggerMount(this);
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

  return this;
};

Component.prototype.once = function (names, callback) {
  var self = this;

  function ref(e) {
    callback.call(self, e);
    self.off(names, ref);
  }

  this.on(names, ref);

  return this;
};

Component.prototype.prepend = function (children) {
  var self = this;

  this.childNodes = this.childNodes || [];

  this.mapChildrenToNode(children);
  this.node.document.prepend(children);
  [].shift.apply(this.childNodes, children);

  children.forEach(function (child) {
    child.parentComponent = self;
    self.childNodes.push(child);
  });

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
    $names = filterNames(names.toLowerCase());
    object = object || { target : this };
  } else {
    $names = filterNames(object.type.toLowerCase());
    object.target = object.target || this;
  }

  $names.forEach(function (name) {
    self.subscribers[name]
      .slice()
      .forEach(function (callback) {
        var $object = Object.assign(
          {},
          object,
          { type : name }
        );
        callback.call(self, $object);
      });
  });

  return this;
};

if (typeof module === 'object' && module.exports) {
  module.exports = Component;
}

function appendChild(element, children) {
  var f = document.createDocumentFragment();

  var childNodes = children.map(function (child) {
    return child.getNode
      ? child.getNode()
      : child;
  });

  childNodes.forEach(function (child) {
    if (child.node) { child.parentNode = element; }
    f.appendChild(child.node ? child.node : new Text(child));
  });

  element.childNodes = element.childNodes.concat(childNodes);
  element.node.appendChild(f);
  childNodes.forEach(mount);
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
function mount(child) {
  if (child.hasParent) {
    if (child.hasParent(BODY)) {
      child.trigger('mount');
    }
    child.children().forEach(mount);
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
    element.children().forEach(unmount);
  }
}
var VERSION = '1.3.8';

var CSS_PROPERTY_IS_NUMBER = [
  'z-index',
  'opacity'
];

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

function hasParent(node) {
  var i = 1;
  var n = arguments.length;
  var $arguments = [];
  var parents = [];
  var parent = getNode(node.parentNode);
  var selectorMap = [];

  while (parent) {
    parents.push(parent);
    parent = getNode(parent.parentNode);
  }

  // First check for elements in the array
  for (; i < n; i++) {
    $arguments = $arguments.concat(arguments[i]);
  }

  i = 0;
  n = $arguments.length;
  for (; i < n; i++) {
    if (parents.indexOf(getNode($arguments[i])) > -1) {
      return true;
    }
  }

  return false;
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

function createComponent(tagName, opt, array) {
  var i = 1;
  var n = arguments.length;
  var k;
  var constructor = Component.lib[tagName];
  var hasAppend = typeof constructor.prototype.append === 'function';
  var hasText = typeof constructor.prototype.text === 'function';
  var component = new constructor(opt);
  var children = [];
  var strings = [];

  function getNames(node) {
    if (node.children) {
      node.children().forEach(function (child) {
        var name = child.name();
        if (name) {
          component.node[name] = child;
        }
        getNames(child);
      });
    }
  }

  component.tagName = tagName;
  component.node = component.node || {};
  component.dict = component.dict || {};

  if (hasText) {
    array.forEach(function (child) {
      if (typeof child === 'string' || typeof child === 'number') {
        strings.push(child);
      } else {
        children.push(child);
      }
    });
  } else {
    children = array;
  }

  for (k in opt) {
    component.dict[k] = opt[k];
  }

  if (typeof component.render === 'function') {
    component.node.document = component.render(opt);
    if (component.node.document) {
      component.node.document.componentTagName = tagName;
      getNames(component.node.document);
    } else {
      throw new Error('Invalid component, component must return a node in the render function.');
    }
  }

  if (children.length && hasAppend) {
    component.append(children);
  }

  if (strings.length) {
    component.text.apply(component, strings);
  }

  return component;
}

function el(tagName) {
  var i = 1;
  var n = arguments.length;

  var opt = {};
  var children = [];

  switch (arguments.length) {
    case 2 :
      if (Array.isArray(arguments[1])) {
        children = arguments[1];
      } else {
        opt = arguments[1];
      }
      break;
    case 3 :
      opt = arguments[1];
      children = arguments[2];
      break;
  }

  if (Component.lib[tagName]) {
    return createComponent(tagName, opt, children);
  } else if (typeof tagName === 'string') {
    return new Node(tagName, opt, children);
  } else if (isElement(tagName)) {
    return new Node(tagName, opt, children, true);
  } else {
    throw new Error('The first argument for "el" must be either a Component or a valid HTML tag name. eg: el("div")');
  }
}

/*
  Argument format
  Node([String], [Object], [Text | Node Object | Array | Node ])
*/

function Node(tagName, opt, children, isElement) {
  var i = 1;
  var n = arguments.length;

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

  this.node.className = classList.sort().join(' ');
  return this;
};

Node.prototype.append = function (array) {
  if (arguments.length > 1) {
    throw 'You have too many arguments (' + arguments.length + ') for \'.append\', it takes a single array.';
  } else if (Array.isArray(array)) {
    appendChild(this, array);
  } else {
    throw 'Invalid argument type (' + typeof array + ') for .append';
  }
  return this;
};

Node.prototype.appendTo = function (target) {
  if (isElement(target)) {
    appendChild(el(target), [ this ]);
  } else {
    appendChild(target, [ this ]);
  }
  return this;
};

Node.prototype.attr = function () {
  var attrObject = {};
  var attr = this.node.attributes;
  var self = this;

  function setAttrPropValue(prop, value) {
    if (self.isSVG) {
      self.node.setAttributeNS('http://www.w3.org/1999/xlink', prop, value);
    } else if (prop === 'className') {
      self.className(value);
    } else if (prop === 'style') {
      self.style(value);
    } else if ('once' === prop.substr(0, 4)) {
      self.once(prop.substr(4), value);
    } else if ('on' === prop.substr(0, 2)) {
      self.on(prop.substr(2), value);
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

  if (Array.isArray(children)) {
    for (var i = 0, n = children.length; i < n; i++) {
      f.append(getNode(children[i]));
    }
  } else if (!Array.isArray(children) || arguments.length > 1) {
    throw 'Before takes a single array as an argument';
  }

  this.node.parentNode.insertBefore(f, this.node);
  this.parentNode.childNodes = this.parentNode.childNodes.concat(children);
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
  }
  return typeof a === 'number' ? this.childNodes[a] : this.childNodes;
};

Node.prototype.classList = function () {
  var className = this.node.className.split(' ');
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

  value = Array.isArray(value) ? value.sort().join(' ') : value;

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
  var elNode = el(this.node.cloneNode(true));

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

  getRel(elNode);
  return elNode;
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

Node.prototype.contains = function (maybeList) {
  function contains(node, a) {
    a = a.getNode().node;
    return node.contains(a) && a !== node;
  }

  if (Array.isArray(maybeList)) {
    for (var x = 0, y = maybeList.length; x < y; x++) {
      if (contains(this.node, maybeList[x])) {
        return true;
      }
    }
  }

  return contains(this.node, maybeList);
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
        if (element.children) {
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
    var self = this;

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

Node.prototype.getNode = function () {
  return this;
};

Node.prototype.getSelector = function () {
  var attr = this.attr();
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
      return '[name="' + value + '"]';
    },
    title : function (value) {
      return '[title="' + value + '"]';
    },
    value : function (value) {
      return '[value="' + value + '"]';
    },
    type : function (value) {
      return '[type="' + value + '"]';
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

  for (var k in attr) {
  	if (typeof format[k] === 'function' && attr[k].length) {
			selector.push(format[k.toLowerCase()](attr[k]));
    }
  }

  if (siblings.length > 1 && typeof this.node.id === 'undefined') {
    selector.push(':nth-child(' + (siblings.indexOf(this.node) + 1) + ')');
  }

  return selector.join('').replace(/\n/g, '');
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

Node.prototype.hasParent = function (target) {
  return hasParent(this.node, target);
};

Node.prototype.html = function (a) {
  if (typeof a === 'undefined') {
    return this.node.innerHTML;
  }
  this.node.innerHTML = a;
  return this;
};

Node.prototype.is = function (selector) {
  const selectorObject = getSelectorObject(selector);
  const attributes = this.attr();

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

Node.prototype.on = function (names, callback) {
  function onWrap(self, name) {
    return function (event) {
      self.trigger(name, event);
    };
  }

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
  var p = this.node.parentNode;
  return isElement(p) ? el(p) : false;
};

Node.prototype.parents = function () {
  return parents(this.node).map(function (a) {
    return el(a);
  });
};

Node.prototype.prepend = function (children) {
  var i = 0;
  var n = children.length;

  if (!this.node.parentNode) {
    throw 'Cannot perform \'prepend\', node requires a parent';
  }

  if (Array.isArray(children)) {
    for (; i < n; i++) {
      children[i].parentNode = this;
      this.node.parentNode.insertBefore(children[i].getNode().node, this.node);
    }
    [].unshift.apply(this.childNodes, children.reverse());
  } else {
    throw 'prepend takes a single array as an argument';
  }
};

Node.prototype.prependTo = function (target) {
  var element = target.getNode();
  var children = element.node.childNodes;

  if (children.length) {
    element.node.insertBefore(this.node, children[0]);
  } else {
    element.node.appendChild(this.node);
  }

  element.childNodes.unshift(this);
  return this;
};

Node.prototype.remove = function () {
  var onBody = this.hasParent(BODY);
  var pChildNodes = this.parentNode.childNodes;

  this.node.parentNode.removeChild(this.node);
  pChildNodes.splice(pChildNodes.indexOf(this), 1);

  if (onBody) {
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
  newNode = el(
    getNode(newNode)
  );

  if (this.node.parentNode) {
    this.node.parentNode.replaceChild(newNode.node, this.node);
    return this;
  }

  this.node = newNode.node;
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

Node.prototype.selectorPath = function () {
  var path = [this.getSelector()];
  var p = this.node.parentNode;

  while (p) {
    path.unshift(el(p).getSelector());

    if (p === document.body || p.id.length > 0) {
      return path.join(' ');
    }

    p = p.parentNode;
  }

  return path.join(' ');
};

Node.prototype.siblings = function () {
  var children = this.node.parentNode ? this.node.parentNode.childNodes : [];
  var siblings = [];

  for (var i = 0, n = children.length; i < n; i++) {
    if (isElement(children[i])) {
      siblings.push(el(children[i]));
    }
  }

  return siblings;
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
    if (typeof process[property] === 'function') {
      node.style[property] = process[property](value);
    } else {
      node.style[property] = toStyleUnit(property, value);
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

Node.prototype.trigger = function () {
  var subscribers = this.subscribers;
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

  if (!this.node.disabled) {
    names.forEach(function (name) {
      name = name.trim();
      if (name.length && subscribers[name]) {
        subscribers[name].forEach(function (callback) {
          callback.call(self, Object.assign({}, detail, { type : name }));
        });
      }
    });
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
  document.body.addEventListener('click', function (e) {
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
    document.body.addEventListener(
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
  var styles = window.getComputedStyle(document.body);
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

initCustomEvent();
initDoubleClick();
initDragAndDrop();
initInputEvent();
initVendorPrefixes();

BODY = el(document.body);
Component.facade(Object.keys(Node.prototype));
el.fn = Node.fn;

if (typeof module === 'object') {
  module.export = {
    el : el,
    version : VERSION,
    Component : Component,
  };
} else if (window) {
  window.flatman = {
    el : el,
    version : VERSION,
    Component : Component,
  };
}
}());