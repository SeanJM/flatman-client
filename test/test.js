function Comp () {
  this.el = cn('div',
    this.doc = cn('div', {
      class : 'child_child-1'
    }),
    this.an = cn('div', {
      class : 'child_child-2'
    }),
    this.an = cn('div', {
      class : 'child_child-3'
    }),
    this.ab = cn('div', {
      class : 'child_child-4'
    }),
    this.ab = cn('div', cn('div'))
  );
  console.log(this.el);
}

Comp.prototype.put = function () {
  this.el.appendTo(document.body);
};

var test = new Comp();

test.put();
