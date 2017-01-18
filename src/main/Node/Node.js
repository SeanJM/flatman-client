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
  this.attr(opt);
  this.append(children);

  this.node.style.transform = this.node.style[VENDOR_PREFIX.transform];
  this.node.style.userSelect = this.node.style[VENDOR_PREFIX.userSelect];
  this.node.style.userModify = this.node.style[VENDOR_PREFIX.userModify];

  bindDragAndDrop(this);
}
