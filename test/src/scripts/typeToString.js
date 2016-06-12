function typeToString(res) {
  var type = Object.prototype.toString.call(res);
  var t;
  var a;
  if (type === '[object Text]') {
    return type + ': "' + res.nodeValue + '"';
  } else if (type === '[object Array]') {
    return '[\n' + res.map(function (a) {
      return '  ' + typeToString(a);
    }).join(',\n') + '\n]';
  } else if (type === '[object String]') {
    return '"' + res + '"';
  } else if (type === '[object Number]') {
    return res;
  } else if (res && res.node) {
    return renderNode(res, 0);
  } else if (type.indexOf('[object HTML') !== -1) {
    return renderNode(el(res), 0);
  } else if (type === '[object Object]') {
    t = '{';
    a = [];
    for (var k in res) {
      a.push('\n  ' + k + ' : ' + typeToString(res[k]));
    }
    t += a.join(',') + '\n}';
    return t;
  } else if (type === '[object Boolean]') {
    return res ? 'true' : 'false';
  }
}