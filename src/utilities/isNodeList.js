function isNodeList (list) {
  return Object.prototype.toString.call(list) === '[object NodeList]';
}
