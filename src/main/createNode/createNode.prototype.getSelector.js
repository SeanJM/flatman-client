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
