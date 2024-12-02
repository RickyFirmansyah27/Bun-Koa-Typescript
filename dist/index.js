// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/moment/moment.js
var require_moment = __commonJS((exports, module) => {
  //! moment.js
  //! version : 2.30.1
  //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
  //! license : MIT
  //! momentjs.com
  (function(global2, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.moment = factory();
  })(exports, function() {
    var hookCallback;
    function hooks() {
      return hookCallback.apply(null, arguments);
    }
    function setHookCallback(callback) {
      hookCallback = callback;
    }
    function isArray(input) {
      return input instanceof Array || Object.prototype.toString.call(input) === "[object Array]";
    }
    function isObject2(input) {
      return input != null && Object.prototype.toString.call(input) === "[object Object]";
    }
    function hasOwnProp(a, b) {
      return Object.prototype.hasOwnProperty.call(a, b);
    }
    function isObjectEmpty(obj) {
      if (Object.getOwnPropertyNames) {
        return Object.getOwnPropertyNames(obj).length === 0;
      } else {
        var k;
        for (k in obj) {
          if (hasOwnProp(obj, k)) {
            return false;
          }
        }
        return true;
      }
    }
    function isUndefined(input) {
      return input === undefined;
    }
    function isNumber(input) {
      return typeof input === "number" || Object.prototype.toString.call(input) === "[object Number]";
    }
    function isDate(input) {
      return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
    }
    function map3(arr, fn) {
      var res = [], i, arrLen = arr.length;
      for (i = 0;i < arrLen; ++i) {
        res.push(fn(arr[i], i));
      }
      return res;
    }
    function extend(a, b) {
      for (var i in b) {
        if (hasOwnProp(b, i)) {
          a[i] = b[i];
        }
      }
      if (hasOwnProp(b, "toString")) {
        a.toString = b.toString;
      }
      if (hasOwnProp(b, "valueOf")) {
        a.valueOf = b.valueOf;
      }
      return a;
    }
    function createUTC(input, format2, locale2, strict3) {
      return createLocalOrUTC(input, format2, locale2, strict3, true).utc();
    }
    function defaultParsingFlags() {
      return {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidEra: null,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [],
        era: null,
        meridiem: null,
        rfc2822: false,
        weekdayMismatch: false
      };
    }
    function getParsingFlags(m) {
      if (m._pf == null) {
        m._pf = defaultParsingFlags();
      }
      return m._pf;
    }
    var some;
    if (Array.prototype.some) {
      some = Array.prototype.some;
    } else {
      some = function(fun) {
        var t2 = Object(this), len = t2.length >>> 0, i;
        for (i = 0;i < len; i++) {
          if (i in t2 && fun.call(this, t2[i], i, t2)) {
            return true;
          }
        }
        return false;
      };
    }
    function isValid(m) {
      var flags = null, parsedParts = false, isNowValid = m._d && !isNaN(m._d.getTime());
      if (isNowValid) {
        flags = getParsingFlags(m);
        parsedParts = some.call(flags.parsedDateParts, function(i) {
          return i != null;
        });
        isNowValid = flags.overflow < 0 && !flags.empty && !flags.invalidEra && !flags.invalidMonth && !flags.invalidWeekday && !flags.weekdayMismatch && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
        if (m._strict) {
          isNowValid = isNowValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
        }
      }
      if (Object.isFrozen == null || !Object.isFrozen(m)) {
        m._isValid = isNowValid;
      } else {
        return isNowValid;
      }
      return m._isValid;
    }
    function createInvalid(flags) {
      var m = createUTC(NaN);
      if (flags != null) {
        extend(getParsingFlags(m), flags);
      } else {
        getParsingFlags(m).userInvalidated = true;
      }
      return m;
    }
    var momentProperties = hooks.momentProperties = [], updateInProgress = false;
    function copyConfig(to2, from2) {
      var i, prop, val, momentPropertiesLen = momentProperties.length;
      if (!isUndefined(from2._isAMomentObject)) {
        to2._isAMomentObject = from2._isAMomentObject;
      }
      if (!isUndefined(from2._i)) {
        to2._i = from2._i;
      }
      if (!isUndefined(from2._f)) {
        to2._f = from2._f;
      }
      if (!isUndefined(from2._l)) {
        to2._l = from2._l;
      }
      if (!isUndefined(from2._strict)) {
        to2._strict = from2._strict;
      }
      if (!isUndefined(from2._tzm)) {
        to2._tzm = from2._tzm;
      }
      if (!isUndefined(from2._isUTC)) {
        to2._isUTC = from2._isUTC;
      }
      if (!isUndefined(from2._offset)) {
        to2._offset = from2._offset;
      }
      if (!isUndefined(from2._pf)) {
        to2._pf = getParsingFlags(from2);
      }
      if (!isUndefined(from2._locale)) {
        to2._locale = from2._locale;
      }
      if (momentPropertiesLen > 0) {
        for (i = 0;i < momentPropertiesLen; i++) {
          prop = momentProperties[i];
          val = from2[prop];
          if (!isUndefined(val)) {
            to2[prop] = val;
          }
        }
      }
      return to2;
    }
    function Moment(config) {
      copyConfig(this, config);
      this._d = new Date(config._d != null ? config._d.getTime() : NaN);
      if (!this.isValid()) {
        this._d = new Date(NaN);
      }
      if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
      }
    }
    function isMoment(obj) {
      return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
    }
    function warn(msg) {
      if (hooks.suppressDeprecationWarnings === false && typeof console !== "undefined" && console.warn) {
        console.warn("Deprecation warning: " + msg);
      }
    }
    function deprecate(msg, fn) {
      var firstTime = true;
      return extend(function() {
        if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
          var args = [], arg, i, key, argLen = arguments.length;
          for (i = 0;i < argLen; i++) {
            arg = "";
            if (typeof arguments[i] === "object") {
              arg += `
[` + i + "] ";
              for (key in arguments[0]) {
                if (hasOwnProp(arguments[0], key)) {
                  arg += key + ": " + arguments[0][key] + ", ";
                }
              }
              arg = arg.slice(0, -2);
            } else {
              arg = arguments[i];
            }
            args.push(arg);
          }
          warn(msg + `
Arguments: ` + Array.prototype.slice.call(args).join("") + `
` + new Error().stack);
          firstTime = false;
        }
        return fn.apply(this, arguments);
      }, fn);
    }
    var deprecations = {};
    function deprecateSimple(name, msg) {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
      }
      if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
      }
    }
    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;
    function isFunction(input) {
      return typeof Function !== "undefined" && input instanceof Function || Object.prototype.toString.call(input) === "[object Function]";
    }
    function set3(config) {
      var prop, i;
      for (i in config) {
        if (hasOwnProp(config, i)) {
          prop = config[i];
          if (isFunction(prop)) {
            this[i] = prop;
          } else {
            this["_" + i] = prop;
          }
        }
      }
      this._config = config;
      this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source);
    }
    function mergeConfigs(parentConfig, childConfig) {
      var res = extend({}, parentConfig), prop;
      for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
          if (isObject2(parentConfig[prop]) && isObject2(childConfig[prop])) {
            res[prop] = {};
            extend(res[prop], parentConfig[prop]);
            extend(res[prop], childConfig[prop]);
          } else if (childConfig[prop] != null) {
            res[prop] = childConfig[prop];
          } else {
            delete res[prop];
          }
        }
      }
      for (prop in parentConfig) {
        if (hasOwnProp(parentConfig, prop) && !hasOwnProp(childConfig, prop) && isObject2(parentConfig[prop])) {
          res[prop] = extend({}, res[prop]);
        }
      }
      return res;
    }
    function Locale(config) {
      if (config != null) {
        this.set(config);
      }
    }
    var keys;
    if (Object.keys) {
      keys = Object.keys;
    } else {
      keys = function(obj) {
        var i, res = [];
        for (i in obj) {
          if (hasOwnProp(obj, i)) {
            res.push(i);
          }
        }
        return res;
      };
    }
    var defaultCalendar = {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L"
    };
    function calendar(key, mom, now2) {
      var output = this._calendar[key] || this._calendar["sameElse"];
      return isFunction(output) ? output.call(mom, now2) : output;
    }
    function zeroFill(number3, targetLength, forceSign) {
      var absNumber = "" + Math.abs(number3), zerosToFill = targetLength - absNumber.length, sign2 = number3 >= 0;
      return (sign2 ? forceSign ? "+" : "" : "-") + Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }
    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
    function addFormatToken(token2, padded, ordinal2, callback) {
      var func = callback;
      if (typeof callback === "string") {
        func = function() {
          return this[callback]();
        };
      }
      if (token2) {
        formatTokenFunctions[token2] = func;
      }
      if (padded) {
        formatTokenFunctions[padded[0]] = function() {
          return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
      }
      if (ordinal2) {
        formatTokenFunctions[ordinal2] = function() {
          return this.localeData().ordinal(func.apply(this, arguments), token2);
        };
      }
    }
    function removeFormattingTokens(input) {
      if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, "");
      }
      return input.replace(/\\/g, "");
    }
    function makeFormatFunction(format2) {
      var array3 = format2.match(formattingTokens), i, length;
      for (i = 0, length = array3.length;i < length; i++) {
        if (formatTokenFunctions[array3[i]]) {
          array3[i] = formatTokenFunctions[array3[i]];
        } else {
          array3[i] = removeFormattingTokens(array3[i]);
        }
      }
      return function(mom) {
        var output = "", i2;
        for (i2 = 0;i2 < length; i2++) {
          output += isFunction(array3[i2]) ? array3[i2].call(mom, format2) : array3[i2];
        }
        return output;
      };
    }
    function formatMoment(m, format2) {
      if (!m.isValid()) {
        return m.localeData().invalidDate();
      }
      format2 = expandFormat(format2, m.localeData());
      formatFunctions[format2] = formatFunctions[format2] || makeFormatFunction(format2);
      return formatFunctions[format2](m);
    }
    function expandFormat(format2, locale2) {
      var i = 5;
      function replaceLongDateFormatTokens(input) {
        return locale2.longDateFormat(input) || input;
      }
      localFormattingTokens.lastIndex = 0;
      while (i >= 0 && localFormattingTokens.test(format2)) {
        format2 = format2.replace(localFormattingTokens, replaceLongDateFormatTokens);
        localFormattingTokens.lastIndex = 0;
        i -= 1;
      }
      return format2;
    }
    var defaultLongDateFormat = {
      LTS: "h:mm:ss A",
      LT: "h:mm A",
      L: "MM/DD/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY h:mm A",
      LLLL: "dddd, MMMM D, YYYY h:mm A"
    };
    function longDateFormat(key) {
      var format2 = this._longDateFormat[key], formatUpper = this._longDateFormat[key.toUpperCase()];
      if (format2 || !formatUpper) {
        return format2;
      }
      this._longDateFormat[key] = formatUpper.match(formattingTokens).map(function(tok) {
        if (tok === "MMMM" || tok === "MM" || tok === "DD" || tok === "dddd") {
          return tok.slice(1);
        }
        return tok;
      }).join("");
      return this._longDateFormat[key];
    }
    var defaultInvalidDate = "Invalid date";
    function invalidDate() {
      return this._invalidDate;
    }
    var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
    function ordinal(number3) {
      return this._ordinal.replace("%d", number3);
    }
    var defaultRelativeTime = {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      w: "a week",
      ww: "%d weeks",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years"
    };
    function relativeTime(number3, withoutSuffix, string3, isFuture) {
      var output = this._relativeTime[string3];
      return isFunction(output) ? output(number3, withoutSuffix, string3, isFuture) : output.replace(/%d/i, number3);
    }
    function pastFuture(diff2, output) {
      var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
      return isFunction(format2) ? format2(output) : format2.replace(/%s/i, output);
    }
    var aliases = {
      D: "date",
      dates: "date",
      date: "date",
      d: "day",
      days: "day",
      day: "day",
      e: "weekday",
      weekdays: "weekday",
      weekday: "weekday",
      E: "isoWeekday",
      isoweekdays: "isoWeekday",
      isoweekday: "isoWeekday",
      DDD: "dayOfYear",
      dayofyears: "dayOfYear",
      dayofyear: "dayOfYear",
      h: "hour",
      hours: "hour",
      hour: "hour",
      ms: "millisecond",
      milliseconds: "millisecond",
      millisecond: "millisecond",
      m: "minute",
      minutes: "minute",
      minute: "minute",
      M: "month",
      months: "month",
      month: "month",
      Q: "quarter",
      quarters: "quarter",
      quarter: "quarter",
      s: "second",
      seconds: "second",
      second: "second",
      gg: "weekYear",
      weekyears: "weekYear",
      weekyear: "weekYear",
      GG: "isoWeekYear",
      isoweekyears: "isoWeekYear",
      isoweekyear: "isoWeekYear",
      w: "week",
      weeks: "week",
      week: "week",
      W: "isoWeek",
      isoweeks: "isoWeek",
      isoweek: "isoWeek",
      y: "year",
      years: "year",
      year: "year"
    };
    function normalizeUnits(units) {
      return typeof units === "string" ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }
    function normalizeObjectUnits(inputObject) {
      var normalizedInput = {}, normalizedProp, prop;
      for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
          normalizedProp = normalizeUnits(prop);
          if (normalizedProp) {
            normalizedInput[normalizedProp] = inputObject[prop];
          }
        }
      }
      return normalizedInput;
    }
    var priorities = {
      date: 9,
      day: 11,
      weekday: 11,
      isoWeekday: 11,
      dayOfYear: 4,
      hour: 13,
      millisecond: 16,
      minute: 14,
      month: 8,
      quarter: 7,
      second: 15,
      weekYear: 1,
      isoWeekYear: 1,
      week: 5,
      isoWeek: 5,
      year: 1
    };
    function getPrioritizedUnits(unitsObj) {
      var units = [], u;
      for (u in unitsObj) {
        if (hasOwnProp(unitsObj, u)) {
          units.push({ unit: u, priority: priorities[u] });
        }
      }
      units.sort(function(a, b) {
        return a.priority - b.priority;
      });
      return units;
    }
    var match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i, match1to2NoLeadingZero = /^[1-9]\d?/, match1to2HasZero = /^([1-9]\d|\d)/, regexes;
    regexes = {};
    function addRegexToken(token2, regex2, strictRegex) {
      regexes[token2] = isFunction(regex2) ? regex2 : function(isStrict, localeData2) {
        return isStrict && strictRegex ? strictRegex : regex2;
      };
    }
    function getParseRegexForToken(token2, config) {
      if (!hasOwnProp(regexes, token2)) {
        return new RegExp(unescapeFormat(token2));
      }
      return regexes[token2](config._strict, config._locale);
    }
    function unescapeFormat(s) {
      return regexEscape(s.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
      }));
    }
    function regexEscape(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function absFloor(number3) {
      if (number3 < 0) {
        return Math.ceil(number3) || 0;
      } else {
        return Math.floor(number3);
      }
    }
    function toInt(argumentForCoercion) {
      var coercedNumber = +argumentForCoercion, value2 = 0;
      if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value2 = absFloor(coercedNumber);
      }
      return value2;
    }
    var tokens = {};
    function addParseToken(token2, callback) {
      var i, func = callback, tokenLen;
      if (typeof token2 === "string") {
        token2 = [token2];
      }
      if (isNumber(callback)) {
        func = function(input, array3) {
          array3[callback] = toInt(input);
        };
      }
      tokenLen = token2.length;
      for (i = 0;i < tokenLen; i++) {
        tokens[token2[i]] = func;
      }
    }
    function addWeekParseToken(token2, callback) {
      addParseToken(token2, function(input, array3, config, token3) {
        config._w = config._w || {};
        callback(input, config._w, config, token3);
      });
    }
    function addTimeToArrayFromToken(token2, input, config) {
      if (input != null && hasOwnProp(tokens, token2)) {
        tokens[token2](input, config._a, config, token2);
      }
    }
    function isLeapYear2(year) {
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    var YEAR = 0, MONTH = 1, DATE2 = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
    addFormatToken("Y", 0, 0, function() {
      var y = this.year();
      return y <= 9999 ? zeroFill(y, 4) : "+" + y;
    });
    addFormatToken(0, ["YY", 2], 0, function() {
      return this.year() % 100;
    });
    addFormatToken(0, ["YYYY", 4], 0, "year");
    addFormatToken(0, ["YYYYY", 5], 0, "year");
    addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
    addRegexToken("Y", matchSigned);
    addRegexToken("YY", match1to2, match2);
    addRegexToken("YYYY", match1to4, match4);
    addRegexToken("YYYYY", match1to6, match6);
    addRegexToken("YYYYYY", match1to6, match6);
    addParseToken(["YYYYY", "YYYYYY"], YEAR);
    addParseToken("YYYY", function(input, array3) {
      array3[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken("YY", function(input, array3) {
      array3[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken("Y", function(input, array3) {
      array3[YEAR] = parseInt(input, 10);
    });
    function daysInYear(year) {
      return isLeapYear2(year) ? 366 : 365;
    }
    hooks.parseTwoDigitYear = function(input) {
      return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };
    var getSetYear = makeGetSet("FullYear", true);
    function getIsLeapYear() {
      return isLeapYear2(this.year());
    }
    function makeGetSet(unit, keepTime) {
      return function(value2) {
        if (value2 != null) {
          set$1(this, unit, value2);
          hooks.updateOffset(this, keepTime);
          return this;
        } else {
          return get(this, unit);
        }
      };
    }
    function get(mom, unit) {
      if (!mom.isValid()) {
        return NaN;
      }
      var { _d: d, _isUTC: isUTC } = mom;
      switch (unit) {
        case "Milliseconds":
          return isUTC ? d.getUTCMilliseconds() : d.getMilliseconds();
        case "Seconds":
          return isUTC ? d.getUTCSeconds() : d.getSeconds();
        case "Minutes":
          return isUTC ? d.getUTCMinutes() : d.getMinutes();
        case "Hours":
          return isUTC ? d.getUTCHours() : d.getHours();
        case "Date":
          return isUTC ? d.getUTCDate() : d.getDate();
        case "Day":
          return isUTC ? d.getUTCDay() : d.getDay();
        case "Month":
          return isUTC ? d.getUTCMonth() : d.getMonth();
        case "FullYear":
          return isUTC ? d.getUTCFullYear() : d.getFullYear();
        default:
          return NaN;
      }
    }
    function set$1(mom, unit, value2) {
      var d, isUTC, year, month, date4;
      if (!mom.isValid() || isNaN(value2)) {
        return;
      }
      d = mom._d;
      isUTC = mom._isUTC;
      switch (unit) {
        case "Milliseconds":
          return void (isUTC ? d.setUTCMilliseconds(value2) : d.setMilliseconds(value2));
        case "Seconds":
          return void (isUTC ? d.setUTCSeconds(value2) : d.setSeconds(value2));
        case "Minutes":
          return void (isUTC ? d.setUTCMinutes(value2) : d.setMinutes(value2));
        case "Hours":
          return void (isUTC ? d.setUTCHours(value2) : d.setHours(value2));
        case "Date":
          return void (isUTC ? d.setUTCDate(value2) : d.setDate(value2));
        case "FullYear":
          break;
        default:
          return;
      }
      year = value2;
      month = mom.month();
      date4 = mom.date();
      date4 = date4 === 29 && month === 1 && !isLeapYear2(year) ? 28 : date4;
      isUTC ? d.setUTCFullYear(year, month, date4) : d.setFullYear(year, month, date4);
    }
    function stringGet(units) {
      units = normalizeUnits(units);
      if (isFunction(this[units])) {
        return this[units]();
      }
      return this;
    }
    function stringSet(units, value2) {
      if (typeof units === "object") {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units), i, prioritizedLen = prioritized.length;
        for (i = 0;i < prioritizedLen; i++) {
          this[prioritized[i].unit](units[prioritized[i].unit]);
        }
      } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
          return this[units](value2);
        }
      }
      return this;
    }
    function mod(n, x) {
      return (n % x + x) % x;
    }
    var indexOf;
    if (Array.prototype.indexOf) {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function(o) {
        var i;
        for (i = 0;i < this.length; ++i) {
          if (this[i] === o) {
            return i;
          }
        }
        return -1;
      };
    }
    function daysInMonth(year, month) {
      if (isNaN(year) || isNaN(month)) {
        return NaN;
      }
      var modMonth = mod(month, 12);
      year += (month - modMonth) / 12;
      return modMonth === 1 ? isLeapYear2(year) ? 29 : 28 : 31 - modMonth % 7 % 2;
    }
    addFormatToken("M", ["MM", 2], "Mo", function() {
      return this.month() + 1;
    });
    addFormatToken("MMM", 0, 0, function(format2) {
      return this.localeData().monthsShort(this, format2);
    });
    addFormatToken("MMMM", 0, 0, function(format2) {
      return this.localeData().months(this, format2);
    });
    addRegexToken("M", match1to2, match1to2NoLeadingZero);
    addRegexToken("MM", match1to2, match2);
    addRegexToken("MMM", function(isStrict, locale2) {
      return locale2.monthsShortRegex(isStrict);
    });
    addRegexToken("MMMM", function(isStrict, locale2) {
      return locale2.monthsRegex(isStrict);
    });
    addParseToken(["M", "MM"], function(input, array3) {
      array3[MONTH] = toInt(input) - 1;
    });
    addParseToken(["MMM", "MMMM"], function(input, array3, config, token2) {
      var month = config._locale.monthsParse(input, token2, config._strict);
      if (month != null) {
        array3[MONTH] = month;
      } else {
        getParsingFlags(config).invalidMonth = input;
      }
    });
    var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
    function localeMonths(m, format2) {
      if (!m) {
        return isArray(this._months) ? this._months : this._months["standalone"];
      }
      return isArray(this._months) ? this._months[m.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format2) ? "format" : "standalone"][m.month()];
    }
    function localeMonthsShort(m, format2) {
      if (!m) {
        return isArray(this._monthsShort) ? this._monthsShort : this._monthsShort["standalone"];
      }
      return isArray(this._monthsShort) ? this._monthsShort[m.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"][m.month()];
    }
    function handleStrictParse(monthName, format2, strict3) {
      var i, ii, mom, llc = monthName.toLocaleLowerCase();
      if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0;i < 12; ++i) {
          mom = createUTC([2000, i]);
          this._shortMonthsParse[i] = this.monthsShort(mom, "").toLocaleLowerCase();
          this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
        }
      }
      if (strict3) {
        if (format2 === "MMM") {
          ii = indexOf.call(this._shortMonthsParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._longMonthsParse, llc);
          return ii !== -1 ? ii : null;
        }
      } else {
        if (format2 === "MMM") {
          ii = indexOf.call(this._shortMonthsParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._longMonthsParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._longMonthsParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortMonthsParse, llc);
          return ii !== -1 ? ii : null;
        }
      }
    }
    function localeMonthsParse(monthName, format2, strict3) {
      var i, mom, regex2;
      if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format2, strict3);
      }
      if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
      }
      for (i = 0;i < 12; i++) {
        mom = createUTC([2000, i]);
        if (strict3 && !this._longMonthsParse[i]) {
          this._longMonthsParse[i] = new RegExp("^" + this.months(mom, "").replace(".", "") + "$", "i");
          this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(mom, "").replace(".", "") + "$", "i");
        }
        if (!strict3 && !this._monthsParse[i]) {
          regex2 = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
          this._monthsParse[i] = new RegExp(regex2.replace(".", ""), "i");
        }
        if (strict3 && format2 === "MMMM" && this._longMonthsParse[i].test(monthName)) {
          return i;
        } else if (strict3 && format2 === "MMM" && this._shortMonthsParse[i].test(monthName)) {
          return i;
        } else if (!strict3 && this._monthsParse[i].test(monthName)) {
          return i;
        }
      }
    }
    function setMonth(mom, value2) {
      if (!mom.isValid()) {
        return mom;
      }
      if (typeof value2 === "string") {
        if (/^\d+$/.test(value2)) {
          value2 = toInt(value2);
        } else {
          value2 = mom.localeData().monthsParse(value2);
          if (!isNumber(value2)) {
            return mom;
          }
        }
      }
      var month = value2, date4 = mom.date();
      date4 = date4 < 29 ? date4 : Math.min(date4, daysInMonth(mom.year(), month));
      mom._isUTC ? mom._d.setUTCMonth(month, date4) : mom._d.setMonth(month, date4);
      return mom;
    }
    function getSetMonth(value2) {
      if (value2 != null) {
        setMonth(this, value2);
        hooks.updateOffset(this, true);
        return this;
      } else {
        return get(this, "Month");
      }
    }
    function getDaysInMonth() {
      return daysInMonth(this.year(), this.month());
    }
    function monthsShortRegex(isStrict) {
      if (this._monthsParseExact) {
        if (!hasOwnProp(this, "_monthsRegex")) {
          computeMonthsParse.call(this);
        }
        if (isStrict) {
          return this._monthsShortStrictRegex;
        } else {
          return this._monthsShortRegex;
        }
      } else {
        if (!hasOwnProp(this, "_monthsShortRegex")) {
          this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict ? this._monthsShortStrictRegex : this._monthsShortRegex;
      }
    }
    function monthsRegex(isStrict) {
      if (this._monthsParseExact) {
        if (!hasOwnProp(this, "_monthsRegex")) {
          computeMonthsParse.call(this);
        }
        if (isStrict) {
          return this._monthsStrictRegex;
        } else {
          return this._monthsRegex;
        }
      } else {
        if (!hasOwnProp(this, "_monthsRegex")) {
          this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict ? this._monthsStrictRegex : this._monthsRegex;
      }
    }
    function computeMonthsParse() {
      function cmpLenRev(a, b) {
        return b.length - a.length;
      }
      var shortPieces = [], longPieces = [], mixedPieces = [], i, mom, shortP, longP;
      for (i = 0;i < 12; i++) {
        mom = createUTC([2000, i]);
        shortP = regexEscape(this.monthsShort(mom, ""));
        longP = regexEscape(this.months(mom, ""));
        shortPieces.push(shortP);
        longPieces.push(longP);
        mixedPieces.push(longP);
        mixedPieces.push(shortP);
      }
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
      this._monthsShortRegex = this._monthsRegex;
      this._monthsStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
      this._monthsShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
    }
    function createDate(y, m, d, h, M, s, ms) {
      var date4;
      if (y < 100 && y >= 0) {
        date4 = new Date(y + 400, m, d, h, M, s, ms);
        if (isFinite(date4.getFullYear())) {
          date4.setFullYear(y);
        }
      } else {
        date4 = new Date(y, m, d, h, M, s, ms);
      }
      return date4;
    }
    function createUTCDate(y) {
      var date4, args;
      if (y < 100 && y >= 0) {
        args = Array.prototype.slice.call(arguments);
        args[0] = y + 400;
        date4 = new Date(Date.UTC.apply(null, args));
        if (isFinite(date4.getUTCFullYear())) {
          date4.setUTCFullYear(y);
        }
      } else {
        date4 = new Date(Date.UTC.apply(null, arguments));
      }
      return date4;
    }
    function firstWeekOffset(year, dow, doy) {
      var fwd = 7 + dow - doy, fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
      return -fwdlw + fwd - 1;
    }
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
      var localWeekday = (7 + weekday - dow) % 7, weekOffset = firstWeekOffset(year, dow, doy), dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset, resYear, resDayOfYear;
      if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
      } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
      } else {
        resYear = year;
        resDayOfYear = dayOfYear;
      }
      return {
        year: resYear,
        dayOfYear: resDayOfYear
      };
    }
    function weekOfYear(mom, dow, doy) {
      var weekOffset = firstWeekOffset(mom.year(), dow, doy), week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1, resWeek, resYear;
      if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
      } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
      } else {
        resYear = mom.year();
        resWeek = week;
      }
      return {
        week: resWeek,
        year: resYear
      };
    }
    function weeksInYear(year, dow, doy) {
      var weekOffset = firstWeekOffset(year, dow, doy), weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
      return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }
    addFormatToken("w", ["ww", 2], "wo", "week");
    addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
    addRegexToken("w", match1to2, match1to2NoLeadingZero);
    addRegexToken("ww", match1to2, match2);
    addRegexToken("W", match1to2, match1to2NoLeadingZero);
    addRegexToken("WW", match1to2, match2);
    addWeekParseToken(["w", "ww", "W", "WW"], function(input, week, config, token2) {
      week[token2.substr(0, 1)] = toInt(input);
    });
    function localeWeek(mom) {
      return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }
    var defaultLocaleWeek = {
      dow: 0,
      doy: 6
    };
    function localeFirstDayOfWeek() {
      return this._week.dow;
    }
    function localeFirstDayOfYear() {
      return this._week.doy;
    }
    function getSetWeek(input) {
      var week = this.localeData().week(this);
      return input == null ? week : this.add((input - week) * 7, "d");
    }
    function getSetISOWeek(input) {
      var week = weekOfYear(this, 1, 4).week;
      return input == null ? week : this.add((input - week) * 7, "d");
    }
    addFormatToken("d", 0, "do", "day");
    addFormatToken("dd", 0, 0, function(format2) {
      return this.localeData().weekdaysMin(this, format2);
    });
    addFormatToken("ddd", 0, 0, function(format2) {
      return this.localeData().weekdaysShort(this, format2);
    });
    addFormatToken("dddd", 0, 0, function(format2) {
      return this.localeData().weekdays(this, format2);
    });
    addFormatToken("e", 0, 0, "weekday");
    addFormatToken("E", 0, 0, "isoWeekday");
    addRegexToken("d", match1to2);
    addRegexToken("e", match1to2);
    addRegexToken("E", match1to2);
    addRegexToken("dd", function(isStrict, locale2) {
      return locale2.weekdaysMinRegex(isStrict);
    });
    addRegexToken("ddd", function(isStrict, locale2) {
      return locale2.weekdaysShortRegex(isStrict);
    });
    addRegexToken("dddd", function(isStrict, locale2) {
      return locale2.weekdaysRegex(isStrict);
    });
    addWeekParseToken(["dd", "ddd", "dddd"], function(input, week, config, token2) {
      var weekday = config._locale.weekdaysParse(input, token2, config._strict);
      if (weekday != null) {
        week.d = weekday;
      } else {
        getParsingFlags(config).invalidWeekday = input;
      }
    });
    addWeekParseToken(["d", "e", "E"], function(input, week, config, token2) {
      week[token2] = toInt(input);
    });
    function parseWeekday(input, locale2) {
      if (typeof input !== "string") {
        return input;
      }
      if (!isNaN(input)) {
        return parseInt(input, 10);
      }
      input = locale2.weekdaysParse(input);
      if (typeof input === "number") {
        return input;
      }
      return null;
    }
    function parseIsoWeekday(input, locale2) {
      if (typeof input === "string") {
        return locale2.weekdaysParse(input) % 7 || 7;
      }
      return isNaN(input) ? null : input;
    }
    function shiftWeekdays(ws, n) {
      return ws.slice(n, 7).concat(ws.slice(0, n));
    }
    var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
    function localeWeekdays(m, format2) {
      var weekdays = isArray(this._weekdays) ? this._weekdays : this._weekdays[m && m !== true && this._weekdays.isFormat.test(format2) ? "format" : "standalone"];
      return m === true ? shiftWeekdays(weekdays, this._week.dow) : m ? weekdays[m.day()] : weekdays;
    }
    function localeWeekdaysShort(m) {
      return m === true ? shiftWeekdays(this._weekdaysShort, this._week.dow) : m ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }
    function localeWeekdaysMin(m) {
      return m === true ? shiftWeekdays(this._weekdaysMin, this._week.dow) : m ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }
    function handleStrictParse$1(weekdayName, format2, strict3) {
      var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
      if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];
        for (i = 0;i < 7; ++i) {
          mom = createUTC([2000, 1]).day(i);
          this._minWeekdaysParse[i] = this.weekdaysMin(mom, "").toLocaleLowerCase();
          this._shortWeekdaysParse[i] = this.weekdaysShort(mom, "").toLocaleLowerCase();
          this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
        }
      }
      if (strict3) {
        if (format2 === "dddd") {
          ii = indexOf.call(this._weekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else if (format2 === "ddd") {
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        }
      } else {
        if (format2 === "dddd") {
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else if (format2 === "ddd") {
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._minWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        }
      }
    }
    function localeWeekdaysParse(weekdayName, format2, strict3) {
      var i, mom, regex2;
      if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format2, strict3);
      }
      if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
      }
      for (i = 0;i < 7; i++) {
        mom = createUTC([2000, 1]).day(i);
        if (strict3 && !this._fullWeekdaysParse[i]) {
          this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(mom, "").replace(".", "\\.?") + "$", "i");
          this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$", "i");
          this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$", "i");
        }
        if (!this._weekdaysParse[i]) {
          regex2 = "^" + this.weekdays(mom, "") + "|^" + this.weekdaysShort(mom, "") + "|^" + this.weekdaysMin(mom, "");
          this._weekdaysParse[i] = new RegExp(regex2.replace(".", ""), "i");
        }
        if (strict3 && format2 === "dddd" && this._fullWeekdaysParse[i].test(weekdayName)) {
          return i;
        } else if (strict3 && format2 === "ddd" && this._shortWeekdaysParse[i].test(weekdayName)) {
          return i;
        } else if (strict3 && format2 === "dd" && this._minWeekdaysParse[i].test(weekdayName)) {
          return i;
        } else if (!strict3 && this._weekdaysParse[i].test(weekdayName)) {
          return i;
        }
      }
    }
    function getSetDayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      var day = get(this, "Day");
      if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, "d");
      } else {
        return day;
      }
    }
    function getSetLocaleDayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return input == null ? weekday : this.add(input - weekday, "d");
    }
    function getSetISODayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
      } else {
        return this.day() || 7;
      }
    }
    function weekdaysRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysStrictRegex;
        } else {
          return this._weekdaysRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict ? this._weekdaysStrictRegex : this._weekdaysRegex;
      }
    }
    function weekdaysShortRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysShortStrictRegex;
        } else {
          return this._weekdaysShortRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysShortRegex")) {
          this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
      }
    }
    function weekdaysMinRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysMinStrictRegex;
        } else {
          return this._weekdaysMinRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysMinRegex")) {
          this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
      }
    }
    function computeWeekdaysParse() {
      function cmpLenRev(a, b) {
        return b.length - a.length;
      }
      var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [], i, mom, minp, shortp, longp;
      for (i = 0;i < 7; i++) {
        mom = createUTC([2000, 1]).day(i);
        minp = regexEscape(this.weekdaysMin(mom, ""));
        shortp = regexEscape(this.weekdaysShort(mom, ""));
        longp = regexEscape(this.weekdays(mom, ""));
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
      }
      minPieces.sort(cmpLenRev);
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
      this._weekdaysShortRegex = this._weekdaysRegex;
      this._weekdaysMinRegex = this._weekdaysRegex;
      this._weekdaysStrictRegex = new RegExp("^(" + longPieces.join("|") + ")", "i");
      this._weekdaysShortStrictRegex = new RegExp("^(" + shortPieces.join("|") + ")", "i");
      this._weekdaysMinStrictRegex = new RegExp("^(" + minPieces.join("|") + ")", "i");
    }
    function hFormat() {
      return this.hours() % 12 || 12;
    }
    function kFormat() {
      return this.hours() || 24;
    }
    addFormatToken("H", ["HH", 2], 0, "hour");
    addFormatToken("h", ["hh", 2], 0, hFormat);
    addFormatToken("k", ["kk", 2], 0, kFormat);
    addFormatToken("hmm", 0, 0, function() {
      return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });
    addFormatToken("hmmss", 0, 0, function() {
      return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });
    addFormatToken("Hmm", 0, 0, function() {
      return "" + this.hours() + zeroFill(this.minutes(), 2);
    });
    addFormatToken("Hmmss", 0, 0, function() {
      return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2);
    });
    function meridiem(token2, lowercase2) {
      addFormatToken(token2, 0, 0, function() {
        return this.localeData().meridiem(this.hours(), this.minutes(), lowercase2);
      });
    }
    meridiem("a", true);
    meridiem("A", false);
    function matchMeridiem(isStrict, locale2) {
      return locale2._meridiemParse;
    }
    addRegexToken("a", matchMeridiem);
    addRegexToken("A", matchMeridiem);
    addRegexToken("H", match1to2, match1to2HasZero);
    addRegexToken("h", match1to2, match1to2NoLeadingZero);
    addRegexToken("k", match1to2, match1to2NoLeadingZero);
    addRegexToken("HH", match1to2, match2);
    addRegexToken("hh", match1to2, match2);
    addRegexToken("kk", match1to2, match2);
    addRegexToken("hmm", match3to4);
    addRegexToken("hmmss", match5to6);
    addRegexToken("Hmm", match3to4);
    addRegexToken("Hmmss", match5to6);
    addParseToken(["H", "HH"], HOUR);
    addParseToken(["k", "kk"], function(input, array3, config) {
      var kInput = toInt(input);
      array3[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(["a", "A"], function(input, array3, config) {
      config._isPm = config._locale.isPM(input);
      config._meridiem = input;
    });
    addParseToken(["h", "hh"], function(input, array3, config) {
      array3[HOUR] = toInt(input);
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("hmm", function(input, array3, config) {
      var pos = input.length - 2;
      array3[HOUR] = toInt(input.substr(0, pos));
      array3[MINUTE] = toInt(input.substr(pos));
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("hmmss", function(input, array3, config) {
      var pos1 = input.length - 4, pos2 = input.length - 2;
      array3[HOUR] = toInt(input.substr(0, pos1));
      array3[MINUTE] = toInt(input.substr(pos1, 2));
      array3[SECOND] = toInt(input.substr(pos2));
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("Hmm", function(input, array3, config) {
      var pos = input.length - 2;
      array3[HOUR] = toInt(input.substr(0, pos));
      array3[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken("Hmmss", function(input, array3, config) {
      var pos1 = input.length - 4, pos2 = input.length - 2;
      array3[HOUR] = toInt(input.substr(0, pos1));
      array3[MINUTE] = toInt(input.substr(pos1, 2));
      array3[SECOND] = toInt(input.substr(pos2));
    });
    function localeIsPM(input) {
      return (input + "").toLowerCase().charAt(0) === "p";
    }
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", true);
    function localeMeridiem(hours2, minutes2, isLower) {
      if (hours2 > 11) {
        return isLower ? "pm" : "PM";
      } else {
        return isLower ? "am" : "AM";
      }
    }
    var baseConfig = {
      calendar: defaultCalendar,
      longDateFormat: defaultLongDateFormat,
      invalidDate: defaultInvalidDate,
      ordinal: defaultOrdinal,
      dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
      relativeTime: defaultRelativeTime,
      months: defaultLocaleMonths,
      monthsShort: defaultLocaleMonthsShort,
      week: defaultLocaleWeek,
      weekdays: defaultLocaleWeekdays,
      weekdaysMin: defaultLocaleWeekdaysMin,
      weekdaysShort: defaultLocaleWeekdaysShort,
      meridiemParse: defaultLocaleMeridiemParse
    };
    var locales = {}, localeFamilies = {}, globalLocale;
    function commonPrefix(arr1, arr2) {
      var i, minl = Math.min(arr1.length, arr2.length);
      for (i = 0;i < minl; i += 1) {
        if (arr1[i] !== arr2[i]) {
          return i;
        }
      }
      return minl;
    }
    function normalizeLocale(key) {
      return key ? key.toLowerCase().replace("_", "-") : key;
    }
    function chooseLocale(names) {
      var i = 0, j, next, locale2, split;
      while (i < names.length) {
        split = normalizeLocale(names[i]).split("-");
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split("-") : null;
        while (j > 0) {
          locale2 = loadLocale(split.slice(0, j).join("-"));
          if (locale2) {
            return locale2;
          }
          if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
            break;
          }
          j--;
        }
        i++;
      }
      return globalLocale;
    }
    function isLocaleNameSane(name) {
      return !!(name && name.match("^[^/\\\\]*$"));
    }
    function loadLocale(name) {
      var oldLocale = null, aliasedRequire;
      if (locales[name] === undefined && typeof module !== "undefined" && module && module.exports && isLocaleNameSane(name)) {
        try {
          oldLocale = globalLocale._abbr;
          aliasedRequire = import.meta.require;
          aliasedRequire("./locale/" + name);
          getSetGlobalLocale(oldLocale);
        } catch (e) {
          locales[name] = null;
        }
      }
      return locales[name];
    }
    function getSetGlobalLocale(key, values) {
      var data;
      if (key) {
        if (isUndefined(values)) {
          data = getLocale(key);
        } else {
          data = defineLocale(key, values);
        }
        if (data) {
          globalLocale = data;
        } else {
          if (typeof console !== "undefined" && console.warn) {
            console.warn("Locale " + key + " not found. Did you forget to load it?");
          }
        }
      }
      return globalLocale._abbr;
    }
    function defineLocale(name, config) {
      if (config !== null) {
        var locale2, parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
          deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change " + "an existing locale. moment.defineLocale(localeName, " + "config) should only be used for creating a new locale " + "See http://momentjs.com/guides/#/warnings/define-locale/ for more info.");
          parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
          if (locales[config.parentLocale] != null) {
            parentConfig = locales[config.parentLocale]._config;
          } else {
            locale2 = loadLocale(config.parentLocale);
            if (locale2 != null) {
              parentConfig = locale2._config;
            } else {
              if (!localeFamilies[config.parentLocale]) {
                localeFamilies[config.parentLocale] = [];
              }
              localeFamilies[config.parentLocale].push({
                name,
                config
              });
              return null;
            }
          }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));
        if (localeFamilies[name]) {
          localeFamilies[name].forEach(function(x) {
            defineLocale(x.name, x.config);
          });
        }
        getSetGlobalLocale(name);
        return locales[name];
      } else {
        delete locales[name];
        return null;
      }
    }
    function updateLocale(name, config) {
      if (config != null) {
        var locale2, tmpLocale, parentConfig = baseConfig;
        if (locales[name] != null && locales[name].parentLocale != null) {
          locales[name].set(mergeConfigs(locales[name]._config, config));
        } else {
          tmpLocale = loadLocale(name);
          if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
          }
          config = mergeConfigs(parentConfig, config);
          if (tmpLocale == null) {
            config.abbr = name;
          }
          locale2 = new Locale(config);
          locale2.parentLocale = locales[name];
          locales[name] = locale2;
        }
        getSetGlobalLocale(name);
      } else {
        if (locales[name] != null) {
          if (locales[name].parentLocale != null) {
            locales[name] = locales[name].parentLocale;
            if (name === getSetGlobalLocale()) {
              getSetGlobalLocale(name);
            }
          } else if (locales[name] != null) {
            delete locales[name];
          }
        }
      }
      return locales[name];
    }
    function getLocale(key) {
      var locale2;
      if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
      }
      if (!key) {
        return globalLocale;
      }
      if (!isArray(key)) {
        locale2 = loadLocale(key);
        if (locale2) {
          return locale2;
        }
        key = [key];
      }
      return chooseLocale(key);
    }
    function listLocales() {
      return keys(locales);
    }
    function checkOverflow(m) {
      var overflow, a = m._a;
      if (a && getParsingFlags(m).overflow === -2) {
        overflow = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE2] < 1 || a[DATE2] > daysInMonth(a[YEAR], a[MONTH]) ? DATE2 : a[HOUR] < 0 || a[HOUR] > 24 || a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1;
        if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE2)) {
          overflow = DATE2;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
          overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
          overflow = WEEKDAY;
        }
        getParsingFlags(m).overflow = overflow;
      }
      return m;
    }
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [
      ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
      ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
      ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
      ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
      ["YYYY-DDD", /\d{4}-\d{3}/],
      ["YYYY-MM", /\d{4}-\d\d/, false],
      ["YYYYYYMMDD", /[+-]\d{10}/],
      ["YYYYMMDD", /\d{8}/],
      ["GGGG[W]WWE", /\d{4}W\d{3}/],
      ["GGGG[W]WW", /\d{4}W\d{2}/, false],
      ["YYYYDDD", /\d{7}/],
      ["YYYYMM", /\d{6}/, false],
      ["YYYY", /\d{4}/, false]
    ], isoTimes = [
      ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
      ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
      ["HH:mm:ss", /\d\d:\d\d:\d\d/],
      ["HH:mm", /\d\d:\d\d/],
      ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
      ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
      ["HHmmss", /\d\d\d\d\d\d/],
      ["HHmm", /\d\d\d\d/],
      ["HH", /\d\d/]
    ], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = {
      UT: 0,
      GMT: 0,
      EDT: -4 * 60,
      EST: -5 * 60,
      CDT: -5 * 60,
      CST: -6 * 60,
      MDT: -6 * 60,
      MST: -7 * 60,
      PDT: -7 * 60,
      PST: -8 * 60
    };
    function configFromISO(config) {
      var i, l, string3 = config._i, match = extendedIsoRegex.exec(string3) || basicIsoRegex.exec(string3), allowTime, dateFormat, timeFormat, tzFormat, isoDatesLen = isoDates.length, isoTimesLen = isoTimes.length;
      if (match) {
        getParsingFlags(config).iso = true;
        for (i = 0, l = isoDatesLen;i < l; i++) {
          if (isoDates[i][1].exec(match[1])) {
            dateFormat = isoDates[i][0];
            allowTime = isoDates[i][2] !== false;
            break;
          }
        }
        if (dateFormat == null) {
          config._isValid = false;
          return;
        }
        if (match[3]) {
          for (i = 0, l = isoTimesLen;i < l; i++) {
            if (isoTimes[i][1].exec(match[3])) {
              timeFormat = (match[2] || " ") + isoTimes[i][0];
              break;
            }
          }
          if (timeFormat == null) {
            config._isValid = false;
            return;
          }
        }
        if (!allowTime && timeFormat != null) {
          config._isValid = false;
          return;
        }
        if (match[4]) {
          if (tzRegex.exec(match[4])) {
            tzFormat = "Z";
          } else {
            config._isValid = false;
            return;
          }
        }
        config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
        configFromStringAndFormat(config);
      } else {
        config._isValid = false;
      }
    }
    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
      var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10)
      ];
      if (secondStr) {
        result.push(parseInt(secondStr, 10));
      }
      return result;
    }
    function untruncateYear(yearStr) {
      var year = parseInt(yearStr, 10);
      if (year <= 49) {
        return 2000 + year;
      } else if (year <= 999) {
        return 1900 + year;
      }
      return year;
    }
    function preprocessRFC2822(s) {
      return s.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "");
    }
    function checkWeekday(weekdayStr, parsedInput, config) {
      if (weekdayStr) {
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr), weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
        if (weekdayProvided !== weekdayActual) {
          getParsingFlags(config).weekdayMismatch = true;
          config._isValid = false;
          return false;
        }
      }
      return true;
    }
    function calculateOffset(obsOffset, militaryOffset, numOffset) {
      if (obsOffset) {
        return obsOffsets[obsOffset];
      } else if (militaryOffset) {
        return 0;
      } else {
        var hm = parseInt(numOffset, 10), m = hm % 100, h = (hm - m) / 100;
        return h * 60 + m;
      }
    }
    function configFromRFC2822(config) {
      var match = rfc2822.exec(preprocessRFC2822(config._i)), parsedArray;
      if (match) {
        parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
        if (!checkWeekday(match[1], parsedArray, config)) {
          return;
        }
        config._a = parsedArray;
        config._tzm = calculateOffset(match[8], match[9], match[10]);
        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        getParsingFlags(config).rfc2822 = true;
      } else {
        config._isValid = false;
      }
    }
    function configFromString(config) {
      var matched = aspNetJsonRegex.exec(config._i);
      if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
      }
      configFromISO(config);
      if (config._isValid === false) {
        delete config._isValid;
      } else {
        return;
      }
      configFromRFC2822(config);
      if (config._isValid === false) {
        delete config._isValid;
      } else {
        return;
      }
      if (config._strict) {
        config._isValid = false;
      } else {
        hooks.createFromInputFallback(config);
      }
    }
    hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), " + "which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are " + "discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(config) {
      config._d = new Date(config._i + (config._useUTC ? " UTC" : ""));
    });
    function defaults(a, b, c) {
      if (a != null) {
        return a;
      }
      if (b != null) {
        return b;
      }
      return c;
    }
    function currentDateArray(config) {
      var nowValue = new Date(hooks.now());
      if (config._useUTC) {
        return [
          nowValue.getUTCFullYear(),
          nowValue.getUTCMonth(),
          nowValue.getUTCDate()
        ];
      }
      return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }
    function configFromArray(config) {
      var i, date4, input = [], currentDate, expectedWeekday, yearToUse;
      if (config._d) {
        return;
      }
      currentDate = currentDateArray(config);
      if (config._w && config._a[DATE2] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
      }
      if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
        if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
          getParsingFlags(config)._overflowDayOfYear = true;
        }
        date4 = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date4.getUTCMonth();
        config._a[DATE2] = date4.getUTCDate();
      }
      for (i = 0;i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
      }
      for (;i < 7; i++) {
        config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
      }
      if (config._a[HOUR] === 24 && config._a[MINUTE] === 0 && config._a[SECOND] === 0 && config._a[MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[HOUR] = 0;
      }
      config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
      expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();
      if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
      }
      if (config._nextDay) {
        config._a[HOUR] = 24;
      }
      if (config._w && typeof config._w.d !== "undefined" && config._w.d !== expectedWeekday) {
        getParsingFlags(config).weekdayMismatch = true;
      }
    }
    function dayOfYearFromWeekInfo(config) {
      var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
      w = config._w;
      if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;
        weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
          weekdayOverflow = true;
        }
      } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;
        curWeek = weekOfYear(createLocal(), dow, doy);
        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
        week = defaults(w.w, curWeek.week);
        if (w.d != null) {
          weekday = w.d;
          if (weekday < 0 || weekday > 6) {
            weekdayOverflow = true;
          }
        } else if (w.e != null) {
          weekday = w.e + dow;
          if (w.e < 0 || w.e > 6) {
            weekdayOverflow = true;
          }
        } else {
          weekday = dow;
        }
      }
      if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
      } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
      } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
      }
    }
    hooks.ISO_8601 = function() {
    };
    hooks.RFC_2822 = function() {
    };
    function configFromStringAndFormat(config) {
      if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
      }
      if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
      }
      config._a = [];
      getParsingFlags(config).empty = true;
      var string3 = "" + config._i, i, parsedInput, tokens2, token2, skipped, stringLength = string3.length, totalParsedInputLength = 0, era, tokenLen;
      tokens2 = expandFormat(config._f, config._locale).match(formattingTokens) || [];
      tokenLen = tokens2.length;
      for (i = 0;i < tokenLen; i++) {
        token2 = tokens2[i];
        parsedInput = (string3.match(getParseRegexForToken(token2, config)) || [])[0];
        if (parsedInput) {
          skipped = string3.substr(0, string3.indexOf(parsedInput));
          if (skipped.length > 0) {
            getParsingFlags(config).unusedInput.push(skipped);
          }
          string3 = string3.slice(string3.indexOf(parsedInput) + parsedInput.length);
          totalParsedInputLength += parsedInput.length;
        }
        if (formatTokenFunctions[token2]) {
          if (parsedInput) {
            getParsingFlags(config).empty = false;
          } else {
            getParsingFlags(config).unusedTokens.push(token2);
          }
          addTimeToArrayFromToken(token2, parsedInput, config);
        } else if (config._strict && !parsedInput) {
          getParsingFlags(config).unusedTokens.push(token2);
        }
      }
      getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
      if (string3.length > 0) {
        getParsingFlags(config).unusedInput.push(string3);
      }
      if (config._a[HOUR] <= 12 && getParsingFlags(config).bigHour === true && config._a[HOUR] > 0) {
        getParsingFlags(config).bigHour = undefined;
      }
      getParsingFlags(config).parsedDateParts = config._a.slice(0);
      getParsingFlags(config).meridiem = config._meridiem;
      config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);
      era = getParsingFlags(config).era;
      if (era !== null) {
        config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
      }
      configFromArray(config);
      checkOverflow(config);
    }
    function meridiemFixWrap(locale2, hour, meridiem2) {
      var isPm;
      if (meridiem2 == null) {
        return hour;
      }
      if (locale2.meridiemHour != null) {
        return locale2.meridiemHour(hour, meridiem2);
      } else if (locale2.isPM != null) {
        isPm = locale2.isPM(meridiem2);
        if (isPm && hour < 12) {
          hour += 12;
        }
        if (!isPm && hour === 12) {
          hour = 0;
        }
        return hour;
      } else {
        return hour;
      }
    }
    function configFromStringAndArray(config) {
      var tempConfig, bestMoment, scoreToBeat, i, currentScore, validFormatFound, bestFormatIsValid = false, configfLen = config._f.length;
      if (configfLen === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
      }
      for (i = 0;i < configfLen; i++) {
        currentScore = 0;
        validFormatFound = false;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
          tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);
        if (isValid(tempConfig)) {
          validFormatFound = true;
        }
        currentScore += getParsingFlags(tempConfig).charsLeftOver;
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
        getParsingFlags(tempConfig).score = currentScore;
        if (!bestFormatIsValid) {
          if (scoreToBeat == null || currentScore < scoreToBeat || validFormatFound) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
            if (validFormatFound) {
              bestFormatIsValid = true;
            }
          }
        } else {
          if (currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
          }
        }
      }
      extend(config, bestMoment || tempConfig);
    }
    function configFromObject(config) {
      if (config._d) {
        return;
      }
      var i = normalizeObjectUnits(config._i), dayOrDate = i.day === undefined ? i.date : i.day;
      config._a = map3([i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond], function(obj) {
        return obj && parseInt(obj, 10);
      });
      configFromArray(config);
    }
    function createFromConfig(config) {
      var res = new Moment(checkOverflow(prepareConfig(config)));
      if (res._nextDay) {
        res.add(1, "d");
        res._nextDay = undefined;
      }
      return res;
    }
    function prepareConfig(config) {
      var { _i: input, _f: format2 } = config;
      config._locale = config._locale || getLocale(config._l);
      if (input === null || format2 === undefined && input === "") {
        return createInvalid({ nullInput: true });
      }
      if (typeof input === "string") {
        config._i = input = config._locale.preparse(input);
      }
      if (isMoment(input)) {
        return new Moment(checkOverflow(input));
      } else if (isDate(input)) {
        config._d = input;
      } else if (isArray(format2)) {
        configFromStringAndArray(config);
      } else if (format2) {
        configFromStringAndFormat(config);
      } else {
        configFromInput(config);
      }
      if (!isValid(config)) {
        config._d = null;
      }
      return config;
    }
    function configFromInput(config) {
      var input = config._i;
      if (isUndefined(input)) {
        config._d = new Date(hooks.now());
      } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
      } else if (typeof input === "string") {
        configFromString(config);
      } else if (isArray(input)) {
        config._a = map3(input.slice(0), function(obj) {
          return parseInt(obj, 10);
        });
        configFromArray(config);
      } else if (isObject2(input)) {
        configFromObject(config);
      } else if (isNumber(input)) {
        config._d = new Date(input);
      } else {
        hooks.createFromInputFallback(config);
      }
    }
    function createLocalOrUTC(input, format2, locale2, strict3, isUTC) {
      var c = {};
      if (format2 === true || format2 === false) {
        strict3 = format2;
        format2 = undefined;
      }
      if (locale2 === true || locale2 === false) {
        strict3 = locale2;
        locale2 = undefined;
      }
      if (isObject2(input) && isObjectEmpty(input) || isArray(input) && input.length === 0) {
        input = undefined;
      }
      c._isAMomentObject = true;
      c._useUTC = c._isUTC = isUTC;
      c._l = locale2;
      c._i = input;
      c._f = format2;
      c._strict = strict3;
      return createFromConfig(c);
    }
    function createLocal(input, format2, locale2, strict3) {
      return createLocalOrUTC(input, format2, locale2, strict3, false);
    }
    var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
      var other = createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other < this ? this : other;
      } else {
        return createInvalid();
      }
    }), prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
      var other = createLocal.apply(null, arguments);
      if (this.isValid() && other.isValid()) {
        return other > this ? this : other;
      } else {
        return createInvalid();
      }
    });
    function pickBy(fn, moments) {
      var res, i;
      if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
      }
      if (!moments.length) {
        return createLocal();
      }
      res = moments[0];
      for (i = 1;i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
          res = moments[i];
        }
      }
      return res;
    }
    function min() {
      var args = [].slice.call(arguments, 0);
      return pickBy("isBefore", args);
    }
    function max() {
      var args = [].slice.call(arguments, 0);
      return pickBy("isAfter", args);
    }
    var now = function() {
      return Date.now ? Date.now() : +new Date;
    };
    var ordering = [
      "year",
      "quarter",
      "month",
      "week",
      "day",
      "hour",
      "minute",
      "second",
      "millisecond"
    ];
    function isDurationValid(m) {
      var key, unitHasDecimal = false, i, orderLen = ordering.length;
      for (key in m) {
        if (hasOwnProp(m, key) && !(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
          return false;
        }
      }
      for (i = 0;i < orderLen; ++i) {
        if (m[ordering[i]]) {
          if (unitHasDecimal) {
            return false;
          }
          if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
            unitHasDecimal = true;
          }
        }
      }
      return true;
    }
    function isValid$1() {
      return this._isValid;
    }
    function createInvalid$1() {
      return createDuration(NaN);
    }
    function Duration(duration) {
      var normalizedInput = normalizeObjectUnits(duration), years2 = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months2 = normalizedInput.month || 0, weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0, days2 = normalizedInput.day || 0, hours2 = normalizedInput.hour || 0, minutes2 = normalizedInput.minute || 0, seconds2 = normalizedInput.second || 0, milliseconds2 = normalizedInput.millisecond || 0;
      this._isValid = isDurationValid(normalizedInput);
      this._milliseconds = +milliseconds2 + seconds2 * 1000 + minutes2 * 60000 + hours2 * 1000 * 60 * 60;
      this._days = +days2 + weeks2 * 7;
      this._months = +months2 + quarters * 3 + years2 * 12;
      this._data = {};
      this._locale = getLocale();
      this._bubble();
    }
    function isDuration(obj) {
      return obj instanceof Duration;
    }
    function absRound(number3) {
      if (number3 < 0) {
        return Math.round(-1 * number3) * -1;
      } else {
        return Math.round(number3);
      }
    }
    function compareArrays(array1, array22, dontConvert) {
      var len = Math.min(array1.length, array22.length), lengthDiff = Math.abs(array1.length - array22.length), diffs = 0, i;
      for (i = 0;i < len; i++) {
        if (dontConvert && array1[i] !== array22[i] || !dontConvert && toInt(array1[i]) !== toInt(array22[i])) {
          diffs++;
        }
      }
      return diffs + lengthDiff;
    }
    function offset(token2, separator) {
      addFormatToken(token2, 0, 0, function() {
        var offset2 = this.utcOffset(), sign2 = "+";
        if (offset2 < 0) {
          offset2 = -offset2;
          sign2 = "-";
        }
        return sign2 + zeroFill(~~(offset2 / 60), 2) + separator + zeroFill(~~offset2 % 60, 2);
      });
    }
    offset("Z", ":");
    offset("ZZ", "");
    addRegexToken("Z", matchShortOffset);
    addRegexToken("ZZ", matchShortOffset);
    addParseToken(["Z", "ZZ"], function(input, array3, config) {
      config._useUTC = true;
      config._tzm = offsetFromString(matchShortOffset, input);
    });
    var chunkOffset = /([\+\-]|\d\d)/gi;
    function offsetFromString(matcher, string3) {
      var matches = (string3 || "").match(matcher), chunk, parts, minutes2;
      if (matches === null) {
        return null;
      }
      chunk = matches[matches.length - 1] || [];
      parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
      minutes2 = +(parts[1] * 60) + toInt(parts[2]);
      return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
    }
    function cloneWithOffset(input, model) {
      var res, diff2;
      if (model._isUTC) {
        res = model.clone();
        diff2 = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
        res._d.setTime(res._d.valueOf() + diff2);
        hooks.updateOffset(res, false);
        return res;
      } else {
        return createLocal(input).local();
      }
    }
    function getDateOffset(m) {
      return -Math.round(m._d.getTimezoneOffset());
    }
    hooks.updateOffset = function() {
    };
    function getSetOffset(input, keepLocalTime, keepMinutes) {
      var offset2 = this._offset || 0, localAdjust;
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      if (input != null) {
        if (typeof input === "string") {
          input = offsetFromString(matchShortOffset, input);
          if (input === null) {
            return this;
          }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
          input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
          localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
          this.add(localAdjust, "m");
        }
        if (offset2 !== input) {
          if (!keepLocalTime || this._changeInProgress) {
            addSubtract(this, createDuration(input - offset2, "m"), 1, false);
          } else if (!this._changeInProgress) {
            this._changeInProgress = true;
            hooks.updateOffset(this, true);
            this._changeInProgress = null;
          }
        }
        return this;
      } else {
        return this._isUTC ? offset2 : getDateOffset(this);
      }
    }
    function getSetZone(input, keepLocalTime) {
      if (input != null) {
        if (typeof input !== "string") {
          input = -input;
        }
        this.utcOffset(input, keepLocalTime);
        return this;
      } else {
        return -this.utcOffset();
      }
    }
    function setOffsetToUTC(keepLocalTime) {
      return this.utcOffset(0, keepLocalTime);
    }
    function setOffsetToLocal(keepLocalTime) {
      if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;
        if (keepLocalTime) {
          this.subtract(getDateOffset(this), "m");
        }
      }
      return this;
    }
    function setOffsetToParsedOffset() {
      if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
      } else if (typeof this._i === "string") {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
          this.utcOffset(tZone);
        } else {
          this.utcOffset(0, true);
        }
      }
      return this;
    }
    function hasAlignedHourOffset(input) {
      if (!this.isValid()) {
        return false;
      }
      input = input ? createLocal(input).utcOffset() : 0;
      return (this.utcOffset() - input) % 60 === 0;
    }
    function isDaylightSavingTime() {
      return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }
    function isDaylightSavingTimeShifted() {
      if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
      }
      var c = {}, other;
      copyConfig(c, this);
      c = prepareConfig(c);
      if (c._a) {
        other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted = this.isValid() && compareArrays(c._a, other.toArray()) > 0;
      } else {
        this._isDSTShifted = false;
      }
      return this._isDSTShifted;
    }
    function isLocal() {
      return this.isValid() ? !this._isUTC : false;
    }
    function isUtcOffset() {
      return this.isValid() ? this._isUTC : false;
    }
    function isUtc() {
      return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function createDuration(input, key) {
      var duration = input, match = null, sign2, ret, diffRes;
      if (isDuration(input)) {
        duration = {
          ms: input._milliseconds,
          d: input._days,
          M: input._months
        };
      } else if (isNumber(input) || !isNaN(+input)) {
        duration = {};
        if (key) {
          duration[key] = +input;
        } else {
          duration.milliseconds = +input;
        }
      } else if (match = aspNetRegex.exec(input)) {
        sign2 = match[1] === "-" ? -1 : 1;
        duration = {
          y: 0,
          d: toInt(match[DATE2]) * sign2,
          h: toInt(match[HOUR]) * sign2,
          m: toInt(match[MINUTE]) * sign2,
          s: toInt(match[SECOND]) * sign2,
          ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign2
        };
      } else if (match = isoRegex.exec(input)) {
        sign2 = match[1] === "-" ? -1 : 1;
        duration = {
          y: parseIso(match[2], sign2),
          M: parseIso(match[3], sign2),
          w: parseIso(match[4], sign2),
          d: parseIso(match[5], sign2),
          h: parseIso(match[6], sign2),
          m: parseIso(match[7], sign2),
          s: parseIso(match[8], sign2)
        };
      } else if (duration == null) {
        duration = {};
      } else if (typeof duration === "object" && (("from" in duration) || ("to" in duration))) {
        diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));
        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
      }
      ret = new Duration(duration);
      if (isDuration(input) && hasOwnProp(input, "_locale")) {
        ret._locale = input._locale;
      }
      if (isDuration(input) && hasOwnProp(input, "_isValid")) {
        ret._isValid = input._isValid;
      }
      return ret;
    }
    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;
    function parseIso(inp, sign2) {
      var res = inp && parseFloat(inp.replace(",", "."));
      return (isNaN(res) ? 0 : res) * sign2;
    }
    function positiveMomentsDifference(base, other) {
      var res = {};
      res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
      if (base.clone().add(res.months, "M").isAfter(other)) {
        --res.months;
      }
      res.milliseconds = +other - +base.clone().add(res.months, "M");
      return res;
    }
    function momentsDifference(base, other) {
      var res;
      if (!(base.isValid() && other.isValid())) {
        return { milliseconds: 0, months: 0 };
      }
      other = cloneWithOffset(other, base);
      if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
      } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
      }
      return res;
    }
    function createAdder(direction, name) {
      return function(val, period) {
        var dur, tmp;
        if (period !== null && !isNaN(+period)) {
          deprecateSimple(name, "moment()." + name + "(period, number) is deprecated. Please use moment()." + name + "(number, period). " + "See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.");
          tmp = val;
          val = period;
          period = tmp;
        }
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
      };
    }
    function addSubtract(mom, duration, isAdding, updateOffset) {
      var milliseconds2 = duration._milliseconds, days2 = absRound(duration._days), months2 = absRound(duration._months);
      if (!mom.isValid()) {
        return;
      }
      updateOffset = updateOffset == null ? true : updateOffset;
      if (months2) {
        setMonth(mom, get(mom, "Month") + months2 * isAdding);
      }
      if (days2) {
        set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
      }
      if (milliseconds2) {
        mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
      }
      if (updateOffset) {
        hooks.updateOffset(mom, days2 || months2);
      }
    }
    var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
    function isString(input) {
      return typeof input === "string" || input instanceof String;
    }
    function isMomentInput(input) {
      return isMoment(input) || isDate(input) || isString(input) || isNumber(input) || isNumberOrStringArray(input) || isMomentInputObject(input) || input === null || input === undefined;
    }
    function isMomentInputObject(input) {
      var objectTest = isObject2(input) && !isObjectEmpty(input), propertyTest = false, properties = [
        "years",
        "year",
        "y",
        "months",
        "month",
        "M",
        "days",
        "day",
        "d",
        "dates",
        "date",
        "D",
        "hours",
        "hour",
        "h",
        "minutes",
        "minute",
        "m",
        "seconds",
        "second",
        "s",
        "milliseconds",
        "millisecond",
        "ms"
      ], i, property, propertyLen = properties.length;
      for (i = 0;i < propertyLen; i += 1) {
        property = properties[i];
        propertyTest = propertyTest || hasOwnProp(input, property);
      }
      return objectTest && propertyTest;
    }
    function isNumberOrStringArray(input) {
      var arrayTest = isArray(input), dataTypeTest = false;
      if (arrayTest) {
        dataTypeTest = input.filter(function(item) {
          return !isNumber(item) && isString(input);
        }).length === 0;
      }
      return arrayTest && dataTypeTest;
    }
    function isCalendarSpec(input) {
      var objectTest = isObject2(input) && !isObjectEmpty(input), propertyTest = false, properties = [
        "sameDay",
        "nextDay",
        "lastDay",
        "nextWeek",
        "lastWeek",
        "sameElse"
      ], i, property;
      for (i = 0;i < properties.length; i += 1) {
        property = properties[i];
        propertyTest = propertyTest || hasOwnProp(input, property);
      }
      return objectTest && propertyTest;
    }
    function getCalendarFormat(myMoment, now2) {
      var diff2 = myMoment.diff(now2, "days", true);
      return diff2 < -6 ? "sameElse" : diff2 < -1 ? "lastWeek" : diff2 < 0 ? "lastDay" : diff2 < 1 ? "sameDay" : diff2 < 2 ? "nextDay" : diff2 < 7 ? "nextWeek" : "sameElse";
    }
    function calendar$1(time, formats) {
      if (arguments.length === 1) {
        if (!arguments[0]) {
          time = undefined;
          formats = undefined;
        } else if (isMomentInput(arguments[0])) {
          time = arguments[0];
          formats = undefined;
        } else if (isCalendarSpec(arguments[0])) {
          formats = arguments[0];
          time = undefined;
        }
      }
      var now2 = time || createLocal(), sod = cloneWithOffset(now2, this).startOf("day"), format2 = hooks.calendarFormat(this, sod) || "sameElse", output = formats && (isFunction(formats[format2]) ? formats[format2].call(this, now2) : formats[format2]);
      return this.format(output || this.localeData().calendar(format2, this, createLocal(now2)));
    }
    function clone4() {
      return new Moment(this);
    }
    function isAfter(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() > localInput.valueOf();
      } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
      }
    }
    function isBefore(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() < localInput.valueOf();
      } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
      }
    }
    function isBetween(from2, to2, units, inclusivity) {
      var localFrom = isMoment(from2) ? from2 : createLocal(from2), localTo = isMoment(to2) ? to2 : createLocal(to2);
      if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
        return false;
      }
      inclusivity = inclusivity || "()";
      return (inclusivity[0] === "(" ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) && (inclusivity[1] === ")" ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }
    function isSame(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input), inputMs;
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() === localInput.valueOf();
      } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
      }
    }
    function isSameOrAfter(input, units) {
      return this.isSame(input, units) || this.isAfter(input, units);
    }
    function isSameOrBefore(input, units) {
      return this.isSame(input, units) || this.isBefore(input, units);
    }
    function diff(input, units, asFloat) {
      var that, zoneDelta, output;
      if (!this.isValid()) {
        return NaN;
      }
      that = cloneWithOffset(input, this);
      if (!that.isValid()) {
        return NaN;
      }
      zoneDelta = (that.utcOffset() - this.utcOffset()) * 60000;
      units = normalizeUnits(units);
      switch (units) {
        case "year":
          output = monthDiff(this, that) / 12;
          break;
        case "month":
          output = monthDiff(this, that);
          break;
        case "quarter":
          output = monthDiff(this, that) / 3;
          break;
        case "second":
          output = (this - that) / 1000;
          break;
        case "minute":
          output = (this - that) / 60000;
          break;
        case "hour":
          output = (this - that) / 3600000;
          break;
        case "day":
          output = (this - that - zoneDelta) / 86400000;
          break;
        case "week":
          output = (this - that - zoneDelta) / 604800000;
          break;
        default:
          output = this - that;
      }
      return asFloat ? output : absFloor(output);
    }
    function monthDiff(a, b) {
      if (a.date() < b.date()) {
        return -monthDiff(b, a);
      }
      var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()), anchor = a.clone().add(wholeMonthDiff, "months"), anchor2, adjust;
      if (b - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
        adjust = (b - anchor) / (anchor - anchor2);
      } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
        adjust = (b - anchor) / (anchor2 - anchor);
      }
      return -(wholeMonthDiff + adjust) || 0;
    }
    hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    function toString() {
      return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }
    function toISOString(keepOffset) {
      if (!this.isValid()) {
        return null;
      }
      var utc = keepOffset !== true, m = utc ? this.clone().utc() : this;
      if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(m, utc ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ");
      }
      if (isFunction(Date.prototype.toISOString)) {
        if (utc) {
          return this.toDate().toISOString();
        } else {
          return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace("Z", formatMoment(m, "Z"));
        }
      }
      return formatMoment(m, utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
    }
    function inspect() {
      if (!this.isValid()) {
        return "moment.invalid(/* " + this._i + " */)";
      }
      var func = "moment", zone = "", prefix, year, datetime, suffix;
      if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
        zone = "Z";
      }
      prefix = "[" + func + '("]';
      year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
      datetime = "-MM-DD[T]HH:mm:ss.SSS";
      suffix = zone + '[")]';
      return this.format(prefix + year + datetime + suffix);
    }
    function format(inputString) {
      if (!inputString) {
        inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
      }
      var output = formatMoment(this, inputString);
      return this.localeData().postformat(output);
    }
    function from(time, withoutSuffix) {
      if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
        return createDuration({ to: this, from: time }).locale(this.locale()).humanize(!withoutSuffix);
      } else {
        return this.localeData().invalidDate();
      }
    }
    function fromNow(withoutSuffix) {
      return this.from(createLocal(), withoutSuffix);
    }
    function to(time, withoutSuffix) {
      if (this.isValid() && (isMoment(time) && time.isValid() || createLocal(time).isValid())) {
        return createDuration({ from: this, to: time }).locale(this.locale()).humanize(!withoutSuffix);
      } else {
        return this.localeData().invalidDate();
      }
    }
    function toNow(withoutSuffix) {
      return this.to(createLocal(), withoutSuffix);
    }
    function locale(key) {
      var newLocaleData;
      if (key === undefined) {
        return this._locale._abbr;
      } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
          this._locale = newLocaleData;
        }
        return this;
      }
    }
    var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(key) {
      if (key === undefined) {
        return this.localeData();
      } else {
        return this.locale(key);
      }
    });
    function localeData() {
      return this._locale;
    }
    var MS_PER_SECOND = 1000, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
    function mod$1(dividend, divisor) {
      return (dividend % divisor + divisor) % divisor;
    }
    function localStartOfDate(y, m, d) {
      if (y < 100 && y >= 0) {
        return new Date(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
        return new Date(y, m, d).valueOf();
      }
    }
    function utcStartOfDate(y, m, d) {
      if (y < 100 && y >= 0) {
        return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
        return Date.UTC(y, m, d);
      }
    }
    function startOf(units) {
      var time, startOfDate;
      units = normalizeUnits(units);
      if (units === undefined || units === "millisecond" || !this.isValid()) {
        return this;
      }
      startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
      switch (units) {
        case "year":
          time = startOfDate(this.year(), 0, 1);
          break;
        case "quarter":
          time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
          break;
        case "month":
          time = startOfDate(this.year(), this.month(), 1);
          break;
        case "week":
          time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
          break;
        case "isoWeek":
          time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
          break;
        case "day":
        case "date":
          time = startOfDate(this.year(), this.month(), this.date());
          break;
        case "hour":
          time = this._d.valueOf();
          time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
          break;
        case "minute":
          time = this._d.valueOf();
          time -= mod$1(time, MS_PER_MINUTE);
          break;
        case "second":
          time = this._d.valueOf();
          time -= mod$1(time, MS_PER_SECOND);
          break;
      }
      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
    }
    function endOf(units) {
      var time, startOfDate;
      units = normalizeUnits(units);
      if (units === undefined || units === "millisecond" || !this.isValid()) {
        return this;
      }
      startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
      switch (units) {
        case "year":
          time = startOfDate(this.year() + 1, 0, 1) - 1;
          break;
        case "quarter":
          time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
          break;
        case "month":
          time = startOfDate(this.year(), this.month() + 1, 1) - 1;
          break;
        case "week":
          time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
          break;
        case "isoWeek":
          time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
          break;
        case "day":
        case "date":
          time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
          break;
        case "hour":
          time = this._d.valueOf();
          time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
          break;
        case "minute":
          time = this._d.valueOf();
          time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
          break;
        case "second":
          time = this._d.valueOf();
          time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
          break;
      }
      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
    }
    function valueOf() {
      return this._d.valueOf() - (this._offset || 0) * 60000;
    }
    function unix() {
      return Math.floor(this.valueOf() / 1000);
    }
    function toDate() {
      return new Date(this.valueOf());
    }
    function toArray() {
      var m = this;
      return [
        m.year(),
        m.month(),
        m.date(),
        m.hour(),
        m.minute(),
        m.second(),
        m.millisecond()
      ];
    }
    function toObject() {
      var m = this;
      return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
      };
    }
    function toJSON() {
      return this.isValid() ? this.toISOString() : null;
    }
    function isValid$2() {
      return isValid(this);
    }
    function parsingFlags() {
      return extend({}, getParsingFlags(this));
    }
    function invalidAt() {
      return getParsingFlags(this).overflow;
    }
    function creationData() {
      return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict
      };
    }
    addFormatToken("N", 0, 0, "eraAbbr");
    addFormatToken("NN", 0, 0, "eraAbbr");
    addFormatToken("NNN", 0, 0, "eraAbbr");
    addFormatToken("NNNN", 0, 0, "eraName");
    addFormatToken("NNNNN", 0, 0, "eraNarrow");
    addFormatToken("y", ["y", 1], "yo", "eraYear");
    addFormatToken("y", ["yy", 2], 0, "eraYear");
    addFormatToken("y", ["yyy", 3], 0, "eraYear");
    addFormatToken("y", ["yyyy", 4], 0, "eraYear");
    addRegexToken("N", matchEraAbbr);
    addRegexToken("NN", matchEraAbbr);
    addRegexToken("NNN", matchEraAbbr);
    addRegexToken("NNNN", matchEraName);
    addRegexToken("NNNNN", matchEraNarrow);
    addParseToken(["N", "NN", "NNN", "NNNN", "NNNNN"], function(input, array3, config, token2) {
      var era = config._locale.erasParse(input, token2, config._strict);
      if (era) {
        getParsingFlags(config).era = era;
      } else {
        getParsingFlags(config).invalidEra = input;
      }
    });
    addRegexToken("y", matchUnsigned);
    addRegexToken("yy", matchUnsigned);
    addRegexToken("yyy", matchUnsigned);
    addRegexToken("yyyy", matchUnsigned);
    addRegexToken("yo", matchEraYearOrdinal);
    addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
    addParseToken(["yo"], function(input, array3, config, token2) {
      var match;
      if (config._locale._eraYearOrdinalRegex) {
        match = input.match(config._locale._eraYearOrdinalRegex);
      }
      if (config._locale.eraYearOrdinalParse) {
        array3[YEAR] = config._locale.eraYearOrdinalParse(input, match);
      } else {
        array3[YEAR] = parseInt(input, 10);
      }
    });
    function localeEras(m, format2) {
      var i, l, date4, eras = this._eras || getLocale("en")._eras;
      for (i = 0, l = eras.length;i < l; ++i) {
        switch (typeof eras[i].since) {
          case "string":
            date4 = hooks(eras[i].since).startOf("day");
            eras[i].since = date4.valueOf();
            break;
        }
        switch (typeof eras[i].until) {
          case "undefined":
            eras[i].until = Infinity;
            break;
          case "string":
            date4 = hooks(eras[i].until).startOf("day").valueOf();
            eras[i].until = date4.valueOf();
            break;
        }
      }
      return eras;
    }
    function localeErasParse(eraName, format2, strict3) {
      var i, l, eras = this.eras(), name, abbr, narrow;
      eraName = eraName.toUpperCase();
      for (i = 0, l = eras.length;i < l; ++i) {
        name = eras[i].name.toUpperCase();
        abbr = eras[i].abbr.toUpperCase();
        narrow = eras[i].narrow.toUpperCase();
        if (strict3) {
          switch (format2) {
            case "N":
            case "NN":
            case "NNN":
              if (abbr === eraName) {
                return eras[i];
              }
              break;
            case "NNNN":
              if (name === eraName) {
                return eras[i];
              }
              break;
            case "NNNNN":
              if (narrow === eraName) {
                return eras[i];
              }
              break;
          }
        } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
          return eras[i];
        }
      }
    }
    function localeErasConvertYear(era, year) {
      var dir = era.since <= era.until ? 1 : -1;
      if (year === undefined) {
        return hooks(era.since).year();
      } else {
        return hooks(era.since).year() + (year - era.offset) * dir;
      }
    }
    function getEraName() {
      var i, l, val, eras = this.localeData().eras();
      for (i = 0, l = eras.length;i < l; ++i) {
        val = this.clone().startOf("day").valueOf();
        if (eras[i].since <= val && val <= eras[i].until) {
          return eras[i].name;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
          return eras[i].name;
        }
      }
      return "";
    }
    function getEraNarrow() {
      var i, l, val, eras = this.localeData().eras();
      for (i = 0, l = eras.length;i < l; ++i) {
        val = this.clone().startOf("day").valueOf();
        if (eras[i].since <= val && val <= eras[i].until) {
          return eras[i].narrow;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
          return eras[i].narrow;
        }
      }
      return "";
    }
    function getEraAbbr() {
      var i, l, val, eras = this.localeData().eras();
      for (i = 0, l = eras.length;i < l; ++i) {
        val = this.clone().startOf("day").valueOf();
        if (eras[i].since <= val && val <= eras[i].until) {
          return eras[i].abbr;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
          return eras[i].abbr;
        }
      }
      return "";
    }
    function getEraYear() {
      var i, l, dir, val, eras = this.localeData().eras();
      for (i = 0, l = eras.length;i < l; ++i) {
        dir = eras[i].since <= eras[i].until ? 1 : -1;
        val = this.clone().startOf("day").valueOf();
        if (eras[i].since <= val && val <= eras[i].until || eras[i].until <= val && val <= eras[i].since) {
          return (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset;
        }
      }
      return this.year();
    }
    function erasNameRegex(isStrict) {
      if (!hasOwnProp(this, "_erasNameRegex")) {
        computeErasParse.call(this);
      }
      return isStrict ? this._erasNameRegex : this._erasRegex;
    }
    function erasAbbrRegex(isStrict) {
      if (!hasOwnProp(this, "_erasAbbrRegex")) {
        computeErasParse.call(this);
      }
      return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }
    function erasNarrowRegex(isStrict) {
      if (!hasOwnProp(this, "_erasNarrowRegex")) {
        computeErasParse.call(this);
      }
      return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }
    function matchEraAbbr(isStrict, locale2) {
      return locale2.erasAbbrRegex(isStrict);
    }
    function matchEraName(isStrict, locale2) {
      return locale2.erasNameRegex(isStrict);
    }
    function matchEraNarrow(isStrict, locale2) {
      return locale2.erasNarrowRegex(isStrict);
    }
    function matchEraYearOrdinal(isStrict, locale2) {
      return locale2._eraYearOrdinalRegex || matchUnsigned;
    }
    function computeErasParse() {
      var abbrPieces = [], namePieces = [], narrowPieces = [], mixedPieces = [], i, l, erasName, erasAbbr, erasNarrow, eras = this.eras();
      for (i = 0, l = eras.length;i < l; ++i) {
        erasName = regexEscape(eras[i].name);
        erasAbbr = regexEscape(eras[i].abbr);
        erasNarrow = regexEscape(eras[i].narrow);
        namePieces.push(erasName);
        abbrPieces.push(erasAbbr);
        narrowPieces.push(erasNarrow);
        mixedPieces.push(erasName);
        mixedPieces.push(erasAbbr);
        mixedPieces.push(erasNarrow);
      }
      this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
      this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
      this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
      this._erasNarrowRegex = new RegExp("^(" + narrowPieces.join("|") + ")", "i");
    }
    addFormatToken(0, ["gg", 2], 0, function() {
      return this.weekYear() % 100;
    });
    addFormatToken(0, ["GG", 2], 0, function() {
      return this.isoWeekYear() % 100;
    });
    function addWeekYearFormatToken(token2, getter) {
      addFormatToken(0, [token2, token2.length], 0, getter);
    }
    addWeekYearFormatToken("gggg", "weekYear");
    addWeekYearFormatToken("ggggg", "weekYear");
    addWeekYearFormatToken("GGGG", "isoWeekYear");
    addWeekYearFormatToken("GGGGG", "isoWeekYear");
    addRegexToken("G", matchSigned);
    addRegexToken("g", matchSigned);
    addRegexToken("GG", match1to2, match2);
    addRegexToken("gg", match1to2, match2);
    addRegexToken("GGGG", match1to4, match4);
    addRegexToken("gggg", match1to4, match4);
    addRegexToken("GGGGG", match1to6, match6);
    addRegexToken("ggggg", match1to6, match6);
    addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function(input, week, config, token2) {
      week[token2.substr(0, 2)] = toInt(input);
    });
    addWeekParseToken(["gg", "GG"], function(input, week, config, token2) {
      week[token2] = hooks.parseTwoDigitYear(input);
    });
    function getSetWeekYear(input) {
      return getSetWeekYearHelper.call(this, input, this.week(), this.weekday() + this.localeData()._week.dow, this.localeData()._week.dow, this.localeData()._week.doy);
    }
    function getSetISOWeekYear(input) {
      return getSetWeekYearHelper.call(this, input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }
    function getISOWeeksInYear() {
      return weeksInYear(this.year(), 1, 4);
    }
    function getISOWeeksInISOWeekYear() {
      return weeksInYear(this.isoWeekYear(), 1, 4);
    }
    function getWeeksInYear() {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }
    function getWeeksInWeekYear() {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }
    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
      var weeksTarget;
      if (input == null) {
        return weekOfYear(this, dow, doy).year;
      } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
          week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
      }
    }
    function setWeekAll(weekYear, week, weekday, dow, doy) {
      var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy), date4 = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
      this.year(date4.getUTCFullYear());
      this.month(date4.getUTCMonth());
      this.date(date4.getUTCDate());
      return this;
    }
    addFormatToken("Q", 0, "Qo", "quarter");
    addRegexToken("Q", match1);
    addParseToken("Q", function(input, array3) {
      array3[MONTH] = (toInt(input) - 1) * 3;
    });
    function getSetQuarter(input) {
      return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }
    addFormatToken("D", ["DD", 2], "Do", "date");
    addRegexToken("D", match1to2, match1to2NoLeadingZero);
    addRegexToken("DD", match1to2, match2);
    addRegexToken("Do", function(isStrict, locale2) {
      return isStrict ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse : locale2._dayOfMonthOrdinalParseLenient;
    });
    addParseToken(["D", "DD"], DATE2);
    addParseToken("Do", function(input, array3) {
      array3[DATE2] = toInt(input.match(match1to2)[0]);
    });
    var getSetDayOfMonth = makeGetSet("Date", true);
    addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
    addRegexToken("DDD", match1to3);
    addRegexToken("DDDD", match3);
    addParseToken(["DDD", "DDDD"], function(input, array3, config) {
      config._dayOfYear = toInt(input);
    });
    function getSetDayOfYear(input) {
      var dayOfYear = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 86400000) + 1;
      return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
    }
    addFormatToken("m", ["mm", 2], 0, "minute");
    addRegexToken("m", match1to2, match1to2HasZero);
    addRegexToken("mm", match1to2, match2);
    addParseToken(["m", "mm"], MINUTE);
    var getSetMinute = makeGetSet("Minutes", false);
    addFormatToken("s", ["ss", 2], 0, "second");
    addRegexToken("s", match1to2, match1to2HasZero);
    addRegexToken("ss", match1to2, match2);
    addParseToken(["s", "ss"], SECOND);
    var getSetSecond = makeGetSet("Seconds", false);
    addFormatToken("S", 0, 0, function() {
      return ~~(this.millisecond() / 100);
    });
    addFormatToken(0, ["SS", 2], 0, function() {
      return ~~(this.millisecond() / 10);
    });
    addFormatToken(0, ["SSS", 3], 0, "millisecond");
    addFormatToken(0, ["SSSS", 4], 0, function() {
      return this.millisecond() * 10;
    });
    addFormatToken(0, ["SSSSS", 5], 0, function() {
      return this.millisecond() * 100;
    });
    addFormatToken(0, ["SSSSSS", 6], 0, function() {
      return this.millisecond() * 1000;
    });
    addFormatToken(0, ["SSSSSSS", 7], 0, function() {
      return this.millisecond() * 1e4;
    });
    addFormatToken(0, ["SSSSSSSS", 8], 0, function() {
      return this.millisecond() * 1e5;
    });
    addFormatToken(0, ["SSSSSSSSS", 9], 0, function() {
      return this.millisecond() * 1e6;
    });
    addRegexToken("S", match1to3, match1);
    addRegexToken("SS", match1to3, match2);
    addRegexToken("SSS", match1to3, match3);
    var token, getSetMillisecond;
    for (token = "SSSS";token.length <= 9; token += "S") {
      addRegexToken(token, matchUnsigned);
    }
    function parseMs(input, array3) {
      array3[MILLISECOND] = toInt(("0." + input) * 1000);
    }
    for (token = "S";token.length <= 9; token += "S") {
      addParseToken(token, parseMs);
    }
    getSetMillisecond = makeGetSet("Milliseconds", false);
    addFormatToken("z", 0, 0, "zoneAbbr");
    addFormatToken("zz", 0, 0, "zoneName");
    function getZoneAbbr() {
      return this._isUTC ? "UTC" : "";
    }
    function getZoneName() {
      return this._isUTC ? "Coordinated Universal Time" : "";
    }
    var proto = Moment.prototype;
    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone4;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== "undefined" && Symbol.for != null) {
      proto[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return "Moment<" + this.format() + ">";
      };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth);
    proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth);
    proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear);
    proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone);
    proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);
    function createUnix(input) {
      return createLocal(input * 1000);
    }
    function createInZone() {
      return createLocal.apply(null, arguments).parseZone();
    }
    function preParsePostFormat(string3) {
      return string3;
    }
    var proto$1 = Locale.prototype;
    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set3;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;
    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;
    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;
    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;
    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;
    function get$1(format2, index, field, setter) {
      var locale2 = getLocale(), utc = createUTC().set(setter, index);
      return locale2[field](utc, format2);
    }
    function listMonthsImpl(format2, index, field) {
      if (isNumber(format2)) {
        index = format2;
        format2 = undefined;
      }
      format2 = format2 || "";
      if (index != null) {
        return get$1(format2, index, field, "month");
      }
      var i, out = [];
      for (i = 0;i < 12; i++) {
        out[i] = get$1(format2, i, field, "month");
      }
      return out;
    }
    function listWeekdaysImpl(localeSorted, format2, index, field) {
      if (typeof localeSorted === "boolean") {
        if (isNumber(format2)) {
          index = format2;
          format2 = undefined;
        }
        format2 = format2 || "";
      } else {
        format2 = localeSorted;
        index = format2;
        localeSorted = false;
        if (isNumber(format2)) {
          index = format2;
          format2 = undefined;
        }
        format2 = format2 || "";
      }
      var locale2 = getLocale(), shift = localeSorted ? locale2._week.dow : 0, i, out = [];
      if (index != null) {
        return get$1(format2, (index + shift) % 7, field, "day");
      }
      for (i = 0;i < 7; i++) {
        out[i] = get$1(format2, (i + shift) % 7, field, "day");
      }
      return out;
    }
    function listMonths(format2, index) {
      return listMonthsImpl(format2, index, "months");
    }
    function listMonthsShort(format2, index) {
      return listMonthsImpl(format2, index, "monthsShort");
    }
    function listWeekdays(localeSorted, format2, index) {
      return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
    }
    function listWeekdaysShort(localeSorted, format2, index) {
      return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
    }
    function listWeekdaysMin(localeSorted, format2, index) {
      return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
    }
    getSetGlobalLocale("en", {
      eras: [
        {
          since: "0001-01-01",
          until: Infinity,
          offset: 1,
          name: "Anno Domini",
          narrow: "AD",
          abbr: "AD"
        },
        {
          since: "0000-12-31",
          until: -Infinity,
          offset: 1,
          name: "Before Christ",
          narrow: "BC",
          abbr: "BC"
        }
      ],
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function(number3) {
        var b = number3 % 10, output = toInt(number3 % 100 / 10) === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
        return number3 + output;
      }
    });
    hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale);
    hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
    var mathAbs = Math.abs;
    function abs() {
      var data = this._data;
      this._milliseconds = mathAbs(this._milliseconds);
      this._days = mathAbs(this._days);
      this._months = mathAbs(this._months);
      data.milliseconds = mathAbs(data.milliseconds);
      data.seconds = mathAbs(data.seconds);
      data.minutes = mathAbs(data.minutes);
      data.hours = mathAbs(data.hours);
      data.months = mathAbs(data.months);
      data.years = mathAbs(data.years);
      return this;
    }
    function addSubtract$1(duration, input, value2, direction) {
      var other = createDuration(input, value2);
      duration._milliseconds += direction * other._milliseconds;
      duration._days += direction * other._days;
      duration._months += direction * other._months;
      return duration._bubble();
    }
    function add$1(input, value2) {
      return addSubtract$1(this, input, value2, 1);
    }
    function subtract$1(input, value2) {
      return addSubtract$1(this, input, value2, -1);
    }
    function absCeil(number3) {
      if (number3 < 0) {
        return Math.floor(number3);
      } else {
        return Math.ceil(number3);
      }
    }
    function bubble() {
      var milliseconds2 = this._milliseconds, days2 = this._days, months2 = this._months, data = this._data, seconds2, minutes2, hours2, years2, monthsFromDays;
      if (!(milliseconds2 >= 0 && days2 >= 0 && months2 >= 0 || milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)) {
        milliseconds2 += absCeil(monthsToDays(months2) + days2) * 86400000;
        days2 = 0;
        months2 = 0;
      }
      data.milliseconds = milliseconds2 % 1000;
      seconds2 = absFloor(milliseconds2 / 1000);
      data.seconds = seconds2 % 60;
      minutes2 = absFloor(seconds2 / 60);
      data.minutes = minutes2 % 60;
      hours2 = absFloor(minutes2 / 60);
      data.hours = hours2 % 24;
      days2 += absFloor(hours2 / 24);
      monthsFromDays = absFloor(daysToMonths(days2));
      months2 += monthsFromDays;
      days2 -= absCeil(monthsToDays(monthsFromDays));
      years2 = absFloor(months2 / 12);
      months2 %= 12;
      data.days = days2;
      data.months = months2;
      data.years = years2;
      return this;
    }
    function daysToMonths(days2) {
      return days2 * 4800 / 146097;
    }
    function monthsToDays(months2) {
      return months2 * 146097 / 4800;
    }
    function as(units) {
      if (!this.isValid()) {
        return NaN;
      }
      var days2, months2, milliseconds2 = this._milliseconds;
      units = normalizeUnits(units);
      if (units === "month" || units === "quarter" || units === "year") {
        days2 = this._days + milliseconds2 / 86400000;
        months2 = this._months + daysToMonths(days2);
        switch (units) {
          case "month":
            return months2;
          case "quarter":
            return months2 / 3;
          case "year":
            return months2 / 12;
        }
      } else {
        days2 = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
          case "week":
            return days2 / 7 + milliseconds2 / 604800000;
          case "day":
            return days2 + milliseconds2 / 86400000;
          case "hour":
            return days2 * 24 + milliseconds2 / 3600000;
          case "minute":
            return days2 * 1440 + milliseconds2 / 60000;
          case "second":
            return days2 * 86400 + milliseconds2 / 1000;
          case "millisecond":
            return Math.floor(days2 * 86400000) + milliseconds2;
          default:
            throw new Error("Unknown unit " + units);
        }
      }
    }
    function makeAs(alias) {
      return function() {
        return this.as(alias);
      };
    }
    var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y"), valueOf$1 = asMilliseconds;
    function clone$1() {
      return createDuration(this);
    }
    function get$2(units) {
      units = normalizeUnits(units);
      return this.isValid() ? this[units + "s"]() : NaN;
    }
    function makeGetter(name) {
      return function() {
        return this.isValid() ? this._data[name] : NaN;
      };
    }
    var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
    function weeks() {
      return absFloor(this.days() / 7);
    }
    var round = Math.round, thresholds = {
      ss: 44,
      s: 45,
      m: 45,
      h: 22,
      d: 26,
      w: null,
      M: 11
    };
    function substituteTimeAgo(string3, number3, withoutSuffix, isFuture, locale2) {
      return locale2.relativeTime(number3 || 1, !!withoutSuffix, string3, isFuture);
    }
    function relativeTime$1(posNegDuration, withoutSuffix, thresholds2, locale2) {
      var duration = createDuration(posNegDuration).abs(), seconds2 = round(duration.as("s")), minutes2 = round(duration.as("m")), hours2 = round(duration.as("h")), days2 = round(duration.as("d")), months2 = round(duration.as("M")), weeks2 = round(duration.as("w")), years2 = round(duration.as("y")), a = seconds2 <= thresholds2.ss && ["s", seconds2] || seconds2 < thresholds2.s && ["ss", seconds2] || minutes2 <= 1 && ["m"] || minutes2 < thresholds2.m && ["mm", minutes2] || hours2 <= 1 && ["h"] || hours2 < thresholds2.h && ["hh", hours2] || days2 <= 1 && ["d"] || days2 < thresholds2.d && ["dd", days2];
      if (thresholds2.w != null) {
        a = a || weeks2 <= 1 && ["w"] || weeks2 < thresholds2.w && ["ww", weeks2];
      }
      a = a || months2 <= 1 && ["M"] || months2 < thresholds2.M && ["MM", months2] || years2 <= 1 && ["y"] || ["yy", years2];
      a[2] = withoutSuffix;
      a[3] = +posNegDuration > 0;
      a[4] = locale2;
      return substituteTimeAgo.apply(null, a);
    }
    function getSetRelativeTimeRounding(roundingFunction) {
      if (roundingFunction === undefined) {
        return round;
      }
      if (typeof roundingFunction === "function") {
        round = roundingFunction;
        return true;
      }
      return false;
    }
    function getSetRelativeTimeThreshold(threshold, limit) {
      if (thresholds[threshold] === undefined) {
        return false;
      }
      if (limit === undefined) {
        return thresholds[threshold];
      }
      thresholds[threshold] = limit;
      if (threshold === "s") {
        thresholds.ss = limit - 1;
      }
      return true;
    }
    function humanize(argWithSuffix, argThresholds) {
      if (!this.isValid()) {
        return this.localeData().invalidDate();
      }
      var withSuffix = false, th = thresholds, locale2, output;
      if (typeof argWithSuffix === "object") {
        argThresholds = argWithSuffix;
        argWithSuffix = false;
      }
      if (typeof argWithSuffix === "boolean") {
        withSuffix = argWithSuffix;
      }
      if (typeof argThresholds === "object") {
        th = Object.assign({}, thresholds, argThresholds);
        if (argThresholds.s != null && argThresholds.ss == null) {
          th.ss = argThresholds.s - 1;
        }
      }
      locale2 = this.localeData();
      output = relativeTime$1(this, !withSuffix, th, locale2);
      if (withSuffix) {
        output = locale2.pastFuture(+this, output);
      }
      return locale2.postformat(output);
    }
    var abs$1 = Math.abs;
    function sign(x) {
      return (x > 0) - (x < 0) || +x;
    }
    function toISOString$1() {
      if (!this.isValid()) {
        return this.localeData().invalidDate();
      }
      var seconds2 = abs$1(this._milliseconds) / 1000, days2 = abs$1(this._days), months2 = abs$1(this._months), minutes2, hours2, years2, s, total = this.asSeconds(), totalSign, ymSign, daysSign, hmsSign;
      if (!total) {
        return "P0D";
      }
      minutes2 = absFloor(seconds2 / 60);
      hours2 = absFloor(minutes2 / 60);
      seconds2 %= 60;
      minutes2 %= 60;
      years2 = absFloor(months2 / 12);
      months2 %= 12;
      s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
      totalSign = total < 0 ? "-" : "";
      ymSign = sign(this._months) !== sign(total) ? "-" : "";
      daysSign = sign(this._days) !== sign(total) ? "-" : "";
      hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
      return totalSign + "P" + (years2 ? ymSign + years2 + "Y" : "") + (months2 ? ymSign + months2 + "M" : "") + (days2 ? daysSign + days2 + "D" : "") + (hours2 || minutes2 || seconds2 ? "T" : "") + (hours2 ? hmsSign + hours2 + "H" : "") + (minutes2 ? hmsSign + minutes2 + "M" : "") + (seconds2 ? hmsSign + s + "S" : "");
    }
    var proto$2 = Duration.prototype;
    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;
    proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1);
    proto$2.lang = lang;
    addFormatToken("X", 0, 0, "unix");
    addFormatToken("x", 0, 0, "valueOf");
    addRegexToken("x", matchSigned);
    addRegexToken("X", matchTimestamp);
    addParseToken("X", function(input, array3, config) {
      config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken("x", function(input, array3, config) {
      config._d = new Date(toInt(input));
    });
    //! moment.js
    hooks.version = "2.30.1";
    setHookCallback(createLocal);
    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;
    hooks.HTML5_FMT = {
      DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
      DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
      DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
      DATE: "YYYY-MM-DD",
      TIME: "HH:mm",
      TIME_SECONDS: "HH:mm:ss",
      TIME_MS: "HH:mm:ss.SSS",
      WEEK: "GGGG-[W]WW",
      MONTH: "YYYY-MM"
    };
    return hooks;
  });
});

// node_modules/logform/format.js
var require_format = __commonJS((exports, module) => {
  class InvalidFormatError extends Error {
    constructor(formatFn) {
      super(`Format functions must be synchronous taking a two arguments: (info, opts)
Found: ${formatFn.toString().split(`
`)[0]}
`);
      Error.captureStackTrace(this, InvalidFormatError);
    }
  }
  module.exports = (formatFn) => {
    if (formatFn.length > 2) {
      throw new InvalidFormatError(formatFn);
    }
    function Format2(options = {}) {
      this.options = options;
    }
    Format2.prototype.transform = formatFn;
    function createFormatWrap(opts) {
      return new Format2(opts);
    }
    createFormatWrap.Format = Format2;
    return createFormatWrap;
  };
});

// node_modules/@colors/colors/lib/styles.js
var require_styles = __commonJS((exports, module) => {
  var styles = {};
  module["exports"] = styles;
  var codes = {
    reset: [0, 0],
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29],
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    gray: [90, 39],
    grey: [90, 39],
    brightRed: [91, 39],
    brightGreen: [92, 39],
    brightYellow: [93, 39],
    brightBlue: [94, 39],
    brightMagenta: [95, 39],
    brightCyan: [96, 39],
    brightWhite: [97, 39],
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    bgGray: [100, 49],
    bgGrey: [100, 49],
    bgBrightRed: [101, 49],
    bgBrightGreen: [102, 49],
    bgBrightYellow: [103, 49],
    bgBrightBlue: [104, 49],
    bgBrightMagenta: [105, 49],
    bgBrightCyan: [106, 49],
    bgBrightWhite: [107, 49],
    blackBG: [40, 49],
    redBG: [41, 49],
    greenBG: [42, 49],
    yellowBG: [43, 49],
    blueBG: [44, 49],
    magentaBG: [45, 49],
    cyanBG: [46, 49],
    whiteBG: [47, 49]
  };
  Object.keys(codes).forEach(function(key) {
    var val = codes[key];
    var style = styles[key] = [];
    style.open = "\x1B[" + val[0] + "m";
    style.close = "\x1B[" + val[1] + "m";
  });
});

// node_modules/@colors/colors/lib/system/has-flag.js
var require_has_flag = __commonJS((exports, module) => {
  module.exports = function(flag, argv) {
    argv = argv || process.argv || [];
    var terminatorPos = argv.indexOf("--");
    var prefix = /^-{1,2}/.test(flag) ? "" : "--";
    var pos = argv.indexOf(prefix + flag);
    return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
  };
});

// node_modules/@colors/colors/lib/system/supports-colors.js
var require_supports_colors = __commonJS((exports, module) => {
  var os = import.meta.require("os");
  var hasFlag = require_has_flag();
  var env2 = process.env;
  var forceColor = undefined;
  if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
    forceColor = false;
  } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
    forceColor = true;
  }
  if ("FORCE_COLOR" in env2) {
    forceColor = env2.FORCE_COLOR.length === 0 || parseInt(env2.FORCE_COLOR, 10) !== 0;
  }
  function translateLevel(level) {
    if (level === 0) {
      return false;
    }
    return {
      level,
      hasBasic: true,
      has256: level >= 2,
      has16m: level >= 3
    };
  }
  function supportsColor(stream) {
    if (forceColor === false) {
      return 0;
    }
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
    if (stream && !stream.isTTY && forceColor !== true) {
      return 0;
    }
    var min = forceColor ? 1 : 0;
    if (process.platform === "win32") {
      var osRelease = os.release().split(".");
      if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
        return Number(osRelease[2]) >= 14931 ? 3 : 2;
      }
      return 1;
    }
    if ("CI" in env2) {
      if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(sign) {
        return sign in env2;
      }) || env2.CI_NAME === "codeship") {
        return 1;
      }
      return min;
    }
    if ("TEAMCITY_VERSION" in env2) {
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env2.TEAMCITY_VERSION) ? 1 : 0;
    }
    if ("TERM_PROGRAM" in env2) {
      var version2 = parseInt((env2.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (env2.TERM_PROGRAM) {
        case "iTerm.app":
          return version2 >= 3 ? 3 : 2;
        case "Hyper":
          return 3;
        case "Apple_Terminal":
          return 2;
      }
    }
    if (/-256(color)?$/i.test(env2.TERM)) {
      return 2;
    }
    if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env2.TERM)) {
      return 1;
    }
    if ("COLORTERM" in env2) {
      return 1;
    }
    if (env2.TERM === "dumb") {
      return min;
    }
    return min;
  }
  function getSupportLevel(stream) {
    var level = supportsColor(stream);
    return translateLevel(level);
  }
  module.exports = {
    supportsColor: getSupportLevel,
    stdout: getSupportLevel(process.stdout),
    stderr: getSupportLevel(process.stderr)
  };
});

// node_modules/@colors/colors/lib/custom/trap.js
var require_trap = __commonJS((exports, module) => {
  module["exports"] = function runTheTrap(text, options) {
    var result = "";
    text = text || "Run the trap, drop the bass";
    text = text.split("");
    var trap = {
      a: ["@", "\u0104", "\u023A", "\u0245", "\u0394", "\u039B", "\u0414"],
      b: ["\xDF", "\u0181", "\u0243", "\u026E", "\u03B2", "\u0E3F"],
      c: ["\xA9", "\u023B", "\u03FE"],
      d: ["\xD0", "\u018A", "\u0500", "\u0501", "\u0502", "\u0503"],
      e: [
        "\xCB",
        "\u0115",
        "\u018E",
        "\u0258",
        "\u03A3",
        "\u03BE",
        "\u04BC",
        "\u0A6C"
      ],
      f: ["\u04FA"],
      g: ["\u0262"],
      h: ["\u0126", "\u0195", "\u04A2", "\u04BA", "\u04C7", "\u050A"],
      i: ["\u0F0F"],
      j: ["\u0134"],
      k: ["\u0138", "\u04A0", "\u04C3", "\u051E"],
      l: ["\u0139"],
      m: ["\u028D", "\u04CD", "\u04CE", "\u0520", "\u0521", "\u0D69"],
      n: ["\xD1", "\u014B", "\u019D", "\u0376", "\u03A0", "\u048A"],
      o: [
        "\xD8",
        "\xF5",
        "\xF8",
        "\u01FE",
        "\u0298",
        "\u047A",
        "\u05DD",
        "\u06DD",
        "\u0E4F"
      ],
      p: ["\u01F7", "\u048E"],
      q: ["\u09CD"],
      r: ["\xAE", "\u01A6", "\u0210", "\u024C", "\u0280", "\u042F"],
      s: ["\xA7", "\u03DE", "\u03DF", "\u03E8"],
      t: ["\u0141", "\u0166", "\u0373"],
      u: ["\u01B1", "\u054D"],
      v: ["\u05D8"],
      w: ["\u0428", "\u0460", "\u047C", "\u0D70"],
      x: ["\u04B2", "\u04FE", "\u04FC", "\u04FD"],
      y: ["\xA5", "\u04B0", "\u04CB"],
      z: ["\u01B5", "\u0240"]
    };
    text.forEach(function(c) {
      c = c.toLowerCase();
      var chars = trap[c] || [" "];
      var rand = Math.floor(Math.random() * chars.length);
      if (typeof trap[c] !== "undefined") {
        result += trap[c][rand];
      } else {
        result += c;
      }
    });
    return result;
  };
});

// node_modules/@colors/colors/lib/custom/zalgo.js
var require_zalgo = __commonJS((exports, module) => {
  module["exports"] = function zalgo(text, options) {
    text = text || "   he is here   ";
    var soul = {
      up: [
        "\u030D",
        "\u030E",
        "\u0304",
        "\u0305",
        "\u033F",
        "\u0311",
        "\u0306",
        "\u0310",
        "\u0352",
        "\u0357",
        "\u0351",
        "\u0307",
        "\u0308",
        "\u030A",
        "\u0342",
        "\u0313",
        "\u0308",
        "\u034A",
        "\u034B",
        "\u034C",
        "\u0303",
        "\u0302",
        "\u030C",
        "\u0350",
        "\u0300",
        "\u0301",
        "\u030B",
        "\u030F",
        "\u0312",
        "\u0313",
        "\u0314",
        "\u033D",
        "\u0309",
        "\u0363",
        "\u0364",
        "\u0365",
        "\u0366",
        "\u0367",
        "\u0368",
        "\u0369",
        "\u036A",
        "\u036B",
        "\u036C",
        "\u036D",
        "\u036E",
        "\u036F",
        "\u033E",
        "\u035B",
        "\u0346",
        "\u031A"
      ],
      down: [
        "\u0316",
        "\u0317",
        "\u0318",
        "\u0319",
        "\u031C",
        "\u031D",
        "\u031E",
        "\u031F",
        "\u0320",
        "\u0324",
        "\u0325",
        "\u0326",
        "\u0329",
        "\u032A",
        "\u032B",
        "\u032C",
        "\u032D",
        "\u032E",
        "\u032F",
        "\u0330",
        "\u0331",
        "\u0332",
        "\u0333",
        "\u0339",
        "\u033A",
        "\u033B",
        "\u033C",
        "\u0345",
        "\u0347",
        "\u0348",
        "\u0349",
        "\u034D",
        "\u034E",
        "\u0353",
        "\u0354",
        "\u0355",
        "\u0356",
        "\u0359",
        "\u035A",
        "\u0323"
      ],
      mid: [
        "\u0315",
        "\u031B",
        "\u0300",
        "\u0301",
        "\u0358",
        "\u0321",
        "\u0322",
        "\u0327",
        "\u0328",
        "\u0334",
        "\u0335",
        "\u0336",
        "\u035C",
        "\u035D",
        "\u035E",
        "\u035F",
        "\u0360",
        "\u0362",
        "\u0338",
        "\u0337",
        "\u0361",
        " \u0489"
      ]
    };
    var all = [].concat(soul.up, soul.down, soul.mid);
    function randomNumber(range) {
      var r = Math.floor(Math.random() * range);
      return r;
    }
    function isChar(character) {
      var bool = false;
      all.filter(function(i) {
        bool = i === character;
      });
      return bool;
    }
    function heComes(text2, options2) {
      var result = "";
      var counts;
      var l;
      options2 = options2 || {};
      options2["up"] = typeof options2["up"] !== "undefined" ? options2["up"] : true;
      options2["mid"] = typeof options2["mid"] !== "undefined" ? options2["mid"] : true;
      options2["down"] = typeof options2["down"] !== "undefined" ? options2["down"] : true;
      options2["size"] = typeof options2["size"] !== "undefined" ? options2["size"] : "maxi";
      text2 = text2.split("");
      for (l in text2) {
        if (isChar(l)) {
          continue;
        }
        result = result + text2[l];
        counts = { up: 0, down: 0, mid: 0 };
        switch (options2.size) {
          case "mini":
            counts.up = randomNumber(8);
            counts.mid = randomNumber(2);
            counts.down = randomNumber(8);
            break;
          case "maxi":
            counts.up = randomNumber(16) + 3;
            counts.mid = randomNumber(4) + 1;
            counts.down = randomNumber(64) + 3;
            break;
          default:
            counts.up = randomNumber(8) + 1;
            counts.mid = randomNumber(6) / 2;
            counts.down = randomNumber(8) + 1;
            break;
        }
        var arr = ["up", "mid", "down"];
        for (var d in arr) {
          var index = arr[d];
          for (var i = 0;i <= counts[index]; i++) {
            if (options2[index]) {
              result = result + soul[index][randomNumber(soul[index].length)];
            }
          }
        }
      }
      return result;
    }
    return heComes(text, options);
  };
});

// node_modules/@colors/colors/lib/maps/america.js
var require_america = __commonJS((exports, module) => {
  module["exports"] = function(colors) {
    return function(letter, i, exploded) {
      if (letter === " ")
        return letter;
      switch (i % 3) {
        case 0:
          return colors.red(letter);
        case 1:
          return colors.white(letter);
        case 2:
          return colors.blue(letter);
      }
    };
  };
});

// node_modules/@colors/colors/lib/maps/zebra.js
var require_zebra = __commonJS((exports, module) => {
  module["exports"] = function(colors) {
    return function(letter, i, exploded) {
      return i % 2 === 0 ? letter : colors.inverse(letter);
    };
  };
});

// node_modules/@colors/colors/lib/maps/rainbow.js
var require_rainbow = __commonJS((exports, module) => {
  module["exports"] = function(colors) {
    var rainbowColors = ["red", "yellow", "green", "blue", "magenta"];
    return function(letter, i, exploded) {
      if (letter === " ") {
        return letter;
      } else {
        return colors[rainbowColors[i++ % rainbowColors.length]](letter);
      }
    };
  };
});

// node_modules/@colors/colors/lib/maps/random.js
var require_random = __commonJS((exports, module) => {
  module["exports"] = function(colors) {
    var available = [
      "underline",
      "inverse",
      "grey",
      "yellow",
      "red",
      "green",
      "blue",
      "white",
      "cyan",
      "magenta",
      "brightYellow",
      "brightRed",
      "brightGreen",
      "brightBlue",
      "brightWhite",
      "brightCyan",
      "brightMagenta"
    ];
    return function(letter, i, exploded) {
      return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 2))]](letter);
    };
  };
});

// node_modules/@colors/colors/lib/colors.js
var require_colors = __commonJS((exports, module) => {
  var colors = {};
  module["exports"] = colors;
  colors.themes = {};
  var util = import.meta.require("util");
  var ansiStyles = colors.styles = require_styles();
  var defineProps = Object.defineProperties;
  var newLineRegex = new RegExp(/[\r\n]+/g);
  colors.supportsColor = require_supports_colors().supportsColor;
  if (typeof colors.enabled === "undefined") {
    colors.enabled = colors.supportsColor() !== false;
  }
  colors.enable = function() {
    colors.enabled = true;
  };
  colors.disable = function() {
    colors.enabled = false;
  };
  colors.stripColors = colors.strip = function(str) {
    return ("" + str).replace(/\x1B\[\d+m/g, "");
  };
  var stylize = colors.stylize = function stylize(str, style) {
    if (!colors.enabled) {
      return str + "";
    }
    var styleMap = ansiStyles[style];
    if (!styleMap && style in colors) {
      return colors[style](str);
    }
    return styleMap.open + str + styleMap.close;
  };
  var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
  var escapeStringRegexp = function(str) {
    if (typeof str !== "string") {
      throw new TypeError("Expected a string");
    }
    return str.replace(matchOperatorsRe, "\\$&");
  };
  function build(_styles) {
    var builder = function builder() {
      return applyStyle.apply(builder, arguments);
    };
    builder._styles = _styles;
    builder.__proto__ = proto;
    return builder;
  }
  var styles = function() {
    var ret = {};
    ansiStyles.grey = ansiStyles.gray;
    Object.keys(ansiStyles).forEach(function(key) {
      ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), "g");
      ret[key] = {
        get: function() {
          return build(this._styles.concat(key));
        }
      };
    });
    return ret;
  }();
  var proto = defineProps(function colors() {
  }, styles);
  function applyStyle() {
    var args = Array.prototype.slice.call(arguments);
    var str = args.map(function(arg) {
      if (arg != null && arg.constructor === String) {
        return arg;
      } else {
        return util.inspect(arg);
      }
    }).join(" ");
    if (!colors.enabled || !str) {
      return str;
    }
    var newLinesPresent = str.indexOf(`
`) != -1;
    var nestedStyles = this._styles;
    var i = nestedStyles.length;
    while (i--) {
      var code = ansiStyles[nestedStyles[i]];
      str = code.open + str.replace(code.closeRe, code.open) + code.close;
      if (newLinesPresent) {
        str = str.replace(newLineRegex, function(match) {
          return code.close + match + code.open;
        });
      }
    }
    return str;
  }
  colors.setTheme = function(theme) {
    if (typeof theme === "string") {
      console.log("colors.setTheme now only accepts an object, not a string.  " + "If you are trying to set a theme from a file, it is now your (the " + "caller's) responsibility to require the file.  The old syntax " + "looked like colors.setTheme(__dirname + " + "'/../themes/generic-logging.js'); The new syntax looks like " + "colors.setTheme(require(__dirname + " + "'/../themes/generic-logging.js'));");
      return;
    }
    for (var style in theme) {
      (function(style2) {
        colors[style2] = function(str) {
          if (typeof theme[style2] === "object") {
            var out = str;
            for (var i in theme[style2]) {
              out = colors[theme[style2][i]](out);
            }
            return out;
          }
          return colors[theme[style2]](str);
        };
      })(style);
    }
  };
  function init() {
    var ret = {};
    Object.keys(styles).forEach(function(name) {
      ret[name] = {
        get: function() {
          return build([name]);
        }
      };
    });
    return ret;
  }
  var sequencer = function sequencer(map4, str) {
    var exploded = str.split("");
    exploded = exploded.map(map4);
    return exploded.join("");
  };
  colors.trap = require_trap();
  colors.zalgo = require_zalgo();
  colors.maps = {};
  colors.maps.america = require_america()(colors);
  colors.maps.zebra = require_zebra()(colors);
  colors.maps.rainbow = require_rainbow()(colors);
  colors.maps.random = require_random()(colors);
  for (map3 in colors.maps) {
    (function(map4) {
      colors[map4] = function(str) {
        return sequencer(colors.maps[map4], str);
      };
    })(map3);
  }
  var map3;
  defineProps(colors, init());
});

// node_modules/@colors/colors/safe.js
var require_safe = __commonJS((exports, module) => {
  var colors = require_colors();
  module["exports"] = colors;
});

// node_modules/triple-beam/config/cli.js
var require_cli = __commonJS((exports) => {
  exports.levels = {
    error: 0,
    warn: 1,
    help: 2,
    data: 3,
    info: 4,
    debug: 5,
    prompt: 6,
    verbose: 7,
    input: 8,
    silly: 9
  };
  exports.colors = {
    error: "red",
    warn: "yellow",
    help: "cyan",
    data: "grey",
    info: "green",
    debug: "blue",
    prompt: "grey",
    verbose: "cyan",
    input: "grey",
    silly: "magenta"
  };
});

// node_modules/triple-beam/config/npm.js
var require_npm = __commonJS((exports) => {
  exports.levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  };
  exports.colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "green",
    verbose: "cyan",
    debug: "blue",
    silly: "magenta"
  };
});

// node_modules/triple-beam/config/syslog.js
var require_syslog = __commonJS((exports) => {
  exports.levels = {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7
  };
  exports.colors = {
    emerg: "red",
    alert: "yellow",
    crit: "red",
    error: "red",
    warning: "red",
    notice: "yellow",
    info: "green",
    debug: "blue"
  };
});

// node_modules/triple-beam/config/index.js
var require_config = __commonJS((exports) => {
  Object.defineProperty(exports, "cli", {
    value: require_cli()
  });
  Object.defineProperty(exports, "npm", {
    value: require_npm()
  });
  Object.defineProperty(exports, "syslog", {
    value: require_syslog()
  });
});

// node_modules/triple-beam/index.js
var require_triple_beam = __commonJS((exports) => {
  Object.defineProperty(exports, "LEVEL", {
    value: Symbol.for("level")
  });
  Object.defineProperty(exports, "MESSAGE", {
    value: Symbol.for("message")
  });
  Object.defineProperty(exports, "SPLAT", {
    value: Symbol.for("splat")
  });
  Object.defineProperty(exports, "configs", {
    value: require_config()
  });
});

// node_modules/logform/colorize.js
var require_colorize = __commonJS((exports, module) => {
  var colors = require_safe();
  var { LEVEL, MESSAGE } = require_triple_beam();
  colors.enabled = true;
  var hasSpace = /\s+/;

  class Colorizer {
    constructor(opts = {}) {
      if (opts.colors) {
        this.addColors(opts.colors);
      }
      this.options = opts;
    }
    static addColors(clrs) {
      const nextColors = Object.keys(clrs).reduce((acc, level) => {
        acc[level] = hasSpace.test(clrs[level]) ? clrs[level].split(hasSpace) : clrs[level];
        return acc;
      }, {});
      Colorizer.allColors = Object.assign({}, Colorizer.allColors || {}, nextColors);
      return Colorizer.allColors;
    }
    addColors(clrs) {
      return Colorizer.addColors(clrs);
    }
    colorize(lookup, level, message) {
      if (typeof message === "undefined") {
        message = level;
      }
      if (!Array.isArray(Colorizer.allColors[lookup])) {
        return colors[Colorizer.allColors[lookup]](message);
      }
      for (let i = 0, len = Colorizer.allColors[lookup].length;i < len; i++) {
        message = colors[Colorizer.allColors[lookup][i]](message);
      }
      return message;
    }
    transform(info, opts) {
      if (opts.all && typeof info[MESSAGE] === "string") {
        info[MESSAGE] = this.colorize(info[LEVEL], info.level, info[MESSAGE]);
      }
      if (opts.level || opts.all || !opts.message) {
        info.level = this.colorize(info[LEVEL], info.level);
      }
      if (opts.all || opts.message) {
        info.message = this.colorize(info[LEVEL], info.level, info.message);
      }
      return info;
    }
  }
  module.exports = (opts) => new Colorizer(opts);
  module.exports.Colorizer = module.exports.Format = Colorizer;
});

// node_modules/logform/levels.js
var require_levels = __commonJS((exports, module) => {
  var { Colorizer } = require_colorize();
  module.exports = (config) => {
    Colorizer.addColors(config.colors || config);
    return config;
  };
});

// node_modules/logform/align.js
var require_align = __commonJS((exports, module) => {
  var format = require_format();
  module.exports = format((info) => {
    info.message = `\t${info.message}`;
    return info;
  });
});

// node_modules/logform/errors.js
var require_errors = __commonJS((exports, module) => {
  var format = require_format();
  var { LEVEL, MESSAGE } = require_triple_beam();
  module.exports = format((einfo, { stack, cause }) => {
    if (einfo instanceof Error) {
      const info = Object.assign({}, einfo, {
        level: einfo.level,
        [LEVEL]: einfo[LEVEL] || einfo.level,
        message: einfo.message,
        [MESSAGE]: einfo[MESSAGE] || einfo.message
      });
      if (stack)
        info.stack = einfo.stack;
      if (cause)
        info.cause = einfo.cause;
      return info;
    }
    if (!(einfo.message instanceof Error))
      return einfo;
    const err = einfo.message;
    Object.assign(einfo, err);
    einfo.message = err.message;
    einfo[MESSAGE] = err.message;
    if (stack)
      einfo.stack = err.stack;
    if (cause)
      einfo.cause = err.cause;
    return einfo;
  });
});

// node_modules/logform/pad-levels.js
var require_pad_levels = __commonJS((exports, module) => {
  var { configs, LEVEL, MESSAGE } = require_triple_beam();

  class Padder {
    constructor(opts = { levels: configs.npm.levels }) {
      this.paddings = Padder.paddingForLevels(opts.levels, opts.filler);
      this.options = opts;
    }
    static getLongestLevel(levels) {
      const lvls = Object.keys(levels).map((level) => level.length);
      return Math.max(...lvls);
    }
    static paddingForLevel(level, filler, maxLength) {
      const targetLen = maxLength + 1 - level.length;
      const rep = Math.floor(targetLen / filler.length);
      const padding = `${filler}${filler.repeat(rep)}`;
      return padding.slice(0, targetLen);
    }
    static paddingForLevels(levels, filler = " ") {
      const maxLength = Padder.getLongestLevel(levels);
      return Object.keys(levels).reduce((acc, level) => {
        acc[level] = Padder.paddingForLevel(level, filler, maxLength);
        return acc;
      }, {});
    }
    transform(info, opts) {
      info.message = `${this.paddings[info[LEVEL]]}${info.message}`;
      if (info[MESSAGE]) {
        info[MESSAGE] = `${this.paddings[info[LEVEL]]}${info[MESSAGE]}`;
      }
      return info;
    }
  }
  module.exports = (opts) => new Padder(opts);
  module.exports.Padder = module.exports.Format = Padder;
});

// node_modules/logform/cli.js
var require_cli2 = __commonJS((exports, module) => {
  var { Colorizer } = require_colorize();
  var { Padder } = require_pad_levels();
  var { configs, MESSAGE } = require_triple_beam();

  class CliFormat {
    constructor(opts = {}) {
      if (!opts.levels) {
        opts.levels = configs.cli.levels;
      }
      this.colorizer = new Colorizer(opts);
      this.padder = new Padder(opts);
      this.options = opts;
    }
    transform(info, opts) {
      this.colorizer.transform(this.padder.transform(info, opts), opts);
      info[MESSAGE] = `${info.level}:${info.message}`;
      return info;
    }
  }
  module.exports = (opts) => new CliFormat(opts);
  module.exports.Format = CliFormat;
});

// node_modules/logform/combine.js
var require_combine = __commonJS((exports, module) => {
  var format = require_format();
  function cascade(formats) {
    if (!formats.every(isValidFormat)) {
      return;
    }
    return (info) => {
      let obj = info;
      for (let i = 0;i < formats.length; i++) {
        obj = formats[i].transform(obj, formats[i].options);
        if (!obj) {
          return false;
        }
      }
      return obj;
    };
  }
  function isValidFormat(fmt) {
    if (typeof fmt.transform !== "function") {
      throw new Error([
        "No transform function found on format. Did you create a format instance?",
        "const myFormat = format(formatFn);",
        "const instance = myFormat();"
      ].join(`
`));
    }
    return true;
  }
  module.exports = (...formats) => {
    const combinedFormat = format(cascade(formats));
    const instance = combinedFormat();
    instance.Format = combinedFormat.Format;
    return instance;
  };
  module.exports.cascade = cascade;
});

// node_modules/safe-stable-stringify/index.js
var require_safe_stable_stringify = __commonJS((exports, module) => {
  var { hasOwnProperty } = Object.prototype;
  var stringify = configure();
  stringify.configure = configure;
  stringify.stringify = stringify;
  stringify.default = stringify;
  exports.stringify = stringify;
  exports.configure = configure;
  module.exports = stringify;
  var strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]/;
  function strEscape(str) {
    if (str.length < 5000 && !strEscapeSequencesRegExp.test(str)) {
      return `"${str}"`;
    }
    return JSON.stringify(str);
  }
  function sort(array3, comparator) {
    if (array3.length > 200 || comparator) {
      return array3.sort(comparator);
    }
    for (let i = 1;i < array3.length; i++) {
      const currentValue = array3[i];
      let position = i;
      while (position !== 0 && array3[position - 1] > currentValue) {
        array3[position] = array3[position - 1];
        position--;
      }
      array3[position] = currentValue;
    }
    return array3;
  }
  var typedArrayPrototypeGetSymbolToStringTag = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Object.getPrototypeOf(new Int8Array)), Symbol.toStringTag).get;
  function isTypedArrayWithEntries(value2) {
    return typedArrayPrototypeGetSymbolToStringTag.call(value2) !== undefined && value2.length !== 0;
  }
  function stringifyTypedArray(array3, separator, maximumBreadth) {
    if (array3.length < maximumBreadth) {
      maximumBreadth = array3.length;
    }
    const whitespace = separator === "," ? "" : " ";
    let res = `"0":${whitespace}${array3[0]}`;
    for (let i = 1;i < maximumBreadth; i++) {
      res += `${separator}"${i}":${whitespace}${array3[i]}`;
    }
    return res;
  }
  function getCircularValueOption(options) {
    if (hasOwnProperty.call(options, "circularValue")) {
      const circularValue = options.circularValue;
      if (typeof circularValue === "string") {
        return `"${circularValue}"`;
      }
      if (circularValue == null) {
        return circularValue;
      }
      if (circularValue === Error || circularValue === TypeError) {
        return {
          toString() {
            throw new TypeError("Converting circular structure to JSON");
          }
        };
      }
      throw new TypeError('The "circularValue" argument must be of type string or the value null or undefined');
    }
    return '"[Circular]"';
  }
  function getDeterministicOption(options) {
    let value2;
    if (hasOwnProperty.call(options, "deterministic")) {
      value2 = options.deterministic;
      if (typeof value2 !== "boolean" && typeof value2 !== "function") {
        throw new TypeError('The "deterministic" argument must be of type boolean or comparator function');
      }
    }
    return value2 === undefined ? true : value2;
  }
  function getBooleanOption(options, key) {
    let value2;
    if (hasOwnProperty.call(options, key)) {
      value2 = options[key];
      if (typeof value2 !== "boolean") {
        throw new TypeError(`The "${key}" argument must be of type boolean`);
      }
    }
    return value2 === undefined ? true : value2;
  }
  function getPositiveIntegerOption(options, key) {
    let value2;
    if (hasOwnProperty.call(options, key)) {
      value2 = options[key];
      if (typeof value2 !== "number") {
        throw new TypeError(`The "${key}" argument must be of type number`);
      }
      if (!Number.isInteger(value2)) {
        throw new TypeError(`The "${key}" argument must be an integer`);
      }
      if (value2 < 1) {
        throw new RangeError(`The "${key}" argument must be >= 1`);
      }
    }
    return value2 === undefined ? Infinity : value2;
  }
  function getItemCount(number3) {
    if (number3 === 1) {
      return "1 item";
    }
    return `${number3} items`;
  }
  function getUniqueReplacerSet(replacerArray) {
    const replacerSet = new Set;
    for (const value2 of replacerArray) {
      if (typeof value2 === "string" || typeof value2 === "number") {
        replacerSet.add(String(value2));
      }
    }
    return replacerSet;
  }
  function getStrictOption(options) {
    if (hasOwnProperty.call(options, "strict")) {
      const value2 = options.strict;
      if (typeof value2 !== "boolean") {
        throw new TypeError('The "strict" argument must be of type boolean');
      }
      if (value2) {
        return (value3) => {
          let message = `Object can not safely be stringified. Received type ${typeof value3}`;
          if (typeof value3 !== "function")
            message += ` (${value3.toString()})`;
          throw new Error(message);
        };
      }
    }
  }
  function configure(options) {
    options = { ...options };
    const fail = getStrictOption(options);
    if (fail) {
      if (options.bigint === undefined) {
        options.bigint = false;
      }
      if (!("circularValue" in options)) {
        options.circularValue = Error;
      }
    }
    const circularValue = getCircularValueOption(options);
    const bigint3 = getBooleanOption(options, "bigint");
    const deterministic = getDeterministicOption(options);
    const comparator = typeof deterministic === "function" ? deterministic : undefined;
    const maximumDepth = getPositiveIntegerOption(options, "maximumDepth");
    const maximumBreadth = getPositiveIntegerOption(options, "maximumBreadth");
    function stringifyFnReplacer(key, parent, stack, replacer, spacer, indentation) {
      let value2 = parent[key];
      if (typeof value2 === "object" && value2 !== null && typeof value2.toJSON === "function") {
        value2 = value2.toJSON(key);
      }
      value2 = replacer.call(parent, key, value2);
      switch (typeof value2) {
        case "string":
          return strEscape(value2);
        case "object": {
          if (value2 === null) {
            return "null";
          }
          if (stack.indexOf(value2) !== -1) {
            return circularValue;
          }
          let res = "";
          let join = ",";
          const originalIndentation = indentation;
          if (Array.isArray(value2)) {
            if (value2.length === 0) {
              return "[]";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Array]"';
            }
            stack.push(value2);
            if (spacer !== "") {
              indentation += spacer;
              res += `
${indentation}`;
              join = `,
${indentation}`;
            }
            const maximumValuesToStringify = Math.min(value2.length, maximumBreadth);
            let i = 0;
            for (;i < maximumValuesToStringify - 1; i++) {
              const tmp2 = stringifyFnReplacer(String(i), value2, stack, replacer, spacer, indentation);
              res += tmp2 !== undefined ? tmp2 : "null";
              res += join;
            }
            const tmp = stringifyFnReplacer(String(i), value2, stack, replacer, spacer, indentation);
            res += tmp !== undefined ? tmp : "null";
            if (value2.length - 1 > maximumBreadth) {
              const removedKeys = value2.length - maximumBreadth - 1;
              res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
            }
            if (spacer !== "") {
              res += `
${originalIndentation}`;
            }
            stack.pop();
            return `[${res}]`;
          }
          let keys = Object.keys(value2);
          const keyLength = keys.length;
          if (keyLength === 0) {
            return "{}";
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Object]"';
          }
          let whitespace = "";
          let separator = "";
          if (spacer !== "") {
            indentation += spacer;
            join = `,
${indentation}`;
            whitespace = " ";
          }
          const maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
          if (deterministic && !isTypedArrayWithEntries(value2)) {
            keys = sort(keys, comparator);
          }
          stack.push(value2);
          for (let i = 0;i < maximumPropertiesToStringify; i++) {
            const key2 = keys[i];
            const tmp = stringifyFnReplacer(key2, value2, stack, replacer, spacer, indentation);
            if (tmp !== undefined) {
              res += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
              separator = join;
            }
          }
          if (keyLength > maximumBreadth) {
            const removedKeys = keyLength - maximumBreadth;
            res += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`;
            separator = join;
          }
          if (spacer !== "" && separator.length > 1) {
            res = `
${indentation}${res}
${originalIndentation}`;
          }
          stack.pop();
          return `{${res}}`;
        }
        case "number":
          return isFinite(value2) ? String(value2) : fail ? fail(value2) : "null";
        case "boolean":
          return value2 === true ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (bigint3) {
            return String(value2);
          }
        default:
          return fail ? fail(value2) : undefined;
      }
    }
    function stringifyArrayReplacer(key, value2, stack, replacer, spacer, indentation) {
      if (typeof value2 === "object" && value2 !== null && typeof value2.toJSON === "function") {
        value2 = value2.toJSON(key);
      }
      switch (typeof value2) {
        case "string":
          return strEscape(value2);
        case "object": {
          if (value2 === null) {
            return "null";
          }
          if (stack.indexOf(value2) !== -1) {
            return circularValue;
          }
          const originalIndentation = indentation;
          let res = "";
          let join = ",";
          if (Array.isArray(value2)) {
            if (value2.length === 0) {
              return "[]";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Array]"';
            }
            stack.push(value2);
            if (spacer !== "") {
              indentation += spacer;
              res += `
${indentation}`;
              join = `,
${indentation}`;
            }
            const maximumValuesToStringify = Math.min(value2.length, maximumBreadth);
            let i = 0;
            for (;i < maximumValuesToStringify - 1; i++) {
              const tmp2 = stringifyArrayReplacer(String(i), value2[i], stack, replacer, spacer, indentation);
              res += tmp2 !== undefined ? tmp2 : "null";
              res += join;
            }
            const tmp = stringifyArrayReplacer(String(i), value2[i], stack, replacer, spacer, indentation);
            res += tmp !== undefined ? tmp : "null";
            if (value2.length - 1 > maximumBreadth) {
              const removedKeys = value2.length - maximumBreadth - 1;
              res += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
            }
            if (spacer !== "") {
              res += `
${originalIndentation}`;
            }
            stack.pop();
            return `[${res}]`;
          }
          stack.push(value2);
          let whitespace = "";
          if (spacer !== "") {
            indentation += spacer;
            join = `,
${indentation}`;
            whitespace = " ";
          }
          let separator = "";
          for (const key2 of replacer) {
            const tmp = stringifyArrayReplacer(key2, value2[key2], stack, replacer, spacer, indentation);
            if (tmp !== undefined) {
              res += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
              separator = join;
            }
          }
          if (spacer !== "" && separator.length > 1) {
            res = `
${indentation}${res}
${originalIndentation}`;
          }
          stack.pop();
          return `{${res}}`;
        }
        case "number":
          return isFinite(value2) ? String(value2) : fail ? fail(value2) : "null";
        case "boolean":
          return value2 === true ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (bigint3) {
            return String(value2);
          }
        default:
          return fail ? fail(value2) : undefined;
      }
    }
    function stringifyIndent(key, value2, stack, spacer, indentation) {
      switch (typeof value2) {
        case "string":
          return strEscape(value2);
        case "object": {
          if (value2 === null) {
            return "null";
          }
          if (typeof value2.toJSON === "function") {
            value2 = value2.toJSON(key);
            if (typeof value2 !== "object") {
              return stringifyIndent(key, value2, stack, spacer, indentation);
            }
            if (value2 === null) {
              return "null";
            }
          }
          if (stack.indexOf(value2) !== -1) {
            return circularValue;
          }
          const originalIndentation = indentation;
          if (Array.isArray(value2)) {
            if (value2.length === 0) {
              return "[]";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Array]"';
            }
            stack.push(value2);
            indentation += spacer;
            let res2 = `
${indentation}`;
            const join2 = `,
${indentation}`;
            const maximumValuesToStringify = Math.min(value2.length, maximumBreadth);
            let i = 0;
            for (;i < maximumValuesToStringify - 1; i++) {
              const tmp2 = stringifyIndent(String(i), value2[i], stack, spacer, indentation);
              res2 += tmp2 !== undefined ? tmp2 : "null";
              res2 += join2;
            }
            const tmp = stringifyIndent(String(i), value2[i], stack, spacer, indentation);
            res2 += tmp !== undefined ? tmp : "null";
            if (value2.length - 1 > maximumBreadth) {
              const removedKeys = value2.length - maximumBreadth - 1;
              res2 += `${join2}"... ${getItemCount(removedKeys)} not stringified"`;
            }
            res2 += `
${originalIndentation}`;
            stack.pop();
            return `[${res2}]`;
          }
          let keys = Object.keys(value2);
          const keyLength = keys.length;
          if (keyLength === 0) {
            return "{}";
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Object]"';
          }
          indentation += spacer;
          const join = `,
${indentation}`;
          let res = "";
          let separator = "";
          let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
          if (isTypedArrayWithEntries(value2)) {
            res += stringifyTypedArray(value2, join, maximumBreadth);
            keys = keys.slice(value2.length);
            maximumPropertiesToStringify -= value2.length;
            separator = join;
          }
          if (deterministic) {
            keys = sort(keys, comparator);
          }
          stack.push(value2);
          for (let i = 0;i < maximumPropertiesToStringify; i++) {
            const key2 = keys[i];
            const tmp = stringifyIndent(key2, value2[key2], stack, spacer, indentation);
            if (tmp !== undefined) {
              res += `${separator}${strEscape(key2)}: ${tmp}`;
              separator = join;
            }
          }
          if (keyLength > maximumBreadth) {
            const removedKeys = keyLength - maximumBreadth;
            res += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`;
            separator = join;
          }
          if (separator !== "") {
            res = `
${indentation}${res}
${originalIndentation}`;
          }
          stack.pop();
          return `{${res}}`;
        }
        case "number":
          return isFinite(value2) ? String(value2) : fail ? fail(value2) : "null";
        case "boolean":
          return value2 === true ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (bigint3) {
            return String(value2);
          }
        default:
          return fail ? fail(value2) : undefined;
      }
    }
    function stringifySimple(key, value2, stack) {
      switch (typeof value2) {
        case "string":
          return strEscape(value2);
        case "object": {
          if (value2 === null) {
            return "null";
          }
          if (typeof value2.toJSON === "function") {
            value2 = value2.toJSON(key);
            if (typeof value2 !== "object") {
              return stringifySimple(key, value2, stack);
            }
            if (value2 === null) {
              return "null";
            }
          }
          if (stack.indexOf(value2) !== -1) {
            return circularValue;
          }
          let res = "";
          const hasLength = value2.length !== undefined;
          if (hasLength && Array.isArray(value2)) {
            if (value2.length === 0) {
              return "[]";
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Array]"';
            }
            stack.push(value2);
            const maximumValuesToStringify = Math.min(value2.length, maximumBreadth);
            let i = 0;
            for (;i < maximumValuesToStringify - 1; i++) {
              const tmp2 = stringifySimple(String(i), value2[i], stack);
              res += tmp2 !== undefined ? tmp2 : "null";
              res += ",";
            }
            const tmp = stringifySimple(String(i), value2[i], stack);
            res += tmp !== undefined ? tmp : "null";
            if (value2.length - 1 > maximumBreadth) {
              const removedKeys = value2.length - maximumBreadth - 1;
              res += `,"... ${getItemCount(removedKeys)} not stringified"`;
            }
            stack.pop();
            return `[${res}]`;
          }
          let keys = Object.keys(value2);
          const keyLength = keys.length;
          if (keyLength === 0) {
            return "{}";
          }
          if (maximumDepth < stack.length + 1) {
            return '"[Object]"';
          }
          let separator = "";
          let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
          if (hasLength && isTypedArrayWithEntries(value2)) {
            res += stringifyTypedArray(value2, ",", maximumBreadth);
            keys = keys.slice(value2.length);
            maximumPropertiesToStringify -= value2.length;
            separator = ",";
          }
          if (deterministic) {
            keys = sort(keys, comparator);
          }
          stack.push(value2);
          for (let i = 0;i < maximumPropertiesToStringify; i++) {
            const key2 = keys[i];
            const tmp = stringifySimple(key2, value2[key2], stack);
            if (tmp !== undefined) {
              res += `${separator}${strEscape(key2)}:${tmp}`;
              separator = ",";
            }
          }
          if (keyLength > maximumBreadth) {
            const removedKeys = keyLength - maximumBreadth;
            res += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`;
          }
          stack.pop();
          return `{${res}}`;
        }
        case "number":
          return isFinite(value2) ? String(value2) : fail ? fail(value2) : "null";
        case "boolean":
          return value2 === true ? "true" : "false";
        case "undefined":
          return;
        case "bigint":
          if (bigint3) {
            return String(value2);
          }
        default:
          return fail ? fail(value2) : undefined;
      }
    }
    function stringify2(value2, replacer, space) {
      if (arguments.length > 1) {
        let spacer = "";
        if (typeof space === "number") {
          spacer = " ".repeat(Math.min(space, 10));
        } else if (typeof space === "string") {
          spacer = space.slice(0, 10);
        }
        if (replacer != null) {
          if (typeof replacer === "function") {
            return stringifyFnReplacer("", { "": value2 }, [], replacer, spacer, "");
          }
          if (Array.isArray(replacer)) {
            return stringifyArrayReplacer("", value2, [], getUniqueReplacerSet(replacer), spacer, "");
          }
        }
        if (spacer.length !== 0) {
          return stringifyIndent("", value2, [], spacer, "");
        }
      }
      return stringifySimple("", value2, []);
    }
    return stringify2;
  }
});

// node_modules/logform/json.js
var require_json = __commonJS((exports, module) => {
  var format = require_format();
  var { MESSAGE } = require_triple_beam();
  var stringify = require_safe_stable_stringify();
  function replacer(key, value2) {
    if (typeof value2 === "bigint")
      return value2.toString();
    return value2;
  }
  module.exports = format((info, opts) => {
    const jsonStringify = stringify.configure(opts);
    info[MESSAGE] = jsonStringify(info, opts.replacer || replacer, opts.space);
    return info;
  });
});

// node_modules/logform/label.js
var require_label = __commonJS((exports, module) => {
  var format = require_format();
  module.exports = format((info, opts) => {
    if (opts.message) {
      info.message = `[${opts.label}] ${info.message}`;
      return info;
    }
    info.label = opts.label;
    return info;
  });
});

// node_modules/logform/logstash.js
var require_logstash = __commonJS((exports, module) => {
  var format = require_format();
  var { MESSAGE } = require_triple_beam();
  var jsonStringify = require_safe_stable_stringify();
  module.exports = format((info) => {
    const logstash = {};
    if (info.message) {
      logstash["@message"] = info.message;
      delete info.message;
    }
    if (info.timestamp) {
      logstash["@timestamp"] = info.timestamp;
      delete info.timestamp;
    }
    logstash["@fields"] = info;
    info[MESSAGE] = jsonStringify(logstash);
    return info;
  });
});

// node_modules/logform/metadata.js
var require_metadata = __commonJS((exports, module) => {
  var format = require_format();
  function fillExcept(info, fillExceptKeys, metadataKey) {
    const savedKeys = fillExceptKeys.reduce((acc, key) => {
      acc[key] = info[key];
      delete info[key];
      return acc;
    }, {});
    const metadata = Object.keys(info).reduce((acc, key) => {
      acc[key] = info[key];
      delete info[key];
      return acc;
    }, {});
    Object.assign(info, savedKeys, {
      [metadataKey]: metadata
    });
    return info;
  }
  function fillWith(info, fillWithKeys, metadataKey) {
    info[metadataKey] = fillWithKeys.reduce((acc, key) => {
      acc[key] = info[key];
      delete info[key];
      return acc;
    }, {});
    return info;
  }
  module.exports = format((info, opts = {}) => {
    let metadataKey = "metadata";
    if (opts.key) {
      metadataKey = opts.key;
    }
    let fillExceptKeys = [];
    if (!opts.fillExcept && !opts.fillWith) {
      fillExceptKeys.push("level");
      fillExceptKeys.push("message");
    }
    if (opts.fillExcept) {
      fillExceptKeys = opts.fillExcept;
    }
    if (fillExceptKeys.length > 0) {
      return fillExcept(info, fillExceptKeys, metadataKey);
    }
    if (opts.fillWith) {
      return fillWith(info, opts.fillWith, metadataKey);
    }
    return info;
  });
});

// node_modules/ms/index.js
var require_ms = __commonJS((exports, module) => {
  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  module.exports = function(val, options) {
    options = options || {};
    var type3 = typeof val;
    if (type3 === "string" && val.length > 0) {
      return parse2(val);
    } else if (type3 === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
  function parse2(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type3 = (match[2] || "ms").toLowerCase();
    switch (type3) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return;
    }
  }
  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + "d";
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + "s";
    }
    return ms + "ms";
  }
  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, "day");
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, "hour");
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, "second");
    }
    return ms + " ms";
  }
  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
  }
});

// node_modules/logform/ms.js
var require_ms2 = __commonJS((exports, module) => {
  var format = require_format();
  var ms = require_ms();
  module.exports = format((info) => {
    const curr = +new Date;
    exports.diff = curr - (exports.prevTime || curr);
    exports.prevTime = curr;
    info.ms = `+${ms(exports.diff)}`;
    return info;
  });
});

// node_modules/logform/pretty-print.js
var require_pretty_print = __commonJS((exports, module) => {
  var inspect = import.meta.require("util").inspect;
  var format = require_format();
  var { LEVEL, MESSAGE, SPLAT } = require_triple_beam();
  module.exports = format((info, opts = {}) => {
    const stripped = Object.assign({}, info);
    delete stripped[LEVEL];
    delete stripped[MESSAGE];
    delete stripped[SPLAT];
    info[MESSAGE] = inspect(stripped, false, opts.depth || null, opts.colorize);
    return info;
  });
});

// node_modules/logform/printf.js
var require_printf = __commonJS((exports, module) => {
  var { MESSAGE } = require_triple_beam();

  class Printf {
    constructor(templateFn) {
      this.template = templateFn;
    }
    transform(info) {
      info[MESSAGE] = this.template(info);
      return info;
    }
  }
  module.exports = (opts) => new Printf(opts);
  module.exports.Printf = module.exports.Format = Printf;
});

// node_modules/logform/simple.js
var require_simple = __commonJS((exports, module) => {
  var format = require_format();
  var { MESSAGE } = require_triple_beam();
  var jsonStringify = require_safe_stable_stringify();
  module.exports = format((info) => {
    const stringifiedRest = jsonStringify(Object.assign({}, info, {
      level: undefined,
      message: undefined,
      splat: undefined
    }));
    const padding = info.padding && info.padding[info.level] || "";
    if (stringifiedRest !== "{}") {
      info[MESSAGE] = `${info.level}:${padding} ${info.message} ${stringifiedRest}`;
    } else {
      info[MESSAGE] = `${info.level}:${padding} ${info.message}`;
    }
    return info;
  });
});

// node_modules/logform/splat.js
var require_splat = __commonJS((exports, module) => {
  var util = import.meta.require("util");
  var { SPLAT } = require_triple_beam();
  var formatRegExp = /%[scdjifoO%]/g;
  var escapedPercent = /%%/g;

  class Splatter {
    constructor(opts) {
      this.options = opts;
    }
    _splat(info, tokens) {
      const msg = info.message;
      const splat = info[SPLAT] || info.splat || [];
      const percents = msg.match(escapedPercent);
      const escapes = percents && percents.length || 0;
      const expectedSplat = tokens.length - escapes;
      const extraSplat = expectedSplat - splat.length;
      const metas = extraSplat < 0 ? splat.splice(extraSplat, -1 * extraSplat) : [];
      const metalen = metas.length;
      if (metalen) {
        for (let i = 0;i < metalen; i++) {
          Object.assign(info, metas[i]);
        }
      }
      info.message = util.format(msg, ...splat);
      return info;
    }
    transform(info) {
      const msg = info.message;
      const splat = info[SPLAT] || info.splat;
      if (!splat || !splat.length) {
        return info;
      }
      const tokens = msg && msg.match && msg.match(formatRegExp);
      if (!tokens && (splat || splat.length)) {
        const metas = splat.length > 1 ? splat.splice(0) : splat;
        const metalen = metas.length;
        if (metalen) {
          for (let i = 0;i < metalen; i++) {
            Object.assign(info, metas[i]);
          }
        }
        return info;
      }
      if (tokens) {
        return this._splat(info, tokens);
      }
      return info;
    }
  }
  module.exports = (opts) => new Splatter(opts);
});

// node_modules/fecha/lib/fecha.umd.js
var require_fecha_umd = __commonJS((exports, module) => {
  (function(global2, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global2.fecha = {});
  })(exports, function(exports2) {
    var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|Z|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
    var twoDigitsOptional = "\\d\\d?";
    var twoDigits = "\\d\\d";
    var threeDigits = "\\d{3}";
    var fourDigits = "\\d{4}";
    var word = "[^\\s]+";
    var literal3 = /\[([^]*?)\]/gm;
    function shorten(arr, sLen) {
      var newArr = [];
      for (var i = 0, len = arr.length;i < len; i++) {
        newArr.push(arr[i].substr(0, sLen));
      }
      return newArr;
    }
    var monthUpdate = function(arrName) {
      return function(v, i18n) {
        var lowerCaseArr = i18n[arrName].map(function(v2) {
          return v2.toLowerCase();
        });
        var index = lowerCaseArr.indexOf(v.toLowerCase());
        if (index > -1) {
          return index;
        }
        return null;
      };
    };
    function assign(origObj) {
      var args = [];
      for (var _i = 1;_i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
      }
      for (var _a = 0, args_1 = args;_a < args_1.length; _a++) {
        var obj = args_1[_a];
        for (var key in obj) {
          origObj[key] = obj[key];
        }
      }
      return origObj;
    }
    var dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var monthNamesShort = shorten(monthNames, 3);
    var dayNamesShort = shorten(dayNames, 3);
    var defaultI18n = {
      dayNamesShort,
      dayNames,
      monthNamesShort,
      monthNames,
      amPm: ["am", "pm"],
      DoFn: function(dayOfMonth) {
        return dayOfMonth + ["th", "st", "nd", "rd"][dayOfMonth % 10 > 3 ? 0 : (dayOfMonth - dayOfMonth % 10 !== 10 ? 1 : 0) * dayOfMonth % 10];
      }
    };
    var globalI18n = assign({}, defaultI18n);
    var setGlobalDateI18n = function(i18n) {
      return globalI18n = assign(globalI18n, i18n);
    };
    var regexEscape = function(str) {
      return str.replace(/[|\\{()[^$+*?.-]/g, "\\$&");
    };
    var pad = function(val, len) {
      if (len === undefined) {
        len = 2;
      }
      val = String(val);
      while (val.length < len) {
        val = "0" + val;
      }
      return val;
    };
    var formatFlags = {
      D: function(dateObj) {
        return String(dateObj.getDate());
      },
      DD: function(dateObj) {
        return pad(dateObj.getDate());
      },
      Do: function(dateObj, i18n) {
        return i18n.DoFn(dateObj.getDate());
      },
      d: function(dateObj) {
        return String(dateObj.getDay());
      },
      dd: function(dateObj) {
        return pad(dateObj.getDay());
      },
      ddd: function(dateObj, i18n) {
        return i18n.dayNamesShort[dateObj.getDay()];
      },
      dddd: function(dateObj, i18n) {
        return i18n.dayNames[dateObj.getDay()];
      },
      M: function(dateObj) {
        return String(dateObj.getMonth() + 1);
      },
      MM: function(dateObj) {
        return pad(dateObj.getMonth() + 1);
      },
      MMM: function(dateObj, i18n) {
        return i18n.monthNamesShort[dateObj.getMonth()];
      },
      MMMM: function(dateObj, i18n) {
        return i18n.monthNames[dateObj.getMonth()];
      },
      YY: function(dateObj) {
        return pad(String(dateObj.getFullYear()), 4).substr(2);
      },
      YYYY: function(dateObj) {
        return pad(dateObj.getFullYear(), 4);
      },
      h: function(dateObj) {
        return String(dateObj.getHours() % 12 || 12);
      },
      hh: function(dateObj) {
        return pad(dateObj.getHours() % 12 || 12);
      },
      H: function(dateObj) {
        return String(dateObj.getHours());
      },
      HH: function(dateObj) {
        return pad(dateObj.getHours());
      },
      m: function(dateObj) {
        return String(dateObj.getMinutes());
      },
      mm: function(dateObj) {
        return pad(dateObj.getMinutes());
      },
      s: function(dateObj) {
        return String(dateObj.getSeconds());
      },
      ss: function(dateObj) {
        return pad(dateObj.getSeconds());
      },
      S: function(dateObj) {
        return String(Math.round(dateObj.getMilliseconds() / 100));
      },
      SS: function(dateObj) {
        return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
      },
      SSS: function(dateObj) {
        return pad(dateObj.getMilliseconds(), 3);
      },
      a: function(dateObj, i18n) {
        return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
      },
      A: function(dateObj, i18n) {
        return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
      },
      ZZ: function(dateObj) {
        var offset = dateObj.getTimezoneOffset();
        return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4);
      },
      Z: function(dateObj) {
        var offset = dateObj.getTimezoneOffset();
        return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2) + ":" + pad(Math.abs(offset) % 60, 2);
      }
    };
    var monthParse = function(v) {
      return +v - 1;
    };
    var emptyDigits = [null, twoDigitsOptional];
    var emptyWord = [null, word];
    var amPm = [
      "isPm",
      word,
      function(v, i18n) {
        var val = v.toLowerCase();
        if (val === i18n.amPm[0]) {
          return 0;
        } else if (val === i18n.amPm[1]) {
          return 1;
        }
        return null;
      }
    ];
    var timezoneOffset = [
      "timezoneOffset",
      "[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",
      function(v) {
        var parts = (v + "").match(/([+-]|\d\d)/gi);
        if (parts) {
          var minutes = +parts[1] * 60 + parseInt(parts[2], 10);
          return parts[0] === "+" ? minutes : -minutes;
        }
        return 0;
      }
    ];
    var parseFlags = {
      D: ["day", twoDigitsOptional],
      DD: ["day", twoDigits],
      Do: ["day", twoDigitsOptional + word, function(v) {
        return parseInt(v, 10);
      }],
      M: ["month", twoDigitsOptional, monthParse],
      MM: ["month", twoDigits, monthParse],
      YY: [
        "year",
        twoDigits,
        function(v) {
          var now = new Date;
          var cent = +("" + now.getFullYear()).substr(0, 2);
          return +("" + (+v > 68 ? cent - 1 : cent) + v);
        }
      ],
      h: ["hour", twoDigitsOptional, undefined, "isPm"],
      hh: ["hour", twoDigits, undefined, "isPm"],
      H: ["hour", twoDigitsOptional],
      HH: ["hour", twoDigits],
      m: ["minute", twoDigitsOptional],
      mm: ["minute", twoDigits],
      s: ["second", twoDigitsOptional],
      ss: ["second", twoDigits],
      YYYY: ["year", fourDigits],
      S: ["millisecond", "\\d", function(v) {
        return +v * 100;
      }],
      SS: ["millisecond", twoDigits, function(v) {
        return +v * 10;
      }],
      SSS: ["millisecond", threeDigits],
      d: emptyDigits,
      dd: emptyDigits,
      ddd: emptyWord,
      dddd: emptyWord,
      MMM: ["month", word, monthUpdate("monthNamesShort")],
      MMMM: ["month", word, monthUpdate("monthNames")],
      a: amPm,
      A: amPm,
      ZZ: timezoneOffset,
      Z: timezoneOffset
    };
    var globalMasks = {
      default: "ddd MMM DD YYYY HH:mm:ss",
      shortDate: "M/D/YY",
      mediumDate: "MMM D, YYYY",
      longDate: "MMMM D, YYYY",
      fullDate: "dddd, MMMM D, YYYY",
      isoDate: "YYYY-MM-DD",
      isoDateTime: "YYYY-MM-DDTHH:mm:ssZ",
      shortTime: "HH:mm",
      mediumTime: "HH:mm:ss",
      longTime: "HH:mm:ss.SSS"
    };
    var setGlobalDateMasks = function(masks) {
      return assign(globalMasks, masks);
    };
    var format = function(dateObj, mask, i18n) {
      if (mask === undefined) {
        mask = globalMasks["default"];
      }
      if (i18n === undefined) {
        i18n = {};
      }
      if (typeof dateObj === "number") {
        dateObj = new Date(dateObj);
      }
      if (Object.prototype.toString.call(dateObj) !== "[object Date]" || isNaN(dateObj.getTime())) {
        throw new Error("Invalid Date pass to format");
      }
      mask = globalMasks[mask] || mask;
      var literals = [];
      mask = mask.replace(literal3, function($0, $1) {
        literals.push($1);
        return "@@@";
      });
      var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
      mask = mask.replace(token, function($0) {
        return formatFlags[$0](dateObj, combinedI18nSettings);
      });
      return mask.replace(/@@@/g, function() {
        return literals.shift();
      });
    };
    function parse2(dateStr, format2, i18n) {
      if (i18n === undefined) {
        i18n = {};
      }
      if (typeof format2 !== "string") {
        throw new Error("Invalid format in fecha parse");
      }
      format2 = globalMasks[format2] || format2;
      if (dateStr.length > 1000) {
        return null;
      }
      var today = new Date;
      var dateInfo = {
        year: today.getFullYear(),
        month: 0,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        isPm: null,
        timezoneOffset: null
      };
      var parseInfo = [];
      var literals = [];
      var newFormat = format2.replace(literal3, function($0, $1) {
        literals.push(regexEscape($1));
        return "@@@";
      });
      var specifiedFields = {};
      var requiredFields = {};
      newFormat = regexEscape(newFormat).replace(token, function($0) {
        var info = parseFlags[$0];
        var field2 = info[0], regex2 = info[1], requiredField = info[3];
        if (specifiedFields[field2]) {
          throw new Error("Invalid format. " + field2 + " specified twice in format");
        }
        specifiedFields[field2] = true;
        if (requiredField) {
          requiredFields[requiredField] = true;
        }
        parseInfo.push(info);
        return "(" + regex2 + ")";
      });
      Object.keys(requiredFields).forEach(function(field2) {
        if (!specifiedFields[field2]) {
          throw new Error("Invalid format. " + field2 + " is required in specified format");
        }
      });
      newFormat = newFormat.replace(/@@@/g, function() {
        return literals.shift();
      });
      var matches = dateStr.match(new RegExp(newFormat, "i"));
      if (!matches) {
        return null;
      }
      var combinedI18nSettings = assign(assign({}, globalI18n), i18n);
      for (var i = 1;i < matches.length; i++) {
        var _a = parseInfo[i - 1], field = _a[0], parser = _a[2];
        var value2 = parser ? parser(matches[i], combinedI18nSettings) : +matches[i];
        if (value2 == null) {
          return null;
        }
        dateInfo[field] = value2;
      }
      if (dateInfo.isPm === 1 && dateInfo.hour != null && +dateInfo.hour !== 12) {
        dateInfo.hour = +dateInfo.hour + 12;
      } else if (dateInfo.isPm === 0 && +dateInfo.hour === 12) {
        dateInfo.hour = 0;
      }
      var dateTZ;
      if (dateInfo.timezoneOffset == null) {
        dateTZ = new Date(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute, dateInfo.second, dateInfo.millisecond);
        var validateFields = [
          ["month", "getMonth"],
          ["day", "getDate"],
          ["hour", "getHours"],
          ["minute", "getMinutes"],
          ["second", "getSeconds"]
        ];
        for (var i = 0, len = validateFields.length;i < len; i++) {
          if (specifiedFields[validateFields[i][0]] && dateInfo[validateFields[i][0]] !== dateTZ[validateFields[i][1]]()) {
            return null;
          }
        }
      } else {
        dateTZ = new Date(Date.UTC(dateInfo.year, dateInfo.month, dateInfo.day, dateInfo.hour, dateInfo.minute - dateInfo.timezoneOffset, dateInfo.second, dateInfo.millisecond));
        if (dateInfo.month > 11 || dateInfo.month < 0 || dateInfo.day > 31 || dateInfo.day < 1 || dateInfo.hour > 23 || dateInfo.hour < 0 || dateInfo.minute > 59 || dateInfo.minute < 0 || dateInfo.second > 59 || dateInfo.second < 0) {
          return null;
        }
      }
      return dateTZ;
    }
    var fecha = {
      format,
      parse: parse2,
      defaultI18n,
      setGlobalDateI18n,
      setGlobalDateMasks
    };
    exports2.assign = assign;
    exports2.default = fecha;
    exports2.format = format;
    exports2.parse = parse2;
    exports2.defaultI18n = defaultI18n;
    exports2.setGlobalDateI18n = setGlobalDateI18n;
    exports2.setGlobalDateMasks = setGlobalDateMasks;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
});

// node_modules/logform/timestamp.js
var require_timestamp = __commonJS((exports, module) => {
  var fecha = require_fecha_umd();
  var format = require_format();
  module.exports = format((info, opts = {}) => {
    if (opts.format) {
      info.timestamp = typeof opts.format === "function" ? opts.format() : fecha.format(new Date, opts.format);
    }
    if (!info.timestamp) {
      info.timestamp = new Date().toISOString();
    }
    if (opts.alias) {
      info[opts.alias] = info.timestamp;
    }
    return info;
  });
});

// node_modules/logform/uncolorize.js
var require_uncolorize = __commonJS((exports, module) => {
  var colors = require_safe();
  var format = require_format();
  var { MESSAGE } = require_triple_beam();
  module.exports = format((info, opts) => {
    if (opts.level !== false) {
      info.level = colors.strip(info.level);
    }
    if (opts.message !== false) {
      info.message = colors.strip(String(info.message));
    }
    if (opts.raw !== false && info[MESSAGE]) {
      info[MESSAGE] = colors.strip(String(info[MESSAGE]));
    }
    return info;
  });
});

// node_modules/logform/index.js
var require_logform = __commonJS((exports) => {
  var format = exports.format = require_format();
  exports.levels = require_levels();
  function exposeFormat(name, requireFormat) {
    Object.defineProperty(format, name, {
      get() {
        return requireFormat();
      },
      configurable: true
    });
  }
  exposeFormat("align", function() {
    return require_align();
  });
  exposeFormat("errors", function() {
    return require_errors();
  });
  exposeFormat("cli", function() {
    return require_cli2();
  });
  exposeFormat("combine", function() {
    return require_combine();
  });
  exposeFormat("colorize", function() {
    return require_colorize();
  });
  exposeFormat("json", function() {
    return require_json();
  });
  exposeFormat("label", function() {
    return require_label();
  });
  exposeFormat("logstash", function() {
    return require_logstash();
  });
  exposeFormat("metadata", function() {
    return require_metadata();
  });
  exposeFormat("ms", function() {
    return require_ms2();
  });
  exposeFormat("padLevels", function() {
    return require_pad_levels();
  });
  exposeFormat("prettyPrint", function() {
    return require_pretty_print();
  });
  exposeFormat("printf", function() {
    return require_printf();
  });
  exposeFormat("simple", function() {
    return require_simple();
  });
  exposeFormat("splat", function() {
    return require_splat();
  });
  exposeFormat("timestamp", function() {
    return require_timestamp();
  });
  exposeFormat("uncolorize", function() {
    return require_uncolorize();
  });
});

// node_modules/winston/lib/winston/common.js
var require_common = __commonJS((exports) => {
  var { format } = import.meta.require("util");
  exports.warn = {
    deprecated(prop) {
      return () => {
        throw new Error(format("{ %s } was removed in winston@3.0.0.", prop));
      };
    },
    useFormat(prop) {
      return () => {
        throw new Error([
          format("{ %s } was removed in winston@3.0.0.", prop),
          "Use a custom winston.format = winston.format(function) instead."
        ].join(`
`));
      };
    },
    forFunctions(obj, type3, props) {
      props.forEach((prop) => {
        obj[prop] = exports.warn[type3](prop);
      });
    },
    forProperties(obj, type3, props) {
      props.forEach((prop) => {
        const notice = exports.warn[type3](prop);
        Object.defineProperty(obj, prop, {
          get: notice,
          set: notice
        });
      });
    }
  };
});

// node_modules/winston/package.json
var require_package = __commonJS((exports, module) => {
  module.exports = {
    name: "winston",
    description: "A logger for just about everything.",
    version: "3.17.0",
    author: "Charlie Robbins <charlie.robbins@gmail.com>",
    maintainers: [
      "David Hyde <dabh@alumni.stanford.edu>"
    ],
    repository: {
      type: "git",
      url: "https://github.com/winstonjs/winston.git"
    },
    keywords: [
      "winston",
      "logger",
      "logging",
      "logs",
      "sysadmin",
      "bunyan",
      "pino",
      "loglevel",
      "tools",
      "json",
      "stream"
    ],
    dependencies: {
      "@dabh/diagnostics": "^2.0.2",
      "@colors/colors": "^1.6.0",
      async: "^3.2.3",
      "is-stream": "^2.0.0",
      logform: "^2.7.0",
      "one-time": "^1.0.0",
      "readable-stream": "^3.4.0",
      "safe-stable-stringify": "^2.3.1",
      "stack-trace": "0.0.x",
      "triple-beam": "^1.3.0",
      "winston-transport": "^4.9.0"
    },
    devDependencies: {
      "@babel/cli": "^7.23.9",
      "@babel/core": "^7.24.0",
      "@babel/preset-env": "^7.24.0",
      "@dabh/eslint-config-populist": "^4.4.0",
      "@types/node": "^20.11.24",
      "abstract-winston-transport": "^0.5.1",
      assume: "^2.2.0",
      "cross-spawn-async": "^2.2.5",
      eslint: "^8.57.0",
      hock: "^1.4.1",
      mocha: "^10.3.0",
      nyc: "^17.1.0",
      rimraf: "5.0.1",
      split2: "^4.1.0",
      "std-mocks": "^2.0.0",
      through2: "^4.0.2",
      "winston-compat": "^0.1.5"
    },
    main: "./lib/winston.js",
    browser: "./dist/winston",
    types: "./index.d.ts",
    scripts: {
      lint: "eslint lib/*.js lib/winston/*.js lib/winston/**/*.js --resolve-plugins-relative-to ./node_modules/@dabh/eslint-config-populist",
      test: "rimraf test/fixtures/logs/* && mocha",
      "test:coverage": "nyc npm run test:unit",
      "test:unit": "mocha test/unit",
      "test:integration": "mocha test/integration",
      build: "rimraf dist && babel lib -d dist",
      prepublishOnly: "npm run build"
    },
    engines: {
      node: ">= 12.0.0"
    },
    license: "MIT"
  };
});

// node_modules/util-deprecate/node.js
var require_node = __commonJS((exports, module) => {
  module.exports = import.meta.require("util").deprecate;
});

// node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS((exports, module) => {
  function destroy(err, cb) {
    var _this = this;
    var readableDestroyed = this._readableState && this._readableState.destroyed;
    var writableDestroyed = this._writableState && this._writableState.destroyed;
    if (readableDestroyed || writableDestroyed) {
      if (cb) {
        cb(err);
      } else if (err) {
        if (!this._writableState) {
          process.nextTick(emitErrorNT, this, err);
        } else if (!this._writableState.errorEmitted) {
          this._writableState.errorEmitted = true;
          process.nextTick(emitErrorNT, this, err);
        }
      }
      return this;
    }
    if (this._readableState) {
      this._readableState.destroyed = true;
    }
    if (this._writableState) {
      this._writableState.destroyed = true;
    }
    this._destroy(err || null, function(err2) {
      if (!cb && err2) {
        if (!_this._writableState) {
          process.nextTick(emitErrorAndCloseNT, _this, err2);
        } else if (!_this._writableState.errorEmitted) {
          _this._writableState.errorEmitted = true;
          process.nextTick(emitErrorAndCloseNT, _this, err2);
        } else {
          process.nextTick(emitCloseNT, _this);
        }
      } else if (cb) {
        process.nextTick(emitCloseNT, _this);
        cb(err2);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    });
    return this;
  }
  function emitErrorAndCloseNT(self2, err) {
    emitErrorNT(self2, err);
    emitCloseNT(self2);
  }
  function emitCloseNT(self2) {
    if (self2._writableState && !self2._writableState.emitClose)
      return;
    if (self2._readableState && !self2._readableState.emitClose)
      return;
    self2.emit("close");
  }
  function undestroy() {
    if (this._readableState) {
      this._readableState.destroyed = false;
      this._readableState.reading = false;
      this._readableState.ended = false;
      this._readableState.endEmitted = false;
    }
    if (this._writableState) {
      this._writableState.destroyed = false;
      this._writableState.ended = false;
      this._writableState.ending = false;
      this._writableState.finalCalled = false;
      this._writableState.prefinished = false;
      this._writableState.finished = false;
      this._writableState.errorEmitted = false;
    }
  }
  function emitErrorNT(self2, err) {
    self2.emit("error", err);
  }
  function errorOrDestroy(stream, err) {
    var rState = stream._readableState;
    var wState = stream._writableState;
    if (rState && rState.autoDestroy || wState && wState.autoDestroy)
      stream.destroy(err);
    else
      stream.emit("error", err);
  }
  module.exports = {
    destroy,
    undestroy,
    errorOrDestroy
  };
});

// node_modules/readable-stream/errors.js
var require_errors2 = __commonJS((exports, module) => {
  var codes = {};
  function createErrorType(code, message, Base) {
    if (!Base) {
      Base = Error;
    }
    function getMessage(arg1, arg2, arg3) {
      if (typeof message === "string") {
        return message;
      } else {
        return message(arg1, arg2, arg3);
      }
    }

    class NodeError extends Base {
      constructor(arg1, arg2, arg3) {
        super(getMessage(arg1, arg2, arg3));
      }
    }
    NodeError.prototype.name = Base.name;
    NodeError.prototype.code = code;
    codes[code] = NodeError;
  }
  function oneOf(expected, thing) {
    if (Array.isArray(expected)) {
      const len = expected.length;
      expected = expected.map((i) => String(i));
      if (len > 2) {
        return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
      } else if (len === 2) {
        return `one of ${thing} ${expected[0]} or ${expected[1]}`;
      } else {
        return `of ${thing} ${expected[0]}`;
      }
    } else {
      return `of ${thing} ${String(expected)}`;
    }
  }
  function startsWith(str, search, pos) {
    return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
  }
  function endsWith(str, search, this_len) {
    if (this_len === undefined || this_len > str.length) {
      this_len = str.length;
    }
    return str.substring(this_len - search.length, this_len) === search;
  }
  function includes(str, search, start) {
    if (typeof start !== "number") {
      start = 0;
    }
    if (start + search.length > str.length) {
      return false;
    } else {
      return str.indexOf(search, start) !== -1;
    }
  }
  createErrorType("ERR_INVALID_OPT_VALUE", function(name, value2) {
    return 'The value "' + value2 + '" is invalid for option "' + name + '"';
  }, TypeError);
  createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
    let determiner;
    if (typeof expected === "string" && startsWith(expected, "not ")) {
      determiner = "must not be";
      expected = expected.replace(/^not /, "");
    } else {
      determiner = "must be";
    }
    let msg;
    if (endsWith(name, " argument")) {
      msg = `The ${name} ${determiner} ${oneOf(expected, "type")}`;
    } else {
      const type3 = includes(name, ".") ? "property" : "argument";
      msg = `The "${name}" ${type3} ${determiner} ${oneOf(expected, "type")}`;
    }
    msg += `. Received type ${typeof actual}`;
    return msg;
  }, TypeError);
  createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
  createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
    return "The " + name + " method is not implemented";
  });
  createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
  createErrorType("ERR_STREAM_DESTROYED", function(name) {
    return "Cannot call " + name + " after a stream was destroyed";
  });
  createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
  createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
  createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
  createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
  createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
    return "Unknown encoding: " + arg;
  }, TypeError);
  createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
  exports.codes = codes;
});

// node_modules/readable-stream/lib/internal/streams/state.js
var require_state = __commonJS((exports, module) => {
  var ERR_INVALID_OPT_VALUE = require_errors2().codes.ERR_INVALID_OPT_VALUE;
  function highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
  }
  function getHighWaterMark(state, options, duplexKey, isDuplex) {
    var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
      if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
        var name = isDuplex ? duplexKey : "highWaterMark";
        throw new ERR_INVALID_OPT_VALUE(name, hwm);
      }
      return Math.floor(hwm);
    }
    return state.objectMode ? 16 : 16 * 1024;
  }
  module.exports = {
    getHighWaterMark
  };
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS((exports, module) => {
  if (typeof Object.create === "function") {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor;
        ctor.prototype.constructor = ctor;
      }
    };
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS((exports, module) => {
  try {
    util = import.meta.require("util");
    if (typeof util.inherits !== "function")
      throw "";
    module.exports = util.inherits;
  } catch (e) {
    module.exports = require_inherits_browser();
  }
  var util;
});

// node_modules/readable-stream/lib/internal/streams/buffer_list.js
var require_buffer_list = __commonJS((exports, module) => {
  function ownKeys(object3, enumerableOnly) {
    var keys = Object.keys(object3);
    if (Object.getOwnPropertySymbols) {
      var symbols3 = Object.getOwnPropertySymbols(object3);
      enumerableOnly && (symbols3 = symbols3.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object3, sym).enumerable;
      })), keys.push.apply(keys, symbols3);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1;i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value2) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value2, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value2;
    }
    return obj;
  }
  function _classCallCheck(instance, Constructor2) {
    if (!(instance instanceof Constructor2)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0;i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor2, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor2.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor2, staticProps);
    Object.defineProperty(Constructor2, "prototype", { writable: false });
    return Constructor2;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var _require = import.meta.require("buffer");
  var Buffer2 = _require.Buffer;
  var _require2 = import.meta.require("util");
  var inspect = _require2.inspect;
  var custom = inspect && inspect.custom || "inspect";
  function copyBuffer(src, target, offset) {
    Buffer2.prototype.copy.call(src, target, offset);
  }
  module.exports = /* @__PURE__ */ function() {
    function BufferList() {
      _classCallCheck(this, BufferList);
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    _createClass(BufferList, [{
      key: "push",
      value: function push(v) {
        var entry = {
          data: v,
          next: null
        };
        if (this.length > 0)
          this.tail.next = entry;
        else
          this.head = entry;
        this.tail = entry;
        ++this.length;
      }
    }, {
      key: "unshift",
      value: function unshift(v) {
        var entry = {
          data: v,
          next: this.head
        };
        if (this.length === 0)
          this.tail = entry;
        this.head = entry;
        ++this.length;
      }
    }, {
      key: "shift",
      value: function shift() {
        if (this.length === 0)
          return;
        var ret = this.head.data;
        if (this.length === 1)
          this.head = this.tail = null;
        else
          this.head = this.head.next;
        --this.length;
        return ret;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.head = this.tail = null;
        this.length = 0;
      }
    }, {
      key: "join",
      value: function join(s) {
        if (this.length === 0)
          return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next)
          ret += s + p.data;
        return ret;
      }
    }, {
      key: "concat",
      value: function concat(n) {
        if (this.length === 0)
          return Buffer2.alloc(0);
        var ret = Buffer2.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      }
    }, {
      key: "consume",
      value: function consume(n, hasStrings) {
        var ret;
        if (n < this.head.data.length) {
          ret = this.head.data.slice(0, n);
          this.head.data = this.head.data.slice(n);
        } else if (n === this.head.data.length) {
          ret = this.shift();
        } else {
          ret = hasStrings ? this._getString(n) : this._getBuffer(n);
        }
        return ret;
      }
    }, {
      key: "first",
      value: function first() {
        return this.head.data;
      }
    }, {
      key: "_getString",
      value: function _getString(n) {
        var p = this.head;
        var c = 1;
        var ret = p.data;
        n -= ret.length;
        while (p = p.next) {
          var str = p.data;
          var nb = n > str.length ? str.length : n;
          if (nb === str.length)
            ret += str;
          else
            ret += str.slice(0, n);
          n -= nb;
          if (n === 0) {
            if (nb === str.length) {
              ++c;
              if (p.next)
                this.head = p.next;
              else
                this.head = this.tail = null;
            } else {
              this.head = p;
              p.data = str.slice(nb);
            }
            break;
          }
          ++c;
        }
        this.length -= c;
        return ret;
      }
    }, {
      key: "_getBuffer",
      value: function _getBuffer(n) {
        var ret = Buffer2.allocUnsafe(n);
        var p = this.head;
        var c = 1;
        p.data.copy(ret);
        n -= p.data.length;
        while (p = p.next) {
          var buf = p.data;
          var nb = n > buf.length ? buf.length : n;
          buf.copy(ret, ret.length - n, 0, nb);
          n -= nb;
          if (n === 0) {
            if (nb === buf.length) {
              ++c;
              if (p.next)
                this.head = p.next;
              else
                this.head = this.tail = null;
            } else {
              this.head = p;
              p.data = buf.slice(nb);
            }
            break;
          }
          ++c;
        }
        this.length -= c;
        return ret;
      }
    }, {
      key: custom,
      value: function value(_2, options) {
        return inspect(this, _objectSpread(_objectSpread({}, options), {}, {
          depth: 0,
          customInspect: false
        }));
      }
    }]);
    return BufferList;
  }();
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS((exports, module) => {
  /*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
  var buffer = import.meta.require("buffer");
  var Buffer2 = buffer.Buffer;
  function copyProps(src, dst) {
    for (var key in src) {
      dst[key] = src[key];
    }
  }
  if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
    module.exports = buffer;
  } else {
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
  }
  function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer2(arg, encodingOrOffset, length);
  }
  SafeBuffer.prototype = Object.create(Buffer2.prototype);
  copyProps(Buffer2, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      throw new TypeError("Argument must not be a number");
    }
    return Buffer2(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    var buf = Buffer2(size);
    if (fill !== undefined) {
      if (typeof encoding === "string") {
        buf.fill(fill, encoding);
      } else {
        buf.fill(fill);
      }
    } else {
      buf.fill(0);
    }
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return Buffer2(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return buffer.SlowBuffer(size);
  };
});

// node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS((exports) => {
  var Buffer2 = require_safe_buffer().Buffer;
  var isEncoding = Buffer2.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch (encoding && encoding.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function _normalizeEncoding(enc) {
    if (!enc)
      return "utf8";
    var retried;
    while (true) {
      switch (enc) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return enc;
        default:
          if (retried)
            return;
          enc = ("" + enc).toLowerCase();
          retried = true;
      }
    }
  }
  function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc)))
      throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
  }
  exports.StringDecoder = StringDecoder;
  function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch (this.encoding) {
      case "utf16le":
        this.text = utf16Text;
        this.end = utf16End;
        nb = 4;
        break;
      case "utf8":
        this.fillLast = utf8FillLast;
        nb = 4;
        break;
      case "base64":
        this.text = base64Text;
        this.end = base64End;
        nb = 3;
        break;
      default:
        this.write = simpleWrite;
        this.end = simpleEnd;
        return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer2.allocUnsafe(nb);
  }
  StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0)
      return "";
    var r;
    var i;
    if (this.lastNeed) {
      r = this.fillLast(buf);
      if (r === undefined)
        return "";
      i = this.lastNeed;
      this.lastNeed = 0;
    } else {
      i = 0;
    }
    if (i < buf.length)
      return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
  };
  StringDecoder.prototype.end = utf8End;
  StringDecoder.prototype.text = utf8Text;
  StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
  };
  function utf8CheckByte(byte2) {
    if (byte2 <= 127)
      return 0;
    else if (byte2 >> 5 === 6)
      return 2;
    else if (byte2 >> 4 === 14)
      return 3;
    else if (byte2 >> 3 === 30)
      return 4;
    return byte2 >> 6 === 2 ? -1 : -2;
  }
  function utf8CheckIncomplete(self2, buf, i) {
    var j = buf.length - 1;
    if (j < i)
      return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self2.lastNeed = nb - 1;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0)
        self2.lastNeed = nb - 2;
      return nb;
    }
    if (--j < i || nb === -2)
      return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) {
        if (nb === 2)
          nb = 0;
        else
          self2.lastNeed = nb - 3;
      }
      return nb;
    }
    return 0;
  }
  function utf8CheckExtraBytes(self2, buf, p) {
    if ((buf[0] & 192) !== 128) {
      self2.lastNeed = 0;
      return "\uFFFD";
    }
    if (self2.lastNeed > 1 && buf.length > 1) {
      if ((buf[1] & 192) !== 128) {
        self2.lastNeed = 1;
        return "\uFFFD";
      }
      if (self2.lastNeed > 2 && buf.length > 2) {
        if ((buf[2] & 192) !== 128) {
          self2.lastNeed = 2;
          return "\uFFFD";
        }
      }
    }
  }
  function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined)
      return r;
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, p, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
  }
  function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed)
      return buf.toString("utf8", i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i, end);
  }
  function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + "\uFFFD";
    return r;
  }
  function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
      var r = buf.toString("utf16le", i);
      if (r) {
        var c = r.charCodeAt(r.length - 1);
        if (c >= 55296 && c <= 56319) {
          this.lastNeed = 2;
          this.lastTotal = 4;
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
          return r.slice(0, -1);
        }
      }
      return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
  }
  function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
      var end = this.lastTotal - this.lastNeed;
      return r + this.lastChar.toString("utf16le", 0, end);
    }
    return r;
  }
  function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0)
      return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
      this.lastChar[0] = buf[buf.length - 1];
    } else {
      this.lastChar[0] = buf[buf.length - 2];
      this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
  }
  function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed)
      return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
  }
  function simpleWrite(buf) {
    return buf.toString(this.encoding);
  }
  function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
  }
});

// node_modules/readable-stream/lib/internal/streams/end-of-stream.js
var require_end_of_stream = __commonJS((exports, module) => {
  var ERR_STREAM_PREMATURE_CLOSE = require_errors2().codes.ERR_STREAM_PREMATURE_CLOSE;
  function once(callback) {
    var called = false;
    return function() {
      if (called)
        return;
      called = true;
      for (var _len = arguments.length, args = new Array(_len), _key = 0;_key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      callback.apply(this, args);
    };
  }
  function noop() {
  }
  function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
  }
  function eos(stream, opts, callback) {
    if (typeof opts === "function")
      return eos(stream, null, opts);
    if (!opts)
      opts = {};
    callback = once(callback || noop);
    var readable = opts.readable || opts.readable !== false && stream.readable;
    var writable = opts.writable || opts.writable !== false && stream.writable;
    var onlegacyfinish = function onlegacyfinish() {
      if (!stream.writable)
        onfinish();
    };
    var writableEnded = stream._writableState && stream._writableState.finished;
    var onfinish = function onfinish() {
      writable = false;
      writableEnded = true;
      if (!readable)
        callback.call(stream);
    };
    var readableEnded = stream._readableState && stream._readableState.endEmitted;
    var onend = function onend() {
      readable = false;
      readableEnded = true;
      if (!writable)
        callback.call(stream);
    };
    var onerror = function onerror(err) {
      callback.call(stream, err);
    };
    var onclose = function onclose() {
      var err;
      if (readable && !readableEnded) {
        if (!stream._readableState || !stream._readableState.ended)
          err = new ERR_STREAM_PREMATURE_CLOSE;
        return callback.call(stream, err);
      }
      if (writable && !writableEnded) {
        if (!stream._writableState || !stream._writableState.ended)
          err = new ERR_STREAM_PREMATURE_CLOSE;
        return callback.call(stream, err);
      }
    };
    var onrequest = function onrequest() {
      stream.req.on("finish", onfinish);
    };
    if (isRequest(stream)) {
      stream.on("complete", onfinish);
      stream.on("abort", onclose);
      if (stream.req)
        onrequest();
      else
        stream.on("request", onrequest);
    } else if (writable && !stream._writableState) {
      stream.on("end", onlegacyfinish);
      stream.on("close", onlegacyfinish);
    }
    stream.on("end", onend);
    stream.on("finish", onfinish);
    if (opts.error !== false)
      stream.on("error", onerror);
    stream.on("close", onclose);
    return function() {
      stream.removeListener("complete", onfinish);
      stream.removeListener("abort", onclose);
      stream.removeListener("request", onrequest);
      if (stream.req)
        stream.req.removeListener("finish", onfinish);
      stream.removeListener("end", onlegacyfinish);
      stream.removeListener("close", onlegacyfinish);
      stream.removeListener("finish", onfinish);
      stream.removeListener("end", onend);
      stream.removeListener("error", onerror);
      stream.removeListener("close", onclose);
    };
  }
  module.exports = eos;
});

// node_modules/readable-stream/lib/internal/streams/async_iterator.js
var require_async_iterator = __commonJS((exports, module) => {
  var _Object$setPrototypeO;
  function _defineProperty(obj, key, value2) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value2, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value2;
    }
    return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var finished = require_end_of_stream();
  var kLastResolve = Symbol("lastResolve");
  var kLastReject = Symbol("lastReject");
  var kError = Symbol("error");
  var kEnded = Symbol("ended");
  var kLastPromise = Symbol("lastPromise");
  var kHandlePromise = Symbol("handlePromise");
  var kStream = Symbol("stream");
  function createIterResult(value2, done) {
    return {
      value: value2,
      done
    };
  }
  function readAndResolve(iter) {
    var resolve = iter[kLastResolve];
    if (resolve !== null) {
      var data = iter[kStream].read();
      if (data !== null) {
        iter[kLastPromise] = null;
        iter[kLastResolve] = null;
        iter[kLastReject] = null;
        resolve(createIterResult(data, false));
      }
    }
  }
  function onReadable(iter) {
    process.nextTick(readAndResolve, iter);
  }
  function wrapForNext(lastPromise, iter) {
    return function(resolve, reject) {
      lastPromise.then(function() {
        if (iter[kEnded]) {
          resolve(createIterResult(undefined, true));
          return;
        }
        iter[kHandlePromise](resolve, reject);
      }, reject);
    };
  }
  var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
  });
  var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
    get stream() {
      return this[kStream];
    },
    next: function next() {
      var _this = this;
      var error4 = this[kError];
      if (error4 !== null) {
        return Promise.reject(error4);
      }
      if (this[kEnded]) {
        return Promise.resolve(createIterResult(undefined, true));
      }
      if (this[kStream].destroyed) {
        return new Promise(function(resolve, reject) {
          process.nextTick(function() {
            if (_this[kError]) {
              reject(_this[kError]);
            } else {
              resolve(createIterResult(undefined, true));
            }
          });
        });
      }
      var lastPromise = this[kLastPromise];
      var promise3;
      if (lastPromise) {
        promise3 = new Promise(wrapForNext(lastPromise, this));
      } else {
        var data = this[kStream].read();
        if (data !== null) {
          return Promise.resolve(createIterResult(data, false));
        }
        promise3 = new Promise(this[kHandlePromise]);
      }
      this[kLastPromise] = promise3;
      return promise3;
    }
  }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
    return this;
  }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
    var _this2 = this;
    return new Promise(function(resolve, reject) {
      _this2[kStream].destroy(null, function(err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(createIterResult(undefined, true));
      });
    });
  }), _Object$setPrototypeO), AsyncIteratorPrototype);
  var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
    var _Object$create;
    var iterator3 = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
      value: stream,
      writable: true
    }), _defineProperty(_Object$create, kLastResolve, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kLastReject, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kError, {
      value: null,
      writable: true
    }), _defineProperty(_Object$create, kEnded, {
      value: stream._readableState.endEmitted,
      writable: true
    }), _defineProperty(_Object$create, kHandlePromise, {
      value: function value(resolve, reject) {
        var data = iterator3[kStream].read();
        if (data) {
          iterator3[kLastPromise] = null;
          iterator3[kLastResolve] = null;
          iterator3[kLastReject] = null;
          resolve(createIterResult(data, false));
        } else {
          iterator3[kLastResolve] = resolve;
          iterator3[kLastReject] = reject;
        }
      },
      writable: true
    }), _Object$create));
    iterator3[kLastPromise] = null;
    finished(stream, function(err) {
      if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var reject = iterator3[kLastReject];
        if (reject !== null) {
          iterator3[kLastPromise] = null;
          iterator3[kLastResolve] = null;
          iterator3[kLastReject] = null;
          reject(err);
        }
        iterator3[kError] = err;
        return;
      }
      var resolve = iterator3[kLastResolve];
      if (resolve !== null) {
        iterator3[kLastPromise] = null;
        iterator3[kLastResolve] = null;
        iterator3[kLastReject] = null;
        resolve(createIterResult(undefined, true));
      }
      iterator3[kEnded] = true;
    });
    stream.on("readable", onReadable.bind(null, iterator3));
    return iterator3;
  };
  module.exports = createReadableStreamAsyncIterator;
});

// node_modules/readable-stream/lib/internal/streams/from.js
var require_from = __commonJS((exports, module) => {
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value2 = info.value;
    } catch (error4) {
      reject(error4);
      return;
    }
    if (info.done) {
      resolve(value2);
    } else {
      Promise.resolve(value2).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self2 = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self2, args);
        function _next(value2) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value2);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function ownKeys(object3, enumerableOnly) {
    var keys = Object.keys(object3);
    if (Object.getOwnPropertySymbols) {
      var symbols3 = Object.getOwnPropertySymbols(object3);
      enumerableOnly && (symbols3 = symbols3.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object3, sym).enumerable;
      })), keys.push.apply(keys, symbols3);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1;i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value2) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, { value: value2, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value2;
    }
    return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  var ERR_INVALID_ARG_TYPE = require_errors2().codes.ERR_INVALID_ARG_TYPE;
  function from(Readable, iterable, opts) {
    var iterator3;
    if (iterable && typeof iterable.next === "function") {
      iterator3 = iterable;
    } else if (iterable && iterable[Symbol.asyncIterator])
      iterator3 = iterable[Symbol.asyncIterator]();
    else if (iterable && iterable[Symbol.iterator])
      iterator3 = iterable[Symbol.iterator]();
    else
      throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
    var readable = new Readable(_objectSpread({
      objectMode: true
    }, opts));
    var reading = false;
    readable._read = function() {
      if (!reading) {
        reading = true;
        next();
      }
    };
    function next() {
      return _next2.apply(this, arguments);
    }
    function _next2() {
      _next2 = _asyncToGenerator(function* () {
        try {
          var _yield$iterator$next = yield iterator3.next(), value2 = _yield$iterator$next.value, done = _yield$iterator$next.done;
          if (done) {
            readable.push(null);
          } else if (readable.push(yield value2)) {
            next();
          } else {
            reading = false;
          }
        } catch (err) {
          readable.destroy(err);
        }
      });
      return _next2.apply(this, arguments);
    }
    return readable;
  }
  module.exports = from;
});

// node_modules/readable-stream/lib/_stream_readable.js
var require__stream_readable = __commonJS((exports, module) => {
  module.exports = Readable;
  var Duplex;
  Readable.ReadableState = ReadableState;
  var EE = import.meta.require("events").EventEmitter;
  var EElistenerCount = function EElistenerCount(emitter, type3) {
    return emitter.listeners(type3).length;
  };
  var Stream = import.meta.require("stream");
  var Buffer2 = import.meta.require("buffer").Buffer;
  var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var debugUtil = import.meta.require("util");
  var debug;
  if (debugUtil && debugUtil.debuglog) {
    debug = debugUtil.debuglog("stream");
  } else {
    debug = function debug() {
    };
  }
  var BufferList = require_buffer_list();
  var destroyImpl = require_destroy();
  var _require = require_state();
  var getHighWaterMark = _require.getHighWaterMark;
  var _require$codes = require_errors2().codes;
  var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
  var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
  var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
  var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
  var StringDecoder;
  var createReadableStreamAsyncIterator;
  var from;
  require_inherits()(Readable, Stream);
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
  function prependListener(emitter, event, fn) {
    if (typeof emitter.prependListener === "function")
      return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
  function ReadableState(options, stream, isDuplex) {
    Duplex = Duplex || require__stream_duplex();
    options = options || {};
    if (typeof isDuplex !== "boolean")
      isDuplex = stream instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.readableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
    this.buffer = new BufferList;
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.resumeScheduled = false;
    this.paused = true;
    this.emitClose = options.emitClose !== false;
    this.autoDestroy = !!options.autoDestroy;
    this.destroyed = false;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.awaitDrain = 0;
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      if (!StringDecoder)
        StringDecoder = require_string_decoder().StringDecoder;
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    Duplex = Duplex || require__stream_duplex();
    if (!(this instanceof Readable))
      return new Readable(options);
    var isDuplex = this instanceof Duplex;
    this._readableState = new ReadableState(options, this, isDuplex);
    this.readable = true;
    if (options) {
      if (typeof options.read === "function")
        this._read = options.read;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
    }
    Stream.call(this);
  }
  Object.defineProperty(Readable.prototype, "destroyed", {
    enumerable: false,
    get: function get() {
      if (this._readableState === undefined) {
        return false;
      }
      return this._readableState.destroyed;
    },
    set: function set(value2) {
      if (!this._readableState) {
        return;
      }
      this._readableState.destroyed = value2;
    }
  });
  Readable.prototype.destroy = destroyImpl.destroy;
  Readable.prototype._undestroy = destroyImpl.undestroy;
  Readable.prototype._destroy = function(err, cb) {
    cb(err);
  };
  Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    var skipChunkCheck;
    if (!state.objectMode) {
      if (typeof chunk === "string") {
        encoding = encoding || state.defaultEncoding;
        if (encoding !== state.encoding) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = "";
        }
        skipChunkCheck = true;
      }
    } else {
      skipChunkCheck = true;
    }
    return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
  };
  Readable.prototype.unshift = function(chunk) {
    return readableAddChunk(this, chunk, null, true, false);
  };
  function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
    debug("readableAddChunk", chunk);
    var state = stream._readableState;
    if (chunk === null) {
      state.reading = false;
      onEofChunk(stream, state);
    } else {
      var er;
      if (!skipChunkCheck)
        er = chunkInvalid(state, chunk);
      if (er) {
        errorOrDestroy(stream, er);
      } else if (state.objectMode || chunk && chunk.length > 0) {
        if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (addToFront) {
          if (state.endEmitted)
            errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT);
          else
            addChunk(stream, state, chunk, true);
        } else if (state.ended) {
          errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF);
        } else if (state.destroyed) {
          return false;
        } else {
          state.reading = false;
          if (state.decoder && !encoding) {
            chunk = state.decoder.write(chunk);
            if (state.objectMode || chunk.length !== 0)
              addChunk(stream, state, chunk, false);
            else
              maybeReadMore(stream, state);
          } else {
            addChunk(stream, state, chunk, false);
          }
        }
      } else if (!addToFront) {
        state.reading = false;
        maybeReadMore(stream, state);
      }
    }
    return !state.ended && (state.length < state.highWaterMark || state.length === 0);
  }
  function addChunk(stream, state, chunk, addToFront) {
    if (state.flowing && state.length === 0 && !state.sync) {
      state.awaitDrain = 0;
      stream.emit("data", chunk);
    } else {
      state.length += state.objectMode ? 1 : chunk.length;
      if (addToFront)
        state.buffer.unshift(chunk);
      else
        state.buffer.push(chunk);
      if (state.needReadable)
        emitReadable(stream);
    }
    maybeReadMore(stream, state);
  }
  function chunkInvalid(state, chunk) {
    var er;
    if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== undefined && !state.objectMode) {
      er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
    }
    return er;
  }
  Readable.prototype.isPaused = function() {
    return this._readableState.flowing === false;
  };
  Readable.prototype.setEncoding = function(enc) {
    if (!StringDecoder)
      StringDecoder = require_string_decoder().StringDecoder;
    var decoder = new StringDecoder(enc);
    this._readableState.decoder = decoder;
    this._readableState.encoding = this._readableState.decoder.encoding;
    var p = this._readableState.buffer.head;
    var content = "";
    while (p !== null) {
      content += decoder.write(p.data);
      p = p.next;
    }
    this._readableState.buffer.clear();
    if (content !== "")
      this._readableState.buffer.push(content);
    this._readableState.length = content.length;
    return this;
  };
  var MAX_HWM = 1073741824;
  function computeNewHighWaterMark(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state) {
    if (n <= 0 || state.length === 0 && state.ended)
      return 0;
    if (state.objectMode)
      return 1;
    if (n !== n) {
      if (state.flowing && state.length)
        return state.buffer.head.data.length;
      else
        return state.length;
    }
    if (n > state.highWaterMark)
      state.highWaterMark = computeNewHighWaterMark(n);
    if (n <= state.length)
      return n;
    if (!state.ended) {
      state.needReadable = true;
      return 0;
    }
    return state.length;
  }
  Readable.prototype.read = function(n) {
    debug("read", n);
    n = parseInt(n, 10);
    var state = this._readableState;
    var nOrig = n;
    if (n !== 0)
      state.emittedReadable = false;
    if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
      debug("read: emitReadable", state.length, state.ended);
      if (state.length === 0 && state.ended)
        endReadable(this);
      else
        emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state);
    if (n === 0 && state.ended) {
      if (state.length === 0)
        endReadable(this);
      return null;
    }
    var doRead = state.needReadable;
    debug("need readable", doRead);
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug("length less than watermark", doRead);
    }
    if (state.ended || state.reading) {
      doRead = false;
      debug("reading or ended", doRead);
    } else if (doRead) {
      debug("do read");
      state.reading = true;
      state.sync = true;
      if (state.length === 0)
        state.needReadable = true;
      this._read(state.highWaterMark);
      state.sync = false;
      if (!state.reading)
        n = howMuchToRead(nOrig, state);
    }
    var ret;
    if (n > 0)
      ret = fromList(n, state);
    else
      ret = null;
    if (ret === null) {
      state.needReadable = state.length <= state.highWaterMark;
      n = 0;
    } else {
      state.length -= n;
      state.awaitDrain = 0;
    }
    if (state.length === 0) {
      if (!state.ended)
        state.needReadable = true;
      if (nOrig !== n && state.ended)
        endReadable(this);
    }
    if (ret !== null)
      this.emit("data", ret);
    return ret;
  };
  function onEofChunk(stream, state) {
    debug("onEofChunk");
    if (state.ended)
      return;
    if (state.decoder) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;
    if (state.sync) {
      emitReadable(stream);
    } else {
      state.needReadable = false;
      if (!state.emittedReadable) {
        state.emittedReadable = true;
        emitReadable_(stream);
      }
    }
  }
  function emitReadable(stream) {
    var state = stream._readableState;
    debug("emitReadable", state.needReadable, state.emittedReadable);
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug("emitReadable", state.flowing);
      state.emittedReadable = true;
      process.nextTick(emitReadable_, stream);
    }
  }
  function emitReadable_(stream) {
    var state = stream._readableState;
    debug("emitReadable_", state.destroyed, state.length, state.ended);
    if (!state.destroyed && (state.length || state.ended)) {
      stream.emit("readable");
      state.emittedReadable = false;
    }
    state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
    flow(stream);
  }
  function maybeReadMore(stream, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      process.nextTick(maybeReadMore_, stream, state);
    }
  }
  function maybeReadMore_(stream, state) {
    while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
      var len = state.length;
      debug("maybeReadMore read 0");
      stream.read(0);
      if (len === state.length)
        break;
    }
    state.readingMore = false;
  }
  Readable.prototype._read = function(n) {
    errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
  };
  Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch (state.pipesCount) {
      case 0:
        state.pipes = dest;
        break;
      case 1:
        state.pipes = [state.pipes, dest];
        break;
      default:
        state.pipes.push(dest);
        break;
    }
    state.pipesCount += 1;
    debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : unpipe;
    if (state.endEmitted)
      process.nextTick(endFn);
    else
      src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable, unpipeInfo) {
      debug("onunpipe");
      if (readable === src) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend() {
      debug("onend");
      dest.end();
    }
    var ondrain = pipeOnDrain(src);
    dest.on("drain", ondrain);
    var cleanedUp = false;
    function cleanup() {
      debug("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      dest.removeListener("drain", ondrain);
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend);
      src.removeListener("end", unpipe);
      src.removeListener("data", ondata);
      cleanedUp = true;
      if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
        ondrain();
    }
    src.on("data", ondata);
    function ondata(chunk) {
      debug("ondata");
      var ret = dest.write(chunk);
      debug("dest.write", ret);
      if (ret === false) {
        if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
          debug("false write response, pause", state.awaitDrain);
          state.awaitDrain++;
        }
        src.pause();
      }
    }
    function onerror(er) {
      debug("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (EElistenerCount(dest, "error") === 0)
        errorOrDestroy(dest, er);
    }
    prependListener(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug("unpipe");
      src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (!state.flowing) {
      debug("pipe resume");
      src.resume();
    }
    return dest;
  };
  function pipeOnDrain(src) {
    return function pipeOnDrainFunctionResult() {
      var state = src._readableState;
      debug("pipeOnDrain", state.awaitDrain);
      if (state.awaitDrain)
        state.awaitDrain--;
      if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
        state.flowing = true;
        flow(src);
      }
    };
  }
  Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;
    var unpipeInfo = {
      hasUnpiped: false
    };
    if (state.pipesCount === 0)
      return this;
    if (state.pipesCount === 1) {
      if (dest && dest !== state.pipes)
        return this;
      if (!dest)
        dest = state.pipes;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      if (dest)
        dest.emit("unpipe", this, unpipeInfo);
      return this;
    }
    if (!dest) {
      var dests = state.pipes;
      var len = state.pipesCount;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      for (var i = 0;i < len; i++)
        dests[i].emit("unpipe", this, {
          hasUnpiped: false
        });
      return this;
    }
    var index = indexOf(state.pipes, dest);
    if (index === -1)
      return this;
    state.pipes.splice(index, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1)
      state.pipes = state.pipes[0];
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable.prototype.on = function(ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn);
    var state = this._readableState;
    if (ev === "data") {
      state.readableListening = this.listenerCount("readable") > 0;
      if (state.flowing !== false)
        this.resume();
    } else if (ev === "readable") {
      if (!state.endEmitted && !state.readableListening) {
        state.readableListening = state.needReadable = true;
        state.flowing = false;
        state.emittedReadable = false;
        debug("on readable", state.length, state.reading);
        if (state.length) {
          emitReadable(this);
        } else if (!state.reading) {
          process.nextTick(nReadingNextTick, this);
        }
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  Readable.prototype.removeListener = function(ev, fn) {
    var res = Stream.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") {
      process.nextTick(updateReadableListening, this);
    }
    return res;
  };
  Readable.prototype.removeAllListeners = function(ev) {
    var res = Stream.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === undefined) {
      process.nextTick(updateReadableListening, this);
    }
    return res;
  };
  function updateReadableListening(self2) {
    var state = self2._readableState;
    state.readableListening = self2.listenerCount("readable") > 0;
    if (state.resumeScheduled && !state.paused) {
      state.flowing = true;
    } else if (self2.listenerCount("data") > 0) {
      self2.resume();
    }
  }
  function nReadingNextTick(self2) {
    debug("readable nexttick read 0");
    self2.read(0);
  }
  Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
      debug("resume");
      state.flowing = !state.readableListening;
      resume(this, state);
    }
    state.paused = false;
    return this;
  };
  function resume(stream, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      process.nextTick(resume_, stream, state);
    }
  }
  function resume_(stream, state) {
    debug("resume", state.reading);
    if (!state.reading) {
      stream.read(0);
    }
    state.resumeScheduled = false;
    stream.emit("resume");
    flow(stream);
    if (state.flowing && !state.reading)
      stream.read(0);
  }
  Readable.prototype.pause = function() {
    debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
      debug("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    this._readableState.paused = true;
    return this;
  };
  function flow(stream) {
    var state = stream._readableState;
    debug("flow", state.flowing);
    while (state.flowing && stream.read() !== null)
      ;
  }
  Readable.prototype.wrap = function(stream) {
    var _this = this;
    var state = this._readableState;
    var paused = false;
    stream.on("end", function() {
      debug("wrapped end");
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length)
          _this.push(chunk);
      }
      _this.push(null);
    });
    stream.on("data", function(chunk) {
      debug("wrapped data");
      if (state.decoder)
        chunk = state.decoder.write(chunk);
      if (state.objectMode && (chunk === null || chunk === undefined))
        return;
      else if (!state.objectMode && (!chunk || !chunk.length))
        return;
      var ret = _this.push(chunk);
      if (!ret) {
        paused = true;
        stream.pause();
      }
    });
    for (var i in stream) {
      if (this[i] === undefined && typeof stream[i] === "function") {
        this[i] = function methodWrap(method) {
          return function methodWrapReturnFunction() {
            return stream[method].apply(stream, arguments);
          };
        }(i);
      }
    }
    for (var n = 0;n < kProxyEvents.length; n++) {
      stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
    }
    this._read = function(n2) {
      debug("wrapped _read", n2);
      if (paused) {
        paused = false;
        stream.resume();
      }
    };
    return this;
  };
  if (typeof Symbol === "function") {
    Readable.prototype[Symbol.asyncIterator] = function() {
      if (createReadableStreamAsyncIterator === undefined) {
        createReadableStreamAsyncIterator = require_async_iterator();
      }
      return createReadableStreamAsyncIterator(this);
    };
  }
  Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
    enumerable: false,
    get: function get() {
      return this._readableState.highWaterMark;
    }
  });
  Object.defineProperty(Readable.prototype, "readableBuffer", {
    enumerable: false,
    get: function get() {
      return this._readableState && this._readableState.buffer;
    }
  });
  Object.defineProperty(Readable.prototype, "readableFlowing", {
    enumerable: false,
    get: function get() {
      return this._readableState.flowing;
    },
    set: function set(state) {
      if (this._readableState) {
        this._readableState.flowing = state;
      }
    }
  });
  Readable._fromList = fromList;
  Object.defineProperty(Readable.prototype, "readableLength", {
    enumerable: false,
    get: function get() {
      return this._readableState.length;
    }
  });
  function fromList(n, state) {
    if (state.length === 0)
      return null;
    var ret;
    if (state.objectMode)
      ret = state.buffer.shift();
    else if (!n || n >= state.length) {
      if (state.decoder)
        ret = state.buffer.join("");
      else if (state.buffer.length === 1)
        ret = state.buffer.first();
      else
        ret = state.buffer.concat(state.length);
      state.buffer.clear();
    } else {
      ret = state.buffer.consume(n, state.decoder);
    }
    return ret;
  }
  function endReadable(stream) {
    var state = stream._readableState;
    debug("endReadable", state.endEmitted);
    if (!state.endEmitted) {
      state.ended = true;
      process.nextTick(endReadableNT, state, stream);
    }
  }
  function endReadableNT(state, stream) {
    debug("endReadableNT", state.endEmitted, state.length);
    if (!state.endEmitted && state.length === 0) {
      state.endEmitted = true;
      stream.readable = false;
      stream.emit("end");
      if (state.autoDestroy) {
        var wState = stream._writableState;
        if (!wState || wState.autoDestroy && wState.finished) {
          stream.destroy();
        }
      }
    }
  }
  if (typeof Symbol === "function") {
    Readable.from = function(iterable, opts) {
      if (from === undefined) {
        from = require_from();
      }
      return from(Readable, iterable, opts);
    };
  }
  function indexOf(xs, x) {
    for (var i = 0, l = xs.length;i < l; i++) {
      if (xs[i] === x)
        return i;
    }
    return -1;
  }
});

// node_modules/readable-stream/lib/_stream_duplex.js
var require__stream_duplex = __commonJS((exports, module) => {
  var objectKeys = Object.keys || function(obj) {
    var keys2 = [];
    for (var key in obj)
      keys2.push(key);
    return keys2;
  };
  module.exports = Duplex;
  var Readable = require__stream_readable();
  var Writable = require__stream_writable();
  require_inherits()(Duplex, Readable);
  {
    keys = objectKeys(Writable.prototype);
    for (v = 0;v < keys.length; v++) {
      method = keys[v];
      if (!Duplex.prototype[method])
        Duplex.prototype[method] = Writable.prototype[method];
    }
  }
  var keys;
  var method;
  var v;
  function Duplex(options) {
    if (!(this instanceof Duplex))
      return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    this.allowHalfOpen = true;
    if (options) {
      if (options.readable === false)
        this.readable = false;
      if (options.writable === false)
        this.writable = false;
      if (options.allowHalfOpen === false) {
        this.allowHalfOpen = false;
        this.once("end", onend);
      }
    }
  }
  Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  Object.defineProperty(Duplex.prototype, "writableBuffer", {
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  Object.defineProperty(Duplex.prototype, "writableLength", {
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function onend() {
    if (this._writableState.ended)
      return;
    process.nextTick(onEndNT, this);
  }
  function onEndNT(self2) {
    self2.end();
  }
  Object.defineProperty(Duplex.prototype, "destroyed", {
    enumerable: false,
    get: function get() {
      if (this._readableState === undefined || this._writableState === undefined) {
        return false;
      }
      return this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function set(value2) {
      if (this._readableState === undefined || this._writableState === undefined) {
        return;
      }
      this._readableState.destroyed = value2;
      this._writableState.destroyed = value2;
    }
  });
});

// node_modules/readable-stream/lib/_stream_writable.js
var require__stream_writable = __commonJS((exports, module) => {
  module.exports = Writable;
  function CorkedRequest(state) {
    var _this = this;
    this.next = null;
    this.entry = null;
    this.finish = function() {
      onCorkedFinish(_this, state);
    };
  }
  var Duplex;
  Writable.WritableState = WritableState;
  var internalUtil = {
    deprecate: require_node()
  };
  var Stream = import.meta.require("stream");
  var Buffer2 = import.meta.require("buffer").Buffer;
  var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
  };
  function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk);
  }
  function _isUint8Array(obj) {
    return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
  }
  var destroyImpl = require_destroy();
  var _require = require_state();
  var getHighWaterMark = _require.getHighWaterMark;
  var _require$codes = require_errors2().codes;
  var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
  var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
  var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
  var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
  var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
  var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
  var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
  var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
  var errorOrDestroy = destroyImpl.errorOrDestroy;
  require_inherits()(Writable, Stream);
  function nop() {
  }
  function WritableState(options, stream, isDuplex) {
    Duplex = Duplex || require__stream_duplex();
    options = options || {};
    if (typeof isDuplex !== "boolean")
      isDuplex = stream instanceof Duplex;
    this.objectMode = !!options.objectMode;
    if (isDuplex)
      this.objectMode = this.objectMode || !!options.writableObjectMode;
    this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = function(er) {
      onwrite(stream, er);
    };
    this.writecb = null;
    this.writelen = 0;
    this.bufferedRequest = null;
    this.lastBufferedRequest = null;
    this.pendingcb = 0;
    this.prefinished = false;
    this.errorEmitted = false;
    this.emitClose = options.emitClose !== false;
    this.autoDestroy = !!options.autoDestroy;
    this.bufferedRequestCount = 0;
    this.corkedRequestsFree = new CorkedRequest(this);
  }
  WritableState.prototype.getBuffer = function getBuffer() {
    var current = this.bufferedRequest;
    var out = [];
    while (current) {
      out.push(current);
      current = current.next;
    }
    return out;
  };
  (function() {
    try {
      Object.defineProperty(WritableState.prototype, "buffer", {
        get: internalUtil.deprecate(function writableStateBufferGetter() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer " + "instead.", "DEP0003")
      });
    } catch (_2) {
    }
  })();
  var realHasInstance;
  if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
    realHasInstance = Function.prototype[Symbol.hasInstance];
    Object.defineProperty(Writable, Symbol.hasInstance, {
      value: function value(object3) {
        if (realHasInstance.call(this, object3))
          return true;
        if (this !== Writable)
          return false;
        return object3 && object3._writableState instanceof WritableState;
      }
    });
  } else {
    realHasInstance = function realHasInstance(object3) {
      return object3 instanceof this;
    };
  }
  function Writable(options) {
    Duplex = Duplex || require__stream_duplex();
    var isDuplex = this instanceof Duplex;
    if (!isDuplex && !realHasInstance.call(Writable, this))
      return new Writable(options);
    this._writableState = new WritableState(options, this, isDuplex);
    this.writable = true;
    if (options) {
      if (typeof options.write === "function")
        this._write = options.write;
      if (typeof options.writev === "function")
        this._writev = options.writev;
      if (typeof options.destroy === "function")
        this._destroy = options.destroy;
      if (typeof options.final === "function")
        this._final = options.final;
    }
    Stream.call(this);
  }
  Writable.prototype.pipe = function() {
    errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE);
  };
  function writeAfterEnd(stream, cb) {
    var er = new ERR_STREAM_WRITE_AFTER_END;
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
  }
  function validChunk(stream, state, chunk, cb) {
    var er;
    if (chunk === null) {
      er = new ERR_STREAM_NULL_VALUES;
    } else if (typeof chunk !== "string" && !state.objectMode) {
      er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
    }
    if (er) {
      errorOrDestroy(stream, er);
      process.nextTick(cb, er);
      return false;
    }
    return true;
  }
  Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    var isBuf = !state.objectMode && _isUint8Array(chunk);
    if (isBuf && !Buffer2.isBuffer(chunk)) {
      chunk = _uint8ArrayToBuffer(chunk);
    }
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (isBuf)
      encoding = "buffer";
    else if (!encoding)
      encoding = state.defaultEncoding;
    if (typeof cb !== "function")
      cb = nop;
    if (state.ending)
      writeAfterEnd(this, cb);
    else if (isBuf || validChunk(this, state, chunk, cb)) {
      state.pendingcb++;
      ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
    }
    return ret;
  };
  Writable.prototype.cork = function() {
    this._writableState.corked++;
  };
  Writable.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
      state.corked--;
      if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
        clearBuffer(this, state);
    }
  };
  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string")
      encoding = encoding.toLowerCase();
    if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
      throw new ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  Object.defineProperty(Writable.prototype, "writableBuffer", {
    enumerable: false,
    get: function get() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function decodeChunk(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
      chunk = Buffer2.from(chunk, encoding);
    }
    return chunk;
  }
  Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
    enumerable: false,
    get: function get() {
      return this._writableState.highWaterMark;
    }
  });
  function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
    if (!isBuf) {
      var newChunk = decodeChunk(state, chunk, encoding);
      if (chunk !== newChunk) {
        isBuf = true;
        encoding = "buffer";
        chunk = newChunk;
      }
    }
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark;
    if (!ret)
      state.needDrain = true;
    if (state.writing || state.corked) {
      var last = state.lastBufferedRequest;
      state.lastBufferedRequest = {
        chunk,
        encoding,
        isBuf,
        callback: cb,
        next: null
      };
      if (last) {
        last.next = state.lastBufferedRequest;
      } else {
        state.bufferedRequest = state.lastBufferedRequest;
      }
      state.bufferedRequestCount += 1;
    } else {
      doWrite(stream, state, false, len, chunk, encoding, cb);
    }
    return ret;
  }
  function doWrite(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (state.destroyed)
      state.onwrite(new ERR_STREAM_DESTROYED("write"));
    else if (writev)
      stream._writev(chunk, state.onwrite);
    else
      stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }
  function onwriteError(stream, state, sync, er, cb) {
    --state.pendingcb;
    if (sync) {
      process.nextTick(cb, er);
      process.nextTick(finishMaybe, stream, state);
      stream._writableState.errorEmitted = true;
      errorOrDestroy(stream, er);
    } else {
      cb(er);
      stream._writableState.errorEmitted = true;
      errorOrDestroy(stream, er);
      finishMaybe(stream, state);
    }
  }
  function onwriteStateUpdate(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  }
  function onwrite(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    if (typeof cb !== "function")
      throw new ERR_MULTIPLE_CALLBACK;
    onwriteStateUpdate(state);
    if (er)
      onwriteError(stream, state, sync, er, cb);
    else {
      var finished = needFinish(state) || stream.destroyed;
      if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
        clearBuffer(stream, state);
      }
      if (sync) {
        process.nextTick(afterWrite, stream, state, finished, cb);
      } else {
        afterWrite(stream, state, finished, cb);
      }
    }
  }
  function afterWrite(stream, state, finished, cb) {
    if (!finished)
      onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
  }
  function onwriteDrain(stream, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream.emit("drain");
    }
  }
  function clearBuffer(stream, state) {
    state.bufferProcessing = true;
    var entry = state.bufferedRequest;
    if (stream._writev && entry && entry.next) {
      var l = state.bufferedRequestCount;
      var buffer = new Array(l);
      var holder = state.corkedRequestsFree;
      holder.entry = entry;
      var count = 0;
      var allBuffers = true;
      while (entry) {
        buffer[count] = entry;
        if (!entry.isBuf)
          allBuffers = false;
        entry = entry.next;
        count += 1;
      }
      buffer.allBuffers = allBuffers;
      doWrite(stream, state, true, state.length, buffer, "", holder.finish);
      state.pendingcb++;
      state.lastBufferedRequest = null;
      if (holder.next) {
        state.corkedRequestsFree = holder.next;
        holder.next = null;
      } else {
        state.corkedRequestsFree = new CorkedRequest(state);
      }
      state.bufferedRequestCount = 0;
    } else {
      while (entry) {
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;
        doWrite(stream, state, false, len, chunk, encoding, cb);
        entry = entry.next;
        state.bufferedRequestCount--;
        if (state.writing) {
          break;
        }
      }
      if (entry === null)
        state.lastBufferedRequest = null;
    }
    state.bufferedRequest = entry;
    state.bufferProcessing = false;
  }
  Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
  };
  Writable.prototype._writev = null;
  Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    if (chunk !== null && chunk !== undefined)
      this.write(chunk, encoding);
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }
    if (!state.ending)
      endWritable(this, state, cb);
    return this;
  };
  Object.defineProperty(Writable.prototype, "writableLength", {
    enumerable: false,
    get: function get() {
      return this._writableState.length;
    }
  });
  function needFinish(state) {
    return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
  }
  function callFinal(stream, state) {
    stream._final(function(err) {
      state.pendingcb--;
      if (err) {
        errorOrDestroy(stream, err);
      }
      state.prefinished = true;
      stream.emit("prefinish");
      finishMaybe(stream, state);
    });
  }
  function prefinish(stream, state) {
    if (!state.prefinished && !state.finalCalled) {
      if (typeof stream._final === "function" && !state.destroyed) {
        state.pendingcb++;
        state.finalCalled = true;
        process.nextTick(callFinal, stream, state);
      } else {
        state.prefinished = true;
        stream.emit("prefinish");
      }
    }
  }
  function finishMaybe(stream, state) {
    var need = needFinish(state);
    if (need) {
      prefinish(stream, state);
      if (state.pendingcb === 0) {
        state.finished = true;
        stream.emit("finish");
        if (state.autoDestroy) {
          var rState = stream._readableState;
          if (!rState || rState.autoDestroy && rState.endEmitted) {
            stream.destroy();
          }
        }
      }
    }
    return need;
  }
  function endWritable(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
      if (state.finished)
        process.nextTick(cb);
      else
        stream.once("finish", cb);
    }
    state.ended = true;
    stream.writable = false;
  }
  function onCorkedFinish(corkReq, state, err) {
    var entry = corkReq.entry;
    corkReq.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    state.corkedRequestsFree.next = corkReq;
  }
  Object.defineProperty(Writable.prototype, "destroyed", {
    enumerable: false,
    get: function get() {
      if (this._writableState === undefined) {
        return false;
      }
      return this._writableState.destroyed;
    },
    set: function set(value2) {
      if (!this._writableState) {
        return;
      }
      this._writableState.destroyed = value2;
    }
  });
  Writable.prototype.destroy = destroyImpl.destroy;
  Writable.prototype._undestroy = destroyImpl.undestroy;
  Writable.prototype._destroy = function(err, cb) {
    cb(err);
  };
});

// node_modules/winston-transport/modern.js
var require_modern = __commonJS((exports, module) => {
  var util = import.meta.require("util");
  var Writable = require__stream_writable();
  var { LEVEL } = require_triple_beam();
  var TransportStream = module.exports = function TransportStream(options = {}) {
    Writable.call(this, { objectMode: true, highWaterMark: options.highWaterMark });
    this.format = options.format;
    this.level = options.level;
    this.handleExceptions = options.handleExceptions;
    this.handleRejections = options.handleRejections;
    this.silent = options.silent;
    if (options.log)
      this.log = options.log;
    if (options.logv)
      this.logv = options.logv;
    if (options.close)
      this.close = options.close;
    this.once("pipe", (logger) => {
      this.levels = logger.levels;
      this.parent = logger;
    });
    this.once("unpipe", (src) => {
      if (src === this.parent) {
        this.parent = null;
        if (this.close) {
          this.close();
        }
      }
    });
  };
  util.inherits(TransportStream, Writable);
  TransportStream.prototype._write = function _write(info, enc, callback) {
    if (this.silent || info.exception === true && !this.handleExceptions) {
      return callback(null);
    }
    const level = this.level || this.parent && this.parent.level;
    if (!level || this.levels[level] >= this.levels[info[LEVEL]]) {
      if (info && !this.format) {
        return this.log(info, callback);
      }
      let errState;
      let transformed;
      try {
        transformed = this.format.transform(Object.assign({}, info), this.format.options);
      } catch (err) {
        errState = err;
      }
      if (errState || !transformed) {
        callback();
        if (errState)
          throw errState;
        return;
      }
      return this.log(transformed, callback);
    }
    this._writableState.sync = false;
    return callback(null);
  };
  TransportStream.prototype._writev = function _writev(chunks, callback) {
    if (this.logv) {
      const infos = chunks.filter(this._accept, this);
      if (!infos.length) {
        return callback(null);
      }
      return this.logv(infos, callback);
    }
    for (let i = 0;i < chunks.length; i++) {
      if (!this._accept(chunks[i]))
        continue;
      if (chunks[i].chunk && !this.format) {
        this.log(chunks[i].chunk, chunks[i].callback);
        continue;
      }
      let errState;
      let transformed;
      try {
        transformed = this.format.transform(Object.assign({}, chunks[i].chunk), this.format.options);
      } catch (err) {
        errState = err;
      }
      if (errState || !transformed) {
        chunks[i].callback();
        if (errState) {
          callback(null);
          throw errState;
        }
      } else {
        this.log(transformed, chunks[i].callback);
      }
    }
    return callback(null);
  };
  TransportStream.prototype._accept = function _accept(write) {
    const info = write.chunk;
    if (this.silent) {
      return false;
    }
    const level = this.level || this.parent && this.parent.level;
    if (info.exception === true || !level || this.levels[level] >= this.levels[info[LEVEL]]) {
      if (this.handleExceptions || info.exception !== true) {
        return true;
      }
    }
    return false;
  };
  TransportStream.prototype._nop = function _nop() {
    return;
  };
});

// node_modules/winston-transport/legacy.js
var require_legacy = __commonJS((exports, module) => {
  var util = import.meta.require("util");
  var { LEVEL } = require_triple_beam();
  var TransportStream = require_modern();
  var LegacyTransportStream = module.exports = function LegacyTransportStream(options = {}) {
    TransportStream.call(this, options);
    if (!options.transport || typeof options.transport.log !== "function") {
      throw new Error("Invalid transport, must be an object with a log method.");
    }
    this.transport = options.transport;
    this.level = this.level || options.transport.level;
    this.handleExceptions = this.handleExceptions || options.transport.handleExceptions;
    this._deprecated();
    function transportError(err) {
      this.emit("error", err, this.transport);
    }
    if (!this.transport.__winstonError) {
      this.transport.__winstonError = transportError.bind(this);
      this.transport.on("error", this.transport.__winstonError);
    }
  };
  util.inherits(LegacyTransportStream, TransportStream);
  LegacyTransportStream.prototype._write = function _write(info, enc, callback) {
    if (this.silent || info.exception === true && !this.handleExceptions) {
      return callback(null);
    }
    if (!this.level || this.levels[this.level] >= this.levels[info[LEVEL]]) {
      this.transport.log(info[LEVEL], info.message, info, this._nop);
    }
    callback(null);
  };
  LegacyTransportStream.prototype._writev = function _writev(chunks, callback) {
    for (let i = 0;i < chunks.length; i++) {
      if (this._accept(chunks[i])) {
        this.transport.log(chunks[i].chunk[LEVEL], chunks[i].chunk.message, chunks[i].chunk, this._nop);
        chunks[i].callback();
      }
    }
    return callback(null);
  };
  LegacyTransportStream.prototype._deprecated = function _deprecated() {
    console.error([
      `${this.transport.name} is a legacy winston transport. Consider upgrading: `,
      "- Upgrade docs: https://github.com/winstonjs/winston/blob/master/UPGRADE-3.0.md"
    ].join(`
`));
  };
  LegacyTransportStream.prototype.close = function close() {
    if (this.transport.close) {
      this.transport.close();
    }
    if (this.transport.__winstonError) {
      this.transport.removeListener("error", this.transport.__winstonError);
      this.transport.__winstonError = null;
    }
  };
});

// node_modules/winston-transport/index.js
var require_winston_transport = __commonJS((exports, module) => {
  module.exports = require_modern();
  module.exports.LegacyTransportStream = require_legacy();
});

// node_modules/winston/lib/winston/transports/console.js
var require_console = __commonJS((exports, module) => {
  var os = import.meta.require("os");
  var { LEVEL, MESSAGE } = require_triple_beam();
  var TransportStream = require_winston_transport();
  module.exports = class Console extends TransportStream {
    constructor(options = {}) {
      super(options);
      this.name = options.name || "console";
      this.stderrLevels = this._stringArrayToSet(options.stderrLevels);
      this.consoleWarnLevels = this._stringArrayToSet(options.consoleWarnLevels);
      this.eol = typeof options.eol === "string" ? options.eol : os.EOL;
      this.forceConsole = options.forceConsole || false;
      this._consoleLog = console.log.bind(console);
      this._consoleWarn = console.warn.bind(console);
      this._consoleError = console.error.bind(console);
      this.setMaxListeners(30);
    }
    log(info, callback) {
      setImmediate(() => this.emit("logged", info));
      if (this.stderrLevels[info[LEVEL]]) {
        if (console._stderr && !this.forceConsole) {
          console._stderr.write(`${info[MESSAGE]}${this.eol}`);
        } else {
          this._consoleError(info[MESSAGE]);
        }
        if (callback) {
          callback();
        }
        return;
      } else if (this.consoleWarnLevels[info[LEVEL]]) {
        if (console._stderr && !this.forceConsole) {
          console._stderr.write(`${info[MESSAGE]}${this.eol}`);
        } else {
          this._consoleWarn(info[MESSAGE]);
        }
        if (callback) {
          callback();
        }
        return;
      }
      if (console._stdout && !this.forceConsole) {
        console._stdout.write(`${info[MESSAGE]}${this.eol}`);
      } else {
        this._consoleLog(info[MESSAGE]);
      }
      if (callback) {
        callback();
      }
    }
    _stringArrayToSet(strArray, errMsg) {
      if (!strArray)
        return {};
      errMsg = errMsg || "Cannot make set from type other than Array of string elements";
      if (!Array.isArray(strArray)) {
        throw new Error(errMsg);
      }
      return strArray.reduce((set3, el) => {
        if (typeof el !== "string") {
          throw new Error(errMsg);
        }
        set3[el] = true;
        return set3;
      }, {});
    }
  };
});

// node_modules/async/internal/isArrayLike.js
var require_isArrayLike = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isArrayLike;
  function isArrayLike(value2) {
    return value2 && typeof value2.length === "number" && value2.length >= 0 && value2.length % 1 === 0;
  }
  module.exports = exports.default;
});

// node_modules/async/internal/initialParams.js
var require_initialParams = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(fn) {
    return function(...args) {
      var callback = args.pop();
      return fn.call(this, args, callback);
    };
  };
  module.exports = exports.default;
});

// node_modules/async/internal/setImmediate.js
var require_setImmediate = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fallback = fallback;
  exports.wrap = wrap;
  var hasQueueMicrotask = exports.hasQueueMicrotask = typeof queueMicrotask === "function" && queueMicrotask;
  var hasSetImmediate = exports.hasSetImmediate = typeof setImmediate === "function" && setImmediate;
  var hasNextTick = exports.hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
  function fallback(fn) {
    setTimeout(fn, 0);
  }
  function wrap(defer) {
    return (fn, ...args) => defer(() => fn(...args));
  }
  var _defer;
  if (hasQueueMicrotask) {
    _defer = queueMicrotask;
  } else if (hasSetImmediate) {
    _defer = setImmediate;
  } else if (hasNextTick) {
    _defer = process.nextTick;
  } else {
    _defer = fallback;
  }
  exports.default = wrap(_defer);
});

// node_modules/async/asyncify.js
var require_asyncify = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = asyncify;
  var _initialParams = require_initialParams();
  var _initialParams2 = _interopRequireDefault(_initialParams);
  var _setImmediate = require_setImmediate();
  var _setImmediate2 = _interopRequireDefault(_setImmediate);
  var _wrapAsync = require_wrapAsync();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function asyncify(func) {
    if ((0, _wrapAsync.isAsync)(func)) {
      return function(...args) {
        const callback = args.pop();
        const promise3 = func.apply(this, args);
        return handlePromise(promise3, callback);
      };
    }
    return (0, _initialParams2.default)(function(args, callback) {
      var result;
      try {
        result = func.apply(this, args);
      } catch (e) {
        return callback(e);
      }
      if (result && typeof result.then === "function") {
        return handlePromise(result, callback);
      } else {
        callback(null, result);
      }
    });
  }
  function handlePromise(promise3, callback) {
    return promise3.then((value2) => {
      invokeCallback(callback, null, value2);
    }, (err) => {
      invokeCallback(callback, err && (err instanceof Error || err.message) ? err : new Error(err));
    });
  }
  function invokeCallback(callback, error4, value2) {
    try {
      callback(error4, value2);
    } catch (err) {
      (0, _setImmediate2.default)((e) => {
        throw e;
      }, err);
    }
  }
  module.exports = exports.default;
});

// node_modules/async/internal/wrapAsync.js
var require_wrapAsync = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isAsyncIterable = exports.isAsyncGenerator = exports.isAsync = undefined;
  var _asyncify = require_asyncify();
  var _asyncify2 = _interopRequireDefault(_asyncify);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function isAsync2(fn) {
    return fn[Symbol.toStringTag] === "AsyncFunction";
  }
  function isAsyncGenerator(fn) {
    return fn[Symbol.toStringTag] === "AsyncGenerator";
  }
  function isAsyncIterable(obj) {
    return typeof obj[Symbol.asyncIterator] === "function";
  }
  function wrapAsync(asyncFn) {
    if (typeof asyncFn !== "function")
      throw new Error("expected a function");
    return isAsync2(asyncFn) ? (0, _asyncify2.default)(asyncFn) : asyncFn;
  }
  exports.default = wrapAsync;
  exports.isAsync = isAsync2;
  exports.isAsyncGenerator = isAsyncGenerator;
  exports.isAsyncIterable = isAsyncIterable;
});

// node_modules/async/internal/awaitify.js
var require_awaitify = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = awaitify;
  function awaitify(asyncFn, arity) {
    if (!arity)
      arity = asyncFn.length;
    if (!arity)
      throw new Error("arity is undefined");
    function awaitable(...args) {
      if (typeof args[arity - 1] === "function") {
        return asyncFn.apply(this, args);
      }
      return new Promise((resolve, reject) => {
        args[arity - 1] = (err, ...cbArgs) => {
          if (err)
            return reject(err);
          resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
        };
        asyncFn.apply(this, args);
      });
    }
    return awaitable;
  }
  module.exports = exports.default;
});

// node_modules/async/internal/parallel.js
var require_parallel = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _isArrayLike = require_isArrayLike();
  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);
  var _wrapAsync = require_wrapAsync();
  var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
  var _awaitify = require_awaitify();
  var _awaitify2 = _interopRequireDefault(_awaitify);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = (0, _awaitify2.default)((eachfn, tasks, callback) => {
    var results = (0, _isArrayLike2.default)(tasks) ? [] : {};
    eachfn(tasks, (task, key, taskCb) => {
      (0, _wrapAsync2.default)(task)((err, ...result) => {
        if (result.length < 2) {
          [result] = result;
        }
        results[key] = result;
        taskCb(err);
      });
    }, (err) => callback(err, results));
  }, 3);
  module.exports = exports.default;
});

// node_modules/async/internal/once.js
var require_once = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = once;
  function once(fn) {
    function wrapper(...args) {
      if (fn === null)
        return;
      var callFn = fn;
      fn = null;
      callFn.apply(this, args);
    }
    Object.assign(wrapper, fn);
    return wrapper;
  }
  module.exports = exports.default;
});

// node_modules/async/internal/getIterator.js
var require_getIterator = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = function(coll) {
    return coll[Symbol.iterator] && coll[Symbol.iterator]();
  };
  module.exports = exports.default;
});

// node_modules/async/internal/iterator.js
var require_iterator = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createIterator;
  var _isArrayLike = require_isArrayLike();
  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);
  var _getIterator = require_getIterator();
  var _getIterator2 = _interopRequireDefault(_getIterator);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function createArrayIterator(coll) {
    var i = -1;
    var len = coll.length;
    return function next() {
      return ++i < len ? { value: coll[i], key: i } : null;
    };
  }
  function createES2015Iterator(iterator3) {
    var i = -1;
    return function next() {
      var item = iterator3.next();
      if (item.done)
        return null;
      i++;
      return { value: item.value, key: i };
    };
  }
  function createObjectIterator(obj) {
    var okeys = obj ? Object.keys(obj) : [];
    var i = -1;
    var len = okeys.length;
    return function next() {
      var key = okeys[++i];
      if (key === "__proto__") {
        return next();
      }
      return i < len ? { value: obj[key], key } : null;
    };
  }
  function createIterator(coll) {
    if ((0, _isArrayLike2.default)(coll)) {
      return createArrayIterator(coll);
    }
    var iterator3 = (0, _getIterator2.default)(coll);
    return iterator3 ? createES2015Iterator(iterator3) : createObjectIterator(coll);
  }
  module.exports = exports.default;
});

// node_modules/async/internal/onlyOnce.js
var require_onlyOnce = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = onlyOnce;
  function onlyOnce(fn) {
    return function(...args) {
      if (fn === null)
        throw new Error("Callback was already called.");
      var callFn = fn;
      fn = null;
      callFn.apply(this, args);
    };
  }
  module.exports = exports.default;
});

// node_modules/async/internal/breakLoop.js
var require_breakLoop = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var breakLoop = {};
  exports.default = breakLoop;
  module.exports = exports.default;
});

// node_modules/async/internal/asyncEachOfLimit.js
var require_asyncEachOfLimit = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = asyncEachOfLimit;
  var _breakLoop = require_breakLoop();
  var _breakLoop2 = _interopRequireDefault(_breakLoop);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function asyncEachOfLimit(generator, limit, iteratee, callback) {
    let done = false;
    let canceled = false;
    let awaiting = false;
    let running = 0;
    let idx = 0;
    function replenish() {
      if (running >= limit || awaiting || done)
        return;
      awaiting = true;
      generator.next().then(({ value: value2, done: iterDone }) => {
        if (canceled || done)
          return;
        awaiting = false;
        if (iterDone) {
          done = true;
          if (running <= 0) {
            callback(null);
          }
          return;
        }
        running++;
        iteratee(value2, idx, iterateeCallback);
        idx++;
        replenish();
      }).catch(handleError);
    }
    function iterateeCallback(err, result) {
      running -= 1;
      if (canceled)
        return;
      if (err)
        return handleError(err);
      if (err === false) {
        done = true;
        canceled = true;
        return;
      }
      if (result === _breakLoop2.default || done && running <= 0) {
        done = true;
        return callback(null);
      }
      replenish();
    }
    function handleError(err) {
      if (canceled)
        return;
      awaiting = false;
      done = true;
      callback(err);
    }
    replenish();
  }
  module.exports = exports.default;
});

// node_modules/async/internal/eachOfLimit.js
var require_eachOfLimit = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _once = require_once();
  var _once2 = _interopRequireDefault(_once);
  var _iterator = require_iterator();
  var _iterator2 = _interopRequireDefault(_iterator);
  var _onlyOnce = require_onlyOnce();
  var _onlyOnce2 = _interopRequireDefault(_onlyOnce);
  var _wrapAsync = require_wrapAsync();
  var _asyncEachOfLimit = require_asyncEachOfLimit();
  var _asyncEachOfLimit2 = _interopRequireDefault(_asyncEachOfLimit);
  var _breakLoop = require_breakLoop();
  var _breakLoop2 = _interopRequireDefault(_breakLoop);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = (limit) => {
    return (obj, iteratee, callback) => {
      callback = (0, _once2.default)(callback);
      if (limit <= 0) {
        throw new RangeError("concurrency limit cannot be less than 1");
      }
      if (!obj) {
        return callback(null);
      }
      if ((0, _wrapAsync.isAsyncGenerator)(obj)) {
        return (0, _asyncEachOfLimit2.default)(obj, limit, iteratee, callback);
      }
      if ((0, _wrapAsync.isAsyncIterable)(obj)) {
        return (0, _asyncEachOfLimit2.default)(obj[Symbol.asyncIterator](), limit, iteratee, callback);
      }
      var nextElem = (0, _iterator2.default)(obj);
      var done = false;
      var canceled = false;
      var running = 0;
      var looping = false;
      function iterateeCallback(err, value2) {
        if (canceled)
          return;
        running -= 1;
        if (err) {
          done = true;
          callback(err);
        } else if (err === false) {
          done = true;
          canceled = true;
        } else if (value2 === _breakLoop2.default || done && running <= 0) {
          done = true;
          return callback(null);
        } else if (!looping) {
          replenish();
        }
      }
      function replenish() {
        looping = true;
        while (running < limit && !done) {
          var elem = nextElem();
          if (elem === null) {
            done = true;
            if (running <= 0) {
              callback(null);
            }
            return;
          }
          running += 1;
          iteratee(elem.value, elem.key, (0, _onlyOnce2.default)(iterateeCallback));
        }
        looping = false;
      }
      replenish();
    };
  };
  module.exports = exports.default;
});

// node_modules/async/eachOfLimit.js
var require_eachOfLimit2 = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _eachOfLimit2 = require_eachOfLimit();
  var _eachOfLimit3 = _interopRequireDefault(_eachOfLimit2);
  var _wrapAsync = require_wrapAsync();
  var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
  var _awaitify = require_awaitify();
  var _awaitify2 = _interopRequireDefault(_awaitify);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function eachOfLimit(coll, limit, iteratee, callback) {
    return (0, _eachOfLimit3.default)(limit)(coll, (0, _wrapAsync2.default)(iteratee), callback);
  }
  exports.default = (0, _awaitify2.default)(eachOfLimit, 4);
  module.exports = exports.default;
});

// node_modules/async/eachOfSeries.js
var require_eachOfSeries = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _eachOfLimit = require_eachOfLimit2();
  var _eachOfLimit2 = _interopRequireDefault(_eachOfLimit);
  var _awaitify = require_awaitify();
  var _awaitify2 = _interopRequireDefault(_awaitify);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function eachOfSeries(coll, iteratee, callback) {
    return (0, _eachOfLimit2.default)(coll, 1, iteratee, callback);
  }
  exports.default = (0, _awaitify2.default)(eachOfSeries, 3);
  module.exports = exports.default;
});

// node_modules/async/series.js
var require_series = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = series;
  var _parallel2 = require_parallel();
  var _parallel3 = _interopRequireDefault(_parallel2);
  var _eachOfSeries = require_eachOfSeries();
  var _eachOfSeries2 = _interopRequireDefault(_eachOfSeries);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function series(tasks, callback) {
    return (0, _parallel3.default)(_eachOfSeries2.default, tasks, callback);
  }
  module.exports = exports.default;
});

// node_modules/readable-stream/lib/_stream_transform.js
var require__stream_transform = __commonJS((exports, module) => {
  module.exports = Transform2;
  var _require$codes = require_errors2().codes;
  var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
  var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
  var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
  var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
  var Duplex = require__stream_duplex();
  require_inherits()(Transform2, Duplex);
  function afterTransform(er, data) {
    var ts = this._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (cb === null) {
      return this.emit("error", new ERR_MULTIPLE_CALLBACK);
    }
    ts.writechunk = null;
    ts.writecb = null;
    if (data != null)
      this.push(data);
    cb(er);
    var rs = this._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      this._read(rs.highWaterMark);
    }
  }
  function Transform2(options) {
    if (!(this instanceof Transform2))
      return new Transform2(options);
    Duplex.call(this, options);
    this._transformState = {
      afterTransform: afterTransform.bind(this),
      needTransform: false,
      transforming: false,
      writecb: null,
      writechunk: null,
      writeencoding: null
    };
    this._readableState.needReadable = true;
    this._readableState.sync = false;
    if (options) {
      if (typeof options.transform === "function")
        this._transform = options.transform;
      if (typeof options.flush === "function")
        this._flush = options.flush;
    }
    this.on("prefinish", prefinish);
  }
  function prefinish() {
    var _this = this;
    if (typeof this._flush === "function" && !this._readableState.destroyed) {
      this._flush(function(er, data) {
        done(_this, er, data);
      });
    } else {
      done(this, null, null);
    }
  }
  Transform2.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };
  Transform2.prototype._transform = function(chunk, encoding, cb) {
    cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
  };
  Transform2.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
        this._read(rs.highWaterMark);
    }
  };
  Transform2.prototype._read = function(n) {
    var ts = this._transformState;
    if (ts.writechunk !== null && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      ts.needTransform = true;
    }
  };
  Transform2.prototype._destroy = function(err, cb) {
    Duplex.prototype._destroy.call(this, err, function(err2) {
      cb(err2);
    });
  };
  function done(stream, er, data) {
    if (er)
      return stream.emit("error", er);
    if (data != null)
      stream.push(data);
    if (stream._writableState.length)
      throw new ERR_TRANSFORM_WITH_LENGTH_0;
    if (stream._transformState.transforming)
      throw new ERR_TRANSFORM_ALREADY_TRANSFORMING;
    return stream.push(null);
  }
});

// node_modules/readable-stream/lib/_stream_passthrough.js
var require__stream_passthrough = __commonJS((exports, module) => {
  module.exports = PassThrough;
  var Transform2 = require__stream_transform();
  require_inherits()(PassThrough, Transform2);
  function PassThrough(options) {
    if (!(this instanceof PassThrough))
      return new PassThrough(options);
    Transform2.call(this, options);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
});

// node_modules/readable-stream/lib/internal/streams/pipeline.js
var require_pipeline = __commonJS((exports, module) => {
  var eos;
  function once(callback) {
    var called = false;
    return function() {
      if (called)
        return;
      called = true;
      callback.apply(undefined, arguments);
    };
  }
  var _require$codes = require_errors2().codes;
  var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
  var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
  function noop(err) {
    if (err)
      throw err;
  }
  function isRequest(stream) {
    return stream.setHeader && typeof stream.abort === "function";
  }
  function destroyer(stream, reading, writing, callback) {
    callback = once(callback);
    var closed = false;
    stream.on("close", function() {
      closed = true;
    });
    if (eos === undefined)
      eos = require_end_of_stream();
    eos(stream, {
      readable: reading,
      writable: writing
    }, function(err) {
      if (err)
        return callback(err);
      closed = true;
      callback();
    });
    var destroyed = false;
    return function(err) {
      if (closed)
        return;
      if (destroyed)
        return;
      destroyed = true;
      if (isRequest(stream))
        return stream.abort();
      if (typeof stream.destroy === "function")
        return stream.destroy();
      callback(err || new ERR_STREAM_DESTROYED("pipe"));
    };
  }
  function call(fn) {
    fn();
  }
  function pipe(from, to) {
    return from.pipe(to);
  }
  function popCallback(streams) {
    if (!streams.length)
      return noop;
    if (typeof streams[streams.length - 1] !== "function")
      return noop;
    return streams.pop();
  }
  function pipeline() {
    for (var _len = arguments.length, streams = new Array(_len), _key = 0;_key < _len; _key++) {
      streams[_key] = arguments[_key];
    }
    var callback = popCallback(streams);
    if (Array.isArray(streams[0]))
      streams = streams[0];
    if (streams.length < 2) {
      throw new ERR_MISSING_ARGS("streams");
    }
    var error4;
    var destroys = streams.map(function(stream, i) {
      var reading = i < streams.length - 1;
      var writing = i > 0;
      return destroyer(stream, reading, writing, function(err) {
        if (!error4)
          error4 = err;
        if (err)
          destroys.forEach(call);
        if (reading)
          return;
        destroys.forEach(call);
        callback(error4);
      });
    });
    return streams.reduce(pipe);
  }
  module.exports = pipeline;
});

// node_modules/readable-stream/readable.js
var require_readable = __commonJS((exports, module) => {
  var Stream = import.meta.require("stream");
  if (process.env.READABLE_STREAM === "disable" && Stream) {
    module.exports = Stream.Readable;
    Object.assign(module.exports, Stream);
    module.exports.Stream = Stream;
  } else {
    exports = module.exports = require__stream_readable();
    exports.Stream = Stream || exports;
    exports.Readable = exports;
    exports.Writable = require__stream_writable();
    exports.Duplex = require__stream_duplex();
    exports.Transform = require__stream_transform();
    exports.PassThrough = require__stream_passthrough();
    exports.finished = require_end_of_stream();
    exports.pipeline = require_pipeline();
  }
});

// node_modules/@dabh/diagnostics/diagnostics.js
var require_diagnostics = __commonJS((exports, module) => {
  var adapters = [];
  var modifiers = [];
  var logger = function devnull() {
  };
  function use(adapter) {
    if (~adapters.indexOf(adapter))
      return false;
    adapters.push(adapter);
    return true;
  }
  function set3(custom) {
    logger = custom;
  }
  function enabled(namespace) {
    var async = [];
    for (var i = 0;i < adapters.length; i++) {
      if (adapters[i].async) {
        async.push(adapters[i]);
        continue;
      }
      if (adapters[i](namespace))
        return true;
    }
    if (!async.length)
      return false;
    return new Promise(function pinky(resolve) {
      Promise.all(async.map(function prebind(fn) {
        return fn(namespace);
      })).then(function resolved(values) {
        resolve(values.some(Boolean));
      });
    });
  }
  function modify(fn) {
    if (~modifiers.indexOf(fn))
      return false;
    modifiers.push(fn);
    return true;
  }
  function write() {
    logger.apply(logger, arguments);
  }
  function process2(message) {
    for (var i = 0;i < modifiers.length; i++) {
      message = modifiers[i].apply(modifiers[i], arguments);
    }
    return message;
  }
  function introduce(fn, options) {
    var has2 = Object.prototype.hasOwnProperty;
    for (var key in options) {
      if (has2.call(options, key)) {
        fn[key] = options[key];
      }
    }
    return fn;
  }
  function nope(options) {
    options.enabled = false;
    options.modify = modify;
    options.set = set3;
    options.use = use;
    return introduce(function diagnopes() {
      return false;
    }, options);
  }
  function yep(options) {
    function diagnostics() {
      var args = Array.prototype.slice.call(arguments, 0);
      write.call(write, options, process2(args, options));
      return true;
    }
    options.enabled = true;
    options.modify = modify;
    options.set = set3;
    options.use = use;
    return introduce(diagnostics, options);
  }
  module.exports = function create(diagnostics) {
    diagnostics.introduce = introduce;
    diagnostics.enabled = enabled;
    diagnostics.process = process2;
    diagnostics.modify = modify;
    diagnostics.write = write;
    diagnostics.nope = nope;
    diagnostics.yep = yep;
    diagnostics.set = set3;
    diagnostics.use = use;
    return diagnostics;
  };
});

// node_modules/color-name/index.js
var require_color_name = __commonJS((exports, module) => {
  module.exports = {
    aliceblue: [240, 248, 255],
    antiquewhite: [250, 235, 215],
    aqua: [0, 255, 255],
    aquamarine: [127, 255, 212],
    azure: [240, 255, 255],
    beige: [245, 245, 220],
    bisque: [255, 228, 196],
    black: [0, 0, 0],
    blanchedalmond: [255, 235, 205],
    blue: [0, 0, 255],
    blueviolet: [138, 43, 226],
    brown: [165, 42, 42],
    burlywood: [222, 184, 135],
    cadetblue: [95, 158, 160],
    chartreuse: [127, 255, 0],
    chocolate: [210, 105, 30],
    coral: [255, 127, 80],
    cornflowerblue: [100, 149, 237],
    cornsilk: [255, 248, 220],
    crimson: [220, 20, 60],
    cyan: [0, 255, 255],
    darkblue: [0, 0, 139],
    darkcyan: [0, 139, 139],
    darkgoldenrod: [184, 134, 11],
    darkgray: [169, 169, 169],
    darkgreen: [0, 100, 0],
    darkgrey: [169, 169, 169],
    darkkhaki: [189, 183, 107],
    darkmagenta: [139, 0, 139],
    darkolivegreen: [85, 107, 47],
    darkorange: [255, 140, 0],
    darkorchid: [153, 50, 204],
    darkred: [139, 0, 0],
    darksalmon: [233, 150, 122],
    darkseagreen: [143, 188, 143],
    darkslateblue: [72, 61, 139],
    darkslategray: [47, 79, 79],
    darkslategrey: [47, 79, 79],
    darkturquoise: [0, 206, 209],
    darkviolet: [148, 0, 211],
    deeppink: [255, 20, 147],
    deepskyblue: [0, 191, 255],
    dimgray: [105, 105, 105],
    dimgrey: [105, 105, 105],
    dodgerblue: [30, 144, 255],
    firebrick: [178, 34, 34],
    floralwhite: [255, 250, 240],
    forestgreen: [34, 139, 34],
    fuchsia: [255, 0, 255],
    gainsboro: [220, 220, 220],
    ghostwhite: [248, 248, 255],
    gold: [255, 215, 0],
    goldenrod: [218, 165, 32],
    gray: [128, 128, 128],
    green: [0, 128, 0],
    greenyellow: [173, 255, 47],
    grey: [128, 128, 128],
    honeydew: [240, 255, 240],
    hotpink: [255, 105, 180],
    indianred: [205, 92, 92],
    indigo: [75, 0, 130],
    ivory: [255, 255, 240],
    khaki: [240, 230, 140],
    lavender: [230, 230, 250],
    lavenderblush: [255, 240, 245],
    lawngreen: [124, 252, 0],
    lemonchiffon: [255, 250, 205],
    lightblue: [173, 216, 230],
    lightcoral: [240, 128, 128],
    lightcyan: [224, 255, 255],
    lightgoldenrodyellow: [250, 250, 210],
    lightgray: [211, 211, 211],
    lightgreen: [144, 238, 144],
    lightgrey: [211, 211, 211],
    lightpink: [255, 182, 193],
    lightsalmon: [255, 160, 122],
    lightseagreen: [32, 178, 170],
    lightskyblue: [135, 206, 250],
    lightslategray: [119, 136, 153],
    lightslategrey: [119, 136, 153],
    lightsteelblue: [176, 196, 222],
    lightyellow: [255, 255, 224],
    lime: [0, 255, 0],
    limegreen: [50, 205, 50],
    linen: [250, 240, 230],
    magenta: [255, 0, 255],
    maroon: [128, 0, 0],
    mediumaquamarine: [102, 205, 170],
    mediumblue: [0, 0, 205],
    mediumorchid: [186, 85, 211],
    mediumpurple: [147, 112, 219],
    mediumseagreen: [60, 179, 113],
    mediumslateblue: [123, 104, 238],
    mediumspringgreen: [0, 250, 154],
    mediumturquoise: [72, 209, 204],
    mediumvioletred: [199, 21, 133],
    midnightblue: [25, 25, 112],
    mintcream: [245, 255, 250],
    mistyrose: [255, 228, 225],
    moccasin: [255, 228, 181],
    navajowhite: [255, 222, 173],
    navy: [0, 0, 128],
    oldlace: [253, 245, 230],
    olive: [128, 128, 0],
    olivedrab: [107, 142, 35],
    orange: [255, 165, 0],
    orangered: [255, 69, 0],
    orchid: [218, 112, 214],
    palegoldenrod: [238, 232, 170],
    palegreen: [152, 251, 152],
    paleturquoise: [175, 238, 238],
    palevioletred: [219, 112, 147],
    papayawhip: [255, 239, 213],
    peachpuff: [255, 218, 185],
    peru: [205, 133, 63],
    pink: [255, 192, 203],
    plum: [221, 160, 221],
    powderblue: [176, 224, 230],
    purple: [128, 0, 128],
    rebeccapurple: [102, 51, 153],
    red: [255, 0, 0],
    rosybrown: [188, 143, 143],
    royalblue: [65, 105, 225],
    saddlebrown: [139, 69, 19],
    salmon: [250, 128, 114],
    sandybrown: [244, 164, 96],
    seagreen: [46, 139, 87],
    seashell: [255, 245, 238],
    sienna: [160, 82, 45],
    silver: [192, 192, 192],
    skyblue: [135, 206, 235],
    slateblue: [106, 90, 205],
    slategray: [112, 128, 144],
    slategrey: [112, 128, 144],
    snow: [255, 250, 250],
    springgreen: [0, 255, 127],
    steelblue: [70, 130, 180],
    tan: [210, 180, 140],
    teal: [0, 128, 128],
    thistle: [216, 191, 216],
    tomato: [255, 99, 71],
    turquoise: [64, 224, 208],
    violet: [238, 130, 238],
    wheat: [245, 222, 179],
    white: [255, 255, 255],
    whitesmoke: [245, 245, 245],
    yellow: [255, 255, 0],
    yellowgreen: [154, 205, 50]
  };
});

// node_modules/is-arrayish/index.js
var require_is_arrayish = __commonJS((exports, module) => {
  module.exports = function isArrayish(obj) {
    if (!obj || typeof obj === "string") {
      return false;
    }
    return obj instanceof Array || Array.isArray(obj) || obj.length >= 0 && (obj.splice instanceof Function || Object.getOwnPropertyDescriptor(obj, obj.length - 1) && obj.constructor.name !== "String");
  };
});

// node_modules/simple-swizzle/index.js
var require_simple_swizzle = __commonJS((exports, module) => {
  var isArrayish = require_is_arrayish();
  var concat = Array.prototype.concat;
  var slice = Array.prototype.slice;
  var swizzle = module.exports = function swizzle(args) {
    var results = [];
    for (var i = 0, len = args.length;i < len; i++) {
      var arg = args[i];
      if (isArrayish(arg)) {
        results = concat.call(results, slice.call(arg));
      } else {
        results.push(arg);
      }
    }
    return results;
  };
  swizzle.wrap = function(fn) {
    return function() {
      return fn(swizzle(arguments));
    };
  };
});

// node_modules/color-string/index.js
var require_color_string = __commonJS((exports, module) => {
  var colorNames = require_color_name();
  var swizzle = require_simple_swizzle();
  var hasOwnProperty = Object.hasOwnProperty;
  var reverseNames = Object.create(null);
  for (name in colorNames) {
    if (hasOwnProperty.call(colorNames, name)) {
      reverseNames[colorNames[name]] = name;
    }
  }
  var name;
  var cs = module.exports = {
    to: {},
    get: {}
  };
  cs.get = function(string3) {
    var prefix = string3.substring(0, 3).toLowerCase();
    var val;
    var model;
    switch (prefix) {
      case "hsl":
        val = cs.get.hsl(string3);
        model = "hsl";
        break;
      case "hwb":
        val = cs.get.hwb(string3);
        model = "hwb";
        break;
      default:
        val = cs.get.rgb(string3);
        model = "rgb";
        break;
    }
    if (!val) {
      return null;
    }
    return { model, value: val };
  };
  cs.get.rgb = function(string3) {
    if (!string3) {
      return null;
    }
    var abbr = /^#([a-f0-9]{3,4})$/i;
    var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
    var rgba = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
    var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
    var keyword = /^(\w+)$/;
    var rgb = [0, 0, 0, 1];
    var match;
    var i;
    var hexAlpha;
    if (match = string3.match(hex)) {
      hexAlpha = match[2];
      match = match[1];
      for (i = 0;i < 3; i++) {
        var i2 = i * 2;
        rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
      }
      if (hexAlpha) {
        rgb[3] = parseInt(hexAlpha, 16) / 255;
      }
    } else if (match = string3.match(abbr)) {
      match = match[1];
      hexAlpha = match[3];
      for (i = 0;i < 3; i++) {
        rgb[i] = parseInt(match[i] + match[i], 16);
      }
      if (hexAlpha) {
        rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
      }
    } else if (match = string3.match(rgba)) {
      for (i = 0;i < 3; i++) {
        rgb[i] = parseInt(match[i + 1], 0);
      }
      if (match[4]) {
        if (match[5]) {
          rgb[3] = parseFloat(match[4]) * 0.01;
        } else {
          rgb[3] = parseFloat(match[4]);
        }
      }
    } else if (match = string3.match(per)) {
      for (i = 0;i < 3; i++) {
        rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
      }
      if (match[4]) {
        if (match[5]) {
          rgb[3] = parseFloat(match[4]) * 0.01;
        } else {
          rgb[3] = parseFloat(match[4]);
        }
      }
    } else if (match = string3.match(keyword)) {
      if (match[1] === "transparent") {
        return [0, 0, 0, 0];
      }
      if (!hasOwnProperty.call(colorNames, match[1])) {
        return null;
      }
      rgb = colorNames[match[1]];
      rgb[3] = 1;
      return rgb;
    } else {
      return null;
    }
    for (i = 0;i < 3; i++) {
      rgb[i] = clamp(rgb[i], 0, 255);
    }
    rgb[3] = clamp(rgb[3], 0, 1);
    return rgb;
  };
  cs.get.hsl = function(string3) {
    if (!string3) {
      return null;
    }
    var hsl = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
    var match = string3.match(hsl);
    if (match) {
      var alpha = parseFloat(match[4]);
      var h = (parseFloat(match[1]) % 360 + 360) % 360;
      var s = clamp(parseFloat(match[2]), 0, 100);
      var l = clamp(parseFloat(match[3]), 0, 100);
      var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, s, l, a];
    }
    return null;
  };
  cs.get.hwb = function(string3) {
    if (!string3) {
      return null;
    }
    var hwb = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
    var match = string3.match(hwb);
    if (match) {
      var alpha = parseFloat(match[4]);
      var h = (parseFloat(match[1]) % 360 + 360) % 360;
      var w = clamp(parseFloat(match[2]), 0, 100);
      var b = clamp(parseFloat(match[3]), 0, 100);
      var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
      return [h, w, b, a];
    }
    return null;
  };
  cs.to.hex = function() {
    var rgba = swizzle(arguments);
    return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : "");
  };
  cs.to.rgb = function() {
    var rgba = swizzle(arguments);
    return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ")" : "rgba(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ", " + rgba[3] + ")";
  };
  cs.to.rgb.percent = function() {
    var rgba = swizzle(arguments);
    var r = Math.round(rgba[0] / 255 * 100);
    var g = Math.round(rgba[1] / 255 * 100);
    var b = Math.round(rgba[2] / 255 * 100);
    return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + r + "%, " + g + "%, " + b + "%)" : "rgba(" + r + "%, " + g + "%, " + b + "%, " + rgba[3] + ")";
  };
  cs.to.hsl = function() {
    var hsla = swizzle(arguments);
    return hsla.length < 4 || hsla[3] === 1 ? "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)" : "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
  };
  cs.to.hwb = function() {
    var hwba = swizzle(arguments);
    var a = "";
    if (hwba.length >= 4 && hwba[3] !== 1) {
      a = ", " + hwba[3];
    }
    return "hwb(" + hwba[0] + ", " + hwba[1] + "%, " + hwba[2] + "%" + a + ")";
  };
  cs.to.keyword = function(rgb) {
    return reverseNames[rgb.slice(0, 3)];
  };
  function clamp(num, min, max) {
    return Math.min(Math.max(min, num), max);
  }
  function hexDouble(num) {
    var str = Math.round(num).toString(16).toUpperCase();
    return str.length < 2 ? "0" + str : str;
  }
});

// node_modules/color-convert/conversions.js
var require_conversions = __commonJS((exports, module) => {
  var cssKeywords = require_color_name();
  var reverseKeywords = {};
  for (key in cssKeywords) {
    if (cssKeywords.hasOwnProperty(key)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
  }
  var key;
  var convert3 = module.exports = {
    rgb: { channels: 3, labels: "rgb" },
    hsl: { channels: 3, labels: "hsl" },
    hsv: { channels: 3, labels: "hsv" },
    hwb: { channels: 3, labels: "hwb" },
    cmyk: { channels: 4, labels: "cmyk" },
    xyz: { channels: 3, labels: "xyz" },
    lab: { channels: 3, labels: "lab" },
    lch: { channels: 3, labels: "lch" },
    hex: { channels: 1, labels: ["hex"] },
    keyword: { channels: 1, labels: ["keyword"] },
    ansi16: { channels: 1, labels: ["ansi16"] },
    ansi256: { channels: 1, labels: ["ansi256"] },
    hcg: { channels: 3, labels: ["h", "c", "g"] },
    apple: { channels: 3, labels: ["r16", "g16", "b16"] },
    gray: { channels: 1, labels: ["gray"] }
  };
  for (model in convert3) {
    if (convert3.hasOwnProperty(model)) {
      if (!("channels" in convert3[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert3[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert3[model].labels.length !== convert3[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      channels = convert3[model].channels;
      labels = convert3[model].labels;
      delete convert3[model].channels;
      delete convert3[model].labels;
      Object.defineProperty(convert3[model], "channels", { value: channels });
      Object.defineProperty(convert3[model], "labels", { value: labels });
    }
  }
  var channels;
  var labels;
  var model;
  convert3.rgb.hsl = function(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta3 = max - min;
    var h;
    var s;
    var l;
    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta3;
    } else if (g === max) {
      h = 2 + (b - r) / delta3;
    } else if (b === max) {
      h = 4 + (r - g) / delta3;
    }
    h = Math.min(h * 60, 360);
    if (h < 0) {
      h += 360;
    }
    l = (min + max) / 2;
    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta3 / (max + min);
    } else {
      s = delta3 / (2 - max - min);
    }
    return [h, s * 100, l * 100];
  };
  convert3.rgb.hsv = function(rgb) {
    var rdif;
    var gdif;
    var bdif;
    var h;
    var s;
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var v = Math.max(r, g, b);
    var diff = v - Math.min(r, g, b);
    var diffc = function(c) {
      return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
      h = s = 0;
    } else {
      s = diff / v;
      rdif = diffc(r);
      gdif = diffc(g);
      bdif = diffc(b);
      if (r === v) {
        h = bdif - gdif;
      } else if (g === v) {
        h = 1 / 3 + rdif - bdif;
      } else if (b === v) {
        h = 2 / 3 + gdif - rdif;
      }
      if (h < 0) {
        h += 1;
      } else if (h > 1) {
        h -= 1;
      }
    }
    return [
      h * 360,
      s * 100,
      v * 100
    ];
  };
  convert3.rgb.hwb = function(rgb) {
    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[2];
    var h = convert3.rgb.hsl(rgb)[0];
    var w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [h, w * 100, b * 100];
  };
  convert3.rgb.cmyk = function(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var c;
    var m;
    var y;
    var k;
    k = Math.min(1 - r, 1 - g, 1 - b);
    c = (1 - r - k) / (1 - k) || 0;
    m = (1 - g - k) / (1 - k) || 0;
    y = (1 - b - k) / (1 - k) || 0;
    return [c * 100, m * 100, y * 100, k * 100];
  };
  function comparativeDistance(x, y) {
    return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
  }
  convert3.rgb.keyword = function(rgb) {
    var reversed = reverseKeywords[rgb];
    if (reversed) {
      return reversed;
    }
    var currentClosestDistance = Infinity;
    var currentClosestKeyword;
    for (var keyword in cssKeywords) {
      if (cssKeywords.hasOwnProperty(keyword)) {
        var value2 = cssKeywords[keyword];
        var distance = comparativeDistance(rgb, value2);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
    }
    return currentClosestKeyword;
  };
  convert3.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
  };
  convert3.rgb.xyz = function(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x * 100, y * 100, z * 100];
  };
  convert3.rgb.lab = function(rgb) {
    var xyz = convert3.rgb.xyz(rgb);
    var x = xyz[0];
    var y = xyz[1];
    var z = xyz[2];
    var l;
    var a;
    var b;
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
    l = 116 * y - 16;
    a = 500 * (x - y);
    b = 200 * (y - z);
    return [l, a, b];
  };
  convert3.hsl.rgb = function(hsl) {
    var h = hsl[0] / 360;
    var s = hsl[1] / 100;
    var l = hsl[2] / 100;
    var t1;
    var t2;
    var t3;
    var rgb;
    var val;
    if (s === 0) {
      val = l * 255;
      return [val, val, val];
    }
    if (l < 0.5) {
      t2 = l * (1 + s);
    } else {
      t2 = l + s - l * s;
    }
    t1 = 2 * l - t2;
    rgb = [0, 0, 0];
    for (var i = 0;i < 3; i++) {
      t3 = h + 1 / 3 * -(i - 1);
      if (t3 < 0) {
        t3++;
      }
      if (t3 > 1) {
        t3--;
      }
      if (6 * t3 < 1) {
        val = t1 + (t2 - t1) * 6 * t3;
      } else if (2 * t3 < 1) {
        val = t2;
      } else if (3 * t3 < 2) {
        val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
      } else {
        val = t1;
      }
      rgb[i] = val * 255;
    }
    return rgb;
  };
  convert3.hsl.hsv = function(hsl) {
    var h = hsl[0];
    var s = hsl[1] / 100;
    var l = hsl[2] / 100;
    var smin = s;
    var lmin = Math.max(l, 0.01);
    var sv;
    var v;
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    v = (l + s) / 2;
    sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [h, sv * 100, v * 100];
  };
  convert3.hsv.rgb = function(hsv) {
    var h = hsv[0] / 60;
    var s = hsv[1] / 100;
    var v = hsv[2] / 100;
    var hi = Math.floor(h) % 6;
    var f = h - Math.floor(h);
    var p = 255 * v * (1 - s);
    var q = 255 * v * (1 - s * f);
    var t2 = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch (hi) {
      case 0:
        return [v, t2, p];
      case 1:
        return [q, v, p];
      case 2:
        return [p, v, t2];
      case 3:
        return [p, q, v];
      case 4:
        return [t2, p, v];
      case 5:
        return [v, p, q];
    }
  };
  convert3.hsv.hsl = function(hsv) {
    var h = hsv[0];
    var s = hsv[1] / 100;
    var v = hsv[2] / 100;
    var vmin = Math.max(v, 0.01);
    var lmin;
    var sl;
    var l;
    l = (2 - s) * v;
    lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [h, sl * 100, l * 100];
  };
  convert3.hwb.rgb = function(hwb) {
    var h = hwb[0] / 360;
    var wh = hwb[1] / 100;
    var bl = hwb[2] / 100;
    var ratio = wh + bl;
    var i;
    var v;
    var f;
    var n;
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }
    i = Math.floor(6 * h);
    v = 1 - bl;
    f = 6 * h - i;
    if ((i & 1) !== 0) {
      f = 1 - f;
    }
    n = wh + f * (v - wh);
    var r;
    var g;
    var b;
    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }
    return [r * 255, g * 255, b * 255];
  };
  convert3.cmyk.rgb = function(cmyk) {
    var c = cmyk[0] / 100;
    var m = cmyk[1] / 100;
    var y = cmyk[2] / 100;
    var k = cmyk[3] / 100;
    var r;
    var g;
    var b;
    r = 1 - Math.min(1, c * (1 - k) + k);
    g = 1 - Math.min(1, m * (1 - k) + k);
    b = 1 - Math.min(1, y * (1 - k) + k);
    return [r * 255, g * 255, b * 255];
  };
  convert3.xyz.rgb = function(xyz) {
    var x = xyz[0] / 100;
    var y = xyz[1] / 100;
    var z = xyz[2] / 100;
    var r;
    var g;
    var b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92;
    g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92;
    b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [r * 255, g * 255, b * 255];
  };
  convert3.xyz.lab = function(xyz) {
    var x = xyz[0];
    var y = xyz[1];
    var z = xyz[2];
    var l;
    var a;
    var b;
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
    l = 116 * y - 16;
    a = 500 * (x - y);
    b = 200 * (y - z);
    return [l, a, b];
  };
  convert3.lab.xyz = function(lab) {
    var l = lab[0];
    var a = lab[1];
    var b = lab[2];
    var x;
    var y;
    var z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    var y2 = Math.pow(y, 3);
    var x2 = Math.pow(x, 3);
    var z2 = Math.pow(z, 3);
    y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [x, y, z];
  };
  convert3.lab.lch = function(lab) {
    var l = lab[0];
    var a = lab[1];
    var b = lab[2];
    var hr;
    var h;
    var c;
    hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  };
  convert3.lch.lab = function(lch) {
    var l = lch[0];
    var c = lch[1];
    var h = lch[2];
    var a;
    var b;
    var hr;
    hr = h / 360 * 2 * Math.PI;
    a = c * Math.cos(hr);
    b = c * Math.sin(hr);
    return [l, a, b];
  };
  convert3.rgb.ansi16 = function(args) {
    var r = args[0];
    var g = args[1];
    var b = args[2];
    var value2 = 1 in arguments ? arguments[1] : convert3.rgb.hsv(args)[2];
    value2 = Math.round(value2 / 50);
    if (value2 === 0) {
      return 30;
    }
    var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value2 === 2) {
      ansi += 60;
    }
    return ansi;
  };
  convert3.hsv.ansi16 = function(args) {
    return convert3.rgb.ansi16(convert3.hsv.rgb(args), args[2]);
  };
  convert3.rgb.ansi256 = function(args) {
    var r = args[0];
    var g = args[1];
    var b = args[2];
    if (r === g && g === b) {
      if (r < 8) {
        return 16;
      }
      if (r > 248) {
        return 231;
      }
      return Math.round((r - 8) / 247 * 24) + 232;
    }
    var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
  };
  convert3.ansi16.rgb = function(args) {
    var color = args % 10;
    if (color === 0 || color === 7) {
      if (args > 50) {
        color += 3.5;
      }
      color = color / 10.5 * 255;
      return [color, color, color];
    }
    var mult = (~~(args > 50) + 1) * 0.5;
    var r = (color & 1) * mult * 255;
    var g = (color >> 1 & 1) * mult * 255;
    var b = (color >> 2 & 1) * mult * 255;
    return [r, g, b];
  };
  convert3.ansi256.rgb = function(args) {
    if (args >= 232) {
      var c = (args - 232) * 10 + 8;
      return [c, c, c];
    }
    args -= 16;
    var rem;
    var r = Math.floor(args / 36) / 5 * 255;
    var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    var b = rem % 6 / 5 * 255;
    return [r, g, b];
  };
  convert3.rgb.hex = function(args) {
    var integer3 = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
    var string3 = integer3.toString(16).toUpperCase();
    return "000000".substring(string3.length) + string3;
  };
  convert3.hex.rgb = function(args) {
    var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) {
      return [0, 0, 0];
    }
    var colorString = match[0];
    if (match[0].length === 3) {
      colorString = colorString.split("").map(function(char) {
        return char + char;
      }).join("");
    }
    var integer3 = parseInt(colorString, 16);
    var r = integer3 >> 16 & 255;
    var g = integer3 >> 8 & 255;
    var b = integer3 & 255;
    return [r, g, b];
  };
  convert3.rgb.hcg = function(rgb) {
    var r = rgb[0] / 255;
    var g = rgb[1] / 255;
    var b = rgb[2] / 255;
    var max = Math.max(Math.max(r, g), b);
    var min = Math.min(Math.min(r, g), b);
    var chroma = max - min;
    var grayscale;
    var hue;
    if (chroma < 1) {
      grayscale = min / (1 - chroma);
    } else {
      grayscale = 0;
    }
    if (chroma <= 0) {
      hue = 0;
    } else if (max === r) {
      hue = (g - b) / chroma % 6;
    } else if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma + 4;
    }
    hue /= 6;
    hue %= 1;
    return [hue * 360, chroma * 100, grayscale * 100];
  };
  convert3.hsl.hcg = function(hsl) {
    var s = hsl[1] / 100;
    var l = hsl[2] / 100;
    var c = 1;
    var f = 0;
    if (l < 0.5) {
      c = 2 * s * l;
    } else {
      c = 2 * s * (1 - l);
    }
    if (c < 1) {
      f = (l - 0.5 * c) / (1 - c);
    }
    return [hsl[0], c * 100, f * 100];
  };
  convert3.hsv.hcg = function(hsv) {
    var s = hsv[1] / 100;
    var v = hsv[2] / 100;
    var c = s * v;
    var f = 0;
    if (c < 1) {
      f = (v - c) / (1 - c);
    }
    return [hsv[0], c * 100, f * 100];
  };
  convert3.hcg.rgb = function(hcg) {
    var h = hcg[0] / 360;
    var c = hcg[1] / 100;
    var g = hcg[2] / 100;
    if (c === 0) {
      return [g * 255, g * 255, g * 255];
    }
    var pure = [0, 0, 0];
    var hi = h % 1 * 6;
    var v = hi % 1;
    var w = 1 - v;
    var mg = 0;
    switch (Math.floor(hi)) {
      case 0:
        pure[0] = 1;
        pure[1] = v;
        pure[2] = 0;
        break;
      case 1:
        pure[0] = w;
        pure[1] = 1;
        pure[2] = 0;
        break;
      case 2:
        pure[0] = 0;
        pure[1] = 1;
        pure[2] = v;
        break;
      case 3:
        pure[0] = 0;
        pure[1] = w;
        pure[2] = 1;
        break;
      case 4:
        pure[0] = v;
        pure[1] = 0;
        pure[2] = 1;
        break;
      default:
        pure[0] = 1;
        pure[1] = 0;
        pure[2] = w;
    }
    mg = (1 - c) * g;
    return [
      (c * pure[0] + mg) * 255,
      (c * pure[1] + mg) * 255,
      (c * pure[2] + mg) * 255
    ];
  };
  convert3.hcg.hsv = function(hcg) {
    var c = hcg[1] / 100;
    var g = hcg[2] / 100;
    var v = c + g * (1 - c);
    var f = 0;
    if (v > 0) {
      f = c / v;
    }
    return [hcg[0], f * 100, v * 100];
  };
  convert3.hcg.hsl = function(hcg) {
    var c = hcg[1] / 100;
    var g = hcg[2] / 100;
    var l = g * (1 - c) + 0.5 * c;
    var s = 0;
    if (l > 0 && l < 0.5) {
      s = c / (2 * l);
    } else if (l >= 0.5 && l < 1) {
      s = c / (2 * (1 - l));
    }
    return [hcg[0], s * 100, l * 100];
  };
  convert3.hcg.hwb = function(hcg) {
    var c = hcg[1] / 100;
    var g = hcg[2] / 100;
    var v = c + g * (1 - c);
    return [hcg[0], (v - c) * 100, (1 - v) * 100];
  };
  convert3.hwb.hcg = function(hwb) {
    var w = hwb[1] / 100;
    var b = hwb[2] / 100;
    var v = 1 - b;
    var c = v - w;
    var g = 0;
    if (c < 1) {
      g = (v - c) / (1 - c);
    }
    return [hwb[0], c * 100, g * 100];
  };
  convert3.apple.rgb = function(apple) {
    return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
  };
  convert3.rgb.apple = function(rgb) {
    return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
  };
  convert3.gray.rgb = function(args) {
    return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
  };
  convert3.gray.hsl = convert3.gray.hsv = function(args) {
    return [0, 0, args[0]];
  };
  convert3.gray.hwb = function(gray) {
    return [0, 100, gray[0]];
  };
  convert3.gray.cmyk = function(gray) {
    return [0, 0, 0, gray[0]];
  };
  convert3.gray.lab = function(gray) {
    return [gray[0], 0, 0];
  };
  convert3.gray.hex = function(gray) {
    var val = Math.round(gray[0] / 100 * 255) & 255;
    var integer3 = (val << 16) + (val << 8) + val;
    var string3 = integer3.toString(16).toUpperCase();
    return "000000".substring(string3.length) + string3;
  };
  convert3.rgb.gray = function(rgb) {
    var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [val / 255 * 100];
  };
});

// node_modules/color-convert/route.js
var require_route = __commonJS((exports, module) => {
  var conversions = require_conversions();
  function buildGraph() {
    var graph = {};
    var models = Object.keys(conversions);
    for (var len = models.length, i = 0;i < len; i++) {
      graph[models[i]] = {
        distance: -1,
        parent: null
      };
    }
    return graph;
  }
  function deriveBFS(fromModel) {
    var graph = buildGraph();
    var queue = [fromModel];
    graph[fromModel].distance = 0;
    while (queue.length) {
      var current = queue.pop();
      var adjacents = Object.keys(conversions[current]);
      for (var len = adjacents.length, i = 0;i < len; i++) {
        var adjacent = adjacents[i];
        var node = graph[adjacent];
        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }
    return graph;
  }
  function link(from, to) {
    return function(args) {
      return to(from(args));
    };
  }
  function wrapConversion(toModel, graph) {
    var path = [graph[toModel].parent, toModel];
    var fn = conversions[graph[toModel].parent][toModel];
    var cur = graph[toModel].parent;
    while (graph[cur].parent) {
      path.unshift(graph[cur].parent);
      fn = link(conversions[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
  }
  module.exports = function(fromModel) {
    var graph = deriveBFS(fromModel);
    var conversion = {};
    var models = Object.keys(graph);
    for (var len = models.length, i = 0;i < len; i++) {
      var toModel = models[i];
      var node = graph[toModel];
      if (node.parent === null) {
        continue;
      }
      conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
  };
});

// node_modules/color-convert/index.js
var require_color_convert = __commonJS((exports, module) => {
  var conversions = require_conversions();
  var route = require_route();
  var convert3 = {};
  var models = Object.keys(conversions);
  function wrapRaw(fn) {
    var wrappedFn = function(args) {
      if (args === undefined || args === null) {
        return args;
      }
      if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments);
      }
      return fn(args);
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  function wrapRounded(fn) {
    var wrappedFn = function(args) {
      if (args === undefined || args === null) {
        return args;
      }
      if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments);
      }
      var result = fn(args);
      if (typeof result === "object") {
        for (var len = result.length, i = 0;i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }
      return result;
    };
    if ("conversion" in fn) {
      wrappedFn.conversion = fn.conversion;
    }
    return wrappedFn;
  }
  models.forEach(function(fromModel) {
    convert3[fromModel] = {};
    Object.defineProperty(convert3[fromModel], "channels", { value: conversions[fromModel].channels });
    Object.defineProperty(convert3[fromModel], "labels", { value: conversions[fromModel].labels });
    var routes = route(fromModel);
    var routeModels = Object.keys(routes);
    routeModels.forEach(function(toModel) {
      var fn = routes[toModel];
      convert3[fromModel][toModel] = wrapRounded(fn);
      convert3[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  module.exports = convert3;
});

// node_modules/color/index.js
var require_color = __commonJS((exports, module) => {
  var colorString = require_color_string();
  var convert3 = require_color_convert();
  var _slice = [].slice;
  var skippedModels = [
    "keyword",
    "gray",
    "hex"
  ];
  var hashedModelKeys = {};
  Object.keys(convert3).forEach(function(model) {
    hashedModelKeys[_slice.call(convert3[model].labels).sort().join("")] = model;
  });
  var limiters = {};
  function Color(obj, model) {
    if (!(this instanceof Color)) {
      return new Color(obj, model);
    }
    if (model && model in skippedModels) {
      model = null;
    }
    if (model && !(model in convert3)) {
      throw new Error("Unknown model: " + model);
    }
    var i;
    var channels;
    if (obj == null) {
      this.model = "rgb";
      this.color = [0, 0, 0];
      this.valpha = 1;
    } else if (obj instanceof Color) {
      this.model = obj.model;
      this.color = obj.color.slice();
      this.valpha = obj.valpha;
    } else if (typeof obj === "string") {
      var result = colorString.get(obj);
      if (result === null) {
        throw new Error("Unable to parse color from string: " + obj);
      }
      this.model = result.model;
      channels = convert3[this.model].channels;
      this.color = result.value.slice(0, channels);
      this.valpha = typeof result.value[channels] === "number" ? result.value[channels] : 1;
    } else if (obj.length) {
      this.model = model || "rgb";
      channels = convert3[this.model].channels;
      var newArr = _slice.call(obj, 0, channels);
      this.color = zeroArray(newArr, channels);
      this.valpha = typeof obj[channels] === "number" ? obj[channels] : 1;
    } else if (typeof obj === "number") {
      obj &= 16777215;
      this.model = "rgb";
      this.color = [
        obj >> 16 & 255,
        obj >> 8 & 255,
        obj & 255
      ];
      this.valpha = 1;
    } else {
      this.valpha = 1;
      var keys = Object.keys(obj);
      if ("alpha" in obj) {
        keys.splice(keys.indexOf("alpha"), 1);
        this.valpha = typeof obj.alpha === "number" ? obj.alpha : 0;
      }
      var hashedKeys = keys.sort().join("");
      if (!(hashedKeys in hashedModelKeys)) {
        throw new Error("Unable to parse color from object: " + JSON.stringify(obj));
      }
      this.model = hashedModelKeys[hashedKeys];
      var labels = convert3[this.model].labels;
      var color = [];
      for (i = 0;i < labels.length; i++) {
        color.push(obj[labels[i]]);
      }
      this.color = zeroArray(color);
    }
    if (limiters[this.model]) {
      channels = convert3[this.model].channels;
      for (i = 0;i < channels; i++) {
        var limit = limiters[this.model][i];
        if (limit) {
          this.color[i] = limit(this.color[i]);
        }
      }
    }
    this.valpha = Math.max(0, Math.min(1, this.valpha));
    if (Object.freeze) {
      Object.freeze(this);
    }
  }
  Color.prototype = {
    toString: function() {
      return this.string();
    },
    toJSON: function() {
      return this[this.model]();
    },
    string: function(places) {
      var self2 = this.model in colorString.to ? this : this.rgb();
      self2 = self2.round(typeof places === "number" ? places : 1);
      var args = self2.valpha === 1 ? self2.color : self2.color.concat(this.valpha);
      return colorString.to[self2.model](args);
    },
    percentString: function(places) {
      var self2 = this.rgb().round(typeof places === "number" ? places : 1);
      var args = self2.valpha === 1 ? self2.color : self2.color.concat(this.valpha);
      return colorString.to.rgb.percent(args);
    },
    array: function() {
      return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
    },
    object: function() {
      var result = {};
      var channels = convert3[this.model].channels;
      var labels = convert3[this.model].labels;
      for (var i = 0;i < channels; i++) {
        result[labels[i]] = this.color[i];
      }
      if (this.valpha !== 1) {
        result.alpha = this.valpha;
      }
      return result;
    },
    unitArray: function() {
      var rgb = this.rgb().color;
      rgb[0] /= 255;
      rgb[1] /= 255;
      rgb[2] /= 255;
      if (this.valpha !== 1) {
        rgb.push(this.valpha);
      }
      return rgb;
    },
    unitObject: function() {
      var rgb = this.rgb().object();
      rgb.r /= 255;
      rgb.g /= 255;
      rgb.b /= 255;
      if (this.valpha !== 1) {
        rgb.alpha = this.valpha;
      }
      return rgb;
    },
    round: function(places) {
      places = Math.max(places || 0, 0);
      return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
    },
    alpha: function(val) {
      if (arguments.length) {
        return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
      }
      return this.valpha;
    },
    red: getset("rgb", 0, maxfn(255)),
    green: getset("rgb", 1, maxfn(255)),
    blue: getset("rgb", 2, maxfn(255)),
    hue: getset(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, function(val) {
      return (val % 360 + 360) % 360;
    }),
    saturationl: getset("hsl", 1, maxfn(100)),
    lightness: getset("hsl", 2, maxfn(100)),
    saturationv: getset("hsv", 1, maxfn(100)),
    value: getset("hsv", 2, maxfn(100)),
    chroma: getset("hcg", 1, maxfn(100)),
    gray: getset("hcg", 2, maxfn(100)),
    white: getset("hwb", 1, maxfn(100)),
    wblack: getset("hwb", 2, maxfn(100)),
    cyan: getset("cmyk", 0, maxfn(100)),
    magenta: getset("cmyk", 1, maxfn(100)),
    yellow: getset("cmyk", 2, maxfn(100)),
    black: getset("cmyk", 3, maxfn(100)),
    x: getset("xyz", 0, maxfn(100)),
    y: getset("xyz", 1, maxfn(100)),
    z: getset("xyz", 2, maxfn(100)),
    l: getset("lab", 0, maxfn(100)),
    a: getset("lab", 1),
    b: getset("lab", 2),
    keyword: function(val) {
      if (arguments.length) {
        return new Color(val);
      }
      return convert3[this.model].keyword(this.color);
    },
    hex: function(val) {
      if (arguments.length) {
        return new Color(val);
      }
      return colorString.to.hex(this.rgb().round().color);
    },
    rgbNumber: function() {
      var rgb = this.rgb().color;
      return (rgb[0] & 255) << 16 | (rgb[1] & 255) << 8 | rgb[2] & 255;
    },
    luminosity: function() {
      var rgb = this.rgb().color;
      var lum = [];
      for (var i = 0;i < rgb.length; i++) {
        var chan = rgb[i] / 255;
        lum[i] = chan <= 0.03928 ? chan / 12.92 : Math.pow((chan + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
    },
    contrast: function(color2) {
      var lum1 = this.luminosity();
      var lum2 = color2.luminosity();
      if (lum1 > lum2) {
        return (lum1 + 0.05) / (lum2 + 0.05);
      }
      return (lum2 + 0.05) / (lum1 + 0.05);
    },
    level: function(color2) {
      var contrastRatio = this.contrast(color2);
      if (contrastRatio >= 7.1) {
        return "AAA";
      }
      return contrastRatio >= 4.5 ? "AA" : "";
    },
    isDark: function() {
      var rgb = this.rgb().color;
      var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
      return yiq < 128;
    },
    isLight: function() {
      return !this.isDark();
    },
    negate: function() {
      var rgb = this.rgb();
      for (var i = 0;i < 3; i++) {
        rgb.color[i] = 255 - rgb.color[i];
      }
      return rgb;
    },
    lighten: function(ratio) {
      var hsl = this.hsl();
      hsl.color[2] += hsl.color[2] * ratio;
      return hsl;
    },
    darken: function(ratio) {
      var hsl = this.hsl();
      hsl.color[2] -= hsl.color[2] * ratio;
      return hsl;
    },
    saturate: function(ratio) {
      var hsl = this.hsl();
      hsl.color[1] += hsl.color[1] * ratio;
      return hsl;
    },
    desaturate: function(ratio) {
      var hsl = this.hsl();
      hsl.color[1] -= hsl.color[1] * ratio;
      return hsl;
    },
    whiten: function(ratio) {
      var hwb = this.hwb();
      hwb.color[1] += hwb.color[1] * ratio;
      return hwb;
    },
    blacken: function(ratio) {
      var hwb = this.hwb();
      hwb.color[2] += hwb.color[2] * ratio;
      return hwb;
    },
    grayscale: function() {
      var rgb = this.rgb().color;
      var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
      return Color.rgb(val, val, val);
    },
    fade: function(ratio) {
      return this.alpha(this.valpha - this.valpha * ratio);
    },
    opaquer: function(ratio) {
      return this.alpha(this.valpha + this.valpha * ratio);
    },
    rotate: function(degrees) {
      var hsl = this.hsl();
      var hue = hsl.color[0];
      hue = (hue + degrees) % 360;
      hue = hue < 0 ? 360 + hue : hue;
      hsl.color[0] = hue;
      return hsl;
    },
    mix: function(mixinColor, weight) {
      if (!mixinColor || !mixinColor.rgb) {
        throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
      }
      var color1 = mixinColor.rgb();
      var color2 = this.rgb();
      var p = weight === undefined ? 0.5 : weight;
      var w = 2 * p - 1;
      var a = color1.alpha() - color2.alpha();
      var w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
      var w2 = 1 - w1;
      return Color.rgb(w1 * color1.red() + w2 * color2.red(), w1 * color1.green() + w2 * color2.green(), w1 * color1.blue() + w2 * color2.blue(), color1.alpha() * p + color2.alpha() * (1 - p));
    }
  };
  Object.keys(convert3).forEach(function(model) {
    if (skippedModels.indexOf(model) !== -1) {
      return;
    }
    var channels = convert3[model].channels;
    Color.prototype[model] = function() {
      if (this.model === model) {
        return new Color(this);
      }
      if (arguments.length) {
        return new Color(arguments, model);
      }
      var newAlpha = typeof arguments[channels] === "number" ? channels : this.valpha;
      return new Color(assertArray(convert3[this.model][model].raw(this.color)).concat(newAlpha), model);
    };
    Color[model] = function(color) {
      if (typeof color === "number") {
        color = zeroArray(_slice.call(arguments), channels);
      }
      return new Color(color, model);
    };
  });
  function roundTo(num, places) {
    return Number(num.toFixed(places));
  }
  function roundToPlace(places) {
    return function(num) {
      return roundTo(num, places);
    };
  }
  function getset(model, channel, modifier) {
    model = Array.isArray(model) ? model : [model];
    model.forEach(function(m) {
      (limiters[m] || (limiters[m] = []))[channel] = modifier;
    });
    model = model[0];
    return function(val) {
      var result;
      if (arguments.length) {
        if (modifier) {
          val = modifier(val);
        }
        result = this[model]();
        result.color[channel] = val;
        return result;
      }
      result = this[model]().color[channel];
      if (modifier) {
        result = modifier(result);
      }
      return result;
    };
  }
  function maxfn(max) {
    return function(v) {
      return Math.max(0, Math.min(max, v));
    };
  }
  function assertArray(val) {
    return Array.isArray(val) ? val : [val];
  }
  function zeroArray(arr, length) {
    for (var i = 0;i < length; i++) {
      if (typeof arr[i] !== "number") {
        arr[i] = 0;
      }
    }
    return arr;
  }
  module.exports = Color;
});

// node_modules/text-hex/index.js
var require_text_hex = __commonJS((exports, module) => {
  module.exports = function hex(str) {
    for (var i = 0, hash3 = 0;i < str.length; hash3 = str.charCodeAt(i++) + ((hash3 << 5) - hash3))
      ;
    var color = Math.floor(Math.abs(Math.sin(hash3) * 1e4 % 1 * 16777216)).toString(16);
    return "#" + Array(6 - color.length + 1).join("0") + color;
  };
});

// node_modules/colorspace/index.js
var require_colorspace = __commonJS((exports, module) => {
  var color = require_color();
  var hex = require_text_hex();
  module.exports = function colorspace(namespace, delimiter) {
    var split = namespace.split(delimiter || ":");
    var base = hex(split[0]);
    if (!split.length)
      return base;
    for (var i = 0, l = split.length - 1;i < l; i++) {
      base = color(base).mix(color(hex(split[i + 1]))).saturate(1).hex();
    }
    return base;
  };
});

// node_modules/kuler/index.js
var require_kuler = __commonJS((exports, module) => {
  function Kuler(text, color) {
    if (color)
      return new Kuler(text).style(color);
    if (!(this instanceof Kuler))
      return new Kuler(text);
    this.text = text;
  }
  Kuler.prototype.prefix = "\x1B[";
  Kuler.prototype.suffix = "m";
  Kuler.prototype.hex = function hex(color) {
    color = color[0] === "#" ? color.substring(1) : color;
    if (color.length === 3) {
      color = color.split("");
      color[5] = color[2];
      color[4] = color[2];
      color[3] = color[1];
      color[2] = color[1];
      color[1] = color[0];
      color = color.join("");
    }
    var r = color.substring(0, 2), g = color.substring(2, 4), b = color.substring(4, 6);
    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
  };
  Kuler.prototype.rgb = function rgb(r, g, b) {
    var red = r / 255 * 5, green = g / 255 * 5, blue = b / 255 * 5;
    return this.ansi(red, green, blue);
  };
  Kuler.prototype.ansi = function ansi(r, g, b) {
    var red = Math.round(r), green = Math.round(g), blue = Math.round(b);
    return 16 + red * 36 + green * 6 + blue;
  };
  Kuler.prototype.reset = function reset() {
    return this.prefix + "39;49" + this.suffix;
  };
  Kuler.prototype.style = function style(color) {
    return this.prefix + "38;5;" + this.rgb.apply(this, this.hex(color)) + this.suffix + this.text + this.reset();
  };
  module.exports = Kuler;
});

// node_modules/@dabh/diagnostics/modifiers/namespace-ansi.js
var require_namespace_ansi = __commonJS((exports, module) => {
  var colorspace = require_colorspace();
  var kuler = require_kuler();
  module.exports = function ansiModifier(args, options) {
    var namespace = options.namespace;
    var ansi = options.colors !== false ? kuler(namespace + ":", colorspace(namespace)) : namespace + ":";
    args[0] = ansi + " " + args[0];
    return args;
  };
});

// node_modules/enabled/index.js
var require_enabled = __commonJS((exports, module) => {
  module.exports = function enabled(name, variable) {
    if (!variable)
      return false;
    var variables = variable.split(/[\s,]+/), i = 0;
    for (;i < variables.length; i++) {
      variable = variables[i].replace("*", ".*?");
      if (variable.charAt(0) === "-") {
        if (new RegExp("^" + variable.substr(1) + "$").test(name)) {
          return false;
        }
        continue;
      }
      if (new RegExp("^" + variable + "$").test(name)) {
        return true;
      }
    }
    return false;
  };
});

// node_modules/@dabh/diagnostics/adapters/index.js
var require_adapters = __commonJS((exports, module) => {
  var enabled = require_enabled();
  module.exports = function create(fn) {
    return function adapter(namespace) {
      try {
        return enabled(namespace, fn());
      } catch (e) {
      }
      return false;
    };
  };
});

// node_modules/@dabh/diagnostics/adapters/process.env.js
var require_process_env = __commonJS((exports, module) => {
  var adapter = require_adapters();
  module.exports = adapter(function processenv() {
    return process.env.DEBUG || process.env.DIAGNOSTICS;
  });
});

// node_modules/@dabh/diagnostics/logger/console.js
var require_console2 = __commonJS((exports, module) => {
  module.exports = function(meta, messages) {
    try {
      Function.prototype.apply.call(console.log, console, messages);
    } catch (e) {
    }
  };
});

// node_modules/@dabh/diagnostics/node/development.js
var require_development = __commonJS((exports, module) => {
  var create3 = require_diagnostics();
  var tty = import.meta.require("tty").isatty(1);
  var diagnostics = create3(function dev(namespace, options) {
    options = options || {};
    options.colors = "colors" in options ? options.colors : tty;
    options.namespace = namespace;
    options.prod = false;
    options.dev = true;
    if (!dev.enabled(namespace) && !(options.force || dev.force)) {
      return dev.nope(options);
    }
    return dev.yep(options);
  });
  diagnostics.modify(require_namespace_ansi());
  diagnostics.use(require_process_env());
  diagnostics.set(require_console2());
  module.exports = diagnostics;
});

// node_modules/@dabh/diagnostics/node/index.js
var require_node2 = __commonJS((exports, module) => {
  if (false) {
  } else {
    module.exports = require_development();
  }
});

// node_modules/winston/lib/winston/tail-file.js
var require_tail_file = __commonJS((exports, module) => {
  var fs = import.meta.require("fs");
  var { StringDecoder } = import.meta.require("string_decoder");
  var { Stream } = require_readable();
  function noop() {
  }
  module.exports = (options, iter) => {
    const buffer = Buffer.alloc(64 * 1024);
    const decode2 = new StringDecoder("utf8");
    const stream = new Stream;
    let buff = "";
    let pos = 0;
    let row = 0;
    if (options.start === -1) {
      delete options.start;
    }
    stream.readable = true;
    stream.destroy = () => {
      stream.destroyed = true;
      stream.emit("end");
      stream.emit("close");
    };
    fs.open(options.file, "a+", "0644", (err, fd) => {
      if (err) {
        if (!iter) {
          stream.emit("error", err);
        } else {
          iter(err);
        }
        stream.destroy();
        return;
      }
      (function read() {
        if (stream.destroyed) {
          fs.close(fd, noop);
          return;
        }
        return fs.read(fd, buffer, 0, buffer.length, pos, (error4, bytes) => {
          if (error4) {
            if (!iter) {
              stream.emit("error", error4);
            } else {
              iter(error4);
            }
            stream.destroy();
            return;
          }
          if (!bytes) {
            if (buff) {
              if (options.start == null || row > options.start) {
                if (!iter) {
                  stream.emit("line", buff);
                } else {
                  iter(null, buff);
                }
              }
              row++;
              buff = "";
            }
            return setTimeout(read, 1000);
          }
          let data = decode2.write(buffer.slice(0, bytes));
          if (!iter) {
            stream.emit("data", data);
          }
          data = (buff + data).split(/\n+/);
          const l = data.length - 1;
          let i = 0;
          for (;i < l; i++) {
            if (options.start == null || row > options.start) {
              if (!iter) {
                stream.emit("line", data[i]);
              } else {
                iter(null, data[i]);
              }
            }
            row++;
          }
          buff = data[l];
          pos += bytes;
          return read();
        });
      })();
    });
    if (!iter) {
      return stream;
    }
    return stream.destroy;
  };
});

// node_modules/winston/lib/winston/transports/file.js
var require_file = __commonJS((exports, module) => {
  var fs = import.meta.require("fs");
  var path = import.meta.require("path");
  var asyncSeries = require_series();
  var zlib = import.meta.require("zlib");
  var { MESSAGE } = require_triple_beam();
  var { Stream, PassThrough } = require_readable();
  var TransportStream = require_winston_transport();
  var debug = require_node2()("winston:file");
  var os = import.meta.require("os");
  var tailFile = require_tail_file();
  module.exports = class File3 extends TransportStream {
    constructor(options = {}) {
      super(options);
      this.name = options.name || "file";
      function throwIf(target, ...args) {
        args.slice(1).forEach((name) => {
          if (options[name]) {
            throw new Error(`Cannot set ${name} and ${target} together`);
          }
        });
      }
      this._stream = new PassThrough;
      this._stream.setMaxListeners(30);
      this._onError = this._onError.bind(this);
      if (options.filename || options.dirname) {
        throwIf("filename or dirname", "stream");
        this._basename = this.filename = options.filename ? path.basename(options.filename) : "winston.log";
        this.dirname = options.dirname || path.dirname(options.filename);
        this.options = options.options || { flags: "a" };
      } else if (options.stream) {
        console.warn("options.stream will be removed in winston@4. Use winston.transports.Stream");
        throwIf("stream", "filename", "maxsize");
        this._dest = this._stream.pipe(this._setupStream(options.stream));
        this.dirname = path.dirname(this._dest.path);
      } else {
        throw new Error("Cannot log to file without filename or stream.");
      }
      this.maxsize = options.maxsize || null;
      this.rotationFormat = options.rotationFormat || false;
      this.zippedArchive = options.zippedArchive || false;
      this.maxFiles = options.maxFiles || null;
      this.eol = typeof options.eol === "string" ? options.eol : os.EOL;
      this.tailable = options.tailable || false;
      this.lazy = options.lazy || false;
      this._size = 0;
      this._pendingSize = 0;
      this._created = 0;
      this._drain = false;
      this._opening = false;
      this._ending = false;
      this._fileExist = false;
      if (this.dirname)
        this._createLogDirIfNotExist(this.dirname);
      if (!this.lazy)
        this.open();
    }
    finishIfEnding() {
      if (this._ending) {
        if (this._opening) {
          this.once("open", () => {
            this._stream.once("finish", () => this.emit("finish"));
            setImmediate(() => this._stream.end());
          });
        } else {
          this._stream.once("finish", () => this.emit("finish"));
          setImmediate(() => this._stream.end());
        }
      }
    }
    log(info, callback = () => {
    }) {
      if (this.silent) {
        callback();
        return true;
      }
      if (this._drain) {
        this._stream.once("drain", () => {
          this._drain = false;
          this.log(info, callback);
        });
        return;
      }
      if (this._rotate) {
        this._stream.once("rotate", () => {
          this._rotate = false;
          this.log(info, callback);
        });
        return;
      }
      if (this.lazy) {
        if (!this._fileExist) {
          if (!this._opening) {
            this.open();
          }
          this.once("open", () => {
            this._fileExist = true;
            this.log(info, callback);
            return;
          });
          return;
        }
        if (this._needsNewFile(this._pendingSize)) {
          this._dest.once("close", () => {
            if (!this._opening) {
              this.open();
            }
            this.once("open", () => {
              this.log(info, callback);
              return;
            });
            return;
          });
          return;
        }
      }
      const output = `${info[MESSAGE]}${this.eol}`;
      const bytes = Buffer.byteLength(output);
      function logged() {
        this._size += bytes;
        this._pendingSize -= bytes;
        debug("logged %s %s", this._size, output);
        this.emit("logged", info);
        if (this._rotate) {
          return;
        }
        if (this._opening) {
          return;
        }
        if (!this._needsNewFile()) {
          return;
        }
        if (this.lazy) {
          this._endStream(() => {
            this.emit("fileclosed");
          });
          return;
        }
        this._rotate = true;
        this._endStream(() => this._rotateFile());
      }
      this._pendingSize += bytes;
      if (this._opening && !this.rotatedWhileOpening && this._needsNewFile(this._size + this._pendingSize)) {
        this.rotatedWhileOpening = true;
      }
      const written = this._stream.write(output, logged.bind(this));
      if (!written) {
        this._drain = true;
        this._stream.once("drain", () => {
          this._drain = false;
          callback();
        });
      } else {
        callback();
      }
      debug("written", written, this._drain);
      this.finishIfEnding();
      return written;
    }
    query(options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      options = normalizeQuery(options);
      const file = path.join(this.dirname, this.filename);
      let buff = "";
      let results = [];
      let row = 0;
      const stream = fs.createReadStream(file, {
        encoding: "utf8"
      });
      stream.on("error", (err) => {
        if (stream.readable) {
          stream.destroy();
        }
        if (!callback) {
          return;
        }
        return err.code !== "ENOENT" ? callback(err) : callback(null, results);
      });
      stream.on("data", (data) => {
        data = (buff + data).split(/\n+/);
        const l = data.length - 1;
        let i = 0;
        for (;i < l; i++) {
          if (!options.start || row >= options.start) {
            add(data[i]);
          }
          row++;
        }
        buff = data[l];
      });
      stream.on("close", () => {
        if (buff) {
          add(buff, true);
        }
        if (options.order === "desc") {
          results = results.reverse();
        }
        if (callback)
          callback(null, results);
      });
      function add(buff2, attempt) {
        try {
          const log = JSON.parse(buff2);
          if (check3(log)) {
            push(log);
          }
        } catch (e) {
          if (!attempt) {
            stream.emit("error", e);
          }
        }
      }
      function push(log) {
        if (options.rows && results.length >= options.rows && options.order !== "desc") {
          if (stream.readable) {
            stream.destroy();
          }
          return;
        }
        if (options.fields) {
          log = options.fields.reduce((obj, key) => {
            obj[key] = log[key];
            return obj;
          }, {});
        }
        if (options.order === "desc") {
          if (results.length >= options.rows) {
            results.shift();
          }
        }
        results.push(log);
      }
      function check3(log) {
        if (!log) {
          return;
        }
        if (typeof log !== "object") {
          return;
        }
        const time = new Date(log.timestamp);
        if (options.from && time < options.from || options.until && time > options.until || options.level && options.level !== log.level) {
          return;
        }
        return true;
      }
      function normalizeQuery(options2) {
        options2 = options2 || {};
        options2.rows = options2.rows || options2.limit || 10;
        options2.start = options2.start || 0;
        options2.until = options2.until || new Date;
        if (typeof options2.until !== "object") {
          options2.until = new Date(options2.until);
        }
        options2.from = options2.from || options2.until - 24 * 60 * 60 * 1000;
        if (typeof options2.from !== "object") {
          options2.from = new Date(options2.from);
        }
        options2.order = options2.order || "desc";
        return options2;
      }
    }
    stream(options = {}) {
      const file = path.join(this.dirname, this.filename);
      const stream = new Stream;
      const tail = {
        file,
        start: options.start
      };
      stream.destroy = tailFile(tail, (err, line) => {
        if (err) {
          return stream.emit("error", err);
        }
        try {
          stream.emit("data", line);
          line = JSON.parse(line);
          stream.emit("log", line);
        } catch (e) {
          stream.emit("error", e);
        }
      });
      return stream;
    }
    open() {
      if (!this.filename)
        return;
      if (this._opening)
        return;
      this._opening = true;
      this.stat((err, size) => {
        if (err) {
          return this.emit("error", err);
        }
        debug("stat done: %s { size: %s }", this.filename, size);
        this._size = size;
        this._dest = this._createStream(this._stream);
        this._opening = false;
        this.once("open", () => {
          if (!this._stream.emit("rotate")) {
            this._rotate = false;
          }
        });
      });
    }
    stat(callback) {
      const target = this._getFile();
      const fullpath = path.join(this.dirname, target);
      fs.stat(fullpath, (err, stat) => {
        if (err && err.code === "ENOENT") {
          debug("ENOENT\xA0ok", fullpath);
          this.filename = target;
          return callback(null, 0);
        }
        if (err) {
          debug(`err ${err.code} ${fullpath}`);
          return callback(err);
        }
        if (!stat || this._needsNewFile(stat.size)) {
          return this._incFile(() => this.stat(callback));
        }
        this.filename = target;
        callback(null, stat.size);
      });
    }
    close(cb) {
      if (!this._stream) {
        return;
      }
      this._stream.end(() => {
        if (cb) {
          cb();
        }
        this.emit("flush");
        this.emit("closed");
      });
    }
    _needsNewFile(size) {
      size = size || this._size;
      return this.maxsize && size >= this.maxsize;
    }
    _onError(err) {
      this.emit("error", err);
    }
    _setupStream(stream) {
      stream.on("error", this._onError);
      return stream;
    }
    _cleanupStream(stream) {
      stream.removeListener("error", this._onError);
      stream.destroy();
      return stream;
    }
    _rotateFile() {
      this._incFile(() => this.open());
    }
    _endStream(callback = () => {
    }) {
      if (this._dest) {
        this._stream.unpipe(this._dest);
        this._dest.end(() => {
          this._cleanupStream(this._dest);
          callback();
        });
      } else {
        callback();
      }
    }
    _createStream(source) {
      const fullpath = path.join(this.dirname, this.filename);
      debug("create stream start", fullpath, this.options);
      const dest = fs.createWriteStream(fullpath, this.options).on("error", (err) => debug(err)).on("close", () => debug("close", dest.path, dest.bytesWritten)).on("open", () => {
        debug("file open ok", fullpath);
        this.emit("open", fullpath);
        source.pipe(dest);
        if (this.rotatedWhileOpening) {
          this._stream = new PassThrough;
          this._stream.setMaxListeners(30);
          this._rotateFile();
          this.rotatedWhileOpening = false;
          this._cleanupStream(dest);
          source.end();
        }
      });
      debug("create stream ok", fullpath);
      return dest;
    }
    _incFile(callback) {
      debug("_incFile", this.filename);
      const ext = path.extname(this._basename);
      const basename = path.basename(this._basename, ext);
      const tasks = [];
      if (this.zippedArchive) {
        tasks.push(function(cb) {
          const num = this._created > 0 && !this.tailable ? this._created : "";
          this._compressFile(path.join(this.dirname, `${basename}${num}${ext}`), path.join(this.dirname, `${basename}${num}${ext}.gz`), cb);
        }.bind(this));
      }
      tasks.push(function(cb) {
        if (!this.tailable) {
          this._created += 1;
          this._checkMaxFilesIncrementing(ext, basename, cb);
        } else {
          this._checkMaxFilesTailable(ext, basename, cb);
        }
      }.bind(this));
      asyncSeries(tasks, callback);
    }
    _getFile() {
      const ext = path.extname(this._basename);
      const basename = path.basename(this._basename, ext);
      const isRotation = this.rotationFormat ? this.rotationFormat() : this._created;
      return !this.tailable && this._created ? `${basename}${isRotation}${ext}` : `${basename}${ext}`;
    }
    _checkMaxFilesIncrementing(ext, basename, callback) {
      if (!this.maxFiles || this._created < this.maxFiles) {
        return setImmediate(callback);
      }
      const oldest = this._created - this.maxFiles;
      const isOldest = oldest !== 0 ? oldest : "";
      const isZipped = this.zippedArchive ? ".gz" : "";
      const filePath = `${basename}${isOldest}${ext}${isZipped}`;
      const target = path.join(this.dirname, filePath);
      fs.unlink(target, callback);
    }
    _checkMaxFilesTailable(ext, basename, callback) {
      const tasks = [];
      if (!this.maxFiles) {
        return;
      }
      const isZipped = this.zippedArchive ? ".gz" : "";
      for (let x = this.maxFiles - 1;x > 1; x--) {
        tasks.push(function(i, cb) {
          let fileName = `${basename}${i - 1}${ext}${isZipped}`;
          const tmppath = path.join(this.dirname, fileName);
          fs.exists(tmppath, (exists) => {
            if (!exists) {
              return cb(null);
            }
            fileName = `${basename}${i}${ext}${isZipped}`;
            fs.rename(tmppath, path.join(this.dirname, fileName), cb);
          });
        }.bind(this, x));
      }
      asyncSeries(tasks, () => {
        fs.rename(path.join(this.dirname, `${basename}${ext}${isZipped}`), path.join(this.dirname, `${basename}1${ext}${isZipped}`), callback);
      });
    }
    _compressFile(src, dest, callback) {
      fs.access(src, fs.F_OK, (err) => {
        if (err) {
          return callback();
        }
        var gzip = zlib.createGzip();
        var inp = fs.createReadStream(src);
        var out = fs.createWriteStream(dest);
        out.on("finish", () => {
          fs.unlink(src, callback);
        });
        inp.pipe(gzip).pipe(out);
      });
    }
    _createLogDirIfNotExist(dirPath) {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    }
  };
});

// node_modules/winston/lib/winston/transports/http.js
var require_http = __commonJS((exports, module) => {
  var http = import.meta.require("http");
  var https = import.meta.require("https");
  var { Stream } = require_readable();
  var TransportStream = require_winston_transport();
  var { configure } = require_safe_stable_stringify();
  module.exports = class Http extends TransportStream {
    constructor(options = {}) {
      super(options);
      this.options = options;
      this.name = options.name || "http";
      this.ssl = !!options.ssl;
      this.host = options.host || "localhost";
      this.port = options.port;
      this.auth = options.auth;
      this.path = options.path || "";
      this.maximumDepth = options.maximumDepth;
      this.agent = options.agent;
      this.headers = options.headers || {};
      this.headers["content-type"] = "application/json";
      this.batch = options.batch || false;
      this.batchInterval = options.batchInterval || 5000;
      this.batchCount = options.batchCount || 10;
      this.batchOptions = [];
      this.batchTimeoutID = -1;
      this.batchCallback = {};
      if (!this.port) {
        this.port = this.ssl ? 443 : 80;
      }
    }
    log(info, callback) {
      this._request(info, null, null, (err, res) => {
        if (res && res.statusCode !== 200) {
          err = new Error(`Invalid HTTP Status Code: ${res.statusCode}`);
        }
        if (err) {
          this.emit("warn", err);
        } else {
          this.emit("logged", info);
        }
      });
      if (callback) {
        setImmediate(callback);
      }
    }
    query(options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      options = {
        method: "query",
        params: this.normalizeQuery(options)
      };
      const auth = options.params.auth || null;
      delete options.params.auth;
      const path = options.params.path || null;
      delete options.params.path;
      this._request(options, auth, path, (err, res, body) => {
        if (res && res.statusCode !== 200) {
          err = new Error(`Invalid HTTP Status Code: ${res.statusCode}`);
        }
        if (err) {
          return callback(err);
        }
        if (typeof body === "string") {
          try {
            body = JSON.parse(body);
          } catch (e) {
            return callback(e);
          }
        }
        callback(null, body);
      });
    }
    stream(options = {}) {
      const stream = new Stream;
      options = {
        method: "stream",
        params: options
      };
      const path = options.params.path || null;
      delete options.params.path;
      const auth = options.params.auth || null;
      delete options.params.auth;
      let buff = "";
      const req = this._request(options, auth, path);
      stream.destroy = () => req.destroy();
      req.on("data", (data) => {
        data = (buff + data).split(/\n+/);
        const l = data.length - 1;
        let i = 0;
        for (;i < l; i++) {
          try {
            stream.emit("log", JSON.parse(data[i]));
          } catch (e) {
            stream.emit("error", e);
          }
        }
        buff = data[l];
      });
      req.on("error", (err) => stream.emit("error", err));
      return stream;
    }
    _request(options, auth, path, callback) {
      options = options || {};
      auth = auth || this.auth;
      path = path || this.path || "";
      if (this.batch) {
        this._doBatch(options, callback, auth, path);
      } else {
        this._doRequest(options, callback, auth, path);
      }
    }
    _doBatch(options, callback, auth, path) {
      this.batchOptions.push(options);
      if (this.batchOptions.length === 1) {
        const me = this;
        this.batchCallback = callback;
        this.batchTimeoutID = setTimeout(function() {
          me.batchTimeoutID = -1;
          me._doBatchRequest(me.batchCallback, auth, path);
        }, this.batchInterval);
      }
      if (this.batchOptions.length === this.batchCount) {
        this._doBatchRequest(this.batchCallback, auth, path);
      }
    }
    _doBatchRequest(callback, auth, path) {
      if (this.batchTimeoutID > 0) {
        clearTimeout(this.batchTimeoutID);
        this.batchTimeoutID = -1;
      }
      const batchOptionsCopy = this.batchOptions.slice();
      this.batchOptions = [];
      this._doRequest(batchOptionsCopy, callback, auth, path);
    }
    _doRequest(options, callback, auth, path) {
      const headers = Object.assign({}, this.headers);
      if (auth && auth.bearer) {
        headers.Authorization = `Bearer ${auth.bearer}`;
      }
      const req = (this.ssl ? https : http).request({
        ...this.options,
        method: "POST",
        host: this.host,
        port: this.port,
        path: `/${path.replace(/^\//, "")}`,
        headers,
        auth: auth && auth.username && auth.password ? `${auth.username}:${auth.password}` : "",
        agent: this.agent
      });
      req.on("error", callback);
      req.on("response", (res) => res.on("end", () => callback(null, res)).resume());
      const jsonStringify = configure({
        ...this.maximumDepth && { maximumDepth: this.maximumDepth }
      });
      req.end(Buffer.from(jsonStringify(options, this.options.replacer), "utf8"));
    }
  };
});

// node_modules/is-stream/index.js
var require_is_stream = __commonJS((exports, module) => {
  var isStream = (stream) => stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
  isStream.writable = (stream) => isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
  isStream.readable = (stream) => isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
  isStream.duplex = (stream) => isStream.writable(stream) && isStream.readable(stream);
  isStream.transform = (stream) => isStream.duplex(stream) && typeof stream._transform === "function";
  module.exports = isStream;
});

// node_modules/winston/lib/winston/transports/stream.js
var require_stream = __commonJS((exports, module) => {
  var isStream = require_is_stream();
  var { MESSAGE } = require_triple_beam();
  var os = import.meta.require("os");
  var TransportStream = require_winston_transport();
  module.exports = class Stream extends TransportStream {
    constructor(options = {}) {
      super(options);
      if (!options.stream || !isStream(options.stream)) {
        throw new Error("options.stream is required.");
      }
      this._stream = options.stream;
      this._stream.setMaxListeners(Infinity);
      this.isObjectMode = options.stream._writableState.objectMode;
      this.eol = typeof options.eol === "string" ? options.eol : os.EOL;
    }
    log(info, callback) {
      setImmediate(() => this.emit("logged", info));
      if (this.isObjectMode) {
        this._stream.write(info);
        if (callback) {
          callback();
        }
        return;
      }
      this._stream.write(`${info[MESSAGE]}${this.eol}`);
      if (callback) {
        callback();
      }
      return;
    }
  };
});

// node_modules/winston/lib/winston/transports/index.js
var require_transports = __commonJS((exports) => {
  Object.defineProperty(exports, "Console", {
    configurable: true,
    enumerable: true,
    get() {
      return require_console();
    }
  });
  Object.defineProperty(exports, "File", {
    configurable: true,
    enumerable: true,
    get() {
      return require_file();
    }
  });
  Object.defineProperty(exports, "Http", {
    configurable: true,
    enumerable: true,
    get() {
      return require_http();
    }
  });
  Object.defineProperty(exports, "Stream", {
    configurable: true,
    enumerable: true,
    get() {
      return require_stream();
    }
  });
});

// node_modules/winston/lib/winston/config/index.js
var require_config2 = __commonJS((exports) => {
  var logform = require_logform();
  var { configs } = require_triple_beam();
  exports.cli = logform.levels(configs.cli);
  exports.npm = logform.levels(configs.npm);
  exports.syslog = logform.levels(configs.syslog);
  exports.addColors = logform.levels;
});

// node_modules/async/eachOf.js
var require_eachOf = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _isArrayLike = require_isArrayLike();
  var _isArrayLike2 = _interopRequireDefault(_isArrayLike);
  var _breakLoop = require_breakLoop();
  var _breakLoop2 = _interopRequireDefault(_breakLoop);
  var _eachOfLimit = require_eachOfLimit2();
  var _eachOfLimit2 = _interopRequireDefault(_eachOfLimit);
  var _once = require_once();
  var _once2 = _interopRequireDefault(_once);
  var _onlyOnce = require_onlyOnce();
  var _onlyOnce2 = _interopRequireDefault(_onlyOnce);
  var _wrapAsync = require_wrapAsync();
  var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
  var _awaitify = require_awaitify();
  var _awaitify2 = _interopRequireDefault(_awaitify);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function eachOfArrayLike(coll, iteratee, callback) {
    callback = (0, _once2.default)(callback);
    var index = 0, completed = 0, { length } = coll, canceled = false;
    if (length === 0) {
      callback(null);
    }
    function iteratorCallback(err, value2) {
      if (err === false) {
        canceled = true;
      }
      if (canceled === true)
        return;
      if (err) {
        callback(err);
      } else if (++completed === length || value2 === _breakLoop2.default) {
        callback(null);
      }
    }
    for (;index < length; index++) {
      iteratee(coll[index], index, (0, _onlyOnce2.default)(iteratorCallback));
    }
  }
  function eachOfGeneric(coll, iteratee, callback) {
    return (0, _eachOfLimit2.default)(coll, Infinity, iteratee, callback);
  }
  function eachOf(coll, iteratee, callback) {
    var eachOfImplementation = (0, _isArrayLike2.default)(coll) ? eachOfArrayLike : eachOfGeneric;
    return eachOfImplementation(coll, (0, _wrapAsync2.default)(iteratee), callback);
  }
  exports.default = (0, _awaitify2.default)(eachOf, 3);
  module.exports = exports.default;
});

// node_modules/async/internal/withoutIndex.js
var require_withoutIndex = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _withoutIndex;
  function _withoutIndex(iteratee) {
    return (value2, index, callback) => iteratee(value2, callback);
  }
  module.exports = exports.default;
});

// node_modules/async/forEach.js
var require_forEach = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _eachOf = require_eachOf();
  var _eachOf2 = _interopRequireDefault(_eachOf);
  var _withoutIndex = require_withoutIndex();
  var _withoutIndex2 = _interopRequireDefault(_withoutIndex);
  var _wrapAsync = require_wrapAsync();
  var _wrapAsync2 = _interopRequireDefault(_wrapAsync);
  var _awaitify = require_awaitify();
  var _awaitify2 = _interopRequireDefault(_awaitify);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function eachLimit(coll, iteratee, callback) {
    return (0, _eachOf2.default)(coll, (0, _withoutIndex2.default)((0, _wrapAsync2.default)(iteratee)), callback);
  }
  exports.default = (0, _awaitify2.default)(eachLimit, 3);
  module.exports = exports.default;
});

// node_modules/fn.name/index.js
var require_fn = __commonJS((exports, module) => {
  var toString = Object.prototype.toString;
  module.exports = function name(fn) {
    if (typeof fn.displayName === "string" && fn.constructor.name) {
      return fn.displayName;
    } else if (typeof fn.name === "string" && fn.name) {
      return fn.name;
    }
    if (typeof fn === "object" && fn.constructor && typeof fn.constructor.name === "string")
      return fn.constructor.name;
    var named = fn.toString(), type3 = toString.call(fn).slice(8, -1);
    if (type3 === "Function") {
      named = named.substring(named.indexOf("(") + 1, named.indexOf(")"));
    } else {
      named = type3;
    }
    return named || "anonymous";
  };
});

// node_modules/one-time/index.js
var require_one_time = __commonJS((exports, module) => {
  var name = require_fn();
  module.exports = function one(fn) {
    var called = 0, value2;
    function onetime() {
      if (called)
        return value2;
      called = 1;
      value2 = fn.apply(this, arguments);
      fn = null;
      return value2;
    }
    onetime.displayName = name(fn);
    return onetime;
  };
});

// node_modules/stack-trace/lib/stack-trace.js
var require_stack_trace = __commonJS((exports) => {
  exports.get = function(belowFn) {
    var oldLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = Infinity;
    var dummyObject = {};
    var v8Handler = Error.prepareStackTrace;
    Error.prepareStackTrace = function(dummyObject2, v8StackTrace2) {
      return v8StackTrace2;
    };
    Error.captureStackTrace(dummyObject, belowFn || exports.get);
    var v8StackTrace = dummyObject.stack;
    Error.prepareStackTrace = v8Handler;
    Error.stackTraceLimit = oldLimit;
    return v8StackTrace;
  };
  exports.parse = function(err) {
    if (!err.stack) {
      return [];
    }
    var self2 = this;
    var lines = err.stack.split(`
`).slice(1);
    return lines.map(function(line) {
      if (line.match(/^\s*[-]{4,}$/)) {
        return self2._createParsedCallSite({
          fileName: line,
          lineNumber: null,
          functionName: null,
          typeName: null,
          methodName: null,
          columnNumber: null,
          native: null
        });
      }
      var lineMatch = line.match(/at (?:(.+)\s+\()?(?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)?/);
      if (!lineMatch) {
        return;
      }
      var object3 = null;
      var method = null;
      var functionName = null;
      var typeName = null;
      var methodName = null;
      var isNative = lineMatch[5] === "native";
      if (lineMatch[1]) {
        functionName = lineMatch[1];
        var methodStart = functionName.lastIndexOf(".");
        if (functionName[methodStart - 1] == ".")
          methodStart--;
        if (methodStart > 0) {
          object3 = functionName.substr(0, methodStart);
          method = functionName.substr(methodStart + 1);
          var objectEnd = object3.indexOf(".Module");
          if (objectEnd > 0) {
            functionName = functionName.substr(objectEnd + 1);
            object3 = object3.substr(0, objectEnd);
          }
        }
        typeName = null;
      }
      if (method) {
        typeName = object3;
        methodName = method;
      }
      if (method === "<anonymous>") {
        methodName = null;
        functionName = null;
      }
      var properties = {
        fileName: lineMatch[2] || null,
        lineNumber: parseInt(lineMatch[3], 10) || null,
        functionName,
        typeName,
        methodName,
        columnNumber: parseInt(lineMatch[4], 10) || null,
        native: isNative
      };
      return self2._createParsedCallSite(properties);
    }).filter(function(callSite) {
      return !!callSite;
    });
  };
  function CallSite(properties) {
    for (var property in properties) {
      this[property] = properties[property];
    }
  }
  var strProperties = [
    "this",
    "typeName",
    "functionName",
    "methodName",
    "fileName",
    "lineNumber",
    "columnNumber",
    "function",
    "evalOrigin"
  ];
  var boolProperties = [
    "topLevel",
    "eval",
    "native",
    "constructor"
  ];
  strProperties.forEach(function(property) {
    CallSite.prototype[property] = null;
    CallSite.prototype["get" + property[0].toUpperCase() + property.substr(1)] = function() {
      return this[property];
    };
  });
  boolProperties.forEach(function(property) {
    CallSite.prototype[property] = false;
    CallSite.prototype["is" + property[0].toUpperCase() + property.substr(1)] = function() {
      return this[property];
    };
  });
  exports._createParsedCallSite = function(properties) {
    return new CallSite(properties);
  };
});

// node_modules/winston/lib/winston/exception-stream.js
var require_exception_stream = __commonJS((exports, module) => {
  var { Writable } = require_readable();
  module.exports = class ExceptionStream extends Writable {
    constructor(transport) {
      super({ objectMode: true });
      if (!transport) {
        throw new Error("ExceptionStream requires a TransportStream instance.");
      }
      this.handleExceptions = true;
      this.transport = transport;
    }
    _write(info, enc, callback) {
      if (info.exception) {
        return this.transport.log(info, callback);
      }
      callback();
      return true;
    }
  };
});

// node_modules/winston/lib/winston/exception-handler.js
var require_exception_handler = __commonJS((exports, module) => {
  var os = import.meta.require("os");
  var asyncForEach = require_forEach();
  var debug = require_node2()("winston:exception");
  var once = require_one_time();
  var stackTrace = require_stack_trace();
  var ExceptionStream = require_exception_stream();
  module.exports = class ExceptionHandler {
    constructor(logger) {
      if (!logger) {
        throw new Error("Logger is required to handle exceptions");
      }
      this.logger = logger;
      this.handlers = new Map;
    }
    handle(...args) {
      args.forEach((arg) => {
        if (Array.isArray(arg)) {
          return arg.forEach((handler) => this._addHandler(handler));
        }
        this._addHandler(arg);
      });
      if (!this.catcher) {
        this.catcher = this._uncaughtException.bind(this);
        process.on("uncaughtException", this.catcher);
      }
    }
    unhandle() {
      if (this.catcher) {
        process.removeListener("uncaughtException", this.catcher);
        this.catcher = false;
        Array.from(this.handlers.values()).forEach((wrapper) => this.logger.unpipe(wrapper));
      }
    }
    getAllInfo(err) {
      let message = null;
      if (err) {
        message = typeof err === "string" ? err : err.message;
      }
      return {
        error: err,
        level: "error",
        message: [
          `uncaughtException: ${message || "(no error message)"}`,
          err && err.stack || "  No stack trace"
        ].join(`
`),
        stack: err && err.stack,
        exception: true,
        date: new Date().toString(),
        process: this.getProcessInfo(),
        os: this.getOsInfo(),
        trace: this.getTrace(err)
      };
    }
    getProcessInfo() {
      return {
        pid: process.pid,
        uid: process.getuid ? process.getuid() : null,
        gid: process.getgid ? process.getgid() : null,
        cwd: process.cwd(),
        execPath: process.execPath,
        version: process.version,
        argv: process.argv,
        memoryUsage: process.memoryUsage()
      };
    }
    getOsInfo() {
      return {
        loadavg: os.loadavg(),
        uptime: os.uptime()
      };
    }
    getTrace(err) {
      const trace = err ? stackTrace.parse(err) : stackTrace.get();
      return trace.map((site) => {
        return {
          column: site.getColumnNumber(),
          file: site.getFileName(),
          function: site.getFunctionName(),
          line: site.getLineNumber(),
          method: site.getMethodName(),
          native: site.isNative()
        };
      });
    }
    _addHandler(handler) {
      if (!this.handlers.has(handler)) {
        handler.handleExceptions = true;
        const wrapper = new ExceptionStream(handler);
        this.handlers.set(handler, wrapper);
        this.logger.pipe(wrapper);
      }
    }
    _uncaughtException(err) {
      const info = this.getAllInfo(err);
      const handlers = this._getExceptionHandlers();
      let doExit = typeof this.logger.exitOnError === "function" ? this.logger.exitOnError(err) : this.logger.exitOnError;
      let timeout;
      if (!handlers.length && doExit) {
        console.warn("winston: exitOnError cannot be true with no exception handlers.");
        console.warn("winston: not exiting process.");
        doExit = false;
      }
      function gracefulExit() {
        debug("doExit", doExit);
        debug("process._exiting", process._exiting);
        if (doExit && !process._exiting) {
          if (timeout) {
            clearTimeout(timeout);
          }
          process.exit(1);
        }
      }
      if (!handlers || handlers.length === 0) {
        return process.nextTick(gracefulExit);
      }
      asyncForEach(handlers, (handler, next) => {
        const done = once(next);
        const transport = handler.transport || handler;
        function onDone(event) {
          return () => {
            debug(event);
            done();
          };
        }
        transport._ending = true;
        transport.once("finish", onDone("finished"));
        transport.once("error", onDone("error"));
      }, () => doExit && gracefulExit());
      this.logger.log(info);
      if (doExit) {
        timeout = setTimeout(gracefulExit, 3000);
      }
    }
    _getExceptionHandlers() {
      return this.logger.transports.filter((wrap) => {
        const transport = wrap.transport || wrap;
        return transport.handleExceptions;
      });
    }
  };
});

// node_modules/winston/lib/winston/rejection-stream.js
var require_rejection_stream = __commonJS((exports, module) => {
  var { Writable } = require_readable();
  module.exports = class RejectionStream extends Writable {
    constructor(transport) {
      super({ objectMode: true });
      if (!transport) {
        throw new Error("RejectionStream requires a TransportStream instance.");
      }
      this.handleRejections = true;
      this.transport = transport;
    }
    _write(info, enc, callback) {
      if (info.rejection) {
        return this.transport.log(info, callback);
      }
      callback();
      return true;
    }
  };
});

// node_modules/winston/lib/winston/rejection-handler.js
var require_rejection_handler = __commonJS((exports, module) => {
  var os = import.meta.require("os");
  var asyncForEach = require_forEach();
  var debug = require_node2()("winston:rejection");
  var once = require_one_time();
  var stackTrace = require_stack_trace();
  var RejectionStream = require_rejection_stream();
  module.exports = class RejectionHandler {
    constructor(logger) {
      if (!logger) {
        throw new Error("Logger is required to handle rejections");
      }
      this.logger = logger;
      this.handlers = new Map;
    }
    handle(...args) {
      args.forEach((arg) => {
        if (Array.isArray(arg)) {
          return arg.forEach((handler) => this._addHandler(handler));
        }
        this._addHandler(arg);
      });
      if (!this.catcher) {
        this.catcher = this._unhandledRejection.bind(this);
        process.on("unhandledRejection", this.catcher);
      }
    }
    unhandle() {
      if (this.catcher) {
        process.removeListener("unhandledRejection", this.catcher);
        this.catcher = false;
        Array.from(this.handlers.values()).forEach((wrapper) => this.logger.unpipe(wrapper));
      }
    }
    getAllInfo(err) {
      let message = null;
      if (err) {
        message = typeof err === "string" ? err : err.message;
      }
      return {
        error: err,
        level: "error",
        message: [
          `unhandledRejection: ${message || "(no error message)"}`,
          err && err.stack || "  No stack trace"
        ].join(`
`),
        stack: err && err.stack,
        rejection: true,
        date: new Date().toString(),
        process: this.getProcessInfo(),
        os: this.getOsInfo(),
        trace: this.getTrace(err)
      };
    }
    getProcessInfo() {
      return {
        pid: process.pid,
        uid: process.getuid ? process.getuid() : null,
        gid: process.getgid ? process.getgid() : null,
        cwd: process.cwd(),
        execPath: process.execPath,
        version: process.version,
        argv: process.argv,
        memoryUsage: process.memoryUsage()
      };
    }
    getOsInfo() {
      return {
        loadavg: os.loadavg(),
        uptime: os.uptime()
      };
    }
    getTrace(err) {
      const trace = err ? stackTrace.parse(err) : stackTrace.get();
      return trace.map((site) => {
        return {
          column: site.getColumnNumber(),
          file: site.getFileName(),
          function: site.getFunctionName(),
          line: site.getLineNumber(),
          method: site.getMethodName(),
          native: site.isNative()
        };
      });
    }
    _addHandler(handler) {
      if (!this.handlers.has(handler)) {
        handler.handleRejections = true;
        const wrapper = new RejectionStream(handler);
        this.handlers.set(handler, wrapper);
        this.logger.pipe(wrapper);
      }
    }
    _unhandledRejection(err) {
      const info = this.getAllInfo(err);
      const handlers = this._getRejectionHandlers();
      let doExit = typeof this.logger.exitOnError === "function" ? this.logger.exitOnError(err) : this.logger.exitOnError;
      let timeout;
      if (!handlers.length && doExit) {
        console.warn("winston: exitOnError cannot be true with no rejection handlers.");
        console.warn("winston: not exiting process.");
        doExit = false;
      }
      function gracefulExit() {
        debug("doExit", doExit);
        debug("process._exiting", process._exiting);
        if (doExit && !process._exiting) {
          if (timeout) {
            clearTimeout(timeout);
          }
          process.exit(1);
        }
      }
      if (!handlers || handlers.length === 0) {
        return process.nextTick(gracefulExit);
      }
      asyncForEach(handlers, (handler, next) => {
        const done = once(next);
        const transport = handler.transport || handler;
        function onDone(event) {
          return () => {
            debug(event);
            done();
          };
        }
        transport._ending = true;
        transport.once("finish", onDone("finished"));
        transport.once("error", onDone("error"));
      }, () => doExit && gracefulExit());
      this.logger.log(info);
      if (doExit) {
        timeout = setTimeout(gracefulExit, 3000);
      }
    }
    _getRejectionHandlers() {
      return this.logger.transports.filter((wrap) => {
        const transport = wrap.transport || wrap;
        return transport.handleRejections;
      });
    }
  };
});

// node_modules/winston/lib/winston/profiler.js
var require_profiler = __commonJS((exports, module) => {
  class Profiler {
    constructor(logger) {
      const Logger = require_logger();
      if (typeof logger !== "object" || Array.isArray(logger) || !(logger instanceof Logger)) {
        throw new Error("Logger is required for profiling");
      } else {
        this.logger = logger;
        this.start = Date.now();
      }
    }
    done(...args) {
      if (typeof args[args.length - 1] === "function") {
        console.warn("Callback function no longer supported as of winston@3.0.0");
        args.pop();
      }
      const info = typeof args[args.length - 1] === "object" ? args.pop() : {};
      info.level = info.level || "info";
      info.durationMs = Date.now() - this.start;
      return this.logger.write(info);
    }
  }
  module.exports = Profiler;
});

// node_modules/winston/lib/winston/logger.js
var require_logger = __commonJS((exports, module) => {
  var { Stream, Transform: Transform2 } = require_readable();
  var asyncForEach = require_forEach();
  var { LEVEL, SPLAT } = require_triple_beam();
  var isStream = require_is_stream();
  var ExceptionHandler = require_exception_handler();
  var RejectionHandler = require_rejection_handler();
  var LegacyTransportStream = require_legacy();
  var Profiler = require_profiler();
  var { warn } = require_common();
  var config = require_config2();
  var formatRegExp = /%[scdjifoO%]/g;

  class Logger extends Transform2 {
    constructor(options) {
      super({ objectMode: true });
      this.configure(options);
    }
    child(defaultRequestMetadata) {
      const logger = this;
      return Object.create(logger, {
        write: {
          value: function(info) {
            const infoClone = Object.assign({}, defaultRequestMetadata, info);
            if (info instanceof Error) {
              infoClone.stack = info.stack;
              infoClone.message = info.message;
            }
            logger.write(infoClone);
          }
        }
      });
    }
    configure({
      silent,
      format,
      defaultMeta,
      levels,
      level = "info",
      exitOnError = true,
      transports,
      colors,
      emitErrs,
      formatters,
      padLevels,
      rewriters,
      stripColors,
      exceptionHandlers,
      rejectionHandlers
    } = {}) {
      if (this.transports.length) {
        this.clear();
      }
      this.silent = silent;
      this.format = format || this.format || require_json()();
      this.defaultMeta = defaultMeta || null;
      this.levels = levels || this.levels || config.npm.levels;
      this.level = level;
      if (this.exceptions) {
        this.exceptions.unhandle();
      }
      if (this.rejections) {
        this.rejections.unhandle();
      }
      this.exceptions = new ExceptionHandler(this);
      this.rejections = new RejectionHandler(this);
      this.profilers = {};
      this.exitOnError = exitOnError;
      if (transports) {
        transports = Array.isArray(transports) ? transports : [transports];
        transports.forEach((transport) => this.add(transport));
      }
      if (colors || emitErrs || formatters || padLevels || rewriters || stripColors) {
        throw new Error([
          "{ colors, emitErrs, formatters, padLevels, rewriters, stripColors } were removed in winston@3.0.0.",
          "Use a custom winston.format(function) instead.",
          "See: https://github.com/winstonjs/winston/tree/master/UPGRADE-3.0.md"
        ].join(`
`));
      }
      if (exceptionHandlers) {
        this.exceptions.handle(exceptionHandlers);
      }
      if (rejectionHandlers) {
        this.rejections.handle(rejectionHandlers);
      }
    }
    isLevelEnabled(level) {
      const givenLevelValue = getLevelValue(this.levels, level);
      if (givenLevelValue === null) {
        return false;
      }
      const configuredLevelValue = getLevelValue(this.levels, this.level);
      if (configuredLevelValue === null) {
        return false;
      }
      if (!this.transports || this.transports.length === 0) {
        return configuredLevelValue >= givenLevelValue;
      }
      const index = this.transports.findIndex((transport) => {
        let transportLevelValue = getLevelValue(this.levels, transport.level);
        if (transportLevelValue === null) {
          transportLevelValue = configuredLevelValue;
        }
        return transportLevelValue >= givenLevelValue;
      });
      return index !== -1;
    }
    log(level, msg, ...splat) {
      if (arguments.length === 1) {
        level[LEVEL] = level.level;
        this._addDefaultMeta(level);
        this.write(level);
        return this;
      }
      if (arguments.length === 2) {
        if (msg && typeof msg === "object") {
          msg[LEVEL] = msg.level = level;
          this._addDefaultMeta(msg);
          this.write(msg);
          return this;
        }
        msg = { [LEVEL]: level, level, message: msg };
        this._addDefaultMeta(msg);
        this.write(msg);
        return this;
      }
      const [meta] = splat;
      if (typeof meta === "object" && meta !== null) {
        const tokens = msg && msg.match && msg.match(formatRegExp);
        if (!tokens) {
          const info = Object.assign({}, this.defaultMeta, meta, {
            [LEVEL]: level,
            [SPLAT]: splat,
            level,
            message: msg
          });
          if (meta.message)
            info.message = `${info.message} ${meta.message}`;
          if (meta.stack)
            info.stack = meta.stack;
          if (meta.cause)
            info.cause = meta.cause;
          this.write(info);
          return this;
        }
      }
      this.write(Object.assign({}, this.defaultMeta, {
        [LEVEL]: level,
        [SPLAT]: splat,
        level,
        message: msg
      }));
      return this;
    }
    _transform(info, enc, callback) {
      if (this.silent) {
        return callback();
      }
      if (!info[LEVEL]) {
        info[LEVEL] = info.level;
      }
      if (!this.levels[info[LEVEL]] && this.levels[info[LEVEL]] !== 0) {
        console.error("[winston] Unknown logger level: %s", info[LEVEL]);
      }
      if (!this._readableState.pipes) {
        console.error("[winston] Attempt to write logs with no transports, which can increase memory usage: %j", info);
      }
      try {
        this.push(this.format.transform(info, this.format.options));
      } finally {
        this._writableState.sync = false;
        callback();
      }
    }
    _final(callback) {
      const transports = this.transports.slice();
      asyncForEach(transports, (transport, next) => {
        if (!transport || transport.finished)
          return setImmediate(next);
        transport.once("finish", next);
        transport.end();
      }, callback);
    }
    add(transport) {
      const target = !isStream(transport) || transport.log.length > 2 ? new LegacyTransportStream({ transport }) : transport;
      if (!target._writableState || !target._writableState.objectMode) {
        throw new Error("Transports must WritableStreams in objectMode. Set { objectMode: true }.");
      }
      this._onEvent("error", target);
      this._onEvent("warn", target);
      this.pipe(target);
      if (transport.handleExceptions) {
        this.exceptions.handle();
      }
      if (transport.handleRejections) {
        this.rejections.handle();
      }
      return this;
    }
    remove(transport) {
      if (!transport)
        return this;
      let target = transport;
      if (!isStream(transport) || transport.log.length > 2) {
        target = this.transports.filter((match) => match.transport === transport)[0];
      }
      if (target) {
        this.unpipe(target);
      }
      return this;
    }
    clear() {
      this.unpipe();
      return this;
    }
    close() {
      this.exceptions.unhandle();
      this.rejections.unhandle();
      this.clear();
      this.emit("close");
      return this;
    }
    setLevels() {
      warn.deprecated("setLevels");
    }
    query(options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      options = options || {};
      const results = {};
      const queryObject = Object.assign({}, options.query || {});
      function queryTransport(transport, next) {
        if (options.query && typeof transport.formatQuery === "function") {
          options.query = transport.formatQuery(queryObject);
        }
        transport.query(options, (err, res) => {
          if (err) {
            return next(err);
          }
          if (typeof transport.formatResults === "function") {
            res = transport.formatResults(res, options.format);
          }
          next(null, res);
        });
      }
      function addResults(transport, next) {
        queryTransport(transport, (err, result) => {
          if (next) {
            result = err || result;
            if (result) {
              results[transport.name] = result;
            }
            next();
          }
          next = null;
        });
      }
      asyncForEach(this.transports.filter((transport) => !!transport.query), addResults, () => callback(null, results));
    }
    stream(options = {}) {
      const out = new Stream;
      const streams = [];
      out._streams = streams;
      out.destroy = () => {
        let i = streams.length;
        while (i--) {
          streams[i].destroy();
        }
      };
      this.transports.filter((transport) => !!transport.stream).forEach((transport) => {
        const str = transport.stream(options);
        if (!str) {
          return;
        }
        streams.push(str);
        str.on("log", (log) => {
          log.transport = log.transport || [];
          log.transport.push(transport.name);
          out.emit("log", log);
        });
        str.on("error", (err) => {
          err.transport = err.transport || [];
          err.transport.push(transport.name);
          out.emit("error", err);
        });
      });
      return out;
    }
    startTimer() {
      return new Profiler(this);
    }
    profile(id, ...args) {
      const time = Date.now();
      if (this.profilers[id]) {
        const timeEnd = this.profilers[id];
        delete this.profilers[id];
        if (typeof args[args.length - 2] === "function") {
          console.warn("Callback function no longer supported as of winston@3.0.0");
          args.pop();
        }
        const info = typeof args[args.length - 1] === "object" ? args.pop() : {};
        info.level = info.level || "info";
        info.durationMs = time - timeEnd;
        info.message = info.message || id;
        return this.write(info);
      }
      this.profilers[id] = time;
      return this;
    }
    handleExceptions(...args) {
      console.warn("Deprecated: .handleExceptions() will be removed in winston@4. Use .exceptions.handle()");
      this.exceptions.handle(...args);
    }
    unhandleExceptions(...args) {
      console.warn("Deprecated: .unhandleExceptions() will be removed in winston@4. Use .exceptions.unhandle()");
      this.exceptions.unhandle(...args);
    }
    cli() {
      throw new Error([
        "Logger.cli() was removed in winston@3.0.0",
        "Use a custom winston.formats.cli() instead.",
        "See: https://github.com/winstonjs/winston/tree/master/UPGRADE-3.0.md"
      ].join(`
`));
    }
    _onEvent(event, transport) {
      function transportEvent(err) {
        if (event === "error" && !this.transports.includes(transport)) {
          this.add(transport);
        }
        this.emit(event, err, transport);
      }
      if (!transport["__winston" + event]) {
        transport["__winston" + event] = transportEvent.bind(this);
        transport.on(event, transport["__winston" + event]);
      }
    }
    _addDefaultMeta(msg) {
      if (this.defaultMeta) {
        Object.assign(msg, this.defaultMeta);
      }
    }
  }
  function getLevelValue(levels, level) {
    const value2 = levels[level];
    if (!value2 && value2 !== 0) {
      return null;
    }
    return value2;
  }
  Object.defineProperty(Logger.prototype, "transports", {
    configurable: false,
    enumerable: true,
    get() {
      const { pipes } = this._readableState;
      return !Array.isArray(pipes) ? [pipes].filter(Boolean) : pipes;
    }
  });
  module.exports = Logger;
});

// node_modules/winston/lib/winston/create-logger.js
var require_create_logger = __commonJS((exports, module) => {
  var { LEVEL } = require_triple_beam();
  var config = require_config2();
  var Logger = require_logger();
  var debug = require_node2()("winston:create-logger");
  function isLevelEnabledFunctionName(level) {
    return "is" + level.charAt(0).toUpperCase() + level.slice(1) + "Enabled";
  }
  module.exports = function(opts = {}) {
    opts.levels = opts.levels || config.npm.levels;

    class DerivedLogger extends Logger {
      constructor(options) {
        super(options);
      }
    }
    const logger = new DerivedLogger(opts);
    Object.keys(opts.levels).forEach(function(level) {
      debug('Define prototype method for "%s"', level);
      if (level === "log") {
        console.warn('Level "log" not defined: conflicts with the method "log". Use a different level name.');
        return;
      }
      DerivedLogger.prototype[level] = function(...args) {
        const self2 = this || logger;
        if (args.length === 1) {
          const [msg] = args;
          const info = msg && msg.message && msg || { message: msg };
          info.level = info[LEVEL] = level;
          self2._addDefaultMeta(info);
          self2.write(info);
          return this || logger;
        }
        if (args.length === 0) {
          self2.log(level, "");
          return self2;
        }
        return self2.log(level, ...args);
      };
      DerivedLogger.prototype[isLevelEnabledFunctionName(level)] = function() {
        return (this || logger).isLevelEnabled(level);
      };
    });
    return logger;
  };
});

// node_modules/winston/lib/winston/container.js
var require_container = __commonJS((exports, module) => {
  var createLogger = require_create_logger();
  module.exports = class Container {
    constructor(options = {}) {
      this.loggers = new Map;
      this.options = options;
    }
    add(id, options) {
      if (!this.loggers.has(id)) {
        options = Object.assign({}, options || this.options);
        const existing = options.transports || this.options.transports;
        if (existing) {
          options.transports = Array.isArray(existing) ? existing.slice() : [existing];
        } else {
          options.transports = [];
        }
        const logger = createLogger(options);
        logger.on("close", () => this._delete(id));
        this.loggers.set(id, logger);
      }
      return this.loggers.get(id);
    }
    get(id, options) {
      return this.add(id, options);
    }
    has(id) {
      return !!this.loggers.has(id);
    }
    close(id) {
      if (id) {
        return this._removeLogger(id);
      }
      this.loggers.forEach((val, key) => this._removeLogger(key));
    }
    _removeLogger(id) {
      if (!this.loggers.has(id)) {
        return;
      }
      const logger = this.loggers.get(id);
      logger.close();
      this._delete(id);
    }
    _delete(id) {
      this.loggers.delete(id);
    }
  };
});

// node_modules/winston/lib/winston.js
var require_winston = __commonJS((exports) => {
  var logform = require_logform();
  var { warn } = require_common();
  exports.version = require_package().version;
  exports.transports = require_transports();
  exports.config = require_config2();
  exports.addColors = logform.levels;
  exports.format = logform.format;
  exports.createLogger = require_create_logger();
  exports.Logger = require_logger();
  exports.ExceptionHandler = require_exception_handler();
  exports.RejectionHandler = require_rejection_handler();
  exports.Container = require_container();
  exports.Transport = require_winston_transport();
  exports.loggers = new exports.Container;
  var defaultLogger = exports.createLogger();
  Object.keys(exports.config.npm.levels).concat([
    "log",
    "query",
    "stream",
    "add",
    "remove",
    "clear",
    "profile",
    "startTimer",
    "handleExceptions",
    "unhandleExceptions",
    "handleRejections",
    "unhandleRejections",
    "configure",
    "child"
  ]).forEach((method) => exports[method] = (...args) => defaultLogger[method](...args));
  Object.defineProperty(exports, "level", {
    get() {
      return defaultLogger.level;
    },
    set(val) {
      defaultLogger.level = val;
    }
  });
  Object.defineProperty(exports, "exceptions", {
    get() {
      return defaultLogger.exceptions;
    }
  });
  Object.defineProperty(exports, "rejections", {
    get() {
      return defaultLogger.rejections;
    }
  });
  ["exitOnError"].forEach((prop) => {
    Object.defineProperty(exports, prop, {
      get() {
        return defaultLogger[prop];
      },
      set(val) {
        defaultLogger[prop] = val;
      }
    });
  });
  Object.defineProperty(exports, "default", {
    get() {
      return {
        exceptionHandlers: defaultLogger.exceptionHandlers,
        rejectionHandlers: defaultLogger.rejectionHandlers,
        transports: defaultLogger.transports
      };
    }
  });
  warn.deprecated(exports, "setLevels");
  warn.forFunctions(exports, "useFormat", ["cli"]);
  warn.forProperties(exports, "useFormat", ["padLevels", "stripColors"]);
  warn.forFunctions(exports, "deprecated", [
    "addRewriter",
    "addFilter",
    "clone",
    "extend"
  ]);
  warn.forProperties(exports, "deprecated", ["emitErrs", "levelLength"]);
});

// node_modules/@sinclair/typebox/build/esm/value/guard/guard.mjs
function IsAsyncIterator(value) {
  return IsObject(value) && Symbol.asyncIterator in value;
}
function IsIterator(value) {
  return IsObject(value) && Symbol.iterator in value;
}
function IsStandardObject(value) {
  return IsObject(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
function IsPromise(value) {
  return value instanceof Promise;
}
function IsDate(value) {
  return value instanceof Date && Number.isFinite(value.getTime());
}
function IsTypedArray(value) {
  return ArrayBuffer.isView(value);
}
function IsUint8Array(value) {
  return value instanceof globalThis.Uint8Array;
}
function HasPropertyKey(value, key) {
  return key in value;
}
function IsObject(value) {
  return value !== null && typeof value === "object";
}
function IsArray(value) {
  return Array.isArray(value) && !ArrayBuffer.isView(value);
}
function IsUndefined(value) {
  return value === undefined;
}
function IsNull(value) {
  return value === null;
}
function IsBoolean(value) {
  return typeof value === "boolean";
}
function IsNumber(value) {
  return typeof value === "number";
}
function IsInteger(value) {
  return Number.isInteger(value);
}
function IsBigInt(value) {
  return typeof value === "bigint";
}
function IsString(value) {
  return typeof value === "string";
}
function IsFunction(value) {
  return typeof value === "function";
}
function IsSymbol(value) {
  return typeof value === "symbol";
}
function IsValueType(value) {
  return IsBigInt(value) || IsBoolean(value) || IsNull(value) || IsNumber(value) || IsString(value) || IsSymbol(value) || IsUndefined(value);
}
// node_modules/@sinclair/typebox/build/esm/system/policy.mjs
var TypeSystemPolicy;
(function(TypeSystemPolicy2) {
  TypeSystemPolicy2.ExactOptionalPropertyTypes = false;
  TypeSystemPolicy2.AllowArrayObject = false;
  TypeSystemPolicy2.AllowNaN = false;
  TypeSystemPolicy2.AllowNullVoid = false;
  function IsExactOptionalProperty(value, key) {
    return TypeSystemPolicy2.ExactOptionalPropertyTypes ? key in value : value[key] !== undefined;
  }
  TypeSystemPolicy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value) {
    const isObject = IsObject(value);
    return TypeSystemPolicy2.AllowArrayObject ? isObject : isObject && !IsArray(value);
  }
  TypeSystemPolicy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value) {
    return IsObjectLike(value) && !(value instanceof Date) && !(value instanceof Uint8Array);
  }
  TypeSystemPolicy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value) {
    return TypeSystemPolicy2.AllowNaN ? IsNumber(value) : Number.isFinite(value);
  }
  TypeSystemPolicy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value) {
    const isUndefined = IsUndefined(value);
    return TypeSystemPolicy2.AllowNullVoid ? isUndefined || value === null : isUndefined;
  }
  TypeSystemPolicy2.IsVoidLike = IsVoidLike;
})(TypeSystemPolicy || (TypeSystemPolicy = {}));
// node_modules/@sinclair/typebox/build/esm/type/registry/format.mjs
var exports_format = {};
__export(exports_format, {
  Set: () => Set2,
  Has: () => Has,
  Get: () => Get,
  Entries: () => Entries,
  Delete: () => Delete,
  Clear: () => Clear
});
var map = new Map;
function Entries() {
  return new Map(map);
}
function Clear() {
  return map.clear();
}
function Delete(format) {
  return map.delete(format);
}
function Has(format) {
  return map.has(format);
}
function Set2(format, func) {
  map.set(format, func);
}
function Get(format) {
  return map.get(format);
}
// node_modules/@sinclair/typebox/build/esm/type/registry/type.mjs
var exports_type = {};
__export(exports_type, {
  Set: () => Set3,
  Has: () => Has2,
  Get: () => Get2,
  Entries: () => Entries2,
  Delete: () => Delete2,
  Clear: () => Clear2
});
var map2 = new Map;
function Entries2() {
  return new Map(map2);
}
function Clear2() {
  return map2.clear();
}
function Delete2(kind) {
  return map2.delete(kind);
}
function Has2(kind) {
  return map2.has(kind);
}
function Set3(kind, func) {
  map2.set(kind, func);
}
function Get2(kind) {
  return map2.get(kind);
}
// node_modules/@sinclair/typebox/build/esm/type/symbols/symbols.mjs
var TransformKind = Symbol.for("TypeBox.Transform");
var ReadonlyKind = Symbol.for("TypeBox.Readonly");
var OptionalKind = Symbol.for("TypeBox.Optional");
var Hint = Symbol.for("TypeBox.Hint");
var Kind = Symbol.for("TypeBox.Kind");
// node_modules/@sinclair/typebox/build/esm/type/unsafe/unsafe.mjs
function Unsafe(options = {}) {
  return {
    ...options,
    [Kind]: options[Kind] ?? "Unsafe"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/error/error.mjs
class TypeBoxError extends Error {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/esm/system/system.mjs
class TypeSystemDuplicateTypeKind extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate type kind '${kind}' detected`);
  }
}

class TypeSystemDuplicateFormat extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate string format '${kind}' detected`);
  }
}
var TypeSystem;
(function(TypeSystem2) {
  function Type(kind, check) {
    if (exports_type.Has(kind))
      throw new TypeSystemDuplicateTypeKind(kind);
    exports_type.Set(kind, check);
    return (options = {}) => Unsafe({ ...options, [Kind]: kind });
  }
  TypeSystem2.Type = Type;
  function Format(format, check) {
    if (exports_format.Has(format))
      throw new TypeSystemDuplicateFormat(format);
    exports_format.Set(format, check);
    return format;
  }
  TypeSystem2.Format = Format;
})(TypeSystem || (TypeSystem = {}));
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped-result.mjs
function MappedResult(properties) {
  return {
    [Kind]: "MappedResult",
    properties
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/value.mjs
var exports_value = {};
__export(exports_value, {
  IsUndefined: () => IsUndefined2,
  IsUint8Array: () => IsUint8Array2,
  IsSymbol: () => IsSymbol2,
  IsString: () => IsString2,
  IsRegExp: () => IsRegExp,
  IsObject: () => IsObject2,
  IsNumber: () => IsNumber2,
  IsNull: () => IsNull2,
  IsIterator: () => IsIterator2,
  IsFunction: () => IsFunction2,
  IsDate: () => IsDate2,
  IsBoolean: () => IsBoolean2,
  IsBigInt: () => IsBigInt2,
  IsAsyncIterator: () => IsAsyncIterator2,
  IsArray: () => IsArray2
});
function IsAsyncIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.asyncIterator in value;
}
function IsArray2(value) {
  return Array.isArray(value);
}
function IsBigInt2(value) {
  return typeof value === "bigint";
}
function IsBoolean2(value) {
  return typeof value === "boolean";
}
function IsDate2(value) {
  return value instanceof globalThis.Date;
}
function IsFunction2(value) {
  return typeof value === "function";
}
function IsIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.iterator in value;
}
function IsNull2(value) {
  return value === null;
}
function IsNumber2(value) {
  return typeof value === "number";
}
function IsObject2(value) {
  return typeof value === "object" && value !== null;
}
function IsRegExp(value) {
  return value instanceof globalThis.RegExp;
}
function IsString2(value) {
  return typeof value === "string";
}
function IsSymbol2(value) {
  return typeof value === "symbol";
}
function IsUint8Array2(value) {
  return value instanceof globalThis.Uint8Array;
}
function IsUndefined2(value) {
  return value === undefined;
}

// node_modules/@sinclair/typebox/build/esm/type/clone/value.mjs
function ArrayType(value) {
  return value.map((value2) => Visit(value2));
}
function DateType(value) {
  return new Date(value.getTime());
}
function Uint8ArrayType(value) {
  return new Uint8Array(value);
}
function RegExpType(value) {
  return new RegExp(value.source, value.flags);
}
function ObjectType(value) {
  const result = {};
  for (const key of Object.getOwnPropertyNames(value)) {
    result[key] = Visit(value[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value)) {
    result[key] = Visit(value[key]);
  }
  return result;
}
function Visit(value) {
  return IsArray2(value) ? ArrayType(value) : IsDate2(value) ? DateType(value) : IsUint8Array2(value) ? Uint8ArrayType(value) : IsRegExp(value) ? RegExpType(value) : IsObject2(value) ? ObjectType(value) : value;
}
function Clone(value) {
  return Visit(value);
}

// node_modules/@sinclair/typebox/build/esm/type/clone/type.mjs
function CloneRest(schemas) {
  return schemas.map((schema) => CloneType(schema));
}
function CloneType(schema, options = {}) {
  return { ...Clone(schema), ...options };
}

// node_modules/@sinclair/typebox/build/esm/type/discard/discard.mjs
function DiscardKey(value, key) {
  const { [key]: _, ...rest } = value;
  return rest;
}
function Discard(value, keys) {
  return keys.reduce((acc, key) => DiscardKey(acc, key), value);
}
// node_modules/@sinclair/typebox/build/esm/type/array/array.mjs
function Array2(schema, options = {}) {
  return {
    ...options,
    [Kind]: "Array",
    type: "array",
    items: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/async-iterator/async-iterator.mjs
function AsyncIterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "AsyncIterator",
    type: "AsyncIterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/constructor/constructor.mjs
function Constructor(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Constructor",
    type: "Constructor",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/function/function.mjs
function Function2(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Function",
    type: "Function",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/never/never.mjs
function Never(options = {}) {
  return {
    ...options,
    [Kind]: "Never",
    not: {}
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/kind.mjs
function IsReadonly(value) {
  return IsObject2(value) && value[ReadonlyKind] === "Readonly";
}
function IsOptional(value) {
  return IsObject2(value) && value[OptionalKind] === "Optional";
}
function IsAny(value) {
  return IsKindOf(value, "Any");
}
function IsArray3(value) {
  return IsKindOf(value, "Array");
}
function IsAsyncIterator3(value) {
  return IsKindOf(value, "AsyncIterator");
}
function IsBigInt3(value) {
  return IsKindOf(value, "BigInt");
}
function IsBoolean3(value) {
  return IsKindOf(value, "Boolean");
}
function IsConstructor(value) {
  return IsKindOf(value, "Constructor");
}
function IsDate3(value) {
  return IsKindOf(value, "Date");
}
function IsFunction3(value) {
  return IsKindOf(value, "Function");
}
function IsInteger2(value) {
  return IsKindOf(value, "Integer");
}
function IsIntersect(value) {
  return IsKindOf(value, "Intersect");
}
function IsIterator3(value) {
  return IsKindOf(value, "Iterator");
}
function IsKindOf(value, kind) {
  return IsObject2(value) && Kind in value && value[Kind] === kind;
}
function IsLiteral(value) {
  return IsKindOf(value, "Literal");
}
function IsMappedKey(value) {
  return IsKindOf(value, "MappedKey");
}
function IsMappedResult(value) {
  return IsKindOf(value, "MappedResult");
}
function IsNever(value) {
  return IsKindOf(value, "Never");
}
function IsNot(value) {
  return IsKindOf(value, "Not");
}
function IsNull3(value) {
  return IsKindOf(value, "Null");
}
function IsNumber3(value) {
  return IsKindOf(value, "Number");
}
function IsObject3(value) {
  return IsKindOf(value, "Object");
}
function IsPromise2(value) {
  return IsKindOf(value, "Promise");
}
function IsRecord(value) {
  return IsKindOf(value, "Record");
}
function IsRef(value) {
  return IsKindOf(value, "Ref");
}
function IsRegExp2(value) {
  return IsKindOf(value, "RegExp");
}
function IsString3(value) {
  return IsKindOf(value, "String");
}
function IsSymbol3(value) {
  return IsKindOf(value, "Symbol");
}
function IsTemplateLiteral(value) {
  return IsKindOf(value, "TemplateLiteral");
}
function IsThis(value) {
  return IsKindOf(value, "This");
}
function IsTransform(value) {
  return IsObject2(value) && TransformKind in value;
}
function IsTuple(value) {
  return IsKindOf(value, "Tuple");
}
function IsUndefined3(value) {
  return IsKindOf(value, "Undefined");
}
function IsUnion(value) {
  return IsKindOf(value, "Union");
}
function IsUint8Array3(value) {
  return IsKindOf(value, "Uint8Array");
}
function IsUnknown(value) {
  return IsKindOf(value, "Unknown");
}
function IsUnsafe(value) {
  return IsKindOf(value, "Unsafe");
}
function IsVoid(value) {
  return IsKindOf(value, "Void");
}
function IsKind(value) {
  return IsObject2(value) && Kind in value && IsString2(value[Kind]);
}
function IsSchema(value) {
  return IsAny(value) || IsArray3(value) || IsBoolean3(value) || IsBigInt3(value) || IsAsyncIterator3(value) || IsConstructor(value) || IsDate3(value) || IsFunction3(value) || IsInteger2(value) || IsIntersect(value) || IsIterator3(value) || IsLiteral(value) || IsMappedKey(value) || IsMappedResult(value) || IsNever(value) || IsNot(value) || IsNull3(value) || IsNumber3(value) || IsObject3(value) || IsPromise2(value) || IsRecord(value) || IsRef(value) || IsRegExp2(value) || IsString3(value) || IsSymbol3(value) || IsTemplateLiteral(value) || IsThis(value) || IsTuple(value) || IsUndefined3(value) || IsUnion(value) || IsUint8Array3(value) || IsUnknown(value) || IsUnsafe(value) || IsVoid(value) || IsKind(value);
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional.mjs
function RemoveOptional(schema) {
  return Discard(CloneType(schema), [OptionalKind]);
}
function AddOptional(schema) {
  return { ...CloneType(schema), [OptionalKind]: "Optional" };
}
function OptionalWithFlag(schema, F) {
  return F === false ? RemoveOptional(schema) : AddOptional(schema);
}
function Optional(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? OptionalFromMappedResult(schema, F) : OptionalWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional-from-mapped-result.mjs
function FromProperties(P, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Optional(P[K2], F);
  return Acc;
}
function FromMappedResult(R, F) {
  return FromProperties(R.properties, F);
}
function OptionalFromMappedResult(R, F) {
  const P = FromMappedResult(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-create.mjs
function IntersectCreate(T, options) {
  const allObjects = T.every((schema) => IsObject3(schema));
  const clonedUnevaluatedProperties = IsSchema(options.unevaluatedProperties) ? { unevaluatedProperties: CloneType(options.unevaluatedProperties) } : {};
  return options.unevaluatedProperties === false || IsSchema(options.unevaluatedProperties) || allObjects ? { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", type: "object", allOf: CloneRest(T) } : { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", allOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-evaluated.mjs
function IsIntersectOptional(T) {
  return T.every((L) => IsOptional(L));
}
function RemoveOptionalFromType(T) {
  return Discard(T, [OptionalKind]);
}
function RemoveOptionalFromRest(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType(L) : L);
}
function ResolveIntersect(T, options) {
  return IsIntersectOptional(T) ? Optional(IntersectCreate(RemoveOptionalFromRest(T), options)) : IntersectCreate(RemoveOptionalFromRest(T), options);
}
function IntersectEvaluated(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return ResolveIntersect(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect.mjs
function Intersect(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return IntersectCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union-create.mjs
function UnionCreate(T, options) {
  return { ...options, [Kind]: "Union", anyOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/esm/type/union/union-evaluated.mjs
function IsUnionOptional(T) {
  return T.some((L) => IsOptional(L));
}
function RemoveOptionalFromRest2(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType2(L) : L);
}
function RemoveOptionalFromType2(T) {
  return Discard(T, [OptionalKind]);
}
function ResolveUnion(T, options) {
  return IsUnionOptional(T) ? Optional(UnionCreate(RemoveOptionalFromRest2(T), options)) : UnionCreate(RemoveOptionalFromRest2(T), options);
}
function UnionEvaluated(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : ResolveUnion(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union.mjs
function Union(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : UnionCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/parse.mjs
class TemplateLiteralParserError extends TypeBoxError {
}
function Unescape(pattern) {
  return pattern.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
}
function IsNonEscaped(pattern, index, char) {
  return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
}
function IsOpenParen(pattern, index) {
  return IsNonEscaped(pattern, index, "(");
}
function IsCloseParen(pattern, index) {
  return IsNonEscaped(pattern, index, ")");
}
function IsSeparator(pattern, index) {
  return IsNonEscaped(pattern, index, "|");
}
function IsGroup(pattern) {
  if (!(IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)))
    return false;
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (count === 0 && index !== pattern.length - 1)
      return false;
  }
  return true;
}
function InGroup(pattern) {
  return pattern.slice(1, pattern.length - 1);
}
function IsPrecedenceOr(pattern) {
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0)
      return true;
  }
  return false;
}
function IsPrecedenceAnd(pattern) {
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      return true;
  }
  return false;
}
function Or(pattern) {
  let [count, start] = [0, 0];
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0) {
      const range2 = pattern.slice(start, index);
      if (range2.length > 0)
        expressions.push(TemplateLiteralParse(range2));
      start = index + 1;
    }
  }
  const range = pattern.slice(start);
  if (range.length > 0)
    expressions.push(TemplateLiteralParse(range));
  if (expressions.length === 0)
    return { type: "const", const: "" };
  if (expressions.length === 1)
    return expressions[0];
  return { type: "or", expr: expressions };
}
function And(pattern) {
  function Group(value, index) {
    if (!IsOpenParen(value, index))
      throw new TemplateLiteralParserError(`TemplateLiteralParser: Index must point to open parens`);
    let count = 0;
    for (let scan = index;scan < value.length; scan++) {
      if (IsOpenParen(value, scan))
        count += 1;
      if (IsCloseParen(value, scan))
        count -= 1;
      if (count === 0)
        return [index, scan];
    }
    throw new TemplateLiteralParserError(`TemplateLiteralParser: Unclosed group parens in expression`);
  }
  function Range(pattern2, index) {
    for (let scan = index;scan < pattern2.length; scan++) {
      if (IsOpenParen(pattern2, scan))
        return [index, scan];
    }
    return [index, pattern2.length];
  }
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) {
      const [start, end] = Group(pattern, index);
      const range = pattern.slice(start, end + 1);
      expressions.push(TemplateLiteralParse(range));
      index = end;
    } else {
      const [start, end] = Range(pattern, index);
      const range = pattern.slice(start, end);
      if (range.length > 0)
        expressions.push(TemplateLiteralParse(range));
      index = end - 1;
    }
  }
  return expressions.length === 0 ? { type: "const", const: "" } : expressions.length === 1 ? expressions[0] : { type: "and", expr: expressions };
}
function TemplateLiteralParse(pattern) {
  return IsGroup(pattern) ? TemplateLiteralParse(InGroup(pattern)) : IsPrecedenceOr(pattern) ? Or(pattern) : IsPrecedenceAnd(pattern) ? And(pattern) : { type: "const", const: Unescape(pattern) };
}
function TemplateLiteralParseExact(pattern) {
  return TemplateLiteralParse(pattern.slice(1, pattern.length - 1));
}

// node_modules/@sinclair/typebox/build/esm/type/template-literal/finite.mjs
class TemplateLiteralFiniteError extends TypeBoxError {
}
function IsNumberExpression(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "0" && expression.expr[1].type === "const" && expression.expr[1].const === "[1-9][0-9]*";
}
function IsBooleanExpression(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "true" && expression.expr[1].type === "const" && expression.expr[1].const === "false";
}
function IsStringExpression(expression) {
  return expression.type === "const" && expression.const === ".*";
}
function IsTemplateLiteralExpressionFinite(expression) {
  return IsNumberExpression(expression) || IsStringExpression(expression) ? false : IsBooleanExpression(expression) ? true : expression.type === "and" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "or" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "const" ? true : (() => {
    throw new TemplateLiteralFiniteError(`Unknown expression type`);
  })();
}
function IsTemplateLiteralFinite(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/generate.mjs
class TemplateLiteralGenerateError extends TypeBoxError {
}
function* GenerateReduce(buffer) {
  if (buffer.length === 1)
    return yield* buffer[0];
  for (const left of buffer[0]) {
    for (const right of GenerateReduce(buffer.slice(1))) {
      yield `${left}${right}`;
    }
  }
}
function* GenerateAnd(expression) {
  return yield* GenerateReduce(expression.expr.map((expr) => [...TemplateLiteralExpressionGenerate(expr)]));
}
function* GenerateOr(expression) {
  for (const expr of expression.expr)
    yield* TemplateLiteralExpressionGenerate(expr);
}
function* GenerateConst(expression) {
  return yield expression.const;
}
function* TemplateLiteralExpressionGenerate(expression) {
  return expression.type === "and" ? yield* GenerateAnd(expression) : expression.type === "or" ? yield* GenerateOr(expression) : expression.type === "const" ? yield* GenerateConst(expression) : (() => {
    throw new TemplateLiteralGenerateError("Unknown expression");
  })();
}
function TemplateLiteralGenerate(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression) ? [...TemplateLiteralExpressionGenerate(expression)] : [];
}
// node_modules/@sinclair/typebox/build/esm/type/literal/literal.mjs
function Literal(value, options = {}) {
  return {
    ...options,
    [Kind]: "Literal",
    const: value,
    type: typeof value
  };
}
// node_modules/@sinclair/typebox/build/esm/type/boolean/boolean.mjs
function Boolean2(options = {}) {
  return {
    ...options,
    [Kind]: "Boolean",
    type: "boolean"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/bigint/bigint.mjs
function BigInt2(options = {}) {
  return {
    ...options,
    [Kind]: "BigInt",
    type: "bigint"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/number/number.mjs
function Number2(options = {}) {
  return {
    ...options,
    [Kind]: "Number",
    type: "number"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/string/string.mjs
function String2(options = {}) {
  return { ...options, [Kind]: "String", type: "string" };
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/syntax.mjs
function* FromUnion(syntax) {
  const trim = syntax.trim().replace(/"|'/g, "");
  return trim === "boolean" ? yield Boolean2() : trim === "number" ? yield Number2() : trim === "bigint" ? yield BigInt2() : trim === "string" ? yield String2() : yield (() => {
    const literals = trim.split("|").map((literal2) => Literal(literal2.trim()));
    return literals.length === 0 ? Never() : literals.length === 1 ? literals[0] : UnionEvaluated(literals);
  })();
}
function* FromTerminal(syntax) {
  if (syntax[1] !== "{") {
    const L = Literal("$");
    const R = FromSyntax(syntax.slice(1));
    return yield* [L, ...R];
  }
  for (let i = 2;i < syntax.length; i++) {
    if (syntax[i] === "}") {
      const L = FromUnion(syntax.slice(2, i));
      const R = FromSyntax(syntax.slice(i + 1));
      return yield* [...L, ...R];
    }
  }
  yield Literal(syntax);
}
function* FromSyntax(syntax) {
  for (let i = 0;i < syntax.length; i++) {
    if (syntax[i] === "$") {
      const L = Literal(syntax.slice(0, i));
      const R = FromTerminal(syntax.slice(i));
      return yield* [L, ...R];
    }
  }
  yield Literal(syntax);
}
function TemplateLiteralSyntax(syntax) {
  return [...FromSyntax(syntax)];
}
// node_modules/@sinclair/typebox/build/esm/type/patterns/patterns.mjs
var PatternBoolean = "(true|false)";
var PatternNumber = "(0|[1-9][0-9]*)";
var PatternString = "(.*)";
var PatternBooleanExact = `^${PatternBoolean}$`;
var PatternNumberExact = `^${PatternNumber}$`;
var PatternStringExact = `^${PatternString}$`;
// node_modules/@sinclair/typebox/build/esm/type/template-literal/pattern.mjs
class TemplateLiteralPatternError extends TypeBoxError {
}
function Escape(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Visit2(schema, acc) {
  return IsTemplateLiteral(schema) ? schema.pattern.slice(1, schema.pattern.length - 1) : IsUnion(schema) ? `(${schema.anyOf.map((schema2) => Visit2(schema2, acc)).join("|")})` : IsNumber3(schema) ? `${acc}${PatternNumber}` : IsInteger2(schema) ? `${acc}${PatternNumber}` : IsBigInt3(schema) ? `${acc}${PatternNumber}` : IsString3(schema) ? `${acc}${PatternString}` : IsLiteral(schema) ? `${acc}${Escape(schema.const.toString())}` : IsBoolean3(schema) ? `${acc}${PatternBoolean}` : (() => {
    throw new TemplateLiteralPatternError(`Unexpected Kind '${schema[Kind]}'`);
  })();
}
function TemplateLiteralPattern(kinds) {
  return `^${kinds.map((schema) => Visit2(schema, "")).join("")}$`;
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/union.mjs
function TemplateLiteralToUnion(schema) {
  const R = TemplateLiteralGenerate(schema);
  const L = R.map((S) => Literal(S));
  return UnionEvaluated(L);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/template-literal.mjs
function TemplateLiteral(unresolved, options = {}) {
  const pattern = IsString2(unresolved) ? TemplateLiteralPattern(TemplateLiteralSyntax(unresolved)) : TemplateLiteralPattern(unresolved);
  return { ...options, [Kind]: "TemplateLiteral", type: "string", pattern };
}
// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-property-keys.mjs
function FromTemplateLiteral(T) {
  const R = TemplateLiteralGenerate(T);
  return R.map((S) => S.toString());
}
function FromUnion2(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexPropertyKeys(L));
  return Acc;
}
function FromLiteral(T) {
  return [T.toString()];
}
function IndexPropertyKeys(T) {
  return [...new Set(IsTemplateLiteral(T) ? FromTemplateLiteral(T) : IsUnion(T) ? FromUnion2(T.anyOf) : IsLiteral(T) ? FromLiteral(T.const) : IsNumber3(T) ? ["[number]"] : IsInteger2(T) ? ["[number]"] : [])];
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-result.mjs
function FromProperties2(T, P, options) {
  const Acc = {};
  for (const K2 of Object.getOwnPropertyNames(P)) {
    Acc[K2] = Index(T, IndexPropertyKeys(P[K2]), options);
  }
  return Acc;
}
function FromMappedResult2(T, R, options) {
  return FromProperties2(T, R.properties, options);
}
function IndexFromMappedResult(T, R, options) {
  const P = FromMappedResult2(T, R, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed.mjs
function FromRest(T, K) {
  return T.map((L) => IndexFromPropertyKey(L, K));
}
function FromIntersectRest(T) {
  return T.filter((L) => !IsNever(L));
}
function FromIntersect(T, K) {
  return IntersectEvaluated(FromIntersectRest(FromRest(T, K)));
}
function FromUnionRest(T) {
  return T.some((L) => IsNever(L)) ? [] : T;
}
function FromUnion3(T, K) {
  return UnionEvaluated(FromUnionRest(FromRest(T, K)));
}
function FromTuple(T, K) {
  return K in T ? T[K] : K === "[number]" ? UnionEvaluated(T) : Never();
}
function FromArray(T, K) {
  return K === "[number]" ? T : Never();
}
function FromProperty(T, K) {
  return K in T ? T[K] : Never();
}
function IndexFromPropertyKey(T, K) {
  return IsIntersect(T) ? FromIntersect(T.allOf, K) : IsUnion(T) ? FromUnion3(T.anyOf, K) : IsTuple(T) ? FromTuple(T.items ?? [], K) : IsArray3(T) ? FromArray(T.items, K) : IsObject3(T) ? FromProperty(T.properties, K) : Never();
}
function IndexFromPropertyKeys(T, K) {
  return K.map((L) => IndexFromPropertyKey(T, L));
}
function FromSchema(T, K) {
  return UnionEvaluated(IndexFromPropertyKeys(T, K));
}
function Index(T, K, options = {}) {
  return IsMappedResult(K) ? CloneType(IndexFromMappedResult(T, K, options)) : IsMappedKey(K) ? CloneType(IndexFromMappedKey(T, K, options)) : IsSchema(K) ? CloneType(FromSchema(T, IndexPropertyKeys(K)), options) : CloneType(FromSchema(T, K), options);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-key.mjs
function MappedIndexPropertyKey(T, K, options) {
  return { [K]: Index(T, [K], options) };
}
function MappedIndexPropertyKeys(T, K, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIndexPropertyKey(T, L, options) };
  }, {});
}
function MappedIndexProperties(T, K, options) {
  return MappedIndexPropertyKeys(T, K.keys, options);
}
function IndexFromMappedKey(T, K, options) {
  const P = MappedIndexProperties(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/iterator/iterator.mjs
function Iterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "Iterator",
    type: "Iterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/object/object.mjs
function _Object(properties, options = {}) {
  const propertyKeys = globalThis.Object.getOwnPropertyNames(properties);
  const optionalKeys = propertyKeys.filter((key) => IsOptional(properties[key]));
  const requiredKeys = propertyKeys.filter((name) => !optionalKeys.includes(name));
  const clonedAdditionalProperties = IsSchema(options.additionalProperties) ? { additionalProperties: CloneType(options.additionalProperties) } : {};
  const clonedProperties = {};
  for (const key of propertyKeys)
    clonedProperties[key] = CloneType(properties[key]);
  return requiredKeys.length > 0 ? { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties, required: requiredKeys } : { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties };
}
var Object2 = _Object;
// node_modules/@sinclair/typebox/build/esm/type/promise/promise.mjs
function Promise2(item, options = {}) {
  return {
    ...options,
    [Kind]: "Promise",
    type: "Promise",
    item: CloneType(item)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly.mjs
function RemoveReadonly(schema) {
  return Discard(CloneType(schema), [ReadonlyKind]);
}
function AddReadonly(schema) {
  return { ...CloneType(schema), [ReadonlyKind]: "Readonly" };
}
function ReadonlyWithFlag(schema, F) {
  return F === false ? RemoveReadonly(schema) : AddReadonly(schema);
}
function Readonly(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? ReadonlyFromMappedResult(schema, F) : ReadonlyWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly-from-mapped-result.mjs
function FromProperties3(K, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Readonly(K[K2], F);
  return Acc;
}
function FromMappedResult3(R, F) {
  return FromProperties3(R.properties, F);
}
function ReadonlyFromMappedResult(R, F) {
  const P = FromMappedResult3(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/tuple/tuple.mjs
function Tuple(items, options = {}) {
  const [additionalItems, minItems, maxItems] = [false, items.length, items.length];
  return items.length > 0 ? { ...options, [Kind]: "Tuple", type: "array", items: CloneRest(items), additionalItems, minItems, maxItems } : { ...options, [Kind]: "Tuple", type: "array", minItems, maxItems };
}
// node_modules/@sinclair/typebox/build/esm/type/sets/set.mjs
function SetIncludes(T, S) {
  return T.includes(S);
}
function SetDistinct(T) {
  return [...new Set(T)];
}
function SetIntersect(T, S) {
  return T.filter((L) => S.includes(L));
}
function SetIntersectManyResolve(T, Init) {
  return T.reduce((Acc, L) => {
    return SetIntersect(Acc, L);
  }, Init);
}
function SetIntersectMany(T) {
  return T.length === 1 ? T[0] : T.length > 1 ? SetIntersectManyResolve(T.slice(1), T[0]) : [];
}
function SetUnionMany(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...L);
  return Acc;
}
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped.mjs
function FromMappedResult4(K, P) {
  return K in P ? FromSchemaType(K, P[K]) : MappedResult(P);
}
function MappedKeyToKnownMappedResultProperties(K) {
  return { [K]: Literal(K) };
}
function MappedKeyToUnknownMappedResultProperties(P) {
  const Acc = {};
  for (const L of P)
    Acc[L] = Literal(L);
  return Acc;
}
function MappedKeyToMappedResultProperties(K, P) {
  return SetIncludes(P, K) ? MappedKeyToKnownMappedResultProperties(K) : MappedKeyToUnknownMappedResultProperties(P);
}
function FromMappedKey(K, P) {
  const R = MappedKeyToMappedResultProperties(K, P);
  return FromMappedResult4(K, R);
}
function FromRest2(K, T) {
  return T.map((L) => FromSchemaType(K, L));
}
function FromProperties4(K, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(T))
    Acc[K2] = FromSchemaType(K, T[K2]);
  return Acc;
}
function FromSchemaType(K, T) {
  return IsOptional(T) ? Optional(FromSchemaType(K, Discard(T, [OptionalKind]))) : IsReadonly(T) ? Readonly(FromSchemaType(K, Discard(T, [ReadonlyKind]))) : IsMappedResult(T) ? FromMappedResult4(K, T.properties) : IsMappedKey(T) ? FromMappedKey(K, T.keys) : IsConstructor(T) ? Constructor(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsFunction3(T) ? Function2(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsAsyncIterator3(T) ? AsyncIterator(FromSchemaType(K, T.items)) : IsIterator3(T) ? Iterator(FromSchemaType(K, T.items)) : IsIntersect(T) ? Intersect(FromRest2(K, T.allOf)) : IsUnion(T) ? Union(FromRest2(K, T.anyOf)) : IsTuple(T) ? Tuple(FromRest2(K, T.items ?? [])) : IsObject3(T) ? Object2(FromProperties4(K, T.properties)) : IsArray3(T) ? Array2(FromSchemaType(K, T.items)) : IsPromise2(T) ? Promise2(FromSchemaType(K, T.item)) : T;
}
function MappedFunctionReturnType(K, T) {
  const Acc = {};
  for (const L of K)
    Acc[L] = FromSchemaType(L, T);
  return Acc;
}
function Mapped(key, map3, options = {}) {
  const K = IsSchema(key) ? IndexPropertyKeys(key) : key;
  const RT = map3({ [Kind]: "MappedKey", keys: K });
  const R = MappedFunctionReturnType(K, RT);
  return CloneType(Object2(R), options);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-keys.mjs
function FromRest3(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(KeyOfPropertyKeys(L));
  return Acc;
}
function FromIntersect2(T) {
  const C = FromRest3(T);
  const R = SetUnionMany(C);
  return R;
}
function FromUnion4(T) {
  const C = FromRest3(T);
  const R = SetIntersectMany(C);
  return R;
}
function FromTuple2(T) {
  return T.map((_, I) => I.toString());
}
function FromArray2(_) {
  return ["[number]"];
}
function FromProperties5(T) {
  return globalThis.Object.getOwnPropertyNames(T);
}
function FromPatternProperties(patternProperties) {
  if (!includePatternProperties)
    return [];
  const patternPropertyKeys = globalThis.Object.getOwnPropertyNames(patternProperties);
  return patternPropertyKeys.map((key) => {
    return key[0] === "^" && key[key.length - 1] === "$" ? key.slice(1, key.length - 1) : key;
  });
}
function KeyOfPropertyKeys(T) {
  return IsIntersect(T) ? FromIntersect2(T.allOf) : IsUnion(T) ? FromUnion4(T.anyOf) : IsTuple(T) ? FromTuple2(T.items ?? []) : IsArray3(T) ? FromArray2(T.items) : IsObject3(T) ? FromProperties5(T.properties) : IsRecord(T) ? FromPatternProperties(T.patternProperties) : [];
}
var includePatternProperties = false;
function KeyOfPattern(schema) {
  includePatternProperties = true;
  const keys = KeyOfPropertyKeys(schema);
  includePatternProperties = false;
  const pattern2 = keys.map((key) => `(${key})`);
  return `^(${pattern2.join("|")})$`;
}

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof.mjs
function KeyOfPropertyKeysToRest(T) {
  return T.map((L) => L === "[number]" ? Number2() : Literal(L));
}
function KeyOf(T, options = {}) {
  if (IsMappedResult(T)) {
    return KeyOfFromMappedResult(T, options);
  } else {
    const K = KeyOfPropertyKeys(T);
    const S = KeyOfPropertyKeysToRest(K);
    const U = UnionEvaluated(S);
    return CloneType(U, options);
  }
}

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-from-mapped-result.mjs
function FromProperties6(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = KeyOf(K[K2], options);
  return Acc;
}
function FromMappedResult5(R, options) {
  return FromProperties6(R.properties, options);
}
function KeyOfFromMappedResult(R, options) {
  const P = FromMappedResult5(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-entries.mjs
function KeyOfPropertyEntries(schema) {
  const keys = KeyOfPropertyKeys(schema);
  const schemas = IndexFromPropertyKeys(schema, keys);
  return keys.map((_, index) => [keys[index], schemas[index]]);
}
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-undefined.mjs
function Intersect2(schema) {
  return schema.allOf.every((schema2) => ExtendsUndefinedCheck(schema2));
}
function Union2(schema) {
  return schema.anyOf.some((schema2) => ExtendsUndefinedCheck(schema2));
}
function Not(schema) {
  return !ExtendsUndefinedCheck(schema.not);
}
function ExtendsUndefinedCheck(schema) {
  return schema[Kind] === "Intersect" ? Intersect2(schema) : schema[Kind] === "Union" ? Union2(schema) : schema[Kind] === "Not" ? Not(schema) : schema[Kind] === "Undefined" ? true : false;
}

// node_modules/@sinclair/typebox/build/esm/errors/function.mjs
function DefaultErrorFunction(error2) {
  switch (error2.errorType) {
    case ValueErrorType.ArrayContains:
      return "Expected array to contain at least one matching value";
    case ValueErrorType.ArrayMaxContains:
      return `Expected array to contain no more than ${error2.schema.maxContains} matching values`;
    case ValueErrorType.ArrayMinContains:
      return `Expected array to contain at least ${error2.schema.minContains} matching values`;
    case ValueErrorType.ArrayMaxItems:
      return `Expected array length to be less or equal to ${error2.schema.maxItems}`;
    case ValueErrorType.ArrayMinItems:
      return `Expected array length to be greater or equal to ${error2.schema.minItems}`;
    case ValueErrorType.ArrayUniqueItems:
      return "Expected array elements to be unique";
    case ValueErrorType.Array:
      return "Expected array";
    case ValueErrorType.AsyncIterator:
      return "Expected AsyncIterator";
    case ValueErrorType.BigIntExclusiveMaximum:
      return `Expected bigint to be less than ${error2.schema.exclusiveMaximum}`;
    case ValueErrorType.BigIntExclusiveMinimum:
      return `Expected bigint to be greater than ${error2.schema.exclusiveMinimum}`;
    case ValueErrorType.BigIntMaximum:
      return `Expected bigint to be less or equal to ${error2.schema.maximum}`;
    case ValueErrorType.BigIntMinimum:
      return `Expected bigint to be greater or equal to ${error2.schema.minimum}`;
    case ValueErrorType.BigIntMultipleOf:
      return `Expected bigint to be a multiple of ${error2.schema.multipleOf}`;
    case ValueErrorType.BigInt:
      return "Expected bigint";
    case ValueErrorType.Boolean:
      return "Expected boolean";
    case ValueErrorType.DateExclusiveMinimumTimestamp:
      return `Expected Date timestamp to be greater than ${error2.schema.exclusiveMinimumTimestamp}`;
    case ValueErrorType.DateExclusiveMaximumTimestamp:
      return `Expected Date timestamp to be less than ${error2.schema.exclusiveMaximumTimestamp}`;
    case ValueErrorType.DateMinimumTimestamp:
      return `Expected Date timestamp to be greater or equal to ${error2.schema.minimumTimestamp}`;
    case ValueErrorType.DateMaximumTimestamp:
      return `Expected Date timestamp to be less or equal to ${error2.schema.maximumTimestamp}`;
    case ValueErrorType.DateMultipleOfTimestamp:
      return `Expected Date timestamp to be a multiple of ${error2.schema.multipleOfTimestamp}`;
    case ValueErrorType.Date:
      return "Expected Date";
    case ValueErrorType.Function:
      return "Expected function";
    case ValueErrorType.IntegerExclusiveMaximum:
      return `Expected integer to be less than ${error2.schema.exclusiveMaximum}`;
    case ValueErrorType.IntegerExclusiveMinimum:
      return `Expected integer to be greater than ${error2.schema.exclusiveMinimum}`;
    case ValueErrorType.IntegerMaximum:
      return `Expected integer to be less or equal to ${error2.schema.maximum}`;
    case ValueErrorType.IntegerMinimum:
      return `Expected integer to be greater or equal to ${error2.schema.minimum}`;
    case ValueErrorType.IntegerMultipleOf:
      return `Expected integer to be a multiple of ${error2.schema.multipleOf}`;
    case ValueErrorType.Integer:
      return "Expected integer";
    case ValueErrorType.IntersectUnevaluatedProperties:
      return "Unexpected property";
    case ValueErrorType.Intersect:
      return "Expected all values to match";
    case ValueErrorType.Iterator:
      return "Expected Iterator";
    case ValueErrorType.Literal:
      return `Expected ${typeof error2.schema.const === "string" ? `'${error2.schema.const}'` : error2.schema.const}`;
    case ValueErrorType.Never:
      return "Never";
    case ValueErrorType.Not:
      return "Value should not match";
    case ValueErrorType.Null:
      return "Expected null";
    case ValueErrorType.NumberExclusiveMaximum:
      return `Expected number to be less than ${error2.schema.exclusiveMaximum}`;
    case ValueErrorType.NumberExclusiveMinimum:
      return `Expected number to be greater than ${error2.schema.exclusiveMinimum}`;
    case ValueErrorType.NumberMaximum:
      return `Expected number to be less or equal to ${error2.schema.maximum}`;
    case ValueErrorType.NumberMinimum:
      return `Expected number to be greater or equal to ${error2.schema.minimum}`;
    case ValueErrorType.NumberMultipleOf:
      return `Expected number to be a multiple of ${error2.schema.multipleOf}`;
    case ValueErrorType.Number:
      return "Expected number";
    case ValueErrorType.Object:
      return "Expected object";
    case ValueErrorType.ObjectAdditionalProperties:
      return "Unexpected property";
    case ValueErrorType.ObjectMaxProperties:
      return `Expected object to have no more than ${error2.schema.maxProperties} properties`;
    case ValueErrorType.ObjectMinProperties:
      return `Expected object to have at least ${error2.schema.minProperties} properties`;
    case ValueErrorType.ObjectRequiredProperty:
      return "Required property";
    case ValueErrorType.Promise:
      return "Expected Promise";
    case ValueErrorType.RegExp:
      return "Expected string to match regular expression";
    case ValueErrorType.StringFormatUnknown:
      return `Unknown format '${error2.schema.format}'`;
    case ValueErrorType.StringFormat:
      return `Expected string to match '${error2.schema.format}' format`;
    case ValueErrorType.StringMaxLength:
      return `Expected string length less or equal to ${error2.schema.maxLength}`;
    case ValueErrorType.StringMinLength:
      return `Expected string length greater or equal to ${error2.schema.minLength}`;
    case ValueErrorType.StringPattern:
      return `Expected string to match '${error2.schema.pattern}'`;
    case ValueErrorType.String:
      return "Expected string";
    case ValueErrorType.Symbol:
      return "Expected symbol";
    case ValueErrorType.TupleLength:
      return `Expected tuple to have ${error2.schema.maxItems || 0} elements`;
    case ValueErrorType.Tuple:
      return "Expected tuple";
    case ValueErrorType.Uint8ArrayMaxByteLength:
      return `Expected byte length less or equal to ${error2.schema.maxByteLength}`;
    case ValueErrorType.Uint8ArrayMinByteLength:
      return `Expected byte length greater or equal to ${error2.schema.minByteLength}`;
    case ValueErrorType.Uint8Array:
      return "Expected Uint8Array";
    case ValueErrorType.Undefined:
      return "Expected undefined";
    case ValueErrorType.Union:
      return "Expected union value";
    case ValueErrorType.Void:
      return "Expected void";
    case ValueErrorType.Kind:
      return `Expected kind '${error2.schema[Kind]}'`;
    default:
      return "Unknown error type";
  }
}
var errorFunction = DefaultErrorFunction;
function GetErrorFunction() {
  return errorFunction;
}

// node_modules/@sinclair/typebox/build/esm/value/deref/deref.mjs
class TypeDereferenceError extends TypeBoxError {
  constructor(schema) {
    super(`Unable to dereference schema with $id '${schema.$id}'`);
    this.schema = schema;
  }
}
function Resolve(schema, references) {
  const target = references.find((target2) => target2.$id === schema.$ref);
  if (target === undefined)
    throw new TypeDereferenceError(schema);
  return Deref(target, references);
}
function Deref(schema, references) {
  return schema[Kind] === "This" || schema[Kind] === "Ref" ? Resolve(schema, references) : schema;
}
// node_modules/@sinclair/typebox/build/esm/value/hash/hash.mjs
class ValueHashError extends TypeBoxError {
  constructor(value) {
    super(`Unable to hash value`);
    this.value = value;
  }
}
var ByteMarker;
(function(ByteMarker2) {
  ByteMarker2[ByteMarker2["Undefined"] = 0] = "Undefined";
  ByteMarker2[ByteMarker2["Null"] = 1] = "Null";
  ByteMarker2[ByteMarker2["Boolean"] = 2] = "Boolean";
  ByteMarker2[ByteMarker2["Number"] = 3] = "Number";
  ByteMarker2[ByteMarker2["String"] = 4] = "String";
  ByteMarker2[ByteMarker2["Object"] = 5] = "Object";
  ByteMarker2[ByteMarker2["Array"] = 6] = "Array";
  ByteMarker2[ByteMarker2["Date"] = 7] = "Date";
  ByteMarker2[ByteMarker2["Uint8Array"] = 8] = "Uint8Array";
  ByteMarker2[ByteMarker2["Symbol"] = 9] = "Symbol";
  ByteMarker2[ByteMarker2["BigInt"] = 10] = "BigInt";
})(ByteMarker || (ByteMarker = {}));
var Accumulator = BigInt("14695981039346656037");
var [Prime, Size] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")];
var Bytes = Array.from({ length: 256 }).map((_, i) => BigInt(i));
var F64 = new Float64Array(1);
var F64In = new DataView(F64.buffer);
var F64Out = new Uint8Array(F64.buffer);
function* NumberToBytes(value) {
  const byteCount = value === 0 ? 1 : Math.ceil(Math.floor(Math.log2(value) + 1) / 8);
  for (let i = 0;i < byteCount; i++) {
    yield value >> 8 * (byteCount - 1 - i) & 255;
  }
}
function ArrayType2(value) {
  FNV1A64(ByteMarker.Array);
  for (const item of value) {
    Visit3(item);
  }
}
function BooleanType(value) {
  FNV1A64(ByteMarker.Boolean);
  FNV1A64(value ? 1 : 0);
}
function BigIntType(value) {
  FNV1A64(ByteMarker.BigInt);
  F64In.setBigInt64(0, value);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
}
function DateType2(value) {
  FNV1A64(ByteMarker.Date);
  Visit3(value.getTime());
}
function NullType(value) {
  FNV1A64(ByteMarker.Null);
}
function NumberType(value) {
  FNV1A64(ByteMarker.Number);
  F64In.setFloat64(0, value);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
}
function ObjectType2(value) {
  FNV1A64(ByteMarker.Object);
  for (const key of globalThis.Object.getOwnPropertyNames(value).sort()) {
    Visit3(key);
    Visit3(value[key]);
  }
}
function StringType(value) {
  FNV1A64(ByteMarker.String);
  for (let i = 0;i < value.length; i++) {
    for (const byte of NumberToBytes(value.charCodeAt(i))) {
      FNV1A64(byte);
    }
  }
}
function SymbolType(value) {
  FNV1A64(ByteMarker.Symbol);
  Visit3(value.description);
}
function Uint8ArrayType2(value) {
  FNV1A64(ByteMarker.Uint8Array);
  for (let i = 0;i < value.length; i++) {
    FNV1A64(value[i]);
  }
}
function UndefinedType(value) {
  return FNV1A64(ByteMarker.Undefined);
}
function Visit3(value) {
  if (IsArray(value))
    return ArrayType2(value);
  if (IsBoolean(value))
    return BooleanType(value);
  if (IsBigInt(value))
    return BigIntType(value);
  if (IsDate(value))
    return DateType2(value);
  if (IsNull(value))
    return NullType(value);
  if (IsNumber(value))
    return NumberType(value);
  if (IsStandardObject(value))
    return ObjectType2(value);
  if (IsString(value))
    return StringType(value);
  if (IsSymbol(value))
    return SymbolType(value);
  if (IsUint8Array(value))
    return Uint8ArrayType2(value);
  if (IsUndefined(value))
    return UndefinedType(value);
  throw new ValueHashError(value);
}
function FNV1A64(byte) {
  Accumulator = Accumulator ^ Bytes[byte];
  Accumulator = Accumulator * Prime % Size;
}
function Hash(value) {
  Accumulator = BigInt("14695981039346656037");
  Visit3(value);
  return Accumulator;
}
// node_modules/@sinclair/typebox/build/esm/errors/errors.mjs
var ValueErrorType;
(function(ValueErrorType2) {
  ValueErrorType2[ValueErrorType2["ArrayContains"] = 0] = "ArrayContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxContains"] = 1] = "ArrayMaxContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxItems"] = 2] = "ArrayMaxItems";
  ValueErrorType2[ValueErrorType2["ArrayMinContains"] = 3] = "ArrayMinContains";
  ValueErrorType2[ValueErrorType2["ArrayMinItems"] = 4] = "ArrayMinItems";
  ValueErrorType2[ValueErrorType2["ArrayUniqueItems"] = 5] = "ArrayUniqueItems";
  ValueErrorType2[ValueErrorType2["Array"] = 6] = "Array";
  ValueErrorType2[ValueErrorType2["AsyncIterator"] = 7] = "AsyncIterator";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMaximum"] = 8] = "BigIntExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMinimum"] = 9] = "BigIntExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMaximum"] = 10] = "BigIntMaximum";
  ValueErrorType2[ValueErrorType2["BigIntMinimum"] = 11] = "BigIntMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMultipleOf"] = 12] = "BigIntMultipleOf";
  ValueErrorType2[ValueErrorType2["BigInt"] = 13] = "BigInt";
  ValueErrorType2[ValueErrorType2["Boolean"] = 14] = "Boolean";
  ValueErrorType2[ValueErrorType2["DateExclusiveMaximumTimestamp"] = 15] = "DateExclusiveMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateExclusiveMinimumTimestamp"] = 16] = "DateExclusiveMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMaximumTimestamp"] = 17] = "DateMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMinimumTimestamp"] = 18] = "DateMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMultipleOfTimestamp"] = 19] = "DateMultipleOfTimestamp";
  ValueErrorType2[ValueErrorType2["Date"] = 20] = "Date";
  ValueErrorType2[ValueErrorType2["Function"] = 21] = "Function";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMaximum"] = 22] = "IntegerExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMinimum"] = 23] = "IntegerExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMaximum"] = 24] = "IntegerMaximum";
  ValueErrorType2[ValueErrorType2["IntegerMinimum"] = 25] = "IntegerMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMultipleOf"] = 26] = "IntegerMultipleOf";
  ValueErrorType2[ValueErrorType2["Integer"] = 27] = "Integer";
  ValueErrorType2[ValueErrorType2["IntersectUnevaluatedProperties"] = 28] = "IntersectUnevaluatedProperties";
  ValueErrorType2[ValueErrorType2["Intersect"] = 29] = "Intersect";
  ValueErrorType2[ValueErrorType2["Iterator"] = 30] = "Iterator";
  ValueErrorType2[ValueErrorType2["Kind"] = 31] = "Kind";
  ValueErrorType2[ValueErrorType2["Literal"] = 32] = "Literal";
  ValueErrorType2[ValueErrorType2["Never"] = 33] = "Never";
  ValueErrorType2[ValueErrorType2["Not"] = 34] = "Not";
  ValueErrorType2[ValueErrorType2["Null"] = 35] = "Null";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMaximum"] = 36] = "NumberExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMinimum"] = 37] = "NumberExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["NumberMaximum"] = 38] = "NumberMaximum";
  ValueErrorType2[ValueErrorType2["NumberMinimum"] = 39] = "NumberMinimum";
  ValueErrorType2[ValueErrorType2["NumberMultipleOf"] = 40] = "NumberMultipleOf";
  ValueErrorType2[ValueErrorType2["Number"] = 41] = "Number";
  ValueErrorType2[ValueErrorType2["ObjectAdditionalProperties"] = 42] = "ObjectAdditionalProperties";
  ValueErrorType2[ValueErrorType2["ObjectMaxProperties"] = 43] = "ObjectMaxProperties";
  ValueErrorType2[ValueErrorType2["ObjectMinProperties"] = 44] = "ObjectMinProperties";
  ValueErrorType2[ValueErrorType2["ObjectRequiredProperty"] = 45] = "ObjectRequiredProperty";
  ValueErrorType2[ValueErrorType2["Object"] = 46] = "Object";
  ValueErrorType2[ValueErrorType2["Promise"] = 47] = "Promise";
  ValueErrorType2[ValueErrorType2["RegExp"] = 48] = "RegExp";
  ValueErrorType2[ValueErrorType2["StringFormatUnknown"] = 49] = "StringFormatUnknown";
  ValueErrorType2[ValueErrorType2["StringFormat"] = 50] = "StringFormat";
  ValueErrorType2[ValueErrorType2["StringMaxLength"] = 51] = "StringMaxLength";
  ValueErrorType2[ValueErrorType2["StringMinLength"] = 52] = "StringMinLength";
  ValueErrorType2[ValueErrorType2["StringPattern"] = 53] = "StringPattern";
  ValueErrorType2[ValueErrorType2["String"] = 54] = "String";
  ValueErrorType2[ValueErrorType2["Symbol"] = 55] = "Symbol";
  ValueErrorType2[ValueErrorType2["TupleLength"] = 56] = "TupleLength";
  ValueErrorType2[ValueErrorType2["Tuple"] = 57] = "Tuple";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMaxByteLength"] = 58] = "Uint8ArrayMaxByteLength";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMinByteLength"] = 59] = "Uint8ArrayMinByteLength";
  ValueErrorType2[ValueErrorType2["Uint8Array"] = 60] = "Uint8Array";
  ValueErrorType2[ValueErrorType2["Undefined"] = 61] = "Undefined";
  ValueErrorType2[ValueErrorType2["Union"] = 62] = "Union";
  ValueErrorType2[ValueErrorType2["Void"] = 63] = "Void";
})(ValueErrorType || (ValueErrorType = {}));

class ValueErrorsUnknownTypeError extends TypeBoxError {
  constructor(schema) {
    super("Unknown type");
    this.schema = schema;
  }
}
function EscapeKey(key) {
  return key.replace(/~/g, "~0").replace(/\//g, "~1");
}
function IsDefined(value) {
  return value !== undefined;
}

class ValueErrorIterator {
  constructor(iterator2) {
    this.iterator = iterator2;
  }
  [Symbol.iterator]() {
    return this.iterator;
  }
  First() {
    const next = this.iterator.next();
    return next.done ? undefined : next.value;
  }
}
function Create(errorType, schema, path, value) {
  return { type: errorType, schema, path, value, message: GetErrorFunction()({ errorType, path, schema, value }) };
}
function* FromAny(schema, references, path, value) {
}
function* FromArray3(schema, references, path, value) {
  if (!IsArray(value)) {
    return yield Create(ValueErrorType.Array, schema, path, value);
  }
  if (IsDefined(schema.minItems) && !(value.length >= schema.minItems)) {
    yield Create(ValueErrorType.ArrayMinItems, schema, path, value);
  }
  if (IsDefined(schema.maxItems) && !(value.length <= schema.maxItems)) {
    yield Create(ValueErrorType.ArrayMaxItems, schema, path, value);
  }
  for (let i = 0;i < value.length; i++) {
    yield* Visit4(schema.items, references, `${path}/${i}`, value[i]);
  }
  if (schema.uniqueItems === true && !function() {
    const set3 = new Set;
    for (const element of value) {
      const hashed = Hash(element);
      if (set3.has(hashed)) {
        return false;
      } else {
        set3.add(hashed);
      }
    }
    return true;
  }()) {
    yield Create(ValueErrorType.ArrayUniqueItems, schema, path, value);
  }
  if (!(IsDefined(schema.contains) || IsDefined(schema.minContains) || IsDefined(schema.maxContains))) {
    return;
  }
  const containsSchema = IsDefined(schema.contains) ? schema.contains : Never();
  const containsCount = value.reduce((acc, value2, index) => Visit4(containsSchema, references, `${path}${index}`, value2).next().done === true ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    yield Create(ValueErrorType.ArrayContains, schema, path, value);
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    yield Create(ValueErrorType.ArrayMinContains, schema, path, value);
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    yield Create(ValueErrorType.ArrayMaxContains, schema, path, value);
  }
}
function* FromAsyncIterator(schema, references, path, value) {
  if (!IsAsyncIterator(value))
    yield Create(ValueErrorType.AsyncIterator, schema, path, value);
}
function* FromBigInt(schema, references, path, value) {
  if (!IsBigInt(value))
    return yield Create(ValueErrorType.BigInt, schema, path, value);
  if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.BigIntExclusiveMaximum, schema, path, value);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.BigIntExclusiveMinimum, schema, path, value);
  }
  if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
    yield Create(ValueErrorType.BigIntMaximum, schema, path, value);
  }
  if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
    yield Create(ValueErrorType.BigIntMinimum, schema, path, value);
  }
  if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === BigInt(0))) {
    yield Create(ValueErrorType.BigIntMultipleOf, schema, path, value);
  }
}
function* FromBoolean(schema, references, path, value) {
  if (!IsBoolean(value))
    yield Create(ValueErrorType.Boolean, schema, path, value);
}
function* FromConstructor(schema, references, path, value) {
  yield* Visit4(schema.returns, references, path, value.prototype);
}
function* FromDate(schema, references, path, value) {
  if (!IsDate(value))
    return yield Create(ValueErrorType.Date, schema, path, value);
  if (IsDefined(schema.exclusiveMaximumTimestamp) && !(value.getTime() < schema.exclusiveMaximumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMaximumTimestamp, schema, path, value);
  }
  if (IsDefined(schema.exclusiveMinimumTimestamp) && !(value.getTime() > schema.exclusiveMinimumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMinimumTimestamp, schema, path, value);
  }
  if (IsDefined(schema.maximumTimestamp) && !(value.getTime() <= schema.maximumTimestamp)) {
    yield Create(ValueErrorType.DateMaximumTimestamp, schema, path, value);
  }
  if (IsDefined(schema.minimumTimestamp) && !(value.getTime() >= schema.minimumTimestamp)) {
    yield Create(ValueErrorType.DateMinimumTimestamp, schema, path, value);
  }
  if (IsDefined(schema.multipleOfTimestamp) && !(value.getTime() % schema.multipleOfTimestamp === 0)) {
    yield Create(ValueErrorType.DateMultipleOfTimestamp, schema, path, value);
  }
}
function* FromFunction(schema, references, path, value) {
  if (!IsFunction(value))
    yield Create(ValueErrorType.Function, schema, path, value);
}
function* FromInteger(schema, references, path, value) {
  if (!IsInteger(value))
    return yield Create(ValueErrorType.Integer, schema, path, value);
  if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.IntegerExclusiveMaximum, schema, path, value);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.IntegerExclusiveMinimum, schema, path, value);
  }
  if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
    yield Create(ValueErrorType.IntegerMaximum, schema, path, value);
  }
  if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
    yield Create(ValueErrorType.IntegerMinimum, schema, path, value);
  }
  if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.IntegerMultipleOf, schema, path, value);
  }
}
function* FromIntersect3(schema, references, path, value) {
  for (const inner of schema.allOf) {
    const next = Visit4(inner, references, path, value).next();
    if (!next.done) {
      yield Create(ValueErrorType.Intersect, schema, path, value);
      yield next.value;
    }
  }
  if (schema.unevaluatedProperties === false) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value)) {
      if (!keyCheck.test(valueKey)) {
        yield Create(ValueErrorType.IntersectUnevaluatedProperties, schema, `${path}/${valueKey}`, value);
      }
    }
  }
  if (typeof schema.unevaluatedProperties === "object") {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value)) {
      if (!keyCheck.test(valueKey)) {
        const next = Visit4(schema.unevaluatedProperties, references, `${path}/${valueKey}`, value[valueKey]).next();
        if (!next.done)
          yield next.value;
      }
    }
  }
}
function* FromIterator(schema, references, path, value) {
  if (!IsIterator(value))
    yield Create(ValueErrorType.Iterator, schema, path, value);
}
function* FromLiteral2(schema, references, path, value) {
  if (!(value === schema.const))
    yield Create(ValueErrorType.Literal, schema, path, value);
}
function* FromNever(schema, references, path, value) {
  yield Create(ValueErrorType.Never, schema, path, value);
}
function* FromNot(schema, references, path, value) {
  if (Visit4(schema.not, references, path, value).next().done === true)
    yield Create(ValueErrorType.Not, schema, path, value);
}
function* FromNull(schema, references, path, value) {
  if (!IsNull(value))
    yield Create(ValueErrorType.Null, schema, path, value);
}
function* FromNumber(schema, references, path, value) {
  if (!TypeSystemPolicy.IsNumberLike(value))
    return yield Create(ValueErrorType.Number, schema, path, value);
  if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.NumberExclusiveMaximum, schema, path, value);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.NumberExclusiveMinimum, schema, path, value);
  }
  if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
    yield Create(ValueErrorType.NumberMaximum, schema, path, value);
  }
  if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
    yield Create(ValueErrorType.NumberMinimum, schema, path, value);
  }
  if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.NumberMultipleOf, schema, path, value);
  }
}
function* FromObject(schema, references, path, value) {
  if (!TypeSystemPolicy.IsObjectLike(value))
    return yield Create(ValueErrorType.Object, schema, path, value);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value);
  }
  const requiredKeys = Array.isArray(schema.required) ? schema.required : [];
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  const unknownKeys = Object.getOwnPropertyNames(value);
  for (const requiredKey of requiredKeys) {
    if (unknownKeys.includes(requiredKey))
      continue;
    yield Create(ValueErrorType.ObjectRequiredProperty, schema.properties[requiredKey], `${path}/${EscapeKey(requiredKey)}`, undefined);
  }
  if (schema.additionalProperties === false) {
    for (const valueKey of unknownKeys) {
      if (!knownKeys.includes(valueKey)) {
        yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(valueKey)}`, value[valueKey]);
      }
    }
  }
  if (typeof schema.additionalProperties === "object") {
    for (const valueKey of unknownKeys) {
      if (knownKeys.includes(valueKey))
        continue;
      yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(valueKey)}`, value[valueKey]);
    }
  }
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value[knownKey]);
      if (ExtendsUndefinedCheck(schema) && !(knownKey in value)) {
        yield Create(ValueErrorType.ObjectRequiredProperty, property, `${path}/${EscapeKey(knownKey)}`, undefined);
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value, knownKey)) {
        yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value[knownKey]);
      }
    }
  }
}
function* FromPromise(schema, references, path, value) {
  if (!IsPromise(value))
    yield Create(ValueErrorType.Promise, schema, path, value);
}
function* FromRecord(schema, references, path, value) {
  if (!TypeSystemPolicy.IsRecordLike(value))
    return yield Create(ValueErrorType.Object, schema, path, value);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value);
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  for (const [propertyKey, propertyValue] of Object.entries(value)) {
    if (regex.test(propertyKey))
      yield* Visit4(patternSchema, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
  }
  if (typeof schema.additionalProperties === "object") {
    for (const [propertyKey, propertyValue] of Object.entries(value)) {
      if (!regex.test(propertyKey))
        yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
  if (schema.additionalProperties === false) {
    for (const [propertyKey, propertyValue] of Object.entries(value)) {
      if (regex.test(propertyKey))
        continue;
      return yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
}
function* FromRef(schema, references, path, value) {
  yield* Visit4(Deref(schema, references), references, path, value);
}
function* FromRegExp(schema, references, path, value) {
  if (!IsString(value))
    return yield Create(ValueErrorType.String, schema, path, value);
  if (IsDefined(schema.minLength) && !(value.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value);
  }
  if (IsDefined(schema.maxLength) && !(value.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value);
  }
  const regex = new RegExp(schema.source, schema.flags);
  if (!regex.test(value)) {
    return yield Create(ValueErrorType.RegExp, schema, path, value);
  }
}
function* FromString(schema, references, path, value) {
  if (!IsString(value))
    return yield Create(ValueErrorType.String, schema, path, value);
  if (IsDefined(schema.minLength) && !(value.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value);
  }
  if (IsDefined(schema.maxLength) && !(value.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value);
  }
  if (IsString(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value)) {
      yield Create(ValueErrorType.StringPattern, schema, path, value);
    }
  }
  if (IsString(schema.format)) {
    if (!exports_format.Has(schema.format)) {
      yield Create(ValueErrorType.StringFormatUnknown, schema, path, value);
    } else {
      const format = exports_format.Get(schema.format);
      if (!format(value)) {
        yield Create(ValueErrorType.StringFormat, schema, path, value);
      }
    }
  }
}
function* FromSymbol(schema, references, path, value) {
  if (!IsSymbol(value))
    yield Create(ValueErrorType.Symbol, schema, path, value);
}
function* FromTemplateLiteral2(schema, references, path, value) {
  if (!IsString(value))
    return yield Create(ValueErrorType.String, schema, path, value);
  const regex = new RegExp(schema.pattern);
  if (!regex.test(value)) {
    yield Create(ValueErrorType.StringPattern, schema, path, value);
  }
}
function* FromThis(schema, references, path, value) {
  yield* Visit4(Deref(schema, references), references, path, value);
}
function* FromTuple3(schema, references, path, value) {
  if (!IsArray(value))
    return yield Create(ValueErrorType.Tuple, schema, path, value);
  if (schema.items === undefined && !(value.length === 0)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value);
  }
  if (!(value.length === schema.maxItems)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value);
  }
  if (!schema.items) {
    return;
  }
  for (let i = 0;i < schema.items.length; i++) {
    yield* Visit4(schema.items[i], references, `${path}/${i}`, value[i]);
  }
}
function* FromUndefined(schema, references, path, value) {
  if (!IsUndefined(value))
    yield Create(ValueErrorType.Undefined, schema, path, value);
}
function* FromUnion5(schema, references, path, value) {
  let count = 0;
  for (const subschema of schema.anyOf) {
    const errors = [...Visit4(subschema, references, path, value)];
    if (errors.length === 0)
      return;
    count += errors.length;
  }
  if (count > 0) {
    yield Create(ValueErrorType.Union, schema, path, value);
  }
}
function* FromUint8Array(schema, references, path, value) {
  if (!IsUint8Array(value))
    return yield Create(ValueErrorType.Uint8Array, schema, path, value);
  if (IsDefined(schema.maxByteLength) && !(value.length <= schema.maxByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMaxByteLength, schema, path, value);
  }
  if (IsDefined(schema.minByteLength) && !(value.length >= schema.minByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMinByteLength, schema, path, value);
  }
}
function* FromUnknown(schema, references, path, value) {
}
function* FromVoid(schema, references, path, value) {
  if (!TypeSystemPolicy.IsVoidLike(value))
    yield Create(ValueErrorType.Void, schema, path, value);
}
function* FromKind(schema, references, path, value) {
  const check = exports_type.Get(schema[Kind]);
  if (!check(schema, value))
    yield Create(ValueErrorType.Kind, schema, path, value);
}
function* Visit4(schema, references, path, value) {
  const references_ = IsDefined(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return yield* FromAny(schema_, references_, path, value);
    case "Array":
      return yield* FromArray3(schema_, references_, path, value);
    case "AsyncIterator":
      return yield* FromAsyncIterator(schema_, references_, path, value);
    case "BigInt":
      return yield* FromBigInt(schema_, references_, path, value);
    case "Boolean":
      return yield* FromBoolean(schema_, references_, path, value);
    case "Constructor":
      return yield* FromConstructor(schema_, references_, path, value);
    case "Date":
      return yield* FromDate(schema_, references_, path, value);
    case "Function":
      return yield* FromFunction(schema_, references_, path, value);
    case "Integer":
      return yield* FromInteger(schema_, references_, path, value);
    case "Intersect":
      return yield* FromIntersect3(schema_, references_, path, value);
    case "Iterator":
      return yield* FromIterator(schema_, references_, path, value);
    case "Literal":
      return yield* FromLiteral2(schema_, references_, path, value);
    case "Never":
      return yield* FromNever(schema_, references_, path, value);
    case "Not":
      return yield* FromNot(schema_, references_, path, value);
    case "Null":
      return yield* FromNull(schema_, references_, path, value);
    case "Number":
      return yield* FromNumber(schema_, references_, path, value);
    case "Object":
      return yield* FromObject(schema_, references_, path, value);
    case "Promise":
      return yield* FromPromise(schema_, references_, path, value);
    case "Record":
      return yield* FromRecord(schema_, references_, path, value);
    case "Ref":
      return yield* FromRef(schema_, references_, path, value);
    case "RegExp":
      return yield* FromRegExp(schema_, references_, path, value);
    case "String":
      return yield* FromString(schema_, references_, path, value);
    case "Symbol":
      return yield* FromSymbol(schema_, references_, path, value);
    case "TemplateLiteral":
      return yield* FromTemplateLiteral2(schema_, references_, path, value);
    case "This":
      return yield* FromThis(schema_, references_, path, value);
    case "Tuple":
      return yield* FromTuple3(schema_, references_, path, value);
    case "Undefined":
      return yield* FromUndefined(schema_, references_, path, value);
    case "Union":
      return yield* FromUnion5(schema_, references_, path, value);
    case "Uint8Array":
      return yield* FromUint8Array(schema_, references_, path, value);
    case "Unknown":
      return yield* FromUnknown(schema_, references_, path, value);
    case "Void":
      return yield* FromVoid(schema_, references_, path, value);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueErrorsUnknownTypeError(schema);
      return yield* FromKind(schema_, references_, path, value);
  }
}
function Errors(...args) {
  const iterator2 = args.length === 3 ? Visit4(args[0], args[1], "", args[2]) : Visit4(args[0], [], "", args[1]);
  return new ValueErrorIterator(iterator2);
}
// node_modules/@sinclair/typebox/build/esm/type/any/any.mjs
function Any(options = {}) {
  return { ...options, [Kind]: "Any" };
}
// node_modules/@sinclair/typebox/build/esm/type/unknown/unknown.mjs
function Unknown(options = {}) {
  return {
    ...options,
    [Kind]: "Unknown"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/type.mjs
var exports_type2 = {};
__export(exports_type2, {
  TypeGuardUnknownTypeError: () => TypeGuardUnknownTypeError,
  IsVoid: () => IsVoid2,
  IsUnsafe: () => IsUnsafe2,
  IsUnknown: () => IsUnknown2,
  IsUnionLiteral: () => IsUnionLiteral,
  IsUnion: () => IsUnion2,
  IsUndefined: () => IsUndefined4,
  IsUint8Array: () => IsUint8Array4,
  IsTuple: () => IsTuple2,
  IsTransform: () => IsTransform2,
  IsThis: () => IsThis2,
  IsTemplateLiteral: () => IsTemplateLiteral2,
  IsSymbol: () => IsSymbol4,
  IsString: () => IsString4,
  IsSchema: () => IsSchema2,
  IsRegExp: () => IsRegExp3,
  IsRef: () => IsRef2,
  IsRecursive: () => IsRecursive,
  IsRecord: () => IsRecord2,
  IsReadonly: () => IsReadonly2,
  IsProperties: () => IsProperties,
  IsPromise: () => IsPromise3,
  IsOptional: () => IsOptional2,
  IsObject: () => IsObject4,
  IsNumber: () => IsNumber4,
  IsNull: () => IsNull4,
  IsNot: () => IsNot2,
  IsNever: () => IsNever2,
  IsMappedResult: () => IsMappedResult2,
  IsMappedKey: () => IsMappedKey2,
  IsLiteralValue: () => IsLiteralValue,
  IsLiteralString: () => IsLiteralString,
  IsLiteralNumber: () => IsLiteralNumber,
  IsLiteralBoolean: () => IsLiteralBoolean,
  IsLiteral: () => IsLiteral2,
  IsKindOf: () => IsKindOf2,
  IsKind: () => IsKind2,
  IsIterator: () => IsIterator4,
  IsIntersect: () => IsIntersect2,
  IsInteger: () => IsInteger3,
  IsFunction: () => IsFunction4,
  IsDate: () => IsDate4,
  IsConstructor: () => IsConstructor2,
  IsBoolean: () => IsBoolean4,
  IsBigInt: () => IsBigInt4,
  IsAsyncIterator: () => IsAsyncIterator4,
  IsArray: () => IsArray4,
  IsAny: () => IsAny2
});
class TypeGuardUnknownTypeError extends TypeBoxError {
}
var KnownTypes = [
  "Any",
  "Array",
  "AsyncIterator",
  "BigInt",
  "Boolean",
  "Constructor",
  "Date",
  "Enum",
  "Function",
  "Integer",
  "Intersect",
  "Iterator",
  "Literal",
  "MappedKey",
  "MappedResult",
  "Not",
  "Null",
  "Number",
  "Object",
  "Promise",
  "Record",
  "Ref",
  "RegExp",
  "String",
  "Symbol",
  "TemplateLiteral",
  "This",
  "Tuple",
  "Undefined",
  "Union",
  "Uint8Array",
  "Unknown",
  "Void"
];
function IsPattern(value) {
  try {
    new RegExp(value);
    return true;
  } catch {
    return false;
  }
}
function IsControlCharacterFree(value) {
  if (!IsString2(value))
    return false;
  for (let i = 0;i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code >= 7 && code <= 13 || code === 27 || code === 127) {
      return false;
    }
  }
  return true;
}
function IsAdditionalProperties(value) {
  return IsOptionalBoolean(value) || IsSchema2(value);
}
function IsOptionalBigInt(value) {
  return IsUndefined2(value) || IsBigInt2(value);
}
function IsOptionalNumber(value) {
  return IsUndefined2(value) || IsNumber2(value);
}
function IsOptionalBoolean(value) {
  return IsUndefined2(value) || IsBoolean2(value);
}
function IsOptionalString(value) {
  return IsUndefined2(value) || IsString2(value);
}
function IsOptionalPattern(value) {
  return IsUndefined2(value) || IsString2(value) && IsControlCharacterFree(value) && IsPattern(value);
}
function IsOptionalFormat(value) {
  return IsUndefined2(value) || IsString2(value) && IsControlCharacterFree(value);
}
function IsOptionalSchema(value) {
  return IsUndefined2(value) || IsSchema2(value);
}
function IsReadonly2(value) {
  return IsObject2(value) && value[ReadonlyKind] === "Readonly";
}
function IsOptional2(value) {
  return IsObject2(value) && value[OptionalKind] === "Optional";
}
function IsAny2(value) {
  return IsKindOf2(value, "Any") && IsOptionalString(value.$id);
}
function IsArray4(value) {
  return IsKindOf2(value, "Array") && value.type === "array" && IsOptionalString(value.$id) && IsSchema2(value.items) && IsOptionalNumber(value.minItems) && IsOptionalNumber(value.maxItems) && IsOptionalBoolean(value.uniqueItems) && IsOptionalSchema(value.contains) && IsOptionalNumber(value.minContains) && IsOptionalNumber(value.maxContains);
}
function IsAsyncIterator4(value) {
  return IsKindOf2(value, "AsyncIterator") && value.type === "AsyncIterator" && IsOptionalString(value.$id) && IsSchema2(value.items);
}
function IsBigInt4(value) {
  return IsKindOf2(value, "BigInt") && value.type === "bigint" && IsOptionalString(value.$id) && IsOptionalBigInt(value.exclusiveMaximum) && IsOptionalBigInt(value.exclusiveMinimum) && IsOptionalBigInt(value.maximum) && IsOptionalBigInt(value.minimum) && IsOptionalBigInt(value.multipleOf);
}
function IsBoolean4(value) {
  return IsKindOf2(value, "Boolean") && value.type === "boolean" && IsOptionalString(value.$id);
}
function IsConstructor2(value) {
  return IsKindOf2(value, "Constructor") && value.type === "Constructor" && IsOptionalString(value.$id) && IsArray2(value.parameters) && value.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value.returns);
}
function IsDate4(value) {
  return IsKindOf2(value, "Date") && value.type === "Date" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximumTimestamp) && IsOptionalNumber(value.exclusiveMinimumTimestamp) && IsOptionalNumber(value.maximumTimestamp) && IsOptionalNumber(value.minimumTimestamp) && IsOptionalNumber(value.multipleOfTimestamp);
}
function IsFunction4(value) {
  return IsKindOf2(value, "Function") && value.type === "Function" && IsOptionalString(value.$id) && IsArray2(value.parameters) && value.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value.returns);
}
function IsInteger3(value) {
  return IsKindOf2(value, "Integer") && value.type === "integer" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximum) && IsOptionalNumber(value.exclusiveMinimum) && IsOptionalNumber(value.maximum) && IsOptionalNumber(value.minimum) && IsOptionalNumber(value.multipleOf);
}
function IsProperties(value) {
  return IsObject2(value) && Object.entries(value).every(([key, schema]) => IsControlCharacterFree(key) && IsSchema2(schema));
}
function IsIntersect2(value) {
  return IsKindOf2(value, "Intersect") && (IsString2(value.type) && value.type !== "object" ? false : true) && IsArray2(value.allOf) && value.allOf.every((schema) => IsSchema2(schema) && !IsTransform2(schema)) && IsOptionalString(value.type) && (IsOptionalBoolean(value.unevaluatedProperties) || IsOptionalSchema(value.unevaluatedProperties)) && IsOptionalString(value.$id);
}
function IsIterator4(value) {
  return IsKindOf2(value, "Iterator") && value.type === "Iterator" && IsOptionalString(value.$id) && IsSchema2(value.items);
}
function IsKindOf2(value, kind) {
  return IsObject2(value) && Kind in value && value[Kind] === kind;
}
function IsLiteralString(value) {
  return IsLiteral2(value) && IsString2(value.const);
}
function IsLiteralNumber(value) {
  return IsLiteral2(value) && IsNumber2(value.const);
}
function IsLiteralBoolean(value) {
  return IsLiteral2(value) && IsBoolean2(value.const);
}
function IsLiteral2(value) {
  return IsKindOf2(value, "Literal") && IsOptionalString(value.$id) && IsLiteralValue(value.const);
}
function IsLiteralValue(value) {
  return IsBoolean2(value) || IsNumber2(value) || IsString2(value);
}
function IsMappedKey2(value) {
  return IsKindOf2(value, "MappedKey") && IsArray2(value.keys) && value.keys.every((key) => IsNumber2(key) || IsString2(key));
}
function IsMappedResult2(value) {
  return IsKindOf2(value, "MappedResult") && IsProperties(value.properties);
}
function IsNever2(value) {
  return IsKindOf2(value, "Never") && IsObject2(value.not) && Object.getOwnPropertyNames(value.not).length === 0;
}
function IsNot2(value) {
  return IsKindOf2(value, "Not") && IsSchema2(value.not);
}
function IsNull4(value) {
  return IsKindOf2(value, "Null") && value.type === "null" && IsOptionalString(value.$id);
}
function IsNumber4(value) {
  return IsKindOf2(value, "Number") && value.type === "number" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximum) && IsOptionalNumber(value.exclusiveMinimum) && IsOptionalNumber(value.maximum) && IsOptionalNumber(value.minimum) && IsOptionalNumber(value.multipleOf);
}
function IsObject4(value) {
  return IsKindOf2(value, "Object") && value.type === "object" && IsOptionalString(value.$id) && IsProperties(value.properties) && IsAdditionalProperties(value.additionalProperties) && IsOptionalNumber(value.minProperties) && IsOptionalNumber(value.maxProperties);
}
function IsPromise3(value) {
  return IsKindOf2(value, "Promise") && value.type === "Promise" && IsOptionalString(value.$id) && IsSchema2(value.item);
}
function IsRecord2(value) {
  return IsKindOf2(value, "Record") && value.type === "object" && IsOptionalString(value.$id) && IsAdditionalProperties(value.additionalProperties) && IsObject2(value.patternProperties) && ((schema) => {
    const keys = Object.getOwnPropertyNames(schema.patternProperties);
    return keys.length === 1 && IsPattern(keys[0]) && IsObject2(schema.patternProperties) && IsSchema2(schema.patternProperties[keys[0]]);
  })(value);
}
function IsRecursive(value) {
  return IsObject2(value) && Hint in value && value[Hint] === "Recursive";
}
function IsRef2(value) {
  return IsKindOf2(value, "Ref") && IsOptionalString(value.$id) && IsString2(value.$ref);
}
function IsRegExp3(value) {
  return IsKindOf2(value, "RegExp") && IsOptionalString(value.$id) && IsString2(value.source) && IsString2(value.flags) && IsOptionalNumber(value.maxLength) && IsOptionalNumber(value.minLength);
}
function IsString4(value) {
  return IsKindOf2(value, "String") && value.type === "string" && IsOptionalString(value.$id) && IsOptionalNumber(value.minLength) && IsOptionalNumber(value.maxLength) && IsOptionalPattern(value.pattern) && IsOptionalFormat(value.format);
}
function IsSymbol4(value) {
  return IsKindOf2(value, "Symbol") && value.type === "symbol" && IsOptionalString(value.$id);
}
function IsTemplateLiteral2(value) {
  return IsKindOf2(value, "TemplateLiteral") && value.type === "string" && IsString2(value.pattern) && value.pattern[0] === "^" && value.pattern[value.pattern.length - 1] === "$";
}
function IsThis2(value) {
  return IsKindOf2(value, "This") && IsOptionalString(value.$id) && IsString2(value.$ref);
}
function IsTransform2(value) {
  return IsObject2(value) && TransformKind in value;
}
function IsTuple2(value) {
  return IsKindOf2(value, "Tuple") && value.type === "array" && IsOptionalString(value.$id) && IsNumber2(value.minItems) && IsNumber2(value.maxItems) && value.minItems === value.maxItems && (IsUndefined2(value.items) && IsUndefined2(value.additionalItems) && value.minItems === 0 || IsArray2(value.items) && value.items.every((schema) => IsSchema2(schema)));
}
function IsUndefined4(value) {
  return IsKindOf2(value, "Undefined") && value.type === "undefined" && IsOptionalString(value.$id);
}
function IsUnionLiteral(value) {
  return IsUnion2(value) && value.anyOf.every((schema) => IsLiteralString(schema) || IsLiteralNumber(schema));
}
function IsUnion2(value) {
  return IsKindOf2(value, "Union") && IsOptionalString(value.$id) && IsObject2(value) && IsArray2(value.anyOf) && value.anyOf.every((schema) => IsSchema2(schema));
}
function IsUint8Array4(value) {
  return IsKindOf2(value, "Uint8Array") && value.type === "Uint8Array" && IsOptionalString(value.$id) && IsOptionalNumber(value.minByteLength) && IsOptionalNumber(value.maxByteLength);
}
function IsUnknown2(value) {
  return IsKindOf2(value, "Unknown") && IsOptionalString(value.$id);
}
function IsUnsafe2(value) {
  return IsKindOf2(value, "Unsafe");
}
function IsVoid2(value) {
  return IsKindOf2(value, "Void") && value.type === "void" && IsOptionalString(value.$id);
}
function IsKind2(value) {
  return IsObject2(value) && Kind in value && IsString2(value[Kind]) && !KnownTypes.includes(value[Kind]);
}
function IsSchema2(value) {
  return IsObject2(value) && (IsAny2(value) || IsArray4(value) || IsBoolean4(value) || IsBigInt4(value) || IsAsyncIterator4(value) || IsConstructor2(value) || IsDate4(value) || IsFunction4(value) || IsInteger3(value) || IsIntersect2(value) || IsIterator4(value) || IsLiteral2(value) || IsMappedKey2(value) || IsMappedResult2(value) || IsNever2(value) || IsNot2(value) || IsNull4(value) || IsNumber4(value) || IsObject4(value) || IsPromise3(value) || IsRecord2(value) || IsRef2(value) || IsRegExp3(value) || IsString4(value) || IsSymbol4(value) || IsTemplateLiteral2(value) || IsThis2(value) || IsTuple2(value) || IsUndefined4(value) || IsUnion2(value) || IsUint8Array4(value) || IsUnknown2(value) || IsUnsafe2(value) || IsVoid2(value) || IsKind2(value));
}
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-check.mjs
class ExtendsResolverError extends TypeBoxError {
}
var ExtendsResult;
(function(ExtendsResult2) {
  ExtendsResult2[ExtendsResult2["Union"] = 0] = "Union";
  ExtendsResult2[ExtendsResult2["True"] = 1] = "True";
  ExtendsResult2[ExtendsResult2["False"] = 2] = "False";
})(ExtendsResult || (ExtendsResult = {}));
function IntoBooleanResult(result) {
  return result === ExtendsResult.False ? result : ExtendsResult.True;
}
function Throw(message) {
  throw new ExtendsResolverError(message);
}
function IsStructuralRight(right) {
  return exports_type2.IsNever(right) || exports_type2.IsIntersect(right) || exports_type2.IsUnion(right) || exports_type2.IsUnknown(right) || exports_type2.IsAny(right);
}
function StructuralRight(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : Throw("StructuralRight");
}
function FromAnyRight(left, right) {
  return ExtendsResult.True;
}
function FromAny2(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) && right.anyOf.some((schema) => exports_type2.IsAny(schema) || exports_type2.IsUnknown(schema)) ? ExtendsResult.True : exports_type2.IsUnion(right) ? ExtendsResult.Union : exports_type2.IsUnknown(right) ? ExtendsResult.True : exports_type2.IsAny(right) ? ExtendsResult.True : ExtendsResult.Union;
}
function FromArrayRight(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromArray4(left, right) {
  return exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsArray(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
}
function FromAsyncIterator2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsAsyncIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
}
function FromBigInt2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBigInt(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromBooleanRight(left, right) {
  return exports_type2.IsLiteralBoolean(left) ? ExtendsResult.True : exports_type2.IsBoolean(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromBoolean2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBoolean(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromConstructor2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsConstructor(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
}
function FromDate2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsDate(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromFunction2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsFunction(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
}
function FromIntegerRight(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsNumber(left.const) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromInteger2(left, right) {
  return exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : ExtendsResult.False;
}
function FromIntersectRight(left, right) {
  return right.allOf.every((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
function FromIntersect4(left, right) {
  return left.allOf.some((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
function FromIterator2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
}
function FromLiteral3(left, right) {
  return exports_type2.IsLiteral(right) && right.const === left.const ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : ExtendsResult.False;
}
function FromNeverRight(left, right) {
  return ExtendsResult.False;
}
function FromNever2(left, right) {
  return ExtendsResult.True;
}
function UnwrapTNot(schema) {
  let [current, depth] = [schema, 0];
  while (true) {
    if (!exports_type2.IsNot(current))
      break;
    current = current.not;
    depth += 1;
  }
  return depth % 2 === 0 ? current : Unknown();
}
function FromNot2(left, right) {
  return exports_type2.IsNot(left) ? Visit5(UnwrapTNot(left), right) : exports_type2.IsNot(right) ? Visit5(left, UnwrapTNot(right)) : Throw("Invalid fallthrough for Not");
}
function FromNull2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsNull(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromNumberRight(left, right) {
  return exports_type2.IsLiteralNumber(left) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromNumber2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : ExtendsResult.False;
}
function IsObjectPropertyCount(schema, count) {
  return Object.getOwnPropertyNames(schema.properties).length === count;
}
function IsObjectStringLike(schema) {
  return IsObjectArrayLike(schema);
}
function IsObjectSymbolLike(schema) {
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "description" in schema.properties && exports_type2.IsUnion(schema.properties.description) && schema.properties.description.anyOf.length === 2 && (exports_type2.IsString(schema.properties.description.anyOf[0]) && exports_type2.IsUndefined(schema.properties.description.anyOf[1]) || exports_type2.IsString(schema.properties.description.anyOf[1]) && exports_type2.IsUndefined(schema.properties.description.anyOf[0]));
}
function IsObjectNumberLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectBooleanLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectBigIntLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectDateLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectUint8ArrayLike(schema) {
  return IsObjectArrayLike(schema);
}
function IsObjectFunctionLike(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
}
function IsObjectConstructorLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectArrayLike(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
}
function IsObjectPromiseLike(schema) {
  const then = Function2([Any()], Any());
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "then" in schema.properties && IntoBooleanResult(Visit5(schema.properties["then"], then)) === ExtendsResult.True;
}
function Property(left, right) {
  return Visit5(left, right) === ExtendsResult.False ? ExtendsResult.False : exports_type2.IsOptional(left) && !exports_type2.IsOptional(right) ? ExtendsResult.False : ExtendsResult.True;
}
function FromObjectRight(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) || exports_type2.IsLiteralString(left) && IsObjectStringLike(right) || exports_type2.IsLiteralNumber(left) && IsObjectNumberLike(right) || exports_type2.IsLiteralBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsBigInt(left) && IsObjectBigIntLike(right) || exports_type2.IsString(left) && IsObjectStringLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsNumber(left) && IsObjectNumberLike(right) || exports_type2.IsInteger(left) && IsObjectNumberLike(right) || exports_type2.IsBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsUint8Array(left) && IsObjectUint8ArrayLike(right) || exports_type2.IsDate(left) && IsObjectDateLike(right) || exports_type2.IsConstructor(left) && IsObjectConstructorLike(right) || exports_type2.IsFunction(left) && IsObjectFunctionLike(right) ? ExtendsResult.True : exports_type2.IsRecord(left) && exports_type2.IsString(RecordKey(left)) ? (() => {
    return right[Hint] === "Record" ? ExtendsResult.True : ExtendsResult.False;
  })() : exports_type2.IsRecord(left) && exports_type2.IsNumber(RecordKey(left)) ? (() => {
    return IsObjectPropertyCount(right, 0) ? ExtendsResult.True : ExtendsResult.False;
  })() : ExtendsResult.False;
}
function FromObject2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : !exports_type2.IsObject(right) ? ExtendsResult.False : (() => {
    for (const key of Object.getOwnPropertyNames(right.properties)) {
      if (!(key in left.properties) && !exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.False;
      }
      if (exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.True;
      }
      if (Property(left.properties[key], right.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })();
}
function FromPromise2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectPromiseLike(right) ? ExtendsResult.True : !exports_type2.IsPromise(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.item, right.item));
}
function RecordKey(schema) {
  return PatternNumberExact in schema.patternProperties ? Number2() : (PatternStringExact in schema.patternProperties) ? String2() : Throw("Unknown record key pattern");
}
function RecordValue(schema) {
  return PatternNumberExact in schema.patternProperties ? schema.patternProperties[PatternNumberExact] : (PatternStringExact in schema.patternProperties) ? schema.patternProperties[PatternStringExact] : Throw("Unable to get record value schema");
}
function FromRecordRight(left, right) {
  const [Key, Value] = [RecordKey(right), RecordValue(right)];
  return exports_type2.IsLiteralString(left) && exports_type2.IsNumber(Key) && IntoBooleanResult(Visit5(left, Value)) === ExtendsResult.True ? ExtendsResult.True : exports_type2.IsUint8Array(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsString(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsArray(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsObject(left) ? (() => {
    for (const key of Object.getOwnPropertyNames(left.properties)) {
      if (Property(Value, left.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })() : ExtendsResult.False;
}
function FromRecord2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsRecord(right) ? ExtendsResult.False : Visit5(RecordValue(left), RecordValue(right));
}
function FromRegExp2(left, right) {
  const L = exports_type2.IsRegExp(left) ? String2() : left;
  const R = exports_type2.IsRegExp(right) ? String2() : right;
  return Visit5(L, R);
}
function FromStringRight(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsString(left.const) ? ExtendsResult.True : exports_type2.IsString(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromString2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromSymbol2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsSymbol(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromTemplateLiteral3(left, right) {
  return exports_type2.IsTemplateLiteral(left) ? Visit5(TemplateLiteralToUnion(left), right) : exports_type2.IsTemplateLiteral(right) ? Visit5(left, TemplateLiteralToUnion(right)) : Throw("Invalid fallthrough for TemplateLiteral");
}
function IsArrayOfTuple(left, right) {
  return exports_type2.IsArray(right) && left.items !== undefined && left.items.every((schema) => Visit5(schema, right.items) === ExtendsResult.True);
}
function FromTupleRight(left, right) {
  return exports_type2.IsNever(left) ? ExtendsResult.True : exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : ExtendsResult.False;
}
function FromTuple4(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : exports_type2.IsArray(right) && IsArrayOfTuple(left, right) ? ExtendsResult.True : !exports_type2.IsTuple(right) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) || !exports_value.IsUndefined(left.items) && exports_value.IsUndefined(right.items) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) ? ExtendsResult.True : left.items.every((schema, index) => Visit5(schema, right.items[index]) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
function FromUint8Array2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsUint8Array(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromUndefined2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsVoid(right) ? FromVoidRight(left, right) : exports_type2.IsUndefined(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromUnionRight(left, right) {
  return right.anyOf.some((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
function FromUnion6(left, right) {
  return left.anyOf.every((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
function FromUnknownRight(left, right) {
  return ExtendsResult.True;
}
function FromUnknown2(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : exports_type2.IsArray(right) ? FromArrayRight(left, right) : exports_type2.IsTuple(right) ? FromTupleRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsUnknown(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromVoidRight(left, right) {
  return exports_type2.IsUndefined(left) ? ExtendsResult.True : exports_type2.IsUndefined(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromVoid2(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsVoid(right) ? ExtendsResult.True : ExtendsResult.False;
}
function Visit5(left, right) {
  return exports_type2.IsTemplateLiteral(left) || exports_type2.IsTemplateLiteral(right) ? FromTemplateLiteral3(left, right) : exports_type2.IsRegExp(left) || exports_type2.IsRegExp(right) ? FromRegExp2(left, right) : exports_type2.IsNot(left) || exports_type2.IsNot(right) ? FromNot2(left, right) : exports_type2.IsAny(left) ? FromAny2(left, right) : exports_type2.IsArray(left) ? FromArray4(left, right) : exports_type2.IsBigInt(left) ? FromBigInt2(left, right) : exports_type2.IsBoolean(left) ? FromBoolean2(left, right) : exports_type2.IsAsyncIterator(left) ? FromAsyncIterator2(left, right) : exports_type2.IsConstructor(left) ? FromConstructor2(left, right) : exports_type2.IsDate(left) ? FromDate2(left, right) : exports_type2.IsFunction(left) ? FromFunction2(left, right) : exports_type2.IsInteger(left) ? FromInteger2(left, right) : exports_type2.IsIntersect(left) ? FromIntersect4(left, right) : exports_type2.IsIterator(left) ? FromIterator2(left, right) : exports_type2.IsLiteral(left) ? FromLiteral3(left, right) : exports_type2.IsNever(left) ? FromNever2(left, right) : exports_type2.IsNull(left) ? FromNull2(left, right) : exports_type2.IsNumber(left) ? FromNumber2(left, right) : exports_type2.IsObject(left) ? FromObject2(left, right) : exports_type2.IsRecord(left) ? FromRecord2(left, right) : exports_type2.IsString(left) ? FromString2(left, right) : exports_type2.IsSymbol(left) ? FromSymbol2(left, right) : exports_type2.IsTuple(left) ? FromTuple4(left, right) : exports_type2.IsPromise(left) ? FromPromise2(left, right) : exports_type2.IsUint8Array(left) ? FromUint8Array2(left, right) : exports_type2.IsUndefined(left) ? FromUndefined2(left, right) : exports_type2.IsUnion(left) ? FromUnion6(left, right) : exports_type2.IsUnknown(left) ? FromUnknown2(left, right) : exports_type2.IsVoid(left) ? FromVoid2(left, right) : Throw(`Unknown left type operand '${left[Kind]}'`);
}
function ExtendsCheck(left, right) {
  return Visit5(left, right);
}
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-result.mjs
function FromProperties7(P, Right, True, False, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extends(P[K2], Right, True, False, options);
  return Acc;
}
function FromMappedResult6(Left, Right, True, False, options) {
  return FromProperties7(Left.properties, Right, True, False, options);
}
function ExtendsFromMappedResult(Left, Right, True, False, options) {
  const P = FromMappedResult6(Left, Right, True, False, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends.mjs
function ExtendsResolve(left, right, trueType, falseType) {
  const R = ExtendsCheck(left, right);
  return R === ExtendsResult.Union ? Union([trueType, falseType]) : R === ExtendsResult.True ? trueType : falseType;
}
function Extends(L, R, T, F, options = {}) {
  return IsMappedResult(L) ? ExtendsFromMappedResult(L, R, T, F, options) : IsMappedKey(L) ? CloneType(ExtendsFromMappedKey(L, R, T, F, options)) : CloneType(ExtendsResolve(L, R, T, F), options);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-key.mjs
function FromPropertyKey(K, U, L, R, options) {
  return {
    [K]: Extends(Literal(K), U, L, R, options)
  };
}
function FromPropertyKeys(K, U, L, R, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey(LK, U, L, R, options) };
  }, {});
}
function FromMappedKey2(K, U, L, R, options) {
  return FromPropertyKeys(K.keys, U, L, R, options);
}
function ExtendsFromMappedKey(T, U, L, R, options) {
  const P = FromMappedKey2(T, U, L, R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/value/check/check.mjs
class ValueCheckUnknownTypeError extends TypeBoxError {
  constructor(schema) {
    super(`Unknown type`);
    this.schema = schema;
  }
}
function IsAnyOrUnknown(schema) {
  return schema[Kind] === "Any" || schema[Kind] === "Unknown";
}
function IsDefined2(value) {
  return value !== undefined;
}
function FromAny3(schema, references, value) {
  return true;
}
function FromArray5(schema, references, value) {
  if (!IsArray(value))
    return false;
  if (IsDefined2(schema.minItems) && !(value.length >= schema.minItems)) {
    return false;
  }
  if (IsDefined2(schema.maxItems) && !(value.length <= schema.maxItems)) {
    return false;
  }
  if (!value.every((value2) => Visit6(schema.items, references, value2))) {
    return false;
  }
  if (schema.uniqueItems === true && !function() {
    const set3 = new Set;
    for (const element of value) {
      const hashed = Hash(element);
      if (set3.has(hashed)) {
        return false;
      } else {
        set3.add(hashed);
      }
    }
    return true;
  }()) {
    return false;
  }
  if (!(IsDefined2(schema.contains) || IsNumber(schema.minContains) || IsNumber(schema.maxContains))) {
    return true;
  }
  const containsSchema = IsDefined2(schema.contains) ? schema.contains : Never();
  const containsCount = value.reduce((acc, value2) => Visit6(containsSchema, references, value2) ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    return false;
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    return false;
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    return false;
  }
  return true;
}
function FromAsyncIterator3(schema, references, value) {
  return IsAsyncIterator(value);
}
function FromBigInt3(schema, references, value) {
  if (!IsBigInt(value))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value % schema.multipleOf === BigInt(0))) {
    return false;
  }
  return true;
}
function FromBoolean3(schema, references, value) {
  return IsBoolean(value);
}
function FromConstructor3(schema, references, value) {
  return Visit6(schema.returns, references, value.prototype);
}
function FromDate3(schema, references, value) {
  if (!IsDate(value))
    return false;
  if (IsDefined2(schema.exclusiveMaximumTimestamp) && !(value.getTime() < schema.exclusiveMaximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimumTimestamp) && !(value.getTime() > schema.exclusiveMinimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.maximumTimestamp) && !(value.getTime() <= schema.maximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.minimumTimestamp) && !(value.getTime() >= schema.minimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.multipleOfTimestamp) && !(value.getTime() % schema.multipleOfTimestamp === 0)) {
    return false;
  }
  return true;
}
function FromFunction3(schema, references, value) {
  return IsFunction(value);
}
function FromInteger3(schema, references, value) {
  if (!IsInteger(value)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    return false;
  }
  return true;
}
function FromIntersect5(schema, references, value) {
  const check1 = schema.allOf.every((schema2) => Visit6(schema2, references, value));
  if (schema.unevaluatedProperties === false) {
    const keyPattern = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value).every((key) => keyPattern.test(key));
    return check1 && check2;
  } else if (IsSchema2(schema.unevaluatedProperties)) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value).every((key) => keyCheck.test(key) || Visit6(schema.unevaluatedProperties, references, value[key]));
    return check1 && check2;
  } else {
    return check1;
  }
}
function FromIterator3(schema, references, value) {
  return IsIterator(value);
}
function FromLiteral4(schema, references, value) {
  return value === schema.const;
}
function FromNever3(schema, references, value) {
  return false;
}
function FromNot3(schema, references, value) {
  return !Visit6(schema.not, references, value);
}
function FromNull3(schema, references, value) {
  return IsNull(value);
}
function FromNumber3(schema, references, value) {
  if (!TypeSystemPolicy.IsNumberLike(value))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    return false;
  }
  return true;
}
function FromObject3(schema, references, value) {
  if (!TypeSystemPolicy.IsObjectLike(value))
    return false;
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    return false;
  }
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      if (!Visit6(property, references, value[knownKey])) {
        return false;
      }
      if ((ExtendsUndefinedCheck(property) || IsAnyOrUnknown(property)) && !(knownKey in value)) {
        return false;
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value, knownKey) && !Visit6(property, references, value[knownKey])) {
        return false;
      }
    }
  }
  if (schema.additionalProperties === false) {
    const valueKeys = Object.getOwnPropertyNames(value);
    if (schema.required && schema.required.length === knownKeys.length && valueKeys.length === knownKeys.length) {
      return true;
    } else {
      return valueKeys.every((valueKey) => knownKeys.includes(valueKey));
    }
  } else if (typeof schema.additionalProperties === "object") {
    const valueKeys = Object.getOwnPropertyNames(value);
    return valueKeys.every((key) => knownKeys.includes(key) || Visit6(schema.additionalProperties, references, value[key]));
  } else {
    return true;
  }
}
function FromPromise3(schema, references, value) {
  return IsPromise(value);
}
function FromRecord3(schema, references, value) {
  if (!TypeSystemPolicy.IsRecordLike(value)) {
    return false;
  }
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    return false;
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  const check1 = Object.entries(value).every(([key, value2]) => {
    return regex.test(key) ? Visit6(patternSchema, references, value2) : true;
  });
  const check2 = typeof schema.additionalProperties === "object" ? Object.entries(value).every(([key, value2]) => {
    return !regex.test(key) ? Visit6(schema.additionalProperties, references, value2) : true;
  }) : true;
  const check3 = schema.additionalProperties === false ? Object.getOwnPropertyNames(value).every((key) => {
    return regex.test(key);
  }) : true;
  return check1 && check2 && check3;
}
function FromRef2(schema, references, value) {
  return Visit6(Deref(schema, references), references, value);
}
function FromRegExp3(schema, references, value) {
  const regex = new RegExp(schema.source, schema.flags);
  if (IsDefined2(schema.minLength)) {
    if (!(value.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value.length <= schema.maxLength))
      return false;
  }
  return regex.test(value);
}
function FromString3(schema, references, value) {
  if (!IsString(value)) {
    return false;
  }
  if (IsDefined2(schema.minLength)) {
    if (!(value.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value.length <= schema.maxLength))
      return false;
  }
  if (IsDefined2(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value))
      return false;
  }
  if (IsDefined2(schema.format)) {
    if (!exports_format.Has(schema.format))
      return false;
    const func = exports_format.Get(schema.format);
    return func(value);
  }
  return true;
}
function FromSymbol3(schema, references, value) {
  return IsSymbol(value);
}
function FromTemplateLiteral4(schema, references, value) {
  return IsString(value) && new RegExp(schema.pattern).test(value);
}
function FromThis2(schema, references, value) {
  return Visit6(Deref(schema, references), references, value);
}
function FromTuple5(schema, references, value) {
  if (!IsArray(value)) {
    return false;
  }
  if (schema.items === undefined && !(value.length === 0)) {
    return false;
  }
  if (!(value.length === schema.maxItems)) {
    return false;
  }
  if (!schema.items) {
    return true;
  }
  for (let i = 0;i < schema.items.length; i++) {
    if (!Visit6(schema.items[i], references, value[i]))
      return false;
  }
  return true;
}
function FromUndefined3(schema, references, value) {
  return IsUndefined(value);
}
function FromUnion7(schema, references, value) {
  return schema.anyOf.some((inner) => Visit6(inner, references, value));
}
function FromUint8Array3(schema, references, value) {
  if (!IsUint8Array(value)) {
    return false;
  }
  if (IsDefined2(schema.maxByteLength) && !(value.length <= schema.maxByteLength)) {
    return false;
  }
  if (IsDefined2(schema.minByteLength) && !(value.length >= schema.minByteLength)) {
    return false;
  }
  return true;
}
function FromUnknown3(schema, references, value) {
  return true;
}
function FromVoid3(schema, references, value) {
  return TypeSystemPolicy.IsVoidLike(value);
}
function FromKind2(schema, references, value) {
  if (!exports_type.Has(schema[Kind]))
    return false;
  const func = exports_type.Get(schema[Kind]);
  return func(schema, value);
}
function Visit6(schema, references, value) {
  const references_ = IsDefined2(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny3(schema_, references_, value);
    case "Array":
      return FromArray5(schema_, references_, value);
    case "AsyncIterator":
      return FromAsyncIterator3(schema_, references_, value);
    case "BigInt":
      return FromBigInt3(schema_, references_, value);
    case "Boolean":
      return FromBoolean3(schema_, references_, value);
    case "Constructor":
      return FromConstructor3(schema_, references_, value);
    case "Date":
      return FromDate3(schema_, references_, value);
    case "Function":
      return FromFunction3(schema_, references_, value);
    case "Integer":
      return FromInteger3(schema_, references_, value);
    case "Intersect":
      return FromIntersect5(schema_, references_, value);
    case "Iterator":
      return FromIterator3(schema_, references_, value);
    case "Literal":
      return FromLiteral4(schema_, references_, value);
    case "Never":
      return FromNever3(schema_, references_, value);
    case "Not":
      return FromNot3(schema_, references_, value);
    case "Null":
      return FromNull3(schema_, references_, value);
    case "Number":
      return FromNumber3(schema_, references_, value);
    case "Object":
      return FromObject3(schema_, references_, value);
    case "Promise":
      return FromPromise3(schema_, references_, value);
    case "Record":
      return FromRecord3(schema_, references_, value);
    case "Ref":
      return FromRef2(schema_, references_, value);
    case "RegExp":
      return FromRegExp3(schema_, references_, value);
    case "String":
      return FromString3(schema_, references_, value);
    case "Symbol":
      return FromSymbol3(schema_, references_, value);
    case "TemplateLiteral":
      return FromTemplateLiteral4(schema_, references_, value);
    case "This":
      return FromThis2(schema_, references_, value);
    case "Tuple":
      return FromTuple5(schema_, references_, value);
    case "Undefined":
      return FromUndefined3(schema_, references_, value);
    case "Union":
      return FromUnion7(schema_, references_, value);
    case "Uint8Array":
      return FromUint8Array3(schema_, references_, value);
    case "Unknown":
      return FromUnknown3(schema_, references_, value);
    case "Void":
      return FromVoid3(schema_, references_, value);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCheckUnknownTypeError(schema_);
      return FromKind2(schema_, references_, value);
  }
}
function Check(...args) {
  return args.length === 3 ? Visit6(args[0], args[1], args[2]) : Visit6(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/clone/clone.mjs
function ObjectType3(value) {
  const Acc = {};
  for (const key of Object.getOwnPropertyNames(value)) {
    Acc[key] = Clone2(value[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value)) {
    Acc[key] = Clone2(value[key]);
  }
  return Acc;
}
function ArrayType3(value) {
  return value.map((element) => Clone2(element));
}
function TypedArrayType(value) {
  return value.slice();
}
function DateType3(value) {
  return new Date(value.toISOString());
}
function ValueType(value) {
  return value;
}
function Clone2(value) {
  if (IsArray(value))
    return ArrayType3(value);
  if (IsDate(value))
    return DateType3(value);
  if (IsStandardObject(value))
    return ObjectType3(value);
  if (IsTypedArray(value))
    return TypedArrayType(value);
  if (IsValueType(value))
    return ValueType(value);
  throw new Error("ValueClone: Unable to clone value");
}
// node_modules/@sinclair/typebox/build/esm/value/create/create.mjs
class ValueCreateError extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
function FromDefault(value) {
  return typeof value === "function" ? value : Clone2(value);
}
function FromAny4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
}
function FromArray6(schema, references) {
  if (schema.uniqueItems === true && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the uniqueItems constraint requires a default value");
  } else if ("contains" in schema && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the contains constraint requires a default value");
  } else if ("default" in schema) {
    return FromDefault(schema.default);
  } else if (schema.minItems !== undefined) {
    return Array.from({ length: schema.minItems }).map((item) => {
      return Visit7(schema.items, references);
    });
  } else {
    return [];
  }
}
function FromAsyncIterator4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return async function* () {
    }();
  }
}
function FromBigInt4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return BigInt(0);
  }
}
function FromBoolean4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return false;
  }
}
function FromConstructor4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value = Visit7(schema.returns, references);
    if (typeof value === "object" && !Array.isArray(value)) {
      return class {
        constructor() {
          for (const [key, val] of Object.entries(value)) {
            const self2 = this;
            self2[key] = val;
          }
        }
      };
    } else {
      return class {
      };
    }
  }
}
function FromDate4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimumTimestamp !== undefined) {
    return new Date(schema.minimumTimestamp);
  } else {
    return new Date;
  }
}
function FromFunction4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return () => Visit7(schema.returns, references);
  }
}
function FromInteger4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
}
function FromIntersect6(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value = schema.allOf.reduce((acc, schema2) => {
      const next = Visit7(schema2, references);
      return typeof next === "object" ? { ...acc, ...next } : next;
    }, {});
    if (!Check(schema, references, value))
      throw new ValueCreateError(schema, "Intersect produced invalid value. Consider using a default value.");
    return value;
  }
}
function FromIterator4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return function* () {
    }();
  }
}
function FromLiteral5(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return schema.const;
  }
}
function FromNever4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Never types cannot be created. Consider using a default value.");
  }
}
function FromNot4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Not types must have a default value");
  }
}
function FromNull4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return null;
  }
}
function FromNumber4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
}
function FromObject4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const required = new Set(schema.required);
    const Acc = {};
    for (const [key, subschema] of Object.entries(schema.properties)) {
      if (!required.has(key))
        continue;
      Acc[key] = Visit7(subschema, references);
    }
    return Acc;
  }
}
function FromPromise4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Promise.resolve(Visit7(schema.item, references));
  }
}
function FromRecord4(schema, references) {
  const [keyPattern, valueSchema] = Object.entries(schema.patternProperties)[0];
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (!(keyPattern === PatternStringExact || keyPattern === PatternNumberExact)) {
    const propertyKeys = keyPattern.slice(1, keyPattern.length - 1).split("|");
    const Acc = {};
    for (const key of propertyKeys)
      Acc[key] = Visit7(valueSchema, references);
    return Acc;
  } else {
    return {};
  }
}
function FromRef3(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
}
function FromRegExp4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "RegExp types cannot be created. Consider using a default value.");
  }
}
function FromString4(schema, references) {
  if (schema.pattern !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with patterns must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else if (schema.format !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with formats must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else {
    if (HasPropertyKey(schema, "default")) {
      return FromDefault(schema.default);
    } else if (schema.minLength !== undefined) {
      return Array.from({ length: schema.minLength }).map(() => " ").join("");
    } else {
      return "";
    }
  }
}
function FromSymbol4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if ("value" in schema) {
    return Symbol.for(schema.value);
  } else {
    return Symbol();
  }
}
function FromTemplateLiteral5(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (!IsTemplateLiteralFinite(schema))
    throw new ValueCreateError(schema, "Can only create template literals that produce a finite variants. Consider using a default value.");
  const generated = TemplateLiteralGenerate(schema);
  return generated[0];
}
function FromThis3(schema, references) {
  if (recursiveDepth++ > recursiveMaxDepth)
    throw new ValueCreateError(schema, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
}
function FromTuple6(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (schema.items === undefined) {
    return [];
  } else {
    return Array.from({ length: schema.minItems }).map((_, index) => Visit7(schema.items[index], references));
  }
}
function FromUndefined4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
}
function FromUnion8(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.anyOf.length === 0) {
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  } else {
    return Visit7(schema.anyOf[0], references);
  }
}
function FromUint8Array4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minByteLength !== undefined) {
    return new Uint8Array(schema.minByteLength);
  } else {
    return new Uint8Array(0);
  }
}
function FromUnknown4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
}
function FromVoid4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
}
function FromKind3(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new Error("User defined types must specify a default value");
  }
}
function Visit7(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny4(schema_, references_);
    case "Array":
      return FromArray6(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator4(schema_, references_);
    case "BigInt":
      return FromBigInt4(schema_, references_);
    case "Boolean":
      return FromBoolean4(schema_, references_);
    case "Constructor":
      return FromConstructor4(schema_, references_);
    case "Date":
      return FromDate4(schema_, references_);
    case "Function":
      return FromFunction4(schema_, references_);
    case "Integer":
      return FromInteger4(schema_, references_);
    case "Intersect":
      return FromIntersect6(schema_, references_);
    case "Iterator":
      return FromIterator4(schema_, references_);
    case "Literal":
      return FromLiteral5(schema_, references_);
    case "Never":
      return FromNever4(schema_, references_);
    case "Not":
      return FromNot4(schema_, references_);
    case "Null":
      return FromNull4(schema_, references_);
    case "Number":
      return FromNumber4(schema_, references_);
    case "Object":
      return FromObject4(schema_, references_);
    case "Promise":
      return FromPromise4(schema_, references_);
    case "Record":
      return FromRecord4(schema_, references_);
    case "Ref":
      return FromRef3(schema_, references_);
    case "RegExp":
      return FromRegExp4(schema_, references_);
    case "String":
      return FromString4(schema_, references_);
    case "Symbol":
      return FromSymbol4(schema_, references_);
    case "TemplateLiteral":
      return FromTemplateLiteral5(schema_, references_);
    case "This":
      return FromThis3(schema_, references_);
    case "Tuple":
      return FromTuple6(schema_, references_);
    case "Undefined":
      return FromUndefined4(schema_, references_);
    case "Union":
      return FromUnion8(schema_, references_);
    case "Uint8Array":
      return FromUint8Array4(schema_, references_);
    case "Unknown":
      return FromUnknown4(schema_, references_);
    case "Void":
      return FromVoid4(schema_, references_);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCreateError(schema_, "Unknown type");
      return FromKind3(schema_, references_);
  }
}
var recursiveMaxDepth = 512;
var recursiveDepth = 0;
function Create2(...args) {
  recursiveDepth = 0;
  return args.length === 2 ? Visit7(args[0], args[1]) : Visit7(args[0], []);
}
// node_modules/@sinclair/typebox/build/esm/value/cast/cast.mjs
class ValueCastError extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
function ScoreUnion(schema, references, value) {
  if (schema[Kind] === "Object" && typeof value === "object" && !IsNull(value)) {
    const object2 = schema;
    const keys = Object.getOwnPropertyNames(value);
    const entries = Object.entries(object2.properties);
    const [point, max] = [1 / entries.length, entries.length];
    return entries.reduce((acc, [key, schema2]) => {
      const literal2 = schema2[Kind] === "Literal" && schema2.const === value[key] ? max : 0;
      const checks = Check(schema2, references, value[key]) ? point : 0;
      const exists = keys.includes(key) ? point : 0;
      return acc + (literal2 + checks + exists);
    }, 0);
  } else {
    return Check(schema, references, value) ? 1 : 0;
  }
}
function SelectUnion(union3, references, value) {
  const schemas = union3.anyOf.map((schema) => Deref(schema, references));
  let [select, best] = [schemas[0], 0];
  for (const schema of schemas) {
    const score = ScoreUnion(schema, references, value);
    if (score > best) {
      select = schema;
      best = score;
    }
  }
  return select;
}
function CastUnion(union3, references, value) {
  if ("default" in union3) {
    return typeof value === "function" ? union3.default : Clone2(union3.default);
  } else {
    const schema = SelectUnion(union3, references, value);
    return Cast(schema, references, value);
  }
}
function DefaultClone(schema, references, value) {
  return Check(schema, references, value) ? Clone2(value) : Create2(schema, references);
}
function Default(schema, references, value) {
  return Check(schema, references, value) ? value : Create2(schema, references);
}
function FromArray7(schema, references, value) {
  if (Check(schema, references, value))
    return Clone2(value);
  const created = IsArray(value) ? Clone2(value) : Create2(schema, references);
  const minimum = IsNumber(schema.minItems) && created.length < schema.minItems ? [...created, ...Array.from({ length: schema.minItems - created.length }, () => null)] : created;
  const maximum = IsNumber(schema.maxItems) && minimum.length > schema.maxItems ? minimum.slice(0, schema.maxItems) : minimum;
  const casted = maximum.map((value2) => Visit8(schema.items, references, value2));
  if (schema.uniqueItems !== true)
    return casted;
  const unique = [...new Set(casted)];
  if (!Check(schema, references, unique))
    throw new ValueCastError(schema, "Array cast produced invalid data due to uniqueItems constraint");
  return unique;
}
function FromConstructor5(schema, references, value) {
  if (Check(schema, references, value))
    return Create2(schema, references);
  const required = new Set(schema.returns.required || []);
  const result = function() {
  };
  for (const [key, property] of Object.entries(schema.returns.properties)) {
    if (!required.has(key) && value.prototype[key] === undefined)
      continue;
    result.prototype[key] = Visit8(property, references, value.prototype[key]);
  }
  return result;
}
function FromIntersect7(schema, references, value) {
  const created = Create2(schema, references);
  const mapped2 = IsStandardObject(created) && IsStandardObject(value) ? { ...created, ...value } : value;
  return Check(schema, references, mapped2) ? mapped2 : Create2(schema, references);
}
function FromNever5(schema, references, value) {
  throw new ValueCastError(schema, "Never types cannot be cast");
}
function FromObject5(schema, references, value) {
  if (Check(schema, references, value))
    return value;
  if (value === null || typeof value !== "object")
    return Create2(schema, references);
  const required = new Set(schema.required || []);
  const result = {};
  for (const [key, property] of Object.entries(schema.properties)) {
    if (!required.has(key) && value[key] === undefined)
      continue;
    result[key] = Visit8(property, references, value[key]);
  }
  if (typeof schema.additionalProperties === "object") {
    const propertyNames = Object.getOwnPropertyNames(schema.properties);
    for (const propertyName of Object.getOwnPropertyNames(value)) {
      if (propertyNames.includes(propertyName))
        continue;
      result[propertyName] = Visit8(schema.additionalProperties, references, value[propertyName]);
    }
  }
  return result;
}
function FromRecord5(schema, references, value) {
  if (Check(schema, references, value))
    return Clone2(value);
  if (value === null || typeof value !== "object" || Array.isArray(value) || value instanceof Date)
    return Create2(schema, references);
  const subschemaPropertyName = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const subschema = schema.patternProperties[subschemaPropertyName];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value)) {
    result[propKey] = Visit8(subschema, references, propValue);
  }
  return result;
}
function FromRef4(schema, references, value) {
  return Visit8(Deref(schema, references), references, value);
}
function FromThis4(schema, references, value) {
  return Visit8(Deref(schema, references), references, value);
}
function FromTuple7(schema, references, value) {
  if (Check(schema, references, value))
    return Clone2(value);
  if (!IsArray(value))
    return Create2(schema, references);
  if (schema.items === undefined)
    return [];
  return schema.items.map((schema2, index) => Visit8(schema2, references, value[index]));
}
function FromUnion9(schema, references, value) {
  return Check(schema, references, value) ? Clone2(value) : CastUnion(schema, references, value);
}
function Visit8(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray7(schema_, references_, value);
    case "Constructor":
      return FromConstructor5(schema_, references_, value);
    case "Intersect":
      return FromIntersect7(schema_, references_, value);
    case "Never":
      return FromNever5(schema_, references_, value);
    case "Object":
      return FromObject5(schema_, references_, value);
    case "Record":
      return FromRecord5(schema_, references_, value);
    case "Ref":
      return FromRef4(schema_, references_, value);
    case "This":
      return FromThis4(schema_, references_, value);
    case "Tuple":
      return FromTuple7(schema_, references_, value);
    case "Union":
      return FromUnion9(schema_, references_, value);
    case "Date":
    case "Symbol":
    case "Uint8Array":
      return DefaultClone(schema, references, value);
    default:
      return Default(schema_, references_, value);
  }
}
function Cast(...args) {
  return args.length === 3 ? Visit8(args[0], args[1], args[2]) : Visit8(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/clean/clean.mjs
function IsCheckable(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
}
function FromArray8(schema, references, value) {
  if (!IsArray(value))
    return value;
  return value.map((value2) => Visit9(schema.items, references, value2));
}
function FromIntersect8(schema, references, value) {
  const unevaluatedProperties = schema.unevaluatedProperties;
  const intersections = schema.allOf.map((schema2) => Visit9(schema2, references, Clone2(value)));
  const composite = intersections.reduce((acc, value2) => IsObject(value2) ? { ...acc, ...value2 } : value2, {});
  if (!IsObject(value) || !IsObject(composite) || !IsSchema2(unevaluatedProperties))
    return composite;
  const knownkeys = KeyOfPropertyKeys(schema);
  for (const key of Object.getOwnPropertyNames(value)) {
    if (knownkeys.includes(key))
      continue;
    if (Check(unevaluatedProperties, references, value[key])) {
      composite[key] = Visit9(unevaluatedProperties, references, value[key]);
    }
  }
  return composite;
}
function FromObject6(schema, references, value) {
  if (!IsObject(value) || IsArray(value))
    return value;
  const additionalProperties = schema.additionalProperties;
  for (const key of Object.getOwnPropertyNames(value)) {
    if (key in schema.properties) {
      value[key] = Visit9(schema.properties[key], references, value[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value[key])) {
      value[key] = Visit9(additionalProperties, references, value[key]);
      continue;
    }
    delete value[key];
  }
  return value;
}
function FromRecord6(schema, references, value) {
  if (!IsObject(value))
    return value;
  const additionalProperties = schema.additionalProperties;
  const propertyKeys = Object.getOwnPropertyNames(value);
  const [propertyKey, propertySchema] = Object.entries(schema.patternProperties)[0];
  const propertyKeyTest = new RegExp(propertyKey);
  for (const key of propertyKeys) {
    if (propertyKeyTest.test(key)) {
      value[key] = Visit9(propertySchema, references, value[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value[key])) {
      value[key] = Visit9(additionalProperties, references, value[key]);
      continue;
    }
    delete value[key];
  }
  return value;
}
function FromRef5(schema, references, value) {
  return Visit9(Deref(schema, references), references, value);
}
function FromThis5(schema, references, value) {
  return Visit9(Deref(schema, references), references, value);
}
function FromTuple8(schema, references, value) {
  if (!IsArray(value))
    return value;
  if (IsUndefined(schema.items))
    return [];
  const length = Math.min(value.length, schema.items.length);
  for (let i = 0;i < length; i++) {
    value[i] = Visit9(schema.items[i], references, value[i]);
  }
  return value.length > length ? value.slice(0, length) : value;
}
function FromUnion10(schema, references, value) {
  for (const inner of schema.anyOf) {
    if (IsCheckable(inner) && Check(inner, references, value)) {
      return Visit9(inner, references, value);
    }
  }
  return value;
}
function Visit9(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray8(schema_, references_, value);
    case "Intersect":
      return FromIntersect8(schema_, references_, value);
    case "Object":
      return FromObject6(schema_, references_, value);
    case "Record":
      return FromRecord6(schema_, references_, value);
    case "Ref":
      return FromRef5(schema_, references_, value);
    case "This":
      return FromThis5(schema_, references_, value);
    case "Tuple":
      return FromTuple8(schema_, references_, value);
    case "Union":
      return FromUnion10(schema_, references_, value);
    default:
      return value;
  }
}
function Clean(...args) {
  return args.length === 3 ? Visit9(args[0], args[1], args[2]) : Visit9(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/convert/convert.mjs
function IsStringNumeric(value) {
  return IsString(value) && !isNaN(value) && !isNaN(parseFloat(value));
}
function IsValueToString(value) {
  return IsBigInt(value) || IsBoolean(value) || IsNumber(value);
}
function IsValueTrue(value) {
  return value === true || IsNumber(value) && value === 1 || IsBigInt(value) && value === BigInt("1") || IsString(value) && (value.toLowerCase() === "true" || value === "1");
}
function IsValueFalse(value) {
  return value === false || IsNumber(value) && (value === 0 || Object.is(value, -0)) || IsBigInt(value) && value === BigInt("0") || IsString(value) && (value.toLowerCase() === "false" || value === "0" || value === "-0");
}
function IsTimeStringWithTimeZone(value) {
  return IsString(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value);
}
function IsTimeStringWithoutTimeZone(value) {
  return IsString(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value);
}
function IsDateTimeStringWithTimeZone(value) {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value);
}
function IsDateTimeStringWithoutTimeZone(value) {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value);
}
function IsDateString(value) {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value);
}
function TryConvertLiteralString(value, target) {
  const conversion = TryConvertString(value);
  return conversion === target ? conversion : value;
}
function TryConvertLiteralNumber(value, target) {
  const conversion = TryConvertNumber(value);
  return conversion === target ? conversion : value;
}
function TryConvertLiteralBoolean(value, target) {
  const conversion = TryConvertBoolean(value);
  return conversion === target ? conversion : value;
}
function TryConvertLiteral(schema, value) {
  return IsString(schema.const) ? TryConvertLiteralString(value, schema.const) : IsNumber(schema.const) ? TryConvertLiteralNumber(value, schema.const) : IsBoolean(schema.const) ? TryConvertLiteralBoolean(value, schema.const) : Clone2(value);
}
function TryConvertBoolean(value) {
  return IsValueTrue(value) ? true : IsValueFalse(value) ? false : value;
}
function TryConvertBigInt(value) {
  return IsStringNumeric(value) ? BigInt(parseInt(value)) : IsNumber(value) ? BigInt(value | 0) : IsValueFalse(value) ? BigInt(0) : IsValueTrue(value) ? BigInt(1) : value;
}
function TryConvertString(value) {
  return IsValueToString(value) ? value.toString() : IsSymbol(value) && value.description !== undefined ? value.description.toString() : value;
}
function TryConvertNumber(value) {
  return IsStringNumeric(value) ? parseFloat(value) : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value;
}
function TryConvertInteger(value) {
  return IsStringNumeric(value) ? parseInt(value) : IsNumber(value) ? value | 0 : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value;
}
function TryConvertNull(value) {
  return IsString(value) && value.toLowerCase() === "null" ? null : value;
}
function TryConvertUndefined(value) {
  return IsString(value) && value === "undefined" ? undefined : value;
}
function TryConvertDate(value) {
  return IsDate(value) ? value : IsNumber(value) ? new Date(value) : IsValueTrue(value) ? new Date(1) : IsValueFalse(value) ? new Date(0) : IsStringNumeric(value) ? new Date(parseInt(value)) : IsTimeStringWithoutTimeZone(value) ? new Date(`1970-01-01T${value}.000Z`) : IsTimeStringWithTimeZone(value) ? new Date(`1970-01-01T${value}`) : IsDateTimeStringWithoutTimeZone(value) ? new Date(`${value}.000Z`) : IsDateTimeStringWithTimeZone(value) ? new Date(value) : IsDateString(value) ? new Date(`${value}T00:00:00.000Z`) : value;
}
function Default2(value) {
  return value;
}
function FromArray9(schema, references, value) {
  const elements = IsArray(value) ? value : [value];
  return elements.map((element) => Visit10(schema.items, references, element));
}
function FromBigInt5(schema, references, value) {
  return TryConvertBigInt(value);
}
function FromBoolean5(schema, references, value) {
  return TryConvertBoolean(value);
}
function FromDate5(schema, references, value) {
  return TryConvertDate(value);
}
function FromInteger5(schema, references, value) {
  return TryConvertInteger(value);
}
function FromIntersect9(schema, references, value) {
  return schema.allOf.reduce((value2, schema2) => Visit10(schema2, references, value2), value);
}
function FromLiteral6(schema, references, value) {
  return TryConvertLiteral(schema, value);
}
function FromNull5(schema, references, value) {
  return TryConvertNull(value);
}
function FromNumber5(schema, references, value) {
  return TryConvertNumber(value);
}
function FromObject7(schema, references, value) {
  const isConvertable = IsObject(value);
  if (!isConvertable)
    return value;
  const result = {};
  for (const key of Object.keys(value)) {
    result[key] = HasPropertyKey(schema.properties, key) ? Visit10(schema.properties[key], references, value[key]) : value[key];
  }
  return result;
}
function FromRecord7(schema, references, value) {
  const propertyKey = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[propertyKey];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value)) {
    result[propKey] = Visit10(property, references, propValue);
  }
  return result;
}
function FromRef6(schema, references, value) {
  return Visit10(Deref(schema, references), references, value);
}
function FromString5(schema, references, value) {
  return TryConvertString(value);
}
function FromSymbol5(schema, references, value) {
  return IsString(value) || IsNumber(value) ? Symbol(value) : value;
}
function FromThis6(schema, references, value) {
  return Visit10(Deref(schema, references), references, value);
}
function FromTuple9(schema, references, value) {
  const isConvertable = IsArray(value) && !IsUndefined(schema.items);
  if (!isConvertable)
    return value;
  return value.map((value2, index) => {
    return index < schema.items.length ? Visit10(schema.items[index], references, value2) : value2;
  });
}
function FromUndefined5(schema, references, value) {
  return TryConvertUndefined(value);
}
function FromUnion11(schema, references, value) {
  for (const subschema of schema.anyOf) {
    const converted = Visit10(subschema, references, value);
    if (!Check(subschema, references, converted))
      continue;
    return converted;
  }
  return value;
}
function Visit10(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray9(schema_, references_, value);
    case "BigInt":
      return FromBigInt5(schema_, references_, value);
    case "Boolean":
      return FromBoolean5(schema_, references_, value);
    case "Date":
      return FromDate5(schema_, references_, value);
    case "Integer":
      return FromInteger5(schema_, references_, value);
    case "Intersect":
      return FromIntersect9(schema_, references_, value);
    case "Literal":
      return FromLiteral6(schema_, references_, value);
    case "Null":
      return FromNull5(schema_, references_, value);
    case "Number":
      return FromNumber5(schema_, references_, value);
    case "Object":
      return FromObject7(schema_, references_, value);
    case "Record":
      return FromRecord7(schema_, references_, value);
    case "Ref":
      return FromRef6(schema_, references_, value);
    case "String":
      return FromString5(schema_, references_, value);
    case "Symbol":
      return FromSymbol5(schema_, references_, value);
    case "This":
      return FromThis6(schema_, references_, value);
    case "Tuple":
      return FromTuple9(schema_, references_, value);
    case "Undefined":
      return FromUndefined5(schema_, references_, value);
    case "Union":
      return FromUnion11(schema_, references_, value);
    default:
      return Default2(value);
  }
}
function Convert(...args) {
  return args.length === 3 ? Visit10(args[0], args[1], args[2]) : Visit10(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/default/default.mjs
function ValueOrDefault(schema, value) {
  return value === undefined && "default" in schema ? Clone2(schema.default) : value;
}
function IsCheckable2(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
}
function IsDefaultSchema(value) {
  return IsSchema2(value) && "default" in value;
}
function FromArray10(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsArray(defaulted))
    return defaulted;
  for (let i = 0;i < defaulted.length; i++) {
    defaulted[i] = Visit11(schema.items, references, defaulted[i]);
  }
  return defaulted;
}
function FromIntersect10(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  return schema.allOf.reduce((acc, schema2) => {
    const next = Visit11(schema2, references, defaulted);
    return IsObject(next) ? { ...acc, ...next } : next;
  }, {});
}
function FromObject8(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const knownPropertyKeys = Object.getOwnPropertyNames(schema.properties);
  for (const key of knownPropertyKeys) {
    if (!IsDefaultSchema(schema.properties[key]))
      continue;
    defaulted[key] = Visit11(schema.properties[key], references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKeys.includes(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
}
function FromRecord8(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const [propertyKeyPattern, propertySchema] = Object.entries(schema.patternProperties)[0];
  const knownPropertyKey = new RegExp(propertyKeyPattern);
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (!(knownPropertyKey.test(key) && IsDefaultSchema(propertySchema)))
      continue;
    defaulted[key] = Visit11(propertySchema, references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKey.test(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
}
function FromRef7(schema, references, value) {
  return Visit11(Deref(schema, references), references, ValueOrDefault(schema, value));
}
function FromThis7(schema, references, value) {
  return Visit11(Deref(schema, references), references, value);
}
function FromTuple10(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsArray(defaulted) || IsUndefined(schema.items))
    return defaulted;
  const [items, max] = [schema.items, Math.max(schema.items.length, defaulted.length)];
  for (let i = 0;i < max; i++) {
    if (i < items.length)
      defaulted[i] = Visit11(items[i], references, defaulted[i]);
  }
  return defaulted;
}
function FromUnion12(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  for (const inner of schema.anyOf) {
    const result = Visit11(inner, references, defaulted);
    if (IsCheckable2(inner) && Check(inner, result)) {
      return result;
    }
  }
  return defaulted;
}
function Visit11(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray10(schema_, references_, value);
    case "Intersect":
      return FromIntersect10(schema_, references_, value);
    case "Object":
      return FromObject8(schema_, references_, value);
    case "Record":
      return FromRecord8(schema_, references_, value);
    case "Ref":
      return FromRef7(schema_, references_, value);
    case "This":
      return FromThis7(schema_, references_, value);
    case "Tuple":
      return FromTuple10(schema_, references_, value);
    case "Union":
      return FromUnion12(schema_, references_, value);
    default:
      return ValueOrDefault(schema_, value);
  }
}
function Default3(...args) {
  return args.length === 3 ? Visit11(args[0], args[1], args[2]) : Visit11(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/pointer/pointer.mjs
var exports_pointer = {};
__export(exports_pointer, {
  ValuePointerRootSetError: () => ValuePointerRootSetError,
  ValuePointerRootDeleteError: () => ValuePointerRootDeleteError,
  Set: () => Set4,
  Has: () => Has3,
  Get: () => Get3,
  Format: () => Format,
  Delete: () => Delete3
});
class ValuePointerRootSetError extends TypeBoxError {
  constructor(value, path, update) {
    super("Cannot set root value");
    this.value = value;
    this.path = path;
    this.update = update;
  }
}

class ValuePointerRootDeleteError extends TypeBoxError {
  constructor(value, path) {
    super("Cannot delete root value");
    this.value = value;
    this.path = path;
  }
}
function Escape2(component) {
  return component.indexOf("~") === -1 ? component : component.replace(/~1/g, "/").replace(/~0/g, "~");
}
function* Format(pointer) {
  if (pointer === "")
    return;
  let [start, end] = [0, 0];
  for (let i = 0;i < pointer.length; i++) {
    const char = pointer.charAt(i);
    if (char === "/") {
      if (i === 0) {
        start = i + 1;
      } else {
        end = i;
        yield Escape2(pointer.slice(start, end));
        start = i + 1;
      }
    } else {
      end = i;
    }
  }
  yield Escape2(pointer.slice(start));
}
function Set4(value, pointer, update) {
  if (pointer === "")
    throw new ValuePointerRootSetError(value, pointer, update);
  let [owner, next, key] = [null, value, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      next[component] = {};
    owner = next;
    next = next[component];
    key = component;
  }
  owner[key] = update;
}
function Delete3(value, pointer) {
  if (pointer === "")
    throw new ValuePointerRootDeleteError(value, pointer);
  let [owner, next, key] = [null, value, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined || next[component] === null)
      return;
    owner = next;
    next = next[component];
    key = component;
  }
  if (Array.isArray(owner)) {
    const index = parseInt(key);
    owner.splice(index, 1);
  } else {
    delete owner[key];
  }
}
function Has3(value, pointer) {
  if (pointer === "")
    return true;
  let [owner, next, key] = [null, value, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      return false;
    owner = next;
    next = next[component];
    key = component;
  }
  return Object.getOwnPropertyNames(owner).includes(key);
}
function Get3(value, pointer) {
  if (pointer === "")
    return value;
  let current = value;
  for (const component of Format(pointer)) {
    if (current[component] === undefined)
      return;
    current = current[component];
  }
  return current;
}
// node_modules/@sinclair/typebox/build/esm/value/delta/delta.mjs
var Insert = Object2({
  type: Literal("insert"),
  path: String2(),
  value: Unknown()
});
var Update = Object2({
  type: Literal("update"),
  path: String2(),
  value: Unknown()
});
var Delete4 = Object2({
  type: Literal("delete"),
  path: String2()
});
var Edit = Union([Insert, Update, Delete4]);

class ValueDeltaError extends TypeBoxError {
  constructor(value, message) {
    super(message);
    this.value = value;
  }
}

class ValueDeltaSymbolError extends ValueDeltaError {
  constructor(value) {
    super(value, "Cannot diff objects with symbol keys");
    this.value = value;
  }
}
function CreateUpdate(path, value) {
  return { type: "update", path, value };
}
function CreateInsert(path, value) {
  return { type: "insert", path, value };
}
function CreateDelete(path) {
  return { type: "delete", path };
}
function* ObjectType4(path, current, next) {
  if (!IsStandardObject(next))
    return yield CreateUpdate(path, next);
  const currentKeys = [...globalThis.Object.keys(current), ...globalThis.Object.getOwnPropertySymbols(current)];
  const nextKeys = [...globalThis.Object.keys(next), ...globalThis.Object.getOwnPropertySymbols(next)];
  for (const key of currentKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && nextKeys.includes(key))
      yield CreateUpdate(`${path}/${globalThis.String(key)}`, undefined);
  }
  for (const key of nextKeys) {
    if (IsUndefined(current[key]) || IsUndefined(next[key]))
      continue;
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    yield* Visit12(`${path}/${globalThis.String(key)}`, current[key], next[key]);
  }
  for (const key of nextKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(current[key]))
      yield CreateInsert(`${path}/${globalThis.String(key)}`, next[key]);
  }
  for (const key of currentKeys.reverse()) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && !nextKeys.includes(key))
      yield CreateDelete(`${path}/${globalThis.String(key)}`);
  }
}
function* ArrayType4(path, current, next) {
  if (!IsArray(next))
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
  for (let i = 0;i < next.length; i++) {
    if (i < current.length)
      continue;
    yield CreateInsert(`${path}/${i}`, next[i]);
  }
  for (let i = current.length - 1;i >= 0; i--) {
    if (i < next.length)
      continue;
    yield CreateDelete(`${path}/${i}`);
  }
}
function* TypedArrayType2(path, current, next) {
  if (!IsTypedArray(next) || current.length !== next.length || globalThis.Object.getPrototypeOf(current).constructor.name !== globalThis.Object.getPrototypeOf(next).constructor.name)
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
}
function* ValueType2(path, current, next) {
  if (current === next)
    return;
  yield CreateUpdate(path, next);
}
function* Visit12(path, current, next) {
  if (IsStandardObject(current))
    return yield* ObjectType4(path, current, next);
  if (IsArray(current))
    return yield* ArrayType4(path, current, next);
  if (IsTypedArray(current))
    return yield* TypedArrayType2(path, current, next);
  if (IsValueType(current))
    return yield* ValueType2(path, current, next);
  throw new ValueDeltaError(current, "Unable to create diff edits for unknown value");
}
function Diff(current, next) {
  return [...Visit12("", current, next)];
}
function IsRootUpdate(edits) {
  return edits.length > 0 && edits[0].path === "" && edits[0].type === "update";
}
function IsIdentity(edits) {
  return edits.length === 0;
}
function Patch(current, edits) {
  if (IsRootUpdate(edits)) {
    return Clone2(edits[0].value);
  }
  if (IsIdentity(edits)) {
    return Clone2(current);
  }
  const clone2 = Clone2(current);
  for (const edit of edits) {
    switch (edit.type) {
      case "insert": {
        exports_pointer.Set(clone2, edit.path, edit.value);
        break;
      }
      case "update": {
        exports_pointer.Set(clone2, edit.path, edit.value);
        break;
      }
      case "delete": {
        exports_pointer.Delete(clone2, edit.path);
        break;
      }
    }
  }
  return clone2;
}
// node_modules/@sinclair/typebox/build/esm/value/equal/equal.mjs
function ObjectType5(left, right) {
  if (!IsStandardObject(right))
    return false;
  const leftKeys = [...Object.keys(left), ...Object.getOwnPropertySymbols(left)];
  const rightKeys = [...Object.keys(right), ...Object.getOwnPropertySymbols(right)];
  if (leftKeys.length !== rightKeys.length)
    return false;
  return leftKeys.every((key) => Equal(left[key], right[key]));
}
function DateType4(left, right) {
  return IsDate(right) && left.getTime() === right.getTime();
}
function ArrayType5(left, right) {
  if (!IsArray(right) || left.length !== right.length)
    return false;
  return left.every((value, index) => Equal(value, right[index]));
}
function TypedArrayType3(left, right) {
  if (!IsTypedArray(right) || left.length !== right.length || Object.getPrototypeOf(left).constructor.name !== Object.getPrototypeOf(right).constructor.name)
    return false;
  return left.every((value, index) => Equal(value, right[index]));
}
function ValueType3(left, right) {
  return left === right;
}
function Equal(left, right) {
  if (IsStandardObject(left))
    return ObjectType5(left, right);
  if (IsDate(left))
    return DateType4(left, right);
  if (IsTypedArray(left))
    return TypedArrayType3(left, right);
  if (IsArray(left))
    return ArrayType5(left, right);
  if (IsValueType(left))
    return ValueType3(left, right);
  throw new Error("ValueEquals: Unable to compare value");
}
// node_modules/@sinclair/typebox/build/esm/value/mutate/mutate.mjs
class ValueMutateError extends TypeBoxError {
  constructor(message) {
    super(message);
  }
}
function ObjectType6(root, path, current, next) {
  if (!IsStandardObject(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    const currentKeys = Object.getOwnPropertyNames(current);
    const nextKeys = Object.getOwnPropertyNames(next);
    for (const currentKey of currentKeys) {
      if (!nextKeys.includes(currentKey)) {
        delete current[currentKey];
      }
    }
    for (const nextKey of nextKeys) {
      if (!currentKeys.includes(nextKey)) {
        current[nextKey] = null;
      }
    }
    for (const nextKey of nextKeys) {
      Visit13(root, `${path}/${nextKey}`, current[nextKey], next[nextKey]);
    }
  }
}
function ArrayType6(root, path, current, next) {
  if (!IsArray(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    for (let index = 0;index < next.length; index++) {
      Visit13(root, `${path}/${index}`, current[index], next[index]);
    }
    current.splice(next.length);
  }
}
function TypedArrayType4(root, path, current, next) {
  if (IsTypedArray(current) && current.length === next.length) {
    for (let i = 0;i < current.length; i++) {
      current[i] = next[i];
    }
  } else {
    exports_pointer.Set(root, path, Clone2(next));
  }
}
function ValueType4(root, path, current, next) {
  if (current === next)
    return;
  exports_pointer.Set(root, path, next);
}
function Visit13(root, path, current, next) {
  if (IsArray(next))
    return ArrayType6(root, path, current, next);
  if (IsTypedArray(next))
    return TypedArrayType4(root, path, current, next);
  if (IsStandardObject(next))
    return ObjectType6(root, path, current, next);
  if (IsValueType(next))
    return ValueType4(root, path, current, next);
}
function IsNonMutableValue(value) {
  return IsTypedArray(value) || IsValueType(value);
}
function IsMismatchedValue(current, next) {
  return IsStandardObject(current) && IsArray(next) || IsArray(current) && IsStandardObject(next);
}
function Mutate(current, next) {
  if (IsNonMutableValue(current) || IsNonMutableValue(next))
    throw new ValueMutateError("Only object and array types can be mutated at the root level");
  if (IsMismatchedValue(current, next))
    throw new ValueMutateError("Cannot assign due type mismatch of assignable values");
  Visit13(current, "", current, next);
}
// node_modules/@sinclair/typebox/build/esm/value/transform/decode.mjs
class TransformDecodeCheckError extends TypeBoxError {
  constructor(schema, value, error2) {
    super(`Unable to decode value as it does not match the expected schema`);
    this.schema = schema;
    this.value = value;
    this.error = error2;
  }
}

class TransformDecodeError extends TypeBoxError {
  constructor(schema, path, value, error2) {
    super(error2 instanceof Error ? error2.message : "Unknown error");
    this.schema = schema;
    this.path = path;
    this.value = value;
    this.error = error2;
  }
}
function Default4(schema, path, value) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Decode(value) : value;
  } catch (error2) {
    throw new TransformDecodeError(schema, path, value, error2);
  }
}
function FromArray11(schema, references, path, value) {
  return IsArray(value) ? Default4(schema, path, value.map((value2, index) => Visit14(schema.items, references, `${path}/${index}`, value2))) : Default4(schema, path, value);
}
function FromIntersect11(schema, references, path, value) {
  if (!IsStandardObject(value) || IsValueType(value))
    return Default4(schema, path, value);
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...value };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit14(knownSchema, references, `${path}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(unevaluatedProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
}
function FromNot5(schema, references, path, value) {
  return Default4(schema, path, Visit14(schema.not, references, path, value));
}
function FromObject9(schema, references, path, value) {
  if (!IsStandardObject(value))
    return Default4(schema, path, value);
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...value };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit14(schema.properties[key], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
}
function FromRecord9(schema, references, path, value) {
  if (!IsStandardObject(value))
    return Default4(schema, path, value);
  const pattern2 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern2);
  const knownProperties = { ...value };
  for (const key of Object.getOwnPropertyNames(value))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit14(schema.patternProperties[pattern2], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
}
function FromRef8(schema, references, path, value) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value));
}
function FromThis8(schema, references, path, value) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value));
}
function FromTuple11(schema, references, path, value) {
  return IsArray(value) && IsArray(schema.items) ? Default4(schema, path, schema.items.map((schema2, index) => Visit14(schema2, references, `${path}/${index}`, value[index]))) : Default4(schema, path, value);
}
function FromUnion13(schema, references, path, value) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value))
      continue;
    const decoded = Visit14(subschema, references, path, value);
    return Default4(schema, path, decoded);
  }
  return Default4(schema, path, value);
}
function Visit14(schema, references, path, value) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray11(schema_, references_, path, value);
    case "Intersect":
      return FromIntersect11(schema_, references_, path, value);
    case "Not":
      return FromNot5(schema_, references_, path, value);
    case "Object":
      return FromObject9(schema_, references_, path, value);
    case "Record":
      return FromRecord9(schema_, references_, path, value);
    case "Ref":
      return FromRef8(schema_, references_, path, value);
    case "Symbol":
      return Default4(schema_, path, value);
    case "This":
      return FromThis8(schema_, references_, path, value);
    case "Tuple":
      return FromTuple11(schema_, references_, path, value);
    case "Union":
      return FromUnion13(schema_, references_, path, value);
    default:
      return Default4(schema_, path, value);
  }
}
function TransformDecode(schema, references, value) {
  return Visit14(schema, references, "", value);
}
// node_modules/@sinclair/typebox/build/esm/value/transform/encode.mjs
class TransformEncodeCheckError extends TypeBoxError {
  constructor(schema, value, error2) {
    super(`The encoded value does not match the expected schema`);
    this.schema = schema;
    this.value = value;
    this.error = error2;
  }
}

class TransformEncodeError extends TypeBoxError {
  constructor(schema, path, value, error2) {
    super(`${error2 instanceof Error ? error2.message : "Unknown error"}`);
    this.schema = schema;
    this.path = path;
    this.value = value;
    this.error = error2;
  }
}
function Default5(schema, path, value) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Encode(value) : value;
  } catch (error2) {
    throw new TransformEncodeError(schema, path, value, error2);
  }
}
function FromArray12(schema, references, path, value) {
  const defaulted = Default5(schema, path, value);
  return IsArray(defaulted) ? defaulted.map((value2, index) => Visit15(schema.items, references, `${path}/${index}`, value2)) : defaulted;
}
function FromIntersect12(schema, references, path, value) {
  const defaulted = Default5(schema, path, value);
  if (!IsStandardObject(value) || IsValueType(value))
    return defaulted;
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...defaulted };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit15(knownSchema, references, `${path}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(unevaluatedProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
}
function FromNot6(schema, references, path, value) {
  return Default5(schema.not, path, Default5(schema, path, value));
}
function FromObject10(schema, references, path, value) {
  const defaulted = Default5(schema, path, value);
  if (!IsStandardObject(defaulted))
    return defaulted;
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...defaulted };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit15(schema.properties[key], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return knownProperties;
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(additionalProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
}
function FromRecord10(schema, references, path, value) {
  const defaulted = Default5(schema, path, value);
  if (!IsStandardObject(value))
    return defaulted;
  const pattern2 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern2);
  const knownProperties = { ...defaulted };
  for (const key of Object.getOwnPropertyNames(value))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit15(schema.patternProperties[pattern2], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      properties[key] = Default5(additionalProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
}
function FromRef9(schema, references, path, value) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value);
  return Default5(schema, path, resolved);
}
function FromThis9(schema, references, path, value) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value);
  return Default5(schema, path, resolved);
}
function FromTuple12(schema, references, path, value) {
  const value1 = Default5(schema, path, value);
  return IsArray(schema.items) ? schema.items.map((schema2, index) => Visit15(schema2, references, `${path}/${index}`, value1[index])) : [];
}
function FromUnion14(schema, references, path, value) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value))
      continue;
    const value1 = Visit15(subschema, references, path, value);
    return Default5(schema, path, value1);
  }
  for (const subschema of schema.anyOf) {
    const value1 = Visit15(subschema, references, path, value);
    if (!Check(schema, references, value1))
      continue;
    return Default5(schema, path, value1);
  }
  return Default5(schema, path, value);
}
function Visit15(schema, references, path, value) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray12(schema_, references_, path, value);
    case "Intersect":
      return FromIntersect12(schema_, references_, path, value);
    case "Not":
      return FromNot6(schema_, references_, path, value);
    case "Object":
      return FromObject10(schema_, references_, path, value);
    case "Record":
      return FromRecord10(schema_, references_, path, value);
    case "Ref":
      return FromRef9(schema_, references_, path, value);
    case "This":
      return FromThis9(schema_, references_, path, value);
    case "Tuple":
      return FromTuple12(schema_, references_, path, value);
    case "Union":
      return FromUnion14(schema_, references_, path, value);
    default:
      return Default5(schema_, path, value);
  }
}
function TransformEncode(schema, references, value) {
  return Visit15(schema, references, "", value);
}
// node_modules/@sinclair/typebox/build/esm/value/transform/has.mjs
function FromArray13(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
function FromAsyncIterator5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
function FromConstructor6(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
}
function FromFunction5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
}
function FromIntersect13(schema, references) {
  return IsTransform2(schema) || IsTransform2(schema.unevaluatedProperties) || schema.allOf.some((schema2) => Visit16(schema2, references));
}
function FromIterator5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
function FromNot7(schema, references) {
  return IsTransform2(schema) || Visit16(schema.not, references);
}
function FromObject11(schema, references) {
  return IsTransform2(schema) || Object.values(schema.properties).some((schema2) => Visit16(schema2, references)) || IsSchema2(schema.additionalProperties) && Visit16(schema.additionalProperties, references);
}
function FromPromise5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.item, references);
}
function FromRecord11(schema, references) {
  const pattern2 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[pattern2];
  return IsTransform2(schema) || Visit16(property, references) || IsSchema2(schema.additionalProperties) && IsTransform2(schema.additionalProperties);
}
function FromRef10(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
}
function FromThis10(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
}
function FromTuple13(schema, references) {
  return IsTransform2(schema) || !IsUndefined(schema.items) && schema.items.some((schema2) => Visit16(schema2, references));
}
function FromUnion15(schema, references) {
  return IsTransform2(schema) || schema.anyOf.some((schema2) => Visit16(schema2, references));
}
function Visit16(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  if (schema.$id && visited.has(schema.$id))
    return false;
  if (schema.$id)
    visited.add(schema.$id);
  switch (schema[Kind]) {
    case "Array":
      return FromArray13(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator5(schema_, references_);
    case "Constructor":
      return FromConstructor6(schema_, references_);
    case "Function":
      return FromFunction5(schema_, references_);
    case "Intersect":
      return FromIntersect13(schema_, references_);
    case "Iterator":
      return FromIterator5(schema_, references_);
    case "Not":
      return FromNot7(schema_, references_);
    case "Object":
      return FromObject11(schema_, references_);
    case "Promise":
      return FromPromise5(schema_, references_);
    case "Record":
      return FromRecord11(schema_, references_);
    case "Ref":
      return FromRef10(schema_, references_);
    case "This":
      return FromThis10(schema_, references_);
    case "Tuple":
      return FromTuple13(schema_, references_);
    case "Union":
      return FromUnion15(schema_, references_);
    default:
      return IsTransform2(schema);
  }
}
var visited = new Set;
function HasTransform(schema, references) {
  visited.clear();
  return Visit16(schema, references);
}
// node_modules/@sinclair/typebox/build/esm/value/value/value.mjs
var exports_value2 = {};
__export(exports_value2, {
  Patch: () => Patch2,
  Mutate: () => Mutate2,
  Hash: () => Hash2,
  Errors: () => Errors2,
  Equal: () => Equal2,
  Encode: () => Encode,
  Diff: () => Diff2,
  Default: () => Default6,
  Decode: () => Decode,
  Create: () => Create3,
  Convert: () => Convert2,
  Clone: () => Clone3,
  Clean: () => Clean2,
  Check: () => Check2,
  Cast: () => Cast2
});
function Cast2(...args) {
  return Cast.apply(Cast, args);
}
function Create3(...args) {
  return Create2.apply(Create2, args);
}
function Check2(...args) {
  return Check.apply(Check, args);
}
function Clean2(...args) {
  return Clean.apply(Clean, args);
}
function Convert2(...args) {
  return Convert.apply(Convert, args);
}
function Clone3(value) {
  return Clone2(value);
}
function Decode(...args) {
  const [schema, references, value] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  if (!Check2(schema, references, value))
    throw new TransformDecodeCheckError(schema, value, Errors2(schema, references, value).First());
  return HasTransform(schema, references) ? TransformDecode(schema, references, value) : value;
}
function Default6(...args) {
  return Default3.apply(Default3, args);
}
function Encode(...args) {
  const [schema, references, value] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  const encoded = HasTransform(schema, references) ? TransformEncode(schema, references, value) : value;
  if (!Check2(schema, references, encoded))
    throw new TransformEncodeCheckError(schema, encoded, Errors2(schema, references, encoded).First());
  return encoded;
}
function Errors2(...args) {
  return Errors.apply(Errors, args);
}
function Equal2(left, right) {
  return Equal(left, right);
}
function Diff2(current, next) {
  return Diff(current, next);
}
function Hash2(value) {
  return Hash(value);
}
function Patch2(current, edits) {
  return Patch(current, edits);
}
function Mutate2(current, next) {
  Mutate(current, next);
}
// node_modules/@sinclair/typebox/build/esm/type/awaited/awaited.mjs
function FromRest4(T) {
  return T.map((L) => AwaitedResolve(L));
}
function FromIntersect14(T) {
  return Intersect(FromRest4(T));
}
function FromUnion16(T) {
  return Union(FromRest4(T));
}
function FromPromise6(T) {
  return AwaitedResolve(T);
}
function AwaitedResolve(T) {
  return IsIntersect(T) ? FromIntersect14(T.allOf) : IsUnion(T) ? FromUnion16(T.anyOf) : IsPromise2(T) ? FromPromise6(T.item) : T;
}
function Awaited(T, options = {}) {
  return CloneType(AwaitedResolve(T), options);
}
// node_modules/@sinclair/typebox/build/esm/type/composite/composite.mjs
function CompositeKeys(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...KeyOfPropertyKeys(L));
  return SetDistinct(Acc);
}
function FilterNever(T) {
  return T.filter((L) => !IsNever(L));
}
function CompositeProperty(T, K) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexFromPropertyKeys(L, [K]));
  return FilterNever(Acc);
}
function CompositeProperties(T, K) {
  const Acc = {};
  for (const L of K) {
    Acc[L] = IntersectEvaluated(CompositeProperty(T, L));
  }
  return Acc;
}
function Composite(T, options = {}) {
  const K = CompositeKeys(T);
  const P = CompositeProperties(T, K);
  const R = Object2(P, options);
  return R;
}
// node_modules/@sinclair/typebox/build/esm/type/date/date.mjs
function Date2(options = {}) {
  return {
    ...options,
    [Kind]: "Date",
    type: "Date"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/null/null.mjs
function Null(options = {}) {
  return {
    ...options,
    [Kind]: "Null",
    type: "null"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/symbol/symbol.mjs
function Symbol2(options) {
  return { ...options, [Kind]: "Symbol", type: "symbol" };
}
// node_modules/@sinclair/typebox/build/esm/type/undefined/undefined.mjs
function Undefined(options = {}) {
  return { ...options, [Kind]: "Undefined", type: "undefined" };
}
// node_modules/@sinclair/typebox/build/esm/type/uint8array/uint8array.mjs
function Uint8Array2(options = {}) {
  return { ...options, [Kind]: "Uint8Array", type: "Uint8Array" };
}
// node_modules/@sinclair/typebox/build/esm/type/const/const.mjs
function FromArray14(T) {
  return T.map((L) => FromValue(L, false));
}
function FromProperties8(value2) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(value2))
    Acc[K] = Readonly(FromValue(value2[K], false));
  return Acc;
}
function ConditionalReadonly(T, root) {
  return root === true ? T : Readonly(T);
}
function FromValue(value2, root) {
  return IsAsyncIterator2(value2) ? ConditionalReadonly(Any(), root) : IsIterator2(value2) ? ConditionalReadonly(Any(), root) : IsArray2(value2) ? Readonly(Tuple(FromArray14(value2))) : IsUint8Array2(value2) ? Uint8Array2() : IsDate2(value2) ? Date2() : IsObject2(value2) ? ConditionalReadonly(Object2(FromProperties8(value2)), root) : IsFunction2(value2) ? ConditionalReadonly(Function2([], Unknown()), root) : IsUndefined2(value2) ? Undefined() : IsNull2(value2) ? Null() : IsSymbol2(value2) ? Symbol2() : IsBigInt2(value2) ? BigInt2() : IsNumber2(value2) ? Literal(value2) : IsBoolean2(value2) ? Literal(value2) : IsString2(value2) ? Literal(value2) : Object2({});
}
function Const(T, options = {}) {
  return CloneType(FromValue(T, true), options);
}
// node_modules/@sinclair/typebox/build/esm/type/constructor-parameters/constructor-parameters.mjs
function ConstructorParameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/deref/deref.mjs
function FromRest5(schema, references) {
  return schema.map((schema2) => Deref2(schema2, references));
}
function FromProperties9(properties, references) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(properties)) {
    Acc[K] = Deref2(properties[K], references);
  }
  return Acc;
}
function FromConstructor7(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
}
function FromFunction6(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
}
function FromIntersect15(schema, references) {
  schema.allOf = FromRest5(schema.allOf, references);
  return schema;
}
function FromUnion17(schema, references) {
  schema.anyOf = FromRest5(schema.anyOf, references);
  return schema;
}
function FromTuple14(schema, references) {
  if (IsUndefined2(schema.items))
    return schema;
  schema.items = FromRest5(schema.items, references);
  return schema;
}
function FromArray15(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
function FromObject12(schema, references) {
  schema.properties = FromProperties9(schema.properties, references);
  return schema;
}
function FromPromise7(schema, references) {
  schema.item = Deref2(schema.item, references);
  return schema;
}
function FromAsyncIterator6(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
function FromIterator6(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
function FromRef11(schema, references) {
  const target = references.find((remote) => remote.$id === schema.$ref);
  if (target === undefined)
    throw Error(`Unable to dereference schema with $id ${schema.$ref}`);
  const discard2 = Discard(target, ["$id"]);
  return Deref2(discard2, references);
}
function DerefResolve(schema, references) {
  return IsConstructor(schema) ? FromConstructor7(schema, references) : IsFunction3(schema) ? FromFunction6(schema, references) : IsIntersect(schema) ? FromIntersect15(schema, references) : IsUnion(schema) ? FromUnion17(schema, references) : IsTuple(schema) ? FromTuple14(schema, references) : IsArray3(schema) ? FromArray15(schema, references) : IsObject3(schema) ? FromObject12(schema, references) : IsPromise2(schema) ? FromPromise7(schema, references) : IsAsyncIterator3(schema) ? FromAsyncIterator6(schema, references) : IsIterator3(schema) ? FromIterator6(schema, references) : IsRef(schema) ? FromRef11(schema, references) : schema;
}
function Deref2(schema, references) {
  return DerefResolve(CloneType(schema), CloneRest(references));
}
// node_modules/@sinclair/typebox/build/esm/type/enum/enum.mjs
function Enum(item, options = {}) {
  if (IsUndefined2(item))
    throw new Error("Enum undefined or empty");
  const values1 = globalThis.Object.getOwnPropertyNames(item).filter((key) => isNaN(key)).map((key) => item[key]);
  const values2 = [...new Set(values1)];
  const anyOf = values2.map((value2) => Literal(value2));
  return Union(anyOf, { ...options, [Hint]: "Enum" });
}
// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-template-literal.mjs
function ExcludeFromTemplateLiteral(L, R) {
  return Exclude(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude.mjs
function ExcludeRest(L, R) {
  const excluded = L.filter((inner) => ExtendsCheck(inner, R) === ExtendsResult.False);
  return excluded.length === 1 ? excluded[0] : Union(excluded);
}
function Exclude(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExcludeFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExcludeFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExcludeRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? Never() : L, options);
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-mapped-result.mjs
function FromProperties10(P, U) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Exclude(P[K2], U);
  return Acc;
}
function FromMappedResult7(R, T) {
  return FromProperties10(R.properties, T);
}
function ExcludeFromMappedResult(R, T) {
  const P = FromMappedResult7(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-template-literal.mjs
function ExtractFromTemplateLiteral(L, R) {
  return Extract(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract.mjs
function ExtractRest(L, R) {
  const extracted = L.filter((inner) => ExtendsCheck(inner, R) !== ExtendsResult.False);
  return extracted.length === 1 ? extracted[0] : Union(extracted);
}
function Extract(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExtractFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExtractFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExtractRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? L : Never(), options);
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-mapped-result.mjs
function FromProperties11(P, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extract(P[K2], T);
  return Acc;
}
function FromMappedResult8(R, T) {
  return FromProperties11(R.properties, T);
}
function ExtractFromMappedResult(R, T) {
  const P = FromMappedResult8(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/instance-type/instance-type.mjs
function InstanceType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/integer/integer.mjs
function Integer(options = {}) {
  return {
    ...options,
    [Kind]: "Integer",
    type: "integer"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic-from-mapped-key.mjs
function MappedIntrinsicPropertyKey(K, M, options) {
  return {
    [K]: Intrinsic(Literal(K), M, options)
  };
}
function MappedIntrinsicPropertyKeys(K, M, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIntrinsicPropertyKey(L, M, options) };
  }, {});
}
function MappedIntrinsicProperties(T, M, options) {
  return MappedIntrinsicPropertyKeys(T["keys"], M, options);
}
function IntrinsicFromMappedKey(T, M, options) {
  const P = MappedIntrinsicProperties(T, M, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic.mjs
function ApplyUncapitalize(value2) {
  const [first, rest] = [value2.slice(0, 1), value2.slice(1)];
  return [first.toLowerCase(), rest].join("");
}
function ApplyCapitalize(value2) {
  const [first, rest] = [value2.slice(0, 1), value2.slice(1)];
  return [first.toUpperCase(), rest].join("");
}
function ApplyUppercase(value2) {
  return value2.toUpperCase();
}
function ApplyLowercase(value2) {
  return value2.toLowerCase();
}
function FromTemplateLiteral6(schema, mode, options) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  const finite2 = IsTemplateLiteralExpressionFinite(expression);
  if (!finite2)
    return { ...schema, pattern: FromLiteralValue(schema.pattern, mode) };
  const strings = [...TemplateLiteralExpressionGenerate(expression)];
  const literals = strings.map((value2) => Literal(value2));
  const mapped2 = FromRest6(literals, mode);
  const union3 = Union(mapped2);
  return TemplateLiteral([union3], options);
}
function FromLiteralValue(value2, mode) {
  return typeof value2 === "string" ? mode === "Uncapitalize" ? ApplyUncapitalize(value2) : mode === "Capitalize" ? ApplyCapitalize(value2) : mode === "Uppercase" ? ApplyUppercase(value2) : mode === "Lowercase" ? ApplyLowercase(value2) : value2 : value2.toString();
}
function FromRest6(T, M) {
  return T.map((L) => Intrinsic(L, M));
}
function Intrinsic(schema, mode, options = {}) {
  return IsMappedKey(schema) ? IntrinsicFromMappedKey(schema, mode, options) : IsTemplateLiteral(schema) ? FromTemplateLiteral6(schema, mode, schema) : IsUnion(schema) ? Union(FromRest6(schema.anyOf, mode), options) : IsLiteral(schema) ? Literal(FromLiteralValue(schema.const, mode), options) : schema;
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/capitalize.mjs
function Capitalize(T, options = {}) {
  return Intrinsic(T, "Capitalize", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/lowercase.mjs
function Lowercase(T, options = {}) {
  return Intrinsic(T, "Lowercase", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uncapitalize.mjs
function Uncapitalize(T, options = {}) {
  return Intrinsic(T, "Uncapitalize", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uppercase.mjs
function Uppercase(T, options = {}) {
  return Intrinsic(T, "Uppercase", options);
}
// node_modules/@sinclair/typebox/build/esm/type/not/not.mjs
function Not2(schema, options) {
  return {
    ...options,
    [Kind]: "Not",
    not: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-result.mjs
function FromProperties12(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Omit(P[K2], K, options);
  return Acc;
}
function FromMappedResult9(R, K, options) {
  return FromProperties12(R.properties, K, options);
}
function OmitFromMappedResult(R, K, options) {
  const P = FromMappedResult9(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit.mjs
function FromIntersect16(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
}
function FromUnion18(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
}
function FromProperty2(T, K) {
  const { [K]: _, ...R } = T;
  return R;
}
function FromProperties13(T, K) {
  return K.reduce((T2, K2) => FromProperty2(T2, K2), T);
}
function OmitResolve(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect16(T.allOf, K)) : IsUnion(T) ? Union(FromUnion18(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties13(T.properties, K)) : Object2({});
}
function Omit(T, K, options = {}) {
  if (IsMappedKey(K))
    return OmitFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return OmitFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(OmitResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-key.mjs
function FromPropertyKey2(T, K, options) {
  return {
    [K]: Omit(T, [K], options)
  };
}
function FromPropertyKeys2(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey2(T, LK, options) };
  }, {});
}
function FromMappedKey3(T, K, options) {
  return FromPropertyKeys2(T, K.keys, options);
}
function OmitFromMappedKey(T, K, options) {
  const P = FromMappedKey3(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/parameters/parameters.mjs
function Parameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/partial/partial.mjs
function FromRest7(T) {
  return T.map((L) => PartialResolve(L));
}
function FromProperties14(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Optional(T[K]);
  return Acc;
}
function PartialResolve(T) {
  return IsIntersect(T) ? Intersect(FromRest7(T.allOf)) : IsUnion(T) ? Union(FromRest7(T.anyOf)) : IsObject3(T) ? Object2(FromProperties14(T.properties)) : Object2({});
}
function Partial(T, options = {}) {
  if (IsMappedResult(T))
    return PartialFromMappedResult(T, options);
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PartialResolve(T), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/partial/partial-from-mapped-result.mjs
function FromProperties15(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Partial(K[K2], options);
  return Acc;
}
function FromMappedResult10(R, options) {
  return FromProperties15(R.properties, options);
}
function PartialFromMappedResult(R, options) {
  const P = FromMappedResult10(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-result.mjs
function FromProperties16(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Pick(P[K2], K, options);
  return Acc;
}
function FromMappedResult11(R, K, options) {
  return FromProperties16(R.properties, K, options);
}
function PickFromMappedResult(R, K, options) {
  const P = FromMappedResult11(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick.mjs
function FromIntersect17(T, K) {
  return T.map((T2) => PickResolve(T2, K));
}
function FromUnion19(T, K) {
  return T.map((T2) => PickResolve(T2, K));
}
function FromProperties17(T, K) {
  const Acc = {};
  for (const K2 of K)
    if (K2 in T)
      Acc[K2] = T[K2];
  return Acc;
}
function PickResolve(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect17(T.allOf, K)) : IsUnion(T) ? Union(FromUnion19(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties17(T.properties, K)) : Object2({});
}
function Pick(T, K, options = {}) {
  if (IsMappedKey(K))
    return PickFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return PickFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PickResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-key.mjs
function FromPropertyKey3(T, K, options) {
  return {
    [K]: Pick(T, [K], options)
  };
}
function FromPropertyKeys3(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey3(T, LK, options) };
  }, {});
}
function FromMappedKey4(T, K, options) {
  return FromPropertyKeys3(T, K.keys, options);
}
function PickFromMappedKey(T, K, options) {
  const P = FromMappedKey4(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/readonly-optional/readonly-optional.mjs
function ReadonlyOptional(schema) {
  return Readonly(Optional(schema));
}
// node_modules/@sinclair/typebox/build/esm/type/record/record.mjs
function RecordCreateFromPattern(pattern2, T, options) {
  return {
    ...options,
    [Kind]: "Record",
    type: "object",
    patternProperties: { [pattern2]: CloneType(T) }
  };
}
function RecordCreateFromKeys(K, T, options) {
  const Acc = {};
  for (const K2 of K)
    Acc[K2] = CloneType(T);
  return Object2(Acc, { ...options, [Hint]: "Record" });
}
function FromTemplateLiteralKey(K, T, options) {
  return IsTemplateLiteralFinite(K) ? RecordCreateFromKeys(IndexPropertyKeys(K), T, options) : RecordCreateFromPattern(K.pattern, T, options);
}
function FromUnionKey(K, T, options) {
  return RecordCreateFromKeys(IndexPropertyKeys(Union(K)), T, options);
}
function FromLiteralKey(K, T, options) {
  return RecordCreateFromKeys([K.toString()], T, options);
}
function FromRegExpKey(K, T, options) {
  return RecordCreateFromPattern(K.source, T, options);
}
function FromStringKey(K, T, options) {
  const pattern2 = IsUndefined2(K.pattern) ? PatternStringExact : K.pattern;
  return RecordCreateFromPattern(pattern2, T, options);
}
function FromIntegerKey(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
}
function FromNumberKey(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
}
function Record(K, T, options = {}) {
  return IsUnion(K) ? FromUnionKey(K.anyOf, T, options) : IsTemplateLiteral(K) ? FromTemplateLiteralKey(K, T, options) : IsLiteral(K) ? FromLiteralKey(K.const, T, options) : IsInteger2(K) ? FromIntegerKey(K, T, options) : IsNumber3(K) ? FromNumberKey(K, T, options) : IsRegExp2(K) ? FromRegExpKey(K, T, options) : IsString3(K) ? FromStringKey(K, T, options) : Never(options);
}
// node_modules/@sinclair/typebox/build/esm/type/recursive/recursive.mjs
var Ordinal = 0;
function Recursive(callback, options = {}) {
  if (IsUndefined2(options.$id))
    options.$id = `T${Ordinal++}`;
  const thisType = callback({ [Kind]: "This", $ref: `${options.$id}` });
  thisType.$id = options.$id;
  return CloneType({ ...options, [Hint]: "Recursive", ...thisType });
}
// node_modules/@sinclair/typebox/build/esm/type/ref/ref.mjs
function Ref(unresolved, options = {}) {
  if (IsString2(unresolved))
    return { ...options, [Kind]: "Ref", $ref: unresolved };
  if (IsUndefined2(unresolved.$id))
    throw new Error("Reference target type must specify an $id");
  return {
    ...options,
    [Kind]: "Ref",
    $ref: unresolved.$id
  };
}
// node_modules/@sinclair/typebox/build/esm/type/regexp/regexp.mjs
function RegExp2(unresolved, options = {}) {
  const expr = IsString2(unresolved) ? new globalThis.RegExp(unresolved) : unresolved;
  return { ...options, [Kind]: "RegExp", type: "RegExp", source: expr.source, flags: expr.flags };
}
// node_modules/@sinclair/typebox/build/esm/type/required/required.mjs
function FromRest8(T) {
  return T.map((L) => RequiredResolve(L));
}
function FromProperties18(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Discard(T[K], [OptionalKind]);
  return Acc;
}
function RequiredResolve(T) {
  return IsIntersect(T) ? Intersect(FromRest8(T.allOf)) : IsUnion(T) ? Union(FromRest8(T.anyOf)) : IsObject3(T) ? Object2(FromProperties18(T.properties)) : Object2({});
}
function Required(T, options = {}) {
  if (IsMappedResult(T)) {
    return RequiredFromMappedResult(T, options);
  } else {
    const D = Discard(T, [TransformKind, "$id", "required"]);
    const R = CloneType(RequiredResolve(T), options);
    return { ...D, ...R };
  }
}

// node_modules/@sinclair/typebox/build/esm/type/required/required-from-mapped-result.mjs
function FromProperties19(P, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Required(P[K2], options);
  return Acc;
}
function FromMappedResult12(R, options) {
  return FromProperties19(R.properties, options);
}
function RequiredFromMappedResult(R, options) {
  const P = FromMappedResult12(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/rest/rest.mjs
function RestResolve(T) {
  return IsIntersect(T) ? CloneRest(T.allOf) : IsUnion(T) ? CloneRest(T.anyOf) : IsTuple(T) ? CloneRest(T.items ?? []) : [];
}
function Rest(T) {
  return CloneRest(RestResolve(T));
}
// node_modules/@sinclair/typebox/build/esm/type/return-type/return-type.mjs
function ReturnType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/strict/strict.mjs
function Strict(schema2) {
  return JSON.parse(JSON.stringify(schema2));
}
// node_modules/@sinclair/typebox/build/esm/type/transform/transform.mjs
class TransformDecodeBuilder {
  constructor(schema2) {
    this.schema = schema2;
  }
  Decode(decode2) {
    return new TransformEncodeBuilder(this.schema, decode2);
  }
}

class TransformEncodeBuilder {
  constructor(schema2, decode2) {
    this.schema = schema2;
    this.decode = decode2;
  }
  EncodeTransform(encode2, schema2) {
    const Encode2 = (value2) => schema2[TransformKind].Encode(encode2(value2));
    const Decode2 = (value2) => this.decode(schema2[TransformKind].Decode(value2));
    const Codec = { Encode: Encode2, Decode: Decode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  EncodeSchema(encode2, schema2) {
    const Codec = { Decode: this.decode, Encode: encode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  Encode(encode2) {
    const schema2 = CloneType(this.schema);
    return IsTransform(schema2) ? this.EncodeTransform(encode2, schema2) : this.EncodeSchema(encode2, schema2);
  }
}
function Transform(schema2) {
  return new TransformDecodeBuilder(schema2);
}
// node_modules/@sinclair/typebox/build/esm/type/void/void.mjs
function Void(options = {}) {
  return {
    ...options,
    [Kind]: "Void",
    type: "void"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/type/type.mjs
var exports_type3 = {};
__export(exports_type3, {
  Void: () => Void,
  Uppercase: () => Uppercase,
  Unsafe: () => Unsafe,
  Unknown: () => Unknown,
  Union: () => Union,
  Undefined: () => Undefined,
  Uncapitalize: () => Uncapitalize,
  Uint8Array: () => Uint8Array2,
  Tuple: () => Tuple,
  Transform: () => Transform,
  TemplateLiteral: () => TemplateLiteral,
  Symbol: () => Symbol2,
  String: () => String2,
  Strict: () => Strict,
  ReturnType: () => ReturnType,
  Rest: () => Rest,
  Required: () => Required,
  RegExp: () => RegExp2,
  Ref: () => Ref,
  Recursive: () => Recursive,
  Record: () => Record,
  ReadonlyOptional: () => ReadonlyOptional,
  Readonly: () => Readonly,
  Promise: () => Promise2,
  Pick: () => Pick,
  Partial: () => Partial,
  Parameters: () => Parameters,
  Optional: () => Optional,
  Omit: () => Omit,
  Object: () => Object2,
  Number: () => Number2,
  Null: () => Null,
  Not: () => Not2,
  Never: () => Never,
  Mapped: () => Mapped,
  Lowercase: () => Lowercase,
  Literal: () => Literal,
  KeyOf: () => KeyOf,
  Iterator: () => Iterator,
  Intersect: () => Intersect,
  Integer: () => Integer,
  InstanceType: () => InstanceType,
  Index: () => Index,
  Function: () => Function2,
  Extract: () => Extract,
  Extends: () => Extends,
  Exclude: () => Exclude,
  Enum: () => Enum,
  Deref: () => Deref2,
  Date: () => Date2,
  ConstructorParameters: () => ConstructorParameters,
  Constructor: () => Constructor,
  Const: () => Const,
  Composite: () => Composite,
  Capitalize: () => Capitalize,
  Boolean: () => Boolean2,
  BigInt: () => BigInt2,
  Awaited: () => Awaited,
  AsyncIterator: () => AsyncIterator,
  Array: () => Array2,
  Any: () => Any
});

// node_modules/@sinclair/typebox/build/esm/type/type/index.mjs
var Type = exports_type3;
// node_modules/@sinclair/typebox/build/esm/compiler/compiler.mjs
class TypeCheck {
  constructor(schema3, references, checkFunc, code) {
    this.schema = schema3;
    this.references = references;
    this.checkFunc = checkFunc;
    this.code = code;
    this.hasTransform = HasTransform(schema3, references);
  }
  Code() {
    return this.code;
  }
  Errors(value2) {
    return Errors(this.schema, this.references, value2);
  }
  Check(value2) {
    return this.checkFunc(value2);
  }
  Decode(value2) {
    if (!this.checkFunc(value2))
      throw new TransformDecodeCheckError(this.schema, value2, this.Errors(value2).First());
    return this.hasTransform ? TransformDecode(this.schema, this.references, value2) : value2;
  }
  Encode(value2) {
    const encoded = this.hasTransform ? TransformEncode(this.schema, this.references, value2) : value2;
    if (!this.checkFunc(encoded))
      throw new TransformEncodeCheckError(this.schema, value2, this.Errors(value2).First());
    return encoded;
  }
}
var Character;
(function(Character2) {
  function DollarSign(code) {
    return code === 36;
  }
  Character2.DollarSign = DollarSign;
  function IsUnderscore(code) {
    return code === 95;
  }
  Character2.IsUnderscore = IsUnderscore;
  function IsAlpha(code) {
    return code >= 65 && code <= 90 || code >= 97 && code <= 122;
  }
  Character2.IsAlpha = IsAlpha;
  function IsNumeric(code) {
    return code >= 48 && code <= 57;
  }
  Character2.IsNumeric = IsNumeric;
})(Character || (Character = {}));
var MemberExpression;
(function(MemberExpression2) {
  function IsFirstCharacterNumeric(value2) {
    if (value2.length === 0)
      return false;
    return Character.IsNumeric(value2.charCodeAt(0));
  }
  function IsAccessor(value2) {
    if (IsFirstCharacterNumeric(value2))
      return false;
    for (let i = 0;i < value2.length; i++) {
      const code = value2.charCodeAt(i);
      const check3 = Character.IsAlpha(code) || Character.IsNumeric(code) || Character.DollarSign(code) || Character.IsUnderscore(code);
      if (!check3)
        return false;
    }
    return true;
  }
  function EscapeHyphen(key) {
    return key.replace(/'/g, "\\'");
  }
  function Encode2(object3, key) {
    return IsAccessor(key) ? `${object3}.${key}` : `${object3}['${EscapeHyphen(key)}']`;
  }
  MemberExpression2.Encode = Encode2;
})(MemberExpression || (MemberExpression = {}));
var Identifier;
(function(Identifier2) {
  function Encode2($id) {
    const buffer = [];
    for (let i = 0;i < $id.length; i++) {
      const code = $id.charCodeAt(i);
      if (Character.IsNumeric(code) || Character.IsAlpha(code)) {
        buffer.push($id.charAt(i));
      } else {
        buffer.push(`_${code}_`);
      }
    }
    return buffer.join("").replace(/__/g, "_");
  }
  Identifier2.Encode = Encode2;
})(Identifier || (Identifier = {}));
var LiteralString;
(function(LiteralString2) {
  function Escape3(content) {
    return content.replace(/'/g, "\\'");
  }
  LiteralString2.Escape = Escape3;
})(LiteralString || (LiteralString = {}));

class TypeCompilerUnknownTypeError extends TypeBoxError {
  constructor(schema3) {
    super("Unknown type");
    this.schema = schema3;
  }
}

class TypeCompilerTypeGuardError extends TypeBoxError {
  constructor(schema3) {
    super("Preflight validation check failed to guard for the given schema");
    this.schema = schema3;
  }
}
var Policy;
(function(Policy2) {
  function IsExactOptionalProperty(value2, key, expression) {
    return TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${key}' in ${value2} ? ${expression} : true)` : `(${MemberExpression.Encode(value2, key)} !== undefined ? ${expression} : true)`;
  }
  Policy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value2) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value2} === 'object' && ${value2} !== null && !Array.isArray(${value2}))` : `(typeof ${value2} === 'object' && ${value2} !== null)`;
  }
  Policy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value2) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value2} === 'object' && ${value2} !== null && !Array.isArray(${value2}) && !(${value2} instanceof Date) && !(${value2} instanceof Uint8Array))` : `(typeof ${value2} === 'object' && ${value2} !== null && !(${value2} instanceof Date) && !(${value2} instanceof Uint8Array))`;
  }
  Policy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value2) {
    return TypeSystemPolicy.AllowNaN ? `typeof ${value2} === 'number'` : `Number.isFinite(${value2})`;
  }
  Policy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value2) {
    return TypeSystemPolicy.AllowNullVoid ? `(${value2} === undefined || ${value2} === null)` : `${value2} === undefined`;
  }
  Policy2.IsVoidLike = IsVoidLike;
})(Policy || (Policy = {}));
var TypeCompiler;
(function(TypeCompiler2) {
  function IsAnyOrUnknown2(schema3) {
    return schema3[Kind] === "Any" || schema3[Kind] === "Unknown";
  }
  function* FromAny5(schema3, references, value2) {
    yield "true";
  }
  function* FromArray16(schema3, references, value2) {
    yield `Array.isArray(${value2})`;
    const [parameter, accumulator] = [CreateParameter("value", "any"), CreateParameter("acc", "number")];
    if (IsNumber(schema3.maxItems))
      yield `${value2}.length <= ${schema3.maxItems}`;
    if (IsNumber(schema3.minItems))
      yield `${value2}.length >= ${schema3.minItems}`;
    const elementExpression = CreateExpression(schema3.items, references, "value");
    yield `${value2}.every((${parameter}) => ${elementExpression})`;
    if (IsSchema2(schema3.contains) || IsNumber(schema3.minContains) || IsNumber(schema3.maxContains)) {
      const containsSchema = IsSchema2(schema3.contains) ? schema3.contains : Never();
      const checkExpression = CreateExpression(containsSchema, references, "value");
      const checkMinContains = IsNumber(schema3.minContains) ? [`(count >= ${schema3.minContains})`] : [];
      const checkMaxContains = IsNumber(schema3.maxContains) ? [`(count <= ${schema3.maxContains})`] : [];
      const checkCount = `const count = value.reduce((${accumulator}, ${parameter}) => ${checkExpression} ? acc + 1 : acc, 0)`;
      const check3 = [`(count > 0)`, ...checkMinContains, ...checkMaxContains].join(" && ");
      yield `((${parameter}) => { ${checkCount}; return ${check3}})(${value2})`;
    }
    if (schema3.uniqueItems === true) {
      const check3 = `const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true`;
      const block = `const set = new Set(); for(const element of value) { ${check3} }`;
      yield `((${parameter}) => { ${block} )(${value2})`;
    }
  }
  function* FromAsyncIterator7(schema3, references, value2) {
    yield `(typeof value === 'object' && Symbol.asyncIterator in ${value2})`;
  }
  function* FromBigInt6(schema3, references, value2) {
    yield `(typeof ${value2} === 'bigint')`;
    if (IsBigInt(schema3.exclusiveMaximum))
      yield `${value2} < BigInt(${schema3.exclusiveMaximum})`;
    if (IsBigInt(schema3.exclusiveMinimum))
      yield `${value2} > BigInt(${schema3.exclusiveMinimum})`;
    if (IsBigInt(schema3.maximum))
      yield `${value2} <= BigInt(${schema3.maximum})`;
    if (IsBigInt(schema3.minimum))
      yield `${value2} >= BigInt(${schema3.minimum})`;
    if (IsBigInt(schema3.multipleOf))
      yield `(${value2} % BigInt(${schema3.multipleOf})) === 0`;
  }
  function* FromBoolean6(schema3, references, value2) {
    yield `(typeof ${value2} === 'boolean')`;
  }
  function* FromConstructor8(schema3, references, value2) {
    yield* Visit17(schema3.returns, references, `${value2}.prototype`);
  }
  function* FromDate6(schema3, references, value2) {
    yield `(${value2} instanceof Date) && Number.isFinite(${value2}.getTime())`;
    if (IsNumber(schema3.exclusiveMaximumTimestamp))
      yield `${value2}.getTime() < ${schema3.exclusiveMaximumTimestamp}`;
    if (IsNumber(schema3.exclusiveMinimumTimestamp))
      yield `${value2}.getTime() > ${schema3.exclusiveMinimumTimestamp}`;
    if (IsNumber(schema3.maximumTimestamp))
      yield `${value2}.getTime() <= ${schema3.maximumTimestamp}`;
    if (IsNumber(schema3.minimumTimestamp))
      yield `${value2}.getTime() >= ${schema3.minimumTimestamp}`;
    if (IsNumber(schema3.multipleOfTimestamp))
      yield `(${value2}.getTime() % ${schema3.multipleOfTimestamp}) === 0`;
  }
  function* FromFunction7(schema3, references, value2) {
    yield `(typeof ${value2} === 'function')`;
  }
  function* FromInteger6(schema3, references, value2) {
    yield `Number.isInteger(${value2})`;
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value2} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value2} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value2} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value2} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value2} % ${schema3.multipleOf}) === 0`;
  }
  function* FromIntersect18(schema3, references, value2) {
    const check1 = schema3.allOf.map((schema4) => CreateExpression(schema4, references, value2)).join(" && ");
    if (schema3.unevaluatedProperties === false) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value2}).every(key => ${keyCheck}.test(key))`;
      yield `(${check1} && ${check22})`;
    } else if (IsSchema2(schema3.unevaluatedProperties)) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value2}).every(key => ${keyCheck}.test(key) || ${CreateExpression(schema3.unevaluatedProperties, references, `${value2}[key]`)})`;
      yield `(${check1} && ${check22})`;
    } else {
      yield `(${check1})`;
    }
  }
  function* FromIterator7(schema3, references, value2) {
    yield `(typeof value === 'object' && Symbol.iterator in ${value2})`;
  }
  function* FromLiteral7(schema3, references, value2) {
    if (typeof schema3.const === "number" || typeof schema3.const === "boolean") {
      yield `(${value2} === ${schema3.const})`;
    } else {
      yield `(${value2} === '${LiteralString.Escape(schema3.const)}')`;
    }
  }
  function* FromNever6(schema3, references, value2) {
    yield `false`;
  }
  function* FromNot8(schema3, references, value2) {
    const expression = CreateExpression(schema3.not, references, value2);
    yield `(!${expression})`;
  }
  function* FromNull6(schema3, references, value2) {
    yield `(${value2} === null)`;
  }
  function* FromNumber6(schema3, references, value2) {
    yield Policy.IsNumberLike(value2);
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value2} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value2} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value2} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value2} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value2} % ${schema3.multipleOf}) === 0`;
  }
  function* FromObject13(schema3, references, value2) {
    yield Policy.IsObjectLike(value2);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value2}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value2}).length <= ${schema3.maxProperties}`;
    const knownKeys = Object.getOwnPropertyNames(schema3.properties);
    for (const knownKey of knownKeys) {
      const memberExpression = MemberExpression.Encode(value2, knownKey);
      const property = schema3.properties[knownKey];
      if (schema3.required && schema3.required.includes(knownKey)) {
        yield* Visit17(property, references, memberExpression);
        if (ExtendsUndefinedCheck(property) || IsAnyOrUnknown2(property))
          yield `('${knownKey}' in ${value2})`;
      } else {
        const expression = CreateExpression(property, references, memberExpression);
        yield Policy.IsExactOptionalProperty(value2, knownKey, expression);
      }
    }
    if (schema3.additionalProperties === false) {
      if (schema3.required && schema3.required.length === knownKeys.length) {
        yield `Object.getOwnPropertyNames(${value2}).length === ${knownKeys.length}`;
      } else {
        const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
        yield `Object.getOwnPropertyNames(${value2}).every(key => ${keys}.includes(key))`;
      }
    }
    if (typeof schema3.additionalProperties === "object") {
      const expression = CreateExpression(schema3.additionalProperties, references, `${value2}[key]`);
      const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
      yield `(Object.getOwnPropertyNames(${value2}).every(key => ${keys}.includes(key) || ${expression}))`;
    }
  }
  function* FromPromise8(schema3, references, value2) {
    yield `(typeof value === 'object' && typeof ${value2}.then === 'function')`;
  }
  function* FromRecord12(schema3, references, value2) {
    yield Policy.IsRecordLike(value2);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value2}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value2}).length <= ${schema3.maxProperties}`;
    const [patternKey, patternSchema] = Object.entries(schema3.patternProperties)[0];
    const variable = CreateVariable(`${new RegExp(patternKey)}`);
    const check1 = CreateExpression(patternSchema, references, "value");
    const check22 = IsSchema2(schema3.additionalProperties) ? CreateExpression(schema3.additionalProperties, references, value2) : schema3.additionalProperties === false ? "false" : "true";
    const expression = `(${variable}.test(key) ? ${check1} : ${check22})`;
    yield `(Object.entries(${value2}).every(([key, value]) => ${expression}))`;
  }
  function* FromRef12(schema3, references, value2) {
    const target = Deref(schema3, references);
    if (state.functions.has(schema3.$ref))
      return yield `${CreateFunctionName(schema3.$ref)}(${value2})`;
    yield* Visit17(target, references, value2);
  }
  function* FromRegExp5(schema3, references, value2) {
    const variable = CreateVariable(`${new RegExp(schema3.source, schema3.flags)};`);
    yield `(typeof ${value2} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value2}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value2}.length >= ${schema3.minLength}`;
    yield `${variable}.test(${value2})`;
  }
  function* FromString6(schema3, references, value2) {
    yield `(typeof ${value2} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value2}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value2}.length >= ${schema3.minLength}`;
    if (schema3.pattern !== undefined) {
      const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
      yield `${variable}.test(${value2})`;
    }
    if (schema3.format !== undefined) {
      yield `format('${schema3.format}', ${value2})`;
    }
  }
  function* FromSymbol6(schema3, references, value2) {
    yield `(typeof ${value2} === 'symbol')`;
  }
  function* FromTemplateLiteral7(schema3, references, value2) {
    yield `(typeof ${value2} === 'string')`;
    const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
    yield `${variable}.test(${value2})`;
  }
  function* FromThis11(schema3, references, value2) {
    yield `${CreateFunctionName(schema3.$ref)}(${value2})`;
  }
  function* FromTuple15(schema3, references, value2) {
    yield `Array.isArray(${value2})`;
    if (schema3.items === undefined)
      return yield `${value2}.length === 0`;
    yield `(${value2}.length === ${schema3.maxItems})`;
    for (let i = 0;i < schema3.items.length; i++) {
      const expression = CreateExpression(schema3.items[i], references, `${value2}[${i}]`);
      yield `${expression}`;
    }
  }
  function* FromUndefined6(schema3, references, value2) {
    yield `${value2} === undefined`;
  }
  function* FromUnion20(schema3, references, value2) {
    const expressions = schema3.anyOf.map((schema4) => CreateExpression(schema4, references, value2));
    yield `(${expressions.join(" || ")})`;
  }
  function* FromUint8Array5(schema3, references, value2) {
    yield `${value2} instanceof Uint8Array`;
    if (IsNumber(schema3.maxByteLength))
      yield `(${value2}.length <= ${schema3.maxByteLength})`;
    if (IsNumber(schema3.minByteLength))
      yield `(${value2}.length >= ${schema3.minByteLength})`;
  }
  function* FromUnknown5(schema3, references, value2) {
    yield "true";
  }
  function* FromVoid5(schema3, references, value2) {
    yield Policy.IsVoidLike(value2);
  }
  function* FromKind4(schema3, references, value2) {
    const instance = state.instances.size;
    state.instances.set(instance, schema3);
    yield `kind('${schema3[Kind]}', ${instance}, ${value2})`;
  }
  function* Visit17(schema3, references, value2, useHoisting = true) {
    const references_ = IsString(schema3.$id) ? [...references, schema3] : references;
    const schema_ = schema3;
    if (useHoisting && IsString(schema3.$id)) {
      const functionName = CreateFunctionName(schema3.$id);
      if (state.functions.has(functionName)) {
        return yield `${functionName}(${value2})`;
      } else {
        const functionCode = CreateFunction(functionName, schema3, references, "value", false);
        state.functions.set(functionName, functionCode);
        return yield `${functionName}(${value2})`;
      }
    }
    switch (schema_[Kind]) {
      case "Any":
        return yield* FromAny5(schema_, references_, value2);
      case "Array":
        return yield* FromArray16(schema_, references_, value2);
      case "AsyncIterator":
        return yield* FromAsyncIterator7(schema_, references_, value2);
      case "BigInt":
        return yield* FromBigInt6(schema_, references_, value2);
      case "Boolean":
        return yield* FromBoolean6(schema_, references_, value2);
      case "Constructor":
        return yield* FromConstructor8(schema_, references_, value2);
      case "Date":
        return yield* FromDate6(schema_, references_, value2);
      case "Function":
        return yield* FromFunction7(schema_, references_, value2);
      case "Integer":
        return yield* FromInteger6(schema_, references_, value2);
      case "Intersect":
        return yield* FromIntersect18(schema_, references_, value2);
      case "Iterator":
        return yield* FromIterator7(schema_, references_, value2);
      case "Literal":
        return yield* FromLiteral7(schema_, references_, value2);
      case "Never":
        return yield* FromNever6(schema_, references_, value2);
      case "Not":
        return yield* FromNot8(schema_, references_, value2);
      case "Null":
        return yield* FromNull6(schema_, references_, value2);
      case "Number":
        return yield* FromNumber6(schema_, references_, value2);
      case "Object":
        return yield* FromObject13(schema_, references_, value2);
      case "Promise":
        return yield* FromPromise8(schema_, references_, value2);
      case "Record":
        return yield* FromRecord12(schema_, references_, value2);
      case "Ref":
        return yield* FromRef12(schema_, references_, value2);
      case "RegExp":
        return yield* FromRegExp5(schema_, references_, value2);
      case "String":
        return yield* FromString6(schema_, references_, value2);
      case "Symbol":
        return yield* FromSymbol6(schema_, references_, value2);
      case "TemplateLiteral":
        return yield* FromTemplateLiteral7(schema_, references_, value2);
      case "This":
        return yield* FromThis11(schema_, references_, value2);
      case "Tuple":
        return yield* FromTuple15(schema_, references_, value2);
      case "Undefined":
        return yield* FromUndefined6(schema_, references_, value2);
      case "Union":
        return yield* FromUnion20(schema_, references_, value2);
      case "Uint8Array":
        return yield* FromUint8Array5(schema_, references_, value2);
      case "Unknown":
        return yield* FromUnknown5(schema_, references_, value2);
      case "Void":
        return yield* FromVoid5(schema_, references_, value2);
      default:
        if (!exports_type.Has(schema_[Kind]))
          throw new TypeCompilerUnknownTypeError(schema3);
        return yield* FromKind4(schema_, references_, value2);
    }
  }
  const state = {
    language: "javascript",
    functions: new Map,
    variables: new Map,
    instances: new Map
  };
  function CreateExpression(schema3, references, value2, useHoisting = true) {
    return `(${[...Visit17(schema3, references, value2, useHoisting)].join(" && ")})`;
  }
  function CreateFunctionName($id) {
    return `check_${Identifier.Encode($id)}`;
  }
  function CreateVariable(expression) {
    const variableName = `local_${state.variables.size}`;
    state.variables.set(variableName, `const ${variableName} = ${expression}`);
    return variableName;
  }
  function CreateFunction(name, schema3, references, value2, useHoisting = true) {
    const [newline, pad] = [`
`, (length) => "".padStart(length, " ")];
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const expression = [...Visit17(schema3, references, value2, useHoisting)].map((expression2) => `${pad(4)}${expression2}`).join(` &&${newline}`);
    return `function ${name}(${parameter})${returns} {${newline}${pad(2)}return (${newline}${expression}${newline}${pad(2)})
}`;
  }
  function CreateParameter(name, type3) {
    const annotation = state.language === "typescript" ? `: ${type3}` : "";
    return `${name}${annotation}`;
  }
  function CreateReturns(type3) {
    return state.language === "typescript" ? `: ${type3}` : "";
  }
  function Build(schema3, references, options) {
    const functionCode = CreateFunction("check", schema3, references, "value");
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const functions = [...state.functions.values()];
    const variables = [...state.variables.values()];
    const checkFunction = IsString(schema3.$id) ? `return function check(${parameter})${returns} {
  return ${CreateFunctionName(schema3.$id)}(value)
}` : `return ${functionCode}`;
    return [...variables, ...functions, checkFunction].join(`
`);
  }
  function Code(...args) {
    const defaults = { language: "javascript" };
    const [schema3, references, options] = args.length === 2 && IsArray(args[1]) ? [args[0], args[1], defaults] : args.length === 2 && !IsArray(args[1]) ? [args[0], [], args[1]] : args.length === 3 ? [args[0], args[1], args[2]] : args.length === 1 ? [args[0], [], defaults] : [null, [], defaults];
    state.language = options.language;
    state.variables.clear();
    state.functions.clear();
    state.instances.clear();
    if (!IsSchema2(schema3))
      throw new TypeCompilerTypeGuardError(schema3);
    for (const schema4 of references)
      if (!IsSchema2(schema4))
        throw new TypeCompilerTypeGuardError(schema4);
    return Build(schema3, references, options);
  }
  TypeCompiler2.Code = Code;
  function Compile(schema3, references = []) {
    const generatedCode = Code(schema3, references, { language: "javascript" });
    const compiledFunction = globalThis.Function("kind", "format", "hash", generatedCode);
    const instances = new Map(state.instances);
    function typeRegistryFunction(kind, instance, value2) {
      if (!exports_type.Has(kind) || !instances.has(instance))
        return false;
      const checkFunc = exports_type.Get(kind);
      const schema4 = instances.get(instance);
      return checkFunc(schema4, value2);
    }
    function formatRegistryFunction(format, value2) {
      if (!exports_format.Has(format))
        return false;
      const checkFunc = exports_format.Get(format);
      return checkFunc(value2);
    }
    function hashFunction(value2) {
      return Hash(value2);
    }
    const checkFunction = compiledFunction(typeRegistryFunction, formatRegistryFunction, hashFunction);
    return new TypeCheck(schema3, references, checkFunction, generatedCode);
  }
  TypeCompiler2.Compile = Compile;
})(TypeCompiler || (TypeCompiler = {}));
// node_modules/elysia/dist/bun/index.js
var __create2 = Object.create;
var { getPrototypeOf: __getProtoOf2, defineProperty: __defProp2, getOwnPropertyNames: __getOwnPropNames2 } = Object;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __toESM2 = (mod, isNodeMode, target) => {
  target = mod != null ? __create2(__getProtoOf2(mod)) : {};
  let to = isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames2(mod))
    if (!__hasOwnProp2.call(to, key))
      __defProp2(to, key, { get: () => mod[key], enumerable: true });
  return to;
};
var __commonJS2 = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var require_dist = __commonJS2((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.parse = parse2;
  exports.serialize = serialize;
  var cookieNameRegExp = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, cookieValueRegExp = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/, __toString = Object.prototype.toString, NullObject = (() => {
    let C = function() {
    };
    return C.prototype = Object.create(null), C;
  })();
  function parse2(str, options) {
    let obj = new NullObject, len = str.length;
    if (len < 2)
      return obj;
    let dec = options?.decode || decode2, index = 0;
    do {
      let eqIdx = str.indexOf("=", index);
      if (eqIdx === -1)
        break;
      let colonIdx = str.indexOf(";", index), endIdx = colonIdx === -1 ? len : colonIdx;
      if (eqIdx > endIdx) {
        index = str.lastIndexOf(";", eqIdx - 1) + 1;
        continue;
      }
      let keyStartIdx = startIndex(str, index, eqIdx), keyEndIdx = endIndex(str, eqIdx, keyStartIdx), key = str.slice(keyStartIdx, keyEndIdx);
      if (obj[key] === undefined) {
        let valStartIdx = startIndex(str, eqIdx + 1, endIdx), valEndIdx = endIndex(str, endIdx, valStartIdx), value2 = dec(str.slice(valStartIdx, valEndIdx));
        obj[key] = value2;
      }
      index = endIdx + 1;
    } while (index < len);
    return obj;
  }
  function startIndex(str, index, max) {
    do {
      let code = str.charCodeAt(index);
      if (code !== 32 && code !== 9)
        return index;
    } while (++index < max);
    return max;
  }
  function endIndex(str, index, min) {
    while (index > min) {
      let code = str.charCodeAt(--index);
      if (code !== 32 && code !== 9)
        return index + 1;
    }
    return min;
  }
  function serialize(name, val, options) {
    let enc = options?.encode || encodeURIComponent;
    if (!cookieNameRegExp.test(name))
      throw new TypeError(`argument name is invalid: ${name}`);
    let value2 = enc(val);
    if (!cookieValueRegExp.test(value2))
      throw new TypeError(`argument val is invalid: ${val}`);
    let str = name + "=" + value2;
    if (!options)
      return str;
    if (options.maxAge !== undefined) {
      if (!Number.isInteger(options.maxAge))
        throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
      str += "; Max-Age=" + options.maxAge;
    }
    if (options.domain) {
      if (!domainValueRegExp.test(options.domain))
        throw new TypeError(`option domain is invalid: ${options.domain}`);
      str += "; Domain=" + options.domain;
    }
    if (options.path) {
      if (!pathValueRegExp.test(options.path))
        throw new TypeError(`option path is invalid: ${options.path}`);
      str += "; Path=" + options.path;
    }
    if (options.expires) {
      if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${options.expires}`);
      str += "; Expires=" + options.expires.toUTCString();
    }
    if (options.httpOnly)
      str += "; HttpOnly";
    if (options.secure)
      str += "; Secure";
    if (options.partitioned)
      str += "; Partitioned";
    if (options.priority)
      switch (typeof options.priority === "string" ? options.priority.toLowerCase() : options.sameSite) {
        case "low":
          str += "; Priority=Low";
          break;
        case "medium":
          str += "; Priority=Medium";
          break;
        case "high":
          str += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${options.priority}`);
      }
    if (options.sameSite)
      switch (typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite) {
        case true:
        case "strict":
          str += "; SameSite=Strict";
          break;
        case "lax":
          str += "; SameSite=Lax";
          break;
        case "none":
          str += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
      }
    return str;
  }
  function decode2(str) {
    if (str.indexOf("%") === -1)
      return str;
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return str;
    }
  }
  function isDate(val) {
    return __toString.call(val) === "[object Date]";
  }
});
var require_fast_decode_uri_component = __commonJS2((exports, module) => {
  var UTF8_ACCEPT = 12, UTF8_REJECT = 0, UTF8_DATA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 24, 36, 48, 60, 72, 84, 96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7];
  function decodeURIComponent2(uri2) {
    var percentPosition = uri2.indexOf("%");
    if (percentPosition === -1)
      return uri2;
    var length = uri2.length, decoded = "", last = 0, codepoint = 0, startOfOctets = percentPosition, state = UTF8_ACCEPT;
    while (percentPosition > -1 && percentPosition < length) {
      var high = hexCodeToInt(uri2[percentPosition + 1], 4), low = hexCodeToInt(uri2[percentPosition + 2], 0), byte2 = high | low, type3 = UTF8_DATA[byte2];
      if (state = UTF8_DATA[256 + state + type3], codepoint = codepoint << 6 | byte2 & UTF8_DATA[364 + type3], state === UTF8_ACCEPT)
        decoded += uri2.slice(last, startOfOctets), decoded += codepoint <= 65535 ? String.fromCharCode(codepoint) : String.fromCharCode(55232 + (codepoint >> 10), 56320 + (codepoint & 1023)), codepoint = 0, last = percentPosition + 3, percentPosition = startOfOctets = uri2.indexOf("%", last);
      else if (state === UTF8_REJECT)
        return null;
      else {
        if (percentPosition += 3, percentPosition < length && uri2.charCodeAt(percentPosition) === 37)
          continue;
        return null;
      }
    }
    return decoded + uri2.slice(last);
  }
  var HEX = { "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 };
  function hexCodeToInt(c, shift) {
    var i = HEX[c];
    return i === undefined ? 255 : i << shift;
  }
  module.exports = decodeURIComponent2;
});
var U = (z, q) => {
  let v = q?.length ? {} : null;
  if (v)
    for (let K of q)
      v[K.part.charCodeAt(0)] = K;
  return { part: z, store: null, inert: v, params: null, wildcardStore: null };
};
var _ = (z, q) => ({ ...z, part: q });
var $ = (z) => ({ name: z, store: null, inert: null });

class Y {
  root = {};
  history = [];
  static regex = { static: /:.+?(?=\/|$)/, params: /:.+?(?=\/|$)/g, optionalParams: /:.+?\?(?=\/|$)/g };
  add(z, q, v, { ignoreError: K = false, ignoreHistory: V = false } = {}) {
    if (typeof q !== "string")
      throw new TypeError("Route path must be a string");
    if (q === "")
      q = "/";
    else if (q[0] !== "/")
      q = `/${q}`;
    let S = q[q.length - 1] === "*", D = q.match(Y.regex.optionalParams);
    if (D) {
      let F = q.replaceAll("?", "");
      this.add(z, F, v, { ignoreError: K });
      for (let B = 0;B < D.length; B++) {
        let A = q.replace("/" + D[B], "");
        this.add(z, A, v, { ignoreError: true });
      }
      return v;
    }
    if (D)
      q = q.replaceAll("?", "");
    if (this.history.find(([F, B, A]) => F === z && B === q))
      return v;
    if (S || D && q.charCodeAt(q.length - 1) === 63)
      q = q.slice(0, -1);
    if (!V)
      this.history.push([z, q, v]);
    let G = q.split(Y.regex.static), J = q.match(Y.regex.params) || [];
    if (G[G.length - 1] === "")
      G.pop();
    let b;
    if (!this.root[z])
      b = this.root[z] = U("/");
    else
      b = this.root[z];
    let Q = 0;
    for (let F = 0;F < G.length; ++F) {
      let B = G[F];
      if (F > 0) {
        let A = J[Q++].slice(1);
        if (b.params === null)
          b.params = $(A);
        else if (b.params.name !== A)
          if (K)
            return v;
          else
            throw new Error(`Cannot create route "${q}" with parameter "${A}" because a route already exists with a different parameter name ("${b.params.name}") in the same location`);
        let O = b.params;
        if (O.inert === null) {
          b = O.inert = U(B);
          continue;
        }
        b = O.inert;
      }
      for (let A = 0;; ) {
        if (A === B.length) {
          if (A < b.part.length) {
            let O = _(b, b.part.slice(A));
            Object.assign(b, U(B, [O]));
          }
          break;
        }
        if (A === b.part.length) {
          if (b.inert === null)
            b.inert = {};
          let O = b.inert[B.charCodeAt(A)];
          if (O) {
            b = O, B = B.slice(A), A = 0;
            continue;
          }
          let X = U(B.slice(A));
          b.inert[B.charCodeAt(A)] = X, b = X;
          break;
        }
        if (B[A] !== b.part[A]) {
          let O = _(b, b.part.slice(A)), X = U(B.slice(A));
          Object.assign(b, U(b.part.slice(0, A), [O, X])), b = X;
          break;
        }
        ++A;
      }
    }
    if (Q < J.length) {
      let B = J[Q].slice(1);
      if (b.params === null)
        b.params = $(B);
      else if (b.params.name !== B)
        if (K)
          return v;
        else
          throw new Error(`Cannot create route "${q}" with parameter "${B}" because a route already exists with a different parameter name ("${b.params.name}") in the same location`);
      if (b.params.store === null)
        b.params.store = v;
      return b.params.store;
    }
    if (S) {
      if (b.wildcardStore === null)
        b.wildcardStore = v;
      return b.wildcardStore;
    }
    if (b.store === null)
      b.store = v;
    return b.store;
  }
  find(z, q) {
    let v = this.root[z];
    if (!v)
      return null;
    return Z(q, q.length, v, 0);
  }
}
var Z = (z, q, v, K) => {
  let V = v.part, S = V.length, D = K + S;
  if (S > 1) {
    if (D > q)
      return null;
    if (S < 15) {
      for (let G = 1, J = K + 1;G < S; ++G, ++J)
        if (V.charCodeAt(G) !== z.charCodeAt(J))
          return null;
    } else if (z.slice(K, D) !== V)
      return null;
  }
  if (D === q) {
    if (v.store !== null)
      return { store: v.store, params: {} };
    if (v.wildcardStore !== null)
      return { store: v.wildcardStore, params: { "*": "" } };
    return null;
  }
  if (v.inert !== null) {
    let G = v.inert[z.charCodeAt(D)];
    if (G !== undefined) {
      let J = Z(z, q, G, D);
      if (J !== null)
        return J;
    }
  }
  if (v.params !== null) {
    let { store: G, name: J, inert: b } = v.params, Q = z.indexOf("/", D);
    if (Q !== D) {
      if (Q === -1 || Q >= q) {
        if (G !== null) {
          let F = {};
          return F[J] = z.substring(D, q), { store: G, params: F };
        }
      } else if (b !== null) {
        let F = Z(z, q, b, Q);
        if (F !== null)
          return F.params[J] = z.substring(D, Q), F;
      }
    }
  }
  if (v.wildcardStore !== null)
    return { store: v.wildcardStore, params: { "*": z.substring(D, q) } };
  return null;
};
var hasReturn = (fn) => {
  let fnLiteral = typeof fn === "object" ? fn.fn.toString() : typeof fn === "string" ? fn.toString() : fn, parenthesisEnd = fnLiteral.indexOf(")");
  if (fnLiteral.charCodeAt(parenthesisEnd + 2) === 61 && fnLiteral.charCodeAt(parenthesisEnd + 5) !== 123)
    return true;
  return fnLiteral.includes("return");
};
var separateFunction = (code) => {
  if (code.startsWith("async"))
    code = code.slice(5);
  code = code.trimStart();
  let index = -1;
  if (code.charCodeAt(0) === 40) {
    if (index = code.indexOf("=>", code.indexOf(")")), index !== -1) {
      let bracketEndIndex = index;
      while (bracketEndIndex > 0)
        if (code.charCodeAt(--bracketEndIndex) === 41)
          break;
      let body = code.slice(index + 2);
      if (body.charCodeAt(0) === 32)
        body = body.trimStart();
      return [code.slice(1, bracketEndIndex), body, { isArrowReturn: body.charCodeAt(0) !== 123 }];
    }
  }
  if (code.startsWith("function")) {
    index = code.indexOf("(");
    let end = code.indexOf(")");
    return [code.slice(index + 1, end), code.slice(end + 2), { isArrowReturn: false }];
  }
  let start = code.indexOf("(");
  if (start !== -1) {
    let sep = code.indexOf(`
`, 2), parameter = code.slice(0, sep), end = parameter.lastIndexOf(")") + 1, body = code.slice(sep + 1);
    return [parameter.slice(start, end), "{" + body, { isArrowReturn: false }];
  }
  let x = code.split(`
`, 2);
  return [x[0], x[1], { isArrowReturn: false }];
};
var bracketPairRange = (parameter) => {
  let start = parameter.indexOf("{");
  if (start === -1)
    return [-1, 0];
  let end = start + 1, deep = 1;
  for (;end < parameter.length; end++) {
    let char = parameter.charCodeAt(end);
    if (char === 123)
      deep++;
    else if (char === 125)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [0, parameter.length];
  return [start, end + 1];
};
var bracketPairRangeReverse = (parameter) => {
  let end = parameter.lastIndexOf("}");
  if (end === -1)
    return [-1, 0];
  let start = end - 1, deep = 1;
  for (;start >= 0; start--) {
    let char = parameter.charCodeAt(start);
    if (char === 125)
      deep++;
    else if (char === 123)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [-1, 0];
  return [start, end + 1];
};
var removeColonAlias = (parameter) => {
  while (true) {
    let start = parameter.indexOf(":");
    if (start === -1)
      break;
    let end = parameter.indexOf(",", start);
    if (end === -1)
      end = parameter.indexOf("}", start) - 1;
    if (end === -2)
      end = parameter.length;
    parameter = parameter.slice(0, start) + parameter.slice(end);
  }
  return parameter;
};
var retrieveRootParamters = (parameter) => {
  let hasParenthesis = false;
  if (parameter.charCodeAt(0) === 40)
    parameter = parameter.slice(1, -1);
  if (parameter.charCodeAt(0) === 123)
    hasParenthesis = true, parameter = parameter.slice(1, -1);
  parameter = parameter.replace(/( |\t|\n)/g, "").trim();
  let parameters3 = [];
  while (true) {
    let [start, end] = bracketPairRange(parameter);
    if (start === -1)
      break;
    if (parameters3.push(parameter.slice(0, start - 1)), parameter.charCodeAt(end) === 44)
      end++;
    parameter = parameter.slice(end);
  }
  if (parameter = removeColonAlias(parameter), parameter)
    parameters3 = parameters3.concat(parameter.split(","));
  let newParameters = [];
  for (let p of parameters3) {
    if (p.indexOf(",") === -1) {
      newParameters.push(p);
      continue;
    }
    for (let q of p.split(","))
      newParameters.push(q.trim());
  }
  return parameters3 = newParameters, { hasParenthesis, parameters: parameters3 };
};
var findParameterReference = (parameter, inference) => {
  let { parameters: parameters3, hasParenthesis } = retrieveRootParamters(parameter);
  if (!inference.query && parameters3.includes("query"))
    inference.query = true;
  if (!inference.headers && parameters3.includes("headers"))
    inference.headers = true;
  if (!inference.body && parameters3.includes("body"))
    inference.body = true;
  if (!inference.cookie && parameters3.includes("cookie"))
    inference.cookie = true;
  if (!inference.set && parameters3.includes("set"))
    inference.set = true;
  if (!inference.server && parameters3.includes("server"))
    inference.server = true;
  if (hasParenthesis)
    return `{ ${parameters3.join(", ")} }`;
  return parameters3.join(", ");
};
var findEndIndex = (type3, content, index) => {
  let newLineIndex = content.indexOf(type3 + `
`, index), newTabIndex = content.indexOf(type3 + "\t", index), commaIndex = content.indexOf(type3 + ",", index), semicolonIndex = content.indexOf(type3 + ";", index), emptyIndex = content.indexOf(type3 + " ", index);
  return [newLineIndex, newTabIndex, commaIndex, semicolonIndex, emptyIndex].filter((i) => i > 0).sort((a, b) => a - b)[0] || -1;
};
var findAlias = (type3, body, depth = 0) => {
  if (depth > 5)
    return [];
  let aliases = [], content = body;
  while (true) {
    let index = findEndIndex(" = " + type3, content);
    if (index === -1) {
      let lastIndex = content.indexOf(" = " + type3);
      if (lastIndex + 3 + type3.length !== content.length)
        break;
      index = lastIndex;
    }
    let part = content.slice(0, index), variable = part.slice(part.lastIndexOf(" ") + 1);
    if (variable === "}") {
      let [start, end] = bracketPairRangeReverse(part);
      aliases.push(removeColonAlias(content.slice(start, end))), content = content.slice(index + 3 + type3.length);
      continue;
    }
    while (variable.charCodeAt(0) === 44)
      variable = variable.slice(1);
    while (variable.charCodeAt(0) === 9)
      variable = variable.slice(1);
    if (!variable.includes("("))
      aliases.push(variable);
    content = content.slice(index + 3 + type3.length);
  }
  for (let alias of aliases) {
    if (alias.charCodeAt(0) === 123)
      continue;
    let deepAlias = findAlias(alias, body);
    if (deepAlias.length > 0)
      aliases.push(...deepAlias);
  }
  return aliases;
};
var extractMainParameter = (parameter) => {
  if (!parameter)
    return;
  if (parameter.charCodeAt(0) !== 123)
    return parameter;
  if (parameter = parameter.slice(2, -2), !parameter.includes(",")) {
    if (parameter.includes("..."))
      return parameter.slice(parameter.indexOf("...") + 3);
    return;
  }
  let spreadIndex = parameter.indexOf("...");
  if (spreadIndex === -1)
    return;
  return parameter.slice(spreadIndex + 3).trimEnd();
};
var inferBodyReference = (code, aliases, inference) => {
  let access = (type3, alias) => code.includes(alias + "." + type3) || code.includes(alias + '["' + type3 + '"]') || code.includes(alias + "['" + type3 + "']");
  for (let alias of aliases) {
    if (!alias)
      continue;
    if (alias.charCodeAt(0) === 123) {
      let parameters3 = retrieveRootParamters(alias).parameters;
      if (!inference.query && parameters3.includes("query"))
        inference.query = true;
      if (!inference.headers && parameters3.includes("headers"))
        inference.headers = true;
      if (!inference.body && parameters3.includes("body"))
        inference.body = true;
      if (!inference.cookie && parameters3.includes("cookie"))
        inference.cookie = true;
      if (!inference.set && parameters3.includes("set"))
        inference.set = true;
      if (!inference.query && parameters3.includes("server"))
        inference.server = true;
      continue;
    }
    if (!inference.query && access("query", alias))
      inference.query = true;
    if (code.includes("return " + alias) || code.includes("return " + alias + ".query"))
      inference.query = true;
    if (!inference.headers && access("headers", alias))
      inference.headers = true;
    if (!inference.body && access("body", alias))
      inference.body = true;
    if (!inference.cookie && access("cookie", alias))
      inference.cookie = true;
    if (!inference.set && access("set", alias))
      inference.set = true;
    if (!inference.server && access("server", alias))
      inference.server = true;
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set && inference.server)
      break;
  }
  return aliases;
};
var isContextPassToFunction = (context, body, inference) => {
  try {
    let captureFunction = new RegExp(`(?:\\w)\\((?:.*)?${context}`, "gs");
    captureFunction.test(body);
    let nextChar = body.charCodeAt(captureFunction.lastIndex);
    if (nextChar === 41 || nextChar === 44)
      return inference.query = true, inference.headers = true, inference.body = true, inference.cookie = true, inference.set = true, inference.server = true, true;
    return false;
  } catch (error3) {
    return console.log("[Sucrose] warning: unexpected isContextPassToFunction error, you may continue development as usual but please report the following to maintainers:"), console.log("--- body ---"), console.log(body), console.log("--- context ---"), console.log(context), true;
  }
};
var sucrose = (lifeCycle, inference = { query: false, headers: false, body: false, cookie: false, set: false, server: false }) => {
  let events = [];
  if (lifeCycle.handler && typeof lifeCycle.handler === "function")
    events.push(lifeCycle.handler);
  if (lifeCycle.request?.length)
    events.push(...lifeCycle.request);
  if (lifeCycle.beforeHandle?.length)
    events.push(...lifeCycle.beforeHandle);
  if (lifeCycle.parse?.length)
    events.push(...lifeCycle.parse);
  if (lifeCycle.error?.length)
    events.push(...lifeCycle.error);
  if (lifeCycle.transform?.length)
    events.push(...lifeCycle.transform);
  if (lifeCycle.afterHandle?.length)
    events.push(...lifeCycle.afterHandle);
  if (lifeCycle.mapResponse?.length)
    events.push(...lifeCycle.mapResponse);
  if (lifeCycle.afterResponse?.length)
    events.push(...lifeCycle.afterResponse);
  for (let e of events) {
    if (!e)
      continue;
    let event = "fn" in e ? e.fn : e, [parameter, body, { isArrowReturn }] = separateFunction(event.toString()), rootParameters = findParameterReference(parameter, inference), mainParameter = extractMainParameter(rootParameters);
    if (mainParameter) {
      let aliases = findAlias(mainParameter, body);
      if (aliases.splice(0, -1, mainParameter), !isContextPassToFunction(mainParameter, body, inference))
        inferBodyReference(body, aliases, inference);
      if (!inference.query && body.includes("return " + mainParameter + ".query"))
        inference.query = true;
    }
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set && inference.server)
      break;
  }
  return inference;
};
var fullFormats = { date: date3, time: getTime(true), "date-time": getDateTime(true), "iso-time": getTime(false), "iso-date-time": getDateTime(false), duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/, uri, "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i, "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i, url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu, email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i, hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i, ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/, ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i, regex, uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i, "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/, "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i, "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/, byte, int32: { type: "number", validate: validateInt32 }, int64: { type: "number", validate: validateInt64 }, float: { type: "number", validate: validateNumber }, double: { type: "number", validate: validateNumber }, password: true, binary: true };
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function date3(str) {
  let matches = DATE.exec(str);
  if (!matches)
    return false;
  let year = +matches[1], month = +matches[2], day = +matches[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
}
var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
function getTime(strictTimeZone) {
  return function time(str) {
    let matches = TIME.exec(str);
    if (!matches)
      return false;
    let hr = +matches[1], min = +matches[2], sec = +matches[3], tz = matches[4], tzSign = matches[5] === "-" ? -1 : 1, tzH = +(matches[6] || 0), tzM = +(matches[7] || 0);
    if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
      return false;
    if (hr <= 23 && min <= 59 && sec < 60)
      return true;
    let utcMin = min - tzM * tzSign, utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
    return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
  };
}
var DATE_TIME_SEPARATOR = /t|\s/i;
function getDateTime(strictTimeZone) {
  let time = getTime(strictTimeZone);
  return function date_time(str) {
    let dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date3(dateTime[0]) && time(dateTime[1]);
  };
}
var NOT_URI_FRAGMENT = /\/|:/;
var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}
var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
function byte(str) {
  return BYTE.lastIndex = 0, BYTE.test(str);
}
var MIN_INT32 = -2147483648;
var MAX_INT32 = 2147483647;
function validateInt32(value2) {
  return Number.isInteger(value2) && value2 <= MAX_INT32 && value2 >= MIN_INT32;
}
function validateInt64(value2) {
  return Number.isInteger(value2);
}
function validateNumber() {
  return true;
}
var Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
  if (Z_ANCHOR.test(str))
    return false;
  try {
    return new RegExp(str), true;
  } catch (e) {
    return false;
  }
}
var isISO8601 = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
var isFormalDate = /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/;
var isShortenDate = /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/;
var _validateDate = fullFormats.date;
var _validateDateTime = fullFormats["date-time"];
if (!exports_format.Has("date"))
  TypeSystem.Format("date", (value2) => {
    let temp = value2.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDate(temp)) {
      let date22 = new Date(temp);
      if (!Number.isNaN(date22.getTime()))
        return true;
    }
    return false;
  });
if (!exports_format.Has("date-time"))
  TypeSystem.Format("date-time", (value2) => {
    let temp = value2.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDateTime(temp)) {
      let date22 = new Date(temp);
      if (!Number.isNaN(date22.getTime()))
        return true;
    }
    return false;
  });
Object.entries(fullFormats).forEach((formatEntry) => {
  let [formatName, formatValue] = formatEntry;
  if (!exports_format.Has(formatName)) {
    if (formatValue instanceof RegExp)
      TypeSystem.Format(formatName, (value2) => formatValue.test(value2));
    else if (typeof formatValue === "function")
      TypeSystem.Format(formatName, formatValue);
  }
});
var t = Object.assign({}, Type);
var parseFileUnit = (size) => {
  if (typeof size === "string")
    switch (size.slice(-1)) {
      case "k":
        return +size.slice(0, size.length - 1) * 1024;
      case "m":
        return +size.slice(0, size.length - 1) * 1048576;
      default:
        return +size;
    }
  return size;
};
var validateFile = (options, value2) => {
  if (!(value2 instanceof Blob))
    return false;
  if (options.minSize && value2.size < parseFileUnit(options.minSize))
    return false;
  if (options.maxSize && value2.size > parseFileUnit(options.maxSize))
    return false;
  if (options.extension)
    if (typeof options.extension === "string") {
      if (!value2.type.startsWith(options.extension))
        return false;
    } else {
      for (let i = 0;i < options.extension.length; i++)
        if (value2.type.startsWith(options.extension[i]))
          return true;
      return false;
    }
  return true;
};
var File2 = exports_type.Get("Files") ?? TypeSystem.Type("File", validateFile);
var Files = exports_type.Get("Files") ?? TypeSystem.Type("Files", (options, value2) => {
  if (!Array.isArray(value2))
    return validateFile(options, value2);
  if (options.minItems && value2.length < options.minItems)
    return false;
  if (options.maxItems && value2.length > options.maxItems)
    return false;
  for (let i = 0;i < value2.length; i++)
    if (!validateFile(options, value2[i]))
      return false;
  return true;
});
if (!exports_format.Has("numeric"))
  exports_format.Set("numeric", (value2) => !!value2 && !isNaN(+value2));
if (!exports_format.Has("boolean"))
  exports_format.Set("boolean", (value2) => value2 === "true" || value2 === "false");
if (!exports_format.Has("ObjectString"))
  exports_format.Set("ObjectString", (value2) => {
    let start = value2.charCodeAt(0);
    if (start === 9 || start === 10 || start === 32)
      start = value2.trimStart().charCodeAt(0);
    if (start !== 123 && start !== 91)
      return false;
    try {
      return JSON.parse(value2), true;
    } catch {
      return false;
    }
  });
if (!exports_format.Has("ArrayString"))
  exports_format.Set("ArrayString", (value2) => {
    let start = value2.charCodeAt(0);
    if (start === 9 || start === 10 || start === 32)
      start = value2.trimStart().charCodeAt(0);
    if (start !== 123 && start !== 91)
      return false;
    try {
      return JSON.parse(value2), true;
    } catch {
      return false;
    }
  });
exports_type.Set("UnionEnum", (schema3, value2) => {
  return (typeof value2 === "number" || typeof value2 === "string" || value2 === null) && schema3.enum.includes(value2);
});
var ElysiaType = { Numeric: (property) => {
  let schema3 = Type.Number(property);
  return t.Transform(t.Union([t.String({ format: "numeric", default: 0 }), t.Number(property)], property)).Decode((value2) => {
    let number3 = +value2;
    if (isNaN(number3))
      return value2;
    if (property && !exports_value2.Check(schema3, number3))
      throw new ValidationError("property", schema3, number3);
    return number3;
  }).Encode((value2) => value2);
}, Date: (property) => {
  let schema3 = Type.Date(property);
  return t.Transform(t.Union([Type.Date(property), t.String({ format: "date", default: new Date().toISOString() }), t.String({ format: "date-time", default: new Date().toISOString() })], property)).Decode((value2) => {
    if (value2 instanceof Date)
      return value2;
    let date22 = new Date(value2);
    if (!exports_value2.Check(schema3, date22))
      throw new ValidationError("property", schema3, date22);
    return date22;
  }).Encode((value2) => {
    if (typeof value2 === "string")
      return new Date(value2);
    return value2;
  });
}, BooleanString: (property) => {
  let schema3 = Type.Boolean(property);
  return t.Transform(t.Union([t.Boolean(property), t.String({ format: "boolean", default: false })], property)).Decode((value2) => {
    if (typeof value2 === "string")
      return value2 === "true";
    if (property && !exports_value2.Check(schema3, value2))
      throw new ValidationError("property", schema3, value2);
    return value2;
  }).Encode((value2) => value2);
}, ObjectString: (properties, options) => {
  let schema3 = t.Object(properties, options), defaultValue = JSON.stringify(exports_value2.Create(schema3)), compiler2;
  try {
    compiler2 = TypeCompiler.Compile(schema3);
  } catch {
  }
  return t.Transform(t.Union([t.String({ format: "ObjectString", default: defaultValue }), schema3])).Decode((value2) => {
    if (typeof value2 === "string") {
      if (value2.charCodeAt(0) !== 123)
        throw new ValidationError("property", schema3, value2);
      try {
        value2 = JSON.parse(value2);
      } catch {
        throw new ValidationError("property", schema3, value2);
      }
      if (compiler2) {
        if (!compiler2.Check(value2))
          throw new ValidationError("property", schema3, value2);
        return compiler2.Decode(value2);
      }
      if (!exports_value2.Check(schema3, value2))
        throw new ValidationError("property", schema3, value2);
      return exports_value2.Decode(schema3, value2);
    }
    return value2;
  }).Encode((value2) => {
    if (typeof value2 === "string")
      try {
        value2 = JSON.parse(value2);
      } catch {
        throw new ValidationError("property", schema3, value2);
      }
    if (!exports_value2.Check(schema3, value2))
      throw new ValidationError("property", schema3, value2);
    return JSON.stringify(value2);
  });
}, ArrayString: (children = {}, options) => {
  let schema3 = t.Array(children, options), defaultValue = JSON.stringify(exports_value2.Create(schema3)), compiler2;
  try {
    compiler2 = TypeCompiler.Compile(schema3);
  } catch {
  }
  return t.Transform(t.Union([t.String({ format: "ArrayString", default: defaultValue }), schema3])).Decode((value2) => {
    if (typeof value2 === "string") {
      if (value2.charCodeAt(0) !== 91)
        throw new ValidationError("property", schema3, value2);
      try {
        value2 = JSON.parse(value2);
      } catch {
        throw new ValidationError("property", schema3, value2);
      }
      if (compiler2) {
        if (!compiler2.Check(value2))
          throw new ValidationError("property", schema3, value2);
        return compiler2.Decode(value2);
      }
      if (!exports_value2.Check(schema3, value2))
        throw new ValidationError("property", schema3, value2);
      return exports_value2.Decode(schema3, value2);
    }
    return value2;
  }).Encode((value2) => {
    if (typeof value2 === "string")
      try {
        value2 = JSON.parse(value2);
      } catch {
        throw new ValidationError("property", schema3, value2);
      }
    if (!exports_value2.Check(schema3, value2))
      throw new ValidationError("property", schema3, value2);
    return JSON.stringify(value2);
  });
}, File: File2, Files: (options = {}) => t.Transform(Files(options)).Decode((value2) => {
  if (Array.isArray(value2))
    return value2;
  return [value2];
}).Encode((value2) => value2), Nullable: (schema3) => t.Union([schema3, t.Null()]), MaybeEmpty: (schema3) => t.Union([schema3, t.Null(), t.Undefined()]), Cookie: (properties, { domain, expires, httpOnly, maxAge, path, priority, sameSite, secure, secrets, sign, ...options } = {}) => {
  let v = t.Object(properties, options);
  return v.config = { domain, expires, httpOnly, maxAge, path, priority, sameSite, secure, secrets, sign }, v;
}, UnionEnum: (values, options = {}) => {
  let type3 = values.every((value2) => typeof value2 === "string") ? { type: "string" } : values.every((value2) => typeof value2 === "number") ? { type: "number" } : values.every((value2) => value2 === null) ? { type: "null" } : {};
  if (values.some((x) => typeof x === "object" && x !== null))
    throw new Error("This type does not support objects or arrays");
  return { default: values[0], ...options, [Kind]: "UnionEnum", ...type3, enum: values };
} };
t.BooleanString = ElysiaType.BooleanString;
t.ObjectString = ElysiaType.ObjectString;
t.ArrayString = ElysiaType.ArrayString;
t.Numeric = ElysiaType.Numeric;
t.File = (arg = {}) => ElysiaType.File({ default: "File", ...arg, extension: arg?.type, type: "string", format: "binary" });
t.Files = (arg = {}) => ElysiaType.Files({ ...arg, elysiaMeta: "Files", default: "Files", extension: arg?.type, type: "array", items: { ...arg, default: "Files", type: "string", format: "binary" } });
t.Nullable = (schema3) => ElysiaType.Nullable(schema3);
t.MaybeEmpty = ElysiaType.MaybeEmpty;
t.Cookie = ElysiaType.Cookie;
t.Date = ElysiaType.Date;
t.UnionEnum = ElysiaType.UnionEnum;
var import_cookie2 = __toESM2(require_dist(), 1);
var import_cookie = __toESM2(require_dist(), 1);
var import_fast_decode_uri_component = __toESM2(require_fast_decode_uri_component(), 1);

class Cookie {
  name;
  jar;
  initial;
  constructor(name, jar, initial = {}) {
    this.name = name;
    this.jar = jar;
    this.initial = initial;
  }
  get cookie() {
    return this.jar[this.name] ?? this.initial;
  }
  set cookie(jar) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name] = jar;
  }
  get setCookie() {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    return this.jar[this.name];
  }
  set setCookie(jar) {
    this.cookie = jar;
  }
  get value() {
    return this.cookie.value;
  }
  set value(value2) {
    this.setCookie.value = value2;
  }
  get expires() {
    return this.cookie.expires;
  }
  set expires(expires) {
    this.setCookie.expires = expires;
  }
  get maxAge() {
    return this.cookie.maxAge;
  }
  set maxAge(maxAge) {
    this.setCookie.maxAge = maxAge;
  }
  get domain() {
    return this.cookie.domain;
  }
  set domain(domain) {
    this.setCookie.domain = domain;
  }
  get path() {
    return this.cookie.path;
  }
  set path(path) {
    this.setCookie.path = path;
  }
  get secure() {
    return this.cookie.secure;
  }
  set secure(secure) {
    this.setCookie.secure = secure;
  }
  get httpOnly() {
    return this.cookie.httpOnly;
  }
  set httpOnly(httpOnly) {
    this.setCookie.httpOnly = httpOnly;
  }
  get sameSite() {
    return this.cookie.sameSite;
  }
  set sameSite(sameSite) {
    this.setCookie.sameSite = sameSite;
  }
  get priority() {
    return this.cookie.priority;
  }
  set priority(priority) {
    this.setCookie.priority = priority;
  }
  get partitioned() {
    return this.cookie.partitioned;
  }
  set partitioned(partitioned) {
    this.setCookie.partitioned = partitioned;
  }
  get secrets() {
    return this.cookie.secrets;
  }
  set secrets(secrets) {
    this.setCookie.secrets = secrets;
  }
  update(config) {
    return this.setCookie = Object.assign(this.cookie, typeof config === "function" ? config(this.cookie) : config), this;
  }
  set(config) {
    return this.setCookie = Object.assign({ ...this.initial, value: this.value }, typeof config === "function" ? config(this.cookie) : config), this;
  }
  remove() {
    if (this.value === undefined)
      return;
    return this.set({ expires: new Date(0), maxAge: 0, value: "" }), this;
  }
  toString() {
    return typeof this.value === "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
}
var createCookieJar = (set22, store, initial) => {
  if (!set22.cookie)
    set22.cookie = {};
  return new Proxy(store, { get(_2, key) {
    if (key in store)
      return new Cookie(key, set22.cookie, Object.assign({}, initial ?? {}, store[key]));
    return new Cookie(key, set22.cookie, Object.assign({}, initial));
  } });
};
var parseCookie = async (set22, cookieString, { secrets, sign, ...initial } = {}) => {
  if (!cookieString)
    return createCookieJar(set22, {}, initial);
  let isStringKey = typeof secrets === "string";
  if (sign && sign !== true && !Array.isArray(sign))
    sign = [sign];
  let jar = {}, cookies = import_cookie.parse(cookieString);
  for (let [name, v] of Object.entries(cookies)) {
    let value2 = import_fast_decode_uri_component.default(v);
    if (sign === true || sign?.includes(name)) {
      if (!secrets)
        throw new Error("No secret is provided to cookie plugin");
      if (isStringKey) {
        let temp = await unsignCookie(value2, secrets);
        if (temp === false)
          throw new InvalidCookieSignature(name);
        value2 = temp;
      } else {
        let decoded = true;
        for (let i = 0;i < secrets.length; i++) {
          let temp = await unsignCookie(value2, secrets[i]);
          if (temp !== false) {
            decoded = true, value2 = temp;
            break;
          }
        }
        if (!decoded)
          throw new InvalidCookieSignature(name);
      }
    }
    jar[name] = { value: value2 };
  }
  return createCookieJar(set22, jar, initial);
};
var hasHeaderShorthand = "toJSON" in new Headers;
var isNotEmpty = (obj) => {
  if (!obj)
    return false;
  for (let x in obj)
    return true;
  return false;
};
var handleFile = (response, set22) => {
  let size = response.size;
  if (!set22 && size || size && set22 && set22.status !== 206 && set22.status !== 304 && set22.status !== 412 && set22.status !== 416) {
    if (set22 && isNotEmpty(set22.headers)) {
      if (set22.headers instanceof Headers) {
        if (hasHeaderShorthand)
          set22.headers = set22.headers.toJSON();
        else
          for (let [key, value2] of set22.headers.entries())
            if (key in set22.headers)
              set22.headers[key] = value2;
      }
      return new Response(response, { status: set22.status, headers: Object.assign({ "accept-ranges": "bytes", "content-range": `bytes 0-${size - 1}/${size}` }, set22.headers) });
    }
    return new Response(response, { headers: { "accept-ranges": "bytes", "content-range": `bytes 0-${size - 1}/${size}`, "transfer-encoding": "chunked" } });
  }
  return new Response(response);
};
var parseSetCookies = (headers, setCookie) => {
  if (!headers)
    return headers;
  headers.delete("set-cookie");
  for (let i = 0;i < setCookie.length; i++) {
    let index = setCookie[i].indexOf("=");
    headers.append("set-cookie", `${setCookie[i].slice(0, index)}=${setCookie[i].slice(index + 1) || ""}`);
  }
  return headers;
};
var serializeCookie = (cookies) => {
  if (!cookies || !isNotEmpty(cookies))
    return;
  let set22 = [];
  for (let [key, property] of Object.entries(cookies)) {
    if (!key || !property)
      continue;
    let value2 = property.value;
    if (value2 === undefined || value2 === null)
      continue;
    set22.push(import_cookie2.serialize(key, typeof value2 === "object" ? JSON.stringify(value2) : value2 + "", property));
  }
  if (set22.length === 0)
    return;
  if (set22.length === 1)
    return set22[0];
  return set22;
};
var handleStream = async (generator, set22, request) => {
  let init = generator.next();
  if (init instanceof Promise)
    init = await init;
  if (init.done) {
    if (set22)
      return mapResponse(init.value, set22, request);
    return mapCompactResponse(init.value, request);
  }
  return new Response(new ReadableStream({ async start(controller) {
    let end = false;
    if (request?.signal.addEventListener("abort", () => {
      end = true;
      try {
        controller.close();
      } catch {
      }
    }), init.value !== undefined && init.value !== null)
      if (typeof init.value === "object")
        try {
          controller.enqueue(Buffer.from(JSON.stringify(init.value)));
        } catch {
          controller.enqueue(Buffer.from(init.value.toString()));
        }
      else
        controller.enqueue(Buffer.from(init.value.toString()));
    for await (let chunk of generator) {
      if (end)
        break;
      if (chunk === undefined || chunk === null)
        continue;
      if (typeof chunk === "object")
        try {
          controller.enqueue(Buffer.from(JSON.stringify(chunk)));
        } catch {
          controller.enqueue(Buffer.from(chunk.toString()));
        }
      else
        controller.enqueue(Buffer.from(chunk.toString()));
      await new Promise((resolve) => setTimeout(() => resolve(), 0));
    }
    try {
      controller.close();
    } catch {
    }
  } }), { ...set22, headers: { "transfer-encoding": "chunked", "content-type": "text/event-stream; charset=utf-8", ...set22?.headers } });
};
async function* streamResponse(response) {
  let body = response.body;
  if (!body)
    return;
  let reader = body.getReader(), decoder = new TextDecoder;
  try {
    while (true) {
      let { done, value: value2 } = await reader.read();
      if (done)
        break;
      yield decoder.decode(value2);
    }
  } finally {
    reader.releaseLock();
  }
}
var mapResponse = (response, set22, request) => {
  if (isNotEmpty(set22.headers) || set22.status !== 200 || set22.redirect || set22.cookie) {
    if (typeof set22.status === "string")
      set22.status = StatusMap[set22.status];
    if (set22.redirect) {
      if (set22.headers.Location = set22.redirect, !set22.status || set22.status < 300 || set22.status >= 400)
        set22.status = 302;
    }
    if (set22.cookie && isNotEmpty(set22.cookie)) {
      let cookie = serializeCookie(set22.cookie);
      if (cookie)
        set22.headers["set-cookie"] = cookie;
    }
    if (set22.headers["set-cookie"] && Array.isArray(set22.headers["set-cookie"]))
      set22.headers = parseSetCookies(new Headers(set22.headers), set22.headers["set-cookie"]);
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set22);
      case "Blob":
        return handleFile(response, set22);
      case "Array":
        return Response.json(response, set22);
      case "Object":
        return Response.json(response, set22);
      case "ElysiaCustomStatusResponse":
        return set22.status = response.code, mapResponse(response.response, set22, request);
      case "ReadableStream":
        if (!set22.headers["content-type"]?.startsWith("text/event-stream"))
          set22.headers["content-type"] = "text/event-stream; charset=utf-8";
        return request?.signal.addEventListener("abort", { handleEvent() {
          if (!request?.signal.aborted)
            response.cancel(request);
        } }, { once: true }), new Response(response, set22);
      case undefined:
        if (!response)
          return new Response("", set22);
        return Response.json(response, set22);
      case "Response":
        let isCookieSet = false;
        if (set22.headers instanceof Headers)
          for (let key of set22.headers.keys())
            if (key === "set-cookie") {
              if (isCookieSet)
                continue;
              isCookieSet = true;
              for (let cookie of set22.headers.getSetCookie())
                response.headers.append("set-cookie", cookie);
            } else
              response.headers.append(key, set22.headers?.get(key) ?? "");
        else
          for (let key in set22.headers)
            response.headers.append(key, set22.headers[key]);
        if (response.status !== set22.status)
          set22.status = response.status;
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(streamResponse(response), set22, request);
        return response;
      case "Error":
        return errorToResponse(response, set22);
      case "Promise":
        return response.then((x) => mapResponse(x, set22));
      case "Function":
        return mapResponse(response(), set22);
      case "Number":
      case "Boolean":
        return new Response(response.toString(), set22);
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set22);
        return new Response(response?.toString(), set22);
      case "FormData":
        return new Response(response, set22);
      default:
        if (response instanceof Response) {
          let isCookieSet2 = false;
          if (set22.headers instanceof Headers)
            for (let key of set22.headers.keys())
              if (key === "set-cookie") {
                if (isCookieSet2)
                  continue;
                isCookieSet2 = true;
                for (let cookie of set22.headers.getSetCookie())
                  response.headers.append("set-cookie", cookie);
              } else
                response.headers.append(key, set22.headers?.get(key) ?? "");
          else
            for (let key in set22.headers)
              response.headers.append(key, set22.headers[key]);
          if (hasHeaderShorthand)
            set22.headers = response.headers.toJSON();
          else
            for (let [key, value2] of response.headers.entries())
              if (key in set22.headers)
                set22.headers[key] = value2;
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set22));
        if (response instanceof Error)
          return errorToResponse(response, set22);
        if (response instanceof ElysiaCustomStatusResponse)
          return set22.status = response.code, mapResponse(response.response, set22, request);
        if (typeof response?.next === "function")
          return handleStream(response, set22, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapResponse(x, set22));
        if (typeof response?.toResponse === "function")
          return mapResponse(response.toResponse(), set22);
        if ("charCodeAt" in response) {
          let code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set22.headers["Content-Type"])
              set22.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set22);
          }
        }
        return new Response(response, set22);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set22);
      case "Array":
        return Response.json(response);
      case "Object":
        return Response.json(response, set22);
      case "ElysiaCustomStatusResponse":
        return set22.status = response.code, mapResponse(response.response, set22, request);
      case "ReadableStream":
        return request?.signal.addEventListener("abort", { handleEvent() {
          if (!request?.signal.aborted)
            response.cancel(request);
        } }, { once: true }), new Response(response, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
      case undefined:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), { headers: { "content-type": "application/json" } });
      case "Response":
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(streamResponse(response), set22, request);
        return response;
      case "Error":
        return errorToResponse(response, set22);
      case "Promise":
        return response.then((x) => {
          let r = mapCompactResponse(x, request);
          if (r !== undefined)
            return r;
          return new Response("");
        });
      case "Function":
        return mapCompactResponse(response(), request);
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set22);
        return new Response(response?.toString(), set22);
      case "FormData":
        return new Response(response, set22);
      default:
        if (response instanceof Response)
          return response;
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set22));
        if (response instanceof Error)
          return errorToResponse(response, set22);
        if (response instanceof ElysiaCustomStatusResponse)
          return set22.status = response.code, mapResponse(response.response, set22, request);
        if (typeof response?.next === "function")
          return handleStream(response, set22, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapResponse(x, set22));
        if (typeof response?.toResponse === "function")
          return mapResponse(response.toResponse(), set22);
        if ("charCodeAt" in response) {
          let code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set22.headers["Content-Type"])
              set22.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set22);
          }
        }
        return new Response(response);
    }
};
var mapEarlyResponse = (response, set22, request) => {
  if (response === undefined || response === null)
    return;
  if (isNotEmpty(set22.headers) || set22.status !== 200 || set22.redirect || set22.cookie) {
    if (typeof set22.status === "string")
      set22.status = StatusMap[set22.status];
    if (set22.redirect) {
      if (set22.headers.Location = set22.redirect, !set22.status || set22.status < 300 || set22.status >= 400)
        set22.status = 302;
    }
    if (set22.cookie && isNotEmpty(set22.cookie)) {
      let cookie = serializeCookie(set22.cookie);
      if (cookie)
        set22.headers["set-cookie"] = cookie;
    }
    if (set22.headers["set-cookie"] && Array.isArray(set22.headers["set-cookie"]))
      set22.headers = parseSetCookies(new Headers(set22.headers), set22.headers["set-cookie"]);
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set22);
      case "Blob":
        return handleFile(response, set22);
      case "Array":
        return Response.json(response, set22);
      case "Object":
        return Response.json(response, set22);
      case "ElysiaCustomStatusResponse":
        return set22.status = response.code, mapEarlyResponse(response.response, set22, request);
      case "ReadableStream":
        if (!set22.headers["content-type"]?.startsWith("text/event-stream"))
          set22.headers["content-type"] = "text/event-stream; charset=utf-8";
        return request?.signal.addEventListener("abort", { handleEvent() {
          if (!request?.signal.aborted)
            response.cancel(request);
        } }, { once: true }), new Response(response, set22);
      case undefined:
        if (!response)
          return;
        return Response.json(response, set22);
      case "Response":
        let isCookieSet = false;
        if (set22.headers instanceof Headers)
          for (let key of set22.headers.keys())
            if (key === "set-cookie") {
              if (isCookieSet)
                continue;
              isCookieSet = true;
              for (let cookie of set22.headers.getSetCookie())
                response.headers.append("set-cookie", cookie);
            } else
              response.headers.append(key, set22.headers?.get(key) ?? "");
        else
          for (let key in set22.headers)
            response.headers.append(key, set22.headers[key]);
        if (response.status !== set22.status)
          set22.status = response.status;
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(streamResponse(response), set22, request);
        return response;
      case "Promise":
        return response.then((x) => {
          let r = mapEarlyResponse(x, set22);
          if (r !== undefined)
            return r;
        });
      case "Error":
        return errorToResponse(response, set22);
      case "Function":
        return mapEarlyResponse(response(), set22);
      case "Number":
      case "Boolean":
        return new Response(response.toString(), set22);
      case "FormData":
        return new Response(response);
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set22);
        return new Response(response?.toString(), set22);
      default:
        if (response instanceof Response) {
          let isCookieSet2 = false;
          if (set22.headers instanceof Headers)
            for (let key of set22.headers.keys())
              if (key === "set-cookie") {
                if (isCookieSet2)
                  continue;
                isCookieSet2 = true;
                for (let cookie of set22.headers.getSetCookie())
                  response.headers.append("set-cookie", cookie);
              } else
                response.headers.append(key, set22.headers?.get(key) ?? "");
          else
            for (let key in set22.headers)
              response.headers.append(key, set22.headers[key]);
          if (response.status !== set22.status)
            set22.status = response.status;
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set22));
        if (response instanceof Error)
          return errorToResponse(response, set22);
        if (response instanceof ElysiaCustomStatusResponse)
          return set22.status = response.code, mapEarlyResponse(response.response, set22, request);
        if (typeof response?.next === "function")
          return handleStream(response, set22, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapEarlyResponse(x, set22));
        if (typeof response?.toResponse === "function")
          return mapEarlyResponse(response.toResponse(), set22);
        if ("charCodeAt" in response) {
          let code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set22.headers["Content-Type"])
              set22.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set22);
          }
        }
        return new Response(response, set22);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set22);
      case "Array":
        return Response.json(response);
      case "Object":
        return Response.json(response, set22);
      case "ElysiaCustomStatusResponse":
        return set22.status = response.code, mapEarlyResponse(response.response, set22, request);
      case "ReadableStream":
        return request?.signal.addEventListener("abort", { handleEvent() {
          if (!request?.signal.aborted)
            response.cancel(request);
        } }, { once: true }), new Response(response, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
      case undefined:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), { headers: { "content-type": "application/json" } });
      case "Response":
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(streamResponse(response));
        return response;
      case "Promise":
        return response.then((x) => {
          let r = mapEarlyResponse(x, set22);
          if (r !== undefined)
            return r;
        });
      case "Error":
        return errorToResponse(response, set22);
      case "Function":
        return mapCompactResponse(response(), request);
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set22);
        return new Response(response?.toString(), set22);
      case "FormData":
        return new Response(response);
      default:
        if (response instanceof Response)
          return response;
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set22));
        if (response instanceof Error)
          return errorToResponse(response, set22);
        if (response instanceof ElysiaCustomStatusResponse)
          return set22.status = response.code, mapEarlyResponse(response.response, set22, request);
        if (typeof response?.next === "function")
          return handleStream(response, set22, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapEarlyResponse(x, set22));
        if (typeof response?.toResponse === "function")
          return mapEarlyResponse(response.toResponse(), set22);
        if ("charCodeAt" in response) {
          let code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set22.headers["Content-Type"])
              set22.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set22);
          }
        }
        return new Response(response);
    }
};
var mapCompactResponse = (response, request) => {
  switch (response?.constructor?.name) {
    case "String":
      return new Response(response);
    case "Blob":
      return handleFile(response);
    case "Array":
      return Response.json(response);
    case "Object":
      return Response.json(response);
    case "ElysiaCustomStatusResponse":
      return mapResponse(response.response, { status: response.code, headers: {} });
    case "ReadableStream":
      return request?.signal.addEventListener("abort", { handleEvent() {
        if (!request?.signal.aborted)
          response.cancel(request);
      } }, { once: true }), new Response(response, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
    case undefined:
      if (!response)
        return new Response("");
      return new Response(JSON.stringify(response), { headers: { "content-type": "application/json" } });
    case "Response":
      if (response.headers.get("transfer-encoding") === "chunked")
        return handleStream(streamResponse(response));
      return response;
    case "Error":
      return errorToResponse(response);
    case "Promise":
      return response.then((x) => mapCompactResponse(x, request));
    case "Function":
      return mapCompactResponse(response(), request);
    case "Number":
    case "Boolean":
      return new Response(response.toString());
    case "FormData":
      return new Response(response);
    default:
      if (response instanceof Response)
        return response;
      if (response instanceof Promise)
        return response.then((x) => mapCompactResponse(x, request));
      if (response instanceof Error)
        return errorToResponse(response);
      if (response instanceof ElysiaCustomStatusResponse)
        return mapResponse(response.response, { status: response.code, headers: {} });
      if (typeof response?.next === "function")
        return handleStream(response, undefined, request);
      if (typeof response?.then === "function")
        return response.then((x) => mapResponse(x, set));
      if (typeof response?.toResponse === "function")
        return mapCompactResponse(response.toResponse());
      if ("charCodeAt" in response) {
        let code = response.charCodeAt(0);
        if (code === 123 || code === 91)
          return new Response(JSON.stringify(response), { headers: { "Content-Type": "application/json" } });
      }
      return new Response(response);
  }
};
var errorToResponse = (error3, set22) => new Response(JSON.stringify({ name: error3?.name, message: error3?.message, cause: error3?.cause }), { status: set22?.status !== 200 ? set22?.status ?? 500 : 500, headers: set22?.headers });
var createStaticHandler = (handle, hooks, setHeaders = {}) => {
  if (typeof handle === "function")
    return;
  let response = mapResponse(handle, { headers: setHeaders });
  if (hooks.parse.length === 0 && hooks.transform.length === 0 && hooks.beforeHandle.length === 0 && hooks.afterHandle.length === 0)
    return response.clone.bind(response);
};
var createNativeStaticHandler = (handle, hooks, setHeaders = {}) => {
  if (typeof handle === "function" || handle instanceof Blob)
    return;
  let response = mapResponse(handle, { headers: setHeaders });
  if (hooks.parse.length === 0 && hooks.transform.length === 0 && hooks.beforeHandle.length === 0 && hooks.afterHandle.length === 0) {
    if (!response.headers.has("content-type"))
      response.headers.append("content-type", "text/plain;charset=utf-8");
    return response.clone.bind(response);
  }
};
var replaceUrlPath = (url, pathname) => {
  let urlObject = new URL(url);
  return urlObject.pathname = pathname, urlObject.toString();
};
var isClass = (v) => typeof v === "function" && /^\s*class\s+/.test(v.toString()) || v.toString().startsWith("[object ") && v.toString() !== "[object Object]" || isNotEmpty(Object.getPrototypeOf(v));
var isObject = (item) => item && typeof item === "object" && !Array.isArray(item);
var mergeDeep = (target, source, { skipKeys, override = true } = {}) => {
  if (!isObject(target) || !isObject(source))
    return target;
  for (let [key, value2] of Object.entries(source)) {
    if (skipKeys?.includes(key))
      continue;
    if (!isObject(value2) || !(key in target) || isClass(value2)) {
      if (override || !(key in target))
        target[key] = value2;
      continue;
    }
    target[key] = mergeDeep(target[key], value2, { skipKeys, override });
  }
  return target;
};
var mergeCookie = (a, b) => {
  let { properties: _2, ...target } = a ?? {}, { properties: __, ...source } = b ?? {};
  return mergeDeep(target, source);
};
var mergeObjectArray = (a = [], b = []) => {
  if (!a)
    return [];
  if (!b)
    return a;
  let array3 = [], checksums = [];
  if (!Array.isArray(a))
    a = [a];
  if (!Array.isArray(b))
    b = [b];
  for (let item of a)
    if (array3.push(item), item.checksum)
      checksums.push(item.checksum);
  for (let item of b)
    if (!checksums.includes(item.checksum))
      array3.push(item);
  return array3;
};
var primitiveHooks = ["start", "request", "parse", "transform", "resolve", "beforeHandle", "afterHandle", "mapResponse", "afterResponse", "trace", "error", "stop", "body", "headers", "params", "query", "response", "type", "detail"];
var primitiveHookMap = primitiveHooks.reduce((acc, x) => (acc[x] = true, acc), {});
var mergeResponse = (a, b) => {
  let isRecordNumber = (x) => typeof x === "object" && Object.keys(x).every(isNumericString);
  if (isRecordNumber(a) && isRecordNumber(b))
    return { ...a, ...b };
  else if (a && !isRecordNumber(a) && isRecordNumber(b))
    return { 200: a, ...b };
  return b ?? a;
};
var mergeSchemaValidator = (a, b) => {
  return { body: b?.body ?? a?.body, headers: b?.headers ?? a?.headers, params: b?.params ?? a?.params, query: b?.query ?? a?.query, cookie: b?.cookie ?? a?.cookie, response: mergeResponse(a?.response, b?.response) };
};
var mergeHook = (a, b) => {
  return { ...a, ...b, body: b?.body ?? a?.body, headers: b?.headers ?? a?.headers, params: b?.params ?? a?.params, query: b?.query ?? a?.query, cookie: b?.cookie ?? a?.cookie, response: mergeResponse(a?.response, b?.response), type: a?.type || b?.type, detail: mergeDeep(b?.detail ?? {}, a?.detail ?? {}), parse: mergeObjectArray(a?.parse, b?.parse), transform: mergeObjectArray(a?.transform, b?.transform), beforeHandle: mergeObjectArray(a?.beforeHandle, b?.beforeHandle), afterHandle: mergeObjectArray(a?.afterHandle, b?.afterHandle), mapResponse: mergeObjectArray(a?.mapResponse, b?.mapResponse), afterResponse: mergeObjectArray(a?.afterResponse, b?.afterResponse), trace: mergeObjectArray(a?.trace, b?.trace), error: mergeObjectArray(a?.error, b?.error) };
};
var replaceSchemaType = (schema3, options, root = true) => {
  if (!Array.isArray(options))
    return _replaceSchemaType(schema3, options, root);
  for (let option of options)
    schema3 = _replaceSchemaType(schema3, option, root);
  return schema3;
};
var _replaceSchemaType = (schema3, options, root = true) => {
  if (!schema3)
    return schema3;
  if (options.untilObjectFound && !root && schema3.type === "object")
    return schema3;
  let fromSymbol = options.from[Kind];
  if (schema3.oneOf) {
    for (let i = 0;i < schema3.oneOf.length; i++)
      schema3.oneOf[i] = _replaceSchemaType(schema3.oneOf[i], options, root);
    return schema3;
  }
  if (schema3.anyOf) {
    for (let i = 0;i < schema3.anyOf.length; i++)
      schema3.anyOf[i] = _replaceSchemaType(schema3.anyOf[i], options, root);
    return schema3;
  }
  if (schema3.allOf) {
    for (let i = 0;i < schema3.allOf.length; i++)
      schema3.allOf[i] = _replaceSchemaType(schema3.allOf[i], options, root);
    return schema3;
  }
  if (schema3.not) {
    for (let i = 0;i < schema3.not.length; i++)
      schema3.not[i] = _replaceSchemaType(schema3.not[i], options, root);
    return schema3;
  }
  let isRoot = root && !!options.excludeRoot;
  if (schema3[Kind] === fromSymbol) {
    let { anyOf, oneOf, allOf, not: not3, properties: properties2, items, ...rest3 } = schema3, to = options.to(rest3), transform4, composeProperties = (v) => {
      if (properties2 && v.type === "object") {
        let newProperties = {};
        for (let [key, value22] of Object.entries(properties2))
          newProperties[key] = _replaceSchemaType(value22, options, false);
        return { ...rest3, ...v, properties: newProperties };
      }
      if (items && v.type === "array")
        return { ...rest3, ...v, items: _replaceSchemaType(items, options, false) };
      let value2 = { ...rest3, ...v };
      if (delete value2.required, properties2 && v.type === "string" && v.format === "ObjectString" && v.default === "{}")
        transform4 = t.ObjectString(properties2, rest3), value2.default = JSON.stringify(exports_value2.Create(t.Object(properties2))), value2.properties = properties2;
      if (items && v.type === "string" && v.format === "ArrayString" && v.default === "[]")
        transform4 = t.ArrayString(items, rest3), value2.default = JSON.stringify(exports_value2.Create(t.Array(items))), value2.items = items;
      return value2;
    };
    if (isRoot) {
      if (properties2) {
        let newProperties = {};
        for (let [key, value2] of Object.entries(properties2))
          newProperties[key] = _replaceSchemaType(value2, options, false);
        return { ...rest3, properties: newProperties };
      } else if (items?.map)
        return { ...rest3, items: items.map((v) => _replaceSchemaType(v, options, false)) };
      return rest3;
    }
    if (to.anyOf)
      for (let i = 0;i < to.anyOf.length; i++)
        to.anyOf[i] = composeProperties(to.anyOf[i]);
    else if (to.oneOf)
      for (let i = 0;i < to.oneOf.length; i++)
        to.oneOf[i] = composeProperties(to.oneOf[i]);
    else if (to.allOf)
      for (let i = 0;i < to.allOf.length; i++)
        to.allOf[i] = composeProperties(to.allOf[i]);
    else if (to.not)
      for (let i = 0;i < to.not.length; i++)
        to.not[i] = composeProperties(to.not[i]);
    if (transform4)
      to[TransformKind] = transform4[TransformKind];
    if (to.anyOf || to.oneOf || to.allOf || to.not)
      return to;
    if (properties2) {
      let newProperties = {};
      for (let [key, value2] of Object.entries(properties2))
        newProperties[key] = _replaceSchemaType(value2, options, false);
      return { ...rest3, ...to, properties: newProperties };
    } else if (items?.map)
      return { ...rest3, ...to, items: items.map((v) => _replaceSchemaType(v, options, false)) };
    return { ...rest3, ...to };
  }
  let properties = schema3?.properties;
  if (properties && root && options.rootOnly !== true)
    for (let [key, value2] of Object.entries(properties))
      switch (value2[Kind]) {
        case fromSymbol:
          let { anyOf, oneOf, allOf, not: not3, type: type3, ...rest3 } = value2, to = options.to(rest3);
          if (to.anyOf)
            for (let i = 0;i < to.anyOf.length; i++)
              to.anyOf[i] = { ...rest3, ...to.anyOf[i] };
          else if (to.oneOf)
            for (let i = 0;i < to.oneOf.length; i++)
              to.oneOf[i] = { ...rest3, ...to.oneOf[i] };
          else if (to.allOf)
            for (let i = 0;i < to.allOf.length; i++)
              to.allOf[i] = { ...rest3, ...to.allOf[i] };
          else if (to.not)
            for (let i = 0;i < to.not.length; i++)
              to.not[i] = { ...rest3, ...to.not[i] };
          properties[key] = { ...rest3, ..._replaceSchemaType(rest3, options, false) };
          break;
        case "Object":
        case "Union":
          properties[key] = _replaceSchemaType(value2, options, false);
          break;
        default:
          if (value2.items)
            for (let i = 0;i < value2.items.length; i++)
              value2.items[i] = _replaceSchemaType(value2.items[i], options, false);
          else if (value2.anyOf || value2.oneOf || value2.allOf || value2.not)
            properties[key] = _replaceSchemaType(value2, options, false);
          break;
      }
  return schema3;
};
var createCleaner = (schema3) => (value2) => {
  if (typeof value2 === "object")
    try {
      return exports_value2.Clean(schema3, structuredClone(value2));
    } catch {
      try {
        return exports_value2.Clean(schema3, value2);
      } catch {
        return value2;
      }
    }
  return value2;
};
var getSchemaValidator = (s, { models = {}, dynamic = false, normalize = false, additionalProperties = false, coerce = false, additionalCoerce = [] } = {}) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  let schema3 = typeof s === "string" ? models[s] : s;
  if (coerce || additionalCoerce)
    if (coerce)
      schema3 = replaceSchemaType(schema3, [{ from: t.Number(), to: (options) => t.Numeric(options), untilObjectFound: true }, { from: t.Boolean(), to: (options) => t.BooleanString(options), untilObjectFound: true }, ...Array.isArray(additionalCoerce) ? additionalCoerce : [additionalCoerce]]);
    else
      schema3 = replaceSchemaType(schema3, [...Array.isArray(additionalCoerce) ? additionalCoerce : [additionalCoerce]]);
  if (schema3.type === "object" && "additionalProperties" in schema3 === false)
    schema3.additionalProperties = additionalProperties;
  if (dynamic) {
    let validator = { schema: schema3, references: "", checkFunc: () => {
    }, code: "", Check: (value2) => exports_value2.Check(schema3, value2), Errors: (value2) => exports_value2.Errors(schema3, value2), Code: () => "", Clean: createCleaner(schema3), Decode: (value2) => exports_value2.Decode(schema3, value2), Encode: (value2) => exports_value2.Encode(schema3, value2) };
    if (normalize && schema3.additionalProperties === false)
      validator.Clean = createCleaner(schema3);
    if (schema3.config) {
      if (validator.config = schema3.config, validator?.schema?.config)
        delete validator.schema.config;
    }
    return validator.parse = (v) => {
      try {
        return validator.Decode(v);
      } catch (error3) {
        throw [...validator.Errors(v)].map(mapValueError);
      }
    }, validator.safeParse = (v) => {
      try {
        return { success: true, data: validator.Decode(v), error: null };
      } catch (error3) {
        let errors2 = [...compiled.Errors(v)].map(mapValueError);
        return { success: false, data: null, error: errors2[0]?.summary, errors: errors2 };
      }
    }, validator;
  }
  let compiled = TypeCompiler.Compile(schema3, Object.values(models));
  if (compiled.Clean = createCleaner(schema3), schema3.config) {
    if (compiled.config = schema3.config, compiled?.schema?.config)
      delete compiled.schema.config;
  }
  return compiled.parse = (v) => {
    try {
      return compiled.Decode(v);
    } catch (error3) {
      throw [...compiled.Errors(v)].map(mapValueError);
    }
  }, compiled.safeParse = (v) => {
    try {
      return { success: true, data: compiled.Decode(v), error: null };
    } catch (error3) {
      let errors2 = [...compiled.Errors(v)].map(mapValueError);
      return { success: false, data: null, error: errors2[0]?.summary, errors: errors2 };
    }
  }, compiled;
};
var getResponseSchemaValidator = (s, { models = {}, dynamic = false, normalize = false, additionalProperties = false }) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  let maybeSchemaOrRecord = typeof s === "string" ? models[s] : s, compile = (schema3, references) => {
    if (dynamic)
      return { schema: schema3, references: "", checkFunc: () => {
      }, code: "", Check: (value2) => exports_value2.Check(schema3, value2), Errors: (value2) => exports_value2.Errors(schema3, value2), Code: () => "", Clean: createCleaner(schema3), Decode: (value2) => exports_value2.Decode(schema3, value2), Encode: (value2) => exports_value2.Encode(schema3, value2) };
    let compiledValidator = TypeCompiler.Compile(schema3, references);
    if (normalize && schema3.additionalProperties === false)
      compiledValidator.Clean = createCleaner(schema3);
    return compiledValidator;
  };
  if (Kind in maybeSchemaOrRecord) {
    if ("additionalProperties" in maybeSchemaOrRecord === false)
      maybeSchemaOrRecord.additionalProperties = additionalProperties;
    return { 200: compile(maybeSchemaOrRecord, Object.values(models)) };
  }
  let record3 = {};
  return Object.keys(maybeSchemaOrRecord).forEach((status) => {
    let maybeNameOrSchema = maybeSchemaOrRecord[+status];
    if (typeof maybeNameOrSchema === "string") {
      if (maybeNameOrSchema in models) {
        let schema3 = models[maybeNameOrSchema];
        schema3.type === "object" && "additionalProperties" in schema3, record3[+status] = Kind in schema3 ? compile(schema3, Object.values(models)) : schema3;
      }
      return;
    }
    if (maybeNameOrSchema.type === "object" && "additionalProperties" in maybeNameOrSchema === false)
      maybeNameOrSchema.additionalProperties = additionalProperties;
    record3[+status] = Kind in maybeNameOrSchema ? compile(maybeNameOrSchema, Object.values(models)) : maybeNameOrSchema;
  }), record3;
};
var isBun = typeof Bun !== "undefined";
var hasHash = isBun && typeof Bun.hash === "function";
var checksum = (s) => {
  if (hasHash)
    return Bun.hash(s);
  let h = 9;
  for (let i = 0;i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 387420489);
  return h = h ^ h >>> 9;
};
var _stringToStructureCoercions;
var stringToStructureCoercions = () => {
  if (!_stringToStructureCoercions)
    _stringToStructureCoercions = [{ from: t.Object({}), to: () => t.ObjectString({}), excludeRoot: true }, { from: t.Array(t.Any()), to: () => t.ArrayString(t.Any()) }];
  return _stringToStructureCoercions;
};
var _coercePrimitiveRoot;
var coercePrimitiveRoot = () => {
  if (!_coercePrimitiveRoot)
    _coercePrimitiveRoot = [{ from: t.Number(), to: (options) => t.Numeric(options), rootOnly: true }, { from: t.Boolean(), to: (options) => t.BooleanString(options), rootOnly: true }];
  return _coercePrimitiveRoot;
};
var getCookieValidator = ({ validator, defaultConfig = {}, config, dynamic, models }) => {
  let cookieValidator = getSchemaValidator(validator, { dynamic, models, additionalProperties: true, coerce: true, additionalCoerce: stringToStructureCoercions() });
  if (isNotEmpty(defaultConfig))
    if (cookieValidator)
      cookieValidator.config = mergeCookie(cookieValidator.config, config);
    else
      cookieValidator = getSchemaValidator(t.Cookie({}), { dynamic, models, additionalProperties: true }), cookieValidator.config = defaultConfig;
  return cookieValidator;
};
var injectChecksum = (checksum2, x) => {
  if (!x)
    return;
  if (!Array.isArray(x)) {
    let fn = x;
    if (checksum2 && !fn.checksum)
      fn.checksum = checksum2;
    if (fn.scope === "scoped")
      fn.scope = "local";
    return fn;
  }
  let fns = [...x];
  for (let fn of fns) {
    if (checksum2 && !fn.checksum)
      fn.checksum = checksum2;
    if (fn.scope === "scoped")
      fn.scope = "local";
  }
  return fns;
};
var mergeLifeCycle = (a, b, checksum2) => {
  return { start: mergeObjectArray(a.start, injectChecksum(checksum2, b?.start)), request: mergeObjectArray(a.request, injectChecksum(checksum2, b?.request)), parse: mergeObjectArray(a.parse, injectChecksum(checksum2, b?.parse)), transform: mergeObjectArray(a.transform, injectChecksum(checksum2, b?.transform)), beforeHandle: mergeObjectArray(a.beforeHandle, injectChecksum(checksum2, b?.beforeHandle)), afterHandle: mergeObjectArray(a.afterHandle, injectChecksum(checksum2, b?.afterHandle)), mapResponse: mergeObjectArray(a.mapResponse, injectChecksum(checksum2, b?.mapResponse)), afterResponse: mergeObjectArray(a.afterResponse, injectChecksum(checksum2, b?.afterResponse)), trace: mergeObjectArray(a.trace, injectChecksum(checksum2, b?.trace)), error: mergeObjectArray(a.error, injectChecksum(checksum2, b?.error)), stop: mergeObjectArray(a.stop, injectChecksum(checksum2, b?.stop)) };
};
var asHookType = (fn, inject, { skipIfHasType = false } = {}) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn)) {
    if (skipIfHasType)
      fn.scope ??= inject;
    else
      fn.scope = inject;
    return fn;
  }
  for (let x of fn)
    if (skipIfHasType)
      x.scope ??= inject;
    else
      x.scope = inject;
  return fn;
};
var filterGlobal = (fn) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn))
    switch (fn.scope) {
      case "global":
      case "scoped":
        return { ...fn };
      default:
        return { fn };
    }
  let array3 = [];
  for (let x of fn)
    switch (x.scope) {
      case "global":
      case "scoped":
        array3.push({ ...x });
        break;
    }
  return array3;
};
var filterGlobalHook = (hook) => {
  return { ...hook, type: hook?.type, detail: hook?.detail, parse: filterGlobal(hook?.parse), transform: filterGlobal(hook?.transform), beforeHandle: filterGlobal(hook?.beforeHandle), afterHandle: filterGlobal(hook?.afterHandle), mapResponse: filterGlobal(hook?.mapResponse), afterResponse: filterGlobal(hook?.afterResponse), error: filterGlobal(hook?.error), trace: filterGlobal(hook?.trace) };
};
var StatusMap = { Continue: 100, "Switching Protocols": 101, Processing: 102, "Early Hints": 103, OK: 200, Created: 201, Accepted: 202, "Non-Authoritative Information": 203, "No Content": 204, "Reset Content": 205, "Partial Content": 206, "Multi-Status": 207, "Already Reported": 208, "Multiple Choices": 300, "Moved Permanently": 301, Found: 302, "See Other": 303, "Not Modified": 304, "Temporary Redirect": 307, "Permanent Redirect": 308, "Bad Request": 400, Unauthorized: 401, "Payment Required": 402, Forbidden: 403, "Not Found": 404, "Method Not Allowed": 405, "Not Acceptable": 406, "Proxy Authentication Required": 407, "Request Timeout": 408, Conflict: 409, Gone: 410, "Length Required": 411, "Precondition Failed": 412, "Payload Too Large": 413, "URI Too Long": 414, "Unsupported Media Type": 415, "Range Not Satisfiable": 416, "Expectation Failed": 417, "I'm a teapot": 418, "Misdirected Request": 421, "Unprocessable Content": 422, Locked: 423, "Failed Dependency": 424, "Too Early": 425, "Upgrade Required": 426, "Precondition Required": 428, "Too Many Requests": 429, "Request Header Fields Too Large": 431, "Unavailable For Legal Reasons": 451, "Internal Server Error": 500, "Not Implemented": 501, "Bad Gateway": 502, "Service Unavailable": 503, "Gateway Timeout": 504, "HTTP Version Not Supported": 505, "Variant Also Negotiates": 506, "Insufficient Storage": 507, "Loop Detected": 508, "Not Extended": 510, "Network Authentication Required": 511 };
var InvertedStatusMap = Object.fromEntries(Object.entries(StatusMap).map(([k, v]) => [v, k]));
function removeTrailingEquals(digest) {
  let trimmedDigest = digest;
  while (trimmedDigest.endsWith("="))
    trimmedDigest = trimmedDigest.slice(0, -1);
  return trimmedDigest;
}
var encoder = new TextEncoder;
var signCookie = async (val, secret) => {
  if (typeof val !== "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  let secretKey = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), hmacBuffer = await crypto.subtle.sign("HMAC", secretKey, encoder.encode(val));
  return val + "." + removeTrailingEquals(Buffer.from(hmacBuffer).toString("base64"));
};
var unsignCookie = async (input, secret) => {
  if (typeof input !== "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  let tentativeValue = input.slice(0, input.lastIndexOf("."));
  return await signCookie(tentativeValue, secret) === input ? tentativeValue : false;
};
var traceBackMacro = (extension, property) => {
  if (!extension || typeof extension !== "object" || !property)
    return;
  for (let [key, value2] of Object.entries(property)) {
    if (key in primitiveHookMap || !(key in extension))
      continue;
    let v = extension[key];
    if (typeof v === "function")
      v(value2), delete property[key];
  }
};
var createMacroManager = ({ globalHook, localHook }) => (stackName) => (type3, fn) => {
  if (typeof type3 === "function")
    type3 = { fn: type3 };
  if ("fn" in type3 || Array.isArray(type3)) {
    if (!localHook[stackName])
      localHook[stackName] = [];
    if (typeof localHook[stackName] === "function")
      localHook[stackName] = [localHook[stackName]];
    if (Array.isArray(type3))
      localHook[stackName] = localHook[stackName].concat(type3);
    else
      localHook[stackName].push(type3);
    return;
  }
  let { insert = "after", stack = "local" } = type3;
  if (typeof fn === "function")
    fn = { fn };
  if (stack === "global")
    if (!Array.isArray(fn))
      if (insert === "before")
        globalHook[stackName].unshift(fn);
      else
        globalHook[stackName].push(fn);
    else if (insert === "before")
      globalHook[stackName] = fn.concat(globalHook[stackName]);
    else
      globalHook[stackName] = globalHook[stackName].concat(fn);
  else {
    if (!localHook[stackName])
      localHook[stackName] = [];
    if (typeof localHook[stackName] === "function")
      localHook[stackName] = [localHook[stackName]];
    if (!Array.isArray(fn))
      if (insert === "before")
        localHook[stackName].unshift(fn);
      else
        localHook[stackName].push(fn);
    else if (insert === "before")
      localHook[stackName] = fn.concat(localHook[stackName]);
    else
      localHook[stackName] = localHook[stackName].concat(fn);
  }
};
var parseNumericString = (message) => {
  if (typeof message === "number")
    return message;
  if (message.length < 16) {
    if (message.trim().length === 0)
      return null;
    let length = Number(message);
    if (Number.isNaN(length))
      return null;
    return length;
  }
  if (message.length === 16) {
    if (message.trim().length === 0)
      return null;
    let number3 = Number(message);
    if (Number.isNaN(number3) || number3.toString() !== message)
      return null;
    return number3;
  }
  return null;
};
var isNumericString = (message) => parseNumericString(message) !== null;

class PromiseGroup {
  onError;
  root = null;
  promises = [];
  constructor(onError = console.error) {
    this.onError = onError;
  }
  get size() {
    return this.promises.length;
  }
  add(promise3) {
    return this.promises.push(promise3), this.root ||= this.drain(), promise3;
  }
  async drain() {
    while (this.promises.length > 0) {
      try {
        await this.promises[0];
      } catch (error3) {
        this.onError(error3);
      }
      this.promises.shift();
    }
    this.root = null;
  }
  then(onfulfilled, onrejected) {
    return (this.root ?? Promise.resolve()).then(onfulfilled, onrejected);
  }
}
var fnToContainer = (fn) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn)) {
    if (typeof fn === "function")
      return { fn };
    else if ("fn" in fn)
      return fn;
  }
  let fns = [];
  for (let x of fn)
    if (typeof x === "function")
      fns.push({ fn: x });
    else if ("fn" in x)
      fns.push(x);
  return fns;
};
var localHookToLifeCycleStore = (a) => {
  return { ...a, start: fnToContainer(a?.start), request: fnToContainer(a?.request), parse: fnToContainer(a?.parse), transform: fnToContainer(a?.transform), beforeHandle: fnToContainer(a?.beforeHandle), afterHandle: fnToContainer(a?.afterHandle), mapResponse: fnToContainer(a?.mapResponse), afterResponse: fnToContainer(a?.afterResponse), trace: fnToContainer(a?.trace), error: fnToContainer(a?.error), stop: fnToContainer(a?.stop) };
};
var lifeCycleToFn = (a) => {
  return { ...a, start: a.start?.map((x) => x.fn), request: a.request?.map((x) => x.fn), parse: a.parse?.map((x) => x.fn), transform: a.transform?.map((x) => x.fn), beforeHandle: a.beforeHandle?.map((x) => x.fn), afterHandle: a.afterHandle?.map((x) => x.fn), afterResponse: a.afterResponse?.map((x) => x.fn), mapResponse: a.mapResponse?.map((x) => x.fn), trace: a.trace?.map((x) => x.fn), error: a.error?.map((x) => x.fn), stop: a.stop?.map((x) => x.fn) };
};
var cloneInference = (inference) => ({ body: inference.body, cookie: inference.cookie, headers: inference.headers, query: inference.query, set: inference.set, server: inference.server });
var redirect = (url, status = 302) => Response.redirect(url, status);
var ELYSIA_FORM_DATA = Symbol("ElysiaFormData");
var ELYSIA_REQUEST_ID = Symbol("ElysiaRequestId");
var randomId = () => crypto.getRandomValues(new Uint32Array(1))[0];
var deduplicateChecksum = (array3) => {
  let hashes = [];
  for (let i = 0;i < array3.length; i++) {
    let item = array3[i];
    if (item.checksum) {
      if (hashes.includes(item.checksum))
        array3.splice(i, 1), i--;
      hashes.push(item.checksum);
    }
  }
  return array3;
};
var promoteEvent = (events, as = "scoped") => {
  if (as === "scoped") {
    for (let event of events)
      if ("scope" in event && event.scope === "local")
        event.scope = "scoped";
    return;
  }
  for (let event of events)
    if ("scope" in event)
      event.scope = "global";
};
var env = typeof Bun !== "undefined" ? Bun.env : typeof process !== "undefined" ? process?.env : undefined;
var ERROR_CODE = Symbol("ElysiaErrorCode");
var isProduction = (env?.NODE_ENV ?? env?.ENV) === "production";

class ElysiaCustomStatusResponse {
  code;
  response;
  constructor(code, response) {
    let res = response ?? (code in InvertedStatusMap ? InvertedStatusMap[code] : code);
    this.code = StatusMap[code] ?? code, this.response = res;
  }
}
var error3 = (code, response) => new ElysiaCustomStatusResponse(code, response);

class InternalServerError extends Error {
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(message) {
    super(message ?? "INTERNAL_SERVER_ERROR");
  }
}

class NotFoundError extends Error {
  code = "NOT_FOUND";
  status = 404;
  constructor(message) {
    super(message ?? "NOT_FOUND");
  }
}

class ParseError extends Error {
  code = "PARSE";
  status = 400;
  constructor() {
    super("Failed to parse body");
  }
}

class InvalidCookieSignature extends Error {
  key;
  code = "INVALID_COOKIE_SIGNATURE";
  status = 400;
  constructor(key, message) {
    super(message ?? `"${key}" has invalid cookie signature`);
    this.key = key;
  }
}
var mapValueError = (error22) => {
  if (!error22)
    return { summary: undefined };
  let { message, path, value: value2, type: type3 } = error22, property = path.slice(1).replaceAll("/", "."), isRoot = path === "";
  switch (type3) {
    case 42:
      return { ...error22, summary: isRoot ? "Value should not be provided" : `Property '${property}' should not be provided` };
    case 45:
      return { ...error22, summary: isRoot ? "Value is missing" : `Property '${property}' is missing` };
    case 50:
      let quoteIndex = message.indexOf("'"), format = message.slice(quoteIndex + 1, message.indexOf("'", quoteIndex + 1));
      return { ...error22, summary: isRoot ? "Value should be an email" : `Property '${property}' should be ${format}` };
    case 54:
      return { ...error22, summary: `${message.slice(0, 9)} property '${property}' to be ${message.slice(8)} but found: ${value2}` };
    case 62:
      let union4 = error22.schema.anyOf.map((x) => `'${x?.format ?? x.type}'`).join(", ");
      return { ...error22, summary: isRoot ? `Value should be one of ${union4}` : `Property '${property}' should be one of: ${union4}` };
    default:
      return { summary: message, ...error22 };
  }
};

class ValidationError extends Error {
  type;
  validator;
  value;
  code = "VALIDATION";
  status = 422;
  constructor(type3, validator, value2) {
    if (value2 && typeof value2 === "object" && value2 instanceof ElysiaCustomStatusResponse)
      value2 = value2.response;
    let error22 = isProduction ? undefined : ("Errors" in validator) ? validator.Errors(value2).First() : exports_value2.Errors(validator, value2).First(), customError = error22?.schema.error !== undefined ? typeof error22.schema.error === "function" ? error22.schema.error({ type: type3, validator, value: value2, get errors() {
      return [...validator.Errors(value2)].map(mapValueError);
    } }) : error22.schema.error : undefined, accessor = error22?.path || "root", message = "";
    if (customError !== undefined)
      message = typeof customError === "object" ? JSON.stringify(customError) : customError + "";
    else if (isProduction)
      message = JSON.stringify({ type: "validation", on: type3, summary: mapValueError(error22).summary, message: error22?.message, found: value2 });
    else {
      let schema3 = validator?.schema ?? validator, errors2 = "Errors" in validator ? [...validator.Errors(value2)].map(mapValueError) : [...exports_value2.Errors(validator, value2)].map(mapValueError), expected;
      try {
        expected = exports_value2.Create(schema3);
      } catch (error32) {
        expected = { type: "Could not create expected value", message: error32?.message, error: error32 };
      }
      message = JSON.stringify({ type: "validation", on: type3, summary: errors2[0]?.summary, property: accessor, message: error22?.message, expected, found: value2, errors: errors2 }, null, 2);
    }
    super(message);
    this.type = type3;
    this.validator = validator;
    this.value = value2;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
  get all() {
    return "Errors" in this.validator ? [...this.validator.Errors(this.value)].map(mapValueError) : [...exports_value2.Errors(this.validator, this.value)].map(mapValueError);
  }
  static simplifyModel(validator) {
    let model = "schema" in validator ? validator.schema : validator;
    try {
      return exports_value2.Create(model);
    } catch {
      return model;
    }
  }
  get model() {
    return ValidationError.simplifyModel(this.validator);
  }
  toResponse(headers) {
    return new Response(this.message, { status: 400, headers: { ...headers, "content-type": "application/json" } });
  }
}
var websocket = { open(ws) {
  ws.data.open?.(ws);
}, message(ws, message) {
  ws.data.message?.(ws, message);
}, drain(ws) {
  ws.data.drain?.(ws);
}, close(ws, code, reason) {
  ws.data.close?.(ws, code, reason);
} };

class ElysiaWS {
  raw;
  data;
  validator;
  _validator;
  constructor(raw, data) {
    this.raw = raw;
    this.data = data;
    if (this.validator = raw.data.validator, raw.data.id)
      this.id = raw.data.id;
    else
      this.id = randomId().toString();
  }
  get id() {
    return this.raw.data.id;
  }
  set id(newID) {
    this.raw.data.id = newID;
  }
  get publish() {
    return (topic, data = undefined, compress) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (typeof data === "object")
        data = JSON.stringify(data);
      return this.raw.publish(topic, data, compress), this;
    };
  }
  get send() {
    return (data) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (Buffer.isBuffer(data))
        return this.raw.send(data), this;
      if (typeof data === "object")
        data = JSON.stringify(data);
      return this.raw.send(data), this;
    };
  }
  get subscribe() {
    return (room) => {
      return this.raw.subscribe(room), this;
    };
  }
  get unsubscribe() {
    return (room) => {
      return this.raw.unsubscribe(room), this;
    };
  }
  get cork() {
    return (callback) => {
      return this.raw.cork(callback), this;
    };
  }
  get close() {
    return () => {
      return this.raw.close(), this;
    };
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
}
var version = "1.1.25";
var import_fast_decode_uri_component2 = __toESM2(require_fast_decode_uri_component(), 1);
var plusRegex = /\+/g;
function parseQueryFromURL(input) {
  let result = {};
  if (typeof input !== "string")
    return result;
  let key = "", value2 = "", startingIndex = -1, equalityIndex = -1, flags = 0, l = input.length;
  for (let i = 0;i < l; i++)
    switch (input.charCodeAt(i)) {
      case 38:
        let hasBothKeyValuePair = equalityIndex > startingIndex;
        if (!hasBothKeyValuePair)
          equalityIndex = i;
        if (key = input.slice(startingIndex + 1, equalityIndex), hasBothKeyValuePair || key.length > 0) {
          if (flags & 1)
            key = key.replace(plusRegex, " ");
          if (flags & 2)
            key = import_fast_decode_uri_component2.default(key) || key;
          if (!result[key]) {
            if (hasBothKeyValuePair) {
              if (value2 = input.slice(equalityIndex + 1, i), flags & 4)
                value2 = value2.replace(plusRegex, " ");
              if (flags & 8)
                value2 = import_fast_decode_uri_component2.default(value2) || value2;
            }
            result[key] = value2;
          }
        }
        key = "", value2 = "", startingIndex = i, equalityIndex = i, flags = 0;
        break;
      case 61:
        if (equalityIndex <= startingIndex)
          equalityIndex = i;
        else
          flags |= 8;
        break;
      case 43:
        if (equalityIndex > startingIndex)
          flags |= 4;
        else
          flags |= 1;
        break;
      case 37:
        if (equalityIndex > startingIndex)
          flags |= 8;
        else
          flags |= 2;
        break;
    }
  if (startingIndex < l) {
    let hasBothKeyValuePair = equalityIndex > startingIndex;
    if (key = input.slice(startingIndex + 1, hasBothKeyValuePair ? equalityIndex : l), hasBothKeyValuePair || key.length > 0) {
      if (flags & 1)
        key = key.replace(plusRegex, " ");
      if (flags & 2)
        key = import_fast_decode_uri_component2.default(key) || key;
      if (!result[key]) {
        if (hasBothKeyValuePair) {
          if (value2 = input.slice(equalityIndex + 1, l), flags & 4)
            value2 = value2.replace(plusRegex, " ");
          if (flags & 8)
            value2 = import_fast_decode_uri_component2.default(value2) || value2;
        }
        result[key] = value2;
      }
    }
  }
  return result;
}
var parseQuery = (input) => {
  let result = {};
  if (typeof input !== "string")
    return result;
  let inputLength = input.length, key = "", value2 = "", startingIndex = -1, equalityIndex = -1, shouldDecodeKey = false, shouldDecodeValue = false, keyHasPlus = false, valueHasPlus = false, hasBothKeyValuePair = false, c = 0;
  for (let i = 0;i < inputLength + 1; i++) {
    if (i !== inputLength)
      c = input.charCodeAt(i);
    else
      c = 38;
    switch (c) {
      case 38: {
        if (hasBothKeyValuePair = equalityIndex > startingIndex, !hasBothKeyValuePair)
          equalityIndex = i;
        if (key = input.slice(startingIndex + 1, equalityIndex), hasBothKeyValuePair || key.length > 0) {
          if (keyHasPlus)
            key = key.replace(plusRegex, " ");
          if (shouldDecodeKey)
            key = import_fast_decode_uri_component2.default(key) || key;
          if (hasBothKeyValuePair) {
            if (value2 = input.slice(equalityIndex + 1, i), valueHasPlus)
              value2 = value2.replace(plusRegex, " ");
            if (shouldDecodeValue)
              value2 = import_fast_decode_uri_component2.default(value2) || value2;
          }
          let currentValue = result[key];
          if (currentValue === undefined)
            result[key] = value2;
          else if (currentValue.pop)
            currentValue.push(value2);
          else
            result[key] = [currentValue, value2];
        }
        value2 = "", startingIndex = i, equalityIndex = i, shouldDecodeKey = false, shouldDecodeValue = false, keyHasPlus = false, valueHasPlus = false;
        break;
      }
      case 61:
        if (equalityIndex <= startingIndex)
          equalityIndex = i;
        else
          shouldDecodeValue = true;
        break;
      case 43:
        if (equalityIndex > startingIndex)
          valueHasPlus = true;
        else
          keyHasPlus = true;
        break;
      case 37:
        if (equalityIndex > startingIndex)
          shouldDecodeValue = true;
        else
          shouldDecodeKey = true;
        break;
    }
  }
  return result;
};
var import_fast_decode_uri_component3 = __toESM2(require_fast_decode_uri_component(), 1);
var ELYSIA_TRACE = Symbol("ElysiaTrace");
var createProcess = () => {
  let { promise: promise3, resolve } = Promise.withResolvers(), { promise: end, resolve: resolveEnd } = Promise.withResolvers(), { promise: error22, resolve: resolveError } = Promise.withResolvers(), callbacks = [], callbacksEnd = [];
  return [(callback) => {
    if (callback)
      callbacks.push(callback);
    return promise3;
  }, (process2) => {
    let processes = [], resolvers = [], groupError = null;
    for (let i = 0;i < (process2.total ?? 0); i++) {
      let { promise: promise22, resolve: resolve2 } = Promise.withResolvers(), { promise: end2, resolve: resolveEnd2 } = Promise.withResolvers(), { promise: error32, resolve: resolveError2 } = Promise.withResolvers(), callbacks2 = [], callbacksEnd2 = [];
      processes.push((callback) => {
        if (callback)
          callbacks2.push(callback);
        return promise22;
      }), resolvers.push((process3) => {
        let result2 = { ...process3, end: end2, error: error32, index: i, onStop(callback) {
          if (callback)
            callbacksEnd2.push(callback);
          return end2;
        } };
        resolve2(result2);
        for (let i2 = 0;i2 < callbacks2.length; i2++)
          callbacks2[i2](result2);
        return (error4 = null) => {
          let end3 = performance.now();
          if (error4)
            groupError = error4;
          let detail = { end: end3, error: error4, get elapsed() {
            return end3 - process3.begin;
          } };
          for (let i2 = 0;i2 < callbacksEnd2.length; i2++)
            callbacksEnd2[i2](detail);
          resolveEnd2(end3), resolveError2(error4);
        };
      });
    }
    let result = { ...process2, end, error: error22, onEvent(callback) {
      for (let i = 0;i < processes.length; i++)
        processes[i](callback);
    }, onStop(callback) {
      if (callback)
        callbacksEnd.push(callback);
      return end;
    } };
    resolve(result);
    for (let i = 0;i < callbacks.length; i++)
      callbacks[i](result);
    return { resolveChild: resolvers, resolve(error32 = null) {
      let end2 = performance.now();
      if (!error32 && groupError)
        error32 = groupError;
      let detail = { end: end2, error: error32, get elapsed() {
        return end2 - process2.begin;
      } };
      for (let i = 0;i < callbacksEnd.length; i++)
        callbacksEnd[i](detail);
      resolveEnd(end2), resolveError(error32);
    } };
  }];
};
var createTracer = (traceListener) => {
  return (context) => {
    let [onRequest, resolveRequest] = createProcess(), [onParse, resolveParse] = createProcess(), [onTransform, resolveTransform] = createProcess(), [onBeforeHandle, resolveBeforeHandle] = createProcess(), [onHandle, resolveHandle] = createProcess(), [onAfterHandle, resolveAfterHandle] = createProcess(), [onError, resolveError] = createProcess(), [onMapResponse, resolveMapResponse] = createProcess(), [onAfterResponse, resolveAfterResponse] = createProcess();
    return traceListener({ id: context[ELYSIA_REQUEST_ID], context, set: context.set, onRequest, onParse, onTransform, onBeforeHandle, onHandle, onAfterHandle, onMapResponse, onAfterResponse, onError }), { request: resolveRequest, parse: resolveParse, transform: resolveTransform, beforeHandle: resolveBeforeHandle, handle: resolveHandle, afterHandle: resolveAfterHandle, error: resolveError, mapResponse: resolveMapResponse, afterResponse: resolveAfterResponse };
  };
};
var headersHasToJSON = new Headers().toJSON;
var TypeBoxSymbol = { optional: Symbol.for("TypeBox.Optional"), kind: Symbol.for("TypeBox.Kind") };
var isOptional = (validator) => {
  if (!validator)
    return false;
  let schema3 = validator?.schema;
  return !!schema3 && TypeBoxSymbol.optional in schema3;
};
var hasAdditionalProperties = (_schema) => {
  if (!_schema)
    return false;
  let schema3 = _schema?.schema ?? _schema;
  if (schema3.anyOf)
    return schema3.anyOf.some(hasAdditionalProperties);
  if (schema3.someOf)
    return schema3.someOf.some(hasAdditionalProperties);
  if (schema3.allOf)
    return schema3.allOf.some(hasAdditionalProperties);
  if (schema3.not)
    return schema3.not.some(hasAdditionalProperties);
  if (schema3.type === "object") {
    let properties = schema3.properties;
    if ("additionalProperties" in schema3)
      return schema3.additionalProperties;
    if ("patternProperties" in schema3)
      return false;
    for (let key of Object.keys(properties)) {
      let property = properties[key];
      if (property.type === "object") {
        if (hasAdditionalProperties(property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++)
          if (hasAdditionalProperties(property.anyOf[i]))
            return true;
      }
      return property.additionalProperties;
    }
    return false;
  }
  return false;
};
var createReport = ({ context = "c", trace, addFn }) => {
  if (!trace.length)
    return () => {
      return { resolveChild() {
        return () => {
        };
      }, resolve() {
      } };
    };
  for (let i = 0;i < trace.length; i++)
    addFn(`let report${i}, reportChild${i}, reportErr${i}, reportErrChild${i}; let trace${i} = ${context}[ELYSIA_TRACE]?.[${i}] ?? trace[${i}](${context});
`);
  return (event, { name, total = 0 } = {}) => {
    if (!name)
      name = "anonymous";
    let reporter = event === "error" ? "reportErr" : "report";
    for (let i = 0;i < trace.length; i++)
      addFn(`
${reporter}${i} = trace${i}.${event}({id,event: '${event}',name: '${name}',begin: performance.now(),total: ${total}})
`);
    return { resolve() {
      for (let i = 0;i < trace.length; i++)
        addFn(`
${reporter}${i}.resolve()
`);
    }, resolveChild(name2) {
      for (let i = 0;i < trace.length; i++)
        addFn(`${reporter}Child${i} = ${reporter}${i}.resolveChild?.shift()?.({id,event: '${event}',name: '${name2}',begin: performance.now()})
`);
      return (binding) => {
        for (let i = 0;i < trace.length; i++)
          if (binding)
            addFn(`
                             \tif (${binding} instanceof Error)
                    \t\t\t\t${reporter}Child${i}?.(${binding})
                           \t\telse
                             \t\t${reporter}Child${i}?.()
`);
          else
            addFn(`${reporter}Child${i}?.()
`);
      };
    } };
  };
};
var composeValidationFactory = ({ injectResponse = "", normalize = false, validator }) => ({ composeValidation: (type3, value2 = `c.${type3}`) => `c.set.status = 422; throw new ValidationError('${type3}', validator.${type3}, ${value2})`, composeResponseValidation: (name = "r") => {
  let code = `
` + injectResponse + `
`;
  code += `if(${name} instanceof ElysiaCustomStatusResponse) {
\t\t\tc.set.status = ${name}.code
\t\t\t${name} = ${name}.response
\t\t}

\t\tconst isResponse = ${name} instanceof Response

`, code += `switch(c.set.status) {
`;
  for (let [status, value2] of Object.entries(validator.response)) {
    if (code += `\tcase ${status}:
\t\t\t\tif (!isResponse) {
`, normalize && "Clean" in value2 && !hasAdditionalProperties(value2))
      code += `${name} = validator.response['${status}'].Clean(${name})
`;
    code += `if(validator.response['${status}'].Check(${name}) === false) {
\t\t\t\t\tc.set.status = 422

\t\t\t\t\tthrow new ValidationError('response', validator.response['${status}'], ${name})
\t\t\t\t}

\t\t\t\tc.set.status = ${status}
\t\t\t}

\t\t\tbreak

`;
  }
  return code += `
}
`, code;
} });
var KindSymbol = Symbol.for("TypeBox.Kind");
var hasProperty = (expectedProperty, schema3) => {
  if (!schema3)
    return;
  if (schema3.type === "object") {
    let properties = schema3.properties;
    if (!properties)
      return false;
    for (let key of Object.keys(properties)) {
      let property = properties[key];
      if (expectedProperty in property)
        return true;
      if (property.type === "object") {
        if (hasProperty(expectedProperty, property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++)
          if (hasProperty(expectedProperty, property.anyOf[i]))
            return true;
      }
    }
    return false;
  }
  return expectedProperty in schema3;
};
var TransformSymbol = Symbol.for("TypeBox.Transform");
var hasTransform = (schema3) => {
  if (!schema3)
    return;
  if (schema3.type === "object" && schema3.properties) {
    let properties = schema3.properties;
    for (let key of Object.keys(properties)) {
      let property = properties[key];
      if (property.type === "object") {
        if (hasTransform(property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++)
          if (hasTransform(property.anyOf[i]))
            return true;
      }
      if (TransformSymbol in property)
        return true;
    }
    return false;
  }
  return TransformSymbol in schema3 || schema3.properties && TransformSymbol in schema3.properties;
};
var matchFnReturn = /(?:return|=>) \S+\(/g;
var isAsyncName = (v) => {
  return (v?.fn ?? v).constructor.name === "AsyncFunction";
};
var isAsync = (v) => {
  let fn = v?.fn ?? v;
  if (fn.constructor.name === "AsyncFunction")
    return true;
  let literal3 = fn.toString();
  if (literal3.includes("=> response.clone("))
    return false;
  if (literal3.includes("await"))
    return true;
  if (literal3.includes("async"))
    return true;
  return !!literal3.match(matchFnReturn);
};
var isGenerator = (v) => {
  let fn = v?.fn ?? v;
  return fn.constructor.name === "AsyncGeneratorFunction" || fn.constructor.name === "GeneratorFunction";
};
var composeHandler = ({ app, path, method, localHook, hooks, validator, handler, allowMeta = false, inference }) => {
  let isHandleFn = typeof handler === "function";
  if (!isHandleFn) {
    if (handler = mapResponse(handler, { headers: app.setHeaders ?? {} }), hooks.parse.length === 0 && hooks.transform.length === 0 && hooks.beforeHandle.length === 0 && hooks.afterHandle.length === 0)
      return Function("a", "return function () { return a.clone() }")(handler);
  }
  let handle = isHandleFn ? "handler(c)" : "handler", hasAfterResponse = hooks.afterResponse.length > 0, hasTrace = hooks.trace.length > 0, fnLiteral = "";
  if (inference = sucrose(Object.assign(localHook, { handler }), inference), inference.server)
    fnLiteral += `
Object.defineProperty(c, 'server', {
\t\t\tget: function() { return getServer() }
\t\t})
`;
  if (inference.body)
    fnLiteral += `let isParsing = false
`;
  validator.createBody?.(), validator.createQuery?.(), validator.createHeaders?.(), validator.createParams?.(), validator.createCookie?.(), validator.createResponse?.();
  let hasQuery = inference.query || !!validator.query, hasBody = method !== "$INTERNALWS" && method !== "GET" && method !== "HEAD" && (inference.body || !!validator.body || hooks.parse.length), defaultHeaders = app.setHeaders, hasDefaultHeaders = defaultHeaders && !!Object.keys(defaultHeaders).length, hasHeaders = inference.headers || validator.headers, hasCookie = inference.cookie || !!validator.cookie, cookieValidator = hasCookie ? getCookieValidator({ validator: validator.cookie, defaultConfig: app.config.cookie, dynamic: !!app.config.aot, config: validator.cookie?.config ?? {}, models: app.definitions.type }) : undefined, cookieMeta = cookieValidator?.config, encodeCookie = "";
  if (cookieMeta?.sign) {
    if (!cookieMeta.secrets)
      throw new Error(`t.Cookie required secret which is not set in (${method}) ${path}.`);
    let secret = !cookieMeta.secrets ? undefined : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
    if (encodeCookie += `const _setCookie = c.set.cookie
\t\tif(_setCookie) {`, cookieMeta.sign === true)
      encodeCookie += `for(const [key, cookie] of Object.entries(_setCookie)) {
\t\t\t\tc.set.cookie[key].value = await signCookie(cookie.value, '${secret}')
\t\t\t}`;
    else
      for (let name of cookieMeta.sign)
        encodeCookie += `if(_setCookie['${name}']?.value) { c.set.cookie['${name}'].value = await signCookie(_setCookie['${name}'].value, '${secret}') }
`;
    encodeCookie += `}
`;
  }
  let normalize = app.config.normalize, { composeValidation, composeResponseValidation } = composeValidationFactory({ normalize, validator });
  if (hasHeaders)
    fnLiteral += headersHasToJSON ? `c.headers = c.request.headers.toJSON()
` : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
\t\t\t\t\tc.headers[key] = value
\t\t\t\t`;
  if (hasCookie) {
    let get = (name, defaultValue) => {
      let value2 = cookieMeta?.[name] ?? defaultValue;
      if (!value2)
        return typeof defaultValue === "string" ? `${name}: "${defaultValue}",` : `${name}: ${defaultValue},`;
      if (typeof value2 === "string")
        return `${name}: '${value2}',`;
      if (value2 instanceof Date)
        return `${name}: new Date(${value2.getTime()}),`;
      return `${name}: ${value2},`;
    }, options = cookieMeta ? `{
\t\t\tsecrets: ${cookieMeta.secrets !== undefined ? typeof cookieMeta.secrets === "string" ? `'${cookieMeta.secrets}'` : "[" + cookieMeta.secrets.reduce((a, b) => a + `'${b}',`, "") + "]" : "undefined"},
\t\t\tsign: ${cookieMeta.sign === true ? true : cookieMeta.sign !== undefined ? "[" + cookieMeta.sign.reduce((a, b) => a + `'${b}',`, "") + "]" : "undefined"},
\t\t\t${get("domain")}
\t\t\t${get("expires")}
\t\t\t${get("httpOnly")}
\t\t\t${get("maxAge")}
\t\t\t${get("path", "/")}
\t\t\t${get("priority")}
\t\t\t${get("sameSite")}
\t\t\t${get("secure")}
\t\t}` : "undefined";
    if (hasHeaders)
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.headers.cookie, ${options})
`;
    else
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${options})
`;
  }
  if (hasQuery) {
    let destructured = [];
    if (validator.query && validator.query.schema.type === "object") {
      let properties = validator.query.schema.properties;
      if (!hasAdditionalProperties(validator.query))
        for (let [key, _value] of Object.entries(properties)) {
          let value2 = _value;
          if (value2 && TypeBoxSymbol.optional in value2 && value2.type === "array" && value2.items)
            value2 = value2.items;
          let { type: type3, anyOf } = value2, isArray = type3 === "array" || anyOf?.some((v) => v.type === "string" && v.format === "ArrayString");
          destructured.push({ key, isArray, isNestedObjectArray: isArray && value2.items?.type === "object" || !!value2.items?.anyOf?.some((x) => x.type === "object" || x.type === "array"), isObject: type3 === "object" || anyOf?.some((v) => v.type === "string" && v.format === "ArrayString"), anyOf: !!anyOf });
        }
    }
    if (!destructured.length)
      fnLiteral += `if(c.qi === -1) {
\t\t\t\tc.query = {}
\t\t\t} else {
\t\t\t\tc.query = parseQueryFromURL(c.url.slice(c.qi + 1))
\t\t\t}`;
    else
      fnLiteral += `if(c.qi !== -1) {
\t\t\t\tlet url = '&' + c.url.slice(c.qi + 1)

\t\t\t\t${destructured.map(({ key, isArray, isObject: isObject2, isNestedObjectArray, anyOf }, index) => {
        let init = `${index === 0 ? "let" : ""} memory = url.indexOf('&${key}=')
\t\t\t\t\t\t\tlet a${index}
`;
        if (isArray)
          return init + (isNestedObjectArray ? `while (memory !== -1) {
\t\t\t\t\t\t\t\t\t\t\tconst start = memory + ${key.length + 2}
\t\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&', start)

\t\t\t\t\t\t\t\t\t\t\tif(a${index} === undefined)
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = ''
\t\t\t\t\t\t\t\t\t\t\telse
\t\t\t\t\t\t\t\t\t\t\t\ta${index} += ','

\t\t\t\t\t\t\t\t\t\t\tlet temp

\t\t\t\t\t\t\t\t\t\t\tif(memory === -1) temp = decodeURIComponent(url.slice(start).replace(/\\+/g, ' '))
\t\t\t\t\t\t\t\t\t\t\telse temp = decodeURIComponent(url.slice(start, memory).replace(/\\+/g, ' '))

\t\t\t\t\t\t\t\t\t\t\tconst charCode = temp.charCodeAt(0)
\t\t\t\t\t\t\t\t\t\t\tif(charCode !== 91 && charCode !== 123)
\t\t\t\t\t\t\t\t\t\t\t\ttemp = '"' + temp + '"'

\t\t\t\t\t\t\t\t\t\t\ta${index} += temp

\t\t\t\t\t\t\t\t\t\t\tif(memory === -1) break

\t\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&${key}=', memory)
\t\t\t\t\t\t\t\t\t\t\tif(memory === -1) break
\t\t\t\t\t\t\t\t\t\t}

\t\t\t\t\t\t\t\t\t\ttry {
\t\t\t\t\t\t\t\t\t\t    if(a${index}.charCodeAt(0) === 91)
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = JSON.parse(a${index})
\t\t\t\t\t\t\t\t\t\t\telse
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = JSON.parse('[' + a${index} + ']')
\t\t\t\t\t\t\t\t\t\t} catch {}
` : `while (memory !== -1) {
\t\t\t\t\t\t\t\t\t\t\tconst start = memory + ${key.length + 2}
\t\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&', start)

\t\t\t\t\t\t\t\t\t\t\tif(a${index} === undefined)
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = []

\t\t\t\t\t\t\t\t\t\t\tif(memory === -1) {
\t\t\t\t\t\t\t\t\t\t\t\ta${index}.push(decodeURIComponent(url.slice(start)).replace(/\\+/g, ' '))
\t\t\t\t\t\t\t\t\t\t\t\tbreak
\t\t\t\t\t\t\t\t\t\t\t}
\t\t\t\t\t\t\t\t\t\t\telse a${index}.push(decodeURIComponent(url.slice(start, memory)).replace(/\\+/g, ' '))

\t\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&${key}=', memory)
\t\t\t\t\t\t\t\t\t\t\tif(memory === -1) break
\t\t\t\t\t\t\t\t\t\t}
`);
        if (isObject2)
          return init + `if (memory !== -1) {
\t\t\t\t\t\t\t\t\t\tconst start = memory + ${key.length + 2}
\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&', start)

\t\t\t\t\t\t\t\t\t\tif(memory === -1) a${index} = decodeURIComponent(url.slice(start).replace(/\\+/g, ' '))
\t\t\t\t\t\t\t\t\t\telse a${index} = decodeURIComponent(url.slice(start, memory).replace(/\\+/g, ' '))

\t\t\t\t\t\t\t\t\t\tif (a${index} !== undefined) {
\t\t\t\t\t\t\t\t\t\t\ttry {
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = JSON.parse(a${index})
\t\t\t\t\t\t\t\t\t\t\t} catch {}
\t\t\t\t\t\t\t\t\t\t}
\t\t\t\t\t\t\t\t\t}`;
        return init + `if (memory !== -1) {
\t\t\t\t\t\t\t\t\t\tconst start = memory + ${key.length + 2}
\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&', start)

\t\t\t\t\t\t\t\t\t\tif(memory === -1) a${index} = decodeURIComponent(url.slice(start).replace(/\\+/g, ' '))
\t\t\t\t\t\t\t\t\t\telse {
\t\t\t\t\t\t\t\t\t\t\ta${index} = decodeURIComponent(url.slice(start, memory).replace(/\\+/g, ' '))

\t\t\t\t\t\t\t\t\t\t\t${anyOf ? `
\t\t\t\t\t\t\t\t\t\t\tlet deepMemory = url.indexOf('&${key}=', memory)

\t\t\t\t\t\t\t\t\t\t\tif(deepMemory !== -1) {
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = [a${index}]
\t\t\t\t\t\t\t\t\t\t\t\tlet first = true

\t\t\t\t\t\t\t\t\t\t\t\twhile(true) {
\t\t\t\t\t\t\t\t\t\t\t\t\tconst start = deepMemory + ${key.length + 2}
\t\t\t\t\t\t\t\t\t\t\t\t\tif(first)
\t\t\t\t\t\t\t\t\t\t\t\t\t\tfirst = false
\t\t\t\t\t\t\t\t\t\t\t\t\telse
\t\t\t\t\t\t\t\t\t\t\t\t\t\tdeepMemory = url.indexOf('&', start)

\t\t\t\t\t\t\t\t\t\t\t\t\tlet value
\t\t\t\t\t\t\t\t\t\t\t\t\tif(deepMemory === -1) value = decodeURIComponent(url.slice(start).replace(/\\+/g, ' '))
\t\t\t\t\t\t\t\t\t\t\t\t\telse value = decodeURIComponent(url.slice(start, deepMemory).replace(/\\+/g, ' '))

\t\t\t\t\t\t\t\t\t\t\t\t\tconst vStart = value.charCodeAt(0)
\t\t\t\t\t\t\t\t\t\t\t\t\tconst vEnd = value.charCodeAt(value.length - 1)

\t\t\t\t\t\t\t\t\t\t\t\t\tif((vStart === 91 && vEnd === 93) || (vStart === 123 && vEnd === 125))
\t\t\t\t\t\t\t\t\t\t\t\t\t\ttry {
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ta${index}.push(JSON.parse(value))
\t\t\t\t\t\t\t\t\t\t\t\t\t\t} catch {
\t\t\t\t\t\t\t\t\t\t\t\t\t\t \ta${index}.push(value)
\t\t\t\t\t\t\t\t\t\t\t\t\t\t}

\t\t\t\t\t\t\t\t\t\t\t\t\tif(deepMemory === -1) break
\t\t\t\t\t\t\t\t\t\t\t\t}
\t\t\t\t\t\t\t\t\t\t\t}
\t\t\t\t\t\t\t\t\t\t\t\t` : ""}
\t\t\t\t\t\t\t\t\t\t}
\t\t\t\t\t\t\t\t\t}`;
      }).join(`
`)}

\t\t\t\tc.query = {
\t\t\t\t\t${destructured.map(({ key }, index) => `'${key}': a${index}`).join(", ")}
\t\t\t\t}
\t\t\t} else {
\t\t\t\tc.query = {}
\t\t\t}`;
  }
  if (hasTrace)
    fnLiteral += `
const id = c[ELYSIA_REQUEST_ID]
`;
  let report = createReport({ trace: hooks.trace, addFn: (word) => {
    fnLiteral += word;
  } });
  fnLiteral += `
try {
`;
  let isAsyncHandler = typeof handler === "function" && isAsync(handler), saveResponse = hasTrace || hooks.afterResponse.length > 0 ? "c.response = " : "", maybeAsync = hasCookie || hasBody || isAsyncHandler || hooks.parse.length > 0 || hooks.afterHandle.some(isAsync) || hooks.beforeHandle.some(isAsync) || hooks.transform.some(isAsync) || hooks.mapResponse.some(isAsync), maybeStream = (typeof handler === "function" ? isGenerator(handler) : false) || hooks.beforeHandle.some(isGenerator) || hooks.afterHandle.some(isGenerator) || hooks.transform.some(isGenerator), hasSet = inference.cookie || inference.set || hasHeaders || hasTrace || validator.response || isHandleFn && hasDefaultHeaders || maybeStream, requestMapper = ", c.request";
  fnLiteral += `c.route = \`${path}\`
`;
  let parseReporter = report("parse", { total: hooks.parse.length });
  if (hasBody) {
    let hasBodyInference = hooks.parse.length || inference.body || validator.body;
    if (fnLiteral += `isParsing = true
`, hooks.type && !hooks.parse.length)
      switch (hooks.type) {
        case "json":
        case "application/json":
          if (isOptional(validator.body))
            fnLiteral += "try { c.body = await c.request.json() } catch {}";
          else
            fnLiteral += "c.body = await c.request.json()";
          break;
        case "text":
        case "text/plain":
          fnLiteral += `c.body = await c.request.text()
`;
          break;
        case "urlencoded":
        case "application/x-www-form-urlencoded":
          fnLiteral += `c.body = parseQuery(await c.request.text())
`;
          break;
        case "arrayBuffer":
        case "application/octet-stream":
          fnLiteral += `c.body = await c.request.arrayBuffer()
`;
          break;
        case "formdata":
        case "multipart/form-data":
          if (fnLiteral += `c.body = {}
`, isOptional(validator.body))
            fnLiteral += "let form; try { form = await c.request.formData() } catch {}";
          else
            fnLiteral += "const form = await c.request.formData()";
          fnLiteral += `
if(form)
\t\t\t\t\t\tfor (const key of form.keys()) {
\t\t\t\t\t\t\tif (c.body[key])
\t\t\t\t\t\t\t\tcontinue

\t\t\t\t\t\t\tconst value = form.getAll(key)
\t\t\t\t\t\t\tif (value.length === 1)
\t\t\t\t\t\t\t\tc.body[key] = value[0]
\t\t\t\t\t\t\telse c.body[key] = value
\t\t\t\t\t\t} else form = {}
`;
          break;
      }
    else if (hasBodyInference) {
      if (fnLiteral += `
`, fnLiteral += hasHeaders ? "let contentType = c.headers['content-type']" : "let contentType = c.request.headers.get('content-type')", fnLiteral += `
\t\t\t\tif (contentType) {
\t\t\t\t\tconst index = contentType.indexOf(';')
\t\t\t\t\tif (index !== -1) contentType = contentType.substring(0, index)

\t\t\t\t\tc.contentType = contentType
`, hooks.parse.length) {
        fnLiteral += `let used = false
`;
        let reporter = report("parse", { total: hooks.parse.length });
        for (let i = 0;i < hooks.parse.length; i++) {
          let endUnit = reporter.resolveChild(hooks.parse[i].fn.name), name = `bo${i}`;
          if (i !== 0)
            fnLiteral += `if(!used) {
`;
          if (fnLiteral += `let ${name} = parse[${i}](c, contentType)
`, fnLiteral += `if(${name} instanceof Promise) ${name} = await ${name}
`, fnLiteral += `if(${name} !== undefined) { c.body = ${name}; used = true }
`, endUnit(), i !== 0)
            fnLiteral += "}";
        }
        reporter.resolve();
      }
      if (fnLiteral += `
delete c.contentType
`, hooks.parse.length)
        fnLiteral += "if (!used) {";
      if (hooks.type && !Array.isArray(hooks.type))
        switch (hooks.type) {
          case "json":
          case "application/json":
            if (isOptional(validator.body))
              fnLiteral += "try { c.body = await c.request.json() } catch {}";
            else
              fnLiteral += "c.body = await c.request.json()";
            break;
          case "text":
          case "text/plain":
            fnLiteral += `c.body = await c.request.text()
`;
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            fnLiteral += `c.body = parseQuery(await c.request.text())
`;
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            fnLiteral += `c.body = await c.request.arrayBuffer()
`;
            break;
          case "formdata":
          case "multipart/form-data":
            fnLiteral += `c.body = {}

\t\t\t\t\t\t\tconst form = await c.request.formData()
\t\t\t\t\t\t\tfor (const key of form.keys()) {
\t\t\t\t\t\t\t\tif (c.body[key])
\t\t\t\t\t\t\t\t\tcontinue

\t\t\t\t\t\t\t\tconst value = form.getAll(key)
\t\t\t\t\t\t\t\tif (value.length === 1)
\t\t\t\t\t\t\t\t\tc.body[key] = value[0]
\t\t\t\t\t\t\t\telse c.body[key] = value
\t\t\t\t\t\t\t}
`;
            break;
        }
      else
        fnLiteral += `
\t\t\t\t\tswitch (contentType) {
\t\t\t\t\t\tcase 'application/json':
\t\t\t\t\t\t\t${isOptional(validator.body) ? "try { c.body = await c.request.json() } catch {}" : "c.body = await c.request.json()"}
\t\t\t\t\t\t\tbreak

\t\t\t\t\t\tcase 'text/plain':
\t\t\t\t\t\t\tc.body = await c.request.text()
\t\t\t\t\t\t\tbreak

\t\t\t\t\t\tcase 'application/x-www-form-urlencoded':
\t\t\t\t\t\t\tc.body = parseQuery(await c.request.text())
\t\t\t\t\t\t\tbreak

\t\t\t\t\t\tcase 'application/octet-stream':
\t\t\t\t\t\t\tc.body = await c.request.arrayBuffer();
\t\t\t\t\t\t\tbreak

\t\t\t\t\t\tcase 'multipart/form-data':
\t\t\t\t\t\t\tc.body = {}

\t\t\t\t\t\t\tconst form = await c.request.formData()
\t\t\t\t\t\t\tfor (const key of form.keys()) {
\t\t\t\t\t\t\t\tif (c.body[key])
\t\t\t\t\t\t\t\t\tcontinue

\t\t\t\t\t\t\t\tconst value = form.getAll(key)
\t\t\t\t\t\t\t\tif (value.length === 1)
\t\t\t\t\t\t\t\t\tc.body[key] = value[0]
\t\t\t\t\t\t\t\telse c.body[key] = value
\t\t\t\t\t\t\t}

\t\t\t\t\t\t\tbreak
\t\t\t\t\t}`;
      if (hooks.parse.length)
        fnLiteral += "}";
      fnLiteral += `}
`;
    }
    fnLiteral += `
isParsing = false
`;
  }
  if (parseReporter.resolve(), hooks?.transform) {
    let reporter = report("transform", { total: hooks.transform.length });
    if (hooks.transform.length)
      fnLiteral += `
let transformed
`;
    for (let i = 0;i < hooks.transform.length; i++) {
      let transform4 = hooks.transform[i], endUnit = reporter.resolveChild(transform4.fn.name);
      if (fnLiteral += isAsync(transform4) ? `transformed = await transform[${i}](c)
` : `transformed = transform[${i}](c)
`, transform4.subType === "mapDerive")
        fnLiteral += `if(transformed instanceof ElysiaCustomStatusResponse)
\t\t\t\t\tthrow transformed
\t\t\t\telse {
\t\t\t\t\ttransformed.request = c.request
\t\t\t\t\ttransformed.store = c.store
\t\t\t\t\ttransformed.qi = c.qi
\t\t\t\t\ttransformed.path = c.path
\t\t\t\t\ttransformed.url = c.url
\t\t\t\t\ttransformed.redirect = c.redirect
\t\t\t\t\ttransformed.set = c.set
\t\t\t\t\ttransformed.error = c.error

\t\t\t\t\tc = transformed
\t\t\t}`;
      else
        fnLiteral += `if(transformed instanceof ElysiaCustomStatusResponse)
\t\t\t\t\tthrow transformed
\t\t\t\telse
\t\t\t\t\tObject.assign(c, transformed)
`;
      endUnit();
    }
    reporter.resolve();
  }
  if (validator) {
    if (fnLiteral += `
`, validator.headers) {
      if (normalize && "Clean" in validator.headers && !hasAdditionalProperties(validator.headers))
        fnLiteral += `c.headers = validator.headers.Clean(c.headers);
`;
      if (hasProperty("default", validator.headers.schema))
        for (let [key, value2] of Object.entries(exports_value2.Default(validator.headers.schema, {}))) {
          let parsed = typeof value2 === "object" ? JSON.stringify(value2) : typeof value2 === "string" ? `'${value2}'` : value2;
          if (parsed !== undefined)
            fnLiteral += `c.headers['${key}'] ??= ${parsed}
`;
        }
      if (isOptional(validator.headers))
        fnLiteral += "if(isNotEmpty(c.headers)) {";
      if (fnLiteral += `if(validator.headers.Check(c.headers) === false) {
\t\t\t\t${composeValidation("headers")}
\t\t\t}`, hasTransform(validator.headers.schema))
        fnLiteral += `c.headers = validator.headers.Decode(c.headers)
`;
      if (isOptional(validator.headers))
        fnLiteral += "}";
    }
    if (validator.params) {
      if (hasProperty("default", validator.params.schema))
        for (let [key, value2] of Object.entries(exports_value2.Default(validator.params.schema, {}))) {
          let parsed = typeof value2 === "object" ? JSON.stringify(value2) : typeof value2 === "string" ? `'${value2}'` : value2;
          if (parsed !== undefined)
            fnLiteral += `c.params['${key}'] ??= ${parsed}
`;
        }
      if (fnLiteral += `if(validator.params.Check(c.params) === false) {
\t\t\t\t${composeValidation("params")}
\t\t\t}`, hasTransform(validator.params.schema))
        fnLiteral += `
c.params = validator.params.Decode(c.params)
`;
    }
    if (validator.query) {
      if (normalize && "Clean" in validator.query && !hasAdditionalProperties(validator.query))
        fnLiteral += `c.query = validator.query.Clean(c.query);
`;
      if (hasProperty("default", validator.query.schema))
        for (let [key, value2] of Object.entries(exports_value2.Default(validator.query.schema, {}))) {
          let parsed = typeof value2 === "object" ? JSON.stringify(value2) : typeof value2 === "string" ? `'${value2}'` : value2;
          if (parsed !== undefined)
            fnLiteral += `if(c.query['${key}'] === undefined) c.query['${key}'] = ${parsed}
`;
        }
      if (isOptional(validator.query))
        fnLiteral += "if(isNotEmpty(c.query)) {";
      if (fnLiteral += `if(validator.query.Check(c.query) === false) {
          \t\t${composeValidation("query")}
\t\t\t}`, hasTransform(validator.query.schema))
        fnLiteral += `
c.query = validator.query.Decode(Object.assign({}, c.query))
`;
      if (isOptional(validator.query))
        fnLiteral += "}";
    }
    if (validator.body) {
      if (normalize && "Clean" in validator.body && !hasAdditionalProperties(validator.body))
        fnLiteral += `c.body = validator.body.Clean(c.body);
`;
      let doesHaveTransform = hasTransform(validator.body.schema);
      if (doesHaveTransform || isOptional(validator.body))
        fnLiteral += `
const isNotEmptyObject = c.body && (typeof c.body === "object" && isNotEmpty(c.body))
`;
      if (hasProperty("default", validator.body.schema)) {
        let value2 = exports_value2.Default(validator.body.schema, validator.body.schema.type === "object" ? {} : undefined), parsed = typeof value2 === "object" ? JSON.stringify(value2) : typeof value2 === "string" ? `'${value2}'` : value2;
        if (fnLiteral += `if(validator.body.Check(c.body) === false) {
\t\t\t\t\tif (typeof c.body === 'object') {
\t\t\t\t\t\tc.body = Object.assign(${parsed}, c.body)
\t\t\t\t\t} else { c.body = ${parsed} }`, isOptional(validator.body))
          fnLiteral += `
\t\t\t\t\t    if(isNotEmptyObject && validator.body.Check(c.body) === false) {
            \t\t\t\t${composeValidation("body")}
             \t\t\t}
                    }`;
        else
          fnLiteral += `
    \t\t\t\tif(validator.body.Check(c.body) === false) {
        \t\t\t\t${composeValidation("body")}
         \t\t\t}
                }`;
      } else if (isOptional(validator.body))
        fnLiteral += `if(isNotEmptyObject && validator.body.Check(c.body) === false) {
         \t\t\t${composeValidation("body")}
          \t\t}`;
      else
        fnLiteral += `if(validator.body.Check(c.body) === false) {
         \t\t\t${composeValidation("body")}
          \t\t}`;
      if (doesHaveTransform)
        fnLiteral += `
if(isNotEmptyObject) c.body = validator.body.Decode(c.body)
`;
    }
    if (isNotEmpty(cookieValidator?.schema?.properties ?? cookieValidator?.schema?.schema ?? {})) {
      if (fnLiteral += `const cookieValue = {}
    \t\t\tfor(const [key, value] of Object.entries(c.cookie))
    \t\t\t\tcookieValue[key] = value.value
`, hasProperty("default", cookieValidator.schema))
        for (let [key, value2] of Object.entries(exports_value2.Default(cookieValidator.schema, {})))
          fnLiteral += `cookieValue['${key}'] = ${typeof value2 === "object" ? JSON.stringify(value2) : value2}
`;
      if (isOptional(validator.cookie))
        fnLiteral += "if(isNotEmpty(c.cookie)) {";
      if (fnLiteral += `if(validator.cookie.Check(cookieValue) === false) {
\t\t\t\t${composeValidation("cookie", "cookieValue")}
\t\t\t}`, hasTransform(validator.cookie.schema))
        fnLiteral += `
for(const [key, value] of Object.entries(validator.cookie.Decode(cookieValue)))
\t\t\t\t\tc.cookie[key].value = value
`;
      if (isOptional(validator.cookie))
        fnLiteral += "}";
    }
  }
  if (hooks?.beforeHandle) {
    let reporter = report("beforeHandle", { total: hooks.beforeHandle.length }), hasResolve = false;
    for (let i = 0;i < hooks.beforeHandle.length; i++) {
      let beforeHandle = hooks.beforeHandle[i], endUnit = reporter.resolveChild(beforeHandle.fn.name), returning = hasReturn(beforeHandle);
      if (beforeHandle.subType === "resolve" || beforeHandle.subType === "mapResolve") {
        if (!hasResolve)
          hasResolve = true, fnLiteral += `
let resolved
`;
        if (fnLiteral += isAsync(beforeHandle) ? `resolved = await beforeHandle[${i}](c);
` : `resolved = beforeHandle[${i}](c);
`, beforeHandle.subType === "mapResolve")
          fnLiteral += `if(resolved instanceof ElysiaCustomStatusResponse)
\t\t\t\t\t\tthrow resolved
\t\t\t\t\telse {
\t\t\t\t\t\tresolved.request = c.request
\t\t\t\t\t\tresolved.store = c.store
\t\t\t\t\t\tresolved.qi = c.qi
\t\t\t\t\t\tresolved.path = c.path
\t\t\t\t\t\tresolved.url = c.url
\t\t\t\t\t\tresolved.redirect = c.redirect
\t\t\t\t\t\tresolved.set = c.set
\t\t\t\t\t\tresolved.error = c.error

\t\t\t\t\t\tc = resolved
\t\t\t\t\t}`;
        else
          fnLiteral += `if(resolved instanceof ElysiaCustomStatusResponse)
\t\t\t\t\t\tthrow resolved
\t\t\t\t\telse
\t\t\t\t\t\tObject.assign(c, resolved)
`;
      } else if (!returning)
        fnLiteral += isAsync(beforeHandle) ? `await beforeHandle[${i}](c);
` : `beforeHandle[${i}](c);
`, endUnit();
      else {
        if (fnLiteral += isAsync(beforeHandle) ? `be = await beforeHandle[${i}](c);
` : `be = beforeHandle[${i}](c);
`, endUnit("be"), fnLiteral += `if(be !== undefined) {
`, reporter.resolve(), hooks.afterHandle?.length) {
          report("handle", { name: isHandleFn ? handler.name : undefined }).resolve();
          let reporter2 = report("afterHandle", { total: hooks.afterHandle.length });
          for (let i2 = 0;i2 < hooks.afterHandle.length; i2++) {
            let hook = hooks.afterHandle[i2], returning2 = hasReturn(hook), endUnit2 = reporter2.resolveChild(hook.fn.name);
            if (fnLiteral += `c.response = be
`, !returning2)
              fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i2}](c, be)
` : `afterHandle[${i2}](c, be)
`;
            else
              fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i2}](c)
` : `af = afterHandle[${i2}](c)
`, fnLiteral += `if(af !== undefined) { c.response = be = af }
`;
            endUnit2("af");
          }
          reporter2.resolve();
        }
        if (validator.response)
          fnLiteral += composeResponseValidation("be");
        let mapResponseReporter = report("mapResponse", { total: hooks.mapResponse.length });
        if (hooks.mapResponse.length) {
          fnLiteral += `
c.response = be
`;
          for (let i2 = 0;i2 < hooks.mapResponse.length; i2++) {
            let mapResponse2 = hooks.mapResponse[i2], endUnit2 = mapResponseReporter.resolveChild(mapResponse2.fn.name);
            fnLiteral += `
if(mr === undefined) {
\t\t\t\t\t\t\tmr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i2}](c)
\t\t\t\t\t\t\tif(mr !== undefined) be = c.response = mr
\t\t\t\t\t\t}
`, endUnit2();
          }
        }
        mapResponseReporter.resolve(), fnLiteral += encodeCookie, fnLiteral += `return mapEarlyResponse(${saveResponse} be, c.set ${requestMapper})}
`;
      }
    }
    reporter.resolve();
  }
  if (hooks?.afterHandle.length) {
    let handleReporter = report("handle", { name: isHandleFn ? handler.name : undefined });
    if (hooks.afterHandle.length)
      fnLiteral += isAsyncHandler ? `let r = c.response = await ${handle};
` : `let r = c.response = ${handle};
`;
    else
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
    handleReporter.resolve();
    let reporter = report("afterHandle", { total: hooks.afterHandle.length });
    for (let i = 0;i < hooks.afterHandle.length; i++) {
      let hook = hooks.afterHandle[i], returning = hasReturn(hook), endUnit = reporter.resolveChild(hook.fn.name);
      if (!returning)
        fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i}](c)
` : `afterHandle[${i}](c)
`, endUnit();
      else if (fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i}](c)
` : `af = afterHandle[${i}](c)
`, endUnit("af"), validator.response)
        fnLiteral += "if(af !== undefined) {", reporter.resolve(), fnLiteral += composeResponseValidation("af"), fnLiteral += "c.response = af }";
      else
        fnLiteral += "if(af !== undefined) {", reporter.resolve(), fnLiteral += `c.response = af}
`;
    }
    if (reporter.resolve(), fnLiteral += `r = c.response
`, validator.response)
      fnLiteral += composeResponseValidation();
    fnLiteral += encodeCookie;
    let mapResponseReporter = report("mapResponse", { total: hooks.mapResponse.length });
    if (hooks.mapResponse.length)
      for (let i = 0;i < hooks.mapResponse.length; i++) {
        let mapResponse2 = hooks.mapResponse[i], endUnit = mapResponseReporter.resolveChild(mapResponse2.fn.name);
        fnLiteral += `
mr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](c)
\t\t\t\tif(mr !== undefined) r = c.response = mr
`, endUnit();
      }
    if (mapResponseReporter.resolve(), hasSet)
      fnLiteral += `return mapResponse(${saveResponse} r, c.set ${requestMapper})
`;
    else
      fnLiteral += `return mapCompactResponse(${saveResponse} r ${requestMapper})
`;
  } else {
    let handleReporter = report("handle", { name: isHandleFn ? handler.name : undefined });
    if (validator.response || hooks.mapResponse.length) {
      if (fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`, handleReporter.resolve(), validator.response)
        fnLiteral += composeResponseValidation();
      report("afterHandle").resolve();
      let mapResponseReporter = report("mapResponse", { total: hooks.mapResponse.length });
      if (hooks.mapResponse.length) {
        fnLiteral += `
c.response = r
`;
        for (let i = 0;i < hooks.mapResponse.length; i++) {
          let mapResponse2 = hooks.mapResponse[i], endUnit = mapResponseReporter.resolveChild(mapResponse2.fn.name);
          fnLiteral += `
if(mr === undefined) {
\t\t\t\t\t\tmr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](c)
    \t\t\t\t\tif(mr !== undefined) r = c.response = mr
\t\t\t\t\t}
`, endUnit();
        }
      }
      if (mapResponseReporter.resolve(), fnLiteral += encodeCookie, handler instanceof Response)
        fnLiteral += inference.set ? `if(
\t\t\t\t\tisNotEmpty(c.set.headers) ||
\t\t\t\t\tc.set.status !== 200 ||
\t\t\t\t\tc.set.redirect ||
\t\t\t\t\tc.set.cookie
\t\t\t\t)
\t\t\t\t\treturn mapResponse(${saveResponse} ${handle}.clone(), c.set ${requestMapper})
\t\t\t\telse
\t\t\t\t\treturn ${handle}.clone()` : `return ${handle}.clone()`, fnLiteral += `
`;
      else if (hasSet)
        fnLiteral += `return mapResponse(${saveResponse} r, c.set ${requestMapper})
`;
      else
        fnLiteral += `return mapCompactResponse(${saveResponse} r ${requestMapper})
`;
    } else if (hasCookie || hasTrace) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`, handleReporter.resolve(), report("afterHandle").resolve();
      let mapResponseReporter = report("mapResponse", { total: hooks.mapResponse.length });
      if (hooks.mapResponse.length) {
        fnLiteral += `
c.response = r
`;
        for (let i = 0;i < hooks.mapResponse.length; i++) {
          let mapResponse2 = hooks.mapResponse[i], endUnit = mapResponseReporter.resolveChild(mapResponse2.fn.name);
          fnLiteral += `
if(mr === undefined) {
\t\t\t\t\t\t\tmr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](c)
    \t\t\t\t\t\tif(mr !== undefined) r = c.response = mr
\t\t\t\t\t\t}
`, endUnit();
        }
      }
      if (mapResponseReporter.resolve(), fnLiteral += encodeCookie, hasSet)
        fnLiteral += `return mapResponse(${saveResponse} r, c.set ${requestMapper})
`;
      else
        fnLiteral += `return mapCompactResponse(${saveResponse} r ${requestMapper})
`;
    } else {
      handleReporter.resolve();
      let handled = isAsyncHandler ? `await ${handle}` : handle;
      if (report("afterHandle").resolve(), handler instanceof Response)
        fnLiteral += inference.set ? `if(
\t\t\t\t\tisNotEmpty(c.set.headers) ||
\t\t\t\t\tc.set.status !== 200 ||
\t\t\t\t\tc.set.redirect ||
\t\t\t\t\tc.set.cookie
\t\t\t\t)
\t\t\t\t\treturn mapResponse(${saveResponse} ${handle}.clone(), c.set ${requestMapper})
\t\t\t\telse
\t\t\t\t\treturn ${handle}.clone()` : `return ${handle}.clone()`, fnLiteral += `
`;
      else if (hasSet)
        fnLiteral += `return mapResponse(${saveResponse} ${handled}, c.set ${requestMapper})
`;
      else
        fnLiteral += `return mapCompactResponse(${saveResponse} ${handled} ${requestMapper})
`;
    }
  }
  if (fnLiteral += `
} catch(error) {`, hasBody)
    fnLiteral += `
if(isParsing) error = new ParseError()
`;
  if (!maybeAsync)
    fnLiteral += `
return (async () => {
`;
  if (fnLiteral += `
const set = c.set
if (!set.status || set.status < 300) set.status = error?.status || 500
`, hasTrace)
    for (let i = 0;i < hooks.trace.length; i++)
      fnLiteral += `report${i}?.resolve(error);reportChild${i}?.(error);
`;
  let errorReporter = report("error", { total: hooks.error.length });
  if (hooks.error.length) {
    fnLiteral += `
\t\t\t\tc.error = error
\t\t\t\tif(error instanceof TypeBoxError) {
\t\t\t\t\tc.code = "VALIDATION"
\t\t\t\t\tc.set.status = 422
\t\t\t\t} else
\t\t\t\t\tc.code = error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
\t\t\t\tlet er
\t\t\t`;
    for (let i = 0;i < hooks.error.length; i++) {
      let endUnit = errorReporter.resolveChild(hooks.error[i].fn.name);
      if (isAsync(hooks.error[i]))
        fnLiteral += `
er = await handleErrors[${i}](c)
`;
      else
        fnLiteral += `
er = handleErrors[${i}](c)
if (er instanceof Promise) er = await er
`;
      endUnit();
      let mapResponseReporter = report("mapResponse", { total: hooks.mapResponse.length });
      if (hooks.mapResponse.length)
        for (let i2 = 0;i2 < hooks.mapResponse.length; i2++) {
          let mapResponse2 = hooks.mapResponse[i2], endUnit2 = mapResponseReporter.resolveChild(mapResponse2.fn.name);
          fnLiteral += `
c.response = er

\t\t\t\t\t\t\ter = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i2}](c)
\t\t\t\t\t\t\tif(er instanceof Promise) er = await er
`, endUnit2();
        }
      if (mapResponseReporter.resolve(), fnLiteral += `er = mapEarlyResponse(er, set ${requestMapper})
`, fnLiteral += "if (er) {", hasTrace) {
        for (let i2 = 0;i2 < hooks.trace.length; i2++)
          fnLiteral += `
report${i2}.resolve()
`;
        errorReporter.resolve();
      }
      fnLiteral += `return er
}
`;
    }
  }
  if (errorReporter.resolve(), fnLiteral += `return handleError(c, error, true)
`, !maybeAsync)
    fnLiteral += "})()";
  if (fnLiteral += "}", hasAfterResponse || hasTrace) {
    if (fnLiteral += " finally { ", !maybeAsync)
      fnLiteral += ";(async () => {";
    let reporter = report("afterResponse", { total: hooks.afterResponse.length });
    if (hasAfterResponse)
      for (let i = 0;i < hooks.afterResponse.length; i++) {
        let endUnit = reporter.resolveChild(hooks.afterResponse[i].fn.name);
        fnLiteral += `
await afterResponse[${i}](c);
`, endUnit();
      }
    if (reporter.resolve(), !maybeAsync)
      fnLiteral += "})();";
    fnLiteral += "}";
  }
  fnLiteral = `const {
\t\thandler,
\t\thandleError,
\t\thooks: {
\t\t\ttransform,
\t\t\tresolve,
\t\t\tbeforeHandle,
\t\t\tafterHandle,
\t\t\tmapResponse: onMapResponse,
\t\t\tparse,
\t\t\terror: handleErrors,
\t\t\tafterResponse,
\t\t\ttrace: _trace
\t\t},
\t\tvalidator,
\t\tutils: {
\t\t\tmapResponse,
\t\t\tmapCompactResponse,
\t\t\tmapEarlyResponse,
\t\t\tparseQuery,
\t\t\tparseQueryFromURL,
\t\t\tisNotEmpty
\t\t},
\t\terror: {
\t\t\tNotFoundError,
\t\t\tValidationError,
\t\t\tInternalServerError,
\t\t\tParseError
\t\t},
\t\tschema,
\t\tdefinitions,
\t\tERROR_CODE,
\t\tparseCookie,
\t\tsignCookie,
\t\tdecodeURIComponent,
\t\tElysiaCustomStatusResponse,
\t\tELYSIA_TRACE,
\t\tELYSIA_REQUEST_ID,
\t\tgetServer,
\t\tTypeBoxError
\t} = hooks

\tconst trace = _trace.map(x => typeof x === 'function' ? x : x.fn)

\treturn ${maybeAsync ? "async" : ""} function handle(c) {
\t\t${hooks.beforeHandle.length ? "let be" : ""}
\t\t${hooks.afterHandle.length ? "let af" : ""}
\t\t${hooks.mapResponse.length ? "let mr" : ""}

\t\t${allowMeta ? "c.schema = schema; c.defs = definitions" : ""}
\t\t${fnLiteral}
\t}`;
  try {
    return Function("hooks", fnLiteral)({ handler, hooks: lifeCycleToFn(hooks), validator, handleError: app.handleError, utils: { mapResponse, mapCompactResponse, mapEarlyResponse, parseQuery, parseQueryFromURL, isNotEmpty }, error: { NotFoundError, ValidationError, InternalServerError, ParseError }, schema: app.router.history, definitions: app.definitions.type, ERROR_CODE, parseCookie, signCookie, decodeURIComponent: import_fast_decode_uri_component3.default, ElysiaCustomStatusResponse, ELYSIA_TRACE, ELYSIA_REQUEST_ID, getServer: () => app.getServer(), TypeBoxError });
  } catch {
    let debugHooks = lifeCycleToFn(hooks);
    console.log("[Composer] failed to generate optimized handler"), console.log("Please report the following to SaltyAom privately as it may include sensitive information about your codebase:"), console.log("---"), console.log({ handler: typeof handler === "function" ? handler.toString() : handler, hooks: { ...debugHooks, transform: debugHooks?.transform?.map?.((x) => x.toString()), resolve: debugHooks?.resolve?.map?.((x) => x.toString()), beforeHandle: debugHooks?.beforeHandle?.map?.((x) => x.toString()), afterHandle: debugHooks?.afterHandle?.map?.((x) => x.toString()), mapResponse: debugHooks?.mapResponse?.map?.((x) => x.toString()), parse: debugHooks?.parse?.map?.((x) => x.toString()), error: debugHooks?.error?.map?.((x) => x.toString()), afterResponse: debugHooks?.afterResponse?.map?.((x) => x.toString()), stop: debugHooks?.stop?.map?.((x) => x.toString()) }, validator, definitions: app.definitions.type }), console.log("---"), process.exit(1);
  }
};
var composeGeneralHandler = (app) => {
  let standardHostname = app.config.handler?.standardHostname ?? true, decoratorsLiteral = "", fnLiteral = "", defaultHeaders = app.setHeaders;
  for (let key of Object.keys(app.singleton.decorator))
    decoratorsLiteral += `,${key}: app.singleton.decorator.${key}`;
  let router = app.router, hasTrace = app.event.trace.length > 0, findDynamicRoute = `
\tconst route = router.find(request.method, path) ${router.http.root.ALL ? '?? router.find("ALL", path)' : ""}

\tif (route === null)
\t\treturn ${app.event.error.length ? "app.handleError(ctx, notFound)" : app.event.request.length ? `new Response(error404Message, {
\t\t\t\t\tstatus: ctx.set.status === 200 ? 404 : ctx.set.status,
\t\t\t\t\theaders: ctx.set.headers
\t\t\t\t})` : "error404.clone()"}

\tctx.params = route.params
`;
  findDynamicRoute += `if(route.store.handler) return route.store.handler(ctx)
\treturn (route.store.handler = route.store.compile())(ctx)
`;
  let switchMap = "";
  for (let [path, { code, all, static: staticFn }] of Object.entries(router.static.http.map)) {
    if (staticFn)
      switchMap += `case '${path}':
switch(request.method) {
${code}
${all ?? "default: break map"}}

`;
    switchMap += `case '${path}':
switch(request.method) {
${code}
${all ?? "default: break map"}}

`;
  }
  let maybeAsync = app.event.request.some(isAsync);
  if (fnLiteral += `const {
\t\tapp,
\t\tmapEarlyResponse,
\t\tNotFoundError,
\t\trandomId,
\t\thandleError,
\t\terror,
\t\tredirect,
\t\tELYSIA_TRACE,
\t\tELYSIA_REQUEST_ID,
\t\tgetServer
\t} = data

\tconst store = app.singleton.store
\tconst staticRouter = app.router.static.http
\tconst st = staticRouter.handlers
\tconst wsRouter = app.router.ws
\tconst router = app.router.http
\tconst trace = app.event.trace.map(x => typeof x === 'function' ? x : x.fn)

\tconst notFound = new NotFoundError()
\tconst hoc = app.extender.higherOrderFunctions.map(x => x.fn)

\t${app.event.request.length ? "const onRequest = app.event.request.map(x => x.fn)" : ""}
\t${app.event.error.length ? "" : `
const error404Message = notFound.message.toString()
\tconst error404 = new Response(error404Message, { status: 404 });
`}

\t${app.event.trace.length ? `const ${app.event.trace.map((_2, i) => `tr${i} = app.event.trace[${i}].fn`).join(",")}` : ""}

\t${maybeAsync ? "async" : ""} function map(request) {
`, app.event.request.length)
    fnLiteral += "let re";
  if (fnLiteral += `
const url = request.url
\t\tconst s = url.indexOf('/', ${standardHostname ? 11 : 7})
\t\tconst qi = url.indexOf('?', s + 1)
\t\tlet path
\t\tif(qi === -1)
\t\t\tpath = url.substring(s)
\t\telse
\t\t\tpath = url.substring(s, qi)
`, fnLiteral += `${hasTrace ? "const id = randomId()" : ""}
\t\tconst ctx = {
\t\t\trequest,
\t\t\tstore,
\t\t\tqi,
\t\t\tpath,
\t\t\turl,
\t\t\tredirect,
\t\t\tset: {
\t\t\t\theaders: ${Object.keys(defaultHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
\t\t\t\tstatus: 200
\t\t\t},
\t\t\terror
\t\t\t${app.inference.server ? `, get server() {
\t\t\t\t\t\t\treturn getServer()
\t\t\t\t\t\t}` : ""}
\t\t\t${hasTrace ? ",[ELYSIA_REQUEST_ID]: id" : ""}
\t\t\t${decoratorsLiteral}
\t\t}
`, app.event.trace.length)
    fnLiteral += `
ctx[ELYSIA_TRACE] = [${app.event.trace.map((_2, i) => `tr${i}(ctx)`).join(",")}]
`;
  let reporter = createReport({ context: "ctx", trace: app.event.trace, addFn(word) {
    fnLiteral += word;
  } })("request", { attribute: "ctx", total: app.event.request.length });
  if (app.event.request.length) {
    fnLiteral += `
 try {
`;
    for (let i = 0;i < app.event.request.length; i++) {
      let hook = app.event.request[i], withReturn = hasReturn(hook), maybeAsync2 = isAsync(hook), endUnit = reporter.resolveChild(app.event.request[i].fn.name);
      if (withReturn)
        fnLiteral += `re = mapEarlyResponse(
\t\t\t\t\t${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx),
\t\t\t\t\tctx.set,
\t\t\t\t\trequest
\t\t\t\t)
`, endUnit("re"), fnLiteral += `if(re !== undefined) return re
`;
      else
        fnLiteral += `${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx)
`, endUnit();
    }
    fnLiteral += `} catch (error) {
\t\t\treturn app.handleError(ctx, error)
\t\t}`;
  }
  reporter.resolve();
  let wsPaths = app.router.static.ws, wsRouter = app.router.ws;
  if (Object.keys(wsPaths).length || wsRouter.history.length) {
    fnLiteral += `
\t\t\tif(request.method === 'GET') {
\t\t\t\tswitch(path) {`;
    for (let [path, index] of Object.entries(wsPaths))
      fnLiteral += `
\t\t\t\t\tcase '${path}':
\t\t\t\t\t\tif(request.headers.get('upgrade') === 'websocket')
\t\t\t\t\t\t\treturn st[${index}](ctx)

\t\t\t\t\t\tbreak`;
    fnLiteral += `
\t\t\t\tdefault:
\t\t\t\t\tif(request.headers.get('upgrade') === 'websocket') {
\t\t\t\t\t\tconst route = wsRouter.find('ws', path)

\t\t\t\t\t\tif(route) {
\t\t\t\t\t\t\tctx.params = route.params

\t\t\t\t\t\t\tif(route.store.handler)
\t\t\t\t\t\t\t    return route.store.handler(ctx)

\t\t\t\t\t\t\treturn (route.store.handler = route.store.compile())(ctx)
\t\t\t\t\t\t}
\t\t\t\t\t}

\t\t\t\t\tbreak
\t\t\t}
\t\t}
`;
  }
  if (fnLiteral += `
\t\tmap: switch(path) {
\t\t\t${switchMap}

\t\t\tdefault:
\t\t\t\tbreak
\t\t}

\t\t${findDynamicRoute}
\t}
`, app.extender.higherOrderFunctions.length) {
    let handler = "map";
    for (let i = 0;i < app.extender.higherOrderFunctions.length; i++)
      handler = `hoc[${i}](${handler}, request)`;
    fnLiteral += `return function hocMap(request) { return ${handler}(request) }`;
  } else
    fnLiteral += "return map";
  let handleError = composeErrorHandler(app);
  return app.handleError = handleError, Function("data", fnLiteral)({ app, mapEarlyResponse, NotFoundError, randomId, handleError, error: error3, redirect, ELYSIA_TRACE, ELYSIA_REQUEST_ID, getServer: () => app.getServer() });
};
var composeErrorHandler = (app) => {
  let hooks = app.event, fnLiteral = "";
  fnLiteral += `const {
\t\tapp: { event: { error: onErrorContainer, afterResponse: resContainer, mapResponse: _onMapResponse, trace: _trace } },
\t\tmapResponse,
\t\tERROR_CODE,
\t\tElysiaCustomStatusResponse,
\t\tELYSIA_TRACE,
\t\tELYSIA_REQUEST_ID
\t} = inject

\tconst trace = _trace.map(x => typeof x === 'function' ? x : x.fn)
\tconst onMapResponse = []

\tfor(let i = 0; i < _onMapResponse.length; i++)
\t\tonMapResponse.push(_onMapResponse[i].fn ?? _onMapResponse[i])

\tdelete _onMapResponse

\tconst onError = onErrorContainer.map(x => x.fn)
\tconst res = resContainer.map(x => x.fn)

\treturn ${app.event.error.find(isAsync) || app.event.mapResponse.find(isAsync) ? "async" : ""} function(context, error, skipGlobal) {`;
  let hasTrace = app.event.trace.length > 0;
  if (hasTrace)
    fnLiteral += `
const id = context[ELYSIA_REQUEST_ID]
`;
  let report = createReport({ context: "context", trace: hooks.trace, addFn: (word) => {
    fnLiteral += word;
  } });
  fnLiteral += `
\t\tconst set = context.set
\t\tlet r

\t\tif(!context.code)
\t\t\tcontext.code = error.code ?? error[ERROR_CODE]

\t\tif(!(context.error instanceof Error))
\t\t\tcontext.error = error

\t\tif(error instanceof ElysiaCustomStatusResponse) {
\t\t\terror.status = error.code
\t\t\terror.message = error.response
\t\t}
`;
  let saveResponse = hasTrace || hooks.afterResponse.length > 0 || hooks.afterResponse.length > 0 ? "context.response = " : "";
  for (let i = 0;i < app.event.error.length; i++) {
    let handler = app.event.error[i], response = `${isAsync(handler) ? "await " : ""}onError[${i}](context)`;
    if (fnLiteral += `
if(skipGlobal !== true) {
`, hasReturn(handler)) {
      fnLiteral += `r = ${response}; if(r !== undefined) {
\t\t\t\tif(r instanceof Response) return r

\t\t\t\tif(r instanceof ElysiaCustomStatusResponse) {
\t\t\t\t\terror.status = error.code
\t\t\t\t\terror.message = error.response
\t\t\t\t}

\t\t\t\tif(set.status === 200) set.status = error.status
`;
      let mapResponseReporter2 = report("mapResponse", { total: hooks.mapResponse.length, name: "context" });
      if (hooks.mapResponse.length)
        for (let i2 = 0;i2 < hooks.mapResponse.length; i2++) {
          let mapResponse2 = hooks.mapResponse[i2], endUnit = mapResponseReporter2.resolveChild(mapResponse2.fn.name);
          fnLiteral += `
context.response = r
\t\t\t\t\t\tr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i2}](context)
`, endUnit();
        }
      mapResponseReporter2.resolve(), fnLiteral += `return mapResponse(${saveResponse} r, set, context.request)}
`;
    } else
      fnLiteral += response + `
`;
    fnLiteral += `
}
`;
  }
  fnLiteral += `if(error.constructor.name === "ValidationError" || error.constructor.name === "TransformDecodeError") {
\t    const reportedError = error.error ?? error
\t\tset.status = reportedError.status ?? 422
\t\treturn new Response(
\t\t\treportedError.message,
\t\t\t{
\t\t\t\theaders: Object.assign(
\t\t\t\t\t{ 'content-type': 'application/json'},
\t\t\t\t\tset.headers
\t\t\t\t),
\t\t\t\tstatus: set.status
\t\t\t}
\t\t)
\t} else {
\t\tif(error.code && typeof error.status === "number")
\t\t\treturn new Response(
\t\t\t\terror.message,
\t\t\t\t{ headers: set.headers, status: error.status }
\t\t\t)
`;
  let mapResponseReporter = report("mapResponse", { total: hooks.mapResponse.length, name: "context" });
  if (hooks.mapResponse.length)
    for (let i = 0;i < hooks.mapResponse.length; i++) {
      let mapResponse2 = hooks.mapResponse[i], endUnit = mapResponseReporter.resolveChild(mapResponse2.fn.name);
      fnLiteral += `
context.response = error
\t\t\terror = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](context)
`, endUnit();
    }
  return mapResponseReporter.resolve(), fnLiteral += `
return mapResponse(${saveResponse} error, set, context.request)
}
}`, Function("inject", fnLiteral)({ app, mapResponse, ERROR_CODE, ElysiaCustomStatusResponse, ELYSIA_TRACE, ELYSIA_REQUEST_ID });
};
var createDynamicHandler = (app) => async (request) => {
  let url = request.url, s = url.indexOf("/", 11), qi = url.indexOf("?", s + 1), path = qi === -1 ? url.substring(s) : url.substring(s, qi), set22 = { cookie: {}, status: 200, headers: {} }, context = Object.assign({}, app.singleton.decorator, { set: set22, store: app.singleton.store, request, path, qi, redirect });
  try {
    for (let i = 0;i < app.event.request.length; i++) {
      let onRequest = app.event.request[i].fn, response2 = onRequest(context);
      if (response2 instanceof Promise)
        response2 = await response2;
      if (response2 = mapEarlyResponse(response2, set22), response2)
        return context.response = response2;
    }
    let handler = app.router.dynamic.find(request.method, path) ?? app.router.dynamic.find("ALL", path);
    if (!handler)
      throw new NotFoundError;
    let { handle, hooks, validator, content } = handler.store, body;
    if (request.method !== "GET" && request.method !== "HEAD")
      if (content)
        switch (content) {
          case "application/json":
            body = await request.json();
            break;
          case "text/plain":
            body = await request.text();
            break;
          case "application/x-www-form-urlencoded":
            body = parseQuery(await request.text());
            break;
          case "application/octet-stream":
            body = await request.arrayBuffer();
            break;
          case "multipart/form-data":
            body = {};
            let form2 = await request.formData();
            for (let key of form2.keys()) {
              if (body[key])
                continue;
              let value2 = form2.getAll(key);
              if (value2.length === 1)
                body[key] = value2[0];
              else
                body[key] = value2;
            }
            break;
        }
      else {
        let contentType = request.headers.get("content-type");
        if (contentType) {
          let index = contentType.indexOf(";");
          if (index !== -1)
            contentType = contentType.slice(0, index);
          context.contentType = contentType;
          for (let i = 0;i < hooks.parse.length; i++) {
            let hook = hooks.parse[i].fn, temp = hook(context, contentType);
            if (temp instanceof Promise)
              temp = await temp;
            if (temp) {
              body = temp;
              break;
            }
          }
          if (delete context.contentType, body === undefined)
            switch (contentType) {
              case "application/json":
                body = await request.json();
                break;
              case "text/plain":
                body = await request.text();
                break;
              case "application/x-www-form-urlencoded":
                body = parseQuery(await request.text());
                break;
              case "application/octet-stream":
                body = await request.arrayBuffer();
                break;
              case "multipart/form-data":
                body = {};
                let form2 = await request.formData();
                for (let key of form2.keys()) {
                  if (body[key])
                    continue;
                  let value2 = form2.getAll(key);
                  if (value2.length === 1)
                    body[key] = value2[0];
                  else
                    body[key] = value2;
                }
                break;
            }
        }
      }
    context.body = body, context.params = handler?.params || undefined, context.query = qi === -1 ? {} : parseQueryFromURL(url.substring(qi + 1)), context.headers = {};
    for (let [key, value2] of request.headers.entries())
      context.headers[key] = value2;
    let cookieMeta = Object.assign({}, app.config?.cookie, validator?.cookie?.config), cookieHeaderValue = request.headers.get("cookie");
    context.cookie = await parseCookie(context.set, cookieHeaderValue, cookieMeta ? { secrets: cookieMeta.secrets !== undefined ? typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets.join(",") : undefined, sign: cookieMeta.sign === true ? true : cookieMeta.sign !== undefined ? typeof cookieMeta.sign === "string" ? cookieMeta.sign : cookieMeta.sign.join(",") : undefined } : undefined);
    for (let i = 0;i < hooks.transform.length; i++) {
      let hook = hooks.transform[i], operation = hook.fn(context);
      if (hook.subType === "derive")
        if (operation instanceof Promise)
          Object.assign(context, await operation);
        else
          Object.assign(context, operation);
      else if (operation instanceof Promise)
        await operation;
    }
    if (validator) {
      if (validator.createHeaders?.()) {
        let _header = {};
        for (let key in request.headers)
          _header[key] = request.headers.get(key);
        if (validator.headers.Check(_header) === false)
          throw new ValidationError("header", validator.headers, _header);
      } else if (validator.headers?.Decode)
        context.headers = validator.headers.Decode(context.headers);
      if (validator.createParams?.()?.Check(context.params) === false)
        throw new ValidationError("params", validator.params, context.params);
      else if (validator.params?.Decode)
        context.params = validator.params.Decode(context.params);
      if (validator.createQuery?.()?.Check(context.query) === false)
        throw new ValidationError("query", validator.query, context.query);
      else if (validator.query?.Decode)
        context.query = validator.query.Decode(context.query);
      if (validator.createCookie?.()) {
        let cookieValue = {};
        for (let [key, value2] of Object.entries(context.cookie))
          cookieValue[key] = value2.value;
        if (validator.cookie.Check(cookieValue) === false)
          throw new ValidationError("cookie", validator.cookie, cookieValue);
        else if (validator.cookie?.Decode)
          cookieValue = validator.cookie.Decode(cookieValue);
      }
      if (validator.createBody?.()?.Check(body) === false)
        throw new ValidationError("body", validator.body, body);
      else if (validator.body?.Decode)
        context.body = validator.body.Decode(body);
    }
    for (let i = 0;i < hooks.beforeHandle.length; i++) {
      let hook = hooks.beforeHandle[i], response2 = hook.fn(context);
      if (hook.subType === "resolve") {
        if (response2 instanceof ElysiaCustomStatusResponse) {
          let result = mapEarlyResponse(response2, context.set);
          if (result)
            return context.response = result;
        }
        if (response2 instanceof Promise)
          Object.assign(context, await response2);
        else
          Object.assign(context, response2);
        continue;
      } else if (response2 instanceof Promise)
        response2 = await response2;
      if (response2 !== undefined) {
        context.response = response2;
        for (let i2 = 0;i2 < hooks.afterHandle.length; i2++) {
          let newResponse = hooks.afterHandle[i2].fn(context);
          if (newResponse instanceof Promise)
            newResponse = await newResponse;
          if (newResponse)
            response2 = newResponse;
        }
        let result = mapEarlyResponse(response2, context.set);
        if (result)
          return context.response = result;
      }
    }
    let response = handle(context);
    if (response instanceof Promise)
      response = await response;
    if (!hooks.afterHandle.length) {
      let status = response instanceof ElysiaCustomStatusResponse ? response.code : set22.status ? typeof set22.status === "string" ? StatusMap[set22.status] : set22.status : 200, responseValidator = validator?.createResponse?.()?.[status];
      if (responseValidator?.Check(response) === false)
        throw new ValidationError("response", responseValidator, response);
      else if (responseValidator?.Decode)
        response = responseValidator.Decode(response);
    } else {
      context.response = response;
      for (let i = 0;i < hooks.afterHandle.length; i++) {
        let newResponse = hooks.afterHandle[i].fn(context);
        if (newResponse instanceof Promise)
          newResponse = await newResponse;
        let result = mapEarlyResponse(newResponse, context.set);
        if (result !== undefined) {
          let responseValidator = validator?.response?.[result.status];
          if (responseValidator?.Check(result) === false)
            throw new ValidationError("response", responseValidator, result);
          else if (responseValidator?.Decode)
            response = responseValidator.Decode(response);
          return context.response = result;
        }
      }
    }
    if (context.set.cookie && cookieMeta?.sign) {
      let secret = !cookieMeta.secrets ? undefined : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
      if (cookieMeta.sign === true)
        for (let [key, cookie] of Object.entries(context.set.cookie))
          context.set.cookie[key].value = await signCookie(cookie.value, "${secret}");
      else {
        let properties = validator?.cookie?.schema?.properties;
        for (let name of cookieMeta.sign) {
          if (!(name in properties))
            continue;
          if (context.set.cookie[name]?.value)
            context.set.cookie[name].value = await signCookie(context.set.cookie[name].value, secret);
        }
      }
    }
    return context.response = mapResponse(response, context.set);
  } catch (error22) {
    let reportedError = error22 instanceof TransformDecodeError && error22.error ? error22.error : error22;
    if (reportedError.status)
      set22.status = reportedError.status;
    return app.handleError(context, reportedError);
  } finally {
    for (let afterResponse of app.event.afterResponse)
      await afterResponse.fn(context);
  }
};
var createDynamicErrorHandler = (app) => async (context, error22) => {
  let errorContext = Object.assign(context, { error: error22, code: error22.code });
  errorContext.set = context.set;
  for (let i = 0;i < app.event.error.length; i++) {
    let response = app.event.error[i].fn(errorContext);
    if (response instanceof Promise)
      response = await response;
    if (response !== undefined && response !== null)
      return context.response = mapResponse(response, context.set);
  }
  return new Response(typeof error22.cause === "string" ? error22.cause : error22.message, { headers: context.set.headers, status: error22.status ?? 500 });
};

class Elysia {
  config;
  server = null;
  dependencies = {};
  _routes = {};
  _types = { Prefix: "", Scoped: false, Singleton: {}, Definitions: {}, Metadata: {} };
  _ephemeral = {};
  _volatile = {};
  static version = version;
  version = version;
  singleton = { decorator: {}, store: {}, derive: {}, resolve: {} };
  get store() {
    return this.singleton.store;
  }
  get decorator() {
    return this.singleton.decorator;
  }
  get _scoped() {
    return this.config.scoped;
  }
  definitions = { type: {}, error: {} };
  extender = { macros: [], higherOrderFunctions: [] };
  validator = { global: null, scoped: null, local: null, getCandidate() {
    return mergeSchemaValidator(mergeSchemaValidator(this.global, this.scoped), this.local);
  } };
  event = { start: [], request: [], parse: [], transform: [], beforeHandle: [], afterHandle: [], mapResponse: [], afterResponse: [], trace: [], error: [], stop: [] };
  telemetry = { stack: undefined };
  router = { http: new Y, ws: new Y, dynamic: new Y, static: { http: { static: {}, handlers: [], map: {}, all: "" }, ws: {} }, history: [] };
  routeTree = new Map;
  get routes() {
    return this.router.history;
  }
  getGlobalRoutes() {
    return this.router.history;
  }
  inference = { body: false, cookie: false, headers: false, query: false, set: false, server: false };
  getServer() {
    return this.server;
  }
  _promisedModules;
  get promisedModules() {
    if (!this._promisedModules)
      this._promisedModules = new PromiseGroup;
    return this._promisedModules;
  }
  constructor(config = {}) {
    if (config.tags)
      if (!config.detail)
        config.detail = { tags: config.tags };
      else
        config.detail.tags = config.tags;
    if (config.nativeStaticResponse === undefined)
      config.nativeStaticResponse = true;
    if (this.config = {}, this.applyConfig(config ?? {}), config?.analytic && (config?.name || config?.seed !== undefined))
      this.telemetry.stack = new Error().stack;
  }
  env(model, env2 = Bun?.env ?? process.env) {
    if (getSchemaValidator(model, { dynamic: true, additionalProperties: true, coerce: true }).Check(env2) === false) {
      let error22 = new ValidationError("env", model, env2);
      throw new Error(error22.all.map((x) => x.summary).join(`
`));
    }
    return this;
  }
  wrap(fn) {
    return this.extender.higherOrderFunctions.push({ checksum: checksum(JSON.stringify({ name: this.config.name, seed: this.config.seed, content: fn.toString() })), fn }), this;
  }
  applyMacro(localHook) {
    if (this.extender.macros.length) {
      let manage = createMacroManager({ globalHook: this.event, localHook }), manager = { events: { global: this.event, local: localHook }, onParse: manage("parse"), onTransform: manage("transform"), onBeforeHandle: manage("beforeHandle"), onAfterHandle: manage("afterHandle"), mapResponse: manage("mapResponse"), onAfterResponse: manage("afterResponse"), onError: manage("error") };
      for (let macro of this.extender.macros)
        traceBackMacro(macro.fn(manager), localHook);
    }
  }
  applyConfig(config) {
    return this.config = { prefix: "", aot: true, strictPath: false, global: false, analytic: false, normalize: true, ...config, cookie: { path: "/", ...config?.cookie }, experimental: config?.experimental ?? {}, seed: config?.seed === undefined ? "" : config?.seed }, this;
  }
  get models() {
    let models = {};
    for (let [name, schema3] of Object.entries(this.definitions.type))
      models[name] = getSchemaValidator(schema3);
    return models;
  }
  add(method, path, handle, localHook, { allowMeta = false, skipPrefix = false } = { allowMeta: false, skipPrefix: false }) {
    if (localHook = localHookToLifeCycleStore(localHook), path !== "" && path.charCodeAt(0) !== 47)
      path = "/" + path;
    if (this.config.prefix && !skipPrefix && !this.config.scoped)
      path = this.config.prefix + path;
    if (localHook?.type)
      switch (localHook.type) {
        case "text":
          localHook.type = "text/plain";
          break;
        case "json":
          localHook.type = "application/json";
          break;
        case "formdata":
          localHook.type = "multipart/form-data";
          break;
        case "urlencoded":
          localHook.type = "application/x-www-form-urlencoded";
          break;
        case "arrayBuffer":
          localHook.type = "application/octet-stream";
          break;
        default:
          break;
      }
    let models = this.definitions.type, dynamic = !this.config.aot, instanceValidator = { ...this.validator.getCandidate() }, cloned = { body: localHook?.body ?? instanceValidator?.body, headers: localHook?.headers ?? instanceValidator?.headers, params: localHook?.params ?? instanceValidator?.params, query: localHook?.query ?? instanceValidator?.query, cookie: localHook?.cookie ?? instanceValidator?.cookie, response: localHook?.response ?? instanceValidator?.response }, cookieValidator = () => cloned.cookie ? getCookieValidator({ validator: cloned.cookie, defaultConfig: this.config.cookie, config: cloned.cookie?.config ?? {}, dynamic, models }) : undefined, normalize = this.config.normalize, validator = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.schema === true ? { body: getSchemaValidator(cloned.body, { dynamic, models, normalize, additionalCoerce: coercePrimitiveRoot() }), headers: getSchemaValidator(cloned.headers, { dynamic, models, additionalProperties: !this.config.normalize, coerce: true, additionalCoerce: stringToStructureCoercions() }), params: getSchemaValidator(cloned.params, { dynamic, models, coerce: true, additionalCoerce: stringToStructureCoercions() }), query: getSchemaValidator(cloned.query, { dynamic, models, normalize, coerce: true, additionalCoerce: stringToStructureCoercions() }), cookie: cookieValidator(), response: getResponseSchemaValidator(cloned.response, { dynamic, models, normalize }) } : { createBody() {
      if (this.body)
        return this.body;
      return this.body = getSchemaValidator(cloned.body, { dynamic, models, normalize, additionalCoerce: coercePrimitiveRoot() });
    }, createHeaders() {
      if (this.headers)
        return this.headers;
      return this.headers = getSchemaValidator(cloned.headers, { dynamic, models, additionalProperties: !normalize, coerce: true, additionalCoerce: stringToStructureCoercions() });
    }, createParams() {
      if (this.params)
        return this.params;
      return this.params = getSchemaValidator(cloned.params, { dynamic, models, coerce: true, additionalCoerce: stringToStructureCoercions() });
    }, createQuery() {
      if (this.query)
        return this.query;
      return this.query = getSchemaValidator(cloned.query, { dynamic, models, coerce: true, additionalCoerce: stringToStructureCoercions() });
    }, createCookie() {
      if (this.cookie)
        return this.cookie;
      return this.cookie = cookieValidator();
    }, createResponse() {
      if (this.response)
        return this.response;
      return this.response = getResponseSchemaValidator(cloned.response, { dynamic, models, normalize });
    } }, loosePath = path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
    if (localHook = mergeHook(localHook, instanceValidator), localHook.tags)
      if (!localHook.detail)
        localHook.detail = { tags: localHook.tags };
      else
        localHook.detail.tags = localHook.tags;
    if (isNotEmpty(this.config.detail))
      localHook.detail = mergeDeep(Object.assign({}, this.config.detail), localHook.detail);
    this.applyMacro(localHook);
    let hooks = mergeHook(this.event, localHook);
    if (this.config.aot === false) {
      if (this.router.dynamic.add(method, path, { validator, hooks, content: localHook?.type, handle }), this.config.strictPath === false)
        this.router.dynamic.add(method, loosePath, { validator, hooks, content: localHook?.type, handle });
      this.router.history.push({ method, path, composed: null, handler: handle, hooks });
      return;
    }
    let shouldPrecompile = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.compose === true, inference = cloneInference(this.inference), staticHandler = typeof handle !== "function" ? createStaticHandler(handle, hooks, this.setHeaders) : undefined, nativeStaticHandler = typeof handle !== "function" ? createNativeStaticHandler(handle, hooks, this.setHeaders) : undefined;
    if (this.config.nativeStaticResponse === true && nativeStaticHandler && (method === "GET" || method === "ALL"))
      this.router.static.http.static[path] = nativeStaticHandler();
    let compile = () => composeHandler({ app: this, path, method, localHook: mergeHook(localHook), hooks, validator, handler: handle, allowMeta, inference }), mainHandler = shouldPrecompile ? compile() : (context) => {
      return compile()(context);
    }, routeIndex = this.router.history.length;
    if (this.routeTree.has(method + path))
      for (let i = 0;i < this.router.history.length; i++) {
        let route = this.router.history[i];
        if (route.path === path && route.method === method) {
          let removed = this.router.history.splice(i, 1)[0];
          if (removed && this.routeTree.has(removed?.method + removed?.path))
            this.routeTree.delete(removed.method + removed.path);
        }
      }
    else
      this.routeTree.set(method + path, routeIndex);
    this.router.history.push({ method, path, composed: mainHandler, handler: handle, hooks });
    let staticRouter = this.router.static.http, handler = { handler: shouldPrecompile ? mainHandler : undefined, compile };
    if (method === "$INTERNALWS") {
      let loose = this.config.strictPath ? undefined : path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
      if (path.indexOf(":") === -1 && path.indexOf("*") === -1) {
        let index = staticRouter.handlers.length;
        if (staticRouter.handlers.push((ctx) => (staticRouter.handlers[index] = compile())(ctx)), this.router.static.ws[path] = index, loose)
          this.router.static.ws[loose] = index;
      } else if (this.router.ws.add("ws", path, handler), loose)
        this.router.ws.add("ws", loose, handler);
      return;
    }
    if (path.indexOf(":") === -1 && path.indexOf("*") === -1) {
      let index = staticRouter.handlers.length;
      if (staticRouter.handlers.push(staticHandler ?? ((ctx2) => (staticRouter.handlers[index] = compile())(ctx2))), !staticRouter.map[path])
        staticRouter.map[path] = { code: "" };
      let ctx = staticHandler ? "" : "ctx";
      if (method === "ALL")
        staticRouter.map[path].all = `default: return st[${index}](${ctx})
`;
      else
        staticRouter.map[path].code = `case '${method}': return st[${index}](${ctx})
${staticRouter.map[path].code}`;
      if (!this.config.strictPath) {
        if (!staticRouter.map[loosePath])
          staticRouter.map[loosePath] = { code: "" };
        if (this.config.nativeStaticResponse === true && nativeStaticHandler && (method === "GET" || method === "ALL"))
          this.router.static.http.static[loosePath] = nativeStaticHandler();
        if (method === "ALL")
          staticRouter.map[loosePath].all = `default: return st[${index}](${ctx})
`;
        else
          staticRouter.map[loosePath].code = `case '${method}': return st[${index}](${ctx})
${staticRouter.map[loosePath].code}`;
      }
    } else if (this.router.http.add(method, path, handler), !this.config.strictPath) {
      let loosePath2 = path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
      if (this.config.nativeStaticResponse === true && staticHandler && (method === "GET" || method === "ALL"))
        this.router.static.http.static[loosePath2] = staticHandler();
      this.router.http.add(method, loosePath2, handler);
    }
  }
  setHeaders;
  headers(header) {
    if (!header)
      return this;
    if (!this.setHeaders)
      this.setHeaders = {};
    return this.setHeaders = mergeDeep(this.setHeaders, header), this;
  }
  onStart(handler) {
    return this.on("start", handler), this;
  }
  onRequest(handler) {
    return this.on("request", handler), this;
  }
  onParse(options, handler) {
    if (!handler)
      return this.on("parse", options);
    return this.on(options, "parse", handler);
  }
  onTransform(options, handler) {
    if (!handler)
      return this.on("transform", options);
    return this.on(options, "transform", handler);
  }
  resolve(optionsOrResolve, resolve) {
    if (!resolve)
      resolve = optionsOrResolve, optionsOrResolve = { as: "local" };
    let hook = { subType: "resolve", fn: resolve };
    return this.onBeforeHandle(optionsOrResolve, hook);
  }
  mapResolve(optionsOrResolve, mapper) {
    if (!mapper)
      mapper = optionsOrResolve, optionsOrResolve = { as: "local" };
    let hook = { subType: "mapResolve", fn: mapper };
    return this.onBeforeHandle(optionsOrResolve, hook);
  }
  onBeforeHandle(options, handler) {
    if (!handler)
      return this.on("beforeHandle", options);
    return this.on(options, "beforeHandle", handler);
  }
  onAfterHandle(options, handler) {
    if (!handler)
      return this.on("afterHandle", options);
    return this.on(options, "afterHandle", handler);
  }
  mapResponse(options, handler) {
    if (!handler)
      return this.on("mapResponse", options);
    return this.on(options, "mapResponse", handler);
  }
  onAfterResponse(options, handler) {
    if (!handler)
      return this.on("afterResponse", options);
    return this.on(options, "afterResponse", handler);
  }
  trace(options, handler) {
    if (!handler)
      handler = options, options = { as: "local" };
    if (!Array.isArray(handler))
      handler = [handler];
    for (let fn of handler)
      this.on(options, "trace", createTracer(fn));
    return this;
  }
  error(name, error22) {
    switch (typeof name) {
      case "string":
        return error22.prototype[ERROR_CODE] = name, this.definitions.error[name] = error22, this;
      case "function":
        return this.definitions.error = name(this.definitions.error), this;
    }
    for (let [code, error32] of Object.entries(name))
      error32.prototype[ERROR_CODE] = code, this.definitions.error[code] = error32;
    return this;
  }
  onError(options, handler) {
    if (!handler)
      return this.on("error", options);
    return this.on(options, "error", handler);
  }
  onStop(handler) {
    return this.on("stop", handler), this;
  }
  on(optionsOrType, typeOrHandlers, handlers) {
    let type3;
    switch (typeof optionsOrType) {
      case "string":
        type3 = optionsOrType, handlers = typeOrHandlers;
        break;
      case "object":
        if (type3 = typeOrHandlers, !Array.isArray(typeOrHandlers) && typeof typeOrHandlers === "object")
          handlers = typeOrHandlers;
        break;
    }
    if (Array.isArray(handlers))
      handlers = fnToContainer(handlers);
    else if (typeof handlers === "function")
      handlers = [{ fn: handlers }];
    else
      handlers = [handlers];
    let handles = handlers;
    for (let handle of handles)
      handle.scope = typeof optionsOrType === "string" ? "local" : optionsOrType?.as ?? "local";
    if (type3 !== "trace")
      sucrose({ [type3]: handles.map((x) => x.fn) }, this.inference);
    for (let handle of handles) {
      let fn = asHookType(handle, "global", { skipIfHasType: true });
      switch (type3) {
        case "start":
          this.event.start.push(fn);
          break;
        case "request":
          this.event.request.push(fn);
          break;
        case "parse":
          this.event.parse.push(fn);
          break;
        case "transform":
          this.event.transform.push(fn);
          break;
        case "beforeHandle":
          this.event.beforeHandle.push(fn);
          break;
        case "afterHandle":
          this.event.afterHandle.push(fn);
          break;
        case "mapResponse":
          this.event.mapResponse.push(fn);
          break;
        case "afterResponse":
          this.event.afterResponse.push(fn);
          break;
        case "trace":
          this.event.trace.push(fn);
          break;
        case "error":
          this.event.error.push(fn);
          break;
        case "stop":
          this.event.stop.push(fn);
          break;
      }
    }
    return this;
  }
  propagate() {
    return promoteEvent(this.event.parse), promoteEvent(this.event.transform), promoteEvent(this.event.beforeHandle), promoteEvent(this.event.afterHandle), promoteEvent(this.event.mapResponse), promoteEvent(this.event.afterResponse), promoteEvent(this.event.trace), promoteEvent(this.event.error), this;
  }
  as(type3) {
    let castType = { plugin: "scoped", global: "global" }[type3];
    if (promoteEvent(this.event.parse, castType), promoteEvent(this.event.transform, castType), promoteEvent(this.event.beforeHandle, castType), promoteEvent(this.event.afterHandle, castType), promoteEvent(this.event.mapResponse, castType), promoteEvent(this.event.afterResponse, castType), promoteEvent(this.event.trace, castType), promoteEvent(this.event.error, castType), type3 === "plugin")
      this.validator.scoped = mergeSchemaValidator(this.validator.scoped, this.validator.local), this.validator.local = null;
    else if (type3 === "global")
      this.validator.global = mergeSchemaValidator(this.validator.global, mergeSchemaValidator(this.validator.scoped, this.validator.local)), this.validator.scoped = null, this.validator.local = null;
    return this;
  }
  group(prefix, schemaOrRun, run) {
    let instance = new Elysia({ ...this.config, prefix: "" });
    instance.singleton = { ...this.singleton }, instance.definitions = { ...this.definitions }, instance.getServer = () => this.getServer(), instance.inference = cloneInference(this.inference), instance.extender = { ...this.extender };
    let isSchema = typeof schemaOrRun === "object", sandbox = (isSchema ? run : schemaOrRun)(instance);
    if (this.singleton = mergeDeep(this.singleton, instance.singleton), this.definitions = mergeDeep(this.definitions, instance.definitions), sandbox.event.request.length)
      this.event.request = [...this.event.request || [], ...sandbox.event.request || []];
    if (sandbox.event.mapResponse.length)
      this.event.mapResponse = [...this.event.mapResponse || [], ...sandbox.event.mapResponse || []];
    return this.model(sandbox.definitions.type), Object.values(instance.router.history).forEach(({ method, path, handler, hooks }) => {
      if (path = (isSchema ? "" : this.config.prefix) + prefix + path, isSchema) {
        let hook = schemaOrRun, localHook = hooks;
        this.add(method, path, handler, mergeHook(hook, { ...localHook || {}, error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [...localHook.error || {}, ...sandbox.event.error || {}] : [localHook.error, ...sandbox.event.error || {}] }));
      } else
        this.add(method, path, handler, mergeHook(hooks, { error: sandbox.event.error }), { skipPrefix: true });
    }), this;
  }
  guard(hook, run) {
    if (!run) {
      if (typeof hook === "object") {
        this.applyMacro(hook);
        let type3 = hook.as ?? "local";
        if (this.validator[type3] = { body: hook.body ?? this.validator[type3]?.body, headers: hook.headers ?? this.validator[type3]?.headers, params: hook.params ?? this.validator[type3]?.params, query: hook.query ?? this.validator[type3]?.query, response: hook.response ?? this.validator[type3]?.response, cookie: hook.cookie ?? this.validator[type3]?.cookie }, hook.parse)
          this.on({ as: type3 }, "parse", hook.parse);
        if (hook.transform)
          this.on({ as: type3 }, "transform", hook.transform);
        if (hook.beforeHandle)
          this.on({ as: type3 }, "beforeHandle", hook.beforeHandle);
        if (hook.afterHandle)
          this.on({ as: type3 }, "afterHandle", hook.afterHandle);
        if (hook.mapResponse)
          this.on({ as: type3 }, "mapResponse", hook.mapResponse);
        if (hook.afterResponse)
          this.on({ as: type3 }, "afterResponse", hook.afterResponse);
        if (hook.error)
          this.on({ as: type3 }, "error", hook.error);
        if (hook.detail)
          if (this.config.detail)
            this.config.detail = mergeDeep(Object.assign({}, this.config.detail), hook.detail);
          else
            this.config.detail = hook.detail;
        if (hook?.tags)
          if (!this.config.detail)
            this.config.detail = { tags: hook.tags };
          else
            this.config.detail.tags = hook.tags;
        return this;
      }
      return this.guard({}, hook);
    }
    let instance = new Elysia({ ...this.config, prefix: "" });
    instance.singleton = { ...this.singleton }, instance.definitions = { ...this.definitions }, instance.inference = cloneInference(this.inference), instance.extender = { ...this.extender };
    let sandbox = run(instance);
    if (this.singleton = mergeDeep(this.singleton, instance.singleton), this.definitions = mergeDeep(this.definitions, instance.definitions), sandbox.getServer = () => this.server, sandbox.event.request.length)
      this.event.request = [...this.event.request || [], ...sandbox.event.request || []];
    if (sandbox.event.mapResponse.length)
      this.event.mapResponse = [...this.event.mapResponse || [], ...sandbox.event.mapResponse || []];
    return this.model(sandbox.definitions.type), Object.values(instance.router.history).forEach(({ method, path, handler, hooks: localHook }) => {
      this.add(method, path, handler, mergeHook(hook, { ...localHook || {}, error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [...localHook.error || {}, ...sandbox.event.error || []] : [localHook.error, ...sandbox.event.error || []] }));
    }), this;
  }
  use(plugin, options) {
    if (options?.scoped)
      return this.guard({}, (app) => app.use(plugin));
    if (Array.isArray(plugin)) {
      let current = this;
      for (let p of plugin)
        current = this.use(p);
      return current;
    }
    if (plugin instanceof Promise)
      return this.promisedModules.add(plugin.then((plugin2) => {
        if (typeof plugin2 === "function")
          return plugin2(this);
        if (plugin2 instanceof Elysia)
          return this._use(plugin2).compile();
        if (typeof plugin2.default === "function")
          return plugin2.default(this);
        if (plugin2.default instanceof Elysia)
          return this._use(plugin2.default);
        throw new Error('Invalid plugin type. Expected Elysia instance, function, or module with "default" as Elysia instance or function that returns Elysia instance.');
      }).then((x) => x.compile())), this;
    return this._use(plugin);
  }
  _use(plugin) {
    if (typeof plugin === "function") {
      let instance = plugin(this);
      if (instance instanceof Promise)
        return this.promisedModules.add(instance.then((plugin2) => {
          if (plugin2 instanceof Elysia) {
            plugin2.getServer = () => this.getServer(), plugin2.getGlobalRoutes = () => this.getGlobalRoutes(), plugin2.model(this.definitions.type), plugin2.error(this.definitions.error);
            for (let { method, path, handler, hooks } of Object.values(plugin2.router.history))
              this.add(method, path, handler, mergeHook(hooks, { error: plugin2.event.error }));
            return plugin2.compile(), plugin2;
          }
          if (typeof plugin2 === "function")
            return plugin2(this);
          if (typeof plugin2.default === "function")
            return plugin2.default(this);
          return this._use(plugin2);
        }).then((x) => x.compile())), this;
      return instance;
    }
    let { name, seed } = plugin.config;
    plugin.getServer = () => this.getServer(), plugin.getGlobalRoutes = () => this.getGlobalRoutes(), plugin.model(this.definitions.type), plugin.error(this.definitions.error);
    let isScoped = plugin.config.scoped;
    if (isScoped) {
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        let current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          return this;
        this.dependencies[name].push(!this.config?.analytic ? { name: plugin.config.name, seed: plugin.config.seed, checksum: current, dependencies: plugin.dependencies } : { name: plugin.config.name, seed: plugin.config.seed, checksum: current, dependencies: plugin.dependencies, stack: plugin.telemetry.stack, routes: plugin.router.history, decorators: plugin.singleton.decorator, store: plugin.singleton.store, type: plugin.definitions.type, error: plugin.definitions.error, derive: plugin.event.transform.filter((x) => x.subType === "derive").map((x) => ({ fn: x.fn.toString(), stack: new Error().stack ?? "" })), resolve: plugin.event.transform.filter((x) => x.subType === "derive").map((x) => ({ fn: x.fn.toString(), stack: new Error().stack ?? "" })) });
      }
      plugin.extender.macros = this.extender.macros.concat(plugin.extender.macros);
      let macroHashes = [];
      for (let i = 0;i < plugin.extender.macros.length; i++) {
        let macro = this.extender.macros[i];
        if (macroHashes.includes(macro.checksum))
          plugin.extender.macros.splice(i, 1), i--;
        macroHashes.push(macro.checksum);
      }
      if (plugin.onRequest((context) => {
        Object.assign(context, this.singleton.decorator), Object.assign(context.store, this.singleton.store);
      }), plugin.event.trace.length)
        plugin.event.trace.push(...plugin.event.trace);
      if (!plugin.config.prefix)
        console.warn("It's recommended to use scoped instance with a prefix to prevent collision routing with other instance.");
      if (plugin.event.error.length)
        plugin.event.error.push(...this.event.error);
      if (plugin.config.aot)
        plugin.compile();
      if (isScoped === true && plugin.config.prefix) {
        this.mount(plugin.config.prefix + "/", plugin.fetch);
        for (let route of plugin.router.history)
          this.routeTree.set(route.method + `${plugin.config.prefix}${route.path}`, this.router.history.length), this.router.history.push({ ...route, path: `${plugin.config.prefix}${route.path}`, hooks: mergeHook(route.hooks, { error: this.event.error }) });
      } else {
        this.mount(plugin.fetch);
        for (let route of plugin.router.history)
          this.routeTree.set(route.method + `${plugin.config.prefix}${route.path}`, this.router.history.length), this.router.history.push({ ...route, path: `${plugin.config.prefix}${route.path}`, hooks: mergeHook(route.hooks, { error: this.event.error }) });
      }
      return this;
    } else {
      if (this.headers(plugin.setHeaders), name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        let current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (!this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          this.extender.macros = this.extender.macros.concat(plugin.extender.macros), this.extender.higherOrderFunctions = this.extender.higherOrderFunctions.concat(plugin.extender.higherOrderFunctions);
      } else
        this.extender.macros = this.extender.macros.concat(plugin.extender.macros), this.extender.higherOrderFunctions = this.extender.higherOrderFunctions.concat(plugin.extender.higherOrderFunctions);
      deduplicateChecksum(this.extender.macros), deduplicateChecksum(this.extender.higherOrderFunctions);
      let hofHashes = [];
      for (let i = 0;i < this.extender.higherOrderFunctions.length; i++) {
        let hof = this.extender.higherOrderFunctions[i];
        if (hof.checksum) {
          if (hofHashes.includes(hof.checksum))
            this.extender.higherOrderFunctions.splice(i, 1), i--;
          hofHashes.push(hof.checksum);
        }
      }
      this.inference = { body: this.inference.body || plugin.inference.body, cookie: this.inference.cookie || plugin.inference.cookie, headers: this.inference.headers || plugin.inference.headers, query: this.inference.query || plugin.inference.query, set: this.inference.set || plugin.inference.set, server: this.inference.server || plugin.inference.server };
    }
    this.decorate(plugin.singleton.decorator), this.state(plugin.singleton.store), this.model(plugin.definitions.type), this.error(plugin.definitions.error), plugin.extender.macros = this.extender.macros.concat(plugin.extender.macros);
    for (let { method, path, handler, hooks } of Object.values(plugin.router.history))
      this.add(method, path, handler, mergeHook(hooks, { error: plugin.event.error }));
    if (!isScoped)
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        let current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          return this;
        this.dependencies[name].push(!this.config?.analytic ? { name: plugin.config.name, seed: plugin.config.seed, checksum: current, dependencies: plugin.dependencies } : { name: plugin.config.name, seed: plugin.config.seed, checksum: current, dependencies: plugin.dependencies, stack: plugin.telemetry.stack, routes: plugin.router.history, decorators: plugin.singleton, store: plugin.singleton.store, type: plugin.definitions.type, error: plugin.definitions.error, derive: plugin.event.transform.filter((x) => x?.subType === "derive").map((x) => ({ fn: x.toString(), stack: new Error().stack ?? "" })), resolve: plugin.event.transform.filter((x) => x?.subType === "resolve").map((x) => ({ fn: x.toString(), stack: new Error().stack ?? "" })) }), this.event = mergeLifeCycle(this.event, filterGlobalHook(plugin.event), current);
      } else
        this.event = mergeLifeCycle(this.event, filterGlobalHook(plugin.event));
    return this.validator.global = mergeHook(this.validator.global, { ...plugin.validator.global }), this.validator.local = mergeHook(this.validator.local, { ...plugin.validator.scoped }), this;
  }
  macro(macro) {
    let hook = { checksum: checksum(JSON.stringify({ name: this.config.name, seed: this.config.seed, content: macro.toString() })), fn: macro };
    return this.extender.macros.push(hook), this;
  }
  mount(path, handle) {
    if (path instanceof Elysia || typeof path === "function" || path.length === 0 || path === "/") {
      let run = typeof path === "function" ? path : path instanceof Elysia ? path.compile().fetch : handle instanceof Elysia ? handle.compile().fetch : handle, handler2 = async ({ request, path: path2 }) => {
        if (request.method === "GET" || request.method === "HEAD" || !request.headers.get("content-type"))
          return run(new Request(replaceUrlPath(request.url, path2 || "/"), request));
        return run(new Request(replaceUrlPath(request.url, path2 || "/"), { ...request, body: await request.arrayBuffer() }));
      };
      return this.all("/*", handler2, { type: "none" }), this;
    }
    let length = path.length;
    if (handle instanceof Elysia)
      handle = handle.compile().fetch;
    let handler = async ({ request, path: path2 }) => {
      if (request.method === "GET" || request.method === "HEAD" || !request.headers.get("content-type"))
        return handle(new Request(replaceUrlPath(request.url, path2.slice(length) || "/"), request));
      return handle(new Request(replaceUrlPath(request.url, path2.slice(length) || "/"), { ...request, body: await request.arrayBuffer() }));
    };
    return this.all(path, handler, { type: "none" }), this.all(path + (path.endsWith("/") ? "*" : "/*"), handler, { type: "none" }), this;
  }
  get(path, handler, hook) {
    return this.add("GET", path, handler, hook), this;
  }
  post(path, handler, hook) {
    return this.add("POST", path, handler, hook), this;
  }
  put(path, handler, hook) {
    return this.add("PUT", path, handler, hook), this;
  }
  patch(path, handler, hook) {
    return this.add("PATCH", path, handler, hook), this;
  }
  delete(path, handler, hook) {
    return this.add("DELETE", path, handler, hook), this;
  }
  options(path, handler, hook) {
    return this.add("OPTIONS", path, handler, hook), this;
  }
  all(path, handler, hook) {
    return this.add("ALL", path, handler, hook), this;
  }
  head(path, handler, hook) {
    return this.add("HEAD", path, handler, hook), this;
  }
  connect(path, handler, hook) {
    return this.add("CONNECT", path, handler, hook), this;
  }
  route(method, path, handler, hook) {
    return this.add(method.toUpperCase(), path, handler, hook, hook?.config), this;
  }
  ws(path, options) {
    let transform4 = options.transformMessage ? Array.isArray(options.transformMessage) ? options.transformMessage : [options.transformMessage] : undefined, server = null, validateMessage = getSchemaValidator(options?.body, { models: this.definitions.type, normalize: this.config.normalize }), validateResponse = getSchemaValidator(options?.response, { models: this.definitions.type, normalize: this.config.normalize }), parseMessage = (message) => {
      if (typeof message === "string") {
        let start = message?.charCodeAt(0);
        if (start === 47 || start === 123)
          try {
            message = JSON.parse(message);
          } catch {
          }
        else if (isNumericString(message))
          message = +message;
      }
      if (transform4?.length)
        for (let i = 0;i < transform4.length; i++) {
          let temp = transform4[i](message);
          if (temp !== undefined)
            message = temp;
        }
      return message;
    };
    return this.route("$INTERNALWS", path, (context) => {
      let { set: set22, path: path2, qi, headers, query, params } = context;
      if (server === null)
        server = this.getServer();
      if (server?.upgrade(context.request, { headers: typeof options.upgrade === "function" ? options.upgrade(context) : options.upgrade, data: { validator: validateResponse, open(ws) {
        options.open?.(new ElysiaWS(ws, context));
      }, message: (ws, msg) => {
        let message = parseMessage(msg);
        if (validateMessage?.Check(message) === false)
          return void ws.send(new ValidationError("message", validateMessage, message).message);
        options.message?.(new ElysiaWS(ws, context), message);
      }, drain(ws) {
        options.drain?.(new ElysiaWS(ws, context));
      }, close(ws, code, reason) {
        options.close?.(new ElysiaWS(ws, context), code, reason);
      } } }))
        return;
      return set22.status = 400, "Expected a websocket connection";
    }, { beforeHandle: options.beforeHandle, transform: options.transform, headers: options.headers, params: options.params, query: options.query }), this;
  }
  state(options, name, value2) {
    if (name === undefined)
      value2 = options, options = { as: "append" }, name = "";
    else if (value2 === undefined) {
      if (typeof options === "string")
        value2 = name, name = options, options = { as: "append" };
      else if (typeof options === "object")
        value2 = name, name = "";
    }
    let { as } = options;
    if (typeof name !== "string")
      return this;
    switch (typeof value2) {
      case "object":
        if (name) {
          if (name in this.singleton.store)
            this.singleton.store[name] = mergeDeep(this.singleton.store[name], value2, { override: as === "override" });
          else
            this.singleton.store[name] = value2;
          return this;
        }
        if (value2 === null)
          return this;
        return this.singleton.store = mergeDeep(this.singleton.store, value2, { override: as === "override" }), this;
      case "function":
        if (name) {
          if (as === "override" || !(name in this.singleton.store))
            this.singleton.store[name] = value2;
        } else
          this.singleton.store = value2(this.singleton.store);
        return this;
      default:
        if (as === "override" || !(name in this.singleton.store))
          this.singleton.store[name] = value2;
        return this;
    }
  }
  decorate(options, name, value2) {
    if (name === undefined)
      value2 = options, options = { as: "append" }, name = "";
    else if (value2 === undefined) {
      if (typeof options === "string")
        value2 = name, name = options, options = { as: "append" };
      else if (typeof options === "object")
        value2 = name, name = "";
    }
    let { as } = options;
    if (typeof name !== "string")
      return this;
    switch (typeof value2) {
      case "object":
        if (name) {
          if (name in this.singleton.decorator)
            this.singleton.decorator[name] = mergeDeep(this.singleton.decorator[name], value2, { override: as === "override" });
          else
            this.singleton.decorator[name] = value2;
          return this;
        }
        if (value2 === null)
          return this;
        return this.singleton.decorator = mergeDeep(this.singleton.decorator, value2, { override: as === "override" }), this;
      case "function":
        if (name) {
          if (as === "override" || !(name in this.singleton.decorator))
            this.singleton.decorator[name] = value2;
        } else
          this.singleton.decorator = value2(this.singleton.decorator);
        return this;
      default:
        if (as === "override" || !(name in this.singleton.decorator))
          this.singleton.decorator[name] = value2;
        return this;
    }
  }
  derive(optionsOrTransform, transform4) {
    if (!transform4)
      transform4 = optionsOrTransform, optionsOrTransform = { as: "local" };
    let hook = { subType: "derive", fn: transform4 };
    return this.onTransform(optionsOrTransform, hook);
  }
  model(name, model) {
    switch (typeof name) {
      case "object":
        return Object.entries(name).forEach(([key, value2]) => {
          if (!(key in this.definitions.type))
            this.definitions.type[key] = value2;
        }), this;
      case "function":
        return this.definitions.type = name(this.definitions.type), this;
    }
    return this.definitions.type[name] = model, this;
  }
  mapDerive(optionsOrDerive, mapper) {
    if (!mapper)
      mapper = optionsOrDerive, optionsOrDerive = { as: "local" };
    let hook = { subType: "mapDerive", fn: mapper };
    return this.onTransform(optionsOrDerive, hook);
  }
  affix(base, type3, word) {
    if (word === "")
      return this;
    let delimieter = ["_", "-", " "], capitalize2 = (word2) => word2[0].toUpperCase() + word2.slice(1), joinKey = base === "prefix" ? (prefix, word2) => delimieter.includes(prefix.at(-1) ?? "") ? prefix + word2 : prefix + capitalize2(word2) : delimieter.includes(word.at(-1) ?? "") ? (suffix, word2) => word2 + suffix : (suffix, word2) => word2 + capitalize2(suffix), remap = (type22) => {
      let store = {};
      switch (type22) {
        case "decorator":
          for (let key in this.singleton.decorator)
            store[joinKey(word, key)] = this.singleton.decorator[key];
          this.singleton.decorator = store;
          break;
        case "state":
          for (let key in this.singleton.store)
            store[joinKey(word, key)] = this.singleton.store[key];
          this.singleton.store = store;
          break;
        case "model":
          for (let key in this.definitions.type)
            store[joinKey(word, key)] = this.definitions.type[key];
          this.definitions.type = store;
          break;
        case "error":
          for (let key in this.definitions.error)
            store[joinKey(word, key)] = this.definitions.error[key];
          this.definitions.error = store;
          break;
      }
    }, types = Array.isArray(type3) ? type3 : [type3];
    for (let type22 of types.some((x) => x === "all") ? ["decorator", "state", "model", "error"] : types)
      remap(type22);
    return this;
  }
  prefix(type3, word) {
    return this.affix("prefix", type3, word);
  }
  suffix(type3, word) {
    return this.affix("suffix", type3, word);
  }
  compile() {
    if (this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this), typeof this.server?.reload === "function")
      this.server.reload({ ...this.server || {}, fetch: this.fetch });
    return this;
  }
  handle = async (request) => this.fetch(request);
  fetch = (request) => {
    return (this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this))(request);
  };
  handleError = async (context, error22) => (this.handleError = this.config.aot ? composeErrorHandler(this) : createDynamicErrorHandler(this))(context, error22);
  outerErrorHandler = (error22) => new Response(error22.message || error22.name || "Error", { status: error22?.status ?? 500 });
  listen = (options, callback) => {
    if (typeof Bun === "undefined")
      throw new Error(".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch");
    if (this.compile(), typeof options === "string") {
      if (!isNumericString(options))
        throw new Error("Port must be a numeric value");
      options = parseInt(options);
    }
    let fetch = this.fetch, serve = typeof options === "object" ? { development: !isProduction, reusePort: true, ...this.config.serve || {}, ...options || {}, static: this.router.static.http.static, websocket: { ...this.config.websocket || {}, ...websocket || {} }, fetch, error: this.outerErrorHandler } : { development: !isProduction, reusePort: true, ...this.config.serve || {}, static: this.router.static.http.static, websocket: { ...this.config.websocket || {}, ...websocket || {} }, port: options, fetch, error: this.outerErrorHandler };
    this.server = Bun?.serve(serve);
    for (let i = 0;i < this.event.start.length; i++)
      this.event.start[i].fn(this);
    if (callback)
      callback(this.server);
    return process.on("beforeExit", () => {
      if (this.server) {
        this.server.stop(), this.server = null;
        for (let i = 0;i < this.event.stop.length; i++)
          this.event.stop[i].fn(this);
      }
    }), this.promisedModules.then(() => {
      Bun?.gc(false);
    }), this;
  };
  stop = async (closeActiveConnections) => {
    if (!this.server)
      throw new Error("Elysia isn't running. Call `app.listen` to start the server.");
    if (this.server) {
      if (this.server.stop(closeActiveConnections), this.server = null, this.event.stop.length)
        for (let i = 0;i < this.event.stop.length; i++)
          this.event.stop[i].fn(this);
    }
  };
  get modules() {
    return Promise.all(this.promisedModules.promises);
  }
}

// src/helper/logger.ts
var import_moment = __toESM(require_moment(), 1);
var import_winston = __toESM(require_winston(), 1);
var { combine, timestamp, printf, colorize } = import_winston.format;
var loggerFormat = printf(({ level, message, timestamp: timestamp2 }) => {
  return `${timestamp2} [${level}]: ${message}`;
});
var Logger = import_winston.createLogger({
  level: "debug",
  format: combine(colorize(), timestamp({
    format: () => import_moment.default().format("ddd, DD MMM YYYY HH:mm:ss")
  }), loggerFormat),
  transports: [new import_winston.transports.Console]
});

// src/helper/http-logger.ts
var HttpLogger = new Elysia().state("loggerContext", {}).onRequest((ctx) => {
  const loggerContext = ctx.store.loggerContext;
  loggerContext.start = process.hrtime();
  loggerContext.url = new URL(ctx.request.url).pathname;
  Logger.http({
    message: `Request | Method: ${ctx.request.method} | Headers: ${JSON.stringify(Object.fromEntries(ctx.request.headers))} | URL: ${loggerContext.url}`
  });
}).onAfterHandle((ctx) => {
  const loggerContext = ctx.store.loggerContext;
  const duration = process.hrtime(loggerContext.start);
  const durationInMs = duration[0] * 1000 + duration[1] / 1e6;
  Logger.http({
    message: `Response | Method: ${ctx.request.method} | URL: ${loggerContext.url} | Status: ${ctx.set.status || 200} | Duration: ${durationInMs.toFixed(2)} ms`
  });
});
// src/helper/business-exception.ts
var BusinessException = {
  successResponse: (data, message) => {
    return {
      statusCode: 200,
      status: true,
      data,
      message
    };
  },
  createdResponse: (message) => {
    return {
      statusCode: 201,
      status: true,
      message
    };
  },
  badRequestResponse: (message, errors2) => {
    return {
      statusCode: 400,
      status: false,
      error: message,
      errors: errors2
    };
  },
  internalServerErrorResponse: () => {
    return {
      statusCode: 500,
      status: false,
      error: "Internal server error"
    };
  },
  unauthorizedResponse: (message) => {
    return {
      statusCode: 401,
      status: false,
      error: message
    };
  }
};
// src/helper/base-response.ts
var StatusCodes = {
  ["created" /* CREATED */]: 201,
  ["success" /* SUCCESS */]: 200,
  ["unauthorized" /* UNAUTHORIZED */]: 403,
  ["forbidden" /* FORBIDDEN */]: 403,
  ["internalServerError" /* INTERNAL_SERVER_ERROR */]: 500
};
var BaseResponse = (res, resMessage, type3, result = null) => {
  let response = res.response;
  const status = StatusCodes[type3] || 200;
  switch (type3) {
    case "created" /* CREATED */:
      response = BusinessException.createdResponse(resMessage);
      break;
    case "success" /* SUCCESS */:
      response = BusinessException.successResponse(result, resMessage);
      break;
    case "unauthorized" /* UNAUTHORIZED */:
    case "forbidden" /* FORBIDDEN */:
      response = BusinessException.unauthorizedResponse(resMessage);
      break;
    case "internalServerError" /* INTERNAL_SERVER_ERROR */:
      response = BusinessException.internalServerErrorResponse();
      break;
    default:
      response = BusinessException.successResponse(result, resMessage);
  }
  res.set.status = status;
  return JSON.stringify(response);
};
// src/helper/request.ts
import { createServer } from "http";
var convertToRequest = async (req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;
  const headers = new Headers(req.headers);
  const options = { method, headers };
  if (method === "POST" || method === "PUT" || method === "PATCH") {
    options.body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        resolve(data);
      });
      req.on("error", (err) => {
        reject(err);
      });
    });
  }
  return new Request(url.toString(), options);
};
var serverless = (app) => createServer(async (req, res) => {
  try {
    const request = await convertToRequest(req);
    const response = await app.fetch(request);
    res.statusCode = response.status;
    res.statusMessage = response.statusText;
    response.headers.forEach((value2, name) => {
      res.setHeader(name, value2);
    });
    const body = await response.text();
    res.end(body);
  } catch (err) {
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});
// src/controller/user-controller.ts
var users = [];

class UserController {
  static async getUser(ctx) {
    const contextLogger = "UserController";
    try {
      Logger.info(`${contextLogger} | getUser`, users);
      return BaseResponse(ctx, "User fetched successfully", "success" /* SUCCESS */, users);
    } catch (error4) {
      return BaseResponse(ctx, "error", "internalServerError" /* INTERNAL_SERVER_ERROR */, null);
    }
  }
  static async createUser(ctx) {
    const contextLogger = "UserController";
    try {
      const payload = ctx.body;
      payload.id = users.length + 1;
      users.push(payload);
      Logger.info(`${contextLogger} | createUser`, users);
      return BaseResponse(ctx, "User created successfully", "success" /* SUCCESS */, users);
    } catch (error4) {
      return BaseResponse(ctx, "error", "internalServerError" /* INTERNAL_SERVER_ERROR */, null);
    }
  }
}

// src/routes/user-route.ts
var basePath = "/user";
var userRoutes = new Elysia().get(`${basePath}`, UserController.getUser).post(`${basePath}/create`, UserController.createUser);

// src/routes/index.ts
var basePath2 = "/api/elysia";
var indexRoutes = new Elysia().group(basePath2, (app) => {
  return app.use(userRoutes);
});

// src/index.ts
var app = new Elysia;
var port = 8000;
app.use(HttpLogger);
app.use(indexRoutes);
var server = serverless(app);
server.listen(port, () => {
  Logger.info(`[Elysia-Service] Server is running on port ${port}`);
});
