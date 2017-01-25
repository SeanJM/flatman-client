var el = flatman.el;
      var Component = flatman.Component;

      Component.lib = {};
      Component.create('C', {
        render() {
          return el('div', [ el('div', { name : 'b' }), el('div', { name : 'c' }) ]);
        }
      });

      Component.create('D', {
        render() {
          return el('C');
        }
      });

      var p = el('C');
      var q = el('D');

      return {
        left : (
          p.node.b.name() === 'b' &&
          p.node.c.name() === 'c' &&
          q.node.b.name() === 'b' &&
          q.node.c.name() === 'c'
        ),
        right : true
      };