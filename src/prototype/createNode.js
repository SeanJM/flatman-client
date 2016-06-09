/*
  Argument format
  CreateNode([String], [Object], [Text | CreateNode Object | Array | Node ])
*/

function CreateNode () {
  var self = this;
  var target;
  var opt;
  var child;

  var i = 0;
  var n = arguments.length;
  var a = new Array(n);

  for (; i < n; i++) {
    a[i] = arguments[i];
  }

  if (isArray(a[0]) && a.length === 1) {
    target = a[0][0];
    opt = a[0][1];
    child = a[0].length <= 3 ? a[0][2] : a[0].slice(2);
  } else {
    target = a[0];
    opt = a[1];
    child = a.length <= 3 ? a[2] : a.slice(2);
  }

  this._class_ = [];

  this._subscribers_ = {};

  this._dimensions_ = {
    bottom : undefined,
    height : undefined,
    left : undefined,
    right : undefined,
    top : undefined,
    width : undefined,
  };

  setNode(this, target);
  setAttributes(this._node_, opt);
  normalizeTextInput(this);
  appendChild(this._node_, child);
}

function createNode (target, opt, child) {
  switch (arguments.length) {
    case 1 :
    return new CreateNode(target);
    case 2 :
    return new CreateNode(target, opt);
    default :
    return new CreateNode(target, opt, child);
  }
}
