if (typeof setImmediate === 'undefined') {
    window.setImmediate = function (fn) {
      return setTimeout(fn, 0);
    };
  }