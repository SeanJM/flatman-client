function isComponent(C) {
  return (
    typeof C === 'object'
    && Object.prototype.toString.call(C) === '[object Object]'
    && C.constructor.name !== 'Object'
    && C.constructor.name[0][0].toUpperCase() === C.constructor.name[0][0]
  );
}
