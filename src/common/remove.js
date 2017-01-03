function remove(element) {
  getNode(element.parentNode).removeChild(element.node);
  unmount(element);
}