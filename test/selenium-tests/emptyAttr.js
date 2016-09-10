var a = el('div');

a
  .attr('type', 'test')
  .attr('tabindex', '0');

return {
  left : a.attr(),
  right : {
    type : 'test',
    tabindex : '0'
  }
};
