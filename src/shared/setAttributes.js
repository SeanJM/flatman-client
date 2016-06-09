function setAttributes (self) {
  for (var k in opt) {
    if (k === 'class') {
      self._class_ = opt[k].split(' ').map(trim).filter(hasLength).sort();
      self._node_.className = self._class_.join(' ');
    } else if (k === 'text') {
      self._node_.innerHTML = opt[k];
    } else if (k === 'style') {
      self._node_.setAttribute(k, toStyleString.call(self, opt[k]));
    } else {
      self._node_.setAttribute(k, opt[k]);
    }
  }
}
