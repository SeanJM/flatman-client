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
