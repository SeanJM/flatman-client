function unmount(element) {
  if (element.trigger) {
    element.trigger('unmount');
    element.childNodes.forEach(unmount);
  }
}