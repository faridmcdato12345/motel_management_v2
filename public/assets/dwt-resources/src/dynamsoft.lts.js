/*! 20240417112100
 * Dynamsoft JavaScript Library
 * Product: Dynamic Web TWAIN
 * Web Site: https://www.dynamsoft.com
 *
 * Copyright 2024, Dynamsoft Corporation
 * Author: Dynamsoft Support Team
 * Version: 18.5
 */
(function (D) {
  !(function (a) {
    if ("object" == typeof exports && "undefined" != typeof module)
      module.exports = a();
    else if ("function" == typeof define && define.amd && 0) define([], a);
    else {
      var b;
      (b =
        "undefined" != typeof window
          ? window
          : "undefined" != typeof global
          ? global
          : "undefined" != typeof self
          ? self
          : this),
        (b.localforage = a());
    }
  })(function () {
    return (function a(b, c, d) {
      function e(g, h) {
        if (!c[g]) {
          if (!b[g]) {
            var i = "function" == typeof require && require;
            if (!h && i) return i(g, !0);
            if (f) return f(g, !0);
            var j = new Error("Cannot find module '" + g + "'");
            throw ((j.code = "MODULE_NOT_FOUND"), j);
          }
          var k = (c[g] = { exports: {} });
          b[g][0].call(
            k.exports,
            function (a) {
              var c = b[g][1][a];
              return e(c || a);
            },
            k,
            k.exports,
            a,
            b,
            c,
            d
          );
        }
        return c[g].exports;
      }
      for (
        var f = "function" == typeof require && require, g = 0;
        g < d.length;
        g++
      )
        e(d[g]);
      return e;
    })(
      {
        1: [
          function (a, b, c) {
            (function (a) {
              "use strict";
              function c() {
                k = !0;
                for (var a, b, c = l.length; c; ) {
                  for (b = l, l = [], a = -1; ++a < c; ) b[a]();
                  c = l.length;
                }
                k = !1;
              }
              function d(a) {
                1 !== l.push(a) || k || e();
              }
              var e,
                f = a.MutationObserver || a.WebKitMutationObserver;
              if (f) {
                var g = 0,
                  h = new f(c),
                  i = a.document.createTextNode("");
                h.observe(i, { characterData: !0 }),
                  (e = function () {
                    i.data = g = ++g % 2;
                  });
              } else if (a.setImmediate || void 0 === a.MessageChannel)
                e =
                  "document" in a &&
                  "onreadystatechange" in a.document.createElement("script")
                    ? function () {
                        var b = a.document.createElement("script");
                        (b.onreadystatechange = function () {
                          c(),
                            (b.onreadystatechange = null),
                            b.parentNode.removeChild(b),
                            (b = null);
                        }),
                          a.document.documentElement.appendChild(b);
                      }
                    : function () {
                        setTimeout(c, 0);
                      };
              else {
                var j = new a.MessageChannel();
                (j.port1.onmessage = c),
                  (e = function () {
                    j.port2.postMessage(0);
                  });
              }
              var k,
                l = [];
              b.exports = d;
            }).call(
              this,
              "undefined" != typeof global
                ? global
                : "undefined" != typeof self
                ? self
                : "undefined" != typeof window
                ? window
                : {}
            );
          },
          {},
        ],
        2: [
          function (a, b, c) {
            "use strict";
            function d() {}
            function e(a) {
              if ("function" != typeof a)
                throw new TypeError("resolver must be a function");
              (this.state = s),
                (this.queue = []),
                (this.outcome = void 0),
                a !== d && i(this, a);
            }
            function f(a, b, c) {
              (this.promise = a),
                "function" == typeof b &&
                  ((this.onFulfilled = b),
                  (this.callFulfilled = this.otherCallFulfilled)),
                "function" == typeof c &&
                  ((this.onRejected = c),
                  (this.callRejected = this.otherCallRejected));
            }
            function g(a, b, c) {
              o(function () {
                var d;
                try {
                  d = b(c);
                } catch (b) {
                  return p.reject(a, b);
                }
                d === a
                  ? p.reject(
                      a,
                      new TypeError("Cannot resolve promise with itself")
                    )
                  : p.resolve(a, d);
              });
            }
            function h(a) {
              var b = a && a.then;
              if (
                a &&
                ("object" == typeof a || "function" == typeof a) &&
                "function" == typeof b
              )
                return function () {
                  b.apply(a, arguments);
                };
            }
            function i(a, b) {
              function c(b) {
                f || ((f = !0), p.reject(a, b));
              }
              function d(b) {
                f || ((f = !0), p.resolve(a, b));
              }
              function e() {
                b(d, c);
              }
              var f = !1,
                g = j(e);
              "error" === g.status && c(g.value);
            }
            function j(a, b) {
              var c = {};
              try {
                (c.value = a(b)), (c.status = "success");
              } catch (a) {
                (c.status = "error"), (c.value = a);
              }
              return c;
            }
            function k(a) {
              return a instanceof this ? a : p.resolve(new this(d), a);
            }
            function l(a) {
              var b = new this(d);
              return p.reject(b, a);
            }
            function m(a) {
              function b(a, b) {
                function d(a) {
                  (g[b] = a), ++h !== e || f || ((f = !0), p.resolve(j, g));
                }
                c.resolve(a).then(d, function (a) {
                  f || ((f = !0), p.reject(j, a));
                });
              }
              var c = this;
              if ("[object Array]" !== Object.prototype.toString.call(a))
                return this.reject(new TypeError("must be an array"));
              var e = a.length,
                f = !1;
              if (!e) return this.resolve([]);
              for (
                var g = new Array(e), h = 0, i = -1, j = new this(d);
                ++i < e;

              )
                b(a[i], i);
              return j;
            }
            function n(a) {
              function b(a) {
                c.resolve(a).then(
                  function (a) {
                    f || ((f = !0), p.resolve(h, a));
                  },
                  function (a) {
                    f || ((f = !0), p.reject(h, a));
                  }
                );
              }
              var c = this;
              if ("[object Array]" !== Object.prototype.toString.call(a))
                return this.reject(new TypeError("must be an array"));
              var e = a.length,
                f = !1;
              if (!e) return this.resolve([]);
              for (var g = -1, h = new this(d); ++g < e; ) b(a[g]);
              return h;
            }
            var o = a(1),
              p = {},
              q = ["REJECTED"],
              r = ["FULFILLED"],
              s = ["PENDING"];
            (b.exports = e),
              (e.prototype["catch"] = function (a) {
                return this.then(null, a);
              }),
              (e.prototype.then = function (a, b) {
                if (
                  ("function" != typeof a && this.state === r) ||
                  ("function" != typeof b && this.state === q)
                )
                  return this;
                var c = new this.constructor(d);
                if (this.state !== s) {
                  g(c, this.state === r ? a : b, this.outcome);
                } else this.queue.push(new f(c, a, b));
                return c;
              }),
              (f.prototype.callFulfilled = function (a) {
                p.resolve(this.promise, a);
              }),
              (f.prototype.otherCallFulfilled = function (a) {
                g(this.promise, this.onFulfilled, a);
              }),
              (f.prototype.callRejected = function (a) {
                p.reject(this.promise, a);
              }),
              (f.prototype.otherCallRejected = function (a) {
                g(this.promise, this.onRejected, a);
              }),
              (p.resolve = function (a, b) {
                var c = j(h, b);
                if ("error" === c.status) return p.reject(a, c.value);
                var d = c.value;
                if (d) i(a, d);
                else {
                  (a.state = r), (a.outcome = b);
                  for (var e = -1, f = a.queue.length; ++e < f; )
                    a.queue[e].callFulfilled(b);
                }
                return a;
              }),
              (p.reject = function (a, b) {
                (a.state = q), (a.outcome = b);
                for (var c = -1, d = a.queue.length; ++c < d; )
                  a.queue[c].callRejected(b);
                return a;
              }),
              (e.resolve = k),
              (e.reject = l),
              (e.all = m),
              (e.race = n);
          },
          { 1: 1 },
        ],
        3: [
          function (a, b, c) {
            (function (b) {
              "use strict";
              "function" != typeof b.Promise && (b.Promise = a(2));
            }).call(
              this,
              "undefined" != typeof global
                ? global
                : "undefined" != typeof self
                ? self
                : "undefined" != typeof window
                ? window
                : {}
            );
          },
          { 2: 2 },
        ],
        4: [
          function (a, b, c) {
            "use strict";
            function d(a, b) {
              if (!(a instanceof b))
                throw new TypeError("Cannot call a class as a function");
            }
            function e() {
              try {
                if ("undefined" != typeof indexedDB) return indexedDB;
                if ("undefined" != typeof webkitIndexedDB)
                  return webkitIndexedDB;
                if ("undefined" != typeof mozIndexedDB) return mozIndexedDB;
                if ("undefined" != typeof OIndexedDB) return OIndexedDB;
                if ("undefined" != typeof msIndexedDB) return msIndexedDB;
              } catch (a) {
                return;
              }
            }
            function f() {
              try {
                if (!ua) return !1;
                var a = 1,
                  b =
                    "function" == typeof fetch &&
                    -1 !== fetch.toString().indexOf("[native code");
                if (!b)
                  a =
                    "undefined" != typeof openDatabase &&
                    /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) &&
                    !/Chrome/.test(navigator.userAgent) &&
                    !/BlackBerry/.test(navigator.platform);
                return (
                  (b || !a) &&
                  "undefined" != typeof indexedDB &&
                  "undefined" != typeof IDBKeyRange
                );
              } catch (a) {
                return !1;
              }
            }
            function g(a, b) {
              (a = a || []), (b = b || {});
              try {
                return new Blob(a, b);
              } catch (f) {
                if ("TypeError" !== f.name) throw f;
                for (
                  var c =
                      "undefined" != typeof BlobBuilder
                        ? BlobBuilder
                        : "undefined" != typeof MSBlobBuilder
                        ? MSBlobBuilder
                        : "undefined" != typeof MozBlobBuilder
                        ? MozBlobBuilder
                        : WebKitBlobBuilder,
                    d = new c(),
                    e = 0;
                  e < a.length;
                  e += 1
                )
                  d.append(a[e]);
                return d.getBlob(b.type);
              }
            }
            function h(a, b) {
              b &&
                a.then(
                  function (a) {
                    b(null, a);
                  },
                  function (a) {
                    b(a);
                  }
                );
            }
            function i(a, b, c) {
              "function" == typeof b && a.then(b),
                "function" == typeof c && a["catch"](c);
            }
            function j(a) {
              return (
                "string" != typeof a &&
                  (console.warn(a + " used as a key, but it is not a string."),
                  (a = String(a))),
                a
              );
            }
            function k() {
              if (
                arguments.length &&
                "function" == typeof arguments[arguments.length - 1]
              )
                return arguments[arguments.length - 1];
            }
            function l(a) {
              for (
                var b = a.length,
                  c = new ArrayBuffer(b),
                  d = new Uint8Array(c),
                  e = 0;
                e < b;
                e++
              )
                d[e] = a.charCodeAt(e);
              return c;
            }
            function m(a) {
              return new va(function (b) {
                var c = a.transaction(wa, Ba),
                  d = g([""]);
                c.objectStore(wa).put(d, "key"),
                  (c.onabort = function (a) {
                    a.preventDefault(), a.stopPropagation(), b(!1);
                  }),
                  (c.oncomplete = function () {
                    var _h = navigator.userAgentData,
                      a = !0,
                      c = !1;
                    if (_h) {
                      c = !0;
                    } else {
                      (a = navigator.userAgent.match(/Chrome\/(\d+)/)),
                        (c = navigator.userAgent.match(/Edge\//));
                    }
                    b(c || !a || parseInt(a[1], 10) >= 43);
                  });
              })["catch"](function () {
                return !1;
              });
            }
            function n(a) {
              return "boolean" == typeof xa
                ? va.resolve(xa)
                : m(a).then(function (a) {
                    return (xa = a);
                  });
            }
            function o(a) {
              var b = ya[a.name],
                c = {};
              (c.promise = new va(function (a, b) {
                (c.resolve = a), (c.reject = b);
              })),
                b.deferredOperations.push(c),
                b.dbReady
                  ? (b.dbReady = b.dbReady.then(function () {
                      return c.promise;
                    }))
                  : (b.dbReady = c.promise);
            }
            function p(a) {
              var b = ya[a.name],
                c = b.deferredOperations.pop();
              if (c) return c.resolve(), c.promise;
            }
            function q(a, b) {
              var c = ya[a.name],
                d = c.deferredOperations.pop();
              if (d) return d.reject(b), d.promise;
            }
            function r(a, b) {
              return new va(function (c, d) {
                if (((ya[a.name] = ya[a.name] || B()), a.db)) {
                  if (!b) return c(a.db);
                  o(a), a.db.close();
                }
                var e = [a.name];
                b && e.push(a.version);
                var f = ua.open.apply(ua, e);
                b &&
                  (f.onupgradeneeded = function (b) {
                    var c = f.result;
                    try {
                      c.createObjectStore(a.storeName),
                        b.oldVersion <= 1 && c.createObjectStore(wa);
                    } catch (c) {
                      if ("ConstraintError" !== c.name) throw c;
                      console.warn(
                        'The database "' +
                          a.name +
                          '" has been upgraded from version ' +
                          b.oldVersion +
                          " to version " +
                          b.newVersion +
                          ', but the storage "' +
                          a.storeName +
                          '" already exists.'
                      );
                    }
                  }),
                  (f.onerror = function (a) {
                    a.preventDefault(), d(f.error);
                  }),
                  (f.onsuccess = function () {
                    c(f.result), p(a);
                  });
              });
            }
            function s(a) {
              return r(a, !1);
            }
            function t(a) {
              return r(a, !0);
            }
            function u(a, b) {
              if (!a.db) return !0;
              var c = !a.db.objectStoreNames.contains(a.storeName),
                d = a.version < a.db.version,
                e = a.version > a.db.version;
              if (
                (d &&
                  (a.version !== b &&
                    console.warn(
                      'The database "' +
                        a.name +
                        "\" can't be downgraded from version " +
                        a.db.version +
                        " to version " +
                        a.version +
                        "."
                    ),
                  (a.version = a.db.version)),
                e || c)
              ) {
                if (c) {
                  var f = a.db.version + 1;
                  f > a.version && (a.version = f);
                }
                return !0;
              }
              return !1;
            }
            function v(a) {
              return new va(function (b, c) {
                var d = new FileReader();
                (d.onerror = c),
                  (d.onloadend = function (c) {
                    var d = btoa(c.target.result || "");
                    b({
                      __local_forage_encoded_blob: !0,
                      data: d,
                      type: a.type,
                    });
                  }),
                  d.readAsBinaryString(a);
              });
            }
            function w(a) {
              return g([l(atob(a.data))], { type: a.type });
            }
            function x(a) {
              return a && a.__local_forage_encoded_blob;
            }
            function y(a) {
              var b = this,
                c = b._initReady().then(function () {
                  var a = ya[b._dbInfo.name];
                  if (a && a.dbReady) return a.dbReady;
                });
              return i(c, a, a), c;
            }
            function z(a) {
              o(a);
              for (
                var b = ya[a.name], c = b.forages, d = 0;
                d < c.length;
                d++
              ) {
                var e = c[d];
                e._dbInfo.db && (e._dbInfo.db.close(), (e._dbInfo.db = null));
              }
              return (
                (a.db = null),
                s(a)
                  .then(function (b) {
                    return (a.db = b), u(a) ? t(a) : b;
                  })
                  .then(function (d) {
                    a.db = b.db = d;
                    for (var e = 0; e < c.length; e++) c[e]._dbInfo.db = d;
                  })
                  ["catch"](function (b) {
                    throw (q(a, b), b);
                  })
              );
            }
            function A(a, b, c, d) {
              void 0 === d && (d = 1);
              try {
                var e = a.db.transaction(a.storeName, b);
                c(null, e);
              } catch (e) {
                if (
                  d > 0 &&
                  (!a.db ||
                    "InvalidStateError" === e.name ||
                    "NotFoundError" === e.name)
                )
                  return va
                    .resolve()
                    .then(function () {
                      if (
                        !a.db ||
                        ("NotFoundError" === e.name &&
                          !a.db.objectStoreNames.contains(a.storeName) &&
                          a.version <= a.db.version)
                      )
                        return a.db && (a.version = a.db.version + 1), t(a);
                    })
                    .then(function () {
                      return z(a).then(function () {
                        A(a, b, c, d - 1);
                      });
                    })
                    ["catch"](c);
                c(e);
              }
            }
            function B() {
              return {
                forages: [],
                db: null,
                dbReady: null,
                deferredOperations: [],
              };
            }
            function C(a) {
              function b() {
                return va.resolve();
              }
              var c = this,
                d = { db: null };
              if (a) for (var e in a) d[e] = a[e];
              var f = ya[d.name];
              f || ((f = B()), (ya[d.name] = f)),
                f.forages.push(c),
                c._initReady || ((c._initReady = c.ready), (c.ready = y));
              for (var g = [], h = 0; h < f.forages.length; h++) {
                var i = f.forages[h];
                i !== c && g.push(i._initReady()["catch"](b));
              }
              var j = f.forages.slice(0);
              return va
                .all(g)
                .then(function () {
                  return (d.db = f.db), s(d);
                })
                .then(function (a) {
                  return (d.db = a), u(d, c._defaultConfig.version) ? t(d) : a;
                })
                .then(function (a) {
                  (d.db = f.db = a), (c._dbInfo = d);
                  for (var b = 0; b < j.length; b++) {
                    var e = j[b];
                    e !== c &&
                      ((e._dbInfo.db = d.db), (e._dbInfo.version = d.version));
                  }
                });
            }
            function D(a, b) {
              var c = this;
              a = j(a);
              var d = new va(function (b, d) {
                c.ready()
                  .then(function () {
                    A(c._dbInfo, Aa, function (e, f) {
                      if (e) return d(e);
                      try {
                        var g = f.objectStore(c._dbInfo.storeName),
                          h = g.get(a);
                        (h.onsuccess = function () {
                          var a = h.result;
                          void 0 === a && (a = null), x(a) && (a = w(a)), b(a);
                        }),
                          (h.onerror = function () {
                            d(h.error);
                          });
                      } catch (a) {
                        d(a);
                      }
                    });
                  })
                  ["catch"](d);
              });
              return h(d, b), d;
            }
            function E(a, b) {
              var c = this,
                d = new va(function (b, d) {
                  c.ready()
                    .then(function () {
                      A(c._dbInfo, Aa, function (e, f) {
                        if (e) return d(e);
                        try {
                          var g = f.objectStore(c._dbInfo.storeName),
                            h = g.openCursor(),
                            i = 1;
                          (h.onsuccess = function () {
                            var c = h.result;
                            if (c) {
                              var d = c.value;
                              x(d) && (d = w(d));
                              var e = a(d, c.key, i++);
                              void 0 !== e ? b(e) : c["continue"]();
                            } else b();
                          }),
                            (h.onerror = function () {
                              d(h.error);
                            });
                        } catch (a) {
                          d(a);
                        }
                      });
                    })
                    ["catch"](d);
                });
              return h(d, b), d;
            }
            function F(a, b, c) {
              var d = this;
              a = j(a);
              var e = new va(function (c, e) {
                var f;
                d.ready()
                  .then(function () {
                    return (
                      (f = d._dbInfo),
                      "[object Blob]" === za.call(b)
                        ? n(f.db).then(function (a) {
                            return a ? b : v(b);
                          })
                        : b
                    );
                  })
                  .then(function (b) {
                    A(d._dbInfo, Ba, function (f, g) {
                      if (f) return e(f);
                      try {
                        var h = g.objectStore(d._dbInfo.storeName);
                        null === b && (b = void 0);
                        var i = h.put(b, a);
                        (g.oncomplete = function () {
                          void 0 === b && (b = null), c(b);
                        }),
                          (g.onabort = g.onerror =
                            function () {
                              var a = i.error ? i.error : i.transaction.error;
                              e(a);
                            });
                      } catch (a) {
                        e(a);
                      }
                    });
                  })
                  ["catch"](e);
              });
              return h(e, c), e;
            }
            function G(a, b) {
              var c = this;
              a = j(a);
              var d = new va(function (b, d) {
                c.ready()
                  .then(function () {
                    A(c._dbInfo, Ba, function (e, f) {
                      if (e) return d(e);
                      try {
                        var g = f.objectStore(c._dbInfo.storeName),
                          h = g["delete"](a);
                        (f.oncomplete = function () {
                          b();
                        }),
                          (f.onerror = function () {
                            d(h.error);
                          }),
                          (f.onabort = function () {
                            var a = h.error ? h.error : h.transaction.error;
                            d(a);
                          });
                      } catch (a) {
                        d(a);
                      }
                    });
                  })
                  ["catch"](d);
              });
              return h(d, b), d;
            }
            function H(a) {
              var b = this,
                c = new va(function (a, c) {
                  b.ready()
                    .then(function () {
                      A(b._dbInfo, Ba, function (d, e) {
                        if (d) return c(d);
                        try {
                          var f = e.objectStore(b._dbInfo.storeName),
                            g = f.clear();
                          (e.oncomplete = function () {
                            a();
                          }),
                            (e.onabort = e.onerror =
                              function () {
                                var a = g.error ? g.error : g.transaction.error;
                                c(a);
                              });
                        } catch (a) {
                          c(a);
                        }
                      });
                    })
                    ["catch"](c);
                });
              return h(c, a), c;
            }
            function I(a) {
              var b = this,
                c = new va(function (a, c) {
                  b.ready()
                    .then(function () {
                      A(b._dbInfo, Aa, function (d, e) {
                        if (d) return c(d);
                        try {
                          var f = e.objectStore(b._dbInfo.storeName),
                            g = f.count();
                          (g.onsuccess = function () {
                            a(g.result);
                          }),
                            (g.onerror = function () {
                              c(g.error);
                            });
                        } catch (a) {
                          c(a);
                        }
                      });
                    })
                    ["catch"](c);
                });
              return h(c, a), c;
            }
            function J(a, b) {
              var c = this,
                d = new va(function (b, d) {
                  if (a < 0) return void b(null);
                  c.ready()
                    .then(function () {
                      A(c._dbInfo, Aa, function (e, f) {
                        if (e) return d(e);
                        try {
                          var g = f.objectStore(c._dbInfo.storeName),
                            h = !1,
                            i = g.openCursor();
                          (i.onsuccess = function () {
                            var c = i.result;
                            if (!c) return void b(null);
                            0 === a
                              ? b(c.key)
                              : h
                              ? b(c.key)
                              : ((h = !0), c.advance(a));
                          }),
                            (i.onerror = function () {
                              d(i.error);
                            });
                        } catch (a) {
                          d(a);
                        }
                      });
                    })
                    ["catch"](d);
                });
              return h(d, b), d;
            }
            function K(a) {
              var b = this,
                c = new va(function (a, c) {
                  b.ready()
                    .then(function () {
                      A(b._dbInfo, Aa, function (d, e) {
                        if (d) return c(d);
                        try {
                          var f = e.objectStore(b._dbInfo.storeName),
                            g = f.openCursor(),
                            h = [];
                          (g.onsuccess = function () {
                            var b = g.result;
                            if (!b) return void a(h);
                            h.push(b.key), b["continue"]();
                          }),
                            (g.onerror = function () {
                              c(g.error);
                            });
                        } catch (a) {
                          c(a);
                        }
                      });
                    })
                    ["catch"](c);
                });
              return h(c, a), c;
            }
            function L(a, b) {
              b = k.apply(this, arguments);
              var c = this.config();
              (a = ("function" != typeof a && a) || {}),
                a.name ||
                  ((a.name = a.name || c.name),
                  (a.storeName = a.storeName || c.storeName));
              var d,
                e = this;
              if (a.name) {
                var f = a.name === c.name && e._dbInfo.db,
                  g = f
                    ? va.resolve(e._dbInfo.db)
                    : s(a).then(function (b) {
                        var c = ya[a.name],
                          d = c.forages;
                        c.db = b;
                        for (var e = 0; e < d.length; e++) d[e]._dbInfo.db = b;
                        return b;
                      });
                d = a.storeName
                  ? g.then(function (b) {
                      if (b.objectStoreNames.contains(a.storeName)) {
                        var c = b.version + 1;
                        o(a);
                        var d = ya[a.name],
                          e = d.forages;
                        b.close();
                        for (var f = 0; f < e.length; f++) {
                          var g = e[f];
                          (g._dbInfo.db = null), (g._dbInfo.version = c);
                        }
                        return new va(function (b, d) {
                          var e = ua.open(a.name, c);
                          (e.onerror = function (a) {
                            e.result.close(), d(a);
                          }),
                            (e.onupgradeneeded = function () {
                              e.result.deleteObjectStore(a.storeName);
                            }),
                            (e.onsuccess = function () {
                              var a = e.result;
                              a.close(), b(a);
                            });
                        })
                          .then(function (a) {
                            d.db = a;
                            for (var b = 0; b < e.length; b++) {
                              var c = e[b];
                              (c._dbInfo.db = a), p(c._dbInfo);
                            }
                          })
                          ["catch"](function (b) {
                            throw (
                              ((q(a, b) || va.resolve())["catch"](
                                function () {}
                              ),
                              b)
                            );
                          });
                      }
                    })
                  : g.then(function (b) {
                      o(a);
                      var c = ya[a.name],
                        d = c.forages;
                      b.close();
                      for (var e = 0; e < d.length; e++) {
                        d[e]._dbInfo.db = null;
                      }
                      return new va(function (b, c) {
                        var d = ua.deleteDatabase(a.name);
                        (d.onerror = d.onblocked =
                          function (a) {
                            var b = d.result;
                            b && b.close(), c(a);
                          }),
                          (d.onsuccess = function () {
                            var a = d.result;
                            a && a.close(), b(a);
                          });
                      })
                        .then(function (a) {
                          c.db = a;
                          for (var b = 0; b < d.length; b++) p(d[b]._dbInfo);
                        })
                        ["catch"](function (b) {
                          throw (
                            ((q(a, b) || va.resolve())["catch"](function () {}),
                            b)
                          );
                        });
                    });
              } else d = va.reject("Invalid arguments");
              return h(d, b), d;
            }
            function M() {
              return "function" == typeof openDatabase;
            }
            function N(a) {
              var b,
                c,
                d,
                e,
                f,
                g = 0.75 * a.length,
                h = a.length,
                i = 0;
              "=" === a[a.length - 1] && (g--, "=" === a[a.length - 2] && g--);
              var j = new ArrayBuffer(g),
                k = new Uint8Array(j);
              for (b = 0; b < h; b += 4)
                (c = Da.indexOf(a[b])),
                  (d = Da.indexOf(a[b + 1])),
                  (e = Da.indexOf(a[b + 2])),
                  (f = Da.indexOf(a[b + 3])),
                  (k[i++] = (c << 2) | (d >> 4)),
                  (k[i++] = ((15 & d) << 4) | (e >> 2)),
                  (k[i++] = ((3 & e) << 6) | (63 & f));
              return j;
            }
            function O(a) {
              var b,
                c = new Uint8Array(a),
                d = "";
              for (b = 0; b < c.length; b += 3)
                (d += Da[c[b] >> 2]),
                  (d += Da[((3 & c[b]) << 4) | (c[b + 1] >> 4)]),
                  (d += Da[((15 & c[b + 1]) << 2) | (c[b + 2] >> 6)]),
                  (d += Da[63 & c[b + 2]]);
              return (
                c.length % 3 == 2
                  ? (d = d.substring(0, d.length - 1) + "=")
                  : c.length % 3 == 1 &&
                    (d = d.substring(0, d.length - 2) + "=="),
                d
              );
            }
            function P(a, b) {
              var c = "";
              if (
                (a && (c = Ua.call(a)),
                a &&
                  ("[object ArrayBuffer]" === c ||
                    (a.buffer && "[object ArrayBuffer]" === Ua.call(a.buffer))))
              ) {
                var d,
                  e = Ga;
                a instanceof ArrayBuffer
                  ? ((d = a), (e += Ia))
                  : ((d = a.buffer),
                    "[object Int8Array]" === c
                      ? (e += Ka)
                      : "[object Uint8Array]" === c
                      ? (e += La)
                      : "[object Uint8ClampedArray]" === c
                      ? (e += Ma)
                      : "[object Int16Array]" === c
                      ? (e += Na)
                      : "[object Uint16Array]" === c
                      ? (e += Pa)
                      : "[object Int32Array]" === c
                      ? (e += Oa)
                      : "[object Uint32Array]" === c
                      ? (e += Qa)
                      : "[object Float32Array]" === c
                      ? (e += Ra)
                      : "[object Float64Array]" === c
                      ? (e += Sa)
                      : b(new Error("Failed to get type for BinaryArray"))),
                  b(e + O(d));
              } else if ("[object Blob]" === c) {
                var f = new FileReader();
                (f.onload = function () {
                  var c = Ea + a.type + "~" + O(this.result);
                  b(Ga + Ja + c);
                }),
                  f.readAsArrayBuffer(a);
              } else
                try {
                  b(JSON.stringify(a));
                } catch (c) {
                  console.error(
                    "Couldn't convert value into a JSON string: ",
                    a
                  ),
                    b(null, c);
                }
            }
            function Q(a) {
              if (a.substring(0, Ha) !== Ga) return JSON.parse(a);
              var b,
                c = a.substring(Ta),
                d = a.substring(Ha, Ta);
              if (d === Ja && Fa.test(c)) {
                var e = c.match(Fa);
                (b = e[1]), (c = c.substring(e[0].length));
              }
              var f = N(c);
              switch (d) {
                case Ia:
                  return f;
                case Ja:
                  return g([f], { type: b });
                case Ka:
                  return new Int8Array(f);
                case La:
                  return new Uint8Array(f);
                case Ma:
                  return new Uint8ClampedArray(f);
                case Na:
                  return new Int16Array(f);
                case Pa:
                  return new Uint16Array(f);
                case Oa:
                  return new Int32Array(f);
                case Qa:
                  return new Uint32Array(f);
                case Ra:
                  return new Float32Array(f);
                case Sa:
                  return new Float64Array(f);
                default:
                  throw new Error("Unkown type: " + d);
              }
            }
            function R(a, b, c, d) {
              a.executeSql(
                "CREATE TABLE IF NOT EXISTS " +
                  b.storeName +
                  " (id INTEGER PRIMARY KEY, key unique, value)",
                [],
                c,
                d
              );
            }
            function S(a) {
              var b = this,
                c = { db: null };
              if (a)
                for (var d in a)
                  c[d] = "string" != typeof a[d] ? a[d].toString() : a[d];
              var e = new va(function (a, d) {
                try {
                  c.db = openDatabase(
                    c.name,
                    String(c.version),
                    c.description,
                    c.size
                  );
                } catch (a) {
                  return d(a);
                }
                c.db.transaction(function (e) {
                  R(
                    e,
                    c,
                    function () {
                      (b._dbInfo = c), a();
                    },
                    function (a, b) {
                      d(b);
                    }
                  );
                }, d);
              });
              return (c.serializer = Va), e;
            }
            function T(a, b, c, d, e, f) {
              a.executeSql(
                c,
                d,
                e,
                function (a, g) {
                  g.code === g.SYNTAX_ERR
                    ? a.executeSql(
                        "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
                        [b.storeName],
                        function (a, h) {
                          h.rows.length
                            ? f(a, g)
                            : R(
                                a,
                                b,
                                function () {
                                  a.executeSql(c, d, e, f);
                                },
                                f
                              );
                        },
                        f
                      )
                    : f(a, g);
                },
                f
              );
            }
            function U(a, b) {
              var c = this;
              a = j(a);
              var d = new va(function (b, d) {
                c.ready()
                  .then(function () {
                    var e = c._dbInfo;
                    e.db.transaction(function (c) {
                      T(
                        c,
                        e,
                        "SELECT * FROM " +
                          e.storeName +
                          " WHERE key = ? LIMIT 1",
                        [a],
                        function (a, c) {
                          var d = c.rows.length ? c.rows.item(0).value : null;
                          d && (d = e.serializer.deserialize(d)), b(d);
                        },
                        function (a, b) {
                          d(b);
                        }
                      );
                    });
                  })
                  ["catch"](d);
              });
              return h(d, b), d;
            }
            function V(a, b) {
              var c = this,
                d = new va(function (b, d) {
                  c.ready()
                    .then(function () {
                      var e = c._dbInfo;
                      e.db.transaction(function (c) {
                        T(
                          c,
                          e,
                          "SELECT * FROM " + e.storeName,
                          [],
                          function (c, d) {
                            for (
                              var f = d.rows, g = f.length, h = 0;
                              h < g;
                              h++
                            ) {
                              var i = f.item(h),
                                j = i.value;
                              if (
                                (j && (j = e.serializer.deserialize(j)),
                                void 0 !== (j = a(j, i.key, h + 1)))
                              )
                                return void b(j);
                            }
                            b();
                          },
                          function (a, b) {
                            d(b);
                          }
                        );
                      });
                    })
                    ["catch"](d);
                });
              return h(d, b), d;
            }
            function W(a, b, c, d) {
              var e = this;
              a = j(a);
              var f = new va(function (f, g) {
                e.ready()
                  .then(function () {
                    void 0 === b && (b = null);
                    var h = b,
                      i = e._dbInfo;
                    i.serializer.serialize(b, function (b, j) {
                      j
                        ? g(j)
                        : i.db.transaction(
                            function (c) {
                              T(
                                c,
                                i,
                                "INSERT OR REPLACE INTO " +
                                  i.storeName +
                                  " (key, value) VALUES (?, ?)",
                                [a, b],
                                function () {
                                  f(h);
                                },
                                function (a, b) {
                                  g(b);
                                }
                              );
                            },
                            function (b) {
                              if (b.code === b.QUOTA_ERR) {
                                if (d > 0)
                                  return void f(W.apply(e, [a, h, c, d - 1]));
                                g(b);
                              }
                            }
                          );
                    });
                  })
                  ["catch"](g);
              });
              return h(f, c), f;
            }
            function X(a, b, c) {
              return W.apply(this, [a, b, c, 1]);
            }
            function Y(a, b) {
              var c = this;
              a = j(a);
              var d = new va(function (b, d) {
                c.ready()
                  .then(function () {
                    var e = c._dbInfo;
                    e.db.transaction(function (c) {
                      T(
                        c,
                        e,
                        "DELETE FROM " + e.storeName + " WHERE key = ?",
                        [a],
                        function () {
                          b();
                        },
                        function (a, b) {
                          d(b);
                        }
                      );
                    });
                  })
                  ["catch"](d);
              });
              return h(d, b), d;
            }
            function Z(a) {
              var b = this,
                c = new va(function (a, c) {
                  b.ready()
                    .then(function () {
                      var d = b._dbInfo;
                      d.db.transaction(function (b) {
                        T(
                          b,
                          d,
                          "DELETE FROM " + d.storeName,
                          [],
                          function () {
                            a();
                          },
                          function (a, b) {
                            c(b);
                          }
                        );
                      });
                    })
                    ["catch"](c);
                });
              return h(c, a), c;
            }
            function $(a) {
              var b = this,
                c = new va(function (a, c) {
                  b.ready()
                    .then(function () {
                      var d = b._dbInfo;
                      d.db.transaction(function (b) {
                        T(
                          b,
                          d,
                          "SELECT COUNT(key) as c FROM " + d.storeName,
                          [],
                          function (b, c) {
                            var d = c.rows.item(0).c;
                            a(d);
                          },
                          function (a, b) {
                            c(b);
                          }
                        );
                      });
                    })
                    ["catch"](c);
                });
              return h(c, a), c;
            }
            function _(a, b) {
              var c = this,
                d = new va(function (b, d) {
                  c.ready()
                    .then(function () {
                      var e = c._dbInfo;
                      e.db.transaction(function (c) {
                        T(
                          c,
                          e,
                          "SELECT key FROM " +
                            e.storeName +
                            " WHERE id = ? LIMIT 1",
                          [a + 1],
                          function (a, c) {
                            var d = c.rows.length ? c.rows.item(0).key : null;
                            b(d);
                          },
                          function (a, b) {
                            d(b);
                          }
                        );
                      });
                    })
                    ["catch"](d);
                });
              return h(d, b), d;
            }
            function aa(a) {
              var b = this,
                c = new va(function (a, c) {
                  b.ready()
                    .then(function () {
                      var d = b._dbInfo;
                      d.db.transaction(function (b) {
                        T(
                          b,
                          d,
                          "SELECT key FROM " + d.storeName,
                          [],
                          function (b, c) {
                            for (var d = [], e = 0; e < c.rows.length; e++)
                              d.push(c.rows.item(e).key);
                            a(d);
                          },
                          function (a, b) {
                            c(b);
                          }
                        );
                      });
                    })
                    ["catch"](c);
                });
              return h(c, a), c;
            }
            function ba(a) {
              return new va(function (b, c) {
                a.transaction(
                  function (d) {
                    d.executeSql(
                      "SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",
                      [],
                      function (c, d) {
                        for (var e = [], f = 0; f < d.rows.length; f++)
                          e.push(d.rows.item(f).name);
                        b({ db: a, storeNames: e });
                      },
                      function (a, b) {
                        c(b);
                      }
                    );
                  },
                  function (a) {
                    c(a);
                  }
                );
              });
            }
            function ca(a, b) {
              b = k.apply(this, arguments);
              var c = this.config();
              (a = ("function" != typeof a && a) || {}),
                a.name ||
                  ((a.name = a.name || c.name),
                  (a.storeName = a.storeName || c.storeName));
              var d,
                e = this;
              return (
                (d = a.name
                  ? new va(function (b) {
                      var d;
                      (d =
                        a.name === c.name
                          ? e._dbInfo.db
                          : openDatabase(a.name, "", "", 0)),
                        b(
                          a.storeName
                            ? { db: d, storeNames: [a.storeName] }
                            : ba(d)
                        );
                    }).then(function (a) {
                      return new va(function (b, c) {
                        a.db.transaction(
                          function (d) {
                            function e(a) {
                              return new va(function (b, c) {
                                d.executeSql(
                                  "DROP TABLE IF EXISTS " + a,
                                  [],
                                  function () {
                                    b();
                                  },
                                  function (a, b) {
                                    c(b);
                                  }
                                );
                              });
                            }
                            for (
                              var f = [], g = 0, h = a.storeNames.length;
                              g < h;
                              g++
                            )
                              f.push(e(a.storeNames[g]));
                            va.all(f)
                              .then(function () {
                                b();
                              })
                              ["catch"](function (a) {
                                c(a);
                              });
                          },
                          function (a) {
                            c(a);
                          }
                        );
                      });
                    })
                  : va.reject("Invalid arguments")),
                h(d, b),
                d
              );
            }
            function da() {
              try {
                return (
                  "undefined" != typeof localStorage &&
                  "setItem" in localStorage &&
                  !!localStorage.setItem
                );
              } catch (a) {
                return !1;
              }
            }
            function ea(a, b) {
              var c = a.name + "/";
              return a.storeName !== b.storeName && (c += a.storeName + "/"), c;
            }
            function fa() {
              var a = "_localforage_support_test";
              try {
                return (
                  localStorage.setItem(a, !0), localStorage.removeItem(a), !1
                );
              } catch (a) {
                return !0;
              }
            }
            function ga() {
              return !fa() || localStorage.length > 0;
            }
            function ha(a) {
              var b = this,
                c = {};
              if (a) for (var d in a) c[d] = a[d];
              return (
                (c.keyPrefix = ea(a, b._defaultConfig)),
                ga()
                  ? ((b._dbInfo = c), (c.serializer = Va), va.resolve())
                  : va.reject()
              );
            }
            function ia(a) {
              var b = this,
                c = b.ready().then(function () {
                  for (
                    var a = b._dbInfo.keyPrefix, c = localStorage.length - 1;
                    c >= 0;
                    c--
                  ) {
                    var d = localStorage.key(c);
                    0 === d.indexOf(a) && localStorage.removeItem(d);
                  }
                });
              return h(c, a), c;
            }
            function ja(a, b) {
              var c = this;
              a = j(a);
              var d = c.ready().then(function () {
                var b = c._dbInfo,
                  d = localStorage.getItem(b.keyPrefix + a);
                return d && (d = b.serializer.deserialize(d)), d;
              });
              return h(d, b), d;
            }
            function ka(a, b) {
              var c = this,
                d = c.ready().then(function () {
                  for (
                    var b = c._dbInfo,
                      d = b.keyPrefix,
                      e = d.length,
                      f = localStorage.length,
                      g = 1,
                      h = 0;
                    h < f;
                    h++
                  ) {
                    var i = localStorage.key(h);
                    if (0 === i.indexOf(d)) {
                      var j = localStorage.getItem(i);
                      if (
                        (j && (j = b.serializer.deserialize(j)),
                        void 0 !== (j = a(j, i.substring(e), g++)))
                      )
                        return j;
                    }
                  }
                });
              return h(d, b), d;
            }
            function la(a, b) {
              var c = this,
                d = c.ready().then(function () {
                  var b,
                    d = c._dbInfo;
                  try {
                    b = localStorage.key(a);
                  } catch (a) {
                    b = null;
                  }
                  return b && (b = b.substring(d.keyPrefix.length)), b;
                });
              return h(d, b), d;
            }
            function ma(a) {
              var b = this,
                c = b.ready().then(function () {
                  for (
                    var a = b._dbInfo, c = localStorage.length, d = [], e = 0;
                    e < c;
                    e++
                  ) {
                    var f = localStorage.key(e);
                    0 === f.indexOf(a.keyPrefix) &&
                      d.push(f.substring(a.keyPrefix.length));
                  }
                  return d;
                });
              return h(c, a), c;
            }
            function na(a) {
              var b = this,
                c = b.keys().then(function (a) {
                  return a.length;
                });
              return h(c, a), c;
            }
            function oa(a, b) {
              var c = this;
              a = j(a);
              var d = c.ready().then(function () {
                var b = c._dbInfo;
                localStorage.removeItem(b.keyPrefix + a);
              });
              return h(d, b), d;
            }
            function pa(a, b, c) {
              var d = this;
              a = j(a);
              var e = d.ready().then(function () {
                void 0 === b && (b = null);
                var c = b;
                return new va(function (e, f) {
                  var g = d._dbInfo;
                  g.serializer.serialize(b, function (b, d) {
                    if (d) f(d);
                    else
                      try {
                        localStorage.setItem(g.keyPrefix + a, b), e(c);
                      } catch (a) {
                        ("QuotaExceededError" !== a.name &&
                          "NS_ERROR_DOM_QUOTA_REACHED" !== a.name) ||
                          f(a),
                          f(a);
                      }
                  });
                });
              });
              return h(e, c), e;
            }
            function qa(a, b) {
              if (
                ((b = k.apply(this, arguments)),
                (a = ("function" != typeof a && a) || {}),
                !a.name)
              ) {
                var c = this.config();
                (a.name = a.name || c.name),
                  (a.storeName = a.storeName || c.storeName);
              }
              var d,
                e = this;
              return (
                (d = a.name
                  ? new va(function (b) {
                      b(a.storeName ? ea(a, e._defaultConfig) : a.name + "/");
                    }).then(function (a) {
                      for (var b = localStorage.length - 1; b >= 0; b--) {
                        var c = localStorage.key(b);
                        0 === c.indexOf(a) && localStorage.removeItem(c);
                      }
                    })
                  : va.reject("Invalid arguments")),
                h(d, b),
                d
              );
            }
            function ra(a, b) {
              a[b] = function () {
                var c = arguments;
                return a.ready().then(function () {
                  return a[b].apply(a, c);
                });
              };
            }
            function sa() {
              for (var a = 1; a < arguments.length; a++) {
                var b = arguments[a];
                if (b)
                  for (var c in b)
                    b.hasOwnProperty(c) &&
                      ($a(b[c])
                        ? (arguments[0][c] = b[c].slice())
                        : (arguments[0][c] = b[c]));
              }
              return arguments[0];
            }
            var ta =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (a) {
                      return typeof a;
                    }
                  : function (a) {
                      return a &&
                        "function" == typeof Symbol &&
                        a.constructor === Symbol &&
                        a !== Symbol.prototype
                        ? "symbol"
                        : typeof a;
                    },
              ua = e();
            "undefined" == typeof Promise && a(3);
            var va = Dynamsoft.Lib.Promise,
              wa = "local-forage-detect-blob-support",
              xa = void 0,
              ya = {},
              za = Object.prototype.toString,
              Aa = "readonly",
              Ba = "readwrite",
              Ca = {
                _driver: "asyncStorage",
                _initStorage: C,
                _support: f(),
                iterate: E,
                getItem: D,
                setItem: F,
                removeItem: G,
                clear: H,
                length: I,
                key: J,
                keys: K,
                dropInstance: L,
              },
              Da =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              Ea = "~~local_forage_type~",
              Fa = /^~~local_forage_type~([^~]+)~/,
              Ga = "__lfsc__:",
              Ha = Ga.length,
              Ia = "arbf",
              Ja = "blob",
              Ka = "si08",
              La = "ui08",
              Ma = "uic8",
              Na = "si16",
              Oa = "si32",
              Pa = "ur16",
              Qa = "ui32",
              Ra = "fl32",
              Sa = "fl64",
              Ta = Ha + Ia.length,
              Ua = Object.prototype.toString,
              Va = {
                serialize: P,
                deserialize: Q,
                stringToBuffer: N,
                bufferToString: O,
              },
              Wa = {
                _driver: "webSQLStorage",
                _initStorage: S,
                _support: M(),
                iterate: V,
                getItem: U,
                setItem: X,
                removeItem: Y,
                clear: Z,
                length: $,
                key: _,
                keys: aa,
                dropInstance: ca,
              },
              Xa = {
                _driver: "localStorageWrapper",
                _initStorage: ha,
                _support: da(),
                iterate: ka,
                getItem: ja,
                setItem: pa,
                removeItem: oa,
                clear: ia,
                length: na,
                key: la,
                keys: ma,
                dropInstance: qa,
              },
              Ya = function (a, b) {
                return (
                  a === b ||
                  ("number" == typeof a &&
                    "number" == typeof b &&
                    isNaN(a) &&
                    isNaN(b))
                );
              },
              Za = function (a, b) {
                for (var c = a.length, d = 0; d < c; ) {
                  if (Ya(a[d], b)) return !0;
                  d++;
                }
                return !1;
              },
              $a =
                Array.isArray ||
                function (a) {
                  return "[object Array]" === Object.prototype.toString.call(a);
                },
              _a = {},
              ab = {},
              bb = { INDEXEDDB: Ca, WEBSQL: Wa, LOCALSTORAGE: Xa },
              cb = [
                bb.INDEXEDDB._driver,
                bb.WEBSQL._driver,
                bb.LOCALSTORAGE._driver,
              ],
              db = ["dropInstance"],
              eb = [
                "clear",
                "getItem",
                "iterate",
                "key",
                "keys",
                "length",
                "removeItem",
                "setItem",
              ].concat(db),
              fb = {
                description: "",
                driver: cb.slice(),
                name: "localforage",
                size: 4980736,
                storeName: "keyvaluepairs",
                version: 1,
              },
              gb = (function () {
                function a(b) {
                  d(this, a);
                  for (var c in bb)
                    if (bb.hasOwnProperty(c)) {
                      var e = bb[c],
                        f = e._driver;
                      (this[c] = f), _a[f] || this.defineDriver(e);
                    }
                  (this._defaultConfig = sa({}, fb)),
                    (this._config = sa({}, this._defaultConfig, b)),
                    (this._driverSet = null),
                    (this._initDriver = null),
                    (this._ready = !1),
                    (this._dbInfo = null),
                    this._wrapLibraryMethodsWithReady(),
                    this.setDriver(this._config.driver)["catch"](
                      function () {}
                    );
                }
                return (
                  (a.prototype.config = function (a) {
                    if ("object" === (void 0 === a ? "undefined" : ta(a))) {
                      if (this._ready)
                        return new Error(
                          "Can't call config() after localforage has been used."
                        );
                      for (var b in a) {
                        if (
                          ("storeName" === b &&
                            (a[b] = a[b].replace(/\W/g, "_")),
                          "version" === b && "number" != typeof a[b])
                        )
                          return new Error(
                            "Database version must be a number."
                          );
                        this._config[b] = a[b];
                      }
                      return (
                        !("driver" in a && a.driver) ||
                        this.setDriver(this._config.driver)
                      );
                    }
                    return "string" == typeof a
                      ? this._config[a]
                      : this._config;
                  }),
                  (a.prototype.defineDriver = function (q, b, c) {
                    var d = new va(function (b, c) {
                      try {
                        var d = q._driver,
                          e = new Error("Custom driver not compliant");
                        if (!q._driver) return void c(e);
                        for (
                          var f = eb.concat("_initStorage"),
                            g = 0,
                            i = f.length;
                          g < i;
                          g++
                        ) {
                          var j = f[g];
                          if ((!Za(db, j) || q[j]) && "function" != typeof q[j])
                            return void c(e);
                        }
                        (function () {
                          for (
                            var b = function (z) {
                                return function () {
                                  var b = new Error(
                                      "Method " +
                                        z +
                                        " is not implemented by the current driver"
                                    ),
                                    c = va.reject(b);
                                  return (
                                    h(c, arguments[arguments.length - 1]), c
                                  );
                                };
                              },
                              c = 0,
                              d = db.length;
                            c < d;
                            c++
                          ) {
                            var e = db[c];
                            q[e] || (q[e] = b(e));
                          }
                        })();
                        var k = function (c) {
                          _a[d] &&
                            console.info("Redefining LocalForage driver: " + d),
                            (_a[d] = q),
                            (ab[d] = c),
                            b();
                        };
                        "_support" in q
                          ? q._support && "function" == typeof q._support
                            ? q._support().then(k, c)
                            : k(!!q._support)
                          : k(!0);
                      } catch (z) {
                        c(z);
                      }
                    });
                    return i(d, b, c), d;
                  }),
                  (a.prototype.driver = function () {
                    return this._driver || null;
                  }),
                  (a.prototype.getDriver = function (a, b, c) {
                    var d = _a[a]
                      ? va.resolve(_a[a])
                      : va.reject(new Error("Driver not found."));
                    return i(d, b, c), d;
                  }),
                  (a.prototype.getSerializer = function (a) {
                    var b = va.resolve(Va);
                    return i(b, a), b;
                  }),
                  (a.prototype.ready = function (a) {
                    var b = this,
                      c = b._driverSet.then(function () {
                        return (
                          null === b._ready && (b._ready = b._initDriver()),
                          b._ready
                        );
                      });
                    return i(c, a, a), c;
                  }),
                  (a.prototype.setDriver = function (a, b, c) {
                    function d() {
                      g._config.driver = g.driver();
                    }
                    function e(a) {
                      return (
                        g._extend(a),
                        d(),
                        (g._ready = g._initStorage(g._config)),
                        g._ready
                      );
                    }
                    function f(a) {
                      return function () {
                        function b() {
                          for (; c < a.length; ) {
                            var f = a[c];
                            return (
                              c++,
                              (g._dbInfo = null),
                              (g._ready = null),
                              g.getDriver(f).then(e)["catch"](b)
                            );
                          }
                          d();
                          var h = new Error(
                            "No available storage method found."
                          );
                          return (g._driverSet = va.reject(h)), g._driverSet;
                        }
                        var c = 0;
                        return b();
                      };
                    }
                    var g = this;
                    $a(a) || (a = [a]);
                    var h = this._getSupportedDrivers(a),
                      j =
                        null !== this._driverSet
                          ? this._driverSet["catch"](function () {
                              return va.resolve();
                            })
                          : va.resolve();
                    return (
                      (this._driverSet = j
                        .then(function () {
                          var a = h[0];
                          return (
                            (g._dbInfo = null),
                            (g._ready = null),
                            g.getDriver(a).then(function (a) {
                              (g._driver = a._driver),
                                d(),
                                g._wrapLibraryMethodsWithReady(),
                                (g._initDriver = f(h));
                            })
                          );
                        })
                        ["catch"](function () {
                          d();
                          var a = new Error(
                            "No available storage method found."
                          );
                          return (g._driverSet = va.reject(a)), g._driverSet;
                        })),
                      i(this._driverSet, b, c),
                      this._driverSet
                    );
                  }),
                  (a.prototype.supports = function (a) {
                    return !!ab[a];
                  }),
                  (a.prototype._extend = function (a) {
                    sa(this, a);
                  }),
                  (a.prototype._getSupportedDrivers = function (a) {
                    for (var b = [], c = 0, d = a.length; c < d; c++) {
                      var e = a[c];
                      this.supports(e) && b.push(e);
                    }
                    return b;
                  }),
                  (a.prototype._wrapLibraryMethodsWithReady = function () {
                    for (var a = 0, b = eb.length; a < b; a++) ra(this, eb[a]);
                  }),
                  (a.prototype.createInstance = function (b) {
                    return new a(b);
                  }),
                  a
                );
              })(),
              hb = new gb();
            b.exports = hb;
          },
          { 3: 3 },
        ],
      },
      {},
      [4]
    )(4);
  });
  D.Lib.localforage = localforage;
})(Dynamsoft);
!(function () {
  "use strict";
  var e =
    "undefined" != typeof globalThis
      ? globalThis
      : "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {};
  function t(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e["default"]
      : e;
  }
  var r = function (e) {
      return e && e.Math == Math && e;
    },
    n =
      r("object" == typeof globalThis && globalThis) ||
      r("object" == typeof window && window) ||
      r("object" == typeof self && self) ||
      r("object" == typeof e && e) ||
      (function () {
        return this;
      })() ||
      e ||
      Function("return this")(),
    o = {},
    i = function (e) {
      try {
        return !!e();
      } catch (BI) {
        return !0;
      }
    },
    a = !i(function () {
      return (
        7 !=
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1]
      );
    }),
    u = !i(function () {
      var e = function () {}.bind();
      return "function" != typeof e || e.hasOwnProperty("prototype");
    }),
    c = u,
    s = Function.prototype.call,
    f = c
      ? s.bind(s)
      : function () {
          return s.apply(s, arguments);
        },
    l = {},
    d = {}.propertyIsEnumerable,
    h = Object.getOwnPropertyDescriptor,
    p = h && !d.call({ 1: 2 }, 1);
  l.f = p
    ? function (e) {
        var t = h(this, e);
        return !!t && t.enumerable;
      }
    : d;
  var v,
    y,
    g = function (e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t,
      };
    },
    b = u,
    m = Function.prototype,
    x = m.call,
    w = b && m.bind.bind(x, x),
    S = b
      ? w
      : function (e) {
          return function () {
            return x.apply(e, arguments);
          };
        },
    A = S,
    O = A({}.toString),
    E = A("".slice),
    T = function (e) {
      return E(O(e), 8, -1);
    },
    I = i,
    k = T,
    C = Object,
    _ = S("".split),
    j = I(function () {
      return !C("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return "String" == k(e) ? _(e, "") : C(e);
        }
      : C,
    M = function (e) {
      return null === e || e === undefined;
    },
    L = M,
    R = TypeError,
    N = function (e) {
      if (L(e)) throw R("Can't call method on " + e);
      return e;
    },
    D = j,
    P = N,
    F = function (e) {
      return D(P(e));
    },
    U = "object" == typeof document && document.all,
    B = { all: U, IS_HTMLDDA: void 0 === U && U !== undefined },
    W = B.all,
    H = B.IS_HTMLDDA
      ? function (e) {
          return "function" == typeof e || e === W;
        }
      : function (e) {
          return "function" == typeof e;
        },
    $ = H,
    V = B.all,
    G = B.IS_HTMLDDA
      ? function (e) {
          return "object" == typeof e ? null !== e : $(e) || e === V;
        }
      : function (e) {
          return "object" == typeof e ? null !== e : $(e);
        },
    z = n,
    Y = H,
    J = function (e, t) {
      return arguments.length < 2
        ? ((r = z[e]), Y(r) ? r : undefined)
        : z[e] && z[e][t];
      var r;
    },
    q = S({}.isPrototypeOf),
    K = ("undefined" != typeof navigator && String(navigator.userAgent)) || "",
    X = n,
    Z = K,
    Q = X.process,
    ee = X.Deno,
    te = (Q && Q.versions) || (ee && ee.version),
    re = te && te.v8;
  re && (y = (v = re.split("."))[0] > 0 && v[0] < 4 ? 1 : +(v[0] + v[1])),
    !y &&
      Z &&
      (!(v = Z.match(/Edge\/(\d+)/)) || v[1] >= 74) &&
      (v = Z.match(/Chrome\/(\d+)/)) &&
      (y = +v[1]);
  var ne = y,
    oe = ne,
    ie = i,
    ae = n.String,
    ue =
      !!Object.getOwnPropertySymbols &&
      !ie(function () {
        var e = Symbol();
        return (
          !ae(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && oe && oe < 41)
        );
      }),
    ce = ue && !Symbol.sham && "symbol" == typeof Symbol.iterator,
    se = J,
    fe = H,
    le = q,
    de = Object,
    he = ce
      ? function (e) {
          return "symbol" == typeof e;
        }
      : function (e) {
          var t = se("Symbol");
          return fe(t) && le(t.prototype, de(e));
        },
    pe = String,
    ve = function (e) {
      try {
        return pe(e);
      } catch (BI) {
        return "Object";
      }
    },
    ye = H,
    ge = ve,
    be = TypeError,
    me = function (e) {
      if (ye(e)) return e;
      throw be(ge(e) + " is not a function");
    },
    xe = me,
    we = M,
    Se = function (e, t) {
      var r = e[t];
      return we(r) ? undefined : xe(r);
    },
    Ae = f,
    Oe = H,
    Ee = G,
    Te = TypeError,
    Ie = { exports: {} },
    ke = n,
    Ce = Object.defineProperty,
    _e = function (e, t) {
      try {
        Ce(ke, e, { value: t, configurable: !0, writable: !0 });
      } catch (BI) {
        ke[e] = t;
      }
      return t;
    },
    je = _e,
    Me = "__core-js_shared__",
    Le = n[Me] || je(Me, {}),
    Re = Le;
  (Ie.exports = function (e, t) {
    return Re[e] || (Re[e] = t !== undefined ? t : {});
  })("versions", []).push({
    version: "3.31.0",
    mode: "global",
    copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
    license: "https://github.com/zloirock/core-js/blob/v3.31.0/LICENSE",
    source: "https://github.com/zloirock/core-js",
  });
  var Ne = N,
    De = Object,
    Pe = function (e) {
      return De(Ne(e));
    },
    Fe = Pe,
    Ue = S({}.hasOwnProperty),
    Be =
      Object.hasOwn ||
      function (e, t) {
        return Ue(Fe(e), t);
      },
    We = S,
    He = 0,
    $e = Math.random(),
    Ve = We((1).toString),
    Ge = function (e) {
      return "Symbol(" + (e === undefined ? "" : e) + ")_" + Ve(++He + $e, 36);
    },
    ze = n,
    Ye = Ie.exports,
    Je = Be,
    qe = Ge,
    Ke = ue,
    Xe = ce,
    Ze = ze.Symbol,
    Qe = Ye("wks"),
    et = Xe ? Ze["for"] || Ze : (Ze && Ze.withoutSetter) || qe,
    tt = function (e) {
      return (
        Je(Qe, e) || (Qe[e] = Ke && Je(Ze, e) ? Ze[e] : et("Symbol." + e)),
        Qe[e]
      );
    },
    rt = f,
    nt = G,
    ot = he,
    it = Se,
    at = function (e, t) {
      var r, n;
      if ("string" === t && Oe((r = e.toString)) && !Ee((n = Ae(r, e))))
        return n;
      if (Oe((r = e.valueOf)) && !Ee((n = Ae(r, e)))) return n;
      if ("string" !== t && Oe((r = e.toString)) && !Ee((n = Ae(r, e))))
        return n;
      throw Te("Can't convert object to primitive value");
    },
    ut = TypeError,
    ct = tt("toPrimitive"),
    st = function (e, t) {
      if (!nt(e) || ot(e)) return e;
      var r,
        n = it(e, ct);
      if (n) {
        if (
          (t === undefined && (t = "default"),
          (r = rt(n, e, t)),
          !nt(r) || ot(r))
        )
          return r;
        throw ut("Can't convert object to primitive value");
      }
      return t === undefined && (t = "number"), at(e, t);
    },
    ft = st,
    lt = he,
    dt = function (e) {
      var t = ft(e, "string");
      return lt(t) ? t : t + "";
    },
    ht = G,
    pt = n.document,
    vt = ht(pt) && ht(pt.createElement),
    yt = function (e) {
      return vt ? pt.createElement(e) : {};
    },
    gt = yt,
    bt =
      !a &&
      !i(function () {
        return (
          7 !=
          Object.defineProperty(gt("div"), "a", {
            get: function () {
              return 7;
            },
          }).a
        );
      }),
    mt = a,
    xt = f,
    wt = l,
    St = g,
    At = F,
    Ot = dt,
    Et = Be,
    Tt = bt,
    It = Object.getOwnPropertyDescriptor;
  o.f = mt
    ? It
    : function (e, t) {
        if (((e = At(e)), (t = Ot(t)), Tt))
          try {
            return It(e, t);
          } catch (BI) {}
        if (Et(e, t)) return St(!xt(wt.f, e, t), e[t]);
      };
  var kt = {},
    Ct =
      a &&
      i(function () {
        return (
          42 !=
          Object.defineProperty(function () {}, "prototype", {
            value: 42,
            writable: !1,
          }).prototype
        );
      }),
    _t = G,
    jt = String,
    Mt = TypeError,
    Lt = function (e) {
      if (_t(e)) return e;
      throw Mt(jt(e) + " is not an object");
    },
    Rt = a,
    Nt = bt,
    Dt = Ct,
    Pt = Lt,
    Ft = dt,
    Ut = TypeError,
    Bt = Object.defineProperty,
    Wt = Object.getOwnPropertyDescriptor,
    Ht = "enumerable",
    $t = "configurable",
    Vt = "writable";
  kt.f = Rt
    ? Dt
      ? function (e, t, r) {
          if (
            (Pt(e),
            (t = Ft(t)),
            Pt(r),
            "function" == typeof e &&
              "prototype" === t &&
              "value" in r &&
              Vt in r &&
              !r[Vt])
          ) {
            var n = Wt(e, t);
            n &&
              n[Vt] &&
              ((e[t] = r.value),
              (r = {
                configurable: $t in r ? r[$t] : n[$t],
                enumerable: Ht in r ? r[Ht] : n[Ht],
                writable: !1,
              }));
          }
          return Bt(e, t, r);
        }
      : Bt
    : function (e, t, r) {
        if ((Pt(e), (t = Ft(t)), Pt(r), Nt))
          try {
            return Bt(e, t, r);
          } catch (BI) {}
        if ("get" in r || "set" in r) throw Ut("Accessors not supported");
        return "value" in r && (e[t] = r.value), e;
      };
  var Gt = kt,
    zt = g,
    Yt = a
      ? function (e, t, r) {
          return Gt.f(e, t, zt(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        },
    Jt = { exports: {} },
    qt = a,
    Kt = Be,
    Xt = Function.prototype,
    Zt = qt && Object.getOwnPropertyDescriptor,
    Qt = Kt(Xt, "name"),
    er = {
      EXISTS: Qt,
      PROPER: Qt && "something" === function () {}.name,
      CONFIGURABLE: Qt && (!qt || (qt && Zt(Xt, "name").configurable)),
    },
    tr = H,
    rr = Le,
    nr = S(Function.toString);
  tr(rr.inspectSource) ||
    (rr.inspectSource = function (e) {
      return nr(e);
    });
  var or,
    ir,
    ar,
    ur = rr.inspectSource,
    cr = H,
    sr = n.WeakMap,
    fr = cr(sr) && /native code/.test(String(sr)),
    lr = Ie.exports,
    dr = Ge,
    hr = lr("keys"),
    pr = function (e) {
      return hr[e] || (hr[e] = dr(e));
    },
    vr = {},
    yr = fr,
    gr = n,
    br = G,
    mr = Yt,
    xr = Be,
    wr = Le,
    Sr = pr,
    Ar = vr,
    Or = "Object already initialized",
    Er = gr.TypeError,
    Tr = gr.WeakMap;
  if (yr || wr.state) {
    var Ir = wr.state || (wr.state = new Tr());
    (Ir.get = Ir.get),
      (Ir.has = Ir.has),
      (Ir.set = Ir.set),
      (or = function (e, t) {
        if (Ir.has(e)) throw Er(Or);
        return (t.facade = e), Ir.set(e, t), t;
      }),
      (ir = function (e) {
        return Ir.get(e) || {};
      }),
      (ar = function (e) {
        return Ir.has(e);
      });
  } else {
    var kr = Sr("state");
    (Ar[kr] = !0),
      (or = function (e, t) {
        if (xr(e, kr)) throw Er(Or);
        return (t.facade = e), mr(e, kr, t), t;
      }),
      (ir = function (e) {
        return xr(e, kr) ? e[kr] : {};
      }),
      (ar = function (e) {
        return xr(e, kr);
      });
  }
  var Cr = {
      set: or,
      get: ir,
      has: ar,
      enforce: function (e) {
        return ar(e) ? ir(e) : or(e, {});
      },
      getterFor: function (e) {
        return function (t) {
          var r;
          if (!br(t) || (r = ir(t)).type !== e)
            throw Er("Incompatible receiver, " + e + " required");
          return r;
        };
      },
    },
    _r = S,
    jr = i,
    Mr = H,
    Lr = Be,
    Rr = a,
    Nr = er.CONFIGURABLE,
    Dr = ur,
    Pr = Cr.enforce,
    Fr = Cr.get,
    Ur = String,
    Br = Object.defineProperty,
    Wr = _r("".slice),
    Hr = _r("".replace),
    $r = _r([].join),
    Vr =
      Rr &&
      !jr(function () {
        return 8 !== Br(function () {}, "length", { value: 8 }).length;
      }),
    Gr = String(String).split("String"),
    zr = (Jt.exports = function (e, t, r) {
      "Symbol(" === Wr(Ur(t), 0, 7) &&
        (t = "[" + Hr(Ur(t), /^Symbol\(([^)]*)\)/, "$1") + "]"),
        r && r.getter && (t = "get " + t),
        r && r.setter && (t = "set " + t),
        (!Lr(e, "name") || (Nr && e.name !== t)) &&
          (Rr ? Br(e, "name", { value: t, configurable: !0 }) : (e.name = t)),
        Vr &&
          r &&
          Lr(r, "arity") &&
          e.length !== r.arity &&
          Br(e, "length", { value: r.arity });
      try {
        r && Lr(r, "constructor") && r.constructor
          ? Rr && Br(e, "prototype", { writable: !1 })
          : e.prototype && (e.prototype = undefined);
      } catch (BI) {}
      var n = Pr(e);
      return (
        Lr(n, "source") || (n.source = $r(Gr, "string" == typeof t ? t : "")), e
      );
    });
  Function.prototype.toString = zr(function () {
    return (Mr(this) && Fr(this).source) || Dr(this);
  }, "toString");
  var Yr = H,
    Jr = kt,
    qr = Jt.exports,
    Kr = _e,
    Xr = function (e, t, r, n) {
      n || (n = {});
      var o = n.enumerable,
        i = n.name !== undefined ? n.name : t;
      if ((Yr(r) && qr(r, i, n), n.global)) o ? (e[t] = r) : Kr(t, r);
      else {
        try {
          n.unsafe ? e[t] && (o = !0) : delete e[t];
        } catch (BI) {}
        o
          ? (e[t] = r)
          : Jr.f(e, t, {
              value: r,
              enumerable: !1,
              configurable: !n.nonConfigurable,
              writable: !n.nonWritable,
            });
      }
      return e;
    },
    Zr = {},
    Qr = Math.ceil,
    en = Math.floor,
    tn =
      Math.trunc ||
      function (e) {
        var t = +e;
        return (t > 0 ? en : Qr)(t);
      },
    rn = tn,
    nn = function (e) {
      var t = +e;
      return t != t || 0 === t ? 0 : rn(t);
    },
    on = nn,
    an = Math.max,
    un = Math.min,
    cn = function (e, t) {
      var r = on(e);
      return r < 0 ? an(r + t, 0) : un(r, t);
    },
    sn = nn,
    fn = Math.min,
    ln = function (e) {
      return e > 0 ? fn(sn(e), 9007199254740991) : 0;
    },
    dn = ln,
    hn = function (e) {
      return dn(e.length);
    },
    pn = F,
    vn = cn,
    yn = hn,
    gn = function (e) {
      return function (t, r, n) {
        var o,
          i = pn(t),
          a = yn(i),
          u = vn(n, a);
        if (e && r != r) {
          for (; a > u; ) if ((o = i[u++]) != o) return !0;
        } else
          for (; a > u; u++)
            if ((e || u in i) && i[u] === r) return e || u || 0;
        return !e && -1;
      };
    },
    bn = { includes: gn(!0), indexOf: gn(!1) },
    mn = Be,
    xn = F,
    wn = bn.indexOf,
    Sn = vr,
    An = S([].push),
    On = function (e, t) {
      var r,
        n = xn(e),
        o = 0,
        i = [];
      for (r in n) !mn(Sn, r) && mn(n, r) && An(i, r);
      for (; t.length > o; ) mn(n, (r = t[o++])) && (~wn(i, r) || An(i, r));
      return i;
    },
    En = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ],
    Tn = On,
    In = En.concat("length", "prototype");
  Zr.f =
    Object.getOwnPropertyNames ||
    function (e) {
      return Tn(e, In);
    };
  var kn = {};
  kn.f = Object.getOwnPropertySymbols;
  var Cn = J,
    _n = Zr,
    jn = kn,
    Mn = Lt,
    Ln = S([].concat),
    Rn =
      Cn("Reflect", "ownKeys") ||
      function (e) {
        var t = _n.f(Mn(e)),
          r = jn.f;
        return r ? Ln(t, r(e)) : t;
      },
    Nn = Be,
    Dn = Rn,
    Pn = o,
    Fn = kt,
    Un = function (e, t, r) {
      for (var n = Dn(t), o = Fn.f, i = Pn.f, a = 0; a < n.length; a++) {
        var u = n[a];
        Nn(e, u) || (r && Nn(r, u)) || o(e, u, i(t, u));
      }
    },
    Bn = i,
    Wn = H,
    Hn = /#|\.prototype\./,
    $n = function (e, t) {
      var r = Gn[Vn(e)];
      return r == Yn || (r != zn && (Wn(t) ? Bn(t) : !!t));
    },
    Vn = ($n.normalize = function (e) {
      return String(e).replace(Hn, ".").toLowerCase();
    }),
    Gn = ($n.data = {}),
    zn = ($n.NATIVE = "N"),
    Yn = ($n.POLYFILL = "P"),
    Jn = $n,
    qn = n,
    Kn = o.f,
    Xn = Yt,
    Zn = Xr,
    Qn = _e,
    eo = Un,
    to = Jn,
    ro = function (e, t) {
      var r,
        n,
        o,
        i,
        a,
        u = e.target,
        c = e.global,
        s = e.stat;
      if ((r = c ? qn : s ? qn[u] || Qn(u, {}) : (qn[u] || {}).prototype))
        for (n in t) {
          if (
            ((i = t[n]),
            (o = e.dontCallGetSet ? (a = Kn(r, n)) && a.value : r[n]),
            !to(c ? n : u + (s ? "." : "#") + n, e.forced) && o !== undefined)
          ) {
            if (typeof i == typeof o) continue;
            eo(i, o);
          }
          (e.sham || (o && o.sham)) && Xn(i, "sham", !0), Zn(r, n, i, e);
        }
    },
    no = T,
    oo = S,
    io = function (e) {
      if ("Function" === no(e)) return oo(e);
    },
    ao = me,
    uo = u,
    co = io(io.bind),
    so = function (e, t) {
      return (
        ao(e),
        t === undefined
          ? e
          : uo
          ? co(e, t)
          : function () {
              return e.apply(t, arguments);
            }
      );
    },
    fo = f,
    lo = Lt,
    ho = Se,
    po = function (e, t, r) {
      var n, o;
      lo(e);
      try {
        if (!(n = ho(e, "return"))) {
          if ("throw" === t) throw r;
          return r;
        }
        n = fo(n, e);
      } catch (BI) {
        (o = !0), (n = BI);
      }
      if ("throw" === t) throw r;
      if (o) throw n;
      return lo(n), r;
    },
    vo = Lt,
    yo = po,
    go = {},
    bo = go,
    mo = tt("iterator"),
    xo = Array.prototype,
    wo = function (e) {
      return e !== undefined && (bo.Array === e || xo[mo] === e);
    },
    So = {};
  So[tt("toStringTag")] = "z";
  var Ao = "[object z]" === String(So),
    Oo = Ao,
    Eo = H,
    To = T,
    Io = tt("toStringTag"),
    ko = Object,
    Co =
      "Arguments" ==
      To(
        (function () {
          return arguments;
        })()
      ),
    _o = Oo
      ? To
      : function (e) {
          var t, r, n;
          return e === undefined
            ? "Undefined"
            : null === e
            ? "Null"
            : "string" ==
              typeof (r = (function (e, t) {
                try {
                  return e[t];
                } catch (BI) {}
              })((t = ko(e)), Io))
            ? r
            : Co
            ? To(t)
            : "Object" == (n = To(t)) && Eo(t.callee)
            ? "Arguments"
            : n;
        },
    jo = S,
    Mo = i,
    Lo = H,
    Ro = _o,
    No = ur,
    Do = function () {},
    Po = [],
    Fo = J("Reflect", "construct"),
    Uo = /^\s*(?:class|function)\b/,
    Bo = jo(Uo.exec),
    Wo = !Uo.exec(Do),
    Ho = function (e) {
      if (!Lo(e)) return !1;
      try {
        return Fo(Do, Po, e), !0;
      } catch (BI) {
        return !1;
      }
    },
    $o = function (e) {
      if (!Lo(e)) return !1;
      switch (Ro(e)) {
        case "AsyncFunction":
        case "GeneratorFunction":
        case "AsyncGeneratorFunction":
          return !1;
      }
      try {
        return Wo || !!Bo(Uo, No(e));
      } catch (BI) {
        return !0;
      }
    };
  $o.sham = !0;
  var Vo =
      !Fo ||
      Mo(function () {
        var e;
        return (
          Ho(Ho.call) ||
          !Ho(Object) ||
          !Ho(function () {
            e = !0;
          }) ||
          e
        );
      })
        ? $o
        : Ho,
    Go = dt,
    zo = kt,
    Yo = g,
    Jo = function (e, t, r) {
      var n = Go(t);
      n in e ? zo.f(e, n, Yo(0, r)) : (e[n] = r);
    },
    qo = _o,
    Ko = Se,
    Xo = M,
    Zo = go,
    Qo = tt("iterator"),
    ei = function (e) {
      if (!Xo(e)) return Ko(e, Qo) || Ko(e, "@@iterator") || Zo[qo(e)];
    },
    ti = f,
    ri = me,
    ni = Lt,
    oi = ve,
    ii = ei,
    ai = TypeError,
    ui = function (e, t) {
      var r = arguments.length < 2 ? ii(e) : t;
      if (ri(r)) return ni(ti(r, e));
      throw ai(oi(e) + " is not iterable");
    },
    ci = so,
    si = f,
    fi = Pe,
    li = function (e, t, r, n) {
      try {
        return n ? t(vo(r)[0], r[1]) : t(r);
      } catch (BI) {
        yo(e, "throw", BI);
      }
    },
    di = wo,
    hi = Vo,
    pi = hn,
    vi = Jo,
    yi = ui,
    gi = ei,
    bi = Array,
    mi = tt("iterator"),
    xi = !1;
  try {
    var wi = 0,
      Si = {
        next: function () {
          return { done: !!wi++ };
        },
        return: function () {
          xi = !0;
        },
      };
    (Si[mi] = function () {
      return this;
    }),
      Array.from(Si, function () {
        throw 2;
      });
  } catch (BI) {}
  var Ai = function (e, t) {
      if (!t && !xi) return !1;
      var r = !1;
      try {
        var n = {};
        (n[mi] = function () {
          return {
            next: function () {
              return { done: (r = !0) };
            },
          };
        }),
          e(n);
      } catch (BI) {}
      return r;
    },
    Oi = function (e) {
      var t = fi(e),
        r = hi(this),
        n = arguments.length,
        o = n > 1 ? arguments[1] : undefined,
        i = o !== undefined;
      i && (o = ci(o, n > 2 ? arguments[2] : undefined));
      var a,
        u,
        c,
        s,
        f,
        l,
        d = gi(t),
        h = 0;
      if (!d || (this === bi && di(d)))
        for (a = pi(t), u = r ? new this(a) : bi(a); a > h; h++)
          (l = i ? o(t[h], h) : t[h]), vi(u, h, l);
      else
        for (
          f = (s = yi(t, d)).next, u = r ? new this() : [];
          !(c = si(f, s)).done;
          h++
        )
          (l = i ? li(s, o, [c.value, h], !0) : c.value), vi(u, h, l);
      return (u.length = h), u;
    };
  ro(
    {
      target: "Array",
      stat: !0,
      forced: !Ai(function (e) {
        Array.from(e);
      }),
    },
    { from: Oi }
  );
  var Ei = _o,
    Ti = String,
    Ii = function (e) {
      if ("Symbol" === Ei(e))
        throw TypeError("Cannot convert a Symbol value to a string");
      return Ti(e);
    },
    ki = {},
    Ci = On,
    _i = En,
    ji =
      Object.keys ||
      function (e) {
        return Ci(e, _i);
      },
    Mi = a,
    Li = Ct,
    Ri = kt,
    Ni = Lt,
    Di = F,
    Pi = ji;
  ki.f =
    Mi && !Li
      ? Object.defineProperties
      : function (e, t) {
          Ni(e);
          for (var r, n = Di(t), o = Pi(t), i = o.length, a = 0; i > a; )
            Ri.f(e, (r = o[a++]), n[r]);
          return e;
        };
  var Fi,
    Ui = J("document", "documentElement"),
    Bi = Lt,
    Wi = ki,
    Hi = En,
    $i = vr,
    Vi = Ui,
    Gi = yt,
    zi = "prototype",
    Yi = "script",
    Ji = pr("IE_PROTO"),
    qi = function () {},
    Ki = function (e) {
      return "<" + Yi + ">" + e + "</" + Yi + ">";
    },
    Xi = function (e) {
      e.write(Ki("")), e.close();
      var t = e.parentWindow.Object;
      return (e = null), t;
    },
    Zi = function () {
      try {
        Fi = new ActiveXObject("htmlfile");
      } catch (BI) {}
      var e, t, r;
      Zi =
        "undefined" != typeof document
          ? document.domain && Fi
            ? Xi(Fi)
            : ((t = Gi("iframe")),
              (r = "java" + Yi + ":"),
              (t.style.display = "none"),
              Vi.appendChild(t),
              (t.src = String(r)),
              (e = t.contentWindow.document).open(),
              e.write(Ki("document.F=Object")),
              e.close(),
              e.F)
          : Xi(Fi);
      for (var n = Hi.length; n--; ) delete Zi[zi][Hi[n]];
      return Zi();
    };
  $i[Ji] = !0;
  var Qi =
      Object.create ||
      function (e, t) {
        var r;
        return (
          null !== e
            ? ((qi[zi] = Bi(e)), (r = new qi()), (qi[zi] = null), (r[Ji] = e))
            : (r = Zi()),
          t === undefined ? r : Wi.f(r, t)
        );
      },
    ea = {},
    ta = cn,
    ra = hn,
    na = Jo,
    oa = Array,
    ia = Math.max,
    aa = function (e, t, r) {
      for (
        var n = ra(e),
          o = ta(t, n),
          i = ta(r === undefined ? n : r, n),
          a = oa(ia(i - o, 0)),
          u = 0;
        o < i;
        o++, u++
      )
        na(a, u, e[o]);
      return (a.length = u), a;
    },
    ua = T,
    ca = F,
    sa = Zr.f,
    fa = aa,
    la =
      "object" == typeof window && window && Object.getOwnPropertyNames
        ? Object.getOwnPropertyNames(window)
        : [];
  ea.f = function (e) {
    return la && "Window" == ua(e)
      ? (function (e) {
          try {
            return sa(e);
          } catch (BI) {
            return fa(la);
          }
        })(e)
      : sa(ca(e));
  };
  var da = Jt.exports,
    ha = kt,
    pa = function (e, t, r) {
      return (
        r.get && da(r.get, t, { getter: !0 }),
        r.set && da(r.set, t, { setter: !0 }),
        ha.f(e, t, r)
      );
    },
    va = {},
    ya = tt;
  va.f = ya;
  var ga = n,
    ba = Be,
    ma = va,
    xa = kt.f,
    wa = function (e) {
      var t = ga.Symbol || (ga.Symbol = {});
      ba(t, e) || xa(t, e, { value: ma.f(e) });
    },
    Sa = f,
    Aa = J,
    Oa = tt,
    Ea = Xr,
    Ta = kt.f,
    Ia = Be,
    ka = tt("toStringTag"),
    Ca = function (e, t, r) {
      e && !r && (e = e.prototype),
        e && !Ia(e, ka) && Ta(e, ka, { configurable: !0, value: t });
    },
    _a = T,
    ja =
      Array.isArray ||
      function (e) {
        return "Array" == _a(e);
      },
    Ma = ja,
    La = Vo,
    Ra = G,
    Na = tt("species"),
    Da = Array,
    Pa = function (e) {
      var t;
      return (
        Ma(e) &&
          ((t = e.constructor),
          ((La(t) && (t === Da || Ma(t.prototype))) ||
            (Ra(t) && null === (t = t[Na]))) &&
            (t = undefined)),
        t === undefined ? Da : t
      );
    },
    Fa = function (e, t) {
      return new (Pa(e))(0 === t ? 0 : t);
    },
    Ua = so,
    Ba = j,
    Wa = Pe,
    Ha = hn,
    $a = Fa,
    Va = S([].push),
    Ga = function (e) {
      var t = 1 == e,
        r = 2 == e,
        n = 3 == e,
        o = 4 == e,
        i = 6 == e,
        a = 7 == e,
        u = 5 == e || i;
      return function (c, s, f, l) {
        for (
          var d,
            h,
            p = Wa(c),
            v = Ba(p),
            y = Ua(s, f),
            g = Ha(v),
            b = 0,
            m = l || $a,
            x = t ? m(c, g) : r || a ? m(c, 0) : undefined;
          g > b;
          b++
        )
          if ((u || b in v) && ((h = y((d = v[b]), b, p)), e))
            if (t) x[b] = h;
            else if (h)
              switch (e) {
                case 3:
                  return !0;
                case 5:
                  return d;
                case 6:
                  return b;
                case 2:
                  Va(x, d);
              }
            else
              switch (e) {
                case 4:
                  return !1;
                case 7:
                  Va(x, d);
              }
        return i ? -1 : n || o ? o : x;
      };
    },
    za = {
      forEach: Ga(0),
      map: Ga(1),
      filter: Ga(2),
      some: Ga(3),
      every: Ga(4),
      find: Ga(5),
      findIndex: Ga(6),
      filterReject: Ga(7),
    },
    Ya = ro,
    Ja = n,
    qa = f,
    Ka = S,
    Xa = a,
    Za = ue,
    Qa = i,
    eu = Be,
    tu = q,
    ru = Lt,
    nu = F,
    ou = dt,
    iu = Ii,
    au = g,
    uu = Qi,
    cu = ji,
    su = Zr,
    fu = ea,
    lu = kn,
    du = o,
    hu = kt,
    pu = ki,
    vu = l,
    yu = Xr,
    gu = pa,
    bu = Ie.exports,
    mu = vr,
    xu = Ge,
    wu = tt,
    Su = va,
    Au = wa,
    Ou = function () {
      var e = Aa("Symbol"),
        t = e && e.prototype,
        r = t && t.valueOf,
        n = Oa("toPrimitive");
      t &&
        !t[n] &&
        Ea(
          t,
          n,
          function (e) {
            return Sa(r, this);
          },
          { arity: 1 }
        );
    },
    Eu = Ca,
    Tu = Cr,
    Iu = za.forEach,
    ku = pr("hidden"),
    Cu = "Symbol",
    _u = "prototype",
    ju = Tu.set,
    Mu = Tu.getterFor(Cu),
    Lu = Object[_u],
    Ru = Ja.Symbol,
    Nu = Ru && Ru[_u],
    Du = Ja.TypeError,
    Pu = Ja.QObject,
    Fu = du.f,
    Uu = hu.f,
    Bu = fu.f,
    Wu = vu.f,
    Hu = Ka([].push),
    $u = bu("symbols"),
    Vu = bu("op-symbols"),
    Gu = bu("wks"),
    zu = !Pu || !Pu[_u] || !Pu[_u].findChild,
    Yu =
      Xa &&
      Qa(function () {
        return (
          7 !=
          uu(
            Uu({}, "a", {
              get: function () {
                return Uu(this, "a", { value: 7 }).a;
              },
            })
          ).a
        );
      })
        ? function (e, t, r) {
            var n = Fu(Lu, t);
            n && delete Lu[t], Uu(e, t, r), n && e !== Lu && Uu(Lu, t, n);
          }
        : Uu,
    Ju = function (e, t) {
      var r = ($u[e] = uu(Nu));
      return (
        ju(r, { type: Cu, tag: e, description: t }),
        Xa || (r.description = t),
        r
      );
    },
    qu = function (e, t, r) {
      e === Lu && qu(Vu, t, r), ru(e);
      var n = ou(t);
      return (
        ru(r),
        eu($u, n)
          ? (r.enumerable
              ? (eu(e, ku) && e[ku][n] && (e[ku][n] = !1),
                (r = uu(r, { enumerable: au(0, !1) })))
              : (eu(e, ku) || Uu(e, ku, au(1, {})), (e[ku][n] = !0)),
            Yu(e, n, r))
          : Uu(e, n, r)
      );
    },
    Ku = function (e, t) {
      ru(e);
      var r = nu(t),
        n = cu(r).concat(ec(r));
      return (
        Iu(n, function (t) {
          (Xa && !qa(Xu, r, t)) || qu(e, t, r[t]);
        }),
        e
      );
    },
    Xu = function (e) {
      var t = ou(e),
        r = qa(Wu, this, t);
      return (
        !(this === Lu && eu($u, t) && !eu(Vu, t)) &&
        (!(r || !eu(this, t) || !eu($u, t) || (eu(this, ku) && this[ku][t])) ||
          r)
      );
    },
    Zu = function (e, t) {
      var r = nu(e),
        n = ou(t);
      if (r !== Lu || !eu($u, n) || eu(Vu, n)) {
        var o = Fu(r, n);
        return (
          !o || !eu($u, n) || (eu(r, ku) && r[ku][n]) || (o.enumerable = !0), o
        );
      }
    },
    Qu = function (e) {
      var t = Bu(nu(e)),
        r = [];
      return (
        Iu(t, function (e) {
          eu($u, e) || eu(mu, e) || Hu(r, e);
        }),
        r
      );
    },
    ec = function (e) {
      var t = e === Lu,
        r = Bu(t ? Vu : nu(e)),
        n = [];
      return (
        Iu(r, function (e) {
          !eu($u, e) || (t && !eu(Lu, e)) || Hu(n, $u[e]);
        }),
        n
      );
    };
  Za ||
    ((Ru = function () {
      if (tu(Nu, this)) throw Du("Symbol is not a constructor");
      var e =
          arguments.length && arguments[0] !== undefined
            ? iu(arguments[0])
            : undefined,
        t = xu(e),
        r = function (e) {
          this === Lu && qa(r, Vu, e),
            eu(this, ku) && eu(this[ku], t) && (this[ku][t] = !1),
            Yu(this, t, au(1, e));
        };
      return Xa && zu && Yu(Lu, t, { configurable: !0, set: r }), Ju(t, e);
    }),
    yu((Nu = Ru[_u]), "toString", function () {
      return Mu(this).tag;
    }),
    yu(Ru, "withoutSetter", function (e) {
      return Ju(xu(e), e);
    }),
    (vu.f = Xu),
    (hu.f = qu),
    (pu.f = Ku),
    (du.f = Zu),
    (su.f = fu.f = Qu),
    (lu.f = ec),
    (Su.f = function (e) {
      return Ju(wu(e), e);
    }),
    Xa &&
      (gu(Nu, "description", {
        configurable: !0,
        get: function () {
          return Mu(this).description;
        },
      }),
      yu(Lu, "propertyIsEnumerable", Xu, { unsafe: !0 }))),
    Ya(
      { global: !0, constructor: !0, wrap: !0, forced: !Za, sham: !Za },
      { Symbol: Ru }
    ),
    Iu(cu(Gu), function (e) {
      Au(e);
    }),
    Ya(
      { target: Cu, stat: !0, forced: !Za },
      {
        useSetter: function () {
          zu = !0;
        },
        useSimple: function () {
          zu = !1;
        },
      }
    ),
    Ya(
      { target: "Object", stat: !0, forced: !Za, sham: !Xa },
      {
        create: function (e, t) {
          return t === undefined ? uu(e) : Ku(uu(e), t);
        },
        defineProperty: qu,
        defineProperties: Ku,
        getOwnPropertyDescriptor: Zu,
      }
    ),
    Ya(
      { target: "Object", stat: !0, forced: !Za },
      { getOwnPropertyNames: Qu }
    ),
    Ou(),
    Eu(Ru, Cu),
    (mu[ku] = !0);
  var tc = ue && !!Symbol["for"] && !!Symbol.keyFor,
    rc = ro,
    nc = J,
    oc = Be,
    ic = Ii,
    ac = Ie.exports,
    uc = tc,
    cc = ac("string-to-symbol-registry"),
    sc = ac("symbol-to-string-registry");
  rc(
    { target: "Symbol", stat: !0, forced: !uc },
    {
      for: function (e) {
        var t = ic(e);
        if (oc(cc, t)) return cc[t];
        var r = nc("Symbol")(t);
        return (cc[t] = r), (sc[r] = t), r;
      },
    }
  );
  var fc = ro,
    lc = Be,
    dc = he,
    hc = ve,
    pc = tc,
    vc = (0, Ie.exports)("symbol-to-string-registry");
  fc(
    { target: "Symbol", stat: !0, forced: !pc },
    {
      keyFor: function (e) {
        if (!dc(e)) throw TypeError(hc(e) + " is not a symbol");
        if (lc(vc, e)) return vc[e];
      },
    }
  );
  var yc = u,
    gc = Function.prototype,
    bc = gc.apply,
    mc = gc.call,
    xc =
      ("object" == typeof Reflect && Reflect.apply) ||
      (yc
        ? mc.bind(bc)
        : function () {
            return mc.apply(bc, arguments);
          }),
    wc = S([].slice),
    Sc = ja,
    Ac = H,
    Oc = T,
    Ec = Ii,
    Tc = S([].push),
    Ic = ro,
    kc = J,
    Cc = xc,
    _c = f,
    jc = S,
    Mc = i,
    Lc = H,
    Rc = he,
    Nc = wc,
    Dc = function (e) {
      if (Ac(e)) return e;
      if (Sc(e)) {
        for (var t = e.length, r = [], n = 0; n < t; n++) {
          var o = e[n];
          "string" == typeof o
            ? Tc(r, o)
            : ("number" != typeof o &&
                "Number" != Oc(o) &&
                "String" != Oc(o)) ||
              Tc(r, Ec(o));
        }
        var i = r.length,
          a = !0;
        return function (e, t) {
          if (a) return (a = !1), t;
          if (Sc(this)) return t;
          for (var n = 0; n < i; n++) if (r[n] === e) return t;
        };
      }
    },
    Pc = ue,
    Fc = String,
    Uc = kc("JSON", "stringify"),
    Bc = jc(/./.exec),
    Wc = jc("".charAt),
    Hc = jc("".charCodeAt),
    $c = jc("".replace),
    Vc = jc((1).toString),
    Gc = /[\uD800-\uDFFF]/g,
    zc = /^[\uD800-\uDBFF]$/,
    Yc = /^[\uDC00-\uDFFF]$/,
    Jc =
      !Pc ||
      Mc(function () {
        var e = kc("Symbol")();
        return (
          "[null]" != Uc([e]) || "{}" != Uc({ a: e }) || "{}" != Uc(Object(e))
        );
      }),
    qc = Mc(function () {
      return (
        '"\\udf06\\ud834"' !== Uc("\udf06\ud834") ||
        '"\\udead"' !== Uc("\udead")
      );
    }),
    Kc = function (e, t) {
      var r = Nc(arguments),
        n = Dc(t);
      if (Lc(n) || (e !== undefined && !Rc(e)))
        return (
          (r[1] = function (e, t) {
            if ((Lc(n) && (t = _c(n, this, Fc(e), t)), !Rc(t))) return t;
          }),
          Cc(Uc, null, r)
        );
    },
    Xc = function (e, t, r) {
      var n = Wc(r, t - 1),
        o = Wc(r, t + 1);
      return (Bc(zc, e) && !Bc(Yc, o)) || (Bc(Yc, e) && !Bc(zc, n))
        ? "\\u" + Vc(Hc(e, 0), 16)
        : e;
    };
  Uc &&
    Ic(
      { target: "JSON", stat: !0, arity: 3, forced: Jc || qc },
      {
        stringify: function (e, t, r) {
          var n = Nc(arguments),
            o = Cc(Jc ? Kc : Uc, null, n);
          return qc && "string" == typeof o ? $c(o, Gc, Xc) : o;
        },
      }
    );
  var Zc = kn,
    Qc = Pe;
  ro(
    {
      target: "Object",
      stat: !0,
      forced:
        !ue ||
        i(function () {
          Zc.f(1);
        }),
    },
    {
      getOwnPropertySymbols: function (e) {
        var t = Zc.f;
        return t ? t(Qc(e)) : [];
      },
    }
  );
  var es = ro,
    ts = a,
    rs = S,
    ns = Be,
    os = H,
    is = q,
    as = Ii,
    us = pa,
    cs = Un,
    ss = n.Symbol,
    fs = ss && ss.prototype;
  if (
    ts &&
    os(ss) &&
    (!("description" in fs) || ss().description !== undefined)
  ) {
    var ls = {},
      ds = function () {
        var e =
            arguments.length < 1 || arguments[0] === undefined
              ? undefined
              : as(arguments[0]),
          t = is(fs, this) ? new ss(e) : e === undefined ? ss() : ss(e);
        return "" === e && (ls[t] = !0), t;
      };
    cs(ds, ss), (ds.prototype = fs), (fs.constructor = ds);
    var hs = "Symbol(test)" == String(ss("test")),
      ps = rs(fs.valueOf),
      vs = rs(fs.toString),
      ys = /^Symbol\((.*)\)[^)]+$/,
      gs = rs("".replace),
      bs = rs("".slice);
    us(fs, "description", {
      configurable: !0,
      get: function () {
        var e = ps(this);
        if (ns(ls, e)) return "";
        var t = vs(e),
          r = hs ? bs(t, 7, -1) : gs(t, ys, "$1");
        return "" === r ? undefined : r;
      },
    }),
      es({ global: !0, constructor: !0, forced: !0 }, { Symbol: ds });
  }
  wa("iterator");
  var ms,
    xs = { exports: {} },
    ws = { exports: {} };
  ((ms = ws).exports = function (e) {
    if (Array.isArray(e)) return e;
  }),
    (ms.exports.__esModule = !0),
    (ms.exports["default"] = ms.exports);
  var Ss = { exports: {} };
  !(function (e) {
    (e.exports = function (e, t) {
      var r =
        null == e
          ? null
          : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
            e["@@iterator"];
      if (null != r) {
        var n,
          o,
          i,
          a,
          u = [],
          c = !0,
          s = !1;
        try {
          if (((i = (r = r.call(e)).next), 0 === t)) {
            if (Object(r) !== r) return;
            c = !1;
          } else
            for (
              ;
              !(c = (n = i.call(r)).done) && (u.push(n.value), u.length !== t);
              c = !0
            );
        } catch (f) {
          (s = !0), (o = f);
        } finally {
          try {
            if (
              !c &&
              null != r["return"] &&
              ((a = r["return"]()), Object(a) !== a)
            )
              return;
          } finally {
            if (s) throw o;
          }
        }
        return u;
      }
    }),
      (e.exports.__esModule = !0),
      (e.exports["default"] = e.exports);
  })(Ss);
  var As = { exports: {} },
    Os = { exports: {} };
  !(function (e) {
    (e.exports = function (e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
      return n;
    }),
      (e.exports.__esModule = !0),
      (e.exports["default"] = e.exports);
  })(Os),
    (function (e) {
      var t = Os.exports;
      (e.exports = function (e, r) {
        if (e) {
          if ("string" == typeof e) return t(e, r);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          return (
            "Object" === n && e.constructor && (n = e.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(e)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? t(e, r)
              : void 0
          );
        }
      }),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    })(As);
  var Es = { exports: {} };
  !(function (e) {
    (e.exports = function () {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    }),
      (e.exports.__esModule = !0),
      (e.exports["default"] = e.exports);
  })(Es),
    (function (e) {
      var t = ws.exports,
        r = Ss.exports,
        n = As.exports,
        o = Es.exports;
      (e.exports = function (e, i) {
        return t(e) || r(e, i) || n(e, i) || o();
      }),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    })(xs);
  var Ts = t(xs.exports),
    Is = { exports: {} };
  !(function (e) {
    (e.exports = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }),
      (e.exports.__esModule = !0),
      (e.exports["default"] = e.exports);
  })(Is);
  var ks = t(Is.exports),
    Cs = { exports: {} },
    _s = { exports: {} },
    js = { exports: {} };
  !(function (e) {
    function t(r) {
      return (
        (e.exports = t =
          "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  "function" == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? "symbol"
                  : typeof e;
              }),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports),
        t(r)
      );
    }
    (e.exports = t),
      (e.exports.__esModule = !0),
      (e.exports["default"] = e.exports);
  })(js);
  var Ms = t(js.exports),
    Ls = { exports: {} };
  !(function (e) {
    var t = js.exports["default"];
    (e.exports = function (e, r) {
      if ("object" !== t(e) || null === e) return e;
      var n = e[Symbol.toPrimitive];
      if (n !== undefined) {
        var o = n.call(e, r || "default");
        if ("object" !== t(o)) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(e);
    }),
      (e.exports.__esModule = !0),
      (e.exports["default"] = e.exports);
  })(Ls),
    (function (e) {
      var t = js.exports["default"],
        r = Ls.exports;
      (e.exports = function (e) {
        var n = r(e, "string");
        return "symbol" === t(n) ? n : String(n);
      }),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    })(_s),
    (function (e) {
      var t = _s.exports;
      function r(e, r) {
        for (var n = 0; n < r.length; n++) {
          var o = r[n];
          (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, t(o.key), o);
        }
      }
      (e.exports = function (e, t, n) {
        return (
          t && r(e.prototype, t),
          n && r(e, n),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          e
        );
      }),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    })(Cs);
  var Rs = t(Cs.exports),
    Ns = { exports: {} },
    Ds = { exports: {} };
  !(function (e) {
    var t = Os.exports;
    (e.exports = function (e) {
      if (Array.isArray(e)) return t(e);
    }),
      (e.exports.__esModule = !0),
      (e.exports["default"] = e.exports);
  })(Ds);
  var Ps = { exports: {} };
  !(function (e) {
    (e.exports = function (e) {
      if (
        ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
        null != e["@@iterator"]
      )
        return Array.from(e);
    }),
      (e.exports.__esModule = !0),
      (e.exports["default"] = e.exports);
  })(Ps);
  var Fs = { exports: {} };
  !(function (e) {
    (e.exports = function () {
      throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    }),
      (e.exports.__esModule = !0),
      (e.exports["default"] = e.exports);
  })(Fs),
    (function (e) {
      var t = Ds.exports,
        r = Ps.exports,
        n = As.exports,
        o = Fs.exports;
      (e.exports = function (e) {
        return t(e) || r(e) || n(e) || o();
      }),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
    })(Ns);
  var Us = t(Ns.exports),
    Bs = { exports: {} };
  !(function (e) {
    function t(e, t, r, n, o, i, a) {
      try {
        var u = e[i](a),
          c = u.value;
      } catch (BI) {
        return void r(BI);
      }
      u.done ? t(c) : Dynamsoft.Lib.Promise.resolve(c).then(n, o);
    }
    (e.exports = function (e) {
      return function () {
        var r = this,
          n = arguments;
        return new Dynamsoft.Lib.Promise(function (o, i) {
          var a = e.apply(r, n);
          function u(e) {
            t(a, o, i, u, c, "next", e);
          }
          function c(e) {
            t(a, o, i, u, c, "throw", e);
          }
          u(undefined);
        });
      };
    }),
      (e.exports.__esModule = !0),
      (e.exports["default"] = e.exports);
  })(Bs);
  var Ws = t(Bs.exports),
    Hs = { exports: {} };
  !(function (e) {
    var t = js.exports["default"];
    function r() {
      (e.exports = r =
        function () {
          return n;
        }),
        (e.exports.__esModule = !0),
        (e.exports["default"] = e.exports);
      var n = {},
        o = Object.prototype,
        i = o.hasOwnProperty,
        a =
          Object.defineProperty ||
          function (e, t, r) {
            e[t] = r.value;
          },
        u = "function" == typeof Symbol ? Symbol : {},
        c = u.iterator || "@@iterator",
        s = u.asyncIterator || "@@asyncIterator",
        f = u.toStringTag || "@@toStringTag";
      function l(e, t, r) {
        return (
          Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          e[t]
        );
      }
      try {
        l({}, "");
      } catch (j) {
        l = function (e, t, r) {
          return (e[t] = r);
        };
      }
      function d(e, t, r, n) {
        var o = t && t.prototype instanceof v ? t : v,
          i = Object.create(o.prototype),
          u = new k(n || []);
        return a(i, "_invoke", { value: O(e, r, u) }), i;
      }
      function h(e, t, r) {
        try {
          return { type: "normal", arg: e.call(t, r) };
        } catch (j) {
          return { type: "throw", arg: j };
        }
      }
      n.wrap = d;
      var p = {};
      function v() {}
      function y() {}
      function g() {}
      var b = {};
      l(b, c, function () {
        return this;
      });
      var m = Object.getPrototypeOf,
        x = m && m(m(C([])));
      x && x !== o && i.call(x, c) && (b = x);
      var w = (g.prototype = v.prototype = Object.create(b));
      function S(e) {
        ["next", "throw", "return"].forEach(function (t) {
          l(e, t, function (e) {
            return this._invoke(t, e);
          });
        });
      }
      function A(e, r) {
        function n(o, a, u, c) {
          var s = h(e[o], e, a);
          if ("throw" !== s.type) {
            var f = s.arg,
              l = f.value;
            return l && "object" == t(l) && i.call(l, "__await")
              ? r.resolve(l.__await).then(
                  function (e) {
                    n("next", e, u, c);
                  },
                  function (e) {
                    n("throw", e, u, c);
                  }
                )
              : r.resolve(l).then(
                  function (e) {
                    (f.value = e), u(f);
                  },
                  function (e) {
                    return n("throw", e, u, c);
                  }
                );
          }
          c(s.arg);
        }
        var o;
        a(this, "_invoke", {
          value: function (e, t) {
            function i() {
              return new r(function (r, o) {
                n(e, t, r, o);
              });
            }
            return (o = o ? o.then(i, i) : i());
          },
        });
      }
      function O(e, t, r) {
        var n = "suspendedStart";
        return function (o, i) {
          if ("executing" === n)
            throw new Error("Generator is already running");
          if ("completed" === n) {
            if ("throw" === o) throw i;
            return _();
          }
          for (r.method = o, r.arg = i; ; ) {
            var a = r.delegate;
            if (a) {
              var u = E(a, r);
              if (u) {
                if (u === p) continue;
                return u;
              }
            }
            if ("next" === r.method) r.sent = r._sent = r.arg;
            else if ("throw" === r.method) {
              if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            n = "executing";
            var c = h(e, t, r);
            if ("normal" === c.type) {
              if (((n = r.done ? "completed" : "suspendedYield"), c.arg === p))
                continue;
              return { value: c.arg, done: r.done };
            }
            "throw" === c.type &&
              ((n = "completed"), (r.method = "throw"), (r.arg = c.arg));
          }
        };
      }
      function E(e, t) {
        var r = t.method,
          n = e.iterator[r];
        if (undefined === n)
          return (
            (t.delegate = null),
            ("throw" === r &&
              e.iterator["return"] &&
              ((t.method = "return"),
              (t.arg = undefined),
              E(e, t),
              "throw" === t.method)) ||
              ("return" !== r &&
                ((t.method = "throw"),
                (t.arg = new TypeError(
                  "The iterator does not provide a '" + r + "' method"
                )))),
            p
          );
        var o = h(n, e.iterator, t.arg);
        if ("throw" === o.type)
          return (t.method = "throw"), (t.arg = o.arg), (t.delegate = null), p;
        var i = o.arg;
        return i
          ? i.done
            ? ((t[e.resultName] = i.value),
              (t.next = e.nextLoc),
              "return" !== t.method &&
                ((t.method = "next"), (t.arg = undefined)),
              (t.delegate = null),
              p)
            : i
          : ((t.method = "throw"),
            (t.arg = new TypeError("iterator result is not an object")),
            (t.delegate = null),
            p);
      }
      function T(e) {
        var t = { tryLoc: e[0] };
        1 in e && (t.catchLoc = e[1]),
          2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
          this.tryEntries.push(t);
      }
      function I(e) {
        var t = e.completion || {};
        (t.type = "normal"), delete t.arg, (e.completion = t);
      }
      function k(e) {
        (this.tryEntries = [{ tryLoc: "root" }]),
          e.forEach(T, this),
          this.reset(!0);
      }
      function C(e) {
        if (e) {
          var t = e[c];
          if (t) return t.call(e);
          if ("function" == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var r = -1,
              n = function t() {
                for (; ++r < e.length; )
                  if (i.call(e, r)) return (t.value = e[r]), (t.done = !1), t;
                return (t.value = undefined), (t.done = !0), t;
              };
            return (n.next = n);
          }
        }
        return { next: _ };
      }
      function _() {
        return { value: undefined, done: !0 };
      }
      return (
        (y.prototype = g),
        a(w, "constructor", { value: g, configurable: !0 }),
        a(g, "constructor", { value: y, configurable: !0 }),
        (y.displayName = l(g, f, "GeneratorFunction")),
        (n.isGeneratorFunction = function (e) {
          var t = "function" == typeof e && e.constructor;
          return (
            !!t &&
            (t === y || "GeneratorFunction" === (t.displayName || t.name))
          );
        }),
        (n.mark = function (e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, g)
              : ((e.__proto__ = g), l(e, f, "GeneratorFunction")),
            (e.prototype = Object.create(w)),
            e
          );
        }),
        (n.awrap = function (e) {
          return { __await: e };
        }),
        S(A.prototype),
        l(A.prototype, s, function () {
          return this;
        }),
        (n.AsyncIterator = A),
        (n.async = function (e, t, r, o, i) {
          void 0 === i && (i = Promise);
          var a = new A(d(e, t, r, o), i);
          return n.isGeneratorFunction(t)
            ? a
            : a.next().then(function (e) {
                return e.done ? e.value : a.next();
              });
        }),
        S(w),
        l(w, f, "Generator"),
        l(w, c, function () {
          return this;
        }),
        l(w, "toString", function () {
          return "[object Generator]";
        }),
        (n.keys = function (e) {
          var t = Object(e),
            r = [];
          for (var n in t) r.push(n);
          return (
            r.reverse(),
            function o() {
              for (; r.length; ) {
                var e = r.pop();
                if (e in t) return (o.value = e), (o.done = !1), o;
              }
              return (o.done = !0), o;
            }
          );
        }),
        (n.values = C),
        (k.prototype = {
          constructor: k,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = undefined),
              (this.done = !1),
              (this.delegate = null),
              (this.method = "next"),
              (this.arg = undefined),
              this.tryEntries.forEach(I),
              !e)
            )
              for (var t in this)
                "t" === t.charAt(0) &&
                  i.call(this, t) &&
                  !isNaN(+t.slice(1)) &&
                  (this[t] = undefined);
          },
          stop: function () {
            this.done = !0;
            var e = this.tryEntries[0].completion;
            if ("throw" === e.type) throw e.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            if (this.done) throw e;
            var t = this;
            function r(r, n) {
              return (
                (a.type = "throw"),
                (a.arg = e),
                (t.next = r),
                n && ((t.method = "next"), (t.arg = undefined)),
                !!n
              );
            }
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var o = this.tryEntries[n],
                a = o.completion;
              if ("root" === o.tryLoc) return r("end");
              if (o.tryLoc <= this.prev) {
                var u = i.call(o, "catchLoc"),
                  c = i.call(o, "finallyLoc");
                if (u && c) {
                  if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                  if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                } else if (u) {
                  if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                } else {
                  if (!c)
                    throw new Error("try statement without catch or finally");
                  if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var n = this.tryEntries[r];
              if (
                n.tryLoc <= this.prev &&
                i.call(n, "finallyLoc") &&
                this.prev < n.finallyLoc
              ) {
                var o = n;
                break;
              }
            }
            o &&
              ("break" === e || "continue" === e) &&
              o.tryLoc <= t &&
              t <= o.finallyLoc &&
              (o = null);
            var a = o ? o.completion : {};
            return (
              (a.type = e),
              (a.arg = t),
              o
                ? ((this.method = "next"), (this.next = o.finallyLoc), p)
                : this.complete(a)
            );
          },
          complete: function (e, t) {
            if ("throw" === e.type) throw e.arg;
            return (
              "break" === e.type || "continue" === e.type
                ? (this.next = e.arg)
                : "return" === e.type
                ? ((this.rval = this.arg = e.arg),
                  (this.method = "return"),
                  (this.next = "end"))
                : "normal" === e.type && t && (this.next = t),
              p
            );
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];
              if (r.finallyLoc === e)
                return this.complete(r.completion, r.afterLoc), I(r), p;
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t];
              if (r.tryLoc === e) {
                var n = r.completion;
                if ("throw" === n.type) {
                  var o = n.arg;
                  I(r);
                }
                return o;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function (e, t, r) {
            return (
              (this.delegate = { iterator: C(e), resultName: t, nextLoc: r }),
              "next" === this.method && (this.arg = undefined),
              p
            );
          },
        }),
        n
      );
    }
    (e.exports = r),
      (e.exports.__esModule = !0),
      (e.exports["default"] = e.exports);
  })(Hs);
  var $s = Hs.exports(),
    Vs = $s;
  try {
    regeneratorRuntime = $s;
  } catch ($C) {
    "object" == typeof globalThis
      ? (globalThis.regeneratorRuntime = $s)
      : Function("r", "regeneratorRuntime = r")($s);
  }
  var Gs = Lt,
    zs = function () {
      var e = Gs(this),
        t = "";
      return (
        e.hasIndices && (t += "d"),
        e.global && (t += "g"),
        e.ignoreCase && (t += "i"),
        e.multiline && (t += "m"),
        e.dotAll && (t += "s"),
        e.unicode && (t += "u"),
        e.unicodeSets && (t += "v"),
        e.sticky && (t += "y"),
        t
      );
    },
    Ys = i,
    Js = n.RegExp,
    qs = Ys(function () {
      var e = Js("a", "y");
      return (e.lastIndex = 2), null != e.exec("abcd");
    }),
    Ks =
      qs ||
      Ys(function () {
        return !Js("a", "y").sticky;
      }),
    Xs =
      qs ||
      Ys(function () {
        var e = Js("^r", "gy");
        return (e.lastIndex = 2), null != e.exec("str");
      }),
    Zs = { BROKEN_CARET: Xs, MISSED_STICKY: Ks, UNSUPPORTED_Y: qs },
    Qs = i,
    ef = n.RegExp,
    tf = Qs(function () {
      var e = ef(".", "s");
      return !(e.dotAll && e.exec("\n") && "s" === e.flags);
    }),
    rf = i,
    nf = n.RegExp,
    of = rf(function () {
      var e = nf("(?<a>b)", "g");
      return "b" !== e.exec("b").groups.a || "bc" !== "b".replace(e, "$<a>c");
    }),
    af = f,
    uf = S,
    cf = Ii,
    sf = zs,
    ff = Zs,
    lf = Ie.exports,
    df = Qi,
    hf = Cr.get,
    pf = tf,
    vf = of,
    yf = lf("native-string-replace", String.prototype.replace),
    gf = RegExp.prototype.exec,
    bf = gf,
    mf = uf("".charAt),
    xf = uf("".indexOf),
    wf = uf("".replace),
    Sf = uf("".slice),
    Af = (function () {
      var e = /a/,
        t = /b*/g;
      return (
        af(gf, e, "a"), af(gf, t, "a"), 0 !== e.lastIndex || 0 !== t.lastIndex
      );
    })(),
    Of = ff.BROKEN_CARET,
    Ef = /()??/.exec("")[1] !== undefined;
  (Af || Ef || Of || pf || vf) &&
    (bf = function (e) {
      var t,
        r,
        n,
        o,
        i,
        a,
        u,
        c = this,
        s = hf(c),
        f = cf(e),
        l = s.raw;
      if (l)
        return (
          (l.lastIndex = c.lastIndex),
          (t = af(bf, l, f)),
          (c.lastIndex = l.lastIndex),
          t
        );
      var d = s.groups,
        h = Of && c.sticky,
        p = af(sf, c),
        v = c.source,
        y = 0,
        g = f;
      if (
        (h &&
          ((p = wf(p, "y", "")),
          -1 === xf(p, "g") && (p += "g"),
          (g = Sf(f, c.lastIndex)),
          c.lastIndex > 0 &&
            (!c.multiline ||
              (c.multiline && "\n" !== mf(f, c.lastIndex - 1))) &&
            ((v = "(?: " + v + ")"), (g = " " + g), y++),
          (r = new RegExp("^(?:" + v + ")", p))),
        Ef && (r = new RegExp("^" + v + "$(?!\\s)", p)),
        Af && (n = c.lastIndex),
        (o = af(gf, h ? r : c, g)),
        h
          ? o
            ? ((o.input = Sf(o.input, y)),
              (o[0] = Sf(o[0], y)),
              (o.index = c.lastIndex),
              (c.lastIndex += o[0].length))
            : (c.lastIndex = 0)
          : Af && o && (c.lastIndex = c.global ? o.index + o[0].length : n),
        Ef &&
          o &&
          o.length > 1 &&
          af(yf, o[0], r, function () {
            for (i = 1; i < arguments.length - 2; i++)
              arguments[i] === undefined && (o[i] = undefined);
          }),
        o && d)
      )
        for (o.groups = a = df(null), i = 0; i < d.length; i++)
          a[(u = d[i])[0]] = o[u[1]];
      return o;
    });
  var Tf = bf;
  ro({ target: "RegExp", proto: !0, forced: /./.exec !== Tf }, { exec: Tf });
  var If = io,
    kf = Xr,
    Cf = Tf,
    _f = i,
    jf = tt,
    Mf = Yt,
    Lf = jf("species"),
    Rf = RegExp.prototype,
    Nf = function (e, t, r, n) {
      var o = jf(e),
        i = !_f(function () {
          var t = {};
          return (
            (t[o] = function () {
              return 7;
            }),
            7 != ""[e](t)
          );
        }),
        a =
          i &&
          !_f(function () {
            var t = !1,
              r = /a/;
            return (
              "split" === e &&
                (((r = {}).constructor = {}),
                (r.constructor[Lf] = function () {
                  return r;
                }),
                (r.flags = ""),
                (r[o] = /./[o])),
              (r.exec = function () {
                return (t = !0), null;
              }),
              r[o](""),
              !t
            );
          });
      if (!i || !a || r) {
        var u = If(/./[o]),
          c = t(o, ""[e], function (e, t, r, n, o) {
            var a = If(e),
              c = t.exec;
            return c === Cf || c === Rf.exec
              ? i && !o
                ? { done: !0, value: u(t, r, n) }
                : { done: !0, value: a(r, t, n) }
              : { done: !1 };
          });
        kf(String.prototype, e, c[0]), kf(Rf, o, c[1]);
      }
      n && Mf(Rf[o], "sham", !0);
    },
    Df =
      Object.is ||
      function (e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
      },
    Pf = f,
    Ff = Lt,
    Uf = H,
    Bf = T,
    Wf = Tf,
    Hf = TypeError,
    $f = function (e, t) {
      var r = e.exec;
      if (Uf(r)) {
        var n = Pf(r, e, t);
        return null !== n && Ff(n), n;
      }
      if ("RegExp" === Bf(e)) return Pf(Wf, e, t);
      throw Hf("RegExp#exec called on incompatible receiver");
    },
    Vf = f,
    Gf = Lt,
    zf = M,
    Yf = N,
    Jf = Df,
    qf = Ii,
    Kf = Se,
    Xf = $f;
  Nf("search", function (e, t, r) {
    return [
      function (t) {
        var r = Yf(this),
          n = zf(t) ? undefined : Kf(t, e);
        return n ? Vf(n, t, r) : new RegExp(t)[e](qf(r));
      },
      function (e) {
        var n = Gf(this),
          o = qf(e),
          i = r(t, n, o);
        if (i.done) return i.value;
        var a = n.lastIndex;
        Jf(a, 0) || (n.lastIndex = 0);
        var u = Xf(n, o);
        return (
          Jf(n.lastIndex, a) || (n.lastIndex = a), null === u ? -1 : u.index
        );
      },
    ];
  });
  var Zf = _o,
    Qf = Ao
      ? {}.toString
      : function () {
          return "[object " + Zf(this) + "]";
        };
  Ao || Xr(Object.prototype, "toString", Qf, { unsafe: !0 });
  var el = f,
    tl = Be,
    rl = q,
    nl = zs,
    ol = RegExp.prototype,
    il = function (e) {
      var t = e.flags;
      return t !== undefined || "flags" in ol || tl(e, "flags") || !rl(ol, e)
        ? t
        : el(nl, e);
    },
    al = er.PROPER,
    ul = Xr,
    cl = Lt,
    sl = Ii,
    fl = i,
    ll = il,
    dl = "toString",
    hl = RegExp.prototype[dl],
    pl = fl(function () {
      return "/a/b" != hl.call({ source: "a", flags: "b" });
    }),
    vl = al && hl.name != dl;
  (pl || vl) &&
    ul(
      RegExp.prototype,
      dl,
      function () {
        var e = cl(this);
        return "/" + sl(e.source) + "/" + sl(ll(e));
      },
      { unsafe: !0 }
    );
  var yl = a,
    gl = er.EXISTS,
    bl = S,
    ml = pa,
    xl = Function.prototype,
    wl = bl(xl.toString),
    Sl = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,
    Al = bl(Sl.exec);
  yl &&
    !gl &&
    ml(xl, "name", {
      configurable: !0,
      get: function () {
        try {
          return Al(Sl, wl(this))[1];
        } catch (BI) {
          return "";
        }
      },
    });
  var Ol = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView,
    El = Xr,
    Tl = function (e, t, r) {
      for (var n in t) El(e, n, t[n], r);
      return e;
    },
    Il = q,
    kl = TypeError,
    Cl = function (e, t) {
      if (Il(t, e)) return e;
      throw kl("Incorrect invocation");
    },
    _l = nn,
    jl = ln,
    Ml = RangeError,
    Ll = function (e) {
      if (e === undefined) return 0;
      var t = _l(e),
        r = jl(t);
      if (t !== r) throw Ml("Wrong length or index");
      return r;
    },
    Rl = Array,
    Nl = Math.abs,
    Dl = Math.pow,
    Pl = Math.floor,
    Fl = Math.log,
    Ul = Math.LN2,
    Bl = {
      pack: function (e, t, r) {
        var n,
          o,
          i,
          a = Rl(r),
          u = 8 * r - t - 1,
          c = (1 << u) - 1,
          s = c >> 1,
          f = 23 === t ? Dl(2, -24) - Dl(2, -77) : 0,
          l = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0,
          d = 0;
        for (
          (e = Nl(e)) != e || e === Infinity
            ? ((o = e != e ? 1 : 0), (n = c))
            : ((n = Pl(Fl(e) / Ul)),
              e * (i = Dl(2, -n)) < 1 && (n--, (i *= 2)),
              (e += n + s >= 1 ? f / i : f * Dl(2, 1 - s)) * i >= 2 &&
                (n++, (i /= 2)),
              n + s >= c
                ? ((o = 0), (n = c))
                : n + s >= 1
                ? ((o = (e * i - 1) * Dl(2, t)), (n += s))
                : ((o = e * Dl(2, s - 1) * Dl(2, t)), (n = 0)));
          t >= 8;

        )
          (a[d++] = 255 & o), (o /= 256), (t -= 8);
        for (n = (n << t) | o, u += t; u > 0; )
          (a[d++] = 255 & n), (n /= 256), (u -= 8);
        return (a[--d] |= 128 * l), a;
      },
      unpack: function (e, t) {
        var r,
          n = e.length,
          o = 8 * n - t - 1,
          i = (1 << o) - 1,
          a = i >> 1,
          u = o - 7,
          c = n - 1,
          s = e[c--],
          f = 127 & s;
        for (s >>= 7; u > 0; ) (f = 256 * f + e[c--]), (u -= 8);
        for (r = f & ((1 << -u) - 1), f >>= -u, u += t; u > 0; )
          (r = 256 * r + e[c--]), (u -= 8);
        if (0 === f) f = 1 - a;
        else {
          if (f === i) return r ? NaN : s ? -Infinity : Infinity;
          (r += Dl(2, t)), (f -= a);
        }
        return (s ? -1 : 1) * r * Dl(2, f - t);
      },
    },
    Wl = !i(function () {
      function e() {}
      return (
        (e.prototype.constructor = null),
        Object.getPrototypeOf(new e()) !== e.prototype
      );
    }),
    Hl = Be,
    $l = H,
    Vl = Pe,
    Gl = Wl,
    zl = pr("IE_PROTO"),
    Yl = Object,
    Jl = Yl.prototype,
    ql = Gl
      ? Yl.getPrototypeOf
      : function (e) {
          var t = Vl(e);
          if (Hl(t, zl)) return t[zl];
          var r = t.constructor;
          return $l(r) && t instanceof r
            ? r.prototype
            : t instanceof Yl
            ? Jl
            : null;
        },
    Kl = S,
    Xl = me,
    Zl = H,
    Ql = String,
    ed = TypeError,
    td = function (e, t, r) {
      try {
        return Kl(Xl(Object.getOwnPropertyDescriptor(e, t)[r]));
      } catch (BI) {}
    },
    rd = Lt,
    nd = function (e) {
      if ("object" == typeof e || Zl(e)) return e;
      throw ed("Can't set " + Ql(e) + " as a prototype");
    },
    od =
      Object.setPrototypeOf ||
      ("__proto__" in {}
        ? (function () {
            var e,
              t = !1,
              r = {};
            try {
              (e = td(Object.prototype, "__proto__", "set"))(r, []),
                (t = r instanceof Array);
            } catch (BI) {}
            return function (r, n) {
              return rd(r), nd(n), t ? e(r, n) : (r.__proto__ = n), r;
            };
          })()
        : undefined),
    id = Pe,
    ad = cn,
    ud = hn,
    cd = function (e) {
      for (
        var t = id(this),
          r = ud(t),
          n = arguments.length,
          o = ad(n > 1 ? arguments[1] : undefined, r),
          i = n > 2 ? arguments[2] : undefined,
          a = i === undefined ? r : ad(i, r);
        a > o;

      )
        t[o++] = e;
      return t;
    },
    sd = n,
    fd = S,
    ld = a,
    dd = Ol,
    hd = er,
    pd = Yt,
    vd = pa,
    yd = Tl,
    gd = i,
    bd = Cl,
    md = nn,
    xd = ln,
    wd = Ll,
    Sd = Bl,
    Ad = ql,
    Od = od,
    Ed = Zr.f,
    Td = cd,
    Id = aa,
    kd = Ca,
    Cd = Cr,
    _d = hd.PROPER,
    jd = hd.CONFIGURABLE,
    Md = "ArrayBuffer",
    Ld = "DataView",
    Rd = "prototype",
    Nd = "Wrong index",
    Dd = Cd.getterFor(Md),
    Pd = Cd.getterFor(Ld),
    Fd = Cd.set,
    Ud = sd[Md],
    Bd = Ud,
    Wd = Bd && Bd[Rd],
    Hd = sd[Ld],
    $d = Hd && Hd[Rd],
    Vd = Object.prototype,
    Gd = sd.Array,
    zd = sd.RangeError,
    Yd = fd(Td),
    Jd = fd([].reverse),
    qd = Sd.pack,
    Kd = Sd.unpack,
    Xd = function (e) {
      return [255 & e];
    },
    Zd = function (e) {
      return [255 & e, (e >> 8) & 255];
    },
    Qd = function (e) {
      return [255 & e, (e >> 8) & 255, (e >> 16) & 255, (e >> 24) & 255];
    },
    eh = function (e) {
      return (e[3] << 24) | (e[2] << 16) | (e[1] << 8) | e[0];
    },
    th = function (e) {
      return qd(e, 23, 4);
    },
    rh = function (e) {
      return qd(e, 52, 8);
    },
    nh = function (e, t, r) {
      vd(e[Rd], t, {
        configurable: !0,
        get: function () {
          return r(this)[t];
        },
      });
    },
    oh = function (e, t, r, n) {
      var o = wd(r),
        i = Pd(e);
      if (o + t > i.byteLength) throw zd(Nd);
      var a = i.bytes,
        u = o + i.byteOffset,
        c = Id(a, u, u + t);
      return n ? c : Jd(c);
    },
    ih = function (e, t, r, n, o, i) {
      var a = wd(r),
        u = Pd(e);
      if (a + t > u.byteLength) throw zd(Nd);
      for (var c = u.bytes, s = a + u.byteOffset, f = n(+o), l = 0; l < t; l++)
        c[s + l] = f[i ? l : t - l - 1];
    };
  if (dd) {
    var ah = _d && Ud.name !== Md;
    if (
      gd(function () {
        Ud(1);
      }) &&
      gd(function () {
        new Ud(-1);
      }) &&
      !gd(function () {
        return (
          new Ud(), new Ud(1.5), new Ud(NaN), 1 != Ud.length || (ah && !jd)
        );
      })
    )
      ah && jd && pd(Ud, "name", Md);
    else {
      (Bd = function (e) {
        return bd(this, Wd), new Ud(wd(e));
      })[Rd] = Wd;
      for (var uh, ch = Ed(Ud), sh = 0; ch.length > sh; )
        (uh = ch[sh++]) in Bd || pd(Bd, uh, Ud[uh]);
      Wd.constructor = Bd;
    }
    Od && Ad($d) !== Vd && Od($d, Vd);
    var fh = new Hd(new Bd(2)),
      lh = fd($d.setInt8);
    fh.setInt8(0, 2147483648),
      fh.setInt8(1, 2147483649),
      (!fh.getInt8(0) && fh.getInt8(1)) ||
        yd(
          $d,
          {
            setInt8: function (e, t) {
              lh(this, e, (t << 24) >> 24);
            },
            setUint8: function (e, t) {
              lh(this, e, (t << 24) >> 24);
            },
          },
          { unsafe: !0 }
        );
  } else
    (Wd = (Bd = function (e) {
      bd(this, Wd);
      var t = wd(e);
      Fd(this, { type: Md, bytes: Yd(Gd(t), 0), byteLength: t }),
        ld || ((this.byteLength = t), (this.detached = !1));
    })[Rd]),
      ($d = (Hd = function (e, t, r) {
        bd(this, $d), bd(e, Wd);
        var n = Dd(e),
          o = n.byteLength,
          i = md(t);
        if (i < 0 || i > o) throw zd("Wrong offset");
        if (i + (r = r === undefined ? o - i : xd(r)) > o)
          throw zd("Wrong length");
        Fd(this, {
          type: Ld,
          buffer: e,
          byteLength: r,
          byteOffset: i,
          bytes: n.bytes,
        }),
          ld ||
            ((this.buffer = e), (this.byteLength = r), (this.byteOffset = i));
      })[Rd]),
      ld &&
        (nh(Bd, "byteLength", Dd),
        nh(Hd, "buffer", Pd),
        nh(Hd, "byteLength", Pd),
        nh(Hd, "byteOffset", Pd)),
      yd($d, {
        getInt8: function (e) {
          return (oh(this, 1, e)[0] << 24) >> 24;
        },
        getUint8: function (e) {
          return oh(this, 1, e)[0];
        },
        getInt16: function (e) {
          var t = oh(
            this,
            2,
            e,
            arguments.length > 1 ? arguments[1] : undefined
          );
          return (((t[1] << 8) | t[0]) << 16) >> 16;
        },
        getUint16: function (e) {
          var t = oh(
            this,
            2,
            e,
            arguments.length > 1 ? arguments[1] : undefined
          );
          return (t[1] << 8) | t[0];
        },
        getInt32: function (e) {
          return eh(
            oh(this, 4, e, arguments.length > 1 ? arguments[1] : undefined)
          );
        },
        getUint32: function (e) {
          return (
            eh(
              oh(this, 4, e, arguments.length > 1 ? arguments[1] : undefined)
            ) >>> 0
          );
        },
        getFloat32: function (e) {
          return Kd(
            oh(this, 4, e, arguments.length > 1 ? arguments[1] : undefined),
            23
          );
        },
        getFloat64: function (e) {
          return Kd(
            oh(this, 8, e, arguments.length > 1 ? arguments[1] : undefined),
            52
          );
        },
        setInt8: function (e, t) {
          ih(this, 1, e, Xd, t);
        },
        setUint8: function (e, t) {
          ih(this, 1, e, Xd, t);
        },
        setInt16: function (e, t) {
          ih(
            this,
            2,
            e,
            Zd,
            t,
            arguments.length > 2 ? arguments[2] : undefined
          );
        },
        setUint16: function (e, t) {
          ih(
            this,
            2,
            e,
            Zd,
            t,
            arguments.length > 2 ? arguments[2] : undefined
          );
        },
        setInt32: function (e, t) {
          ih(
            this,
            4,
            e,
            Qd,
            t,
            arguments.length > 2 ? arguments[2] : undefined
          );
        },
        setUint32: function (e, t) {
          ih(
            this,
            4,
            e,
            Qd,
            t,
            arguments.length > 2 ? arguments[2] : undefined
          );
        },
        setFloat32: function (e, t) {
          ih(
            this,
            4,
            e,
            th,
            t,
            arguments.length > 2 ? arguments[2] : undefined
          );
        },
        setFloat64: function (e, t) {
          ih(
            this,
            8,
            e,
            rh,
            t,
            arguments.length > 2 ? arguments[2] : undefined
          );
        },
      });
  kd(Bd, Md), kd(Hd, Ld);
  var dh = { ArrayBuffer: Bd, DataView: Hd },
    hh = J,
    ph = pa,
    vh = a,
    yh = tt("species"),
    gh = function (e) {
      var t = hh(e);
      vh &&
        t &&
        !t[yh] &&
        ph(t, yh, {
          configurable: !0,
          get: function () {
            return this;
          },
        });
    },
    bh = gh,
    mh = "ArrayBuffer",
    xh = dh[mh];
  ro(
    { global: !0, constructor: !0, forced: n[mh] !== xh },
    { ArrayBuffer: xh }
  ),
    bh(mh);
  var wh = Vo,
    Sh = ve,
    Ah = TypeError,
    Oh = function (e) {
      if (wh(e)) return e;
      throw Ah(Sh(e) + " is not a constructor");
    },
    Eh = Lt,
    Th = Oh,
    Ih = M,
    kh = tt("species"),
    Ch = function (e, t) {
      var r,
        n = Eh(e).constructor;
      return n === undefined || Ih((r = Eh(n)[kh])) ? t : Th(r);
    },
    _h = ro,
    jh = io,
    Mh = i,
    Lh = Lt,
    Rh = cn,
    Nh = ln,
    Dh = Ch,
    Ph = dh.ArrayBuffer,
    Fh = dh.DataView,
    Uh = Fh.prototype,
    Bh = jh(Ph.prototype.slice),
    Wh = jh(Uh.getUint8),
    Hh = jh(Uh.setUint8);
  _h(
    {
      target: "ArrayBuffer",
      proto: !0,
      unsafe: !0,
      forced: Mh(function () {
        return !new Ph(2).slice(1, undefined).byteLength;
      }),
    },
    {
      slice: function (e, t) {
        if (Bh && t === undefined) return Bh(Lh(this), e);
        for (
          var r = Lh(this).byteLength,
            n = Rh(e, r),
            o = Rh(t === undefined ? r : t, r),
            i = new (Dh(this, Ph))(Nh(o - n)),
            a = new Fh(this),
            u = new Fh(i),
            c = 0;
          n < o;

        )
          Hh(u, c++, Wh(a, n++));
        return i;
      },
    }
  );
  var $h = tt,
    Vh = Qi,
    Gh = kt.f,
    zh = $h("unscopables"),
    Yh = Array.prototype;
  Yh[zh] == undefined && Gh(Yh, zh, { configurable: !0, value: Vh(null) });
  var Jh,
    qh,
    Kh,
    Xh = function (e) {
      Yh[zh][e] = !0;
    },
    Zh = i,
    Qh = H,
    ep = G,
    tp = ql,
    rp = Xr,
    np = tt("iterator"),
    op = !1;
  [].keys &&
    ("next" in (Kh = [].keys())
      ? (qh = tp(tp(Kh))) !== Object.prototype && (Jh = qh)
      : (op = !0));
  var ip =
    !ep(Jh) ||
    Zh(function () {
      var e = {};
      return Jh[np].call(e) !== e;
    });
  ip && (Jh = {}),
    Qh(Jh[np]) ||
      rp(Jh, np, function () {
        return this;
      });
  var ap = { IteratorPrototype: Jh, BUGGY_SAFARI_ITERATORS: op },
    up = ap.IteratorPrototype,
    cp = Qi,
    sp = g,
    fp = Ca,
    lp = go,
    dp = function () {
      return this;
    },
    hp = ro,
    pp = f,
    vp = H,
    yp = function (e, t, r, n) {
      var o = t + " Iterator";
      return (
        (e.prototype = cp(up, { next: sp(+!n, r) })),
        fp(e, o, !1),
        (lp[o] = dp),
        e
      );
    },
    gp = ql,
    bp = od,
    mp = Ca,
    xp = Yt,
    wp = Xr,
    Sp = go,
    Ap = er.PROPER,
    Op = er.CONFIGURABLE,
    Ep = ap.IteratorPrototype,
    Tp = ap.BUGGY_SAFARI_ITERATORS,
    Ip = tt("iterator"),
    kp = "keys",
    Cp = "values",
    _p = "entries",
    jp = function () {
      return this;
    },
    Mp = function (e, t, r, n, o, i, a) {
      yp(r, t, n);
      var u,
        c,
        s,
        f = function (e) {
          if (e === o && v) return v;
          if (!Tp && e in h) return h[e];
          switch (e) {
            case kp:
            case Cp:
            case _p:
              return function () {
                return new r(this, e);
              };
          }
          return function () {
            return new r(this);
          };
        },
        l = t + " Iterator",
        d = !1,
        h = e.prototype,
        p = h[Ip] || h["@@iterator"] || (o && h[o]),
        v = (!Tp && p) || f(o),
        y = ("Array" == t && h.entries) || p;
      if (
        (y &&
          (u = gp(y.call(new e()))) !== Object.prototype &&
          u.next &&
          (gp(u) !== Ep && (bp ? bp(u, Ep) : vp(u[Ip]) || wp(u, Ip, jp)),
          mp(u, l, !0)),
        Ap &&
          o == Cp &&
          p &&
          p.name !== Cp &&
          (Op
            ? xp(h, "name", Cp)
            : ((d = !0),
              (v = function () {
                return pp(p, this);
              }))),
        o)
      )
        if (((c = { values: f(Cp), keys: i ? v : f(kp), entries: f(_p) }), a))
          for (s in c) (Tp || d || !(s in h)) && wp(h, s, c[s]);
        else hp({ target: t, proto: !0, forced: Tp || d }, c);
      return h[Ip] !== v && wp(h, Ip, v, { name: o }), (Sp[t] = v), c;
    },
    Lp = function (e, t) {
      return { value: e, done: t };
    },
    Rp = F,
    Np = Xh,
    Dp = go,
    Pp = Cr,
    Fp = kt.f,
    Up = Mp,
    Bp = Lp,
    Wp = a,
    Hp = "Array Iterator",
    $p = Pp.set,
    Vp = Pp.getterFor(Hp),
    Gp = Up(
      Array,
      "Array",
      function (e, t) {
        $p(this, { type: Hp, target: Rp(e), index: 0, kind: t });
      },
      function () {
        var e = Vp(this),
          t = e.target,
          r = e.kind,
          n = e.index++;
        return !t || n >= t.length
          ? ((e.target = undefined), Bp(undefined, !0))
          : Bp("keys" == r ? n : "values" == r ? t[n] : [n, t[n]], !1);
      },
      "values"
    ),
    zp = (Dp.Arguments = Dp.Array);
  if ((Np("keys"), Np("values"), Np("entries"), Wp && "values" !== zp.name))
    try {
      Fp(zp, "name", { value: "values" });
    } catch (BI) {}
  var Yp,
    Jp,
    qp,
    Kp = { exports: {} },
    Xp = Ol,
    Zp = a,
    Qp = n,
    ev = H,
    tv = G,
    rv = Be,
    nv = _o,
    ov = ve,
    iv = Yt,
    av = Xr,
    uv = pa,
    cv = q,
    sv = ql,
    fv = od,
    lv = tt,
    dv = Ge,
    hv = Cr.enforce,
    pv = Cr.get,
    vv = Qp.Int8Array,
    yv = vv && vv.prototype,
    gv = Qp.Uint8ClampedArray,
    bv = gv && gv.prototype,
    mv = vv && sv(vv),
    xv = yv && sv(yv),
    wv = Object.prototype,
    Sv = Qp.TypeError,
    Av = lv("toStringTag"),
    Ov = dv("TYPED_ARRAY_TAG"),
    Ev = "TypedArrayConstructor",
    Tv = Xp && !!fv && "Opera" !== nv(Qp.opera),
    Iv = !1,
    kv = {
      Int8Array: 1,
      Uint8Array: 1,
      Uint8ClampedArray: 1,
      Int16Array: 2,
      Uint16Array: 2,
      Int32Array: 4,
      Uint32Array: 4,
      Float32Array: 4,
      Float64Array: 8,
    },
    Cv = { BigInt64Array: 8, BigUint64Array: 8 },
    _v = function (e) {
      var t = sv(e);
      if (tv(t)) {
        var r = pv(t);
        return r && rv(r, Ev) ? r[Ev] : _v(t);
      }
    },
    jv = function (e) {
      if (!tv(e)) return !1;
      var t = nv(e);
      return rv(kv, t) || rv(Cv, t);
    };
  for (Yp in kv)
    (qp = (Jp = Qp[Yp]) && Jp.prototype) ? (hv(qp)[Ev] = Jp) : (Tv = !1);
  for (Yp in Cv) (qp = (Jp = Qp[Yp]) && Jp.prototype) && (hv(qp)[Ev] = Jp);
  if (
    (!Tv || !ev(mv) || mv === Function.prototype) &&
    ((mv = function () {
      throw Sv("Incorrect invocation");
    }),
    Tv)
  )
    for (Yp in kv) Qp[Yp] && fv(Qp[Yp], mv);
  if ((!Tv || !xv || xv === wv) && ((xv = mv.prototype), Tv))
    for (Yp in kv) Qp[Yp] && fv(Qp[Yp].prototype, xv);
  if ((Tv && sv(bv) !== xv && fv(bv, xv), Zp && !rv(xv, Av)))
    for (Yp in ((Iv = !0),
    uv(xv, Av, {
      configurable: !0,
      get: function () {
        return tv(this) ? this[Ov] : undefined;
      },
    }),
    kv))
      Qp[Yp] && iv(Qp[Yp], Ov, Yp);
  var Mv = {
      NATIVE_ARRAY_BUFFER_VIEWS: Tv,
      TYPED_ARRAY_TAG: Iv && Ov,
      aTypedArray: function (e) {
        if (jv(e)) return e;
        throw Sv("Target is not a typed array");
      },
      aTypedArrayConstructor: function (e) {
        if (ev(e) && (!fv || cv(mv, e))) return e;
        throw Sv(ov(e) + " is not a typed array constructor");
      },
      exportTypedArrayMethod: function (e, t, r, n) {
        if (Zp) {
          if (r)
            for (var o in kv) {
              var i = Qp[o];
              if (i && rv(i.prototype, e))
                try {
                  delete i.prototype[e];
                } catch (BI) {
                  try {
                    i.prototype[e] = t;
                  } catch (a) {}
                }
            }
          (xv[e] && !r) || av(xv, e, r ? t : (Tv && yv[e]) || t, n);
        }
      },
      exportTypedArrayStaticMethod: function (e, t, r) {
        var n, o;
        if (Zp) {
          if (fv) {
            if (r)
              for (n in kv)
                if ((o = Qp[n]) && rv(o, e))
                  try {
                    delete o[e];
                  } catch (BI) {}
            if (mv[e] && !r) return;
            try {
              return av(mv, e, r ? t : (Tv && mv[e]) || t);
            } catch (BI) {}
          }
          for (n in kv) !(o = Qp[n]) || (o[e] && !r) || av(o, e, t);
        }
      },
      getTypedArrayConstructor: _v,
      isView: function (e) {
        if (!tv(e)) return !1;
        var t = nv(e);
        return "DataView" === t || rv(kv, t) || rv(Cv, t);
      },
      isTypedArray: jv,
      TypedArray: mv,
      TypedArrayPrototype: xv,
    },
    Lv = n,
    Rv = i,
    Nv = Ai,
    Dv = Mv.NATIVE_ARRAY_BUFFER_VIEWS,
    Pv = Lv.ArrayBuffer,
    Fv = Lv.Int8Array,
    Uv =
      !Dv ||
      !Rv(function () {
        Fv(1);
      }) ||
      !Rv(function () {
        new Fv(-1);
      }) ||
      !Nv(function (e) {
        new Fv(), new Fv(null), new Fv(1.5), new Fv(e);
      }, !0) ||
      Rv(function () {
        return 1 !== new Fv(new Pv(2), 1, undefined).length;
      }),
    Bv = G,
    Wv = Math.floor,
    Hv =
      Number.isInteger ||
      function (e) {
        return !Bv(e) && isFinite(e) && Wv(e) === e;
      },
    $v = nn,
    Vv = RangeError,
    Gv = function (e) {
      var t = $v(e);
      if (t < 0) throw Vv("The argument can't be less than 0");
      return t;
    },
    zv = RangeError,
    Yv = function (e, t) {
      var r = Gv(e);
      if (r % t) throw zv("Wrong offset");
      return r;
    },
    Jv = _o,
    qv = st,
    Kv = TypeError,
    Xv = function (e) {
      var t = qv(e, "number");
      if ("number" == typeof t) throw Kv("Can't convert number to bigint");
      return BigInt(t);
    },
    Zv = so,
    Qv = f,
    ey = Oh,
    ty = Pe,
    ry = hn,
    ny = ui,
    oy = ei,
    iy = wo,
    ay = function (e) {
      var t = Jv(e);
      return "BigInt64Array" == t || "BigUint64Array" == t;
    },
    uy = Mv.aTypedArrayConstructor,
    cy = Xv,
    sy = H,
    fy = G,
    ly = od,
    dy = function (e, t, r) {
      var n, o;
      return (
        ly &&
          sy((n = t.constructor)) &&
          n !== r &&
          fy((o = n.prototype)) &&
          o !== r.prototype &&
          ly(e, o),
        e
      );
    },
    hy = ro,
    py = n,
    vy = f,
    yy = a,
    gy = Uv,
    by = Mv,
    my = dh,
    xy = Cl,
    wy = g,
    Sy = Yt,
    Ay = Hv,
    Oy = ln,
    Ey = Ll,
    Ty = Yv,
    Iy = dt,
    ky = Be,
    Cy = _o,
    _y = G,
    jy = he,
    My = Qi,
    Ly = q,
    Ry = od,
    Ny = Zr.f,
    Dy = function (e) {
      var t,
        r,
        n,
        o,
        i,
        a,
        u,
        c,
        s = ey(this),
        f = ty(e),
        l = arguments.length,
        d = l > 1 ? arguments[1] : undefined,
        h = d !== undefined,
        p = oy(f);
      if (p && !iy(p))
        for (c = (u = ny(f, p)).next, f = []; !(a = Qv(c, u)).done; )
          f.push(a.value);
      for (
        h && l > 2 && (d = Zv(d, arguments[2])),
          r = ry(f),
          n = new (uy(s))(r),
          o = ay(n),
          t = 0;
        r > t;
        t++
      )
        (i = h ? d(f[t], t) : f[t]), (n[t] = o ? cy(i) : +i);
      return n;
    },
    Py = za.forEach,
    Fy = gh,
    Uy = pa,
    By = kt,
    Wy = o,
    Hy = dy,
    $y = Cr.get,
    Vy = Cr.set,
    Gy = Cr.enforce,
    zy = By.f,
    Yy = Wy.f,
    Jy = Math.round,
    qy = py.RangeError,
    Ky = my.ArrayBuffer,
    Xy = Ky.prototype,
    Zy = my.DataView,
    Qy = by.NATIVE_ARRAY_BUFFER_VIEWS,
    eg = by.TYPED_ARRAY_TAG,
    tg = by.TypedArray,
    rg = by.TypedArrayPrototype,
    ng = by.aTypedArrayConstructor,
    og = by.isTypedArray,
    ig = "BYTES_PER_ELEMENT",
    ag = "Wrong length",
    ug = function (e, t) {
      ng(e);
      for (var r = 0, n = t.length, o = new e(n); n > r; ) o[r] = t[r++];
      return o;
    },
    cg = function (e, t) {
      Uy(e, t, {
        configurable: !0,
        get: function () {
          return $y(this)[t];
        },
      });
    },
    sg = function (e) {
      var t;
      return (
        Ly(Xy, e) || "ArrayBuffer" == (t = Cy(e)) || "SharedArrayBuffer" == t
      );
    },
    fg = function (e, t) {
      return og(e) && !jy(t) && t in e && Ay(+t) && t >= 0;
    },
    lg = function (e, t) {
      return (t = Iy(t)), fg(e, t) ? wy(2, e[t]) : Yy(e, t);
    },
    dg = function (e, t, r) {
      return (
        (t = Iy(t)),
        !(fg(e, t) && _y(r) && ky(r, "value")) ||
        ky(r, "get") ||
        ky(r, "set") ||
        r.configurable ||
        (ky(r, "writable") && !r.writable) ||
        (ky(r, "enumerable") && !r.enumerable)
          ? zy(e, t, r)
          : ((e[t] = r.value), e)
      );
    };
  yy
    ? (Qy ||
        ((Wy.f = lg),
        (By.f = dg),
        cg(rg, "buffer"),
        cg(rg, "byteOffset"),
        cg(rg, "byteLength"),
        cg(rg, "length")),
      hy(
        { target: "Object", stat: !0, forced: !Qy },
        { getOwnPropertyDescriptor: lg, defineProperty: dg }
      ),
      (Kp.exports = function (e, t, r) {
        var n = e.match(/\d+/)[0] / 8,
          o = e + (r ? "Clamped" : "") + "Array",
          i = "get" + e,
          a = "set" + e,
          u = py[o],
          c = u,
          s = c && c.prototype,
          f = {},
          l = function (e, t) {
            zy(e, t, {
              get: function () {
                return (function (e, t) {
                  var r = $y(e);
                  return r.view[i](t * n + r.byteOffset, !0);
                })(this, t);
              },
              set: function (e) {
                return (function (e, t, o) {
                  var i = $y(e);
                  r && (o = (o = Jy(o)) < 0 ? 0 : o > 255 ? 255 : 255 & o),
                    i.view[a](t * n + i.byteOffset, o, !0);
                })(this, t, e);
              },
              enumerable: !0,
            });
          };
        Qy
          ? gy &&
            ((c = t(function (e, t, r, o) {
              return (
                xy(e, s),
                Hy(
                  _y(t)
                    ? sg(t)
                      ? o !== undefined
                        ? new u(t, Ty(r, n), o)
                        : r !== undefined
                        ? new u(t, Ty(r, n))
                        : new u(t)
                      : og(t)
                      ? ug(c, t)
                      : vy(Dy, c, t)
                    : new u(Ey(t)),
                  e,
                  c
                )
              );
            })),
            Ry && Ry(c, tg),
            Py(Ny(u), function (e) {
              e in c || Sy(c, e, u[e]);
            }),
            (c.prototype = s))
          : ((c = t(function (e, t, r, o) {
              xy(e, s);
              var i,
                a,
                u,
                f = 0,
                d = 0;
              if (_y(t)) {
                if (!sg(t)) return og(t) ? ug(c, t) : vy(Dy, c, t);
                (i = t), (d = Ty(r, n));
                var h = t.byteLength;
                if (o === undefined) {
                  if (h % n) throw qy(ag);
                  if ((a = h - d) < 0) throw qy(ag);
                } else if ((a = Oy(o) * n) + d > h) throw qy(ag);
                u = a / n;
              } else (u = Ey(t)), (i = new Ky((a = u * n)));
              for (
                Vy(e, {
                  buffer: i,
                  byteOffset: d,
                  byteLength: a,
                  length: u,
                  view: new Zy(i),
                });
                f < u;

              )
                l(e, f++);
            })),
            Ry && Ry(c, tg),
            (s = c.prototype = My(rg))),
          s.constructor !== c && Sy(s, "constructor", c),
          (Gy(s).TypedArrayConstructor = c),
          eg && Sy(s, eg, o);
        var d = c != u;
        (f[o] = c),
          hy({ global: !0, constructor: !0, forced: d, sham: !Qy }, f),
          ig in c || Sy(c, ig, n),
          ig in s || Sy(s, ig, n),
          Fy(o);
      }))
    : (Kp.exports = function () {}),
    (0, Kp.exports)("Uint8", function (e) {
      return function (t, r, n) {
        return e(this, t, r, n);
      };
    });
  var hg = ve,
    pg = TypeError,
    vg = Pe,
    yg = cn,
    gg = hn,
    bg = function (e, t) {
      if (!delete e[t])
        throw pg("Cannot delete property " + hg(t) + " of " + hg(e));
    },
    mg = Math.min,
    xg =
      [].copyWithin ||
      function (e, t) {
        var r = vg(this),
          n = gg(r),
          o = yg(e, n),
          i = yg(t, n),
          a = arguments.length > 2 ? arguments[2] : undefined,
          u = mg((a === undefined ? n : yg(a, n)) - i, n - o),
          c = 1;
        for (
          i < o && o < i + u && ((c = -1), (i += u - 1), (o += u - 1));
          u-- > 0;

        )
          i in r ? (r[o] = r[i]) : bg(r, o), (o += c), (i += c);
        return r;
      },
    wg = Mv,
    Sg = S(xg),
    Ag = wg.aTypedArray;
  (0, wg.exportTypedArrayMethod)("copyWithin", function (e, t) {
    return Sg(Ag(this), e, t, arguments.length > 2 ? arguments[2] : undefined);
  });
  var Og = za.every,
    Eg = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("every", function (e) {
    return Og(Eg(this), e, arguments.length > 1 ? arguments[1] : undefined);
  });
  var Tg = cd,
    Ig = Xv,
    kg = _o,
    Cg = f,
    _g = i,
    jg = Mv.aTypedArray,
    Mg = Mv.exportTypedArrayMethod,
    Lg = S("".slice);
  Mg(
    "fill",
    function (e) {
      var t = arguments.length;
      jg(this);
      var r = "Big" === Lg(kg(this), 0, 3) ? Ig(e) : +e;
      return Cg(
        Tg,
        this,
        r,
        t > 1 ? arguments[1] : undefined,
        t > 2 ? arguments[2] : undefined
      );
    },
    _g(function () {
      var e = 0;
      return (
        new Int8Array(2).fill({
          valueOf: function () {
            return e++;
          },
        }),
        1 !== e
      );
    })
  );
  var Rg = hn,
    Ng = Ch,
    Dg = Mv.aTypedArrayConstructor,
    Pg = Mv.getTypedArrayConstructor,
    Fg = function (e) {
      return Dg(Ng(e, Pg(e)));
    },
    Ug = function (e, t) {
      for (var r = 0, n = Rg(t), o = new e(n); n > r; ) o[r] = t[r++];
      return o;
    },
    Bg = Fg,
    Wg = za.filter,
    Hg = function (e, t) {
      return Ug(Bg(e), t);
    },
    $g = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("filter", function (e) {
    var t = Wg($g(this), e, arguments.length > 1 ? arguments[1] : undefined);
    return Hg(this, t);
  });
  var Vg = za.find,
    Gg = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("find", function (e) {
    return Vg(Gg(this), e, arguments.length > 1 ? arguments[1] : undefined);
  });
  var zg = za.findIndex,
    Yg = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("findIndex", function (e) {
    return zg(Yg(this), e, arguments.length > 1 ? arguments[1] : undefined);
  });
  var Jg = za.forEach,
    qg = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("forEach", function (e) {
    Jg(qg(this), e, arguments.length > 1 ? arguments[1] : undefined);
  });
  var Kg = bn.includes,
    Xg = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("includes", function (e) {
    return Kg(Xg(this), e, arguments.length > 1 ? arguments[1] : undefined);
  });
  var Zg = bn.indexOf,
    Qg = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("indexOf", function (e) {
    return Zg(Qg(this), e, arguments.length > 1 ? arguments[1] : undefined);
  });
  var eb = n,
    tb = i,
    rb = S,
    nb = Mv,
    ob = Gp,
    ib = tt("iterator"),
    ab = eb.Uint8Array,
    ub = rb(ob.values),
    cb = rb(ob.keys),
    sb = rb(ob.entries),
    fb = nb.aTypedArray,
    lb = nb.exportTypedArrayMethod,
    db = ab && ab.prototype,
    hb = !tb(function () {
      db[ib].call([1]);
    }),
    pb =
      !!db && db.values && db[ib] === db.values && "values" === db.values.name,
    vb = function () {
      return ub(fb(this));
    };
  lb(
    "entries",
    function () {
      return sb(fb(this));
    },
    hb
  ),
    lb(
      "keys",
      function () {
        return cb(fb(this));
      },
      hb
    ),
    lb("values", vb, hb || !pb, { name: "values" }),
    lb(ib, vb, hb || !pb, { name: "values" });
  var yb = Mv.aTypedArray,
    gb = Mv.exportTypedArrayMethod,
    bb = S([].join);
  gb("join", function (e) {
    return bb(yb(this), e);
  });
  var mb = i,
    xb = function (e, t) {
      var r = [][e];
      return (
        !!r &&
        mb(function () {
          r.call(
            null,
            t ||
              function () {
                return 1;
              },
            1
          );
        })
      );
    },
    wb = xc,
    Sb = F,
    Ab = nn,
    Ob = hn,
    Eb = xb,
    Tb = Math.min,
    Ib = [].lastIndexOf,
    kb = !!Ib && 1 / [1].lastIndexOf(1, -0) < 0,
    Cb = Eb("lastIndexOf"),
    _b =
      kb || !Cb
        ? function (e) {
            if (kb) return wb(Ib, this, arguments) || 0;
            var t = Sb(this),
              r = Ob(t),
              n = r - 1;
            for (
              arguments.length > 1 && (n = Tb(n, Ab(arguments[1]))),
                n < 0 && (n = r + n);
              n >= 0;
              n--
            )
              if (n in t && t[n] === e) return n || 0;
            return -1;
          }
        : Ib,
    jb = xc,
    Mb = _b,
    Lb = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("lastIndexOf", function (e) {
    var t = arguments.length;
    return jb(Mb, Lb(this), t > 1 ? [e, arguments[1]] : [e]);
  });
  var Rb = za.map,
    Nb = Fg,
    Db = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("map", function (e) {
    return Rb(
      Db(this),
      e,
      arguments.length > 1 ? arguments[1] : undefined,
      function (e, t) {
        return new (Nb(e))(t);
      }
    );
  });
  var Pb = me,
    Fb = Pe,
    Ub = j,
    Bb = hn,
    Wb = TypeError,
    Hb = function (e) {
      return function (t, r, n, o) {
        Pb(r);
        var i = Fb(t),
          a = Ub(i),
          u = Bb(i),
          c = e ? u - 1 : 0,
          s = e ? -1 : 1;
        if (n < 2)
          for (;;) {
            if (c in a) {
              (o = a[c]), (c += s);
              break;
            }
            if (((c += s), e ? c < 0 : u <= c))
              throw Wb("Reduce of empty array with no initial value");
          }
        for (; e ? c >= 0 : u > c; c += s) c in a && (o = r(o, a[c], c, i));
        return o;
      };
    },
    $b = { left: Hb(!1), right: Hb(!0) },
    Vb = $b.left,
    Gb = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("reduce", function (e) {
    var t = arguments.length;
    return Vb(Gb(this), e, t, t > 1 ? arguments[1] : undefined);
  });
  var zb = $b.right,
    Yb = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("reduceRight", function (e) {
    var t = arguments.length;
    return zb(Yb(this), e, t, t > 1 ? arguments[1] : undefined);
  });
  var Jb = Mv.aTypedArray,
    qb = Mv.exportTypedArrayMethod,
    Kb = Math.floor;
  qb("reverse", function () {
    for (var e, t = this, r = Jb(t).length, n = Kb(r / 2), o = 0; o < n; )
      (e = t[o]), (t[o++] = t[--r]), (t[r] = e);
    return t;
  });
  var Xb = n,
    Zb = f,
    Qb = Mv,
    em = hn,
    tm = Yv,
    rm = Pe,
    nm = i,
    om = Xb.RangeError,
    im = Xb.Int8Array,
    am = im && im.prototype,
    um = am && am.set,
    cm = Qb.aTypedArray,
    sm = Qb.exportTypedArrayMethod,
    fm = !nm(function () {
      var e = new Uint8ClampedArray(2);
      return Zb(um, e, { length: 1, 0: 3 }, 1), 3 !== e[1];
    }),
    lm =
      fm &&
      Qb.NATIVE_ARRAY_BUFFER_VIEWS &&
      nm(function () {
        var e = new im(2);
        return e.set(1), e.set("2", 1), 0 !== e[0] || 2 !== e[1];
      });
  sm(
    "set",
    function (e) {
      cm(this);
      var t = tm(arguments.length > 1 ? arguments[1] : undefined, 1),
        r = rm(e);
      if (fm) return Zb(um, this, r, t);
      var n = this.length,
        o = em(r),
        i = 0;
      if (o + t > n) throw om("Wrong length");
      for (; i < o; ) this[t + i] = r[i++];
    },
    !fm || lm
  );
  var dm = Fg,
    hm = wc,
    pm = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)(
    "slice",
    function (e, t) {
      for (
        var r = hm(pm(this), e, t),
          n = dm(this),
          o = 0,
          i = r.length,
          a = new n(i);
        i > o;

      )
        a[o] = r[o++];
      return a;
    },
    i(function () {
      new Int8Array(1).slice();
    })
  );
  var vm = za.some,
    ym = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("some", function (e) {
    return vm(ym(this), e, arguments.length > 1 ? arguments[1] : undefined);
  });
  var gm = aa,
    bm = Math.floor,
    mm = function (e, t) {
      var r = e.length,
        n = bm(r / 2);
      return r < 8 ? xm(e, t) : wm(e, mm(gm(e, 0, n), t), mm(gm(e, n), t), t);
    },
    xm = function (e, t) {
      for (var r, n, o = e.length, i = 1; i < o; ) {
        for (n = i, r = e[i]; n && t(e[n - 1], r) > 0; ) e[n] = e[--n];
        n !== i++ && (e[n] = r);
      }
      return e;
    },
    wm = function (e, t, r, n) {
      for (var o = t.length, i = r.length, a = 0, u = 0; a < o || u < i; )
        e[a + u] =
          a < o && u < i
            ? n(t[a], r[u]) <= 0
              ? t[a++]
              : r[u++]
            : a < o
            ? t[a++]
            : r[u++];
      return e;
    },
    Sm = mm,
    Am = K.match(/firefox\/(\d+)/i),
    Om = !!Am && +Am[1],
    Em = /MSIE|Trident/.test(K),
    Tm = K.match(/AppleWebKit\/(\d+)\./),
    Im = !!Tm && +Tm[1],
    km = io,
    Cm = i,
    _m = me,
    jm = Sm,
    Mm = Om,
    Lm = Em,
    Rm = ne,
    Nm = Im,
    Dm = Mv.aTypedArray,
    Pm = Mv.exportTypedArrayMethod,
    Fm = n.Uint16Array,
    Um = Fm && km(Fm.prototype.sort),
    Bm = !(
      !Um ||
      (Cm(function () {
        Um(new Fm(2), null);
      }) &&
        Cm(function () {
          Um(new Fm(2), {});
        }))
    ),
    Wm =
      !!Um &&
      !Cm(function () {
        if (Rm) return Rm < 74;
        if (Mm) return Mm < 67;
        if (Lm) return !0;
        if (Nm) return Nm < 602;
        var e,
          t,
          r = new Fm(516),
          n = Array(516);
        for (e = 0; e < 516; e++)
          (t = e % 4), (r[e] = 515 - e), (n[e] = e - 2 * t + 3);
        for (
          Um(r, function (e, t) {
            return ((e / 4) | 0) - ((t / 4) | 0);
          }),
            e = 0;
          e < 516;
          e++
        )
          if (r[e] !== n[e]) return !0;
      });
  Pm(
    "sort",
    function (e) {
      return (
        e !== undefined && _m(e),
        Wm
          ? Um(this, e)
          : jm(
              Dm(this),
              (function (e) {
                return function (t, r) {
                  return e !== undefined
                    ? +e(t, r) || 0
                    : r != r
                    ? -1
                    : t != t
                    ? 1
                    : 0 === t && 0 === r
                    ? 1 / t > 0 && 1 / r < 0
                      ? 1
                      : -1
                    : t > r;
                };
              })(e)
            )
      );
    },
    !Wm || Bm
  );
  var Hm = ln,
    $m = cn,
    Vm = Fg,
    Gm = Mv.aTypedArray;
  (0, Mv.exportTypedArrayMethod)("subarray", function (e, t) {
    var r = Gm(this),
      n = r.length,
      o = $m(e, n);
    return new (Vm(r))(
      r.buffer,
      r.byteOffset + o * r.BYTES_PER_ELEMENT,
      Hm((t === undefined ? n : $m(t, n)) - o)
    );
  });
  var zm = xc,
    Ym = Mv,
    Jm = i,
    qm = wc,
    Km = n.Int8Array,
    Xm = Ym.aTypedArray,
    Zm = Ym.exportTypedArrayMethod,
    Qm = [].toLocaleString,
    ex =
      !!Km &&
      Jm(function () {
        Qm.call(new Km(1));
      });
  Zm(
    "toLocaleString",
    function () {
      return zm(Qm, ex ? qm(Xm(this)) : Xm(this), qm(arguments));
    },
    Jm(function () {
      return [1, 2].toLocaleString() != new Km([1, 2]).toLocaleString();
    }) ||
      !Jm(function () {
        Km.prototype.toLocaleString.call([1, 2]);
      })
  );
  var tx = Mv.exportTypedArrayMethod,
    rx = i,
    nx = S,
    ox = n.Uint8Array,
    ix = (ox && ox.prototype) || {},
    ax = [].toString,
    ux = nx([].join);
  rx(function () {
    ax.call({});
  }) &&
    (ax = function () {
      return ux(this);
    });
  var cx = ix.toString != ax;
  tx("toString", ax, cx);
  var sx = S,
    fx = nn,
    lx = Ii,
    dx = N,
    hx = sx("".charAt),
    px = sx("".charCodeAt),
    vx = sx("".slice),
    yx = function (e) {
      return function (t, r) {
        var n,
          o,
          i = lx(dx(t)),
          a = fx(r),
          u = i.length;
        return a < 0 || a >= u
          ? e
            ? ""
            : undefined
          : (n = px(i, a)) < 55296 ||
            n > 56319 ||
            a + 1 === u ||
            (o = px(i, a + 1)) < 56320 ||
            o > 57343
          ? e
            ? hx(i, a)
            : n
          : e
          ? vx(i, a, a + 2)
          : o - 56320 + ((n - 55296) << 10) + 65536;
      };
    },
    gx = { codeAt: yx(!1), charAt: yx(!0) },
    bx = gx.charAt,
    mx = function (e, t, r) {
      return t + (r ? bx(e, t).length : 1);
    },
    xx = f,
    wx = Lt,
    Sx = M,
    Ax = ln,
    Ox = Ii,
    Ex = N,
    Tx = Se,
    Ix = mx,
    kx = $f;
  Nf("match", function (e, t, r) {
    return [
      function (t) {
        var r = Ex(this),
          n = Sx(t) ? undefined : Tx(t, e);
        return n ? xx(n, t, r) : new RegExp(t)[e](Ox(r));
      },
      function (e) {
        var n = wx(this),
          o = Ox(e),
          i = r(t, n, o);
        if (i.done) return i.value;
        if (!n.global) return kx(n, o);
        var a = n.unicode;
        n.lastIndex = 0;
        for (var u, c = [], s = 0; null !== (u = kx(n, o)); ) {
          var f = Ox(u[0]);
          (c[s] = f),
            "" === f && (n.lastIndex = Ix(o, Ax(n.lastIndex), a)),
            s++;
        }
        return 0 === s ? null : c;
      },
    ];
  });
  var Cx = i,
    _x = ne,
    jx = tt("species"),
    Mx = function (e) {
      return (
        _x >= 51 ||
        !Cx(function () {
          var t = [];
          return (
            ((t.constructor = {})[jx] = function () {
              return { foo: 1 };
            }),
            1 !== t[e](Boolean).foo
          );
        })
      );
    },
    Lx = ro,
    Rx = ja,
    Nx = Vo,
    Dx = G,
    Px = cn,
    Fx = hn,
    Ux = F,
    Bx = Jo,
    Wx = tt,
    Hx = wc,
    $x = Mx("slice"),
    Vx = Wx("species"),
    Gx = Array,
    zx = Math.max;
  Lx(
    { target: "Array", proto: !0, forced: !$x },
    {
      slice: function (e, t) {
        var r,
          n,
          o,
          i = Ux(this),
          a = Fx(i),
          u = Px(e, a),
          c = Px(t === undefined ? a : t, a);
        if (
          Rx(i) &&
          ((r = i.constructor),
          ((Nx(r) && (r === Gx || Rx(r.prototype))) ||
            (Dx(r) && null === (r = r[Vx]))) &&
            (r = undefined),
          r === Gx || r === undefined)
        )
          return Hx(i, u, c);
        for (
          n = new (r === undefined ? Gx : r)(zx(c - u, 0)), o = 0;
          u < c;
          u++, o++
        )
          u in i && Bx(n, o, i[u]);
        return (n.length = o), n;
      },
    }
  );
  var Yx = gx.charAt,
    Jx = Ii,
    qx = Cr,
    Kx = Mp,
    Xx = Lp,
    Zx = "String Iterator",
    Qx = qx.set,
    ew = qx.getterFor(Zx);
  Kx(
    String,
    "String",
    function (e) {
      Qx(this, { type: Zx, string: Jx(e), index: 0 });
    },
    function () {
      var e,
        t = ew(this),
        r = t.string,
        n = t.index;
      return n >= r.length
        ? Xx(undefined, !0)
        : ((e = Yx(r, n)), (t.index += e.length), Xx(e, !1));
    }
  );
  var tw = yt("span").classList,
    rw = tw && tw.constructor && tw.constructor.prototype,
    nw = rw === Object.prototype ? undefined : rw,
    ow = n,
    iw = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0,
    },
    aw = nw,
    uw = Gp,
    cw = Yt,
    sw = tt,
    fw = sw("iterator"),
    lw = sw("toStringTag"),
    dw = uw.values,
    hw = function (e, t) {
      if (e) {
        if (e[fw] !== dw)
          try {
            cw(e, fw, dw);
          } catch (BI) {
            e[fw] = dw;
          }
        if ((e[lw] || cw(e, lw, t), iw[t]))
          for (var r in uw)
            if (e[r] !== uw[r])
              try {
                cw(e, r, uw[r]);
              } catch (BI) {
                e[r] = uw[r];
              }
      }
    };
  for (var pw in iw) hw(ow[pw] && ow[pw].prototype, pw);
  hw(aw, "DOMTokenList");
  var vw = { exports: {} },
    yw = i(function () {
      if ("function" == typeof ArrayBuffer) {
        var e = new ArrayBuffer(8);
        Object.isExtensible(e) && Object.defineProperty(e, "a", { value: 8 });
      }
    }),
    gw = i,
    bw = G,
    mw = T,
    xw = yw,
    ww = Object.isExtensible,
    Sw =
      gw(function () {
        ww(1);
      }) || xw
        ? function (e) {
            return !!bw(e) && (!xw || "ArrayBuffer" != mw(e)) && (!ww || ww(e));
          }
        : ww,
    Aw = !i(function () {
      return Object.isExtensible(Object.preventExtensions({}));
    }),
    Ow = ro,
    Ew = S,
    Tw = vr,
    Iw = G,
    kw = Be,
    Cw = kt.f,
    _w = Zr,
    jw = ea,
    Mw = Sw,
    Lw = Aw,
    Rw = !1,
    Nw = Ge("meta"),
    Dw = 0,
    Pw = function (e) {
      Cw(e, Nw, { value: { objectID: "O" + Dw++, weakData: {} } });
    },
    Fw = (vw.exports = {
      enable: function () {
        (Fw.enable = function () {}), (Rw = !0);
        var e = _w.f,
          t = Ew([].splice),
          r = {};
        (r[Nw] = 1),
          e(r).length &&
            ((_w.f = function (r) {
              for (var n = e(r), o = 0, i = n.length; o < i; o++)
                if (n[o] === Nw) {
                  t(n, o, 1);
                  break;
                }
              return n;
            }),
            Ow(
              { target: "Object", stat: !0, forced: !0 },
              { getOwnPropertyNames: jw.f }
            ));
      },
      fastKey: function (e, t) {
        if (!Iw(e))
          return "symbol" == typeof e
            ? e
            : ("string" == typeof e ? "S" : "P") + e;
        if (!kw(e, Nw)) {
          if (!Mw(e)) return "F";
          if (!t) return "E";
          Pw(e);
        }
        return e[Nw].objectID;
      },
      getWeakData: function (e, t) {
        if (!kw(e, Nw)) {
          if (!Mw(e)) return !0;
          if (!t) return !1;
          Pw(e);
        }
        return e[Nw].weakData;
      },
      onFreeze: function (e) {
        return Lw && Rw && Mw(e) && !kw(e, Nw) && Pw(e), e;
      },
    });
  Tw[Nw] = !0;
  var Uw = so,
    Bw = f,
    Ww = Lt,
    Hw = ve,
    $w = wo,
    Vw = hn,
    Gw = q,
    zw = ui,
    Yw = ei,
    Jw = po,
    qw = TypeError,
    Kw = function (e, t) {
      (this.stopped = e), (this.result = t);
    },
    Xw = Kw.prototype,
    Zw = function (e, t, r) {
      var n,
        o,
        i,
        a,
        u,
        c,
        s,
        f = r && r.that,
        l = !(!r || !r.AS_ENTRIES),
        d = !(!r || !r.IS_RECORD),
        h = !(!r || !r.IS_ITERATOR),
        p = !(!r || !r.INTERRUPTED),
        v = Uw(t, f),
        y = function (e) {
          return n && Jw(n, "normal", e), new Kw(!0, e);
        },
        g = function (e) {
          return l
            ? (Ww(e), p ? v(e[0], e[1], y) : v(e[0], e[1]))
            : p
            ? v(e, y)
            : v(e);
        };
      if (d) n = e.iterator;
      else if (h) n = e;
      else {
        if (!(o = Yw(e))) throw qw(Hw(e) + " is not iterable");
        if ($w(o)) {
          for (i = 0, a = Vw(e); a > i; i++)
            if ((u = g(e[i])) && Gw(Xw, u)) return u;
          return new Kw(!1);
        }
        n = zw(e, o);
      }
      for (c = d ? e.next : n.next; !(s = Bw(c, n)).done; ) {
        try {
          u = g(s.value);
        } catch (BI) {
          Jw(n, "throw", BI);
        }
        if ("object" == typeof u && u && Gw(Xw, u)) return u;
      }
      return new Kw(!1);
    },
    Qw = ro,
    eS = n,
    tS = S,
    rS = Jn,
    nS = Xr,
    oS = vw.exports,
    iS = Zw,
    aS = Cl,
    uS = H,
    cS = M,
    sS = G,
    fS = i,
    lS = Ai,
    dS = Ca,
    hS = dy,
    pS = Qi,
    vS = pa,
    yS = Tl,
    gS = so,
    bS = Cl,
    mS = M,
    xS = Zw,
    wS = Mp,
    SS = Lp,
    AS = gh,
    OS = a,
    ES = vw.exports.fastKey,
    TS = Cr.set,
    IS = Cr.getterFor,
    kS = {
      getConstructor: function (e, t, r, n) {
        var o = e(function (e, o) {
            bS(e, i),
              TS(e, {
                type: t,
                index: pS(null),
                first: undefined,
                last: undefined,
                size: 0,
              }),
              OS || (e.size = 0),
              mS(o) || xS(o, e[n], { that: e, AS_ENTRIES: r });
          }),
          i = o.prototype,
          a = IS(t),
          u = function (e, t, r) {
            var n,
              o,
              i = a(e),
              u = c(e, t);
            return (
              u
                ? (u.value = r)
                : ((i.last = u =
                    {
                      index: (o = ES(t, !0)),
                      key: t,
                      value: r,
                      previous: (n = i.last),
                      next: undefined,
                      removed: !1,
                    }),
                  i.first || (i.first = u),
                  n && (n.next = u),
                  OS ? i.size++ : e.size++,
                  "F" !== o && (i.index[o] = u)),
              e
            );
          },
          c = function (e, t) {
            var r,
              n = a(e),
              o = ES(t);
            if ("F" !== o) return n.index[o];
            for (r = n.first; r; r = r.next) if (r.key == t) return r;
          };
        return (
          yS(i, {
            clear: function () {
              for (var e = a(this), t = e.index, r = e.first; r; )
                (r.removed = !0),
                  r.previous && (r.previous = r.previous.next = undefined),
                  delete t[r.index],
                  (r = r.next);
              (e.first = e.last = undefined),
                OS ? (e.size = 0) : (this.size = 0);
            },
            delete: function (e) {
              var t = this,
                r = a(t),
                n = c(t, e);
              if (n) {
                var o = n.next,
                  i = n.previous;
                delete r.index[n.index],
                  (n.removed = !0),
                  i && (i.next = o),
                  o && (o.previous = i),
                  r.first == n && (r.first = o),
                  r.last == n && (r.last = i),
                  OS ? r.size-- : t.size--;
              }
              return !!n;
            },
            forEach: function (e) {
              for (
                var t,
                  r = a(this),
                  n = gS(e, arguments.length > 1 ? arguments[1] : undefined);
                (t = t ? t.next : r.first);

              )
                for (n(t.value, t.key, this); t && t.removed; ) t = t.previous;
            },
            has: function (e) {
              return !!c(this, e);
            },
          }),
          yS(
            i,
            r
              ? {
                  get: function (e) {
                    var t = c(this, e);
                    return t && t.value;
                  },
                  set: function (e, t) {
                    return u(this, 0 === e ? 0 : e, t);
                  },
                }
              : {
                  add: function (e) {
                    return u(this, (e = 0 === e ? 0 : e), e);
                  },
                }
          ),
          OS &&
            vS(i, "size", {
              configurable: !0,
              get: function () {
                return a(this).size;
              },
            }),
          o
        );
      },
      setStrong: function (e, t, r) {
        var n = t + " Iterator",
          o = IS(t),
          i = IS(n);
        wS(
          e,
          t,
          function (e, t) {
            TS(this, {
              type: n,
              target: e,
              state: o(e),
              kind: t,
              last: undefined,
            });
          },
          function () {
            for (var e = i(this), t = e.kind, r = e.last; r && r.removed; )
              r = r.previous;
            return e.target && (e.last = r = r ? r.next : e.state.first)
              ? SS(
                  "keys" == t
                    ? r.key
                    : "values" == t
                    ? r.value
                    : [r.key, r.value],
                  !1
                )
              : ((e.target = undefined), SS(undefined, !0));
          },
          r ? "entries" : "values",
          !r,
          !0
        ),
          AS(t);
      },
    },
    CS = function (e, t, r) {
      var n = -1 !== e.indexOf("Map"),
        o = -1 !== e.indexOf("Weak"),
        i = n ? "set" : "add",
        a = eS[e],
        u = a && a.prototype,
        c = a,
        s = {},
        f = function (e) {
          var t = tS(u[e]);
          nS(
            u,
            e,
            "add" == e
              ? function (e) {
                  return t(this, 0 === e ? 0 : e), this;
                }
              : "delete" == e
              ? function (e) {
                  return !(o && !sS(e)) && t(this, 0 === e ? 0 : e);
                }
              : "get" == e
              ? function (e) {
                  return o && !sS(e) ? undefined : t(this, 0 === e ? 0 : e);
                }
              : "has" == e
              ? function (e) {
                  return !(o && !sS(e)) && t(this, 0 === e ? 0 : e);
                }
              : function (e, r) {
                  return t(this, 0 === e ? 0 : e, r), this;
                }
          );
        };
      if (
        rS(
          e,
          !uS(a) ||
            !(
              o ||
              (u.forEach &&
                !fS(function () {
                  new a().entries().next();
                }))
            )
        )
      )
        (c = r.getConstructor(t, e, n, i)), oS.enable();
      else if (rS(e, !0)) {
        var l = new c(),
          d = l[i](o ? {} : -0, 1) != l,
          h = fS(function () {
            l.has(1);
          }),
          p = lS(function (e) {
            new a(e);
          }),
          v =
            !o &&
            fS(function () {
              for (var e = new a(), t = 5; t--; ) e[i](t, t);
              return !e.has(-0);
            });
        p ||
          (((c = t(function (e, t) {
            aS(e, u);
            var r = hS(new a(), e, c);
            return cS(t) || iS(t, r[i], { that: r, AS_ENTRIES: n }), r;
          })).prototype = u),
          (u.constructor = c)),
          (h || v) && (f("delete"), f("has"), n && f("get")),
          (v || d) && f(i),
          o && u.clear && delete u.clear;
      }
      return (
        (s[e] = c),
        Qw({ global: !0, constructor: !0, forced: c != a }, s),
        dS(c, e),
        o || r.setStrong(c, e, n),
        c
      );
    };
  CS(
    "Map",
    function (e) {
      return function () {
        return e(this, arguments.length ? arguments[0] : undefined);
      };
    },
    kS
  );
  var _S = TypeError,
    jS = ro,
    MS = i,
    LS = ja,
    RS = G,
    NS = Pe,
    DS = hn,
    PS = function (e) {
      if (e > 9007199254740991) throw _S("Maximum allowed index exceeded");
      return e;
    },
    FS = Jo,
    US = Fa,
    BS = Mx,
    WS = ne,
    HS = tt("isConcatSpreadable"),
    $S =
      WS >= 51 ||
      !MS(function () {
        var e = [];
        return (e[HS] = !1), e.concat()[0] !== e;
      }),
    VS = function (e) {
      if (!RS(e)) return !1;
      var t = e[HS];
      return t !== undefined ? !!t : LS(e);
    };
  jS(
    { target: "Array", proto: !0, arity: 1, forced: !$S || !BS("concat") },
    {
      concat: function (e) {
        var t,
          r,
          n,
          o,
          i,
          a = NS(this),
          u = US(a, 0),
          c = 0;
        for (t = -1, n = arguments.length; t < n; t++)
          if (VS((i = -1 === t ? a : arguments[t])))
            for (o = DS(i), PS(c + o), r = 0; r < o; r++, c++)
              r in i && FS(u, c, i[r]);
          else PS(c + 1), FS(u, c++, i);
        return (u.length = c), u;
      },
    }
  );
  var GS = S,
    zS = Pe,
    YS = Math.floor,
    JS = GS("".charAt),
    qS = GS("".replace),
    KS = GS("".slice),
    XS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
    ZS = /\$([$&'`]|\d{1,2})/g,
    QS = xc,
    eA = f,
    tA = S,
    rA = Nf,
    nA = i,
    oA = Lt,
    iA = H,
    aA = M,
    uA = nn,
    cA = ln,
    sA = Ii,
    fA = N,
    lA = mx,
    dA = Se,
    hA = function (e, t, r, n, o, i) {
      var a = r + e.length,
        u = n.length,
        c = ZS;
      return (
        o !== undefined && ((o = zS(o)), (c = XS)),
        qS(i, c, function (i, c) {
          var s;
          switch (JS(c, 0)) {
            case "$":
              return "$";
            case "&":
              return e;
            case "`":
              return KS(t, 0, r);
            case "'":
              return KS(t, a);
            case "<":
              s = o[KS(c, 1, -1)];
              break;
            default:
              var f = +c;
              if (0 === f) return i;
              if (f > u) {
                var l = YS(f / 10);
                return 0 === l
                  ? i
                  : l <= u
                  ? n[l - 1] === undefined
                    ? JS(c, 1)
                    : n[l - 1] + JS(c, 1)
                  : i;
              }
              s = n[f - 1];
          }
          return s === undefined ? "" : s;
        })
      );
    },
    pA = $f,
    vA = tt("replace"),
    yA = Math.max,
    gA = Math.min,
    bA = tA([].concat),
    mA = tA([].push),
    xA = tA("".indexOf),
    wA = tA("".slice),
    SA = "$0" === "a".replace(/./, "$0"),
    AA = !!/./[vA] && "" === /./[vA]("a", "$0"),
    OA = !nA(function () {
      var e = /./;
      return (
        (e.exec = function () {
          var e = [];
          return (e.groups = { a: "7" }), e;
        }),
        "7" !== "".replace(e, "$<a>")
      );
    });
  rA(
    "replace",
    function (e, t, r) {
      var n = AA ? "$" : "$0";
      return [
        function (e, r) {
          var n = fA(this),
            o = aA(e) ? undefined : dA(e, vA);
          return o ? eA(o, e, n, r) : eA(t, sA(n), e, r);
        },
        function (e, o) {
          var i = oA(this),
            a = sA(e);
          if ("string" == typeof o && -1 === xA(o, n) && -1 === xA(o, "$<")) {
            var u = r(t, i, a, o);
            if (u.done) return u.value;
          }
          var c = iA(o);
          c || (o = sA(o));
          var s = i.global;
          if (s) {
            var f = i.unicode;
            i.lastIndex = 0;
          }
          for (var l = []; ; ) {
            var d = pA(i, a);
            if (null === d) break;
            if ((mA(l, d), !s)) break;
            "" === sA(d[0]) && (i.lastIndex = lA(a, cA(i.lastIndex), f));
          }
          for (var h, p = "", v = 0, y = 0; y < l.length; y++) {
            for (
              var g = sA((d = l[y])[0]),
                b = yA(gA(uA(d.index), a.length), 0),
                m = [],
                x = 1;
              x < d.length;
              x++
            )
              mA(m, (h = d[x]) === undefined ? h : String(h));
            var w = d.groups;
            if (c) {
              var S = bA([g], m, b, a);
              w !== undefined && mA(S, w);
              var A = sA(QS(o, undefined, S));
            } else A = hA(g, a, b, m, w, o);
            b >= v && ((p += wA(a, v, b) + A), (v = b + g.length));
          }
          return p + wA(a, v);
        },
      ];
    },
    !OA || !SA || AA
  );
  var EA = G,
    TA = T,
    IA = tt("match"),
    kA = function (e) {
      var t;
      return EA(e) && ((t = e[IA]) !== undefined ? !!t : "RegExp" == TA(e));
    },
    CA = kt.f,
    _A = a,
    jA = n,
    MA = S,
    LA = Jn,
    RA = dy,
    NA = Yt,
    DA = Zr.f,
    PA = q,
    FA = kA,
    UA = Ii,
    BA = il,
    WA = Zs,
    HA = function (e, t, r) {
      r in e ||
        CA(e, r, {
          configurable: !0,
          get: function () {
            return t[r];
          },
          set: function (e) {
            t[r] = e;
          },
        });
    },
    $A = Xr,
    VA = i,
    GA = Be,
    zA = Cr.enforce,
    YA = gh,
    JA = tf,
    qA = of,
    KA = tt("match"),
    XA = jA.RegExp,
    ZA = XA.prototype,
    QA = jA.SyntaxError,
    eO = MA(ZA.exec),
    tO = MA("".charAt),
    rO = MA("".replace),
    nO = MA("".indexOf),
    oO = MA("".slice),
    iO = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/,
    aO = /a/g,
    uO = /a/g,
    cO = new XA(aO) !== aO,
    sO = WA.MISSED_STICKY,
    fO = WA.UNSUPPORTED_Y,
    lO =
      _A &&
      (!cO ||
        sO ||
        JA ||
        qA ||
        VA(function () {
          return (
            (uO[KA] = !1), XA(aO) != aO || XA(uO) == uO || "/a/i" != XA(aO, "i")
          );
        }));
  if (LA("RegExp", lO)) {
    for (
      var dO = function (e, t) {
          var r,
            n,
            o,
            i,
            a,
            u,
            c = PA(ZA, this),
            s = FA(e),
            f = t === undefined,
            l = [],
            d = e;
          if (!c && s && f && e.constructor === dO) return e;
          if (
            ((s || PA(ZA, e)) && ((e = e.source), f && (t = BA(d))),
            (e = e === undefined ? "" : UA(e)),
            (t = t === undefined ? "" : UA(t)),
            (d = e),
            JA &&
              ("dotAll" in aO) &&
              (n = !!t && nO(t, "s") > -1) &&
              (t = rO(t, /s/g, "")),
            (r = t),
            sO &&
              ("sticky" in aO) &&
              (o = !!t && nO(t, "y") > -1) &&
              fO &&
              (t = rO(t, /y/g, "")),
            qA &&
              ((i = (function (e) {
                for (
                  var t,
                    r = e.length,
                    n = 0,
                    o = "",
                    i = [],
                    a = {},
                    u = !1,
                    c = !1,
                    s = 0,
                    f = "";
                  n <= r;
                  n++
                ) {
                  if ("\\" === (t = tO(e, n))) t += tO(e, ++n);
                  else if ("]" === t) u = !1;
                  else if (!u)
                    switch (!0) {
                      case "[" === t:
                        u = !0;
                        break;
                      case "(" === t:
                        eO(iO, oO(e, n + 1)) && ((n += 2), (c = !0)),
                          (o += t),
                          s++;
                        continue;
                      case ">" === t && c:
                        if ("" === f || GA(a, f))
                          throw new QA("Invalid capture group name");
                        (a[f] = !0), (i[i.length] = [f, s]), (c = !1), (f = "");
                        continue;
                    }
                  c ? (f += t) : (o += t);
                }
                return [o, i];
              })(e)),
              (e = i[0]),
              (l = i[1])),
            (a = RA(XA(e, t), c ? this : ZA, dO)),
            (n || o || l.length) &&
              ((u = zA(a)),
              n &&
                ((u.dotAll = !0),
                (u.raw = dO(
                  (function (e) {
                    for (
                      var t, r = e.length, n = 0, o = "", i = !1;
                      n <= r;
                      n++
                    )
                      "\\" !== (t = tO(e, n))
                        ? i || "." !== t
                          ? ("[" === t ? (i = !0) : "]" === t && (i = !1),
                            (o += t))
                          : (o += "[\\s\\S]")
                        : (o += t + tO(e, ++n));
                    return o;
                  })(e),
                  r
                ))),
              o && (u.sticky = !0),
              l.length && (u.groups = l)),
            e !== d)
          )
            try {
              NA(a, "source", "" === d ? "(?:)" : d);
            } catch (BI) {}
          return a;
        },
        hO = DA(XA),
        pO = 0;
      hO.length > pO;

    )
      HA(dO, XA, hO[pO++]);
    (ZA.constructor = dO),
      (dO.prototype = ZA),
      $A(jA, "RegExp", dO, { constructor: !0 });
  }
  YA("RegExp");
  var vO,
    yO = kA,
    gO = TypeError,
    bO = function (e) {
      if (yO(e)) throw gO("The method doesn't accept regular expressions");
      return e;
    },
    mO = tt("match"),
    xO = function (e) {
      var t = /./;
      try {
        "/./"[e](t);
      } catch (r) {
        try {
          return (t[mO] = !1), "/./"[e](t);
        } catch (n) {}
      }
      return !1;
    },
    wO = ro,
    SO = io,
    AO = o.f,
    OO = ln,
    EO = Ii,
    TO = bO,
    IO = N,
    kO = xO,
    CO = SO("".startsWith),
    _O = SO("".slice),
    jO = Math.min,
    MO = kO("startsWith");
  wO(
    {
      target: "String",
      proto: !0,
      forced:
        !!(
          MO || ((vO = AO(String.prototype, "startsWith")), !vO || vO.writable)
        ) && !MO,
    },
    {
      startsWith: function (e) {
        var t = EO(IO(this));
        TO(e);
        var r = OO(
            jO(arguments.length > 1 ? arguments[1] : undefined, t.length)
          ),
          n = EO(e);
        return CO ? CO(t, n, r) : _O(t, r, r + n.length) === n;
      },
    }
  );
  var LO = "function" == typeof Bun && Bun && "string" == typeof Bun.version,
    RO = TypeError,
    NO = n,
    DO = xc,
    PO = H,
    FO = LO,
    UO = K,
    BO = wc,
    WO = function (e, t) {
      if (e < t) throw RO("Not enough arguments");
      return e;
    },
    HO = NO.Function,
    $O =
      /MSIE .\./.test(UO) ||
      (FO &&
        (function () {
          var e = NO.Bun.version.split(".");
          return (
            e.length < 3 ||
            (0 == e[0] && (e[1] < 3 || (3 == e[1] && 0 == e[2])))
          );
        })()),
    VO = function (e, t) {
      var r = t ? 2 : 1;
      return $O
        ? function (n, o) {
            var i = WO(arguments.length, 1) > r,
              a = PO(n) ? n : HO(n),
              u = i ? BO(arguments, r) : [],
              c = i
                ? function () {
                    DO(a, this, u);
                  }
                : a;
            return t ? e(c, o) : e(c);
          }
        : e;
    },
    GO = ro,
    zO = n,
    YO = VO(zO.setInterval, !0);
  GO(
    { global: !0, bind: !0, forced: zO.setInterval !== YO },
    { setInterval: YO }
  );
  var JO = ro,
    qO = n,
    KO = VO(qO.setTimeout, !0);
  JO(
    { global: !0, bind: !0, forced: qO.setTimeout !== KO },
    { setTimeout: KO }
  );
  var XO = xc,
    ZO = f,
    QO = S,
    eE = Nf,
    tE = Lt,
    rE = M,
    nE = kA,
    oE = N,
    iE = Ch,
    aE = mx,
    uE = ln,
    cE = Ii,
    sE = Se,
    fE = aa,
    lE = $f,
    dE = Tf,
    hE = i,
    pE = Zs.UNSUPPORTED_Y,
    vE = 4294967295,
    yE = Math.min,
    gE = [].push,
    bE = QO(/./.exec),
    mE = QO(gE),
    xE = QO("".slice),
    wE = !hE(function () {
      var e = /(?:)/,
        t = e.exec;
      e.exec = function () {
        return t.apply(this, arguments);
      };
      var r = "ab".split(e);
      return 2 !== r.length || "a" !== r[0] || "b" !== r[1];
    });
  eE(
    "split",
    function (e, t, r) {
      var n;
      return (
        (n =
          "c" == "abbc".split(/(b)*/)[1] ||
          4 != "test".split(/(?:)/, -1).length ||
          2 != "ab".split(/(?:ab)*/).length ||
          4 != ".".split(/(.?)(.?)/).length ||
          ".".split(/()()/).length > 1 ||
          "".split(/.?/).length
            ? function (e, r) {
                var n = cE(oE(this)),
                  o = r === undefined ? vE : r >>> 0;
                if (0 === o) return [];
                if (e === undefined) return [n];
                if (!nE(e)) return ZO(t, n, e, o);
                for (
                  var i,
                    a,
                    u,
                    c = [],
                    s =
                      (e.ignoreCase ? "i" : "") +
                      (e.multiline ? "m" : "") +
                      (e.unicode ? "u" : "") +
                      (e.sticky ? "y" : ""),
                    f = 0,
                    l = new RegExp(e.source, s + "g");
                  (i = ZO(dE, l, n)) &&
                  !(
                    (a = l.lastIndex) > f &&
                    (mE(c, xE(n, f, i.index)),
                    i.length > 1 && i.index < n.length && XO(gE, c, fE(i, 1)),
                    (u = i[0].length),
                    (f = a),
                    c.length >= o)
                  );

                )
                  l.lastIndex === i.index && l.lastIndex++;
                return (
                  f === n.length
                    ? (!u && bE(l, "")) || mE(c, "")
                    : mE(c, xE(n, f)),
                  c.length > o ? fE(c, 0, o) : c
                );
              }
            : "0".split(undefined, 0).length
            ? function (e, r) {
                return e === undefined && 0 === r ? [] : ZO(t, this, e, r);
              }
            : t),
        [
          function (t, r) {
            var o = oE(this),
              i = rE(t) ? undefined : sE(t, e);
            return i ? ZO(i, t, o, r) : ZO(n, cE(o), t, r);
          },
          function (e, o) {
            var i = tE(this),
              a = cE(e),
              u = r(n, i, a, o, n !== t);
            if (u.done) return u.value;
            var c = iE(i, RegExp),
              s = i.unicode,
              f =
                (i.ignoreCase ? "i" : "") +
                (i.multiline ? "m" : "") +
                (i.unicode ? "u" : "") +
                (pE ? "g" : "y"),
              l = new c(pE ? "^(?:" + i.source + ")" : i, f),
              d = o === undefined ? vE : o >>> 0;
            if (0 === d) return [];
            if (0 === a.length) return null === lE(l, a) ? [a] : [];
            for (var h = 0, p = 0, v = []; p < a.length; ) {
              l.lastIndex = pE ? 0 : p;
              var y,
                g = lE(l, pE ? xE(a, p) : a);
              if (
                null === g ||
                (y = yE(uE(l.lastIndex + (pE ? p : 0)), a.length)) === h
              )
                p = aE(a, p, s);
              else {
                if ((mE(v, xE(a, h, p)), v.length === d)) return v;
                for (var b = 1; b <= g.length - 1; b++)
                  if ((mE(v, g[b]), v.length === d)) return v;
                p = h = y;
              }
            }
            return mE(v, xE(a, h)), v;
          },
        ]
      );
    },
    !wE,
    pE
  );
  var SE = "\t\n\x0B\f\r                　\u2028\u2029\ufeff",
    AE = N,
    OE = Ii,
    EE = SE,
    TE = S("".replace),
    IE = RegExp("^[" + EE + "]+"),
    kE = RegExp("(^|[^" + EE + "])[" + EE + "]+$"),
    CE = function (e) {
      return function (t) {
        var r = OE(AE(t));
        return 1 & e && (r = TE(r, IE, "")), 2 & e && (r = TE(r, kE, "$1")), r;
      };
    },
    _E = { start: CE(1), end: CE(2), trim: CE(3) },
    jE = er.PROPER,
    ME = i,
    LE = SE,
    RE = _E.trim;
  ro(
    {
      target: "String",
      proto: !0,
      forced: (function (e) {
        return ME(function () {
          return !!LE[e]() || "​᠎" !== "​᠎"[e]() || (jE && LE[e].name !== e);
        });
      })("trim"),
    },
    {
      trim: function () {
        return RE(this);
      },
    }
  );
  var NE = ro,
    DE = io,
    PE = o.f,
    FE = ln,
    UE = Ii,
    BE = bO,
    WE = N,
    HE = xO,
    $E = DE("".endsWith),
    VE = DE("".slice),
    GE = Math.min,
    zE = HE("endsWith"),
    YE =
      !zE &&
      !!(function () {
        var e = PE(String.prototype, "endsWith");
        return e && !e.writable;
      })();
  NE(
    { target: "String", proto: !0, forced: !YE && !zE },
    {
      endsWith: function (e) {
        var t = UE(WE(this));
        BE(e);
        var r = arguments.length > 1 ? arguments[1] : undefined,
          n = t.length,
          o = r === undefined ? n : GE(FE(r), n),
          i = UE(e);
        return $E ? $E(t, i, o) : VE(t, o - i.length, o) === i;
      },
    }
  );
  var JE = za.filter;
  ro(
    { target: "Array", proto: !0, forced: !Mx("filter") },
    {
      filter: function (e) {
        return JE(this, e, arguments.length > 1 ? arguments[1] : undefined);
      },
    }
  );
  var qE = bn.includes,
    KE = Xh;
  ro(
    {
      target: "Array",
      proto: !0,
      forced: i(function () {
        return !Array(1).includes();
      }),
    },
    {
      includes: function (e) {
        return qE(this, e, arguments.length > 1 ? arguments[1] : undefined);
      },
    }
  ),
    KE("includes");
  var XE = ro,
    ZE = bO,
    QE = N,
    eT = Ii,
    tT = xO,
    rT = S("".indexOf);
  XE(
    { target: "String", proto: !0, forced: !tT("includes") },
    {
      includes: function (e) {
        return !!~rT(
          eT(QE(this)),
          eT(ZE(e)),
          arguments.length > 1 ? arguments[1] : undefined
        );
      },
    }
  );
  var nT = ro,
    oT = j,
    iT = F,
    aT = xb,
    uT = S([].join);
  nT(
    { target: "Array", proto: !0, forced: oT != Object || !aT("join", ",") },
    {
      join: function (e) {
        return uT(iT(this), e === undefined ? "," : e);
      },
    }
  );
  var cT = Dynamsoft.Lib.Promise;
  function sT(e, t) {
    var r =
      ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
    if (!r) {
      if (
        Array.isArray(e) ||
        (r = (function (e, t) {
          if (e) {
            if ("string" == typeof e) return fT(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return (
              "Object" === r && e.constructor && (r = e.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(e)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? fT(e, t)
                : void 0
            );
          }
        })(e)) ||
        (t && e && "number" == typeof e.length)
      ) {
        r && (e = r);
        var n = 0,
          o = function () {};
        return {
          s: o,
          n: function () {
            return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
          },
          e: function (e) {
            throw e;
          },
          f: o,
        };
      }
      throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    }
    var i,
      a = !0,
      u = !1;
    return {
      s: function () {
        r = r.call(e);
      },
      n: function () {
        var e = r.next();
        return (a = e.done), e;
      },
      e: function (e) {
        (u = !0), (i = e);
      },
      f: function () {
        try {
          a || null == r["return"] || r["return"]();
        } finally {
          if (u) throw i;
        }
      },
    };
  }
  function fT(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
    return n;
  }
  var lT,
    dT,
    hT,
    pT,
    vT,
    yT = "undefined" == typeof self,
    gT = yT ? {} : self;
  if (
    ("undefined" != typeof navigator &&
      ((dT = (lT = navigator).userAgent),
      (hT = lT.platform),
      (pT = lT.mediaDevices)),
    !yT)
  ) {
    var bT = {
        Edge: { search: "Edg", verSearch: "Edg" },
        OPR: null,
        Chrome: null,
        Safari: {
          str: lT.vendor,
          search: "Apple",
          verSearch: ["Version", "iPhone OS", "CPU OS"],
        },
        Firefox: null,
        Explorer: { search: "MSIE", verSearch: "MSIE" },
      },
      mT = {
        HarmonyOS: null,
        Android: null,
        iPhone: null,
        iPad: null,
        Windows: { str: hT, search: "Win" },
        Mac: { str: hT },
        Linux: { str: hT },
      },
      xT = "unknownBrowser",
      wT = 0,
      ST = "unknownOS";
    for (var AT in bT) {
      var OT = bT[AT] || {},
        ET = OT.str || dT,
        TT = OT.search || AT,
        IT = OT.verStr || dT,
        kT = OT.verSearch || AT;
      if ((kT instanceof Array || (kT = [kT]), -1 != ET.indexOf(TT))) {
        xT = AT;
        var CT,
          _T = sT(kT);
        try {
          for (_T.s(); !(CT = _T.n()).done; ) {
            var jT = CT.value,
              MT = IT.indexOf(jT);
            if (-1 != MT) {
              wT = parseFloat(IT.substring(MT + jT.length + 1));
              break;
            }
          }
        } catch (Ts) {
          _T.e(Ts);
        } finally {
          _T.f();
        }
        break;
      }
    }
    for (var LT in mT) {
      var RT = mT[LT] || {},
        NT = RT.str || dT,
        DT = RT.search || LT;
      if (-1 != NT.indexOf(DT)) {
        ST = LT;
        break;
      }
    }
    "Linux" == ST && -1 != dT.indexOf("Windows NT") && (ST = "HarmonyOS"),
      (vT = { browser: xT, version: wT, OS: ST });
  }
  yT && (vT = { browser: "ssr", version: 0, OS: "ssr" }),
    "undefined" != typeof WebAssembly &&
      dT &&
      (!/Safari/.test(dT) ||
        /Chrome/.test(dT) ||
        /\(.+\s11_2_([2-6]).*\)/.test(dT)),
    pT && pT.getUserMedia;
  var PT =
      ("Chrome" === vT.browser && vT.version > 66) ||
      ("Safari" === vT.browser && vT.version > 13) ||
      ("OPR" === vT.browser && vT.version > 43) ||
      ("Edge" === vT.browser && vT.version > 15),
    FT = (function () {
      try {
        if ("undefined" != typeof indexedDB) return indexedDB;
        if ("undefined" != typeof webkitIndexedDB) return webkitIndexedDB;
        if ("undefined" != typeof mozIndexedDB) return mozIndexedDB;
        if ("undefined" != typeof OIndexedDB) return OIndexedDB;
        if ("undefined" != typeof msIndexedDB) return msIndexedDB;
      } catch (Ts) {
        return;
      }
    })();
  function UT(e, t) {
    (e = e || []), (t = t || {});
    try {
      return new Blob(e, t);
    } catch (Ws) {
      if ("TypeError" !== Ws.name) throw Ws;
      for (
        var r = new (
            "undefined" != typeof BlobBuilder
              ? BlobBuilder
              : "undefined" != typeof MSBlobBuilder
              ? MSBlobBuilder
              : "undefined" != typeof MozBlobBuilder
              ? MozBlobBuilder
              : WebKitBlobBuilder
          )(),
          n = 0;
        n < e.length;
        n += 1
      )
        r.append(e[n]);
      return r.getBlob(t.type);
    }
  }
  function BT(e, t) {
    t &&
      e.then(
        function (e) {
          t(null, e);
        },
        function (e) {
          t(e);
        }
      );
  }
  function WT(e, t, r) {
    "function" == typeof t && e.then(t),
      "function" == typeof r && e["catch"](r);
  }
  function HT(e) {
    return "string" != typeof e && (e = String(e)), e;
  }
  function $T() {
    if (
      arguments.length &&
      "function" == typeof arguments[arguments.length - 1]
    )
      return arguments[arguments.length - 1];
  }
  var VT,
    GT = {},
    zT = Object.prototype.toString;
  function YT(e) {
    var t = GT[e.name],
      r = {};
    (r.promise = new cT(function (e, t) {
      (r.resolve = e), (r.reject = t);
    })),
      t.deferredOperations.push(r),
      t.dbReady
        ? (t.dbReady = t.dbReady.then(function () {
            return r.promise;
          }))
        : (t.dbReady = r.promise);
  }
  function JT(e) {
    var t = GT[e.name].deferredOperations.pop();
    if (t) return t.resolve(), t.promise;
  }
  function qT(e, t) {
    var r = GT[e.name].deferredOperations.pop();
    if (r) return r.reject(t), r.promise;
  }
  function KT(e, t) {
    return new cT(function (r, n) {
      if (
        ((GT[e.name] = GT[e.name] || {
          forages: [],
          db: null,
          dbReady: null,
          deferredOperations: [],
        }),
        e.db)
      ) {
        if (!t) return r(e.db);
        YT(e), e.db.close();
      }
      var o = [e.name];
      t && o.push(e.version);
      var i = FT.open.apply(FT, o);
      t &&
        (i.onupgradeneeded = function (t) {
          var r = i.result;
          try {
            r.createObjectStore(e.storeName),
              t.oldVersion <= 1 &&
                r.createObjectStore("local-forage-detect-blob-support");
          } catch (r) {
            if ("ConstraintError" !== r.name) throw r;
          }
        }),
        (i.onerror = function (e) {
          e.preventDefault(), n(i.error);
        }),
        (i.onsuccess = function () {
          var t = i.result;
          (t.onversionchange = function (e) {
            e.target.close();
          }),
            r(t),
            JT(e);
        });
    });
  }
  function XT(e) {
    return KT(e, !1);
  }
  function ZT(e) {
    return KT(e, !0);
  }
  function QT(e, t) {
    if (!e.db) return !0;
    var r = !e.db.objectStoreNames.contains(e.storeName),
      n = e.version < e.db.version,
      o = e.version > e.db.version;
    if ((n && (e.version, (e.version = e.db.version)), o || r)) {
      if (r) {
        var i = e.db.version + 1;
        i > e.version && (e.version = i);
      }
      return !0;
    }
    return !1;
  }
  function eI(e) {
    var t = this,
      r = t._initReady().then(function () {
        var e = GT[t._dbInfo.name];
        if (e && e.dbReady) return e.dbReady;
      });
    return WT(r, e, e), r;
  }
  function tI(e, t, r, n) {
    void 0 === n && (n = 1);
    try {
      var o = e.db.transaction(e.storeName, t);
      r(null, o);
    } catch (o) {
      if (
        n > 0 &&
        (!e.db || "InvalidStateError" === o.name || "NotFoundError" === o.name)
      )
        return cT
          .resolve()
          .then(function () {
            if (
              !e.db ||
              ("NotFoundError" === o.name &&
                !e.db.objectStoreNames.contains(e.storeName) &&
                e.version <= e.db.version)
            )
              return e.db && (e.version = e.db.version + 1), ZT(e);
          })
          .then(function () {
            return (function (e) {
              YT(e);
              for (
                var t = GT[e.name], r = t.forages, n = 0;
                n < r.length;
                n++
              ) {
                var o = r[n];
                o._dbInfo.db && (o._dbInfo.db.close(), (o._dbInfo.db = null));
              }
              return (
                (e.db = null),
                XT(e)
                  .then(function (t) {
                    return (e.db = t), QT(e) ? ZT(e) : t;
                  })
                  .then(function (n) {
                    e.db = t.db = n;
                    for (var o = 0; o < r.length; o++) r[o]._dbInfo.db = n;
                  })
                  ["catch"](function (t) {
                    throw (qT(e, t), t);
                  })
              );
            })(e).then(function () {
              tI(e, t, r, n - 1);
            });
          })
          ["catch"](r);
      r(o);
    }
  }
  var rI = {
      _driver: "asyncStorage",
      _initStorage: function (e) {
        var t = this,
          r = { db: null };
        if (e) for (var n in e) r[n] = e[n];
        var o = GT[r.name];
        o ||
          ((o = {
            forages: [],
            db: null,
            dbReady: null,
            deferredOperations: [],
          }),
          (GT[r.name] = o)),
          o.forages.push(t),
          t._initReady || ((t._initReady = t.ready), (t.ready = eI));
        var i = [];
        function a() {
          return cT.resolve();
        }
        for (var u = 0; u < o.forages.length; u++) {
          var c = o.forages[u];
          c !== t && i.push(c._initReady()["catch"](a));
        }
        var s = o.forages.slice(0);
        return cT
          .all(i)
          .then(function () {
            return (r.db = o.db), XT(r);
          })
          .then(function (e) {
            return (r.db = e), QT(r, t._defaultConfig.version) ? ZT(r) : e;
          })
          .then(function (e) {
            (r.db = o.db = e), (t._dbInfo = r);
            for (var n = 0; n < s.length; n++) {
              var i = s[n];
              i !== t &&
                ((i._dbInfo.db = r.db), (i._dbInfo.version = r.version));
            }
          });
      },
      _support: (function () {
        try {
          if (!FT || !FT.open) return !1;
          var e =
              "undefined" != typeof openDatabase &&
              /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) &&
              !/Chrome/.test(navigator.userAgent) &&
              !/BlackBerry/.test(navigator.platform),
            t =
              "function" == typeof fetch &&
              -1 !== fetch.toString().indexOf("[native code");
          return (
            (!e || t) &&
            "undefined" != typeof indexedDB &&
            "undefined" != typeof IDBKeyRange
          );
        } catch (e) {
          return !1;
        }
      })(),
      getItem: function (e, t) {
        var r = this;
        e = HT(e);
        var n = new cT(function (t, n) {
          r.ready()
            .then(function () {
              tI(r._dbInfo, "readonly", function (o, i) {
                if (o) return n(o);
                try {
                  var a = i.objectStore(r._dbInfo.storeName).get(e);
                  (a.onsuccess = function () {
                    var e = a.result;
                    void 0 === e && (e = null),
                      (function (e) {
                        return e && e.__local_forage_encoded_blob;
                      })(e) &&
                        (e = (function (e) {
                          var t = (function (e) {
                            for (
                              var t = e.length,
                                r = new ArrayBuffer(t),
                                n = new Uint8Array(r),
                                o = 0;
                              o < t;
                              o++
                            )
                              n[o] = e.charCodeAt(o);
                            return r;
                          })(atob(e.data));
                          return UT([t], { type: e.type });
                        })(e)),
                      t(e);
                  }),
                    (a.onerror = function () {
                      n(a.error);
                    });
                } catch (e) {
                  n(e);
                }
              });
            })
            ["catch"](n);
        });
        return BT(n, t), n;
      },
      setItem: function (e, t, r) {
        var n = this;
        e = HT(e);
        var o = new cT(function (r, o) {
          var i;
          n.ready()
            .then(function () {
              return (
                (i = n._dbInfo),
                "[object Blob]" === zT.call(t)
                  ? (function (e) {
                      return "boolean" == typeof VT
                        ? cT.resolve(VT)
                        : (function (e) {
                            return new cT(function (t) {
                              var r = e.transaction(
                                  "local-forage-detect-blob-support",
                                  "readwrite"
                                ),
                                n = UT([""]);
                              r
                                .objectStore("local-forage-detect-blob-support")
                                .put(n, "key"),
                                (r.onabort = function (e) {
                                  e.preventDefault(),
                                    e.stopPropagation(),
                                    t(!1);
                                }),
                                (r.oncomplete = function () {
                                  var e =
                                      navigator.userAgent.match(
                                        /Chrome\/(\d+)/
                                      ),
                                    r = navigator.userAgent.match(/Edge\//);
                                  t(r || !e || parseInt(e[1], 10) >= 43);
                                });
                            })["catch"](function () {
                              return !1;
                            });
                          })(e).then(function (e) {
                            return (VT = e);
                          });
                    })(i.db).then(function (e) {
                      return e
                        ? t
                        : ((r = t),
                          new cT(function (e, t) {
                            var n = new FileReader();
                            (n.onerror = t),
                              (n.onloadend = function (t) {
                                var n = btoa(t.target.result || "");
                                e({
                                  __local_forage_encoded_blob: !0,
                                  data: n,
                                  type: r.type,
                                });
                              }),
                              n.readAsBinaryString(r);
                          }));
                      var r;
                    })
                  : t
              );
            })
            .then(function (t) {
              tI(n._dbInfo, "readwrite", function (i, a) {
                if (i) return o(i);
                try {
                  var u = a.objectStore(n._dbInfo.storeName);
                  null === t && (t = void 0);
                  var c = u.put(t, e);
                  (a.oncomplete = function () {
                    void 0 === t && (t = null), r(t);
                  }),
                    (a.onabort = a.onerror =
                      function () {
                        var e = c.error ? c.error : c.transaction.error;
                        o(e);
                      });
                } catch (e) {
                  o(e);
                }
              });
            })
            ["catch"](o);
        });
        return BT(o, r), o;
      },
      removeItem: function (e, t) {
        var r = this;
        e = HT(e);
        var n = new cT(function (t, n) {
          r.ready()
            .then(function () {
              tI(r._dbInfo, "readwrite", function (o, i) {
                if (o) return n(o);
                try {
                  var a = i.objectStore(r._dbInfo.storeName)["delete"](e);
                  (i.oncomplete = function () {
                    t();
                  }),
                    (i.onerror = function () {
                      n(a.error);
                    }),
                    (i.onabort = function () {
                      var e = a.error ? a.error : a.transaction.error;
                      n(e);
                    });
                } catch (e) {
                  n(e);
                }
              });
            })
            ["catch"](n);
        });
        return BT(n, t), n;
      },
      clear: function (e) {
        var t = this,
          r = new cT(function (e, r) {
            t.ready()
              .then(function () {
                tI(t._dbInfo, "readwrite", function (n, o) {
                  if (n) return r(n);
                  try {
                    var i = o.objectStore(t._dbInfo.storeName).clear();
                    (o.oncomplete = function () {
                      e();
                    }),
                      (o.onabort = o.onerror =
                        function () {
                          var e = i.error ? i.error : i.transaction.error;
                          r(e);
                        });
                  } catch (e) {
                    r(e);
                  }
                });
              })
              ["catch"](r);
          });
        return BT(r, e), r;
      },
      length: function (e) {
        var t = this,
          r = new cT(function (e, r) {
            t.ready()
              .then(function () {
                tI(t._dbInfo, "readonly", function (n, o) {
                  if (n) return r(n);
                  try {
                    var i = o.objectStore(t._dbInfo.storeName).count();
                    (i.onsuccess = function () {
                      e(i.result);
                    }),
                      (i.onerror = function () {
                        r(i.error);
                      });
                  } catch (e) {
                    r(e);
                  }
                });
              })
              ["catch"](r);
          });
        return BT(r, e), r;
      },
      keys: function (e) {
        var t = this,
          r = new cT(function (e, r) {
            t.ready()
              .then(function () {
                tI(t._dbInfo, "readonly", function (n, o) {
                  if (n) return r(n);
                  try {
                    var i = o.objectStore(t._dbInfo.storeName).openKeyCursor(),
                      a = [];
                    (i.onsuccess = function () {
                      var t = i.result;
                      t ? (a.push(t.key), t["continue"]()) : e(a);
                    }),
                      (i.onerror = function () {
                        r(i.error);
                      });
                  } catch (e) {
                    r(e);
                  }
                });
              })
              ["catch"](r);
          });
        return BT(r, e), r;
      },
      dropInstance: function (e, t) {
        t = $T.apply(this, arguments);
        var r = this.config();
        (e = ("function" != typeof e && e) || {}).name ||
          ((e.name = e.name || r.name),
          (e.storeName = e.storeName || r.storeName));
        var n;
        if (e.name) {
          var o =
            e.name === r.name && this._dbInfo.db
              ? cT.resolve(this._dbInfo.db)
              : XT(e).then(function (t) {
                  var r = GT[e.name],
                    n = r.forages;
                  r.db = t;
                  for (var o = 0; o < n.length; o++) n[o]._dbInfo.db = t;
                  return t;
                });
          n = e.storeName
            ? o.then(function (t) {
                if (t.objectStoreNames.contains(e.storeName)) {
                  var r = t.version + 1;
                  YT(e);
                  var n = GT[e.name],
                    o = n.forages;
                  t.close();
                  for (var i = 0; i < o.length; i++) {
                    var a = o[i];
                    (a._dbInfo.db = null), (a._dbInfo.version = r);
                  }
                  var u = new cT(function (t, n) {
                    var o = FT.open(e.name, r);
                    (o.onerror = function (e) {
                      o.result.close(), n(e);
                    }),
                      (o.onupgradeneeded = function () {
                        o.result.deleteObjectStore(e.storeName);
                      }),
                      (o.onsuccess = function () {
                        var e = o.result;
                        e.close(), t(e);
                      });
                  });
                  return u
                    .then(function (e) {
                      n.db = e;
                      for (var t = 0; t < o.length; t++) {
                        var r = o[t];
                        (r._dbInfo.db = e), JT(r._dbInfo);
                      }
                    })
                    ["catch"](function (t) {
                      throw (
                        ((qT(e, t) || cT.resolve())["catch"](function () {}), t)
                      );
                    });
                }
              })
            : o.then(function (t) {
                YT(e);
                var r = GT[e.name],
                  n = r.forages;
                t.close();
                for (var o = 0; o < n.length; o++) n[o]._dbInfo.db = null;
                var i = new cT(function (t, r) {
                  var n = FT.deleteDatabase(e.name);
                  (n.onerror = function () {
                    var e = n.result;
                    e && e.close(), r(n.error);
                  }),
                    (n.onblocked = function () {}),
                    (n.onsuccess = function () {
                      var e = n.result;
                      e && e.close(), t(e);
                    });
                });
                return i
                  .then(function (e) {
                    r.db = e;
                    for (var t = 0; t < n.length; t++) JT(n[t]._dbInfo);
                  })
                  ["catch"](function (t) {
                    throw (
                      ((qT(e, t) || cT.resolve())["catch"](function () {}), t)
                    );
                  });
              });
        } else n = cT.reject("Invalid arguments");
        return BT(n, t), n;
      },
    },
    nI = new Map();
  function oI(e, t) {
    var r = e.name + "/";
    return e.storeName !== t.storeName && (r += e.storeName + "/"), r;
  }
  function iI() {
    return (iI = Ws(
      Vs.mark(function e(t) {
        var r, n, o;
        return Vs.wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (((r = {}), t)) for (n in t) r[n] = t[n];
                  (o = r.keyPrefix = oI(t, this._defaultConfig)),
                    (this._dbInfo = r),
                    nI.has(o) || nI.set(o, new Map());
                case 5:
                case "end":
                  return e.stop();
              }
          },
          e,
          this
        );
      })
    )).apply(this, arguments);
  }
  var aI = {
      _driver: "tempStorageWrapper",
      _initStorage: function (e) {
        return iI.apply(this, arguments);
      },
      getItem: function (e, t) {
        var r = this;
        e = HT(e);
        var n = this.ready().then(function () {
          return nI.get(r._dbInfo.keyPrefix).get(e);
        });
        return BT(n, t), n;
      },
      setItem: function (e, t, r) {
        var n = this;
        e = HT(e);
        var o = this.ready().then(function () {
          return (
            void 0 === t && (t = null), nI.get(n._dbInfo.keyPrefix).set(e, t), t
          );
        });
        return BT(o, r), o;
      },
      removeItem: function (e, t) {
        var r = this;
        e = HT(e);
        var n = this.ready().then(function () {
          nI.get(r._dbInfo.keyPrefix)["delete"](e);
        });
        return BT(n, t), n;
      },
      clear: function (e) {
        var t = this,
          r = this.ready().then(function () {
            var e = t._dbInfo.keyPrefix;
            nI.has(e) && nI["delete"](e);
          });
        return BT(r, e), r;
      },
      length: function (e) {
        var t = this,
          r = this.ready().then(function () {
            return nI.get(t._dbInfo.keyPrefix).size;
          });
        return BT(r, e), r;
      },
      keys: function (e) {
        var t = this,
          r = this.ready().then(function () {
            return Us(nI.get(t._dbInfo.keyPrefix).keys());
          });
        return BT(r, e), r;
      },
      dropInstance: function (e, t) {
        var r,
          n = this;
        if (
          ((t = $T.apply(this, arguments)),
          !(e = ("function" != typeof e && e) || {}).name)
        ) {
          var o = this.config();
          (e.name = e.name || o.name),
            (e.storeName = e.storeName || o.storeName);
        }
        return (
          BT(
            (r = e.name
              ? new cT(function (t) {
                  e.storeName
                    ? t(oI(e, n._defaultConfig))
                    : t("".concat(e.name, "/"));
                }).then(function (e) {
                  nI["delete"](e);
                })
              : cT.reject("Invalid arguments")),
            t
          ),
          r
        );
      },
    },
    uI = function (e, t) {
      for (var r, n, o = e.length, i = 0; i < o; ) {
        if (
          (r = e[i]) === (n = t) ||
          ("number" == typeof r && "number" == typeof n && isNaN(r) && isNaN(n))
        )
          return !0;
        i++;
      }
      return !1;
    },
    cI =
      Array.isArray ||
      function (e) {
        return "[object Array]" === Object.prototype.toString.call(e);
      },
    sI = {},
    fI = {},
    lI = { INDEXEDDB: rI, TEMPSTORAGE: aI },
    dI = [lI.INDEXEDDB._driver, lI.TEMPSTORAGE._driver],
    hI = ["dropInstance"],
    pI = ["clear", "getItem", "keys", "length", "removeItem", "setItem"].concat(
      hI
    ),
    vI = {
      description: "",
      driver: dI.slice(),
      name: "localforage",
      size: 4980736,
      storeName: "keyvaluepairs",
      version: 1,
    };
  function yI(e, t) {
    e[t] = function () {
      var r = arguments;
      return e.ready().then(function () {
        return e[t].apply(e, r);
      });
    };
  }
  function gI() {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      if (t)
        for (var r in t)
          t.hasOwnProperty(r) &&
            (cI(t[r])
              ? (arguments[0][r] = t[r].slice())
              : (arguments[0][r] = t[r]));
    }
    return arguments[0];
  }
  var bI = new ((function () {
    function e(t) {
      for (var r in (ks(this, e), lI))
        if (lI.hasOwnProperty(r)) {
          var n = lI[r],
            o = n._driver;
          (this[r] = o), sI[o] || this.defineDriver(n);
        }
      (this._defaultConfig = gI({}, vI)),
        (this._config = gI({}, this._defaultConfig, t)),
        (this._driverSet = null),
        (this._initDriver = null),
        (this._ready = !1),
        (this._dbInfo = null),
        this._wrapLibraryMethodsWithReady(),
        this.setDriver(this._config.driver)["catch"](function () {});
    }
    return (
      Rs(e, [
        {
          key: "config",
          value: function (e) {
            if ("object" === Ms(e)) {
              if (this._ready)
                return new Error(
                  "Can't call config() after localforage has been used."
                );
              for (var t in e) {
                if (
                  ("storeName" === t && (e[t] = e[t].replace(/\W/g, "_")),
                  "version" === t && "number" != typeof e[t])
                )
                  return new Error("Database version must be a number.");
                this._config[t] = e[t];
              }
              return (
                !("driver" in e) ||
                !e.driver ||
                this.setDriver(this._config.driver)
              );
            }
            return "string" == typeof e ? this._config[e] : this._config;
          },
        },
        {
          key: "defineDriver",
          value: function (e, t, r) {
            var n = new cT(function (t, r) {
              try {
                var n = e._driver,
                  o = new Error(
                    "Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"
                  );
                if (!e._driver) return void r(o);
                for (
                  var i = pI.concat("_initStorage"), a = 0, u = i.length;
                  a < u;
                  a++
                ) {
                  var c = i[a];
                  if ((!uI(hI, c) || e[c]) && "function" != typeof e[c])
                    return void r(o);
                }
                !(function () {
                  for (
                    var t = function (e) {
                        return function () {
                          var t = new Error(
                              "Method ".concat(
                                e,
                                " is not implemented by the current driver"
                              )
                            ),
                            r = cT.reject(t);
                          return BT(r, arguments[arguments.length - 1]), r;
                        };
                      },
                      r = 0,
                      n = hI.length;
                    r < n;
                    r++
                  ) {
                    var o = hI[r];
                    e[o] || (e[o] = t(o));
                  }
                })();
                var s = function (r) {
                  sI[n], (sI[n] = e), (fI[n] = r), t();
                };
                "_support" in e
                  ? e._support && "function" == typeof e._support
                    ? e._support().then(s, r)
                    : s(!!e._support)
                  : s(!0);
              } catch (e) {
                r(e);
              }
            });
            return WT(n, t, r), n;
          },
        },
        {
          key: "driver",
          value: function () {
            return this._driver || null;
          },
        },
        {
          key: "getDriver",
          value: function (e, t, r) {
            var n = sI[e]
              ? cT.resolve(sI[e])
              : cT.reject(new Error("Driver not found."));
            return WT(n, t, r), n;
          },
        },
        {
          key: "ready",
          value: function (e) {
            var t = this,
              r = t._driverSet.then(function () {
                return (
                  null === t._ready && (t._ready = t._initDriver()), t._ready
                );
              });
            return WT(r, e, e), r;
          },
        },
        {
          key: "setDriver",
          value: function (e, t, r) {
            var n = this;
            cI(e) || (e = [e]);
            var o = this._getSupportedDrivers(e);
            function i() {
              n._config.driver = n.driver();
            }
            function a(e) {
              return (
                n._extend(e),
                i(),
                (n._ready = n._initStorage(n._config)),
                n._ready
              );
            }
            var u =
              null !== this._driverSet
                ? this._driverSet["catch"](function () {
                    return cT.resolve();
                  })
                : cT.resolve();
            return (
              (this._driverSet = u
                .then(function () {
                  var e = o[0];
                  return (
                    (n._dbInfo = null),
                    (n._ready = null),
                    n.getDriver(e).then(function (e) {
                      (n._driver = e._driver),
                        i(),
                        n._wrapLibraryMethodsWithReady(),
                        (n._initDriver = (function (e) {
                          return function () {
                            var t = 0;
                            return (function r() {
                              for (; t < e.length; ) {
                                var o = e[t];
                                return (
                                  t++,
                                  (n._dbInfo = null),
                                  (n._ready = null),
                                  n.getDriver(o).then(a)["catch"](r)
                                );
                              }
                              i();
                              var u = new Error(
                                "No available storage method found."
                              );
                              return (
                                (n._driverSet = cT.reject(u)), n._driverSet
                              );
                            })();
                          };
                        })(o));
                    })
                  );
                })
                ["catch"](function () {
                  i();
                  var e = new Error("No available storage method found.");
                  return (n._driverSet = cT.reject(e)), n._driverSet;
                })),
              WT(this._driverSet, t, r),
              this._driverSet
            );
          },
        },
        {
          key: "supports",
          value: function (e) {
            return !!fI[e];
          },
        },
        {
          key: "_extend",
          value: function (e) {
            gI(this, e);
          },
        },
        {
          key: "_getSupportedDrivers",
          value: function (e) {
            for (var t = [], r = 0, n = e.length; r < n; r++) {
              var o = e[r];
              this.supports(o) && t.push(o);
            }
            return t;
          },
        },
        {
          key: "_wrapLibraryMethodsWithReady",
          value: function () {
            for (var e = 0, t = pI.length; e < t; e++) yI(this, pI[e]);
          },
        },
        {
          key: "createInstance",
          value: function (t) {
            return new e(t);
          },
        },
      ]),
      e
    );
  })())();
  (Date.prototype.kUtilFormat = function (e) {
    var t = {
      "M+": this.getUTCMonth() + 1,
      "d+": this.getUTCDate(),
      "H+": this.getUTCHours(),
      "h+": this.getUTCHours() % 12 || 12,
      "m+": this.getUTCMinutes(),
      "s+": this.getUTCSeconds(),
      "q+": Math.floor((this.getUTCMonth() + 3) / 3),
      "S+": this.getUTCMilliseconds(),
    };
    for (var r in (/(y+)/.test(e) &&
      (e = e.replace(
        RegExp.$1,
        (this.getUTCFullYear() + "").substr(4 - RegExp.$1.length)
      )),
    t))
      new RegExp("(" + r + ")").test(e) &&
        (e = e.replace(
          RegExp.$1,
          1 == RegExp.$1.length
            ? t[r]
            : ("000" + t[r]).substr(("000" + t[r]).length - RegExp.$1.length)
        ));
    return e;
  }),
    String.prototype.startsWith ||
      (String.prototype.startsWith = function (e) {
        return 0 == this.indexOf(e);
      });
  var mI, xI;
  function wI(e) {
    var t = e ? new Date(e) : new Date(),
      r = "yyyy-MM-dd HH:mm:ss.SSSZ",
      n = {
        "M+": t.getUTCMonth() + 1,
        "d+": t.getUTCDate(),
        "H+": t.getUTCHours(),
        "h+": t.getUTCHours() % 12 || 12,
        "m+": t.getUTCMinutes(),
        "s+": t.getUTCSeconds(),
        "q+": Math.floor((t.getUTCMonth() + 3) / 3),
        "S+": t.getUTCMilliseconds(),
      };
    for (var o in (/(y+)/.test(r) &&
      (r = r.replace(
        RegExp.$1,
        (t.getUTCFullYear() + "").substr(4 - RegExp.$1.length)
      )),
    n))
      new RegExp("(" + o + ")").test(r) &&
        (r = r.replace(
          RegExp.$1,
          1 == RegExp.$1.length
            ? n[o]
            : ("000" + n[o]).substr(("000" + n[o]).length - RegExp.$1.length)
        ));
    return r;
  }
  function SI(e) {
    return e === xI;
  }
  function AI(e) {
    return e !== xI;
  }
  function OI(e) {
    return null === e;
  }
  mI =
    "object" === ("undefined" == typeof window ? "undefined" : Ms(window))
      ? window
      : {};
  var EI = {
    "[object Function]": "function",
    "[object AsyncFunction]": "function",
    "[object String]": "string",
    "[object Object]": "object",
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object Array]": "array",
  };
  function TI(e) {
    return OI(e) || SI(e) ? String(e) : EI[{}.toString.call(e)] || "object";
  }
  function II(e) {
    return "function" === TI(e);
  }
  function kI(e) {
    return "string" === TI(e);
  }
  function CI(e) {
    return "object" === TI(e);
  }
  function _I(e) {
    return "boolean" === TI(e);
  }
  function jI(e) {
    return "number" === TI(e);
  }
  function MI(e) {
    return Array.isArray ? Array.isArray(e) : "array" === TI(e);
  }
  function LI(e) {
    if (null == e) return [];
    if (MI(e)) return e;
    var t = Ms(e.length),
      r = Ms(e);
    if (
      "number" !== t ||
      e.alert ||
      "string" === r ||
      ("function" === r && (!("item" in e) || "number" !== t))
    )
      return [e];
    for (var n = [], o = 0, i = e.length; o < i; o++) n[o] = e[o];
    return n;
  }
  var RI,
    NI,
    DI = { debug: !1, showConsoleError: !1 };
  function PI() {
    return RI;
  }
  function FI(e) {
    RI = e;
  }
  function UI(e, t, r, n) {
    if (DI.debug && NI && II(NI.log)) {
      var o = wI(new Date().getTime()),
        i = LI(arguments);
      NI.log(["[", o, "] ", i].join(""));
    }
  }
  function BI(e, t, r, n) {
    if ((DI.debug || DI.showConsoleError) && NI && II(NI.error)) {
      var o = wI(new Date().getTime()),
        i = LI(arguments);
      NI.error(["[", o, "] ", i].join(""));
    }
  }
  function WI(e, t, r, n) {
    if (DI.debug && NI && II(NI.warn)) {
      var o = wI(new Date().getTime()),
        i = LI(arguments);
      NI.warn(["[", o, "] ", i].join(""));
    }
  }
  function HI(e, t, r, n) {
    if (DI.debug && NI && II(NI.info)) {
      var o = wI(new Date().getTime()),
        i = LI(arguments);
      NI.info(["[", o, "] ", i].join(""));
    }
  }
  mI &&
    AI(mI.console) &&
    (II((NI = mI.console).log) && II(NI.error)
      ? (RI = {
          log: UI,
          error: BI,
          info: HI,
          warn: WI,
          debug: function (e, t, r, n) {
            if (DI.debug && NI && II(NI.debug)) {
              var o = wI(new Date().getTime()),
                i = LI(arguments);
              NI.debug(["[", o, "] ", i].join(""));
            }
          },
        })
      : ((NI = !1), (RI = !1)));
  var $I = {
      queue: [],
      doNextStarted: !1,
      timer: null,
      pushToDo: function (e, t, r) {
        $I.queue.push({ obj: e, method: t, args: r });
      },
      doNext: function () {
        if ($I.doNextStarted)
          if (0 != $I.queue.length) {
            var e = $I.queue[0],
              t = e.obj,
              r = e.method,
              n = e.args;
            if (($I.queue.splice(0, 1), t && II(t[r]))) {
              var o = !1;
              if (n.length > 2) {
                var i = n[n.length - 2],
                  a = n[n.length - 1];
                II(i) &&
                  II(a) &&
                  ((n[n.length - 2] = function () {
                    try {
                      i.apply(t, arguments);
                    } catch (Ts) {}
                    $I.timer = setTimeout($I.doNext, 0);
                  }),
                  (n[n.length - 1] = function () {
                    try {
                      a.apply(t, arguments);
                    } catch (Ts) {}
                    $I.timer = setTimeout($I.doNext, 0);
                  }),
                  (o = !0));
              }
              try {
                t[r].apply(t, n);
              } catch (u) {}
              o || ($I.timer = setTimeout($I.doNext, 0));
            } else if (null === t && II(r)) {
              try {
                r.apply(null, n);
              } catch (c) {}
              $I.timer = setTimeout($I.doNext, 0);
            } else
              UI("not invoke a function: " + r),
                ($I.timer = setTimeout($I.doNext, 0));
          } else $I.stop();
        else $I.stop();
      },
      start: function () {
        $I.doNextStarted ||
          (($I.doNextStarted = !0), ($I.timer = setTimeout($I.doNext, 0)));
      },
      stop: function () {
        clearTimeout($I.timer),
          ($I.timer = null),
          ($I.doNextStarted = !1),
          ($I.queue = []);
      },
    },
    VI = !0,
    GI = !1;
  function zI(e, t, r) {
    if (e) {
      var n,
        o,
        i,
        a = 0,
        u = e.length;
      if (((r = r || null), SI(u) || II(e)))
        for (
          i = Object.keys(e);
          a < i.length && ((n = i[a]), t.call(r, e[n], n, e) !== GI);
          a++
        );
      else for (o = e[0]; a < u && t.call(r, o, a, e) !== GI; o = e[++a]);
    }
    return e;
  }
  var YI = {
    fire: function (e) {
      var t,
        r = this;
      (r.exec = r.exec || {}),
        (e = e.toLowerCase()),
        (t = Array.prototype.slice.call(arguments, 1)),
        zI(r.exec[e] || [], function (e) {
          var n = e.f,
            o = e.c || r;
          try {
            n.apply(o, t);
          } catch (Ts) {
            UI(Ts);
          }
        });
    },
    on: function (e, t, r) {
      var n = this;
      (n.exec = n.exec || {}),
        (e = e.toLowerCase()),
        (n.exec[e] = n.exec[e] || []),
        n.exec[e].push({ f: t, c: r });
    },
    off: function (e, t, r) {
      var n = this.exec;
      if (n)
        if (e)
          if (((e = e.toLowerCase()), t))
            for (var o = n[e] || [], i = o.length - 1; i >= 0; i--)
              o[i] === t && o.splice(i, 1);
          else n[e] = null;
        else this.exec = null;
    },
  };
  function JI(e) {
    return null != e && e == e.window;
  }
  function qI(e) {
    e &&
      /\S/.test(e) &&
      (mI.execScript
        ? mI.execScript(e)
        : (function (e) {
            mI.eval.call(mI, e);
          })(e));
  }
  var KI,
    XI = "";
  var ZI,
    QI,
    ek,
    tk,
    rk = navigator,
    nk = !0;
  if ("userAgentData" in rk) {
    var ok = rk.userAgentData,
      ik = [];
    ok.platform &&
      "" != ok.platform &&
      ("brands" in ok && Array.isArray(ok.brands) && ok.brands.length > 0
        ? (ik = ok.brands)
        : "uaList" in ok &&
          Array.isArray(ok.uaList) &&
          ok.uaList.length > 0 &&
          (ik = ok.uaList),
      ik.length > 0 &&
        ((nk = !1),
        (QI = ok.platform.toLowerCase()),
        (ZI = (function (e, t, r) {
          var n,
            o,
            i,
            a,
            u,
            c,
            s,
            f,
            l,
            d = !1,
            h = !1,
            p = !1,
            v = e.mobile,
            y = !1,
            g = XI,
            b = navigator.maxTouchPoints || 0;
          for (o = t.length, n = 0; n < o; n++) {
            var m = t[n].brand.toLowerCase();
            if (m.indexOf("chrome") >= 0) {
              (p = !0), (g = t[n].version);
              break;
            }
            if (m.indexOf("edge") >= 0) {
              (d = !0), (g = t[n].version);
              break;
            }
            if (m.indexOf("opera") >= 0) {
              (h = !0), (g = t[n].version);
              break;
            }
          }
          return (
            p || d || h || ((p = !0), (g = "100")),
            (i = /windows/g.test(r)),
            (a = /mac/g.test(r)),
            (u = /linux/g.test(r)),
            (c = /android/g.test(r)),
            (s = /harmony/g.test(r)),
            (f = /(chromeos|chrome\sos)/g.test(r)),
            (l = /iphone/g.test(r)),
            i || c || u || l || (y = /macintel/g.test(r) && b > 1),
            (c || s || l || y) && (v = !0),
            {
              bUseUserAgent: !1,
              bWin: i,
              bMac: a,
              bLinux: u,
              bAndroid: c,
              bHarmonyOS: s,
              bChromeOS: f,
              bIE: !1,
              bEdge: d,
              bUC: !1,
              bPlaybook: !1,
              bBlackBerry: !1,
              bHuaWeiBrowser: !1,
              bOpera: h,
              bFirefox: !1,
              bChrome: p,
              bJSDom: !1,
              biPhone: l,
              biPad: y,
              bPad: c && !e.mobile,
              bSafari: !1,
              bMobile: v,
              strBrowserVersion: g,
              bHTML5Edition: !0,
              IEVersion: 0,
              IEMode: 0,
            }
          );
        })(ok, ik, QI))));
  }
  nk &&
    (ek || (ek = rk.userAgent.toLowerCase()),
    tk || (tk = rk.platform.toLowerCase()),
    (ZI = (function (e, t) {
      var r,
        n = e.toLowerCase(),
        o = t.toLowerCase(),
        i = /harmonyos/g.test(n);
      "linux" == o &&
        n.indexOf("windows nt") >= 0 &&
        ((o = "harmonyos"), (i = !0));
      var a = !i && /cros/.test(n),
        u = (!i && /android/g.test(n)) || /android/g.test(o),
        c = /iphone/g.test(n) || /iphone/g.test(o),
        s = /macintosh/.test(n),
        f = navigator.maxTouchPoints || 0,
        l = /ipad/g.test(n) || ((s || "macintel" == o) && f > 1),
        d = /ucweb|ucbrowser/g.test(n),
        h = !d && /nexus/g.test(n) && /version\/[\d.]+.*safari\//g.test(n),
        p = /playbook/g.test(n),
        v = /hp-tablet/g.test(n),
        y = /blackberry|bb10/g.test(n),
        g = /symbian/g.test(n),
        b = /windows phone/g.test(n),
        m = /mobile/g.test(n),
        x = /arm64|aarch64/g.test(n),
        w = /mips64/g.test(n),
        S = /huaweibrowser/g.test(n),
        A = /jsdom/g.test(n),
        O = p || l || v,
        E = !O && !a && (c || h || y || g || b || u || i || m),
        T = !E && !O && !a,
        I = T && /win32|win64|windows/.test(o),
        k = I && /win64|x64/.test(n),
        C = T && /mac68k|macppc|macintosh|macintel/.test(n),
        _ = T && /linux/.test(o),
        j = "win64" == o || /wow64|x86_64|win64|x64/.test(n) || x || w,
        M = /wow64/g.test(n),
        L = GI,
        R = /opera|opr/g.test(n),
        N = /360se/g.test(n),
        D = /maxthon/g.test(n),
        P = /tencenttraveler|qqbrowser/g.test(n),
        F = /the world/g.test(n),
        U = /metasr/g.test(n),
        B = /avant/g.test(n),
        W = /firefox|fxios/g.test(n),
        H = /gecko/g.test(n),
        $ = !(W || S) && /edge\/|edga\/|edgios\/|edg\//g.test(n),
        V = !(y || p || d || R || $ || S || A) && /chrome|crios/g.test(n),
        G = !1,
        z = 0,
        Y = 0,
        J = XI;
      if (I && !$ && !W && !V) {
        var q = n.indexOf("msie "),
          K = n.indexOf("trident"),
          X = n.indexOf("rv:");
        G = -1 != q || -1 != K || -1 != X;
      }
      if (
        (!(C || c || l || I || y || p || h) ||
          d ||
          R ||
          $ ||
          G ||
          W ||
          ((r = n.match(/version\/([\d.]+).*safari\//)) &&
            (y || p || h || ((L = VI), (V = GI)), (J = r[1]))),
        $)
      ) {
        var Z = n.indexOf("edge/");
        Z > -1
          ? (Z += 5)
          : (Z = n.indexOf("edg/")) > -1
          ? (Z += 4)
          : (Z = n.indexOf("edga/")) > -1
          ? (Z += 5)
          : (Z = n.indexOf("edgios/")) > -1 && (Z += 7),
          Z > -1 &&
            (r = (J = n.slice(Z)).indexOf(" ")) > -1 &&
            (J = J.slice(0, r));
      } else if (W)
        if ((r = n.indexOf("firefox/")) > -1) {
          var Q = (r = n.slice(r + 8)).indexOf(" ");
          Q > -1 && (r = r.slice(0, Q)),
            (J = r),
            (Q = r.indexOf(".")) > -1 && (r = J.slice(0, Q));
        } else
          (c || l) &&
            (r = n.indexOf("fxios/")) > -1 &&
            (J = r = (r = n.slice(r + 6)).slice(0, r.indexOf(" ")));
      else if (G) {
        var ee = n.indexOf("msie "),
          te = n.indexOf("trident"),
          re = n.indexOf("rv:");
        -1 != ee
          ? (r = (r = n.slice(ee + 5)).slice(0, r.indexOf(";")))
          : -1 != re
          ? (r = (r = (r = n.slice(re + 3)).slice(0, r.indexOf(";"))).slice(
              0,
              r.indexOf(")")
            ))
          : -1 != te && (r = (r = n.slice(te + 7)).slice(0, r.indexOf(";"))),
          (J = r);
      } else if (L) (r = J.indexOf(".")) > -1 && (r = J.slice(0, r));
      else if (d)
        (r = n.indexOf("ucweb")) > -1
          ? (J = n.slice(r + 5))
          : (r = n.indexOf("ucbrowser/")) > -1 &&
            (r = (J = n.slice(r + 10)).indexOf(" ")) > -1 &&
            (J = J.slice(0, r));
      else if (R)
        (r = n.indexOf("version/")) > -1
          ? (J = n.slice(r + 8))
          : (r = n.indexOf("opr/")) > -1 && (J = n.slice(r + 4));
      else if (g) (r = n.indexOf("browserng/")) > -1 && (J = n.slice(r + 10));
      else if (b) (r = n.indexOf("iemobile/")) > -1 && (J = n.slice(r + 9));
      else if (V) {
        var ne = n.indexOf("chrome/");
        ne > -1
          ? (r = (J = n.slice(ne + 7)).indexOf(" ")) > -1 && (J = J.slice(0, r))
          : (ne = n.indexOf("crios/")) > -1 &&
            (r = (J = n.slice(ne + 6)).indexOf(" ")) > -1 &&
            (J = J.slice(0, r)),
          (r = J.indexOf(".")) > -1 && (r = J.slice(0, r));
      } else if (S) {
        var oe = n.indexOf("huaweibrowser");
        oe > -1 &&
          (r = (J = n.slice(oe + 14)).indexOf(" ")) > -1 &&
          (J = J.slice(0, r));
      } else if (A) {
        var ie = n.indexOf("jsdom");
        ie > -1 &&
          (r = (J = n.slice(ie + 6)).indexOf(" ")) > -1 &&
          (J = J.slice(0, r));
      }
      if ($ || G) {
        var ae = window.document;
        ae && ae.documentMode
          ? (z = ae.documentMode)
          : ((z = 5),
            ae.compatMode && "CSS1Compat" == ae.compatMode && (z = 7)),
          G && (Y = parseInt(J));
      }
      return (
        (C || _) &&
          ((j = !0),
          C &&
            (r = n.match(/mac os x (\d+)(_|\.)(\d+)/)) &&
            r.length > 3 &&
            ((10 == r[1] && r[3] < 14) || r[1] < 10) &&
            (j = !1)),
        I || C || _ || x || w || (E = !0),
        {
          bUseUserAgent: !0,
          bWin: I,
          bMac: C,
          bLinux: _,
          bMobile: E,
          bPad: O,
          bChromeOS: a,
          bHarmonyOS: i,
          bArm64: x,
          bMips64: w,
          bEmbed: x || w,
          bAndroid: u,
          biPhone: c,
          biPad: l,
          bWin64: k,
          bWOW64: M,
          bOSx64: j,
          bIE: G,
          bEdge: $,
          bChrome: V,
          bFirefox: W,
          bSafari: L,
          bOpera: R,
          bNexus: h,
          bUC: d,
          b360SE: N,
          bMaxthon: D,
          bTencentTraveler: P,
          bTheWorld: F,
          bMetaSr: U,
          bAvant: B,
          bHuaWeiBrowser: S,
          bJSDom: A,
          bGecko: H,
          bHTML5Edition: !0,
          strBrowserVersion: J,
          IEVersion: Y,
          IEMode: z,
        }
      );
    })(ek, tk)));
  var ak =
    null === (KI = null == mI ? void 0 : mI.location) || void 0 === KI
      ? void 0
      : KI.protocol;
  function uk(e) {
    return ZI.bGecko && "mousewheel" === e ? "DOMMouseScroll" : e;
  }
  function ck(e, t, r) {
    var n = uk(t);
    e && e.addEventListener(n, r, !1);
  }
  function sk(e, t, r) {
    var n = uk(t);
    e && e.removeEventListener(n, r, !1);
  }
  function fk(e) {
    var t = e || mI.event;
    t.preventDefault && t.preventDefault(),
      t.stopPropagation && t.stopPropagation(),
      (t.returnValue = !1),
      (t.cancelBubble = !0);
  }
  function lk(e, t) {
    var r = mI.document.createEvent("HTMLEvents");
    r.initEvent(e, VI, VI), t.dispatchEvent && t.dispatchEvent(r);
  }
  ak || (ak = "http:"),
    (ZI.protocol = ak),
    (ZI.bSSL = "https:" === ak),
    (ZI.bFileSystem = "https:" !== ak && "http:" !== ak);
  var dk,
    hk,
    pk,
    vk,
    yk = mI.document,
    gk = [],
    bk = gk.push,
    mk = gk.slice,
    xk = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
    wk = function () {
      hk();
    };
  function Sk(e, t, r, n) {
    var o,
      i,
      a,
      u = t && t.ownerDocument,
      c = t ? t.nodeType : 9;
    if (
      ((r = r || []),
      "string" != typeof e || !e || (1 !== c && 9 !== c && 11 !== c))
    )
      return r;
    if (
      !n &&
      ((t ? t.ownerDocument || t : yk) !== pk && hk(t),
      (t = t || pk),
      11 !== c && (a = xk.exec(e)))
    )
      if ((o = a[1])) {
        if (9 === c) {
          if (!(i = t.getElementById(o))) return r;
          if (i.id === o) return r.push(i), r;
        } else if (u && (i = u.getElementById(o)) && vk(t, i) && i.id === o)
          return r.push(i), r;
      } else {
        if (a[2]) return bk.apply(r, t.getElementsByTagName(e)), r;
        if ((o = a[3]) && t.getElementsByClassName)
          return bk.apply(r, t.getElementsByClassName(o)), r;
      }
    return r;
  }
  bk.apply(mk.call(yk.childNodes), yk.childNodes),
    (hk = Sk.setDocument =
      function (e) {
        var t,
          r = e ? e.ownerDocument || e : yk;
        return r !== pk && 9 === r.nodeType && r.documentElement
          ? (yk !== (pk = r) &&
              (t = pk.defaultView) &&
              t.top !== t &&
              (t.addEventListener
                ? t.addEventListener("unload", wk, !1)
                : t.attachEvent && t.attachEvent("onunload", wk)),
            (vk = function (e, t) {
              if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
              return !1;
            }),
            pk)
          : pk;
      }),
    (Sk.contains = function (e, t) {
      return (e.ownerDocument || e) !== pk && hk(e), vk(e, t);
    }),
    (Sk.error = function (e) {
      throw new Error("Syntax error: " + e);
    }),
    (dk = Sk.getText =
      function (e) {
        var t,
          r = "",
          n = 0,
          o = e.nodeType;
        if (o) {
          if (1 === o || 9 === o || 11 === o) {
            if ("string" == typeof e.textContent) return e.textContent;
            for (e = e.firstChild; e; e = e.nextSibling) r += dk(e);
          } else if (3 === o || 4 === o) return e.nodeValue;
        } else for (; (t = e[n++]); ) r += dk(t);
        return r;
      }),
    hk();
  var Ak = {
      encodeChars:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      decodeChars: [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
        58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8,
        9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1,
        -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1,
      ],
    },
    Ok = {
      UTF16ToUTF8: function (e) {
        for (var t, r, n = [], o = e.length, i = 0; i < o; i++) {
          var a = e.charCodeAt(i);
          if (a > 0 && a <= 127) n.push(e.charAt(i));
          else if (a >= 128 && a <= 2047)
            (t = 192 | ((a >> 6) & 31)),
              (r = 128 | (63 & a)),
              n.push(String.fromCharCode(t), String.fromCharCode(r));
          else if (a >= 2048 && a <= 65535) {
            (t = 224 | ((a >> 12) & 15)), (r = 128 | ((a >> 6) & 63));
            var u = 128 | (63 & a);
            n.push(
              String.fromCharCode(t),
              String.fromCharCode(r),
              String.fromCharCode(u)
            );
          }
        }
        return n.join("");
      },
      UTF8ToUTF16: function (e) {
        var t,
          r,
          n,
          o,
          i = [],
          a = e.length;
        for (t = 0; t < a; t++)
          0 == (((r = e.charCodeAt(t)) >> 7) & 255)
            ? i.push(e.charAt(t))
            : 6 == ((r >> 5) & 255)
            ? ((o = ((31 & r) << 6) | (63 & (n = e.charCodeAt(++t)))),
              i.push(String.fromCharCode(o)))
            : 14 == ((r >> 4) & 255) &&
              ((o =
                ((255 & ((r << 4) | (((n = e.charCodeAt(++t)) >> 2) & 15))) <<
                  8) |
                (((3 & n) << 6) | (63 & e.charCodeAt(++t)))),
              i.push(String.fromCharCode(o)));
        return i.join("");
      },
      encode: function (e) {
        for (
          var t, r, n, o = this.UTF16ToUTF8(e), i = [], a = 0, u = o.length;
          a < u;

        ) {
          if (((t = 255 & o.charCodeAt(a++)), a == u)) {
            i.push(Ak.encodeChars.charAt(t >> 2)),
              i.push(Ak.encodeChars.charAt((3 & t) << 4)),
              i.push("==");
            break;
          }
          if (((r = o.charCodeAt(a++)), a == u)) {
            i.push(Ak.encodeChars.charAt(t >> 2)),
              i.push(Ak.encodeChars.charAt(((3 & t) << 4) | ((240 & r) >> 4))),
              i.push(Ak.encodeChars.charAt((15 & r) << 2)),
              i.push("=");
            break;
          }
          (n = o.charCodeAt(a++)),
            i.push(Ak.encodeChars.charAt(t >> 2)),
            i.push(Ak.encodeChars.charAt(((3 & t) << 4) | ((240 & r) >> 4))),
            i.push(Ak.encodeChars.charAt(((15 & r) << 2) | ((192 & n) >> 6))),
            i.push(Ak.encodeChars.charAt(63 & n));
        }
        return i.join("");
      },
      encodeArray: function (e) {
        for (var t, r, n, o = [], i = 0, a = e.length; i < a; ) {
          if (((t = 255 & e[i++]), i == a)) {
            o.push(Ak.encodeChars.charAt(t >> 2)),
              o.push(Ak.encodeChars.charAt((3 & t) << 4)),
              o.push("==");
            break;
          }
          if (((r = 255 & e[i++]), i == a)) {
            o.push(Ak.encodeChars.charAt(t >> 2)),
              o.push(Ak.encodeChars.charAt(((3 & t) << 4) | ((240 & r) >> 4))),
              o.push(Ak.encodeChars.charAt((15 & r) << 2)),
              o.push("=");
            break;
          }
          (n = 255 & e[i++]),
            o.push(Ak.encodeChars.charAt(t >> 2)),
            o.push(Ak.encodeChars.charAt(((3 & t) << 4) | ((240 & r) >> 4))),
            o.push(Ak.encodeChars.charAt(((15 & r) << 2) | ((192 & n) >> 6))),
            o.push(Ak.encodeChars.charAt(63 & n));
        }
        return o.join("");
      },
      decode: function (e, t) {
        for (var r, n, o, i, a = this, u = [], c = 0, s = e.length; c < s; ) {
          do {
            r = Ak.decodeChars[255 & e.charCodeAt(c++)];
          } while (c < s && -1 == r);
          if (-1 == r) break;
          do {
            n = Ak.decodeChars[255 & e.charCodeAt(c++)];
          } while (c < s && -1 == n);
          if (-1 == n) break;
          t
            ? u.push((r << 2) | ((48 & n) >> 4))
            : u.push(String.fromCharCode((r << 2) | ((48 & n) >> 4)));
          do {
            if (61 == (o = 255 & e.charCodeAt(c++)))
              return t ? u : a.UTF8ToUTF16(u.join(""));
            o = Ak.decodeChars[o];
          } while (c < s && -1 == o);
          if (-1 == o) break;
          t
            ? u.push(((15 & n) << 4) | ((60 & o) >> 2))
            : u.push(String.fromCharCode(((15 & n) << 4) | ((60 & o) >> 2)));
          do {
            if (61 == (i = 255 & e.charCodeAt(c++)))
              return t ? u : a.UTF8ToUTF16(u.join(""));
            i = Ak.decodeChars[i];
          } while (c < s && -1 == i);
          if (-1 == i) break;
          t
            ? u.push(((3 & o) << 6) | i)
            : u.push(String.fromCharCode(((3 & o) << 6) | i));
        }
        return t ? u : a.UTF8ToUTF16(u.join(""));
      },
    },
    Ek = {
      fromUTF16: function (e) {
        for (var t, r = [], n = 0, o = e.length; n < o; )
          (t = e.charCodeAt(n)) >= 1 && t <= 127
            ? r.push(e.charAt(n))
            : t > 2047
            ? (r.push(String.fromCharCode(224 | ((t >> 12) & 15))),
              r.push(String.fromCharCode(128 | ((t >> 6) & 63))),
              r.push(String.fromCharCode(128 | ((t >> 0) & 63))))
            : (r.push(String.fromCharCode(192 | ((t >> 6) & 31))),
              r.push(String.fromCharCode(128 | ((t >> 0) & 63)))),
            n++;
        return r.join("");
      },
      toUTF16: function (e) {
        for (var t, r, n, o = [], i = 0, a = e.length; i < a; )
          switch ((t = e.charCodeAt(i++)) >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
              o.push(e.charAt(i - 1));
              break;
            case 12:
            case 13:
              (r = e.charCodeAt(i++)),
                o.push(String.fromCharCode(((31 & t) << 6) | (63 & r)));
              break;
            case 14:
              (r = e.charCodeAt(i++)),
                (n = e.charCodeAt(i++)),
                o.push(
                  String.fromCharCode(
                    ((15 & t) << 12) | ((63 & r) << 6) | ((63 & n) << 0)
                  )
                );
          }
        return o.join("");
      },
    };
  function Tk(e) {
    if (null == e || "object" != Ms(e)) return e;
    var t, r, n;
    if (e instanceof Date) return (t = new Date()).setTime(e.getTime()), t;
    if (e instanceof Array) {
      for (t = [], n = e.length, r = 0; r < n; r++) t[r] = Tk(e[r]);
      return t;
    }
    if (e instanceof Object) {
      for (r in ((t = {}), e)) e.hasOwnProperty(r) && (t[r] = Tk(e[r]));
      return t;
    }
    return 0;
  }
  function Ik(e) {
    return Math.random()
      .toString(16)
      .substring(2, 2 + e);
  }
  function kk(e) {
    var t = [Ik(8), "-", Ik(4), "-", Ik(4), "-", Ik(4), "-", Ik(8)];
    return e && t.unshift(e), t.join("");
  }
  var Ck =
      Date.now ||
      function () {
        return +new Date();
      },
    _k = function () {
      return "" + Ck();
    };
  function jk() {
    for (var e, t = Ck() % 1e4, r = [], n = 0; n < 5; n++)
      (e = Math.floor(10 * Math.random())),
        0 != n || 0 != e ? r.push(e) : (n = -1);
    return (
      t < 10 ? r.push("000") : t < 100 ? r.push("00") : t < 1e3 && r.push("0"),
      r.push(t),
      r.join("")
    );
  }
  function Mk(e, t) {
    var r;
    for (r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    return e;
  }
  function Lk(e, t, r, n) {
    return new (r || (r = Promise))(function (o, i) {
      function a(e) {
        try {
          c(n.next(e));
        } catch (Ts) {
          i(Ts);
        }
      }
      function u(e) {
        try {
          c(n["throw"](e));
        } catch (Ts) {
          i(Ts);
        }
      }
      function c(e) {
        var t;
        e.done
          ? o(e.value)
          : ((t = e.value),
            t instanceof r
              ? t
              : new r(function (e) {
                  e(t);
                })).then(a, u);
      }
      c((n = n.apply(e, t || [])).next());
    });
  }
  var Rk = !1;
  "wakeLock" in navigator && (Rk = !0);
  var Nk = null;
  function Dk() {
    Rk &&
      (null == Nk
        ? (function () {
            Lk(
              this,
              void 0,
              void 0,
              Vs.mark(function e() {
                return Vs.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.prev = 0),
                            (e.next = 3),
                            navigator.wakeLock.request("screen")
                          );
                        case 3:
                          (Nk = e.sent), (e.next = 9);
                          break;
                        case 6:
                          (e.prev = 6), (e.t0 = e["catch"](0)), (Nk = null);
                        case 9:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[0, 6]]
                );
              })
            );
          })()
        : Nk.release().then(function () {
            Nk = null;
          }));
  }
  function Pk() {
    return Nk;
  }
  var Fk = Array.prototype;
  function Uk(e, t, r) {
    return Fk.filter.call(e, t, r || this);
  }
  function Bk(e, t) {
    return Fk.indexOf.call(t, e);
  }
  function Wk(e) {
    var t,
      r,
      n = [],
      o = e.length;
    for (t = 0; t < o; t++) {
      for (r = t + 1; r < o; r++) e[t] === e[r] && (r = ++t);
      n.push(e[t]);
    }
    return n;
  }
  var Hk = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/;
  function $k(e, t) {
    var r,
      n = [];
    for (r = 0; r < e.length; r++) {
      var o = e[r];
      o &&
        "." !== o &&
        (".." === o
          ? n.length && ".." !== n[n.length - 1]
            ? n.pop()
            : t && n.push("..")
          : n.push(o));
    }
    return n;
  }
  function Vk(e) {
    var t = "/" === e.charAt(0),
      r = "/" === e.slice(-1);
    return (
      (e = $k(
        Uk(e.split("/"), function (e) {
          return !!e;
        }),
        !t
      ).join("/")),
      e || t || (e = "."),
      e && r && (e += "/"),
      (t ? "/" : "") + e
    );
  }
  var Gk = (function () {
      function e() {
        ks(this, e);
      }
      return (
        Rs(e, [
          {
            key: "resolve",
            value: function () {
              var e,
                t,
                r,
                n = "",
                o = arguments,
                i = !1;
              for (t = o.length - 1; t >= 0 && !i; t--)
                kI((r = o[t])) &&
                  r &&
                  ((n = r + "/" + n), (i = "/" === r.charAt(0)));
              return (
                (e = $k(
                  Uk(n.split("/"), function (e) {
                    return !!e;
                  }),
                  !i
                ).join("/")),
                (i ? "/" : "") + e || "."
              );
            },
          },
          {
            key: "join",
            value: function () {
              return Vk(
                Uk(LI(arguments), function (e) {
                  return e && kI(e);
                }).join("/")
              );
            },
          },
          {
            key: "relative",
            value: function (e, t) {
              (e = Vk(e)), (t = Vk(t));
              var r,
                n,
                o = Uk(e.split("/"), function (e) {
                  return !!e;
                }),
                i = [],
                a = Uk(t.split("/"), function (e) {
                  return !!e;
                }),
                u = Math.min(o.length, a.length);
              for (r = 0; r < u && o[r] === a[r]; r++);
              for (n = r; r < o.length; ) i.push(".."), r++;
              return (i = i.concat(a.slice(n))).join("/");
            },
          },
          {
            key: "basename",
            value: function (e, t) {
              var r;
              return (
                (r = (e.match(Hk) || [])[3] || ""),
                t &&
                  r &&
                  r.slice(-1 * t.length) === t &&
                  (r = r.slice(0, -1 * t.length)),
                r
              );
            },
          },
          {
            key: "dirname",
            value: function (e) {
              var t = e.match(Hk) || [],
                r = t[1] || "",
                n = t[2] || "";
              return r || n
                ? (n && (n = n.substring(0, n.length - 1)), r + n)
                : ".";
            },
          },
          {
            key: "extname",
            value: function (e) {
              return (e.match(Hk) || [])[4] || "";
            },
          },
        ]),
        e
      );
    })(),
    zk = {}.hasOwnProperty;
  function Yk(e) {
    if (!e || "object" !== TI(e) || e.nodeType || e.window == e) return GI;
    var t, r;
    try {
      if (
        (r = e.constructor) &&
        !zk(e, "constructor") &&
        !zk(r.prototype, "isPrototypeOf")
      )
        return GI;
    } catch (Ts) {
      return GI;
    }
    for (t in e);
    return SI(t) || zk(e, t);
  }
  var Jk =
    "object" ===
    ("undefined" == typeof HTMLElement ? "undefined" : Ms(HTMLElement));
  function qk(e) {
    return Jk
      ? e instanceof HTMLElement
      : e &&
          "object" === Ms(e) &&
          (1 === e.nodeType || 9 === e.nodeType) &&
          "string" == typeof e.nodeName;
  }
  function Kk(e) {
    var t = e;
    if (qk(e)) for (; !t && t != document.body; ) t = t.parentNode;
    else t = 0;
    return !!t;
  }
  function Xk(e, t) {
    return 0 === e.lastIndexOf(t, 0);
  }
  function Zk(e, t) {
    var r = e.length - t.length;
    return r >= 0 && e.indexOf(t, r) === r;
  }
  function Qk(e) {
    return null == e ? XI : String.prototype.trim.call(e);
  }
  function eC(e) {
    var t;
    if (e) for (t in e) if (!SI(t)) return !1;
    return !0;
  }
  function tC(e) {
    return kI(e) ? e.replace(/[^\x20-\x7E]/g, "") : e;
  }
  function rC(e, t, r) {
    return e.replace(new RegExp(t, "gi"), r);
  }
  function nC(e) {
    return e.charAt(0).toUpperCase() + e.substr(1);
  }
  var oC = "none",
    iC = {
      getOffset: function (e, t, r) {
        var n, o;
        e = e || mI.event;
        for (
          var i,
            a,
            u = r || e.target,
            c = 0,
            s = 0,
            f = 0,
            l = 0,
            d = !1,
            h = mI.document;
          u && !isNaN(u.offsetLeft) && !isNaN(u.offsetTop);

        )
          (a = u.scrollLeft),
            (i = u.scrollTop),
            "BODY" === u.tagName
              ? d
                ? ((a = 0), (i = 0))
                : ((a |=
                    null === (n = h.documentElement) || void 0 === n
                      ? void 0
                      : n.scrollLeft),
                  (i |=
                    null === (o = h.documentElement) || void 0 === o
                      ? void 0
                      : o.scrollTop))
              : "fixed" === u.style.position && (d = !0),
            (c += u.offsetLeft - a),
            (s += u.offsetTop - i),
            (u = u.offsetParent);
        return (
          t && ((f = t.Left), (l = t.Top)),
          { x: (c = e.clientX - c - f), y: (s = e.clientY - s - l) }
        );
      },
      getElDimensions: function (e, t) {
        var r, n;
        return e
          ? ((r = e.style.display),
            (e.style.display = ""),
            (n = t
              ? {
                  offsetTop: e.offsetTop,
                  offsetLeft: e.offsetLeft,
                  offsetWidth: e.offsetWidth,
                  offsetHeight: e.offsetHeight,
                }
              : {
                  clientTop: e.clientTop,
                  clientLeft: e.clientLeft,
                  clientWidth: e.clientWidth
                    ? e.clientWidth
                    : parseInt(e.style.width)
                    ? parseInt(e.style.width)
                    : 0,
                  clientHeight: e.clientHeight
                    ? e.clientHeight
                    : parseInt(e.style.height)
                    ? parseInt(e.style.height)
                    : 0,
                }),
            (e.style.display = r),
            n)
          : { offsetTop: 0, offsetLeft: 0, offsetWidth: 0, offsetHeight: 0 };
      },
    };
  function aC(e) {
    return document.getElementById(e);
  }
  function uC(e) {
    var t = kI(e) ? aC(e) : e;
    t && (t.length > 0 && (t = t[0]), (t.style.display = oC));
  }
  function cC(e) {
    var t = kI(e) ? aC(e) : e;
    t && (t.length > 0 && (t = t[0]), (t.style.display = XI));
  }
  function sC(e) {
    var t = kI(e) ? aC(e) : e;
    t &&
      (t.length > 0 && (t = t[0]),
      t.style.display === oC ? (t.style.display = XI) : (t.style.display = oC));
  }
  function fC(e) {
    if (e) for (; e.firstChild; ) e.removeChild(e.firstChild);
  }
  function lC(e) {
    return encodeURIComponent(String(e));
  }
  function dC(e) {
    return decodeURIComponent(e.replace(/\+/g, " "));
  }
  var hC = !0,
    pC = document,
    vC = pC && pC.documentElement,
    yC = pC.getElementsByTagName("head")[0] || vC,
    gC = pC.createElement("script").readyState
      ? function (e, t) {
          var r = e.onreadystatechange;
          e.onreadystatechange = function () {
            var n = e.readyState;
            if ("loaded" === n || "complete" === n) {
              (e.onreadystatechange = null), r && r();
              t.call(this, { type: "load", path: [e] });
            } else
              "loading" === n || t.call(this, { type: "error", path: [e] });
          };
        }
      : function (e, t) {
          e.addEventListener("load", t, GI), e.addEventListener("error", t, GI);
        };
  function bC(e, t, r) {
    return mC(e, t, !1, r);
  }
  function mC(e, t, r, n) {
    var o,
      i,
      a = n;
    if ((II(a) || (a = function () {}), kI(e) && e != XI))
      return (
        (o = pC.createElement("script")),
        (i = ["", e].join(XI)),
        (o.src = i),
        t && (o.async = hC),
        (o.charset = "utf-8"),
        gC(o, a),
        r ? yC.appendChild(o) : yC.insertBefore(o, yC.firstChild),
        o
      );
    a();
  }
  function xC(e, t, r) {
    return wC(e, t, !1, r);
  }
  function wC(e, t, r, n) {
    var o = n;
    if ((II(o) || (o = function () {}), ZI.bJSDom)) o("ok");
    else if (MI(e)) {
      var i = e.length,
        a = function (e) {
          e && "load" == e.type
            ? i--
            : (e &&
                "error" == e.type &&
                BI(["Failed to load resource: ", e.target.src, "."].join("")),
              o()),
            i <= 0 && o("ok");
        };
      i <= 0
        ? o("ok")
        : zI(e, function (e) {
            mC(e, t, r, a);
          });
    } else o();
  }
  function SC(e, t) {
    return AC(e, !1, t);
  }
  function AC(e, t, r) {
    var n,
      o = r;
    if ((II(o) || (o = !1), kI(e) && e != XI)) {
      if (!ZI.bJSDom)
        return (
          ((n = pC.createElement("link")).href = e),
          (n.rel = "stylesheet"),
          (n.async = hC),
          o && gC(n, o),
          t ? yC.appendChild(n) : yC.insertBefore(n, yC.firstChild),
          n
        );
      o && o();
    } else o && o();
  }
  function OC(e, t) {
    return EC(e, !1, t);
  }
  function EC(e, t, r) {
    if (ZI.bJSDom) r && r("ok");
    else if (MI(e)) {
      var n = e.length,
        o = function (e) {
          e && "load" == e.type && n--,
            e &&
              "load" != e.type &&
              (e &&
                "error" == e.type &&
                BI(["Failed to load resource: ", e.target.href, "."].join("")),
              r()),
            n <= 0 && r("ok");
        };
      zI(e, function (e) {
        AC(e, t, o);
      });
    } else r && r();
  }
  function TC(e) {
    var t, r;
    if (!ZI.bJSDom) {
      var n = document;
      if (n && kI((r = e.body)) && r != XI) {
        ((t = n.createElement("script")).charset = "utf-8"),
          ZI.bIE ? (t.text = r) : t.appendChild(n.createTextNode(r)),
          e.language ? (t.language = e.language) : (t.language = "javascript"),
          e.type ? (t.type = e.type) : (t.type = "text/javascript");
        var o = n && n.documentElement,
          i = n.getElementsByTagName("head")[0] || o;
        i.insertBefore(t, i.firstChild);
      }
    }
  }
  function IC(e) {
    TC({ body: e });
  }
  function kC(e) {
    TC({ body: e, language: "vbscript", type: "text/vbscript" });
  }
  var CC = (function () {
      function e() {
        ks(this, e),
          (this.nil = undefined),
          (this.bNode = !1),
          (this.noop = function () {}),
          (this.mix = Mk),
          (this.clone = Tk),
          (this.keys = Object.keys),
          (this.now = _k),
          (this.getFormatedNow = wI),
          (this.getRandom = jk),
          (this.guid = kk),
          (this.get = aC),
          (this.show = cC),
          (this.hide = uC),
          (this.toggle = sC),
          (this.empty = fC),
          (this.stringify = mI.JSON.stringify),
          (this.parse = mI.JSON.parse),
          (this.isDef = AI),
          (this.isUndef = SI),
          (this.isUndefined = SI),
          (this.isNull = OI),
          (this.isNaN = isNaN),
          (this.isFunction = II),
          (this.isString = kI),
          (this.isObject = CI),
          (this.isBoolean = _I),
          (this.isNumber = jI),
          (this.isArray = MI),
          (this.type = TI),
          (this.isPlainObject = Yk),
          (this.isDOM = qk),
          (this.isDOMInBody = Kk),
          (this.each = zI),
          (this.getLogger = PI),
          (this.setLogger = FI),
          (this.log = UI),
          (this.error = BI),
          (this.warn = WI),
          (this.info = HI),
          (this.filter = Uk),
          (this.indexOf = Bk),
          (this.uniq = Wk),
          (this.startsWith = Xk),
          (this.endsWith = Zk),
          (this.replaceAll = rC),
          (this.upperCaseFirst = nC),
          (this.removeNonPrintableChar = tC),
          (this.trim = Qk),
          (this.makeArray = LI),
          (this.isEmptyObject = eC),
          (this.Path = new Gk()),
          (this.DOM = iC),
          (this.isWindow = JI),
          (this.globalEval = qI),
          (this.obj = { customEvent: YI }),
          (this.addEventListener = ck),
          (this.removeEventListener = sk),
          (this.stopPropagation = fk),
          (this.fireEvent = lk),
          (this.base64 = Ok),
          (this.utf8 = Ek),
          (this.btoa = function (e) {
            return mI.btoa(e);
          }),
          (this.atob = function (e) {
            return mI.atob(e);
          }),
          (this.asyncQueue = $I),
          (this.sizzle = Sk),
          (this.toggleWakeLock = Dk),
          (this.getWakeLock = Pk),
          (this.urlEncode = lC),
          (this.urlDecode = dC),
          (this.scriptOnload = gC),
          (this.addAllCss = EC),
          (this.getAllCss = OC),
          (this.addCss = AC),
          (this.getCss = SC),
          (this.addScripts = wC),
          (this.getScripts = xC),
          (this.addScript = mC),
          (this.getScript = bC),
          (this.addJS = IC),
          (this.addVBS = kC);
      }
      return (
        Rs(e, [
          {
            key: "debug",
            get: function () {
              return DI.debug;
            },
            set: function (e) {
              DI.debug = e;
            },
          },
          {
            key: "showConsoleError",
            get: function () {
              return DI.debug;
            },
            set: function (e) {
              DI.showConsoleError = e;
            },
          },
        ]),
        e
      );
    })(),
    _C = new CC(),
    jC = _C.clone,
    MC = _C.startsWith,
    LC = _C.each,
    RC = _C.isString,
    NC = /[#\/\?@]/g,
    DC = /[#\?]/g,
    PC = { scheme: 1, userInfo: 2, hostname: 3, port: 4, path: 5 },
    FC = new RegExp(
      "^(?:([\\w\\d+.-]+):)?(?://(?:([^/?#@]*)@)?([\\w\\d\\-\\u0100-\\uffff.+%]*|\\[[^\\]]+\\])(?::([0-9]+))?)?(.+)?$"
    );
  function UC(e, t) {
    return RC(e) && RC(t) ? e.toLowerCase() === t.toLowerCase() : e === t;
  }
  function BC(e, t) {
    return encodeURI(e).replace(t, function (e) {
      return (
        "%" +
        (function (e) {
          return 1 === e.length ? "0" + e : e;
        })(e.charCodeAt(0).toString(16))
      );
    });
  }
  var WC = (function () {
      function e(t) {
        if (
          ((this.scheme = ""),
          (this.userInfo = ""),
          (this.hostname = ""),
          (this.port = ""),
          (this.path = ""),
          t instanceof e)
        )
          return jC(t);
        e.getComponents(t, this);
      }
      return (
        (e.prototype.clone = function () {
          var t = new e(),
            r = this;
          return (
            LC(PC, function (e, n) {
              t[n] = r[n];
            }),
            t
          );
        }),
        (e.prototype.getScheme = function () {
          return this.scheme;
        }),
        (e.prototype.setScheme = function (e) {
          return (this.scheme = e), this;
        }),
        (e.prototype.getHostname = function () {
          return this.hostname;
        }),
        (e.prototype.setHostname = function (e) {
          return (this.hostname = e), this;
        }),
        (e.prototype.setUserInfo = function (e) {
          return (this.userInfo = e), this;
        }),
        (e.prototype.getUserInfo = function () {
          return this.userInfo;
        }),
        (e.prototype.setPort = function (e) {
          return (this.port = e), this;
        }),
        (e.prototype.getPort = function () {
          return this.port;
        }),
        (e.prototype.setPath = function (e) {
          return (this.path = e), this;
        }),
        (e.prototype.getPath = function () {
          return this.path;
        }),
        (e.prototype.isSameOriginAs = function (e) {
          var t = this;
          return (
            UC(t.hostname, e.hostname) &&
            UC(t.scheme, e.scheme) &&
            UC(t.port, e.port)
          );
        }),
        (e.prototype.toString = function (e) {
          var t,
            r,
            n,
            o,
            i,
            a = [],
            u = this;
          return (
            (t = u.scheme) && (a.push(BC(t, NC)), a.push(":")),
            (r = u.hostname) &&
              (a.push("//"),
              (i = u.userInfo) && (a.push(BC(i, NC)), a.push("@")),
              a.push(encodeURIComponent(r)),
              (o = u.port) && (a.push(":"), a.push(o))),
            (n = u.path) &&
              (r && !MC(n, "/") && (n = "/" + n), a.push(BC(n, DC))),
            a.join("")
          );
        }),
        (e.getComponents = function (e, t) {
          var r = (e = e || "").match(FC) || [],
            n = t || {};
          return (
            LC(PC, function (e, t) {
              n[t] = r[e];
            }),
            n
          );
        }),
        e
      );
    })(),
    HC = globalThis.Dynamsoft;
  (HC.LTS = {}),
    (HC.LTS._ = {
      createLtsInstance: function (e) {
        var t,
          r,
          n,
          o,
          i,
          a,
          u,
          c,
          s,
          f,
          l,
          d,
          h,
          p,
          v,
          y,
          g,
          b,
          m,
          x,
          w,
          S,
          A,
          O,
          E,
          T,
          I = e.fetch || gT.fetch,
          k = e.btoa || gT.btoa,
          C = e.atob || gT.atob,
          _ = e.bd,
          j = e.dm,
          M = ["https://mlts.dynamsoft.com/", "https://slts.dynamsoft.com/"],
          L = M,
          R = !1,
          N = cT.resolve(),
          D = e.lf,
          P =
            (e.log &&
              function () {
                try {
                  for (
                    var t = arguments.length, r = new Array(t), n = 0;
                    n < t;
                    n++
                  )
                    r[n] = arguments[n];
                  e.log.apply(null, r);
                } catch (t) {
                  setTimeout(function () {
                    throw t;
                  }, 0);
                }
              }) ||
            function () {},
          F = (_ && P) || function () {},
          U = e.fol,
          B = e.sutlcb,
          W = e.feab,
          H = function (e) {
            return C(C(e.replace(/\n/g, "+").replace(/\s/g, "=")).substring(1));
          },
          $ = function (e) {
            return k(String.fromCharCode(97 + 25 * Math.random()) + k(e))
              .replace(/\+/g, "\n")
              .replace(/=/g, " ");
          },
          V = function () {
            if (S) return S;
            if (gT.crypto) {
              var e = new Uint8Array(36);
              gT.crypto.getRandomValues(e);
              for (var t = "", r = 0; r < 36; ++r) {
                var n = e[r] % 36;
                t += n < 10 ? n : String.fromCharCode(n + 87);
              }
              return t;
            }
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (e) {
                var t = (16 * Math.random()) | 0;
                return ("x" == e ? t : (3 & t) | 8).toString(16);
              }
            );
          },
          G = (function () {
            var e = Ws(
              Vs.mark(function h(e) {
                return Vs.wrap(function (h) {
                  for (;;)
                    switch ((h.prev = h.next)) {
                      case 0:
                        return (
                          (t = e.pd),
                          (r = e.v),
                          (n = r.split(".")[0]),
                          e.dt && (a = e.dt),
                          (o = e.l || ""),
                          (c =
                            "string" != typeof e.os
                              ? JSON.stringify(e.os)
                              : e.os),
                          "string" == typeof (s = e.fn) &&
                            (s = s.substring(0, 50)),
                          e.ls &&
                            e.ls.length &&
                            1 == (L = e.ls).length &&
                            L.push(L[0]),
                          (f =
                            M === L &&
                            (!o || "200001" === o || o.startsWith("200001-"))),
                          (l = e.sp),
                          (d = e.rmk),
                          e.lf && (D = e.lf),
                          e.lsu && (u = S = e.lsu),
                          e.feab && (W = e.feab),
                          (m = e.updl),
                          (x = e.mnet),
                          (w = e.mxet),
                          e.sutlcb && (B = e.sutlcb),
                          (h.next = 21),
                          Y()
                        );
                      case 21:
                        return (h.next = 23), J();
                      case 23:
                        return (h.next = 25), q();
                      case 25:
                        return (h.next = 27), K();
                      case 27:
                        return (
                          (!p ||
                            (p.ltsErrorCode >= 102 && p.ltsErrorCode <= 120)) &&
                            ne(null, !0),
                          h.abrupt("return", { ar: i, cu: u })
                        );
                      case 29:
                      case "end":
                        return h.stop();
                    }
                }, h);
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
          z = (function () {
            var e = Ws(
              Vs.mark(function t() {
                return Vs.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        D || (D = bI);
                      case 1:
                      case "end":
                        return e.stop();
                    }
                }, t);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          Y = (function () {
            var e = Ws(
              Vs.mark(function t() {
                return Vs.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (A =
                            A ||
                            Ws(
                              Vs.mark(function t() {
                                var e, r, n, o, i;
                                return Vs.wrap(
                                  function (t) {
                                    for (;;)
                                      switch ((t.prev = t.next)) {
                                        case 0:
                                          return (t.next = 2), z();
                                        case 2:
                                          return (
                                            (t.next = 4),
                                            D.createInstance({
                                              name: "dynamjssdkhello",
                                            })
                                          );
                                        case 4:
                                          return (
                                            (e = t.sent),
                                            (t.next = 7),
                                            e.setItem(
                                              "dynamjssdkhello",
                                              "available"
                                            )
                                          );
                                        case 7:
                                          return (
                                            (t.next = 9),
                                            D.createInstance({
                                              name: "dynamdlsinfo",
                                            })
                                          );
                                        case 9:
                                          if (
                                            ((y = t.sent),
                                            (g = S
                                              ? null
                                              : k(
                                                  k("v2") +
                                                    String.fromCharCode(
                                                      j.charCodeAt(
                                                        j.length / 2
                                                      ) + 1
                                                    ) +
                                                    k(j)
                                                )),
                                            S)
                                          ) {
                                            t.next = 52;
                                            break;
                                          }
                                          return (
                                            (t.prev = 12),
                                            (t.next = 15),
                                            y.getItem(g)
                                          );
                                        case 15:
                                          if ((r = t.sent)) {
                                            t.next = 26;
                                            break;
                                          }
                                          return (
                                            (t.next = 19),
                                            D.createInstance({
                                              name: "dynamltsinfo",
                                            })
                                          );
                                        case 19:
                                          return (
                                            (n = t.sent),
                                            (t.next = 22),
                                            n.getItem(g)
                                          );
                                        case 22:
                                          if (!(r = t.sent)) {
                                            t.next = 26;
                                            break;
                                          }
                                          return (t.next = 26), y.setItem(g, r);
                                        case 26:
                                          if (!r) {
                                            t.next = 35;
                                            break;
                                          }
                                          return (
                                            (t.t0 = JSON), (t.next = 30), H(r)
                                          );
                                        case 30:
                                          (t.t1 = t.sent),
                                            (o = t.t0.parse.call(t.t0, t.t1)),
                                            (i = Ts(o, 2)),
                                            (u = i[0]),
                                            (h = i[1]);
                                        case 35:
                                          t.next = 39;
                                          break;
                                        case 37:
                                          (t.prev = 37),
                                            (t.t2 = t["catch"](12));
                                        case 39:
                                          if (((t.prev = 39), null != u)) {
                                            t.next = 48;
                                            break;
                                          }
                                          return (
                                            (u = V()),
                                            (t.t3 = y),
                                            (t.t4 = g),
                                            (t.next = 46),
                                            $(JSON.stringify([u, null]))
                                          );
                                        case 46:
                                          (t.t5 = t.sent),
                                            t.t3.setItem.call(t.t3, t.t4, t.t5);
                                        case 48:
                                          t.next = 52;
                                          break;
                                        case 50:
                                          (t.prev = 50),
                                            (t.t6 = t["catch"](39));
                                        case 52:
                                        case "end":
                                          return t.stop();
                                      }
                                  },
                                  t,
                                  null,
                                  [
                                    [12, 37],
                                    [39, 50],
                                  ]
                                );
                              })
                            )()),
                          e.abrupt("return", A)
                        );
                      case 2:
                      case "end":
                        return e.stop();
                    }
                }, t);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          J = (function () {
            var e = Ws(
              Vs.mark(function r() {
                return Vs.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (b = k(
                              String.fromCharCode(o.charCodeAt(0) + 10) +
                                k(t) +
                                k(o) +
                                n +
                                k("" + a)
                            )),
                            (e.next = 3),
                            D.createInstance({
                              name:
                                "dynamdlsuns" +
                                k(k("v2")) +
                                k(
                                  String.fromCharCode(o.charCodeAt(0) + 10) +
                                    k(t) +
                                    k(o) +
                                    n +
                                    k("" + a)
                                ),
                            })
                          );
                        case 3:
                          return (
                            (v = e.sent),
                            (e.prev = 4),
                            (e.next = 7),
                            y.getItem(b)
                          );
                        case 7:
                          (i = e.sent), (e.next = 12);
                          break;
                        case 10:
                          (e.prev = 10), (e.t0 = e["catch"](4));
                        case 12:
                        case "end":
                          return e.stop();
                      }
                  },
                  r,
                  null,
                  [[4, 10]]
                );
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          q = (function () {
            var e = Ws(
              Vs.mark(function v(e) {
                return Vs.wrap(function (v) {
                  for (;;)
                    switch ((v.prev = v.next)) {
                      case 0:
                        return (
                          (E = Date.now()),
                          O ||
                            (O = Ws(
                              Vs.mark(function m() {
                                var v, x, w, A, E, T;
                                return Vs.wrap(
                                  function (m) {
                                    for (;;)
                                      switch ((m.prev = m.next)) {
                                        case 0:
                                          if (
                                            ((m.prev = 0),
                                            (v = {
                                              pd: t,
                                              vm: n,
                                              v: r,
                                              dt: a || "browser",
                                              ed: "javascript",
                                              cu: u,
                                              ad: j,
                                              os: c,
                                              fn: s,
                                            }),
                                            d && (v.rmk = d),
                                            o &&
                                              (-1 != o.indexOf("-")
                                                ? (v.hs = o)
                                                : (v.og = o)),
                                            (x = {}),
                                            !h || S)
                                          ) {
                                            m.next = 19;
                                            break;
                                          }
                                          return (m.next = 8), y.getItem(g);
                                        case 8:
                                          if (!(w = m.sent)) {
                                            m.next = 18;
                                            break;
                                          }
                                          return (
                                            (m.t0 = JSON), (m.next = 13), H(w)
                                          );
                                        case 13:
                                          (m.t1 = m.sent),
                                            (A = m.t0.parse.call(m.t0, m.t1)),
                                            (E = Ts(A, 2)),
                                            (u = E[0]),
                                            (h = E[1]);
                                        case 18:
                                          x["lts-time"] = h;
                                        case 19:
                                          return (
                                            l && (v.sp = l),
                                            (m.next = 22),
                                            cT.race([
                                              Ws(
                                                Vs.mark(function C() {
                                                  var t, r, n, o, a, c, s, l;
                                                  return Vs.wrap(
                                                    function (d) {
                                                      for (;;)
                                                        switch (
                                                          (d.prev = d.next)
                                                        ) {
                                                          case 0:
                                                            if (
                                                              ((t =
                                                                new Date().kUtilFormat(
                                                                  "yyyy-MM-ddTHH:mm:ss.SSSZ"
                                                                )),
                                                              !h || S)
                                                            ) {
                                                              d.next = 9;
                                                              break;
                                                            }
                                                            return (
                                                              (d.t0 = y),
                                                              (d.t1 = g),
                                                              (d.next = 6),
                                                              $(
                                                                JSON.stringify([
                                                                  u,
                                                                  t,
                                                                ])
                                                              )
                                                            );
                                                          case 6:
                                                            (d.t2 = d.sent),
                                                              d.t0.setItem.call(
                                                                d.t0,
                                                                d.t1,
                                                                d.t2
                                                              ),
                                                              (h = t);
                                                          case 9:
                                                            return (
                                                              (n =
                                                                "auth/?ext=" +
                                                                encodeURIComponent(
                                                                  k(
                                                                    JSON.stringify(
                                                                      v
                                                                    )
                                                                  )
                                                                )),
                                                              (o = !1),
                                                              (a = !1),
                                                              (s =
                                                                (function () {
                                                                  var e = Ws(
                                                                    Vs.mark(
                                                                      function t(
                                                                        e
                                                                      ) {
                                                                        var r,
                                                                          n;
                                                                        return Vs.wrap(
                                                                          function (
                                                                            t
                                                                          ) {
                                                                            for (;;)
                                                                              switch (
                                                                                (t.prev =
                                                                                  t.next)
                                                                              ) {
                                                                                case 0:
                                                                                  if (
                                                                                    e
                                                                                  ) {
                                                                                    t.next = 2;
                                                                                    break;
                                                                                  }
                                                                                  return t.abrupt(
                                                                                    "return"
                                                                                  );
                                                                                case 2:
                                                                                  if (
                                                                                    !e.ok
                                                                                  ) {
                                                                                    t.next = 4;
                                                                                    break;
                                                                                  }
                                                                                  return t.abrupt(
                                                                                    "return"
                                                                                  );
                                                                                case 4:
                                                                                  return (
                                                                                    (t.prev = 4),
                                                                                    (t.next = 7),
                                                                                    e.text()
                                                                                  );
                                                                                case 7:
                                                                                  (r =
                                                                                    t.sent) &&
                                                                                    (n =
                                                                                      JSON.parse(
                                                                                        r
                                                                                      ))
                                                                                      .errorCode &&
                                                                                    ((c =
                                                                                      n),
                                                                                    n.errorCode >
                                                                                      100 &&
                                                                                      n.errorCode <
                                                                                        200 &&
                                                                                      ((i =
                                                                                        null),
                                                                                      (o =
                                                                                        !0),
                                                                                      (a =
                                                                                        !0))),
                                                                                    (t.next = 13);
                                                                                  break;
                                                                                case 11:
                                                                                  (t.prev = 11),
                                                                                    (t.t0 =
                                                                                      t[
                                                                                        "catch"
                                                                                      ](
                                                                                        4
                                                                                      ));
                                                                                case 13:
                                                                                case "end":
                                                                                  return t.stop();
                                                                              }
                                                                          },
                                                                          t,
                                                                          null,
                                                                          [
                                                                            [
                                                                              4,
                                                                              11,
                                                                            ],
                                                                          ]
                                                                        );
                                                                      }
                                                                    )
                                                                  );
                                                                  return function (
                                                                    t
                                                                  ) {
                                                                    return e.apply(
                                                                      this,
                                                                      arguments
                                                                    );
                                                                  };
                                                                })()),
                                                              (d.prev = 13),
                                                              (d.next = 16),
                                                              I(L[0] + n, {
                                                                headers: x,
                                                                cache: e
                                                                  ? "reload"
                                                                  : "default",
                                                                mode: "cors",
                                                                timeout: 1e4,
                                                              })
                                                            );
                                                          case 16:
                                                            return (
                                                              (r = d.sent),
                                                              (d.next = 19),
                                                              s(r)
                                                            );
                                                          case 19:
                                                            d.next = 23;
                                                            break;
                                                          case 21:
                                                            (d.prev = 21),
                                                              (d.t3 =
                                                                d["catch"](13));
                                                          case 23:
                                                            if (
                                                              i ||
                                                              (r && r.ok) ||
                                                              o
                                                            ) {
                                                              d.next = 34;
                                                              break;
                                                            }
                                                            return (
                                                              (d.prev = 24),
                                                              (d.next = 30),
                                                              I(L[1] + n, {
                                                                headers: x,
                                                                mode: "cors",
                                                                timeout: 3e4,
                                                              })
                                                            );
                                                          case 27:
                                                            return (
                                                              (r = d.sent),
                                                              (d.next = 30)
                                                            );
                                                          case 30:
                                                            d.next = 34;
                                                            break;
                                                          case 32:
                                                            (d.prev = 32),
                                                              (d.t4 =
                                                                d["catch"](24));
                                                          case 34:
                                                            if (
                                                              i ||
                                                              (r && r.ok) ||
                                                              o
                                                            ) {
                                                              d.next = 45;
                                                              break;
                                                            }
                                                            return (
                                                              (d.prev = 35),
                                                              (d.next = 38),
                                                              I(L[0] + n, {
                                                                headers: x,
                                                                mode: "cors",
                                                                timeout: 3e4,
                                                              })
                                                            );
                                                          case 38:
                                                            return (
                                                              (r = d.sent),
                                                              (d.next = 41),
                                                              s(r)
                                                            );
                                                          case 41:
                                                            d.next = 45;
                                                            break;
                                                          case 43:
                                                            (d.prev = 43),
                                                              (d.t5 =
                                                                d["catch"](35));
                                                          case 45:
                                                            if (
                                                              !c ||
                                                              151 !=
                                                                c.errorCode ||
                                                              S
                                                            ) {
                                                              d.next = 57;
                                                              break;
                                                            }
                                                            return (
                                                              y.removeItem(g),
                                                              y.removeItem(b),
                                                              (u = V()),
                                                              (v.cu = u),
                                                              (h = void 0),
                                                              (n =
                                                                "auth/?ext=" +
                                                                encodeURIComponent(
                                                                  k(
                                                                    JSON.stringify(
                                                                      v
                                                                    )
                                                                  )
                                                                )),
                                                              (d.next = 54),
                                                              I(L[0] + n, {
                                                                headers: x,
                                                                mode: "cors",
                                                                timeout: 3e4,
                                                              })
                                                            );
                                                          case 54:
                                                            return (
                                                              (r = d.sent),
                                                              (d.next = 57),
                                                              s(r)
                                                            );
                                                          case 57:
                                                            return (
                                                              (function () {
                                                                if (
                                                                  !r ||
                                                                  !r.ok
                                                                ) {
                                                                  var e;
                                                                  a &&
                                                                    y.setItem(
                                                                      b,
                                                                      ""
                                                                    ),
                                                                    c
                                                                      ? 111 ==
                                                                        c.errorCode
                                                                        ? (e =
                                                                            c.message)
                                                                        : ((e =
                                                                            c.message.trim()).endsWith(
                                                                            "."
                                                                          ) ||
                                                                            (e +=
                                                                              "."),
                                                                          (e =
                                                                            "An error occurred during authorization: ".concat(
                                                                              e,
                                                                              f
                                                                                ? " [Contact Dynamsoft](https://www.dynamsoft.com/company/contact/) for more information."
                                                                                : " Contact the site administrator for more information."
                                                                            )))
                                                                      : (e = f
                                                                          ? "Failed to connect to the Dynamsoft License Server: network connection error. Check your Internet connection or [contact Dynamsoft](https://www.dynamsoft.com/company/contact/) for more information."
                                                                          : "Failed to connect to the Dynamsoft License Server: network connection error. Check your Internet connection or contact the site administrator for more information.");
                                                                  var t =
                                                                    Error(e);
                                                                  throw (
                                                                    (c &&
                                                                      c.errorCode &&
                                                                      (t.ltsErrorCode =
                                                                        c.errorCode),
                                                                    t)
                                                                  );
                                                                }
                                                              })(),
                                                              (d.next = 61),
                                                              r.text()
                                                            );
                                                          case 61:
                                                            if (
                                                              ((l = d.sent),
                                                              (d.prev = 62),
                                                              h || S)
                                                            ) {
                                                              d.next = 71;
                                                              break;
                                                            }
                                                            return (
                                                              (d.t6 = y),
                                                              (d.t7 = g),
                                                              (d.next = 68),
                                                              $(
                                                                JSON.stringify([
                                                                  u,
                                                                  t,
                                                                ])
                                                              )
                                                            );
                                                          case 68:
                                                            (d.t8 = d.sent),
                                                              d.t6.setItem.call(
                                                                d.t6,
                                                                d.t7,
                                                                d.t8
                                                              ),
                                                              (h = t);
                                                          case 71:
                                                            y.setItem(b, l),
                                                              (d.next = 76);
                                                            break;
                                                          case 74:
                                                            (d.prev = 74),
                                                              (d.t9 =
                                                                d["catch"](62));
                                                          case 76:
                                                            return d.abrupt(
                                                              "return",
                                                              l
                                                            );
                                                          case 77:
                                                          case "end":
                                                            return d.stop();
                                                        }
                                                    },
                                                    C,
                                                    null,
                                                    [
                                                      [13, 21],
                                                      [24, 32],
                                                      [35, 43],
                                                      [62, 74],
                                                    ]
                                                  );
                                                })
                                              )(),
                                              new cT(function (e, t) {
                                                var r;
                                                (r = f
                                                  ? "Failed to connect to the Dynamsoft License Server: network timed out. Check your Internet connection or [contact Dynamsoft](https://www.dynamsoft.com/company/contact/) for more information."
                                                  : "Failed to connect to the Dynamsoft License Server: network timed out. Check your Internet connection or contact the site administrator for more information."),
                                                  setTimeout(
                                                    function () {
                                                      return t(new Error(r));
                                                    },
                                                    i ? 3e3 : 15e3
                                                  );
                                              }),
                                            ])
                                          );
                                        case 22:
                                          (T = m.sent), (i = T), (m.next = 30);
                                          break;
                                        case 26:
                                          (m.prev = 26),
                                            (m.t2 = m["catch"](0)),
                                            (p = m.t2);
                                        case 30:
                                          O = null;
                                        case 31:
                                        case "end":
                                          return m.stop();
                                      }
                                  },
                                  m,
                                  null,
                                  [[0, 26]]
                                );
                              })
                            )()),
                          (v.next = 4),
                          O
                        );
                      case 4:
                      case "end":
                        return v.stop();
                    }
                }, v);
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
          K = (function () {
            var e = Ws(
              Vs.mark(function n() {
                return Vs.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          T ||
                            (T = Ws(
                              Vs.mark(function n() {
                                var e;
                                return Vs.wrap(
                                  function (n) {
                                    for (;;)
                                      switch ((n.prev = n.next)) {
                                        case 0:
                                          if ((F(u), i)) {
                                            n.next = 6;
                                            break;
                                          }
                                          if (R) {
                                            n.next = 5;
                                            break;
                                          }
                                          throw (P(p.message), p);
                                        case 5:
                                          return n.abrupt("return");
                                        case 6:
                                          (e = { dm: j }),
                                            _ && (e.bd = !0),
                                            (e.brtk = !0),
                                            (e.ls = L[0]),
                                            o &&
                                              (-1 != o.indexOf("-")
                                                ? (e.hs = o)
                                                : (e.og = o)),
                                            (e.cu = u),
                                            s && (e.fn = s),
                                            t && (e.pd = t),
                                            r && (e.v = r),
                                            a && (e.dt = a),
                                            c && (e.os = c),
                                            d && (e.rmk = d),
                                            F(i);
                                          try {
                                            (e.ar = i), (e.bafc = !!p);
                                          } catch (n) {}
                                          return (
                                            F(e),
                                            (n.prev = 21),
                                            (n.next = 24),
                                            m(e)
                                          );
                                        case 24:
                                          n.next = 29;
                                          break;
                                        case 26:
                                          (n.prev = 26),
                                            (n.t0 = n["catch"](21)),
                                            F("error updl");
                                        case 29:
                                          return (n.next = 31), X();
                                        case 31:
                                          R || (R = !0), (T = null);
                                        case 33:
                                        case "end":
                                          return n.stop();
                                      }
                                  },
                                  n,
                                  null,
                                  [[21, 26]]
                                );
                              })
                            )()),
                          (e.next = 3),
                          T
                        );
                      case 3:
                      case "end":
                        return e.stop();
                    }
                }, n);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          X = (function () {
            var e = Ws(
              Vs.mark(function t() {
                var e, r, n;
                return Vs.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (e = new Date()),
                          (r = e.kUtilFormat("yyyy-MM-ddTHH:mm:ss.SSSZ")),
                          (t.next = 4),
                          w && w()
                        );
                      case 4:
                        if (((n = t.sent), F(n), !(n && n < r))) {
                          t.next = 12;
                          break;
                        }
                        if (!p) {
                          t.next = 11;
                          break;
                        }
                        throw new Error(
                          "Failed to connect to the Dynamsoft License Server. The cached license has expired. Please get connected to the network as soon as possible or contact the site administrator for more information."
                        );
                      case 11:
                        throw new Error(
                          "Your system date and time appear to have been changed, causing the license to fail. Please correct the system data and time and try again."
                        );
                      case 12:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          Z = (function () {
            var e = Ws(
              Vs.mark(function t() {
                var e, r, n, o, i, a;
                return Vs.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (!((e = new Date()).getTime() < E + 36e4)) {
                          t.next = 3;
                          break;
                        }
                        return t.abrupt("return");
                      case 3:
                        return (
                          (r = e.kUtilFormat("yyyy-MM-ddTHH:mm:ss.SSSZ")),
                          (t.next = 6),
                          x()
                        );
                      case 6:
                        return (n = t.sent), (t.next = 9), w && w();
                      case 9:
                        if (!((o = t.sent) && o < r)) {
                          t.next = 17;
                          break;
                        }
                        return (t.next = 13), q(!0);
                      case 13:
                        return (t.next = 15), K();
                      case 15:
                        t.next = 18;
                        break;
                      case 17:
                        n &&
                          n < r &&
                          ((i = new Date(e.getTime())).setMinutes(
                            e.getMinutes() - 6
                          ),
                          (a = i.kUtilFormat("yyyy-MM-ddTHH:mm:ss.SSSZ")),
                          h < a &&
                            q().then(function () {
                              return K();
                            }));
                      case 18:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })(),
          Q = null,
          ee = new cT(function (e) {
            Q = function () {
              (ee.isPending = !1), (ee.isFulfilled = !0), e();
            };
          }),
          te = null,
          re = (function () {
            var e = Ws(
              Vs.mark(function t(e, r, n, o) {
                var i;
                return Vs.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (r) {
                            e.next = 4;
                            break;
                          }
                          return (e.next = 3), ne(n);
                        case 3:
                          return e.abrupt("return");
                        case 4:
                          if (
                            ((e.prev = 4),
                            !r.startsWith("{") || !r.endsWith("}"))
                          ) {
                            e.next = 11;
                            break;
                          }
                          return (e.next = 8), W(r);
                        case 8:
                          (i = e.sent), (e.next = 12);
                          break;
                        case 11:
                          i = r;
                        case 12:
                          if (!i) {
                            e.next = 19;
                            break;
                          }
                          return F("bs " + n), (e.next = 16), v.setItem(n, i);
                        case 16:
                          F("ss " + n), (e.next = 20);
                          break;
                        case 19:
                          F("ept ecpt");
                        case 20:
                          e.next = 24;
                          break;
                        case 22:
                          (e.prev = 22), (e.t0 = e["catch"](4));
                        case 24:
                          if (!o) {
                            e.next = 29;
                            break;
                          }
                          return F("bd " + n), (e.next = 28), ne(n, 2 == o);
                        case 28:
                          F("sd " + n);
                        case 29:
                          te && clearTimeout(te),
                            (te = setTimeout(
                              Ws(
                                Vs.mark(function t() {
                                  return Vs.wrap(function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          return (e.next = 2), ne();
                                        case 2:
                                        case "end":
                                          return e.stop();
                                      }
                                  }, t);
                                })
                              ),
                              36e4
                            ));
                        case 31:
                        case "end":
                          return e.stop();
                      }
                  },
                  t,
                  null,
                  [[4, 22]]
                );
              })
            );
            return function (t, r, n, o) {
              return e.apply(this, arguments);
            };
          })(),
          ne = (function () {
            var e = Ws(
              Vs.mark(function t(e, r) {
                return Vs.wrap(function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        return (
                          (N = N.then(
                            Ws(
                              Vs.mark(function n() {
                                var t, o, i, a, c, s, f, l, d, p, b, m;
                                return Vs.wrap(
                                  function (n) {
                                    for (;;)
                                      switch ((n.prev = n.next)) {
                                        case 0:
                                          return (
                                            (n.prev = 0), (n.next = 3), v.keys()
                                          );
                                        case 3:
                                          if (
                                            ((t = n.sent),
                                            r ||
                                              (ee.isFulfilled
                                                ? e &&
                                                  (t = t.filter(function (t) {
                                                    return t < e;
                                                  }))
                                                : e && t.includes(e)
                                                ? (t = [e])
                                                : ((t = []),
                                                  F("Unexpected null key"))),
                                            t.length)
                                          ) {
                                            n.next = 7;
                                            break;
                                          }
                                          return n.abrupt("return");
                                        case 7:
                                          o = 0;
                                        case 8:
                                          if (!(o < t.length / 1e3)) {
                                            n.next = 74;
                                            break;
                                          }
                                          (i = t.slice(1e3 * o, 1e3 * (o + 1))),
                                            (a = []),
                                            (c = 0);
                                        case 12:
                                          if (!(c < i.length)) {
                                            n.next = 21;
                                            break;
                                          }
                                          return (
                                            (n.t0 = a),
                                            (n.next = 16),
                                            v.getItem(i[c])
                                          );
                                        case 16:
                                          (n.t1 = n.sent),
                                            n.t0.push.call(n.t0, n.t1);
                                        case 18:
                                          ++c, (n.next = 12);
                                          break;
                                        case 21:
                                          if (
                                            ((h = new Date().kUtilFormat(
                                              "yyyy-MM-ddTHH:mm:ss.SSSZ"
                                            )),
                                            S)
                                          ) {
                                            n.next = 40;
                                            break;
                                          }
                                          return (n.next = 25), y.getItem(g);
                                        case 25:
                                          if (!(s = n.sent)) {
                                            n.next = 34;
                                            break;
                                          }
                                          return (
                                            (n.t2 = JSON), (n.next = 30), H(s)
                                          );
                                        case 30:
                                          (n.t3 = n.sent),
                                            (f = n.t2.parse.call(n.t2, n.t3)),
                                            (l = Ts(f, 1)),
                                            (u = l[0]);
                                        case 34:
                                          return (
                                            (n.t4 = y),
                                            (n.t5 = g),
                                            (n.next = 38),
                                            $(JSON.stringify([u, h]))
                                          );
                                        case 38:
                                          (n.t6 = n.sent),
                                            n.t4.setItem.call(n.t4, n.t5, n.t6);
                                        case 40:
                                          (n.prev = 40),
                                            (d = L[0] + "verify/v2"),
                                            h &&
                                              !S &&
                                              (d +=
                                                "?ltstime=" +
                                                encodeURIComponent(h)),
                                            (p = void 0);
                                          try {
                                            p = I(d, {
                                              method: "POST",
                                              body: a.join(";"),
                                              keepalive: !0,
                                            });
                                          } finally {
                                            !ee.isFulfilled && PT && Q();
                                          }
                                          return (
                                            (b = void 0),
                                            (n.prev = 46),
                                            (n.next = 49),
                                            p
                                          );
                                        case 49:
                                          b = n.sent;
                                        case 50:
                                          return (
                                            (n.prev = 50),
                                            ee.isFulfilled || Q(),
                                            n.finish(50)
                                          );
                                        case 53:
                                          if (!b.ok) {
                                            n.next = 63;
                                            break;
                                          }
                                          m = 0;
                                        case 55:
                                          if (!(m < i.length)) {
                                            n.next = 61;
                                            break;
                                          }
                                          return (
                                            (n.next = 58), v.removeItem(i[m])
                                          );
                                        case 58:
                                          ++m, (n.next = 55);
                                          break;
                                        case 61:
                                          n.next = 64;
                                          break;
                                        case 63:
                                          throw new Error(
                                            "verify failed. Status Code: " +
                                              b.status
                                          );
                                        case 64:
                                          n.next = 71;
                                          break;
                                        case 66:
                                          throw (
                                            ((n.prev = 66),
                                            (n.t7 = n["catch"](40)),
                                            ee.isFulfilled || Q(),
                                            U && (U(n.t7), (U = null)),
                                            n.t7)
                                          );
                                        case 71:
                                          ++o, (n.next = 8);
                                          break;
                                        case 74:
                                          B && B(), (n.next = 79);
                                          break;
                                        case 77:
                                          (n.prev = 77), (n.t8 = n["catch"](0));
                                        case 79:
                                        case "end":
                                          return n.stop();
                                      }
                                  },
                                  n,
                                  null,
                                  [
                                    [0, 77],
                                    [40, 66],
                                    [46, , 50, 53],
                                  ]
                                );
                              })
                            )
                          )),
                          (t.next = 3),
                          N
                        );
                      case 3:
                        return t.abrupt("return", t.sent);
                      case 4:
                      case "end":
                        return t.stop();
                    }
                }, t);
              })
            );
            return function (t, r) {
              return e.apply(this, arguments);
            };
          })(),
          oe = (function () {
            var e = Ws(
              Vs.mark(function t() {
                return Vs.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), Y();
                      case 2:
                        return e.abrupt("return", u);
                      case 3:
                      case "end":
                        return e.stop();
                    }
                }, t);
              })
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
        return { i: G, c: Z, s: re, p: ee, u: oe, caret: X };
      },
    }),
    (HC.Lib.Uri = WC);
})();
(function (dynam, nil) {
  "use strict";
  var lib = dynam.Lib,
    win = window,
    _fetch_ver = 20230615;

  if (dynam._fetch_ver) {
    if (dynam._fetch_ver >= _fetch_ver) {
      return;
    }
  }
  dynam._fetch_ver = _fetch_ver;

  if (win.fetch) {
    return;
  }

  var bIE6_9 =
      Dynamsoft.navInfoSync.bIE &&
      parseInt(Dynamsoft.navInfoSync.strBrowserVersion) <= 9,
    bIE6_10 =
      Dynamsoft.navInfoSync.bIE &&
      parseInt(Dynamsoft.navInfoSync.strBrowserVersion) <= 10,
    each = lib.each,
    rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|widget)$/,
    STATE_READY = 1,
    STATE_OK = 2,
    STATE_ABORT = 3,
    OK_CODE = 200,
    NO_CONTENT_CODE = 204,
    MULTIPLE_CHOICES = 300,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UN_AUTH_REQUEST = 401,
    FORBIDDEN_REQUEST = 403,
    NOT_FOUND_CODE = 404,
    NO_CONTENT_CODE2 = 1223,
    SERVER_ERR = 500,
    ERR_NAME_NOT_RESOLVED = 12007,
    ERR_CANNOT_CONNECT = 12029,
    ERR_NO_RESPONSE = 2,
    _strOpenErr = "open error: ",
    _strSendErr = "send error: ",
    simulatedLocation = new lib.Uri(location.href),
    isLocal =
      simulatedLocation && rlocalProtocol.test(simulatedLocation.getScheme()),
    XDomainRequest_ = false, //bIE6_9 && win.XDomainRequest,
    createStandardXHR = function () {
      try {
        return new win.XMLHttpRequest();
      } catch (e) {}
      // return undefined;
    },
    createActiveXHR = function () {
      try {
        var http = false;
        // code for IE9,IE8,IE7,IE6,IE5
        each(
          [
            "Msxml2.XMLHTTP.6.0",
            "Msxml2.XMLHTTP",
            "Microsoft.XMLHTTP",
            "Msxml2.XMLHTTP.3.0",
            "Msxml3.XMLHTTP",
          ],
          function (item) {
            try {
              if (!http) {
                http = new win.ActiveXObject(item);
                return false;
              }
            } catch (e) {
              lib.error("new xhr error: " + e.message);
            }
          }
        );
        return http;
      } catch (e) {}
      // return undefined;
    },
    supportCORS =
      !isLocal && win.XMLHttpRequest
        ? "withCredentials" in (createStandardXHR() || [])
        : false,
    //Create a xmlHttpRequest object
    _newXhr = win.ActiveXObject
      ? function (crossDomain) {
          if (bIE6_9) return createActiveXHR();

          if (!supportCORS && crossDomain && XDomainRequest_) {
            return new XDomainRequest_();
          }
          return (!isLocal && createStandardXHR()) || createActiveXHR();
        }
      : createStandardXHR,
    isInstanceOfXDomainRequest = function (xhr) {
      return XDomainRequest_ && xhr instanceof XDomainRequest_;
    },
    rnoContent = /^(?:GET|HEAD)$/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    accepts = {
      xml: "application/xml, text/xml",
      html: "text/html",
      text: "text/plain",
      json: "application/json, text/javascript",
      "*": "*/*",
    },
    nilFun = nil,
    nativeFetch;

  // IE<=8 fixed
  if (bIE6_10) {
    nilFun = function () {};
  }

  function _io() {}

  lib.mix(_io.prototype, {
    url: false, //URL to be loaded
    onSuccess: false, //Function that should be called at success
    onError: false, //Function that should be called at error
    onComplete: false,
    method: "GET", //GET or POST
    async: true, // async or sync
    xhrFields: false,
    mimeType: false,
    username: false,
    password: false,
    data: false,
    dataType: "text", //Return type - could be 'blob', 'arraybuffer', 'text', 'xml', 'json', 'user-defined'(which is used for acquiring image data from service)
    headers: false,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    beforeSend: false,
    afterSend: false,
    timeout: 0, // seconds		default 0 means no timeout
    cache: true,
    crossDomain: false,
    retry: 0,

    setRequestHeader: function (name, value) {
      var self = this;
      self.headers[name] = value;
      return self;
    },
    getAllResponseHeaders: function () {
      var self = this;
      return self.state === STATE_OK ? self.responseHeadersString : null;
    },
    getNativeXhr: function () {
      var self = this;
      return self.nativeXhr;
    },
    getResponseHeader: function (name) {
      var match,
        self = this,
        responseHeaders;
      name = name.toLowerCase();
      if (self.state === STATE_OK) {
        if (!(responseHeaders = self.responseHeaders)) {
          responseHeaders = self.responseHeaders = {};
          while ((match = rheaders.exec(self.responseHeadersString))) {
            responseHeaders[match[1].toLowerCase()] = match[2];
          }
        }
        match = responseHeaders[name];
      }
      return match === undefined ? null : match;
    },
    overrideMimeType: function (type) {
      var self = this;
      if (!self.state) {
        self.mimeType = type;
      }
      return self;
    },
    abort: function (statusText) {
      var self = this;
      statusText = statusText || "abort";

      self.state = STATE_ABORT;
      self.status = 0;
      self.statusText = statusText;

      if (self.nativeXhr) {
        self.nativeXhr.abort();
      }

      self._callback();
      return self;
    },
    _ioReady: function (status, statusText) {
      var self = this,
        isSuccess = false;
      if (self.state === STATE_OK || self.state === STATE_ABORT) {
        return;
      }
      if (self.state === STATE_READY) self.state = STATE_OK;
      self.readyState = 4;

      if (
        (status >= OK_CODE && status < MULTIPLE_CHOICES) ||
        status === NOT_MODIFIED
      ) {
        if (status === NOT_MODIFIED) {
          statusText = "not modified";
          isSuccess = true;
        } else {
          statusText = "success";
          isSuccess = true;
        }
      } else {
        if (status < 0) {
          status = 0;
        }
      }

      try {
        if (status >= OK_CODE) self.handleResponseData();
      } catch (e) {
        lib.error(e.stack || e, "error");
        statusText = e.message || "parser error";
      }

      if (status < OK_CODE || !isSuccess) {
        if (self.retry > 0) {
          self.retry = self.retry - 1;
          setTimeout(function () {
            self.sendInternal();
          }, 200);
          return;
        }
      }

      self.status = status;
      self.statusText = statusText;
      self._callback(isSuccess);
    },
    _callback: function (isSuccess) {
      var self = this,
        timeoutTimer = self.timeoutTimer;
      if (timeoutTimer) {
        clearTimeout(timeoutTimer);
        self.timeoutTimer = 0;
      }

      each(
        [isSuccess ? self.onSuccess : self.onError, self.onComplete],
        function (func) {
          if (lib.isFunction(func)) {
            func.apply(self.context, [
              self.responseData,
              self.statusText,
              self,
            ]);
          }
        }
      );

      self.responseData = null;
    },
    handleResponseData: function () {
      var self = this,
        result,
        dataType = self.dataType,
        nativeXhr = self.nativeXhr;

      self.responseText = result = nativeXhr.responseText || "";
      try {
        var xml = nativeXhr.responseXML;
        if (xml && xml.documentElement /*#4958#*/) {
          self.responseXML = xml;
        }
      } catch (e) {}

      self.responseData = result;
    },

    sendInternal: function (opt) {
      //The XMLHttpRequest object is recreated at every call - to defeat Cache problem in IE
      var self = this,
        c,
        i,
        method,
        url,
        dataType,
        contentType,
        nativeXhr,
        xhrFields,
        mimeType,
        requestHeaders,
        hasContent,
        sendContent;

      c = self._setup(opt);

      method = c.method;
      if (lib.isString(method)) {
        method = method.toUpperCase();
      }

      contentType = c.contentType;

      url = c.url;
      dataType = c.dataType;
      mimeType = c.mimeType;

      if (!lib.isString(url)) return;

      self.nativeXhr = nativeXhr = _newXhr(c.crossDomain);
      if (!nativeXhr) return;

      try {
        self.state = STATE_READY;

        if (c.username) {
          nativeXhr.open(method, url, c.async, c.username, c.password);
        } else {
          nativeXhr.open(method, url, c.async);
        }

        if (
          (c.async || Dynamsoft.navInfoSync.bIE) &&
          dataType &&
          dataType != "user-defined" &&
          "responseType" in nativeXhr
        ) {
          try {
            nativeXhr.responseType = dataType;
          } catch (e) {}
        }
      } catch (ex) {
        if (self.state < 2) {
          lib.error(ex.stack || ex, "error");
          self._ioReady(
            -1,
            _strOpenErr +
              (lib.isNumber(ex.number) ? "(" + ex.number + ")" : "") +
              (ex.message || "")
          );
        } else {
          lib.error(ex);
        }

        return;
      }

      xhrFields = c.xhrFields || {};
      if ("withCredentials" in xhrFields) {
        if (!supportCORS) {
          delete xhrFields.withCredentials;
        }
      }

      each(xhrFields, function (val, key) {
        try {
          nativeXhr[key] = val;
        } catch (e) {
          lib.error(e);
        }
      });

      // Override mime type if supported
      if (mimeType && nativeXhr.overrideMimeType) {
        nativeXhr.overrideMimeType(mimeType);
      }

      requestHeaders = c.headers || {};
      var xRequestHeader = requestHeaders["X-Requested-With"];
      if (xRequestHeader === false) {
        delete requestHeaders["X-Requested-With"];
      }

      // ie<10 XDomainRequest does not support setRequestHeader
      if ("setRequestHeader" in nativeXhr) {
        if (contentType) {
          nativeXhr.setRequestHeader("Content-Type", c.contentType);
        }

        nativeXhr.setRequestHeader(
          "Accept",
          dataType && accepts[dataType]
            ? accepts[dataType] + (dataType === "*" ? "" : ", */*; q=0.01")
            : accepts["*"]
        );

        each(requestHeaders, function (val, key) {
          nativeXhr.setRequestHeader(key, val);
        });
      }

      if (!c.cache) {
        nativeXhr.setRequestHeader("If-Modified-Since", "0");
        nativeXhr.setRequestHeader("Cache-Control", "no-cache");
      }

      hasContent = !rnoContent.test(c.method);
      sendContent = (hasContent && c.data) || null;

      if (hasContent && bIE6_9) {
        sendContent = c.data;
      }

      // timeout
      if (c.async && c.timeout > 0) {
        if (c.timeout < 300) c.timeout = 300;
        self.timeoutTimer = setTimeout(function () {
          self.abort("timeout");
        }, c.timeout);
      }

      try {
        self.state = STATE_READY;
        if (lib.isFunction(self.beforeSend)) {
          var r = self.beforeSend(nativeXhr, self);
          if (r === false) {
            self.abort("cancel");
            return;
          }
        }
        nativeXhr.send(sendContent);
        sendContent = null;
        c.data = null;
        if (lib.isFunction(self.afterSend)) self.afterSend(self);
      } catch (e) {
        if (self.state < 2) {
          lib.error(e.stack || e, "error");
          self._ioReady(-1, _strSendErr + (e.message || ""));
        } else {
          lib.error(e);
        }
      }

      if (!c.async || nativeXhr.readyState === 4) {
        self._xhrCallback();
      } else {
        if (isInstanceOfXDomainRequest(nativeXhr)) {
          nativeXhr.onload = function () {
            nativeXhr.readyState = 4;
            nativeXhr.status = OK_CODE;
            self._xhrCallback();
          };
          nativeXhr.onerror = function () {
            nativeXhr.readyState = 4;
            nativeXhr.status = SERVER_ERR;
            self._xhrCallback();
          };
        } else {
          nativeXhr.onreadystatechange = function () {
            self._xhrCallback();
          };
        }
      }
    },

    _xhrCallback: function (evt, abort) {
      //Call a function when the state changes.
      var self = this,
        nativeXhr = self.nativeXhr;

      try {
        if (nativeXhr.readyState === 4 || abort) {
          //Ready State will be 4 when the document is loaded.
          if (isInstanceOfXDomainRequest(nativeXhr)) {
            nativeXhr.onerror = nilFun;
            nativeXhr.onload = nilFun;
          } else {
            nativeXhr.onreadystatechange = nilFun;
          }

          if (abort) {
            if (nativeXhr.readyState !== 4) {
              nativeXhr.abort();
            }
          } else {
            if (!isInstanceOfXDomainRequest(nativeXhr)) {
              self.responseHeadersString = nativeXhr.getAllResponseHeaders();
            }

            var status = nativeXhr.status,
              statusText;
            try {
              statusText = nativeXhr.statusText;
            } catch (e) {
              lib.error("xhr statusText error: ");
              lib.error(e);
              statusText = "";
            }

            self._ioReady(status, statusText);
          }
        }
      } catch (e) {
        lib.error(e.stack || e, "error");

        nativeXhr.onreadystatechange = nilFun;
        if (!abort) {
          self._ioReady(-1, e.message || "process error");
        }
      }
    },

    _setup: function (opt) {
      var self = this,
        dataType,
        i,
        requestHeaders,
        url,
        uri;

      if (opt) {
        self.context = opt.context;
        delete opt.context;

        if (opt instanceof _io) {
          opt = opt.config;
        }

        self.config = opt;

        url = opt.url;

        if (lib.startsWith(url, "http://") || lib.startsWith(url, "https://")) {
          uri = new lib.Uri(url);
        } else {
          if (lib.startsWith(url, "//")) {
            opt.url = url = "http:" + url;
          }

          uri = simulatedLocation.resolve(url);
        }

        if (!opt.dataType) dataType = "text"; //Default return type is 'text'
        else dataType = opt.dataType.toLowerCase();
        opt.dataType = dataType;

        if (!opt.method) opt.method = "GET"; //Default method is GET
        else opt.method = opt.method.toUpperCase();

        if (!("crossDomain" in opt)) {
          opt.crossDomain = !uri.isSameOriginAs(simulatedLocation);
        }

        requestHeaders = opt.headers;
        for (i in requestHeaders) {
          if (lib.isUndefined(requestHeaders[i])) delete requestHeaders[i];
        }
        lib.mix(self, opt);
      }

      self.state = STATE_READY;
      return self;
    },
  });

  // Chrome or Firefox
  if (!nativeFetch) {
    // fetch
    win.fetch = function (url, options) {
      // options
      // {
      //    mode:"cors",			  // mode: cors / no-cors / same-origin
      //    method:"post",
      //    body:'',
      //    headers:{
      //      // set send data type for body
      //    	'content-type': 'application/json'
      // 	  },
      //    dataType: 'blob',       // Return type - could be 'blob', 'arraybuffer', 'text', 'json'
      //                            // NOTE: IE<=9 'blob', 'arraybuffer' -> 'user-defined'

      //    cache:'reload',         // (not supported) http cache: default / no-store / reload / no-cache / force-cache / only-if-cached
      //    redirect: 'manual',     // (not supported) redirect: follow / error / manual
      //    referrer: 'client',     // (not supported) no-referrer / client / URL (string)
      //    credentials:'include'   // (not supported) if carry cookie: omit/ same-origin / include
      // };

      return new Dynamsoft.Lib.Promise(function (
        resolutionFunc,
        rejectionFunc
      ) {
        var get_ret_obj = function (_bOK, _data, _reason, _io) {
            return {
              ok: _bOK,
              text: function () {
                return Dynamsoft.Lib.Promise.resolve(_data);
              },
              json: function () {
                var _json;
                if (Dynamsoft.Lib.isString(_data) && _data != "") {
                  try {
                    _json = Dynamsoft.Lib.parse(_data);
                  } catch (_ex) {
                    return Dynamsoft.Lib.Promise.reject({
                      code: -2443,
                      message: "License server response data error.",
                    });
                  }
                } else {
                  _json = {};
                }
                return Dynamsoft.Lib.Promise.resolve(_json);
              },
            };
          },
          sFun = function (_data, _reason, _io) {
            resolutionFunc(get_ret_obj(true, _data, _reason, _io));
          },
          fFun = function (_data, _reason, _io) {
            var reason = _reason,
              status = _io.status;

            if (
              status == NOT_FOUND_CODE ||
              status == BAD_REQUEST ||
              status == FORBIDDEN_REQUEST ||
              status == UN_AUTH_REQUEST
            ) {
              resolutionFunc(get_ret_obj(false, _data, _reason, _io));

              return;
            } else if (
              status == ERR_NAME_NOT_RESOLVED ||
              status == ERR_CANNOT_CONNECT ||
              status == ERR_NO_RESPONSE
            ) {
              reason = "NetworkError";
            } else {
              var isStr = Dynamsoft.Lib.isString(reason);
              if (!isStr || (isStr && reason == "")) {
                reason = "NetworkError";
              }
            }

            rejectionFunc({
              ok: false,
              code: status,
              message: reason,
              httpCode: status,
              errorString: reason,
            });
          },
          cfg = {
            url: url,
            onSuccess: sFun,
            onError: fFun,
            dataType: "text",
          },
          bContentTypeInHeaders = false;

        if (options) {
          if (options.method) {
            cfg.method = options.method;
          }

          if (options.body) {
            cfg.data = options.body;
          }

          if (options.headers) {
            if (!cfg.headers) {
              cfg.headers = {};
            }

            each(options.headers, function (val, key) {
              if (key.toLowerCase() == "content-type") {
                bContentTypeInHeaders = true;
              }

              cfg.headers[key] = val;
            });
          }

          if (options.dataType) {
            cfg.dataType = options.dataType;
          }

          if (options.contentType) {
            cfg.contentType = options.contentType;
          }
        }

        if (bContentTypeInHeaders) {
          cfg.contentType = false;
        }

        if (cfg.dataType == "blob" && bIE6_9) {
          cfg.mimeType = "text/plain; charset=x-user-defined";
        }

        if (!cfg || !lib.isString(cfg.url)) {
          lib.log("the url is error.");
          return; //Return if a url is not provided
        }

        var self = new _io();
        self.sendInternal(cfg);
      });
    };
  }
})(Dynamsoft);
