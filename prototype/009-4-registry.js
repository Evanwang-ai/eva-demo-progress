(function (root) {
  'use strict';
  var patches = [];
  root.__EVA_PATCHES = patches;
  root.__evaPatch = function (name, apply) {
    if (typeof name !== 'string' || typeof apply !== 'function') throw new TypeError('EVA runtime patch registration is invalid');
    patches.push({ name: name, apply: apply });
  };
  root.__evaCut = function (source, needle, replacement, label) {
    if (source.indexOf(needle) < 0) throw new Error('锚点不存在：' + label);
    return source.replace(needle, replacement);
  };
  root.__evaCutAll = function (source, pairs, label) {
    pairs.forEach(function (pair, index) {
      source = root.__evaCut(source, pair[0], pair[1], pair[2] || (label + ' 第 ' + (index + 1) + ' 条'));
    });
    return source;
  };
})(window);
