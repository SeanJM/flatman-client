function mount(element) {
  function each(child) {
    if (MOUNTED.indexOf(child) === -1) {
      child.trigger('mount');
      child.childNodes.forEach(each);
      MOUNTED.push(child);
    }
  }
  element.childNodes.forEach(each);
}
