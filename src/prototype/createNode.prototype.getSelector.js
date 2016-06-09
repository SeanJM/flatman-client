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
