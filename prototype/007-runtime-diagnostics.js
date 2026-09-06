(function (root) {
  'use strict';

  var errors = [];
  var originalError = console.error.bind(console);
  console.error = function () {
    errors.push(Array.from(arguments).map(function (value) {
      if (value instanceof Error) return value.stack || value.message;
      try { return typeof value === 'string' ? value : JSON.stringify(value); }
      catch (error) { return String(value); }
    }).join(' '));
    originalError.apply(console, arguments);
  };
  root.addEventListener('error', function (event) {
    errors.push(event.error && event.error.stack ? event.error.stack : event.message);
  });
  root.addEventListener('unhandledrejection', function (event) {
    var reason = event.reason;
    errors.push(reason && reason.stack ? reason.stack : String(reason));
  });
  root.__evaRuntimeErrors = errors;
})(window);
