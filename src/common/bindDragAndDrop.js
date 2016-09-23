function bindDragAndDrop(self) {
  var subscribers = self.subscribers;

  function start() {
    if (subscribers.dragstart.length > 1) {
      document.body.style[VENDOR_PREFIX.userSelect] = 'none';
      document.body.style.cursor = 'default';
    }
  }

  function end() {
    if (subscribers.dragstart.length > 1) {
      document.body.style[VENDOR_PREFIX.userSelect] = '';
      document.body.style.cursor = '';
    }
  }

  if (
    subscribers.dragstart
    && subscribers.dragstart.indexOf(start) === -1
  ) {
    self.on('dragstart', start);
    self.on('dragend', end);
  }
}
