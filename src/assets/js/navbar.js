/**
 * @module       RD Navbar
 * @author       Evgeniy Gusarov
 * @see          https://ua.linkedin.com/pub/evgeniy-gusarov/8a/a40/54a
 * @version      2.2.5
 */
(function() {
  var t;
  (t = "ontouchstart" in window),
    (function(e, n, o) {
      var a;
      (a = (function() {
        function a(t, a) {
          (this.options = e.extend(!0, {}, this.Defaults, a)),
            (this.$element = e(t)),
            (this.$clone = null),
            (this.$win = e(o)),
            (this.$doc = e(n)),
            (this.currentLayout = this.options.layout),
            (this.loaded = !1),
            (this.focusOnHover = this.options.focusOnHover),
            (this.focusTimer = !1),
            (this.cloneTimer = !1),
            (this.isStuck = !1),
            this.initialize();
        }
        return (
          (a.prototype.Defaults = {
            layout: "rd-navbar-static",
            deviceLayout: "rd-navbar-fixed",
            focusOnHover: !0,
            focusOnHoverTimeout: 800,
            linkedElements: ["html"],
            domAppend: !0,
            stickUp: !0,
            stickUpClone: !0,
            stickUpOffset: "100%",
            anchorNav: !0,
            anchorNavSpeed: 400,
            anchorNavOffset: 0,
            anchorNavEasing: "swing",
            autoHeight: !0,
            responsive: {
              0: {
                layout: "rd-navbar-fixed",
                deviceLayout: "rd-navbar-fixed",
                focusOnHover: !1,
                stickUp: !1
              },
              992: {
                layout: "rd-navbar-static",
                deviceLayout: "rd-navbar-static",
                focusOnHover: !0,
                stickUp: !0
              }
            },
            callbacks: {
              onToggleSwitch: !1,
              onToggleClose: !1,
              onDomAppend: !1,
              onDropdownOver: !1,
              onDropdownOut: !1,
              onDropdownToggle: !1,
              onDropdownClose: !1,
              onStuck: !1,
              onUnstuck: !1,
              onAnchorChange: !1
            }
          }),
          (a.prototype.initialize = function() {
            var e;
            return (
              (e = this).$element
                .addClass("rd-navbar")
                .addClass(e.options.layout),
              t && e.$element.addClass("rd-navbar--is-touch"),
              e.options.domAppend && e.createNav(e),
              e.options.stickUpClone && e.createClone(e),
              e.$element.addClass("rd-navbar-original"),
              e.addAdditionalClassToToggles(
                e,
                ".rd-navbar-original",
                "toggle-original",
                "toggle-original-elements"
              ),
              e.applyHandlers(e),
              (e.offset = e.$element.offset().top),
              (e.height = e.$element.outerHeight()),
              (e.loaded = !0),
              e
            );
          }),
          (a.prototype.resize = function(n, o) {
            var a, s;
            return (
              (s = t ? n.getOption("deviceLayout") : n.getOption("layout")),
              (a = n.$element.add(n.$clone)),
              (s === n.currentLayout && n.loaded) ||
                (n.switchClass(a, n.currentLayout, s),
                null != n.options.linkedElements &&
                  e.grep(n.options.linkedElements, function(t, e) {
                    return n.switchClass(
                      t,
                      n.currentLayout + "-linked",
                      s + "-linked"
                    );
                  }),
                (n.currentLayout = s)),
              (n.focusOnHover = n.getOption("focusOnHover")),
              n
            );
          }),
          (a.prototype.stickUp = function(t, n) {
            var o, a, s, r, i;
            return (
              (a = t.getOption("stickUp")),
              (e("html").hasClass("ios") ||
                t.$element.hasClass("rd-navbar-fixed")) &&
                (a = !1),
              (o = t.$doc.scrollTop()),
              (r = null != t.$clone ? t.$clone : t.$element),
              (s = t.getOption("stickUpOffset")),
              (i =
                "string" == typeof s
                  ? s.indexOf("%") > 0
                    ? (parseFloat(s) * t.height) / 100
                    : parseFloat(s)
                  : s),
              a
                ? ((o >= i && !t.isStuck) || (o < i && t.isStuck)) &&
                  (t.$element
                    .add(t.$clone)
                    .find("[data-rd-navbar-toggle]")
                    .each(function() {
                      e.proxy(t.closeToggle, this)(t, !1);
                    })
                    .end()
                    .find(".rd-navbar-submenu")
                    .removeClass("opened")
                    .removeClass("focus"),
                  o >= i &&
                  !t.isStuck &&
                  !t.$element.hasClass("rd-navbar-fixed")
                    ? (t.options.callbacks.onStuck &&
                        t.options.callbacks.onStuck.call(t),
                      setTimeout(
                        function() {
                          "resize" === n.type
                            ? t.switchClass(r, "", "rd-navbar--is-stuck")
                            : r.addClass("rd-navbar--is-stuck"),
                            (t.isStuck = !0);
                        },
                        navigator.platform.match(/(Mac)/i) ? 10 : 0
                      ))
                    : ("resize" === n.type
                        ? t.switchClass(r, "rd-navbar--is-stuck", "")
                        : r
                            .removeClass("rd-navbar--is-stuck")
                            .one(
                              "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
                              e.proxy(t.resizeWrap, t, n)
                            ),
                      (t.isStuck = !1),
                      t.options.callbacks.onUnstuck &&
                        t.options.callbacks.onUnstuck.call(t)))
                : (t.$element
                    .find(".rd-navbar-submenu")
                    .removeClass("opened")
                    .removeClass("focus"),
                  t.isStuck &&
                    (t.switchClass(r, "rd-navbar--is-stuck", ""),
                    (t.isStuck = !1),
                    t.resizeWrap(n))),
              t
            );
          }),
          (a.prototype.resizeWrap = function(t) {
            var e, n;
            if (null == (n = this).$clone && !n.isStuck)
              return (
                (e = n.$element.parent()),
                n.getOption("autoHeight")
                  ? ((n.height = n.$element.outerHeight()),
                    "resize" === t.type
                      ? (e
                          .addClass("rd-navbar--no-transition")
                          .css("height", n.height),
                        e[0].offsetHeight,
                        e.removeClass("rd-navbar--no-transition"))
                      : e.css("height", n.height))
                  : void e.css("height", "auto")
              );
          }),
          (a.prototype.createNav = function(t) {
            return (
              t.$element
                .find(".rd-navbar-dropdown, .rd-navbar-megamenu")
                .each(function() {
                  var t;
                  return (
                    (t = e(this)),
                    this.getBoundingClientRect(),
                    t.hasClass("rd-navbar-megamenu")
                      ? t.parent().addClass("rd-navbar--has-megamenu")
                      : t.parent().addClass("rd-navbar--has-dropdown")
                  );
                })
                .parents("li")
                .addClass("rd-navbar-submenu"),
              e('<span class="rd-navbar-submenu-toggle"></span>').insertAfter(
                t.$element.find(".rd-navbar-nav li.rd-navbar-submenu > a")
              ),
              t.options.callbacks.onDomAppend &&
                t.options.callbacks.onDomAppend.call(this),
              t
            );
          }),
          (a.prototype.createClone = function(t) {
            return (
              (t.$clone = t.$element
                .clone()
                .insertAfter(t.$element)
                .addClass("rd-navbar--is-clone")),
              t.addAdditionalClassToToggles(
                t,
                ".rd-navbar--is-clone",
                "toggle-cloned",
                "toggle-cloned-elements"
              ),
              t
            );
          }),
          (a.prototype.closeToggle = function(t, n) {
            var o, a, s, r, i, l, c;
            return (
              (a = e(n.target)),
              (i = !1),
              (l = this.getAttribute("data-rd-navbar-toggle")),
              t.options.stickUpClone && t.isStuck
                ? ((r = ".toggle-cloned"),
                  (s = ".toggle-cloned-elements"),
                  (c = !a.hasClass("toggle-cloned")))
                : ((r = ".toggle-original"),
                  (s = ".toggle-original-elements"),
                  (c = !a.hasClass("toggle-original"))),
              n.target !== this &&
                !a.parents(r + "[data-rd-navbar-toggle]").length &&
                !a.parents(s).length &&
                l &&
                c &&
                ((o = t.$element.find(l).add(e(this))).each(function() {
                  if (!i)
                    return (i =
                      !0 === (n.target === this || e.contains(this, n.target)));
                }),
                i ||
                  (o.add(this).removeClass("active"),
                  t.options.callbacks.onToggleClose &&
                    t.options.callbacks.onToggleClose.call(this, t))),
              this
            );
          }),
          (a.prototype.switchToggle = function(t, n) {
            var o, a;
            return (
              n.preventDefault(),
              e(this).hasClass("toggle-cloned")
                ? (".rd-navbar--is-clone", (o = ".toggle-cloned-elements"))
                : (".rd-navbar-original", (o = ".toggle-original-elements")),
              (a = this.getAttribute("data-rd-navbar-toggle")) &&
                (t.$element
                  .find("[data-rd-navbar-toggle]")
                  .not(this)
                  .each(function() {
                    var e;
                    if ((e = this.getAttribute("data-rd-navbar-toggle")))
                      return t.$element
                        .find(e + o)
                        .add(this)
                        .removeClass("active");
                  }),
                t.$element
                  .find(a + o)
                  .add(this)
                  .toggleClass("active")),
              t.options.callbacks.onToggleSwitch &&
                t.options.callbacks.onToggleSwitch.call(this, t),
              this
            );
          }),
          (a.prototype.dropdownOver = function(t, n) {
            var o;
            if (t.focusOnHover) {
              if (
                ((o = e(this)),
                clearTimeout(n),
                t.options.callbacks.onDropdownOver &&
                  !t.options.callbacks.onDropdownOver.call(this, t))
              )
                return this;
              o.addClass("focus")
                .siblings()
                .removeClass("opened")
                .each(t.dropdownUnfocus);
            }
            return this;
          }),
          (a.prototype.dropdownTouch = function(t, n) {
            var o, a;
            if (((o = e(this)), clearTimeout(n), t.focusOnHover)) {
              if (((a = !1), o.hasClass("focus") && (a = !0), !a))
                return (
                  o
                    .addClass("focus")
                    .siblings()
                    .removeClass("opened")
                    .each(t.dropdownUnfocus),
                  !1
                );
              t.options.callbacks.onDropdownOver &&
                t.options.callbacks.onDropdownOver.call(this, t);
            }
            return this;
          }),
          (a.prototype.dropdownOut = function(t, n) {
            return (
              t.focusOnHover &&
                (e(this).one("mouseenter.navbar", function() {
                  return clearTimeout(n);
                }),
                t.options.callbacks.onDropdownOut &&
                  t.options.callbacks.onDropdownOut.call(this, t),
                clearTimeout(n),
                (n = setTimeout(
                  e.proxy(t.dropdownUnfocus, this, t),
                  t.options.focusOnHoverTimeout
                ))),
              this
            );
          }),
          (a.prototype.dropdownUnfocus = function(t) {
            return (
              e(this)
                .find("li.focus")
                .add(this)
                .removeClass("focus"),
              this
            );
          }),
          (a.prototype.dropdownClose = function(t, n) {
            return (
              n.target === this ||
                e(n.target).parents(".rd-navbar-submenu").length ||
                (e(this)
                  .find("li.focus")
                  .add(this)
                  .removeClass("focus")
                  .removeClass("opened"),
                t.options.callbacks.onDropdownClose &&
                  t.options.callbacks.onDropdownClose.call(this, t)),
              this
            );
          }),
          (a.prototype.dropdownToggle = function(t) {
            return (
              e(this)
                .toggleClass("opened")
                .siblings()
                .removeClass("opened"),
              t.options.callbacks.onDropdownToggle &&
                t.options.callbacks.onDropdownToggle.call(this, t),
              this
            );
          }),
          (a.prototype.goToAnchor = function(t, n) {
            var o, a;
            return (
              (a = this.hash),
              (o = e(a)),
              !!t.getOption("anchorNav") &&
                (o.length &&
                  (n.preventDefault(),
                  e("html, body")
                    .stop()
                    .animate(
                      {
                        scrollTop:
                          o.offset().top + t.getOption("anchorNavOffset") + 1
                      },
                      t.getOption("anchorNavSpeed"),
                      t.getOption("anchorNavEasing"),
                      function() {
                        return t.changeAnchor(a);
                      }
                    )),
                this)
            );
          }),
          (a.prototype.activateAnchor = function(t) {
            var n, o, a, s, r, i, l, c, d, p, u, h;
            if (
              ((s = this),
              (u = s.$doc.scrollTop()),
              (h = s.$win.height()),
              (r = s.$doc.height()),
              (p = s.getOption("anchorNavOffset")),
              !s.options.anchorNav)
            )
              return !1;
            if (u + h > r - 50)
              return (
                (n = e('[data-type="anchor"]').last()).length &&
                  n.offset().top >= u &&
                  ((i = "#" + n.attr("id")),
                  (o = e(
                    '.rd-navbar-nav a[href^="' + i + '"]'
                  ).parent()).hasClass("active") ||
                    (o
                      .addClass("active")
                      .siblings()
                      .removeClass("active"),
                    s.options.callbacks.onAnchorChange &&
                      s.options.callbacks.onAnchorChange.call(n[0], s))),
                n
              );
            d = e('.rd-navbar-nav a[href^="#"]').get();
            for (l in d)
              (c = d[l]),
                (i = (a = e(c)).attr("href")),
                (n = e(i)).length &&
                  n.offset().top + p <= u &&
                  n.offset().top + n.outerHeight() > u &&
                  (a
                    .parent()
                    .addClass("active")
                    .siblings()
                    .removeClass("active"),
                  s.options.callbacks.onAnchorChange &&
                    s.options.callbacks.onAnchorChange.call(n[0], s));
            return null;
          }),
          (a.prototype.getAnchor = function() {
            return history && history.state ? history.state.id : null;
          }),
          (a.prototype.changeAnchor = function(t) {
            return (
              history &&
                (history.state && history.state.id !== t
                  ? history.replaceState({ anchorId: t }, null, t)
                  : history.pushState({ anchorId: t }, null, t)),
              this
            );
          }),
          (a.prototype.applyHandlers = function(t) {
            return (
              null != t.options.responsive &&
                t.$win
                  .on("resize.navbar", e.proxy(t.resize, t.$win[0], t))
                  .on("resize.navbar", e.proxy(t.resizeWrap, t))
                  .on(
                    "resize.navbar",
                    e.proxy(
                      t.stickUp,
                      null != t.$clone ? t.$clone : t.$element,
                      t
                    )
                  )
                  .on(
                    "orientationchange.navbar",
                    e.proxy(t.resize, t.$win[0], t)
                  )
                  .trigger("resize.navbar"),
              t.$doc
                .on(
                  "scroll.navbar",
                  e.proxy(
                    t.stickUp,
                    null != t.$clone ? t.$clone : t.$element,
                    t
                  )
                )
                .on("scroll.navbar", e.proxy(t.activateAnchor, t)),
              t.$element
                .add(t.$clone)
                .find("[data-rd-navbar-toggle]")
                .each(function() {
                  var n;
                  return (
                    (n = e(this)).on("click", e.proxy(t.switchToggle, this, t)),
                    n
                      .parents("body")
                      .on("click", e.proxy(t.closeToggle, this, t))
                  );
                }),
              t.$element
                .add(t.$clone)
                .find(".rd-navbar-submenu")
                .each(function() {
                  var n, o;
                  return (
                    (n = e(this)),
                    (o = n.parents(".rd-navbar--is-clone").length
                      ? t.cloneTimer
                      : t.focusTimer),
                    n.on(
                      "mouseleave.navbar",
                      e.proxy(t.dropdownOut, this, t, o)
                    ),
                    n
                      .find("> a")
                      .on(
                        "mouseenter.navbar",
                        e.proxy(t.dropdownOver, this, t, o)
                      ),
                    n
                      .find("> a")
                      .on(
                        "touchstart.navbar",
                        e.proxy(t.dropdownTouch, this, t, o)
                      ),
                    n
                      .find("> .rd-navbar-submenu-toggle")
                      .on("click", e.proxy(t.dropdownToggle, this, t)),
                    n
                      .parents("body")
                      .on("click", e.proxy(t.dropdownClose, this, t))
                  );
                }),
              t.$element
                .add(t.$clone)
                .find('.rd-navbar-nav a[href^="#"]')
                .each(function() {
                  return e(this).on("click", e.proxy(t.goToAnchor, this, t));
                }),
              t.$element
                .find(".rd-navbar-dropdown, .rd-navbar-megamenu")
                .each(function() {
                  var t, n;
                  (t = e(this)),
                    (n = this.getBoundingClientRect()).left + t.outerWidth() >=
                    o.innerWidth - 10
                      ? (this.className += " rd-navbar-open-left")
                      : n.left - t.outerWidth() <= 10 &&
                        (this.className += " rd-navbar-open-right");
                }),
              t
            );
          }),
          (a.prototype.switchClass = function(t, n, o) {
            var a;
            return (
              (a = t instanceof jQuery ? t : e(t))
                .addClass("rd-navbar--no-transition")
                .removeClass(n)
                .addClass(o),
              a[0].offsetHeight,
              a.removeClass("rd-navbar--no-transition")
            );
          }),
          (a.prototype.getOption = function(t) {
            var e, n;
            for (e in this.options.responsive) e <= o.innerWidth && (n = e);
            return null !== this.options.responsive &&
              null != this.options.responsive[n][t]
              ? this.options.responsive[n][t]
              : this.options[t];
          }),
          (a.prototype.addAdditionalClassToToggles = function(t, n, o, a) {
            return t.$element.find("[data-rd-navbar-toggle]").each(function() {
              var n;
              return (
                e(this).addClass(o),
                (n = this.getAttribute("data-rd-navbar-toggle")),
                t.$element.find(n).addClass(a)
              );
            });
          }),
          a
        );
      })()),
        e.fn.extend({
          RDNavbar: function(t) {
            var n;
            if (!(n = e(this)).data("RDNavbar"))
              return n.data("RDNavbar", new a(this, t));
          }
        }),
        (o.RDNavbar = a);
    })(window.jQuery, document, window),
    "undefined" != typeof module && null !== module
      ? (module.exports = window.RDNavbar)
      : "function" == typeof define &&
        define.amd &&
        define(["jquery"], function() {
          "use strict";
          return window.RDNavbar;
        });
}.call(this));
