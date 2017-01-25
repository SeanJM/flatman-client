Node.prototype.attr = function () {
  var attrObject = {};
  var attr = this.node.attributes;
  var self = this;

  function setAttrPropValue(prop, value) {
    if (prop === 'className') {
      self.className(value);
    } else if (self.isSVG) {
      self.node.setAttributeNS('http://www.w3.org/1999/xlink', prop, value);
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
