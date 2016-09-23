/*
  Argument format
  CreateNode([String], [Object], [Text | CreateNode Object | Array | Node ])
*/

function CreateNode () {
  var children = [];
  var i = 1;
  var n = arguments.length;

  this.isSVG = SVG_TAGNAMES.indexOf(arguments[0]) !== -1;
  this.subscribers = {};

  if (arguments[0] instanceof CreateNode) {
    this.node = arguments[0].node;
    this.subscribers = arguments[0].subscribers;
  } else if (isElement(arguments[0]) || arguments[0] === window) {
    this.node = arguments[0];
  } else if (
    typeof arguments[0] === 'string'
    || isObject(arguments[0])
    || isUndefined(arguments[0])
  ) {
    if (typeof arguments[0] === 'string') {
      this.node = this.isSVG
        ? document.createElementNS(SVG_NAMESPACE, arguments[0])
        : this.node = document.createElement(arguments[0]);
    } else if (isObject(arguments[0]) || isUndefined(arguments[0])) {
      this.node = document.createElement('div');
      i = 0;
    }

    for (; i < n; i++) {
      if (arguments[i] instanceof CreateNode) {
        children.push(arguments[i].node);
      } else if (typeof arguments[i] === 'string' || isNumber(arguments[i])) {
        children.push(new Text(arguments[i]));
      } else if (
        arguments[i]
        && arguments[i].node
        && arguments[i].node.document instanceof CreateNode
      ) {
        children.push(arguments[i].node.document.node);
      } else if (isObject(arguments[i])) {
        this.attr(arguments[i]);
      }
    }
  }

  appendChild.apply(null, [this.node].concat(children));

  if (isElement(this.node)) {
    this.tag = this.node.tagName.toLowerCase();
    this.node.style.transform = this.node.style[VENDOR_PREFIX.transform];
    this.node.style.userSelect = this.node.style[VENDOR_PREFIX.userSelect];
    this.node.style.userModify = this.node.style[VENDOR_PREFIX.userModify];
  }

  bindIEInputEvent(this);
  bindDragAndDrop(this);
}
