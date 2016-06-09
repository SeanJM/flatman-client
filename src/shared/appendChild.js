// From http://stackoverflow.com/questions/263743/caret-position-in-textarea-in-characters-from-the-start
function appendChild (node, child) {
  var f;

  if (typeof child === 'string') {
    node.innerHTML = child;
  } else if (child instanceof CreateNode) {
    node.appendChild(child._node_);
  } else if (isArray(child)) {
    // Is a node creation
    if (typeof child[0] === 'string') {
      node.appendChild(new CreateNode(child)._node_);
    } else {
      // Is a group
      f = new DocumentFragment();
      forEach(child, function (c) {
        appendChild(f, c);
      });
      node.appendChild(f);
    }
  } else if (isElement(child)) {
    node.appendChild(child);
  }
}
