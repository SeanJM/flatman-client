function CreateNode (target, opt, text) {
  var self = this;

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
  setAttributes(this);
  normalizeTextInput(this);

  if (typeof text === 'string') {
    this._node_.innerHTML = text;
  }
}

function createNode (target, opt, text) {
  return new CreateNode(target, opt, text);
}
