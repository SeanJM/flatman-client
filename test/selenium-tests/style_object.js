var a = el('div');

a.style({ fontSize :  13 });
a.appendTo(document.body);

return {
  left : window.getComputedStyle(a.node).fontSize === '13px',
  right : true
};
