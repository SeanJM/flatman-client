function toStyleString(styleObject) {
  var string = '';
  var property;
  var value;

  for (property in styleObject) {
    value = styleObject[property];

    if (JS_PROPERTY_TO_CSS.hasOwnProperty(property)) {
      property = JS_PROPERTY_TO_CSS[property];
    }

    if (typeof value === 'number' && CSS_PROPERTY_IS_NUMBER.indexOf(property) === -1) {
      value += 'px';
    }

    string += property + ': ' + value + '; ';
  }

  return string;
}
