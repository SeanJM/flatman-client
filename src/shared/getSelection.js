// From http://stackoverflow.com/questions/263743/caret-position-in-textarea-in-characters-from-the-start
function getSelection (node) {
  var
    start = 0,
    end = 0,
    normalized,
    range,
    textInputRange,
    endRange;

  if (typeof node.selectionStart === 'number') {
    start = node.selectionStart;
    end = node.selectionEnd;
  } else {
    range = document.selection.createRange();

    if (range && range.parentElement() === node) {
      normalized = node.value.replace(/\r\n/g, "\n");

      // Create a working TextRange that lives only in the input
      textInputRange = node.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = node.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
        start = end = node.value.length;
      } else {
        start = -textInputRange.moveStart("character", -node.value.length);
        start += normalized.slice(0, start).split("\n").length - 1;

        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
          end = node.value.length;
        } else {
          end = -textInputRange.moveEnd("character", -node.value.length);
          end += normalized.slice(0, end).split("\n").length - 1;
        }
      }
    }
  }

  return [ start, end ];
}