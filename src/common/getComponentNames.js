function getComponentNames(component, node) {
  if (node.children) {
    node.children().forEach(function (child) {
      var name = child.name && child.name();
      var temp = child;
      if (name && !component.names[name]) {
        while (temp.component) {
          temp = temp.component;
        }
        component.names[name] = temp;
      }
      getComponentNames(component, child);
    });
  }
}