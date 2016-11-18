var a = el('div', [
  el('div'),
  el('div')
]);

a.text('span');

return {
  left : a.textNodes()[0].nodeValue,
  right : 'span'
};
