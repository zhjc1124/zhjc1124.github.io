/*!!
 * Piwik - Web Analytics
 *
 * @link http://piwik.org
 * @source https://github.com/piwik/piwik/blob/master/js/piwik.js
 * @license http://piwik.org/free-software/bsd/ Simplified BSD (also in js/LICENSE.txt)
 */
;if (typeof JSON2 !== "object") {
    JSON2 = {}
}
(function() {
    function d(f) {
        return f < 10 ? "0" + f : f
    }
    function l(n, m) {
        var f = Object.prototype.toString.apply(n);
        if (f === "[object Date]") {
            return isFinite(n.valueOf()) ? n.getUTCFullYear() + "-" + d(n.getUTCMonth() + 1) + "-" + d(n.getUTCDate()) + "T" + d(n.getUTCHours()) + ":" + d(n.getUTCMinutes()) + ":" + d(n.getUTCSeconds()) + "Z" : null
        }
        if (f === "[object String]" || f === "[object Number]" || f === "[object Boolean]") {
            return n.valueOf()
        }
        if (f !== "[object Array]" && typeof n.toJSON === "function") {
            return n.toJSON(m)
        }
        return n
    }
    var c = new RegExp("[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]","g"), e = '\\\\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]', i = new RegExp("[" + e,"g"), j, b, k = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, h;
    function a(f) {
        i.lastIndex = 0;
        return i.test(f) ? '"' + f.replace(i, function(m) {
            var n = k[m];
            return typeof n === "string" ? n : "\\u" + ("0000" + m.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + f + '"'
    }
    function g(s, p) {
        var n, m, t, f, q = j, o, r = p[s];
        if (r && typeof r === "object") {
            r = l(r, s)
        }
        if (typeof h === "function") {
            r = h.call(p, s, r)
        }
        switch (typeof r) {
        case "string":
            return a(r);
        case "number":
            return isFinite(r) ? String(r) : "null";
        case "boolean":
        case "null":
            return String(r);
        case "object":
            if (!r) {
                return "null"
            }
            j += b;
            o = [];
            if (Object.prototype.toString.apply(r) === "[object Array]") {
                f = r.length;
                for (n = 0; n < f; n += 1) {
                    o[n] = g(n, r) || "null"
                }
                t = o.length === 0 ? "[]" : j ? "[\n" + j + o.join(",\n" + j) + "\n" + q + "]" : "[" + o.join(",") + "]";
                j = q;
                return t
            }
            if (h && typeof h === "object") {
                f = h.length;
                for (n = 0; n < f; n += 1) {
                    if (typeof h[n] === "string") {
                        m = h[n];
                        t = g(m, r);
                        if (t) {
                            o.push(a(m) + (j ? ": " : ":") + t)
                        }
                    }
                }
            } else {
                for (m in r) {
                    if (Object.prototype.hasOwnProperty.call(r, m)) {
                        t = g(m, r);
                        if (t) {
                            o.push(a(m) + (j ? ": " : ":") + t)
                        }
                    }
                }
            }
            t = o.length === 0 ? "{}" : j ? "{\n" + j + o.join(",\n" + j) + "\n" + q + "}" : "{" + o.join(",") + "}";
            j = q;
            return t
        }
    }
    if (typeof JSON2.stringify !== "function") {
        JSON2.stringify = function(o, m, n) {
            var f;
            j = "";
            b = "";
            if (typeof n === "number") {
                for (f = 0; f < n; f += 1) {
                    b += " "
                }
            } else {
                if (typeof n === "string") {
                    b = n
                }
            }
            h = m;
            if (m && typeof m !== "function" && (typeof m !== "object" || typeof m.length !== "number")) {
                throw new Error("JSON2.stringify")
            }
            return g("", {
                "": o
            })
        }
    }
    if (typeof JSON2.parse !== "function") {
        JSON2.parse = function(o, f) {
            var n;
            function m(s, r) {
                var q, p, t = s[r];
                if (t && typeof t === "object") {
                    for (q in t) {
                        if (Object.prototype.hasOwnProperty.call(t, q)) {
                            p = m(t, q);
                            if (p !== undefined) {
                                t[q] = p
                            } else {
                                delete t[q]
                            }
                        }
                    }
                }
                return f.call(s, r, t)
            }
            o = String(o);
            c.lastIndex = 0;
            if (c.test(o)) {
                o = o.replace(c, function(p) {
                    return "\\u" + ("0000" + p.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if ((new RegExp("^[\\],:{}\\s]*$")).test(o.replace(new RegExp('\\\\(?:["\\\\/bfnrt]|u[0-9a-fA-F]{4})',"g"), "@").replace(new RegExp('"[^"\\\\\n\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?',"g"), "]").replace(new RegExp("(?:^|:|,)(?:\\s*\\[)+","g"), ""))) {
                n = eval("(" + o + ")");
                return typeof f === "function" ? m({
                    "": n
                }, "") : n
            }
            throw new SyntaxError("JSON2.parse")
        }
    }
}());
if (typeof _paq !== "object") {
    _paq = []
}
if (typeof Piwik !== "object") {
    Piwik = (function() {
        var h, a = {}, q = document, d = navigator, E = screen, B = window, e = B.performance || B.mozPerformance || B.msPerformance || B.webkitPerformance, m = false, z = [], j = B.encodeURIComponent, A = B.decodeURIComponent, f = unescape, F, p, c;
        function v() {}
        v.generate = function() {
            var P = v._gri
              , Q = v._ha;
            return Q(P(32), 8) + "-" + Q(P(16), 4) + "-" + Q(16384 | P(12), 4) + "-" + Q(32768 | P(14), 4) + "-" + Q(P(48), 12)
        }
        ;
        v._gri = function(P) {
            if (P < 0) {
                return NaN
            }
            if (P <= 30) {
                return (0 | Math.random() * (1 << P))
            }
            if (P <= 53) {
                return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << P - 30)) * (1 << 30)
            }
            return NaN
        }
        ;
        v._ha = function(P, R) {
            var T = P.toString(16)
              , Q = R - T.length
              , S = "0";
            for (; Q > 0; Q >>>= 1,
            S += S) {
                if (Q & 1) {
                    T = S + T
                }
            }
            return T
        }
        ;
        function s(Q) {
            var P = typeof Q;
            return P !== "undefined"
        }
        function n(P) {
            return typeof P === "function"
        }
        function D(P) {
            return typeof P === "object"
        }
        function k(P) {
            return typeof P === "string" || P instanceof String
        }
        function K() {
            var P, R, Q;
            for (P = 0; P < arguments.length; P += 1) {
                Q = arguments[P];
                R = Q.shift();
                if (k(R)) {
                    F[R].apply(F, Q)
                } else {
                    R.apply(F, Q)
                }
            }
        }
        function O(S, R, Q, P) {
            if (S.addEventListener) {
                S.addEventListener(R, Q, P);
                return true
            }
            if (S.attachEvent) {
                return S.attachEvent("on" + R, Q)
            }
            S["on" + R] = Q
        }
        function I(Q, T) {
            var P = "", S, R;
            for (S in a) {
                if (Object.prototype.hasOwnProperty.call(a, S)) {
                    R = a[S][Q];
                    if (n(R)) {
                        P += R(T)
                    }
                }
            }
            return P
        }
        function L() {
            var P;
            I("unload");
            if (h) {
                do {
                    P = new Date()
                } while (P.getTimeAlias() < h)
            }
        }
        function J() {
            var P;
            if (!m) {
                m = true;
                I("load");
                for (P = 0; P < z.length; P++) {
                    z[P]()
                }
            }
            return true
        }
        function l() {
            var Q;
            if (q.addEventListener) {
                O(q, "DOMContentLoaded", function P() {
                    q.removeEventListener("DOMContentLoaded", P, false);
                    J()
                })
            } else {
                if (q.attachEvent) {
                    q.attachEvent("onreadystatechange", function P() {
                        if (q.readyState === "complete") {
                            q.detachEvent("onreadystatechange", P);
                            J()
                        }
                    });
                    if (q.documentElement.doScroll && B === B.top) {
                        (function P() {
                            if (!m) {
                                try {
                                    q.documentElement.doScroll("left")
                                } catch (R) {
                                    setTimeout(P, 0);
                                    return
                                }
                                J()
                            }
                        }())
                    }
                }
            }
            if ((new RegExp("WebKit")).test(d.userAgent)) {
                Q = setInterval(function() {
                    if (m || /loaded|complete/.test(q.readyState)) {
                        clearInterval(Q);
                        J()
                    }
                }, 10)
            }
            O(B, "load", J, false)
        }
        function g(R, Q) {
            var P = q.createElement("script");
            P.type = "text/javascript";
            P.src = R;
            if (P.readyState) {
                P.onreadystatechange = function() {
                    var S = this.readyState;
                    if (S === "loaded" || S === "complete") {
                        P.onreadystatechange = null;
                        Q()
                    }
                }
            } else {
                P.onload = Q
            }
            q.getElementsByTagName("head")[0].appendChild(P)
        }
        function t() {
            var P = "";
            try {
                P = B.top.document.referrer
            } catch (R) {
                if (B.parent) {
                    try {
                        P = B.parent.document.referrer
                    } catch (Q) {
                        P = ""
                    }
                }
            }
            if (P === "") {
                P = q.referrer
            }
            return P
        }
        function i(P) {
            var R = new RegExp("^([a-z]+):")
              , Q = R.exec(P);
            return Q ? Q[1] : null
        }
        function b(P) {
            var R = new RegExp("^(?:(?:https?|ftp):)/*(?:[^@]+@)?([^:/#]+)")
              , Q = R.exec(P);
            return Q ? Q[1] : P
        }
        function C(R, Q) {
            var P = "[\\?&#]" + Q + "=([^&#]*)";
            var T = new RegExp(P);
            var S = T.exec(R);
            return S ? A(S[1]) : ""
        }
        function o(P) {
            return f(j(P))
        }
        function N(af) {
            var R = function(ak, W) {
                return (ak << W) | (ak >>> (32 - W))
            }, ag = function(am) {
                var ak = "", al, W;
                for (al = 7; al >= 0; al--) {
                    W = (am >>> (al * 4)) & 15;
                    ak += W.toString(16)
                }
                return ak
            }, U, ai, ah, Q = [], Z = 1732584193, X = 4023233417, V = 2562383102, T = 271733878, S = 3285377520, ae, ad, ac, ab, aa, aj, P, Y = [];
            af = o(af);
            P = af.length;
            for (ai = 0; ai < P - 3; ai += 4) {
                ah = af.charCodeAt(ai) << 24 | af.charCodeAt(ai + 1) << 16 | af.charCodeAt(ai + 2) << 8 | af.charCodeAt(ai + 3);
                Y.push(ah)
            }
            switch (P & 3) {
            case 0:
                ai = 2147483648;
                break;
            case 1:
                ai = af.charCodeAt(P - 1) << 24 | 8388608;
                break;
            case 2:
                ai = af.charCodeAt(P - 2) << 24 | af.charCodeAt(P - 1) << 16 | 32768;
                break;
            case 3:
                ai = af.charCodeAt(P - 3) << 24 | af.charCodeAt(P - 2) << 16 | af.charCodeAt(P - 1) << 8 | 128;
                break
            }
            Y.push(ai);
            while ((Y.length & 15) !== 14) {
                Y.push(0)
            }
            Y.push(P >>> 29);
            Y.push((P << 3) & 4294967295);
            for (U = 0; U < Y.length; U += 16) {
                for (ai = 0; ai < 16; ai++) {
                    Q[ai] = Y[U + ai]
                }
                for (ai = 16; ai <= 79; ai++) {
                    Q[ai] = R(Q[ai - 3] ^ Q[ai - 8] ^ Q[ai - 14] ^ Q[ai - 16], 1)
                }
                ae = Z;
                ad = X;
                ac = V;
                ab = T;
                aa = S;
                for (ai = 0; ai <= 19; ai++) {
                    aj = (R(ae, 5) + ((ad & ac) | (~ad & ab)) + aa + Q[ai] + 1518500249) & 4294967295;
                    aa = ab;
                    ab = ac;
                    ac = R(ad, 30);
                    ad = ae;
                    ae = aj
                }
                for (ai = 20; ai <= 39; ai++) {
                    aj = (R(ae, 5) + (ad ^ ac ^ ab) + aa + Q[ai] + 1859775393) & 4294967295;
                    aa = ab;
                    ab = ac;
                    ac = R(ad, 30);
                    ad = ae;
                    ae = aj
                }
                for (ai = 40; ai <= 59; ai++) {
                    aj = (R(ae, 5) + ((ad & ac) | (ad & ab) | (ac & ab)) + aa + Q[ai] + 2400959708) & 4294967295;
                    aa = ab;
                    ab = ac;
                    ac = R(ad, 30);
                    ad = ae;
                    ae = aj
                }
                for (ai = 60; ai <= 79; ai++) {
                    aj = (R(ae, 5) + (ad ^ ac ^ ab) + aa + Q[ai] + 3395469782) & 4294967295;
                    aa = ab;
                    ab = ac;
                    ac = R(ad, 30);
                    ad = ae;
                    ae = aj
                }
                Z = (Z + ae) & 4294967295;
                X = (X + ad) & 4294967295;
                V = (V + ac) & 4294967295;
                T = (T + ab) & 4294967295;
                S = (S + aa) & 4294967295
            }
            aj = ag(Z) + ag(X) + ag(V) + ag(T) + ag(S);
            return aj.toLowerCase()
        }
        function H(R, P, Q) {
            if (R === "translate.googleusercontent.com") {
                if (Q === "") {
                    Q = P
                }
                P = C(P, "u");
                R = b(P)
            } else {
                if (R === "cc.bingj.com" || R === "webcache.googleusercontent.com" || R.slice(0, 5) === "74.6.") {
                    P = q.links[0].href;
                    R = b(P)
                }
            }
            return [R, P, Q]
        }
        function u(Q) {
            var P = Q.length;
            if (Q.charAt(--P) === ".") {
                Q = Q.slice(0, P)
            }
            if (Q.slice(0, 2) === "*.") {
                Q = Q.slice(1)
            }
            return Q
        }
        function M(Q) {
            Q = Q && Q.text ? Q.text : Q;
            if (!k(Q)) {
                var P = q.getElementsByTagName("title");
                if (P && s(P[0])) {
                    Q = P[0].text
                }
            }
            return Q
        }
        function x(P, Q) {
            if (Q) {
                return Q
            }
            if (P.slice(-9) === "piwik.php") {
                P = P.slice(0, P.length - 9)
            }
            return P
        }
        function w(T) {
            var P = "Piwik_Overlay";
            var W = new RegExp("index\\.php\\?module=Overlay&action=startOverlaySession&idsite=([0-9]+)&period=([^&]+)&date=([^&]+)$");
            var R = W.exec(q.referrer);
            if (R) {
                var S = R[1];
                if (S !== String(T)) {
                    return false
                }
                var V = R[2]
                  , Q = R[3];
                B.name = P + "###" + V + "###" + Q
            }
            var U = B.name.split("###");
            return U.length === 3 && U[0] === P
        }
        function G(Q, V, S) {
            var U = B.name.split("###")
              , T = U[1]
              , P = U[2]
              , R = x(Q, V);
            g(R + "plugins/Overlay/client/client.js?v=1", function() {
                Piwik_Overlay_Client.initialize(R, S, T, P)
            })
        }
        function y(an, aO) {
            var V = H(q.domain, B.location.href, t()), a8 = u(V[0]), bn = V[1], aV = V[2], aT = "GET", T = an || "", ak = "", aQ = "", bd = aO || "", aF, av = q.title, ax = "7z|aac|apk|ar[cj]|as[fx]|avi|bin|csv|deb|dmg|docx?|exe|flv|gif|gz|gzip|hqx|jar|jpe?g|js|mp(2|3|4|e?g)|mov(ie)?|ms[ip]|od[bfgpst]|og[gv]|pdf|phps|png|pptx?|qtm?|ra[mr]?|rpm|sea|sit|tar|t?bz2?|tgz|torrent|txt|wav|wm[av]|wpd||xlsx?|xml|z|zip", aR = [a8], Y = [], aJ = [], am = [], aP = 500, Z, ao, aa, ac, az = ["pk_campaign", "piwik_campaign", "utm_campaign", "utm_source", "utm_medium"], au = ["pk_kwd", "piwik_kwd", "utm_term"], bl = "_pk_", af, bm, ad = false, bg, aB, aE, aj = 63072000000, al = 1800000, aG = 15768000000, aC = true, aq = 0, X = false, aK = {}, U = {}, bh = 200, a1 = {}, be = {}, aY = false, aW = false, aU, aL, ag, ay = N, aX, aD;
            function a3(bw, bt, bs, bv, br, bu) {
                if (ad) {
                    return
                }
                var bq;
                if (bs) {
                    bq = new Date();
                    bq.setTime(bq.getTime() + bs)
                }
                q.cookie = bw + "=" + j(bt) + (bs ? ";expires=" + bq.toGMTString() : "") + ";path=" + (bv || "/") + (br ? ";domain=" + br : "") + (bu ? ";secure" : "")
            }
            function ai(bs) {
                if (ad) {
                    return 0
                }
                var bq = new RegExp("(^|;)[ ]*" + bs + "=([^;]*)")
                  , br = bq.exec(q.cookie);
                return br ? A(br[2]) : 0
            }
            function bi(bq) {
                var br;
                if (aa) {
                    br = new RegExp("#.*");
                    return bq.replace(br, "")
                }
                return bq
            }
            function a7(bs, bq) {
                var bt = i(bq), br;
                if (bt) {
                    return bq
                }
                if (bq.slice(0, 1) === "/") {
                    return i(bs) + "://" + b(bs) + bq
                }
                bs = bi(bs);
                br = bs.indexOf("?");
                if (br >= 0) {
                    bs = bs.slice(0, br)
                }
                br = bs.lastIndexOf("/");
                if (br !== bs.length - 1) {
                    bs = bs.slice(0, br + 1)
                }
                return bs + bq
            }
            function aS(bt) {
                var br, bq, bs;
                for (br = 0; br < aR.length; br++) {
                    bq = u(aR[br].toLowerCase());
                    if (bt === bq) {
                        return true
                    }
                    if (bq.slice(0, 1) === ".") {
                        if (bt === bq.slice(1)) {
                            return true
                        }
                        bs = bt.length - bq.length;
                        if ((bs > 0) && (bt.slice(bs) === bq)) {
                            return true
                        }
                    }
                }
                return false
            }
            function bp(bq) {
                var br = new Image(1,1);
                br.onload = function() {
                    p = 0
                }
                ;
                br.src = T + (T.indexOf("?") < 0 ? "?" : "&") + bq
            }
            function a4(bq) {
                try {
                    var bs = B.XMLHttpRequest ? new B.XMLHttpRequest() : B.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : null;
                    bs.open("POST", T, true);
                    bs.onreadystatechange = function() {
                        if (this.readyState === 4 && this.status !== 200) {
                            bp(bq)
                        }
                    }
                    ;
                    bs.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
                    bs.send(bq)
                } catch (br) {
                    bp(bq)
                }
            }
            function aA(bs, br) {
                var bq = new Date();
                if (!bg) {
                    if (aT === "POST") {
                        a4(bs)
                    } else {
                        bp(bs)
                    }
                    h = bq.getTime() + br
                }
            }
            function a2(bq) {
                return bl + bq + "." + bd + "." + aX
            }
            function W() {
                if (ad) {
                    return "0"
                }
                if (!s(d.cookieEnabled)) {
                    var bq = a2("testcookie");
                    a3(bq, "1");
                    return ai(bq) === "1" ? "1" : "0"
                }
                return d.cookieEnabled ? "1" : "0"
            }
            function aM() {
                aX = ay((af || a8) + (bm || "/")).slice(0, 4)
            }
            function ah() {
                var br = a2("cvar")
                  , bq = ai(br);
                if (bq.length) {
                    bq = JSON2.parse(bq);
                    if (D(bq)) {
                        return bq
                    }
                }
                return {}
            }
            function S() {
                if (X === false) {
                    X = ah()
                }
            }
            function bc() {
                var bq = new Date();
                aU = bq.getTime()
            }
            function ae(bu, br, bq, bt, bs, bv) {
                a3(a2("id"), bu + "." + br + "." + bq + "." + bt + "." + bs + "." + bv, aj, bm, af)
            }
            function R() {
                var br = new Date(), bq = Math.round(br.getTime() / 1000), bt = ai(a2("id")), bs;
                if (bt) {
                    bs = bt.split(".");
                    bs.unshift("0")
                } else {
                    if (!aD) {
                        aD = v.generate()
                    }
                    bs = ["1", aD, bq, 0, bq, "", ""]
                }
                return bs
            }
            function P() {
                var bq = ai(a2("ref"));
                if (bq.length) {
                    try {
                        bq = JSON2.parse(bq);
                        if (D(bq)) {
                            return bq
                        }
                    } catch (br) {}
                }
                return ["", "", 0, ""]
            }
            function Q() {
                var bq = ad;
                ad = false;
                a3(a2("id"), "", -86400, bm, af);
                a3(a2("ses"), "", -86400, bm, af);
                a3(a2("cvar"), "", -86400, bm, af);
                a3(a2("ref"), "", -86400, bm, af);
                ad = bq
            }
            function bb(bu) {
                if (!bu || !D(bu)) {
                    return
                }
                var bt = [];
                var bs;
                for (bs in bu) {
                    if (Object.prototype.hasOwnProperty.call(bu, bs)) {
                        bt.push(bs)
                    }
                }
                var bv = {};
                bt.sort();
                var bq = bt.length;
                var br;
                for (br = 0; br < bq; br++) {
                    bv[bt[br]] = bu[bt[br]]
                }
                return bv
            }
            function aw(bs, bQ, bR, bt) {
                var bO, br = new Date(), bA = Math.round(br.getTime() / 1000), bU, bP, bv, bG, bL, bz, bJ, bw, bN, bu = 1024, bW, bD, bK = X, bB = a2("ses"), bC = a2("ref"), bX = a2("cvar"), bH = R(), bF = ai(bB), bM = P(), bT = aF || bn, bx, bq;
                if (ad) {
                    Q()
                }
                if (bg) {
                    return ""
                }
                bU = bH[0];
                bP = bH[1];
                bG = bH[2];
                bv = bH[3];
                bL = bH[4];
                bz = bH[5];
                if (!s(bH[6])) {
                    bH[6] = ""
                }
                bJ = bH[6];
                if (!s(bt)) {
                    bt = ""
                }
                var bE = q.characterSet || q.charset;
                if (!bE || bE.toLowerCase() === "utf-8") {
                    bE = null
                }
                bx = bM[0];
                bq = bM[1];
                bw = bM[2];
                bN = bM[3];
                if (!bF) {
                    var bS = al / 1000;
                    if (!bz || (bA - bz) > bS) {
                        bv++;
                        bz = bL
                    }
                    if (!aE || !bx.length) {
                        for (bO in az) {
                            if (Object.prototype.hasOwnProperty.call(az, bO)) {
                                bx = C(bT, az[bO]);
                                if (bx.length) {
                                    break
                                }
                            }
                        }
                        for (bO in au) {
                            if (Object.prototype.hasOwnProperty.call(au, bO)) {
                                bq = C(bT, au[bO]);
                                if (bq.length) {
                                    break
                                }
                            }
                        }
                    }
                    bW = b(aV);
                    bD = bN.length ? b(bN) : "";
                    if (bW.length && !aS(bW) && (!aE || !bD.length || aS(bD))) {
                        bN = aV
                    }
                    if (bN.length || bx.length) {
                        bw = bA;
                        bM = [bx, bq, bw, bi(bN.slice(0, bu))];
                        a3(bC, JSON2.stringify(bM), aG, bm, af)
                    }
                }
                bs += "&appid=" + bd + "&lt=" + bR + (aV.length ? "&pv_rf=" + j(bi(aV)) : "") + "&uuid=" + bP;
                for (bO in be) {
                    if (Object.prototype.hasOwnProperty.call(be, bO)) {
                        bs += "&" + bO + "=" + be[bO]
                    }
                }
                if (bQ) {
                    bs += "&data=" + j(JSON2.stringify(bQ))
                } else {
                    if (ac) {
                        bs += "&data=" + j(JSON2.stringify(ac))
                    }
                }
                function by(bY, bZ) {
                    var b0 = "";
                    for (bO in bY) {
                        if (bY[bO][0] === "" || bY[bO][1] === "") {
                            continue
                        }
                        b0 = b0 + "&" + bY[bO][0] + "=" + bY[bO][1]
                    }
                    return b0
                }
                var bV = bb(aK);
                var bI = bb(U);
                bs += by(bV, "cvar");
                bs += by(bI, "e_cvar");
                if (X) {
                    bs += by(X, "_cvar");
                    for (bO in bK) {
                        if (Object.prototype.hasOwnProperty.call(bK, bO)) {
                            if (X[bO][0] === "" || X[bO][1] === "") {
                                delete X[bO]
                            }
                        }
                    }
                    a3(bX, JSON2.stringify(X), al, bm, af)
                }
                if (aC) {
                    if (aq) {
                        bs += "&gt_ms=" + aq
                    } else {
                        if (e && e.timing && e.timing.requestStart && e.timing.responseEnd) {
                            bs += "&gt_ms=" + (e.timing.responseEnd - e.timing.requestStart)
                        }
                    }
                }
                ae(bP, bG, bv, bA, bz, s(bt) && String(bt).length ? bt : bJ);
                a3(bB, "*", al, bm, af);
                bs += I(bR);
                if (aQ.length) {
                    bs += "&" + aQ
                }
                return bs
            }
            function a6(bt, bs, bx, bu, bq, bA) {
                var bv = "idgoal=0", bw, br = new Date(), by = [], bz;
                if (String(bt).length) {
                    bv += "&ec_id=" + j(bt);
                    bw = Math.round(br.getTime() / 1000)
                }
                bv += "&revenue=" + bs;
                if (String(bx).length) {
                    bv += "&ec_st=" + bx
                }
                if (String(bu).length) {
                    bv += "&ec_tx=" + bu
                }
                if (String(bq).length) {
                    bv += "&ec_sh=" + bq
                }
                if (String(bA).length) {
                    bv += "&ec_dt=" + bA
                }
                if (a1) {
                    for (bz in a1) {
                        if (Object.prototype.hasOwnProperty.call(a1, bz)) {
                            if (!s(a1[bz][1])) {
                                a1[bz][1] = ""
                            }
                            if (!s(a1[bz][2])) {
                                a1[bz][2] = ""
                            }
                            if (!s(a1[bz][3]) || String(a1[bz][3]).length === 0) {
                                a1[bz][3] = 0
                            }
                            if (!s(a1[bz][4]) || String(a1[bz][4]).length === 0) {
                                a1[bz][4] = 1
                            }
                            by.push(a1[bz])
                        }
                    }
                    bv += "&ec_items=" + j(JSON2.stringify(by))
                }
                bv = aw(bv, ac, "ecommerce", bw);
                aA(bv, aP)
            }
            function a5(bq, bu, bt, bs, br, bv) {
                if (String(bq).length && s(bu)) {
                    a6(bq, bu, bt, bs, br, bv)
                }
            }
            function bk(bq) {
                if (s(bq)) {
                    a6("", bq, "", "", "", "")
                }
            }
            function aI(bt, bu) {
                var bq = new Date()
                  , bs = aw("pg=" + j(M(bt || av)), bu, "log");
                aA(bs, aP);
                if (Z && ao && !aW) {
                    aW = true;
                    O(q, "click", bc);
                    O(q, "mouseup", bc);
                    O(q, "mousedown", bc);
                    O(q, "mousemove", bc);
                    O(q, "mousewheel", bc);
                    O(B, "DOMMouseScroll", bc);
                    O(B, "scroll", bc);
                    O(q, "keypress", bc);
                    O(q, "keydown", bc);
                    O(q, "keyup", bc);
                    O(B, "resize", bc);
                    O(B, "focus", bc);
                    O(B, "blur", bc);
                    aU = bq.getTime();
                    setTimeout(function br() {
                        var bv;
                        bq = new Date();
                        if ((aU + ao) > bq.getTime()) {
                            if (Z < bq.getTime()) {
                                bv = aw("ping=1", bu, "ping");
                                aA(bv, aP)
                            }
                            setTimeout(br, ao)
                        }
                    }, ao)
                }
            }
            function ab(bs, bu, bq, bt, bv) {
                if (String(bs).length === 0 || String(bu).length === 0) {
                    return false
                }
                var br = aw("e_c=" + j(bs) + "&e_a=" + j(bu) + (s(bq) ? "&e_n=" + j(bq) : "") + (s(bt) ? "&e_v=" + j(bt) : "") + "&pg=" + j(M(av)), bv, "event");
                aA(br, aP)
            }
            function at(bq, bt, br, bu) {
                var bs = aw("search=" + j(bq) + (bt ? "&search_cat=" + j(bt) : "") + "&pg=" + j(M(av)) + (s(br) ? "&search_count=" + br : ""), bu, "sitesearch");
                aA(bs, aP)
            }
            function aN(bq, bt, bs) {
                var br = aw("idgoal=" + bq + (bt ? "&revenue=" + bt : ""), bs, "goal");
                aA(br, aP)
            }
            function ba(br, bq, bt) {
                var bs = aw(bq + "=" + j(bi(br)) + "&pg=" + j(M(av)), bt, "link");
                aA(bs, aP)
            }
            function bf(br, bq) {
                if (br !== "") {
                    return br + bq.charAt(0).toUpperCase() + bq.slice(1)
                }
                return bq
            }
            function ar(bv) {
                var bu, bq, bt = ["", "webkit", "ms", "moz"], bs;
                if (!aB) {
                    for (bq = 0; bq < bt.length; bq++) {
                        bs = bt[bq];
                        if (Object.prototype.hasOwnProperty.call(q, bf(bs, "hidden"))) {
                            if (q[bf(bs, "visibilityState")] === "prerender") {
                                bu = true
                            }
                            break
                        }
                    }
                }
                if (bu) {
                    O(q, bs + "visibilitychange", function br() {
                        q.removeEventListener(bs + "visibilitychange", br, false);
                        bv()
                    });
                    return
                }
                bv()
            }
            function ap(bs, br) {
                var bt, bq = "(^| )(piwik[_-]" + br;
                if (bs) {
                    for (bt = 0; bt < bs.length; bt++) {
                        bq += "|" + bs[bt]
                    }
                }
                bq += ")( |$)";
                return new RegExp(bq)
            }
            function a9(bt, bq, bu) {
                var bs = ap(aJ, "download")
                  , br = ap(am, "link")
                  , bv = new RegExp("\\.(" + ax + ")([?&#]|$)","i");
                return br.test(bt) ? "link" : (bs.test(bt) || bv.test(bq) ? "download" : (bu ? 0 : "link"))
            }
            function a0(bv) {
                var bt, br, bq;
                bt = bv.parentNode;
                while (bt !== null && s(bt)) {
                    br = bv.tagName.toUpperCase();
                    if (br === "A" || br === "AREA") {
                        break
                    }
                    bv = bt;
                    bt = bv.parentNode
                }
                if (s(bv.href)) {
                    var bw = bv.hostname || b(bv.href)
                      , bx = bw.toLowerCase()
                      , bs = bv.href.replace(bw, bx)
                      , bu = new RegExp("^(javascript|vbscript|jscript|mocha|livescript|ecmascript|mailto):","i");
                    if (!bu.test(bs)) {
                        bq = a9(bv.className, bs, aS(bx));
                        if (bq) {
                            bs = f(bs);
                            ba(bs, bq)
                        }
                    }
                }
            }
            function bo(bq) {
                var br, bs;
                bq = bq || B.event;
                br = bq.which || bq.button;
                bs = bq.target || bq.srcElement;
                if (bq.type === "click") {
                    if (bs) {
                        a0(bs)
                    }
                } else {
                    if (bq.type === "mousedown") {
                        if ((br === 1 || br === 2) && bs) {
                            aL = br;
                            ag = bs
                        } else {
                            aL = ag = null
                        }
                    } else {
                        if (bq.type === "mouseup") {
                            if (br === aL && bs === ag) {
                                a0(bs)
                            }
                            aL = ag = null
                        }
                    }
                }
            }
            function aZ(br, bq) {
                if (bq) {
                    O(br, "mouseup", bo, false);
                    O(br, "mousedown", bo, false)
                } else {
                    O(br, "click", bo, false)
                }
            }
            function aH(br) {
                if (!aY) {
                    aY = true;
                    var bs, bq = ap(Y, "ignore"), bt = q.links;
                    if (bt) {
                        for (bs = 0; bs < bt.length; bs++) {
                            if (!bq.test(bt[bs].className)) {
                                aZ(bt[bs], br)
                            }
                        }
                    }
                }
            }
            function bj() {
                var br, bs, bt = {
                    pdf: "application/pdf",
                    qt: "video/quicktime",
                    realp: "audio/x-pn-realaudio-plugin",
                    wma: "application/x-mplayer2",
                    dir: "application/x-director",
                    fla: "application/x-shockwave-flash",
                    java: "application/x-java-vm",
                    gears: "application/x-googlegears",
                    ag: "application/x-silverlight"
                }, bq = (new RegExp("Mac OS X.*Safari/")).test(d.userAgent) ? B.devicePixelRatio || 1 : 1;
                if (!((new RegExp("MSIE")).test(d.userAgent))) {
                    if (d.mimeTypes && d.mimeTypes.length) {
                        for (br in bt) {
                            if (Object.prototype.hasOwnProperty.call(bt, br)) {
                                bs = d.mimeTypes[bt[br]];
                                be[br] = (bs && bs.enabledPlugin) ? "1" : "0"
                            }
                        }
                    }
                    if (typeof navigator.javaEnabled !== "unknown" && s(d.javaEnabled) && d.javaEnabled()) {
                        be.java = "1"
                    }
                    if (n(B.GearsFactory)) {
                        be.gears = "1"
                    }
                    be.cookie = W()
                }
                be.res = E.width * bq + "x" + E.height * bq
            }
            bj();
            aM();
            return {
                getVisitorId: function() {
                    return (R())[1]
                },
                getVisitorInfo: function() {
                    return R()
                },
                getAttributionInfo: function() {
                    return P()
                },
                getAttributionCampaignName: function() {
                    return P()[0]
                },
                getAttributionCampaignKeyword: function() {
                    return P()[1]
                },
                getAttributionReferrerTimestamp: function() {
                    return P()[2]
                },
                getAttributionReferrerUrl: function() {
                    return P()[3]
                },
                setTrackerUrl: function(bq) {
                    T = bq
                },
                setSiteId: function(bq) {
                    bd = bq
                },
                setCustomData: function(bq, br) {
                    if (D(bq)) {
                        ac = bq
                    } else {
                        if (!ac) {
                            ac = []
                        }
                        ac[bq] = br
                    }
                },
                appendToTrackingUrl: function(bq) {
                    aQ = bq
                },
                getCustomData: function() {
                    return ac
                },
                setCustomVariable: function(br, bq, bu, bs) {
                    var bt;
                    if (!s(bs)) {
                        bs = "visit"
                    }
                    if (br > 0) {
                        bq = s(bq) && !k(bq) ? String(bq) : bq;
                        bu = s(bu) && !k(bu) ? String(bu) : bu;
                        bt = [bq.slice(0, bh), bu.slice(0, bh)];
                        if (bs === "visit" || bs === 2) {
                            S();
                            X[br] = bt
                        } else {
                            if (bs === "page" || bs === 3) {
                                aK[br] = bt
                            } else {
                                if (bs === "event") {
                                    U[br] = bt
                                }
                            }
                        }
                    }
                },
                getCustomVariable: function(br, bs) {
                    var bq;
                    if (!s(bs)) {
                        bs = "visit"
                    }
                    if (bs === "page" || bs === 3) {
                        bq = aK[br]
                    } else {
                        if (bs === "event") {
                            bq = U[br]
                        } else {
                            if (bs === "visit" || bs === 2) {
                                S();
                                bq = X[br]
                            }
                        }
                    }
                    if (!s(bq) || (bq && bq[0] === "")) {
                        return false
                    }
                    return bq
                },
                deleteCustomVariable: function(bq, br) {
                    if (this.getCustomVariable(bq, br)) {
                        this.setCustomVariable(bq, "", "", br)
                    }
                },
                setLinkTrackingTimer: function(bq) {
                    aP = bq
                },
                setDownloadExtensions: function(bq) {
                    ax = bq
                },
                addDownloadExtensions: function(bq) {
                    ax += "|" + bq
                },
                setDomains: function(bq) {
                    aR = k(bq) ? [bq] : bq;
                    aR.push(a8)
                },
                setIgnoreClasses: function(bq) {
                    Y = k(bq) ? [bq] : bq
                },
                setRequestMethod: function(bq) {
                    aT = bq || "GET"
                },
                setReferrerUrl: function(bq) {
                    aV = bq
                },
                setCustomUrl: function(bq) {
                    aF = a7(bn, bq)
                },
                setDocumentTitle: function(bq) {
                    av = bq
                },
                setAPIUrl: function(bq) {
                    ak = bq
                },
                setDownloadClasses: function(bq) {
                    aJ = k(bq) ? [bq] : bq
                },
                setLinkClasses: function(bq) {
                    am = k(bq) ? [bq] : bq
                },
                setCampaignNameKey: function(bq) {
                    az = k(bq) ? [bq] : bq
                },
                setCampaignKeywordKey: function(bq) {
                    au = k(bq) ? [bq] : bq
                },
                discardHashTag: function(bq) {
                    aa = bq
                },
                setCookieNamePrefix: function(bq) {
                    bl = bq;
                    X = ah()
                },
                setCookieDomain: function(bq) {
                    af = u(bq);
                    aM()
                },
                setCookiePath: function(bq) {
                    bm = bq;
                    aM()
                },
                setVisitorCookieTimeout: function(bq) {
                    aj = bq * 1000
                },
                setSessionCookieTimeout: function(bq) {
                    al = bq * 1000
                },
                setReferralCookieTimeout: function(bq) {
                    aG = bq * 1000
                },
                setConversionAttributionFirstReferrer: function(bq) {
                    aE = bq
                },
                disableCookies: function() {
                    ad = true;
                    be.cookie = "0"
                },
                deleteCookies: function() {
                    Q()
                },
                setDoNotTrack: function(br) {
                    var bq = d.doNotTrack || d.msDoNotTrack;
                    bg = br && (bq === "yes" || bq === "1");
                    if (bg) {
                        this.disableCookies()
                    }
                },
                addListener: function(br, bq) {
                    aZ(br, bq)
                },
                enableLinkTracking: function(bq) {
                    if (m) {
                        aH(bq)
                    } else {
                        z.push(function() {
                            aH(bq)
                        })
                    }
                },
                disablePerformanceTracking: function() {
                    aC = false
                },
                setGenerationTimeMs: function(bq) {
                    aq = parseInt(bq, 10)
                },
                setHeartBeatTimer: function(bs, br) {
                    var bq = new Date();
                    Z = bq.getTime() + bs * 1000;
                    ao = br * 1000
                },
                killFrame: function() {
                    if (B.location !== B.top.location) {
                        B.top.location = B.location
                    }
                },
                redirectFile: function(bq) {
                    if (B.location.protocol === "file:") {
                        B.location = bq
                    }
                },
                setCountPreRendered: function(bq) {
                    aB = bq
                },
                trackGoal: function(bq, bs, br) {
                    ar(function() {
                        aN(bq, bs, br)
                    })
                },
                trackLink: function(br, bq, bs) {
                    ar(function() {
                        ba(br, bq, bs)
                    })
                },
                trackPageView: function(bq, br) {
                    if (w(bd)) {
                        ar(function() {
                            G(T, ak, bd)
                        })
                    } else {
                        ar(function() {
                            aI(bq, br)
                        })
                    }
                },
                trackEvent: function(br, bt, bq, bs) {
                    ar(function() {
                        ab(br, bt, bq, bs)
                    })
                },
                trackSiteSearch: function(bq, bs, br) {
                    ar(function() {
                        at(bq, bs, br)
                    })
                },
                setEcommerceView: function(bt, bq, bs, br) {
                    if (!s(bs) || !bs.length) {
                        bs = ""
                    } else {
                        if (bs instanceof Array) {
                            bs = JSON2.stringify(bs)
                        }
                    }
                    aK[5] = ["_pkc", bs];
                    if (s(br) && String(br).length) {
                        aK[2] = ["_pkp", br]
                    }
                    if ((!s(bt) || !bt.length) && (!s(bq) || !bq.length)) {
                        return
                    }
                    if (s(bt) && bt.length) {
                        aK[3] = ["_pks", bt]
                    }
                    if (!s(bq) || !bq.length) {
                        bq = ""
                    }
                    aK[4] = ["_pkn", bq]
                },
                addEcommerceItem: function(bu, bq, bs, br, bt) {
                    if (bu.length) {
                        a1[bu] = [bu, bq, bs, br, bt]
                    }
                },
                trackEcommerceOrder: function(bq, bu, bt, bs, br, bv) {
                    a5(bq, bu, bt, bs, br, bv)
                },
                trackEcommerceCartUpdate: function(bq) {
                    bk(bq)
                }
            }
        }
        function r() {
            return {
                push: K
            }
        }
        O(B, "beforeunload", L, false);
        l();
        Date.prototype.getTimeAlias = Date.prototype.getTime;
        F = new y();
        for (p = 0; p < _paq.length; p++) {
            if (_paq[p][0] === "setTrackerUrl" || _paq[p][0] === "setSiteId") {
                K(_paq[p]);
                delete _paq[p]
            }
        }
        for (p = 0; p < _paq.length; p++) {
            if (_paq[p]) {
                K(_paq[p])
            }
        }
        _paq = new r();
        c = {
            addPlugin: function(P, Q) {
                a[P] = Q
            },
            getTracker: function(P, Q) {
                return new y(P,Q)
            },
            getAsyncTracker: function() {
                return F
            }
        };
        if (typeof define === "function" && define.amd) {
            define("piwik", [], function() {
                return c
            })
        }
        return c
    }())
}
if (typeof piwik_log !== "function") {
    piwik_log = function(b, f, d, g) {
        function a(h) {
            try {
                return eval("piwik_" + h)
            } catch (i) {}
            return
        }
        var c, e = Piwik.getTracker(d, f);
        e.setDocumentTitle(b);
        e.setCustomData(g);
        c = a("tracker_pause");
        if (c) {
            e.setLinkTrackingTimer(c)
        }
        c = a("download_extensions");
        if (c) {
            e.setDownloadExtensions(c)
        }
        c = a("hosts_alias");
        if (c) {
            e.setDomains(c)
        }
        c = a("ignore_classes");
        if (c) {
            e.setIgnoreClasses(c)
        }
        e.trackPageView();
        if (a("install_tracker")) {
            piwik_track = function(i, k, j, h) {
                e.setSiteId(k);
                e.setTrackerUrl(j);
                e.trackLink(i, h)
            }
            ;
            e.enableLinkTracking()
        }
    }
}
;