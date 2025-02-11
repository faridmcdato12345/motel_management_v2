/*! 20221215 110117 */ !(function () {
    function i(t, e) {
        return (i =
            Object.setPrototypeOf ||
            function i(t, e) {
                return (t.__proto__ = e), t;
            })(t, e);
    }
    function h(t, e) {
        (t.prototype = Object.create(e.prototype)),
            (t.prototype.constructor = t),
            i(t, e);
    }
    function O(t) {
        return Array.isArray
            ? Array.isArray(t)
            : "[object Array]" === Object.prototype.toString.call(t);
    }
    function W(t) {
        if (Array.isArray(t)) {
            for (var e = 0; e < t.length; e++)
                for (var i = e + 1; i < t.length; i++)
                    t[e] === t[i] && (t.splice(i, 1), i--);
            return t;
        }
    }
    function o(t) {
        return "[object Object]" === Object.prototype.toString.call(t);
    }
    function l(t) {
        return "function" == typeof t;
    }
    function a(t) {
        return "string" == typeof t;
    }
    function w(t) {
        return "number" == typeof t && !isNaN(t);
    }
    function u() {
        return "ontouchstart" in document.documentElement;
    }
    function r(t) {
        return (
            t instanceof HTMLElement ||
            "[object ShadowRoot]" === Object.prototype.toString.call(t)
        );
    }
    function c(t, e) {
        if (a(e)) t.style.cssText = e;
        else for (var i in e) t.style[i] = e[i];
    }
    function d(t, e, i, n) {
        if (t)
            return (
                t.addEventListener(e, i, n),
                function () {
                    t.removeEventListener(e, i);
                }
            );
    }
    function _(t, e) {
        for (var i in t)
            e[i] !== undefined && o(t[i]) && o(e[i])
                ? _(t[i], e[i])
                : (e[i] = t[i]);
    }
    function b(t, e) {
        for (var i in t) {
            var n = t[i],
                s = e[i];
            s === undefined
                ? (e[i] = t[i])
                : a(n) && o(s)
                ? (s.visibility = n)
                : o(n) && o(s)
                ? b(t[i], e[i])
                : (e[i] = t[i]);
        }
    }
    function m(t) {
        t && t.stopPropagation
            ? t.stopPropagation()
            : t && (t.cancelBubble = !0);
    }
    function B(t) {
        ("boolean" == typeof t.cancelable && !t.cancelable) ||
            (t.preventDefault ? t.preventDefault() : (t.returnValue = !1));
    }
    function p(t) {
        return "" === t || t === undefined ? null : document.getElementById(t);
    }
    function P(t) {
        for (var e = t.parentNode.children, i = 0; i < e.length; i++)
            if (e[i] === t) return i;
    }
    function R(t, e, i) {
        e === undefined ? i.appendChild(t) : i.insertBefore(t, e);
    }
    function f(t) {
        var e = Math.random().toString(35).substring(2);
        return (
            e.length < 11 && (e += Math.random().toString(35).substring(2)),
            (t = Math.max(Math.min(Math.round(t), 11), 8)),
            (e = e.substring(0, t))
        );
    }
    function v() {
        var t = window;
        if (t) {
            if (t.devicePixelRatio) return t.devicePixelRatio;
            if (t.screen.deviceXDPI && t.screen.logicalXDPI)
                return t.screen.deviceXDPI / t.screen.logicalXDPI;
        }
        return 1;
    }
    var e = function (t) {
            window.Dynamsoft &&
                window.Dynamsoft.Lib.debug &&
                window.Dynamsoft.Lib.log(t);
        },
        n = {
            windowURL: window.URL || window.webkitURL,
            createURL: function (t) {
                return a(t) ? t : n.createURLWithType(t).data;
            },
            createURLWithType: function (t) {
                if (a(t) || undefined === t) return { type: "string", data: t };
                if (t instanceof Blob)
                    return { type: "object", data: n.createObjectURL(t) };
                if (t.imageData && t.imageData instanceof Blob)
                    return {
                        type: "object",
                        data: n.createObjectURL(t.imageData),
                    };
                if (t.imageData) {
                    var e = Object.prototype.toString.call(t.imageData);
                    if (/\[object \w+Array\]/.test(e))
                        return {
                            type: "object",
                            data: n.createObjectURL(new Blob([t.imageData])),
                        };
                } else {
                    e = Object.prototype.toString.call(t);
                    if (/\[object \w+Array\]/.test(e))
                        return {
                            type: "object",
                            data: n.createObjectURL(new Blob([t])),
                        };
                }
                return /data:image\/\w+;base64/.test(t)
                    ? { type: "string", data: t }
                    : { type: "object", data: t };
            },
            createObjectURL: function (t) {
                if (!t) return "";
                t = n.windowURL.createObjectURL(t);
                return e("createObjectURL:" + t), t;
            },
            revokeObjectURL: function (t) {
                e("revokeObjectURL:" + t),
                    a(t) &&
                        0 == t.indexOf("blob:http") &&
                        n.windowURL.revokeObjectURL(t);
            },
        };
    var t = "undefined" != typeof window,
        Y = t ? window : {},
        g = (t && 0 in window.document.documentElement, t && 0 in Y, "click"),
        N = "touchstart",
        X = "touchmove",
        A = "mousedown",
        F = "mousemove",
        H = "mouseup",
        y = "contextmenu",
        V = "resize",
        q = "click",
        s = "mousedown",
        C = "mousemove",
        x = "mouseup",
        Q = "mouseover",
        j = "mouseout",
        K = "dblclick",
        G = "rightclick",
        $ = "contextmenu",
        J = "dragstart",
        Z = "dragmove",
        tt = "dragdone",
        et = "keydown",
        it = "keyup",
        nt = "resize",
        st = "topPageChanged",
        rt = "bufferChanged",
        ot = "resize",
        at = "removePage",
        lt = "fileKeyUp",
        ht = "fileListClick",
        ut = "fileListRightClick",
        ct = "tagKeyUp",
        dt = "tagListClick",
        _t = "tagListRightClick",
        mt = "pageAreaSelected",
        pt = "pageAreaUnselected",
        S = "pageRendered",
        ft = "onDocumentPointerUp",
        vt = "onDocumentPointerMove",
        gt = "onDocumentClick",
        bt = "onSidebarClick",
        yt = "onDrop",
        wt = "_updateFocus",
        Ct = "_canvasVisibilityChanged",
        I = "_SetSelectedIndexes",
        xt = "_documentUp",
        St = "_documentMove",
        It = "_displayedImageChanged",
        kt = "_onReOrderThumbnail",
        Mt = "_changeThumbnailViewProp",
        Bt = "_updateErrorMessage",
        Pt = "_clearSltBox",
        Rt = "_bindSlideComponent",
        Tt = "_unbindSlideComponent",
        Lt = "_canvasTouchstart",
        Et = "_canvasTouchmove",
        Ut = "_canvasTouchend",
        zt = "_canvasMousedown",
        Dt = "_canvasMouseup",
        Ot = "_canvasMousemove",
        Wt = "_canvasMouseOver",
        Yt = "_canvasMouseOut",
        Nt = "_canvasWheel",
        Xt = "_canvasScroll",
        At = "_canvasClick",
        Ft = "_canvasDoubleClick",
        Ht = "_canvasRightClick",
        Vt = "_canvasKeyDown",
        qt = "_canvasKeyUp",
        Qt = "_canvasDragDone",
        jt = "_canvasDefaultCursor",
        Kt = "_showCanvasLoading",
        k = "_viewerResizeUI",
        Gt = "_mouseClickUI",
        $t = "_viewerRightClickUI",
        Jt = "_mouseMoveUI",
        Zt = "_showLatestPage",
        te = "_updatePagesLayout",
        M = "_documentPointerMoveUI",
        T = "_documentPointerUpUI",
        ee = "_documentKeyDownUI",
        ie = "_documentKeyUpUI",
        ne = "_documentClickUI",
        se = "_sideBarClickUI",
        re = "_sidebarStretchStartUI",
        oe = "_fileListClickUI",
        ae = "_fileListRightClickUI",
        le = "_fileListKeyUpUI",
        he = "_addNewFolderUI",
        ue = "_directoryRefreshUI",
        ce = "_fileSelectedUI",
        de = "_tagListClickUI",
        _e = "tagListRightClickUI",
        me = "_tagKeyUpUI",
        pe = "_addNewTagUI",
        fe = "_tagRefreshUI",
        ve = "_tagSelectedUI",
        ge = "_openDefaultTagUI",
        be = "_imageSelectedUI",
        ye = "_thumbnailChangedUI",
        we = "_updateThbItem",
        Ce = "_updateThumbnailPropUI",
        xe = "_scrollToUI",
        Se = "_setViewModeUI",
        L = "_mergeDisplayedUidsUi",
        Ie = "_pagerBlurUI",
        ke = "_pagerChangedUI",
        Me = "_setScrollerSizeUI",
        Be = "_changeCanvasCursorUI",
        Pe = "_tabListClickUI",
        Re = "_closeSaveSettingBoxUI",
        Te = "_customButtonClickUI",
        Le = "_gotoPage",
        Ee = { code: 80030, message: "The metadata is not exist." },
        Ue = (function () {
            function t(t) {
                (this._clickItem = null),
                    (this._clickTimer = null),
                    (this._rightClickItem = null),
                    (this._rightClickTimer = null),
                    (this._mouseDownItem = null),
                    (this._startX = 0),
                    (this._startY = 0),
                    (this._mouseUpItem = null),
                    (this._evtList = []),
                    (this.onClick = null),
                    (this.onRightClick = null),
                    (this.onDoubleClick = null),
                    (this.onMousedown = null),
                    (this.onMousemove = null),
                    (this.onMouseup = null),
                    (this.onTouchstart = null),
                    (this.onTouchmove = null),
                    (this.onTouchend = null),
                    (this.onPointOver = null),
                    (this.onPointOut = null),
                    (this._element = t),
                    this._registerEvents();
            }
            var e = t.prototype;
            return (
                (e._registerEvents = function () {
                    var n = this,
                        t = this._element,
                        e = d(
                            t,
                            "mousedown",
                            function (t) {
                                var e = n._packageEvent(t);
                                (n._mouseDownItem = n.getTarget(t)),
                                    (n._startX = e.clientX),
                                    (n._startY = e.clientY),
                                    null != (t = n.onMousedown) && t.call(n, e),
                                    2 === e.button &&
                                        (n._rightClickItem = n.getTarget(e));
                            },
                            { passive: !1 }
                        );
                    this._evtList.push(e),
                        (e = d(
                            t,
                            "mousemove",
                            function (t) {
                                var e,
                                    t = n._packageEvent(t);
                                null != (e = n.onMousemove) && e.call(n, t);
                            },
                            { passive: !1 }
                        )),
                        this._evtList.push(e),
                        (e = d(t, "mouseup", function (t) {
                            var e,
                                t = n._packageEvent(t);
                            (n._mouseUpItem = n.getTarget(t)),
                                null != (e = n.onMouseup) && e.call(n, t),
                                n.getTarget(t) === n._rightClickItem &&
                                2 === t.button
                                    ? null != (e = n.onRightClick) &&
                                      e.call(n, t)
                                    : n._mouseDownItem === n._mouseUpItem &&
                                      n._clickHandler(t),
                                (n._rightClickItem = null);
                        })),
                        this._evtList.push(e),
                        (e = d(
                            t,
                            "touchstart",
                            function (t) {
                                var e = n._packageEvent(t);
                                (n._mouseDownItem = n.getTarget(t)),
                                    (n._startX = e.clientX),
                                    (n._startY = e.clientY),
                                    null != (t = n.onTouchstart) &&
                                        t.call(n, e),
                                    (n._rightClickTimer = setTimeout(
                                        function () {
                                            var t;
                                            null != (t = n.onRightClick) &&
                                                t.call(n, e),
                                                (n._mouseDownItem = null);
                                        },
                                        500
                                    ));
                            },
                            { passive: !1 }
                        )),
                        this._evtList.push(e),
                        (e = d(
                            t,
                            "touchmove",
                            function (t) {
                                var t = n._packageEvent(t),
                                    e =
                                        (null != (e = n.onTouchmove) &&
                                            e.call(n, t),
                                        Math.abs(t.clientX - n._startX)),
                                    t = Math.abs(t.clientY - n._startY);
                                (5 < e || 5 < t) &&
                                    (clearTimeout(n._rightClickTimer),
                                    (n._mouseDownItem = null));
                            },
                            { passive: !1 }
                        )),
                        this._evtList.push(e),
                        (e = d(t, "touchend", function (t) {
                            var e,
                                t = n._packageEvent(t);
                            (n._mouseUpItem = n.getTarget(t)),
                                null != (e = n.onTouchend) && e.call(n, t),
                                clearTimeout(n._rightClickTimer),
                                n._mouseDownItem === n._mouseUpItem &&
                                    n._clickHandler(t),
                                (n._rightClickItem = null);
                        })),
                        this._evtList.push(e),
                        (e = d(t, "mouseover", function (t) {
                            var e, i;
                            u() ||
                                ((i = t.fromElement) === undefined &&
                                    (i = t.relatedTarget),
                                (e = t.toElement) === undefined &&
                                    (e = t.target),
                                n.getTarget(t, i) !== n.getTarget(t, e) &&
                                    null != (i = n.onPointOver) &&
                                    i.call(n, t));
                        })),
                        this._evtList.push(e),
                        (e = d(t, "mouseout", function (t) {
                            var e, i;
                            u() ||
                                ((i = t.fromElement) === undefined &&
                                    (i = t.target),
                                (e = t.toElement) === undefined &&
                                    (e = t.relatedTarget),
                                n.getTarget(t, i) !== n.getTarget(t, e) &&
                                    null != (i = n.onPointOut) &&
                                    i.call(n, t));
                        })),
                        this._evtList.push(e);
                }),
                (e._unregisterEvents = function () {
                    this._evtList.forEach(function (t) {
                        l(t) && t();
                    }),
                        this._evtList.splice(0);
                }),
                (e._clickHandler = function (t) {
                    var e = this,
                        i = this._packageEvent(t);
                    clearTimeout(this._clickTimer),
                        this.getTarget(t) === this._clickItem
                            ? ((this._clickItem = null),
                              setTimeout(function () {
                                  var t;
                                  null != (t = e.onDoubleClick) && t.call(e, i);
                              }))
                            : this._mouseDownItem === this._mouseUpItem &&
                              ((this._clickItem = this.getTarget(i)),
                              setTimeout(function () {
                                  var t;
                                  null != (t = e.onClick) && t.call(e, i);
                              })),
                        (this._mouseDownItem = null),
                        (this._mouseUpItem = null),
                        (this._clickTimer = setTimeout(function () {
                            e._clickItem = null;
                        }, 500));
                }),
                (e._packageEvent = function (t) {
                    var e,
                        i,
                        n = null == (e = t.changedTouches) ? void 0 : e[0];
                    if (!n) return t;
                    for (i in n) t[i] === undefined && (t[i] = n[i]);
                    return t;
                }),
                (e.getTarget = function (t, e) {
                    return e !== undefined ? e : t.target;
                }),
                (e.dispose = function () {
                    this._unregisterEvents(),
                        (this._element = null),
                        (this._clickItem = null),
                        (this._clickTimer = null),
                        (this._rightClickItem = null),
                        (this._rightClickTimer = null),
                        (this._mouseDownItem = null),
                        (this._mouseUpItem = null),
                        (this.onClick = null),
                        (this.onRightClick = null),
                        (this.onDoubleClick = null),
                        (this.onMousedown = null),
                        (this.onMousemove = null),
                        (this.onMouseup = null),
                        (this.onPointOver = null),
                        (this.onPointOut = null);
                }),
                t
            );
        })(),
        E = (function () {
            function t(t) {
                (this._evtIds = []),
                    (this._oPub = null),
                    (this._bDisposePub = !1),
                    t
                        ? (this._oPub = t)
                        : ((this._oPub = new ze()), (this._bDisposePub = !0));
            }
            var e = t.prototype;
            return (
                (e.getPublishSubscribe = function () {
                    return this._oPub;
                }),
                (e._on = function (t, e) {
                    e = this._oPub.on(t, e);
                    this.push(t, e);
                }),
                (e._emit = function (t) {
                    for (
                        var e,
                            i = arguments.length,
                            n = new Array(1 < i ? i - 1 : 0),
                            s = 1;
                        s < i;
                        s++
                    )
                        n[s - 1] = arguments[s];
                    null != (e = this._oPub) && e.emit.apply(e, [t].concat(n));
                }),
                (e._off = function (t, e) {
                    var i;
                    null != (i = this._oPub) && i.off(t, e);
                }),
                (e._offById = function (t, e) {
                    var i;
                    null != (i = this._oPub) && i.offById(t, e);
                }),
                (e.push = function (t, e) {
                    this._evtIds.push({ name: t, id: e });
                }),
                (e.dispose = function () {
                    if (this._oPub) {
                        for (var t = this._evtIds.length, e = 0; e < t; e++) {
                            var i = this._evtIds[e];
                            this._oPub.offById(i.name, i.id);
                        }
                        this._bDisposePub && this._oPub && this._oPub.dispose();
                    }
                    this._oPub = null;
                }),
                t
            );
        })(),
        ze = (function () {
            function t() {
                this._events = {};
            }
            var e = t.prototype;
            return (
                (e.on = function (t, e) {
                    this._events[t] || (this._events[t] = []);
                    var i = f(10);
                    return this._events[t].push({ fn: e, evtId: i }), i;
                }),
                (e.emit = function (t) {
                    var e = this._events[t];
                    if (!e || 0 === e.length) return !1;
                    for (
                        var i = e.length,
                            n = arguments.length,
                            s = new Array(1 < n ? n - 1 : 0),
                            r = 1;
                        r < n;
                        r++
                    )
                        s[r - 1] = arguments[r];
                    for (var o, a = 0; a < i; a++)
                        null != (o = e[a]) &&
                            (o = o.fn).call.apply(o, [null].concat(s));
                }),
                (e.emitEx = function (t) {
                    var i = this._events[t];
                    if (!i || 0 === i.length) return Promise.resolve(!0);
                    for (
                        var e = i.length,
                            n = Promise.resolve(!0),
                            s = arguments.length,
                            r = new Array(1 < s ? s - 1 : 0),
                            o = 1;
                        o < s;
                        o++
                    )
                        r[o - 1] = arguments[o];
                    if (1 === i.length)
                        return (t =
                            null == (t = i[0])
                                ? void 0
                                : (t = t.fn).call.apply(
                                      t,
                                      [null].concat(r)
                                  )) instanceof Promise
                            ? t
                            : n;
                    for (
                        var a = function a(t) {
                                var e =
                                    null == (t = i[t])
                                        ? void 0
                                        : (t = t.fn).call.apply(
                                              t,
                                              [null].concat(r)
                                          );
                                e instanceof Promise &&
                                    (n = n.then(function () {
                                        return e;
                                    }));
                            },
                            l = 0;
                        l < e;
                        l++
                    )
                        a(l);
                    return n;
                }),
                (e.off = function (t, e) {
                    var i = this._events[t];
                    if (!i) return !1;
                    if (e)
                        for (var n = i.length - 1; 0 <= n; n--) {
                            var s = i[n];
                            s && s.fn === e && i.splice(n, 1), (s = null);
                        }
                    else i && (i.length = 0);
                }),
                (e.offById = function (t, e) {
                    var i = this._events[t];
                    if (!i) return !1;
                    if (e)
                        for (var n = i.length - 1; 0 <= n; n--) {
                            var s = i[n];
                            if (s && s.evtId === e) {
                                i.splice(n, 1);
                                break;
                            }
                            s = null;
                        }
                    else i && (i.length = 0);
                }),
                (e.dispose = function () {
                    for (
                        var t = Object.keys(this._events), e = 0, i = t.length;
                        e < i;
                        e++
                    ) {
                        var n = t[e],
                            n = this._events[n];
                        n && n.splice(0), (n = null);
                    }
                    this._events = {};
                }),
                t
            );
        })(),
        De = (function (a) {
            function t(t, e, i) {
                e = a.call(this, e) || this;
                return (
                    (e.useMyEvent = !0),
                    (e._unbindList = []),
                    (e._customCanvas = null),
                    (e._viewerContainer = null),
                    (e._postfix = t),
                    (e._viewerContainer = i),
                    e
                );
            }
            h(t, a);
            var e = t.prototype;
            return (
                (e.uiEventInit = function () {
                    var i = this,
                        n = function n(t) {
                            var e,
                                t = "#" + t + i._postfix;
                            return null == (e = i._viewerContainer) ||
                                null == (e = e.el)
                                ? void 0
                                : e.querySelector(t);
                        },
                        t = g,
                        e = F,
                        s = H,
                        r = this._unbindList,
                        o = d(
                            window,
                            V,
                            function (e, i) {
                                var n = this,
                                    s = 0,
                                    r = null;
                                return function () {
                                    var t = +new Date();
                                    t - s < i
                                        ? (clearTimeout(r),
                                          (r = setTimeout(function () {
                                              (s = t), e.apply(n);
                                          }, i)))
                                        : ((s = t), e.apply(n));
                                };
                            }.call(this, this._viewerResize, 40)
                        ),
                        e =
                            (r.push(o),
                            (o = d(window, "load", function (t) {
                                i._viewerResize(t);
                            })),
                            r.push(o),
                            (o = d(document, e, function (t) {
                                i._documentMouseMove(t);
                            })),
                            r.push(o),
                            (o = d(document, s, function (t) {
                                i._documentMouseUp(t);
                            })),
                            r.push(o),
                            (o = d(document, "touchmove", function (t) {
                                i._documentMouseMove(t);
                            })),
                            r.push(o),
                            (o = d(document, "touchend", function (t) {
                                i._documentMouseUp(t);
                            })),
                            r.push(o),
                            (o = d(window, "message", function (t) {
                                "up" === t.data.type && i._documentMouseUp();
                            })),
                            r.push(o),
                            (o = d(document, g, function (t) {
                                i._documentClick(t);
                            })),
                            r.push(o),
                            (o = d(document, "keydown", function (t) {
                                a.prototype._emit.call(i, ee, t);
                            })),
                            r.push(o),
                            (o = d(document, "keyup", function (t) {
                                a.prototype._emit.call(i, ie, t);
                            })),
                            r.push(o),
                            this._viewerContainer.el),
                        s =
                            ((o = d(e, "dragstart", function () {
                                return !1;
                            })),
                            r.push(o),
                            (o = d(e, t, function (t) {
                                i._viewerClick(t);
                            })),
                            r.push(o),
                            (o = d(e, y, function (t) {
                                i._viewerRightClick(t);
                            })),
                            r.push(o),
                            (o = d(e, "dragover", function (t) {
                                B(t);
                            })),
                            r.push(o),
                            (o = d(e, "drop", function (t) {
                                i._dropFile(t);
                            })),
                            r.push(o),
                            (o = d(n("navChange"), t, function (t) {
                                i._setSelectedSidetype(t);
                            })),
                            r.push(o),
                            (o = d(n("besides"), t, function (t) {
                                i._sidebarClick(t);
                            })),
                            r.push(o),
                            (o = d(n("stretchBar"), A, function (t) {
                                i._sidebarStretchStart(t);
                            })),
                            r.push(o),
                            (o = d(n("defaultTag"), t, function () {
                                i._openDefaultTag();
                            })),
                            r.push(o),
                            (o = d(n("treeLists"), t, function (t) {
                                i._fileListClick(t);
                            })),
                            r.push(o),
                            (o = d(n("treeLists"), y, function (t) {
                                i._fileListRightClick(t);
                            })),
                            r.push(o),
                            (o = d(n("treeLists"), "keyup", function (t) {
                                i._fileListKeyUp(t);
                            })),
                            r.push(o),
                            (o = d(n("addFolder"), g, function (t) {
                                i._addNewFolder(t);
                            })),
                            r.push(o),
                            (o = d(n("tagLists"), t, function (t) {
                                i._tagListClick(t);
                            })),
                            r.push(o),
                            (o = d(n("tagLists"), y, function (t) {
                                i._tagListRightClick(t);
                            })),
                            r.push(o),
                            (o = d(n("tagLists"), "keyup", function (t) {
                                i._tagListKeyUp(t);
                            })),
                            r.push(o),
                            (o = d(n("addTag"), t, function (t) {
                                i._addNewTag(t);
                            })),
                            r.push(o),
                            n("canvasEventLayer")),
                        e =
                            ((o = d(
                                s,
                                "touchstart",
                                function (t) {
                                    i._canvasTouchStart(t);
                                },
                                { passive: !1 }
                            )),
                            r.push(o),
                            (o = d(s, "mousedown", function (t) {
                                i._canvasMouseDown(t);
                            })),
                            r.push(o),
                            (o = d(
                                s,
                                "touchmove",
                                function (t) {
                                    i._canvasTouchMove(t);
                                },
                                { passive: !1 }
                            )),
                            r.push(o),
                            (o = d(s, "mousemove", function (t) {
                                i._canvasMouseMove(t);
                            })),
                            r.push(o),
                            (o = d(s, "touchend", function (t) {
                                i._canvasTouchEnd(t);
                            })),
                            r.push(o),
                            (o = d(s, "mouseup", function (t) {
                                i._canvasMouseUp(t);
                            })),
                            r.push(o),
                            (o = d(
                                s,
                                "wheel",
                                function (t) {
                                    i._canvasWheel(t);
                                },
                                { passive: !1 }
                            )),
                            r.push(o),
                            (o = d(s, "click", function (t) {
                                m(t);
                            })),
                            r.push(o),
                            new Ue(s));
                    (e.onClick = function (t) {
                        a.prototype._emit.call(i, At, t);
                    }),
                        (e.onRightClick = function (t) {
                            a.prototype._emit.call(i, Ht, t);
                        }),
                        (e.onDoubleClick = function (t) {
                            a.prototype._emit.call(i, Ft, t);
                        }),
                        (e.onPointOver = function (t) {
                            a.prototype._emit.call(i, Wt, t);
                        }),
                        (e.onPointOut = function (t) {
                            a.prototype._emit.call(i, Yt, t);
                        }),
                        (this._customCanvas = e),
                        (e = null),
                        (o = d(n("canvasScroll"), "scroll", function (t) {
                            i._canvasScroll(t);
                        })),
                        r.push(o),
                        (o = d(n("tabList"), t, function (t) {
                            i._tabListClick(t);
                        })),
                        r.push(o),
                        (o = d(n("pagerInput"), "blur", function (t) {
                            i._pagerBlur(t);
                        })),
                        r.push(o),
                        (o = d(n("pagerInput"), "keyup", function (t) {
                            13 === t.keyCode && t.target.blur();
                        })),
                        r.push(o);
                }),
                (e.unbindEvents = function () {
                    this._unbindList.forEach(function (t) {
                        l(t) && t();
                    }),
                        (this._unbindList = []),
                        this._customCanvas &&
                            (this._customCanvas.dispose(),
                            (this._customCanvas = null));
                }),
                (e._viewerResize = function (t) {
                    a.prototype._emit.call(this, k, t);
                }),
                (e._documentMouseUp = function (t) {
                    a.prototype._emit.call(this, T, t),
                        a.prototype._emit.call(this, xt, t),
                        a.prototype._emit.call(this, ft, t);
                }),
                (e._documentMouseMove = function (t) {
                    a.prototype._emit.call(this, M, t),
                        a.prototype._emit.call(this, St, t),
                        a.prototype._emit.call(this, vt, t);
                }),
                (e._documentClick = function (t) {
                    a.prototype._emit.call(this, ne, t),
                        a.prototype._emit.call(this, gt, t);
                }),
                (e._viewerClick = function (t) {
                    a.prototype._emit.call(this, Gt, t);
                }),
                (e._viewerRightClick = function (t) {
                    u() || B(t), a.prototype._emit.call(this, $t, t);
                }),
                (e._viewerMove = function (t) {
                    a.prototype._emit.call(this, Jt, t);
                }),
                (e._dropFile = function (t) {
                    B(t), a.prototype._emit.call(this, yt, t);
                }),
                (e._setSelectedSidetype = function (t) {}),
                (e._sidebarClick = function (t) {
                    m(t),
                        a.prototype._emit.call(this, se),
                        a.prototype._emit.call(this, bt);
                }),
                (e._sidebarStretchStart = function (t) {
                    a.prototype._emit.call(this, re, t);
                }),
                (e._openDefaultTag = function () {
                    a.prototype._emit.call(this, ge);
                }),
                (e._fileListClick = function (t) {
                    a.prototype._emit.call(this, oe, t),
                        a.prototype._emit.call(this, ht, t);
                }),
                (e._fileListRightClick = function (t) {
                    a.prototype._emit.call(this, ae, t),
                        a.prototype._emit.call(this, ut, t);
                }),
                (e._fileListKeyUp = function (t) {
                    a.prototype._emit.call(this, le, t),
                        a.prototype._emit.call(this, lt, t);
                }),
                (e._addNewFolder = function (t) {
                    a.prototype._emit.call(this, he, t);
                }),
                (e._tagListClick = function (t) {
                    a.prototype._emit.call(this, de, t),
                        a.prototype._emit.call(this, dt, t);
                }),
                (e._tagListRightClick = function (t) {
                    a.prototype._emit.call(this, _e, t),
                        a.prototype._emit.call(this, _t, t);
                }),
                (e._tagListKeyUp = function (t) {
                    a.prototype._emit.call(this, me, t),
                        a.prototype._emit.call(this, ct, t);
                }),
                (e._addNewTag = function (t) {
                    a.prototype._emit.call(this, pe, t);
                }),
                (e._canvasTouchStart = function (t) {
                    a.prototype._emit.call(this, Lt, t);
                }),
                (e._canvasTouchMove = function (t) {
                    a.prototype._emit.call(this, Et, t);
                }),
                (e._canvasTouchEnd = function (t) {
                    a.prototype._emit.call(this, Ut, t);
                }),
                (e._canvasMouseDown = function (t) {
                    a.prototype._emit.call(this, zt, t);
                }),
                (e._canvasMouseMove = function (t) {
                    a.prototype._emit.call(this, Ot, t);
                }),
                (e._canvasMouseUp = function (t) {
                    a.prototype._emit.call(this, Dt, t);
                }),
                (e._canvasWheel = function (t) {
                    a.prototype._emit.call(this, Nt, t);
                }),
                (e._canvasScroll = function (t) {
                    a.prototype._emit.call(this, Xt, t);
                }),
                (e._tabListClick = function (t) {
                    a.prototype._emit.call(this, Pe, t);
                }),
                (e._pagerBlur = function (t) {
                    a.prototype._emit.call(this, Ie, t);
                }),
                (e.dispose = function () {
                    a.prototype.dispose.call(this), this.unbindEvents();
                }),
                t
            );
        })(E),
        t = (function () {
            function t(t, e, i) {
                (this._pubsub = null),
                    (this.element = null),
                    (this.containerEl = null),
                    (this.location = ""),
                    (this.visibility = !0),
                    (this.cssStyle = ""),
                    (this.tagName = "div"),
                    (this.name = ""),
                    (this._postfix = t),
                    (this._pubsub = i),
                    (this.element = this._createElement(e));
            }
            var e = t.prototype;
            return (
                (e.bindElement = function (t, e) {
                    e = this._createElement(e);
                    return (
                        (this.containerEl = t), !!e && (t.appendChild(e), !0)
                    );
                }),
                (e.setAttributes = function (t) {
                    return (
                        !!o(t) &&
                        (this._initConfig(t), this._updateAttributes(), !0)
                    );
                }),
                (e._createElement = function (t) {
                    this.element &&
                        (null != (i = this.containerEl) &&
                            null != (e = i.removeChild) &&
                            e.call(i, this.element),
                        (this.element = null)),
                        this._initConfig(t);
                    var e,
                        i = document.createElement(this.tagName);
                    return this._updateAttributes(i), i;
                }),
                (e._initConfig = function (t) {
                    if (!o(t)) return !1;
                    for (var e in t) t[e] !== undefined && (this[e] = t[e]);
                    return !0;
                }),
                (e._updateAttributes = function (t) {
                    return (
                        !!(t = r(t) ? t : this.element) &&
                        ((t.className = this.visibility ? "" : " dvs-disabled"),
                        this.name && t.classList.add("dvs-" + this.name),
                        this.cssStyle && t.classList.add(this.cssStyle),
                        this.name &&
                            (t.id = "".concat(this.name + this._postfix)),
                        this.sequence !== undefined &&
                            ("string" ==
                            typeof (t = null == (t = t) ? void 0 : t.style)
                                .msFlexOrder
                                ? (t.msFlexOrder = this.sequence)
                                : (t.order = this.sequence)),
                        !0)
                    );
                }),
                t
            );
        })(),
        U = (function (n) {
            function t() {
                for (
                    var t = arguments.length, e = new Array(t), i = 0;
                    i < t;
                    i++
                )
                    e[i] = arguments[i];
                return n.call.apply(n, [this].concat(e)) || this;
            }
            return h(t, n), t;
        })(t),
        Oe = (function (n) {
            function t(t, e, i) {
                t = n.call(this, t, e, i) || this;
                return (t.groups = {}), t;
            }
            return h(t, n), t;
        })(t),
        We = (function (n) {
            function t(t, e, i) {
                t = n.call(this, t, e, i) || this;
                return (t.buttons = {}), t._setGroupClass(), t;
            }
            return (
                h(t, n),
                (t.prototype._setGroupClass = function () {
                    var t;
                    null != (t = this.element) &&
                        t.classList.add("dvs-groupType");
                }),
                t
            );
        })(t),
        z = (function (n) {
            function t(t, e, i) {
                t = n.call(this, t, e, i) || this;
                return (
                    (t.onButtonClick = ""),
                    (t.iconClass = ""),
                    (t.text = ""),
                    (t.title = ""),
                    t
                );
            }
            return (
                h(t, n),
                (t.prototype._updateAttributes = function (t) {
                    var e = this;
                    if (!(t = r(t) ? t : this.element)) return !1;
                    (t.className = "ds-dvs-ui-iconfont dvs-"
                        .concat(this.name, " ")
                        .concat(this.cssStyle || "", " ")
                        .concat(this.iconClass || "", " ")
                        .concat(this.visibility ? "" : "dvs-nodisplay")
                        .trim()),
                        (t.id = "".concat(this.name + this._postfix)),
                        this.text &&
                            a(this.text) &&
                            ("input" === this.tagName
                                ? (t.value = this.text || "")
                                : (((i =
                                      document.createElement(
                                          "span"
                                      )).innerText = this.text || ""),
                                  t.appendChild(i)));
                    var i = null == (i = t) ? void 0 : i.style;
                    return (
                        "string" == typeof i.msFlexOrder
                            ? (i.msFlexOrder = this.sequence)
                            : (i.order = this.sequence),
                        this.title && (t.title = this.title),
                        this.onButtonClick
                            ? (t.onclick = function (t) {
                                  e.onButtonClick &&
                                      e._pubsub.emit(Te, e.onButtonClick, t);
                              })
                            : (t.onclick = null),
                        !0
                    );
                }),
                t
            );
        })(t),
        Ye = (function () {
            function t(t) {
                var e = t.el,
                    i = t.sequence,
                    n = t.isFull,
                    s = t.pubsub,
                    t = t.container;
                (this.uid = ""),
                    (this.element = null),
                    (this.sequence = 0),
                    (this.isFull = !1),
                    (this._visibility = !0),
                    (this.uid = f(11)),
                    (this.element = e),
                    (this.sequence = i),
                    (this._pubsub = s),
                    (this.isFull = n),
                    (this._container = t),
                    this._bindElement();
            }
            var e = t.prototype;
            return (
                (e.show = function () {
                    var t;
                    return (
                        !this._visibility &&
                        ((this._visibility = !0),
                        null != (t = this.element) &&
                            null != (t = t.classList) &&
                            t.remove("dvs-nodisplay"),
                        this._pubsub.emit(k),
                        !0)
                    );
                }),
                (e.hide = function () {
                    var t;
                    return (
                        !!this._visibility &&
                        ((this._visibility = !1),
                        null != (t = this.element) &&
                            null != (t = t.classList) &&
                            t.add("dvs-nodisplay"),
                        this._pubsub.emit(k),
                        !0)
                    );
                }),
                (e.dispose = function () {
                    var t, e;
                    for (e in (null == (t = this.element) ||
                        (null != (t = t.parentNode) &&
                            t.removeChild(this.element)),
                    this._pubsub.emit(k),
                    this))
                        delete this[e];
                    return !0;
                }),
                (e._bindElement = function () {
                    var t = this._container;
                    if (!t) return !1;
                    var e = this.element;
                    this.isFull
                        ? e.classList.add("dvs-upper-full")
                        : e.classList.remove("dvs-upper-full"),
                        (e.style.order = String(this.sequence)),
                        (e.style.msFlexOrder = String(this.sequence)),
                        e.classList.add("dvs-customElement"),
                        this._visibility || e.classList.add("dvs-nodisplay"),
                        t.appendChild(e),
                        (this._container = null),
                        this._pubsub.emit(k);
                }),
                t
            );
        })(),
        Ne = (function (s) {
            function t(t) {
                var e = t.postfix,
                    i = t.container,
                    n = t.uiConfig,
                    t = t.pubsub,
                    t = s.call(this, t) || this;
                return (
                    (t._postfix = ""),
                    (t.uiConfig = null),
                    (t._assembledConfig = {}),
                    (t._customElements = {}),
                    (t.contentContainer = null),
                    (t.viewerContainer = null),
                    (t._postfix = e),
                    (t.uiConfig = n),
                    (t.viewerContainer = { el: t.initUi(i) }),
                    t
                );
            }
            h(t, s);
            var e = t.prototype;
            return (
                (e._myQueryById = function (t) {
                    var e;
                    return null == (e = this.viewerContainer) ||
                        null == (e = e.el)
                        ? void 0
                        : e.querySelector("#" + t);
                }),
                (e.initUi = function (t, e) {
                    if (e) {
                        if (!o(e)) return null;
                        b(e, this.uiConfig);
                    }
                    if (!r((t = a(t) ? document.getElementById(t) : t)))
                        return null;
                    (e = this._assembleConfig(this.uiConfig)),
                        (this._assembledConfig = e),
                        (e = new U(this._postfix, { name: "WebViewer" }));
                    return (
                        this._createContainers(
                            {
                                header: {},
                                body: {
                                    showImageArea: {
                                        content: {
                                            topMenu: {},
                                            middle: {
                                                asideMenu: {},
                                                container: {
                                                    viewPort: {
                                                        canvasWrapper: {
                                                            canvasEventLayer:
                                                                {},
                                                            loadingLayer: {
                                                                loadingImage:
                                                                    "img",
                                                            },
                                                        },
                                                        canvasScroll: {
                                                            scrollInner: {},
                                                        },
                                                    },
                                                    videoContainer: {
                                                        videoImage: "img",
                                                    },
                                                    innerThumbnail: {},
                                                },
                                            },
                                            bottomMenu: {},
                                        },
                                    },
                                },
                                hiddenBox: {},
                            },
                            e.element
                        ),
                        t.appendChild(e.element),
                        e.element
                    );
                }),
                (e._createContainers = function (t, e) {
                    for (var i in t) {
                        var n,
                            s = null,
                            r = t[i];
                        (s =
                            "sidebar" !== i
                                ? "hiddenBox" === i
                                    ? this._initHiddenBox()
                                    : this._assembledConfig[i]
                                    ? null ==
                                      (n = this._initToolbarItem(
                                          this._assembledConfig[i]
                                      ))
                                        ? void 0
                                        : n.element
                                    : new U(this._postfix, {
                                          name: i,
                                          tagName: a(r) ? r : undefined,
                                          visibility:
                                              this.uiConfig.toolbars[i] ===
                                                  undefined ||
                                              this.uiConfig.toolbars[i],
                                      }).element
                                : s) &&
                            (o(t[i]) && this._createContainers(r, s),
                            e.appendChild(s));
                    }
                    return !0;
                }),
                (e._initToolbarItem = function (t) {
                    if (!t.visibility) return null;
                    var e,
                        i = new Oe(this._postfix, t, this._oPub);
                    for (e in t.groups) {
                        var n = t.groups[e],
                            n =
                                (n.name || (n.name = e),
                                this._initGroupItem(n));
                        n && i.element.appendChild(n.element);
                    }
                    return i;
                }),
                (e._initGroupItem = function (t) {
                    if (!1 === t.visibility) return null;
                    t.visibility = !0;
                    var e,
                        i = new We(this._postfix, t, this._oPub);
                    for (e in t.buttons) {
                        var n = t.buttons[e],
                            n =
                                (n.name || (n.name = e),
                                this._initButtonItem(n));
                        n &&
                            n.forEach(function (t) {
                                i.element.appendChild(t.element);
                            });
                    }
                    var s = new z(
                            this._postfix,
                            {
                                name: "showBefore",
                                visibility: !0,
                                location: i.name,
                                tagName: "SPAN",
                                iconClass: "ds-dvs-ui-move_right dvs-nodisplay",
                            },
                            this._oPub
                        ),
                        r = new z(
                            this._postfix,
                            {
                                name: "showAfter",
                                visibility: !0,
                                location: i.name,
                                tagName: "SPAN",
                                iconClass: "ds-dvs-ui-move_left dvs-nodisplay",
                            },
                            this._oPub
                        );
                    return (
                        i.element.appendChild(s.element),
                        i.element.appendChild(r.element),
                        i
                    );
                }),
                (e._initButtonItem = function (e) {
                    var i,
                        t,
                        n,
                        s = this;
                    if (!1 !== e.visibility)
                        return (
                            (e.visibility = !0),
                            (i = this.uiConfig.tipsConfig),
                            "pagination" === e.name
                                ? ((t = [
                                      {
                                          name: "pagerInput",
                                          sequence: e.sequence,
                                          tagName: "input",
                                          text: "0",
                                      },
                                      {
                                          name: "pageBreak",
                                          sequence: e.sequence,
                                          tagName: "p",
                                          text: "",
                                      },
                                      {
                                          name: "pagerLabel",
                                          sequence: e.sequence,
                                          tagName: "label",
                                          text: "0",
                                      },
                                  ]),
                                  (n = []),
                                  t.forEach(function (t) {
                                      n.push(
                                          new z(s._postfix, {
                                              visibility: e.visibility,
                                              name: t.name,
                                              sequence: t.sequence,
                                              location: e.location,
                                              text: t.text || "",
                                              tagName: t.tagName,
                                              title: i[e.name],
                                          })
                                      );
                                  }),
                                  n)
                                : (_({ title: i[e.name] }, e),
                                  [new z(this._postfix, e, this._oPub)])
                        );
                }),
                (e._assembleConfig = function (t) {
                    var e,
                        i,
                        n,
                        s,
                        r = {},
                        o = {},
                        a = t.toolbars,
                        l = t.groups,
                        h = t.buttons;
                    for (e in a) {
                        var u = Boolean(a[e]);
                        r[e] = {
                            name: e,
                            visibility: u,
                            groups:
                                (null == (u = a[e]) ? void 0 : u.groups) || {},
                        };
                    }
                    for (i in l) o[i] = l[i];
                    for (n in h) {
                        var c,
                            d = h[n],
                            _ = d.location,
                            m = o[_];
                        m
                            ? ((m.buttons = m.buttons || {}),
                              b((((c = {})[n] = d), c), m.buttons))
                            : this._emit(Bt, {
                                  code: 80024,
                                  message: "The group ".concat(
                                      _,
                                      " is not exist."
                                  ),
                              });
                    }
                    for (s in o) {
                        var p,
                            f = o[s],
                            v = f.location,
                            g = r[v];
                        g
                            ? b((((p = {})[s] = f), p), g.groups)
                            : this._emit(Bt, {
                                  code: 80024,
                                  message: "The toolbar ".concat(
                                      v,
                                      " is not exist."
                                  ),
                              });
                    }
                    return r;
                }),
                (e._initHiddenBox = function () {
                    this.uiConfig;
                    return new U(this._postfix, { name: "hiddenBox" }).element;
                }),
                (e.bindContent = function (t) {
                    var e = this._myQueryById("content" + this._postfix),
                        i = this._myQueryById("header" + this._postfix);
                    if (!t || !i || !e) return !1;
                    var n = document.createElement("div");
                    return (
                        n.setAttribute(
                            "style",
                            "display:flex;flex-direction:column;width:100%;height:100%;"
                        ),
                        (n.id = "contentContainer" + this._postfix),
                        n.appendChild(i),
                        n.appendChild(e),
                        t.appendChild(n),
                        (this.contentContainer = n),
                        !0
                    );
                }),
                (e.unbindContent = function (t) {
                    void 0 === t && (t = !1);
                    var t = null == (t = this.viewerContainer) ? void 0 : t.el,
                        e = this.contentContainer;
                    if (!t || !e) return !1;
                    var i = e.querySelector("#content" + this._postfix),
                        n = e.querySelector("#header" + this._postfix),
                        s = this._myQueryById("showImageArea" + this._postfix);
                    return (
                        n && R(n, t.children[0], t),
                        s && i && s.appendChild(i),
                        e && e.parentNode && e.parentNode.removeChild(e),
                        !(this.contentContainer = null)
                    );
                }),
                (e.createCustomElement = function (t, e, i) {
                    if (
                        (void 0 === e && (e = 0),
                        void 0 === i && (i = !1),
                        !r((t = a(t) ? document.getElementById(t) : t)))
                    )
                        return null;
                    (t = new Ye({
                        el: t,
                        sequence: e,
                        isFull: i,
                        pubsub: this._oPub,
                        container: this._myQueryById(
                            "container" + this._postfix
                        ),
                    })),
                        (e = t.uid);
                    return (this._customElements[e] = t);
                }),
                (e.removeAllCustomElements = function () {
                    for (var t in this._customElements)
                        (this._customElements[t].element = null),
                            (this._customElements[t] = null);
                    this._customElements = null;
                }),
                (e.dispose = function () {
                    s.prototype.dispose.call(this),
                        (this.uiConfig = null),
                        (this._assembledConfig = null);
                    for (
                        var t = Object.keys(this._customElements),
                            e = 0,
                            i = t.length;
                        e < i;
                        e++
                    ) {
                        var n = t[e],
                            n = this._customElements[n];
                        n && n.dispose(), (n = null);
                    }
                    (this._customElements = null),
                        (this.contentContainer = null),
                        this.viewerContainer &&
                            (this.viewerContainer.el = null),
                        (this.viewerContainer = null);
                }),
                t
            );
        })(E);
    function Xe(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n);
        }
    }
    function Ae(t, e, i) {
        e && Xe(t.prototype, e),
            i && Xe(t, i),
            Object.defineProperty(t, "prototype", { writable: !1 });
    }
    var Fe = (function () {
            function t(t, e) {
                (this.useWorker = !0),
                    (this.workers_archive = []),
                    (this.taskUid = null),
                    (this.useWorker = t),
                    (this.cores = 1),
                    (this.workerBlobURL = e);
            }
            var e = t.prototype;
            return (
                (e.resize = function (t, e, i, n, s, r) {
                    return this.useWorker
                        ? this.resizeWithWorker(t, e, i, n, s, r)
                        : this.resizeWithoutWorker(t, n, s, r);
                }),
                (e.resizeWithoutWorker = function (t, e, i, D) {
                    for (
                        var n = t.width,
                            s = t.height,
                            r = ((e = Math.round(e)), s / (i = Math.round(i))),
                            o = t.getContext("2d"),
                            a = [],
                            l = 2 * Math.ceil(s / this.cores / 2),
                            h = [],
                            u = -1,
                            c = 0;
                        c < this.cores;
                        c++
                    ) {
                        var d,
                            _ = u + 1;
                        s <= _ ||
                            ((u = _ + l - 1),
                            (u = Math.min(u, s - 1)),
                            (d = l),
                            (d = Math.min(l, s - _)),
                            (a[c] = {}),
                            (a[c].source = o.getImageData(0, _, n, l)),
                            (a[c].target = !0),
                            (a[c].start_y = Math.ceil(_ / r)),
                            (a[c].height = d),
                            (_ = {
                                width_source: n,
                                height_source: a[c].height,
                                width: e,
                                height: Math.ceil(a[c].height / r),
                                core: c,
                                source:
                                    a[c].source.data.buffer || a[c].source.data,
                            }),
                            (h[c] = _));
                    }
                    for (var m = h.length, p = [], f = 0; f < m; f++) {
                        for (
                            var v = h[f],
                                O = v.core,
                                g = v.width_source,
                                b = v.height_source,
                                y = v.width,
                                w = v.height,
                                C = g / y,
                                x = b / w,
                                W = Math.ceil(C / 2),
                                Y = Math.ceil(x / 2),
                                S = new Uint8ClampedArray(v.source),
                                v = (S.length, y * w * 4),
                                N = new ArrayBuffer(v),
                                I = new Uint8ClampedArray(N, 0, v),
                                k = 0;
                            k < w;
                            k++
                        )
                            for (var M = 0; M < y; M++) {
                                for (
                                    var B = 4 * (M + k * y),
                                        P = 0,
                                        R = 0,
                                        X = 0,
                                        A = 0,
                                        F = 0,
                                        H = 0,
                                        V = 0,
                                        q = k * x,
                                        Q = Math.floor(M * C),
                                        j = Math.ceil((M + 1) * C),
                                        K = Math.floor(k * x),
                                        G = Math.ceil((k + 1) * x),
                                        j = Math.min(j, g),
                                        G = Math.min(G, b),
                                        T = K;
                                    T < G;
                                    T++
                                )
                                    for (
                                        var $ = Math.abs(q - T) / Y,
                                            J = M * C,
                                            Z = $ * $,
                                            L = Q;
                                        L < j;
                                        L++
                                    ) {
                                        var E = Math.abs(J - L) / W,
                                            E = Math.sqrt(Z + E * E);
                                        1 <= E ||
                                            ((V +=
                                                (P =
                                                    2 * E * E * E -
                                                    3 * E * E +
                                                    1) *
                                                S[3 + (E = 4 * (L + T * g))]),
                                            (X += P),
                                            (A +=
                                                (P =
                                                    S[3 + E] < 255
                                                        ? (P * S[3 + E]) / 250
                                                        : P) * S[E]),
                                            (F += P * S[1 + E]),
                                            (H += P * S[2 + E]),
                                            (R += P));
                                    }
                                (I[B] = A / R),
                                    (I[1 + B] = F / R),
                                    (I[2 + B] = H / R),
                                    (I[3 + B] = V / X);
                            }
                        p.push({ core: O, target: I });
                    }
                    for (var U = 0; U < m; U++) {
                        var tt = p[U],
                            et = Math.ceil(a[U].height / r);
                        if (
                            ((a[U].target = o.createImageData(e, et)),
                            a[U].target.data.set)
                        )
                            a[U].target.data.set(tt.target);
                        else
                            for (
                                var it = a[U].target.data.length, z = 0;
                                z < it;
                                z++
                            )
                                a[U].target.data[z] = tt.target[z];
                    }
                    return Promise.resolve(a);
                }),
                (e.resizeWithWorker = function (t, e, i, l, n, s) {
                    for (
                        var h = this,
                            r = Math.floor(e) || 1,
                            o = Math.floor(i) || 1,
                            a =
                                ((l = Math.floor(l) || 1),
                                o / (n = Math.floor(n) || 1)),
                            u = t.getContext("2d"),
                            c = [],
                            d = 2 * Math.ceil(o / this.cores / 2),
                            _ = -1,
                            m = 0;
                        m < this.cores;
                        m++
                    ) {
                        var p,
                            f,
                            v = _ + 1;
                        o <= v ||
                            ((_ = v + d - 1),
                            (_ = Math.min(_, o - 1)),
                            (p = d),
                            (p = Math.min(d, o - v)),
                            (c[m] = {}),
                            (c[m].source = u.getImageData(0, v, r, p)),
                            (c[m].target = !0),
                            (f = Math.ceil(v / a)),
                            (v = Math.min(Math.ceil((v + p) / a) - f, n - f)),
                            (c[m].startY = f),
                            (c[m].height = p),
                            (c[m].heightPart = v));
                    }
                    t = u = null;
                    for (
                        var g = [],
                            b = function b(t) {
                                if (c[t] == undefined) return "continue";
                                var a = new Worker(h.workerBlobURL),
                                    e = new Promise(function (r, o) {
                                        (a.onmessage = function (t) {
                                            a.terminate(),
                                                (a.onmessage = null),
                                                (a.onerror = null),
                                                (a = null),
                                                t.data.taskUid !== h.taskUid &&
                                                    o(!1);
                                            var e = t.data.core,
                                                i = c[e].heightPart;
                                            if (
                                                (w(i) || (i = 1),
                                                w(l) || (l = 1),
                                                (c[e].target = document
                                                    .createElement("canvas")
                                                    .getContext("2d")
                                                    .createImageData(
                                                        l,
                                                        i || 1
                                                    )),
                                                c[e].target.data.set)
                                            )
                                                c[e].target.data.set(
                                                    t.data.target
                                                );
                                            else
                                                for (
                                                    var n =
                                                            c[e].target.data
                                                                .length,
                                                        s = 0;
                                                    s < n;
                                                    s++
                                                )
                                                    c[e].target.data[s] =
                                                        t.data.target[s];
                                            r(e);
                                        }),
                                            (a.onerror = function (t) {
                                                a.terminate(),
                                                    (a.onmessage = null),
                                                    (a.onerror = null),
                                                    (a = null),
                                                    o(t);
                                            });
                                    }),
                                    e =
                                        (g.push(e),
                                        {
                                            sourceWidth: r,
                                            sourceHeight: c[t].height,
                                            width: l,
                                            height: c[t].heightPart,
                                            core: t,
                                            source:
                                                c[t].source.data.buffer ||
                                                c[t].source.data,
                                            taskUid: s,
                                        });
                                try {
                                    a.postMessage(e, [e.source]);
                                } catch (i) {
                                    a.postMessage(e);
                                }
                            },
                            y = 0;
                        y < this.cores;
                        y++
                    )
                        b(y);
                    return Promise.all(g)
                        .then(function (t) {
                            return Promise.resolve(c);
                        })
                        .catch(function (t) {
                            return Promise.reject(t);
                        });
                }),
                t
            );
        })(),
        He = (function (_) {
            function t(t, e, i, n, s, r, o) {
                e = _.call(this, e) || this;
                return (
                    (e._canvasItem = null),
                    (e.renderImg = null),
                    (e.imgSrc = null),
                    (e.uid = ""),
                    (e.tags = []),
                    (e.optimization = !1),
                    (e._dataStore = null),
                    (e._showPageNumber = !1),
                    (e._showCheckbox = !1),
                    (e._currentPage = -1),
                    (e._isSelected = !1),
                    (e.currentPage = -1),
                    (e.isSelected = !1),
                    (e._latestState = {
                        currentPage: -1,
                        _showPageNumber: !1,
                        _showCheckbox: !1,
                        isSelected: !1,
                        checkbox: {},
                        pageNumber: {},
                    }),
                    (e.allowCrossOrigin = !0),
                    (e.fitRatio = 0),
                    (e._canvasWidth = 0),
                    (e._canvasHeight = 0),
                    (e._rectArr = []),
                    (e.checkbox = {
                        visibility: "hidden",
                        width: "",
                        height: "",
                        minWidth: 0,
                        maxWidth: 1e4,
                        minHeight: 0,
                        maxHeight: 1e4,
                        background: "#fff",
                        borderWidth: 0,
                        borderRadius: 0,
                        borderColor: "#000",
                        opacity: 1,
                        left: 0,
                        top: 0,
                        right: "",
                        bottom: "",
                        checkMarkColor: "#000",
                        checkMarkLineWidth: 1,
                        lineCap: "butt",
                        lineJoin: "miter",
                    }),
                    (e.pageNumber = {
                        visibility: "hidden",
                        width: "",
                        height: "",
                        minWidth: 0,
                        maxWidth: 1e4,
                        minHeight: 0,
                        maxHeight: 1e4,
                        background: "#fff",
                        borderWidth: 0,
                        borderRadius: 0,
                        borderColor: "#000",
                        opacity: 1,
                        color: "#000",
                        fontSize: 12,
                        fontFamily: "sans-serif",
                        textAlign: "center",
                        textBaseline: "middle",
                        left: "",
                        top: "",
                        right: "",
                        bottom: "",
                    }),
                    (e.workBlobURL = null),
                    (e.optimizeImage = !0),
                    (e.workerTimer = null),
                    (e.workBlobURL = r),
                    (e.hermite = new Fe(!0, e.workBlobURL)),
                    (e.optimizeImage = o),
                    (document.documentMode === undefined && !u()) ||
                        (e.optimizeImage = !1),
                    (e._dataStore = i),
                    t && e.init(t),
                    e.updateCheckboxConfig(n),
                    e.updatePageNumberConfig(s),
                    e
                );
            }
            h(t, _);
            var e = t.prototype;
            return (
                (e.setOptimizeImage = function (t) {
                    this.optimizeImage !== t && (this.optimizeImage = t);
                }),
                (e.updateCheckboxConfig = function (t) {
                    Object.assign(this.checkbox, t);
                }),
                (e.updatePageNumberConfig = function (t) {
                    Object.assign(this.pageNumber, t);
                }),
                (e.init = function (t) {
                    for (var e in t)
                        e !== undefined && t[e] && (this[e] = t[e]);
                    this.renderImg = null;
                }),
                (e.updateData = function (t) {
                    var e = t.data,
                        i = t.tags,
                        t = t.optimization;
                    e !== this.imgSrc &&
                        ((this.imgSrc = e),
                        this.renderImg && (this.renderImg.onload = null),
                        (this.renderImg = null),
                        (this.tags = i),
                        (this.optimization = t));
                }),
                (e.emptyPage = function () {
                    this.renderImg && (this.renderImg.onload = null),
                        (this.renderImg = null),
                        this._canvasItem &&
                            ((this._canvasItem.width = 1),
                            (this._canvasItem.height = 1),
                            this._canvasItem
                                .getContext("2d", { willReadFrequently: !0 })
                                .clearRect(0, 0, 1, 1),
                            (this._canvasItem.width = 0),
                            (this._canvasItem.height = 0));
                }),
                (e.dispose = function () {
                    _.prototype.dispose.call(this),
                        this.emptyPage(),
                        (this.imgSrc = null),
                        (this._canvasItem = null);
                }),
                (e.render = function (t) {
                    void 0 === t && (t = !0);
                    var e = this;
                    if (
                        !this._canvasItem ||
                        this._canvasItem.clientWidth <= 0 ||
                        this._canvasItem.clientHeight <= 0
                    )
                        return !1;
                    if (this.renderImg)
                        this.renderImg.complete &&
                            ((this.renderImg.onload = null),
                            this._renderImage(t));
                    else {
                        if (!this.imgSrc) return this._clearCanvas(), !1;
                        var i = this.renderImg || new Image(),
                            n =
                                (this.allowCrossOrigin &&
                                    (i.crossOrigin = "anonymous"),
                                this.width),
                            s = this.height,
                            r = this.dpr,
                            o = this._dataStore.getMid(this.uid),
                            a = o.tempWidth,
                            o = o.tempHeight;
                        a &&
                            o &&
                            ((r = Math.min(n / r / a, s / r / o, 1)),
                            (n = Math.floor(r * a)),
                            (s = Math.floor(r * o))),
                            (i.src = this.imgSrc),
                            (i.onload = function () {
                                e._renderImage(t),
                                    (i.onload = null),
                                    (i.onerror = null);
                            }),
                            window.Dynamsoft &&
                                window.Dynamsoft.navInfoSync.bFileSystem &&
                                window.Dynamsoft &&
                                window.Dynamsoft.navInfoSync.bMac &&
                                window.Dynamsoft.navInfoSync.bSafari &&
                                (function (t) {
                                    if (t && 0 <= t.indexOf("/img?id="))
                                        return 1;
                                    return;
                                })(i.src) &&
                                (i.onerror = function () {
                                    (i.src =
                                        e.imgSrc +
                                        "&vt=" +
                                        new Date().getTime()),
                                        (i.onerror = null);
                                }),
                            (this.renderImg = i);
                    }
                }),
                (e._renderImage = function (t) {
                    var r,
                        e,
                        o,
                        a,
                        l,
                        h,
                        u = this,
                        c = (void 0 === t && (t = !0), this.renderImg),
                        d = this._canvasItem;
                    c &&
                        d &&
                        (r = d.getContext("2d")) &&
                        ((e = this._calDrawImagePos(c)),
                        (o = e.left),
                        (a = e.top),
                        (l = e.width),
                        (h = e.height),
                        r.save(),
                        r.clearRect(0, 0, d.width, d.height),
                        r.drawImage(c, o, a, l, h),
                        r.restore(),
                        this._renderPageNumber(),
                        this._renderCheckbox(),
                        this.drawRect(),
                        this.workerTimer && clearTimeout(this.workerTimer),
                        this.optimizeImage &&
                            this.hermite &&
                            (this.workerTimer = setTimeout(function () {
                                var t = document.createElement("canvas"),
                                    e =
                                        ((t.id = "optimizeMinImage_".concat(
                                            u.uid
                                        )),
                                        t.getContext("2d", {
                                            willReadFrequently: !0,
                                        })),
                                    i = c.naturalWidth,
                                    n = c.naturalHeight,
                                    s = f(11);
                                (t.width = i),
                                    (t.height = n),
                                    e.drawImage(c, 0, 0),
                                    (u.hermite.taskUid = s),
                                    u.hermite
                                        .resize(t, i, n, l, h, s)
                                        .then(function (t) {
                                            r.save(),
                                                r.clearRect(
                                                    0,
                                                    0,
                                                    d.width,
                                                    d.height
                                                ),
                                                t.forEach(function (t) {
                                                    var e = Math.round(o),
                                                        i = Math.round(
                                                            t.startY + a
                                                        );
                                                    r.putImageData(
                                                        t.target,
                                                        e,
                                                        i
                                                    );
                                                }),
                                                r.restore(),
                                                u._renderPageNumber(),
                                                u._renderCheckbox(),
                                                u.drawRect();
                                        })
                                        .catch(function (t) {});
                            }, 100)),
                        t &&
                            _.prototype._emit.call(
                                this,
                                S,
                                this._currentPage - 1
                            ));
                }),
                (e._calDrawImagePos = function (t) {
                    var e = t.naturalWidth,
                        t = t.naturalHeight,
                        i = { left: 0, top: 0, width: 0, height: 0 };
                    if (this.width <= 0 || this.height <= 0) return i;
                    var n,
                        s,
                        r,
                        o,
                        a = this.dpr;
                    return (
                        this.optimization ||
                            ((s = this.width),
                            (r = this.height),
                            null != (n = this._dataStore.getMid(this.uid)) &&
                                n.tempWidth &&
                                null != n &&
                                n.tempHeight &&
                                ((o = Math.min(
                                    s / a / n.tempWidth,
                                    r / a / n.tempHeight,
                                    1
                                )),
                                (s = Math.floor(o * n.tempWidth)),
                                (r = Math.floor(o * n.tempHeight))),
                            (o = Math.max(e / s, t / r)),
                            (e /= this.fitRatio = o),
                            (t /= o)),
                        (i = {
                            left: Math.floor((this.width - e * a) / 2),
                            top: Math.floor((this.height - t * a) / 2),
                            width: Math.floor(e * a),
                            height: Math.floor(t * a),
                        })
                    );
                }),
                (e._renderPageNumber = function () {
                    var t = this.renderImg,
                        e = this._canvasItem,
                        i = this.pageNumber;
                    t &&
                        e &&
                        "visible" === i.visibility &&
                        ((t = this._normalizeStyle(i)),
                        (e = e.getContext("2d", {
                            willReadFrequently: !0,
                        })).save(),
                        (e.globalAlpha = i.opacity),
                        this._renderOutlinePath(e, t, "out"),
                        e.clip(),
                        this._renderOutlinePath(e, t, "in"),
                        this._renderBackground(e, i),
                        this._renderOutlinePath(e, t, "center"),
                        this._renderBorder(e, t, i),
                        this._renderText(String(this._currentPage), e, t, i),
                        e.restore());
                }),
                (e._renderCheckbox = function () {
                    var t = this.renderImg,
                        e = this._canvasItem,
                        i = this.checkbox;
                    t &&
                        e &&
                        "visible" === i.visibility &&
                        ((t = this._normalizeStyle(i)),
                        (e = e.getContext("2d")).save(),
                        (e.globalAlpha = i.opacity),
                        this._renderOutlinePath(e, t, "out"),
                        e.clip(),
                        this._renderOutlinePath(e, t, "in"),
                        this._renderBackground(e, i),
                        this._renderOutlinePath(e, t, "center"),
                        this._renderBorder(e, t, i),
                        this._isSelected && this._renderCheckMark(e, t, i),
                        e.restore());
                }),
                (e._normalizeStyle = function (t) {
                    var e = this.width,
                        i = this.height,
                        n = t.width,
                        s = t.height,
                        r = t.left,
                        o = t.top,
                        a = t.right,
                        l = t.bottom,
                        h = t.translateX,
                        u = t.translateY,
                        c = t.borderRadius,
                        d = t.borderWidth,
                        _ = t.fontSize,
                        t = t.checkMarkLineWidth,
                        e =
                            (w((d = this._normalizeToPixel(d, 0))) || (d = 0),
                            (_ !== undefined &&
                                w((_ = this._normalizeToPixel(_, 0)))) ||
                                (_ = 0),
                            (t !== undefined &&
                                w((t = this._normalizeToPixel(t, 0)))) ||
                                (t = 0),
                            (n = this._normalizeToPixel(n, e)),
                            (s = this._normalizeToPixel(s, i)),
                            (r = this._normalizeToPixel(r, e)),
                            (o = this._normalizeToPixel(o, i)),
                            (a = this._normalizeToPixel(a, e)),
                            (l = this._normalizeToPixel(l, i)),
                            (n = w(n) ? n : w(r) && w(a) ? e - r - a : 0) <
                                2 * d && (n = 2 * d),
                            (s = w(s) ? s : w(l) && w(o) ? i - o - l : 0) <
                                2 * d && (s = 2 * d),
                            w(a) && !w(r) && (r = e - n - a),
                            w(l) && !w(o) && (o = i - s - l),
                            w(r) || (r = 0),
                            w(o) || (o = 0),
                            (h = this._normalizeToPixel(h, n)),
                            (u = this._normalizeToPixel(u, s)),
                            w(h) && (r += h),
                            w(u) && (o += u),
                            this._normalizeToPixel(c, n)),
                        a = this._normalizeToPixel(c, s);
                    return (
                        w(e) && w(a)
                            ? ((e = Math.max(0, Math.min(e, n / 2))),
                              (a = Math.max(0, Math.min(a, s / 2))),
                              w(c) && (a = e = Math.min(e, a)))
                            : (a = e = 0),
                        {
                            left: r,
                            top: o,
                            width: n,
                            height: s,
                            borderRadiusX: e,
                            borderRadiusY: a,
                            borderWidth: d,
                            fontSize: _,
                            checkMarkLineWidth: t,
                        }
                    );
                }),
                (e._normalizeToPixel = function (t, e) {
                    if (w(t)) return t * this.dpr;
                    if (a(t)) {
                        if (!(t = t.trim()).length) return t;
                        var i = t.match(/^-?\d+\.?\d?%$/);
                        if (i) return (parseFloat(i[0]) / 100) * e;
                        i = t.match(/^-?\d+\.?\d?px$/);
                        if (i) return parseFloat(i[0]) * this.dpr;
                    }
                    return "";
                }),
                (e._renderText = function (t, e, i, n) {
                    var s = i.left,
                        r = i.top,
                        o = i.width,
                        a = i.height,
                        i = i.fontSize,
                        l = n.color,
                        h = n.fontFamily,
                        u = n.textAlign,
                        n = n.textBaseline;
                    (e.textAlign = u),
                        (e.textBaseline = n),
                        (e.fillStyle = l),
                        (e.font = "".concat(i, "px ").concat(h)),
                        e.fillText(t, s + o / 2, r + a / 2 + i / 8, o);
                }),
                (e._renderCheckMark = function (t, e, i) {
                    var n = e.left,
                        s = e.top,
                        r = e.width,
                        o = e.height,
                        a = e.borderWidth,
                        e = e.checkMarkLineWidth,
                        l = i.checkMarkColor,
                        h = i.lineCap,
                        i = i.lineJoin,
                        u = Math.max(Math.min(r - 2 * a, o - 2 * a), 0);
                    0 !== u &&
                        (r < o
                            ? ((n += a), (s = s + a + (o - r) / 2))
                            : ((n = n + a + (r - o) / 2), (s += a)),
                        t.beginPath(),
                        t.moveTo(n + 0.15 * u, s + 0.5 * u),
                        t.lineTo(n + 0.4 * u, s + 0.8 * u),
                        t.lineTo(n + 0.85 * u, s + 0.2 * u),
                        (t.lineCap = h),
                        (t.lineJoin = i),
                        (t.lineWidth = e),
                        (t.strokeStyle = l),
                        t.stroke());
                }),
                (e._renderBackground = function (t, e) {
                    e = e.background;
                    e && ((t.fillStyle = e), t.fill());
                }),
                (e._renderOutlinePath = function (t, e, i) {
                    var n = e.left,
                        s = e.top,
                        r = e.width,
                        o = e.height,
                        a = e.borderWidth,
                        l = e.borderRadiusX,
                        e = e.borderRadiusY,
                        h = 0,
                        u =
                            ("center" === (i = void 0 === i ? "out" : i)
                                ? (h = a / 2)
                                : "in" === i && (h = a),
                            [
                                {
                                    x: n + l,
                                    y: s + e,
                                    start: Math.PI,
                                    end: (3 * Math.PI) / 2,
                                },
                                {
                                    x: n + r - l,
                                    y: s + e,
                                    start: (3 * Math.PI) / 2,
                                    end: 2 * Math.PI,
                                },
                                {
                                    x: n + r - l,
                                    y: s + o - e,
                                    start: 0,
                                    end: Math.PI / 2,
                                },
                                {
                                    x: n + l,
                                    y: s + o - e,
                                    start: Math.PI / 2,
                                    end: Math.PI,
                                },
                            ]),
                        c = Math.max(l - h, 0),
                        d = Math.max(e - h, 0);
                    if ((t.beginPath(), t.ellipse))
                        for (var _ = 0; _ < 4; _++) {
                            var m = u[_],
                                p = m.x,
                                f = m.y,
                                v = m.start,
                                m = m.end;
                            t.ellipse(p, f, c, d, 0, v, m);
                        }
                    else t.rect(n, s, r, o);
                    t.closePath();
                }),
                (e._renderBorder = function (t, e, i) {
                    (i = i.borderColor), (e = e.borderWidth);
                    e && ((t.strokeStyle = i), (t.lineWidth = e), t.stroke());
                }),
                (e._clearCanvas = function () {
                    var t;
                    !this._canvasItem ||
                        ((t = this._canvasItem.getContext("2d")) &&
                            t.clearRect(
                                0,
                                0,
                                this._canvasItem.width,
                                this._canvasItem.height
                            ));
                }),
                (e.setLatestState = function (t) {
                    this._latestState = t;
                }),
                (e._setCanvasWidth = function (t) {
                    this._canvasItem &&
                        ((this._canvasWidth = t), (this._canvasItem.width = t));
                }),
                (e._setCanvasHeight = function (t) {
                    this._canvasItem &&
                        ((this._canvasHeight = t),
                        (this._canvasItem.height = t));
                }),
                (e.resizeCanvasSize = function (t) {
                    void 0 === t && (t = !1);
                    var e = this._canvasItem;
                    if (!e || (!this.renderImg && !this.imgSrc)) return !1;
                    var i,
                        n = e.clientWidth * this.dpr,
                        e = e.clientHeight * this.dpr;
                    return (
                        !(n <= 0 || e <= 0) &&
                        ((i = this._checkIfRenderPageOrBox()),
                        !(
                            Math.abs(n - this.width) <= 2 &&
                            Math.abs(e - this.height) <= 2 &&
                            this.renderImg &&
                            !i
                        ) &&
                            (this.width !== n && (this.width = n),
                            this.height !== e && (this.height = e),
                            t &&
                                -1 === this.imgSrc.indexOf("blob:") &&
                                (this.renderImg = null),
                            void this.render()))
                    );
                }),
                (e._checkIfRenderPageOrBox = function () {
                    var t,
                        e = !1;
                    for (t in this._latestState) {
                        var i = this["_" + t],
                            n = this._latestState[t];
                        if (!this.isEqual(i, n))
                            switch (((this["_" + t] = n), t)) {
                                case "currentPage":
                                    "visible" === this.pageNumber.visibility &&
                                        (e = !0);
                                    break;
                                case "isSelected":
                                    "visible" === this.checkbox.visibility &&
                                        (e = !0);
                                    break;
                                default:
                                    e = !0;
                            }
                    }
                    return e;
                }),
                (e.isEqual = function (t, e) {
                    if (o(t)) {
                        if (!o(e)) return !1;
                        for (
                            var i = Object.keys(e), n = 0, s = i.length;
                            n < s;
                            n++
                        ) {
                            var r = i[n];
                            if (t[r] !== e[r]) return !1;
                        }
                        return !0;
                    }
                    return t === e;
                }),
                (e.setRect = function (t) {
                    this._rectArr = t;
                }),
                (e.drawRect = function () {
                    var t = this._rectArr;
                    if (0 !== t.length && this.renderImg) {
                        var e = this._dataStore.getMid(this.uid);
                        if (
                            null != e &&
                            e.tempWidth &&
                            null != e &&
                            e.tempHeight &&
                            this._canvasItem
                        )
                            for (
                                var i = this._canvasItem.getContext("2d", {
                                        willReadFrequently: !0,
                                    }),
                                    n = this.dpr,
                                    s =
                                        e.tempWidth /
                                        this.renderImg.naturalWidth,
                                    r = 0;
                                r < t.length;
                                r++
                            ) {
                                for (
                                    var o = t[r],
                                        a = o.cropBoxStyle,
                                        l = a.ctrlBorderWidth,
                                        h = a.ctrlBackground,
                                        u = a.ctrlBorderColor,
                                        c = a.ctrlBorderRadius,
                                        d = a.ctrlWidth,
                                        _ = a.ctrlHeight,
                                        m = a.borderColor,
                                        p = a.borderWidth,
                                        f = a.invalidBorderColor,
                                        v = a.invalidCtrlBorderColor,
                                        g = a.background,
                                        b = a.dashLine,
                                        a = a.enableConcaveBorderColor,
                                        y = o.probePoints.slice(0, 8),
                                        w = o.midpoints.slice(0, 8),
                                        C = 0;
                                    C < 4;
                                    C++
                                ) {
                                    var x = this._transformRect(
                                            y[2 * C] / s,
                                            y[2 * C + 1] / s
                                        ),
                                        S = this._transformRect(
                                            w[2 * C] / s,
                                            w[2 * C + 1] / s
                                        );
                                    (y[2 * C] = x.x),
                                        (y[2 * C + 1] = x.y),
                                        (w[2 * C] = S.x),
                                        (w[2 * C + 1] = S.y);
                                }
                                i.save();
                                try {
                                    i.setLineDash(
                                        b.map(function (t) {
                                            return t * n;
                                        })
                                    );
                                } catch (B) {}
                                (i.fillStyle = g),
                                    (i.lineWidth = p * n),
                                    a && !o.isConvex
                                        ? (i.strokeStyle = f)
                                        : (i.strokeStyle = m),
                                    i.beginPath(),
                                    i.moveTo(y[0], y[1]),
                                    i.lineTo(y[2], y[3]),
                                    i.lineTo(y[4], y[5]),
                                    i.lineTo(y[6], y[7]),
                                    i.closePath(),
                                    i.stroke(),
                                    i.restore(),
                                    (i.lineWidth = l * n),
                                    (i.fillStyle = h),
                                    a && !o.isConvex
                                        ? (i.strokeStyle = v)
                                        : (i.strokeStyle = u);
                                for (
                                    var I = Math.min(c, d / 2) * n,
                                        k = Math.min(c, _ / 2) * n,
                                        M = 0;
                                    M < 4;
                                    M++
                                )
                                    this._drawRoundedRectangle(i, {
                                        x: y[2 * M],
                                        y: y[2 * M + 1],
                                        width: d * n,
                                        height: _ * n,
                                        radiusX: I,
                                        radiusY: k,
                                    }),
                                        i.stroke(),
                                        "" !== h && i.fill(),
                                        this._drawRoundedRectangle(i, {
                                            x: w[2 * M],
                                            y: w[2 * M + 1],
                                            width: d * n,
                                            height: _ * n,
                                            radiusX: I,
                                            radiusY: k,
                                        }),
                                        i.stroke(),
                                        "" !== h && i.fill();
                            }
                    }
                }),
                (e._transformRect = function (t, e) {
                    var i = this.renderImg,
                        n = i.naturalWidth,
                        i = i.naturalHeight,
                        s = this.fitRatio;
                    return {
                        x: this.width / 2 + ((t - n / 2) / s) * this.dpr,
                        y: this.height / 2 + ((e - i / 2) / s) * this.dpr,
                    };
                }),
                (e._drawRoundedRectangle = function (t, e) {
                    var i = e.width,
                        n = e.height,
                        s = e.radiusX,
                        r = e.radiusY,
                        o = e.x,
                        e = e.y,
                        a = [
                            {
                                x: o - i / 2 + s,
                                y: e - n / 2 + r,
                                start: Math.PI,
                                end: (3 * Math.PI) / 2,
                            },
                            {
                                x: o + i / 2 - s,
                                y: e - n / 2 + r,
                                start: (3 * Math.PI) / 2,
                                end: 2 * Math.PI,
                            },
                            {
                                x: o + i / 2 - s,
                                y: e + n / 2 - r,
                                start: 0,
                                end: Math.PI / 2,
                            },
                            {
                                x: o - i / 2 + s,
                                y: e + n / 2 - r,
                                start: Math.PI / 2,
                                end: Math.PI,
                            },
                        ];
                    if ((t.beginPath(), t.ellipse))
                        for (var l = 0; l < 4; l++) {
                            var h = a[l];
                            t.ellipse(h.x, h.y, s, r, 0, h.start, h.end);
                        }
                    else t.rect(o - i / 2, e - n / 2, i, n);
                    t.closePath();
                }),
                Ae(t, [
                    { key: "dpr", get: v },
                    {
                        key: "width",
                        get: function () {
                            return this._canvasItem
                                ? this._canvasItem.width
                                : 0;
                        },
                        set: function (t) {
                            this._setCanvasWidth(t);
                        },
                    },
                    {
                        key: "height",
                        get: function () {
                            return this._canvasItem
                                ? this._canvasItem.height
                                : 0;
                        },
                        set: function (t) {
                            this._setCanvasHeight(t);
                        },
                    },
                ]),
                t
            );
        })(E);
    var D = (function () {
            function t(t) {
                void 0 === t && (t = []),
                    (this.array = []),
                    (this.array = W(t));
            }
            var e = t.prototype;
            return (
                (e.add = function (t) {
                    return !~this.array.indexOf(t) && (this.array.push(t), !0);
                }),
                (e.delete = function (t) {
                    t = this.array.indexOf(t);
                    return -1 < t && (this.array.splice(t, 1), !0);
                }),
                (e.concat = function (t) {
                    return W(this.array.concat(t));
                }),
                (e.equal = function (t) {
                    if (t.length !== this.array.length) return !1;
                    if (!t.length) return !0;
                    for (var e = 0; e < this.array.length; e++)
                        if (this.array[e] !== t[e]) return !1;
                    return !0;
                }),
                t
            );
        })(),
        Ve = (function (o) {
            function t(t, e, i, n, s, r) {
                e = o.call(this, e) || this;
                return (
                    (e.uid = ""),
                    (e._pubSub = null),
                    (e._viewerContainer = null),
                    (e._postfix = ""),
                    (e._thumbnailElement = null),
                    (e._dataStore = null),
                    (e.isInner = !1),
                    (e._iObserver = null),
                    (e._customThumbnailEvent = null),
                    (e._size = 180),
                    (e._mouseShape = "pointer"),
                    (e._scrollDirection = "vertical"),
                    (e._sequence = 0),
                    (e._location = "horizontal"),
                    (e._showThumbnail = !0),
                    (e._showPageNumber = !1),
                    (e._pageNumberConfig = {}),
                    (e._checkboxConfig = {}),
                    (e._optimizeImage = !0),
                    (e._showRemoveBtn = !1),
                    (e._fullThumbnail = !1),
                    (e._multipleMode = !1),
                    (e.allowPageDragging = !0),
                    (e._allowResizing = !1),
                    (e.allowHover = !0),
                    (e.allowKeyboardControl = !0),
                    (e.autoChangeIndex = !1),
                    (e.rows = 1),
                    (e.columns = 1),
                    (e._background = "rgba(67,66,70,1)"),
                    (e._border = "1px solid rgba(27,27,29,1)"),
                    (e._pageBackground = "rgba(0,0,0,0)"),
                    (e._pageBorder = "1px solid rgba(128,128,128,1)"),
                    (e._selectedPageBackground = "rgba(127,133,251,1)"),
                    (e._selectedPageBorder = "1px solid rgba(255,0,0,1)"),
                    (e.hoverPageBackground = "rgba(196,250,248,1)"),
                    (e.hoverPageBorder = "1px solid rgba(255,255,0,1)"),
                    (e.placeholderBackground = "rgba(255,192,203,1)"),
                    (e._pageMargin = 10),
                    (e._pageMarginNumber = 0),
                    (e._currentPageMargin = -1),
                    (e.isDrag = !1),
                    (e.ifDragMoves = !1),
                    (e._dragTimer = null),
                    (e._dragStart = !1),
                    (e.needClick = !0),
                    (e.thumbMoveOption = {
                        napX: 0,
                        napY: 0,
                        clickX: 0,
                        clickY: 0,
                        target: null,
                    }),
                    (e._stretchItem = null),
                    (e._isStretching = !1),
                    (e._isCrop = !1),
                    (e._topImageIndex = -1),
                    (e._prtScrollOnce = !1),
                    (e._calculateTopIndex = -1),
                    (e._showUids = new D()),
                    (e._showIndexes = new D()),
                    (e._renderIndexes = new D()),
                    (e._renderUids = new D()),
                    (e._tempThumbnailSize = { width: 1, height: 1 }),
                    (e._splitTimer = null),
                    (e.selectedIndexes = []),
                    (e.currentIndex = -1),
                    (e._thumbnailCanvas = []),
                    (e._uidTbCanvas = {}),
                    (e._eventList = {}),
                    (e._renderTimer = null),
                    (e.isDragUp = !1),
                    (e.cropBoxStyle = {
                        borderWidth: 1,
                        borderColor: "#000",
                        invalidBorderColor: "#000",
                        dashLine: [4, 2],
                        background: "",
                        ctrlBorderWidth: 1,
                        ctrlBorderRadius: 0,
                        ctrlBorderColor: "#000",
                        invalidCtrlBorderColor: "#000",
                        ctrlBackground: "",
                        ctrlWidth: 8,
                        ctrlHeight: 8,
                        enableConcaveBorderColor: !1,
                    }),
                    (e.workBlobURL = null),
                    (e._viewerContainer = i),
                    (e._postfix = n),
                    (e._dataStore = s),
                    (e.workBlobURL = r),
                    Object.assign(e.cropBoxStyle, t.cropBoxStyle || {}),
                    e._thumbnailInit(t),
                    e
                );
            }
            h(t, o);
            var e = t.prototype;
            return (
                (e._thumbnailInit = function (t) {
                    this._initThumbnailUi(t.uid),
                        this._initThumbnailConfig(t),
                        this._initIntersectionObserver(),
                        this._bindSelfEvents(),
                        this._bindUiEvent();
                }),
                (e._initThumbnailConfig = function (t) {
                    for (var e in ((this._pubSub = new E(t.pubsub)), t))
                        "pubsub" !== (e = e.replace("canvas", "")) &&
                            (this[e] = t[e]);
                }),
                (e._initThumbnailUi = function (t) {
                    var e = new U(t, { name: "Thumbnail" }),
                        i =
                            "horizontal" === this.location
                                ? ""
                                : "dvs-nodisplay",
                        n = "vertical" === this.location ? "" : "dvs-nodisplay";
                    (e.element.innerHTML =
                        "" +
                        "<div id='stretchBarLeft"
                            .concat(
                                t,
                                "' class='dvs-stretchBar dvs-stretchLeft "
                            )
                            .concat(i, "'></div>") +
                        "<div id='stretchBarTop"
                            .concat(
                                t,
                                "' class='dvs-stretchBar dvs-stretchTop "
                            )
                            .concat(n, "'></div>") +
                        "<div id='stretchBarRight"
                            .concat(
                                t,
                                "' class='dvs-stretchBar dvs-stretchRight "
                            )
                            .concat(i, "'></div>") +
                        "<div id='stretchBarBottom"
                            .concat(
                                t,
                                "' class='dvs-stretchBar dvs-stretchBottom "
                            )
                            .concat(n, "'></div>") +
                        '<ul id="thumbLists'.concat(
                            t,
                            '" class="dvs-thumbLists"></ul>'
                        )),
                        (this._thumbnailElement = e.element);
                }),
                (e._initIntersectionObserver = function () {
                    var t,
                        e = this;
                    window.IntersectionObserver &&
                        this._thumbnailElement &&
                        ((t = new IntersectionObserver(
                            function (t) {
                                return e._handleObservePages(t);
                            },
                            {
                                root: this._thumbnailElement.querySelector(
                                    ".dvs-thumbLists"
                                ),
                            }
                        )),
                        (this._iObserver = t));
                }),
                (e._bindSelfEvents = function () {
                    var t,
                        e,
                        i = this,
                        n =
                            (((t = {})[Ce] = this._updateProps),
                            (t[xe] = this.scrollTo),
                            (t[Se] = this.setViewMode),
                            t);
                    for (e in (this._eventList = n))
                        this._pubSub._on(e, n[e].bind(this));
                    o.prototype._on.call(
                        this,
                        M,
                        this._documentMouseMove.bind(this)
                    ),
                        o.prototype._on.call(
                            this,
                            T,
                            this._documentMouseUp.bind(this)
                        ),
                        o.prototype._on.call(this, rt, function (t) {
                            "remove" === t.action && (i._prtScrollOnce = !0);
                        });
                }),
                (e._bindUiEvent = function () {
                    var t,
                        i = this,
                        e = this._thumbnailElement;
                    e &&
                        (((t = new Ue(e)).onMousedown = function (t) {
                            i.dragThumbnail(t), i._thumbnailPointerDown(t);
                        }),
                        (t.onMousemove = function (t) {
                            i.dragMove(t), i._thumbnailPointerMove(t);
                        }),
                        (t.onMouseup = function (t) {
                            i._thumbnailPointerUp(t);
                        }),
                        (t.onTouchstart = function (t) {
                            i.dragStartMobile(t), i._thumbnailPointerDown(t);
                        }),
                        (t.onTouchmove = function (t) {
                            i.dragMoveMobile(t), i._thumbnailPointerMove(t);
                        }),
                        (t.onTouchend = function (t) {
                            i._thumbnailPointerUp(t);
                        }),
                        (t.onClick = function (t) {
                            i._thumbnailClick(t);
                        }),
                        (t.onRightClick = function (t) {
                            i._thumbnailRightClick(t);
                        }),
                        (t.onDoubleClick = function (t) {
                            i._thumbnailDoubleClick(t);
                        }),
                        (t.onPointOver = function (t) {
                            i._thumbnailMouseOver(t);
                        }),
                        (t.onPointOut = function (t) {
                            i._thumbnailMouseOut(t);
                        }),
                        (t.getTarget = function (t, e) {
                            return e !== undefined
                                ? i.getImageItem(e)
                                : i.getImageItem(t);
                        }),
                        (this._customThumbnailEvent = t),
                        d(
                            e.querySelector(".dvs-thumbLists"),
                            "scroll",
                            function () {
                                i._thumbnailScroll();
                            }
                        ),
                        d(
                            e,
                            u() ? "touchstart" : "mousedown",
                            function (t) {
                                i._thumbnailStretchStart(t);
                            },
                            { passive: !1 }
                        ),
                        d(e, "click", function (t) {
                            o.prototype._emit.call(i, wt, {
                                viewerId: i._postfix.replace("-", ""),
                                thumbnailId: i.uid,
                            }),
                                m(t);
                        }));
                }),
                (e.unbindEvents = function () {
                    var t;
                    if (
                        (null != (t = this._customThumbnailEvent) &&
                            t.dispose(),
                        (this._customThumbnailEvent = null),
                        this._pubSub)
                    )
                        for (var e in this._eventList) this._pubSub._off(e);
                }),
                (e.unbindUi = function () {
                    this.unbindEvents();
                    var t,
                        e = this._thumbnailCanvas;
                    if (e)
                        for (var i = 0; i < e.length; i++) {
                            var n = e[i];
                            n && n.dispose();
                        }
                    (this._thumbnailCanvas = null),
                        (this._viewerContainer = null),
                        (this._stretchItem = null) != (t = this._iObserver) &&
                            t.disconnect(),
                        (this._iObserver = null) !=
                            (t = this._thumbnailElement) &&
                            null != (t = t.parentElement) &&
                            t.removeChild(this._thumbnailElement),
                        (this._thumbnailElement = null);
                }),
                (e.updateContent = function (t) {
                    this._patch((t = void 0 === t ? [] : t)),
                        this._updateElements(),
                        this.renderCanvas();
                }),
                (e.updatePageItem = function (t) {
                    var e = this._thumbnailCanvas;
                    if (e)
                        for (var i = 0; i < e.length; i++) {
                            var n = e[i];
                            if (n.uid === t.uid) {
                                n.updateData(t),
                                    -1 !==
                                        this._renderUids.array.indexOf(t.uid) &&
                                        n.resizeCanvasSize(
                                            this.isInner &&
                                                1 === this.rows &&
                                                1 === this.columns
                                        );
                                break;
                            }
                        }
                }),
                (e.renderCanvas = function () {
                    var r = this;
                    this._renderTimer && clearTimeout(this._renderTimer),
                        (this._renderTimer = setTimeout(function () {
                            if (r._thumbnailCanvas)
                                for (
                                    var t = r.selectedIndexes,
                                        e = r._renderUids.array,
                                        i = r._thumbnailCanvas.length,
                                        n = 0;
                                    n < i;
                                    n++
                                ) {
                                    var s = r._thumbnailCanvas[n];
                                    -1 < e.indexOf(s.uid)
                                        ? (s.setLatestState({
                                              currentPage: n + 1,
                                              isSelected: -1 !== t.indexOf(n),
                                              showPageNumber:
                                                  "visible" ===
                                                  r.pageNumber.visibility,
                                              showCheckbox:
                                                  "visible" ===
                                                  r.checkbox.visibility,
                                              checkbox: Object.assign(
                                                  {},
                                                  r.checkbox
                                              ),
                                              pageNumber: Object.assign(
                                                  {},
                                                  r.pageNumber
                                              ),
                                          }),
                                          s.resizeCanvasSize(
                                              1 === r.rows &&
                                                  1 === r.columns &&
                                                  r.isInner
                                          ))
                                        : null != s && s.emptyPage();
                                }
                        }, 100));
                }),
                (e.keydownCallBack = function (t) {
                    this.selectImageByKey(t), this._pubSub._emit(et, t);
                }),
                (e.keyupCallBack = function (t) {
                    this._pubSub._emit(it, t);
                }),
                (e.selectImageByKey = function (t) {
                    if (
                        this.allowKeyboardControl &&
                        this._thumbnailCanvas.length
                    ) {
                        var e = this.selectedIndexes.slice().pop(),
                            i = this.rows,
                            n = this.columns,
                            s = "vertical" === this.scrollDirection,
                            r = e;
                        switch (t.key) {
                            case "ArrowUp":
                            case "Up":
                                if (s) r -= n;
                                else {
                                    if (
                                        Math.floor((r - 1) / i) !==
                                        Math.floor(r / i)
                                    )
                                        return;
                                    r -= 1;
                                }
                                break;
                            case "ArrowDown":
                            case "Down":
                                if (s) r += n;
                                else {
                                    if (
                                        Math.floor((r + 1) / i) !==
                                        Math.floor(r / i)
                                    )
                                        return;
                                    r += 1;
                                }
                                break;
                            case "ArrowLeft":
                            case "Left":
                                if (s) {
                                    if (
                                        Math.floor((r - 1) / n) !==
                                        Math.floor(r / n)
                                    )
                                        return;
                                    r -= 1;
                                } else r -= i;
                                break;
                            case "ArrowRight":
                            case "Right":
                                if (s) {
                                    if (
                                        Math.floor((r + 1) / n) !==
                                        Math.floor(r / n)
                                    )
                                        return;
                                    r += 1;
                                } else r += i;
                                break;
                            default:
                                return;
                        }
                        this._viewerEmit(Le, r), B(t);
                    }
                }),
                (e._updateElements = function () {
                    var t = this._myQuery("thumbLists" + this.uid);
                    if (!t) return !1;
                    for (var e = 0; e < t.children.length; e++) {
                        var i = t.children[e],
                            n = this._thumbnailCanvas[e];
                        n &&
                            i &&
                            ((i["dvs-defaultIndex"] = e),
                            (i["dvs-tags"] = n.tags),
                            (i["dvs-uid"] = n.uid));
                    }
                }),
                (e.handleInnerProp = function (t, e) {
                    t in this && (this[t] = e);
                }),
                (e.setHoverColor = function (t) {
                    this.allowHover &&
                        (t = this.getImageItem(t)) &&
                        !t.classList.contains("dvs-activeThumb") &&
                        ((t.style.background = this.hoverPageBackground),
                        (t.style.border = this.hoverPageBorder));
                }),
                (e.setImageColor = function (t) {
                    !this.allowHover ||
                        ((t = this.getImageItem(t)) &&
                            (t.classList.contains("dvs-activeThumb")
                                ? ((t.style.background =
                                      this.selectedPageBackground),
                                  (t.style.border = this.selectedPageBorder))
                                : ((t.style.background = this._pageBackground),
                                  (t.style.border = this.pageBorder))));
                }),
                (e._addNodes = function (n, t, e) {
                    var s = this,
                        r = [],
                        i = this._myQuery("thumbLists" + this.uid);
                    if (i) {
                        for (
                            var o = i.children[t],
                                a = document.createDocumentFragment(),
                                l = function l(t) {
                                    var t = n[t],
                                        t = s._initNode(t),
                                        e =
                                            (r.push(t),
                                            document.createElement("li")),
                                        i =
                                            ((e.style.background =
                                                s.pageBackground),
                                            (e.style.border = s.pageBorder),
                                            document.createElement("canvas"));
                                    (i.className = "dvs-thumbnailCanvas"),
                                        (i.width = 0),
                                        (i.height = 0),
                                        e.appendChild(i),
                                        (t._canvasItem = i),
                                        s.isInner ||
                                            (((t =
                                                document.createElement(
                                                    "span"
                                                )).className =
                                                "dvs-thumbnail-remove"),
                                            (t.onclick = function () {
                                                var t = P(e);
                                                s._pubSub._emit(at, t);
                                            }),
                                            e.appendChild(t)),
                                        null != (i = s._iObserver) &&
                                            i.observe(e),
                                        a.appendChild(e);
                                },
                                h = t;
                            h <= e;
                            h++
                        )
                            l(h);
                        R(a, o, i),
                            (o = this._thumbnailCanvas).splice.apply(
                                o,
                                [t, 0].concat(r)
                            );
                    }
                }),
                (e._removeNodes = function (t, e, i) {
                    var t = t.splice(e, i - e + 1),
                        n = this._myQuery("thumbLists" + this.uid);
                    if (n && n.children && n.children.length) {
                        for (var s = e; s <= i; s++) {
                            var r,
                                o = n.children[e];
                            o &&
                                ((r = o["dvs-uid"]),
                                this._showUids.delete(r),
                                this._renderUids.delete(r),
                                this._getViewIndexesByUids(),
                                null != (r = this._iObserver) && r.unobserve(o),
                                n.removeChild(o));
                        }
                        t.forEach(function (t) {
                            return t.dispose();
                        });
                    }
                }),
                (e._patch = function (t) {
                    for (
                        var e = this._thumbnailCanvas,
                            i = 0,
                            n = e.length - 1,
                            s = 0,
                            r = t.length - 1;
                        i <= n && s <= r;

                    ) {
                        var o = e[i],
                            a = e[n],
                            l = t[s],
                            h = t[r];
                        if (this._sameNode(o, l)) ++i, ++s, o.updateData(l);
                        else if (this._sameNode(a, h))
                            --n, --r, a.updateData(h);
                        else if (this._sameNode(o, h))
                            o.updateData(h), this._moveNode(e, i, n);
                        else if (this._sameNode(a, l))
                            a.updateData(l), this._moveNode(e, n, i);
                        else {
                            for (var u = void 0, c = i; c <= n; c++)
                                if (e[c].uid === (null == l ? void 0 : l.uid)) {
                                    u = c;
                                    break;
                                }
                            u !== undefined
                                ? (e[u].updateData(l), this._moveNode(e, u, i))
                                : (this._addNodes(t, s, s), n++),
                                ++s,
                                ++i;
                        }
                    }
                    n < i
                        ? this._addNodes(t, s, r)
                        : r < s && this._removeNodes(e, i, n);
                }),
                (e._sameNode = function (t, e) {
                    return (
                        (null == t ? void 0 : t.uid) ===
                        (null == e ? void 0 : e.uid)
                    );
                }),
                (e._moveNode = function (t, e, i) {
                    var n = t.splice(e, 1)[0],
                        n =
                            (t.splice(i, 0, n),
                            this._myQuery("thumbLists" + this.uid)),
                        t = n.removeChild(n.children[e]);
                    t && R(t, n.children[i], n);
                }),
                (e._initNode = function (t, e) {
                    t = { uid: t.uid, imgSrc: t.data, tags: t.tags };
                    if (!e)
                        return new He(
                            t,
                            this._pubSub.getPublishSubscribe(),
                            this._dataStore,
                            this.checkbox,
                            this.pageNumber,
                            this.workBlobURL,
                            this.optimizeImage
                        );
                    e.init(t);
                }),
                (e.selectThumbnailByIndexes = function (t) {
                    O(t)
                        ? (this.selectedIndexes = t)
                        : (t = this.selectedIndexes),
                        this.clearAbsolute(),
                        this._updateSelectedPageStyle(),
                        (!this.showPageNumber &&
                            "visible" !== this.checkbox.visibility) ||
                            this.renderCanvas();
                }),
                (e._updateSelectedPageStyle = function () {
                    var t = this._myQuery("thumbLists" + this.uid);
                    if (!t) return !1;
                    var e = this.selectedIndexes,
                        i = t.children;
                    if (i && i.length)
                        for (var n = i.length, s = 0; s < n; s++) {
                            var r = i[s],
                                o = -1 !== e.indexOf(s);
                            this._selectThumbnailByNode(r, o);
                        }
                }),
                (e._selectThumbnailByNode = function (t, e) {
                    t &&
                        (e
                            ? (t.classList.add("dvs-activeThumb"),
                              (t.style.border = this.selectedPageBorder),
                              (t.style.background =
                                  this.selectedPageBackground))
                            : (t.classList.remove("dvs-activeThumb"),
                              (t.style.border = this.pageBorder),
                              (t.style.background = this.pageBackground)));
                }),
                (e.setViewMode = function (t, e) {
                    if (
                        ((this.rows === e && this.columns === t) ||
                            this._thumbnailCanvas.forEach(function (t) {
                                t.emptyPage();
                            }),
                        (this.rows = e),
                        (this.columns = t),
                        1 === e && 1 === t
                            ? null != (e = this._thumbnailElement) &&
                              e.classList.add("dvs-hide-remove-btn")
                            : this.showRemoveBtn &&
                              null != (t = this._thumbnailElement) &&
                              t.classList.remove("dvs-hide-remove-btn"),
                        10 === document.documentMode)
                    ) {
                        e = this._myQuery("thumbLists" + this.uid);
                        if (!e) return;
                        (e.style.marginTop = e.style.marginTop ? "" : "0.1px"),
                            this.renderCanvas();
                    }
                    return this.showLatestPage(), !0;
                }),
                (e.updatePageLayout = function () {
                    if (!this.showThumbnail) return !1;
                    var t = this._myQuery("thumbLists" + this.uid);
                    if (null == t || null == (e = t.children) || !e.length)
                        return !1;
                    var e = t.clientWidth - 1,
                        i = t.clientHeight - 1,
                        n = this._getCurrentPageMargin(e, i, t),
                        s =
                            ((this._pageMarginNumber = n),
                            this._setPageSize(e, i, t, n),
                            t.clientWidth - 1),
                        r = t.clientHeight - 1;
                    (s == e && r == i) || this._setPageSize(s, r, t, n),
                        this.renderCanvas();
                }),
                (e.calculateSize = function () {
                    var t = this._thumbnailElement;
                    if (t) {
                        var e = t.getBoundingClientRect();
                        if (0 == e.width || 0 == e.height) return !1;
                        var i = this._tempThumbnailSize,
                            n = t.clientWidth,
                            t = t.clientHeight;
                        (i.width === n && i.height === t) ||
                            ((i.width = n),
                            (i.height = t),
                            this._pubSub._emit(ot, e.width, e.height));
                    }
                    return this.updatePageLayout(), !0;
                }),
                (e._getCurrentPageMargin = function (t, e, i) {
                    var n,
                        s,
                        r = this.rows,
                        o = this.columns,
                        a = this._pageMargin;
                    return (
                        (a = String(a)),
                        (a = /%$/.test(a)
                            ? ((s = parseInt(a)),
                              (n = Math.min(1 / (o + 1), 1 / (r + 1))),
                              (s = Math.min(s / 100, n)) * e - 1)
                            : /em$/.test(a)
                            ? (this._currentPageMargin < 0 &&
                                  ((n = parseInt(a)),
                                  (s = parseInt(
                                      window.getComputedStyle(i).fontSize
                                  )),
                                  (this._currentPageMargin = n * s)),
                              this._currentPageMargin)
                            : parseInt(a)),
                        t && t + 5 < a * (o + 1) && (a = t / (o + 1)),
                        (a = e && e + 5 < a * (r + 1) ? e / (r + 1) : a)
                    );
                }),
                (e._setPageSize = function (t, e, i, n) {
                    if (null != i && i.children)
                        for (
                            var s = this.rows,
                                r = this.columns,
                                o = 1 === this.columns && 1 === this.rows,
                                a = Math.floor((t - (r + 1) * n) / r),
                                l = Math.floor((e - (s + 1) * n) / s),
                                h = i.children,
                                u = "vertical" === this._scrollDirection,
                                c = 0;
                            c < h.length;
                            c++
                        ) {
                            var d = h[c];
                            o
                                ? ((d.style.width = u
                                      ? Math.floor(t) + "px"
                                      : "100%"),
                                  (d.style.height = u
                                      ? "100%"
                                      : Math.floor(e) + "px"),
                                  (i.style.padding = "0px"),
                                  (d.style.margin =
                                      0 === c
                                          ? "0px"
                                          : u
                                          ? "".concat(n, "px 0px 0px")
                                          : "0px 0px 0px ".concat(n, "px ")))
                                : ((d.style.margin = "0px "
                                      .concat(n, "px ")
                                      .concat(n, "px 0px")),
                                  (i.style.padding = ""
                                      .concat(n, "px 0px 0px ")
                                      .concat(n, "px")),
                                  c === h.length - 1 &&
                                      (d.style[
                                          u ? "marginBottom" : "marginRight"
                                      ] = n + 1 + "px"),
                                  (d.style.width = a + "px"),
                                  (d.style.height = l + "px"));
                        }
                }),
                (e.updateDisplayedUidsIE = function () {
                    var e = this;
                    if (window.IntersectionObserver) return !1;
                    if (!this.showThumbnail || !this._thumbnailCanvas)
                        return !1;
                    var t = this._getDisplayedImagesIE(),
                        t = this._getRenderIndexes(t),
                        t = (this._renderIndexes.array = t).map(function (t) {
                            return null == (t = e._thumbnailCanvas[t])
                                ? void 0
                                : t.uid;
                        });
                    (this._renderUids.array = t),
                        this.renderCanvas(),
                        this._viewerEmit(L, t.slice(), this.uid);
                }),
                (e.updateDisplayedUids = function () {
                    if (!this.showThumbnail) return !1;
                    var e = this._thumbnailCanvas;
                    if (!e.length)
                        return (
                            (this._showIndexes.array = []),
                            (this._renderIndexes.array = []),
                            void (this._renderUids.array = [])
                        );
                    var t = this._renderIndexes.array.slice(0),
                        i = [];
                    t.forEach(function (t) {
                        e[t] && i.push(e[t].uid);
                    }),
                        (this._renderUids.array = i),
                        this._viewerEmit(L, i, this.uid);
                }),
                (e._handleObservePages = function (t) {
                    var i = this;
                    t.forEach(function (t) {
                        var e = t.intersectionRect,
                            t = t.target,
                            t = null == t ? void 0 : t["dvs-uid"];
                        0 < (null == e ? void 0 : e.width) ||
                        0 < (null == e ? void 0 : e.height)
                            ? i._showUids.add(t)
                            : i._showUids.delete(t);
                    }),
                        this._getViewIndexesByUids(),
                        this.updateDisplayedUids(),
                        this.renderCanvas();
                }),
                (e._getRenderIndexes = function (t) {
                    var e = this.rows,
                        i = this.columns,
                        n = this.scrollDirection,
                        s = this._thumbnailCanvas;
                    if (!s) return [];
                    for (
                        var r = this._thumbnailCanvas.length,
                            o = 0,
                            a =
                                (t.forEach(function (t) {
                                    (r = Math.min(t, r)), (o = Math.max(t, o));
                                }),
                                []),
                            l = r;
                        l <= o;
                        l++
                    )
                        s[l] && a.push(l);
                    if ("vertical" === n) {
                        for (var h = r - 3 * i; h < r; h++) s[h] && a.push(h);
                        for (var u = o + 1; u < o + 3 * i; u++)
                            s[u] && a.push(u);
                    } else {
                        for (var c = r - 3 * e; c < r; c++) s[c] && a.push(c);
                        for (var d = o + 1; d < o + 3 * e; d++)
                            s[d] && a.push(d);
                    }
                    return a;
                }),
                (e._getViewIndexesByUids = function () {
                    var i = this._showUids,
                        n = [],
                        t =
                            (this._thumbnailCanvas.forEach(function (t, e) {
                                -1 < i.array.indexOf(t.uid) && n.push(e);
                            }),
                            (this._showIndexes.array = n),
                            this._getRenderIndexes(n.slice()));
                    this._renderIndexes.array = t;
                }),
                (e.triggerTopImageChange = function (t) {
                    void 0 === t && (t = ""),
                        this.updateDisplayedUidsIE(),
                        this._updateTopPageIndex(t);
                }),
                (e.scrollTo = function (t, e) {
                    if (
                        (void 0 === e && (e = ""),
                        !this.showThumbnail || this._prtScrollOnce)
                    )
                        return !(this._prtScrollOnce = !1);
                    var i,
                        n,
                        s,
                        r,
                        o,
                        a,
                        l = this._myQuery("thumbLists" + this.uid);
                    return (
                        !(
                            !l ||
                            l.clientWidth <= 0 ||
                            l.clientHeight <= 0 ||
                            t > l.children.length - 1 ||
                            l.children.length <= 0 ||
                            t < 0
                        ) &&
                        ((l.scrollHeight > l.clientHeight ||
                            l.scrollWidth > l.clientWidth) &&
                            ((i = l.getBoundingClientRect()),
                            (n = this.scrollDirection),
                            (r = s = -1),
                            (o = (t = l.children[t]).getBoundingClientRect()),
                            (a = parseInt(l.style.padding)),
                            "vertical" === n
                                ? ((r = 0),
                                  o.top <= i.top
                                      ? (s = t.offsetTop - a + 1)
                                      : o.bottom >= i.bottom &&
                                        (s =
                                            t.offsetTop -
                                            i.height +
                                            o.height +
                                            a +
                                            1))
                                : ((s = 0),
                                  o.left <= i.left
                                      ? (r = t.offsetLeft - a + 1)
                                      : o.right >= i.right &&
                                        (r =
                                            t.offsetLeft -
                                            i.width +
                                            o.width +
                                            a +
                                            1)),
                            -1 !== s && (l.scrollTop = s),
                            -1 !== r && (l.scrollLeft = r)),
                        this.triggerTopImageChange(e),
                        !0)
                    );
                }),
                (e.showLatestPage = function (t) {
                    var e;
                    t === undefined && (t = this.currentIndex),
                        (this.currentIndex = t),
                        null != (e = this._thumbnailCanvas) && e.length
                            ? (this.updatePageLayout(), this.scrollTo(t))
                            : this.triggerTopImageChange();
                }),
                (e._updateTopPageIndex = function (t) {
                    void 0 === t && (t = "");
                    var e = this._thumbnailElement;
                    if (!this.showThumbnail || !e) return !1;
                    window.IntersectionObserver &&
                        ((e = this._calDisplayedIndexes()[0]),
                        (this._calculateTopIndex = e));
                    e = this._calculateTopIndex;
                    if (
                        (this._thumbnailCanvas[e] || ((e = -1), (t = "")),
                        this._topImageIndex === e)
                    )
                        return !1;
                    (this._topImageIndex = e),
                        this._pubSub._emit(st, e, t),
                        "scroll" === t &&
                            this.autoChangeIndex &&
                            ((this._prtScrollOnce = !0),
                            this._viewerEmit(I, [e]));
                }),
                (e._getDisplayedImagesIE = function () {
                    for (
                        var t = this._calDisplayedIndexes(),
                            e = t[0],
                            i = t[1],
                            n = [],
                            s = e;
                        s <= i;
                        s++
                    )
                        0 <= s && n.push(s);
                    return (this._calculateTopIndex = e), n;
                }),
                (e._calDisplayedIndexes = function () {
                    var t = this._myQuery("thumbLists" + this.uid),
                        e = null == t ? void 0 : t.getBoundingClientRect();
                    if (!e || !e.width) return [-1, -1];
                    e = t.children[0];
                    if (!e) return [-1, -1];
                    var i,
                        n = e.getBoundingClientRect(),
                        s = -1,
                        r = 0,
                        o = this.rows,
                        a = this.columns;
                    for (
                        r =
                            "vertical" === this.scrollDirection
                                ? ((i =
                                      (t.scrollTop +
                                          1 -
                                          (i = Math.floor(n.height)) -
                                          (parseInt(e.style.marginTop) ||
                                              parseInt(e.style.marginBottom))) /
                                      (i + this._pageMarginNumber)),
                                  (s =
                                      ((i = Math.floor(i)) + 1) *
                                      this.columns) +
                                      (o + 1) * a -
                                      1)
                                : ((t =
                                      (t.scrollLeft +
                                          1 -
                                          (i = Math.floor(n.width)) -
                                          (parseInt(e.style.marginLeft) ||
                                              parseInt(e.style.marginRight))) /
                                      (i + this._pageMarginNumber)),
                                  (s = ((t = Math.floor(t)) + 1) * this.rows) +
                                      o * (a + 1) -
                                      1);
                        !this._thumbnailCanvas[s] && -1 < s;

                    )
                        s--;
                    for (; !this._thumbnailCanvas[r] && s < r; ) r--;
                    return [s, r];
                }),
                (e.dragThumbnail = function (t) {
                    return (
                        (this.isDragUp = !1),
                        !(t.ctrlKey || t.shiftKey || t.metaKey) &&
                            0 === t.button &&
                            this._dragStartFunction(t)
                    );
                }),
                (e.dragStartMobile = function (t) {
                    var e = this,
                        i = ((this.isDragUp = !1), t.changedTouches[0]);
                    return (
                        (this.needClick = !0),
                        (this._dragTimer = setTimeout(function () {
                            document.addEventListener("touchmove", B, {
                                passive: !1,
                            }),
                                e._dragStartFunction(i);
                        }, 300)),
                        !0
                    );
                }),
                (e._dragStartFunction = function (t) {
                    if (!this.allowPageDragging || this._isCrop) return !1;
                    var e = this.rows,
                        i = this.columns;
                    if (1 === e && 1 === i) return !1;
                    e = this.getImageItem(t);
                    if (!e) return !1;
                    this._multipleMode ||
                        e.classList.contains("dvs-activeThumb") ||
                        ((this.selectedIndexes = [P(e)]),
                        this._updateSelectedPageStyle(),
                        (this.needClick = !1));
                    var i = e.getBoundingClientRect(),
                        n = t.clientX - i.left,
                        i = t.clientY - i.top;
                    return (
                        (this.thumbMoveOption = {
                            napX: n,
                            napY: i,
                            clickX: t.pageX,
                            clickY: t.pageY,
                            target: e,
                        }),
                        (this.isDrag = !0),
                        (this._dragStart = !0)
                    );
                }),
                (e._initReplaceBlocks = function () {
                    for (
                        var t = this._myQuery("thumbLists" + this.uid),
                            e = t.querySelectorAll(".dvs-activeThumb"),
                            i = 0;
                        i < e.length;
                        i++
                    ) {
                        var n = e[i],
                            s = document.createElement("li");
                        (s.className = "dvs-replaceBlock"),
                            c(s, {
                                backgroundColor: this.placeholderBackground,
                                margin: n.style.margin,
                                width: n.style.width,
                                height: n.style.height,
                            }),
                            (s["dvs-defaultIndex"] = n["dvs-defaultIndex"]),
                            R(s, n, t);
                    }
                    t.classList.add("div-hideReplaceBlock");
                }),
                (e.dragMove = function (t) {
                    return this._dragMoveFunction(t);
                }),
                (e.dragMoveMobile = function (t) {
                    t = t.changedTouches[0];
                    return (
                        clearTimeout(this._dragTimer), this._dragMoveFunction(t)
                    );
                }),
                (e._dragMoveFunction = function (t) {
                    var e, i;
                    if (this.selectedIndexes.length && this.isDrag) {
                        var n = this.thumbMoveOption,
                            s = n.napX,
                            r = n.napY,
                            o = n.clickX,
                            a = n.clickY,
                            n = n.target;
                        if (
                            !(
                                Math.abs(t.pageX - o) < 10 &&
                                Math.abs(t.pageY - a) < 10
                            ) ||
                            this.ifDragMoves
                        ) {
                            var o = n["dvs-defaultIndex"],
                                l = this._myQuery("thumbLists" + this.uid);
                            if (l) {
                                this._dragStart &&
                                    ((this._dragStart = !1),
                                    this._initReplaceBlocks(),
                                    this._thumbnailCanvas.length <=
                                        this.rows * this.columns &&
                                        (l.style.overflow = "hidden"),
                                    this._pubSub._emit(
                                        J,
                                        {
                                            index: o,
                                            pageX: t.pageX,
                                            pageY: t.pageY,
                                        },
                                        t
                                    )),
                                    (this.ifDragMoves = !0);
                                for (
                                    var h = l.scrollTop,
                                        u = l.scrollLeft,
                                        c = n.getBoundingClientRect(),
                                        d = this._renderUids.array.slice(),
                                        _ = 0,
                                        m = 0;
                                    _ < this._thumbnailCanvas.length &&
                                    m < d.length &&
                                    0 !== d.length;
                                    _++
                                ) {
                                    var p = this._thumbnailCanvas[_],
                                        f = d.indexOf(p.uid);
                                    if (-1 !== f) {
                                        var v = p._canvasItem.parentNode;
                                        if (
                                            !v.classList.contains(
                                                "dvs-activeThumb"
                                            )
                                        ) {
                                            (f = v.getBoundingClientRect()),
                                                (p = f.left - c.left),
                                                (f = f.top - c.top);
                                            if (
                                                Math.abs(p) <= c.width / 2 &&
                                                Math.abs(f) <= c.height / 2
                                            ) {
                                                for (
                                                    var g = P(v),
                                                        b = l.querySelectorAll(
                                                            "li.dvs-replaceBlock"
                                                        ),
                                                        y = P(b[0]),
                                                        w = 0;
                                                    w < b.length;
                                                    w++
                                                ) {
                                                    var C = b[w];
                                                    g < y
                                                        ? R(C, v, l)
                                                        : ((C = C),
                                                          (i = void 0),
                                                          (i = (e = v)
                                                              .parentNode)
                                                              .lastChild == e
                                                              ? i.appendChild(C)
                                                              : R(
                                                                    C,
                                                                    e.nextSibling,
                                                                    i
                                                                ));
                                                }
                                                return (
                                                    (l.scrollTop = h),
                                                    (l.scrollLeft = u),
                                                    !0
                                                );
                                            }
                                            m++;
                                        }
                                    }
                                }
                                for (
                                    var a = l.getBoundingClientRect(),
                                        n = t.clientY - a.top - r,
                                        x = t.clientX - a.left - s + u,
                                        S = n + h,
                                        I =
                                            (l.classList.remove(
                                                "div-hideReplaceBlock"
                                            ),
                                            this._myQueryAll(
                                                "thumbLists".concat(
                                                    this.uid,
                                                    ">li.dvs-activeThumb"
                                                )
                                            )),
                                        k = 0;
                                    k < I.length;
                                    k++
                                ) {
                                    var M = I[k];
                                    M.classList.add("dvs-absolute"),
                                        (M.style.left = "".concat(
                                            x + 5 * k,
                                            "px"
                                        )),
                                        (M.style.top = "".concat(
                                            S + 5 * k,
                                            "px"
                                        ));
                                }
                                this._pubSub._emit(
                                    Z,
                                    {
                                        index: o,
                                        pageX: t.pageX,
                                        pageY: t.pageY,
                                    },
                                    t
                                ),
                                    B(t);
                            }
                        }
                    }
                }),
                (e.dragUp = function () {
                    return this._dragUpFunction();
                }),
                (e.dragUpMobile = function () {
                    return (
                        document.removeEventListener("touchmove", B),
                        clearTimeout(this._dragTimer),
                        this._dragUpFunction()
                    );
                }),
                (e._dragUpFunction = function () {
                    if (this.isDrag) {
                        (this.thumbMoveOption = null), (this.isDrag = !1);
                        var t = this.ifDragMoves;
                        if ((this.clearAbsolute(), !t))
                            return (
                                this._viewerEmit(
                                    I,
                                    this.selectedIndexes.slice()
                                ),
                                !1
                            );
                        this.isDragUp = !0;
                        for (
                            var e = this._myQuery("thumbLists" + this.uid),
                                i = e.children.length,
                                n = [],
                                s = [],
                                r = [],
                                o = this.selectedIndexes.slice(0),
                                a = [],
                                l = 0;
                            l < i;
                            l++
                        ) {
                            var h = e.children[l],
                                u = h["dvs-defaultIndex"];
                            r.push(u),
                                !h.classList.contains("dvs-activeThumb") ||
                                    (-1 !== (h = o.indexOf(u)) &&
                                        u !== (a[h] = l) &&
                                        s.push([u, l])),
                                (n[l] = this._thumbnailCanvas[u]);
                        }
                        (this._thumbnailCanvas = n),
                            (this.selectedIndexes = a),
                            this._updateElements(),
                            this._viewerEmit(kt, r, a.slice()),
                            s.length && this._pubSub._emit(tt, s);
                    }
                }),
                (e.stretchStart = function (t) {
                    return (
                        1 !== t.button &&
                        !(
                            null == (e = t.target) ||
                            !e.classList.contains("dvs-stretchBar")
                        ) &&
                        void (
                            this.fullThumbnail ||
                            (e.classList.add("dvs-streching"),
                            (this._stretchItem = e),
                            (this._isStretching = !0),
                            B(t))
                        )
                    );
                    var e;
                }),
                (e.stretchMove = function (t) {
                    if (!this._isStretching) return !1;
                    var e,
                        i,
                        n = this._stretchItem;
                    if (!n || !this._thumbnailElement) return !1;
                    var s = this._thumbnailElement.getBoundingClientRect(),
                        r = n.classList;
                    r.contains("dvs-stretchRight")
                        ? ((e =
                              t.clientX - s.left < 0 ? 0 : t.clientX - s.left),
                          (n.style.left = e + "px"))
                        : r.contains("dvs-stretchLeft")
                        ? ((e =
                              s.right - t.clientX < 0
                                  ? 0
                                  : s.right - t.clientX),
                          (n.style.left = s.width - e + "px"))
                        : r.contains("dvs-stretchTop")
                        ? ((i =
                              s.bottom - t.clientY < 0
                                  ? 0
                                  : s.bottom - t.clientY),
                          (n.style.top = s.height - i + "px"))
                        : ((i = t.clientY - s.top < 0 ? 0 : t.clientY - s.top),
                          (n.style.top = i + "px"));
                }),
                (e.stretchEnd = function () {
                    if (!this._isStretching || !this._thumbnailElement)
                        return !1;
                    var t = this._stretchItem;
                    if (!t) return !1;
                    (this._stretchItem = null), (this._isStretching = !1);
                    var e = parseInt(t.style.left),
                        i = parseInt(t.style.top),
                        n = 0,
                        s = this._thumbnailElement.getBoundingClientRect(),
                        r = s.width - e,
                        s = s.height - i,
                        o =
                            null ==
                            (o = this._pubQuery(
                                "showImageArea" + this._postfix
                            ))
                                ? void 0
                                : o.getBoundingClientRect(),
                        e = Math.min(e, o.width),
                        i = Math.min(i, o.height),
                        n = t.classList.contains("dvs-stretchRight")
                            ? e / o.width
                            : t.classList.contains("dvs-stretchLeft")
                            ? r / o.width
                            : t.classList.contains("dvs-stretchTop")
                            ? s / o.height
                            : i / o.height;
                    (t.style.left = null),
                        (t.style.top = null),
                        t.classList.remove("dvs-streching"),
                        (this.size = Math.min(100 * n, 100).toFixed(2) + "%"),
                        this._pubSub._emit(Mt, { _size: this.size }),
                        this._resizeViewer();
                }),
                (e._updateStretchBars = function () {
                    var t = this._allowResizing,
                        e = this._location,
                        i = this._sequence,
                        n =
                            "horizontal" === e && t && 0 <= i
                                ? "remove"
                                : "add",
                        s = "vertical" === e && t && 0 <= i ? "remove" : "add",
                        r = "horizontal" === e && t && i < 0 ? "remove" : "add",
                        e = "vertical" === e && t && i < 0 ? "remove" : "add",
                        t = this.uid,
                        i = this._myQuery("stretchBarLeft".concat(t)),
                        o = this._myQuery("stretchBarRight".concat(t)),
                        a = this._myQuery("stretchBarTop".concat(t)),
                        t = this._myQuery("stretchBarBottom".concat(t));
                    null != i && i.classList[n]("dvs-nodisplay"),
                        null != o && o.classList[r]("dvs-nodisplay"),
                        null != a && a.classList[s]("dvs-nodisplay"),
                        null != t && t.classList[e]("dvs-nodisplay");
                }),
                (e._updateProps = function (t) {
                    for (var e in t) this[e] = t[e];
                }),
                (e._imageClickCallback = function (t, e) {
                    var i = this.selectedIndexes.slice();
                    if (
                        (e.ctrlKey || e.metaKey || this._multipleMode) &&
                        !e.shiftKey
                    ) {
                        var n = i.indexOf(t);
                        if (-1 === n) i.push(t);
                        else {
                            if (this.isDragUp) return void (this.isDragUp = !1);
                            if (1 === i.length && !this._multipleMode)
                                return !1;
                            i.splice(n, 1), (this._prtScrollOnce = !0);
                        }
                    } else if (!e.shiftKey || e.ctrlKey || e.metaKey)
                        if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
                            for (
                                var n = i.slice(0),
                                    s = n[n.length - 1],
                                    r = (n.push(t), t),
                                    o = t,
                                    a =
                                        (n.forEach(function (t) {
                                            t < r ? (r = t) : o < t && (o = t);
                                        }),
                                        []),
                                    l = r;
                                l <= o;
                                l++
                            )
                                l !== s && a.push(l);
                            0 <= s && a.push(s), (i = a);
                        } else
                            this.needClick ? (i = [t]) : (this.needClick = !0);
                    else {
                        var h = i[i.length - 1];
                        if (h === undefined) i.push(t);
                        else {
                            var u = [];
                            if (h < t) for (var c = t; h <= c; c--) u.push(c);
                            else for (var d = t; d <= h; d++) u.push(d);
                            i = u;
                        }
                    }
                    return this._viewerEmit(I, i), !0;
                }),
                (e._thumbnailDragStart = function (t) {
                    return u()
                        ? this.dragStartMobile(t)
                        : this.dragThumbnail(t);
                }),
                (e._thumbnailDragMove = function (t) {
                    return u() ? this.dragMoveMobile(t) : this.dragMove(t);
                }),
                (e._thumbnailDragUp = function () {
                    return u() ? this.dragUpMobile() : this.dragUp();
                }),
                (e._thumbnailMouseOver = function (t) {
                    var e;
                    this.allowHover &&
                        !this.ifDragMoves &&
                        ((e = this.getImageItem(t))
                            ? (e.classList.contains("dvs-activeThumb") ||
                                  ((e.style.background =
                                      this.hoverPageBackground),
                                  (e.style.border = this.hoverPageBorder)),
                              (e = e["dvs-defaultIndex"]),
                              this._pubSub._emit(
                                  Q,
                                  { index: e, pageX: t.pageX, pageY: t.pageY },
                                  t
                              ))
                            : this._pubSub._emit(
                                  Q,
                                  { index: -1, pageX: t.pageX, pageY: t.pageY },
                                  t
                              ));
                }),
                (e._thumbnailMouseOut = function (t) {
                    var e, i;
                    this.allowHover &&
                        !this.ifDragMoves &&
                        ((e = this.getImageItem(t))
                            ? ((i = e["dvs-defaultIndex"]),
                              this._pubSub._emit(
                                  j,
                                  { index: i, pageX: t.pageX, pageY: t.pageY },
                                  t
                              ),
                              e.classList.contains("dvs-activeThumb")
                                  ? ((e.style.background =
                                        this.selectedPageBackground),
                                    (e.style.border = this.selectedPageBorder))
                                  : ((e.style.background =
                                        this._pageBackground),
                                    (e.style.border = this.pageBorder)))
                            : this._pubSub._emit(
                                  j,
                                  { index: -1, pageX: t.pageX, pageY: t.pageY },
                                  t
                              ));
                }),
                (e._thumbnailClick = function (t) {
                    var e;
                    this.ifDragMoves ||
                        this.isDragUp ||
                        ((e = this.getImageItem(t))
                            ? ((e = e["dvs-defaultIndex"]),
                              this._imageClickCallback(e, t),
                              this._pubSub._emit(
                                  q,
                                  { index: e, pageX: t.pageX, pageY: t.pageY },
                                  t
                              ))
                            : this._pubSub._emit(
                                  q,
                                  { index: -1, pageX: t.pageX, pageY: t.pageY },
                                  t
                              ));
                }),
                (e._thumbnailRightClick = function (t) {
                    var e = this.getImageItem(t);
                    if (e) {
                        if (this.ifDragMoves) return !1;
                        e = e["dvs-defaultIndex"];
                        this._pubSub._emit(
                            G,
                            { index: e, pageX: t.pageX, pageY: t.pageY },
                            t
                        ),
                            this._pubSub._emit(
                                $,
                                { index: e, pageX: t.pageX, pageY: t.pageY },
                                t
                            ),
                            -1 !== this.selectedIndexes.indexOf(e) ||
                                (u() && this.allowPageDragging) ||
                                this._pubSub._emit(I, [e]);
                    } else
                        this._pubSub._emit(
                            G,
                            { index: -1, pageX: t.pageX, pageY: t.pageY },
                            t
                        ),
                            this._pubSub._emit(
                                $,
                                { index: -1, pageX: t.pageX, pageY: t.pageY },
                                t
                            );
                }),
                (e._thumbnailDoubleClick = function (t) {
                    var e = this.getImageItem(t);
                    e
                        ? ((e = e["dvs-defaultIndex"]),
                          this._pubSub._emit(
                              K,
                              { index: e, pageX: t.pageX, pageY: t.pageY },
                              t
                          ))
                        : this._pubSub._emit(
                              K,
                              { index: -1, pageX: t.pageX, pageY: t.pageY },
                              t
                          );
                }),
                (e._thumbnailPointerDown = function (t) {
                    var e = this.getImageItem(t);
                    e
                        ? ((e = e["dvs-defaultIndex"]),
                          this._pubSub._emit(
                              s,
                              { index: e, pageX: t.pageX, pageY: t.pageY },
                              t
                          ))
                        : this._pubSub._emit(
                              s,
                              { index: -1, pageX: t.pageX, pageY: t.pageY },
                              t
                          );
                }),
                (e._thumbnailPointerMove = function (t) {
                    var e;
                    this.ifDragMoves
                        ? (this.isInner
                              ? null == (e = this._oPub) ||
                                null == (e = e._events) ||
                                null == (e = e[C])
                                  ? void 0
                                  : e.length
                              : null == (e = this._pubSub) ||
                                null == (e = e.getPublishSubscribe()) ||
                                null == (e = e._events) ||
                                null == (e = e[C])
                              ? void 0
                              : e.length) &&
                          ((e = this._getPointIndex(t)),
                          this._pubSub._emit(
                              C,
                              { index: e, pageX: t.pageX, pageY: t.pageY },
                              t
                          ))
                        : (e = this.getImageItem(t))
                        ? ((e = e["dvs-defaultIndex"]),
                          this._pubSub._emit(
                              C,
                              { index: e, pageX: t.pageX, pageY: t.pageY },
                              t
                          ))
                        : this._pubSub._emit(
                              C,
                              { index: -1, pageX: t.pageX, pageY: t.pageY },
                              t
                          );
                }),
                (e._thumbnailPointerUp = function (t) {
                    var e;
                    this.ifDragMoves
                        ? ((e = this._getPointIndex(t)),
                          this._pubSub._emit(
                              x,
                              { index: e, pageX: t.pageX, pageY: t.pageY },
                              t
                          ))
                        : (e = this.getImageItem(t))
                        ? ((e = e["dvs-defaultIndex"]),
                          this._pubSub._emit(
                              x,
                              { index: e, pageX: t.pageX, pageY: t.pageY },
                              t
                          ))
                        : this._pubSub._emit(
                              x,
                              { index: -1, pageX: t.pageX, pageY: t.pageY },
                              t
                          );
                }),
                (e._thumbnailScroll = function () {
                    this.triggerTopImageChange("scroll");
                }),
                (e._thumbnailStretchStart = function (t) {
                    this.stretchStart(t);
                }),
                (e._documentMouseMove = function (t) {
                    this.stretchMove(t);
                }),
                (e._documentMouseUp = function () {
                    this.stretchEnd(), this.dragUp();
                }),
                (e.getImageItem = function (t) {
                    var e;
                    if (!t) return null;
                    if (
                        !(t = r(t) ? t : t.target) ||
                        (null != (e = t.classList) &&
                            e.contains("dvs-replaceBlock"))
                    )
                        return null;
                    if ("CANVAS" === t.tagName) t = t.parentNode;
                    else {
                        if (
                            t ===
                            (null == (e = this._thumbnailElement)
                                ? void 0
                                : e.querySelector(".dvs-thumbLists"))
                        )
                            return !1;
                        if ("LI" !== t.tagName) return null;
                    }
                    return t;
                }),
                (e._getPointIndex = function (t) {
                    var e =
                        null == (e = this._thumbnailElement)
                            ? void 0
                            : e.querySelector(".dvs-thumbLists");
                    if (!e) return -1;
                    for (var i = e.children, n = 0; n < i.length; n++) {
                        var s,
                            r = i[n];
                        if (
                            this._isPointerOverElement(t, r) &&
                            (null == (s = r.classList) ||
                                !s.contains("dvs-activeThumb"))
                        )
                            return this.getIndexByCallback(r, function (t) {
                                return null == (t = t.classList)
                                    ? void 0
                                    : t.contains("dvs-activeThumb");
                            });
                    }
                    return -1;
                }),
                (e.getIndexByCallback = function (t, e) {
                    for (
                        var i = t.parentNode, n = i.children, s = 0, r = 0;
                        r < n.length;
                        r++
                    ) {
                        var o = n[r];
                        if (l(e)) {
                            if (!e(o, i)) {
                                if (o === t) return s;
                                s++;
                            }
                        } else if (o === t) return r;
                    }
                    return -1;
                }),
                (e.clearAbsolute = function () {
                    var t = this._myQuery("thumbLists" + this.uid);
                    if (!t) return !1;
                    for (
                        var e = this._myQueryAll(
                                "thumbLists".concat(
                                    this.uid,
                                    ">li.dvs-replaceBlock"
                                )
                            ),
                            i =
                                ((this.ifDragMoves = !1),
                                (this.isDrag = !1),
                                this._myQueryAll(
                                    "thumbLists".concat(
                                        this.uid,
                                        ">li.dvs-absolute"
                                    )
                                )),
                            n = 0;
                        n < i.length;
                        n++
                    ) {
                        var s = i[n];
                        R(s, e[n], t),
                            s.classList.remove("dvs-absolute"),
                            (s.style.left = null),
                            (s.style.top = null);
                    }
                    for (var r = 0; r < e.length; r++) {
                        var o = e[r];
                        t.removeChild(o);
                    }
                    "vertical" === this.scrollDirection
                        ? (t.style.overflowY = "auto")
                        : (t.style.overflowX = "auto");
                }),
                (e.setPercent = function (t) {
                    var e = this._thumbnailElement;
                    e &&
                        ((e.style.flex = "0 0 ".concat(t, "%")),
                        (e.style.msFlex = "0 0 ".concat(t, "%")));
                }),
                (e.getIndexByUid = function (t) {
                    for (var e, i = 0; i < this._thumbnailCanvas.length; i++)
                        if (
                            t ===
                            (null == (e = this._thumbnailCanvas[i])
                                ? void 0
                                : e.uid)
                        )
                            return i;
                    return -1;
                }),
                (e.getUidByIndex = function (t) {
                    return null == (t = this._thumbnailCanvas[t])
                        ? void 0
                        : t.uid;
                }),
                (e._resizeViewer = function (t) {
                    (t = void 0 === t ? !1 : t)
                        ? this._viewerEmit(
                              k,
                              this.uid,
                              this.showLatestPage.bind(this)
                          )
                        : this._viewerEmit(k);
                }),
                (e._setSplitBarDelay = function () {
                    var t = this;
                    this.isInner ||
                        (clearTimeout(this._splitTimer),
                        (this._splitTimer = setTimeout(function () {
                            t._viewerEmit("onSetSplitBar");
                        }, 50)));
                }),
                (e._isPointerOverElement = function (t, e) {
                    if (!t || !e) return !1;
                    var i = -1,
                        n = -1,
                        s =
                            ((n =
                                null != (s = t.changedTouches) && s[0]
                                    ? ((i = (s = t.changedTouches[0]).clientX),
                                      s.clientY)
                                    : ((i = t.clientX), t.clientY)),
                            e.getBoundingClientRect());
                    return (
                        i >= s.left &&
                        n >= s.top &&
                        i <= s.right &&
                        n <= s.bottom
                    );
                }),
                (e._myQuery = function (t) {
                    var e;
                    return null == (e = this._thumbnailElement)
                        ? void 0
                        : e.querySelector("#" + t);
                }),
                (e._myQueryAll = function (t) {
                    var e;
                    return null == (e = this._thumbnailElement)
                        ? void 0
                        : e.querySelectorAll("#" + t);
                }),
                (e._pubQuery = function (t) {
                    var e;
                    return null == (e = this._viewerContainer) ||
                        null == (e = e.el)
                        ? void 0
                        : e.querySelector("#" + t);
                }),
                (e._viewerEmit = function (t) {
                    for (
                        var e,
                            i = arguments.length,
                            n = new Array(1 < i ? i - 1 : 0),
                            s = 1;
                        s < i;
                        s++
                    )
                        n[s - 1] = arguments[s];
                    (e = o.prototype._emit).call.apply(e, [this, t].concat(n));
                }),
                (e.dispose = function () {
                    var t;
                    this.unbindUi(),
                        o.prototype.dispose.call(this),
                        null != (t = this._pubSub) && t.dispose(),
                        (this._pubSub = null),
                        (this._viewerContainer = null),
                        (this._thumbnailElement = null);
                }),
                Ae(t, [
                    {
                        key: "selectedBoxLineColor",
                        set: function (t) {
                            Object.assign(this.cropBoxStyle, {
                                borderColor: t,
                                ctrlBorderColor: t,
                            });
                        },
                    },
                    {
                        key: "optimizeImage",
                        get: function () {
                            return this._optimizeImage;
                        },
                        set: function (e) {
                            (this._optimizeImage = e),
                                this._thumbnailCanvas.forEach(function (t) {
                                    t.setOptimizeImage(e);
                                }),
                                this.renderCanvas();
                        },
                    },
                    {
                        key: "multiSelectMode",
                        get: function () {
                            return this._multipleMode;
                        },
                        set: function (t) {
                            this._multipleMode = t;
                        },
                    },
                    {
                        key: "checkbox",
                        get: function () {
                            return this._checkboxConfig;
                        },
                        set: function (t) {
                            var e = this;
                            Object.assign(this._checkboxConfig, t),
                                this._thumbnailCanvas.forEach(function (t) {
                                    t.updateCheckboxConfig(e._checkboxConfig);
                                }),
                                this.renderCanvas();
                        },
                    },
                    {
                        key: "pageNumber",
                        get: function () {
                            return this._pageNumberConfig;
                        },
                        set: function (t) {
                            var e = this;
                            Object.assign(this._pageNumberConfig, t),
                                this._thumbnailCanvas.forEach(function (t) {
                                    t.updatePageNumberConfig(
                                        e._pageNumberConfig
                                    );
                                }),
                                (this._showPageNumber =
                                    "visible" ===
                                    this._pageNumberConfig.visibility),
                                this.renderCanvas();
                        },
                    },
                    {
                        key: "size",
                        get: function () {
                            return this._size;
                        },
                        set: function (t) {
                            (this._size = t),
                                (t = String(t)),
                                this._fullThumbnail
                                    ? (t = "100%")
                                    : /\d+$/.test(t) && (t += "px");
                            var e = this._thumbnailElement;
                            e &&
                                ((e.style.flex = "0 0 ".concat(t)),
                                (e.style.msFlex = "0 0 ".concat(t)),
                                "vertical" === this.location
                                    ? ((e.style.width = "100%"),
                                      (e.style.maxWidth = "100%"),
                                      (e.style.height = t),
                                      (e.style.maxHeight = t))
                                    : ((e.style.width = t),
                                      (e.style.maxWidth = t),
                                      (e.style.height = "100%"),
                                      (e.style.maxHeight = "100%")),
                                this._resizeViewer());
                        },
                    },
                    {
                        key: "mouseShape",
                        get: function () {
                            return this._mouseShape;
                        },
                        set: function (t) {
                            this._mouseShape = t;
                            var e = this._thumbnailElement;
                            e && (e.style.cursor = t);
                        },
                    },
                    {
                        key: "scrollDirection",
                        get: function () {
                            return this._scrollDirection;
                        },
                        set: function (t) {
                            this._scrollDirection = t;
                            var e = this._thumbnailElement;
                            e &&
                                ((e = e.querySelector(
                                    "#thumbLists" + this.uid
                                )),
                                "vertical" === t
                                    ? ((e.style.flexDirection = "row"),
                                      (e.style.overflowX = "hidden"),
                                      (e.style.overflowY = "auto"))
                                    : ((e.style.flexDirection = "column"),
                                      (e.style.overflowX = "auto"),
                                      (e.style.overflowY = "hidden")),
                                this._resizeViewer(!0));
                        },
                    },
                    {
                        key: "sequence",
                        get: function () {
                            return this._sequence;
                        },
                        set: function (t) {
                            this._sequence = t;
                            var e = this._thumbnailElement;
                            e &&
                                ((e.style.order = String(t)),
                                (e.style.msFlexOrder = t),
                                this._updateStretchBars(),
                                this._setSplitBarDelay());
                        },
                    },
                    {
                        key: "location",
                        get: function () {
                            return this._location;
                        },
                        set: function (t) {
                            this._location = t;
                            var e,
                                i = null,
                                n =
                                    null == (n = this._viewerContainer)
                                        ? void 0
                                        : n.el;
                            n &&
                                this._thumbnailElement &&
                                ((e = {
                                    vertical: "#content" + this._postfix,
                                    horizontal: "#middle" + this._postfix,
                                    canvas: "#innerThumbnail" + this._postfix,
                                }),
                                (i =
                                    null == n
                                        ? void 0
                                        : n.querySelector(e[t])) &&
                                    i.appendChild(this._thumbnailElement),
                                this._updateStretchBars(),
                                (this.size = this._size),
                                this._setSplitBarDelay(),
                                this._resizeViewer(!0));
                        },
                    },
                    {
                        key: "showThumbnail",
                        get: function () {
                            return this._showThumbnail;
                        },
                        set: function (t) {
                            this._showThumbnail = t;
                            var e = this._thumbnailElement;
                            e &&
                                (t
                                    ? e.classList.remove("dvs-disabled")
                                    : e.classList.add("dvs-disabled"),
                                this.updatePageLayout(),
                                this._resizeViewer(!0),
                                this._setSplitBarDelay());
                        },
                    },
                    {
                        key: "showPageNumber",
                        get: function () {
                            return this._showPageNumber;
                        },
                        set: function (t) {
                            var e = this;
                            (this._showPageNumber = t),
                                (this.pageNumber.visibility = t
                                    ? "visible"
                                    : "hidden"),
                                this._thumbnailCanvas.forEach(function (t) {
                                    t.updatePageNumberConfig(
                                        e._pageNumberConfig
                                    );
                                }),
                                this.renderCanvas();
                        },
                    },
                    {
                        key: "fullThumbnail",
                        get: function () {
                            return this._fullThumbnail;
                        },
                        set: function (t) {
                            (this._fullThumbnail = t), (this.size = this._size);
                            var e = this._myQuery(
                                "thumbnailStretchBarRight" + this.uid
                            );
                            e &&
                                (t
                                    ? e.classList.add("dvs-nodisplay")
                                    : e.classList.remove("dvs-nodisplay"));
                        },
                    },
                    {
                        key: "background",
                        get: function () {
                            return this._background;
                        },
                        set: function (t) {
                            this._background = t;
                            var e = this._myQuery("thumbLists" + this.uid);
                            e && (e.style.background = t);
                        },
                    },
                    {
                        key: "border",
                        get: function () {
                            return this._border;
                        },
                        set: function (t) {
                            this._border = t;
                            var e = this._thumbnailElement;
                            e && (e.style.border = t);
                        },
                    },
                    {
                        key: "selectedPageBorder",
                        get: function () {
                            return this._selectedPageBorder;
                        },
                        set: function (t) {
                            this._selectedPageBorder = t;
                            for (
                                var e = this._myQueryAll(
                                        "thumbLists".concat(
                                            this.uid,
                                            ">li.dvs-activeThumb"
                                        )
                                    ),
                                    i = 0;
                                i < e.length;
                                i++
                            )
                                e[i].style.border = t;
                        },
                    },
                    {
                        key: "selectedPageBackground",
                        get: function () {
                            return this._selectedPageBackground;
                        },
                        set: function (t) {
                            this._selectedPageBackground = t;
                            for (
                                var e = this._myQueryAll(
                                        "thumbLists".concat(
                                            this.uid,
                                            ">li.dvs-activeThumb"
                                        )
                                    ),
                                    i = 0;
                                i < e.length;
                                i++
                            )
                                e[i].style.background = t;
                        },
                    },
                    {
                        key: "pageBackground",
                        get: function () {
                            return this._pageBackground;
                        },
                        set: function (t) {
                            this._pageBackground = t;
                            var e = this._myQuery("thumbLists" + this.uid);
                            if (e && e.children)
                                for (
                                    var i = e.children, n = 0;
                                    n < i.length;
                                    n++
                                ) {
                                    var s = i[n];
                                    s.classList.contains("dvs-activeThumb") ||
                                        (s.style.background = t);
                                }
                        },
                    },
                    {
                        key: "pageBorder",
                        get: function () {
                            return this._pageBorder;
                        },
                        set: function (t) {
                            this._pageBorder = t;
                            var e = this._myQuery("thumbLists" + this.uid);
                            if (e && e.children)
                                for (
                                    var i = e.children, n = 0;
                                    n < i.length;
                                    n++
                                ) {
                                    var s = i[n];
                                    s.classList.contains("dvs-activeThumb") ||
                                        (s.style.border = t);
                                }
                        },
                    },
                    {
                        key: "pageMargin",
                        get: function () {
                            return this._pageMargin;
                        },
                        set: function (t) {
                            (this._pageMargin = t),
                                (this._currentPageMargin = -1),
                                this._resizeViewer(!0);
                        },
                    },
                    {
                        key: "allowResizing",
                        get: function () {
                            return this._allowResizing;
                        },
                        set: function (t) {
                            (this._allowResizing = t),
                                this._updateStretchBars();
                        },
                    },
                    {
                        key: "showRemoveBtn",
                        get: function () {
                            return this._showRemoveBtn;
                        },
                        set: function (t) {
                            (this._showRemoveBtn = t)
                                ? null != (t = this._thumbnailElement) &&
                                  t.classList.remove("dvs-hide-remove-btn")
                                : null != (t = this._thumbnailElement) &&
                                  t.classList.add("dvs-hide-remove-btn");
                        },
                    },
                ]),
                t
            );
        })(E);
    function qe(t) {
        if (void 0 === t)
            throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
            );
        return t;
    }
    var Qe = (function () {
            function t(e) {
                var i = this;
                (this.uid = null),
                    (this.mode = "normal"),
                    (this.vertexes = []),
                    (this.midpoints = []),
                    (this.probePoints = []),
                    (this.slopeRatio = []),
                    (this.isCrop = !1),
                    (this.isConvex = !0),
                    (this.isPointSelected = !1),
                    (this.activeProbePoint = null),
                    (this.moveLeft = 0),
                    (this.moveTop = 0),
                    (this.isMoveBox = !1),
                    (this.width = 0),
                    (this.height = 0),
                    (this.type = "bottomRight"),
                    (this.keepAspectRatio = !1),
                    (this.aspectRatio = 0),
                    (this._startX = null),
                    (this._startY = null),
                    (this._lastX = null),
                    (this._lastY = null),
                    (this._lastWhr = 1),
                    (this.zoom = 1),
                    (this.dpr = 1),
                    (this.cropBoxStyle = { ctrlWidth: 8, ctrlHeight: 8 }),
                    (this.uid = f(11)),
                    Object.keys(e).forEach(function (t) {
                        i[t] = e[t];
                    }),
                    this._initBox();
            }
            var e = t.prototype;
            return (
                (e.getRect = function () {
                    if ("free" === this.mode) return null;
                    var t = this._getMaxPoint(),
                        e = t.minX,
                        i = t.maxX,
                        n = t.minY,
                        t = t.maxY;
                    return {
                        x: Math.floor(e),
                        y: Math.floor(n),
                        width: Math.floor(i - e),
                        height: Math.floor(t - n),
                    };
                }),
                (e._initBox = function () {
                    (this.midpoints = this._calcMidpoint(this.vertexes)),
                        (this.probePoints = this.vertexes
                            .slice()
                            .concat(this.midpoints.slice())),
                        (this.slopeRatio = this._calcSlopeRatio(this.vertexes));
                }),
                (e._getMaxPoint = function () {
                    return {
                        minX: Math.min(
                            this.probePoints[0],
                            this.probePoints[2],
                            this.probePoints[4],
                            this.probePoints[6]
                        ),
                        maxX: Math.max(
                            this.probePoints[0],
                            this.probePoints[2],
                            this.probePoints[4],
                            this.probePoints[6]
                        ),
                        minY: Math.min(
                            this.probePoints[1],
                            this.probePoints[3],
                            this.probePoints[5],
                            this.probePoints[7]
                        ),
                        maxY: Math.max(
                            this.probePoints[1],
                            this.probePoints[3],
                            this.probePoints[5],
                            this.probePoints[7]
                        ),
                    };
                }),
                (e.checkPointPosition = function (t) {
                    var e = this._getMaxPoint(),
                        i = e.minX,
                        n = e.maxX,
                        s = e.minY,
                        e = e.maxY,
                        r = this.probePoints[2 * t],
                        o = this.probePoints[2 * t + 1];
                    return t < 4
                        ? r === n && o === e
                            ? "se"
                            : r === n && o === s
                            ? "ne"
                            : r === i && o === s
                            ? "nw"
                            : r === i && o === e
                            ? "sw"
                            : null
                        : r === n
                        ? "e"
                        : o === e
                        ? "s"
                        : r === i
                        ? "w"
                        : o === s
                        ? "n"
                        : null;
                }),
                (e.onStartHandler = function (t, e, i) {
                    var n = this.isBoxSelected(t, e);
                    null !== (n = i !== undefined ? i : n) &&
                        ((this._startX = t),
                        (this._startY = e),
                        (this._lastX = t),
                        (this._lastY = e),
                        -1 === n
                            ? ((this.isPointSelected = !1),
                              (this.activeProbePoint = null),
                              "normal" === this.mode && (this.isMoveBox = !0))
                            : ((this.isPointSelected = !0),
                              (this.activeProbePoint = n),
                              (this.isMoveBox = !1)),
                        "free" === this.mode &&
                            3 < n &&
                            ((this.k1 = this.slopeRatio[(1 + (i = n - 4)) % 4]),
                            (this.b1 =
                                this.probePoints[(2 * i + 3) % 8] -
                                this.k1 * this.probePoints[(2 * i + 2) % 8]),
                            (this.k2 = this.slopeRatio[(3 + i) % 4]),
                            (this.b2 =
                                this.probePoints[(2 * i + 1) % 8] -
                                this.k2 * this.probePoints[(2 * i + 0) % 8])));
                }),
                (e.onMoveHandler = function (t, e, i) {
                    if (this.isPointSelected || this.isMoveBox) {
                        var n = this.probePoints.slice();
                        if (this.isPointSelected) {
                            var s = this.activeProbePoint,
                                i =
                                    (i !== undefined && (s = i),
                                    "normal" === this.mode
                                        ? (n = this._movePointNormal(
                                              n,
                                              s,
                                              t,
                                              e
                                          ))
                                        : ((n = this._movePointFree(
                                              n,
                                              s,
                                              t,
                                              e
                                          )),
                                          (this.slopeRatio =
                                              this._calcSlopeRatio(
                                                  this.probePoints
                                              ).slice(0, 4))),
                                    (this.probePoints = n.slice()),
                                    this._checkRectConvexity(this.probePoints));
                            this.isConvex = !!i;
                        } else if (this.isMoveBox) {
                            (s = t - this._lastX), (i = e - this._lastY);
                            if (0 == s && 0 == i) return;
                            (n = this._moveBox(n, s, i)),
                                (this.probePoints = n.slice());
                        }
                        s = this._calcMidpoint(this.probePoints);
                        (this.probePoints = this.probePoints
                            .slice(0, 8)
                            .concat(s)),
                            (this.midpoints = s),
                            (this._lastX = t),
                            (this._lastY = e);
                    }
                }),
                (e.onEndHandler = function () {
                    this.isConvex = !0;
                    var t,
                        e = this._startX,
                        i = this._startY,
                        n =
                            ((this._startX = 0),
                            (this._startY = 0),
                            this._lastX),
                        s = this._lastY;
                    (this.isPointSelected || this.isMoveBox) &&
                        ((this.isPointSelected = !1),
                        (this.isMoveBox = !1),
                        (this.activeProbePoint = null),
                        (t = this._checkRectConvexity(this.probePoints)),
                        ((e !== n || i !== s) && t) ||
                            (this.probePoints = this.vertexes
                                .slice()
                                .concat(this.midpoints)),
                        (this.vertexes = this.probePoints.slice(0, 8)),
                        (this.midpoints = this._calcMidpoint(this.probePoints)),
                        (this.probePoints = this.probePoints
                            .slice(0, 8)
                            .concat(this.midpoints)),
                        (this.slopeRatio = this._calcSlopeRatio(
                            this.probePoints
                        ).slice(0, 4)));
                }),
                (e._checkEdge = function (t, e) {
                    return (
                        0 <= t && t <= this.width && 0 <= e && e < this.height
                    );
                }),
                (e._movePointNormal = function (t, e, i, n) {
                    (i = Math.max(0, Math.min(this.width, i))),
                        (n = Math.max(0, Math.min(this.height, n)));
                    var s = 0,
                        r = 0;
                    if (this.keepAspectRatio) {
                        var o = this._getMaxPoint(),
                            a = o.minX,
                            l = o.maxX,
                            h = o.minY,
                            o = o.maxY,
                            u = this.checkPointPosition(e),
                            l = (l - a) / (o - h),
                            a =
                                (0 === l ||
                                l === Infinity ||
                                l === -Infinity ||
                                isNaN(l)
                                    ? (l = this._lastWhr)
                                    : (this._lastWhr = l),
                                (r = s = 0),
                                "width");
                        if (e < 4) {
                            if (
                                ((s = i - t[2 * e]),
                                (r = n - t[2 * e + 1]),
                                0 === s || 0 === r)
                            )
                                return t;
                            a = "width";
                        } else {
                            o = e - 4;
                            if (
                                ("e" === u
                                    ? ((e = (1 + o) % 4), (a = "width"))
                                    : "s" === u
                                    ? ((e = o), (a = "height"))
                                    : "w" === u
                                    ? ((e = o), (a = "width"))
                                    : "n" === u &&
                                      ((e = (1 + o) % 4), (a = "height")),
                                (s = i - t[2 * o]),
                                (r = n - t[2 * o + 1]),
                                0 === s || 0 === r)
                            )
                                return t;
                        }
                        "height" === a
                            ? ((s = r * l),
                              ("ne" !== u &&
                                  "sw" !== u &&
                                  "n" !== u &&
                                  "w" !== u) ||
                                  (s = -s))
                            : ((r = s / l),
                              ("ne" !== u &&
                                  "sw" !== u &&
                                  "n" !== u &&
                                  "w" !== u) ||
                                  (r = -r));
                        (h = t[2 * e] + s),
                            (o = t[2 * e + 1] + r),
                            (a =
                                (h < 0
                                    ? ((s = 0 - t[2 * e]), (r = 0))
                                    : h > this.width
                                    ? ((s = this.width - t[2 * e]), (r = 0))
                                    : o < 0
                                    ? ((r = 0 - t[2 * e + 1]), (s = 0))
                                    : o > this.height &&
                                      ((r = this.height - t[2 * e + 1]),
                                      (s = 0)),
                                (t[2 * e] += s),
                                (t[2 * e + 1] += r),
                                (e + 1) % 4)),
                            (l = (e + 3) % 4);
                        e % 2
                            ? ((t[2 * a] += s), (t[2 * l + 1] += r))
                            : ((t[2 * a + 1] += r), (t[2 * l] += s));
                    } else if (e < 4) {
                        if (
                            ((s = i - t[2 * e]),
                            (r = n - t[2 * e + 1]),
                            0 === s && 0 === r)
                        )
                            return t;
                        (t[2 * e] = i), (t[2 * e + 1] = n);
                        (u = (e + 1) % 4), (h = (e + 3) % 4);
                        e % 2
                            ? ((t[2 * u] = i), (t[2 * h + 1] = n))
                            : ((t[2 * u + 1] = n), (t[2 * h] = i));
                    } else {
                        (o = e - 4), (a = this.slopeRatio[o % 4]);
                        0 === a
                            ? ((t[(2 * o + 3) % 8] = n),
                              (t[(2 * o + 1) % 8] = n))
                            : (a !== Infinity && a !== -Infinity) ||
                              ((t[(2 * o + 2) % 8] = i),
                              (t[(2 * o + 0) % 8] = i));
                    }
                    return t;
                }),
                (e._movePointFree = function (t, e, i, n) {
                    (i = Math.max(0, Math.min(this.width, i))),
                        (n = Math.max(0, Math.min(this.height, n)));
                    var s = t.slice();
                    if (e < 4) {
                        var r = i - t[2 * e],
                            o = n - t[2 * e + 1];
                        if (0 == r && 0 == o) return t;
                        (t[2 * e] = i), (t[2 * e + 1] = n);
                    } else {
                        var r = e - 4,
                            o = this.slopeRatio[r % 4],
                            e = n - o * i,
                            a = -e / o,
                            l = e,
                            h = t[(2 * r + 9) % 8] - o * t[(2 * r + 8) % 8],
                            u = -h / o,
                            c = this.k1,
                            d = this.b1,
                            _ = this.k2,
                            m = this.b2;
                        0 === o
                            ? ((t[(2 * r + 3) % 8] = n),
                              c !== Infinity &&
                                  c !== -Infinity &&
                                  (t[(2 * r + 2) % 8] = (n - d) / c),
                              (t[(2 * r + 1) % 8] = n),
                              _ !== Infinity &&
                                  _ !== -Infinity &&
                                  (t[(2 * r + 0) % 8] = (n - m) / _))
                            : o === Infinity || o === -Infinity
                            ? ((t[(2 * r + 2) % 8] = i),
                              (t[(2 * r + 3) % 8] = c * i + d),
                              (t[(2 * r + 0) % 8] = i),
                              (t[(2 * r + 1) % 8] = _ * i + m))
                            : (0 === c
                                  ? (t[(2 * r + 2) % 8] += a - u)
                                  : c === Infinity || c === -Infinity
                                  ? (t[(2 * r + 3) % 8] += l - h)
                                  : ((t[(2 * r + 2) % 8] = (d - e) / (o - c)),
                                    (t[(2 * r + 3) % 8] =
                                        (o * d - c * e) / (o - c))),
                              0 === _
                                  ? (t[(2 * r + 0) % 8] += a - u)
                                  : _ === Infinity || _ === -Infinity
                                  ? (t[(2 * r + 1) % 8] += l - h)
                                  : ((t[(2 * r + 0) % 8] = (m - e) / (o - _)),
                                    (t[(2 * r + 1) % 8] =
                                        (o * m - _ * e) / (o - _))));
                        for (var p = 0; p < 4; p++) {
                            var f = t[2 * p],
                                v = t[2 * p + 1];
                            if (
                                f < 0 ||
                                f > this.width ||
                                v < 0 ||
                                v > this.height
                            )
                                return s;
                        }
                    }
                    return t;
                }),
                (e._moveBox = function (t, e, i) {
                    if ("normal" === this.mode) {
                        var n = Math.min(t[0], t[2], t[4], t[6]),
                            s = Math.max(t[0], t[2], t[4], t[6]),
                            r = Math.min(t[1], t[3], t[5], t[7]),
                            o = Math.max(t[1], t[3], t[5], t[7]);
                        s + (e = n + e < 0 ? -n : e) > this.width &&
                            (e = this.width - s),
                            o + (i = r + i < 0 ? -r : i) > this.height &&
                                (i = this.height - o);
                        for (var a = 0; a < 4; a++)
                            (t[2 * a] += e), (t[2 * a + 1] += i);
                    }
                    return t;
                }),
                (e._isPointOnBox = function (t, e) {
                    var i, n, s, r;
                    return (
                        "normal" === this.mode &&
                        ((i = (r = this._getMaxPoint()).minX),
                        (n = r.maxX),
                        (s = r.minY),
                        (r = r.maxY),
                        i <= t && t <= n && s <= e && e <= r)
                    );
                }),
                (e.isBoxSelected = function (t, e) {
                    var i = this._isPointOnBox(t, e),
                        t = this.isCtrlPointSelected(t, e);
                    return null !== t ? t : i ? -1 : null;
                }),
                (e.isCtrlPointSelected = function (t, e) {
                    for (
                        var i = this.cropBoxStyle.ctrlWidth / this.zoom / 2,
                            n = this.cropBoxStyle.ctrlHeight / this.zoom / 2,
                            s = this._getMaxPoint(),
                            r = s.minX,
                            o = s.maxX,
                            a = s.minY,
                            s = s.maxY,
                            i = Math.min(Math.max(i, 0.1 * (o - r)), 3 * i),
                            n = Math.min(Math.max(n, 0.1 * (s - a)), 3 * n),
                            l = 0;
                        l < 8;
                        l++
                    ) {
                        var h = this.probePoints[2 * l],
                            u = this.probePoints[2 * l + 1];
                        if (
                            t <= h + i &&
                            h - i <= t &&
                            e <= u + n &&
                            u - n <= e &&
                            0 <= t &&
                            t <= this.width &&
                            0 <= e &&
                            e <= this.height
                        )
                            return l;
                    }
                    return null;
                }),
                (e._checkRectConvexity = function (t) {
                    var e =
                            (t[6] - t[0]) * (t[3] - t[1]) -
                            (t[7] - t[1]) * (t[2] - t[0]),
                        i =
                            (t[0] - t[2]) * (t[5] - t[3]) -
                            (t[1] - t[3]) * (t[4] - t[2]),
                        n =
                            (t[2] - t[4]) * (t[7] - t[5]) -
                            (t[3] - t[5]) * (t[6] - t[4]),
                        s =
                            (t[4] - t[6]) * (t[1] - t[7]) -
                            (t[5] - t[7]) * (t[0] - t[6]);
                    if (e * i * n * s < 0) return !1;
                    var r = t.slice().concat(t.slice(0, 2));
                    if (this.slopeRatio.length)
                        for (var o = 0; o < 2; o++)
                            if (this.slopeRatio[o] !== this.slopeRatio[o + 2])
                                if (
                                    this._calcIntersection(
                                        r.slice(2 * o, 2 * o + 2),
                                        r.slice(2 * o + 2, 2 * o + 4),
                                        r.slice(2 * o + 4, 2 * o + 6),
                                        r.slice(2 * o + 6, 2 * o + 8)
                                    )
                                )
                                    return !1;
                    return 0 < e * i * n * s;
                }),
                (e._calcMidpoint = function (t) {
                    for (
                        var e = t.slice(0, 8).concat(t[0], t[1]), i = [], n = 0;
                        n < 4;
                        n++
                    ) {
                        var s = (e[2 * n] + e[2 * n + 2]) / 2,
                            r = (e[2 * n + 1] + e[2 * n + 3]) / 2;
                        i.push(s, r);
                    }
                    return i;
                }),
                (e._calcSlopeRatio = function (t) {
                    for (
                        var e = [],
                            i = null,
                            n = t.slice(0, 8).concat(t[0], t[1]),
                            s = 0;
                        s < 4;
                        s++
                    )
                        (i =
                            n[2 * s + 3] - n[2 * s + 1] == 0 &&
                            n[2 * s + 2] - n[2 * s] == 0
                                ? 0
                                : (n[2 * s + 3] - n[2 * s + 1]) /
                                  (n[2 * s + 2] - n[2 * s])),
                            e.push(i);
                    return e;
                }),
                (e._calcIntersection = function (t, e, i, n) {
                    if (
                        this._isRectCross(t, e, i, n) &&
                        this._isLineSegmentCross(t, e, i, n)
                    ) {
                        var s =
                                (n[0] - i[0]) * (t[1] - e[1]) -
                                (e[0] - t[0]) * (i[1] - n[1]),
                            r =
                                (t[1] - i[1]) * (e[0] - t[0]) * (n[0] - i[0]) +
                                i[0] * (n[1] - i[1]) * (e[0] - t[0]) -
                                t[0] * (e[1] - t[1]) * (n[0] - i[0]);
                        if (0 == s || 0 === r) {
                            var o = this._getLine(t, e),
                                a = this._getLine(i, n),
                                l = o[0],
                                h = o[1],
                                u = a[0],
                                c = a[1];
                            if (h[0] === u[0] && h[1] === u[1]) return h;
                            if (l[0] === c[0] && l[1] === c[1]) return l;
                            if (this._isOnLine(h, a) && this._isOnLine(u, o))
                                return [u, h];
                            if (this._isOnLine(l, a) && this._isOnLine(c, o))
                                return [l, c];
                            if (this._isOnLine(l, a) && this._isOnLine(h, a))
                                return [l, h];
                            if (this._isOnLine(u, a) && this._isOnLine(c, a))
                                return [u, c];
                        }
                        return (
                            (o = r / s),
                            (s =
                                (t[0] - e[0]) * (n[1] - i[1]) -
                                (e[1] - t[1]) * (i[0] - n[0])),
                            [
                                o,
                                (r =
                                    e[1] * (t[0] - e[0]) * (n[1] - i[1]) +
                                    (n[0] - e[0]) *
                                        (n[1] - i[1]) *
                                        (t[1] - e[1]) -
                                    n[1] * (i[0] - n[0]) * (e[1] - t[1])) / s,
                            ]
                        );
                    }
                    return !1;
                }),
                (e._getLine = function (t, e) {
                    return t[0] === e[0]
                        ? t[1] < e[1]
                            ? [t, e]
                            : [e, t]
                        : t[0] < e[0]
                        ? [t, e]
                        : [e, t];
                }),
                (e._isOnLine = function (t, e) {
                    return e[0][0] === e[1][0]
                        ? t[1] >= e[0][1] && t[1] <= e[1][1]
                        : t[0] >= e[0][0] && t[0] <= e[1][0];
                }),
                (e._isRectCross = function (t, e, i, n) {
                    var s = Math.min,
                        r = Math.max;
                    return (
                        s(t[0], e[0]) <= r(i[0], n[0]) &&
                        s(i[0], n[0]) <= r(t[0], e[0]) &&
                        s(t[1], e[1]) <= r(i[1], n[1]) &&
                        s(i[1], n[1]) <= r(t[1], e[1])
                    );
                }),
                (e._isLineSegmentCross = function (t, e, i, n) {
                    var s =
                            t[0] * (i[1] - e[1]) +
                            e[0] * (t[1] - i[1]) +
                            i[0] * (e[1] - t[1]),
                        r =
                            t[0] * (n[1] - e[1]) +
                            e[0] * (t[1] - n[1]) +
                            n[0] * (e[1] - t[1]);
                    return (
                        !(0 <= (s ^ r) && 0 !== s && 0 !== r) &&
                        !(
                            0 <=
                                ((s =
                                    i[0] * (t[1] - n[1]) +
                                    n[0] * (i[1] - t[1]) +
                                    t[0] * (n[1] - i[1])) ^
                                    (r =
                                        i[0] * (e[1] - n[1]) +
                                        n[0] * (i[1] - e[1]) +
                                        e[0] * (n[1] - i[1]))) &&
                            0 !== s &&
                            0 !== r
                        )
                    );
                }),
                t
            );
        })(),
        je = (function () {
            function t(t, e, i) {
                (this._activeBoxId = null),
                    (this._startX = null),
                    (this._startY = null),
                    (this._addNewFlag = null),
                    (this._drawingFlag = !1),
                    (this.cropBoxes = []),
                    (this.width = 0),
                    (this.height = 0),
                    (this.zoom = 1),
                    (this.aspectRatio = 0),
                    (this.keepAspectRatio = !1),
                    (this.mouseDown = !1),
                    (this.unselectedCallback = null),
                    (this.selectedCallback = null),
                    (this.cropBoxStyle = {}),
                    (this.width = t),
                    (this.height = e),
                    Object.assign(this.cropBoxStyle, i);
            }
            var e = t.prototype;
            return (
                (e.setCropBoxStyle = function (e) {
                    Object.assign(this.cropBoxStyle, e),
                        this.cropBoxes.forEach(function (t) {
                            Object.assign(t.cropBoxStyle, e);
                        });
                }),
                (e.updateDpr = function (e) {
                    this.cropBoxes.forEach(function (t) {
                        t.dpr = e;
                    });
                }),
                (e.setKeepAspectRatio = function (e) {
                    (this.keepAspectRatio = e),
                        this._drawingFlag ||
                            this.cropBoxes.forEach(function (t) {
                                t.keepAspectRatio = e;
                            });
                }),
                (e.setAspectRatio = function (t) {
                    this.aspectRatio = t;
                }),
                (e.setZoom = function (e) {
                    (this.zoom = e),
                        this.cropBoxes.forEach(function (t) {
                            t.zoom = e;
                        });
                }),
                (e.setPageSize = function (t, e) {
                    (this.width = t), (this.height = e);
                }),
                (e.getRectArr = function () {
                    var i = [];
                    return (
                        this.cropBoxes.forEach(function (t, e) {
                            e = Object.assign({ index: e }, t.getRect());
                            i.push(e);
                        }),
                        i
                    );
                }),
                (e.clear = function () {
                    var t;
                    0 < this.cropBoxes.length &&
                        null != (t = this.unselectedCallback) &&
                        t.call(this),
                        (this.cropBoxes = []);
                }),
                (e.addFreeBox = function (t) {
                    var e = v(),
                        t = new Qe({
                            cropBoxStyle: this.cropBoxStyle,
                            vertexes: t.slice(),
                            width: this.width,
                            height: this.height,
                            mode: "free",
                            dpr: e,
                        });
                    return this.cropBoxes.push(t), t;
                }),
                (e.addBox = function (t, e) {
                    var i = v(),
                        t = new Qe({
                            cropBoxStyle: this.cropBoxStyle,
                            vertexes: t.slice(),
                            width: this.width,
                            height: this.height,
                            type: e,
                            mode: "normal",
                            aspectRatio: this.aspectRatio,
                            keepAspectRatio: this.keepAspectRatio,
                            zoom: this.zoom,
                            dpr: i,
                        });
                    return this.cropBoxes.push(t), t;
                }),
                (e.removeBox = function (t) {
                    return (
                        t === undefined && this.clear(),
                        !(t < 0 || t >= this.cropBoxes.length) &&
                            (this.cropBoxes.splice(t, 1), !0)
                    );
                }),
                (e.getBoxByUid = function (t) {
                    for (var e = this.cropBoxes.length, i = 0; i < e; i++)
                        if (this.cropBoxes[i].uid === t)
                            return this.cropBoxes[i];
                    return null;
                }),
                (e.onStartHandler = function (t, e, i) {
                    (this._startX = t),
                        (this._startY = e),
                        (this.mouseDown = !0);
                    var n = this.checkSelect(t, e);
                    if (null === n)
                        return (
                            i || this.clear(), void (this._activeBoxId = null)
                        );
                    (this._activeBoxId = this.cropBoxes[n].uid),
                        this.getBoxByUid(this._activeBoxId).onStartHandler(
                            t,
                            e
                        );
                }),
                (e.onMoveHandler = function (t, e, i) {
                    if (this.mouseDown) {
                        var n = null,
                            s = t - this._startX,
                            r = e - this._startY,
                            o = null,
                            a = 2 / this.zoom,
                            l =
                                (!this._activeBoxId &&
                                t - this._startX < -a &&
                                e - this._startY < -a
                                    ? (o = 0) < this.aspectRatio &&
                                      (r = s / this.aspectRatio)
                                    : !this._activeBoxId &&
                                      t - this._startX > a &&
                                      e - this._startY < -a
                                    ? ((o = 1),
                                      0 < this.aspectRatio &&
                                          (r = -s / this.aspectRatio))
                                    : !this._activeBoxId &&
                                      t - this._startX > a &&
                                      e - this._startY > a
                                    ? ((o = 2),
                                      0 < this.aspectRatio &&
                                          (r = s / this.aspectRatio))
                                    : !this._activeBoxId &&
                                      t - this._startX < -a &&
                                      e - this._startY > a &&
                                      ((o = 3),
                                      0 < this.aspectRatio &&
                                          (r = -s / this.aspectRatio)),
                                [
                                    t,
                                    this._startY + r,
                                    this._startX,
                                    this._startY + r,
                                    this._startX,
                                    this._startY,
                                    t,
                                    this._startY,
                                ]),
                            h = [
                                this._startX,
                                this._startY,
                                this._startX,
                                this._startY + r,
                                t,
                                this._startY + r,
                                t,
                                this._startY,
                            ];
                        if (null !== o) {
                            for (var u = [], c = 0; c < 4; c++)
                                o % 2
                                    ? (u.push(h[(2 * (o + c)) % 8]),
                                      u.push(h[(2 * (o + c) + 1) % 8]))
                                    : (u.push(l[(2 * (o + c)) % 8]),
                                      u.push(l[(2 * (o + c) + 1) % 8]));
                            n = this.addBox(
                                u,
                                [
                                    "topLeft",
                                    "topRight",
                                    "bottomRight",
                                    "bottomLeft",
                                ][o]
                            );
                            return (
                                0 < this.aspectRatio
                                    ? (n.keepAspectRatio = !0)
                                    : (n.keepAspectRatio = !1),
                                (this._drawingFlag = !0),
                                (this._addNewFlag = this.keepAspectRatio),
                                (this._activeBoxId = n.uid),
                                n.onStartHandler(this._startX, this._startY, o),
                                n.onMoveHandler(t, e, o),
                                void (o = null)
                            );
                        }
                        (n = this._activeBoxId
                            ? this.getBoxByUid(this._activeBoxId)
                            : n) && n.onMoveHandler(t, e);
                    }
                }),
                (e.onEndHandler = function () {
                    var t;
                    this.mouseDown &&
                        ((this.mouseDown = !1),
                        (this._drawingFlag = !1),
                        this._activeBoxId &&
                            ((t = this.getBoxByUid(this._activeBoxId)),
                            null !== this._addNewFlag &&
                                ((t.keepAspectRatio = this._addNewFlag),
                                (this._addNewFlag = null)),
                            t.onEndHandler(),
                            0 < this.cropBoxes.length &&
                                null != (t = this.selectedCallback) &&
                                t.call(this, this.getRectArr()),
                            (this._activeBoxId = null)));
                }),
                (e.checkSelect = function (t, e) {
                    var i = this.cropBoxes.length;
                    if (0 === i) return null;
                    for (var n = i - 1; 0 <= n; n--)
                        if (null !== this.cropBoxes[n].isBoxSelected(t, e))
                            return n;
                    return null;
                }),
                (e.checkSelectForCursor = function (t, e) {
                    var i = this.cropBoxes.length;
                    if (0 === i) return null;
                    for (var n = i - 1; 0 <= n; n--) {
                        var s,
                            r = this.cropBoxes[n],
                            o = r.isBoxSelected(t, e);
                        if (null !== o)
                            return (
                                (s = "move"),
                                -1 !== o && (s = r.checkPointPosition(o)),
                                { part: o, type: r.type, position: s }
                            );
                    }
                    return null;
                }),
                (e.dispose = function () {
                    (this.unselectedCallback = null),
                        (this.selectedCallback = null);
                }),
                t
            );
        })(),
        Ke = (function (l) {
            function t(t, e, i, n, s, r) {
                var o = l.call(this, t, e, i, n, s, r) || this;
                return (
                    (o.isInner = !0),
                    (o._isCrop = !1),
                    (o.cropIndex = -1),
                    (o.cropUid = ""),
                    (o._originEvents = []),
                    (o._tbEvents = []),
                    (o._viewerEvents = []),
                    (o.cropManager = new je(0, 0, o.cropBoxStyle)),
                    (o.cropManager.selectedCallback = function (t) {
                        var e = o.selectedIndexes.slice().pop(),
                            i = o._thumbnailCanvas[e];
                        i &&
                            i.renderImg &&
                            l.prototype._emit.call(qe(o), mt, e, t);
                    }),
                    (o.cropManager.unselectedCallback = function () {
                        for (
                            var t = o.cropIndex,
                                e = o._thumbnailCanvas.length,
                                i = 0;
                            i < e;
                            i++
                        ) {
                            var n = o._thumbnailCanvas[i];
                            o.cropUid === n.uid &&
                                ((o.cropManager.cropBoxes = []),
                                n.renderImg ? o.setPageRect(n) : n.setRect([]));
                        }
                        l.prototype._emit.call(qe(o), pt, t);
                    }),
                    o._initEvents(),
                    o
                );
            }
            h(t, l);
            var e = t.prototype;
            return (
                (e._initEvents = function () {
                    var i = this,
                        t = [zt, Ot, Dt, At, Ht, Ft, Wt, Yt],
                        e = [s, C, x, q, G, K, Q, j];
                    this._originEvents = e;
                    for (var n = 0; n < t.length; n++)
                        this._packageEvent(e[n], t[n]);
                    (this._tbEvents = [
                        [
                            tt,
                            function (t) {
                                l.prototype._emit.call(i, Qt, t);
                            },
                        ],
                        [
                            st,
                            function (t, e) {
                                l.prototype._emit.call(i, st, t, e);
                            },
                        ],
                        [
                            s,
                            function (t, e) {
                                i._cropStart(t, e);
                            },
                        ],
                        [
                            T,
                            function (t) {
                                i._cropUp(t);
                            },
                        ],
                        [
                            S,
                            function (t) {
                                l.prototype._emit.call(i, S, t);
                            },
                        ],
                    ]),
                        this._tbEvents.forEach(function (t) {
                            var e;
                            null != (e = i._pubSub) && e._on(t[0], t[1]);
                        }),
                        (this._viewerEvents = [
                            [
                                M,
                                function (t) {
                                    i._cropMove(t);
                                },
                            ],
                            [
                                T,
                                function (t) {
                                    i._cropUp(t);
                                },
                            ],
                            [
                                Pt,
                                function () {
                                    i.cropManager.clear();
                                },
                            ],
                        ]),
                        this._viewerEvents.forEach(function (t) {
                            i._on(t[0], t[1]);
                        });
                }),
                (e._initThumbnailConfig = function (t) {
                    this._pubSub = new E(t.pubsub);
                    for (var e = Object.keys(t), i = 0; i < e.length; i++) {
                        var n = e[i],
                            s = t[n];
                        "pubsub" !== n && s !== undefined && (this[n] = s);
                    }
                }),
                (e.dispose = function () {
                    var t,
                        e = this;
                    this._viewerEvents.forEach(function (t) {
                        e._off(t[0]);
                    }),
                        l.prototype.dispose.call(this),
                        this._pubSub &&
                            (this._originEvents.forEach(function (t) {
                                e._pubSub._off(t);
                            }),
                            this._tbEvents.forEach(function (t) {
                                e._pubSub._off(t[0]);
                            })),
                        (this._originEvents = []),
                        (this._tbEvents = []),
                        (this._viewerEvents = []),
                        null != (t = this.cropManager) && t.dispose(),
                        (this.cropManager = null);
                }),
                (e._packageEvent = function (t, o) {
                    var a = this;
                    this._pubSub._on(t, function (t, e) {
                        var i,
                            n,
                            s = t.index,
                            r = t.pageX,
                            t = t.pageY;
                        -1 === s
                            ? l.prototype._emit.call(a, o, e, {
                                  index: s,
                                  imageX: -1,
                                  imageY: -1,
                                  pageX: r,
                                  pageY: t,
                              })
                            : a._thumbnailCanvas[s] &&
                              ((i = (n = a._getOriginPosition(s, e)).imageX),
                              (n = n.imageY),
                              l.prototype._emit.call(a, o, e, {
                                  index: s,
                                  imageX: i,
                                  imageY: n,
                                  pageX: r,
                                  pageY: t,
                              }));
                    });
                }),
                (e._getOriginPosition = function (t, e, i) {
                    void 0 === i && (i = !0);
                    var n = null,
                        s = null,
                        r =
                            null ==
                            (h =
                                this._thumbnailElement.querySelector(
                                    ".dvs-thumbLists"
                                ))
                                ? void 0
                                : h.children;
                    if (r) {
                        if (this.ifDragMoves)
                            for (var o = -1, a = 0; a < r.length; a++) {
                                var l = r[a];
                                if (
                                    (null == l ||
                                        !l.classList.contains(
                                            "dvs-activeThumb"
                                        )) &&
                                    t === ++o
                                ) {
                                    s =
                                        this._thumbnailCanvas[
                                            (n = l)["dvs-defaultIndex"]
                                        ];
                                    break;
                                }
                            }
                        else (n = r[t]), (s = this._thumbnailCanvas[t]);
                        if (n) {
                            var h = n.getBoundingClientRect(),
                                u = this._dataStore.getMid(s.uid);
                            if (
                                !s.renderImg ||
                                null == u ||
                                !u.tempWidth ||
                                null == u ||
                                !u.tempHeight
                            )
                                return { imageX: -1, imageY: -1 };
                            var c = e.clientX - h.left,
                                e = e.clientY - h.top,
                                d = s.renderImg.naturalWidth,
                                _ = s.renderImg.naturalHeight,
                                m = s.fitRatio,
                                c = c - (h.width - d / m) / 2,
                                e = e - (h.height - _ / m) / 2;
                            return i &&
                                (c < 0 || e < 0 || d / m < c || _ / m < e)
                                ? { imageX: -1, imageY: -1 }
                                : ((h = u.tempWidth / d),
                                  {
                                      imageX: Math.floor(c * m * h),
                                      imageY: Math.floor(e * m * h),
                                  });
                        }
                    }
                }),
                (e._cropStart = function (t, e) {
                    var t = t.index,
                        i = this.selectedIndexes.slice().pop();
                    if (-1 !== t && i === t && this._isCrop) {
                        i = this._thumbnailCanvas[t];
                        if (i && i.renderImg) {
                            var t = this._getOriginPosition(t, e),
                                n = t.imageX,
                                t = t.imageY;
                            if (-1 !== n && -1 !== t) {
                                var s = this._dataStore.getMid(i.uid);
                                if (null == s || !s.tempWidth || !s.tempHeight)
                                    return this._pubSub._emit(Bt, Ee), !1;
                                var r = s.tempWidth / i.renderImg.naturalWidth,
                                    o = i.fitRatio,
                                    a = this.cropManager;
                                a.setZoom(1 / o / r),
                                    a.setPageSize(s.tempWidth, s.tempHeight),
                                    a.onStartHandler(n, t, e.ctrlKey),
                                    i.setRect(a.cropBoxes),
                                    B(e);
                            }
                        }
                    }
                }),
                (e._cropMove = function (t) {
                    var e, i, n, s, r;
                    this.showThumbnail &&
                        this._isCrop &&
                        -1 !== (n = this.selectedIndexes.slice().pop()) &&
                        (e = this._thumbnailCanvas[n]) &&
                        ((i = (n = this._getOriginPosition(n, t, !1)).imageX),
                        (n = n.imageY),
                        (r = (s = this.cropManager).checkSelectForCursor(i, n))
                            ? ((r =
                                  "move" === r.position
                                      ? "move"
                                      : r.position + "-resize"),
                              l.prototype._emit.call(this, Be, r))
                            : l.prototype._emit.call(this, Be, ""),
                        s.mouseDown &&
                            (s.setKeepAspectRatio(t.shiftKey),
                            s.onMoveHandler(i, n, !1),
                            this.setPageRect(e)));
                }),
                (e._cropUp = function (t) {
                    this._isCrop &&
                        this.cropManager.mouseDown &&
                        this.cropManager.onEndHandler();
                }),
                (e.setPageRect = function (t) {
                    var e;
                    t &&
                        ((e = this.cropManager.cropBoxes),
                        t.setRect(e),
                        t.render(!1));
                }),
                (e.setCropBoxStyle = function (t) {
                    Object.assign(this.cropBoxStyle, t),
                        this.cropManager.setCropBoxStyle(this.cropBoxStyle);
                    (t = this.selectedIndexes.slice().pop()),
                        (t = this._thumbnailCanvas[t]);
                    t && this._isCrop && this.setPageRect(t);
                }),
                (e.setSelectedBoxLineColor = function (t) {
                    Object.assign(this.cropBoxStyle, {
                        borderColor: t,
                        ctrlBorderColor: t,
                    }),
                        this.cropManager.setCropBoxStyle(this.cropBoxStyle);
                    (t = this.selectedIndexes.slice().pop()),
                        (t = this._thumbnailCanvas[t]);
                    t && this._isCrop && this.setPageRect(t);
                }),
                (e.setOperationMode = function (t) {
                    1 === t
                        ? (this._isCrop = !0)
                        : ((this._isCrop = !1), this.clearSelectedBoxes());
                }),
                (e.setSelectedBoxes = function (t, e) {
                    e || this.cropManager.clear(), O(t) || (t = [t]);
                    for (
                        var e = this.selectedIndexes.slice().pop(),
                            i = this._thumbnailCanvas[e],
                            n = this._dataStore.getMid(i.uid),
                            s =
                                (this.cropManager.setPageSize(
                                    (null == n ? void 0 : n.tempWidth) || 0,
                                    (null == n ? void 0 : n.tempHeight) || 0
                                ),
                                t.length),
                            r = 0;
                        r < s;
                        r++
                    ) {
                        var o = t[r];
                        this.cropManager.addBox(
                            [
                                o.left,
                                o.top,
                                o.left + o.width,
                                o.top,
                                o.left + o.width,
                                o.top + o.height,
                                o.left,
                                o.top + o.height,
                            ],
                            "bottomRight"
                        );
                    }
                    n = this.cropManager.getRectArr();
                    this.setPageRect(i),
                        l.prototype._emit.call(this, mt, e, n),
                        l.prototype._emit.call(this, S, e, n);
                }),
                (e.setKeepAspectRatio = function (t) {
                    this.cropManager.setKeepAspectRatio(t);
                }),
                (e.setAspectRatio = function (t) {
                    this.cropManager.setAspectRatio(t);
                }),
                (e.clearSelectedBoxes = function (t) {
                    this.cropManager.clear();
                }),
                t
            );
        })(Ve),
        Ge = (function (r) {
            function t(t, e, i, n, s) {
                e = r.call(this, e) || this;
                return (
                    (e._viewerContainer = null),
                    (e._dataStore = null),
                    (e._thumbnails = {}),
                    (e.innerThumbnail = null),
                    (e._selectedIndexes = []),
                    (e._displayedUidsManage = {}),
                    (e._thumbnailContents = []),
                    (e._lastShowUid = ""),
                    (e._displayTimer = null),
                    (e.workBlobURL = null),
                    (e.postfix = t),
                    (e._viewerContainer = i),
                    (e._dataStore = n),
                    (e.workBlobURL = s),
                    e._bindEvents(),
                    e
                );
            }
            h(t, r);
            var e = t.prototype;
            return (
                (e.createThumbnail = function (t) {
                    var e = t.uid,
                        t =
                            (e || ((e = f(11)), (t.uid = e)),
                            new Ve(
                                t,
                                this._oPub,
                                this._viewerContainer,
                                this.postfix,
                                this._dataStore,
                                this.workBlobURL
                            ));
                    return (
                        (this._thumbnails[e] = t).updateContent(
                            this._thumbnailContents
                        ),
                        t.selectThumbnailByIndexes(this._selectedIndexes),
                        !0
                    );
                }),
                (e.createInnerThumbnail = function (t) {
                    var e = {
                        uid: this.postfix,
                        pubsub: new ze(),
                        size: "100%",
                        background: t.canvasBackground,
                        mouseShape: t.canvasMouseShape,
                        border: t.canvasBorder,
                        location: "canvas",
                        allowResizing: !1,
                        showThumbnail: !1,
                    };
                    _(t, e),
                        (this.innerThumbnail = new Ke(
                            e,
                            this._oPub,
                            this._viewerContainer,
                            this.postfix,
                            this._dataStore,
                            this.workBlobURL
                        ));
                }),
                (e.removeThumbnail = function (t) {
                    var e = this._thumbnails[t];
                    return (
                        !!e &&
                        (e.unbindUi(),
                        r.prototype._emit.call(this, "onSetSplitBar"),
                        delete this._thumbnails[t],
                        !0)
                    );
                }),
                (e.removeAllThumbnail = function () {
                    var t, e;
                    for (e in this._thumbnails) this.removeThumbnail(e);
                    null != (t = this.innerThumbnail) && t.unbindUi(),
                        null != (t = this.innerThumbnail) && t.dispose(),
                        (this._thumbnails = {}),
                        (this._viewerContainer = null),
                        this._off(L),
                        this._off(we);
                }),
                (e.on = function (t, e) {
                    this._on(t, e.bind(this));
                }),
                (e._bindEvents = function () {
                    var n = this;
                    this.on(L, function (t, e) {
                        (n._displayedUidsManage[e] = t),
                            clearTimeout(n._displayTimer),
                            (n._displayTimer = setTimeout(function () {
                                var t,
                                    e = new D();
                                for (t in n._displayedUidsManage) {
                                    var i = n._displayedUidsManage[t];
                                    e.array = e.concat(i);
                                }
                                r.prototype._emit.call(n, It, e.array.slice());
                            }, 100));
                    }),
                        this.on(we, function (t) {
                            n._updatePageItem(t);
                        });
                }),
                (e.calculateSize = function () {
                    var t, e;
                    for (e in this._thumbnails)
                        this._thumbnails[e].calculateSize();
                    null != (t = this.innerThumbnail) && t.calculateSize();
                }),
                (e.updateAllDisplayed = function () {
                    var t, e;
                    for (e in this._thumbnails)
                        this._thumbnails[e].updateDisplayedUidsIE();
                    null != (t = this.innerThumbnail) &&
                        t.updateDisplayedUidsIE();
                }),
                (e.showLatestPage = function (t) {
                    var e, i;
                    for (i in this._thumbnails)
                        this._thumbnails[i].showLatestPage(t);
                    null != (e = this.innerThumbnail) && e.showLatestPage(t);
                }),
                (e.updatePagesLayout = function () {
                    var t, e;
                    for (e in this._thumbnails)
                        this._thumbnails[e].updatePageLayout();
                    null != (t = this.innerThumbnail) && t.updatePageLayout();
                }),
                (e.updateContents = function (t) {
                    var e, i;
                    for (i in ((this._thumbnailContents = t), this._thumbnails))
                        this._thumbnails[i].updateContent(t);
                    null != (e = this.innerThumbnail) && e.updateContent(t);
                }),
                (e._updatePageItem = function (t) {
                    for (
                        var e, i, n = this._thumbnailContents, s = 0;
                        s < n.length;
                        s++
                    )
                        if (n[s].uid === t.uid) {
                            n[s] = t;
                            break;
                        }
                    for (i in this._thumbnails)
                        this._thumbnails[i].updatePageItem(t);
                    null != (e = this.innerThumbnail) && e.updatePageItem(t);
                }),
                (e.updateSelectedIndexes = function (t) {
                    var e, i;
                    for (i in ((this._selectedIndexes = t), this._thumbnails))
                        this._thumbnails[i].selectThumbnailByIndexes(t);
                    null != (e = this.innerThumbnail) &&
                        e.selectThumbnailByIndexes(t);
                }),
                (e.pageChangeCallback = function (t, e, i) {
                    var n = this._thumbnailContents,
                        s = this.innerThumbnail,
                        r = this._lastShowUid,
                        n = null == (n = n[e]) ? void 0 : n.uid;
                    (n !== undefined && r === n) ||
                        (s.clearSelectedBoxes(),
                        (s.cropIndex = e),
                        (s.cropUid = n),
                        (this._lastShowUid = n));
                }),
                (e.keydownCallback = function (t, e) {
                    var i = this._thumbnails[e];
                    i
                        ? i.keydownCallBack(t)
                        : e === this.innerThumbnail.uid &&
                          (this.innerThumbnail.keydownCallBack(t),
                          r.prototype._emit.call(this, Vt, t));
                }),
                (e.keyupCallback = function (t, e) {
                    var i = this._thumbnails[e];
                    i
                        ? i.keyupCallBack(t)
                        : e === this.innerThumbnail.uid &&
                          (this.innerThumbnail.keyupCallBack(t),
                          r.prototype._emit.call(this, qt, t));
                }),
                (e.dispose = function () {
                    r.prototype.dispose.call(this);
                    for (
                        var t,
                            e = Object.keys(this._thumbnails),
                            i = 0,
                            n = e.length;
                        i < n;
                        i++
                    ) {
                        var s = e[i],
                            s = this._thumbnails[s];
                        s && s.dispose(), (s = null);
                    }
                    (this._thumbnails = null) != (t = this.innerThumbnail) &&
                        t.dispose(),
                        (this.innerThumbnail = null),
                        (this._viewerContainer = null),
                        (this._dataStore = null);
                }),
                t
            );
        })(E),
        $e = (function (n) {
            function t(t, e, i) {
                e = n.call(this, e) || this;
                return (
                    (e._xOver = !1),
                    (e._yOver = !1),
                    (e.isMyScroll = !1),
                    (e.buttonMove = !1),
                    (e._isButtonScroll = !1),
                    (e._unbindList = []),
                    (e._postfix = t),
                    (e._viewerContainer = i),
                    e
                );
            }
            h(t, n);
            var e = t.prototype;
            return (
                (e._myQuery = function (t, e) {
                    var i;
                    return (
                        void 0 === e && (e = "#"),
                        null == (i = this._viewerContainer) ||
                        null == (i = i.el)
                            ? void 0
                            : i.querySelector(e + t)
                    );
                }),
                (e._myQueryAll = function (t, e) {
                    var i;
                    return (
                        void 0 === e && (e = "#"),
                        null == (i = this._viewerContainer) ||
                        null == (i = i.el)
                            ? void 0
                            : i.querySelectorAll(e + t)
                    );
                }),
                (e.getImageSize = function (t) {
                    var e = this,
                        i = this.setOuterSize(t.width, t.height);
                    return (
                        this.setScroller(t.x, t.y),
                        i &&
                            setTimeout(function () {
                                e.setViewPort(),
                                    n.prototype._emit.call(
                                        e,
                                        "_onCanvasResize"
                                    );
                            }),
                        i
                    );
                }),
                (e.setScroller = function (t, e) {
                    var i = p("outer" + this._postfix);
                    if (!i) return !1;
                    var n = i.scrollLeft,
                        s = i.scrollTop;
                    return (
                        (n === t && s === e) || (this.isMyScroll = !0),
                        (i.scrollLeft = t),
                        (i.scrollTop = e),
                        !0
                    );
                }),
                (e.setOuterSize = function (t, e) {
                    var i = p("outer" + this._postfix),
                        n = p("inner" + this._postfix),
                        s = !1,
                        r = !1;
                    if (!i || !n) return !1;
                    t > i.offsetWidth
                        ? ((i.style.overflowX = "auto"), (s = !0))
                        : (i.style.overflowX = "hidden"),
                        e > i.offsetHeight
                            ? ((i.style.overflowY = "auto"), (r = !0))
                            : (i.style.overflowY = "hidden"),
                        (n.style.width = t + "px"),
                        (n.style.height = e + "px");
                    (i = this._xOver !== s), (t = this._yOver !== r);
                    return (this._xOver = s), (this._yOver = r), i || t;
                }),
                (e.setViewPort = function () {
                    var t = p("outer" + this._postfix),
                        e = p("viewPort" + this._postfix);
                    if (!t || !e) return !1;
                    var i = t.offsetWidth - t.clientWidth,
                        t = t.offsetHeight - t.clientHeight;
                    (e.style.width = "calc(100% - ".concat(i, "px)")),
                        (e.style.height = "calc(100% - ".concat(t, "px)"));
                }),
                (e._addButtonScroll = function () {
                    var e,
                        i = this,
                        n = [],
                        t = this._myQueryAll("dvs-groupType", ".");
                    t &&
                        ((e = u()),
                        this._on(M, function (t) {
                            e && t.touches
                                ? i.buttonScrollMoveMobile(t)
                                : i.buttonScrollMove(t);
                        }),
                        this._on(T, function () {
                            i.buttonScrollEndFun();
                        }),
                        [].forEach.call(t, function (t) {
                            "ontouchstart" in document.documentElement
                                ? d(t, N, function (t) {
                                      i.buttonScrollStartMobile(t);
                                  })
                                : d(t, A, function (t) {
                                      i.buttonScrollStart(t);
                                  }),
                                (i._unbindList = n);
                            var e = t.querySelector(".dvs-showBefore"),
                                e =
                                    (e &&
                                        (e.onclick = function () {
                                            (t.scrollLeft = 0),
                                                i._updateShowMore(t);
                                        }),
                                    t.querySelector(".dvs-showAfter"));
                            e &&
                                (e.onclick = function () {
                                    (t.scrollLeft =
                                        t.scrollWidth - t.clientWidth),
                                        i._updateShowMore(t);
                                });
                        }));
                }),
                (e.buttonScrollStart = function (t) {
                    return (
                        (!t.button || 0 === t.button) &&
                        (this._buttonScrollStartFun(t), !0)
                    );
                }),
                (e.buttonScrollStartMobile = function (t) {
                    t = t.changedTouches[0];
                    return !!t && (this._buttonScrollStartFun(t), !0);
                }),
                (e._buttonScrollStartFun = function (t) {
                    var e,
                        i = t.target;
                    if (i && i.classList.contains("dvs-groupType")) e = i;
                    else {
                        if (
                            !(
                                i &&
                                i.parentNode &&
                                i.parentNode.classList.contains("dvs-groupType")
                            )
                        )
                            return !1;
                        e = i.parentNode;
                    }
                    (this._isButtonScroll = !0),
                        (this._scrollStartInfo = {
                            x: t.clientX,
                            y: t.clientY,
                            left: e.scrollLeft,
                            top: e.scrollTop,
                            item: e,
                        });
                }),
                (e.buttonScrollMove = function (t) {
                    return this._buttonScrollMoveFun(t), !0;
                }),
                (e.buttonScrollMoveMobile = function (t) {
                    t = t.changedTouches[0];
                    return !!t && (this._buttonScrollMoveFun(t), !0);
                }),
                (e._buttonScrollMoveFun = function (t) {
                    if (!this._isButtonScroll) return !1;
                    var e = this._scrollStartInfo,
                        i = e.x,
                        n = e.y,
                        s = e.left,
                        r = e.top,
                        e = e.item;
                    e.scrollWidth > e.clientWidth &&
                        ((i = t.clientX - i),
                        (n = t.clientY - n),
                        (5 < Math.abs(i) || 5 < Math.abs(n)) &&
                            ((this.buttonMove = !0),
                            (e.scrollLeft = s - i),
                            (e.scrollTop = r - n),
                            this._updateShowMore(e),
                            B(t)));
                }),
                (e.buttonScrollEndFun = function () {
                    (this._isButtonScroll = !1),
                        (this._scrollStartInfo = {}),
                        document.removeEventListener(X, B);
                }),
                (e._updateShowMore = function (t) {
                    if (!t || 0 == t.children.length) return !1;
                    5 <= t.scrollWidth - t.clientWidth
                        ? (t.style.justifyContent = "flex-start")
                        : (t.style.justifyContent = "");
                    var e = t.scrollLeft,
                        i = 5 <= e,
                        n = e + t.clientWidth < t.scrollWidth - 5,
                        s = t.querySelector(".dvs-showBefore");
                    if (!s || "SPAN" !== s.tagName) return !1;
                    i && 60 <= t.clientWidth
                        ? s.classList.remove("dvs-nodisplay")
                        : s.classList.add("dvs-nodisplay");
                    i = t.querySelector(".dvs-showAfter");
                    n && 60 <= t.clientWidth
                        ? i.classList.remove("dvs-nodisplay")
                        : i.classList.add("dvs-nodisplay"),
                        (e = t.scrollLeft),
                        (s.style.left = e + "px"),
                        (i.style.right = -e + "px");
                }),
                (e.updateAllGroupShowMore = function () {
                    var e = this,
                        t = this._myQueryAll("dvs-groupType", ".");
                    t &&
                        [].forEach.call(t, function (t) {
                            e._updateShowMore(t);
                        });
                }),
                (e.unbindEvents = function () {
                    this._unbindList.forEach(function (t) {
                        null != t && t();
                    });
                }),
                (e.dispose = function () {
                    n.prototype.dispose.call(this), this.unbindEvents();
                }),
                t
            );
        })(E),
        Je = (function (i) {
            function t(t, e) {
                e = i.call(this, e) || this;
                return (
                    (e._currentPage = -1),
                    (e._totalPage = 0),
                    (e._postfix = t),
                    e
                );
            }
            h(t, i);
            var e = t.prototype;
            return (
                (e.goToPage = function (t) {
                    this._emit(Le, t);
                }),
                (e.getCurrentPage = function () {
                    return this._currentPage;
                }),
                (e.setCurrentPage = function (t) {
                    return !!w(t) && ((this._currentPage = t), !0);
                }),
                (e.getTotalPage = function () {
                    return this._totalPage;
                }),
                (e.setTotalPage = function (t) {
                    return !!w(t) && ((this._totalPage = t), !0);
                }),
                (e.updatePage = function (t) {
                    var e = document.getElementById(
                            "pagerInput" + this._postfix
                        ),
                        i = document.getElementById(
                            "pagerLabel" + this._postfix
                        ),
                        n = t.cur,
                        t = t.total;
                    this.setCurrentPage(n),
                        this.setTotalPage(t),
                        e &&
                            i &&
                            ((e.value = t ? n + 1 : 0),
                            (i.innerText = String(t)),
                            (e.style.fontSize = "16px"),
                            (n = 16 * String(t).length + "px"),
                            (e.style.width = n));
                }),
                (e.pageBlur = function (t) {
                    var t = t.target,
                        e = parseInt(t.value);
                    (t.value = String(this._currentPage + 1)),
                        this.goToPage(e - 1);
                }),
                t
            );
        })(E),
        Ze = (function (r) {
            function t(t) {
                var e = t.postfix,
                    i = t.pubsub,
                    t = t.viewerContainer,
                    i = r.call(this, i) || this;
                return (
                    (i._postfix = ""),
                    (i._viewerContainer = null),
                    (i._width = 0),
                    (i._height = 0),
                    (i._innerWidth = 0),
                    (i._innerHeight = 0),
                    (i._scrollLeft = 0),
                    (i._scrollTop = 0),
                    (i._canvasList = []),
                    (i._postfix = e),
                    (i._viewerContainer = t),
                    i
                );
            }
            h(t, r);
            var e = t.prototype;
            return (
                (e._query = function (t) {
                    var e;
                    return null == (e = this._viewerContainer) ||
                        null == (e = e.el)
                        ? void 0
                        : e.querySelector("#" + t + this._postfix);
                }),
                (e.canvasRenderInit = function () {
                    this._createCanvas("main"),
                        this._createCanvas("cropper"),
                        this._createSlider();
                }),
                (e.updateCanvasInnerSize = function () {
                    var t,
                        e = this._query("canvasScroll"),
                        i =
                            null == (i = this._query("innerThumbnail"))
                                ? void 0
                                : i.querySelector(".dvs-thumbLists");
                    return (
                        !(!e || !i) &&
                        ((t = e.offsetWidth || i.offsetWidth),
                        (e = e.offsetHeight || i.offsetHeight),
                        0 !== t &&
                            0 !== e &&
                            void r.prototype._emit.call(
                                this,
                                "_setCanvasSize",
                                { width: t, height: e }
                            ))
                    );
                }),
                (e.updateScrollSize = function (t) {
                    var e = t.width,
                        i = t.height,
                        n = t.x,
                        t = t.y,
                        s =
                            (0 < e &&
                                0 < i &&
                                ((this._innerWidth = e),
                                (this._innerHeight = i),
                                (s = this._query("scrollInner")) &&
                                    ((s.style.width = e - 1 + "px"),
                                    (s.style.height = i - 1 + "px"))),
                            (n === this._scrollLeft && t === this._scrollTop) ||
                                ((e = this._query("canvasScroll")) &&
                                    ((this._scrollLeft = e.scrollLeft = n),
                                    (this._scrollTop = e.scrollTop = t)),
                                (e = null)),
                            this._query("canvasWrapper")),
                        i = this._query("canvasScroll");
                    if (s && i)
                        for (
                            var r = i.clientWidth,
                                o = i.clientHeight,
                                a =
                                    ((s.style.width = r + "px"),
                                    (s.style.height = o + "px"),
                                    v()),
                                l = null == s ? void 0 : s.children,
                                h = 0;
                            h < l.length;
                            h++
                        ) {
                            var u,
                                c,
                                d = l[h];
                            "CANVAS" === d.tagName &&
                                ((c = o * a),
                                d.width !== (u = r * a) && (d.width = u),
                                d.height !== c && (d.height = c)),
                                (d = null);
                        }
                }),
                (e._createSlider = function () {
                    var t = this._query("viewPort");
                    if (!t) return null;
                    for (
                        var e = document.createElement("div"),
                            i = ((e.className = "dvs-slideWrapper"), 0);
                        i++ < 3;

                    ) {
                        var n = document.createElement("div"),
                            s = document.createElement("img");
                        (n.className = "dvs-slideItem"),
                            (s.className = "dvs-slideImg"),
                            n.appendChild(s),
                            e.appendChild(n);
                    }
                    t.appendChild(e),
                        (t = null),
                        r.prototype._emit.call(this, Rt, e);
                }),
                (e._removeSlider = function () {
                    var t = this._query("viewPort");
                    if (!t) return null;
                    var e = t.querySelector(".dvs-slideWrapper");
                    r.prototype._emit.call(this, Tt), e && t.removeChild(e);
                }),
                (e._createCanvas = function (t) {
                    var e = this._query("canvasWrapper");
                    if (!e) return null;
                    var i = document.createElement("canvas");
                    (i.id = t + "Canvas" + this._postfix),
                        (i.className = "dvs-canvas dvs-" + t),
                        e.appendChild(i),
                        r.prototype._emit.call(
                            this,
                            "_bindCanvas",
                            (((e = {})[t] = i), e)
                        ),
                        this._canvasList.push(t);
                }),
                (e._removeCanvas = function (t) {
                    var e = this._query("canvasWrapper");
                    if (!e) return null;
                    var i = this._query(t + "Canvas");
                    if (!i) return null;
                    e.removeChild(i),
                        r.prototype._emit.call(this, "_unbindCanvas", t);
                    for (var n = 0; n < this._canvasList.length; n++)
                        if (this._canvasList[n] === t) {
                            this._canvasList.splice(n, 1);
                            break;
                        }
                    return i;
                }),
                (e.removeAllCanvas = function () {
                    for (var t = 0; t < this._canvasList.length; t++)
                        this._removeCanvas(this._canvasList[t]) && t--;
                    this._removeSlider();
                }),
                (e.dispose = function () {
                    r.prototype.dispose.call(this);
                }),
                t
            );
        })(E),
        Y = (function (o) {
            function t(t, e, i, n, s, r) {
                n = o.call(this, n) || this;
                return (
                    (n._sideRender = null),
                    (n._thumbnailRender = null),
                    (n._directoryRender = null),
                    (n._tagRender = null),
                    (n._scrollRender = null),
                    (n._pagerRender = null),
                    (n._canvasRender = null),
                    (n._uiRender = null),
                    (n._dataStore = null),
                    (n._uiEventControl = null),
                    (n.uiConfig = null),
                    (n._viewerContainer = null),
                    (n.containerBox = null),
                    (n.useMyEvent = !0),
                    (n.topMenuColor = "#3a393b"),
                    (n.topMenuBorder = "1px solid #1b1b1d"),
                    (n.headerColor = "#2a292b"),
                    (n.footerColor = "#434246"),
                    (n.asideMenuColor = "#434246"),
                    (n.viewerBorderColor = "#1b1b1d"),
                    (n.canvasBackground = "#434246"),
                    (n.canvasBorder = "0px solid #1b1b1d"),
                    (n.canvasMouseShape = "default"),
                    (n.outerBorder = "1px solid #1b1b1d"),
                    (n._videoImageReady = !0),
                    (n._updateVideoTimer = null),
                    (n.showViewer = !0),
                    (n.showTopMenu = !0),
                    (n.showHeader = !0),
                    (n.showSidebar = !1),
                    (n.showTab = !1),
                    (n.showAside = !1),
                    (n.showMain = !0),
                    (n.showFooter = !0),
                    (n.showVideoContainer = !1),
                    (n.width = "100%"),
                    (n.height = "100%"),
                    (n.showWidth = -1),
                    (n.showHeight = -1),
                    (n._eventList = {}),
                    (n._resizeTimer = null),
                    (n._showLatestQueue = {}),
                    (n.postfix = i),
                    (n.uiConfig = e),
                    (n._dataStore = s),
                    (n.workBlobURL = r),
                    n._initViewer(t, e),
                    n
                );
            }
            h(t, o);
            var e = t.prototype;
            return (
                (e._myQuery = function (t) {
                    var e;
                    return null == (e = this._viewerContainer) ||
                        null == (e = e.el)
                        ? void 0
                        : e.querySelector("#" + t);
                }),
                (e._myQueryAll = function (t) {
                    var e;
                    return null == (e = this._viewerContainer) ||
                        null == (e = e.el)
                        ? void 0
                        : e.querySelectorAll("#" + t);
                }),
                (e._initViewer = function (t, e) {
                    if (!t) return !1;
                    if (a(t)) t = document.getElementById(t);
                    else if (!r(t)) return !1;
                    return (
                        (this.containerBox = t),
                        this._createMember(e, t),
                        this._initMember(),
                        this._initStatus(e),
                        this._bindUiEvent(),
                        this._bindButtonEvent(),
                        !0
                    );
                }),
                (e._createMember = function (t, e) {
                    var i = this.postfix,
                        n = this._oPub,
                        e =
                            ((this._uiRender = new Ne({
                                postfix: i,
                                container: e,
                                uiConfig: t,
                                pubsub: n,
                            })),
                            this._uiRender.viewerContainer);
                    (this._viewerContainer = e),
                        (this._thumbnailRender = new Ge(
                            i,
                            n,
                            e,
                            this._dataStore,
                            this.workBlobURL
                        )),
                        (this._scrollRender = new $e(i, n, e)),
                        (this._pagerRender = new Je(i, n)),
                        (this._uiEventControl = new De(i, n, e)),
                        (this._canvasRender = new Ze({
                            postfix: i,
                            pubsub: n,
                            viewerContainer: e,
                        }));
                }),
                (e._initMember = function () {
                    var t;
                    null != (t = this._sideRender) && t.sidebarInit(),
                        this._scrollRender._addButtonScroll(),
                        this._uiEventControl.uiEventInit(),
                        this._canvasRender.canvasRenderInit();
                }),
                (e._initStatus = function (t) {
                    this.setViewerWidth(t.width),
                        this.setViewerHeight(t.height),
                        this.setShowViewer(t.showViewer),
                        this.setOuterBorder(t.outerBorder),
                        this.setFooterColor(t.footerColor),
                        this.setHeaderColor(t.headerColor),
                        this.setTopMenuColor(t.topMenuColor),
                        this.setTopMenuBorder(t.topMenuBorder),
                        this.setShowMain(t.showMain),
                        this.setSidebarWidth(t.sidebarWidth),
                        this.setShowVideoContainer(t.showVideoContainer),
                        this.setShowTab(t.showTab),
                        this.setCanvasBackground(
                            t.canvasConfig.canvasBackground
                        ),
                        this.setCanvasMouseShape(
                            t.canvasConfig.canvasMouseShape
                        ),
                        this.setCanvasBorder(t.canvasConfig.canvasBorder),
                        this.setLoadingImage(t.canvasConfig.loadingImageUrl),
                        this._setShowLoadingImage(!1);
                }),
                (e.unbindView = function () {
                    var t = null == (t = this._viewerContainer) ? void 0 : t.el;
                    if (!t) return !1;
                    var e = t.parentNode;
                    return (
                        e &&
                            (this._unbindStatus(),
                            e.removeChild(t),
                            (e = null),
                            (this._viewerContainer.el = null)),
                        !0
                    );
                }),
                (e.updateUiSetting = function (t) {}),
                (e._bindUiEvent = function () {
                    ((t = {})[k] = this._resizeViewer),
                        (t[M] = this._documentMouseMove),
                        (t[T] = this._documentMouseUp),
                        (t[ne] = this._documentClick),
                        (t[Gt] = this._viewerClick),
                        (t[$t] = this._viewerRightClick),
                        (t[Jt] = this._viewerMove),
                        (t[se] = this._sideBarClick),
                        (t[re] = this._sidebarStretchStart),
                        (t[ge] = this._openDefaultTag),
                        (t[oe] = this._fileListClick),
                        (t[ae] = this._fileListRightClick),
                        (t[le] = this._fileListKeyUp),
                        (t[he] = this._addNewFolder),
                        (t[de] = this._tagListClick),
                        (t[_e] = this._tagListRightClick),
                        (t[me] = this._tagListKeyUp),
                        (t[pe] = this._addNewTag),
                        (t[Ie] = this._pagerBlur),
                        (t[Me] = this._setScrollerSize),
                        (t[Be] = this.setCanvasCursorTemp),
                        (t[Kt] = this._setShowLoadingImage),
                        (t[Pe] = this._tabListClick),
                        (t[Re] = this._closeSaveSettingBox),
                        (t.onPanelChange = this._togglePaneBox),
                        (t.onSetSplitBar = this._setSplitBar),
                        (t[Zt] = this._showLatestPage),
                        (t[te] = this._updatePagesLayout),
                        (t[Te] = this._customButtonClick),
                        (t[fe] = this._tagRefresh),
                        (t[ve] = this._tagSelectedCallback),
                        (t[be] = this._imageSelectedCallback),
                        (t[ue] = this._directoryRefresh),
                        (t[ce] = this._fileSelectedCallback),
                        (t[ke] = this._pagerRefresh),
                        (t[ye] = this._thumbnailRefresh);
                    var t,
                        e,
                        i = t;
                    for (e in i) this._viewOn(e, i[e]);
                    this._eventList = i;
                }),
                (e._unbindStatus = function () {
                    for (
                        var t = Object.keys(this._eventList), e = 0;
                        e < t.length;
                        e++
                    ) {
                        var i = t[e];
                        this._viewOff(i);
                    }
                    (this._eventList = null),
                        this._uiEventControl.unbindEvents(),
                        (this._tagRender = null),
                        (this._directoryRender = null),
                        this._thumbnailRender.removeAllThumbnail(),
                        this._canvasRender.removeAllCanvas(),
                        this._scrollRender.unbindEvents(),
                        this._uiRender.unbindContent();
                }),
                (e._bindButtonEvent = function () {
                    var n = this,
                        s = this.uiConfig.buttons;
                    Object.keys(s).forEach(function (t) {
                        var e,
                            i = s[t],
                            t =
                                null == (e = n._viewerContainer) ||
                                null == (e = e.el)
                                    ? void 0
                                    : e.querySelector(
                                          "#".concat(t).concat(n.postfix)
                                      );
                        if (!t) return !1;
                        t.classList.add("dvs-iconColor"),
                            i.iconClass === undefined &&
                                t.classList.add("dvs-emptyBtn"),
                            i.onButtonClick &&
                                d(t, g, function (t) {
                                    n._scrollRender.buttonMove
                                        ? (n._scrollRender.buttonMove = !1)
                                        : (t.changedTouches,
                                          n._viewEmit(i.onButtonClick, t));
                                });
                    });
                }),
                (e._viewOn = function (t, e) {
                    this._on(t, e.bind(this));
                }),
                (e._viewOff = function (t, e) {
                    this._off(t, e);
                }),
                (e._viewEmit = function (t) {
                    for (
                        var e = arguments.length,
                            i = new Array(1 < e ? e - 1 : 0),
                            n = 1;
                        n < e;
                        n++
                    )
                        i[n - 1] = arguments[n];
                    this._emit.apply(this, [t].concat(i));
                }),
                (e.setShowViewer = function (t) {
                    var e = null == (e = this._viewerContainer) ? void 0 : e.el;
                    return (
                        (this.showViewer = t),
                        !!e &&
                            (this._viewEmit(
                                Ct,
                                this.showViewer && this.showMain
                            ),
                            t
                                ? (e.classList.remove("dvs-disabled"),
                                  this._resizeViewer(),
                                  this._showLatestPage())
                                : e.classList.add("dvs-disabled"),
                            !0)
                    );
                }),
                (e.setShowTopMenu = function (t) {
                    var e = this._myQuery("topMenu" + this.postfix);
                    return (
                        (this.showTopMenu = t),
                        !!e &&
                            (t
                                ? e.classList.remove("dvs-disabled")
                                : e.classList.add("dvs-disabled"),
                            this._resizeViewer(),
                            !0)
                    );
                }),
                (e.setShowHeader = function (t) {
                    var e = this._myQuery("header" + this.postfix);
                    return (
                        (this.showHeader = t),
                        !!e &&
                            (t
                                ? e.classList.remove("dvs-disabled")
                                : e.classList.add("dvs-disabled"),
                            this._resizeViewer(),
                            !0)
                    );
                }),
                (e.setShowSidebar = function (t) {
                    this.showSidebar = t;
                    var e,
                        t =
                            null == (e = this._sideRender)
                                ? void 0
                                : e.setShowSidebar(t);
                    return this._resizeViewer(), t;
                }),
                (e.setShowAside = function (t) {
                    var e = this._myQuery("asideMenu" + this.postfix);
                    return (
                        (this.showAside = t),
                        !!e &&
                            (t
                                ? e.classList.remove("dvs-disabled")
                                : e.classList.add("dvs-disabled"),
                            this._resizeViewer(),
                            !0)
                    );
                }),
                (e.setShowMain = function (t) {
                    var e = this._myQuery("container" + this.postfix);
                    return (
                        (this.showMain = t),
                        !!e &&
                            (t
                                ? e.classList.remove("dvs-disabled")
                                : e.classList.add("dvs-disabled"),
                            this._viewEmit(
                                Ct,
                                this.showMain && this.showViewer
                            ),
                            this._resizeViewer(),
                            !0)
                    );
                }),
                (e.setShowFooter = function (t) {
                    var e = this._myQuery("bottomMenu" + this.postfix);
                    return (
                        (this.showFooter = t),
                        !!e &&
                            (t
                                ? e.classList.remove("dvs-disabled")
                                : e.classList.add("dvs-disabled"),
                            this._resizeViewer(),
                            !0)
                    );
                }),
                (e.setShowTab = function (t) {
                    var e = this._myQuery("tabList" + this.postfix);
                    return (
                        (this.showTab = t),
                        !!e &&
                            (t
                                ? e.classList.remove("dvs-disabled")
                                : e.classList.add("dvs-disabled"),
                            this._resizeViewer(),
                            !0)
                    );
                }),
                (e.setHeaderColor = function (t) {
                    if (!t) return !0;
                    var e = this._myQuery("header" + this.postfix);
                    return (
                        (this.headerColor = t),
                        e && (e.style.background = t),
                        !0
                    );
                }),
                (e.setTopMenuColor = function (t) {
                    if (!t) return !0;
                    var e = this._myQuery("topMenu" + this.postfix);
                    return (
                        (this.topMenuColor = t),
                        e && (e.style.background = t),
                        !0
                    );
                }),
                (e.setTopMenuBorder = function (t) {
                    if (!t) return !0;
                    var e = this._myQuery("topMenu" + this.postfix);
                    return (
                        (this.topMenuBorder = t),
                        e && (e.style.border = t),
                        this._resizeViewer(),
                        !0
                    );
                }),
                (e.setFooterColor = function (t) {
                    if (!t) return !0;
                    var e = this._myQuery("bottomMenu" + this.postfix);
                    return (
                        (this.footerColor = t),
                        e && (e.style.background = t),
                        !0
                    );
                }),
                (e.setAsideMenuColor = function (t) {
                    if (!t) return !0;
                    this.asideMenuColor = t;
                    var e = this._myQuery("asideMenu" + this.postfix);
                    return e && (e.style.background = t), !0;
                }),
                (e.setViewerBorderColor = function (t) {
                    var e, i, n, s;
                    t &&
                        ((e =
                            null == (e = this._viewerContainer)
                                ? void 0
                                : e.el),
                        (i = this._myQuery("Thumbnail" + this.postfix)),
                        (n = this._myQuery("content" + this.postfix)),
                        (s = this._myQuery("middle" + this.postfix)),
                        e && (e.style.borderColor = t),
                        i && (i.style.borderColor = t),
                        n && (n.style.borderColor = t),
                        s && (s.style.borderColor = t),
                        (this.viewerBorderColor = t));
                }),
                (e.setOuterBorder = function (t) {
                    var e, i;
                    t &&
                        ((this.outerBorder = t),
                        (e =
                            null == (e = this._viewerContainer)
                                ? void 0
                                : e.el) && (e.style.border = t),
                        (e = this._myQuery("container" + this.postfix)),
                        (i = this._myQuery("middle" + this.postfix)),
                        e &&
                            i &&
                            ((t = t.split(" ")),
                            (e.style.borderStyle = t[1]),
                            (e.style.borderColor = t[2]),
                            (i.style.borderStyle = t[1]),
                            (i.style.borderColor = t[2]),
                            this._setSplitBar()),
                        this._resizeViewer());
                }),
                (e.setViewerWidth = function (t) {
                    var e = null == (e = this._viewerContainer) ? void 0 : e.el;
                    if (((this.width = t), !e)) return !1;
                    var i = String(t);
                    return (
                        /\d+$/.test(i) && (t = i + "px"),
                        (e.style.width = "".concat(t)),
                        this._resizeViewer(),
                        this._showLatestPage(),
                        !0
                    );
                }),
                (e.getViewerWidth = function () {
                    var t = null == (t = this._viewerContainer) ? void 0 : t.el;
                    return t ? t.offsetWidth : this.width;
                }),
                (e.setViewerHeight = function (t) {
                    var e = null == (e = this._viewerContainer) ? void 0 : e.el;
                    if (((this.height = t), !e)) return !1;
                    var i = String(t);
                    return (
                        /\d+$/.test(i) && (t = i + "px"),
                        (e.style.height = "".concat(t)),
                        this._resizeViewer(),
                        this._showLatestPage(),
                        !0
                    );
                }),
                (e.getViewerHeight = function () {
                    var t = null == (t = this._viewerContainer) ? void 0 : t.el;
                    return t ? t.offsetHeight : this.height;
                }),
                (e.setSidebarWidth = function (t) {
                    var e,
                        t =
                            null == (e = this._sideRender)
                                ? void 0
                                : e.setSidebarWidth(t);
                    return this._resizeViewer(), t;
                }),
                (e.getSidebarWidth = function () {
                    var t;
                    return null == (t = this._sideRender)
                        ? void 0
                        : t.getSidebarWidth();
                }),
                (e.setShowVideoContainer = function (t) {
                    var e = this._myQuery("container" + this.postfix);
                    if (!e) return !1;
                    for (var i = e.children, n = 0, s = i.length; n < s; n++) {
                        var r = i[n];
                        if (
                            null != r &&
                            r.classList.contains("dvs-customElement")
                        )
                            break;
                        r.classList.contains("dvs-videoContainer")
                            ? t
                                ? r.classList.remove("dvs-hideVideoContainer")
                                : r.classList.add("dvs-hideVideoContainer")
                            : t
                            ? r.classList.add("dvs-hideVideoContainer")
                            : r.classList.remove("dvs-hideVideoContainer");
                    }
                    return (
                        (this.showVideoContainer = t) ||
                            (this._resizeViewer(), this._showLatestPage()),
                        !0
                    );
                }),
                (e.switchToTagTab = function () {
                    var t = this._myQuery("TagsNav" + this.postfix),
                        t = t && t.children[0];
                    return !!t && (t.click(), !0);
                }),
                (e.switchToTreeTab = function () {
                    var t = this._myQuery("DirctoryTreeNav" + this.postfix),
                        t = t && t.children[0];
                    return !!t && (t.click(), !0);
                }),
                (e.showGroup = function (t) {
                    t = this._myQuery(t + this.postfix);
                    return (
                        !!t &&
                        (t.classList.remove("dvs-disabled"),
                        t.classList.remove("dvs-noDisplay"),
                        !0)
                    );
                }),
                (e.hideGroup = function (t) {
                    t = this._myQuery(t + this.postfix);
                    return (
                        !!t &&
                        (t.classList.add("dvs-disabled"),
                        t.classList.add("dvs-noDisplay"),
                        !0)
                    );
                }),
                (e._documentMouseMove = function (t) {}),
                (e._documentMouseUp = function (t) {
                    var e;
                    return (
                        !(null == (e = this._viewerContainer) || !e.el || !t) &&
                        (!t.button || 0 === t.button) &&
                        void (
                            null != (e = this._sideRender) && e.stretchMouseUp()
                        )
                    );
                }),
                (e.documentKeyDown = function (t, e) {
                    e
                        ? this._thumbnailRender.keydownCallback(t, e)
                        : this._viewEmit(Vt, t);
                }),
                (e.documentKeyUp = function (t, e) {
                    e
                        ? this._thumbnailRender.keyupCallback(t, e)
                        : this._viewEmit(qt, t);
                }),
                (e._documentClick = function (t) {
                    this._viewEmit(wt, {
                        viewerId: undefined,
                        thumbnailId: undefined,
                    });
                }),
                (e.styleChange = function () {
                    if (!this.showViewer) return !1;
                    if (this.uiConfig.buttonResize.ifResize)
                        if (u()) {
                            var t =
                                null == (t = this._viewerContainer)
                                    ? void 0
                                    : t.el;
                            if (!t) return;
                            t.classList.add("dynamsoft-dwt-imageEditor"),
                                (t = null);
                        } else this._changeButtonSize();
                    t = this._myQuery("topMenuRight" + this.postfix);
                    t &&
                        (t.parentElement.style.paddingRight =
                            (t.getBoundingClientRect().width || 0) + "px"),
                        this._thumbnailRender.calculateSize(),
                        this._thumbnailRender.updateAllDisplayed(),
                        this.updateVideoSize(),
                        this._scrollRender.updateAllGroupShowMore(),
                        this._canvasRender.updateCanvasInnerSize(),
                        this._sendViewSize();
                }),
                (e._viewerClick = function (t) {}),
                (e._viewerRightClick = function (t) {}),
                (e._viewerMove = function (t) {
                    var e;
                    null != (e = this._sideRender) && e.stretchMouseMove(t);
                }),
                (e._sendViewSize = function () {
                    var t = null == (t = this._viewerContainer) ? void 0 : t.el;
                    return (
                        !!t &&
                        0 !== (t = t.getBoundingClientRect()).width &&
                        0 !== t.height &&
                        (Math.round(t.width) !== Math.round(this.showWidth) ||
                            Math.round(t.height) !==
                                Math.round(this.showHeight)) &&
                        ((this.showWidth = Math.round(t.width)),
                        (this.showHeight = Math.round(t.height)),
                        void this._viewEmit(nt, t.width, t.height))
                    );
                }),
                (e.createThumbnail = function (t) {
                    return this._thumbnailRender.createThumbnail(t);
                }),
                (e.createInnerThumbnail = function () {
                    this._thumbnailRender.createInnerThumbnail(
                        this.uiConfig.canvasConfig
                    );
                }),
                (e.removeThumbnail = function (t) {
                    t = this._thumbnailRender.removeThumbnail(t);
                    return this._setSplitBar(), t;
                }),
                (e._sideBarClick = function (t) {
                    var e;
                    null != (e = this._sideRender) &&
                        e.setShowNavigationBox(!1);
                }),
                (e._sidebarStretchStart = function (t) {
                    var e;
                    null != (e = this._sideRender) && e.stretchMouseDown(t);
                }),
                (e._openDefaultTag = function () {
                    this._directoryRender &&
                        this._tagRender &&
                        (this._viewEmit("_onOpenAll"),
                        this._myQuery(
                            "defaultTag" + this.postfix
                        ).classList.add("dvs-activeAllImage"),
                        this._tagRender.selectTagByName(""),
                        this._directoryRender.selectFileByName(""));
                }),
                (e._fileListClick = function (t) {
                    var e = this._directoryRender;
                    e &&
                        (e.confirmFolder(t),
                        e.cancelFolder(t),
                        e.enterFolder(t));
                }),
                (e._fileListRightClick = function (t) {}),
                (e._fileListKeyUp = function (t) {
                    var e;
                    13 === t.keyCode
                        ? (e = t.target.nextSibling.children[0]) && e.click()
                        : 27 === t.keyCode &&
                          (e = t.target.nextSibling.children[1]) &&
                          e.click();
                }),
                (e._addNewFolder = function (t) {
                    var e;
                    null != (e = this._directoryRender) && e.addNewFolder(t);
                }),
                (e._tagListClick = function (t) {
                    var e = t.target,
                        i = this._tagRender;
                    if (!e || !i) return !1;
                    e.classList.contains("confirmTag") ||
                    e.classList.contains("renameConfirmTag")
                        ? i.confirmTag(e)
                        : e.classList.contains("cancelTag")
                        ? i.cancelTag(e)
                        : e.classList.contains("dvs-quickEdit")
                        ? i.quickRenameTag(e)
                        : e.classList.contains("dvs-quickDel")
                        ? i.quickDelTag(e)
                        : i.showTagContent(t);
                }),
                (e._tagListRightClick = function (t) {}),
                (e._tagListKeyUp = function (t) {
                    var e;
                    13 === t.keyCode
                        ? (e = t.target.nextSibling.children[0]) && e.click()
                        : 27 === t.keyCode &&
                          (e = t.target.nextSibling.children[1]) &&
                          e.click();
                }),
                (e._addNewTag = function (t) {
                    var e;
                    null != (e = this._tagRender) && e.addNewTag(t);
                }),
                (e._pagerBlur = function (t) {
                    this._pagerRender.pageBlur(t);
                }),
                (e.setInnerTbProp = function (t, e) {
                    var i;
                    this._handleInnerProp(t, e),
                        null != (i = this._thumbnailRender.innerThumbnail) &&
                            i.handleInnerProp(t, e);
                }),
                (e._handleInnerProp = function (t, e) {
                    this[t] = e;
                    t =
                        "set" +
                        t.replace(/^[a-z]{1}/, function (t) {
                            return t.toUpperCase();
                        });
                    l(this[t]) && this[t](e);
                }),
                (e.setCanvasBackground = function (t) {
                    this.canvasBackground = t;
                    var e = this._myQuery("mainCanvas" + this.postfix),
                        i =
                            (e &&
                                ((e.style.background = ""),
                                setTimeout(function () {
                                    e.style.background = t;
                                })),
                            this._thumbnailRender.innerThumbnail &&
                                (this._thumbnailRender.innerThumbnail.background =
                                    t),
                            null == (i = this._viewerContainer.el)
                                ? void 0
                                : i.querySelector(".dvs-slideWrapper"));
                    i && (i.style.background = t);
                }),
                (e.setCanvasBorder = function (t) {
                    this.canvasBorder = t;
                    var e = this._myQuery("viewPort" + this.postfix);
                    e && (e.style.border = t),
                        this._thumbnailRender.innerThumbnail &&
                            (this._thumbnailRender.innerThumbnail.border = t),
                        this._resizeViewer();
                }),
                (e.setCanvasMouseShape = function (t, e) {
                    (e = void 0 === e ? !1 : e) ||
                        ((this.canvasMouseShape = t), this._viewEmit(jt, t));
                    e = this._myQuery("canvasWrapper" + this.postfix);
                    e && (e.style.cursor = t),
                        this._thumbnailRender.innerThumbnail &&
                            (this._thumbnailRender.innerThumbnail.mouseShape =
                                t);
                }),
                (e.setCanvasCursorTemp = function (t) {
                    this.setCanvasMouseShape(t || this.canvasMouseShape, !0);
                }),
                (e.setCropBoxStyle = function (t) {
                    this._thumbnailRender.innerThumbnail.setCropBoxStyle(t);
                }),
                (e.setSelectedBoxLineColor = function (t) {
                    this._thumbnailRender.innerThumbnail.setSelectedBoxLineColor(
                        t
                    );
                }),
                (e.setOperationMode = function (t) {
                    this._thumbnailRender.innerThumbnail.setOperationMode(t);
                }),
                (e.setSelectedBoxes = function (t, e) {
                    this._thumbnailRender.innerThumbnail.setSelectedBoxes(t, e);
                }),
                (e.clearSelectedBoxes = function (t) {
                    this._thumbnailRender.innerThumbnail.clearSelectedBoxes(t);
                }),
                (e.setKeepAspectRatio = function (t) {
                    this._thumbnailRender.innerThumbnail.setKeepAspectRatio(t);
                }),
                (e.setAspectRatio = function (t) {
                    this._thumbnailRender.innerThumbnail.setAspectRatio(t);
                }),
                (e._setScrollerSize = function (t) {
                    this._canvasRender.updateScrollSize(t);
                }),
                (e._tabListClick = function (t) {
                    t = t.target;
                    null == t ||
                        !t.classList.contains("dvs-closeTab") ||
                        (null != t && t["dvs-id"]);
                }),
                (e._tagRefresh = function (t) {
                    var e;
                    null != (e = this._tagRender) && e.updateTagList(t);
                }),
                (e._tagSelectedCallback = function (t) {
                    var e;
                    null != (e = this._tagRender) && e.selectTagByName(t);
                }),
                (e._imageSelectedCallback = function (t) {
                    return this._thumbnailRender.updateSelectedIndexes(t);
                }),
                (e._directoryRefresh = function (t) {
                    if (
                        !this._myQuery("treeLists" + this.postfix) ||
                        !this._directoryRender
                    )
                        return !1;
                    this._directoryRender.updateDirectory(t);
                    t = this._myQuery("addFolder" + this.postfix);
                    t && t.style && (t.style.pointerEvents = "auto");
                }),
                (e._fileSelectedCallback = function (t) {
                    var e;
                    null != (e = this._directoryRender) &&
                        e.selectFileByName(t);
                }),
                (e._pagerRefresh = function (t) {
                    var e = t.cur,
                        i = t.total,
                        n = this._pagerRender.getCurrentPage();
                    this._pagerRender.getTotalPage();
                    this._thumbnailRender.pageChangeCallback(n, e, i),
                        this._pagerRender.updatePage(t),
                        this._showLatestPage(e);
                }),
                (e._thumbnailRefresh = function (t) {
                    this._thumbnailRender.updateContents(t);
                }),
                (e.setDisplayMode = function (t) {
                    var e,
                        i = this._myQuery("viewPort" + this.postfix),
                        n = this._thumbnailRender.innerThumbnail;
                    if ("single" === t)
                        n.clearSelectedBoxes(),
                            null !=
                                (e = this._myQuery(
                                    "innerThumbnail" + this.postfix
                                )) && e.classList.add("dvs-disabled"),
                            null != i && i.classList.remove("dvs-disabled"),
                            (n.showThumbnail = !1);
                    else {
                        if ("continuous" !== t) return !1;
                        null != i && i.classList.add("dvs-disabled"),
                            null !=
                                (e = this._myQuery(
                                    "innerThumbnail" + this.postfix
                                )) && e.classList.remove("dvs-disabled"),
                            (n.showThumbnail = !0);
                    }
                    return this._resizeViewer(), !0;
                }),
                (e.setViewMode = function (t, e) {
                    return this._thumbnailRender.innerThumbnail.setViewMode(
                        t,
                        e
                    );
                }),
                (e._togglePaneBox = function () {
                    var t,
                        e =
                            null == (e = this._sideRender)
                                ? void 0
                                : e.getShowNavigation();
                    null != (t = this._sideRender) &&
                        t.setShowNavigationBox(!e);
                }),
                (e._customButtonClick = function (t, e) {
                    this._scrollRender.buttonMove
                        ? (this._scrollRender.buttonMove = !1)
                        : this._viewEmit(t, e);
                }),
                (e._closeSaveSettingBox = function () {}),
                (e._setSplitBar = function () {
                    var t = this._myQuery("container" + this.postfix),
                        e = this._myQuery("middle" + this.postfix);
                    if (!t || !e) return !1;
                    var i,
                        n,
                        s = Object.keys(this._thumbnailRender._thumbnails),
                        s = this._thumbnailRender._thumbnails[s[0]];
                    !s ||
                    null == s ||
                    !s.showThumbnail ||
                    (null != s && s.fullThumbnail)
                        ? ((t.style.borderWidth = "0px"),
                          (e.style.borderWidth = "0px"))
                        : ((n = this.outerBorder.split(" ")[0]),
                          (i = "horizontal" === s.location),
                          (s = s.sequence),
                          (n = this._getBorderWidth(n, i, s)),
                          i
                              ? ((t.style.borderWidth = n),
                                (e.style.borderWidth = "0px"))
                              : ((e.style.borderWidth = n),
                                (t.style.borderWidth = "0px"))),
                        this._resizeViewer();
                }),
                (e._changeButtonSize = function () {
                    var t = null == (t = this._viewerContainer) ? void 0 : t.el;
                    if (!t) return !1;
                    t.classList.add("dvs-buttonResize");
                    var e = t.clientWidth,
                        t = t.clientHeight,
                        e =
                            36 *
                            (e / 1920 < t / 1080 ? e / 1920 : t / 1080) *
                            window.devicePixelRatio,
                        i = this._myQuery("topMenu" + this.postfix),
                        n = this._myQuery("bottomMenu" + this.postfix),
                        t = this.uiConfig.buttonResize,
                        s = t.maxSize,
                        t = t.minSize,
                        r = Math.max(Math.min(e, s), t),
                        e = Math.floor(1.875 * r);
                    if (i && 0 < i.clientWidth) {
                        i.classList.add("dvs-resizeButton"),
                            c(i, { flexBasis: e + "px", height: e + "px" });
                        for (var o = 0; o < i.children.length; o++)
                            i.children[o].style.fontSize = r + "px";
                    }
                    if (n && 0 < n.clientWidth) {
                        n.classList.add("dvs-resizeButton"),
                            c(n, {
                                fontSize: r + "px",
                                flexBasis: e + "px",
                                height: e + "px",
                                justifyContent: "flex-start",
                            });
                        for (var a = 0; a < n.children.length; a++)
                            n.children[a].style.fontSize = r + "px";
                    }
                }),
                (e._resizeViewer = function (t, e) {
                    var i = this;
                    t && e && (this._showLatestQueue[t] = e),
                        clearTimeout(this._resizeTimer),
                        (this._resizeTimer = setTimeout(function () {
                            for (var t in (i.styleChange(),
                            i._showLatestQueue)) {
                                var e;
                                null != (t = (e = i._showLatestQueue)[t]) &&
                                    t.call(e, i._pagerRender.getCurrentPage());
                            }
                            i._showLatestQueue = {};
                        }, 20));
                }),
                (e._getBorderWidth = function (t, e, i) {
                    var n = "";
                    return (
                        (n += !e && i < 0 ? t : "0px") +
                        " " +
                        (e && 0 <= i ? t : "0px") +
                        " " +
                        (!e && 0 <= i ? t : "0px") +
                        " " +
                        (e && i < 0 ? t : "0px")
                    );
                }),
                (e._updatePagesLayout = function () {
                    this._thumbnailRender.updatePagesLayout();
                }),
                (e._showLatestPage = function (t) {
                    this._thumbnailRender.showLatestPage(t);
                }),
                (e.setButtonClass = function (t) {
                    var e,
                        i,
                        n,
                        s = this.uiConfig.buttons,
                        r = this._myQuery("".concat(t).concat(this.postfix));
                    return (
                        !!r &&
                        ((e = (s = s[t]).iconClass ? " " + s.iconClass : ""),
                        (i = s.cssStyle ? " " + s.cssStyle : ""),
                        (n = r.classList.contains("dvs-disabled")
                            ? " dvs-disabled"
                            : ""),
                        (s = s.setClass || ""),
                        (r.className = "ds-dvs-ui-iconfont dvs-iconColor dvs-"
                            .concat(t)
                            .concat(n)
                            .concat(e)
                            .concat(i, " ")
                            .concat(s)),
                        !0)
                    );
                }),
                (e.setGroupClass = function (t, e) {
                    var i,
                        n = this.uiConfig.groups,
                        s = this._myQuery(t + this.postfix);
                    return (
                        !!s &&
                        ((n = n[t].cssStyle ? " " + n[t].cssStyle : ""),
                        (i = s.classList.contains("dvs-disabled")
                            ? " dvs-disabled"
                            : ""),
                        (s.className = "dvs-"
                            .concat(t, " dvs-groupType")
                            .concat(i)
                            .concat(n, " ")
                            .concat(e)),
                        !0)
                    );
                }),
                (e.fullScreen = function () {
                    var t = null == (t = this._viewerContainer) ? void 0 : t.el,
                        t = (t = t).requestFullscreen
                            ? (t.requestFullscreen(), !0)
                            : t.mozRequestFullScreen
                            ? (t.mozRequestFullScreen(), !0)
                            : t.msRequestFullscreen
                            ? (t.msRequestFullscreen(), !0)
                            : t.oRequestFullscreen
                            ? (t.oRequestFullscreen(), !0)
                            : t.webkitRequestFullscreen
                            ? (t.webkitRequestFullScreen(), !0)
                            : (alert(
                                  "Your browser does not support full screen!"
                              ),
                              !1);
                    return this._resizeViewer(), t;
                }),
                (e.cancelFullScreen = function () {
                    var t =
                        !!(
                            (t = window.document).fullscreenElement ||
                            t.msFullscreenElement ||
                            t.mozFullScreenElement ||
                            t.webkitFullscreenElement
                        ) &&
                        ((t = window.document).exitFullScreen
                            ? (t.exitFullScreen(), !0)
                            : t.mozCancelFullScreen
                            ? (t.mozCancelFullScreen(), !0)
                            : t.webkitExitFullscreen
                            ? (t.webkitExitFullscreen(), !0)
                            : t.msExitFullscreen
                            ? (t.msExitFullscreen(), !0)
                            : void 0);
                    return this._resizeViewer(), t;
                }),
                (e.fullPage = function () {
                    var t = null == (t = this._viewerContainer) ? void 0 : t.el;
                    return (
                        !!t &&
                        (t.classList.add("fitPage"),
                        this.cancelFullScreen(),
                        this._resizeViewer(),
                        !0)
                    );
                }),
                (e.cancelFullPage = function () {
                    var t = null == (t = this._viewerContainer) ? void 0 : t.el;
                    return (
                        !!t &&
                        (t.classList.remove("fitPage"),
                        this.cancelFullScreen(),
                        this._resizeViewer(),
                        !0)
                    );
                }),
                (e.createCustomElement = function (t, e, i) {
                    return this._uiRender.createCustomElement(
                        t,
                        (e = void 0 === e ? 0 : e),
                        (i = void 0 === i ? !1 : i)
                    );
                }),
                (e.updateVideoSize = function () {
                    if (this._videoSize && this.showVideoContainer) {
                        var t = this._myQuery("videoContainer" + this.postfix),
                            e = this._myQuery("videoImage" + this.postfix);
                        if (!t || !e) return !1;
                        var i,
                            n = t.clientWidth,
                            t = t.clientHeight,
                            s = this._videoSize,
                            r = s.imageWidth,
                            s = s.imageHeight;
                        n / r - 1 < t / s - 1
                            ? ((i = n / r),
                              (e.style.width = n + "px"),
                              (e.style.height = s * i + "px"))
                            : ((e.style.width = r * (t / s) + "px"),
                              (e.style.height = t + "px")),
                            (this._videoSize.imageBoxWidth = e.clientWidth),
                            (this._videoSize.imageBoxHeight = e.clientHeight);
                    }
                }),
                (e.updateVideoContainer = function (t) {
                    var e = this;
                    return this._videoImageReady
                        ? this._updateVideoImage(t)
                        : (clearTimeout(this._updateVideoTimer),
                          (this._updateVideoTimer = setTimeout(function () {
                              e._updateVideoImage(t);
                          }, 200)),
                          !0);
                }),
                (e._updateVideoImage = function (t) {
                    var e = this,
                        i = this._myQuery("videoImage" + this.postfix);
                    if (!i) return !1;
                    (i.crossOrigin = "anonymous"),
                        (i.src = t),
                        clearTimeout(this._updateVideoTimer),
                        (this._videoImageReady = !1),
                        (i.onload = function () {
                            (e._videoImageReady = !0),
                                (i.style.display = ""),
                                (e._videoSize &&
                                    e._videoSize.imageWidth ===
                                        i.naturalWidth &&
                                    e._videoSize.imageHeight ===
                                        i.naturalHeight &&
                                    e._videoSize.imageBoxWidth ===
                                        i.clientWidth &&
                                    e._videoSize.imageBoxHeight ===
                                        i.clientHeight) ||
                                    ((e._videoSize = {
                                        imageWidth: i.naturalWidth,
                                        imageHeight: i.naturalHeight,
                                        imageBoxWidth: i.clientWidth,
                                        imageBoxHeight: i.clientHeight,
                                    }),
                                    e.updateVideoSize());
                        }),
                        (i.onerror = function () {
                            (e._videoImageReady = !0),
                                (i.style.display = "none"),
                                (i.onload = null);
                        });
                }),
                (e.getViewerElement = function () {
                    var t;
                    return (
                        (null == (t = this._viewerContainer) ? void 0 : t.el) ||
                        null
                    );
                }),
                (e.bindContent = function (t) {
                    return this._uiRender.bindContent(t);
                }),
                (e.unbindContent = function () {
                    return this._uiRender.unbindContent();
                }),
                (e.setLoadingImage = function (t) {
                    if (!t) return !1;
                    var e = this._myQuery("loadingImage" + this.postfix);
                    return e && (e.src = t), !0;
                }),
                (e._setShowLoadingImage = function (t) {
                    var e = this._myQuery("loadingLayer" + this.postfix);
                    e &&
                        (t
                            ? e.classList.remove("dvs-disabled")
                            : e.classList.add("dvs-disabled"));
                }),
                (e.dispose = function () {
                    var t;
                    o.prototype.dispose.call(this),
                        this.unbindView(),
                        this.unbindContent(),
                        null != (t = this._uiRender) && t.dispose(),
                        (this._uiRender = null) !=
                            (t = this._thumbnailRender) && t.dispose(),
                        (this._thumbnailRender = null) !=
                            (t = this._scrollRender) && t.dispose(),
                        (this._scrollRender = null) !=
                            (t = this._pagerRender) && t.dispose(),
                        (this._pagerRender = null) !=
                            (t = this._uiEventControl) && t.dispose(),
                        (this._uiEventControl = null) !=
                            (t = this._canvasRender) && t.dispose(),
                        (this._canvasRender = null) != (t = this._sideRender) &&
                            t.dispose(),
                        (this._sideRender = null) !=
                            (t = this._directoryRender) && t.dispose(),
                        (this._directoryRender = null) !=
                            (t = this._tagRender) && t.dispose(),
                        (this._tagRender = null),
                        (this._viewerContainer = null),
                        (this.containerBox = null);
                }),
                t
            );
        })(E);
    (window.Dynamsoft = window.Dynamsoft || {}), (window.Dynamsoft.ViewUi = Y);
})();
