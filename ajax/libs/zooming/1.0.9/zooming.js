(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Zooming = factory());
}(this, (function () { 'use strict';

var body = document.body;
var docElm = document.documentElement;
var trans = sniffTransition(document.createElement('div'));

function divide(denominator) {
  return function (numerator) {
    return numerator / denominator;
  };
}

function toggleListener(el, type, handler, add) {
  if (add) {
    el.addEventListener(type, handler[type]);
  } else {
    el.removeEventListener(type, handler[type]);
  }
}

function sniffTransition(el) {
  var ret = {};
  var trans = ['webkitTransition', 'transition', 'mozTransition'];
  var tform = ['webkitTransform', 'transform', 'mozTransform'];
  var end = {
    'transition': 'transitionend',
    'mozTransition': 'transitionend',
    'webkitTransition': 'webkitTransitionEnd'
  };

  trans.some(function (prop) {
    if (el.style[prop] !== undefined) {
      ret.transitionProp = prop;
      ret.transEndEvent = end[prop];
      return true;
    }
  });

  tform.some(function (prop) {
    if (el.style[prop] !== undefined) {
      ret.transformProp = prop;
      ret.transformCssProp = prop.replace(/(.*)Transform/, '-$1-transform');
      return true;
    }
  });

  return ret;
}

function checkTrans(styles) {
  var transitionProp = trans.transitionProp;
  var transformProp = trans.transformProp;

  var value = void 0;
  if (styles.transition) {
    value = styles.transition;
    delete styles.transition;
    styles[transitionProp] = value;
  }
  if (styles.transform) {
    value = styles.transform;
    delete styles.transform;
    styles[transformProp] = value;
  }
}

function isLink(el) {
  return el.tagName === 'A';
}

function isValidImage(filename) {
  return (/\.(gif|jpg|jpeg|png)$/i.test(filename)
  );
}

function isImageLink(el) {
  return isLink(el) && isValidImage(el.getAttribute('href'));
}

function hasComputedStyle(el, prop, value) {
  return getComputedStyle(el)[prop] === value;
}

var webkitPrefix = 'WebkitAppearance' in docElm.style ? '-webkit-' : '';

var cursor = {
  default: 'auto',
  zoomIn: webkitPrefix + 'zoom-in',
  zoomOut: webkitPrefix + 'zoom-out',
  grab: webkitPrefix + 'grab',
  move: 'move'
};

var half = divide(2);
var transformCssProp = trans.transformCssProp;
var transEndEvent = trans.transEndEvent;

function scrollTop() {
  return window.pageYOffset || (docElm || body.parentNode || body).scrollTop;
}

function getWindowCenter() {
  var docWidth = docElm.clientWidth || body.clientWidth;
  var docHeight = docElm.clientHeight || body.clientHeight;

  return {
    x: half(docWidth),
    y: half(docHeight)
  };
}

function toggleGrabListeners(el, handler, add) {
  ['mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend'].forEach(function (type) {
    toggleListener(el, type, handler, add);
  });
}

function setStyle(el, styles, remember) {
  checkTrans(styles);

  var s = el.style;
  var original = {};

  for (var key in styles) {
    if (remember) original[key] = s[key] || '';
    s[key] = styles[key];
  }

  return original;
}

function bindAll(_this, that) {
  var methods = Object.getOwnPropertyNames(Object.getPrototypeOf(_this));

  methods.forEach(function (method) {
    _this[method] = _this[method].bind(that);
  });
}

function loadImage(src, cb) {
  if (!src) return;

  var img = new Image();
  img.onload = function () {
    if (cb) cb(img);
  };
  img.src = src;
}

function checkOriginalImage(el, cb) {
  var srcOriginal = null;

  if (el.hasAttribute('data-original')) {
    srcOriginal = el.getAttribute('data-original');
  } else if (isImageLink(el.parentNode)) {
    srcOriginal = el.parentNode.getAttribute('href');
  }

  cb(srcOriginal);
}

function getParents(el, match) {
  var parents = [];

  for (; el && el !== document; el = el.parentNode) {
    if (match) {
      if (match(el)) {
        parents.push(el);
      }
    } else {
      parents.push(el);
    }
  }

  return parents;
}

function isOverflowHidden(el) {
  return hasComputedStyle(el, 'overflow', 'hidden');
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Target = function () {
  function Target(el, instance) {
    classCallCheck(this, Target);

    this.el = el;
    this.instance = instance;
    this.overflowHiddenParents = getParents(this.el.parentNode, isOverflowHidden);
    this.translate = null;
    this.scale = null;
    this.srcThumbnail = this.el.getAttribute('src');
    this.style = {
      open: null,
      close: null,
      overflowHiddenParents: {}
    };
  }

  createClass(Target, [{
    key: 'removeOverflowHidden',
    value: function removeOverflowHidden() {
      var _this = this;

      this.overflowHiddenParents.forEach(function (parent) {
        _this.style.overflowHiddenParents[parent] = setStyle(parent, {
          overflow: 'visible'
        }, true);
      });
    }
  }, {
    key: 'restoreOverflowHidden',
    value: function restoreOverflowHidden() {
      var _this2 = this;

      this.overflowHiddenParents.forEach(function (parent) {
        setStyle(parent, _this2.style.overflowHiddenParents[parent]);
      });
    }
  }, {
    key: 'zoomIn',
    value: function zoomIn() {
      var options = this.instance.options;

      var rect = this.el.getBoundingClientRect();
      this.translate = calculateTranslate(rect);
      this.scale = calculateScale(rect, options.scaleBase, options.customSize);

      // force layout update
      this.el.offsetWidth;

      this.style.open = {
        position: 'relative',
        zIndex: 999,
        cursor: options.enableGrab ? cursor.grab : cursor.zoomOut,
        transition: transformCssProp + '\n        ' + options.transitionDuration + 's\n        ' + options.transitionTimingFunction,
        transform: 'translate(' + this.translate.x + 'px, ' + this.translate.y + 'px)\n        scale(' + this.scale.x + ',' + this.scale.y + ')'
      };

      // trigger transition
      this.style.close = setStyle(this.el, this.style.open, true);
    }
  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      // force layout update
      this.el.offsetWidth;

      setStyle(this.el, { transform: 'none' });
    }
  }, {
    key: 'grab',
    value: function grab(x, y, scaleExtra) {
      var windowCenter = getWindowCenter();
      var dx = windowCenter.x - x,
          dy = windowCenter.y - y;


      setStyle(this.el, {
        cursor: cursor.move,
        transform: 'translate(\n        ' + (this.translate.x + dx) + 'px, ' + (this.translate.y + dy) + 'px)\n        scale(' + (this.scale.x + scaleExtra) + ',' + (this.scale.y + scaleExtra) + ')'
      });
    }
  }, {
    key: 'move',
    value: function move(x, y, scaleExtra) {
      var windowCenter = getWindowCenter();
      var dx = windowCenter.x - x,
          dy = windowCenter.y - y;


      setStyle(this.el, {
        transition: transformCssProp,
        transform: 'translate(\n        ' + (this.translate.x + dx) + 'px, ' + (this.translate.y + dy) + 'px)\n        scale(' + (this.scale.x + scaleExtra) + ',' + (this.scale.y + scaleExtra) + ')'
      });
    }
  }, {
    key: 'restoreCloseStyle',
    value: function restoreCloseStyle() {
      setStyle(this.el, this.style.close);
    }
  }, {
    key: 'restoreOpenStyle',
    value: function restoreOpenStyle() {
      setStyle(this.el, this.style.open);
    }
  }, {
    key: 'upgradeSource',
    value: function upgradeSource(dataOriginal) {
      var _this3 = this;

      if (!dataOriginal) return;

      var parentNode = this.el.parentNode;
      var temp = this.el.cloneNode(false);

      // force compute the hi-res image in DOM to prevent
      // image flickering while updating src
      temp.setAttribute('src', dataOriginal);
      temp.style.position = 'fixed';
      temp.style.visibility = 'hidden';
      parentNode.appendChild(temp);

      setTimeout(function () {
        _this3.el.setAttribute('src', dataOriginal);
        parentNode.removeChild(temp);
      }, 10);
    }
  }, {
    key: 'downgradeSource',
    value: function downgradeSource() {
      this.el.setAttribute('src', this.srcThumbnail);
    }
  }]);
  return Target;
}();

function calculateTranslate(rect) {
  var windowCenter = getWindowCenter();
  var targetCenter = {
    x: rect.left + half(rect.width),
    y: rect.top + half(rect.height)
  };

  // The vector to translate image to the window center
  return {
    x: windowCenter.x - targetCenter.x,
    y: windowCenter.y - targetCenter.y
  };
}

function calculateScale(rect, scaleBase, customSize) {
  if (customSize) {
    return {
      x: customSize.width / rect.width,
      y: customSize.height / rect.height
    };
  } else {
    var targetHalfWidth = half(rect.width);
    var targetHalfHeight = half(rect.height);
    var windowCenter = getWindowCenter();

    // The distance between target edge and window edge
    var targetEdgeToWindowEdge = {
      x: windowCenter.x - targetHalfWidth,
      y: windowCenter.y - targetHalfHeight
    };

    var scaleHorizontally = targetEdgeToWindowEdge.x / targetHalfWidth;
    var scaleVertically = targetEdgeToWindowEdge.y / targetHalfHeight;

    // The additional scale is based on the smaller value of
    // scaling horizontally and scaling vertically
    var scale = scaleBase + Math.min(scaleHorizontally, scaleVertically);

    return {
      x: scale,
      y: scale
    };
  }
}

var Overlay = function () {
  function Overlay(el, instance) {
    classCallCheck(this, Overlay);

    this.el = el;
    this.instance = instance;
    this.parent = document.body;
  }

  createClass(Overlay, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var options = this.instance.options;

      setStyle(this.el, {
        zIndex: 998,
        backgroundColor: options.bgColor,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        transition: 'opacity\n        ' + options.transitionDuration + 's\n        ' + options.transitionTimingFunction
      });

      this.el.addEventListener('click', function () {
        return _this.instance.close();
      });
    }
  }, {
    key: 'updateStyle',
    value: function updateStyle() {
      var options = this.instance.options;

      setStyle(this.el, {
        backgroundColor: options.bgColor,
        transition: 'opacity\n        ' + options.transitionDuration + 's\n        ' + options.transitionTimingFunction
      });
    }
  }, {
    key: 'insert',
    value: function insert() {
      this.parent.appendChild(this.el);
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.parent.removeChild(this.el);
    }
  }, {
    key: 'show',
    value: function show() {
      var _this2 = this;

      setTimeout(function () {
        return _this2.el.style.opacity = _this2.instance.options.bgOpacity;
      }, 30);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.el.style.opacity = 0;
    }
  }]);
  return Overlay;
}();

var PRESS_DELAY = 200;
var MULTITOUCH_SCALE_FACTOR = 2;

var EventHandler = function () {
  function EventHandler(instance) {
    classCallCheck(this, EventHandler);

    bindAll(this, instance);
  }

  createClass(EventHandler, [{
    key: 'click',
    value: function click(e) {
      e.preventDefault();

      if (this.shown) {
        if (this.released) this.close();else this.release();
      } else {
        this.open(e.currentTarget);
      }
    }
  }, {
    key: 'scroll',
    value: function scroll() {
      var st = scrollTop();

      if (this.lastScrollPosition === null) {
        this.lastScrollPosition = st;
      }

      var deltaY = this.lastScrollPosition - st;

      if (Math.abs(deltaY) >= this.options.scrollThreshold) {
        this.lastScrollPosition = null;
        this.close();
      }
    }
  }, {
    key: 'keydown',
    value: function keydown(e) {
      var _this = this;

      var code = e.key || e.code;
      if (code === 'Escape' || e.keyCode === 27) {
        if (this.released) this.close();else this.release(function () {
          return _this.close();
        });
      }
    }
  }, {
    key: 'mousedown',
    value: function mousedown(e) {
      var _this2 = this;

      if (e.button !== 0) return;
      e.preventDefault();

      this.pressTimer = setTimeout(function () {
        _this2.grab(e.clientX, e.clientY);
      }, PRESS_DELAY);
    }
  }, {
    key: 'mousemove',
    value: function mousemove(e) {
      if (this.released) return;
      this.move(e.clientX, e.clientY);
    }
  }, {
    key: 'mouseup',
    value: function mouseup(e) {
      if (e.button !== 0) return;
      clearTimeout(this.pressTimer);

      if (this.released) this.close();else this.release();
    }
  }, {
    key: 'touchstart',
    value: function touchstart(e) {
      var _this3 = this;

      e.preventDefault();

      this.pressTimer = setTimeout(function () {
        processTouches(e.touches, _this3.options.scaleExtra, function (x, y, scaleExtra) {
          _this3.grab(x, y, scaleExtra);
        });
      }, PRESS_DELAY);
    }
  }, {
    key: 'touchmove',
    value: function touchmove(e) {
      var _this4 = this;

      if (this.released) return;

      processTouches(e.touches, this.options.scaleExtra, function (x, y, scaleExtra) {
        _this4.move(x, y, scaleExtra);
      });
    }
  }, {
    key: 'touchend',
    value: function touchend(e) {
      if (e.targetTouches.length > 0) return;
      clearTimeout(this.pressTimer);

      if (this.released) this.close();else this.release();
    }
  }]);
  return EventHandler;
}();

function processTouches(touches, currScaleExtra, cb) {
  var total = touches.length;
  var firstTouch = touches[0];
  var multitouch = total > 1;

  var scaleExtra = currScaleExtra;
  var i = touches.length;
  var xs = 0,
      ys = 0;

  // keep track of the min and max of touch positions

  var min = { x: firstTouch.clientX, y: firstTouch.clientY };
  var max = { x: firstTouch.clientX, y: firstTouch.clientY };

  while (i--) {
    var t = touches[i];
    var _ref = [t.clientX, t.clientY],
        x = _ref[0],
        y = _ref[1];

    xs += x;
    ys += y;

    if (!multitouch) continue;

    if (x < min.x) {
      min.x = x;
    } else if (x > max.x) {
      max.x = x;
    }

    if (y < min.y) {
      min.y = y;
    } else if (y > max.y) {
      max.y = y;
    }
  }

  if (multitouch) {
    // change scaleExtra dynamically
    var distX = max.x - min.x,
        distY = max.y - min.y;


    if (distX > distY) {
      scaleExtra = distX / window.innerWidth * MULTITOUCH_SCALE_FACTOR;
    } else {
      scaleExtra = distY / window.innerHeight * MULTITOUCH_SCALE_FACTOR;
    }
  }

  cb(xs / total, ys / total, scaleExtra);
}

/**
 * A list of options.
 *
 * @type {Object}
 * @example
 * // Default options
 * var options = {
 *   defaultZoomable: 'img[data-action="zoom"]',
 *   enableGrab: true,
 *   preloadImage: true,
 *   transitionDuration: 0.4,
 *   transitionTimingFunction: 'cubic-bezier(0.4, 0, 0, 1)',
 *   bgColor: 'rgb(255, 255, 255)',
 *   bgOpacity: 1,
 *   scaleBase: 1.0,
 *   scaleExtra: 0.5,
 *   scrollThreshold: 40,
 *   customSize: null,
 *   onOpen: null,
 *   onClose: null,
 *   onRelease: null,
 *   onBeforeOpen: null,
 *   onBeforeClose: null,
 *   onBeforeGrab: null,
 *   onBeforeMove: null,
 *   onBeforeRelease: null
 * }
 */
var OPTIONS = {
  /**
   * Zoomable elements by default. It can be a css selector or an element.
   * @type {string|Element}
   */
  defaultZoomable: 'img[data-action="zoom"]',

  /**
   * To be able to grab and drag the image for extra zoom-in.
   * @type {boolean}
   */
  enableGrab: true,

  /**
   * Preload images with attribute "data-original".
   * @type {boolean}
   */
  preloadImage: true,

  /**
   * Transition duration in seconds.
   * @type {number}
   */
  transitionDuration: 0.4,

  /**
   * Transition timing function.
   * @type {string}
   */
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0, 1)',

  /**
   * Overlay background color.
   * @type {string}
   */
  bgColor: 'rgb(255, 255, 255)',

  /**
   * Overlay background opacity.
   * @type {number}
   */
  bgOpacity: 1,

  /**
   * The base scale factor for zooming. By default scale to fit the window.
   * @type {number}
   */
  scaleBase: 1.0,

  /**
   * The extra scale factor when grabbing the image.
   * @type {number}
   */
  scaleExtra: 0.5,

  /**
   * How much scrolling it takes before closing out.
   * @type {number}
   */
  scrollThreshold: 40,

  /**
   * Scale (zoom in) to given width and height. Ignore scaleBase if set.
   * @type {Object}
   * @example
   * customSize: { width: 800, height: 400 }
   */
  customSize: null,

  /**
   * A callback function that will be called when a target is opened and
   * transition has ended. It will get the target element as the argument.
   * @type {Function}
   */
  onOpen: null,

  /**
   * Same as above, except fired when closed.
   * @type {Function}
   */
  onClose: null,

  /**
   * Same as above, except fired when released.
   * @type {Function}
   */
  onRelease: null,

  /**
   * A callback function that will be called before open.
   * @type {Function}
   */
  onBeforeOpen: null,

  /**
   * A callback function that will be called before close.
   * @type {Function}
   */
  onBeforeClose: null,

  /**
   * A callback function that will be called before grab.
   * @type {Function}
   */
  onBeforeGrab: null,

  /**
   * A callback function that will be called before move.
   * @type {Function}
   */
  onBeforeMove: null,

  /**
   * A callback function that will be called before release.
   * @type {Function}
   */
  onBeforeRelease: null
};

/**
 * Zooming instance.
 */

var Zooming$1 = function () {

  /**
   * @param {Object} [options] Update default options if provided.
   */
  function Zooming(options) {
    classCallCheck(this, Zooming);

    // elements
    this.body = document.body;
    this.overlay = new Overlay(document.createElement('div'), this);
    this.target = null;

    // state
    this.shown = false; // target is open
    this.lock = false; // target is in transform
    this.released = true; // mouse/finger is not pressing down
    this.lastScrollPosition = null;
    this.pressTimer = null;

    this.options = Object.assign({}, OPTIONS);
    if (options) this.config(options);

    this.eventHandler = new EventHandler(this);
    this.overlay.init();
  }

  /**
   * Make element(s) zoomable.
   * @param  {string|Element} el A css selector or an Element.
   * @return {this}
   */


  createClass(Zooming, [{
    key: 'listen',
    value: function listen(el) {
      if (typeof el === 'string') {
        var els = document.querySelectorAll(el),
            i = els.length;

        while (i--) {
          this.listen(els[i]);
        }

        return this;
      }

      if (el.tagName !== 'IMG') return;

      el.style.cursor = cursor.zoomIn;
      el.addEventListener('click', this.eventHandler.click);

      if (this.options.preloadImage) {
        checkOriginalImage(el, function (srcOriginal) {
          return loadImage(srcOriginal);
        });
      }

      return this;
    }

    /**
     * Open (zoom in) the Element.
     * @param  {Element} el The Element to open.
     * @param  {Function} [cb=this.options.onOpen] A callback function that will
     * be called when a target is opened and transition has ended. It will get
     * the target element as the argument.
     * @return {this}
     */

  }, {
    key: 'open',
    value: function open(el) {
      var _this = this;

      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options.onOpen;

      if (this.shown || this.lock) return;

      var target = typeof el === 'string' ? document.querySelector(el) : el;

      if (target.tagName !== 'IMG') return;

      // onBeforeOpen event
      if (this.options.onBeforeOpen) this.options.onBeforeOpen(target);

      if (!this.options.preloadImage) {
        checkOriginalImage(target, function (srcOriginal) {
          return loadImage(srcOriginal);
        });
      }

      this.target = new Target(target, this);

      this.shown = true;
      this.lock = true;

      this.target.removeOverflowHidden();
      this.target.zoomIn();
      this.overlay.insert();
      this.overlay.show();

      document.addEventListener('scroll', this.eventHandler.scroll);
      document.addEventListener('keydown', this.eventHandler.keydown);

      var onEnd = function onEnd() {
        target.removeEventListener(transEndEvent, onEnd);

        _this.lock = false;

        checkOriginalImage(target, function (srcOriginal) {
          return _this.target.upgradeSource(srcOriginal);
        });

        if (_this.options.enableGrab) {
          toggleGrabListeners(document, _this.eventHandler, true);
        }

        if (cb) cb(target);
      };

      target.addEventListener(transEndEvent, onEnd);

      return this;
    }

    /**
     * Close (zoom out) the Element currently opened.
     * @param  {Function} [cb=this.options.onClose] A callback function that will
     * be called when a target is closed and transition has ended. It will get
     * the target element as the argument.
     * @return {this}
     */

  }, {
    key: 'close',
    value: function close() {
      var _this2 = this;

      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.onClose;

      if (!this.shown || this.lock) return;

      var target = this.target.el;

      // onBeforeClose event
      if (this.options.onBeforeClose) this.options.onBeforeClose(target);

      this.lock = true;

      this.body.style.cursor = cursor.default;
      this.overlay.hide();
      this.target.zoomOut();

      document.removeEventListener('scroll', this.eventHandler.scroll);
      document.removeEventListener('keydown', this.eventHandler.keydown);

      var onEnd = function onEnd() {
        target.removeEventListener(transEndEvent, onEnd);

        _this2.shown = false;
        _this2.lock = false;

        checkOriginalImage(target, function (srcOriginal) {
          if (srcOriginal) _this2.target.downgradeSource();
        });

        if (_this2.options.enableGrab) {
          toggleGrabListeners(document, _this2.eventHandler, false);
        }

        _this2.target.restoreOverflowHidden();
        _this2.target.restoreCloseStyle();
        _this2.overlay.remove();

        if (cb) cb(target);
      };

      target.addEventListener(transEndEvent, onEnd);

      return this;
    }

    /**
     * Grab the Element currently opened given a position and apply extra zoom-in.
     * @param  {number}   x The X-axis of where the press happened.
     * @param  {number}   y The Y-axis of where the press happened.
     * @param  {number}   scaleExtra Extra zoom-in to apply.
     * @param  {Function} [cb=this.options.scaleExtra] A callback function that
     * will be called when a target is grabbed and transition has ended. It
     * will get the target element as the argument.
     * @return {this}
     */

  }, {
    key: 'grab',
    value: function grab(x, y) {
      var scaleExtra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.options.scaleExtra;
      var cb = arguments[3];

      if (!this.shown || this.lock) return;

      var target = this.target.el;

      // onBeforeGrab event
      if (this.options.onBeforeGrab) this.options.onBeforeGrab(target);

      this.released = false;
      this.target.grab(x, y, scaleExtra);

      var onEnd = function onEnd() {
        target.removeEventListener(transEndEvent, onEnd);
        if (cb) cb(target);
      };

      target.addEventListener(transEndEvent, onEnd);
    }

    /**
     * Move the Element currently grabbed given a position and apply extra zoom-in.
     * @param  {number}   x The X-axis of where the press happened.
     * @param  {number}   y The Y-axis of where the press happened.
     * @param  {number}   scaleExtra Extra zoom-in to apply.
     * @param  {Function} [cb=this.options.scaleExtra] A callback function that
     * will be called when a target is moved and transition has ended. It will
     * get the target element as the argument.
     * @return {this}
     */

  }, {
    key: 'move',
    value: function move(x, y) {
      var scaleExtra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.options.scaleExtra;
      var cb = arguments[3];

      if (!this.shown || this.lock) return;

      var target = this.target.el;

      // onBeforeMove event
      if (this.options.onBeforeMove) this.options.onBeforeMove(target);

      this.released = false;

      this.target.move(x, y, scaleExtra);
      this.body.style.cursor = cursor.move;

      var onEnd = function onEnd() {
        target.removeEventListener(transEndEvent, onEnd);
        if (cb) cb(target);
      };

      target.addEventListener(transEndEvent, onEnd);
    }

    /**
     * Release the Element currently grabbed.
     * @param  {Function} [cb=this.options.onRelease] A callback function that
     * will be called when a target is released and transition has ended. It
     * will get the target element as the argument.
     * @return {this}
     */

  }, {
    key: 'release',
    value: function release() {
      var _this3 = this;

      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.onRelease;

      if (!this.shown || this.lock) return;

      var target = this.target.el;

      // onBeforeRelease event
      if (this.options.onBeforeRelease) this.options.onBeforeRelease(target);

      this.lock = true;

      this.target.restoreOpenStyle();
      this.body.style.cursor = cursor.default;

      var onEnd = function onEnd() {
        target.removeEventListener(transEndEvent, onEnd);

        _this3.lock = false;
        _this3.released = true;

        if (cb) cb(target);
      };

      target.addEventListener(transEndEvent, onEnd);

      return this;
    }

    /**
     * Update options.
     * @param  {Object} options An Object that contains this.options.
     * @return {this}
     */

  }, {
    key: 'config',
    value: function config(options) {
      if (!options) return this.options;

      for (var key in options) {
        this.options[key] = options[key];
      }

      this.overlay.updateStyle();

      return this;
    }
  }]);
  return Zooming;
}();

document.addEventListener('DOMContentLoaded', function () {
  new Zooming$1().listen(OPTIONS.defaultZoomable);
});

return Zooming$1;

})));
//# sourceMappingURL=zooming.js.map
