/**
 * @module       TouchSwipe
 * @see          https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @license      MIT
 * @version      1.6.18
 */
!(function(e) {
  "function" == typeof define && define.amd && define.amd.jQuery
    ? define(["jquery"], e)
    : e(
        "undefined" != typeof module && module.exports
          ? require("jquery")
          : jQuery
      );
})(function(e) {
  "use strict";
  function n(n) {
    return (
      !n ||
        void 0 !== n.allowPageScroll ||
        (void 0 === n.swipe && void 0 === n.swipeStatus) ||
        (n.allowPageScroll = c),
      void 0 !== n.click && void 0 === n.tap && (n.tap = n.click),
      n || (n = {}),
      (n = e.extend({}, e.fn.swipe.defaults, n)),
      this.each(function() {
        var r = e(this),
          i = r.data(D);
        i || ((i = new t(this, n)), r.data(D, i));
      })
    );
  }
  function t(n, t) {
    function P(n) {
      if (!(ce() || e(n.target).closest(t.excludedElements, Ve).length > 0)) {
        var r = n.originalEvent ? n.originalEvent : n;
        if (
          !r.pointerType ||
          "mouse" != r.pointerType ||
          0 != t.fallbackToMouseEvents
        ) {
          var i,
            l = r.touches,
            o = l ? l[0] : r;
          return (
            (We = y),
            l
              ? (ze = l.length)
              : !1 !== t.preventDefaultEvents && n.preventDefault(),
            (je = 0),
            (Ne = null),
            (He = null),
            (Xe = null),
            (_e = 0),
            (qe = 0),
            (Qe = 0),
            (Ce = 1),
            (Fe = 0),
            (Ye = we()),
            ue(),
            pe(0, o),
            !l || ze === t.fingers || t.fingers === T || X()
              ? ((Ze = Oe()),
                2 == ze &&
                  (pe(1, l[1]), (qe = Qe = be(Ge[0].start, Ge[1].start))),
                (t.swipeStatus || t.pinchStatus) && (i = j(r, We)))
              : (i = !1),
            !1 === i
              ? ((We = x), j(r, We), i)
              : (t.hold &&
                  (nn = setTimeout(
                    e.proxy(function() {
                      Ve.trigger("hold", [r.target]),
                        t.hold && (i = t.hold.call(Ve, r, r.target));
                    }, this),
                    t.longTapThreshold
                  )),
                se(!0),
                null)
          );
        }
      }
    }
    function L(e) {
      var n = e.originalEvent ? e.originalEvent : e;
      if (We !== m && We !== x && !ae()) {
        var r,
          i = n.touches,
          l = fe(i ? i[0] : n);
        if (
          ((Be = Oe()),
          i && (ze = i.length),
          t.hold && clearTimeout(nn),
          (We = E),
          2 == ze &&
            (0 == qe
              ? (pe(1, i[1]), (qe = Qe = be(Ge[0].start, Ge[1].start)))
              : (fe(i[1]),
                (Qe = be(Ge[0].end, Ge[1].end)),
                (Xe = Ee(Ge[0].end, Ge[1].end))),
            (Ce = ye(qe, Qe)),
            (Fe = Math.abs(qe - Qe))),
          ze === t.fingers || t.fingers === T || !i || X())
        ) {
          if (
            ((Ne = Se(l.start, l.end)),
            (He = Se(l.last, l.end)),
            C(e, He),
            (je = me(l.start, l.end)),
            (_e = Te()),
            de(Ne, je),
            (r = j(n, We)),
            !t.triggerOnTouchEnd || t.triggerOnTouchLeave)
          ) {
            var o = !0;
            if (t.triggerOnTouchLeave) {
              var u = Me(this);
              o = De(l.end, u);
            }
            !t.triggerOnTouchEnd && o
              ? (We = U(E))
              : t.triggerOnTouchLeave && !o && (We = U(m)),
              (We != x && We != m) || j(n, We);
          }
        } else (We = x), j(n, We);
        !1 === r && ((We = x), j(n, We));
      }
    }
    function R(e) {
      var n = e.originalEvent ? e.originalEvent : e,
        r = n.touches;
      if (r) {
        if (r.length && !ae()) return oe(n), !0;
        if (r.length && ae()) return !0;
      }
      return (
        ae() && (ze = Ke),
        (Be = Oe()),
        (_e = Te()),
        _() || !H()
          ? ((We = x), j(n, We))
          : t.triggerOnTouchEnd || (!1 === t.triggerOnTouchEnd && We === E)
          ? (!1 !== t.preventDefaultEvents &&
              !1 !== e.cancelable &&
              e.preventDefault(),
            (We = m),
            j(n, We))
          : !t.triggerOnTouchEnd && B()
          ? ((We = m), N(n, We, h))
          : We === E && ((We = x), j(n, We)),
        se(!1),
        null
      );
    }
    function k() {
      (ze = 0), (Be = 0), (Ze = 0), (qe = 0), (Qe = 0), (Ce = 1), ue(), se(!1);
    }
    function A(e) {
      var n = e.originalEvent ? e.originalEvent : e;
      t.triggerOnTouchLeave && ((We = U(m)), j(n, We));
    }
    function I() {
      Ve.unbind(Re, P),
        Ve.unbind(Ue, k),
        Ve.unbind(ke, L),
        Ve.unbind(Ae, R),
        Ie && Ve.unbind(Ie, A),
        se(!1);
    }
    function U(e) {
      var n = e,
        r = Q(),
        i = H(),
        l = _();
      return (
        !r || l
          ? (n = x)
          : !i || e != E || (t.triggerOnTouchEnd && !t.triggerOnTouchLeave)
          ? !i && e == m && t.triggerOnTouchLeave && (n = x)
          : (n = m),
        n
      );
    }
    function j(e, n) {
      var t,
        r = e.touches;
      return (
        (z() || W()) && (t = N(e, n, p)),
        (Y() || X()) && !1 !== t && (t = N(e, n, f)),
        ie() && !1 !== t
          ? (t = N(e, n, d))
          : le() && !1 !== t
          ? (t = N(e, n, g))
          : re() && !1 !== t && (t = N(e, n, h)),
        n === x && k(e),
        n === m && (r ? r.length || k(e) : k(e)),
        t
      );
    }
    function N(n, c, s) {
      var w;
      if (s == p) {
        if (
          (Ve.trigger("swipeStatus", [
            c,
            Ne || null,
            je || 0,
            _e || 0,
            ze,
            Ge,
            He
          ]),
          t.swipeStatus &&
            !1 ===
              (w = t.swipeStatus.call(
                Ve,
                n,
                c,
                Ne || null,
                je || 0,
                _e || 0,
                ze,
                Ge,
                He
              )))
        )
          return !1;
        if (c == m && V()) {
          if (
            (clearTimeout(en),
            clearTimeout(nn),
            Ve.trigger("swipe", [Ne, je, _e, ze, Ge, He]),
            t.swipe && !1 === (w = t.swipe.call(Ve, n, Ne, je, _e, ze, Ge, He)))
          )
            return !1;
          switch (Ne) {
            case r:
              Ve.trigger("swipeLeft", [Ne, je, _e, ze, Ge, He]),
                t.swipeLeft &&
                  (w = t.swipeLeft.call(Ve, n, Ne, je, _e, ze, Ge, He));
              break;
            case i:
              Ve.trigger("swipeRight", [Ne, je, _e, ze, Ge, He]),
                t.swipeRight &&
                  (w = t.swipeRight.call(Ve, n, Ne, je, _e, ze, Ge, He));
              break;
            case l:
              Ve.trigger("swipeUp", [Ne, je, _e, ze, Ge, He]),
                t.swipeUp &&
                  (w = t.swipeUp.call(Ve, n, Ne, je, _e, ze, Ge, He));
              break;
            case o:
              Ve.trigger("swipeDown", [Ne, je, _e, ze, Ge, He]),
                t.swipeDown &&
                  (w = t.swipeDown.call(Ve, n, Ne, je, _e, ze, Ge, He));
          }
        }
      }
      if (s == f) {
        if (
          (Ve.trigger("pinchStatus", [
            c,
            Xe || null,
            Fe || 0,
            _e || 0,
            ze,
            Ce,
            Ge
          ]),
          t.pinchStatus &&
            !1 ===
              (w = t.pinchStatus.call(
                Ve,
                n,
                c,
                Xe || null,
                Fe || 0,
                _e || 0,
                ze,
                Ce,
                Ge
              )))
        )
          return !1;
        if (c == m && F())
          switch (Xe) {
            case u:
              Ve.trigger("pinchIn", [Xe || null, Fe || 0, _e || 0, ze, Ce, Ge]),
                t.pinchIn &&
                  (w = t.pinchIn.call(
                    Ve,
                    n,
                    Xe || null,
                    Fe || 0,
                    _e || 0,
                    ze,
                    Ce,
                    Ge
                  ));
              break;
            case a:
              Ve.trigger("pinchOut", [
                Xe || null,
                Fe || 0,
                _e || 0,
                ze,
                Ce,
                Ge
              ]),
                t.pinchOut &&
                  (w = t.pinchOut.call(
                    Ve,
                    n,
                    Xe || null,
                    Fe || 0,
                    _e || 0,
                    ze,
                    Ce,
                    Ge
                  ));
          }
      }
      return (
        s == h
          ? (c !== x && c !== m) ||
            (clearTimeout(en),
            clearTimeout(nn),
            J() && !ee()
              ? (($e = Oe()),
                (en = setTimeout(
                  e.proxy(function() {
                    ($e = null),
                      Ve.trigger("tap", [n.target]),
                      t.tap && (w = t.tap.call(Ve, n, n.target));
                  }, this),
                  t.doubleTapThreshold
                )))
              : (($e = null),
                Ve.trigger("tap", [n.target]),
                t.tap && (w = t.tap.call(Ve, n, n.target))))
          : s == d
          ? (c !== x && c !== m) ||
            (clearTimeout(en),
            clearTimeout(nn),
            ($e = null),
            Ve.trigger("doubletap", [n.target]),
            t.doubleTap && (w = t.doubleTap.call(Ve, n, n.target)))
          : s == g &&
            ((c !== x && c !== m) ||
              (clearTimeout(en),
              ($e = null),
              Ve.trigger("longtap", [n.target]),
              t.longTap && (w = t.longTap.call(Ve, n, n.target)))),
        w
      );
    }
    function H() {
      var e = !0;
      return null !== t.threshold && (e = je >= t.threshold), e;
    }
    function _() {
      var e = !1;
      return (
        null !== t.cancelThreshold &&
          null !== Ne &&
          (e = ge(Ne) - je >= t.cancelThreshold),
        e
      );
    }
    function q() {
      return null === t.pinchThreshold || Fe >= t.pinchThreshold;
    }
    function Q() {
      return !(t.maxTimeThreshold && _e >= t.maxTimeThreshold);
    }
    function C(e, n) {
      if (!1 !== t.preventDefaultEvents)
        if (t.allowPageScroll === c) e.preventDefault();
        else {
          var u = t.allowPageScroll === s;
          switch (n) {
            case r:
              ((t.swipeLeft && u) || (!u && t.allowPageScroll != w)) &&
                e.preventDefault();
              break;
            case i:
              ((t.swipeRight && u) || (!u && t.allowPageScroll != w)) &&
                e.preventDefault();
              break;
            case l:
              ((t.swipeUp && u) || (!u && t.allowPageScroll != v)) &&
                e.preventDefault();
              break;
            case o:
              ((t.swipeDown && u) || (!u && t.allowPageScroll != v)) &&
                e.preventDefault();
          }
        }
    }
    function F() {
      var e = G(),
        n = Z(),
        t = q();
      return e && n && t;
    }
    function X() {
      return !!(t.pinchStatus || t.pinchIn || t.pinchOut);
    }
    function Y() {
      return !(!F() || !X());
    }
    function V() {
      var e = Q(),
        n = H(),
        t = G(),
        r = Z();
      return !_() && r && t && n && e;
    }
    function W() {
      return !!(
        t.swipe ||
        t.swipeStatus ||
        t.swipeLeft ||
        t.swipeRight ||
        t.swipeUp ||
        t.swipeDown
      );
    }
    function z() {
      return !(!V() || !W());
    }
    function G() {
      return ze === t.fingers || t.fingers === T || !S;
    }
    function Z() {
      return 0 !== Ge[0].end.x;
    }
    function B() {
      return !!t.tap;
    }
    function J() {
      return !!t.doubleTap;
    }
    function K() {
      return !!t.longTap;
    }
    function $() {
      if (null == $e) return !1;
      var e = Oe();
      return J() && e - $e <= t.doubleTapThreshold;
    }
    function ee() {
      return $();
    }
    function ne() {
      return (1 === ze || !S) && (isNaN(je) || je < t.threshold);
    }
    function te() {
      return _e > t.longTapThreshold && je < b;
    }
    function re() {
      return !(!ne() || !B());
    }
    function ie() {
      return !(!$() || !J());
    }
    function le() {
      return !(!te() || !K());
    }
    function oe(e) {
      (Je = Oe()), (Ke = e.touches.length + 1);
    }
    function ue() {
      (Je = 0), (Ke = 0);
    }
    function ae() {
      var e = !1;
      return Je && Oe() - Je <= t.fingerReleaseThreshold && (e = !0), e;
    }
    function ce() {
      return !(!0 !== Ve.data(D + "_intouch"));
    }
    function se(e) {
      Ve &&
        (!0 === e
          ? (Ve.bind(ke, L), Ve.bind(Ae, R), Ie && Ve.bind(Ie, A))
          : (Ve.unbind(ke, L, !1),
            Ve.unbind(Ae, R, !1),
            Ie && Ve.unbind(Ie, A, !1)),
        Ve.data(D + "_intouch", !0 === e));
    }
    function pe(e, n) {
      var t = {
        start: { x: 0, y: 0 },
        last: { x: 0, y: 0 },
        end: { x: 0, y: 0 }
      };
      return (
        (t.start.x = t.last.x = t.end.x = n.pageX || n.clientX),
        (t.start.y = t.last.y = t.end.y = n.pageY || n.clientY),
        (Ge[e] = t),
        t
      );
    }
    function fe(e) {
      var n = void 0 !== e.identifier ? e.identifier : 0,
        t = he(n);
      return (
        null === t && (t = pe(n, e)),
        (t.last.x = t.end.x),
        (t.last.y = t.end.y),
        (t.end.x = e.pageX || e.clientX),
        (t.end.y = e.pageY || e.clientY),
        t
      );
    }
    function he(e) {
      return Ge[e] || null;
    }
    function de(e, n) {
      e != c && ((n = Math.max(n, ge(e))), (Ye[e].distance = n));
    }
    function ge(e) {
      if (Ye[e]) return Ye[e].distance;
    }
    function we() {
      var e = {};
      return (e[r] = ve(r)), (e[i] = ve(i)), (e[l] = ve(l)), (e[o] = ve(o)), e;
    }
    function ve(e) {
      return { direction: e, distance: 0 };
    }
    function Te() {
      return Be - Ze;
    }
    function be(e, n) {
      var t = Math.abs(e.x - n.x),
        r = Math.abs(e.y - n.y);
      return Math.round(Math.sqrt(t * t + r * r));
    }
    function ye(e, n) {
      return ((n / e) * 1).toFixed(2);
    }
    function Ee() {
      return Ce < 1 ? a : u;
    }
    function me(e, n) {
      return Math.round(
        Math.sqrt(Math.pow(n.x - e.x, 2) + Math.pow(n.y - e.y, 2))
      );
    }
    function xe(e, n) {
      var t = e.x - n.x,
        r = n.y - e.y,
        i = Math.atan2(r, t),
        l = Math.round((180 * i) / Math.PI);
      return l < 0 && (l = 360 - Math.abs(l)), l;
    }
    function Se(e, n) {
      if (Pe(e, n)) return c;
      var t = xe(e, n);
      return t <= 45 && t >= 0
        ? r
        : t <= 360 && t >= 315
        ? r
        : t >= 135 && t <= 225
        ? i
        : t > 45 && t < 135
        ? o
        : l;
    }
    function Oe() {
      return new Date().getTime();
    }
    function Me(n) {
      var t = (n = e(n)).offset();
      return {
        left: t.left,
        right: t.left + n.outerWidth(),
        top: t.top,
        bottom: t.top + n.outerHeight()
      };
    }
    function De(e, n) {
      return e.x > n.left && e.x < n.right && e.y > n.top && e.y < n.bottom;
    }
    function Pe(e, n) {
      return e.x == n.x && e.y == n.y;
    }
    var t = e.extend({}, t),
      Le = S || M || !t.fallbackToMouseEvents,
      Re = Le
        ? M
          ? O
            ? "MSPointerDown"
            : "pointerdown"
          : "touchstart"
        : "mousedown",
      ke = Le
        ? M
          ? O
            ? "MSPointerMove"
            : "pointermove"
          : "touchmove"
        : "mousemove",
      Ae = Le
        ? M
          ? O
            ? "MSPointerUp"
            : "pointerup"
          : "touchend"
        : "mouseup",
      Ie = Le ? (M ? "mouseleave" : null) : "mouseleave",
      Ue = M ? (O ? "MSPointerCancel" : "pointercancel") : "touchcancel",
      je = 0,
      Ne = null,
      He = null,
      _e = 0,
      qe = 0,
      Qe = 0,
      Ce = 1,
      Fe = 0,
      Xe = 0,
      Ye = null,
      Ve = e(n),
      We = "start",
      ze = 0,
      Ge = {},
      Ze = 0,
      Be = 0,
      Je = 0,
      Ke = 0,
      $e = 0,
      en = null,
      nn = null;
    try {
      Ve.bind(Re, P), Ve.bind(Ue, k);
    } catch (n) {
      e.error("events not supported " + Re + "," + Ue + " on jQuery.swipe");
    }
    (this.enable = function() {
      return this.disable(), Ve.bind(Re, P), Ve.bind(Ue, k), Ve;
    }),
      (this.disable = function() {
        return I(), Ve;
      }),
      (this.destroy = function() {
        I(), Ve.data(D, null), (Ve = null);
      }),
      (this.option = function(n, r) {
        if ("object" == typeof n) t = e.extend(t, n);
        else if (void 0 !== t[n]) {
          if (void 0 === r) return t[n];
          t[n] = r;
        } else {
          if (!n) return t;
          e.error("Option " + n + " does not exist on jQuery.swipe.options");
        }
        return null;
      });
  }
  var r = "left",
    i = "right",
    l = "up",
    o = "down",
    u = "in",
    a = "out",
    c = "none",
    s = "auto",
    p = "swipe",
    f = "pinch",
    h = "tap",
    d = "doubletap",
    g = "longtap",
    w = "horizontal",
    v = "vertical",
    T = "all",
    b = 10,
    y = "start",
    E = "move",
    m = "end",
    x = "cancel",
    S = "ontouchstart" in window,
    O =
      window.navigator.msPointerEnabled &&
      !window.navigator.pointerEnabled &&
      !S,
    M =
      (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) &&
      !S,
    D = "TouchSwipe",
    P = {
      fingers: 1,
      threshold: 75,
      cancelThreshold: null,
      pinchThreshold: 20,
      maxTimeThreshold: null,
      fingerReleaseThreshold: 250,
      longTapThreshold: 500,
      doubleTapThreshold: 200,
      swipe: null,
      swipeLeft: null,
      swipeRight: null,
      swipeUp: null,
      swipeDown: null,
      swipeStatus: null,
      pinchIn: null,
      pinchOut: null,
      pinchStatus: null,
      click: null,
      tap: null,
      doubleTap: null,
      longTap: null,
      hold: null,
      triggerOnTouchEnd: !0,
      triggerOnTouchLeave: !1,
      allowPageScroll: "auto",
      fallbackToMouseEvents: !0,
      excludedElements: ".noSwipe",
      preventDefaultEvents: !0
    };
  (e.fn.swipe = function(t) {
    var r = e(this),
      i = r.data(D);
    if (i && "string" == typeof t) {
      if (i[t]) return i[t].apply(i, Array.prototype.slice.call(arguments, 1));
      e.error("Method " + t + " does not exist on jQuery.swipe");
    } else if (i && "object" == typeof t) i.option.apply(i, arguments);
    else if (!(i || ("object" != typeof t && t)))
      return n.apply(this, arguments);
    return r;
  }),
    (e.fn.swipe.version = "1.6.18"),
    (e.fn.swipe.defaults = P),
    (e.fn.swipe.phases = {
      PHASE_START: y,
      PHASE_MOVE: E,
      PHASE_END: m,
      PHASE_CANCEL: x
    }),
    (e.fn.swipe.directions = {
      LEFT: r,
      RIGHT: i,
      UP: l,
      DOWN: o,
      IN: u,
      OUT: a
    }),
    (e.fn.swipe.pageScroll = { NONE: c, HORIZONTAL: w, VERTICAL: v, AUTO: s }),
    (e.fn.swipe.fingers = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      ALL: T
    });
});
