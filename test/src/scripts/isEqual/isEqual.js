function isEqual(a, b) {
  if (typeof a === 'string' || typeof a === 'number' || typeof a === 'boolean') {
    return a === b;
  } else if (Array.isArray(a) && Array.isArray(b)) {
    return arrayIsEqual(a, b);
  } else if (typeof a === 'object' && typeof b === 'object') {
    return objectIsEqual(a, b);
  }
  return false;
}