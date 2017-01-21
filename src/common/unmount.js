function unmount(element) {
  if (element.trigger) {
    element.trigger('unmount');
    element.children().forEach(unmount);
  }
}