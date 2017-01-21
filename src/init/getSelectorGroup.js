function getSelectorGroup(s) {
  var group = [];
  var open = false;
  var n = s.length;
  var i = 0;
  var cur = '';

  s = s.replace(/\s+/g, ' ');

  while (i < n) {
    if (s[i] === '[' && s[i - 1] !== '\'') {
      open = true;
      cur += s[i];
    } else if (s[i] === ']' && s[i - 1] !== '\'') {
      open = false;
      cur += s[i];
    } else if (s[i] === ' ' && !open) {
      group.push(cur);
      cur = '';
    } else {
      cur += s[i];
    }
    i++;
  }

  group.push(cur);
  return group;
};