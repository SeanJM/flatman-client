function isObject (a) {
  return Object.prototype.toString.call(a) === '[object Object]'
  && (a.constructor.name === 'Object' || typeof a.constructor.name === 'undefined');
}
