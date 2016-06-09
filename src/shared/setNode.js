function setNode (self, target) {
  if (typeof target === 'string') {
    self._node_ = document.createElement(target);
  } else if (target instanceof CreateNode) {
    self._class_ = target._class_;
    self._dimensions_ = target._class_;
    self._subscribers_ = target._subscribers_;
    self._node_ = target._node_;
  } else if (isNode(target) || target === window) {
    self._node_ = target;
  }

  throw 'Invalid arguements';
}
