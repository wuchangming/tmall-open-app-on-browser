window.SB = window.SB || {};
window.SB.sbApiConfig = {};

debugger;
console.log(111111);
window.SB.sbApiConfig.callbacks = [];
window.SB.sbApiConfig.objects = [];
window.SB.getAPIData = function(e, t) {
    var i = KISSY;
    window.SB.sbApiConfig = window.SB.sbApiConfig || {};
    window.SB.sbApiConfig.objects.push(e);
    window.SB.sbApiConfig.callbacks.push(t);
    if (window.SB.sbApiConfig.sent) {
        if (window.SB.sbApiConfig.data) {
            var a = window.SB.sbApiConfig.data;
            var r = window.SB.sbApiConfig.objects;
            i.each(window.SB.sbApiConfig.callbacks, function(e, t) {
                if (i.isFunction(e)) {
                    e(r[t], a)
                }
            });
            window.SB.sbApiConfig.callbacks = [];
            window.SB.sbApiConfig.objects = []
        }
    } else {
        window.SB.sbApiConfig.sent = true;
        i.IO({
            url: "//equity-vip.tmall.com/liuliangbao/track.do",
            type: "GET",
            dataType: "jsonp",
            jsonpCallback: "_sbCallback",
            scriptCharset: "utf-8",
            success: function(e) {
                window.SB.sbApiConfig.data = e;
                var t = window.SB.sbApiConfig.objects;
                i.each(window.SB.sbApiConfig.callbacks, function(a, r) {
                    if (i.isFunction(a)) {
                        a(t[r], e)
                    }
                });
                window.SB.sbApiConfig.callbacks = [];
                window.SB.sbApiConfig.objects = []
            },
            timeout: 10
        })
    }
};
KISSY.add("mui/smartbanner/index", function(e, t, i, a, r) {
    var o = window;
    var n = {};
    var l = o.document;
    var s = l.cookie.match(/(?:^|\s)cna=([^;]+)(?:;|$)/);
    if (s) {
        s = s[1]
    }

    function u() {
        var e = {};
        var t = location.search.slice(1).split("&");
        if (t.length) {
            for (var i = 0; i < t.length; i++) {
                if (t[i] && t[i].indexOf("=") != -1) {
                    var a = t[i].split("=");
                    e[a[0]] = a[1]
                }
            }
        }
        return e
    }

    function p(e) {
        var t = l.createElement("img");
        t.style.cssText = "display:none";
        t.src = e;
        l.body.appendChild(t)
    }

    function c(e) {
        e = e || {};
        var t = e.apuri || e.ap_uri;
        var i = e.string || "";
        if (!i) return;
        var a = {};
        a["logtype"] = 2;
        !!t && (a["apuri"] = t + (e.page ? "_" + e.page : ""));
        !!e.scene && (a["scene"] = e.scene);
        !!e.mmstat && (a["mmstat"] = e.mmstat);
        a["ui"] = e.UIType ? e.UIType : "";
        a["cache"] = parseInt((Math.random() + 1) * Date.now());
        var r = [];
        for (var o in a) {
            r.push(o + "=" + encodeURIComponent(a[o]))
        }
        p("//wgo.mmstat.com/" + i + "?" + r.join("&"))
    }

    function d() {
        var e = u();
        var t = e["ttid"];
        var i = /[^@]+\@taobao\_(iphone|android|apad|ipad)\_[\d.]+/i;
        t = t ? decodeURIComponent(t) : "";
        return i.test(t)
    }

    function f() {
        var e = u();
        var t = e["ttid"];
        var i = /.*@travel.*/i;
        t = t ? decodeURIComponent(t) : "";
        return i.test(t)
    }

    function m() {
        return !!o.navigator.userAgent.match(/WindVane/)
    }

    function b() {
        return !!o.navigator.userAgent.match(/T-UA=/)
    }

    function g() {
        return !!o.navigator.userAgent.match(/AlipayClient/i)
    }
    var A = l.createElement("frame");
    var h = function(e) {
        var t = this,
            i = navigator.standalone,
            a = navigator.userAgent;
        if (a.match(/iPhone|iPod|iPad/i) != null) {
            this.platform = "ios";
            this.isIpad = a.match(/iPad/i) != null
        } else if (a.match(/Android/i) != null) {
            if (a.match(/Mobile/i) != null) {
                this.platform = "android";
                this.isChrome = a.match(/Chrome/i) != null && a.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null
            }
        } else if (a.match(/Linux/i) != null) {
            this.platform = "android"
        }
        if (!this.platform || i) {
            this.invaliable = true;
            return null
        }
        if (this.init(e)) {
            this.create();
            window.onblur = function() {
                clearTimeout(t.timeload);
                t.autoAplus && clearTimeout(t.autoAplus);
                t.timeload = null
            };
            document.addEventListener("visibilitychange", function() {
                if (document.hidden) {
                    clearTimeout(t.timeload);
                    t.autoAplus && clearTimeout(t.autoAplus);
                    t.timeload = null
                }
            })
        }
        return this
    };
    h.prototype = {
        constructor: h,
        init: function(e) {
            var t = this.options = e;
            e.version || (e.version = "v1");
            this.cover = t.cover || false;
            this.isDownload = t.download || false;
            this.timeout = t.timeout || 1500;
            var i = t.from || "h5";
            var a = t.crossplat || false;
            if (this.platform == "ios" && !a) {
                this.bannerUrl = t.appstoreUrl || (this.isIpad ? "https://itunes.apple.com/app/id593828513" : "//itunes.apple.com/cn/app/id518966501?mt=8")
            } else {
                this.bannerUrl = "http://m.laiwang.com/market/laiwang/tmall/app-download.php?src=" + (t.downloadSrc ? t.downloadSrc : "wapicon")
            }
            if (t.href) {
                var r = t.href;
                var o = u();
                var n = l.getElementById("buried");
                var s = o["ttid"] || n && n.value;
                var p = o["refid"];
                if (this.isChrome) {
                    var c = r.split("://"),
                        d = c[0],
                        f = r.replace(d + "://", "");
                    var m = t.bag || "com.tmall.wireless";
                    r = "intent://" + f + "#Intent;scheme=" + d + ";package=" + m + ";end"
                    console.log('f:',f);
                    console.log('d:',d);
                    console.log('m:',m);

                }
                this.paramUrl = r
            } else {
                this.paramUrl = "tmall://tmallclient"
            }
            return true
        },
        reset: function(e) {
            if (this.iClose) return;
            this.init(e);
            this.resetHtml && this.resetHtml(e)
        },
        create: function() {

            if (this.iClose) return;
            if (!A.parentNode) {
                A.setAttribute("id", "J_smartFrame");
                A.style.cssText = "display:none";
                l.body.appendChild(A)
            }
            this.frame = A
            console.log('create', this);
        },
        download: function(t, i) {
            var a = Date.now();
            if (!t || a - t < this.timeout + 50) {
                if (this.platform == "ios") {
                    c(e.merge(i, {
                        string: "tmwap.1.2",
                        apuri: "sb_ios_download"
                    }))
                } else {
                    c(e.merge(i, {
                        string: "tmwap.1.7",
                        apuri: "sb_andriod_download"
                    }))
                }
                if (i.redirectLink) {
                    this.bannerUrl = i.redirectLink
                }
                if (i.notGoDownload) {
                    !!i.fail && i.fail()
                } else {
                    !!i.fail && i.fail();
                    if (this.cover) {
                        o.location.replace(this.bannerUrl)
                    } else {
                        o.location.href = this.bannerUrl
                    }
                }
            } else {
                !!i.success && i.success()
            }
        },
        redirect: function(e) {
            console.log('redirect', e);
            var t = this.options && this.options.version,
                i = e.redirectLink || "",
                a = this.frame;
            if (!i) {
                i = "http://m.laiwang.com/market/laiwang/tmall/app-download.php?src=" + (e.downloadSrc ? e.downloadSrc : "wapicon")
            }
            if (!this.paramUrl) return;
            var r = "";
            var o = navigator.userAgent;
            var n = [];
            if (o.match(/(iPhone)/)) {
                if (o.match(/Safari/)) {
                    n = o.match(/Version\/([\d\.]+)/);
                    if (n) {
                        r = n[1];
                        r && (r = r.split(".")[0])
                    }
                }
            }
            if (r >= 9) {
                console.log('redirect',1)
                window.location.href = this.paramUrl
            } else if (this.isChrome) {
                console.log('redirect',2)
                console.log(this.paramUrl);
                var l = window.open(this.paramUrl);
                console.log(l);
                if (e.isClick) {
                    console.log('e.isClick',i)
                    //l.location.href = i
                }
            } else {
                console.log('redirect',3)
                a && a.setAttribute("src", this.paramUrl)
            }
        },
        install: function(t) {
            var i = this,
                t = t || {},
                a = Date.now();
            c(e.merge(t, {
                string: "tmwap.1.8"
            }));
            if (this.platform == "ios") {
                c(e.merge(t, {
                    string: "tmwap.1.5",
                    apuri: "sb_ios_click"
                }))
            } else {
                c(e.merge(t, {
                    string: "tmwap.1.6",
                    apuri: "sb_andriod_click"
                }))
            }
            if (!i.isDownload) {
                i.timeload = setTimeout(function() {
                    i.download(a, t)
                }, i.timeout)
            }
            i.redirect(t)
        },
        autoEnvoke: function(t) {
            var i = this,
                t = t || {},
                a = Date.now();
            c(e.merge(t, {
                string: "tmallacti.201503.1005.5",
                apuri: "sb_ios_auto_envoke"
            }));
            if (i.platform == "ios") {
                c(e.merge(t, {
                    string: "tmallacti.201503.1005.1",
                    apuri: "sb_ios_auto_envoke"
                }))
            } else {
                c(e.merge(t, {
                    string: "tmallacti.201503.1005.3",
                    apuri: "sb_andriod_auto_envoke"
                }))
            }
            i.autoAplus = setTimeout(function() {
                var r = Date.now();
                if (r - a < i.timeout + 50) {
                    if (i.platform == "ios") {
                        c(e.merge(t, {
                            string: "tmallacti.201503.1005.2",
                            apuri: "sb_ios_auto_fail"
                        }))
                    } else {
                        c(e.merge(t, {
                            string: "tmallacti.201503.1005.4",
                            apuri: "sb_andriod_auto_fail"
                        }))
                    }
                }
            }, i.timeout);
            t.isAuto = true;
            i.redirect(t)
        }
    };
    n.smartbanner = function(e) {
        var t = e.type,
            i = n.smartbanner.BannerUI,
            a = n.smartbanner.PopUI;
        if (t === "banner" || !t) {
            if (i) {
                return new i(e)
            }
        } else if (t === "pop") {
            if (a) {
                return new a(e)
            }
        } else if (t === "func") {
            return n.smartbanner.getInstance(e)
        }
    };
    n.smartbanner.getInstance = function(e, t) {
        t || (t = Object.create({}));
        for (var i in h.prototype) {
            t[i] = h.prototype[i]
        }
        return h.call(t, e)
    };
    n.smartbanner.aplus = c;
    n.smartbanner.getParam = u;
    n.smartbanner.ttidInTaobaoApp = d;
    n.smartbanner.uaInTaobaoApp = m;
    var v = function(e) {
        var t = this;
        v.superclass.constructor.call(t, e);
        t.init(e)
    };
    v.startApp = n.smartbanner;
    e.extend(v, a, {
        init: function(e) {
            var i = this;
            e = e || {};
            i.config = e;
            e.mmstat = e.mmstat || e.type || "default";
            n.downloadSrc = e.downloadSrc || "";
            if (e.type) {
                n.page = e.type
            }
            if (!e.UIType) {
                e.UIType = "default"
            }
            i.opt = e;
            var a = window.g_config || {};
            if (a.removeSmartBanner) {
                return
            }
            if (e.UIType == "default" && t.get("#J_BottomSmartBanner")) {
                return
            }
            if (!i._defaultHideScene(e)) {
                window.SB.getAPIData(i, i._initSmartBanner)
            }
        },
        appJump: function(t) {
            var i = this;
            var a = i._spliceUrl(t);
            var r = n.smartbanner(e.merge(t, {
                type: "func",
                href: a
            }));
            !!r && r.install(t)
        },
        _initSmartBanner: function(e, t) {
            if (!t.delta) {
                return
            }
            var i = JSON.parse(t.delta);
            e.track = t.track;
            e._autoApp(e, i);
            e._renderDom(e, i)
        },
        _autoApp: function(t, i) {
            var a = t.opt;
            var r = {};
            if (t.track) {
                a.scene = "liuliangbao"
            }
            a.utsk = "auto";
            t.autoUrl = t._spliceUrl(a);
            var o = false;
            if (i && i.data && i.data[0]) {
                r = i.data[0];
                if (r.bottom_auto == "true" && a.UIType == "default") {
                    o = true
                } else if (r.box_auto == "true" && a.UIType == "box") {
                    o = true
                } else if (r.button_auto == "true" && a.UIType == "button") {
                    o = true
                }
                if (o && !window.SB.auto) {
                    var l = t._autoHideScene(a.UIType, r);
                    if (l) {
                        return
                    }
                    window.SB.auto = true;
                    if (r.click_default_url && a.UIType == "default") {
                        t.autoLink = t._spliceUrl({
                            utsk: "auto",
                            type: "link",
                            params: {
                                url: r.auto_default_url
                            }
                        })
                    }
                    if (r.click_box_url && a.UIType == "box") {
                        t.autoLink = t._spliceUrl({
                            utsk: "auto",
                            type: "link",
                            params: {
                                url: r.auto_box_url
                            }
                        })
                    }
                    var s = t.autoLink || t.autoUrl || "tmall://tab.switch/home";
                    var u = n.smartbanner(e.merge(a, {
                        type: "func",
                        href: s
                    }));
                    u.autoEnvoke(e.merge(a, {
                        apuri: "auto"
                    }))
                }
            }
        },
        _autoHideScene: function(t, i) {
            i = i || {};
            var a = window.g_config || {};
            var r = a.sbConfig || {};
            var o = navigator.userAgent || "";
            var n = e.unparam(document.location.search.substring(1));
            var l = o.indexOf("AliApp") >= 0;
            var s = document.referrer && document.referrer.indexOf("taobao.com") >= 0;
            var u = l && o.indexOf("(TB/") >= 0;
            var p = l && o.indexOf("(JU/") >= 0 || n.ttid && n.ttid.indexOf("@juhuasuan") >= 0;
            var c = o.indexOf("UCBrowser") >= 0;
            var d = l && o.indexOf("AlipayClient") >= 0;
            var f = o.match(/Chrome/i) != null && o.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) != null;
            var m = o.indexOf("BC") >= 0;
            var b = window.location.href.indexOf("ali_trackid=") >= 0 || e.Cookie.get("tkmb");
            s = s && !b;
            var g, A, h, v, w, _, k, x, U;
            g = u && !(t == "default" && i.auto_open_default_tb == "true" || t == "box" && i.auto_open_box_tb == "true");
            A = d && !(t == "default" && i.auto_open_default_pay == "true" || t == "box" && i.auto_open_box_pay == "true");
            h = p && !(t == "default" && i.auto_open_default_ju == "true" || t == "box" && i.auto_open_box_ju == "true");
            v = m && !(t == "default" && i.auto_open_default_bc == "true" || t == "box" && i.auto_open_box_bc == "true");
            w = s && !(t == "default" && i.auto_open_default_refer == "true" || t == "box" && i.auto_open_box_refer == "true");
            _ = b && !(t == "default" && i.auto_open_default_tbk == "true" || t == "box" && i.auto_open_box_tbk == "true");
            k = f && i.auto_close_andriodWeb == "true";
            U = i.auto_hide_ua || "HTAO|HTao|alihealthclient|AliHealthClient|ALICAR|Car|AliTrip|AliApp\\(IS";
            !!U && (x = o.match(new RegExp(U)) != null);
            var C = g || A || h || v || w || _ || x || r.hideAuto;
            return C
        },
        _renderDom: function(i, a) {
            var r = i.opt;
            var o = '<div id="J_BottomSmartBanner" class="mui-bottom-smart-banner">' + '<a id="J_BottomSmartBannerLink"><img src="{content}"></a>' + '<div class="mui-bottom-m-sb-btn-close" id="J_BottomSmartBannerClose" ></div>' + "</div>";
            var n = ['<div class="mui-sb-button">', '<img class="logo" src="{logo_pic}" width="42" height="42"/>', '<div class="words">{button_words}</div>', '<div class="arrow"></div>', "</div>"].join("");
            var l = ['<div class="mui-sb-box">', '<div class="close" id="J_SBBoxClose"></div>', '<img class="logo" src="{logo_pic}" width="42" height="42"/>', '<div class="words">{pic_words}</div>', '<div class="arrow"></div>', "</div>"].join("");
            var s = {},
                u = "",
                p = "";
            if (i.track) {
                r.scene = "liuliangbao"
            }
            r.utsk = "click";
            i.sbUrl = i._spliceUrl(r);
            if (a && a.data && a.data[0]) {
                s = a.data[0];
                if (r.UIType == "box" && s.p_cookie_set == "true") {
                    r.setCookie = true
                } else if (r.UIType == "default" && s.b_cookie_set == "true") {
                    r.setCookie = true
                }
                if (r.img) {
                    s.content = r.img
                }
                if (!s.logo_pic) {
                    s.logo_pic = "//img.alicdn.com/tps/TB1twKDJFXXXXbtXVXXXXXXXXXX-92-92.png"
                }
                if (s.click_default_url && r.UIType == "default") {
                    i.sbLink = i._spliceUrl({
                        utsk: "click",
                        type: "link",
                        params: {
                            url: s.click_default_url
                        }
                    })
                }
                if (s.click_box_url && r.UIType == "box") {
                    i.sbLink = i._spliceUrl({
                        utsk: "click",
                        type: "link",
                        params: {
                            url: s.click_box_url
                        }
                    })
                }
                var d = i._showHideScene(r.UIType, s);
                if (d) {
                    return
                }
                if (r.UIType == "default") {
                    if (i.isFromTaoke() && s.close_taoke_bottom == "true") {
                        return
                    }
                    u = e.substitute(o, s);
                    p = t.create(u);
                    t.addStyleSheet('.mui-bottom-smart-banner{                        width: 100%;                        position: fixed;                        bottom:0;                        left:0;                        z-index: 99999;                        font-size:0;                    }                    .mui-bottom-smart-banner img{                        width:100%;                        opacity: 0.95;                    }                    .mui-bottom-smart-banner a{                        display:block                    }                    .mui-bottom-m-sb-btn-close{                        position: absolute;                        right:0;                        top:0;                        background: rgba(0,0,0,0.2) url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NzhFMkJFNTMwM0ExMUU0OERFOUVCNDEzMUJCNTQ1RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NzhFMkJFNjMwM0ExMUU0OERFOUVCNDEzMUJCNTQ1RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc3OEUyQkUzMzAzQTExRTQ4REU5RUI0MTMxQkI1NDVEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc3OEUyQkU0MzAzQTExRTQ4REU5RUI0MTMxQkI1NDVEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NmtjogAAAJtJREFUeNqsk1sSABEMBOn7Oa0D2ldtldolEolvuomZ3Fqr6Vklxa6bSweu0fCLzef2NRL+viAFSn7j5rPBIxn+JYONO5JpUJgcsEjEFCIc1EiWEWdxO0mi6g+KEYwk6nLms8nWj0yW5mNISrHCrYIqvMYt6Gdu6gmbOVdLcJRIJcFTIo0EB1wlwQlfSgiAixKC4FMJgfCh5BBgAOelLtiutNSeAAAAAElFTkSuQmCC") 15px 5px no-repeat;                        width: 30px;                        height: 30px;                        background-size: 12px;                        cursor: pointer;                        border-radius: 0 0 0 30px;                    }');
                    if (!t.get("#J_BottomSmartBanner")) {
                        if (!t.get("body")) {
                            setTimeout(function() {
                                t.append(p, "body")
                            }, 0)
                        } else {
                            t.append(p, "body")
                        }
                        f()
                    }
                } else if (r.UIType == "button") {
                    if (i.isFromTaoke() && s.close_taoke_button == "true") {
                        return
                    }
                    t.addStyleSheet('.mui-sb-button{border:1px solid #DD2727;width:120px;height:42px;border-radius:9px;position:relative}.mui-sb-button .logo{position:absolute;top:-2px;left:-3px;width:48px;height:48px}.mui-sb-button .words{position:absolute;top:10px;right:11px;height:24px;width:60px;line-height:12px;font-size:10px;color:#DD2727;overflow:hidden}.mui-sb-button .arrow{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAMBAMAAABcu7ojAAAALVBMVEUAAADJFBTdJibcJibcJyfcJyfcJibcJibbJSXbJibdJSXdJSXbJyfdJyfdJibsH9DSAAAADnRSTlMAB7V2+82upo9qYVmenao2WgUAAAAsSURBVAjXY4hgAAK7A0CC+bkAkJyXCCS4HoGYWxTABJgLkoAqsbsAFAZpAwA1kgpPMNCiXwAAAABJRU5ErkJggg==");width:7px;height:12px;position:absolute;right:3px;top:16px}');
                    e.available(r.triggle, function() {
                        p = t.create(e.substitute(n, s));
                        t.append(p, r.triggle);
                        !!r.showCallback && r.showCallback();
                        f()
                    })
                } else if (r.UIType == "box") {
                    if (i.isFromTaoke() && s.close_taoke_box == "true") {
                        return
                    }
                    t.addStyleSheet('.mui-sb-box{width:100%;height:44px;position:relative;background-color:#f14344}.mui-sb-box .close{width:18px;height:18px;border:1px solid #fff;border-radius:18px;position:absolute;top:13px;left:10px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAANpJREFUKBV90E0LAVEUxvFJhJ23CF9DtrNQNkpRxEJNpixsLH0fSykrkqW1xAax8xW8LWf+Z3I1xjS3fjP3nvOc5kWzLGsDQwtY9ONYwtS41PBGz2+GegxrbJFwMmzqkKGue4hzFCvskHT35ElNyFBLGtwlLK+xR+onrA402pChDhY4IK36vncCBmRdkfGGQu4CgQjnBm4oogz/JWHMcUQWfbxQ/ZugGMYMJ+RUgP0AT1RUTf6GhKc4I/9tfDbUhnhAd0psJrig4A2rM70R7ijJE8aQDwxcZEzoNiwj7FzGBTCyAAAAAElFTkSuQmCC") no-repeat center;background-size:6px}.mui-sb-box .logo{width:35px;height:35px;position:absolute;top:4px;left:40px}.mui-sb-box .words{position:absolute;top:0;left:80px;line-height:44px;font-size:14px;color:#fff}.mui-sb-box .arrow{width:18px;height:18px;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAQMAAADbzgrbAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAABpJREFUCNdj+ACEDFhIfiDERlJJAw71VFMOAKa4J2E98r4cAAAAAElFTkSuQmCC");position:absolute;top:13px;right:12px;background-size:18px}');
                    e.available(r.triggle, function() {
                        p = t.create(e.substitute(l, s));
                        t.append(p, r.triggle);
                        !!r.showCallback && r.showCallback();
                        f()
                    })
                }!!s.exposureParam && ((new Image).src = s.exposureParam + "&r" + +new Date + "=1");
                i._initSBEvent(r)
            }

            function f() {
                c(e.merge(r, {
                    string: "tmwap.1.3",
                    apuri: "sb_show"
                }))
            }
        },
        _showHideScene: function(i, a) {
            a = a || {};
            var r = window.g_config || {};
            var o = r.sbConfig || {};
            var n = navigator.userAgent || "";
            var l = e.unparam(document.location.search.substring(1));
            var s = n.indexOf("AliApp") >= 0;
            var u = document.referrer && document.referrer.indexOf("taobao.com") >= 0;
            var p = s && n.indexOf("(TB/") >= 0;
            var c = s && n.indexOf("(JU/") >= 0 || l.ttid && l.ttid.indexOf("@juhuasuan") >= 0;
            var d = window.location.href.indexOf("ali_trackid=") >= 0 || e.Cookie.get("tkmb");
            u = u && !d;
            var f, m, b, g, A, h;
            var v = i == "default" && e.Cookie.get("_smartbannerBottomCloseBtn_");
            var w = i == "box" && e.Cookie.get("_smartbannerBoxCloseBtn_");
            var _ = t.viewportWidth() > t.viewportHeight();
            var k = v || w || i != "button" && _;
            f = p && !(i == "default" && a.show_open_default_tb == "true" || i == "box" && a.show_open_box_tb == "true");
            m = c && !(i == "default" && a.show_open_default_ju == "true" || i == "box" && a.show_open_box_ju == "true");
            b = u && !(i == "default" && a.show_open_default_refer == "true" || i == "box" && a.show_open_box_refer == "true");
            g = d && (i == "default" && a.show_close_default_tbk == "true" || i == "box" && a.show_close_box_tbk == "true");
            h = a.show_hide_ua || "alihealthclient|AliHealthClient|AliApp\\(IS";
            if (h) {
                A = n.match(new RegExp(h)) != null
            }
            var x = f || m || b || g || A || k || o.hideShow;
            return x
        },
        _initSBEvent: function(a) {
            var r = this;
            var o = r.sbLink || r.sbUrl;
            var l = a.triggle ? a.triggle : "#J_BottomSmartBanner";
            var s = t.get(l);
            o = o || 'tmall://tab.switch/home"}';
            if (o) {
                i.delegate(document, "tap", l, function(t) {
                    var i = n.smartbanner(e.merge(a, {
                        type: "func",
                        href: o
                    }));
                    a.isClick = true;
                    i.install(a);
                    t.preventDefault()
                })
            }
            var u = "";
            if (a.UIType == "default") {
                u = "#J_BottomSmartBannerClose";
                cookieKey = "_smartbannerBottomCloseBtn_"
            } else if (a.UIType == "box") {
                u = "#J_SBBoxClose";
                cookieKey = "_smartbannerBoxCloseBtn_"
            }
            if (u) {
                i.delegate(document, "tap", u, function(i) {
                    i.halt();
                    n.smartbanner.aplus(e.merge(a, {
                        string: "tmwap.1.4",
                        apuri: "sb_click_close"
                    }));
                    s = t.get(l);
                    t.hide(s);
                    !!a.closeBtnCallback && a.closeBtnCallback();
                    if (a.setCookie) {
                        e.Cookie.set(cookieKey, 1, undefined, ".tmall.com", "/")
                    }
                    i.preventDefault()
                })
            }
        },
        hide: function() {
            var e = this;
            var i = e.opt;
            var a = i.triggle ? i.triggle : "#J_BottomSmartBanner";
            var r = t.get(a);
            !!r && t.hide(r)
        },
        show: function() {
            var e = this;
            var i = e.opt;
            var a = i.triggle ? i.triggle : "#J_BottomSmartBanner";
            var r = t.get(a);
            !!r && t.show(r)
        },
        _getTkmd: function() {
            return /(?:^|&)e=(.*?)(?:&|$)/.test(KISSY.Cookie.get("tkmb")) ? encodeURIComponent(RegExp.$1) : ""
        },
        _getTkFlag: function() {
            return /(?:^|&)tkFlag=(.*?)(?:&|$)/.test(KISSY.Cookie.get("tkmb")) ? encodeURIComponent(RegExp.$1) : ""
        },
        _pageType: function(e) {
            if (e.indexOf("item:id=") > -1) {
                n.page = "detail"
            } else if (e.indexOf("tmall://mobile.tmall.com/page/shopDetail") > -1) {
                n.page = "shop"
            } else if (e.indexOf("searchItem") > -1) {
                n.page = "list"
            }
        },
        _spliceUrl: function(e) {
            var t = this;
            type = e.type || "", params = e.params || "", spliceUrl = "", oldUrl = e.url || "", href = "";
            if (e.url && !e.type) {
                return e.url
            }
            if (type) {
                switch (type) {
                    case "detail":
                        n.page = "detail";
                        spliceUrl = "tmall://page.tm/itemDetail?" + t._param(params);
                        break;
                    case "shop":
                        n.page = "shop";
                        spliceUrl = "tmall://page.tm/shop?" + t._param(params);
                        break;
                    case "list":
                        n.page = "list";
                        spliceUrl = "tmall://page.tm/search?searchType=item&" + t._param(params);
                        break;
                    case "internal":
                        if (params.page) {
                            n.page = params.page;
                            spliceUrl = " tmall://page.tm/" + params.page + (params.params ? "?" + t._param(params.params) : "")
                        } else if (params.url) {
                            spliceUrl = params.url
                        }
                        break;
                    case "link":
                        n.page = "h5";
                        spliceUrl = params.url;
                        if (spliceUrl.indexOf("#") > -1) {
                            spliceUrl = spliceUrl.replace(/#(.*?)$/, "")
                        }
                        spliceUrl = "tmall://page.tm/webview?url=" + encodeURIComponent(spliceUrl);
                        break
                }
            } else {
                spliceUrl = "tmall://tab.switch/home"
            }
            if (t._getTkmd()) {
                spliceUrl += (spliceUrl.indexOf("?") > -1 ? "&" : "?") + "e=" + t._getTkmd() + "&type=2" + (t._getTkFlag() == undefined ? "" : "&tkFlag=" + t._getTkFlag())
            }
            if (t.track) {
                spliceUrl += (spliceUrl.indexOf("?") > -1 ? "&" : "?") + t.track
            }
            var i = {
                a: e.utskA || "3",
                b: +new Date,
                c: t._getUtskC(),
                d: (e.utsk ? e.utsk + "-" : "third-") + e.mmstat + "-" + (t.isFromTaoke() ? "1" : "0")
            };
            var a = "_ns=1&ut_sk=" + i.a + "." + i.b + "." + i.c + "." + i.d;
            spliceUrl += (spliceUrl.indexOf("?") > -1 ? "&" : "?") + a;
            return spliceUrl
        },
        isFromTaoke: function() {
            var t = window.location.href.indexOf("ali_trackid=") >= 0 || e.Cookie.get("tkmb");
            return t
        },
        _getUtskC: function() {
            var t = "other";
            var i = navigator.userAgent || "";
            var a = e.unparam(document.location.search.substring(1));
            var r = i.indexOf("AliApp") >= 0;
            var o = r && i.indexOf("AlipayClient") >= 0;
            var n = i.indexOf("UCBrowser") >= 0 && !r;
            var l = r && i.indexOf("(TB/") >= 0;
            var s = r && i.indexOf("(JU/") >= 0 || a.ttid && a.ttid.indexOf("@juhuasuan") >= 0;
            var u = i.indexOf("Weibo") >= 0;
            var p = i.indexOf("AliTrip") >= 0;
            var c = i.indexOf("QQBrowser") >= 0;
            var d = i.indexOf("AliApp(BC") >= 0;
            if (l) {
                t = "tb"
            } else if (s) {
                t = "ju"
            } else if (o) {
                t = "alipay"
            } else if (p) {
                t = "alitrip"
            } else if (u) {
                t = "weibo"
            } else if (n) {
                t = "uc"
            } else if (c) {
                t = "qq"
            } else if (d) {
                t = "bc"
            }
            return t
        },
        _defaultHideScene: function(t) {
            var i = navigator.userAgent.indexOf("AliApp(TM/") >= 0;
            var a = navigator.userAgent.indexOf("MI PAD") >= 0;
            var r = e.UA.ipad || false;
            var o = t.notNeedUI || t.UIType != "default" && !t.triggle;
            var n = o || i || a || r;
            return n
        },
        _param: function(t) {
            var i = "";
            t = t || {};
            var a = 0;
            e.each(t, function(e, t) {
                if (a) {
                    i += "&"
                }
                if (e) {
                    i = i + t + "=" + e;
                    a = 1
                }
            });
            return i
        }
    });
    return v
}, {
    requires: ["dom", "event", "base", "cookie", "io"]
});
