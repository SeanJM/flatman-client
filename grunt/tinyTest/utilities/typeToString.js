function typeToString(value) {
  if (typeof value === 'undefined') {
    return 'undefined';
  } else if (Array.isArray(value)) {
    return '[' + value.map(typeToString).join(', ') + ']';
  } else if (typeof value === 'object') {
    return JSON.stringify(value);
  } else if (typeof value === 'string') {
    return '\"' + value + '\"';
  } else {
    return value;
  }
}

module.exports = typeToString;
