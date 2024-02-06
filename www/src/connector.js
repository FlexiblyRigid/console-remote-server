/*! console-remote-client - 2.1.17 */ ! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.consolere = t() : e.consolere = t()
}(self, (function() {
    return (() => {
        var __webpack_modules__ = {
                87: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
                    "use strict";
                    __webpack_require__.d(__webpack_exports__, {
                        Z: () => __WEBPACK_DEFAULT_EXPORT__
                    });
                    const io = __webpack_require__(751),
                        {
                            printStackTrace
                        } = __webpack_require__(96),
                        {
                            matchMedia,
                            VISIBILITY,
                            IEArraysPolyfill,
                            isArray
                        } = __webpack_require__(806),
                        {
                            kindOf
                        } = __webpack_require__(554),
                        {
                            XBBCODE
                        } = __webpack_require__(655),
                        DEFAULT_CONSOLERE_SERVER = "https://console.re",
                        DEFAULT_CONSOLERE_CHANNEL = "default";
                    window.console || (window.console = {}), window.matchMedia = window.matchMedia || matchMedia, IEArraysPolyfill();
                    var name = "toServerRe",
                        consoleReOptions = {
                            redirectDefaultConsoleToRemote: !1,
                            disableDefaultConsoleOutput: !1,
                            channel: DEFAULT_CONSOLERE_CHANNEL,
                            server: DEFAULT_CONSOLERE_SERVER
                        },
                        consolereScriptTag = document.getElementById("consolerescript") || null;
                    if (consolereScriptTag) {
                        var options = consolereScriptTag.getAttribute("data-options");
                        options && -1 !== options.indexOf("redirectDefaultConsoleToRemote") && (consoleReOptions.redirectDefaultConsoleToRemote = !0), options && -1 !== options.indexOf("disableDefaultConsoleOutput") && (consoleReOptions.disableDefaultConsoleOutput = !0), consoleReOptions.channel = consolereScriptTag.getAttribute("data-channel") || consoleReOptions.channel, consoleReOptions.server = consolereScriptTag.getAttribute("data-server") || consoleReOptions.server
                    }
                    var isPrivate = consoleReOptions.server !== DEFAULT_CONSOLERE_SERVER,
                        isLocal = window.location.port || /localhost|[0-9]{2,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|::1|\.local|local|runjs\.co|\.dev|console.re|^$/gi.test(window.location.hostname);

                    function getCaller(e) {
                        e = e || 7;
                        var t, n = printStackTrace()[e];
                        return void 0 !== n ? null === (t = n.match(/^.*([\/<][^\/>]*>?):(\d*):(\d*)?$/)) && (t = n.match(/^.*([\/<][^\/>]*>?):(\d*)?$/)) : (t[1] = "", t[2] = "0", t[3] = "0"), {
                            file: t ? t[1] : "",
                            line: t ? t[2] : "0",
                            col: t ? t[3] : "0"
                        }
                    }

                    function getWindowSize() {
                        return "Window Size: [number]" + (document.width || window.outerWidth || document.documentElement.clientWidth) + "px[/number] by [number]" + (document.height || window.outerHeight || document.documentElement.clientHeight) + "px[/number]"
                    }

                    function getOtherTypes(t) {
                        var e, o = "";
                        try {
                            e = eval(t), !0 === e ? o = "[booltrue]true[/booltrue]" : !1 === e ? o = "[boolfalse]false[/boolfalse]" : !isNaN(parseFloat(e)) && isFinite(e) ? o = "[number]" + e + "[/number]" : "number" == typeof e ? o = "[number][Number][/number]" : "string" == typeof e ? o = '"String"' : "function" == typeof e ? o = "[Function]" : e.nodeType ? o = "<" + e.nodeName + " Element>" : "object" == typeof e ? (o = "{Object}", isArray(e) && (o = "[Array]")) : o = "[color=red]undefined[/color]"
                        } catch (e) {
                            o = "[color=red]" + e + "[/color]"
                        }
                        return o
                    }

                    function getType(e) {
                        var t = "";
                        if ("string" != typeof e) return getOtherTypes(e);
                        try {
                            var n = JSON.parse(e);
                            "object" == typeof n ? (t = "{Object}", isArray(n) && (t = "[Array]")) : t = getOtherTypes(e)
                        } catch (n) {
                            t = getOtherTypes(e)
                        }
                        return t
                    }

                    function replaceWithNum(e) {
                        return ("" + e).replace(/([0-9]+)(px|em||)/g, "[number]$1$2[/number]")
                    }

                    function getSize(e) {
                        return e ? "[number]" + getStyle(e, "width") + "[/number] by [number]" + getStyle(e, "height") + "[/number]" : ""
                    }

                    function getStyle(e, t) {
                        return e && e.currentStyle ? e.currentStyle[t] : window.getComputedStyle ? document.defaultView.getComputedStyle(e, null).getPropertyValue(t) : ""
                    }
                    window.location.origin || (window.location.origin = window.location.protocol + "//" + window.location.host);
                    var truncate = function(e, t) {
                        if (this.length <= e) return this;
                        var n = this.substr(0, e - 1);
                        return (t ? n.substr(0, n.lastIndexOf(" ")) : n) + "..."
                    };

                    function stringify(e, t, n) {
                        if (void 0 === e) return "___undefined___";
                        if ("object" != typeof e) return e;
                        var r, o, s = [],
                            i = [],
                            a = {},
                            c = "",
                            u = "";
                        return JSON.stringify(e, (function(e, l) {
                            if (void 0 === l) return "___undefined___";
                            if (!l) return l;
                            if (l.nodeType) {
                                if (l.id && (c = l.id), l.className && (u = l.className), "size" === t) return "[tag]<" + l.nodeName + ">[/tag] " + getSize(l);
                                if ("css" === t) {
                                    if (isArray(n)) return n.forEach((function(e) {
                                        a[e] = replaceWithNum(getStyle(l, e))
                                    })), a;
                                    if (n) return o = " " + n + ":" + getStyle(l, n) + ";", c && (c = " [attr]id=[/attr][string]'" + c + "'[/string]"), u && (u = " [attr]class=[/attr][string]'" + u + "'[/string]"), "[tag]<" + l.nodeName + c + u + ">[/tag]" + replaceWithNum(o)
                                } else a.element = l.nodeName, c && (a.id = c), u && (a.class = u), a.visible = VISIBILITY().isVisible(l), a.size = getSize(l), a.html = l.outerHTML;
                                return a
                            }
                            if (l.window && l.window === l.window.window) return "{Window Object}";
                            if ("function" == typeof l) return "[Function]";
                            if ("object" == typeof l && null !== l) {
                                var p = Array.prototype.slice.call(l);
                                if (l.length && p.length === l.length && (l = p), -1 !== (r = s.indexOf(l))) return "[ Circular {" + (i[r] || "root") + "} ]";
                                s.push(l), i.push(e)
                            }
                            return l
                        }))
                    }
                    var root = function() {
                            var e, t = [],
                                n = [],
                                r = [],
                                o = {},
                                s = [],
                                i = !1,
                                a = {
                                    client: !0,
                                    server: !0,
                                    loaded: !1
                                },
                                c = ["trace", "debug", "info", "log", "warn", "error", "size", "test", "assert", "count", "css", "media", "time", "timeEnd", "now", "type", "mark", "command"];

                            function u(e, t) {
                                e = "trace" === e ? "debug" : e, t = isArray(t) ? t : [t], "command" !== e && t.forEach((function(t) {
                                    if ("string" == typeof t && "" !== t) {
                                        if (0 === t.indexOf("consoleRe [")) return;
                                        var n = XBBCODE.process({
                                            text: t
                                        });
                                        n.error || (t = n.html)
                                    }! function(e, t) {
                                        if (!e || "" === e || "-" === e) return;
                                        var n = {};
                                        n = consoleReOptions.redirectDefaultConsoleToRemote && window.consoleDefault ? consoleDefault[t] ? consoleDefault[t] : consoleDefault.log : console[t] ? console[t] : console.log;
                                        try {
                                            n("consoleRe [" + t + "]", e)
                                        } catch (e) {}
                                    }(t, e)
                                }))
                            }

                            function l(i, a, c) {
                                var l, p, h, f, d, m = "";
                                if ("css" === (c = c || "")) d = a[a.length - 1], isArray(d) || "string" == typeof d ? a.pop() : c = "";
                                else if ("count" === c) p = a.toString(), isNaN(r[p]) ? r[p] = 1 : r[p]++, a.push(r[p]);
                                else if ("time" === c) h = a.toString(), s[h] = (new Date).getTime(), a.push("[white]started[/white]");
                                else if ("timeEnd" === c) h = a.toString(), f = (new Date).getTime() - s[h], isNaN(f) ? a.push("[white]not started[/white]") : a.push("[white]ends[/white] in [number]" + f + "[/number] ms");
                                else if ("now" === c) {
                                    var y, b, w = a.toString(),
                                        v = perfNow();
                                    o[w] ? (y = v - o[w], b = " [color=gray]from last call[/color]") : (y = v, b = " [color=gray]from navigation start[/color]"), o[w] = v, w = "-" !== w ? b + "[color=gray] at `" + w + "` [/color]" : b, (a = []).push("[white]performance now is[/white] [number]" + y.toFixed(2) + "[/number] ms" + w)
                                }
                                "" !== c && isArray(a) && u(c, a);
                                for (var _ = 0; _ < a.length; _++) a[_] = stringify(a[_], c, d);
                                "object" != typeof a || a.length ? ("command" === i && (m = c), l = {
                                    command: m,
                                    channel: consoleReOptions.channel,
                                    browser,
                                    level: i,
                                    args: a,
                                    caller: t
                                }) : l = a, e ? (n.length && g(n), e.emit(name, l)) : n.push([i, l])
                            }
                            for (var p, h = 0; h < c.length; h++) p = c[h], a[p] = f(p);

                            function f(e) {
                                return function() {
                                    a._dispatch(e, [].slice.call(arguments))
                                }
                            }

                            function d() {
                                if (e) {
                                    var t = "consoleRe [info] connected to server `" + consoleReOptions.server + "` channel `" + consoleReOptions.channel + "`";
                                    window.consoleDefault && consoleDefault.log ? consoleDefault.log(t) : console.log(t), e.emit("channel", consoleReOptions.channel)
                                }
                                g(n)
                            }

                            function g(e) {
                                var t = e.shift();
                                for (a._dispatch("command", "", "autoclear"), a._dispatch("command", "", "automark"); t;) l.apply(null, t), t = e.shift()
                            }
                            return a.connectIO = function(t) {
                                isLocal || isPrivate ? io ? ((e = io.connect(consoleReOptions.server, {
                                    withCredentials: !1,
                                    extraHeaders: {
                                        "x-consolere": "true"
                                    },
                                    reconnectionDelay: 500,
                                    reconnectionDelayMax: "Infinity"
                                })).on("connect", d), e.on("connect_failed", (function() {
                                    var e = "consoleRe [error] connection failed to server `" + consoleReOptions.server + "`";
                                    window.consoleDefault && consoleDefault.error ? consoleDefault.error(e) : console.error(e)
                                }))) : t || a.connectIO(!0) : console.warn("consoleRe [warning] seems like you trying to use console remote on public, production server. Console.Re is for light, local development only, for production you can install and use self hosted solution https://console.re/#self-hosted-server")
                            }, a.size = a.s = function(e) {
                                e && void 0 !== e && "window" !== e ? a._dispatch("size", [].slice.call(arguments), "size") : a._dispatch("size", [getWindowSize()])
                            }, a.count = a.c = function() {
                                a._dispatch("count", [].slice.call(arguments), "count")
                            }, a.time = a.ti = function() {
                                a._dispatch("time", [].slice.call(arguments), "time")
                            }, a.timeEnd = a.te = function() {
                                a._dispatch("time", [].slice.call(arguments), "timeEnd")
                            }, a.trace = a.tr = function() {
                                var e = printStackTrace(),
                                    t = [],
                                    n = [].slice.call(arguments);
                                for (h = 0; e.length > h; h++) /console.re.js/gi.test(e[h]) || t.push(e[h]);
                                a._dispatch("trace", [n.toString(), t])
                            }, a.error = a.e = function() {
                                var e = [].slice.call(arguments),
                                    t = "",
                                    n = [];
                                e.forEach((function(e) {
                                    t = "[color=red]" + e + "[/color]", n.push(t)
                                })), a._dispatch("error", n)
                            }, a.css = a.cs = function() {
                                a._dispatch("css", [].slice.call(arguments), "css")
                            }, a.test = a.ts = function() {
                                var e = [].slice.call(arguments),
                                    t = "",
                                    n = [];
                                e.forEach((function(e) {
                                    var r;
                                    t = kindOf(e), /|Function|Object|Array|Element|/gi.test(t) && (t = "[color=#BBB519]" + t + "[/color]");
                                    try {
                                        r = truncate.apply(e.toString(), [30, !1])
                                    } catch (t) {
                                        r = e
                                    }
                                    n.push("[color=#BC9044]" + r + "[/color][color=gray] is [/color]" + t)
                                })), a._dispatch("test", n)
                            }, a.type = a.t = function() {
                                var e = [].slice.call(arguments),
                                    t = "",
                                    n = [];
                                e.forEach((function(e) {
                                    t = "[color=#BBB519]" + kindOf(e) + "[/color]", n.push("type is " + t)
                                })), a._dispatch("type", n)
                            }, a.assert = a.a = function() {
                                var e = [].slice.call(arguments),
                                    t = [];
                                e.forEach((function(n, r) {
                                    "string" != typeof n && (n || ("string" == typeof e[r + 1] ? t.push("[color=red]" + e[r + 1] + "[/color]") : t.push("[color=red]Assertion Failure[/color]")))
                                })), t.length && a._dispatch("assert", t)
                            }, a._dispatch = function(n, r, o, s) {
                                ! function(n, r, o, s) {
                                    t = s || getCaller(), (r.length && -1 !== c.indexOf(n) || "command" === n) && (a.client && !1 === consoleReOptions.disableDefaultConsoleOutput && u.apply(null, arguments), a.server && l.apply(null, arguments), e || a.connectIO())
                                }(n, r, o, s)
                            }, a.media = a.mq = function(e, t) {
                                var n, r, o, s = [],
                                    c = [],
                                    u = !1,
                                    l = !0,
                                    p = "landscape",
                                    h = window.orientation || 0;
                                ("type" === e ? (u = !0, l = !1) : "all-types" !== e && "all" !== e || (l = u = !0), "watch" === e) && (r = getCaller(5), window.addEventListener && (window.addEventListener("resize", (function() {
                                    f(r)
                                }), !1), window.addEventListener("orientationchange", (function() {
                                    h !== window.orientation && (i = !0), f(r)
                                }), !1)));

                                function f(e) {
                                    window.matchMedia && (clearTimeout(o), o = setTimeout((function() {
                                        a.media("w", e)
                                    }), 500))
                                }

                                function d(e) {
                                    for (var t = s.length - 1; t >= 0; t--)
                                        if (s[t].media === e) return !0;
                                    return !1
                                }

                                function g() {
                                    var e = [];
                                    for (var t in s) s[t].matches && e.push(replaceWithNum(s[t].media));
                                    return e
                                }! function() {
                                    var e, t = function() {
                                        var e, t, n, r = document.styleSheets,
                                            o = [];
                                        for (t = r.length - 1; t >= 0; t--) try {
                                            if (e = r[t].cssRules)
                                                for (n = 0; n < e.length; n++) e[n].type === CSSRule.MEDIA_RULE && o.push(e[n].media.mediaText)
                                        } catch (e) {
                                            console.error(e)
                                        }
                                        return o
                                    }();
                                    if (l)
                                        for (e = t.length - 1; e >= 0; e--) d(t[e]) || s.push(window.matchMedia(t[e]));
                                    if (u) {
                                        var n = document.getElementsByTagName("link");
                                        for (e = n.length - 1; e >= 0; e--) n[e].media && s.push(window.matchMedia(n[e].media))
                                    }
                                }(), (n = g()).length ? 1 === n.length ? c.push(g()[0]) : c.push(g()) : c.push("[yellow]No Media Query Rules[/yellow]"), "w" === e ? (c.push(getWindowSize()), i && (90 !== Math.abs(window.orientation) && (p = "portrait"), c.push("Orientation: [yellow]" + p + "[/yellow]")), a._dispatch("media", c, "", t)) : a._dispatch("media", c)
                            }, a.now = a.n = function(e) {
                                void 0 === e && (e = "-"), a._dispatch("now", e, "now")
                            }, a.clear = a.cl = function() {
                                a._dispatch("command", "", "clear")
                            }, a.mark = a.m = function() {
                                var e = [].slice.call(arguments),
                                    t = 0 === e.length ? "" : e;
                                a._dispatch("command", t, "mark")
                            }, a.l = a.log, a.i = a.info, a.d = a.debug, a.w = a.warn, a.redirectDefaultLog = function() {
                                if (!(window.consoleDefault && consoleDefault.log || !isLocal && !isPrivate) && consoleReOptions.redirectDefaultConsoleToRemote) {
                                    window.consoleDefault = {};
                                    ["log", "info", "warn", "error", "debug", "time", "timeEnd"].forEach((function(e) {
                                        window.consoleDefault[e] = console[e], console[e] = f(e)
                                    }))
                                }
                            }, a.redirectDefaultLog(), a
                        }(),
                        perfNow = function() {
                            var e, t, n, r;
                            return "undefined" != typeof performance && null !== performance && performance.now ? performance.now() : "undefined" != typeof process && null !== process && process.hrtime ? (t = process.hrtime, r = (e = function() {
                                var e;
                                return 1e9 * (e = t())[0] + e[1]
                            })() - 1e9 * process.uptime(), (e() - r) / 1e6) : Date.now ? (n = Date.now(), Date.now() - n) : (n = (new Date).getTime(), (new Date).getTime() - n)
                        },
                        BrowserDetect = {
                            searchString: function(e) {
                                for (var t = "", n = 0; n < e.length; n++) {
                                    var r = e[n].str,
                                        o = e[n].prop;
                                    if (this.versionSearchString = e[n].vsearch || e[n].name, r && -1 !== r.indexOf(e[n].substr)) {
                                        t = e[n].name;
                                        break
                                    }
                                    if (o) {
                                        t = e[n].name;
                                        break
                                    }
                                }
                                return t
                            },
                            searchVersion: function(e) {
                                var t = e.indexOf(this.versionSearchString);
                                return -1 !== t && parseFloat(e.substr(t + this.versionSearchString.length + 1))
                            },
                            dataBrowser: [{
                                str: navigator.userAgent,
                                substr: "Edg",
                                vsearch: "Edg",
                                name: {
                                    f: "Edge",
                                    s: "EG"
                                }
                            }, {
                                str: navigator.userAgent,
                                substr: "Edge",
                                vsearch: "Edge",
                                name: {
                                    f: "Edge",
                                    s: "EG"
                                }
                            }, {
                                str: navigator.userAgent,
                                substr: "OPR",
                                vsearch: "OPR",
                                name: {
                                    f: "Opera",
                                    s: "OP"
                                }
                            }, {
                                str: navigator.userAgent,
                                substr: "Chrome",
                                vsearch: "Chrome",
                                name: {
                                    f: "Chrome",
                                    s: "CR"
                                }
                            }, {
                                str: navigator.userAgent,
                                substr: "OmniWeb",
                                vsearch: "OmniWeb",
                                name: {
                                    f: "OmniWeb",
                                    s: "OW"
                                }
                            }, {
                                str: navigator.vendor,
                                substr: "Apple",
                                name: {
                                    f: "Safari",
                                    s: "SF"
                                },
                                vsearch: "Version"
                            }, {
                                prop: window.opera,
                                name: {
                                    f: "Opera",
                                    s: "OP"
                                },
                                vsearch: "Version"
                            }, {
                                str: navigator.vendor,
                                substr: "iCab",
                                name: {
                                    f: "iCab",
                                    s: "iC"
                                }
                            }, {
                                str: navigator.vendor,
                                substr: "KDE",
                                name: {
                                    f: "Konqueror",
                                    s: "KDE"
                                }
                            }, {
                                str: navigator.userAgent,
                                substr: "Firefox",
                                name: {
                                    f: "Firefox",
                                    s: "FF"
                                },
                                vsearch: "Firefox"
                            }, {
                                str: navigator.vendor,
                                substr: "Camino",
                                name: {
                                    f: "Camino",
                                    s: "CM"
                                }
                            }, {
                                str: navigator.userAgent,
                                substr: "Netscape",
                                name: {
                                    f: "Netscape",
                                    s: "NS"
                                }
                            }, {
                                str: navigator.userAgent,
                                substr: "MSIE",
                                name: {
                                    f: "Explorer",
                                    s: "IE"
                                },
                                vsearch: "MSIE"
                            }, {
                                str: navigator.userAgent,
                                substr: "Trident",
                                name: {
                                    f: "Explorer",
                                    s: "IE"
                                },
                                vsearch: "rv"
                            }, {
                                str: navigator.userAgent,
                                substr: "Mozilla",
                                name: {
                                    f: "Netscape",
                                    s: "NS"
                                },
                                vsearch: "Mozilla"
                            }],
                            dataOS: [{
                                str: navigator.platform,
                                substr: "Win",
                                name: "Win"
                            }, {
                                str: navigator.platform,
                                substr: "Mac",
                                name: "Mac"
                            }, {
                                str: navigator.userAgent,
                                substr: "iPhone",
                                name: "iOS"
                            }, {
                                str: navigator.userAgent,
                                substr: "iPad",
                                name: "iOS"
                            }, {
                                str: navigator.userAgent,
                                substr: "Android",
                                name: "Android"
                            }, {
                                str: navigator.platform,
                                substr: "Linux",
                                name: "Linux"
                            }],
                            init: function() {
                                return {
                                    browser: this.searchString(this.dataBrowser) || "An unknown browser",
                                    version: this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "",
                                    OS: this.searchString(this.dataOS) || "an unknown OS"
                                }
                            }
                        },
                        browser = BrowserDetect.init();

                    function handleError(e, t, n) {
                        if (t || 0 !== e.indexOf("Script error") || 0 !== n) {
                            var r = new RegExp(window.location.origin, "g");
                            t = t.replace(r, ""), console.re && console.re.error("[color=red]" + e + "[/color] in [i]" + t + "[/i] Line: [b]" + n + "[/b]")
                        }
                    }
                    window.onerror = handleError, window.ConsoleRe = !0, window.ConsoleReConnectorVersion = "2.1.17", root.connect = function(e) {
                        return null != e && (null != e.redirectDefaultConsoleToRemote && (consoleReOptions.redirectDefaultConsoleToRemote = e.redirectDefaultConsoleToRemote), null !== e.disableDefaultConsoleOutput && (consoleReOptions.disableDefaultConsoleOutput = e.disableDefaultConsoleOutput), null != e.channel && (consoleReOptions.channel = e.channel), null != e.server && (consoleReOptions.server = e.server)), root.redirectDefaultLog(), root.connectIO(), root
                    };
                    const __WEBPACK_DEFAULT_EXPORT__ = root
                },
                568: (e, t, n) => {
                    const r = n(87).Z;
                    window.console || (window.console = {}), console.re = r, window.re = r, window.relog = r.log, e.exports = r
                },
                554: (e, t, n) => {
                    "use strict";
                    n.r(t), n.d(t, {
                        kindOf: () => r
                    });
                    var r = function(e) {
                        var t = Object.prototype.toString;
                        if (void 0 === e) return "Undefined";
                        if (null === e) return "Null";
                        if (!0 === e || !1 === e || e instanceof Boolean) return "Boolean";
                        if ("string" == typeof e || e instanceof String) return "String";
                        if ("number" == typeof e || e instanceof Number) return "Number";
                        if ("function" == typeof e || e instanceof Function) return "Function";
                        if (void 0 !== Array.isArray && Array.isArray(e)) return "Array";
                        if (e instanceof RegExp) return "Regexp";
                        if (e instanceof Date) return "Date";
                        var n, r = t.call(e);
                        return "[object RegExp]" === r ? "Regexp" : "[object Date]" === r ? "Date" : "[object Arguments]" === r ? "Arguments" : "[object Error]" === r ? "Error" : "undefined" != typeof Buffer && ((n = e).constructor && "function" == typeof n.constructor.isBuffer && n.constructor.isBuffer(n)) ? "Buffer" : "[object Set]" === r ? "Set" : "[object WeakSet]" === r ? "Weakset" : "[object Map]" === r ? "Map" : "[object WeakMap]" === r ? "Weakmap" : "[object Symbol]" === r ? "Symbol" : "[object Int8Array]" === r ? "Int8Array" : "[object Uint8Array]" === r ? "Uint8Array" : "[object Uint8ClampedArray]" === r ? "Uint8ClampedArray" : "[object Int16Array]" === r ? "Int16Array" : "[object Uint16Array]" === r ? "Uint16Array" : "[object Int32Array]" === r ? "Int32Array" : "[object Uint32Array]" === r ? "Uint32Array" : "[object Float32Array]" === r ? "Float32Array" : "[object Float64Array]" === r ? "Float64Array" : "Object"
                    }
                },
                806: (e, t, n) => {
                    "use strict";
                    n.r(t), n.d(t, {
                        VISIBILITY: () => r,
                        matchMedia: () => o,
                        IEArraysPolyfill: () => s,
                        isArray: () => i
                    });
                    var r = function() {
                            function e(e, t) {
                                return window.getComputedStyle ? document.defaultView.getComputedStyle(e, null)[t] : e.currentStyle ? e.currentStyle[t] : void 0
                            }
                            return {
                                getStyle: e,
                                isVisible: function t(n, r, o, s, i, a, c) {
                                    var u = n.parentNode;
                                    return !! function(e) {
                                        for (; e = e.parentNode;)
                                            if (e == document) return !0;
                                        return !1
                                    }(n) && (9 === u.nodeType || "0" !== e(n, "opacity") && "none" !== e(n, "display") && "hidden" !== e(n, "visibility") && (void 0 !== r && void 0 !== o && void 0 !== s && void 0 !== i && void 0 !== a && void 0 !== c || (r = n.offsetTop, i = n.offsetLeft, s = r + n.offsetHeight, o = i + n.offsetWidth, a = n.offsetWidth, c = n.offsetHeight), !u || ("hidden" !== e(u, "overflow") && "scroll" !== e(u, "overflow") || !(i + 2 > u.offsetWidth + u.scrollLeft || i + a - 2 < u.scrollLeft || r + 2 > u.offsetHeight + u.scrollTop || r + c - 2 < u.scrollTop)) && (n.offsetParent === u && (i += u.offsetLeft, r += u.offsetTop), t(u, r, o, s, i, a, c))))
                                }
                            }
                        },
                        o = function() {
                            var e = window.styleMedia || window.media;
                            if (!e) {
                                var t, n = document.createElement("style"),
                                    r = document.getElementsByTagName("script")[0];
                                n.type = "text/css", n.id = "matchmediajs-test", r.parentNode.insertBefore(n, r), t = "getComputedStyle" in window && window.getComputedStyle(n, null) || n.currentStyle, e = {
                                    matchMedium: function(e) {
                                        var r = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                                        return n.styleSheet ? n.styleSheet.cssText = r : n.textContent = r, "1px" === t.width
                                    }
                                }
                            }
                            return function(t) {
                                return {
                                    matches: e.matchMedium(t || "all"),
                                    media: t || "all"
                                }
                            }
                        },
                        s = function() {
                            Array.prototype.indexOf || (Array.prototype.indexOf = function(e, t) {
                                null == t ? t = 0 : t < 0 && (t = Math.max(0, this.length + t));
                                for (var n = t, r = this.length; n < r; n++)
                                    if (this[n] === e) return n;
                                return -1
                            }), Array.prototype.forEach || (Array.prototype.forEach = function(e, t) {
                                var n, r;
                                for (n = 0, r = this.length; n < r; ++n) n in this && e.call(t, this[n], n, this)
                            })
                        },
                        i = Array.isArray || function(e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        }
                },
                96: (t, n, r) => {
                    "use strict";
                    r.r(n), r.d(n, {
                        printStackTrace: () => o
                    });
                    var o = function(e) {
                        var t = (e = e || {
                                guess: !0
                            }).e || null,
                            n = !!e.guess,
                            r = e.mode || null,
                            s = new o.implementation,
                            i = s.run(t, r);
                        return n ? s.guessAnonymousFunctions(i) : i
                    };
                    o.implementation = function() {}, o.implementation.prototype = {
                        run: function(e, t) {
                            return e = e || this.createException(), "other" === (t = t || this.mode(e)) ? this.other(arguments.callee) : this[t](e)
                        },
                        createException: function() {
                            try {
                                this.undef()
                            } catch (e) {
                                return e
                            }
                        },
                        mode: function(e) {
                            return e.arguments && e.stack ? "chrome" : e.stack && e.sourceURL ? "safari" : e.stack && e.number ? "ie" : e.stack && e.fileName ? "firefox" : e.message && e["opera#sourceloc"] ? e.stacktrace ? e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? "opera9" : "opera10a" : "opera9" : e.message && e.stack && e.stacktrace ? e.stacktrace.indexOf("called from line") < 0 ? "opera10b" : "opera11" : e.stack && !e.fileName ? "chrome" : "other"
                        },
                        instrumentFunction: function(t, n, r) {
                            var o = (t = t || window)[n];
                            t[n] = function() {
                                return r.call(this, e().slice(4)), t[n]._instrumented.apply(this, arguments)
                            }, t[n]._instrumented = o
                        },
                        deinstrumentFunction: function(e, t) {
                            e[t].constructor === Function && e[t]._instrumented && e[t]._instrumented.constructor === Function && (e[t] = e[t]._instrumented)
                        },
                        chrome: function(e) {
                            return (e.stack + "\n").replace(/^\s+(at eval )?at\s+/gm, "").replace(/^([^\(]+?)([\n$])/gm, "{anonymous}() ($1)$2").replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, "{anonymous}() ($1)").replace(/^(.+) \((.+)\)$/gm, "$1@$2").split("\n").slice(1, -1)
                        },
                        safari: function(e) {
                            return e.stack.replace(/\[native code\]\n/m, "").replace(/^(?=\w+Error\:).*$\n/m, "").replace(/^@/gm, "{anonymous}()@").split("\n")
                        },
                        ie: function(e) {
                            return e.stack.replace(/^\s*at\s+(.*)$/gm, "$1").replace(/^Anonymous function\s+/gm, "{anonymous}() ").replace(/^(.+)\s+\((.+)\)$/gm, "$1@$2").split("\n").slice(1)
                        },
                        firefox: function(e) {
                            return e.stack.replace(/(?:\n@:0)?\s+$/m, "").replace(/^(?:\((\S*)\))?@/gm, "{anonymous}($1)@").split("\n")
                        },
                        opera11: function(e) {
                            for (var t = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/, n = e.stacktrace.split("\n"), r = [], o = 0, s = n.length; o < s; o += 2) {
                                var i = t.exec(n[o]);
                                if (i) {
                                    var a = i[4] + ":" + i[1] + ":" + i[2],
                                        c = i[3] || "global code";
                                    c = c.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, "{anonymous}"), r.push(c + "@" + a + " -- " + n[o + 1].replace(/^\s+/, ""))
                                }
                            }
                            return r
                        },
                        opera10b: function(e) {
                            for (var t = /^(.*)@(.+):(\d+)$/, n = e.stacktrace.split("\n"), r = [], o = 0, s = n.length; o < s; o++) {
                                var i = t.exec(n[o]);
                                if (i) {
                                    var a = i[1] ? i[1] + "()" : "global code";
                                    r.push(a + "@" + i[2] + ":" + i[3])
                                }
                            }
                            return r
                        },
                        opera10a: function(e) {
                            for (var t = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, n = e.stacktrace.split("\n"), r = [], o = 0, s = n.length; o < s; o += 2) {
                                var i = t.exec(n[o]);
                                if (i) {
                                    var a = i[3] || "{anonymous}";
                                    r.push(a + "()@" + i[2] + ":" + i[1] + " -- " + n[o + 1].replace(/^\s+/, ""))
                                }
                            }
                            return r
                        },
                        opera9: function(e) {
                            for (var t = /Line (\d+).*script (?:in )?(\S+)/i, n = e.message.split("\n"), r = [], o = 2, s = n.length; o < s; o += 2) {
                                var i = t.exec(n[o]);
                                i && r.push("{anonymous}()@" + i[2] + ":" + i[1] + " -- " + n[o + 1].replace(/^\s+/, ""))
                            }
                            return r
                        },
                        other: function(e) {
                            var t, n, r = "{anonymous}",
                                o = /function\s*([\w\-$]+)?\s*\(/i,
                                s = [];
                            try {
                                for (; e && e.arguments && s.length < 10;) t = o.test(e.toString()) && RegExp.$1 || r, n = Array.prototype.slice.call(e.arguments || []), s[s.length] = t + "(" + this.stringifyArguments(n) + ")", e = e.caller;
                                return s
                            } catch (e) {
                                return ""
                            }
                        },
                        stringifyArguments: function(e) {
                            for (var t = [], n = Array.prototype.slice, r = 0; r < e.length; ++r) {
                                var o = e[r];
                                void 0 === o ? t[r] = "undefined" : null === o ? t[r] = "null" : o.constructor && (o.constructor === Array ? o.length < 3 ? t[r] = "[" + this.stringifyArguments(o) + "]" : t[r] = "[" + this.stringifyArguments(n.call(o, 0, 1)) + "..." + this.stringifyArguments(n.call(o, -1)) + "]" : o.constructor === Object ? t[r] = "#object" : o.constructor === Function ? t[r] = "#function" : o.constructor === String ? t[r] = '"' + o + '"' : o.constructor === Number && (t[r] = o))
                            }
                            return t.join(",")
                        },
                        sourceCache: {},
                        ajax: function(e) {
                            return ""
                        },
                        createXMLHTTPObject: function() {
                            for (var e, t = [function() {
                                    return new XMLHttpRequest
                                }, function() {
                                    return new ActiveXObject("Msxml2.XMLHTTP")
                                }, function() {
                                    return new ActiveXObject("Msxml3.XMLHTTP")
                                }, function() {
                                    return new ActiveXObject("Microsoft.XMLHTTP")
                                }], n = 0; n < t.length; n++) try {
                                return e = t[n](), this.createXMLHTTPObject = t[n], e
                            } catch (e) {}
                        },
                        isSameDomain: function(e) {
                            return "undefined" != typeof location && -1 !== e.indexOf(location.hostname)
                        },
                        getSource: function(e) {
                            return e in this.sourceCache || (this.sourceCache[e] = this.ajax(e).split("\n")), this.sourceCache[e]
                        },
                        guessAnonymousFunctions: function(e) {
                            for (var t = 0; t < e.length; ++t) {
                                var n = e[t],
                                    r = /\{anonymous\}\(.*\)@(.*)/.exec(n);
                                if (r) {
                                    var o = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/.exec(r[1]);
                                    if (o) {
                                        var s = o[1],
                                            i = o[2],
                                            a = o[3] || 0;
                                        if (s && this.isSameDomain(s) && i) {
                                            var c = this.guessAnonymousFunction(s, i, a);
                                            e[t] = n.replace("{anonymous}", c)
                                        }
                                    }
                                }
                            }
                            return e
                        },
                        guessAnonymousFunction: function(e, t, n) {
                            var r;
                            try {
                                r = this.findFunctionName(this.getSource(e), t)
                            } catch (t) {
                                r = "getSource failed with url: " + e + ", exception: " + t.toString()
                            }
                            return r
                        },
                        findFunctionName: function(e, t) {
                            for (var n, r, o, s = /function\s+([^(]*?)\s*\(([^)]*)\)/, i = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/, a = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/, c = "", u = Math.min(t, 20), l = 0; l < u; ++l)
                                if ((o = (n = e[t - l - 1]).indexOf("//")) >= 0 && (n = n.substr(0, o)), n) {
                                    if (c = n + c, (r = i.exec(c)) && r[1]) return r[1];
                                    if ((r = s.exec(c)) && r[1]) return r[1];
                                    if ((r = a.exec(c)) && r[1]) return r[1]
                                } return "(?)"
                        }
                    }
                },
                655: (e, t, n) => {
                    "use strict";
                    n.r(t), n.d(t, {
                        XBBCODE: () => r
                    });
                    var r = function() {
                        function e(t, s, i, a, c, u, l) {
                            l = l || [], i++;
                            var p, h, f, d, g = new RegExp("(<bbcl=" + i + " )(" + r.join("|") + ")([ =>])", "gi"),
                                m = new RegExp("(<bbcl=" + i + " )(" + r.join("|") + ")([ =>])", "i"),
                                y = u.match(g) || [],
                                b = n[t] || {};
                            for (g.lastIndex = 0, y || (u = ""), f = 0; f < y.length; f++) m.lastIndex = 0, d = y[f].match(m)[2].toLowerCase(), b.restrictChildrenTo.length > 0 && (b.validChildLookup[d] || (h = 'The tag "' + d + '" is not allowed as a child of the tag "' + t + '".', l.push(h))), (p = n[d] || {}).restrictParentsTo.length > 0 && (p.validParentLookup[t] || (h = 'The tag "' + t + '" is not allowed as a parent of the tag "' + d + '".', l.push(h)));
                            return u = u.replace(o, (function(t, n, r, o, s) {
                                return l = e(r, t, n, r, o, s, l), t
                            })), l
                        }

                        function t(e) {
                            return e = e.replace(/\<([^\>][^\>]*?)\>/gi, (function(e, t) {
                                return null === t.match(/^bbcl=([0-9]+) /) ? "<bbcl=0 " + t + ">" : "<" + t.replace(/^(bbcl=)([0-9]+)/, (function(e, t, n) {
                                    return t + (parseInt(n, 10) + 1)
                                })) + ">"
                            }))
                        }
                        var n, r, o, s, i, a, c, u = {},
                            l = /^(?:https?|file|c):(?:\/{1,3}|\\{1})[-a-zA-Z0-9:@#%&()~_?\+=\/\\\.]*$/,
                            p = /^(?:red|green|blue|orange|yellow|black|white|brown|gray|silver|purple|maroon|fushsia|lime|olive|navy|teal|aqua)$/,
                            h = /^#?[a-fA-F0-9]{6}$/,
                            f = [];
                        n = {
                                b: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                string: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                attr: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                booltrue: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                boolfalse: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                bbcode: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                color: {
                                    openTag: function(e, t) {
                                        var n = e.substr(1) || "#FFF";
                                        return h.lastIndex = 0, p.test(n) || (h.test(n) ? "#" !== n.substr(0, 1) && (n = "#" + n) : n = "black"), ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                noparse: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    },
                                    noParse: !0
                                },
                                i: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                tag: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                number: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                img: {
                                    openTag: function(e, t) {
                                        var n = t;
                                        return l.lastIndex = 0, l.test(n) || (n = ""), ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    },
                                    displayContent: !1
                                },
                                s: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                size: {
                                    openTag: function(e, t) {
                                        var n = parseInt(e.substr(1), 10) || 0;
                                        return (n < 1 || n > 20) && (n = 1), ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                u: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                url: {
                                    openTag: function(e, t) {
                                        var n;
                                        return n = e ? e.substr(1) : t.replace(/<.*?>/g, ""), l.lastIndex = 0, l.test(n) || (n = "#"), ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                red: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                blue: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                green: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                yellow: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                orange: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                white: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                black: {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                },
                                "*": {
                                    openTag: function(e, t) {
                                        return ""
                                    },
                                    closeTag: function(e, t) {
                                        return ""
                                    }
                                }
                            }, r = [],
                            function() {
                                var e, t, o;
                                for (e in n)
                                    if (n.hasOwnProperty(e)) {
                                        for ("*" === e ? r.push("\\" + e) : (r.push(e), n[e].noParse && f.push(e)), n[e].validChildLookup = {}, n[e].validParentLookup = {}, n[e].restrictParentsTo = n[e].restrictParentsTo || [], n[e].restrictChildrenTo = n[e].restrictChildrenTo || [], o = n[e].restrictChildrenTo.length, t = 0; t < o; t++) n[e].validChildLookup[n[e].restrictChildrenTo[t]] = !0;
                                        for (o = n[e].restrictParentsTo.length, t = 0; t < o; t++) n[e].validParentLookup[n[e].restrictParentsTo[t]] = !0
                                    }
                            }(), o = new RegExp("<bbcl=([0-9]+) (" + r.join("|") + ")([ =][^>]*?)?>((?:.|[\\r\\n])*?)<bbcl=\\1 /\\2>", "gi"), s = new RegExp("\\[(" + r.join("|") + ")([ =][^\\]]*?)?\\]([^\\[]*?)\\[/\\1\\]", "gi"), i = new RegExp("\\[(" + f.join("|") + ")([ =][^\\]]*?)?\\]([\\s\\S]*?)\\[/\\1\\]", "gi"),
                            function() {
                                for (var e = [], t = 0; t < r.length; t++) "\\*" !== r[t] && e.push("/" + r[t]);
                                a = new RegExp("(\\[)((?:" + r.join("|") + ")(?:[ =][^\\]]*?)?)(\\])", "gi"), c = new RegExp("(\\[)(" + e.join("|") + ")(\\])", "gi")
                            }();
                        var d = function(e, t, r, s, i) {
                            r = r.toLowerCase();
                            var a = n[r].noParse ? function(e) {
                                    return e.replace(/<bbcl=[0-9]+ \/\*>/gi, "").replace(/<bbcl=[0-9]+ /gi, "&#91;").replace(/>/gi, "&#93;")
                                }(i) : i.replace(o, d),
                                c = n[r].openTag(s, a),
                                u = n[r].closeTag(s, a);
                            return !1 === n[r].displayContent && (a = ""), c + a + u
                        };
                        return u.process = function(n) {
                            var r = {
                                    html: "",
                                    error: !1
                                },
                                u = [];
                            for (n.text = n.text.replace(/</g, "<"), n.text = n.text.replace(/>/g, ">"), n.text = n.text.replace(a, (function(e, t, n, r) {
                                    return "<" + n + ">"
                                })), n.text = n.text.replace(c, (function(e, t, n, r) {
                                    return "<" + n + ">"
                                })), n.text = n.text.replace(/\[/g, "&#91;"), n.text = n.text.replace(/\]/g, "&#93;"), n.text = n.text.replace(/</g, "["), n.text = n.text.replace(/>/g, "]"); n.text !== (n.text = n.text.replace(i, (function(e, t, n, r) {
                                    return "[" + t + (n = n || "") + "]" + (r = (r = (r = r.replace(/\[/g, "&#91;")).replace(/\]/g, "&#93;")) || "") + "[/" + t + "]"
                                }))););
                            return n.text = function(e) {
                                for (e = (e = e.replace(/\[(?!\*[ =\]]|list([ =][^\]]*)?\]|\/list[\]])/gi, "<")).replace(/\[(?=list([ =][^\]]*)?\]|\/list[\]])/gi, ">"); e !== (e = e.replace(/>list([ =][^\]]*)?\]([^>]*?)(>\/list])/gi, (function(e, t, n) {
                                        for (var r = e; r !== (r = r.replace(/\[\*\]([^\[]*?)(\[\*\]|>\/list])/i, (function(e, t, n) {
                                                return "<*]" + t + (">/list]" === n ? "</*]</list]" : "</*][*]")
                                            }))););
                                        return r.replace(/>/g, "<")
                                    }))););
                                return e.replace(/</g, "[")
                            }(n.text), n.text = function(e) {
                                for (; e !== (e = e.replace(s, (function(e, n, r, o) {
                                        return t(e = (e = e.replace(/\[/g, "<")).replace(/\]/g, ">"))
                                    }))););
                                return e
                            }(n.text), u = e("bbcode", n.text, -1, 0, 0, n.text), r.html = function(e) {
                                var t = e.text;
                                return t.replace(o, d)
                            }(n), -1 === r.html.indexOf("[") && -1 === r.html.indexOf("]") || u.push("Some tags appear to be misaligned."), n.removeMisalignedTags && (r.html = r.html.replace(/\[.*?\]/g, "")), n.addInLineBreaks && (r.html = r.html.replace(/\r\n/g, "\n"), r.html = r.html.replace(/(\r|\n)/g, "$1<br/>")), r.html = r.html.replace("&#91;", "["), r.html = r.html.replace("&#93;", "]"), r.error = 0 !== u.length, r.errorQueue = u, r
                        }, u
                    }()
                },
                10: e => {
                    function t(e) {
                        e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
                    }
                    e.exports = t, t.prototype.duration = function() {
                        var e = this.ms * Math.pow(this.factor, this.attempts++);
                        if (this.jitter) {
                            var t = Math.random(),
                                n = Math.floor(t * this.jitter * e);
                            e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n
                        }
                        return 0 | Math.min(e, this.max)
                    }, t.prototype.reset = function() {
                        this.attempts = 0
                    }, t.prototype.setMin = function(e) {
                        this.ms = e
                    }, t.prototype.setMax = function(e) {
                        this.max = e
                    }, t.prototype.setJitter = function(e) {
                        this.jitter = e
                    }
                },
                704: (e, t) => {
                    ! function(e) {
                        "use strict";
                        t.encode = function(t) {
                            var n, r = new Uint8Array(t),
                                o = r.length,
                                s = "";
                            for (n = 0; n < o; n += 3) s += e[r[n] >> 2], s += e[(3 & r[n]) << 4 | r[n + 1] >> 4], s += e[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], s += e[63 & r[n + 2]];
                            return o % 3 == 2 ? s = s.substring(0, s.length - 1) + "=" : o % 3 == 1 && (s = s.substring(0, s.length - 2) + "=="), s
                        }, t.decode = function(t) {
                            var n, r, o, s, i, a = .75 * t.length,
                                c = t.length,
                                u = 0;
                            "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
                            var l = new ArrayBuffer(a),
                                p = new Uint8Array(l);
                            for (n = 0; n < c; n += 4) r = e.indexOf(t[n]), o = e.indexOf(t[n + 1]), s = e.indexOf(t[n + 2]), i = e.indexOf(t[n + 3]), p[u++] = r << 2 | o >> 4, p[u++] = (15 & o) << 4 | s >> 2, p[u++] = (3 & s) << 6 | 63 & i;
                            return l
                        }
                    }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")
                },
                767: e => {
                    function t(e) {
                        if (e) return function(e) {
                            for (var n in t.prototype) e[n] = t.prototype[n];
                            return e
                        }(e)
                    }
                    e.exports = t, t.prototype.on = t.prototype.addEventListener = function(e, t) {
                        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
                    }, t.prototype.once = function(e, t) {
                        function n() {
                            this.off(e, n), t.apply(this, arguments)
                        }
                        return n.fn = t, this.on(e, n), this
                    }, t.prototype.off = t.prototype.removeListener = t.prototype.removeAllListeners = t.prototype.removeEventListener = function(e, t) {
                        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                        var n, r = this._callbacks["$" + e];
                        if (!r) return this;
                        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
                        for (var o = 0; o < r.length; o++)
                            if ((n = r[o]) === t || n.fn === t) {
                                r.splice(o, 1);
                                break
                            } return 0 === r.length && delete this._callbacks["$" + e], this
                    }, t.prototype.emit = function(e) {
                        this._callbacks = this._callbacks || {};
                        for (var t = new Array(arguments.length - 1), n = this._callbacks["$" + e], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
                        if (n) {
                            r = 0;
                            for (var o = (n = n.slice(0)).length; r < o; ++r) n[r].apply(this, t)
                        }
                        return this
                    }, t.prototype.listeners = function(e) {
                        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
                    }, t.prototype.hasListeners = function(e) {
                        return !!this.listeners(e).length
                    }
                },
                227: (e, t, n) => {
                    t.formatArgs = function(t) {
                        if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors) return;
                        const n = "color: " + this.color;
                        t.splice(1, 0, n, "color: inherit");
                        let r = 0,
                            o = 0;
                        t[0].replace(/%[a-zA-Z%]/g, (e => {
                            "%%" !== e && (r++, "%c" === e && (o = r))
                        })), t.splice(o, 0, n)
                    }, t.save = function(e) {
                        try {
                            e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug")
                        } catch (e) {}
                    }, t.load = function() {
                        let e;
                        try {
                            e = t.storage.getItem("debug")
                        } catch (e) {}!e && "undefined" != typeof process && "env" in process && (e = {
                            NODE_ENV: "production"
                        }.DEBUG);
                        return e
                    }, t.useColors = function() {
                        if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
                        if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
                        return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
                    }, t.storage = function() {
                        try {
                            return localStorage
                        } catch (e) {}
                    }(), t.destroy = (() => {
                        let e = !1;
                        return () => {
                            e || (e = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))
                        }
                    })(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.log = console.debug || console.log || (() => {}), e.exports = n(447)(t);
                    const {
                        formatters: r
                    } = e.exports;
                    r.j = function(e) {
                        try {
                            return JSON.stringify(e)
                        } catch (e) {
                            return "[UnexpectedJSONParseError]: " + e.message
                        }
                    }
                },
                447: (e, t, n) => {
                    e.exports = function(e) {
                        function t(e) {
                            let n, o = null;

                            function s(...e) {
                                if (!s.enabled) return;
                                const r = s,
                                    o = Number(new Date),
                                    i = o - (n || o);
                                r.diff = i, r.prev = n, r.curr = o, n = o, e[0] = t.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
                                let a = 0;
                                e[0] = e[0].replace(/%([a-zA-Z%])/g, ((n, o) => {
                                    if ("%%" === n) return "%";
                                    a++;
                                    const s = t.formatters[o];
                                    if ("function" == typeof s) {
                                        const t = e[a];
                                        n = s.call(r, t), e.splice(a, 1), a--
                                    }
                                    return n
                                })), t.formatArgs.call(r, e);
                                (r.log || t.log).apply(r, e)
                            }
                            return s.namespace = e, s.useColors = t.useColors(), s.color = t.selectColor(e), s.extend = r, s.destroy = t.destroy, Object.defineProperty(s, "enabled", {
                                enumerable: !0,
                                configurable: !1,
                                get: () => null === o ? t.enabled(e) : o,
                                set: e => {
                                    o = e
                                }
                            }), "function" == typeof t.init && t.init(s), s
                        }

                        function r(e, n) {
                            const r = t(this.namespace + (void 0 === n ? ":" : n) + e);
                            return r.log = this.log, r
                        }

                        function o(e) {
                            return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
                        }
                        return t.debug = t, t.default = t, t.coerce = function(e) {
                            if (e instanceof Error) return e.stack || e.message;
                            return e
                        }, t.disable = function() {
                            const e = [...t.names.map(o), ...t.skips.map(o).map((e => "-" + e))].join(",");
                            return t.enable(""), e
                        }, t.enable = function(e) {
                            let n;
                            t.save(e), t.names = [], t.skips = [];
                            const r = ("string" == typeof e ? e : "").split(/[\s,]+/),
                                o = r.length;
                            for (n = 0; n < o; n++) r[n] && ("-" === (e = r[n].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")))
                        }, t.enabled = function(e) {
                            if ("*" === e[e.length - 1]) return !0;
                            let n, r;
                            for (n = 0, r = t.skips.length; n < r; n++)
                                if (t.skips[n].test(e)) return !1;
                            for (n = 0, r = t.names.length; n < r; n++)
                                if (t.names[n].test(e)) return !0;
                            return !1
                        }, t.humanize = n(824), t.destroy = function() {
                            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")
                        }, Object.keys(e).forEach((n => {
                            t[n] = e[n]
                        })), t.names = [], t.skips = [], t.formatters = {}, t.selectColor = function(e) {
                            let n = 0;
                            for (let t = 0; t < e.length; t++) n = (n << 5) - n + e.charCodeAt(t), n |= 0;
                            return t.colors[Math.abs(n) % t.colors.length]
                        }, t.enable(t.load()), t
                    }
                },
                549: e => {
                    e.exports = "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")()
                },
                983: (e, t, n) => {
                    const r = n(192);
                    e.exports = (e, t) => new r(e, t), e.exports.Socket = r, e.exports.protocol = r.protocol, e.exports.Transport = n(496), e.exports.transports = n(352), e.exports.parser = n(743)
                },
                192: (e, t, n) => {
                    const r = n(352),
                        o = n(767),
                        s = n(227)("engine.io-client:socket"),
                        i = n(743),
                        a = n(187),
                        c = n(830);
                    class u extends o {
                        constructor(e, t = {}) {
                            super(), e && "object" == typeof e && (t = e, e = null), e ? (e = a(e), t.hostname = e.host, t.secure = "https" === e.protocol || "wss" === e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = a(t.host).host), this.secure = null != t.secure ? t.secure : "undefined" != typeof location && "https:" === location.protocol, t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.hostname = t.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = t.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), this.transports = t.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.opts = Object.assign({
                                path: "/engine.io",
                                agent: !1,
                                withCredentials: !1,
                                upgrade: !0,
                                jsonp: !0,
                                timestampParam: "t",
                                rememberUpgrade: !1,
                                rejectUnauthorized: !0,
                                perMessageDeflate: {
                                    threshold: 1024
                                },
                                transportOptions: {}
                            }, t), this.opts.path = this.opts.path.replace(/\/$/, "") + "/", "string" == typeof this.opts.query && (this.opts.query = c.decode(this.opts.query)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingTimeoutTimer = null, "function" == typeof addEventListener && addEventListener("beforeunload", (() => {
                                this.transport && (this.transport.removeAllListeners(), this.transport.close())
                            }), !1), this.open()
                        }
                        createTransport(e) {
                            s('creating transport "%s"', e);
                            const t = function(e) {
                                const t = {};
                                for (let n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                                return t
                            }(this.opts.query);
                            t.EIO = i.protocol, t.transport = e, this.id && (t.sid = this.id);
                            const n = Object.assign({}, this.opts.transportOptions[e], this.opts, {
                                query: t,
                                socket: this,
                                hostname: this.hostname,
                                secure: this.secure,
                                port: this.port
                            });
                            return s("options: %j", n), new r[e](n)
                        }
                        open() {
                            let e;
                            if (this.opts.rememberUpgrade && u.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket";
                            else {
                                if (0 === this.transports.length) {
                                    const e = this;
                                    return void setTimeout((function() {
                                        e.emit("error", "No transports available")
                                    }), 0)
                                }
                                e = this.transports[0]
                            }
                            this.readyState = "opening";
                            try {
                                e = this.createTransport(e)
                            } catch (e) {
                                return s("error while creating transport: %s", e), this.transports.shift(), void this.open()
                            }
                            e.open(), this.setTransport(e)
                        }
                        setTransport(e) {
                            s("setting transport %s", e.name);
                            const t = this;
                            this.transport && (s("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = e, e.on("drain", (function() {
                                t.onDrain()
                            })).on("packet", (function(e) {
                                t.onPacket(e)
                            })).on("error", (function(e) {
                                t.onError(e)
                            })).on("close", (function() {
                                t.onClose("transport close")
                            }))
                        }
                        probe(e) {
                            s('probing transport "%s"', e);
                            let t = this.createTransport(e, {
                                    probe: 1
                                }),
                                n = !1;
                            const r = this;

                            function o() {
                                if (r.onlyBinaryUpgrades) {
                                    const e = !this.supportsBinary && r.transport.supportsBinary;
                                    n = n || e
                                }
                                n || (s('probe transport "%s" opened', e), t.send([{
                                    type: "ping",
                                    data: "probe"
                                }]), t.once("packet", (function(o) {
                                    if (!n)
                                        if ("pong" === o.type && "probe" === o.data) {
                                            if (s('probe transport "%s" pong', e), r.upgrading = !0, r.emit("upgrading", t), !t) return;
                                            u.priorWebsocketSuccess = "websocket" === t.name, s('pausing current transport "%s"', r.transport.name), r.transport.pause((function() {
                                                n || "closed" !== r.readyState && (s("changing transport and sending upgrade packet"), h(), r.setTransport(t), t.send([{
                                                    type: "upgrade"
                                                }]), r.emit("upgrade", t), t = null, r.upgrading = !1, r.flush())
                                            }))
                                        } else {
                                            s('probe transport "%s" failed', e);
                                            const n = new Error("probe error");
                                            n.transport = t.name, r.emit("upgradeError", n)
                                        }
                                })))
                            }

                            function i() {
                                n || (n = !0, h(), t.close(), t = null)
                            }

                            function a(n) {
                                const o = new Error("probe error: " + n);
                                o.transport = t.name, i(), s('probe transport "%s" failed because of error: %s', e, n), r.emit("upgradeError", o)
                            }

                            function c() {
                                a("transport closed")
                            }

                            function l() {
                                a("socket closed")
                            }

                            function p(e) {
                                t && e.name !== t.name && (s('"%s" works - aborting "%s"', e.name, t.name), i())
                            }

                            function h() {
                                t.removeListener("open", o), t.removeListener("error", a), t.removeListener("close", c), r.removeListener("close", l), r.removeListener("upgrading", p)
                            }
                            u.priorWebsocketSuccess = !1, t.once("open", o), t.once("error", a), t.once("close", c), this.once("close", l), this.once("upgrading", p), t.open()
                        }
                        onOpen() {
                            if (s("socket open"), this.readyState = "open", u.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.opts.upgrade && this.transport.pause) {
                                s("starting upgrade probes");
                                let e = 0;
                                const t = this.upgrades.length;
                                for (; e < t; e++) this.probe(this.upgrades[e])
                            }
                        }
                        onPacket(e) {
                            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (s('socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e), this.emit("heartbeat"), e.type) {
                                case "open":
                                    this.onHandshake(JSON.parse(e.data));
                                    break;
                                case "ping":
                                    this.resetPingTimeout(), this.sendPacket("pong"), this.emit("pong");
                                    break;
                                case "error":
                                    const t = new Error("server error");
                                    t.code = e.data, this.onError(t);
                                    break;
                                case "message":
                                    this.emit("data", e.data), this.emit("message", e.data)
                            } else s('packet received with socket readyState "%s"', this.readyState)
                        }
                        onHandshake(e) {
                            this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" !== this.readyState && this.resetPingTimeout()
                        }
                        resetPingTimeout() {
                            clearTimeout(this.pingTimeoutTimer), this.pingTimeoutTimer = setTimeout((() => {
                                this.onClose("ping timeout")
                            }), this.pingInterval + this.pingTimeout)
                        }
                        onDrain() {
                            this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
                        }
                        flush() {
                            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (s("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
                        }
                        write(e, t, n) {
                            return this.sendPacket("message", e, t, n), this
                        }
                        send(e, t, n) {
                            return this.sendPacket("message", e, t, n), this
                        }
                        sendPacket(e, t, n, r) {
                            if ("function" == typeof t && (r = t, t = void 0), "function" == typeof n && (r = n, n = null), "closing" === this.readyState || "closed" === this.readyState) return;
                            (n = n || {}).compress = !1 !== n.compress;
                            const o = {
                                type: e,
                                data: t,
                                options: n
                            };
                            this.emit("packetCreate", o), this.writeBuffer.push(o), r && this.once("flush", r), this.flush()
                        }
                        close() {
                            const e = this;

                            function t() {
                                e.onClose("forced close"), s("socket closing - telling transport to close"), e.transport.close()
                            }

                            function n() {
                                e.removeListener("upgrade", n), e.removeListener("upgradeError", n), t()
                            }

                            function r() {
                                e.once("upgrade", n), e.once("upgradeError", n)
                            }
                            return "opening" !== this.readyState && "open" !== this.readyState || (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", (function() {
                                this.upgrading ? r() : t()
                            })) : this.upgrading ? r() : t()), this
                        }
                        onError(e) {
                            s("socket error %j", e), u.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e)
                        }
                        onClose(e, t) {
                            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                                s('socket close with reason: "%s"', e);
                                const n = this;
                                clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e, t), n.writeBuffer = [], n.prevBufferLen = 0
                            }
                        }
                        filterUpgrades(e) {
                            const t = [];
                            let n = 0;
                            const r = e.length;
                            for (; n < r; n++) ~this.transports.indexOf(e[n]) && t.push(e[n]);
                            return t
                        }
                    }
                    u.priorWebsocketSuccess = !1, u.protocol = i.protocol, e.exports = u
                },
                496: (e, t, n) => {
                    const r = n(743),
                        o = n(767),
                        s = n(227)("engine.io-client:transport");
                    e.exports = class extends o {
                        constructor(e) {
                            super(), this.opts = e, this.query = e.query, this.readyState = "", this.socket = e.socket
                        }
                        onError(e, t) {
                            const n = new Error(e);
                            return n.type = "TransportError", n.description = t, this.emit("error", n), this
                        }
                        open() {
                            return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
                        }
                        close() {
                            return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
                        }
                        send(e) {
                            "open" === this.readyState ? this.write(e) : s("transport is not open, discarding packets")
                        }
                        onOpen() {
                            this.readyState = "open", this.writable = !0, this.emit("open")
                        }
                        onData(e) {
                            const t = r.decodePacket(e, this.socket.binaryType);
                            this.onPacket(t)
                        }
                        onPacket(e) {
                            this.emit("packet", e)
                        }
                        onClose() {
                            this.readyState = "closed", this.emit("close")
                        }
                    }
                },
                352: (e, t, n) => {
                    const r = n(777),
                        o = n(416),
                        s = n(785),
                        i = n(442);
                    t.polling = function(e) {
                        let t, n = !1,
                            i = !1;
                        const a = !1 !== e.jsonp;
                        if ("undefined" != typeof location) {
                            const t = "https:" === location.protocol;
                            let r = location.port;
                            r || (r = t ? 443 : 80), n = e.hostname !== location.hostname || r !== e.port, i = e.secure !== t
                        }
                        if (e.xdomain = n, e.xscheme = i, t = new r(e), "open" in t && !e.forceJSONP) return new o(e);
                        if (!a) throw new Error("JSONP disabled");
                        return new s(e)
                    }, t.websocket = i
                },
                785: (e, t, n) => {
                    const r = n(15),
                        o = n(549),
                        s = /\n/g,
                        i = /\\n/g;
                    let a;
                    e.exports = class extends r {
                        constructor(e) {
                            super(e), this.query = this.query || {}, a || (a = o.___eio = o.___eio || []), this.index = a.length;
                            const t = this;
                            a.push((function(e) {
                                t.onData(e)
                            })), this.query.j = this.index
                        }
                        get supportsBinary() {
                            return !1
                        }
                        doClose() {
                            this.script && (this.script.onerror = () => {}, this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), super.doClose()
                        }
                        doPoll() {
                            const e = this,
                                t = document.createElement("script");
                            this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function(t) {
                                e.onError("jsonp poll error", t)
                            };
                            const n = document.getElementsByTagName("script")[0];
                            n ? n.parentNode.insertBefore(t, n) : (document.head || document.body).appendChild(t), this.script = t;
                            "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout((function() {
                                const e = document.createElement("iframe");
                                document.body.appendChild(e), document.body.removeChild(e)
                            }), 100)
                        }
                        doWrite(e, t) {
                            const n = this;
                            let r;
                            if (!this.form) {
                                const e = document.createElement("form"),
                                    t = document.createElement("textarea"),
                                    n = this.iframeId = "eio_iframe_" + this.index;
                                e.className = "socketio", e.style.position = "absolute", e.style.top = "-1000px", e.style.left = "-1000px", e.target = n, e.method = "POST", e.setAttribute("accept-charset", "utf-8"), t.name = "d", e.appendChild(t), document.body.appendChild(e), this.form = e, this.area = t
                            }

                            function o() {
                                a(), t()
                            }

                            function a() {
                                if (n.iframe) try {
                                    n.form.removeChild(n.iframe)
                                } catch (e) {
                                    n.onError("jsonp polling iframe removal error", e)
                                }
                                try {
                                    const e = '<iframe src="javascript:0" name="' + n.iframeId + '">';
                                    r = document.createElement(e)
                                } catch (e) {
                                    r = document.createElement("iframe"), r.name = n.iframeId, r.src = "javascript:0"
                                }
                                r.id = n.iframeId, n.form.appendChild(r), n.iframe = r
                            }
                            this.form.action = this.uri(), a(), e = e.replace(i, "\\\n"), this.area.value = e.replace(s, "\\n");
                            try {
                                this.form.submit()
                            } catch (e) {}
                            this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
                                "complete" === n.iframe.readyState && o()
                            } : this.iframe.onload = o
                        }
                    }
                },
                416: (e, t, n) => {
                    const r = n(777),
                        o = n(15),
                        s = n(767),
                        {
                            pick: i
                        } = n(839),
                        a = n(549),
                        c = n(227)("engine.io-client:polling-xhr");

                    function u() {}
                    const l = null != new r({
                        xdomain: !1
                    }).responseType;
                    class p extends s {
                        constructor(e, t) {
                            super(), this.opts = t, this.method = t.method || "GET", this.uri = e, this.async = !1 !== t.async, this.data = void 0 !== t.data ? t.data : null, this.create()
                        }
                        create() {
                            const e = i(this.opts, "agent", "enablesXDR", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized");
                            e.xdomain = !!this.opts.xd, e.xscheme = !!this.opts.xs;
                            const t = this.xhr = new r(e),
                                n = this;
                            try {
                                c("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async);
                                try {
                                    if (this.opts.extraHeaders) {
                                        t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0);
                                        for (let e in this.opts.extraHeaders) this.opts.extraHeaders.hasOwnProperty(e) && t.setRequestHeader(e, this.opts.extraHeaders[e])
                                    }
                                } catch (e) {}
                                if ("POST" === this.method) try {
                                    t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                                } catch (e) {}
                                try {
                                    t.setRequestHeader("Accept", "*/*")
                                } catch (e) {}
                                "withCredentials" in t && (t.withCredentials = this.opts.withCredentials), this.opts.requestTimeout && (t.timeout = this.opts.requestTimeout), this.hasXDR() ? (t.onload = function() {
                                    n.onLoad()
                                }, t.onerror = function() {
                                    n.onError(t.responseText)
                                }) : t.onreadystatechange = function() {
                                    4 === t.readyState && (200 === t.status || 1223 === t.status ? n.onLoad() : setTimeout((function() {
                                        n.onError("number" == typeof t.status ? t.status : 0)
                                    }), 0))
                                }, c("xhr data %s", this.data), t.send(this.data)
                            } catch (e) {
                                return void setTimeout((function() {
                                    n.onError(e)
                                }), 0)
                            }
                            "undefined" != typeof document && (this.index = p.requestsCount++, p.requests[this.index] = this)
                        }
                        onSuccess() {
                            this.emit("success"), this.cleanup()
                        }
                        onData(e) {
                            this.emit("data", e), this.onSuccess()
                        }
                        onError(e) {
                            this.emit("error", e), this.cleanup(!0)
                        }
                        cleanup(e) {
                            if (void 0 !== this.xhr && null !== this.xhr) {
                                if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = u : this.xhr.onreadystatechange = u, e) try {
                                    this.xhr.abort()
                                } catch (e) {}
                                "undefined" != typeof document && delete p.requests[this.index], this.xhr = null
                            }
                        }
                        onLoad() {
                            const e = this.xhr.responseText;
                            null !== e && this.onData(e)
                        }
                        hasXDR() {
                            return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
                        }
                        abort() {
                            this.cleanup()
                        }
                    }
                    if (p.requestsCount = 0, p.requests = {}, "undefined" != typeof document)
                        if ("function" == typeof attachEvent) attachEvent("onunload", h);
                        else if ("function" == typeof addEventListener) {
                        addEventListener("onpagehide" in a ? "pagehide" : "unload", h, !1)
                    }

                    function h() {
                        for (let e in p.requests) p.requests.hasOwnProperty(e) && p.requests[e].abort()
                    }
                    e.exports = class extends o {
                        constructor(e) {
                            if (super(e), "undefined" != typeof location) {
                                const t = "https:" === location.protocol;
                                let n = location.port;
                                n || (n = t ? 443 : 80), this.xd = "undefined" != typeof location && e.hostname !== location.hostname || n !== e.port, this.xs = e.secure !== t
                            }
                            const t = e && e.forceBase64;
                            this.supportsBinary = l && !t
                        }
                        request(e = {}) {
                            return Object.assign(e, {
                                xd: this.xd,
                                xs: this.xs
                            }, this.opts), new p(this.uri(), e)
                        }
                        doWrite(e, t) {
                            const n = this.request({
                                    method: "POST",
                                    data: e
                                }),
                                r = this;
                            n.on("success", t), n.on("error", (function(e) {
                                r.onError("xhr post error", e)
                            }))
                        }
                        doPoll() {
                            c("xhr poll");
                            const e = this.request(),
                                t = this;
                            e.on("data", (function(e) {
                                t.onData(e)
                            })), e.on("error", (function(e) {
                                t.onError("xhr poll error", e)
                            })), this.pollXhr = e
                        }
                    }, e.exports.Request = p
                },
                15: (e, t, n) => {
                    const r = n(496),
                        o = n(830),
                        s = n(743),
                        i = n(281),
                        a = n(227)("engine.io-client:polling");
                    e.exports = class extends r {
                        get name() {
                            return "polling"
                        }
                        doOpen() {
                            this.poll()
                        }
                        pause(e) {
                            const t = this;

                            function n() {
                                a("paused"), t.readyState = "paused", e()
                            }
                            if (this.readyState = "pausing", this.polling || !this.writable) {
                                let e = 0;
                                this.polling && (a("we are currently polling - waiting to pause"), e++, this.once("pollComplete", (function() {
                                    a("pre-pause polling complete"), --e || n()
                                }))), this.writable || (a("we are currently writing - waiting to pause"), e++, this.once("drain", (function() {
                                    a("pre-pause writing complete"), --e || n()
                                })))
                            } else n()
                        }
                        poll() {
                            a("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
                        }
                        onData(e) {
                            const t = this;
                            a("polling got data %s", e);
                            s.decodePayload(e, this.socket.binaryType).forEach((function(e, n, r) {
                                if ("opening" === t.readyState && "open" === e.type && t.onOpen(), "close" === e.type) return t.onClose(), !1;
                                t.onPacket(e)
                            })), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : a('ignoring poll - transport state "%s"', this.readyState))
                        }
                        doClose() {
                            const e = this;

                            function t() {
                                a("writing close packet"), e.write([{
                                    type: "close"
                                }])
                            }
                            "open" === this.readyState ? (a("transport open - closing"), t()) : (a("transport not open - deferring close"), this.once("open", t))
                        }
                        write(e) {
                            this.writable = !1, s.encodePayload(e, (e => {
                                this.doWrite(e, (() => {
                                    this.writable = !0, this.emit("drain")
                                }))
                            }))
                        }
                        uri() {
                            let e = this.query || {};
                            const t = this.opts.secure ? "https" : "http";
                            let n = "";
                            !1 !== this.opts.timestampRequests && (e[this.opts.timestampParam] = i()), this.supportsBinary || e.sid || (e.b64 = 1), e = o.encode(e), this.opts.port && ("https" === t && 443 !== Number(this.opts.port) || "http" === t && 80 !== Number(this.opts.port)) && (n = ":" + this.opts.port), e.length && (e = "?" + e);
                            return t + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + n + this.opts.path + e
                        }
                    }
                },
                866: (e, t, n) => {
                    const r = n(549);
                    e.exports = {
                        WebSocket: r.WebSocket || r.MozWebSocket,
                        usingBrowserWebSocket: !0,
                        defaultBinaryType: "arraybuffer"
                    }
                },
                442: (e, t, n) => {
                    const r = n(496),
                        o = n(743),
                        s = n(830),
                        i = n(281),
                        {
                            pick: a
                        } = n(839),
                        {
                            WebSocket: c,
                            usingBrowserWebSocket: u,
                            defaultBinaryType: l
                        } = n(866),
                        p = n(227)("engine.io-client:websocket"),
                        h = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase();
                    class f extends r {
                        constructor(e) {
                            super(e), this.supportsBinary = !e.forceBase64
                        }
                        get name() {
                            return "websocket"
                        }
                        doOpen() {
                            if (!this.check()) return;
                            const e = this.uri(),
                                t = this.opts.protocols,
                                n = h ? {} : a(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
                            this.opts.extraHeaders && (n.headers = this.opts.extraHeaders);
                            try {
                                this.ws = u && !h ? t ? new c(e, t) : new c(e) : new c(e, t, n)
                            } catch (e) {
                                return this.emit("error", e)
                            }
                            this.ws.binaryType = this.socket.binaryType || l, this.addEventListeners()
                        }
                        addEventListeners() {
                            const e = this;
                            this.ws.onopen = function() {
                                e.onOpen()
                            }, this.ws.onclose = function() {
                                e.onClose()
                            }, this.ws.onmessage = function(t) {
                                e.onData(t.data)
                            }, this.ws.onerror = function(t) {
                                e.onError("websocket error", t)
                            }
                        }
                        write(e) {
                            const t = this;
                            this.writable = !1;
                            let n = e.length,
                                r = 0;
                            const s = n;
                            for (; r < s; r++) ! function(e) {
                                o.encodePacket(e, t.supportsBinary, (function(r) {
                                    const o = {};
                                    if (!u && (e.options && (o.compress = e.options.compress), t.opts.perMessageDeflate)) {
                                        ("string" == typeof r ? Buffer.byteLength(r) : r.length) < t.opts.perMessageDeflate.threshold && (o.compress = !1)
                                    }
                                    try {
                                        u ? t.ws.send(r) : t.ws.send(r, o)
                                    } catch (e) {
                                        p("websocket closed before onclose event")
                                    }--n || i()
                                }))
                            }(e[r]);

                            function i() {
                                t.emit("flush"), setTimeout((function() {
                                    t.writable = !0, t.emit("drain")
                                }), 0)
                            }
                        }
                        onClose() {
                            r.prototype.onClose.call(this)
                        }
                        doClose() {
                            void 0 !== this.ws && (this.ws.close(), this.ws = null)
                        }
                        uri() {
                            let e = this.query || {};
                            const t = this.opts.secure ? "wss" : "ws";
                            let n = "";
                            this.opts.port && ("wss" === t && 443 !== Number(this.opts.port) || "ws" === t && 80 !== Number(this.opts.port)) && (n = ":" + this.opts.port), this.opts.timestampRequests && (e[this.opts.timestampParam] = i()), this.supportsBinary || (e.b64 = 1), e = s.encode(e), e.length && (e = "?" + e);
                            return t + "://" + (-1 !== this.opts.hostname.indexOf(":") ? "[" + this.opts.hostname + "]" : this.opts.hostname) + n + this.opts.path + e
                        }
                        check() {
                            return !(!c || "__initialize" in c && this.name === f.prototype.name)
                        }
                    }
                    e.exports = f
                },
                839: e => {
                    e.exports.pick = (e, ...t) => t.reduce(((t, n) => (e.hasOwnProperty(n) && (t[n] = e[n]), t)), {})
                },
                777: (e, t, n) => {
                    const r = n(58),
                        o = n(549);
                    e.exports = function(e) {
                        const t = e.xdomain,
                            n = e.xscheme,
                            s = e.enablesXDR;
                        try {
                            if ("undefined" != typeof XMLHttpRequest && (!t || r)) return new XMLHttpRequest
                        } catch (e) {}
                        try {
                            if ("undefined" != typeof XDomainRequest && !n && s) return new XDomainRequest
                        } catch (e) {}
                        if (!t) try {
                            return new(o[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
                        } catch (e) {}
                    }
                },
                712: e => {
                    const t = Object.create(null);
                    t.open = "0", t.close = "1", t.ping = "2", t.pong = "3", t.message = "4", t.upgrade = "5", t.noop = "6";
                    const n = Object.create(null);
                    Object.keys(t).forEach((e => {
                        n[t[e]] = e
                    }));
                    e.exports = {
                        PACKET_TYPES: t,
                        PACKET_TYPES_REVERSE: n,
                        ERROR_PACKET: {
                            type: "error",
                            data: "parser error"
                        }
                    }
                },
                965: (e, t, n) => {
                    const {
                        PACKET_TYPES_REVERSE: r,
                        ERROR_PACKET: o
                    } = n(712);
                    let s;
                    "function" == typeof ArrayBuffer && (s = n(704));
                    const i = (e, t) => {
                            if (s) {
                                const n = s.decode(e);
                                return a(n, t)
                            }
                            return {
                                base64: !0,
                                data: e
                            }
                        },
                        a = (e, t) => {
                            switch (t) {
                                case "blob":
                                    return e instanceof ArrayBuffer ? new Blob([e]) : e;
                                case "arraybuffer":
                                default:
                                    return e
                            }
                        };
                    e.exports = (e, t) => {
                        if ("string" != typeof e) return {
                            type: "message",
                            data: a(e, t)
                        };
                        const n = e.charAt(0);
                        if ("b" === n) return {
                            type: "message",
                            data: i(e.substring(1), t)
                        };
                        return r[n] ? e.length > 1 ? {
                            type: r[n],
                            data: e.substring(1)
                        } : {
                            type: r[n]
                        } : o
                    }
                },
                929: (e, t, n) => {
                    const {
                        PACKET_TYPES: r
                    } = n(712), o = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === Object.prototype.toString.call(Blob), s = "function" == typeof ArrayBuffer, i = (e, t) => {
                        const n = new FileReader;
                        return n.onload = function() {
                            const e = n.result.split(",")[1];
                            t("b" + e)
                        }, n.readAsDataURL(e)
                    };
                    e.exports = ({
                        type: e,
                        data: t
                    }, n, a) => {
                        return o && t instanceof Blob ? n ? a(t) : i(t, a) : s && (t instanceof ArrayBuffer || (c = t, "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(c) : c && c.buffer instanceof ArrayBuffer)) ? n ? a(t instanceof ArrayBuffer ? t : t.buffer) : i(new Blob([t]), a) : a(r[e] + (t || ""));
                        var c
                    }
                },
                743: (e, t, n) => {
                    const r = n(929),
                        o = n(965),
                        s = String.fromCharCode(30);
                    e.exports = {
                        protocol: 4,
                        encodePacket: r,
                        encodePayload: (e, t) => {
                            const n = e.length,
                                o = new Array(n);
                            let i = 0;
                            e.forEach(((e, a) => {
                                r(e, !1, (e => {
                                    o[a] = e, ++i === n && t(o.join(s))
                                }))
                            }))
                        },
                        decodePacket: o,
                        decodePayload: (e, t) => {
                            const n = e.split(s),
                                r = [];
                            for (let e = 0; e < n.length; e++) {
                                const s = o(n[e], t);
                                if (r.push(s), "error" === s.type) break
                            }
                            return r
                        }
                    }
                },
                58: e => {
                    try {
                        e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
                    } catch (t) {
                        e.exports = !1
                    }
                },
                824: e => {
                    var t = 1e3,
                        n = 60 * t,
                        r = 60 * n,
                        o = 24 * r,
                        s = 7 * o,
                        i = 365.25 * o;

                    function a(e, t, n, r) {
                        var o = t >= 1.5 * n;
                        return Math.round(e / n) + " " + r + (o ? "s" : "")
                    }
                    e.exports = function(e, c) {
                        c = c || {};
                        var u = typeof e;
                        if ("string" === u && e.length > 0) return function(e) {
                            if ((e = String(e)).length > 100) return;
                            var a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
                            if (!a) return;
                            var c = parseFloat(a[1]);
                            switch ((a[2] || "ms").toLowerCase()) {
                                case "years":
                                case "year":
                                case "yrs":
                                case "yr":
                                case "y":
                                    return c * i;
                                case "weeks":
                                case "week":
                                case "w":
                                    return c * s;
                                case "days":
                                case "day":
                                case "d":
                                    return c * o;
                                case "hours":
                                case "hour":
                                case "hrs":
                                case "hr":
                                case "h":
                                    return c * r;
                                case "minutes":
                                case "minute":
                                case "mins":
                                case "min":
                                case "m":
                                    return c * n;
                                case "seconds":
                                case "second":
                                case "secs":
                                case "sec":
                                case "s":
                                    return c * t;
                                case "milliseconds":
                                case "millisecond":
                                case "msecs":
                                case "msec":
                                case "ms":
                                    return c;
                                default:
                                    return
                            }
                        }(e);
                        if ("number" === u && isFinite(e)) return c.long ? function(e) {
                            var s = Math.abs(e);
                            if (s >= o) return a(e, s, o, "day");
                            if (s >= r) return a(e, s, r, "hour");
                            if (s >= n) return a(e, s, n, "minute");
                            if (s >= t) return a(e, s, t, "second");
                            return e + " ms"
                        }(e) : function(e) {
                            var s = Math.abs(e);
                            if (s >= o) return Math.round(e / o) + "d";
                            if (s >= r) return Math.round(e / r) + "h";
                            if (s >= n) return Math.round(e / n) + "m";
                            if (s >= t) return Math.round(e / t) + "s";
                            return e + "ms"
                        }(e);
                        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
                    }
                },
                830: (e, t) => {
                    t.encode = function(e) {
                        var t = "";
                        for (var n in e) e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
                        return t
                    }, t.decode = function(e) {
                        for (var t = {}, n = e.split("&"), r = 0, o = n.length; r < o; r++) {
                            var s = n[r].split("=");
                            t[decodeURIComponent(s[0])] = decodeURIComponent(s[1])
                        }
                        return t
                    }
                },
                187: e => {
                    var t = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                        n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                    e.exports = function(e) {
                        var r = e,
                            o = e.indexOf("["),
                            s = e.indexOf("]"); - 1 != o && -1 != s && (e = e.substring(0, o) + e.substring(o, s).replace(/:/g, ";") + e.substring(s, e.length));
                        for (var i, a, c = t.exec(e || ""), u = {}, l = 14; l--;) u[n[l]] = c[l] || "";
                        return -1 != o && -1 != s && (u.source = r, u.host = u.host.substring(1, u.host.length - 1).replace(/;/g, ":"), u.authority = u.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), u.ipv6uri = !0), u.pathNames = function(e, t) {
                            var n = /\/{2,9}/g,
                                r = t.replace(n, "/").split("/");
                            "/" != t.substr(0, 1) && 0 !== t.length || r.splice(0, 1);
                            "/" == t.substr(t.length - 1, 1) && r.splice(r.length - 1, 1);
                            return r
                        }(0, u.path), u.queryKey = (i = u.query, a = {}, i.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, (function(e, t, n) {
                            t && (a[t] = n)
                        })), a), u
                    }
                },
                751: (e, t, n) => {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.Socket = t.io = t.Manager = t.protocol = void 0;
                    const r = n(744),
                        o = n(703),
                        s = n(277);
                    Object.defineProperty(t, "Socket", {
                        enumerable: !0,
                        get: function() {
                            return s.Socket
                        }
                    });
                    const i = n(227)("socket.io-client");
                    e.exports = t = c;
                    const a = t.managers = {};

                    function c(e, t) {
                        "object" == typeof e && (t = e, e = void 0), t = t || {};
                        const n = r.url(e, t.path),
                            s = n.source,
                            c = n.id,
                            u = n.path,
                            l = a[c] && u in a[c].nsps;
                        let p;
                        return t.forceNew || t["force new connection"] || !1 === t.multiplex || l ? (i("ignoring socket cache for %s", s), p = new o.Manager(s, t)) : (a[c] || (i("new io instance for %s", s), a[c] = new o.Manager(s, t)), p = a[c]), n.query && !t.query && (t.query = n.queryKey), p.socket(n.path, t)
                    }
                    t.io = c;
                    var u = n(485);
                    Object.defineProperty(t, "protocol", {
                        enumerable: !0,
                        get: function() {
                            return u.protocol
                        }
                    }), t.connect = c;
                    var l = n(703);
                    Object.defineProperty(t, "Manager", {
                        enumerable: !0,
                        get: function() {
                            return l.Manager
                        }
                    })
                },
                703: (e, t, n) => {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.Manager = void 0;
                    const r = n(983),
                        o = n(277),
                        s = n(767),
                        i = n(485),
                        a = n(657),
                        c = n(10),
                        u = n(227)("socket.io-client:manager");
                    t.Manager = class extends s {
                        constructor(e, t) {
                            super(), this.nsps = {}, this.subs = [], e && "object" == typeof e && (t = e, e = void 0), (t = t || {}).path = t.path || "/socket.io", this.opts = t, this.reconnection(!1 !== t.reconnection), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), this.backoff = new c({
                                min: this.reconnectionDelay(),
                                max: this.reconnectionDelayMax(),
                                jitter: this.randomizationFactor()
                            }), this.timeout(null == t.timeout ? 2e4 : t.timeout), this._readyState = "closed", this.uri = e;
                            const n = t.parser || i;
                            this.encoder = new n.Encoder, this.decoder = new n.Decoder, this._autoConnect = !1 !== t.autoConnect, this._autoConnect && this.open()
                        }
                        reconnection(e) {
                            return arguments.length ? (this._reconnection = !!e, this) : this._reconnection
                        }
                        reconnectionAttempts(e) {
                            return void 0 === e ? this._reconnectionAttempts : (this._reconnectionAttempts = e, this)
                        }
                        reconnectionDelay(e) {
                            var t;
                            return void 0 === e ? this._reconnectionDelay : (this._reconnectionDelay = e, null === (t = this.backoff) || void 0 === t || t.setMin(e), this)
                        }
                        randomizationFactor(e) {
                            var t;
                            return void 0 === e ? this._randomizationFactor : (this._randomizationFactor = e, null === (t = this.backoff) || void 0 === t || t.setJitter(e), this)
                        }
                        reconnectionDelayMax(e) {
                            var t;
                            return void 0 === e ? this._reconnectionDelayMax : (this._reconnectionDelayMax = e, null === (t = this.backoff) || void 0 === t || t.setMax(e), this)
                        }
                        timeout(e) {
                            return arguments.length ? (this._timeout = e, this) : this._timeout
                        }
                        maybeReconnectOnOpen() {
                            !this._reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
                        }
                        open(e) {
                            if (u("readyState %s", this._readyState), ~this._readyState.indexOf("open")) return this;
                            u("opening %s", this.uri), this.engine = r(this.uri, this.opts);
                            const t = this.engine,
                                n = this;
                            this._readyState = "opening", this.skipReconnect = !1;
                            const o = a.on(t, "open", (function() {
                                    n.onopen(), e && e()
                                })),
                                s = a.on(t, "error", (t => {
                                    u("error"), n.cleanup(), n._readyState = "closed", super.emit("error", t), e ? e(t) : n.maybeReconnectOnOpen()
                                }));
                            if (!1 !== this._timeout) {
                                const e = this._timeout;
                                u("connect attempt will timeout after %d", e), 0 === e && o();
                                const n = setTimeout((() => {
                                    u("connect attempt timed out after %d", e), o(), t.close(), t.emit("error", new Error("timeout"))
                                }), e);
                                this.subs.push((function() {
                                    clearTimeout(n)
                                }))
                            }
                            return this.subs.push(o), this.subs.push(s), this
                        }
                        connect(e) {
                            return this.open(e)
                        }
                        onopen() {
                            u("open"), this.cleanup(), this._readyState = "open", super.emit("open");
                            const e = this.engine;
                            this.subs.push(a.on(e, "ping", this.onping.bind(this)), a.on(e, "data", this.ondata.bind(this)), a.on(e, "error", this.onerror.bind(this)), a.on(e, "close", this.onclose.bind(this)), a.on(this.decoder, "decoded", this.ondecoded.bind(this)))
                        }
                        onping() {
                            super.emit("ping")
                        }
                        ondata(e) {
                            this.decoder.add(e)
                        }
                        ondecoded(e) {
                            super.emit("packet", e)
                        }
                        onerror(e) {
                            u("error", e), super.emit("error", e)
                        }
                        socket(e, t) {
                            let n = this.nsps[e];
                            return n || (n = new o.Socket(this, e, t), this.nsps[e] = n), n
                        }
                        _destroy(e) {
                            const t = Object.keys(this.nsps);
                            for (const e of t) {
                                if (this.nsps[e].active) return void u("socket %s is still active, skipping close", e)
                            }
                            this._close()
                        }
                        _packet(e) {
                            u("writing packet %j", e);
                            const t = this.encoder.encode(e);
                            for (let n = 0; n < t.length; n++) this.engine.write(t[n], e.options)
                        }
                        cleanup() {
                            u("cleanup"), this.subs.forEach((e => e())), this.subs.length = 0, this.decoder.destroy()
                        }
                        _close() {
                            u("disconnect"), this.skipReconnect = !0, this._reconnecting = !1, "opening" === this._readyState && this.cleanup(), this.backoff.reset(), this._readyState = "closed", this.engine && this.engine.close()
                        }
                        disconnect() {
                            return this._close()
                        }
                        onclose(e) {
                            u("onclose"), this.cleanup(), this.backoff.reset(), this._readyState = "closed", super.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect()
                        }
                        reconnect() {
                            if (this._reconnecting || this.skipReconnect) return this;
                            const e = this;
                            if (this.backoff.attempts >= this._reconnectionAttempts) u("reconnect failed"), this.backoff.reset(), super.emit("reconnect_failed"), this._reconnecting = !1;
                            else {
                                const t = this.backoff.duration();
                                u("will wait %dms before reconnect attempt", t), this._reconnecting = !0;
                                const n = setTimeout((() => {
                                    e.skipReconnect || (u("attempting reconnect"), super.emit("reconnect_attempt", e.backoff.attempts), e.skipReconnect || e.open((t => {
                                        t ? (u("reconnect attempt error"), e._reconnecting = !1, e.reconnect(), super.emit("reconnect_error", t)) : (u("reconnect success"), e.onreconnect())
                                    })))
                                }), t);
                                this.subs.push((function() {
                                    clearTimeout(n)
                                }))
                            }
                        }
                        onreconnect() {
                            const e = this.backoff.attempts;
                            this._reconnecting = !1, this.backoff.reset(), super.emit("reconnect", e)
                        }
                    }
                },
                657: (e, t) => {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.on = void 0, t.on = function(e, t, n) {
                        return e.on(t, n),
                            function() {
                                e.off(t, n)
                            }
                    }
                },
                277: (e, t, n) => {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.Socket = void 0;
                    const r = n(485),
                        o = n(767),
                        s = n(657),
                        i = n(227)("socket.io-client:socket"),
                        a = Object.freeze({
                            connect: 1,
                            connect_error: 1,
                            disconnect: 1,
                            disconnecting: 1,
                            newListener: 1,
                            removeListener: 1
                        });
                    t.Socket = class extends o {
                        constructor(e, t, n) {
                            super(), this.receiveBuffer = [], this.sendBuffer = [], this.ids = 0, this.acks = {}, this.flags = {}, this.io = e, this.nsp = t, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, n && n.auth && (this.auth = n.auth), this.io._autoConnect && this.open()
                        }
                        subEvents() {
                            if (this.subs) return;
                            const e = this.io;
                            this.subs = [s.on(e, "open", this.onopen.bind(this)), s.on(e, "packet", this.onpacket.bind(this)), s.on(e, "error", this.onerror.bind(this)), s.on(e, "close", this.onclose.bind(this))]
                        }
                        get active() {
                            return !!this.subs
                        }
                        connect() {
                            return this.connected || (this.subEvents(), this.io._reconnecting || this.io.open(), "open" === this.io._readyState && this.onopen()), this
                        }
                        open() {
                            return this.connect()
                        }
                        send(...e) {
                            return e.unshift("message"), this.emit.apply(this, e), this
                        }
                        emit(e, ...t) {
                            if (a.hasOwnProperty(e)) throw new Error('"' + e + '" is a reserved event name');
                            t.unshift(e);
                            const n = {
                                type: r.PacketType.EVENT,
                                data: t,
                                options: {}
                            };
                            n.options.compress = !1 !== this.flags.compress, "function" == typeof t[t.length - 1] && (i("emitting packet with ack id %d", this.ids), this.acks[this.ids] = t.pop(), n.id = this.ids++);
                            const o = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
                            return this.flags.volatile && (!o || !this.connected) ? i("discard packet as the transport is not currently writable") : this.connected ? this.packet(n) : this.sendBuffer.push(n), this.flags = {}, this
                        }
                        packet(e) {
                            e.nsp = this.nsp, this.io._packet(e)
                        }
                        onopen() {
                            i("transport is open - connecting"), "function" == typeof this.auth ? this.auth((e => {
                                this.packet({
                                    type: r.PacketType.CONNECT,
                                    data: e
                                })
                            })) : this.packet({
                                type: r.PacketType.CONNECT,
                                data: this.auth
                            })
                        }
                        onerror(e) {
                            this.connected || super.emit("connect_error", e)
                        }
                        onclose(e) {
                            i("close (%s)", e), this.connected = !1, this.disconnected = !0, delete this.id, super.emit("disconnect", e)
                        }
                        onpacket(e) {
                            if (e.nsp === this.nsp) switch (e.type) {
                                case r.PacketType.CONNECT:
                                    if (e.data && e.data.sid) {
                                        const t = e.data.sid;
                                        this.onconnect(t)
                                    } else super.emit("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                                    break;
                                case r.PacketType.EVENT:
                                case r.PacketType.BINARY_EVENT:
                                    this.onevent(e);
                                    break;
                                case r.PacketType.ACK:
                                case r.PacketType.BINARY_ACK:
                                    this.onack(e);
                                    break;
                                case r.PacketType.DISCONNECT:
                                    this.ondisconnect();
                                    break;
                                case r.PacketType.CONNECT_ERROR:
                                    const t = new Error(e.data.message);
                                    t.data = e.data.data, super.emit("connect_error", t)
                            }
                        }
                        onevent(e) {
                            const t = e.data || [];
                            i("emitting event %j", t), null != e.id && (i("attaching ack callback to event"), t.push(this.ack(e.id))), this.connected ? this.emitEvent(t) : this.receiveBuffer.push(Object.freeze(t))
                        }
                        emitEvent(e) {
                            if (this._anyListeners && this._anyListeners.length) {
                                const t = this._anyListeners.slice();
                                for (const n of t) n.apply(this, e)
                            }
                            super.emit.apply(this, e)
                        }
                        ack(e) {
                            const t = this;
                            let n = !1;
                            return function(...o) {
                                n || (n = !0, i("sending ack %j", o), t.packet({
                                    type: r.PacketType.ACK,
                                    id: e,
                                    data: o
                                }))
                            }
                        }
                        onack(e) {
                            const t = this.acks[e.id];
                            "function" == typeof t ? (i("calling ack %s with %j", e.id, e.data), t.apply(this, e.data), delete this.acks[e.id]) : i("bad ack %s", e.id)
                        }
                        onconnect(e) {
                            i("socket connected with id %s", e), this.id = e, this.connected = !0, this.disconnected = !1, super.emit("connect"), this.emitBuffered()
                        }
                        emitBuffered() {
                            this.receiveBuffer.forEach((e => this.emitEvent(e))), this.receiveBuffer = [], this.sendBuffer.forEach((e => this.packet(e))), this.sendBuffer = []
                        }
                        ondisconnect() {
                            i("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
                        }
                        destroy() {
                            this.subs && (this.subs.forEach((e => e())), this.subs = void 0), this.io._destroy(this)
                        }
                        disconnect() {
                            return this.connected && (i("performing disconnect (%s)", this.nsp), this.packet({
                                type: r.PacketType.DISCONNECT
                            })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
                        }
                        close() {
                            return this.disconnect()
                        }
                        compress(e) {
                            return this.flags.compress = e, this
                        }
                        get volatile() {
                            return this.flags.volatile = !0, this
                        }
                        onAny(e) {
                            return this._anyListeners = this._anyListeners || [], this._anyListeners.push(e), this
                        }
                        prependAny(e) {
                            return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(e), this
                        }
                        offAny(e) {
                            if (!this._anyListeners) return this;
                            if (e) {
                                const t = this._anyListeners;
                                for (let n = 0; n < t.length; n++)
                                    if (e === t[n]) return t.splice(n, 1), this
                            } else this._anyListeners = [];
                            return this
                        }
                        listenersAny() {
                            return this._anyListeners || []
                        }
                    }
                },
                744: (e, t, n) => {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.url = void 0;
                    const r = n(187),
                        o = n(227)("socket.io-client:url");
                    t.url = function(e, t = "", n) {
                        let s = e;
                        n = n || "undefined" != typeof location && location, null == e && (e = n.protocol + "//" + n.host), "string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? n.protocol + e : n.host + e), /^(https?|wss?):\/\//.test(e) || (o("protocol-less url %s", e), e = void 0 !== n ? n.protocol + "//" + e : "https://" + e), o("parse %s", e), s = r(e)), s.port || (/^(http|ws)$/.test(s.protocol) ? s.port = "80" : /^(http|ws)s$/.test(s.protocol) && (s.port = "443")), s.path = s.path || "/";
                        const i = -1 !== s.host.indexOf(":") ? "[" + s.host + "]" : s.host;
                        return s.id = s.protocol + "://" + i + ":" + s.port + t, s.href = s.protocol + "://" + i + (n && n.port === s.port ? "" : ":" + s.port), s
                    }
                },
                719: (e, t, n) => {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.reconstructPacket = t.deconstructPacket = void 0;
                    const r = n(986);

                    function o(e, t) {
                        if (!e) return e;
                        if (r.isBinary(e)) {
                            const n = {
                                _placeholder: !0,
                                num: t.length
                            };
                            return t.push(e), n
                        }
                        if (Array.isArray(e)) {
                            const n = new Array(e.length);
                            for (let r = 0; r < e.length; r++) n[r] = o(e[r], t);
                            return n
                        }
                        if ("object" == typeof e && !(e instanceof Date)) {
                            const n = {};
                            for (const r in e) e.hasOwnProperty(r) && (n[r] = o(e[r], t));
                            return n
                        }
                        return e
                    }

                    function s(e, t) {
                        if (!e) return e;
                        if (e && e._placeholder) return t[e.num];
                        if (Array.isArray(e))
                            for (let n = 0; n < e.length; n++) e[n] = s(e[n], t);
                        else if ("object" == typeof e)
                            for (const n in e) e.hasOwnProperty(n) && (e[n] = s(e[n], t));
                        return e
                    }
                    t.deconstructPacket = function(e) {
                        const t = [],
                            n = e.data,
                            r = e;
                        return r.data = o(n, t), r.attachments = t.length, {
                            packet: r,
                            buffers: t
                        }
                    }, t.reconstructPacket = function(e, t) {
                        return e.data = s(e.data, t), e.attachments = void 0, e
                    }
                },
                485: (e, t, n) => {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.Decoder = t.Encoder = t.PacketType = t.protocol = void 0;
                    const r = n(767),
                        o = n(719),
                        s = n(986),
                        i = n(227)("socket.io-parser");
                    var a;
                    t.protocol = 5,
                        function(e) {
                            e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK"
                        }(a = t.PacketType || (t.PacketType = {}));
                    t.Encoder = class {
                        encode(e) {
                            return i("encoding packet %j", e), e.type !== a.EVENT && e.type !== a.ACK || !s.hasBinary(e) ? [this.encodeAsString(e)] : (e.type = e.type === a.EVENT ? a.BINARY_EVENT : a.BINARY_ACK, this.encodeAsBinary(e))
                        }
                        encodeAsString(e) {
                            let t = "" + e.type;
                            return e.type !== a.BINARY_EVENT && e.type !== a.BINARY_ACK || (t += e.attachments + "-"), e.nsp && "/" !== e.nsp && (t += e.nsp + ","), null != e.id && (t += e.id), null != e.data && (t += JSON.stringify(e.data)), i("encoded %j as %s", e, t), t
                        }
                        encodeAsBinary(e) {
                            const t = o.deconstructPacket(e),
                                n = this.encodeAsString(t.packet),
                                r = t.buffers;
                            return r.unshift(n), r
                        }
                    };
                    class c extends r {
                        constructor() {
                            super()
                        }
                        add(e) {
                            let t;
                            if ("string" == typeof e) t = this.decodeString(e), t.type === a.BINARY_EVENT || t.type === a.BINARY_ACK ? (this.reconstructor = new u(t), 0 === t.attachments && super.emit("decoded", t)) : super.emit("decoded", t);
                            else {
                                if (!s.isBinary(e) && !e.base64) throw new Error("Unknown type: " + e);
                                if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                                t = this.reconstructor.takeBinaryData(e), t && (this.reconstructor = null, super.emit("decoded", t))
                            }
                        }
                        decodeString(e) {
                            let t = 0;
                            const n = {
                                type: Number(e.charAt(0))
                            };
                            if (void 0 === a[n.type]) throw new Error("unknown packet type " + n.type);
                            if (n.type === a.BINARY_EVENT || n.type === a.BINARY_ACK) {
                                const r = t + 1;
                                for (;
                                    "-" !== e.charAt(++t) && t != e.length;);
                                const o = e.substring(r, t);
                                if (o != Number(o) || "-" !== e.charAt(t)) throw new Error("Illegal attachments");
                                n.attachments = Number(o)
                            }
                            if ("/" === e.charAt(t + 1)) {
                                const r = t + 1;
                                for (; ++t;) {
                                    if ("," === e.charAt(t)) break;
                                    if (t === e.length) break
                                }
                                n.nsp = e.substring(r, t)
                            } else n.nsp = "/";
                            const r = e.charAt(t + 1);
                            if ("" !== r && Number(r) == r) {
                                const r = t + 1;
                                for (; ++t;) {
                                    const n = e.charAt(t);
                                    if (null == n || Number(n) != n) {
                                        --t;
                                        break
                                    }
                                    if (t === e.length) break
                                }
                                n.id = Number(e.substring(r, t + 1))
                            }
                            if (e.charAt(++t)) {
                                const r = function(e) {
                                    try {
                                        return JSON.parse(e)
                                    } catch (e) {
                                        return !1
                                    }
                                }(e.substr(t));
                                if (!c.isPayloadValid(n.type, r)) throw new Error("invalid payload");
                                n.data = r
                            }
                            return i("decoded %s as %j", e, n), n
                        }
                        static isPayloadValid(e, t) {
                            switch (e) {
                                case a.CONNECT:
                                    return "object" == typeof t;
                                case a.DISCONNECT:
                                    return void 0 === t;
                                case a.CONNECT_ERROR:
                                    return "string" == typeof t || "object" == typeof t;
                                case a.EVENT:
                                case a.BINARY_EVENT:
                                    return Array.isArray(t) && t.length > 0;
                                case a.ACK:
                                case a.BINARY_ACK:
                                    return Array.isArray(t)
                            }
                        }
                        destroy() {
                            this.reconstructor && this.reconstructor.finishedReconstruction()
                        }
                    }
                    t.Decoder = c;
                    class u {
                        constructor(e) {
                            this.packet = e, this.buffers = [], this.reconPack = e
                        }
                        takeBinaryData(e) {
                            if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
                                const e = o.reconstructPacket(this.reconPack, this.buffers);
                                return this.finishedReconstruction(), e
                            }
                            return null
                        }
                        finishedReconstruction() {
                            this.reconPack = null, this.buffers = []
                        }
                    }
                },
                986: (e, t) => {
                    "use strict";
                    Object.defineProperty(t, "__esModule", {
                        value: !0
                    }), t.hasBinary = t.isBinary = void 0;
                    const n = "function" == typeof ArrayBuffer,
                        r = Object.prototype.toString,
                        o = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === r.call(Blob),
                        s = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === r.call(File);

                    function i(e) {
                        return n && (e instanceof ArrayBuffer || (e => "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer)(e)) || o && e instanceof Blob || s && e instanceof File
                    }
                    t.isBinary = i, t.hasBinary = function e(t, n) {
                        if (!t || "object" != typeof t) return !1;
                        if (Array.isArray(t)) {
                            for (let n = 0, r = t.length; n < r; n++)
                                if (e(t[n])) return !0;
                            return !1
                        }
                        if (i(t)) return !0;
                        if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length) return e(t.toJSON(), !0);
                        for (const n in t)
                            if (Object.prototype.hasOwnProperty.call(t, n) && e(t[n])) return !0;
                        return !1
                    }
                },
                281: e => {
                    "use strict";
                    var t, n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),
                        r = {},
                        o = 0,
                        s = 0;

                    function i(e) {
                        var t = "";
                        do {
                            t = n[e % 64] + t, e = Math.floor(e / 64)
                        } while (e > 0);
                        return t
                    }

                    function a() {
                        var e = i(+new Date);
                        return e !== t ? (o = 0, t = e) : e + "." + i(o++)
                    }
                    for (; s < 64; s++) r[n[s]] = s;
                    a.encode = i, a.decode = function(e) {
                        var t = 0;
                        for (s = 0; s < e.length; s++) t = 64 * t + r[e.charAt(s)];
                        return t
                    }, e.exports = a
                }
            },
            __webpack_module_cache__ = {};

        function __webpack_require__(e) {
            if (__webpack_module_cache__[e]) return __webpack_module_cache__[e].exports;
            var t = __webpack_module_cache__[e] = {
                exports: {}
            };
            return __webpack_modules__[e](t, t.exports, __webpack_require__), t.exports
        }
        __webpack_require__.d = (e, t) => {
            for (var n in t) __webpack_require__.o(t, n) && !__webpack_require__.o(e, n) && Object.defineProperty(e, n, {
                enumerable: !0,
                get: t[n]
            })
        }, __webpack_require__.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), __webpack_require__.r = e => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        };
        var __webpack_exports__ = __webpack_require__(568);
        return __webpack_exports__
    })()
}));