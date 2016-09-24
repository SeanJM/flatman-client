function isTextInput(node) {
  var types = ['text', 'password', 'phone', 'number'];
  var tagName = node.tagName;
  var isTextarea = tagName === 'TEXTAREA';
  var isText = tagName === 'INPUT' && types.indexOf(node.type) > -1;
  return isTextarea || isText;
}
