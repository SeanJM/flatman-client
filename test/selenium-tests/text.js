var a = el(
  el(),
  el()
);

a.text('text');

return {
  left : a.text(),
  right : 'text'
};
