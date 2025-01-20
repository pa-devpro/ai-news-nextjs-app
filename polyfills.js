if (typeof setImmediate === 'undefined') {
  if (typeof window !== 'undefined') {
    window.setImmediate = function (fn) {
      return setTimeout(fn, 0);
    };
  } else if (typeof global !== 'undefined') {
    global.setImmediate = function (fn) {
      return setTimeout(fn, 0);
    };
  }
}