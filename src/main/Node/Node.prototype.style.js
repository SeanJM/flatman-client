function getStyle(node, property) {
  var computedStyle = window.getComputedStyle(node);
  var value = computedStyle[property];

  if (value) {
    return value.slice(-2) === "px"
      ? Number(value.slice(0, -2))
      : value;
  }

  return computedStyle;
}

function toStyleUnit(name, value) {
  if (typeof value === "number") {
    if (TO_PIXEL.indexOf(name) > -1) {
      return  value + "px";
    } else if (TO_DEG.indexOf(name) > -1) {
      return value + "deg";
    }
  }
  return value;
}

Node.prototype.style = function (property, value) {
  var transform = [];
  var list = [];
  var prefixed;

  if (typeof property === "object") {
    for (var k in property) {
      prefixed = VENDOR_PREFIX[k] || k;

      if (k.indexOf("translate") === 0 || k.indexOf("scale") === 0 || k.indexOf("rotate") === 0) {
        transform.push(
          k + "(" + toStyleUnit(k, property[k]) + ")"
        );
      } else {
        list.push({
          property : prefixed,
          value : toStyleUnit(k, property[k])
        });
      }
    }

    if (transform.length) {
      list.push({
        property: "transform",
        value : transform.join(" ")
      });
    }

    for (var i = 0, n = list.length; i < n; i++) {
      this.node.style[list[i].property] = list[i].value;
    }
  } else if (typeof property === "string" && typeof value !== "undefined") {
    prefixed = VENDOR_PREFIX[property] || property;
    this.node.style[prefixed] = toStyleUnit(property, value);
  } else {
    return getStyle(this.node, property);
  }

  return this;
};
