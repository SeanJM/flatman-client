var el = flatman.el;
    var a = el('div');
    var result = [];

    var b = [
      el('div'),
      el('div'),
      el('div'),
    ];

    var c = [
      el('div'),
      el('div'),
      el('div'),
    ];

    a.append(b);

    result.push(a.children().length === 3);
    a.children(c);

    result.push(a.children().length === 3);
    result.push(a.children(0) === c[0]);
    result.push(a.children(1) === c[1]);
    result.push(a.children(2) === c[2]);

    return {
      left : (
        result[0] === true && result[1] === true && result[2] === true && result[3] === true && result[4] === true
      ),
      right : true
    };