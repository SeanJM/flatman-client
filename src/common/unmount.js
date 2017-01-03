function unmount(element) {
  var index = MOUNTED.indexOf(element);
  if (index > -1) {
    element.trigger('unmount');
    element.childNodes.forEach(unmount);
    MOUNTED.splice(index, 1);
  }
}