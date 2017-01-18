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
