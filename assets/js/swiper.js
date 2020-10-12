/**
 * @module       Swiper
 * @description  Most modern mobile touch slider and framework with hardware accelerated transitions
 * @author       Vladimir Kharlampidi
 * @see          http://www.idangero.us/swiper/
 * @licesne      MIT
 * @version      3.4.2
 */
!(function() {
  "use strict";
  var e,
    a = function(t, s) {
      function r(e) {
        return Math.floor(e);
      }
      function i() {
        var e = y.params.autoplay,
          a = y.slides.eq(y.activeIndex);
        a.attr("data-swiper-autoplay") &&
          (e = a.attr("data-swiper-autoplay") || y.params.autoplay),
          (y.autoplayTimeoutId = setTimeout(function() {
            y.params.loop
              ? (y.fixLoop(), y._slideNext(), y.emit("onAutoplay", y))
              : y.isEnd
              ? s.autoplayStopOnLast
                ? y.stopAutoplay()
                : (y._slideTo(0), y.emit("onAutoplay", y))
              : (y._slideNext(), y.emit("onAutoplay", y));
          }, e));
      }
      function n(a, t) {
        var s = e(a.target);
        if (!s.is(t))
          if ("string" == typeof t) s = s.parents(t);
          else if (t.nodeType) {
            var r;
            return (
              s.parents().each(function(e, a) {
                a === t && (r = t);
              }),
              r ? t : void 0
            );
          }
        if (0 !== s.length) return s[0];
      }
      function o(e, a) {
        a = a || {};
        var t = new (window.MutationObserver || window.WebkitMutationObserver)(
          function(e) {
            e.forEach(function(e) {
              y.onResize(!0), y.emit("onObserverUpdate", y, e);
            });
          }
        );
        t.observe(e, {
          attributes: void 0 === a.attributes || a.attributes,
          childList: void 0 === a.childList || a.childList,
          characterData: void 0 === a.characterData || a.characterData
        }),
          y.observers.push(t);
      }
      function l(e) {
        e.originalEvent && (e = e.originalEvent);
        var a = e.keyCode || e.charCode;
        if (
          !y.params.allowSwipeToNext &&
          ((y.isHorizontal() && 39 === a) || (!y.isHorizontal() && 40 === a))
        )
          return !1;
        if (
          !y.params.allowSwipeToPrev &&
          ((y.isHorizontal() && 37 === a) || (!y.isHorizontal() && 38 === a))
        )
          return !1;
        if (
          !(
            e.shiftKey ||
            e.altKey ||
            e.ctrlKey ||
            e.metaKey ||
            (document.activeElement &&
              document.activeElement.nodeName &&
              ("input" === document.activeElement.nodeName.toLowerCase() ||
                "textarea" === document.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (37 === a || 39 === a || 38 === a || 40 === a) {
            var t = !1;
            if (
              y.container.parents("." + y.params.slideClass).length > 0 &&
              0 === y.container.parents("." + y.params.slideActiveClass).length
            )
              return;
            var s = { left: window.pageXOffset, top: window.pageYOffset },
              r = window.innerWidth,
              i = window.innerHeight,
              n = y.container.offset();
            y.rtl && (n.left = n.left - y.container[0].scrollLeft);
            for (
              var o = [
                  [n.left, n.top],
                  [n.left + y.width, n.top],
                  [n.left, n.top + y.height],
                  [n.left + y.width, n.top + y.height]
                ],
                l = 0;
              l < o.length;
              l++
            ) {
              var p = o[l];
              p[0] >= s.left &&
                p[0] <= s.left + r &&
                p[1] >= s.top &&
                p[1] <= s.top + i &&
                (t = !0);
            }
            if (!t) return;
          }
          y.isHorizontal()
            ? ((37 !== a && 39 !== a) ||
                (e.preventDefault ? e.preventDefault() : (e.returnValue = !1)),
              ((39 === a && !y.rtl) || (37 === a && y.rtl)) && y.slideNext(),
              ((37 === a && !y.rtl) || (39 === a && y.rtl)) && y.slidePrev())
            : ((38 !== a && 40 !== a) ||
                (e.preventDefault ? e.preventDefault() : (e.returnValue = !1)),
              40 === a && y.slideNext(),
              38 === a && y.slidePrev()),
            y.emit("onKeyPress", y, a);
        }
      }
      function p(e) {
        var a = 0,
          t = 0,
          s = 0,
          r = 0;
        return (
          "detail" in e && (t = e.detail),
          "wheelDelta" in e && (t = -e.wheelDelta / 120),
          "wheelDeltaY" in e && (t = -e.wheelDeltaY / 120),
          "wheelDeltaX" in e && (a = -e.wheelDeltaX / 120),
          "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((a = t), (t = 0)),
          (s = 10 * a),
          (r = 10 * t),
          "deltaY" in e && (r = e.deltaY),
          "deltaX" in e && (s = e.deltaX),
          (s || r) &&
            e.deltaMode &&
            (1 === e.deltaMode
              ? ((s *= 40), (r *= 40))
              : ((s *= 800), (r *= 800))),
          s && !a && (a = s < 1 ? -1 : 1),
          r && !t && (t = r < 1 ? -1 : 1),
          { spinX: a, spinY: t, pixelX: s, pixelY: r }
        );
      }
      function d(e) {
        e.originalEvent && (e = e.originalEvent);
        var a = 0,
          t = y.rtl ? -1 : 1,
          s = p(e);
        if (y.params.mousewheelForceToAxis)
          if (y.isHorizontal()) {
            if (!(Math.abs(s.pixelX) > Math.abs(s.pixelY))) return;
            a = s.pixelX * t;
          } else {
            if (!(Math.abs(s.pixelY) > Math.abs(s.pixelX))) return;
            a = s.pixelY;
          }
        else
          a =
            Math.abs(s.pixelX) > Math.abs(s.pixelY) ? -s.pixelX * t : -s.pixelY;
        if (0 !== a) {
          if ((y.params.mousewheelInvert && (a = -a), y.params.freeMode)) {
            var r =
                y.getWrapperTranslate() + a * y.params.mousewheelSensitivity,
              i = y.isBeginning,
              n = y.isEnd;
            if (
              (r >= y.minTranslate() && (r = y.minTranslate()),
              r <= y.maxTranslate() && (r = y.maxTranslate()),
              y.setWrapperTransition(0),
              y.setWrapperTranslate(r),
              y.updateProgress(),
              y.updateActiveIndex(),
              ((!i && y.isBeginning) || (!n && y.isEnd)) && y.updateClasses(),
              y.params.freeModeSticky
                ? (clearTimeout(y.mousewheel.timeout),
                  (y.mousewheel.timeout = setTimeout(function() {
                    y.slideReset();
                  }, 300)))
                : y.params.lazyLoading && y.lazy && y.lazy.load(),
              y.emit("onScroll", y, e),
              y.params.autoplay &&
                y.params.autoplayDisableOnInteraction &&
                y.stopAutoplay(),
              0 === r || r === y.maxTranslate())
            )
              return;
          } else {
            if (new window.Date().getTime() - y.mousewheel.lastScrollTime > 60)
              if (a < 0)
                if ((y.isEnd && !y.params.loop) || y.animating) {
                  if (y.params.mousewheelReleaseOnEdges) return !0;
                } else y.slideNext(), y.emit("onScroll", y, e);
              else if ((y.isBeginning && !y.params.loop) || y.animating) {
                if (y.params.mousewheelReleaseOnEdges) return !0;
              } else y.slidePrev(), y.emit("onScroll", y, e);
            y.mousewheel.lastScrollTime = new window.Date().getTime();
          }
          return (
            e.preventDefault ? e.preventDefault() : (e.returnValue = !1), !1
          );
        }
      }
      function m(a, t) {
        a = e(a);
        var s,
          r,
          i,
          n = y.rtl ? -1 : 1;
        (s = a.attr("data-swiper-parallax") || "0"),
          (r = a.attr("data-swiper-parallax-x")),
          (i = a.attr("data-swiper-parallax-y")),
          r || i
            ? ((r = r || "0"), (i = i || "0"))
            : y.isHorizontal()
            ? ((r = s), (i = "0"))
            : ((i = s), (r = "0")),
          (r =
            r.indexOf("%") >= 0
              ? parseInt(r, 10) * t * n + "%"
              : r * t * n + "px"),
          (i = i.indexOf("%") >= 0 ? parseInt(i, 10) * t + "%" : i * t + "px"),
          a.transform("translate3d(" + r + ", " + i + ",0px)");
      }
      function u(e) {
        return (
          0 !== e.indexOf("on") &&
            (e =
              e[0] !== e[0].toUpperCase()
                ? "on" + e[0].toUpperCase() + e.substring(1)
                : "on" + e),
          e
        );
      }
      if (!(this instanceof a)) return new a(t, s);
      var c = {
          direction: "horizontal",
          touchEventsTarget: "container",
          initialSlide: 0,
          speed: 300,
          autoplay: !1,
          autoplayDisableOnInteraction: !0,
          autoplayStopOnLast: !1,
          iOSEdgeSwipeDetection: !1,
          iOSEdgeSwipeThreshold: 20,
          freeMode: !1,
          freeModeMomentum: !0,
          freeModeMomentumRatio: 1,
          freeModeMomentumBounce: !0,
          freeModeMomentumBounceRatio: 1,
          freeModeMomentumVelocityRatio: 1,
          freeModeSticky: !1,
          freeModeMinimumVelocity: 0.02,
          autoHeight: !1,
          setWrapperSize: !1,
          virtualTranslate: !1,
          effect: "slide",
          coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0
          },
          flip: { slideShadows: !0, limitRotation: !0 },
          cube: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94
          },
          fade: { crossFade: !1 },
          parallax: !1,
          zoom: !1,
          zoomMax: 3,
          zoomMin: 1,
          zoomToggle: !0,
          scrollbar: null,
          scrollbarHide: !0,
          scrollbarDraggable: !1,
          scrollbarSnapOnRelease: !1,
          keyboardControl: !1,
          mousewheelControl: !1,
          mousewheelReleaseOnEdges: !1,
          mousewheelInvert: !1,
          mousewheelForceToAxis: !1,
          mousewheelSensitivity: 1,
          mousewheelEventsTarged: "container",
          hashnav: !1,
          hashnavWatchState: !1,
          history: !1,
          replaceState: !1,
          breakpoints: void 0,
          spaceBetween: 0,
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerColumnFill: "column",
          slidesPerGroup: 1,
          centeredSlides: !1,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          roundLengths: !1,
          touchRatio: 1,
          touchAngle: 45,
          simulateTouch: !0,
          shortSwipes: !0,
          longSwipes: !0,
          longSwipesRatio: 0.5,
          longSwipesMs: 300,
          followFinger: !0,
          onlyExternal: !1,
          threshold: 0,
          touchMoveStopPropagation: !0,
          touchReleaseOnEdges: !1,
          uniqueNavElements: !0,
          pagination: null,
          paginationElement: "span",
          paginationClickable: !1,
          paginationHide: !1,
          paginationBulletRender: null,
          paginationProgressRender: null,
          paginationFractionRender: null,
          paginationCustomRender: null,
          paginationType: "bullets",
          resistance: !0,
          resistanceRatio: 0.85,
          nextButton: null,
          prevButton: null,
          watchSlidesProgress: !1,
          watchSlidesVisibility: !1,
          grabCursor: !1,
          preventClicks: !0,
          preventClicksPropagation: !0,
          slideToClickedSlide: !1,
          lazyLoading: !1,
          lazyLoadingInPrevNext: !1,
          lazyLoadingInPrevNextAmount: 1,
          lazyLoadingOnTransitionStart: !1,
          preloadImages: !0,
          updateOnImagesReady: !0,
          loop: !1,
          loopAdditionalSlides: 0,
          loopedSlides: null,
          control: void 0,
          controlInverse: !1,
          controlBy: "slide",
          normalizeSlideIndex: !0,
          allowSwipeToPrev: !0,
          allowSwipeToNext: !0,
          swipeHandler: null,
          noSwiping: !0,
          noSwipingClass: "swiper-no-swiping",
          passiveListeners: !0,
          containerModifierClass: "swiper-container-",
          slideClass: "swiper-slide",
          slideActiveClass: "swiper-slide-active",
          slideDuplicateActiveClass: "swiper-slide-duplicate-active",
          slideVisibleClass: "swiper-slide-visible",
          slideDuplicateClass: "swiper-slide-duplicate",
          slideNextClass: "swiper-slide-next",
          slideDuplicateNextClass: "swiper-slide-duplicate-next",
          slidePrevClass: "swiper-slide-prev",
          slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
          wrapperClass: "swiper-wrapper",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
          buttonDisabledClass: "swiper-button-disabled",
          paginationCurrentClass: "swiper-pagination-current",
          paginationTotalClass: "swiper-pagination-total",
          paginationHiddenClass: "swiper-pagination-hidden",
          paginationProgressbarClass: "swiper-pagination-progressbar",
          paginationClickableClass: "swiper-pagination-clickable",
          paginationModifierClass: "swiper-pagination-",
          lazyLoadingClass: "swiper-lazy",
          lazyStatusLoadingClass: "swiper-lazy-loading",
          lazyStatusLoadedClass: "swiper-lazy-loaded",
          lazyPreloaderClass: "swiper-lazy-preloader",
          notificationClass: "swiper-notification",
          preloaderClass: "preloader",
          zoomContainerClass: "swiper-zoom-container",
          observer: !1,
          observeParents: !1,
          a11y: !1,
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
          runCallbacksOnInit: !0
        },
        g = s && s.virtualTranslate;
      s = s || {};
      var h = {};
      for (var v in s)
        if (
          "object" != typeof s[v] ||
          null === s[v] ||
          s[v].nodeType ||
          s[v] === window ||
          s[v] === document ||
          ("undefined" != typeof Dom7 && s[v] instanceof Dom7) ||
          ("undefined" != typeof jQuery && s[v] instanceof jQuery)
        )
          h[v] = s[v];
        else {
          h[v] = {};
          for (var f in s[v]) h[v][f] = s[v][f];
        }
      for (var w in c)
        if (void 0 === s[w]) s[w] = c[w];
        else if ("object" == typeof s[w])
          for (var x in c[w]) void 0 === s[w][x] && (s[w][x] = c[w][x]);
      var y = this;
      if (
        ((y.params = s),
        (y.originalParams = h),
        (y.classNames = []),
        void 0 !== e && "undefined" != typeof Dom7 && (e = Dom7),
        (void 0 !== e ||
          (e =
            "undefined" == typeof Dom7
              ? window.Dom7 || window.Zepto || window.jQuery
              : Dom7)) &&
          ((y.$ = e),
          (y.currentBreakpoint = void 0),
          (y.getActiveBreakpoint = function() {
            if (!y.params.breakpoints) return !1;
            var e,
              a = !1,
              t = [];
            for (e in y.params.breakpoints)
              y.params.breakpoints.hasOwnProperty(e) && t.push(e);
            t.sort(function(e, a) {
              return parseInt(e, 10) > parseInt(a, 10);
            });
            for (var s = 0; s < t.length; s++)
              (e = t[s]) >= window.innerWidth && !a && (a = e);
            return a || "max";
          }),
          (y.setBreakpoint = function() {
            var e = y.getActiveBreakpoint();
            if (e && y.currentBreakpoint !== e) {
              var a =
                  e in y.params.breakpoints
                    ? y.params.breakpoints[e]
                    : y.originalParams,
                t = y.params.loop && a.slidesPerView !== y.params.slidesPerView;
              for (var s in a) y.params[s] = a[s];
              (y.currentBreakpoint = e), t && y.destroyLoop && y.reLoop(!0);
            }
          }),
          y.params.breakpoints && y.setBreakpoint(),
          (y.container = e(t)),
          0 !== y.container.length))
      ) {
        if (y.container.length > 1) {
          var T = [];
          return (
            y.container.each(function() {
              T.push(new a(this, s));
            }),
            T
          );
        }
        (y.container[0].swiper = y),
          y.container.data("swiper", y),
          y.classNames.push(
            y.params.containerModifierClass + y.params.direction
          ),
          y.params.freeMode &&
            y.classNames.push(y.params.containerModifierClass + "free-mode"),
          y.support.flexbox ||
            (y.classNames.push(y.params.containerModifierClass + "no-flexbox"),
            (y.params.slidesPerColumn = 1)),
          y.params.autoHeight &&
            y.classNames.push(y.params.containerModifierClass + "autoheight"),
          (y.params.parallax || y.params.watchSlidesVisibility) &&
            (y.params.watchSlidesProgress = !0),
          y.params.touchReleaseOnEdges && (y.params.resistanceRatio = 0),
          ["cube", "coverflow", "flip"].indexOf(y.params.effect) >= 0 &&
            (y.support.transforms3d
              ? ((y.params.watchSlidesProgress = !0),
                y.classNames.push(y.params.containerModifierClass + "3d"))
              : (y.params.effect = "slide")),
          "slide" !== y.params.effect &&
            y.classNames.push(
              y.params.containerModifierClass + y.params.effect
            ),
          "cube" === y.params.effect &&
            ((y.params.resistanceRatio = 0),
            (y.params.slidesPerView = 1),
            (y.params.slidesPerColumn = 1),
            (y.params.slidesPerGroup = 1),
            (y.params.centeredSlides = !1),
            (y.params.spaceBetween = 0),
            (y.params.virtualTranslate = !0)),
          ("fade" !== y.params.effect && "flip" !== y.params.effect) ||
            ((y.params.slidesPerView = 1),
            (y.params.slidesPerColumn = 1),
            (y.params.slidesPerGroup = 1),
            (y.params.watchSlidesProgress = !0),
            (y.params.spaceBetween = 0),
            void 0 === g && (y.params.virtualTranslate = !0)),
          y.params.grabCursor && y.support.touch && (y.params.grabCursor = !1),
          (y.wrapper = y.container.children("." + y.params.wrapperClass)),
          y.params.pagination &&
            ((y.paginationContainer = e(y.params.pagination)),
            y.params.uniqueNavElements &&
              "string" == typeof y.params.pagination &&
              y.paginationContainer.length > 1 &&
              1 === y.container.find(y.params.pagination).length &&
              (y.paginationContainer = y.container.find(y.params.pagination)),
            "bullets" === y.params.paginationType &&
            y.params.paginationClickable
              ? y.paginationContainer.addClass(
                  y.params.paginationModifierClass + "clickable"
                )
              : (y.params.paginationClickable = !1),
            y.paginationContainer.addClass(
              y.params.paginationModifierClass + y.params.paginationType
            )),
          (y.params.nextButton || y.params.prevButton) &&
            (y.params.nextButton &&
              ((y.nextButton = e(y.params.nextButton)),
              y.params.uniqueNavElements &&
                "string" == typeof y.params.nextButton &&
                y.nextButton.length > 1 &&
                1 === y.container.find(y.params.nextButton).length &&
                (y.nextButton = y.container.find(y.params.nextButton))),
            y.params.prevButton &&
              ((y.prevButton = e(y.params.prevButton)),
              y.params.uniqueNavElements &&
                "string" == typeof y.params.prevButton &&
                y.prevButton.length > 1 &&
                1 === y.container.find(y.params.prevButton).length &&
                (y.prevButton = y.container.find(y.params.prevButton)))),
          (y.isHorizontal = function() {
            return "horizontal" === y.params.direction;
          }),
          (y.rtl =
            y.isHorizontal() &&
            ("rtl" === y.container[0].dir.toLowerCase() ||
              "rtl" === y.container.css("direction"))),
          y.rtl && y.classNames.push(y.params.containerModifierClass + "rtl"),
          y.rtl && (y.wrongRTL = "-webkit-box" === y.wrapper.css("display")),
          y.params.slidesPerColumn > 1 &&
            y.classNames.push(y.params.containerModifierClass + "multirow"),
          y.device.android &&
            y.classNames.push(y.params.containerModifierClass + "android"),
          y.container.addClass(y.classNames.join(" ")),
          (y.translate = 0),
          (y.progress = 0),
          (y.velocity = 0),
          (y.lockSwipeToNext = function() {
            (y.params.allowSwipeToNext = !1),
              !1 === y.params.allowSwipeToPrev &&
                y.params.grabCursor &&
                y.unsetGrabCursor();
          }),
          (y.lockSwipeToPrev = function() {
            (y.params.allowSwipeToPrev = !1),
              !1 === y.params.allowSwipeToNext &&
                y.params.grabCursor &&
                y.unsetGrabCursor();
          }),
          (y.lockSwipes = function() {
            (y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !1),
              y.params.grabCursor && y.unsetGrabCursor();
          }),
          (y.unlockSwipeToNext = function() {
            (y.params.allowSwipeToNext = !0),
              !0 === y.params.allowSwipeToPrev &&
                y.params.grabCursor &&
                y.setGrabCursor();
          }),
          (y.unlockSwipeToPrev = function() {
            (y.params.allowSwipeToPrev = !0),
              !0 === y.params.allowSwipeToNext &&
                y.params.grabCursor &&
                y.setGrabCursor();
          }),
          (y.unlockSwipes = function() {
            (y.params.allowSwipeToNext = y.params.allowSwipeToPrev = !0),
              y.params.grabCursor && y.setGrabCursor();
          }),
          (y.setGrabCursor = function(e) {
            (y.container[0].style.cursor = "move"),
              (y.container[0].style.cursor = e
                ? "-webkit-grabbing"
                : "-webkit-grab"),
              (y.container[0].style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
              (y.container[0].style.cursor = e ? "grabbing" : "grab");
          }),
          (y.unsetGrabCursor = function() {
            y.container[0].style.cursor = "";
          }),
          y.params.grabCursor && y.setGrabCursor(),
          (y.imagesToLoad = []),
          (y.imagesLoaded = 0),
          (y.loadImage = function(e, a, t, s, r, i) {
            function n() {
              i && i();
            }
            var o;
            e.complete && r
              ? n()
              : a
              ? ((o = new window.Image()),
                (o.onload = n),
                (o.onerror = n),
                s && (o.sizes = s),
                t && (o.srcset = t),
                a && (o.src = a))
              : n();
          }),
          (y.preloadImages = function() {
            y.imagesToLoad = y.container.find("img");
            for (var e = 0; e < y.imagesToLoad.length; e++)
              y.loadImage(
                y.imagesToLoad[e],
                y.imagesToLoad[e].currentSrc ||
                  y.imagesToLoad[e].getAttribute("src"),
                y.imagesToLoad[e].srcset ||
                  y.imagesToLoad[e].getAttribute("srcset"),
                y.imagesToLoad[e].sizes ||
                  y.imagesToLoad[e].getAttribute("sizes"),
                !0,
                function() {
                  void 0 !== y &&
                    null !== y &&
                    y &&
                    (void 0 !== y.imagesLoaded && y.imagesLoaded++,
                    y.imagesLoaded === y.imagesToLoad.length &&
                      (y.params.updateOnImagesReady && y.update(),
                      y.emit("onImagesReady", y)));
                }
              );
          }),
          (y.autoplayTimeoutId = void 0),
          (y.autoplaying = !1),
          (y.autoplayPaused = !1),
          (y.startAutoplay = function() {
            return (
              void 0 === y.autoplayTimeoutId &&
              !!y.params.autoplay &&
              !y.autoplaying &&
              ((y.autoplaying = !0), y.emit("onAutoplayStart", y), void i())
            );
          }),
          (y.stopAutoplay = function(e) {
            y.autoplayTimeoutId &&
              (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId),
              (y.autoplaying = !1),
              (y.autoplayTimeoutId = void 0),
              y.emit("onAutoplayStop", y));
          }),
          (y.pauseAutoplay = function(e) {
            y.autoplayPaused ||
              (y.autoplayTimeoutId && clearTimeout(y.autoplayTimeoutId),
              (y.autoplayPaused = !0),
              0 === e
                ? ((y.autoplayPaused = !1), i())
                : y.wrapper.transitionEnd(function() {
                    y &&
                      ((y.autoplayPaused = !1),
                      y.autoplaying ? i() : y.stopAutoplay());
                  }));
          }),
          (y.minTranslate = function() {
            return -y.snapGrid[0];
          }),
          (y.maxTranslate = function() {
            return -y.snapGrid[y.snapGrid.length - 1];
          }),
          (y.updateAutoHeight = function() {
            var e,
              a = [],
              t = 0;
            if ("auto" !== y.params.slidesPerView && y.params.slidesPerView > 1)
              for (e = 0; e < Math.ceil(y.params.slidesPerView); e++) {
                var s = y.activeIndex + e;
                if (s > y.slides.length) break;
                a.push(y.slides.eq(s)[0]);
              }
            else a.push(y.slides.eq(y.activeIndex)[0]);
            for (e = 0; e < a.length; e++)
              if (void 0 !== a[e]) {
                var r = a[e].offsetHeight;
                t = r > t ? r : t;
              }
            t && y.wrapper.css("height", t + "px");
          }),
          (y.updateContainerSize = function() {
            var e, a;
            (e =
              void 0 !== y.params.width
                ? y.params.width
                : y.container[0].clientWidth),
              (a =
                void 0 !== y.params.height
                  ? y.params.height
                  : y.container[0].clientHeight),
              (0 === e && y.isHorizontal()) ||
                (0 === a && !y.isHorizontal()) ||
                ((e =
                  e -
                  parseInt(y.container.css("padding-left"), 10) -
                  parseInt(y.container.css("padding-right"), 10)),
                (a =
                  a -
                  parseInt(y.container.css("padding-top"), 10) -
                  parseInt(y.container.css("padding-bottom"), 10)),
                (y.width = e),
                (y.height = a),
                (y.size = y.isHorizontal() ? y.width : y.height));
          }),
          (y.updateSlidesSize = function() {
            (y.slides = y.wrapper.children("." + y.params.slideClass)),
              (y.snapGrid = []),
              (y.slidesGrid = []),
              (y.slidesSizesGrid = []);
            var e,
              a = y.params.spaceBetween,
              t = -y.params.slidesOffsetBefore,
              s = 0,
              i = 0;
            if (void 0 !== y.size) {
              "string" == typeof a &&
                a.indexOf("%") >= 0 &&
                (a = (parseFloat(a.replace("%", "")) / 100) * y.size),
                (y.virtualSize = -a),
                y.rtl
                  ? y.slides.css({ marginLeft: "", marginTop: "" })
                  : y.slides.css({ marginRight: "", marginBottom: "" });
              var n;
              y.params.slidesPerColumn > 1 &&
                ((n =
                  Math.floor(y.slides.length / y.params.slidesPerColumn) ===
                  y.slides.length / y.params.slidesPerColumn
                    ? y.slides.length
                    : Math.ceil(y.slides.length / y.params.slidesPerColumn) *
                      y.params.slidesPerColumn),
                "auto" !== y.params.slidesPerView &&
                  "row" === y.params.slidesPerColumnFill &&
                  (n = Math.max(
                    n,
                    y.params.slidesPerView * y.params.slidesPerColumn
                  )));
              var o,
                l = y.params.slidesPerColumn,
                p = n / l,
                d = p - (y.params.slidesPerColumn * p - y.slides.length);
              for (e = 0; e < y.slides.length; e++) {
                o = 0;
                var m = y.slides.eq(e);
                if (y.params.slidesPerColumn > 1) {
                  var u, c, g;
                  "column" === y.params.slidesPerColumnFill
                    ? ((c = Math.floor(e / l)),
                      (g = e - c * l),
                      (c > d || (c === d && g === l - 1)) &&
                        ++g >= l &&
                        ((g = 0), c++),
                      (u = c + (g * n) / l),
                      m.css({
                        "-webkit-box-ordinal-group": u,
                        "-moz-box-ordinal-group": u,
                        "-ms-flex-order": u,
                        "-webkit-order": u,
                        order: u
                      }))
                    : ((g = Math.floor(e / p)), (c = e - g * p)),
                    m
                      .css(
                        "margin-" + (y.isHorizontal() ? "top" : "left"),
                        0 !== g &&
                          y.params.spaceBetween &&
                          y.params.spaceBetween + "px"
                      )
                      .attr("data-swiper-column", c)
                      .attr("data-swiper-row", g);
                }
                "none" !== m.css("display") &&
                  ("auto" === y.params.slidesPerView
                    ? ((o = y.isHorizontal()
                        ? m.outerWidth(!0)
                        : m.outerHeight(!0)),
                      y.params.roundLengths && (o = r(o)))
                    : ((o =
                        (y.size - (y.params.slidesPerView - 1) * a) /
                        y.params.slidesPerView),
                      y.params.roundLengths && (o = r(o)),
                      y.isHorizontal()
                        ? (y.slides[e].style.width = o + "px")
                        : (y.slides[e].style.height = o + "px")),
                  (y.slides[e].swiperSlideSize = o),
                  y.slidesSizesGrid.push(o),
                  y.params.centeredSlides
                    ? ((t = t + o / 2 + s / 2 + a),
                      0 === s && 0 !== e && (t = t - y.size / 2 - a),
                      0 === e && (t = t - y.size / 2 - a),
                      Math.abs(t) < 0.001 && (t = 0),
                      i % y.params.slidesPerGroup == 0 && y.snapGrid.push(t),
                      y.slidesGrid.push(t))
                    : (i % y.params.slidesPerGroup == 0 && y.snapGrid.push(t),
                      y.slidesGrid.push(t),
                      (t = t + o + a)),
                  (y.virtualSize += o + a),
                  (s = o),
                  i++);
              }
              y.virtualSize =
                Math.max(y.virtualSize, y.size) + y.params.slidesOffsetAfter;
              var h;
              if (
                (y.rtl &&
                  y.wrongRTL &&
                  ("slide" === y.params.effect ||
                    "coverflow" === y.params.effect) &&
                  y.wrapper.css({
                    width: y.virtualSize + y.params.spaceBetween + "px"
                  }),
                (y.support.flexbox && !y.params.setWrapperSize) ||
                  (y.isHorizontal()
                    ? y.wrapper.css({
                        width: y.virtualSize + y.params.spaceBetween + "px"
                      })
                    : y.wrapper.css({
                        height: y.virtualSize + y.params.spaceBetween + "px"
                      })),
                y.params.slidesPerColumn > 1 &&
                  ((y.virtualSize = (o + y.params.spaceBetween) * n),
                  (y.virtualSize =
                    Math.ceil(y.virtualSize / y.params.slidesPerColumn) -
                    y.params.spaceBetween),
                  y.isHorizontal()
                    ? y.wrapper.css({
                        width: y.virtualSize + y.params.spaceBetween + "px"
                      })
                    : y.wrapper.css({
                        height: y.virtualSize + y.params.spaceBetween + "px"
                      }),
                  y.params.centeredSlides))
              ) {
                for (h = [], e = 0; e < y.snapGrid.length; e++)
                  y.snapGrid[e] < y.virtualSize + y.snapGrid[0] &&
                    h.push(y.snapGrid[e]);
                y.snapGrid = h;
              }
              if (!y.params.centeredSlides) {
                for (h = [], e = 0; e < y.snapGrid.length; e++)
                  y.snapGrid[e] <= y.virtualSize - y.size &&
                    h.push(y.snapGrid[e]);
                (y.snapGrid = h),
                  Math.floor(y.virtualSize - y.size) -
                    Math.floor(y.snapGrid[y.snapGrid.length - 1]) >
                    1 && y.snapGrid.push(y.virtualSize - y.size);
              }
              0 === y.snapGrid.length && (y.snapGrid = [0]),
                0 !== y.params.spaceBetween &&
                  (y.isHorizontal()
                    ? y.rtl
                      ? y.slides.css({ marginLeft: a + "px" })
                      : y.slides.css({ marginRight: a + "px" })
                    : y.slides.css({ marginBottom: a + "px" })),
                y.params.watchSlidesProgress && y.updateSlidesOffset();
            }
          }),
          (y.updateSlidesOffset = function() {
            for (var e = 0; e < y.slides.length; e++)
              y.slides[e].swiperSlideOffset = y.isHorizontal()
                ? y.slides[e].offsetLeft
                : y.slides[e].offsetTop;
          }),
          (y.currentSlidesPerView = function() {
            var e,
              a,
              t = 1;
            if (y.params.centeredSlides) {
              var s,
                r = y.slides[y.activeIndex].swiperSlideSize;
              for (e = y.activeIndex + 1; e < y.slides.length; e++)
                y.slides[e] &&
                  !s &&
                  ((r += y.slides[e].swiperSlideSize),
                  t++,
                  r > y.size && (s = !0));
              for (a = y.activeIndex - 1; a >= 0; a--)
                y.slides[a] &&
                  !s &&
                  ((r += y.slides[a].swiperSlideSize),
                  t++,
                  r > y.size && (s = !0));
            } else
              for (e = y.activeIndex + 1; e < y.slides.length; e++)
                y.slidesGrid[e] - y.slidesGrid[y.activeIndex] < y.size && t++;
            return t;
          }),
          (y.updateSlidesProgress = function(e) {
            if (
              (void 0 === e && (e = y.translate || 0), 0 !== y.slides.length)
            ) {
              void 0 === y.slides[0].swiperSlideOffset &&
                y.updateSlidesOffset();
              var a = -e;
              y.rtl && (a = e),
                y.slides.removeClass(y.params.slideVisibleClass);
              for (var t = 0; t < y.slides.length; t++) {
                var s = y.slides[t],
                  r =
                    (a +
                      (y.params.centeredSlides ? y.minTranslate() : 0) -
                      s.swiperSlideOffset) /
                    (s.swiperSlideSize + y.params.spaceBetween);
                if (y.params.watchSlidesVisibility) {
                  var i = -(a - s.swiperSlideOffset),
                    n = i + y.slidesSizesGrid[t];
                  ((i >= 0 && i < y.size) ||
                    (n > 0 && n <= y.size) ||
                    (i <= 0 && n >= y.size)) &&
                    y.slides.eq(t).addClass(y.params.slideVisibleClass);
                }
                s.progress = y.rtl ? -r : r;
              }
            }
          }),
          (y.updateProgress = function(e) {
            void 0 === e && (e = y.translate || 0);
            var a = y.maxTranslate() - y.minTranslate(),
              t = y.isBeginning,
              s = y.isEnd;
            0 === a
              ? ((y.progress = 0), (y.isBeginning = y.isEnd = !0))
              : ((y.progress = (e - y.minTranslate()) / a),
                (y.isBeginning = y.progress <= 0),
                (y.isEnd = y.progress >= 1)),
              y.isBeginning && !t && y.emit("onReachBeginning", y),
              y.isEnd && !s && y.emit("onReachEnd", y),
              y.params.watchSlidesProgress && y.updateSlidesProgress(e),
              y.emit("onProgress", y, y.progress);
          }),
          (y.updateActiveIndex = function() {
            var e,
              a,
              t,
              s = y.rtl ? y.translate : -y.translate;
            for (a = 0; a < y.slidesGrid.length; a++)
              void 0 !== y.slidesGrid[a + 1]
                ? s >= y.slidesGrid[a] &&
                  s <
                    y.slidesGrid[a + 1] -
                      (y.slidesGrid[a + 1] - y.slidesGrid[a]) / 2
                  ? (e = a)
                  : s >= y.slidesGrid[a] &&
                    s < y.slidesGrid[a + 1] &&
                    (e = a + 1)
                : s >= y.slidesGrid[a] && (e = a);
            y.params.normalizeSlideIndex && (e < 0 || void 0 === e) && (e = 0),
              (t = Math.floor(e / y.params.slidesPerGroup)) >=
                y.snapGrid.length && (t = y.snapGrid.length - 1),
              e !== y.activeIndex &&
                ((y.snapIndex = t),
                (y.previousIndex = y.activeIndex),
                (y.activeIndex = e),
                y.updateClasses(),
                y.updateRealIndex());
          }),
          (y.updateRealIndex = function() {
            y.realIndex = parseInt(
              y.slides.eq(y.activeIndex).attr("data-swiper-slide-index") ||
                y.activeIndex,
              10
            );
          }),
          (y.updateClasses = function() {
            y.slides.removeClass(
              y.params.slideActiveClass +
                " " +
                y.params.slideNextClass +
                " " +
                y.params.slidePrevClass +
                " " +
                y.params.slideDuplicateActiveClass +
                " " +
                y.params.slideDuplicateNextClass +
                " " +
                y.params.slideDuplicatePrevClass
            );
            var a = y.slides.eq(y.activeIndex);
            a.addClass(y.params.slideActiveClass),
              s.loop &&
                (a.hasClass(y.params.slideDuplicateClass)
                  ? y.wrapper
                      .children(
                        "." +
                          y.params.slideClass +
                          ":not(." +
                          y.params.slideDuplicateClass +
                          ')[data-swiper-slide-index="' +
                          y.realIndex +
                          '"]'
                      )
                      .addClass(y.params.slideDuplicateActiveClass)
                  : y.wrapper
                      .children(
                        "." +
                          y.params.slideClass +
                          "." +
                          y.params.slideDuplicateClass +
                          '[data-swiper-slide-index="' +
                          y.realIndex +
                          '"]'
                      )
                      .addClass(y.params.slideDuplicateActiveClass));
            var t = a
              .next("." + y.params.slideClass)
              .addClass(y.params.slideNextClass);
            y.params.loop &&
              0 === t.length &&
              (t = y.slides.eq(0)).addClass(y.params.slideNextClass);
            var r = a
              .prev("." + y.params.slideClass)
              .addClass(y.params.slidePrevClass);
            if (
              (y.params.loop &&
                0 === r.length &&
                (r = y.slides.eq(-1)).addClass(y.params.slidePrevClass),
              s.loop &&
                (t.hasClass(y.params.slideDuplicateClass)
                  ? y.wrapper
                      .children(
                        "." +
                          y.params.slideClass +
                          ":not(." +
                          y.params.slideDuplicateClass +
                          ')[data-swiper-slide-index="' +
                          t.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(y.params.slideDuplicateNextClass)
                  : y.wrapper
                      .children(
                        "." +
                          y.params.slideClass +
                          "." +
                          y.params.slideDuplicateClass +
                          '[data-swiper-slide-index="' +
                          t.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(y.params.slideDuplicateNextClass),
                r.hasClass(y.params.slideDuplicateClass)
                  ? y.wrapper
                      .children(
                        "." +
                          y.params.slideClass +
                          ":not(." +
                          y.params.slideDuplicateClass +
                          ')[data-swiper-slide-index="' +
                          r.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(y.params.slideDuplicatePrevClass)
                  : y.wrapper
                      .children(
                        "." +
                          y.params.slideClass +
                          "." +
                          y.params.slideDuplicateClass +
                          '[data-swiper-slide-index="' +
                          r.attr("data-swiper-slide-index") +
                          '"]'
                      )
                      .addClass(y.params.slideDuplicatePrevClass)),
              y.paginationContainer && y.paginationContainer.length > 0)
            ) {
              var i,
                n = y.params.loop
                  ? Math.ceil(
                      (y.slides.length - 2 * y.loopedSlides) /
                        y.params.slidesPerGroup
                    )
                  : y.snapGrid.length;
              if (
                (y.params.loop
                  ? ((i = Math.ceil(
                      (y.activeIndex - y.loopedSlides) / y.params.slidesPerGroup
                    )) >
                      y.slides.length - 1 - 2 * y.loopedSlides &&
                      (i -= y.slides.length - 2 * y.loopedSlides),
                    i > n - 1 && (i -= n),
                    i < 0 &&
                      "bullets" !== y.params.paginationType &&
                      (i = n + i))
                  : (i =
                      void 0 !== y.snapIndex
                        ? y.snapIndex
                        : y.activeIndex || 0),
                "bullets" === y.params.paginationType &&
                  y.bullets &&
                  y.bullets.length > 0 &&
                  (y.bullets.removeClass(y.params.bulletActiveClass),
                  y.paginationContainer.length > 1
                    ? y.bullets.each(function() {
                        e(this).index() === i &&
                          e(this).addClass(y.params.bulletActiveClass);
                      })
                    : y.bullets.eq(i).addClass(y.params.bulletActiveClass)),
                "fraction" === y.params.paginationType &&
                  (y.paginationContainer
                    .find("." + y.params.paginationCurrentClass)
                    .text(i + 1),
                  y.paginationContainer
                    .find("." + y.params.paginationTotalClass)
                    .text(n)),
                "progress" === y.params.paginationType)
              ) {
                var o = (i + 1) / n,
                  l = o,
                  p = 1;
                y.isHorizontal() || ((p = o), (l = 1)),
                  y.paginationContainer
                    .find("." + y.params.paginationProgressbarClass)
                    .transform(
                      "translate3d(0,0,0) scaleX(" + l + ") scaleY(" + p + ")"
                    )
                    .transition(y.params.speed);
              }
              "custom" === y.params.paginationType &&
                y.params.paginationCustomRender &&
                (y.paginationContainer.html(
                  y.params.paginationCustomRender(y, i + 1, n)
                ),
                y.emit("onPaginationRendered", y, y.paginationContainer[0]));
            }
            y.params.loop ||
              (y.params.prevButton &&
                y.prevButton &&
                y.prevButton.length > 0 &&
                (y.isBeginning
                  ? (y.prevButton.addClass(y.params.buttonDisabledClass),
                    y.params.a11y && y.a11y && y.a11y.disable(y.prevButton))
                  : (y.prevButton.removeClass(y.params.buttonDisabledClass),
                    y.params.a11y && y.a11y && y.a11y.enable(y.prevButton))),
              y.params.nextButton &&
                y.nextButton &&
                y.nextButton.length > 0 &&
                (y.isEnd
                  ? (y.nextButton.addClass(y.params.buttonDisabledClass),
                    y.params.a11y && y.a11y && y.a11y.disable(y.nextButton))
                  : (y.nextButton.removeClass(y.params.buttonDisabledClass),
                    y.params.a11y && y.a11y && y.a11y.enable(y.nextButton))));
          }),
          (y.updatePagination = function() {
            if (
              y.params.pagination &&
              y.paginationContainer &&
              y.paginationContainer.length > 0
            ) {
              var e = "";
              if ("bullets" === y.params.paginationType) {
                for (
                  var a = y.params.loop
                      ? Math.ceil(
                          (y.slides.length - 2 * y.loopedSlides) /
                            y.params.slidesPerGroup
                        )
                      : y.snapGrid.length,
                    t = 0;
                  t < a;
                  t++
                )
                  e += y.params.paginationBulletRender
                    ? y.params.paginationBulletRender(
                        y,
                        t,
                        y.params.bulletClass
                      )
                    : "<" +
                      y.params.paginationElement +
                      ' class="' +
                      y.params.bulletClass +
                      '"></' +
                      y.params.paginationElement +
                      ">";
                y.paginationContainer.html(e),
                  (y.bullets = y.paginationContainer.find(
                    "." + y.params.bulletClass
                  )),
                  y.params.paginationClickable &&
                    y.params.a11y &&
                    y.a11y &&
                    y.a11y.initPagination();
              }
              "fraction" === y.params.paginationType &&
                ((e = y.params.paginationFractionRender
                  ? y.params.paginationFractionRender(
                      y,
                      y.params.paginationCurrentClass,
                      y.params.paginationTotalClass
                    )
                  : '<span class="' +
                    y.params.paginationCurrentClass +
                    '"></span> / <span class="' +
                    y.params.paginationTotalClass +
                    '"></span>'),
                y.paginationContainer.html(e)),
                "progress" === y.params.paginationType &&
                  ((e = y.params.paginationProgressRender
                    ? y.params.paginationProgressRender(
                        y,
                        y.params.paginationProgressbarClass
                      )
                    : '<span class="' +
                      y.params.paginationProgressbarClass +
                      '"></span>'),
                  y.paginationContainer.html(e)),
                "custom" !== y.params.paginationType &&
                  y.emit("onPaginationRendered", y, y.paginationContainer[0]);
            }
          }),
          (y.update = function(e) {
            function a() {
              y.rtl,
                y.translate,
                (t = Math.min(
                  Math.max(y.translate, y.maxTranslate()),
                  y.minTranslate()
                )),
                y.setWrapperTranslate(t),
                y.updateActiveIndex(),
                y.updateClasses();
            }
            if (y) {
              y.updateContainerSize(),
                y.updateSlidesSize(),
                y.updateProgress(),
                y.updatePagination(),
                y.updateClasses(),
                y.params.scrollbar && y.scrollbar && y.scrollbar.set();
              var t;
              e
                ? (y.controller &&
                    y.controller.spline &&
                    (y.controller.spline = void 0),
                  y.params.freeMode
                    ? (a(), y.params.autoHeight && y.updateAutoHeight())
                    : (("auto" === y.params.slidesPerView ||
                        y.params.slidesPerView > 1) &&
                      y.isEnd &&
                      !y.params.centeredSlides
                        ? y.slideTo(y.slides.length - 1, 0, !1, !0)
                        : y.slideTo(y.activeIndex, 0, !1, !0)) || a())
                : y.params.autoHeight && y.updateAutoHeight();
            }
          }),
          (y.onResize = function(e) {
            y.params.onBeforeResize && y.params.onBeforeResize(y),
              y.params.breakpoints && y.setBreakpoint();
            var a = y.params.allowSwipeToPrev,
              t = y.params.allowSwipeToNext;
            (y.params.allowSwipeToPrev = y.params.allowSwipeToNext = !0),
              y.updateContainerSize(),
              y.updateSlidesSize(),
              ("auto" === y.params.slidesPerView || y.params.freeMode || e) &&
                y.updatePagination(),
              y.params.scrollbar && y.scrollbar && y.scrollbar.set(),
              y.controller &&
                y.controller.spline &&
                (y.controller.spline = void 0);
            var s = !1;
            if (y.params.freeMode) {
              var r = Math.min(
                Math.max(y.translate, y.maxTranslate()),
                y.minTranslate()
              );
              y.setWrapperTranslate(r),
                y.updateActiveIndex(),
                y.updateClasses(),
                y.params.autoHeight && y.updateAutoHeight();
            } else
              y.updateClasses(),
                (s =
                  ("auto" === y.params.slidesPerView ||
                    y.params.slidesPerView > 1) &&
                  y.isEnd &&
                  !y.params.centeredSlides
                    ? y.slideTo(y.slides.length - 1, 0, !1, !0)
                    : y.slideTo(y.activeIndex, 0, !1, !0));
            y.params.lazyLoading && !s && y.lazy && y.lazy.load(),
              (y.params.allowSwipeToPrev = a),
              (y.params.allowSwipeToNext = t),
              y.params.onAfterResize && y.params.onAfterResize(y);
          }),
          (y.touchEventsDesktop = {
            start: "mousedown",
            move: "mousemove",
            end: "mouseup"
          }),
          window.navigator.pointerEnabled
            ? (y.touchEventsDesktop = {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
              })
            : window.navigator.msPointerEnabled &&
              (y.touchEventsDesktop = {
                start: "MSPointerDown",
                move: "MSPointerMove",
                end: "MSPointerUp"
              }),
          (y.touchEvents = {
            start:
              y.support.touch || !y.params.simulateTouch
                ? "touchstart"
                : y.touchEventsDesktop.start,
            move:
              y.support.touch || !y.params.simulateTouch
                ? "touchmove"
                : y.touchEventsDesktop.move,
            end:
              y.support.touch || !y.params.simulateTouch
                ? "touchend"
                : y.touchEventsDesktop.end
          }),
          (window.navigator.pointerEnabled ||
            window.navigator.msPointerEnabled) &&
            ("container" === y.params.touchEventsTarget
              ? y.container
              : y.wrapper
            ).addClass("swiper-wp8-" + y.params.direction),
          (y.initEvents = function(e) {
            var a = e ? "off" : "on",
              t = e ? "removeEventListener" : "addEventListener",
              r =
                "container" === y.params.touchEventsTarget
                  ? y.container[0]
                  : y.wrapper[0],
              i = y.support.touch ? r : document,
              n = !!y.params.nested;
            if (y.browser.ie)
              r[t](y.touchEvents.start, y.onTouchStart, !1),
                i[t](y.touchEvents.move, y.onTouchMove, n),
                i[t](y.touchEvents.end, y.onTouchEnd, !1);
            else {
              if (y.support.touch) {
                var o = !(
                  "touchstart" !== y.touchEvents.start ||
                  !y.support.passiveListener ||
                  !y.params.passiveListeners
                ) && { passive: !0, capture: !1 };
                r[t](y.touchEvents.start, y.onTouchStart, o),
                  r[t](y.touchEvents.move, y.onTouchMove, n),
                  r[t](y.touchEvents.end, y.onTouchEnd, o);
              }
              ((s.simulateTouch && !y.device.ios && !y.device.android) ||
                (s.simulateTouch && !y.support.touch && y.device.ios)) &&
                (r[t]("mousedown", y.onTouchStart, !1),
                document[t]("mousemove", y.onTouchMove, n),
                document[t]("mouseup", y.onTouchEnd, !1));
            }
            window[t]("resize", y.onResize),
              y.params.nextButton &&
                y.nextButton &&
                y.nextButton.length > 0 &&
                (y.nextButton[a]("click", y.onClickNext),
                y.params.a11y &&
                  y.a11y &&
                  y.nextButton[a]("keydown", y.a11y.onEnterKey)),
              y.params.prevButton &&
                y.prevButton &&
                y.prevButton.length > 0 &&
                (y.prevButton[a]("click", y.onClickPrev),
                y.params.a11y &&
                  y.a11y &&
                  y.prevButton[a]("keydown", y.a11y.onEnterKey)),
              y.params.pagination &&
                y.params.paginationClickable &&
                (y.paginationContainer[a](
                  "click",
                  "." + y.params.bulletClass,
                  y.onClickIndex
                ),
                y.params.a11y &&
                  y.a11y &&
                  y.paginationContainer[a](
                    "keydown",
                    "." + y.params.bulletClass,
                    y.a11y.onEnterKey
                  )),
              (y.params.preventClicks || y.params.preventClicksPropagation) &&
                r[t]("click", y.preventClicks, !0);
          }),
          (y.attachEvents = function() {
            y.initEvents();
          }),
          (y.detachEvents = function() {
            y.initEvents(!0);
          }),
          (y.allowClick = !0),
          (y.preventClicks = function(e) {
            y.allowClick ||
              (y.params.preventClicks && e.preventDefault(),
              y.params.preventClicksPropagation &&
                y.animating &&
                (e.stopPropagation(), e.stopImmediatePropagation()));
          }),
          (y.onClickNext = function(e) {
            e.preventDefault(), (y.isEnd && !y.params.loop) || y.slideNext();
          }),
          (y.onClickPrev = function(e) {
            e.preventDefault(),
              (y.isBeginning && !y.params.loop) || y.slidePrev();
          }),
          (y.onClickIndex = function(a) {
            a.preventDefault();
            var t = e(this).index() * y.params.slidesPerGroup;
            y.params.loop && (t += y.loopedSlides), y.slideTo(t);
          }),
          (y.updateClickedSlide = function(a) {
            var t = n(a, "." + y.params.slideClass),
              s = !1;
            if (t)
              for (var r = 0; r < y.slides.length; r++)
                y.slides[r] === t && (s = !0);
            if (!t || !s)
              return (y.clickedSlide = void 0), void (y.clickedIndex = void 0);
            if (
              ((y.clickedSlide = t),
              (y.clickedIndex = e(t).index()),
              y.params.slideToClickedSlide &&
                void 0 !== y.clickedIndex &&
                y.clickedIndex !== y.activeIndex)
            ) {
              var i,
                o = y.clickedIndex,
                l =
                  "auto" === y.params.slidesPerView
                    ? y.currentSlidesPerView()
                    : y.params.slidesPerView;
              if (y.params.loop) {
                if (y.animating) return;
                (i = parseInt(
                  e(y.clickedSlide).attr("data-swiper-slide-index"),
                  10
                )),
                  y.params.centeredSlides
                    ? o < y.loopedSlides - l / 2 ||
                      o > y.slides.length - y.loopedSlides + l / 2
                      ? (y.fixLoop(),
                        (o = y.wrapper
                          .children(
                            "." +
                              y.params.slideClass +
                              '[data-swiper-slide-index="' +
                              i +
                              '"]:not(.' +
                              y.params.slideDuplicateClass +
                              ")"
                          )
                          .eq(0)
                          .index()),
                        setTimeout(function() {
                          y.slideTo(o);
                        }, 0))
                      : y.slideTo(o)
                    : o > y.slides.length - l
                    ? (y.fixLoop(),
                      (o = y.wrapper
                        .children(
                          "." +
                            y.params.slideClass +
                            '[data-swiper-slide-index="' +
                            i +
                            '"]:not(.' +
                            y.params.slideDuplicateClass +
                            ")"
                        )
                        .eq(0)
                        .index()),
                      setTimeout(function() {
                        y.slideTo(o);
                      }, 0))
                    : y.slideTo(o);
              } else y.slideTo(o);
            }
          });
        var b,
          C,
          S,
          z,
          M,
          P,
          E,
          I,
          k,
          D,
          L = "input, select, textarea, button, video",
          B = Date.now(),
          H = [];
        (y.animating = !1),
          (y.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
          });
        var G, X;
        (y.onTouchStart = function(a) {
          if (
            (a.originalEvent && (a = a.originalEvent),
            (G = "touchstart" === a.type) || !("which" in a) || 3 !== a.which)
          ) {
            if (y.params.noSwiping && n(a, "." + y.params.noSwipingClass))
              return void (y.allowClick = !0);
            if (!y.params.swipeHandler || n(a, y.params.swipeHandler)) {
              var t = (y.touches.currentX =
                  "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX),
                s = (y.touches.currentY =
                  "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY);
              if (
                !(
                  y.device.ios &&
                  y.params.iOSEdgeSwipeDetection &&
                  t <= y.params.iOSEdgeSwipeThreshold
                )
              ) {
                if (
                  ((b = !0),
                  (C = !1),
                  (S = !0),
                  (M = void 0),
                  (X = void 0),
                  (y.touches.startX = t),
                  (y.touches.startY = s),
                  (z = Date.now()),
                  (y.allowClick = !0),
                  y.updateContainerSize(),
                  (y.swipeDirection = void 0),
                  y.params.threshold > 0 && (I = !1),
                  "touchstart" !== a.type)
                ) {
                  var r = !0;
                  e(a.target).is(L) && (r = !1),
                    document.activeElement &&
                      e(document.activeElement).is(L) &&
                      document.activeElement.blur(),
                    r && a.preventDefault();
                }
                y.emit("onTouchStart", y, a);
              }
            }
          }
        }),
          (y.onTouchMove = function(a) {
            if (
              (a.originalEvent && (a = a.originalEvent),
              !G || "mousemove" !== a.type)
            ) {
              if (a.preventedByNestedSwiper)
                return (
                  (y.touches.startX =
                    "touchmove" === a.type
                      ? a.targetTouches[0].pageX
                      : a.pageX),
                  void (y.touches.startY =
                    "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY)
                );
              if (y.params.onlyExternal)
                return (
                  (y.allowClick = !1),
                  void (
                    b &&
                    ((y.touches.startX = y.touches.currentX =
                      "touchmove" === a.type
                        ? a.targetTouches[0].pageX
                        : a.pageX),
                    (y.touches.startY = y.touches.currentY =
                      "touchmove" === a.type
                        ? a.targetTouches[0].pageY
                        : a.pageY),
                    (z = Date.now()))
                  )
                );
              if (G && y.params.touchReleaseOnEdges && !y.params.loop)
                if (y.isHorizontal()) {
                  if (
                    (y.touches.currentX < y.touches.startX &&
                      y.translate <= y.maxTranslate()) ||
                    (y.touches.currentX > y.touches.startX &&
                      y.translate >= y.minTranslate())
                  )
                    return;
                } else if (
                  (y.touches.currentY < y.touches.startY &&
                    y.translate <= y.maxTranslate()) ||
                  (y.touches.currentY > y.touches.startY &&
                    y.translate >= y.minTranslate())
                )
                  return;
              if (
                G &&
                document.activeElement &&
                a.target === document.activeElement &&
                e(a.target).is(L)
              )
                return (C = !0), void (y.allowClick = !1);
              if (
                (S && y.emit("onTouchMove", y, a),
                !(a.targetTouches && a.targetTouches.length > 1))
              ) {
                if (
                  ((y.touches.currentX =
                    "touchmove" === a.type
                      ? a.targetTouches[0].pageX
                      : a.pageX),
                  (y.touches.currentY =
                    "touchmove" === a.type
                      ? a.targetTouches[0].pageY
                      : a.pageY),
                  void 0 === M)
                ) {
                  var t;
                  (y.isHorizontal() &&
                    y.touches.currentY === y.touches.startY) ||
                  (!y.isHorizontal() && y.touches.currentX === y.touches.startX)
                    ? (M = !1)
                    : ((t =
                        (180 *
                          Math.atan2(
                            Math.abs(y.touches.currentY - y.touches.startY),
                            Math.abs(y.touches.currentX - y.touches.startX)
                          )) /
                        Math.PI),
                      (M = y.isHorizontal()
                        ? t > y.params.touchAngle
                        : 90 - t > y.params.touchAngle));
                }
                if (
                  (M && y.emit("onTouchMoveOpposite", y, a),
                  void 0 === X &&
                    ((y.touches.currentX === y.touches.startX &&
                      y.touches.currentY === y.touches.startY) ||
                      (X = !0)),
                  b)
                ) {
                  if (M) return void (b = !1);
                  if (X) {
                    (y.allowClick = !1),
                      y.emit("onSliderMove", y, a),
                      a.preventDefault(),
                      y.params.touchMoveStopPropagation &&
                        !y.params.nested &&
                        a.stopPropagation(),
                      C ||
                        (s.loop && y.fixLoop(),
                        (E = y.getWrapperTranslate()),
                        y.setWrapperTransition(0),
                        y.animating &&
                          y.wrapper.trigger(
                            "webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"
                          ),
                        y.params.autoplay &&
                          y.autoplaying &&
                          (y.params.autoplayDisableOnInteraction
                            ? y.stopAutoplay()
                            : y.pauseAutoplay()),
                        (D = !1),
                        !y.params.grabCursor ||
                          (!0 !== y.params.allowSwipeToNext &&
                            !0 !== y.params.allowSwipeToPrev) ||
                          y.setGrabCursor(!0)),
                      (C = !0);
                    var r = (y.touches.diff = y.isHorizontal()
                      ? y.touches.currentX - y.touches.startX
                      : y.touches.currentY - y.touches.startY);
                    (r *= y.params.touchRatio),
                      y.rtl && (r = -r),
                      (y.swipeDirection = r > 0 ? "prev" : "next"),
                      (P = r + E);
                    var i = !0;
                    if (
                      (r > 0 && P > y.minTranslate()
                        ? ((i = !1),
                          y.params.resistance &&
                            (P =
                              y.minTranslate() -
                              1 +
                              Math.pow(
                                -y.minTranslate() + E + r,
                                y.params.resistanceRatio
                              )))
                        : r < 0 &&
                          P < y.maxTranslate() &&
                          ((i = !1),
                          y.params.resistance &&
                            (P =
                              y.maxTranslate() +
                              1 -
                              Math.pow(
                                y.maxTranslate() - E - r,
                                y.params.resistanceRatio
                              ))),
                      i && (a.preventedByNestedSwiper = !0),
                      !y.params.allowSwipeToNext &&
                        "next" === y.swipeDirection &&
                        P < E &&
                        (P = E),
                      !y.params.allowSwipeToPrev &&
                        "prev" === y.swipeDirection &&
                        P > E &&
                        (P = E),
                      y.params.threshold > 0)
                    ) {
                      if (!(Math.abs(r) > y.params.threshold || I))
                        return void (P = E);
                      if (!I)
                        return (
                          (I = !0),
                          (y.touches.startX = y.touches.currentX),
                          (y.touches.startY = y.touches.currentY),
                          (P = E),
                          void (y.touches.diff = y.isHorizontal()
                            ? y.touches.currentX - y.touches.startX
                            : y.touches.currentY - y.touches.startY)
                        );
                    }
                    y.params.followFinger &&
                      ((y.params.freeMode || y.params.watchSlidesProgress) &&
                        y.updateActiveIndex(),
                      y.params.freeMode &&
                        (0 === H.length &&
                          H.push({
                            position:
                              y.touches[y.isHorizontal() ? "startX" : "startY"],
                            time: z
                          }),
                        H.push({
                          position:
                            y.touches[
                              y.isHorizontal() ? "currentX" : "currentY"
                            ],
                          time: new window.Date().getTime()
                        })),
                      y.updateProgress(P),
                      y.setWrapperTranslate(P));
                  }
                }
              }
            }
          }),
          (y.onTouchEnd = function(a) {
            if (
              (a.originalEvent && (a = a.originalEvent),
              S && y.emit("onTouchEnd", y, a),
              (S = !1),
              b)
            ) {
              y.params.grabCursor &&
                C &&
                b &&
                (!0 === y.params.allowSwipeToNext ||
                  !0 === y.params.allowSwipeToPrev) &&
                y.setGrabCursor(!1);
              var t = Date.now(),
                s = t - z;
              if (
                (y.allowClick &&
                  (y.updateClickedSlide(a),
                  y.emit("onTap", y, a),
                  s < 300 &&
                    t - B > 300 &&
                    (k && clearTimeout(k),
                    (k = setTimeout(function() {
                      y &&
                        (y.params.paginationHide &&
                          y.paginationContainer.length > 0 &&
                          !e(a.target).hasClass(y.params.bulletClass) &&
                          y.paginationContainer.toggleClass(
                            y.params.paginationHiddenClass
                          ),
                        y.emit("onClick", y, a));
                    }, 300))),
                  s < 300 &&
                    t - B < 300 &&
                    (k && clearTimeout(k), y.emit("onDoubleTap", y, a))),
                (B = Date.now()),
                setTimeout(function() {
                  y && (y.allowClick = !0);
                }, 0),
                !b ||
                  !C ||
                  !y.swipeDirection ||
                  0 === y.touches.diff ||
                  P === E)
              )
                return void (b = C = !1);
              b = C = !1;
              var r;
              if (
                ((r = y.params.followFinger
                  ? y.rtl
                    ? y.translate
                    : -y.translate
                  : -P),
                y.params.freeMode)
              ) {
                if (r < -y.minTranslate()) return void y.slideTo(y.activeIndex);
                if (r > -y.maxTranslate())
                  return void (y.slides.length < y.snapGrid.length
                    ? y.slideTo(y.snapGrid.length - 1)
                    : y.slideTo(y.slides.length - 1));
                if (y.params.freeModeMomentum) {
                  if (H.length > 1) {
                    var i = H.pop(),
                      n = H.pop(),
                      o = i.position - n.position,
                      l = i.time - n.time;
                    (y.velocity = o / l),
                      (y.velocity = y.velocity / 2),
                      Math.abs(y.velocity) < y.params.freeModeMinimumVelocity &&
                        (y.velocity = 0),
                      (l > 150 || new window.Date().getTime() - i.time > 300) &&
                        (y.velocity = 0);
                  } else y.velocity = 0;
                  (y.velocity =
                    y.velocity * y.params.freeModeMomentumVelocityRatio),
                    (H.length = 0);
                  var p = 1e3 * y.params.freeModeMomentumRatio,
                    d = y.velocity * p,
                    m = y.translate + d;
                  y.rtl && (m = -m);
                  var u,
                    c = !1,
                    g =
                      20 *
                      Math.abs(y.velocity) *
                      y.params.freeModeMomentumBounceRatio;
                  if (m < y.maxTranslate())
                    y.params.freeModeMomentumBounce
                      ? (m + y.maxTranslate() < -g &&
                          (m = y.maxTranslate() - g),
                        (u = y.maxTranslate()),
                        (c = !0),
                        (D = !0))
                      : (m = y.maxTranslate());
                  else if (m > y.minTranslate())
                    y.params.freeModeMomentumBounce
                      ? (m - y.minTranslate() > g && (m = y.minTranslate() + g),
                        (u = y.minTranslate()),
                        (c = !0),
                        (D = !0))
                      : (m = y.minTranslate());
                  else if (y.params.freeModeSticky) {
                    var h,
                      v = 0;
                    for (v = 0; v < y.snapGrid.length; v += 1)
                      if (y.snapGrid[v] > -m) {
                        h = v;
                        break;
                      }
                    (m =
                      Math.abs(y.snapGrid[h] - m) <
                        Math.abs(y.snapGrid[h - 1] - m) ||
                      "next" === y.swipeDirection
                        ? y.snapGrid[h]
                        : y.snapGrid[h - 1]),
                      y.rtl || (m = -m);
                  }
                  if (0 !== y.velocity)
                    p = y.rtl
                      ? Math.abs((-m - y.translate) / y.velocity)
                      : Math.abs((m - y.translate) / y.velocity);
                  else if (y.params.freeModeSticky) return void y.slideReset();
                  y.params.freeModeMomentumBounce && c
                    ? (y.updateProgress(u),
                      y.setWrapperTransition(p),
                      y.setWrapperTranslate(m),
                      y.onTransitionStart(),
                      (y.animating = !0),
                      y.wrapper.transitionEnd(function() {
                        y &&
                          D &&
                          (y.emit("onMomentumBounce", y),
                          y.setWrapperTransition(y.params.speed),
                          y.setWrapperTranslate(u),
                          y.wrapper.transitionEnd(function() {
                            y && y.onTransitionEnd();
                          }));
                      }))
                    : y.velocity
                    ? (y.updateProgress(m),
                      y.setWrapperTransition(p),
                      y.setWrapperTranslate(m),
                      y.onTransitionStart(),
                      y.animating ||
                        ((y.animating = !0),
                        y.wrapper.transitionEnd(function() {
                          y && y.onTransitionEnd();
                        })))
                    : y.updateProgress(m),
                    y.updateActiveIndex();
                }
                return void (
                  (!y.params.freeModeMomentum || s >= y.params.longSwipesMs) &&
                  (y.updateProgress(), y.updateActiveIndex())
                );
              }
              var f,
                w = 0,
                x = y.slidesSizesGrid[0];
              for (f = 0; f < y.slidesGrid.length; f += y.params.slidesPerGroup)
                void 0 !== y.slidesGrid[f + y.params.slidesPerGroup]
                  ? r >= y.slidesGrid[f] &&
                    r < y.slidesGrid[f + y.params.slidesPerGroup] &&
                    ((w = f),
                    (x =
                      y.slidesGrid[f + y.params.slidesPerGroup] -
                      y.slidesGrid[f]))
                  : r >= y.slidesGrid[f] &&
                    ((w = f),
                    (x =
                      y.slidesGrid[y.slidesGrid.length - 1] -
                      y.slidesGrid[y.slidesGrid.length - 2]));
              var T = (r - y.slidesGrid[w]) / x;
              if (s > y.params.longSwipesMs) {
                if (!y.params.longSwipes) return void y.slideTo(y.activeIndex);
                "next" === y.swipeDirection &&
                  (T >= y.params.longSwipesRatio
                    ? y.slideTo(w + y.params.slidesPerGroup)
                    : y.slideTo(w)),
                  "prev" === y.swipeDirection &&
                    (T > 1 - y.params.longSwipesRatio
                      ? y.slideTo(w + y.params.slidesPerGroup)
                      : y.slideTo(w));
              } else {
                if (!y.params.shortSwipes) return void y.slideTo(y.activeIndex);
                "next" === y.swipeDirection &&
                  y.slideTo(w + y.params.slidesPerGroup),
                  "prev" === y.swipeDirection && y.slideTo(w);
              }
            }
          }),
          (y._slideTo = function(e, a) {
            return y.slideTo(e, a, !0, !0);
          }),
          (y.slideTo = function(e, a, t, s) {
            void 0 === t && (t = !0),
              void 0 === e && (e = 0),
              e < 0 && (e = 0),
              (y.snapIndex = Math.floor(e / y.params.slidesPerGroup)),
              y.snapIndex >= y.snapGrid.length &&
                (y.snapIndex = y.snapGrid.length - 1);
            var r = -y.snapGrid[y.snapIndex];
            if (
              (y.params.autoplay &&
                y.autoplaying &&
                (s || !y.params.autoplayDisableOnInteraction
                  ? y.pauseAutoplay(a)
                  : y.stopAutoplay()),
              y.updateProgress(r),
              y.params.normalizeSlideIndex)
            )
              for (var i = 0; i < y.slidesGrid.length; i++)
                -Math.floor(100 * r) >= Math.floor(100 * y.slidesGrid[i]) &&
                  (e = i);
            return !(
              (!y.params.allowSwipeToNext &&
                r < y.translate &&
                r < y.minTranslate()) ||
              (!y.params.allowSwipeToPrev &&
                r > y.translate &&
                r > y.maxTranslate() &&
                (y.activeIndex || 0) !== e) ||
              (void 0 === a && (a = y.params.speed),
              (y.previousIndex = y.activeIndex || 0),
              (y.activeIndex = e),
              y.updateRealIndex(),
              (y.rtl && -r === y.translate) || (!y.rtl && r === y.translate)
                ? (y.params.autoHeight && y.updateAutoHeight(),
                  y.updateClasses(),
                  "slide" !== y.params.effect && y.setWrapperTranslate(r),
                  1)
                : (y.updateClasses(),
                  y.onTransitionStart(t),
                  0 === a || y.browser.lteIE9
                    ? (y.setWrapperTranslate(r),
                      y.setWrapperTransition(0),
                      y.onTransitionEnd(t))
                    : (y.setWrapperTranslate(r),
                      y.setWrapperTransition(a),
                      y.animating ||
                        ((y.animating = !0),
                        y.wrapper.transitionEnd(function() {
                          y && y.onTransitionEnd(t);
                        }))),
                  0))
            );
          }),
          (y.onTransitionStart = function(e) {
            void 0 === e && (e = !0),
              y.params.autoHeight && y.updateAutoHeight(),
              y.lazy && y.lazy.onTransitionStart(),
              e &&
                (y.emit("onTransitionStart", y),
                y.activeIndex !== y.previousIndex &&
                  (y.emit("onSlideChangeStart", y),
                  y.activeIndex > y.previousIndex
                    ? y.emit("onSlideNextStart", y)
                    : y.emit("onSlidePrevStart", y)));
          }),
          (y.onTransitionEnd = function(e) {
            (y.animating = !1),
              y.setWrapperTransition(0),
              void 0 === e && (e = !0),
              y.lazy && y.lazy.onTransitionEnd(),
              e &&
                (y.emit("onTransitionEnd", y),
                y.activeIndex !== y.previousIndex &&
                  (y.emit("onSlideChangeEnd", y),
                  y.activeIndex > y.previousIndex
                    ? y.emit("onSlideNextEnd", y)
                    : y.emit("onSlidePrevEnd", y))),
              y.params.history &&
                y.history &&
                y.history.setHistory(y.params.history, y.activeIndex),
              y.params.hashnav && y.hashnav && y.hashnav.setHash();
          }),
          (y.slideNext = function(e, a, t) {
            return y.params.loop
              ? !y.animating &&
                  (y.fixLoop(),
                  y.container[0].clientLeft,
                  y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t))
              : y.slideTo(y.activeIndex + y.params.slidesPerGroup, a, e, t);
          }),
          (y._slideNext = function(e) {
            return y.slideNext(!0, e, !0);
          }),
          (y.slidePrev = function(e, a, t) {
            return y.params.loop
              ? !y.animating &&
                  (y.fixLoop(),
                  y.container[0].clientLeft,
                  y.slideTo(y.activeIndex - 1, a, e, t))
              : y.slideTo(y.activeIndex - 1, a, e, t);
          }),
          (y._slidePrev = function(e) {
            return y.slidePrev(!0, e, !0);
          }),
          (y.slideReset = function(e, a, t) {
            return y.slideTo(y.activeIndex, a, e);
          }),
          (y.disableTouchControl = function() {
            return (y.params.onlyExternal = !0), !0;
          }),
          (y.enableTouchControl = function() {
            return (y.params.onlyExternal = !1), !0;
          }),
          (y.setWrapperTransition = function(e, a) {
            y.wrapper.transition(e),
              "slide" !== y.params.effect &&
                y.effects[y.params.effect] &&
                y.effects[y.params.effect].setTransition(e),
              y.params.parallax && y.parallax && y.parallax.setTransition(e),
              y.params.scrollbar && y.scrollbar && y.scrollbar.setTransition(e),
              y.params.control &&
                y.controller &&
                y.controller.setTransition(e, a),
              y.emit("onSetTransition", y, e);
          }),
          (y.setWrapperTranslate = function(e, a, t) {
            var s = 0,
              i = 0;
            y.isHorizontal() ? (s = y.rtl ? -e : e) : (i = e),
              y.params.roundLengths && ((s = r(s)), (i = r(i))),
              y.params.virtualTranslate ||
                (y.support.transforms3d
                  ? y.wrapper.transform(
                      "translate3d(" + s + "px, " + i + "px, 0px)"
                    )
                  : y.wrapper.transform("translate(" + s + "px, " + i + "px)")),
              (y.translate = y.isHorizontal() ? s : i);
            var n = y.maxTranslate() - y.minTranslate();
            (0 === n ? 0 : (e - y.minTranslate()) / n) !== y.progress &&
              y.updateProgress(e),
              a && y.updateActiveIndex(),
              "slide" !== y.params.effect &&
                y.effects[y.params.effect] &&
                y.effects[y.params.effect].setTranslate(y.translate),
              y.params.parallax &&
                y.parallax &&
                y.parallax.setTranslate(y.translate),
              y.params.scrollbar &&
                y.scrollbar &&
                y.scrollbar.setTranslate(y.translate),
              y.params.control &&
                y.controller &&
                y.controller.setTranslate(y.translate, t),
              y.emit("onSetTranslate", y, y.translate);
          }),
          (y.getTranslate = function(e, a) {
            var t, s, r, i;
            return (
              void 0 === a && (a = "x"),
              y.params.virtualTranslate
                ? y.rtl
                  ? -y.translate
                  : y.translate
                : ((r = window.getComputedStyle(e, null)),
                  window.WebKitCSSMatrix
                    ? ((s = r.transform || r.webkitTransform).split(",")
                        .length > 6 &&
                        (s = s
                          .split(", ")
                          .map(function(e) {
                            return e.replace(",", ".");
                          })
                          .join(", ")),
                      (i = new window.WebKitCSSMatrix("none" === s ? "" : s)))
                    : ((i =
                        r.MozTransform ||
                        r.OTransform ||
                        r.MsTransform ||
                        r.msTransform ||
                        r.transform ||
                        r
                          .getPropertyValue("transform")
                          .replace("translate(", "matrix(1, 0, 0, 1,")),
                      (t = i.toString().split(","))),
                  "x" === a &&
                    (s = window.WebKitCSSMatrix
                      ? i.m41
                      : 16 === t.length
                      ? parseFloat(t[12])
                      : parseFloat(t[4])),
                  "y" === a &&
                    (s = window.WebKitCSSMatrix
                      ? i.m42
                      : 16 === t.length
                      ? parseFloat(t[13])
                      : parseFloat(t[5])),
                  y.rtl && s && (s = -s),
                  s || 0)
            );
          }),
          (y.getWrapperTranslate = function(e) {
            return (
              void 0 === e && (e = y.isHorizontal() ? "x" : "y"),
              y.getTranslate(y.wrapper[0], e)
            );
          }),
          (y.observers = []),
          (y.initObservers = function() {
            if (y.params.observeParents)
              for (var e = y.container.parents(), a = 0; a < e.length; a++)
                o(e[a]);
            o(y.container[0], { childList: !1 }),
              o(y.wrapper[0], { attributes: !1 });
          }),
          (y.disconnectObservers = function() {
            for (var e = 0; e < y.observers.length; e++)
              y.observers[e].disconnect();
            y.observers = [];
          }),
          (y.createLoop = function() {
            y.wrapper
              .children(
                "." + y.params.slideClass + "." + y.params.slideDuplicateClass
              )
              .remove();
            var a = y.wrapper.children("." + y.params.slideClass);
            "auto" !== y.params.slidesPerView ||
              y.params.loopedSlides ||
              (y.params.loopedSlides = a.length),
              (y.loopedSlides = parseInt(
                y.params.loopedSlides || y.params.slidesPerView,
                10
              )),
              (y.loopedSlides = y.loopedSlides + y.params.loopAdditionalSlides),
              y.loopedSlides > a.length && (y.loopedSlides = a.length);
            var t,
              s = [],
              r = [];
            for (
              a.each(function(t, i) {
                var n = e(this);
                t < y.loopedSlides && r.push(i),
                  t < a.length && t >= a.length - y.loopedSlides && s.push(i),
                  n.attr("data-swiper-slide-index", t);
              }),
                t = 0;
              t < r.length;
              t++
            )
              y.wrapper.append(
                e(r[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass)
              );
            for (t = s.length - 1; t >= 0; t--)
              y.wrapper.prepend(
                e(s[t].cloneNode(!0)).addClass(y.params.slideDuplicateClass)
              );
          }),
          (y.destroyLoop = function() {
            y.wrapper
              .children(
                "." + y.params.slideClass + "." + y.params.slideDuplicateClass
              )
              .remove(),
              y.slides.removeAttr("data-swiper-slide-index");
          }),
          (y.reLoop = function(e) {
            var a = y.activeIndex - y.loopedSlides;
            y.destroyLoop(),
              y.createLoop(),
              y.updateSlidesSize(),
              e && y.slideTo(a + y.loopedSlides, 0, !1);
          }),
          (y.fixLoop = function() {
            var e;
            y.activeIndex < y.loopedSlides
              ? ((e = y.slides.length - 3 * y.loopedSlides + y.activeIndex),
                (e += y.loopedSlides),
                y.slideTo(e, 0, !1, !0))
              : (("auto" === y.params.slidesPerView &&
                  y.activeIndex >= 2 * y.loopedSlides) ||
                  y.activeIndex >
                    y.slides.length - 2 * y.params.slidesPerView) &&
                ((e = -y.slides.length + y.activeIndex + y.loopedSlides),
                (e += y.loopedSlides),
                y.slideTo(e, 0, !1, !0));
          }),
          (y.appendSlide = function(e) {
            if (
              (y.params.loop && y.destroyLoop(),
              "object" == typeof e && e.length)
            )
              for (var a = 0; a < e.length; a++) e[a] && y.wrapper.append(e[a]);
            else y.wrapper.append(e);
            y.params.loop && y.createLoop(),
              (y.params.observer && y.support.observer) || y.update(!0);
          }),
          (y.prependSlide = function(e) {
            y.params.loop && y.destroyLoop();
            var a = y.activeIndex + 1;
            if ("object" == typeof e && e.length) {
              for (var t = 0; t < e.length; t++)
                e[t] && y.wrapper.prepend(e[t]);
              a = y.activeIndex + e.length;
            } else y.wrapper.prepend(e);
            y.params.loop && y.createLoop(),
              (y.params.observer && y.support.observer) || y.update(!0),
              y.slideTo(a, 0, !1);
          }),
          (y.removeSlide = function(e) {
            y.params.loop &&
              (y.destroyLoop(),
              (y.slides = y.wrapper.children("." + y.params.slideClass)));
            var a,
              t = y.activeIndex;
            if ("object" == typeof e && e.length) {
              for (var s = 0; s < e.length; s++)
                (a = e[s]),
                  y.slides[a] && y.slides.eq(a).remove(),
                  a < t && t--;
              t = Math.max(t, 0);
            } else
              (a = e),
                y.slides[a] && y.slides.eq(a).remove(),
                a < t && t--,
                (t = Math.max(t, 0));
            y.params.loop && y.createLoop(),
              (y.params.observer && y.support.observer) || y.update(!0),
              y.params.loop
                ? y.slideTo(t + y.loopedSlides, 0, !1)
                : y.slideTo(t, 0, !1);
          }),
          (y.removeAllSlides = function() {
            for (var e = [], a = 0; a < y.slides.length; a++) e.push(a);
            y.removeSlide(e);
          }),
          (y.effects = {
            fade: {
              setTranslate: function() {
                for (var e = 0; e < y.slides.length; e++) {
                  var a = y.slides.eq(e),
                    t = -a[0].swiperSlideOffset;
                  y.params.virtualTranslate || (t -= y.translate);
                  var s = 0;
                  y.isHorizontal() || ((s = t), (t = 0));
                  var r = y.params.fade.crossFade
                    ? Math.max(1 - Math.abs(a[0].progress), 0)
                    : 1 + Math.min(Math.max(a[0].progress, -1), 0);
                  a.css({ opacity: r }).transform(
                    "translate3d(" + t + "px, " + s + "px, 0px)"
                  );
                }
              },
              setTransition: function(e) {
                if (
                  (y.slides.transition(e), y.params.virtualTranslate && 0 !== e)
                ) {
                  var a = !1;
                  y.slides.transitionEnd(function() {
                    if (!a && y) {
                      (a = !0), (y.animating = !1);
                      for (
                        var e = [
                            "webkitTransitionEnd",
                            "transitionend",
                            "oTransitionEnd",
                            "MSTransitionEnd",
                            "msTransitionEnd"
                          ],
                          t = 0;
                        t < e.length;
                        t++
                      )
                        y.wrapper.trigger(e[t]);
                    }
                  });
                }
              }
            },
            flip: {
              setTranslate: function() {
                for (var a = 0; a < y.slides.length; a++) {
                  var t = y.slides.eq(a),
                    s = t[0].progress;
                  y.params.flip.limitRotation &&
                    (s = Math.max(Math.min(t[0].progress, 1), -1));
                  var r = -180 * s,
                    i = 0,
                    n = -t[0].swiperSlideOffset,
                    o = 0;
                  if (
                    (y.isHorizontal()
                      ? y.rtl && (r = -r)
                      : ((o = n), (n = 0), (i = -r), (r = 0)),
                    (t[0].style.zIndex =
                      -Math.abs(Math.round(s)) + y.slides.length),
                    y.params.flip.slideShadows)
                  ) {
                    var l = y.isHorizontal()
                        ? t.find(".swiper-slide-shadow-left")
                        : t.find(".swiper-slide-shadow-top"),
                      p = y.isHorizontal()
                        ? t.find(".swiper-slide-shadow-right")
                        : t.find(".swiper-slide-shadow-bottom");
                    0 === l.length &&
                      ((l = e(
                        '<div class="swiper-slide-shadow-' +
                          (y.isHorizontal() ? "left" : "top") +
                          '"></div>'
                      )),
                      t.append(l)),
                      0 === p.length &&
                        ((p = e(
                          '<div class="swiper-slide-shadow-' +
                            (y.isHorizontal() ? "right" : "bottom") +
                            '"></div>'
                        )),
                        t.append(p)),
                      l.length && (l[0].style.opacity = Math.max(-s, 0)),
                      p.length && (p[0].style.opacity = Math.max(s, 0));
                  }
                  t.transform(
                    "translate3d(" +
                      n +
                      "px, " +
                      o +
                      "px, 0px) rotateX(" +
                      i +
                      "deg) rotateY(" +
                      r +
                      "deg)"
                  );
                }
              },
              setTransition: function(a) {
                if (
                  (y.slides
                    .transition(a)
                    .find(
                      ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                    )
                    .transition(a),
                  y.params.virtualTranslate && 0 !== a)
                ) {
                  var t = !1;
                  y.slides.eq(y.activeIndex).transitionEnd(function() {
                    if (
                      !t &&
                      y &&
                      e(this).hasClass(y.params.slideActiveClass)
                    ) {
                      (t = !0), (y.animating = !1);
                      for (
                        var a = [
                            "webkitTransitionEnd",
                            "transitionend",
                            "oTransitionEnd",
                            "MSTransitionEnd",
                            "msTransitionEnd"
                          ],
                          s = 0;
                        s < a.length;
                        s++
                      )
                        y.wrapper.trigger(a[s]);
                    }
                  });
                }
              }
            },
            cube: {
              setTranslate: function() {
                var a,
                  t = 0;
                y.params.cube.shadow &&
                  (y.isHorizontal()
                    ? (0 ===
                        (a = y.wrapper.find(".swiper-cube-shadow")).length &&
                        ((a = e('<div class="swiper-cube-shadow"></div>')),
                        y.wrapper.append(a)),
                      a.css({ height: y.width + "px" }))
                    : 0 ===
                        (a = y.container.find(".swiper-cube-shadow")).length &&
                      ((a = e('<div class="swiper-cube-shadow"></div>')),
                      y.container.append(a)));
                for (var s = 0; s < y.slides.length; s++) {
                  var r = y.slides.eq(s),
                    i = 90 * s,
                    n = Math.floor(i / 360);
                  y.rtl && ((i = -i), (n = Math.floor(-i / 360)));
                  var o = Math.max(Math.min(r[0].progress, 1), -1),
                    l = 0,
                    p = 0,
                    d = 0;
                  s % 4 == 0
                    ? ((l = 4 * -n * y.size), (d = 0))
                    : (s - 1) % 4 == 0
                    ? ((l = 0), (d = 4 * -n * y.size))
                    : (s - 2) % 4 == 0
                    ? ((l = y.size + 4 * n * y.size), (d = y.size))
                    : (s - 3) % 4 == 0 &&
                      ((l = -y.size), (d = 3 * y.size + 4 * y.size * n)),
                    y.rtl && (l = -l),
                    y.isHorizontal() || ((p = l), (l = 0));
                  var m =
                    "rotateX(" +
                    (y.isHorizontal() ? 0 : -i) +
                    "deg) rotateY(" +
                    (y.isHorizontal() ? i : 0) +
                    "deg) translate3d(" +
                    l +
                    "px, " +
                    p +
                    "px, " +
                    d +
                    "px)";
                  if (
                    (o <= 1 &&
                      o > -1 &&
                      ((t = 90 * s + 90 * o), y.rtl && (t = 90 * -s - 90 * o)),
                    r.transform(m),
                    y.params.cube.slideShadows)
                  ) {
                    var u = y.isHorizontal()
                        ? r.find(".swiper-slide-shadow-left")
                        : r.find(".swiper-slide-shadow-top"),
                      c = y.isHorizontal()
                        ? r.find(".swiper-slide-shadow-right")
                        : r.find(".swiper-slide-shadow-bottom");
                    0 === u.length &&
                      ((u = e(
                        '<div class="swiper-slide-shadow-' +
                          (y.isHorizontal() ? "left" : "top") +
                          '"></div>'
                      )),
                      r.append(u)),
                      0 === c.length &&
                        ((c = e(
                          '<div class="swiper-slide-shadow-' +
                            (y.isHorizontal() ? "right" : "bottom") +
                            '"></div>'
                        )),
                        r.append(c)),
                      u.length && (u[0].style.opacity = Math.max(-o, 0)),
                      c.length && (c[0].style.opacity = Math.max(o, 0));
                  }
                }
                if (
                  (y.wrapper.css({
                    "-webkit-transform-origin": "50% 50% -" + y.size / 2 + "px",
                    "-moz-transform-origin": "50% 50% -" + y.size / 2 + "px",
                    "-ms-transform-origin": "50% 50% -" + y.size / 2 + "px",
                    "transform-origin": "50% 50% -" + y.size / 2 + "px"
                  }),
                  y.params.cube.shadow)
                )
                  if (y.isHorizontal())
                    a.transform(
                      "translate3d(0px, " +
                        (y.width / 2 + y.params.cube.shadowOffset) +
                        "px, " +
                        -y.width / 2 +
                        "px) rotateX(90deg) rotateZ(0deg) scale(" +
                        y.params.cube.shadowScale +
                        ")"
                    );
                  else {
                    var g = Math.abs(t) - 90 * Math.floor(Math.abs(t) / 90),
                      h =
                        1.5 -
                        (Math.sin((2 * g * Math.PI) / 360) / 2 +
                          Math.cos((2 * g * Math.PI) / 360) / 2),
                      v = y.params.cube.shadowScale,
                      f = y.params.cube.shadowScale / h,
                      w = y.params.cube.shadowOffset;
                    a.transform(
                      "scale3d(" +
                        v +
                        ", 1, " +
                        f +
                        ") translate3d(0px, " +
                        (y.height / 2 + w) +
                        "px, " +
                        -y.height / 2 / f +
                        "px) rotateX(-90deg)"
                    );
                  }
                var x = y.isSafari || y.isUiWebView ? -y.size / 2 : 0;
                y.wrapper.transform(
                  "translate3d(0px,0," +
                    x +
                    "px) rotateX(" +
                    (y.isHorizontal() ? 0 : t) +
                    "deg) rotateY(" +
                    (y.isHorizontal() ? -t : 0) +
                    "deg)"
                );
              },
              setTransition: function(e) {
                y.slides
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e),
                  y.params.cube.shadow &&
                    !y.isHorizontal() &&
                    y.container.find(".swiper-cube-shadow").transition(e);
              }
            },
            coverflow: {
              setTranslate: function() {
                for (
                  var a = y.translate,
                    t = y.isHorizontal() ? -a + y.width / 2 : -a + y.height / 2,
                    s = y.isHorizontal()
                      ? y.params.coverflow.rotate
                      : -y.params.coverflow.rotate,
                    r = y.params.coverflow.depth,
                    i = 0,
                    n = y.slides.length;
                  i < n;
                  i++
                ) {
                  var o = y.slides.eq(i),
                    l = y.slidesSizesGrid[i],
                    p =
                      ((t - o[0].swiperSlideOffset - l / 2) / l) *
                      y.params.coverflow.modifier,
                    d = y.isHorizontal() ? s * p : 0,
                    m = y.isHorizontal() ? 0 : s * p,
                    u = -r * Math.abs(p),
                    c = y.isHorizontal() ? 0 : y.params.coverflow.stretch * p,
                    g = y.isHorizontal() ? y.params.coverflow.stretch * p : 0;
                  Math.abs(g) < 0.001 && (g = 0),
                    Math.abs(c) < 0.001 && (c = 0),
                    Math.abs(u) < 0.001 && (u = 0),
                    Math.abs(d) < 0.001 && (d = 0),
                    Math.abs(m) < 0.001 && (m = 0);
                  var h =
                    "translate3d(" +
                    g +
                    "px," +
                    c +
                    "px," +
                    u +
                    "px)  rotateX(" +
                    m +
                    "deg) rotateY(" +
                    d +
                    "deg)";
                  if (
                    (o.transform(h),
                    (o[0].style.zIndex = 1 - Math.abs(Math.round(p))),
                    y.params.coverflow.slideShadows)
                  ) {
                    var v = y.isHorizontal()
                        ? o.find(".swiper-slide-shadow-left")
                        : o.find(".swiper-slide-shadow-top"),
                      f = y.isHorizontal()
                        ? o.find(".swiper-slide-shadow-right")
                        : o.find(".swiper-slide-shadow-bottom");
                    0 === v.length &&
                      ((v = e(
                        '<div class="swiper-slide-shadow-' +
                          (y.isHorizontal() ? "left" : "top") +
                          '"></div>'
                      )),
                      o.append(v)),
                      0 === f.length &&
                        ((f = e(
                          '<div class="swiper-slide-shadow-' +
                            (y.isHorizontal() ? "right" : "bottom") +
                            '"></div>'
                        )),
                        o.append(f)),
                      v.length && (v[0].style.opacity = p > 0 ? p : 0),
                      f.length && (f[0].style.opacity = -p > 0 ? -p : 0);
                  }
                }
                y.browser.ie &&
                  (y.wrapper[0].style.perspectiveOrigin = t + "px 50%");
              },
              setTransition: function(e) {
                y.slides
                  .transition(e)
                  .find(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                  )
                  .transition(e);
              }
            }
          }),
          (y.lazy = {
            initialImageLoaded: !1,
            loadImageInSlide: function(a, t) {
              if (
                void 0 !== a &&
                (void 0 === t && (t = !0), 0 !== y.slides.length)
              ) {
                var s = y.slides.eq(a),
                  r = s.find(
                    "." +
                      y.params.lazyLoadingClass +
                      ":not(." +
                      y.params.lazyStatusLoadedClass +
                      "):not(." +
                      y.params.lazyStatusLoadingClass +
                      ")"
                  );
                !s.hasClass(y.params.lazyLoadingClass) ||
                  s.hasClass(y.params.lazyStatusLoadedClass) ||
                  s.hasClass(y.params.lazyStatusLoadingClass) ||
                  (r = r.add(s[0])),
                  0 !== r.length &&
                    r.each(function() {
                      var a = e(this);
                      a.addClass(y.params.lazyStatusLoadingClass);
                      var r = a.attr("data-background"),
                        i = a.attr("data-src"),
                        n = a.attr("data-srcset"),
                        o = a.attr("data-sizes");
                      y.loadImage(a[0], i || r, n, o, !1, function() {
                        if (void 0 !== y && null !== y && y) {
                          if (
                            (r
                              ? (a.css("background-image", 'url("' + r + '")'),
                                a.removeAttr("data-background"))
                              : (n &&
                                  (a.attr("srcset", n),
                                  a.removeAttr("data-srcset")),
                                o &&
                                  (a.attr("sizes", o),
                                  a.removeAttr("data-sizes")),
                                i &&
                                  (a.attr("src", i), a.removeAttr("data-src"))),
                            a
                              .addClass(y.params.lazyStatusLoadedClass)
                              .removeClass(y.params.lazyStatusLoadingClass),
                            s
                              .find(
                                "." +
                                  y.params.lazyPreloaderClass +
                                  ", ." +
                                  y.params.preloaderClass
                              )
                              .remove(),
                            y.params.loop && t)
                          ) {
                            var e = s.attr("data-swiper-slide-index");
                            if (s.hasClass(y.params.slideDuplicateClass)) {
                              var l = y.wrapper.children(
                                '[data-swiper-slide-index="' +
                                  e +
                                  '"]:not(.' +
                                  y.params.slideDuplicateClass +
                                  ")"
                              );
                              y.lazy.loadImageInSlide(l.index(), !1);
                            } else {
                              var p = y.wrapper.children(
                                "." +
                                  y.params.slideDuplicateClass +
                                  '[data-swiper-slide-index="' +
                                  e +
                                  '"]'
                              );
                              y.lazy.loadImageInSlide(p.index(), !1);
                            }
                          }
                          y.emit("onLazyImageReady", y, s[0], a[0]);
                        }
                      }),
                        y.emit("onLazyImageLoad", y, s[0], a[0]);
                    });
              }
            },
            load: function() {
              var a,
                t = y.params.slidesPerView;
              if (
                ("auto" === t && (t = 0),
                y.lazy.initialImageLoaded || (y.lazy.initialImageLoaded = !0),
                y.params.watchSlidesVisibility)
              )
                y.wrapper
                  .children("." + y.params.slideVisibleClass)
                  .each(function() {
                    y.lazy.loadImageInSlide(e(this).index());
                  });
              else if (t > 1)
                for (a = y.activeIndex; a < y.activeIndex + t; a++)
                  y.slides[a] && y.lazy.loadImageInSlide(a);
              else y.lazy.loadImageInSlide(y.activeIndex);
              if (y.params.lazyLoadingInPrevNext)
                if (
                  t > 1 ||
                  (y.params.lazyLoadingInPrevNextAmount &&
                    y.params.lazyLoadingInPrevNextAmount > 1)
                ) {
                  var s = y.params.lazyLoadingInPrevNextAmount,
                    r = t,
                    i = Math.min(
                      y.activeIndex + r + Math.max(s, r),
                      y.slides.length
                    ),
                    n = Math.max(y.activeIndex - Math.max(r, s), 0);
                  for (a = y.activeIndex + t; a < i; a++)
                    y.slides[a] && y.lazy.loadImageInSlide(a);
                  for (a = n; a < y.activeIndex; a++)
                    y.slides[a] && y.lazy.loadImageInSlide(a);
                } else {
                  var o = y.wrapper.children("." + y.params.slideNextClass);
                  o.length > 0 && y.lazy.loadImageInSlide(o.index());
                  var l = y.wrapper.children("." + y.params.slidePrevClass);
                  l.length > 0 && y.lazy.loadImageInSlide(l.index());
                }
            },
            onTransitionStart: function() {
              y.params.lazyLoading &&
                (y.params.lazyLoadingOnTransitionStart ||
                  (!y.params.lazyLoadingOnTransitionStart &&
                    !y.lazy.initialImageLoaded)) &&
                y.lazy.load();
            },
            onTransitionEnd: function() {
              y.params.lazyLoading &&
                !y.params.lazyLoadingOnTransitionStart &&
                y.lazy.load();
            }
          }),
          (y.scrollbar = {
            isTouched: !1,
            setDragPosition: function(e) {
              var a = y.scrollbar,
                t =
                  (y.isHorizontal()
                    ? "touchstart" === e.type || "touchmove" === e.type
                      ? e.targetTouches[0].pageX
                      : e.pageX || e.clientX
                    : "touchstart" === e.type || "touchmove" === e.type
                    ? e.targetTouches[0].pageY
                    : e.pageY || e.clientY) -
                  a.track.offset()[y.isHorizontal() ? "left" : "top"] -
                  a.dragSize / 2,
                s = -y.minTranslate() * a.moveDivider,
                r = -y.maxTranslate() * a.moveDivider;
              t < s ? (t = s) : t > r && (t = r),
                (t = -t / a.moveDivider),
                y.updateProgress(t),
                y.setWrapperTranslate(t, !0);
            },
            dragStart: function(e) {
              var a = y.scrollbar;
              (a.isTouched = !0),
                e.preventDefault(),
                e.stopPropagation(),
                a.setDragPosition(e),
                clearTimeout(a.dragTimeout),
                a.track.transition(0),
                y.params.scrollbarHide && a.track.css("opacity", 1),
                y.wrapper.transition(100),
                a.drag.transition(100),
                y.emit("onScrollbarDragStart", y);
            },
            dragMove: function(e) {
              var a = y.scrollbar;
              a.isTouched &&
                (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
                a.setDragPosition(e),
                y.wrapper.transition(0),
                a.track.transition(0),
                a.drag.transition(0),
                y.emit("onScrollbarDragMove", y));
            },
            dragEnd: function(e) {
              var a = y.scrollbar;
              a.isTouched &&
                ((a.isTouched = !1),
                y.params.scrollbarHide &&
                  (clearTimeout(a.dragTimeout),
                  (a.dragTimeout = setTimeout(function() {
                    a.track.css("opacity", 0), a.track.transition(400);
                  }, 1e3))),
                y.emit("onScrollbarDragEnd", y),
                y.params.scrollbarSnapOnRelease && y.slideReset());
            },
            draggableEvents:
              !1 !== y.params.simulateTouch || y.support.touch
                ? y.touchEvents
                : y.touchEventsDesktop,
            enableDraggable: function() {
              var a = y.scrollbar,
                t = y.support.touch ? a.track : document;
              e(a.track).on(a.draggableEvents.start, a.dragStart),
                e(t).on(a.draggableEvents.move, a.dragMove),
                e(t).on(a.draggableEvents.end, a.dragEnd);
            },
            disableDraggable: function() {
              var a = y.scrollbar,
                t = y.support.touch ? a.track : document;
              e(a.track).off(a.draggableEvents.start, a.dragStart),
                e(t).off(a.draggableEvents.move, a.dragMove),
                e(t).off(a.draggableEvents.end, a.dragEnd);
            },
            set: function() {
              if (y.params.scrollbar) {
                var a = y.scrollbar;
                (a.track = e(y.params.scrollbar)),
                  y.params.uniqueNavElements &&
                    "string" == typeof y.params.scrollbar &&
                    a.track.length > 1 &&
                    1 === y.container.find(y.params.scrollbar).length &&
                    (a.track = y.container.find(y.params.scrollbar)),
                  (a.drag = a.track.find(".swiper-scrollbar-drag")),
                  0 === a.drag.length &&
                    ((a.drag = e('<div class="swiper-scrollbar-drag"></div>')),
                    a.track.append(a.drag)),
                  (a.drag[0].style.width = ""),
                  (a.drag[0].style.height = ""),
                  (a.trackSize = y.isHorizontal()
                    ? a.track[0].offsetWidth
                    : a.track[0].offsetHeight),
                  (a.divider = y.size / y.virtualSize),
                  (a.moveDivider = a.divider * (a.trackSize / y.size)),
                  (a.dragSize = a.trackSize * a.divider),
                  y.isHorizontal()
                    ? (a.drag[0].style.width = a.dragSize + "px")
                    : (a.drag[0].style.height = a.dragSize + "px"),
                  a.divider >= 1
                    ? (a.track[0].style.display = "none")
                    : (a.track[0].style.display = ""),
                  y.params.scrollbarHide && (a.track[0].style.opacity = 0);
              }
            },
            setTranslate: function() {
              if (y.params.scrollbar) {
                var e,
                  a = y.scrollbar,
                  t = (y.translate, a.dragSize);
                (e = (a.trackSize - a.dragSize) * y.progress),
                  y.rtl && y.isHorizontal()
                    ? ((e = -e),
                      e > 0
                        ? ((t = a.dragSize - e), (e = 0))
                        : -e + a.dragSize > a.trackSize &&
                          (t = a.trackSize + e))
                    : e < 0
                    ? ((t = a.dragSize + e), (e = 0))
                    : e + a.dragSize > a.trackSize && (t = a.trackSize - e),
                  y.isHorizontal()
                    ? (y.support.transforms3d
                        ? a.drag.transform("translate3d(" + e + "px, 0, 0)")
                        : a.drag.transform("translateX(" + e + "px)"),
                      (a.drag[0].style.width = t + "px"))
                    : (y.support.transforms3d
                        ? a.drag.transform("translate3d(0px, " + e + "px, 0)")
                        : a.drag.transform("translateY(" + e + "px)"),
                      (a.drag[0].style.height = t + "px")),
                  y.params.scrollbarHide &&
                    (clearTimeout(a.timeout),
                    (a.track[0].style.opacity = 1),
                    (a.timeout = setTimeout(function() {
                      (a.track[0].style.opacity = 0), a.track.transition(400);
                    }, 1e3)));
              }
            },
            setTransition: function(e) {
              y.params.scrollbar && y.scrollbar.drag.transition(e);
            }
          }),
          (y.controller = {
            LinearSpline: function(e, a) {
              var t = (function() {
                var e, a, t;
                return function(s, r) {
                  for (a = -1, e = s.length; e - a > 1; )
                    s[(t = (e + a) >> 1)] <= r ? (a = t) : (e = t);
                  return e;
                };
              })();
              (this.x = e), (this.y = a), (this.lastIndex = e.length - 1);
              var s, r;
              this.x.length,
                (this.interpolate = function(e) {
                  return e
                    ? ((r = t(this.x, e)),
                      (s = r - 1),
                      ((e - this.x[s]) * (this.y[r] - this.y[s])) /
                        (this.x[r] - this.x[s]) +
                        this.y[s])
                    : 0;
                });
            },
            getInterpolateFunction: function(e) {
              y.controller.spline ||
                (y.controller.spline = y.params.loop
                  ? new y.controller.LinearSpline(y.slidesGrid, e.slidesGrid)
                  : new y.controller.LinearSpline(y.snapGrid, e.snapGrid));
            },
            setTranslate: function(e, t) {
              function s(a) {
                (e =
                  a.rtl && "horizontal" === a.params.direction
                    ? -y.translate
                    : y.translate),
                  "slide" === y.params.controlBy &&
                    (y.controller.getInterpolateFunction(a),
                    (i = -y.controller.spline.interpolate(-e))),
                  (i && "container" !== y.params.controlBy) ||
                    ((r =
                      (a.maxTranslate() - a.minTranslate()) /
                      (y.maxTranslate() - y.minTranslate())),
                    (i = (e - y.minTranslate()) * r + a.minTranslate())),
                  y.params.controlInverse && (i = a.maxTranslate() - i),
                  a.updateProgress(i),
                  a.setWrapperTranslate(i, !1, y),
                  a.updateActiveIndex();
              }
              var r,
                i,
                n = y.params.control;
              if (Array.isArray(n))
                for (var o = 0; o < n.length; o++)
                  n[o] !== t && n[o] instanceof a && s(n[o]);
              else n instanceof a && t !== n && s(n);
            },
            setTransition: function(e, t) {
              function s(a) {
                a.setWrapperTransition(e, y),
                  0 !== e &&
                    (a.onTransitionStart(),
                    a.wrapper.transitionEnd(function() {
                      i &&
                        (a.params.loop &&
                          "slide" === y.params.controlBy &&
                          a.fixLoop(),
                        a.onTransitionEnd());
                    }));
              }
              var r,
                i = y.params.control;
              if (Array.isArray(i))
                for (r = 0; r < i.length; r++)
                  i[r] !== t && i[r] instanceof a && s(i[r]);
              else i instanceof a && t !== i && s(i);
            }
          }),
          (y.hashnav = {
            onHashCange: function(e, a) {
              var t = document.location.hash.replace("#", "");
              t !== y.slides.eq(y.activeIndex).attr("data-hash") &&
                y.slideTo(
                  y.wrapper
                    .children(
                      "." + y.params.slideClass + '[data-hash="' + t + '"]'
                    )
                    .index()
                );
            },
            attachEvents: function(a) {
              var t = a ? "off" : "on";
              e(window)[t]("hashchange", y.hashnav.onHashCange);
            },
            setHash: function() {
              if (y.hashnav.initialized && y.params.hashnav)
                if (
                  y.params.replaceState &&
                  window.history &&
                  window.history.replaceState
                )
                  window.history.replaceState(
                    null,
                    null,
                    "#" + y.slides.eq(y.activeIndex).attr("data-hash") || ""
                  );
                else {
                  var e = y.slides.eq(y.activeIndex),
                    a = e.attr("data-hash") || e.attr("data-history");
                  document.location.hash = a || "";
                }
            },
            init: function() {
              if (y.params.hashnav && !y.params.history) {
                y.hashnav.initialized = !0;
                var e = document.location.hash.replace("#", "");
                if (e)
                  for (var a = 0, t = y.slides.length; a < t; a++) {
                    var s = y.slides.eq(a);
                    if (
                      (s.attr("data-hash") || s.attr("data-history")) === e &&
                      !s.hasClass(y.params.slideDuplicateClass)
                    ) {
                      var r = s.index();
                      y.slideTo(r, 0, y.params.runCallbacksOnInit, !0);
                    }
                  }
                y.params.hashnavWatchState && y.hashnav.attachEvents();
              }
            },
            destroy: function() {
              y.params.hashnavWatchState && y.hashnav.attachEvents(!0);
            }
          }),
          (y.history = {
            init: function() {
              if (y.params.history) {
                if (!window.history || !window.history.pushState)
                  return (y.params.history = !1), void (y.params.hashnav = !0);
                (y.history.initialized = !0),
                  (this.paths = this.getPathValues()),
                  (this.paths.key || this.paths.value) &&
                    (this.scrollToSlide(
                      0,
                      this.paths.value,
                      y.params.runCallbacksOnInit
                    ),
                    y.params.replaceState ||
                      window.addEventListener(
                        "popstate",
                        this.setHistoryPopState
                      ));
              }
            },
            setHistoryPopState: function() {
              (y.history.paths = y.history.getPathValues()),
                y.history.scrollToSlide(
                  y.params.speed,
                  y.history.paths.value,
                  !1
                );
            },
            getPathValues: function() {
              var e = window.location.pathname.slice(1).split("/"),
                a = e.length;
              return { key: e[a - 2], value: e[a - 1] };
            },
            setHistory: function(e, a) {
              if (y.history.initialized && y.params.history) {
                var t = y.slides.eq(a),
                  s = this.slugify(t.attr("data-history"));
                window.location.pathname.includes(e) || (s = e + "/" + s),
                  y.params.replaceState
                    ? window.history.replaceState(null, null, s)
                    : window.history.pushState(null, null, s);
              }
            },
            slugify: function(e) {
              return e
                .toString()
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w\-]+/g, "")
                .replace(/\-\-+/g, "-")
                .replace(/^-+/, "")
                .replace(/-+$/, "");
            },
            scrollToSlide: function(e, a, t) {
              if (a)
                for (var s = 0, r = y.slides.length; s < r; s++) {
                  var i = y.slides.eq(s);
                  if (
                    this.slugify(i.attr("data-history")) === a &&
                    !i.hasClass(y.params.slideDuplicateClass)
                  ) {
                    var n = i.index();
                    y.slideTo(n, e, t);
                  }
                }
              else y.slideTo(0, e, t);
            }
          }),
          (y.disableKeyboardControl = function() {
            (y.params.keyboardControl = !1), e(document).off("keydown", l);
          }),
          (y.enableKeyboardControl = function() {
            (y.params.keyboardControl = !0), e(document).on("keydown", l);
          }),
          (y.mousewheel = {
            event: !1,
            lastScrollTime: new window.Date().getTime()
          }),
          y.params.mousewheelControl &&
            (y.mousewheel.event =
              navigator.userAgent.indexOf("firefox") > -1
                ? "DOMMouseScroll"
                : (function() {
                    var e = "onwheel" in document;
                    if (!e) {
                      var a = document.createElement("div");
                      a.setAttribute("onwheel", "return;"),
                        (e = "function" == typeof a.onwheel);
                    }
                    return (
                      !e &&
                        document.implementation &&
                        document.implementation.hasFeature &&
                        !0 !== document.implementation.hasFeature("", "") &&
                        (e = document.implementation.hasFeature(
                          "Events.wheel",
                          "3.0"
                        )),
                      e
                    );
                  })()
                ? "wheel"
                : "mousewheel"),
          (y.disableMousewheelControl = function() {
            if (!y.mousewheel.event) return !1;
            var a = y.container;
            return (
              "container" !== y.params.mousewheelEventsTarged &&
                (a = e(y.params.mousewheelEventsTarged)),
              a.off(y.mousewheel.event, d),
              (y.params.mousewheelControl = !1),
              !0
            );
          }),
          (y.enableMousewheelControl = function() {
            if (!y.mousewheel.event) return !1;
            var a = y.container;
            return (
              "container" !== y.params.mousewheelEventsTarged &&
                (a = e(y.params.mousewheelEventsTarged)),
              a.on(y.mousewheel.event, d),
              (y.params.mousewheelControl = !0),
              !0
            );
          }),
          (y.parallax = {
            setTranslate: function() {
              y.container
                .children(
                  "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                )
                .each(function() {
                  m(this, y.progress);
                }),
                y.slides.each(function() {
                  var a = e(this);
                  a.find(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                  ).each(function() {
                    m(this, Math.min(Math.max(a[0].progress, -1), 1));
                  });
                });
            },
            setTransition: function(a) {
              void 0 === a && (a = y.params.speed),
                y.container
                  .find(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                  )
                  .each(function() {
                    var t = e(this),
                      s =
                        parseInt(t.attr("data-swiper-parallax-duration"), 10) ||
                        a;
                    0 === a && (s = 0), t.transition(s);
                  });
            }
          }),
          (y.zoom = {
            scale: 1,
            currentScale: 1,
            isScaling: !1,
            gesture: {
              slide: void 0,
              slideWidth: void 0,
              slideHeight: void 0,
              image: void 0,
              imageWrap: void 0,
              zoomMax: y.params.zoomMax
            },
            image: {
              isTouched: void 0,
              isMoved: void 0,
              currentX: void 0,
              currentY: void 0,
              minX: void 0,
              minY: void 0,
              maxX: void 0,
              maxY: void 0,
              width: void 0,
              height: void 0,
              startX: void 0,
              startY: void 0,
              touchesStart: {},
              touchesCurrent: {}
            },
            velocity: {
              x: void 0,
              y: void 0,
              prevPositionX: void 0,
              prevPositionY: void 0,
              prevTime: void 0
            },
            getDistanceBetweenTouches: function(e) {
              if (e.targetTouches.length < 2) return 1;
              var a = e.targetTouches[0].pageX,
                t = e.targetTouches[0].pageY,
                s = e.targetTouches[1].pageX,
                r = e.targetTouches[1].pageY;
              return Math.sqrt(Math.pow(s - a, 2) + Math.pow(r - t, 2));
            },
            onGestureStart: function(a) {
              var t = y.zoom;
              if (!y.support.gestures) {
                if (
                  "touchstart" !== a.type ||
                  ("touchstart" === a.type && a.targetTouches.length < 2)
                )
                  return;
                t.gesture.scaleStart = t.getDistanceBetweenTouches(a);
              }
              (t.gesture.slide && t.gesture.slide.length) ||
              ((t.gesture.slide = e(this)),
              0 === t.gesture.slide.length &&
                (t.gesture.slide = y.slides.eq(y.activeIndex)),
              (t.gesture.image = t.gesture.slide.find("img, svg, canvas")),
              (t.gesture.imageWrap = t.gesture.image.parent(
                "." + y.params.zoomContainerClass
              )),
              (t.gesture.zoomMax =
                t.gesture.imageWrap.attr("data-swiper-zoom") ||
                y.params.zoomMax),
              0 !== t.gesture.imageWrap.length)
                ? (t.gesture.image.transition(0), (t.isScaling = !0))
                : (t.gesture.image = void 0);
            },
            onGestureChange: function(e) {
              var a = y.zoom;
              if (!y.support.gestures) {
                if (
                  "touchmove" !== e.type ||
                  ("touchmove" === e.type && e.targetTouches.length < 2)
                )
                  return;
                a.gesture.scaleMove = a.getDistanceBetweenTouches(e);
              }
              a.gesture.image &&
                0 !== a.gesture.image.length &&
                (y.support.gestures
                  ? (a.scale = e.scale * a.currentScale)
                  : (a.scale =
                      (a.gesture.scaleMove / a.gesture.scaleStart) *
                      a.currentScale),
                a.scale > a.gesture.zoomMax &&
                  (a.scale =
                    a.gesture.zoomMax -
                    1 +
                    Math.pow(a.scale - a.gesture.zoomMax + 1, 0.5)),
                a.scale < y.params.zoomMin &&
                  (a.scale =
                    y.params.zoomMin +
                    1 -
                    Math.pow(y.params.zoomMin - a.scale + 1, 0.5)),
                a.gesture.image.transform(
                  "translate3d(0,0,0) scale(" + a.scale + ")"
                ));
            },
            onGestureEnd: function(e) {
              var a = y.zoom;
              (!y.support.gestures &&
                ("touchend" !== e.type ||
                  ("touchend" === e.type && e.changedTouches.length < 2))) ||
                (a.gesture.image &&
                  0 !== a.gesture.image.length &&
                  ((a.scale = Math.max(
                    Math.min(a.scale, a.gesture.zoomMax),
                    y.params.zoomMin
                  )),
                  a.gesture.image
                    .transition(y.params.speed)
                    .transform("translate3d(0,0,0) scale(" + a.scale + ")"),
                  (a.currentScale = a.scale),
                  (a.isScaling = !1),
                  1 === a.scale && (a.gesture.slide = void 0)));
            },
            onTouchStart: function(e, a) {
              var t = e.zoom;
              t.gesture.image &&
                0 !== t.gesture.image.length &&
                (t.image.isTouched ||
                  ("android" === e.device.os && a.preventDefault(),
                  (t.image.isTouched = !0),
                  (t.image.touchesStart.x =
                    "touchstart" === a.type
                      ? a.targetTouches[0].pageX
                      : a.pageX),
                  (t.image.touchesStart.y =
                    "touchstart" === a.type
                      ? a.targetTouches[0].pageY
                      : a.pageY)));
            },
            onTouchMove: function(e) {
              var a = y.zoom;
              if (
                a.gesture.image &&
                0 !== a.gesture.image.length &&
                ((y.allowClick = !1), a.image.isTouched && a.gesture.slide)
              ) {
                a.image.isMoved ||
                  ((a.image.width = a.gesture.image[0].offsetWidth),
                  (a.image.height = a.gesture.image[0].offsetHeight),
                  (a.image.startX =
                    y.getTranslate(a.gesture.imageWrap[0], "x") || 0),
                  (a.image.startY =
                    y.getTranslate(a.gesture.imageWrap[0], "y") || 0),
                  (a.gesture.slideWidth = a.gesture.slide[0].offsetWidth),
                  (a.gesture.slideHeight = a.gesture.slide[0].offsetHeight),
                  a.gesture.imageWrap.transition(0),
                  y.rtl && (a.image.startX = -a.image.startX),
                  y.rtl && (a.image.startY = -a.image.startY));
                var t = a.image.width * a.scale,
                  s = a.image.height * a.scale;
                if (!(t < a.gesture.slideWidth && s < a.gesture.slideHeight)) {
                  if (
                    ((a.image.minX = Math.min(
                      a.gesture.slideWidth / 2 - t / 2,
                      0
                    )),
                    (a.image.maxX = -a.image.minX),
                    (a.image.minY = Math.min(
                      a.gesture.slideHeight / 2 - s / 2,
                      0
                    )),
                    (a.image.maxY = -a.image.minY),
                    (a.image.touchesCurrent.x =
                      "touchmove" === e.type
                        ? e.targetTouches[0].pageX
                        : e.pageX),
                    (a.image.touchesCurrent.y =
                      "touchmove" === e.type
                        ? e.targetTouches[0].pageY
                        : e.pageY),
                    !a.image.isMoved && !a.isScaling)
                  ) {
                    if (
                      (y.isHorizontal() &&
                        Math.floor(a.image.minX) ===
                          Math.floor(a.image.startX) &&
                        a.image.touchesCurrent.x < a.image.touchesStart.x) ||
                      (Math.floor(a.image.maxX) ===
                        Math.floor(a.image.startX) &&
                        a.image.touchesCurrent.x > a.image.touchesStart.x)
                    )
                      return void (a.image.isTouched = !1);
                    if (
                      (!y.isHorizontal() &&
                        Math.floor(a.image.minY) ===
                          Math.floor(a.image.startY) &&
                        a.image.touchesCurrent.y < a.image.touchesStart.y) ||
                      (Math.floor(a.image.maxY) ===
                        Math.floor(a.image.startY) &&
                        a.image.touchesCurrent.y > a.image.touchesStart.y)
                    )
                      return void (a.image.isTouched = !1);
                  }
                  e.preventDefault(),
                    e.stopPropagation(),
                    (a.image.isMoved = !0),
                    (a.image.currentX =
                      a.image.touchesCurrent.x -
                      a.image.touchesStart.x +
                      a.image.startX),
                    (a.image.currentY =
                      a.image.touchesCurrent.y -
                      a.image.touchesStart.y +
                      a.image.startY),
                    a.image.currentX < a.image.minX &&
                      (a.image.currentX =
                        a.image.minX +
                        1 -
                        Math.pow(a.image.minX - a.image.currentX + 1, 0.8)),
                    a.image.currentX > a.image.maxX &&
                      (a.image.currentX =
                        a.image.maxX -
                        1 +
                        Math.pow(a.image.currentX - a.image.maxX + 1, 0.8)),
                    a.image.currentY < a.image.minY &&
                      (a.image.currentY =
                        a.image.minY +
                        1 -
                        Math.pow(a.image.minY - a.image.currentY + 1, 0.8)),
                    a.image.currentY > a.image.maxY &&
                      (a.image.currentY =
                        a.image.maxY -
                        1 +
                        Math.pow(a.image.currentY - a.image.maxY + 1, 0.8)),
                    a.velocity.prevPositionX ||
                      (a.velocity.prevPositionX = a.image.touchesCurrent.x),
                    a.velocity.prevPositionY ||
                      (a.velocity.prevPositionY = a.image.touchesCurrent.y),
                    a.velocity.prevTime || (a.velocity.prevTime = Date.now()),
                    (a.velocity.x =
                      (a.image.touchesCurrent.x - a.velocity.prevPositionX) /
                      (Date.now() - a.velocity.prevTime) /
                      2),
                    (a.velocity.y =
                      (a.image.touchesCurrent.y - a.velocity.prevPositionY) /
                      (Date.now() - a.velocity.prevTime) /
                      2),
                    Math.abs(
                      a.image.touchesCurrent.x - a.velocity.prevPositionX
                    ) < 2 && (a.velocity.x = 0),
                    Math.abs(
                      a.image.touchesCurrent.y - a.velocity.prevPositionY
                    ) < 2 && (a.velocity.y = 0),
                    (a.velocity.prevPositionX = a.image.touchesCurrent.x),
                    (a.velocity.prevPositionY = a.image.touchesCurrent.y),
                    (a.velocity.prevTime = Date.now()),
                    a.gesture.imageWrap.transform(
                      "translate3d(" +
                        a.image.currentX +
                        "px, " +
                        a.image.currentY +
                        "px,0)"
                    );
                }
              }
            },
            onTouchEnd: function(e, a) {
              var t = e.zoom;
              if (t.gesture.image && 0 !== t.gesture.image.length) {
                if (!t.image.isTouched || !t.image.isMoved)
                  return (t.image.isTouched = !1), void (t.image.isMoved = !1);
                (t.image.isTouched = !1), (t.image.isMoved = !1);
                var s = 300,
                  r = 300,
                  i = t.velocity.x * s,
                  n = t.image.currentX + i,
                  o = t.velocity.y * r,
                  l = t.image.currentY + o;
                0 !== t.velocity.x &&
                  (s = Math.abs((n - t.image.currentX) / t.velocity.x)),
                  0 !== t.velocity.y &&
                    (r = Math.abs((l - t.image.currentY) / t.velocity.y));
                var p = Math.max(s, r);
                (t.image.currentX = n), (t.image.currentY = l);
                var d = t.image.width * t.scale,
                  m = t.image.height * t.scale;
                (t.image.minX = Math.min(t.gesture.slideWidth / 2 - d / 2, 0)),
                  (t.image.maxX = -t.image.minX),
                  (t.image.minY = Math.min(
                    t.gesture.slideHeight / 2 - m / 2,
                    0
                  )),
                  (t.image.maxY = -t.image.minY),
                  (t.image.currentX = Math.max(
                    Math.min(t.image.currentX, t.image.maxX),
                    t.image.minX
                  )),
                  (t.image.currentY = Math.max(
                    Math.min(t.image.currentY, t.image.maxY),
                    t.image.minY
                  )),
                  t.gesture.imageWrap
                    .transition(p)
                    .transform(
                      "translate3d(" +
                        t.image.currentX +
                        "px, " +
                        t.image.currentY +
                        "px,0)"
                    );
              }
            },
            onTransitionEnd: function(e) {
              var a = e.zoom;
              a.gesture.slide &&
                e.previousIndex !== e.activeIndex &&
                (a.gesture.image.transform("translate3d(0,0,0) scale(1)"),
                a.gesture.imageWrap.transform("translate3d(0,0,0)"),
                (a.gesture.slide = a.gesture.image = a.gesture.imageWrap = void 0),
                (a.scale = a.currentScale = 1));
            },
            toggleZoom: function(a, t) {
              var s = a.zoom;
              if (
                (s.gesture.slide ||
                  ((s.gesture.slide = a.clickedSlide
                    ? e(a.clickedSlide)
                    : a.slides.eq(a.activeIndex)),
                  (s.gesture.image = s.gesture.slide.find("img, svg, canvas")),
                  (s.gesture.imageWrap = s.gesture.image.parent(
                    "." + a.params.zoomContainerClass
                  ))),
                s.gesture.image && 0 !== s.gesture.image.length)
              ) {
                var r, i, n, o, l, p, d, m, u, c, g, h, v, f, w, x, y, T;
                void 0 === s.image.touchesStart.x && t
                  ? ((r =
                      "touchend" === t.type
                        ? t.changedTouches[0].pageX
                        : t.pageX),
                    (i =
                      "touchend" === t.type
                        ? t.changedTouches[0].pageY
                        : t.pageY))
                  : ((r = s.image.touchesStart.x),
                    (i = s.image.touchesStart.y)),
                  s.scale && 1 !== s.scale
                    ? ((s.scale = s.currentScale = 1),
                      s.gesture.imageWrap
                        .transition(300)
                        .transform("translate3d(0,0,0)"),
                      s.gesture.image
                        .transition(300)
                        .transform("translate3d(0,0,0) scale(1)"),
                      (s.gesture.slide = void 0))
                    : ((s.scale = s.currentScale =
                        s.gesture.imageWrap.attr("data-swiper-zoom") ||
                        a.params.zoomMax),
                      t
                        ? ((y = s.gesture.slide[0].offsetWidth),
                          (T = s.gesture.slide[0].offsetHeight),
                          (n = s.gesture.slide.offset().left),
                          (o = s.gesture.slide.offset().top),
                          (l = n + y / 2 - r),
                          (p = o + T / 2 - i),
                          (u = s.gesture.image[0].offsetWidth),
                          (c = s.gesture.image[0].offsetHeight),
                          (g = u * s.scale),
                          (h = c * s.scale),
                          (v = Math.min(y / 2 - g / 2, 0)),
                          (f = Math.min(T / 2 - h / 2, 0)),
                          (w = -v),
                          (x = -f),
                          (d = l * s.scale),
                          (m = p * s.scale),
                          d < v && (d = v),
                          d > w && (d = w),
                          m < f && (m = f),
                          m > x && (m = x))
                        : ((d = 0), (m = 0)),
                      s.gesture.imageWrap
                        .transition(300)
                        .transform("translate3d(" + d + "px, " + m + "px,0)"),
                      s.gesture.image
                        .transition(300)
                        .transform(
                          "translate3d(0,0,0) scale(" + s.scale + ")"
                        ));
              }
            },
            attachEvents: function(a) {
              var t = a ? "off" : "on";
              if (y.params.zoom) {
                var s =
                  (y.slides,
                  !(
                    "touchstart" !== y.touchEvents.start ||
                    !y.support.passiveListener ||
                    !y.params.passiveListeners
                  ) && { passive: !0, capture: !1 });
                y.support.gestures
                  ? (y.slides[t]("gesturestart", y.zoom.onGestureStart, s),
                    y.slides[t]("gesturechange", y.zoom.onGestureChange, s),
                    y.slides[t]("gestureend", y.zoom.onGestureEnd, s))
                  : "touchstart" === y.touchEvents.start &&
                    (y.slides[t](y.touchEvents.start, y.zoom.onGestureStart, s),
                    y.slides[t](y.touchEvents.move, y.zoom.onGestureChange, s),
                    y.slides[t](y.touchEvents.end, y.zoom.onGestureEnd, s)),
                  y[t]("touchStart", y.zoom.onTouchStart),
                  y.slides.each(function(a, s) {
                    e(s).find("." + y.params.zoomContainerClass).length > 0 &&
                      e(s)[t](y.touchEvents.move, y.zoom.onTouchMove);
                  }),
                  y[t]("touchEnd", y.zoom.onTouchEnd),
                  y[t]("transitionEnd", y.zoom.onTransitionEnd),
                  y.params.zoomToggle && y.on("doubleTap", y.zoom.toggleZoom);
              }
            },
            init: function() {
              y.zoom.attachEvents();
            },
            destroy: function() {
              y.zoom.attachEvents(!0);
            }
          }),
          (y._plugins = []);
        for (var Y in y.plugins) {
          var A = y.plugins[Y](y, y.params[Y]);
          A && y._plugins.push(A);
        }
        return (
          (y.callPlugins = function(e) {
            for (var a = 0; a < y._plugins.length; a++)
              e in y._plugins[a] &&
                y._plugins[a][e](
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4],
                  arguments[5]
                );
          }),
          (y.emitterEventListeners = {}),
          (y.emit = function(e) {
            y.params[e] &&
              y.params[e](
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4],
                arguments[5]
              );
            var a;
            if (y.emitterEventListeners[e])
              for (a = 0; a < y.emitterEventListeners[e].length; a++)
                y.emitterEventListeners[e][a](
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4],
                  arguments[5]
                );
            y.callPlugins &&
              y.callPlugins(
                e,
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4],
                arguments[5]
              );
          }),
          (y.on = function(e, a) {
            return (
              (e = u(e)),
              y.emitterEventListeners[e] || (y.emitterEventListeners[e] = []),
              y.emitterEventListeners[e].push(a),
              y
            );
          }),
          (y.off = function(e, a) {
            var t;
            if (((e = u(e)), void 0 === a))
              return (y.emitterEventListeners[e] = []), y;
            if (
              y.emitterEventListeners[e] &&
              0 !== y.emitterEventListeners[e].length
            ) {
              for (t = 0; t < y.emitterEventListeners[e].length; t++)
                y.emitterEventListeners[e][t] === a &&
                  y.emitterEventListeners[e].splice(t, 1);
              return y;
            }
          }),
          (y.once = function(e, a) {
            e = u(e);
            var t = function() {
              a(
                arguments[0],
                arguments[1],
                arguments[2],
                arguments[3],
                arguments[4]
              ),
                y.off(e, t);
            };
            return y.on(e, t), y;
          }),
          (y.a11y = {
            makeFocusable: function(e) {
              return e.attr("tabIndex", "0"), e;
            },
            addRole: function(e, a) {
              return e.attr("role", a), e;
            },
            addLabel: function(e, a) {
              return e.attr("aria-label", a), e;
            },
            disable: function(e) {
              return e.attr("aria-disabled", !0), e;
            },
            enable: function(e) {
              return e.attr("aria-disabled", !1), e;
            },
            onEnterKey: function(a) {
              13 === a.keyCode &&
                (e(a.target).is(y.params.nextButton)
                  ? (y.onClickNext(a),
                    y.isEnd
                      ? y.a11y.notify(y.params.lastSlideMessage)
                      : y.a11y.notify(y.params.nextSlideMessage))
                  : e(a.target).is(y.params.prevButton) &&
                    (y.onClickPrev(a),
                    y.isBeginning
                      ? y.a11y.notify(y.params.firstSlideMessage)
                      : y.a11y.notify(y.params.prevSlideMessage)),
                e(a.target).is("." + y.params.bulletClass) &&
                  e(a.target)[0].click());
            },
            liveRegion: e(
              '<span class="' +
                y.params.notificationClass +
                '" aria-live="assertive" aria-atomic="true"></span>'
            ),
            notify: function(e) {
              var a = y.a11y.liveRegion;
              0 !== a.length && (a.html(""), a.html(e));
            },
            init: function() {
              y.params.nextButton &&
                y.nextButton &&
                y.nextButton.length > 0 &&
                (y.a11y.makeFocusable(y.nextButton),
                y.a11y.addRole(y.nextButton, "button"),
                y.a11y.addLabel(y.nextButton, y.params.nextSlideMessage)),
                y.params.prevButton &&
                  y.prevButton &&
                  y.prevButton.length > 0 &&
                  (y.a11y.makeFocusable(y.prevButton),
                  y.a11y.addRole(y.prevButton, "button"),
                  y.a11y.addLabel(y.prevButton, y.params.prevSlideMessage)),
                e(y.container).append(y.a11y.liveRegion);
            },
            initPagination: function() {
              y.params.pagination &&
                y.params.paginationClickable &&
                y.bullets &&
                y.bullets.length &&
                y.bullets.each(function() {
                  var a = e(this);
                  y.a11y.makeFocusable(a),
                    y.a11y.addRole(a, "button"),
                    y.a11y.addLabel(
                      a,
                      y.params.paginationBulletMessage.replace(
                        /{{index}}/,
                        a.index() + 1
                      )
                    );
                });
            },
            destroy: function() {
              y.a11y.liveRegion &&
                y.a11y.liveRegion.length > 0 &&
                y.a11y.liveRegion.remove();
            }
          }),
          (y.init = function() {
            y.params.loop && y.createLoop(),
              y.updateContainerSize(),
              y.updateSlidesSize(),
              y.updatePagination(),
              y.params.scrollbar &&
                y.scrollbar &&
                (y.scrollbar.set(),
                y.params.scrollbarDraggable && y.scrollbar.enableDraggable()),
              "slide" !== y.params.effect &&
                y.effects[y.params.effect] &&
                (y.params.loop || y.updateProgress(),
                y.effects[y.params.effect].setTranslate()),
              y.params.loop
                ? y.slideTo(
                    y.params.initialSlide + y.loopedSlides,
                    0,
                    y.params.runCallbacksOnInit
                  )
                : (y.slideTo(
                    y.params.initialSlide,
                    0,
                    y.params.runCallbacksOnInit
                  ),
                  0 === y.params.initialSlide &&
                    (y.parallax &&
                      y.params.parallax &&
                      y.parallax.setTranslate(),
                    y.lazy &&
                      y.params.lazyLoading &&
                      (y.lazy.load(), (y.lazy.initialImageLoaded = !0)))),
              y.attachEvents(),
              y.params.observer && y.support.observer && y.initObservers(),
              y.params.preloadImages &&
                !y.params.lazyLoading &&
                y.preloadImages(),
              y.params.zoom && y.zoom && y.zoom.init(),
              y.params.autoplay && y.startAutoplay(),
              y.params.keyboardControl &&
                y.enableKeyboardControl &&
                y.enableKeyboardControl(),
              y.params.mousewheelControl &&
                y.enableMousewheelControl &&
                y.enableMousewheelControl(),
              y.params.hashnavReplaceState &&
                (y.params.replaceState = y.params.hashnavReplaceState),
              y.params.history && y.history && y.history.init(),
              y.params.hashnav && y.hashnav && y.hashnav.init(),
              y.params.a11y && y.a11y && y.a11y.init(),
              y.emit("onInit", y);
          }),
          (y.cleanupStyles = function() {
            y.container.removeClass(y.classNames.join(" ")).removeAttr("style"),
              y.wrapper.removeAttr("style"),
              y.slides &&
                y.slides.length &&
                y.slides
                  .removeClass(
                    [
                      y.params.slideVisibleClass,
                      y.params.slideActiveClass,
                      y.params.slideNextClass,
                      y.params.slidePrevClass
                    ].join(" ")
                  )
                  .removeAttr("style")
                  .removeAttr("data-swiper-column")
                  .removeAttr("data-swiper-row"),
              y.paginationContainer &&
                y.paginationContainer.length &&
                y.paginationContainer.removeClass(
                  y.params.paginationHiddenClass
                ),
              y.bullets &&
                y.bullets.length &&
                y.bullets.removeClass(y.params.bulletActiveClass),
              y.params.prevButton &&
                e(y.params.prevButton).removeClass(
                  y.params.buttonDisabledClass
                ),
              y.params.nextButton &&
                e(y.params.nextButton).removeClass(
                  y.params.buttonDisabledClass
                ),
              y.params.scrollbar &&
                y.scrollbar &&
                (y.scrollbar.track &&
                  y.scrollbar.track.length &&
                  y.scrollbar.track.removeAttr("style"),
                y.scrollbar.drag &&
                  y.scrollbar.drag.length &&
                  y.scrollbar.drag.removeAttr("style"));
          }),
          (y.destroy = function(e, a) {
            y.detachEvents(),
              y.stopAutoplay(),
              y.params.scrollbar &&
                y.scrollbar &&
                y.params.scrollbarDraggable &&
                y.scrollbar.disableDraggable(),
              y.params.loop && y.destroyLoop(),
              a && y.cleanupStyles(),
              y.disconnectObservers(),
              y.params.zoom && y.zoom && y.zoom.destroy(),
              y.params.keyboardControl &&
                y.disableKeyboardControl &&
                y.disableKeyboardControl(),
              y.params.mousewheelControl &&
                y.disableMousewheelControl &&
                y.disableMousewheelControl(),
              y.params.a11y && y.a11y && y.a11y.destroy(),
              y.params.history &&
                !y.params.replaceState &&
                window.removeEventListener(
                  "popstate",
                  y.history.setHistoryPopState
                ),
              y.params.hashnav && y.hashnav && y.hashnav.destroy(),
              y.emit("onDestroy"),
              !1 !== e && (y = null);
          }),
          y.init(),
          y
        );
      }
    };
  a.prototype = {
    isSafari: (function() {
      var e = window.navigator.userAgent.toLowerCase();
      return (
        e.indexOf("safari") >= 0 &&
        e.indexOf("chrome") < 0 &&
        e.indexOf("android") < 0
      );
    })(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      window.navigator.userAgent
    ),
    isArray: function(e) {
      return "[object Array]" === Object.prototype.toString.apply(e);
    },
    browser: {
      ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
      ieTouch:
        (window.navigator.msPointerEnabled &&
          window.navigator.msMaxTouchPoints > 1) ||
        (window.navigator.pointerEnabled &&
          window.navigator.maxTouchPoints > 1),
      lteIE9: (function() {
        var e = document.createElement("div");
        return (
          (e.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e"),
          1 === e.getElementsByTagName("i").length
        );
      })()
    },
    device: (function() {
      var e = window.navigator.userAgent,
        a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
        t = e.match(/(iPad).*OS\s([\d_]+)/),
        s = e.match(/(iPod)(.*OS\s([\d_]+))?/),
        r = !t && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      return { ios: t || r || s, android: a };
    })(),
    support: {
      touch:
        (window.Modernizr && !0 === Modernizr.touch) ||
        !!(
          "ontouchstart" in window ||
          (window.DocumentTouch && document instanceof DocumentTouch)
        ),
      transforms3d:
        (window.Modernizr && !0 === Modernizr.csstransforms3d) ||
        (function() {
          var e = document.createElement("div").style;
          return (
            "webkitPerspective" in e ||
            "MozPerspective" in e ||
            "OPerspective" in e ||
            "MsPerspective" in e ||
            "perspective" in e
          );
        })(),
      flexbox: (function() {
        for (
          var e = document.createElement("div").style,
            a = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(
              " "
            ),
            t = 0;
          t < a.length;
          t++
        )
          if (a[t] in e) return !0;
      })(),
      observer:
        "MutationObserver" in window || "WebkitMutationObserver" in window,
      passiveListener: (function() {
        var e = !1;
        try {
          var a = Object.defineProperty({}, "passive", {
            get: function() {
              e = !0;
            }
          });
          window.addEventListener("testPassiveListener", null, a);
        } catch (e) {}
        return e;
      })(),
      gestures: "ongesturestart" in window
    },
    plugins: {}
  };
  for (var t = ["jQuery", "Zepto", "Dom7"], s = 0; s < t.length; s++)
    window[t[s]] &&
      (function(e) {
        e.fn.swiper = function(t) {
          var s;
          return (
            e(this).each(function() {
              var e = new a(this, t);
              s || (s = e);
            }),
            s
          );
        };
      })(window[t[s]]);
  var r;
  (r =
    "undefined" == typeof Dom7
      ? window.Dom7 || window.Zepto || window.jQuery
      : Dom7) &&
    ("transitionEnd" in r.fn ||
      (r.fn.transitionEnd = function(e) {
        function a(i) {
          if (i.target === this)
            for (e.call(this, i), t = 0; t < s.length; t++) r.off(s[t], a);
        }
        var t,
          s = [
            "webkitTransitionEnd",
            "transitionend",
            "oTransitionEnd",
            "MSTransitionEnd",
            "msTransitionEnd"
          ],
          r = this;
        if (e) for (t = 0; t < s.length; t++) r.on(s[t], a);
        return this;
      }),
    "transform" in r.fn ||
      (r.fn.transform = function(e) {
        for (var a = 0; a < this.length; a++) {
          var t = this[a].style;
          t.webkitTransform = t.MsTransform = t.msTransform = t.MozTransform = t.OTransform = t.transform = e;
        }
        return this;
      }),
    "transition" in r.fn ||
      (r.fn.transition = function(e) {
        "string" != typeof e && (e += "ms");
        for (var a = 0; a < this.length; a++) {
          var t = this[a].style;
          t.webkitTransitionDuration = t.MsTransitionDuration = t.msTransitionDuration = t.MozTransitionDuration = t.OTransitionDuration = t.transitionDuration = e;
        }
        return this;
      }),
    "outerWidth" in r.fn ||
      (r.fn.outerWidth = function(e) {
        return this.length > 0
          ? e
            ? this[0].offsetWidth +
              parseFloat(this.css("margin-right")) +
              parseFloat(this.css("margin-left"))
            : this[0].offsetWidth
          : null;
      })),
    (window.Swiper = a);
})(),
  "undefined" != typeof module
    ? (module.exports = window.Swiper)
    : "function" == typeof define &&
      define.amd &&
      define([], function() {
        "use strict";
        return window.Swiper;
      });
