var a;

el('div', { class : '_1' }, [
  el('div', { class : '1_1'}, [
    a = el('div', { class : '1_1_1'})
  ])
]);

return {
  left : a.selectorPath(),
  right : 'div._1 div.1_1 div.1_1_1'
};
