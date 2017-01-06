function unmount(element) {
  if (element.trigger) {
    element.trigger('unmount');
    if (element.childNodes) {
      element.childNodes.forEach(unmount);
    }
  }
}