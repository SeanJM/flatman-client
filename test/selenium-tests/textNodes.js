var a = el(
  el(),
  el()
);

a.text('span');

return {
  left : a.textNodes()[0].nodeValue,
  right : 'span'
};
