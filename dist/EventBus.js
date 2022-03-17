(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.OneSocket = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray(list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);

    while (i--) {
      ret[i] = list[i + start];
    }

    return ret;
  }

  var EventBus = /*#__PURE__*/function () {
    function EventBus() {
      _classCallCheck(this, EventBus);

      this.events = Object.create(null);
    }

    _createClass(EventBus, [{
      key: "on",
      value: function on(event, fn) {
        var that = this;

        if (Array.isArray(event)) {
          event.forEach(function (name) {
            that.on(name, fn);
          });
        } else {
          (that.events[event] && (that.events[event] = [])).push(fn);
        }

        return that;
      }
    }, {
      key: "emit",
      value: function emit(event) {
        var that = this;
        var cbs = that.events[event];

        if (cbs) {
          var args = toArray(arguments, 1);
          cbs.forEach(function (cb) {
            cb.apply(that, args);
          });
        }

        return that;
      }
    }, {
      key: "once",
      value: function once(event, fn) {
        var that = this;

        function on() {
          that.off(event, on);
          fn.apply(that, arguments);
        }

        on.fn = fn;
        that.on(event, on);
        return that;
      }
    }, {
      key: "off",
      value: function off(event, fn) {
        var that = this;

        if (!arguments.length) {
          that.events = Object.create(null);
          return that;
        }

        if (Array.isArray(event)) {
          event.forEach(function (name) {
            that.off(name, fn);
          });
          return that;
        }

        var cbs = that.events[event];
        if (!cbs) return that;

        if (!fn) {
          that.events[event] = null;
          return that;
        } // specific handler


        var cb;
        var i = cbs.length;

        while (i--) {
          cb = cbs[i];

          if (cb === fn || cb.fn === fn) {
            cbs.splice(i, 1);
            break;
          }
        }

        return that;
      }
    }]);

    return EventBus;
  }();

  return EventBus;

}));
