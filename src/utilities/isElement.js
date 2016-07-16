function isElement (a) {
  return Object.prototype.toString.call(a).substr(0, 12) === '[object HTML'; 
}
