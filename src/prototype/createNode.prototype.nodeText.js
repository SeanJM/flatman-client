CreateNode.prototype.nodeText = function () {
  return this._node_.innerHTML.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
};
