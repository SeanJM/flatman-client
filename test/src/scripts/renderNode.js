function renderNode(node, n) {
  return '{tab}&lt;{tag}{attr}&gt;{children}{tab}&lt;/{tag}&gt;'.replace(/\{(\w+)}/g, function (a, b) {
    var x = [];
    var y;
    if (b === 'tag') {
      return node.node.tagName.toLowerCase();
    } else if (b === 'attr') {
      y = node.attr();
      for (var k in y) {
        x.push(k + '="' + y[k] + '"');
      }
      return x.length ? ' ' + x.join(' ') : '';
    } else if (b === 'children') {
      if (node.children()) {
        return node.children().map(function (c) {
          return renderNode(c, n + 1);
        }).join('');
      }
    }
    return '';
  });
}