function isNode (a) {
  return /^\[object HTML/.test(Object.prototype.toString.call(a));
}
