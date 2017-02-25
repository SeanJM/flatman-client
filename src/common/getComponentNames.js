function getComponentNames(component, node) {
  if (node.children) {
    node.children().forEach(function (child) {
      var name = child.name && child.name();
      if (name && !component.node[name]) {
        component.node[name] = child.component || child;
      }
      getComponentNames(component, child);
    });
  }
}