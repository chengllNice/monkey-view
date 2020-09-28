(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("monkey/default/locale/en-US", ["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.MONKEY.default.lang = global.MONKEY.default.lang || {}; 
    global.MONKEY.default.lang.enUS = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = {
    m: {
      locale: 'en-US',
      select: {
        loading: 'Loading',
        emptyData: 'No Data',
        placeholder: 'Select'
      },
      datePicker: {
        selectDate: 'Select date',
        selectTime: 'Select time',
        ok: 'OK',
        clean: 'Clean',
        year: '',
        month: '',
        startTime: 'Start Time',
        endTime: 'End Time',
        weeks: {
          sun: 'Sun',
          mon: 'Mon',
          tue: 'Tue',
          wed: 'Wed',
          thu: 'Thu',
          fri: 'Fri',
          sat: 'Sat'
        },
        months: {
          m1: 'Jan',
          m2: 'Feb',
          m3: 'Mar',
          m4: 'Apr',
          m5: 'May',
          m6: 'Jun',
          m7: 'Jul',
          m8: 'Aug',
          m9: 'Sep',
          m10: 'Oct',
          m11: 'Nov',
          m12: 'Dec'
        }
      },
      drawer: {
        okText: 'OK',
        cancelText: 'Cancel'
      },
      modal: {
        okText: 'OK',
        cancelText: 'Cancel'
      },
      page: {
        total: 'Total',
        item: 'item',
        goto: 'GoTo',
        page: 'page'
      },
      popover: {
        okText: 'OK',
        cancelText: 'Cancel'
      },
      table: {
        emptyData: 'No Data',
        all: 'All',
        reset: 'Reset',
        filter: 'Filter'
      },
      tree: {
        emptyData: 'No Data'
      }
    }
  };
  _exports.default = _default;
});