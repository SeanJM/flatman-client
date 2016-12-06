function isElement (a) {
  var validElements = ['HTML', 'SVGS', 'SVGU'];
  var stringValue = Object.prototype.toString.call(a).substr(8, 4);
  return validElements.indexOf(stringValue) !== -1;
}
