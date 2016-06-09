function setSelection (node, start, end) {
  if (node.setSelectionRange) {
    node.setSelectionRange(start, end);
  } else if (node.createTextRange) {
    var range = node.createTextRange();
    range.collapse(true);
    range.moveStart('character', start);
    range.moveEnd('character', end);
    range.select();
  }
}