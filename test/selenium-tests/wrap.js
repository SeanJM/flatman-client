var el = flatman.el;
var Component = flatman.Component;
var t;

Component.create('B', {
  value() {
    return 'b';
  },

  classify() {
    this.document.addClass('classify');
  },

  getClassify() {
    return 'classify';
  },

  render(props) {
    return el('div', {
      name : 'b',
      className : 'b'
    });
  }
});

Component.create('A', Component.wrap('B', {
  value() {
    return this.names.b.value();
  },

  render(props) {
    return el('div', [ this.component ]);
  }
}));

t = el('A');

t.classify();

return {
  left : t.value() === 'b' && t.getClassify() === 'classify',
  right : true
};