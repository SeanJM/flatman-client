var a;

el('div', { className : '_1' }, [
  el('div', { className : '1_1'}, [
    a = el('div', { className : '1_1_1'})
  ])
]);

return {
  left : a.selectorPath(),
  right : 'div._1 div.1_1 div.1_1_1'
};
