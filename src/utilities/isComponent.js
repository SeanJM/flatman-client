function isComponent(C) {
  return (
    typeof C === 'object'
    && C.constructor.name !== 'Object'
    && C.constructor.name !== 'Array'
    && C.constructor.name[0][0].toUpperCase() === C.constructor.name[0][0]
  );
}
