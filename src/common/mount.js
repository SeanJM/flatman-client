function mount(element) {
  if (
    element.hasParent
    && element.hasParent(BODY)
    && MOUNTED.indexOf(element) === -1
    && element.trigger
  ) {
    MOUNTED.push(element);
    element.trigger('mount');
  }

  if (element.childNods) {
    element.childNodes.forEach(mount);
  }
}
