(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactDataGrid"] = factory(require("react"), require("react-dom"));
	else
		root["ReactDataGrid"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(196);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(80);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	function classNames() {
		var classes = '';
		var arg;

		for (var i = 0; i < arguments.length; i++) {
			arg = arguments[i];
			if (!arg) {
				continue;
			}

			if ('string' === typeof arg || 'number' === typeof arg) {
				classes += ' ' + arg;
			} else if (Object.prototype.toString.call(arg) === '[object Array]') {
				classes += ' ' + classNames.apply(null, arg);
			} else if ('object' === typeof arg) {
				for (var key in arg) {
					if (!arg.hasOwnProperty(key) || !arg[key]) {
						continue;
					}
					classes += ' ' + key;
				}
			}
		}
		return classes.substr(1);
	}

	// safely export classNames for node / browserify
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	}

	// safely export classNames for RequireJS
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  getColumn: function getColumn(columns, idx) {
	    if (Array.isArray(columns)) {
	      return columns[idx];
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.get(idx);
	    }
	  },
	  spliceColumn: function spliceColumn(metrics, idx, column) {
	    if (Array.isArray(metrics.columns)) {
	      metrics.columns.splice(idx, 1, column);
	    } else if (typeof Immutable !== 'undefined') {
	      metrics.columns = metrics.columns.splice(idx, 1, column);
	    }
	    return metrics;
	  },
	  getSize: function getSize(columns) {
	    if (Array.isArray(columns)) {
	      return columns.length;
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.size;
	    }
	  },


	  // Logic extented to allow for functions to be passed down in column.editable
	  // this allows us to deicde whether we can be edting from a cell level
	  canEdit: function canEdit(col, rowData, enableCellSelect) {
	    if (col.editable != null && typeof col.editable === 'function') {
	      return enableCellSelect === true && col.editable(rowData);
	    }
	    return enableCellSelect === true && (!!col.editor || !!col.editable);
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var ExcelColumnShape = {
	  name: React.PropTypes.node.isRequired,
	  key: React.PropTypes.string.isRequired,
	  width: React.PropTypes.number.isRequired,
	  filterable: React.PropTypes.bool
	};

	module.exports = ExcelColumnShape;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(220),
	    getValue = __webpack_require__(231);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var PropTypes = __webpack_require__(2).PropTypes;

	module.exports = {
	  selected: PropTypes.object.isRequired,
	  copied: PropTypes.object,
	  dragged: PropTypes.object,
	  onCellClick: PropTypes.func.isRequired,
	  onCellDoubleClick: PropTypes.func.isRequired,
	  onCommit: PropTypes.func.isRequired,
	  onCommitCancel: PropTypes.func.isRequired,
	  handleDragEnterRow: PropTypes.func.isRequired,
	  handleTerminateDrag: PropTypes.func.isRequired
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 19 */,
/* 20 */
/***/ function(module, exports) {

	"use strict";

	function createObjectWithProperties(originalObj, properties) {
	  var result = {};
	  for (var _iterator = properties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var property = _ref;

	    if (originalObj[property]) {
	      result[property] = originalObj[property];
	    }
	  }
	  return result;
	}

	module.exports = createObjectWithProperties;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(205);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./react-data-grid-header.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./react-data-grid-header.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(35),
	    getRawTag = __webpack_require__(228),
	    objectToString = __webpack_require__(252);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 23 */,
/* 24 */,
/* 25 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var shallowCloneObject = __webpack_require__(46);

	var contextTypes = {
	  metricsComputator: React.PropTypes.object
	};

	var MetricsComputatorMixin = {

	  childContextTypes: contextTypes,

	  getChildContext: function getChildContext() {
	    return { metricsComputator: this };
	  },
	  getMetricImpl: function getMetricImpl(name) {
	    return this._DOMMetrics.metrics[name].value;
	  },
	  registerMetricsImpl: function registerMetricsImpl(component, metrics) {
	    var getters = {};
	    var s = this._DOMMetrics;

	    for (var name in metrics) {
	      if (s.metrics[name] !== undefined) {
	        throw new Error('DOM metric ' + name + ' is already defined');
	      }
	      s.metrics[name] = { component: component, computator: metrics[name].bind(component) };
	      getters[name] = this.getMetricImpl.bind(null, name);
	    }

	    if (s.components.indexOf(component) === -1) {
	      s.components.push(component);
	    }

	    return getters;
	  },
	  unregisterMetricsFor: function unregisterMetricsFor(component) {
	    var s = this._DOMMetrics;
	    var idx = s.components.indexOf(component);

	    if (idx > -1) {
	      s.components.splice(idx, 1);

	      var name = void 0;
	      var metricsToDelete = {};

	      for (name in s.metrics) {
	        if (s.metrics[name].component === component) {
	          metricsToDelete[name] = true;
	        }
	      }

	      for (name in metricsToDelete) {
	        if (metricsToDelete.hasOwnProperty(name)) {
	          delete s.metrics[name];
	        }
	      }
	    }
	  },
	  updateMetrics: function updateMetrics() {
	    var s = this._DOMMetrics;

	    var needUpdate = false;

	    for (var name in s.metrics) {
	      if (!s.metrics.hasOwnProperty(name)) continue;

	      var newMetric = s.metrics[name].computator();
	      if (newMetric !== s.metrics[name].value) {
	        needUpdate = true;
	      }
	      s.metrics[name].value = newMetric;
	    }

	    if (needUpdate) {
	      for (var i = 0, len = s.components.length; i < len; i++) {
	        if (s.components[i].metricsUpdated) {
	          s.components[i].metricsUpdated();
	        }
	      }
	    }
	  },
	  componentWillMount: function componentWillMount() {
	    this._DOMMetrics = {
	      metrics: {},
	      components: []
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    if (window.addEventListener) {
	      window.addEventListener('resize', this.updateMetrics);
	    } else {
	      window.attachEvent('resize', this.updateMetrics);
	    }
	    this.updateMetrics();
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    window.removeEventListener('resize', this.updateMetrics);
	  }
	};

	var MetricsMixin = {

	  contextTypes: contextTypes,

	  componentWillMount: function componentWillMount() {
	    if (this.DOMMetrics) {
	      this._DOMMetricsDefs = shallowCloneObject(this.DOMMetrics);

	      this.DOMMetrics = {};
	      for (var name in this._DOMMetricsDefs) {
	        if (!this._DOMMetricsDefs.hasOwnProperty(name)) continue;

	        this.DOMMetrics[name] = function () {};
	      }
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    if (this.DOMMetrics) {
	      this.DOMMetrics = this.registerMetrics(this._DOMMetricsDefs);
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (!this.registerMetricsImpl) {
	      return this.context.metricsComputator.unregisterMetricsFor(this);
	    }
	    if (this.hasOwnProperty('DOMMetrics')) {
	      delete this.DOMMetrics;
	    }
	  },
	  registerMetrics: function registerMetrics(metrics) {
	    if (this.registerMetricsImpl) {
	      return this.registerMetricsImpl(this, metrics);
	    }

	    return this.context.metricsComputator.registerMetricsImpl(this, metrics);
	  },
	  getMetric: function getMetric(name) {
	    if (this.getMetricImpl) {
	      return this.getMetricImpl(name);
	    }

	    return this.context.metricsComputator.getMetricImpl(name);
	  }
	};

	module.exports = {
	  MetricsComputatorMixin: MetricsComputatorMixin,
	  MetricsMixin: MetricsMixin
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(239),
	    listCacheDelete = __webpack_require__(240),
	    listCacheGet = __webpack_require__(241),
	    listCacheHas = __webpack_require__(242),
	    listCacheSet = __webpack_require__(243);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(25);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 30 */,
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(237);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(14);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 33 */,
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(204);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./react-data-grid-core.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./react-data-grid-core.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(8);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(206);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./react-data-grid-row.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./react-data-grid-row.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(50),
	    setCacheAdd = __webpack_require__(253),
	    setCacheHas = __webpack_require__(254);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(83),
	    isLength = __webpack_require__(84);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var shallowCloneObject = __webpack_require__(46);
	var sameColumn = __webpack_require__(171);
	var ColumnUtils = __webpack_require__(11);
	var getScrollbarSize = __webpack_require__(45);
	var isColumnsImmutable = __webpack_require__(77);

	function setColumnWidths(columns, totalWidth) {
	  return columns.map(function (column) {
	    var colInfo = Object.assign({}, column);
	    if (column.width) {
	      if (/^([0-9]+)%$/.exec(column.width.toString())) {
	        colInfo.width = Math.floor(column.width / 100 * totalWidth);
	      }
	    }
	    return colInfo;
	  });
	}

	function setDefferedColumnWidths(columns, unallocatedWidth, minColumnWidth) {
	  var defferedColumns = columns.filter(function (c) {
	    return !c.width;
	  });
	  return columns.map(function (column) {
	    if (!column.width) {
	      if (unallocatedWidth <= 0) {
	        column.width = minColumnWidth;
	      } else {
	        column.width = Math.floor(unallocatedWidth / ColumnUtils.getSize(defferedColumns));
	      }
	    }
	    return column;
	  });
	}

	function setColumnOffsets(columns) {
	  var left = 0;
	  return columns.map(function (column) {
	    column.left = left;
	    left += column.width;
	    return column;
	  });
	}

	/**
	 * Update column metrics calculation.
	 *
	 * @param {ColumnMetricsType} metrics
	 */
	function recalculate(metrics) {
	  // compute width for columns which specify width
	  var columns = setColumnWidths(metrics.columns, metrics.totalWidth);

	  var unallocatedWidth = columns.filter(function (c) {
	    return c.width;
	  }).reduce(function (w, column) {
	    return w - column.width;
	  }, metrics.totalWidth);
	  unallocatedWidth -= getScrollbarSize();

	  var width = columns.filter(function (c) {
	    return c.width;
	  }).reduce(function (w, column) {
	    return w + column.width;
	  }, 0);

	  // compute width for columns which doesn't specify width
	  columns = setDefferedColumnWidths(columns, unallocatedWidth, metrics.minColumnWidth);

	  // compute left offset
	  columns = setColumnOffsets(columns);

	  return {
	    columns: columns,
	    width: width,
	    totalWidth: metrics.totalWidth,
	    minColumnWidth: metrics.minColumnWidth
	  };
	}

	/**
	 * Update column metrics calculation by resizing a column.
	 *
	 * @param {ColumnMetricsType} metrics
	 * @param {Column} column
	 * @param {number} width
	 */
	function resizeColumn(metrics, index, width) {
	  var column = ColumnUtils.getColumn(metrics.columns, index);
	  var metricsClone = shallowCloneObject(metrics);
	  metricsClone.columns = metrics.columns.slice(0);

	  var updatedColumn = shallowCloneObject(column);
	  updatedColumn.width = Math.max(width, metricsClone.minColumnWidth);

	  metricsClone = ColumnUtils.spliceColumn(metricsClone, index, updatedColumn);

	  return recalculate(metricsClone);
	}

	function areColumnsImmutable(prevColumns, nextColumns) {
	  return isColumnsImmutable(prevColumns) && isColumnsImmutable(nextColumns);
	}

	function compareEachColumn(prevColumns, nextColumns, isSameColumn) {
	  var i = void 0;
	  var len = void 0;
	  var column = void 0;
	  var prevColumnsByKey = {};
	  var nextColumnsByKey = {};

	  if (ColumnUtils.getSize(prevColumns) !== ColumnUtils.getSize(nextColumns)) {
	    return false;
	  }

	  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
	    column = prevColumns[i];
	    prevColumnsByKey[column.key] = column;
	  }

	  for (i = 0, len = ColumnUtils.getSize(nextColumns); i < len; i++) {
	    column = nextColumns[i];
	    nextColumnsByKey[column.key] = column;
	    var prevColumn = prevColumnsByKey[column.key];
	    if (prevColumn === undefined || !isSameColumn(prevColumn, column)) {
	      return false;
	    }
	  }

	  for (i = 0, len = ColumnUtils.getSize(prevColumns); i < len; i++) {
	    column = prevColumns[i];
	    var nextColumn = nextColumnsByKey[column.key];
	    if (nextColumn === undefined) {
	      return false;
	    }
	  }
	  return true;
	}

	function sameColumns(prevColumns, nextColumns, isSameColumn) {
	  if (areColumnsImmutable(prevColumns, nextColumns)) {
	    return prevColumns === nextColumns;
	  }

	  return compareEachColumn(prevColumns, nextColumns, isSameColumn);
	}

	module.exports = { recalculate: recalculate, resizeColumn: resizeColumn, sameColumn: sameColumn, sameColumns: sameColumns };

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _OverflowCell = __webpack_require__(180);

	var _OverflowCell2 = _interopRequireDefault(_OverflowCell);

	var _RowComparer = __webpack_require__(71);

	var _RowComparer2 = _interopRequireDefault(_RowComparer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(2);
	var joinClasses = __webpack_require__(10);
	var Cell = __webpack_require__(68);
	var ColumnUtilsMixin = __webpack_require__(11);
	var cellMetaDataShape = __webpack_require__(17);
	var PropTypes = React.PropTypes;
	var createObjectWithProperties = __webpack_require__(20);
	__webpack_require__(36);

	var CellExpander = React.createClass({
	  displayName: 'CellExpander',
	  render: function render() {
	    return React.createElement(Cell, this.props);
	  }
	});

	// The list of the propTypes that we want to include in the Row div
	var knownDivPropertyKeys = ['height'];

	var Row = React.createClass({
	  displayName: 'Row',


	  propTypes: {
	    height: PropTypes.number.isRequired,
	    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	    row: PropTypes.any.isRequired,
	    cellRenderer: PropTypes.func,
	    cellMetaData: PropTypes.shape(cellMetaDataShape),
	    isSelected: PropTypes.bool,
	    idx: PropTypes.number.isRequired,
	    expandedRows: PropTypes.arrayOf(PropTypes.object),
	    extraClasses: PropTypes.string,
	    forceUpdate: PropTypes.bool,
	    subRowDetails: PropTypes.object,
	    isRowHovered: PropTypes.bool,
	    colVisibleStart: PropTypes.number.isRequired,
	    colVisibleEnd: PropTypes.number.isRequired,
	    colDisplayStart: PropTypes.number.isRequired,
	    colDisplayEnd: PropTypes.number.isRequired,
	    isScrolling: React.PropTypes.bool.isRequired
	  },

	  mixins: [ColumnUtilsMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      cellRenderer: Cell,
	      isSelected: false,
	      height: 35
	    };
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return (0, _RowComparer2['default'])(nextProps, this.props);
	  },
	  handleDragEnter: function handleDragEnter() {
	    var handleDragEnterRow = this.props.cellMetaData.handleDragEnterRow;
	    if (handleDragEnterRow) {
	      handleDragEnterRow(this.props.idx);
	    }
	  },
	  getSelectedColumn: function getSelectedColumn() {
	    if (this.props.cellMetaData) {
	      var selected = this.props.cellMetaData.selected;
	      if (selected && selected.idx) {
	        return this.getColumn(this.props.columns, selected.idx);
	      }
	    }
	  },
	  getCellRenderer: function getCellRenderer(columnKey) {
	    var CellRenderer = this.props.cellRenderer;
	    if (this.props.subRowDetails && this.props.subRowDetails.field === columnKey) {
	      return CellExpander;
	    }
	    return CellRenderer;
	  },
	  getCell: function getCell(column, i, selectedColumn) {
	    var CellRenderer = this.props.cellRenderer;
	    var _props = this.props,
	        colVisibleStart = _props.colVisibleStart,
	        colVisibleEnd = _props.colVisibleEnd,
	        idx = _props.idx,
	        cellMetaData = _props.cellMetaData;
	    var key = column.key,
	        formatter = column.formatter,
	        locked = column.locked;

	    var baseCellProps = { key: key + '-' + idx, idx: i, rowIdx: idx, height: this.getRowHeight(), column: column, cellMetaData: cellMetaData };

	    if ((i < colVisibleStart || i > colVisibleEnd) && !locked) {
	      return React.createElement(_OverflowCell2['default'], _extends({ ref: key }, baseCellProps));
	    }

	    var _props2 = this.props,
	        row = _props2.row,
	        isSelected = _props2.isSelected;

	    var cellProps = {
	      ref: key,
	      value: this.getCellValue(key || i),
	      rowData: row,
	      isRowSelected: isSelected,
	      expandableOptions: this.getExpandableOptions(key),
	      selectedColumn: selectedColumn,
	      formatter: formatter,
	      isScrolling: this.props.isScrolling
	    };

	    return React.createElement(CellRenderer, _extends({}, baseCellProps, cellProps));
	  },
	  getCells: function getCells() {
	    var _this = this;

	    var cells = [];
	    var lockedCells = [];
	    var selectedColumn = this.getSelectedColumn();
	    if (this.props.columns) {
	      this.props.columns.forEach(function (column, i) {
	        var cell = _this.getCell(column, i, selectedColumn);
	        if (column.locked) {
	          lockedCells.push(cell);
	        } else {
	          cells.push(cell);
	        }
	      });
	    }

	    return cells.concat(lockedCells);
	  },
	  getRowHeight: function getRowHeight() {
	    var rows = this.props.expandedRows || null;
	    if (rows && this.props.idx) {
	      var row = rows[this.props.idx] || null;
	      if (row) {
	        return row.height;
	      }
	    }
	    return this.props.height;
	  },
	  getCellValue: function getCellValue(key) {
	    var val = void 0;
	    if (key === 'select-row') {
	      return this.props.isSelected;
	    } else if (typeof this.props.row.get === 'function') {
	      val = this.props.row.get(key);
	    } else {
	      val = this.props.row[key];
	    }
	    return val;
	  },
	  isContextMenuDisplayed: function isContextMenuDisplayed() {
	    if (this.props.cellMetaData) {
	      var selected = this.props.cellMetaData.selected;
	      if (selected && selected.contextMenuDisplayed && selected.rowIdx === this.props.idx) {
	        return true;
	      }
	    }
	    return false;
	  },
	  getExpandableOptions: function getExpandableOptions(columnKey) {
	    return { canExpand: this.props.subRowDetails && this.props.subRowDetails.field === columnKey, expanded: this.props.subRowDetails && this.props.subRowDetails.expanded, children: this.props.subRowDetails && this.props.subRowDetails.children, treeDepth: this.props.subRowDetails ? this.props.subRowDetails.treeDepth : 0 };
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var _this2 = this;

	    this.props.columns.forEach(function (column) {
	      if (column.locked) {
	        if (!_this2.refs[column.key]) return;
	        _this2.refs[column.key].setScrollLeft(scrollLeft);
	      }
	    });
	  },
	  getKnownDivProps: function getKnownDivProps() {
	    return createObjectWithProperties(this.props, knownDivPropertyKeys);
	  },
	  renderCell: function renderCell(props) {
	    if (typeof this.props.cellRenderer === 'function') {
	      this.props.cellRenderer.call(this, props);
	    }
	    if (React.isValidElement(this.props.cellRenderer)) {
	      return React.cloneElement(this.props.cellRenderer, props);
	    }

	    return this.props.cellRenderer(props);
	  },
	  render: function render() {
	    var className = joinClasses('react-grid-Row', 'react-grid-Row--' + (this.props.idx % 2 === 0 ? 'even' : 'odd'), {
	      'row-selected': this.props.isSelected,
	      'row-context-menu': this.isContextMenuDisplayed()
	    }, this.props.extraClasses);

	    var style = {
	      height: this.getRowHeight(this.props),
	      overflow: 'hidden',
	      contain: 'layout'
	    };

	    var cells = this.getCells();
	    return React.createElement(
	      'div',
	      _extends({}, this.getKnownDivProps(), { className: className, style: style, onDragEnter: this.handleDragEnter }),
	      React.isValidElement(this.props.row) ? this.props.row : cells
	    );
	  }
	});

	module.exports = Row;

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';

	var size = void 0;

	function getScrollbarSize() {
	  if (size === undefined) {
	    var outer = document.createElement('div');
	    outer.style.width = '50px';
	    outer.style.height = '50px';
	    outer.style.position = 'absolute';
	    outer.style.top = '-200px';
	    outer.style.left = '-200px';

	    var inner = document.createElement('div');
	    inner.style.height = '100px';
	    inner.style.width = '100%';

	    outer.appendChild(inner);
	    document.body.appendChild(outer);

	    var outerWidth = outer.clientWidth;
	    outer.style.overflowY = 'scroll';
	    var innerWidth = inner.clientWidth;

	    document.body.removeChild(outer);

	    size = outerWidth - innerWidth;
	  }

	  return size;
	}

	module.exports = getScrollbarSize;

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	function shallowCloneObject(obj) {
	  var result = {};
	  for (var k in obj) {
	    if (obj.hasOwnProperty(k)) {
	      result[k] = obj[k];
	    }
	  }
	  return result;
	}

	module.exports = shallowCloneObject;

/***/ },
/* 47 */
/***/ function(module, exports) {

	'use strict';

	var isFunction = function isFunction(functionToCheck) {
	  var getType = {};
	  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	};

	module.exports = isFunction;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */

	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Immutable = factory());
	}(this, function () { 'use strict';var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  function Iterable(value) {
	      return isIterable(value) ? value : Seq(value);
	    }


	  createClass(KeyedIterable, Iterable);
	    function KeyedIterable(value) {
	      return isKeyed(value) ? value : KeyedSeq(value);
	    }


	  createClass(IndexedIterable, Iterable);
	    function IndexedIterable(value) {
	      return isIndexed(value) ? value : IndexedSeq(value);
	    }


	  createClass(SetIterable, Iterable);
	    function SetIterable(value) {
	      return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	    }



	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;


	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    // This implements "is array index" which the ECMAString spec defines as:
	    //
	    //     A String property name P is an array index if and only if
	    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	    //     to 2^32−1.
	    //
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	    if (typeof index !== 'number') {
	      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
	      if ('' + uint32Index !== index || uint32Index === 4294967295) {
	        return NaN;
	      }
	      index = uint32Index;
	    }
	    return index < 0 ? ensureSize(iter) + index : index;
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || (size !== undefined && begin <= -size)) &&
	      (end === undefined || (size !== undefined && end >= size));
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ?
	      defaultIndex :
	      index < 0 ?
	        Math.max(0, size + index) :
	        size === undefined ?
	          index :
	          Math.min(size, index);
	  }

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;


	  function Iterator(next) {
	      this.next = next;
	    }

	    Iterator.prototype.toString = function() {
	      return '[Iterator]';
	    };


	  Iterator.KEYS = ITERATE_KEYS;
	  Iterator.VALUES = ITERATE_VALUES;
	  Iterator.ENTRIES = ITERATE_ENTRIES;

	  Iterator.prototype.inspect =
	  Iterator.prototype.toSource = function () { return this.toString(); }
	  Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };


	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? (iteratorResult.value = value) : (iteratorResult = {
	      value: value, done: false
	    });
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (
	      (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]
	    );
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	    function Seq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        isIterable(value) ? value.toSeq() : seqFromValue(value);
	    }

	    Seq.of = function(/*...values*/) {
	      return Seq(arguments);
	    };

	    Seq.prototype.toSeq = function() {
	      return this;
	    };

	    Seq.prototype.toString = function() {
	      return this.__toString('Seq {', '}');
	    };

	    Seq.prototype.cacheResult = function() {
	      if (!this._cache && this.__iterateUncached) {
	        this._cache = this.entrySeq().toArray();
	        this.size = this._cache.length;
	      }
	      return this;
	    };

	    // abstract __iterateUncached(fn, reverse)

	    Seq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, true);
	    };

	    // abstract __iteratorUncached(type, reverse)

	    Seq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, true);
	    };



	  createClass(KeyedSeq, Seq);
	    function KeyedSeq(value) {
	      return value === null || value === undefined ?
	        emptySequence().toKeyedSeq() :
	        isIterable(value) ?
	          (isKeyed(value) ? value.toSeq() : value.fromEntrySeq()) :
	          keyedSeqFromValue(value);
	    }

	    KeyedSeq.prototype.toKeyedSeq = function() {
	      return this;
	    };



	  createClass(IndexedSeq, Seq);
	    function IndexedSeq(value) {
	      return value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	    }

	    IndexedSeq.of = function(/*...values*/) {
	      return IndexedSeq(arguments);
	    };

	    IndexedSeq.prototype.toIndexedSeq = function() {
	      return this;
	    };

	    IndexedSeq.prototype.toString = function() {
	      return this.__toString('Seq [', ']');
	    };

	    IndexedSeq.prototype.__iterate = function(fn, reverse) {
	      return seqIterate(this, fn, reverse, false);
	    };

	    IndexedSeq.prototype.__iterator = function(type, reverse) {
	      return seqIterator(this, type, reverse, false);
	    };



	  createClass(SetSeq, Seq);
	    function SetSeq(value) {
	      return (
	        value === null || value === undefined ? emptySequence() :
	        !isIterable(value) ? indexedSeqFromValue(value) :
	        isKeyed(value) ? value.entrySeq() : value
	      ).toSetSeq();
	    }

	    SetSeq.of = function(/*...values*/) {
	      return SetSeq(arguments);
	    };

	    SetSeq.prototype.toSetSeq = function() {
	      return this;
	    };



	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;



	  createClass(ArraySeq, IndexedSeq);
	    function ArraySeq(array) {
	      this._array = array;
	      this.size = array.length;
	    }

	    ArraySeq.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	    };

	    ArraySeq.prototype.__iterate = function(fn, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ArraySeq.prototype.__iterator = function(type, reverse) {
	      var array = this._array;
	      var maxIndex = array.length - 1;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++])}
	      );
	    };



	  createClass(ObjectSeq, KeyedSeq);
	    function ObjectSeq(object) {
	      var keys = Object.keys(object);
	      this._object = object;
	      this._keys = keys;
	      this.size = keys.length;
	    }

	    ObjectSeq.prototype.get = function(key, notSetValue) {
	      if (notSetValue !== undefined && !this.has(key)) {
	        return notSetValue;
	      }
	      return this._object[key];
	    };

	    ObjectSeq.prototype.has = function(key) {
	      return this._object.hasOwnProperty(key);
	    };

	    ObjectSeq.prototype.__iterate = function(fn, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        if (fn(object[key], key, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    ObjectSeq.prototype.__iterator = function(type, reverse) {
	      var object = this._object;
	      var keys = this._keys;
	      var maxIndex = keys.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var key = keys[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, key, object[key]);
	      });
	    };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(IterableSeq, IndexedSeq);
	    function IterableSeq(iterable) {
	      this._iterable = iterable;
	      this.size = iterable.length || iterable.size;
	    }

	    IterableSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      var iterations = 0;
	      if (isIterator(iterator)) {
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (fn(step.value, iterations++, this) === false) {
	            break;
	          }
	        }
	      }
	      return iterations;
	    };

	    IterableSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterable = this._iterable;
	      var iterator = getIterator(iterable);
	      if (!isIterator(iterator)) {
	        return new Iterator(iteratorDone);
	      }
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step : iteratorValue(type, iterations++, step.value);
	      });
	    };



	  createClass(IteratorSeq, IndexedSeq);
	    function IteratorSeq(iterator) {
	      this._iterator = iterator;
	      this._iteratorCache = [];
	    }

	    IteratorSeq.prototype.__iterateUncached = function(fn, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      while (iterations < cache.length) {
	        if (fn(cache[iterations], iterations++, this) === false) {
	          return iterations;
	        }
	      }
	      var step;
	      while (!(step = iterator.next()).done) {
	        var val = step.value;
	        cache[iterations] = val;
	        if (fn(val, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };

	    IteratorSeq.prototype.__iteratorUncached = function(type, reverse) {
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = this._iterator;
	      var cache = this._iteratorCache;
	      var iterations = 0;
	      return new Iterator(function()  {
	        if (iterations >= cache.length) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          cache[iterations] = step.value;
	        }
	        return iteratorValue(type, iterations, cache[iterations++]);
	      });
	    };




	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq =
	      Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() :
	      isIterator(value) ? new IteratorSeq(value).fromEntrySeq() :
	      hasIterator(value) ? new IterableSeq(value).fromEntrySeq() :
	      typeof value === 'object' ? new ObjectSeq(value) :
	      undefined;
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of [k, v] entries, '+
	        'or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values: ' + value
	      );
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) ||
	      (typeof value === 'object' && new ObjectSeq(value));
	    if (!seq) {
	      throw new TypeError(
	        'Expected Array or iterable object of values, or keyed object: ' + value
	      );
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return (
	      isArrayLike(value) ? new ArraySeq(value) :
	      isIterator(value) ? new IteratorSeq(value) :
	      hasIterator(value) ? new IterableSeq(value) :
	      undefined
	    );
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new Iterator(function()  {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ?
	          iteratorDone() :
	          iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  function fromJS(json, converter) {
	    return converter ?
	      fromJSWith(converter, json, '', {'': json}) :
	      fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function(v, k)  {return fromJSWith(converter, v, k, json)}));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' &&
	        typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	        return true;
	      }
	      if (!valueA || !valueB) {
	        return false;
	      }
	    }
	    if (typeof valueA.equals === 'function' &&
	        typeof valueB.equals === 'function' &&
	        valueA.equals(valueB)) {
	      return true;
	    }
	    return false;
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (
	      !isIterable(b) ||
	      a.size !== undefined && b.size !== undefined && a.size !== b.size ||
	      a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash ||
	      isKeyed(a) !== isKeyed(b) ||
	      isIndexed(a) !== isIndexed(b) ||
	      isOrdered(a) !== isOrdered(b)
	    ) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function(v, k)  {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        if (typeof a.cacheResult === 'function') {
	          a.cacheResult();
	        }
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function(v, k)  {
	      if (notAssociative ? !a.has(v) :
	          flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Repeat, IndexedSeq);

	    function Repeat(value, times) {
	      if (!(this instanceof Repeat)) {
	        return new Repeat(value, times);
	      }
	      this._value = value;
	      this.size = times === undefined ? Infinity : Math.max(0, times);
	      if (this.size === 0) {
	        if (EMPTY_REPEAT) {
	          return EMPTY_REPEAT;
	        }
	        EMPTY_REPEAT = this;
	      }
	    }

	    Repeat.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Repeat []';
	      }
	      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	    };

	    Repeat.prototype.get = function(index, notSetValue) {
	      return this.has(index) ? this._value : notSetValue;
	    };

	    Repeat.prototype.includes = function(searchValue) {
	      return is(this._value, searchValue);
	    };

	    Repeat.prototype.slice = function(begin, end) {
	      var size = this.size;
	      return wholeSlice(begin, end, size) ? this :
	        new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	    };

	    Repeat.prototype.reverse = function() {
	      return this;
	    };

	    Repeat.prototype.indexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return 0;
	      }
	      return -1;
	    };

	    Repeat.prototype.lastIndexOf = function(searchValue) {
	      if (is(this._value, searchValue)) {
	        return this.size;
	      }
	      return -1;
	    };

	    Repeat.prototype.__iterate = function(fn, reverse) {
	      for (var ii = 0; ii < this.size; ii++) {
	        if (fn(this._value, ii, this) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    };

	    Repeat.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      var ii = 0;
	      return new Iterator(function() 
	        {return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone()}
	      );
	    };

	    Repeat.prototype.equals = function(other) {
	      return other instanceof Repeat ?
	        is(this._value, other._value) :
	        deepEqual(other);
	    };


	  var EMPTY_REPEAT;

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  createClass(Range, IndexedSeq);

	    function Range(start, end, step) {
	      if (!(this instanceof Range)) {
	        return new Range(start, end, step);
	      }
	      invariant(step !== 0, 'Cannot step a Range by 0');
	      start = start || 0;
	      if (end === undefined) {
	        end = Infinity;
	      }
	      step = step === undefined ? 1 : Math.abs(step);
	      if (end < start) {
	        step = -step;
	      }
	      this._start = start;
	      this._end = end;
	      this._step = step;
	      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	      if (this.size === 0) {
	        if (EMPTY_RANGE) {
	          return EMPTY_RANGE;
	        }
	        EMPTY_RANGE = this;
	      }
	    }

	    Range.prototype.toString = function() {
	      if (this.size === 0) {
	        return 'Range []';
	      }
	      return 'Range [ ' +
	        this._start + '...' + this._end +
	        (this._step !== 1 ? ' by ' + this._step : '') +
	      ' ]';
	    };

	    Range.prototype.get = function(index, notSetValue) {
	      return this.has(index) ?
	        this._start + wrapIndex(this, index) * this._step :
	        notSetValue;
	    };

	    Range.prototype.includes = function(searchValue) {
	      var possibleIndex = (searchValue - this._start) / this._step;
	      return possibleIndex >= 0 &&
	        possibleIndex < this.size &&
	        possibleIndex === Math.floor(possibleIndex);
	    };

	    Range.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      begin = resolveBegin(begin, this.size);
	      end = resolveEnd(end, this.size);
	      if (end <= begin) {
	        return new Range(0, 0);
	      }
	      return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	    };

	    Range.prototype.indexOf = function(searchValue) {
	      var offsetValue = searchValue - this._start;
	      if (offsetValue % this._step === 0) {
	        var index = offsetValue / this._step;
	        if (index >= 0 && index < this.size) {
	          return index
	        }
	      }
	      return -1;
	    };

	    Range.prototype.lastIndexOf = function(searchValue) {
	      return this.indexOf(searchValue);
	    };

	    Range.prototype.__iterate = function(fn, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        if (fn(value, ii, this) === false) {
	          return ii + 1;
	        }
	        value += reverse ? -step : step;
	      }
	      return ii;
	    };

	    Range.prototype.__iterator = function(type, reverse) {
	      var maxIndex = this.size - 1;
	      var step = this._step;
	      var value = reverse ? this._start + maxIndex * step : this._start;
	      var ii = 0;
	      return new Iterator(function()  {
	        var v = value;
	        value += reverse ? -step : step;
	        return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	      });
	    };

	    Range.prototype.equals = function(other) {
	      return other instanceof Range ?
	        this._start === other._start &&
	        this._end === other._end &&
	        this._step === other._step :
	        deepEqual(this, other);
	    };


	  var EMPTY_RANGE;

	  createClass(Collection, Iterable);
	    function Collection() {
	      throw TypeError('Abstract');
	    }


	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}


	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  var imul =
	    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ?
	    Math.imul :
	    function imul(a, b) {
	      a = a | 0; // int
	      b = b | 0; // int
	      var c = a & 0xffff;
	      var d = b & 0xffff;
	      // Shift by 0 fixes the sign on the high part.
	      return (c * d) + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0) | 0; // int
	    };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xBFFFFFFF);
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o;
	    if (type === 'number') {
	      if (o !== o || o === Infinity) {
	        return 0;
	      }
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    if (type === 'object') {
	      return hashJSObj(o);
	    }
	    if (typeof o.toString === 'function') {
	      return hashString(o.toString());
	    }
	    throw new Error('Value type ' + type + ' cannot be hashed.');
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash;
	    if (usingWeakMap) {
	      hash = weakMap.get(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = obj[UID_HASH_KEY];
	    if (hash !== undefined) {
	      return hash;
	    }

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash !== undefined) {
	        return hash;
	      }

	      hash = getIENodeHash(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (usingWeakMap) {
	      weakMap.set(obj, hash);
	    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable !== undefined &&
	               obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function() {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType !== undefined) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // Get references to ES5 object methods.
	  var isExtensible = Object.isExtensible;

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = (function() {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }());

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1: // Element
	          return node.uniqueID;
	        case 9: // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var usingWeakMap = typeof WeakMap === 'function';
	  var weakMap;
	  if (usingWeakMap) {
	    weakMap = new WeakMap();
	  }

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function assertNotInfinite(size) {
	    invariant(
	      size !== Infinity,
	      'Cannot perform this action with an infinite size.'
	    );
	  }

	  createClass(Map, KeyedCollection);

	    // @pragma Construction

	    function Map(value) {
	      return value === null || value === undefined ? emptyMap() :
	        isMap(value) && !isOrdered(value) ? value :
	        emptyMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    Map.of = function() {var keyValues = SLICE$0.call(arguments, 0);
	      return emptyMap().withMutations(function(map ) {
	        for (var i = 0; i < keyValues.length; i += 2) {
	          if (i + 1 >= keyValues.length) {
	            throw new Error('Missing value for key: ' + keyValues[i]);
	          }
	          map.set(keyValues[i], keyValues[i + 1]);
	        }
	      });
	    };

	    Map.prototype.toString = function() {
	      return this.__toString('Map {', '}');
	    };

	    // @pragma Access

	    Map.prototype.get = function(k, notSetValue) {
	      return this._root ?
	        this._root.get(0, undefined, k, notSetValue) :
	        notSetValue;
	    };

	    // @pragma Modification

	    Map.prototype.set = function(k, v) {
	      return updateMap(this, k, v);
	    };

	    Map.prototype.setIn = function(keyPath, v) {
	      return this.updateIn(keyPath, NOT_SET, function()  {return v});
	    };

	    Map.prototype.remove = function(k) {
	      return updateMap(this, k, NOT_SET);
	    };

	    Map.prototype.deleteIn = function(keyPath) {
	      return this.updateIn(keyPath, function()  {return NOT_SET});
	    };

	    Map.prototype.update = function(k, notSetValue, updater) {
	      return arguments.length === 1 ?
	        k(this) :
	        this.updateIn([k], notSetValue, updater);
	    };

	    Map.prototype.updateIn = function(keyPath, notSetValue, updater) {
	      if (!updater) {
	        updater = notSetValue;
	        notSetValue = undefined;
	      }
	      var updatedValue = updateInDeepMap(
	        this,
	        forceIterator(keyPath),
	        notSetValue,
	        updater
	      );
	      return updatedValue === NOT_SET ? undefined : updatedValue;
	    };

	    Map.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._root = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyMap();
	    };

	    // @pragma Composition

	    Map.prototype.merge = function(/*...iters*/) {
	      return mergeIntoMapWith(this, undefined, arguments);
	    };

	    Map.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, merger, iters);
	    };

	    Map.prototype.mergeIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.merge === 'function' ?
	          m.merge.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoMapWith(this, deepMerger, arguments);
	    };

	    Map.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoMapWith(this, deepMergerWith(merger), iters);
	    };

	    Map.prototype.mergeDeepIn = function(keyPath) {var iters = SLICE$0.call(arguments, 1);
	      return this.updateIn(
	        keyPath,
	        emptyMap(),
	        function(m ) {return typeof m.mergeDeep === 'function' ?
	          m.mergeDeep.apply(m, iters) :
	          iters[iters.length - 1]}
	      );
	    };

	    Map.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator));
	    };

	    Map.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedMap(sortFactory(this, comparator, mapper));
	    };

	    // @pragma Mutability

	    Map.prototype.withMutations = function(fn) {
	      var mutable = this.asMutable();
	      fn(mutable);
	      return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	    };

	    Map.prototype.asMutable = function() {
	      return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	    };

	    Map.prototype.asImmutable = function() {
	      return this.__ensureOwner();
	    };

	    Map.prototype.wasAltered = function() {
	      return this.__altered;
	    };

	    Map.prototype.__iterator = function(type, reverse) {
	      return new MapIterator(this, type, reverse);
	    };

	    Map.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      this._root && this._root.iterate(function(entry ) {
	        iterations++;
	        return fn(entry[1], entry[0], this$0);
	      }, reverse);
	      return iterations;
	    };

	    Map.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeMap(this.size, this._root, ownerID, this.__hash);
	    };


	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;


	  // #pragma Trie Nodes



	    function ArrayMapNode(ownerID, entries) {
	      this.ownerID = ownerID;
	      this.entries = entries;
	    }

	    ArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    ArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && entries.length === 1) {
	        return; // undefined
	      }

	      if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	        return createNodes(ownerID, entries, key, value);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new ArrayMapNode(ownerID, newEntries);
	    };




	    function BitmapIndexedNode(ownerID, bitmap, nodes) {
	      this.ownerID = ownerID;
	      this.bitmap = bitmap;
	      this.nodes = nodes;
	    }

	    BitmapIndexedNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var bit = (1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK));
	      var bitmap = this.bitmap;
	      return (bitmap & bit) === 0 ? notSetValue :
	        this.nodes[popCount(bitmap & (bit - 1))].get(shift + SHIFT, keyHash, key, notSetValue);
	    };

	    BitmapIndexedNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var bit = 1 << keyHashFrag;
	      var bitmap = this.bitmap;
	      var exists = (bitmap & bit) !== 0;

	      if (!exists && value === NOT_SET) {
	        return this;
	      }

	      var idx = popCount(bitmap & (bit - 1));
	      var nodes = this.nodes;
	      var node = exists ? nodes[idx] : undefined;
	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	      if (newNode === node) {
	        return this;
	      }

	      if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	        return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	      }

	      if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	        return nodes[idx ^ 1];
	      }

	      if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	        return newNode;
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	      var newNodes = exists ? newNode ?
	        setIn(nodes, idx, newNode, isEditable) :
	        spliceOut(nodes, idx, isEditable) :
	        spliceIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.bitmap = newBitmap;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	    };




	    function HashArrayMapNode(ownerID, count, nodes) {
	      this.ownerID = ownerID;
	      this.count = count;
	      this.nodes = nodes;
	    }

	    HashArrayMapNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var node = this.nodes[idx];
	      return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	    };

	    HashArrayMapNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }
	      var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	      var removed = value === NOT_SET;
	      var nodes = this.nodes;
	      var node = nodes[idx];

	      if (removed && !node) {
	        return this;
	      }

	      var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	      if (newNode === node) {
	        return this;
	      }

	      var newCount = this.count;
	      if (!node) {
	        newCount++;
	      } else if (!newNode) {
	        newCount--;
	        if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	          return packNodes(ownerID, nodes, newCount, idx);
	        }
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newNodes = setIn(nodes, idx, newNode, isEditable);

	      if (isEditable) {
	        this.count = newCount;
	        this.nodes = newNodes;
	        return this;
	      }

	      return new HashArrayMapNode(ownerID, newCount, newNodes);
	    };




	    function HashCollisionNode(ownerID, keyHash, entries) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entries = entries;
	    }

	    HashCollisionNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      var entries = this.entries;
	      for (var ii = 0, len = entries.length; ii < len; ii++) {
	        if (is(key, entries[ii][0])) {
	          return entries[ii][1];
	        }
	      }
	      return notSetValue;
	    };

	    HashCollisionNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      if (keyHash === undefined) {
	        keyHash = hash(key);
	      }

	      var removed = value === NOT_SET;

	      if (keyHash !== this.keyHash) {
	        if (removed) {
	          return this;
	        }
	        SetRef(didAlter);
	        SetRef(didChangeSize);
	        return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	      }

	      var entries = this.entries;
	      var idx = 0;
	      for (var len = entries.length; idx < len; idx++) {
	        if (is(key, entries[idx][0])) {
	          break;
	        }
	      }
	      var exists = idx < len;

	      if (exists ? entries[idx][1] === value : removed) {
	        return this;
	      }

	      SetRef(didAlter);
	      (removed || !exists) && SetRef(didChangeSize);

	      if (removed && len === 2) {
	        return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	      }

	      var isEditable = ownerID && ownerID === this.ownerID;
	      var newEntries = isEditable ? entries : arrCopy(entries);

	      if (exists) {
	        if (removed) {
	          idx === len - 1 ? newEntries.pop() : (newEntries[idx] = newEntries.pop());
	        } else {
	          newEntries[idx] = [key, value];
	        }
	      } else {
	        newEntries.push([key, value]);
	      }

	      if (isEditable) {
	        this.entries = newEntries;
	        return this;
	      }

	      return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	    };




	    function ValueNode(ownerID, keyHash, entry) {
	      this.ownerID = ownerID;
	      this.keyHash = keyHash;
	      this.entry = entry;
	    }

	    ValueNode.prototype.get = function(shift, keyHash, key, notSetValue) {
	      return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	    };

	    ValueNode.prototype.update = function(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	      var removed = value === NOT_SET;
	      var keyMatch = is(key, this.entry[0]);
	      if (keyMatch ? value === this.entry[1] : removed) {
	        return this;
	      }

	      SetRef(didAlter);

	      if (removed) {
	        SetRef(didChangeSize);
	        return; // undefined
	      }

	      if (keyMatch) {
	        if (ownerID && ownerID === this.ownerID) {
	          this.entry[1] = value;
	          return this;
	        }
	        return new ValueNode(ownerID, this.keyHash, [key, value]);
	      }

	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	    };



	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate =
	  HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  }

	  BitmapIndexedNode.prototype.iterate =
	  HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  }

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  }

	  createClass(MapIterator, Iterator);

	    function MapIterator(map, type, reverse) {
	      this._type = type;
	      this._reverse = reverse;
	      this._stack = map._root && mapIteratorFrame(map._root);
	    }

	    MapIterator.prototype.next = function() {
	      var type = this._type;
	      var stack = this._stack;
	      while (stack) {
	        var node = stack.node;
	        var index = stack.index++;
	        var maxIndex;
	        if (node.entry) {
	          if (index === 0) {
	            return mapIteratorValue(type, node.entry);
	          }
	        } else if (node.entries) {
	          maxIndex = node.entries.length - 1;
	          if (index <= maxIndex) {
	            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	          }
	        } else {
	          maxIndex = node.nodes.length - 1;
	          if (index <= maxIndex) {
	            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	            if (subNode) {
	              if (subNode.entry) {
	                return mapIteratorValue(type, subNode.entry);
	              }
	              stack = this._stack = mapIteratorFrame(subNode, stack);
	            }
	            continue;
	          }
	        }
	        stack = this._stack = this._stack.__prev;
	      }
	      return iteratorDone();
	    };


	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ?
	      [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] :
	      ((newNode = new ValueNode(ownerID, keyHash, entry)), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(existing, value, key) {
	    return existing && existing.mergeDeep && isIterable(value) ?
	      existing.mergeDeep(value) :
	      is(existing, value) ? existing : value;
	  }

	  function deepMergerWith(merger) {
	    return function(existing, value, key)  {
	      if (existing && existing.mergeDeepWith && isIterable(value)) {
	        return existing.mergeDeepWith(merger, value);
	      }
	      var nextValue = merger(existing, value, key);
	      return is(existing, nextValue) ? existing : nextValue;
	    };
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function(x ) {return x.size !== 0});
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function(collection ) {
	      var mergeIntoMap = merger ?
	        function(value, key)  {
	          collection.update(key, NOT_SET, function(existing )
	            {return existing === NOT_SET ? value : merger(existing, value, key)}
	          );
	        } :
	        function(value, key)  {
	          collection.set(key, value);
	        }
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(
	      isNotSet || (existing && existing.set),
	      'invalid keyPath'
	    );
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(
	      nextExisting,
	      keyPathIter,
	      notSetValue,
	      updater
	    );
	    return nextUpdated === nextExisting ? existing :
	      nextUpdated === NOT_SET ? existing.remove(key) :
	      (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - ((x >> 1) & 0x55555555);
	    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	    x = (x + (x >> 4)) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	    // @pragma Construction

	    function List(value) {
	      var empty = emptyList();
	      if (value === null || value === undefined) {
	        return empty;
	      }
	      if (isList(value)) {
	        return value;
	      }
	      var iter = IndexedIterable(value);
	      var size = iter.size;
	      if (size === 0) {
	        return empty;
	      }
	      assertNotInfinite(size);
	      if (size > 0 && size < SIZE) {
	        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	      }
	      return empty.withMutations(function(list ) {
	        list.setSize(size);
	        iter.forEach(function(v, i)  {return list.set(i, v)});
	      });
	    }

	    List.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    List.prototype.toString = function() {
	      return this.__toString('List [', ']');
	    };

	    // @pragma Access

	    List.prototype.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      if (index >= 0 && index < this.size) {
	        index += this._origin;
	        var node = listNodeFor(this, index);
	        return node && node.array[index & MASK];
	      }
	      return notSetValue;
	    };

	    // @pragma Modification

	    List.prototype.set = function(index, value) {
	      return updateList(this, index, value);
	    };

	    List.prototype.remove = function(index) {
	      return !this.has(index) ? this :
	        index === 0 ? this.shift() :
	        index === this.size - 1 ? this.pop() :
	        this.splice(index, 1);
	    };

	    List.prototype.insert = function(index, value) {
	      return this.splice(index, 0, value);
	    };

	    List.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = this._origin = this._capacity = 0;
	        this._level = SHIFT;
	        this._root = this._tail = null;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyList();
	    };

	    List.prototype.push = function(/*...values*/) {
	      var values = arguments;
	      var oldSize = this.size;
	      return this.withMutations(function(list ) {
	        setListBounds(list, 0, oldSize + values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(oldSize + ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.pop = function() {
	      return setListBounds(this, 0, -1);
	    };

	    List.prototype.unshift = function(/*...values*/) {
	      var values = arguments;
	      return this.withMutations(function(list ) {
	        setListBounds(list, -values.length);
	        for (var ii = 0; ii < values.length; ii++) {
	          list.set(ii, values[ii]);
	        }
	      });
	    };

	    List.prototype.shift = function() {
	      return setListBounds(this, 1);
	    };

	    // @pragma Composition

	    List.prototype.merge = function(/*...iters*/) {
	      return mergeIntoListWith(this, undefined, arguments);
	    };

	    List.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, merger, iters);
	    };

	    List.prototype.mergeDeep = function(/*...iters*/) {
	      return mergeIntoListWith(this, deepMerger, arguments);
	    };

	    List.prototype.mergeDeepWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return mergeIntoListWith(this, deepMergerWith(merger), iters);
	    };

	    List.prototype.setSize = function(size) {
	      return setListBounds(this, 0, size);
	    };

	    // @pragma Iteration

	    List.prototype.slice = function(begin, end) {
	      var size = this.size;
	      if (wholeSlice(begin, end, size)) {
	        return this;
	      }
	      return setListBounds(
	        this,
	        resolveBegin(begin, size),
	        resolveEnd(end, size)
	      );
	    };

	    List.prototype.__iterator = function(type, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      return new Iterator(function()  {
	        var value = values();
	        return value === DONE ?
	          iteratorDone() :
	          iteratorValue(type, index++, value);
	      });
	    };

	    List.prototype.__iterate = function(fn, reverse) {
	      var index = 0;
	      var values = iterateList(this, reverse);
	      var value;
	      while ((value = values()) !== DONE) {
	        if (fn(value, index++, this) === false) {
	          break;
	        }
	      }
	      return index;
	    };

	    List.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        return this;
	      }
	      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	    };


	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn =
	  ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;



	    function VNode(array, ownerID) {
	      this.array = array;
	      this.ownerID = ownerID;
	    }

	    // TODO: seems like these methods are very similar

	    VNode.prototype.removeBefore = function(ownerID, level, index) {
	      if (index === level ? 1 << level : 0 || this.array.length === 0) {
	        return this;
	      }
	      var originIndex = (index >>> level) & MASK;
	      if (originIndex >= this.array.length) {
	        return new VNode([], ownerID);
	      }
	      var removingFirst = originIndex === 0;
	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[originIndex];
	        newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && removingFirst) {
	          return this;
	        }
	      }
	      if (removingFirst && !newChild) {
	        return this;
	      }
	      var editable = editableVNode(this, ownerID);
	      if (!removingFirst) {
	        for (var ii = 0; ii < originIndex; ii++) {
	          editable.array[ii] = undefined;
	        }
	      }
	      if (newChild) {
	        editable.array[originIndex] = newChild;
	      }
	      return editable;
	    };

	    VNode.prototype.removeAfter = function(ownerID, level, index) {
	      if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	        return this;
	      }
	      var sizeIndex = ((index - 1) >>> level) & MASK;
	      if (sizeIndex >= this.array.length) {
	        return this;
	      }

	      var newChild;
	      if (level > 0) {
	        var oldChild = this.array[sizeIndex];
	        newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	        if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	          return this;
	        }
	      }

	      var editable = editableVNode(this, ownerID);
	      editable.array.splice(sizeIndex + 1);
	      if (newChild) {
	        editable.array[sizeIndex] = newChild;
	      }
	      return editable;
	    };



	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ?
	        iterateLeaf(node, offset) :
	        iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : (left - offset) >> level;
	      var to = ((right - offset) >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function()  {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(
	            array && array[idx], level - SHIFT, offset + (idx << level)
	          );
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index !== index) {
	      return list;
	    }

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function(list ) {
	        index < 0 ?
	          setListBounds(list, index).set(0, value) :
	          setListBounds(list, 0, index + 1).set(index, value)
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = (index >>> level) & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << (list._level + SHIFT)) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[(rawIndex >>> level) & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might need creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might need creating a higher root.
	    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ?
	      listNodeFor(list, newCapacity - 1) :
	      newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = (oldTailOffset >>> level) & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	      offsetShift = 0;

	      // Identify the new top root node of the subtree of the old root.
	      while (newRoot) {
	        var beginIndex = (newOrigin >>> newLevel) & MASK;
	        if (beginIndex !== (newTailOffset >>> newLevel) & MASK) {
	          break;
	        }
	        if (beginIndex) {
	          offsetShift += (1 << newLevel) * beginIndex;
	        }
	        newLevel -= SHIFT;
	        newRoot = newRoot.array[beginIndex];
	      }

	      // Trim the new sides of the new root.
	      if (newRoot && newOrigin > oldOrigin) {
	        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	      }
	      if (newRoot && newTailOffset < oldTailOffset) {
	        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	      }
	      if (offsetShift) {
	        newOrigin -= offsetShift;
	        newCapacity -= offsetShift;
	      }
	    }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function(v ) {return fromJS(v)});
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : (((size - 1) >>> SHIFT) << SHIFT);
	  }

	  createClass(OrderedMap, Map);

	    // @pragma Construction

	    function OrderedMap(value) {
	      return value === null || value === undefined ? emptyOrderedMap() :
	        isOrderedMap(value) ? value :
	        emptyOrderedMap().withMutations(function(map ) {
	          var iter = KeyedIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v, k)  {return map.set(k, v)});
	        });
	    }

	    OrderedMap.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedMap.prototype.toString = function() {
	      return this.__toString('OrderedMap {', '}');
	    };

	    // @pragma Access

	    OrderedMap.prototype.get = function(k, notSetValue) {
	      var index = this._map.get(k);
	      return index !== undefined ? this._list.get(index)[1] : notSetValue;
	    };

	    // @pragma Modification

	    OrderedMap.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._map.clear();
	        this._list.clear();
	        return this;
	      }
	      return emptyOrderedMap();
	    };

	    OrderedMap.prototype.set = function(k, v) {
	      return updateOrderedMap(this, k, v);
	    };

	    OrderedMap.prototype.remove = function(k) {
	      return updateOrderedMap(this, k, NOT_SET);
	    };

	    OrderedMap.prototype.wasAltered = function() {
	      return this._map.wasAltered() || this._list.wasAltered();
	    };

	    OrderedMap.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._list.__iterate(
	        function(entry ) {return entry && fn(entry[1], entry[0], this$0)},
	        reverse
	      );
	    };

	    OrderedMap.prototype.__iterator = function(type, reverse) {
	      return this._list.fromEntrySeq().__iterator(type, reverse);
	    };

	    OrderedMap.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      var newList = this._list.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        this._list = newList;
	        return this;
	      }
	      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	    };


	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;



	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) { // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function(entry, idx)  {return entry !== undefined && i !== idx});
	        newMap = newList.toKeyedSeq().map(function(entry ) {return entry[0]}).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	    function ToKeyedSequence(indexed, useKeys) {
	      this._iter = indexed;
	      this._useKeys = useKeys;
	      this.size = indexed.size;
	    }

	    ToKeyedSequence.prototype.get = function(key, notSetValue) {
	      return this._iter.get(key, notSetValue);
	    };

	    ToKeyedSequence.prototype.has = function(key) {
	      return this._iter.has(key);
	    };

	    ToKeyedSequence.prototype.valueSeq = function() {
	      return this._iter.valueSeq();
	    };

	    ToKeyedSequence.prototype.reverse = function() {var this$0 = this;
	      var reversedSequence = reverseFactory(this, true);
	      if (!this._useKeys) {
	        reversedSequence.valueSeq = function()  {return this$0._iter.toSeq().reverse()};
	      }
	      return reversedSequence;
	    };

	    ToKeyedSequence.prototype.map = function(mapper, context) {var this$0 = this;
	      var mappedSequence = mapFactory(this, mapper, context);
	      if (!this._useKeys) {
	        mappedSequence.valueSeq = function()  {return this$0._iter.toSeq().map(mapper, context)};
	      }
	      return mappedSequence;
	    };

	    ToKeyedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var ii;
	      return this._iter.__iterate(
	        this._useKeys ?
	          function(v, k)  {return fn(v, k, this$0)} :
	          ((ii = reverse ? resolveSize(this) : 0),
	            function(v ) {return fn(v, reverse ? --ii : ii++, this$0)}),
	        reverse
	      );
	    };

	    ToKeyedSequence.prototype.__iterator = function(type, reverse) {
	      if (this._useKeys) {
	        return this._iter.__iterator(type, reverse);
	      }
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var ii = reverse ? resolveSize(this) : 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	      });
	    };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;


	  createClass(ToIndexedSequence, IndexedSeq);
	    function ToIndexedSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToIndexedSequence.prototype.includes = function(value) {
	      return this._iter.includes(value);
	    };

	    ToIndexedSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      return this._iter.__iterate(function(v ) {return fn(v, iterations++, this$0)}, reverse);
	    };

	    ToIndexedSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, iterations++, step.value, step)
	      });
	    };



	  createClass(ToSetSequence, SetSeq);
	    function ToSetSequence(iter) {
	      this._iter = iter;
	      this.size = iter.size;
	    }

	    ToSetSequence.prototype.has = function(key) {
	      return this._iter.includes(key);
	    };

	    ToSetSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(v ) {return fn(v, v, this$0)}, reverse);
	    };

	    ToSetSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        return step.done ? step :
	          iteratorValue(type, step.value, step.value, step);
	      });
	    };



	  createClass(FromEntriesSequence, KeyedSeq);
	    function FromEntriesSequence(entries) {
	      this._iter = entries;
	      this.size = entries.size;
	    }

	    FromEntriesSequence.prototype.entrySeq = function() {
	      return this._iter.toSeq();
	    };

	    FromEntriesSequence.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._iter.__iterate(function(entry ) {
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedIterable = isIterable(entry);
	          return fn(
	            indexedIterable ? entry.get(1) : entry[1],
	            indexedIterable ? entry.get(0) : entry[0],
	            this$0
	          );
	        }
	      }, reverse);
	    };

	    FromEntriesSequence.prototype.__iterator = function(type, reverse) {
	      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          // Check if entry exists first so array access doesn't throw for holes
	          // in the parent iteration.
	          if (entry) {
	            validateEntry(entry);
	            var indexedIterable = isIterable(entry);
	            return iteratorValue(
	              type,
	              indexedIterable ? entry.get(0) : entry[0],
	              indexedIterable ? entry.get(1) : entry[1],
	              step
	            );
	          }
	        }
	      });
	    };


	  ToIndexedSequence.prototype.cacheResult =
	  ToKeyedSequence.prototype.cacheResult =
	  ToSetSequence.prototype.cacheResult =
	  FromEntriesSequence.prototype.cacheResult =
	    cacheResultThrough;


	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function()  {return iterable};
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function()  {return iterable.reverse()};
	      return reversedSequence;
	    };
	    flipSequence.has = function(key ) {return iterable.includes(key)};
	    flipSequence.includes = function(key ) {return iterable.has(key)};
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(k, v, this$0) !== false}, reverse);
	    }
	    flipSequence.__iteratorUncached = function(type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new Iterator(function()  {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(
	        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	        reverse
	      );
	    }
	    return flipSequence;
	  }


	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function(key ) {return iterable.has(key)};
	    mappedSequence.get = function(key, notSetValue)  {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ?
	        notSetValue :
	        mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(
	        function(v, k, c)  {return fn(mapper.call(context, v, k, c), k, this$0) !== false},
	        reverse
	      );
	    }
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new Iterator(function()  {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(
	          type,
	          key,
	          mapper.call(context, entry[1], key, iterable),
	          step
	        );
	      });
	    }
	    return mappedSequence;
	  }


	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function()  {return iterable};
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function()  {return iterable.flip()};
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function(key, notSetValue) 
	      {return iterable.get(useKeys ? key : -1 - key, notSetValue)};
	    reversedSequence.has = function(key )
	      {return iterable.has(useKeys ? key : -1 - key)};
	    reversedSequence.includes = function(value ) {return iterable.includes(value)};
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {var this$0 = this;
	      return iterable.__iterate(function(v, k)  {return fn(v, k, this$0)}, !reverse);
	    };
	    reversedSequence.__iterator =
	      function(type, reverse)  {return iterable.__iterator(type, !reverse)};
	    return reversedSequence;
	  }


	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function(key ) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function(key, notSetValue)  {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ?
	          v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    }
	    return filterSequence;
	  }


	  function countByFactory(iterable, grouper, context) {
	    var groups = Map().asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        0,
	        function(a ) {return a + 1}
	      );
	    });
	    return groups.asImmutable();
	  }


	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
	    iterable.__iterate(function(v, k)  {
	      groups.update(
	        grouper.call(context, v, k, iterable),
	        function(a ) {return (a = a || [], a.push(isKeyedIter ? [k, v] : v), a)}
	      );
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function(arr ) {return reify(iterable, coerce(arr))});
	  }


	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      if (end === Infinity) {
	        end = originalSize;
	      } else {
	        end = end | 0;
	      }
	    }

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size and these do not resolve to NaN.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    // Note: resolvedEnd is undefined when the original sequence's length is
	    // unknown and this slice did not supply an end and should contain all
	    // elements after resolvedBegin.
	    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	    var resolvedSize = resolvedEnd - resolvedBegin;
	    var sliceSize;
	    if (resolvedSize === resolvedSize) {
	      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	    }

	    var sliceSeq = makeSequence(iterable);

	    // If iterable.size is undefined, the size of the realized sliceSeq is
	    // unknown at this point unless the number of items to slice is 0
	    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ?
	          iterable.get(index + resolvedBegin, notSetValue) :
	          notSetValue;
	      }
	    }

	    sliceSeq.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k)  {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false &&
	                 iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function(type, reverse) {
	      if (sliceSize !== 0 && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (skipped++ < resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    }

	    return sliceSeq;
	  }


	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c) 
	        {return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0)}
	      );
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new Iterator(function()  {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }


	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function(v, k, c)  {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function(type, reverse) {var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new Iterator(function()  {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step :
	          iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }


	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function(v ) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ?
	          keyedSeqFromValue(v) :
	          indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function(v ) {return v.size !== 0});

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable ||
	          isKeyedIterable && isKeyed(singleton) ||
	          isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(
	      function(sum, seq)  {
	        if (sum !== undefined) {
	          var size = seq.size;
	          if (size !== undefined) {
	            return sum + size;
	          }
	        }
	      },
	      0
	    );
	    return concatSeq;
	  }


	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function(fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {var this$0 = this;
	        iter.__iterate(function(v, k)  {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    }
	    flatSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new Iterator(function()  {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    }
	    return flatSequence;
	  }


	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(
	      function(v, k)  {return coerce(mapper.call(context, v, k, iterable))}
	    ).flatten(true);
	  }


	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 -1;
	    interposedSequence.__iterateUncached = function(fn, reverse) {var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function(v, k) 
	        {return (!iterations || fn(separator, iterations++, this$0) !== false) &&
	        fn(v, iterations++, this$0) !== false},
	        reverse
	      );
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function(type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new Iterator(function()  {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ?
	          iteratorValue(type, iterations++, separator) :
	          iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }


	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(
	      function(v, k)  {return [k, v, index++, mapper ? mapper(v, k, iterable) : v]}
	    ).toArray();
	    entries.sort(function(a, b)  {return comparator(a[3], b[3]) || a[2] - b[2]}).forEach(
	      isKeyedIterable ?
	      function(v, i)  { entries[i].length = 2; } :
	      function(v, i)  { entries[i] = v[1]; }
	    );
	    return isKeyedIterable ? KeyedSeq(entries) :
	      isIndexed(iterable) ? IndexedSeq(entries) :
	      SetSeq(entries);
	  }


	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq()
	        .map(function(v, k)  {return [v, mapper(v, k, iterable)]})
	        .reduce(function(a, b)  {return maxCompare(comparator, a[1], b[1]) ? b : a});
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function(a, b)  {return maxCompare(comparator, a, b) ? b : a});
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) || comp > 0;
	  }


	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function(i ) {return i.size}).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function(fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function(type, reverse) {
	      var iterators = iters.map(function(i )
	        {return (i = Iterable(i), getIterator(reverse ? i.reverse() : i))}
	      );
	      var iterations = 0;
	      var isDone = false;
	      return new Iterator(function()  {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function(i ) {return i.next()});
	          isDone = steps.some(function(s ) {return s.done});
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(
	          type,
	          iterations++,
	          zipper.apply(null, steps.map(function(s ) {return s.value}))
	        );
	      });
	    };
	    return zipSequence
	  }


	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable :
	      isIndexed(iterable) ? IndexedIterable :
	      SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create(
	      (
	        isKeyed(iterable) ? KeyedSeq :
	        isIndexed(iterable) ? IndexedSeq :
	        SetSeq
	      ).prototype
	    );
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(Record, KeyedCollection);

	    function Record(defaultValues, name) {
	      var hasInitialized;

	      var RecordType = function Record(values) {
	        if (values instanceof RecordType) {
	          return values;
	        }
	        if (!(this instanceof RecordType)) {
	          return new RecordType(values);
	        }
	        if (!hasInitialized) {
	          hasInitialized = true;
	          var keys = Object.keys(defaultValues);
	          setProps(RecordTypePrototype, keys);
	          RecordTypePrototype.size = keys.length;
	          RecordTypePrototype._name = name;
	          RecordTypePrototype._keys = keys;
	          RecordTypePrototype._defaultValues = defaultValues;
	        }
	        this._map = Map(values);
	      };

	      var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	      RecordTypePrototype.constructor = RecordType;

	      return RecordType;
	    }

	    Record.prototype.toString = function() {
	      return this.__toString(recordName(this) + ' {', '}');
	    };

	    // @pragma Access

	    Record.prototype.has = function(k) {
	      return this._defaultValues.hasOwnProperty(k);
	    };

	    Record.prototype.get = function(k, notSetValue) {
	      if (!this.has(k)) {
	        return notSetValue;
	      }
	      var defaultVal = this._defaultValues[k];
	      return this._map ? this._map.get(k, defaultVal) : defaultVal;
	    };

	    // @pragma Modification

	    Record.prototype.clear = function() {
	      if (this.__ownerID) {
	        this._map && this._map.clear();
	        return this;
	      }
	      var RecordType = this.constructor;
	      return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
	    };

	    Record.prototype.set = function(k, v) {
	      if (!this.has(k)) {
	        throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	      }
	      if (this._map && !this._map.has(k)) {
	        var defaultVal = this._defaultValues[k];
	        if (v === defaultVal) {
	          return this;
	        }
	      }
	      var newMap = this._map && this._map.set(k, v);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.remove = function(k) {
	      if (!this.has(k)) {
	        return this;
	      }
	      var newMap = this._map && this._map.remove(k);
	      if (this.__ownerID || newMap === this._map) {
	        return this;
	      }
	      return makeRecord(this, newMap);
	    };

	    Record.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Record.prototype.__iterator = function(type, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterator(type, reverse);
	    };

	    Record.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return KeyedIterable(this._defaultValues).map(function(_, k)  {return this$0.get(k)}).__iterate(fn, reverse);
	    };

	    Record.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map && this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return makeRecord(this, newMap, ownerID);
	    };


	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn =
	  RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;


	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name || 'Record';
	  }

	  function setProps(prototype, names) {
	    try {
	      names.forEach(setProp.bind(undefined, prototype));
	    } catch (error) {
	      // Object.defineProperty failed. Probably IE8.
	    }
	  }

	  function setProp(prototype, name) {
	    Object.defineProperty(prototype, name, {
	      get: function() {
	        return this.get(name);
	      },
	      set: function(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  }

	  createClass(Set, SetCollection);

	    // @pragma Construction

	    function Set(value) {
	      return value === null || value === undefined ? emptySet() :
	        isSet(value) && !isOrdered(value) ? value :
	        emptySet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    Set.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Set.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    Set.prototype.toString = function() {
	      return this.__toString('Set {', '}');
	    };

	    // @pragma Access

	    Set.prototype.has = function(value) {
	      return this._map.has(value);
	    };

	    // @pragma Modification

	    Set.prototype.add = function(value) {
	      return updateSet(this, this._map.set(value, true));
	    };

	    Set.prototype.remove = function(value) {
	      return updateSet(this, this._map.remove(value));
	    };

	    Set.prototype.clear = function() {
	      return updateSet(this, this._map.clear());
	    };

	    // @pragma Composition

	    Set.prototype.union = function() {var iters = SLICE$0.call(arguments, 0);
	      iters = iters.filter(function(x ) {return x.size !== 0});
	      if (iters.length === 0) {
	        return this;
	      }
	      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	        return this.constructor(iters[0]);
	      }
	      return this.withMutations(function(set ) {
	        for (var ii = 0; ii < iters.length; ii++) {
	          SetIterable(iters[ii]).forEach(function(value ) {return set.add(value)});
	        }
	      });
	    };

	    Set.prototype.intersect = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (!iters.every(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.subtract = function() {var iters = SLICE$0.call(arguments, 0);
	      if (iters.length === 0) {
	        return this;
	      }
	      iters = iters.map(function(iter ) {return SetIterable(iter)});
	      var originalSet = this;
	      return this.withMutations(function(set ) {
	        originalSet.forEach(function(value ) {
	          if (iters.some(function(iter ) {return iter.includes(value)})) {
	            set.remove(value);
	          }
	        });
	      });
	    };

	    Set.prototype.merge = function() {
	      return this.union.apply(this, arguments);
	    };

	    Set.prototype.mergeWith = function(merger) {var iters = SLICE$0.call(arguments, 1);
	      return this.union.apply(this, iters);
	    };

	    Set.prototype.sort = function(comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator));
	    };

	    Set.prototype.sortBy = function(mapper, comparator) {
	      // Late binding
	      return OrderedSet(sortFactory(this, comparator, mapper));
	    };

	    Set.prototype.wasAltered = function() {
	      return this._map.wasAltered();
	    };

	    Set.prototype.__iterate = function(fn, reverse) {var this$0 = this;
	      return this._map.__iterate(function(_, k)  {return fn(k, k, this$0)}, reverse);
	    };

	    Set.prototype.__iterator = function(type, reverse) {
	      return this._map.map(function(_, k)  {return k}).__iterator(type, reverse);
	    };

	    Set.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      var newMap = this._map.__ensureOwner(ownerID);
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this._map = newMap;
	        return this;
	      }
	      return this.__make(newMap, ownerID);
	    };


	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set :
	      newMap.size === 0 ? set.__empty() :
	      set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, Set);

	    // @pragma Construction

	    function OrderedSet(value) {
	      return value === null || value === undefined ? emptyOrderedSet() :
	        isOrderedSet(value) ? value :
	        emptyOrderedSet().withMutations(function(set ) {
	          var iter = SetIterable(value);
	          assertNotInfinite(iter.size);
	          iter.forEach(function(v ) {return set.add(v)});
	        });
	    }

	    OrderedSet.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    OrderedSet.fromKeys = function(value) {
	      return this(KeyedIterable(value).keySeq());
	    };

	    OrderedSet.prototype.toString = function() {
	      return this.__toString('OrderedSet {', '}');
	    };


	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Stack, IndexedCollection);

	    // @pragma Construction

	    function Stack(value) {
	      return value === null || value === undefined ? emptyStack() :
	        isStack(value) ? value :
	        emptyStack().unshiftAll(value);
	    }

	    Stack.of = function(/*...values*/) {
	      return this(arguments);
	    };

	    Stack.prototype.toString = function() {
	      return this.__toString('Stack [', ']');
	    };

	    // @pragma Access

	    Stack.prototype.get = function(index, notSetValue) {
	      var head = this._head;
	      index = wrapIndex(this, index);
	      while (head && index--) {
	        head = head.next;
	      }
	      return head ? head.value : notSetValue;
	    };

	    Stack.prototype.peek = function() {
	      return this._head && this._head.value;
	    };

	    // @pragma Modification

	    Stack.prototype.push = function(/*...values*/) {
	      if (arguments.length === 0) {
	        return this;
	      }
	      var newSize = this.size + arguments.length;
	      var head = this._head;
	      for (var ii = arguments.length - 1; ii >= 0; ii--) {
	        head = {
	          value: arguments[ii],
	          next: head
	        };
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pushAll = function(iter) {
	      iter = IndexedIterable(iter);
	      if (iter.size === 0) {
	        return this;
	      }
	      assertNotInfinite(iter.size);
	      var newSize = this.size;
	      var head = this._head;
	      iter.reverse().forEach(function(value ) {
	        newSize++;
	        head = {
	          value: value,
	          next: head
	        };
	      });
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    Stack.prototype.pop = function() {
	      return this.slice(1);
	    };

	    Stack.prototype.unshift = function(/*...values*/) {
	      return this.push.apply(this, arguments);
	    };

	    Stack.prototype.unshiftAll = function(iter) {
	      return this.pushAll(iter);
	    };

	    Stack.prototype.shift = function() {
	      return this.pop.apply(this, arguments);
	    };

	    Stack.prototype.clear = function() {
	      if (this.size === 0) {
	        return this;
	      }
	      if (this.__ownerID) {
	        this.size = 0;
	        this._head = undefined;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return emptyStack();
	    };

	    Stack.prototype.slice = function(begin, end) {
	      if (wholeSlice(begin, end, this.size)) {
	        return this;
	      }
	      var resolvedBegin = resolveBegin(begin, this.size);
	      var resolvedEnd = resolveEnd(end, this.size);
	      if (resolvedEnd !== this.size) {
	        // super.slice(begin, end);
	        return IndexedCollection.prototype.slice.call(this, begin, end);
	      }
	      var newSize = this.size - resolvedBegin;
	      var head = this._head;
	      while (resolvedBegin--) {
	        head = head.next;
	      }
	      if (this.__ownerID) {
	        this.size = newSize;
	        this._head = head;
	        this.__hash = undefined;
	        this.__altered = true;
	        return this;
	      }
	      return makeStack(newSize, head);
	    };

	    // @pragma Mutability

	    Stack.prototype.__ensureOwner = function(ownerID) {
	      if (ownerID === this.__ownerID) {
	        return this;
	      }
	      if (!ownerID) {
	        this.__ownerID = ownerID;
	        this.__altered = false;
	        return this;
	      }
	      return makeStack(this.size, this._head, ownerID, this.__hash);
	    };

	    // @pragma Iteration

	    Stack.prototype.__iterate = function(fn, reverse) {
	      if (reverse) {
	        return this.reverse().__iterate(fn);
	      }
	      var iterations = 0;
	      var node = this._head;
	      while (node) {
	        if (fn(node.value, iterations++, this) === false) {
	          break;
	        }
	        node = node.next;
	      }
	      return iterations;
	    };

	    Stack.prototype.__iterator = function(type, reverse) {
	      if (reverse) {
	        return this.reverse().__iterator(type);
	      }
	      var iterations = 0;
	      var node = this._head;
	      return new Iterator(function()  {
	        if (node) {
	          var value = node.value;
	          node = node.next;
	          return iteratorValue(type, iterations++, value);
	        }
	        return iteratorDone();
	      });
	    };


	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;


	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function(key ) { ctor.prototype[key] = methods[key]; };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols &&
	      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function(v, i)  { array[i] = v; });
	      return array;
	    },

	    toIndexedSeq: function() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJS === 'function' ? value.toJS() : value}
	      ).__toJS();
	    },

	    toJSON: function() {
	      return this.toSeq().map(
	        function(value ) {return value && typeof value.toJSON === 'function' ? value.toJSON() : value}
	      ).__toJS();
	    },

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Map(this.toKeyedSeq());
	    },

	    toObject: function() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function(v, k)  { object[k] = v; });
	      return object;
	    },

	    toOrderedMap: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function() {
	      return isIndexed(this) ? this.toIndexedSeq() :
	        isKeyed(this) ? this.toKeyedSeq() :
	        this.toSetSeq();
	    },

	    toStack: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },


	    // ### Common JavaScript methods and properties

	    toString: function() {
	      return '[Iterable]';
	    },

	    __toString: function(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function() {var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    includes: function(searchValue) {
	      return this.some(function(value ) {return is(value, searchValue)});
	    },

	    entries: function() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function(v, k, c)  {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    forEach: function(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function(v ) {
	        isFirst ? (isFirst = false) : (joined += separator);
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function(v, k, c)  {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function() {
	      return this.__iterator(ITERATE_VALUES);
	    },


	    // ### More sequential methods

	    butLast: function() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function()  {return true});
	    },

	    count: function(predicate, context) {
	      return ensureSize(
	        predicate ? this.toSeq().filter(predicate, context) : this
	      );
	    },

	    countBy: function(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function()  {return iterable.toSeq()};
	      return entriesSequence;
	    },

	    filterNot: function(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findEntry: function(predicate, context, notSetValue) {
	      var found = notSetValue;
	      this.__iterate(function(v, k, c)  {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findKey: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLast: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    findLastEntry: function(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
	    },

	    findLastKey: function(predicate, context) {
	      return this.toKeyedSeq().reverse().findKey(predicate, context);
	    },

	    first: function() {
	      return this.find(returnTrue);
	    },

	    flatMap: function(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function() {
	      return new FromEntriesSequence(this);
	    },

	    get: function(searchKey, notSetValue) {
	      return this.find(function(_, key)  {return is(key, searchKey)}, undefined, notSetValue);
	    },

	    getIn: function(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function(iter) {
	      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
	      return this.every(function(value ) {return iter.includes(value)});
	    },

	    isSuperset: function(iter) {
	      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
	      return iter.isSubset(this);
	    },

	    keyOf: function(searchValue) {
	      return this.findKey(function(value ) {return is(value, searchValue)});
	    },

	    keySeq: function() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function() {
	      return this.toSeq().reverse().first();
	    },

	    lastKeyOf: function(searchValue) {
	      return this.toKeyedSeq().reverse().keyOf(searchValue);
	    },

	    max: function(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function() {
	      return this.slice(1);
	    },

	    skip: function(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function() {
	      return this.toIndexedSeq();
	    },


	    // ### Hashable Object

	    hashCode: function() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    }


	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect =
	  IterablePrototype.toSource = function() { return this.toString(); };
	  IterablePrototype.chain = IterablePrototype.flatMap;
	  IterablePrototype.contains = IterablePrototype.includes;

	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function() {
	      return reify(this, flipFactory(this));
	    },

	    mapEntries: function(mapper, context) {var this$0 = this;
	      var iterations = 0;
	      return reify(this,
	        this.toSeq().map(
	          function(v, k)  {return mapper.call(context, [k, v], iterations++, this$0)}
	        ).fromEntrySeq()
	      );
	    },

	    mapKeys: function(mapper, context) {var this$0 = this;
	      return reify(this,
	        this.toSeq().flip().map(
	          function(k, v)  {return mapper.call(context, k, v, this$0)}
	        ).flip()
	      );
	    }

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function(v, k)  {return JSON.stringify(k) + ': ' + quoteString(v)};



	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function() {
	      return new ToKeyedSequence(this, false);
	    },


	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function(searchValue) {
	      var key = this.keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function(searchValue) {
	      var key = this.lastKeyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    reverse: function() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	        return this;
	      }
	      // If index is negative, it should resolve relative to the size of the
	      // collection. However size may be expensive to compute if not cached, so
	      // only call count() if the number is in fact negative.
	      index = resolveBegin(index, index < 0 ? this.count() : this.size);
	      var spliced = this.slice(0, index);
	      return reify(
	        this,
	        numArgs === 1 ?
	          spliced :
	          spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	      );
	    },


	    // ### More collection methods

	    findLastIndex: function(predicate, context) {
	      var entry = this.findLastEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    first: function() {
	      return this.get(0);
	    },

	    flatten: function(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return (index < 0 || (this.size === Infinity ||
	          (this.size !== undefined && index > this.size))) ?
	        notSetValue :
	        this.find(function(_, key)  {return key === index}, undefined, notSetValue);
	    },

	    has: function(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ?
	        this.size === Infinity || index < this.size :
	        this.indexOf(index) !== -1
	      );
	    },

	    interpose: function(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function(/*...iterables*/) {
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    keySeq: function() {
	      return Range(0, this.size);
	    },

	    last: function() {
	      return this.get(-1);
	    },

	    skipWhile: function(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function(/*, ...iterables */) {
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function(zipper/*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    }

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;



	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    includes: function(value) {
	      return this.has(value);
	    },


	    // ### More sequential methods

	    keySeq: function() {
	      return this.valueSeq();
	    }

	  });

	  SetIterable.prototype.has = IterablePrototype.includes;
	  SetIterable.prototype.contains = SetIterable.prototype.includes;


	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);


	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    }
	  }

	  function neg(predicate) {
	    return function() {
	      return -predicate.apply(this, arguments);
	    }
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : String(value);
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(
	      keyed ?
	        ordered ?
	          function(v, k)  { h = 31 * h + hashMerge(hash(v), hash(k)) | 0; } :
	          function(v, k)  { h = h + hashMerge(hash(v), hash(k)) | 0; } :
	        ordered ?
	          function(v ) { h = 31 * h + hash(v) | 0; } :
	          function(v ) { h = h + hash(v) | 0; }
	    );
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = imul(h, 0xCC9E2D51);
	    h = imul(h << 15 | h >>> -15, 0x1B873593);
	    h = imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS

	  };

	  return Immutable;

	}));

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(14),
	    root = __webpack_require__(8);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(244),
	    mapCacheDelete = __webpack_require__(245),
	    mapCacheGet = __webpack_require__(246),
	    mapCacheHas = __webpack_require__(247),
	    mapCacheSet = __webpack_require__(248);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(202);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./react-data-grid-cell.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./react-data-grid-cell.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _keyMirror = __webpack_require__(208);

	var _keyMirror2 = _interopRequireDefault(_keyMirror);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var constants = {
	  UpdateActions: (0, _keyMirror2['default'])({
	    CELL_UPDATE: null,
	    COLUMN_FILL: null,
	    COPY_PASTE: null,
	    CELL_DRAG: null
	  }),
	  DragItemTypes: {
	    Column: 'column'
	  }
	};

	module.exports = constants;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _isEqual = __webpack_require__(260);

	var _isEqual2 = _interopRequireDefault(_isEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(4);
	var joinClasses = __webpack_require__(10);
	var EditorContainer = __webpack_require__(190);
	var ExcelColumn = __webpack_require__(13);
	var isFunction = __webpack_require__(47);
	var CellMetaDataShape = __webpack_require__(17);
	var SimpleCellFormatter = __webpack_require__(193);
	var ColumnUtils = __webpack_require__(11);
	var createObjectWithProperties = __webpack_require__(20);
	__webpack_require__(51);

	// The list of the propTypes that we want to include in the Cell div
	var knownDivPropertyKeys = ['height', 'tabIndex', 'value'];

	var Cell = React.createClass({
	  displayName: 'Cell',


	  propTypes: {
	    rowIdx: React.PropTypes.number.isRequired,
	    idx: React.PropTypes.number.isRequired,
	    selected: React.PropTypes.shape({
	      idx: React.PropTypes.number.isRequired
	    }),
	    selectedColumn: React.PropTypes.object,
	    height: React.PropTypes.number,
	    tabIndex: React.PropTypes.number,
	    ref: React.PropTypes.string,
	    column: React.PropTypes.shape(ExcelColumn).isRequired,
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
	    isExpanded: React.PropTypes.bool,
	    isRowSelected: React.PropTypes.bool,
	    cellMetaData: React.PropTypes.shape(CellMetaDataShape).isRequired,
	    handleDragStart: React.PropTypes.func,
	    className: React.PropTypes.string,
	    cellControls: React.PropTypes.any,
	    rowData: React.PropTypes.object.isRequired,
	    forceUpdate: React.PropTypes.bool,
	    expandableOptions: React.PropTypes.object.isRequired,
	    isScrolling: React.PropTypes.bool.isRequired,
	    tooltip: React.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      tabIndex: -1,
	      isExpanded: false,
	      value: ''
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      isCellValueChanging: false
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this.checkFocus();
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      isCellValueChanging: this.props.value !== nextProps.value
	    });
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this.checkFocus();
	    var dragged = this.props.cellMetaData.dragged;
	    if (dragged && dragged.complete === true) {
	      this.props.cellMetaData.handleTerminateDrag();
	    }
	    if (this.state.isCellValueChanging && this.props.selectedColumn != null) {
	      this.applyUpdateClass();
	    }
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    var shouldUpdate = this.props.column.width !== nextProps.column.width || this.props.column.left !== nextProps.column.left || this.props.column.cellClass !== nextProps.column.cellClass || this.props.height !== nextProps.height || this.props.rowIdx !== nextProps.rowIdx || this.isCellSelectionChanging(nextProps) || this.isDraggedCellChanging(nextProps) || this.isCopyCellChanging(nextProps) || this.props.isRowSelected !== nextProps.isRowSelected || this.isSelected() || this.props.value !== nextProps.value || this.props.forceUpdate === true || this.props.className !== nextProps.className || this.hasChangedDependentValues(nextProps);
	    return shouldUpdate;
	  },
	  onCellClick: function onCellClick(e) {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellClick && typeof meta.onCellClick === 'function') {
	      meta.onCellClick({ rowIdx: this.props.rowIdx, idx: this.props.idx }, e);
	    }
	  },
	  onCellContextMenu: function onCellContextMenu() {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellContextMenu && typeof meta.onCellContextMenu === 'function') {
	      meta.onCellContextMenu({ rowIdx: this.props.rowIdx, idx: this.props.idx });
	    }
	  },
	  onCellDoubleClick: function onCellDoubleClick(e) {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellDoubleClick && typeof meta.onCellDoubleClick === 'function') {
	      meta.onCellDoubleClick({ rowIdx: this.props.rowIdx, idx: this.props.idx }, e);
	    }
	  },
	  onCellExpand: function onCellExpand(e) {
	    e.stopPropagation();
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellExpand != null) {
	      meta.onCellExpand({ rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.props.rowData, expandArgs: this.props.expandableOptions });
	    }
	  },
	  onCellKeyDown: function onCellKeyDown(e) {
	    if (this.canExpand() && e.key === 'Enter') {
	      this.onCellExpand(e);
	    }
	  },
	  onDragHandleDoubleClick: function onDragHandleDoubleClick(e) {
	    e.stopPropagation();
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onDragHandleDoubleClick && typeof meta.onDragHandleDoubleClick === 'function') {
	      meta.onDragHandleDoubleClick({ rowIdx: this.props.rowIdx, idx: this.props.idx, rowData: this.getRowData(), e: e });
	    }
	  },
	  onDragOver: function onDragOver(e) {
	    e.preventDefault();
	  },
	  getStyle: function getStyle() {
	    var style = {
	      position: 'absolute',
	      width: this.props.column.width,
	      height: this.props.height,
	      left: this.props.column.left,
	      contain: 'layout'
	    };
	    return style;
	  },
	  getFormatter: function getFormatter() {
	    var col = this.props.column;
	    if (this.isActive()) {
	      return React.createElement(EditorContainer, { rowData: this.getRowData(), rowIdx: this.props.rowIdx, value: this.props.value, idx: this.props.idx, cellMetaData: this.props.cellMetaData, column: col, height: this.props.height });
	    }

	    return this.props.column.formatter;
	  },
	  getRowData: function getRowData() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

	    return props.rowData.toJSON ? props.rowData.toJSON() : props.rowData;
	  },
	  getFormatterDependencies: function getFormatterDependencies() {
	    // convention based method to get corresponding Id or Name of any Name or Id property
	    if (typeof this.props.column.getRowMetaData === 'function') {
	      return this.props.column.getRowMetaData(this.getRowData(), this.props.column);
	    }
	  },
	  getCellClass: function getCellClass() {
	    var className = joinClasses(this.props.column.cellClass, 'react-grid-Cell', this.props.className, this.props.column.locked ? 'react-grid-Cell--locked' : null);
	    var extraClasses = joinClasses({
	      'row-selected': this.props.isRowSelected,
	      editing: this.isActive(),
	      copied: this.isCopied() || this.wasDraggedOver() || this.isDraggedOverUpwards() || this.isDraggedOverDownwards(),
	      'is-dragged-over-up': this.isDraggedOverUpwards(),
	      'is-dragged-over-down': this.isDraggedOverDownwards(),
	      'was-dragged-over': this.wasDraggedOver(),
	      'cell-tooltip': this.props.tooltip ? true : false
	    });
	    return joinClasses(className, extraClasses);
	  },
	  getUpdateCellClass: function getUpdateCellClass() {
	    return this.props.column.getUpdateCellClass ? this.props.column.getUpdateCellClass(this.props.selectedColumn, this.props.column, this.state.isCellValueChanging) : '';
	  },
	  isColumnSelected: function isColumnSelected() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }

	    return meta.selected && meta.selected.idx === this.props.idx;
	  },
	  isSelected: function isSelected() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }

	    return meta.selected && meta.selected.rowIdx === this.props.rowIdx && meta.selected.idx === this.props.idx;
	  },
	  isActive: function isActive() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }
	    return this.isSelected() && meta.selected.active === true;
	  },
	  isCellSelectionChanging: function isCellSelectionChanging(nextProps) {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }
	    var nextSelected = nextProps.cellMetaData.selected;
	    if (meta.selected && nextSelected) {
	      return this.props.idx === nextSelected.idx || this.props.idx === meta.selected.idx;
	    }

	    return true;
	  },
	  isCellSelectEnabled: function isCellSelectEnabled() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }
	    return meta.enableCellSelect;
	  },
	  hasChangedDependentValues: function hasChangedDependentValues(nextProps) {
	    var currentColumn = this.props.column;
	    var hasChangedDependentValues = false;

	    if (currentColumn.getRowMetaData) {
	      var currentRowMetaData = currentColumn.getRowMetaData(this.getRowData(), currentColumn);
	      var nextColumn = nextProps.column;
	      var nextRowMetaData = nextColumn.getRowMetaData(this.getRowData(nextProps), nextColumn);

	      hasChangedDependentValues = !(0, _isEqual2['default'])(currentRowMetaData, nextRowMetaData);
	    }

	    return hasChangedDependentValues;
	  },
	  applyUpdateClass: function applyUpdateClass() {
	    var updateCellClass = this.getUpdateCellClass();
	    // -> removing the class
	    if (updateCellClass != null && updateCellClass !== '') {
	      var cellDOMNode = ReactDOM.findDOMNode(this);
	      if (cellDOMNode.classList) {
	        cellDOMNode.classList.remove(updateCellClass);
	        // -> and re-adding the class
	        cellDOMNode.classList.add(updateCellClass);
	      } else if (cellDOMNode.className.indexOf(updateCellClass) === -1) {
	        // IE9 doesn't support classList, nor (I think) altering element.className
	        // without replacing it wholesale.
	        cellDOMNode.className = cellDOMNode.className + ' ' + updateCellClass;
	      }
	    }
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var ctrl = this; // flow on windows has an outdated react declaration, once that gets updated, we can remove this
	    if (ctrl.isMounted()) {
	      var node = ReactDOM.findDOMNode(this);
	      var transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	      node.style.webkitTransform = transform;
	      node.style.transform = transform;
	    }
	  },
	  isCopied: function isCopied() {
	    var copied = this.props.cellMetaData.copied;
	    return copied && copied.rowIdx === this.props.rowIdx && copied.idx === this.props.idx;
	  },
	  isDraggedOver: function isDraggedOver() {
	    var dragged = this.props.cellMetaData.dragged;
	    return dragged && dragged.overRowIdx === this.props.rowIdx && dragged.idx === this.props.idx;
	  },
	  wasDraggedOver: function wasDraggedOver() {
	    var dragged = this.props.cellMetaData.dragged;
	    return dragged && (dragged.overRowIdx < this.props.rowIdx && this.props.rowIdx < dragged.rowIdx || dragged.overRowIdx > this.props.rowIdx && this.props.rowIdx > dragged.rowIdx) && dragged.idx === this.props.idx;
	  },
	  isDraggedCellChanging: function isDraggedCellChanging(nextProps) {
	    var isChanging = void 0;
	    var dragged = this.props.cellMetaData.dragged;
	    var nextDragged = nextProps.cellMetaData.dragged;
	    if (dragged) {
	      isChanging = nextDragged && this.props.idx === nextDragged.idx || dragged && this.props.idx === dragged.idx;
	      return isChanging;
	    }

	    return false;
	  },
	  isCopyCellChanging: function isCopyCellChanging(nextProps) {
	    var isChanging = void 0;
	    var copied = this.props.cellMetaData.copied;
	    var nextCopied = nextProps.cellMetaData.copied;
	    if (copied) {
	      isChanging = nextCopied && this.props.idx === nextCopied.idx || copied && this.props.idx === copied.idx;
	      return isChanging;
	    }
	    return false;
	  },
	  isDraggedOverUpwards: function isDraggedOverUpwards() {
	    var dragged = this.props.cellMetaData.dragged;
	    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx < dragged.rowIdx;
	  },
	  isDraggedOverDownwards: function isDraggedOverDownwards() {
	    var dragged = this.props.cellMetaData.dragged;
	    return !this.isSelected() && this.isDraggedOver() && this.props.rowIdx > dragged.rowIdx;
	  },
	  isFocusedOnBody: function isFocusedOnBody() {
	    return document.activeElement == null || document.activeElement.nodeName && typeof document.activeElement.nodeName === 'string' && document.activeElement.nodeName.toLowerCase() === 'body';
	  },
	  isFocusedOnCell: function isFocusedOnCell() {
	    return document.activeElement && document.activeElement.className === 'react-grid-Cell';
	  },
	  checkFocus: function checkFocus() {
	    if (this.isSelected() && !this.isActive()) {
	      if (this.props.isScrolling && !this.props.cellMetaData.isScrollingVerticallyWithKeyboard && !this.props.cellMetaData.isScrollingHorizontallyWithKeyboard) {
	        return;
	      }
	      // Only focus to the current cell if the currently active node in the document is within the data grid.
	      // Meaning focus should not be stolen from elements that the grid doesnt control.
	      var dataGridDOMNode = this.props.cellMetaData && this.props.cellMetaData.getDataGridDOMNode ? this.props.cellMetaData.getDataGridDOMNode() : null;
	      if (this.isFocusedOnCell() || this.isFocusedOnBody() || dataGridDOMNode && dataGridDOMNode.contains(document.activeElement)) {
	        var cellDOMNode = ReactDOM.findDOMNode(this);
	        if (cellDOMNode) {
	          cellDOMNode.focus();
	        }
	      }
	    }
	  },
	  canEdit: function canEdit() {
	    return this.props.column.editor != null || this.props.column.editable;
	  },
	  canExpand: function canExpand() {
	    return this.props.expandableOptions && this.props.expandableOptions.canExpand;
	  },
	  createColumEventCallBack: function createColumEventCallBack(onColumnEvent, info) {
	    return function (e) {
	      onColumnEvent(e, info);
	    };
	  },
	  createCellEventCallBack: function createCellEventCallBack(gridEvent, columnEvent) {
	    return function (e) {
	      gridEvent(e);
	      columnEvent(e);
	    };
	  },
	  createEventDTO: function createEventDTO(gridEvents, columnEvents, onColumnEvent) {
	    var allEvents = Object.assign({}, gridEvents);

	    for (var eventKey in columnEvents) {
	      if (columnEvents.hasOwnProperty(eventKey)) {
	        var event = columnEvents[event];
	        var eventInfo = { rowIdx: this.props.rowIdx, idx: this.props.idx, name: eventKey };
	        var eventCallback = this.createColumEventCallBack(onColumnEvent, eventInfo);

	        if (allEvents.hasOwnProperty(eventKey)) {
	          var currentEvent = allEvents[eventKey];
	          allEvents[eventKey] = this.createCellEventCallBack(currentEvent, eventCallback);
	        } else {
	          allEvents[eventKey] = eventCallback;
	        }
	      }
	    }

	    return allEvents;
	  },
	  getEvents: function getEvents() {
	    var columnEvents = this.props.column ? Object.assign({}, this.props.column.events) : undefined;
	    var onColumnEvent = this.props.cellMetaData ? this.props.cellMetaData.onColumnEvent : undefined;
	    var gridEvents = {
	      onClick: this.onCellClick,
	      onDoubleClick: this.onCellDoubleClick,
	      onContextMenu: this.onCellContextMenu,
	      onDragOver: this.onDragOver
	    };

	    if (!columnEvents || !onColumnEvent) {
	      return gridEvents;
	    }

	    return this.createEventDTO(gridEvents, columnEvents, onColumnEvent);
	  },
	  getKnownDivProps: function getKnownDivProps() {
	    return createObjectWithProperties(this.props, knownDivPropertyKeys);
	  },
	  renderCellContent: function renderCellContent(props) {
	    var CellContent = void 0;
	    var Formatter = this.getFormatter();
	    if (React.isValidElement(Formatter)) {
	      props.dependentValues = this.getFormatterDependencies();
	      CellContent = React.cloneElement(Formatter, props);
	    } else if (isFunction(Formatter)) {
	      CellContent = React.createElement(Formatter, { value: this.props.value, dependentValues: this.getFormatterDependencies() });
	    } else {
	      CellContent = React.createElement(SimpleCellFormatter, { value: this.props.value });
	    }
	    var cellExpander = void 0;
	    var marginLeft = this.props.expandableOptions ? this.props.expandableOptions.treeDepth * 30 : 0;
	    if (this.canExpand()) {
	      cellExpander = React.createElement(
	        'span',
	        { style: { float: 'left', marginLeft: marginLeft }, onClick: this.onCellExpand },
	        this.props.expandableOptions.expanded ? String.fromCharCode('9660') : String.fromCharCode('9658')
	      );
	    }
	    return React.createElement(
	      'div',
	      { className: 'react-grid-Cell__value' },
	      cellExpander,
	      React.createElement(
	        'span',
	        null,
	        CellContent
	      ),
	      ' ',
	      this.props.cellControls,
	      ' '
	    );
	  },
	  render: function render() {
	    if (this.props.column.hidden) {
	      return null;
	    }

	    var style = this.getStyle();

	    var className = this.getCellClass();

	    var cellContent = this.renderCellContent({
	      value: this.props.value,
	      column: this.props.column,
	      rowIdx: this.props.rowIdx,
	      isExpanded: this.props.isExpanded
	    });

	    var dragHandle = !this.isActive() && ColumnUtils.canEdit(this.props.column, this.props.rowData, this.props.cellMetaData.enableCellSelect) ? React.createElement(
	      'div',
	      { className: 'drag-handle', draggable: 'true', onDoubleClick: this.onDragHandleDoubleClick },
	      React.createElement('span', { style: { display: 'none' } })
	    ) : null;
	    var events = this.getEvents();
	    var tooltip = this.props.tooltip ? React.createElement(
	      'span',
	      { className: 'cell-tooltip-text' },
	      this.props.tooltip
	    ) : null;

	    return React.createElement(
	      'div',
	      _extends({}, this.getKnownDivProps(), { className: className, style: style }, events),
	      cellContent,
	      dragHandle,
	      tooltip
	    );
	  }
	});

	module.exports = Cell;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(4);
	var joinClasses = __webpack_require__(10);
	var ExcelColumn = __webpack_require__(13);
	var ResizeHandle = __webpack_require__(183);
	__webpack_require__(21);

	var PropTypes = React.PropTypes;

	function simpleCellRenderer(objArgs) {
	  return React.createElement(
	    'div',
	    { className: 'widget-HeaderCell__value' },
	    objArgs.column.name
	  );
	}

	var HeaderCell = React.createClass({
	  displayName: 'HeaderCell',


	  propTypes: {
	    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
	    column: PropTypes.shape(ExcelColumn).isRequired,
	    onResize: PropTypes.func.isRequired,
	    height: PropTypes.number.isRequired,
	    onResizeEnd: PropTypes.func.isRequired,
	    className: PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      renderer: simpleCellRenderer
	    };
	  },
	  getInitialState: function getInitialState() {
	    return { resizing: false };
	  },
	  onDragStart: function onDragStart(e) {
	    this.setState({ resizing: true });
	    // need to set dummy data for FF
	    if (e && e.dataTransfer && e.dataTransfer.setData) e.dataTransfer.setData('text/plain', 'dummy');
	  },
	  onDrag: function onDrag(e) {
	    var resize = this.props.onResize || null; // for flows sake, doesnt recognise a null check direct
	    if (resize) {
	      var _width = this.getWidthFromMouseEvent(e);
	      if (_width > 0) {
	        resize(this.props.column, _width);
	      }
	    }
	  },
	  onDragEnd: function onDragEnd(e) {
	    var width = this.getWidthFromMouseEvent(e);
	    this.props.onResizeEnd(this.props.column, width);
	    this.setState({ resizing: false });
	  },
	  getWidthFromMouseEvent: function getWidthFromMouseEvent(e) {
	    var right = e.pageX || e.touches && e.touches[0] && e.touches[0].pageX || e.changedTouches && e.changedTouches[e.changedTouches.length - 1].pageX;
	    var left = ReactDOM.findDOMNode(this).getBoundingClientRect().left;
	    return right - left;
	  },
	  getCell: function getCell() {
	    if (React.isValidElement(this.props.renderer)) {
	      // if it is a string, it's an HTML element, and column is not a valid property, so only pass height
	      if (typeof this.props.renderer.type === 'string') {
	        return React.cloneElement(this.props.renderer, { height: this.props.height });
	      }
	      return React.cloneElement(this.props.renderer, { column: this.props.column, height: this.props.height });
	    }
	    return this.props.renderer({ column: this.props.column });
	  },
	  getStyle: function getStyle() {
	    return {
	      width: this.props.column.width,
	      left: this.props.column.left,
	      display: 'inline-block',
	      position: 'absolute',
	      height: this.props.height,
	      margin: 0,
	      textOverflow: 'ellipsis',
	      whiteSpace: 'nowrap'
	    };
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var node = ReactDOM.findDOMNode(this);
	    node.style.webkitTransform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	    node.style.transform = 'translate3d(' + scrollLeft + 'px, 0px, 0px)';
	  },
	  render: function render() {
	    var resizeHandle = void 0;
	    if (this.props.column.resizable) {
	      resizeHandle = React.createElement(ResizeHandle, {
	        onDrag: this.onDrag,
	        onDragStart: this.onDragStart,
	        onDragEnd: this.onDragEnd
	      });
	    }
	    var className = joinClasses({
	      'react-grid-HeaderCell': true,
	      'react-grid-HeaderCell--resizing': this.state.resizing,
	      'react-grid-HeaderCell--locked': this.props.column.locked
	    });
	    className = joinClasses(className, this.props.className, this.props.column.cellClass);
	    var cell = this.getCell();
	    return React.createElement(
	      'div',
	      { className: className, style: this.getStyle() },
	      cell,
	      resizeHandle
	    );
	  }
	});

	module.exports = HeaderCell;

/***/ },
/* 70 */
/***/ function(module, exports) {

	'use strict';

	var KeyboardHandlerMixin = {
	  onKeyDown: function onKeyDown(e) {
	    if (this.isCtrlKeyHeldDown(e)) {
	      this.checkAndCall('onPressKeyWithCtrl', e);
	    } else if (this.isKeyExplicitlyHandled(e.key)) {
	      // break up individual keyPress events to have their own specific callbacks
	      // this allows multiple mixins to listen to onKeyDown events and somewhat reduces methodName clashing
	      var callBack = 'onPress' + e.key;
	      this.checkAndCall(callBack, e);
	    } else if (this.isKeyPrintable(e.keyCode)) {
	      this.checkAndCall('onPressChar', e);
	    }

	    // Track which keys are currently down for shift clicking etc
	    this._keysDown = this._keysDown || {};
	    this._keysDown[e.keyCode] = true;
	    if (this.props.onGridKeyDown && typeof this.props.onGridKeyDown === 'function') {
	      this.props.onGridKeyDown(e);
	    }
	  },
	  onKeyUp: function onKeyUp(e) {
	    // Track which keys are currently down for shift clicking etc
	    this._keysDown = this._keysDown || {};
	    delete this._keysDown[e.keyCode];

	    if (this.props.onGridKeyUp && typeof this.props.onGridKeyUp === 'function') {
	      this.props.onGridKeyUp(e);
	    }
	  },
	  isKeyDown: function isKeyDown(keyCode) {
	    if (!this._keysDown) return false;
	    return keyCode in this._keysDown;
	  },
	  isSingleKeyDown: function isSingleKeyDown(keyCode) {
	    if (!this._keysDown) return false;
	    return keyCode in this._keysDown && Object.keys(this._keysDown).length === 1;
	  },


	  // taken from http://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
	  isKeyPrintable: function isKeyPrintable(keycode) {
	    var valid = keycode > 47 && keycode < 58 || // number keys
	    keycode === 32 || keycode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
	    keycode > 64 && keycode < 91 || // letter keys
	    keycode > 95 && keycode < 112 || // numpad keys
	    keycode > 185 && keycode < 193 || // ;=,-./` (in order)
	    keycode > 218 && keycode < 223; // [\]' (in order)

	    return valid;
	  },
	  isKeyExplicitlyHandled: function isKeyExplicitlyHandled(key) {
	    return typeof this['onPress' + key] === 'function';
	  },
	  isCtrlKeyHeldDown: function isCtrlKeyHeldDown(e) {
	    return e.ctrlKey === true && e.key !== 'Control';
	  },
	  checkAndCall: function checkAndCall(methodName, args) {
	    if (typeof this[methodName] === 'function') {
	      this[methodName](args);
	    }
	  }
	};

	module.exports = KeyboardHandlerMixin;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.shouldRowUpdate = undefined;

	var _ColumnMetrics = __webpack_require__(43);

	var _ColumnMetrics2 = _interopRequireDefault(_ColumnMetrics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function doesRowContainSelectedCell(props) {
	  var selected = props.cellMetaData.selected;
	  if (selected && selected.rowIdx === props.idx) {
	    return true;
	  }
	  return false;
	}

	function willRowBeDraggedOver(props) {
	  var dragged = props.cellMetaData.dragged;
	  return dragged != null && (dragged.rowIdx >= 0 || dragged.complete === true);
	}

	function hasRowBeenCopied(props) {
	  var copied = props.cellMetaData.copied;
	  return copied != null && copied.rowIdx === props.idx;
	}

	var shouldRowUpdate = exports.shouldRowUpdate = function shouldRowUpdate(nextProps, currentProps) {
	  return !_ColumnMetrics2['default'].sameColumns(currentProps.columns, nextProps.columns, _ColumnMetrics2['default'].sameColumn) || doesRowContainSelectedCell(currentProps) || doesRowContainSelectedCell(nextProps) || willRowBeDraggedOver(nextProps) || nextProps.row !== currentProps.row || currentProps.colDisplayStart !== nextProps.colDisplayStart || currentProps.colDisplayEnd !== nextProps.colDisplayEnd || currentProps.colVisibleStart !== nextProps.colVisibleStart || currentProps.colVisibleEnd !== nextProps.colVisibleEnd || hasRowBeenCopied(currentProps) || currentProps.isSelected !== nextProps.isSelected || nextProps.height !== currentProps.height || currentProps.isOver !== nextProps.isOver || currentProps.canDrop !== nextProps.canDrop || currentProps.forceUpdate === true;
	};

	exports['default'] = shouldRowUpdate;

/***/ },
/* 72 */
/***/ function(module, exports) {

	'use strict';

	var RowUtils = {
	  get: function get(row, property) {
	    if (typeof row.get === 'function') {
	      return row.get(property);
	    }

	    return row[property];
	  },
	  isRowSelected: function isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx) {
	    if (indexes && Object.prototype.toString.call(indexes) === '[object Array]') {
	      return indexes.indexOf(rowIdx) > -1;
	    } else if (keys && keys.rowKey && keys.values && Object.prototype.toString.call(keys.values) === '[object Array]') {
	      return keys.values.indexOf(rowData[keys.rowKey]) > -1;
	    } else if (isSelectedKey && rowData && typeof isSelectedKey === 'string') {
	      return rowData[isSelectedKey];
	    }
	    return false;
	  }
	};

	module.exports = RowUtils;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.SimpleRowsContainer = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SimpleRowsContainer = function SimpleRowsContainer(props) {
	  return _react2['default'].createElement(
	    'div',
	    { key: 'rows-container', style: { overflow: 'hidden' } },
	    props.rows
	  );
	};

	SimpleRowsContainer.propTypes = {
	  width: _react.PropTypes.number,
	  rows: _react.PropTypes.array
	};

	var RowsContainer = function (_React$Component) {
	  _inherits(RowsContainer, _React$Component);

	  function RowsContainer(props) {
	    _classCallCheck(this, RowsContainer);

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.plugins = props.window ? props.window.ReactDataGridPlugins : window.ReactDataGridPlugins;
	    _this.hasContextMenu = _this.hasContextMenu.bind(_this);
	    _this.renderRowsWithContextMenu = _this.renderRowsWithContextMenu.bind(_this);
	    _this.getContextMenuContainer = _this.getContextMenuContainer.bind(_this);
	    _this.state = { ContextMenuContainer: _this.getContextMenuContainer(props) };
	    return _this;
	  }

	  RowsContainer.prototype.getContextMenuContainer = function getContextMenuContainer() {
	    if (this.hasContextMenu()) {
	      if (!this.plugins) {
	        throw new Error('You need to include ReactDataGrid UiPlugins in order to initialise context menu');
	      }
	      return this.plugins.Menu.ContextMenuLayer('reactDataGridContextMenu')(SimpleRowsContainer);
	    }
	  };

	  RowsContainer.prototype.hasContextMenu = function hasContextMenu() {
	    return this.props.contextMenu && _react2['default'].isValidElement(this.props.contextMenu);
	  };

	  RowsContainer.prototype.renderRowsWithContextMenu = function renderRowsWithContextMenu() {
	    var ContextMenuRowsContainer = this.state.ContextMenuContainer;
	    var newProps = { rowIdx: this.props.rowIdx, idx: this.props.idx };
	    var contextMenu = _react2['default'].cloneElement(this.props.contextMenu, newProps);
	    // Initialise the context menu if it is available
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(ContextMenuRowsContainer, this.props),
	      contextMenu
	    );
	  };

	  RowsContainer.prototype.render = function render() {
	    return this.hasContextMenu() ? this.renderRowsWithContextMenu() : _react2['default'].createElement(SimpleRowsContainer, this.props);
	  };

	  return RowsContainer;
	}(_react2['default'].Component);

	RowsContainer.propTypes = {
	  contextMenu: _react.PropTypes.element,
	  rowIdx: _react.PropTypes.number,
	  idx: _react.PropTypes.number,
	  window: _react.PropTypes.object
	};

	exports['default'] = RowsContainer;
	exports.SimpleRowsContainer = SimpleRowsContainer;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	__webpack_require__(87);

	var CheckboxEditor = React.createClass({
	  displayName: 'CheckboxEditor',


	  propTypes: {
	    value: React.PropTypes.bool,
	    rowIdx: React.PropTypes.number,
	    column: React.PropTypes.shape({
	      key: React.PropTypes.string,
	      onCellChange: React.PropTypes.func
	    }),
	    dependentValues: React.PropTypes.object
	  },

	  handleChange: function handleChange(e) {
	    this.props.column.onCellChange(this.props.rowIdx, this.props.column.key, this.props.dependentValues, e);
	  },
	  render: function render() {
	    var checked = this.props.value != null ? this.props.value : false;
	    var checkboxName = 'checkbox' + this.props.rowIdx;
	    return React.createElement(
	      'div',
	      { className: 'react-grid-checkbox-container', onClick: this.handleChange },
	      React.createElement('input', { className: 'react-grid-checkbox', type: 'checkbox', name: checkboxName, checked: checked }),
	      React.createElement('label', { htmlFor: checkboxName, className: 'react-grid-checkbox-label' })
	    );
	  }
	});

	module.exports = CheckboxEditor;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(4);
	var ExcelColumn = __webpack_require__(13);

	var EditorBase = function (_React$Component) {
	  _inherits(EditorBase, _React$Component);

	  function EditorBase() {
	    _classCallCheck(this, EditorBase);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  EditorBase.prototype.getStyle = function getStyle() {
	    return {
	      width: '100%'
	    };
	  };

	  EditorBase.prototype.getValue = function getValue() {
	    var updated = {};
	    updated[this.props.column.key] = this.getInputNode().value;
	    return updated;
	  };

	  EditorBase.prototype.getInputNode = function getInputNode() {
	    var domNode = ReactDOM.findDOMNode(this);
	    if (domNode.tagName === 'INPUT') {
	      return domNode;
	    }

	    return domNode.querySelector('input:not([type=hidden])');
	  };

	  EditorBase.prototype.inheritContainerStyles = function inheritContainerStyles() {
	    return true;
	  };

	  return EditorBase;
	}(React.Component);

	EditorBase.propTypes = {
	  onKeyDown: React.PropTypes.func.isRequired,
	  value: React.PropTypes.any.isRequired,
	  onBlur: React.PropTypes.func.isRequired,
	  column: React.PropTypes.shape(ExcelColumn).isRequired,
	  commit: React.PropTypes.func.isRequired
	};

	module.exports = EditorBase;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(2);
	var EditorBase = __webpack_require__(75);

	var SimpleTextEditor = function (_EditorBase) {
	  _inherits(SimpleTextEditor, _EditorBase);

	  function SimpleTextEditor() {
	    _classCallCheck(this, SimpleTextEditor);

	    return _possibleConstructorReturn(this, _EditorBase.apply(this, arguments));
	  }

	  SimpleTextEditor.prototype.render = function render() {
	    return React.createElement('input', { ref: 'input', type: 'text', onBlur: this.props.onBlur, className: 'form-control', defaultValue: this.props.value });
	  };

	  return SimpleTextEditor;
	}(EditorBase);

	module.exports = SimpleTextEditor;

/***/ },
/* 77 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function isColumnsImmutable(columns) {
	  return typeof Immutable !== 'undefined' && columns instanceof Immutable.List;
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 * @typechecks
	 * 
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Performs equality by iterating through keys on an object and returning false
	 * when any key has values which are not strictly equal between the arguments.
	 * Returns true when the values of all keys are strictly equal.
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = shallowEqual;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(40),
	    arraySome = __webpack_require__(215),
	    cacheHas = __webpack_require__(41);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof (window) == 'object' && (window) && (window).Object === Object && (window);

	module.exports = freeGlobal;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(8),
	    stubFalse = __webpack_require__(263);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(22),
	    isObject = __webpack_require__(26);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(221),
	    baseUnary = __webpack_require__(65),
	    nodeUtil = __webpack_require__(251);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 86 */
/***/ function(module, exports) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(203);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./react-data-grid-checkbox.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./react-data-grid-checkbox.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(14),
	    root = __webpack_require__(8);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(223),
	    isArguments = __webpack_require__(113),
	    isArray = __webpack_require__(12),
	    isBuffer = __webpack_require__(82),
	    isIndex = __webpack_require__(110),
	    isTypedArray = __webpack_require__(85);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = arrayLikeKeys;


/***/ },
/* 109 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 110 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 111 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 112 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(217),
	    isObjectLike = __webpack_require__(18);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _shallowEqual = __webpack_require__(78);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _RowsContainer = __webpack_require__(73);

	var _RowsContainer2 = _interopRequireDefault(_RowsContainer);

	var _RowGroup = __webpack_require__(184);

	var _RowGroup2 = _interopRequireDefault(_RowGroup);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(4);
	var joinClasses = __webpack_require__(10);
	var PropTypes = React.PropTypes;
	var ScrollShim = __webpack_require__(185);
	var Row = __webpack_require__(44);
	var cellMetaDataShape = __webpack_require__(17);
	var RowUtils = __webpack_require__(72);
	__webpack_require__(34);

	var Canvas = React.createClass({
	  displayName: 'Canvas',

	  mixins: [ScrollShim],

	  propTypes: {
	    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
	    rowHeight: PropTypes.number.isRequired,
	    height: PropTypes.number.isRequired,
	    width: PropTypes.number,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    style: PropTypes.string,
	    className: PropTypes.string,
	    displayStart: PropTypes.number.isRequired,
	    displayEnd: PropTypes.number.isRequired,
	    visibleStart: PropTypes.number.isRequired,
	    visibleEnd: PropTypes.number.isRequired,
	    colVisibleStart: PropTypes.number.isRequired,
	    colVisibleEnd: PropTypes.number.isRequired,
	    colDisplayStart: PropTypes.number.isRequired,
	    colDisplayEnd: PropTypes.number.isRequired,
	    rowsCount: PropTypes.number.isRequired,
	    rowGetter: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.array.isRequired]),
	    expandedRows: PropTypes.array,
	    onRows: PropTypes.func,
	    onScroll: PropTypes.func,
	    columns: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
	    cellMetaData: PropTypes.shape(cellMetaDataShape).isRequired,
	    selectedRows: PropTypes.array,
	    rowKey: React.PropTypes.string,
	    rowScrollTimeout: React.PropTypes.number,
	    contextMenu: PropTypes.element,
	    getSubRowDetails: PropTypes.func,
	    rowSelection: React.PropTypes.oneOfType([React.PropTypes.shape({
	      indexes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
	    }), React.PropTypes.shape({
	      isSelectedKey: React.PropTypes.string.isRequired
	    }), React.PropTypes.shape({
	      keys: React.PropTypes.shape({
	        values: React.PropTypes.array.isRequired,
	        rowKey: React.PropTypes.string.isRequired
	      }).isRequired
	    })]),
	    rowGroupRenderer: React.PropTypes.func,
	    isScrolling: React.PropTypes.bool
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      rowRenderer: Row,
	      onRows: function onRows() {},
	      selectedRows: [],
	      rowScrollTimeout: 0
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      displayStart: this.props.displayStart,
	      displayEnd: this.props.displayEnd,
	      scrollingTimeout: null
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this._currentRowsLength = 0;
	    this._currentRowsRange = { start: 0, end: 0 };
	    this._scroll = { scrollTop: 0, scrollLeft: 0 };
	  },
	  componentDidMount: function componentDidMount() {
	    this.onRows();
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.displayStart !== this.state.displayStart || nextProps.displayEnd !== this.state.displayEnd) {
	      this.setState({
	        displayStart: nextProps.displayStart,
	        displayEnd: nextProps.displayEnd
	      });
	    }
	  },
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    var shouldUpdate = nextState.displayStart !== this.state.displayStart || nextState.displayEnd !== this.state.displayEnd || nextState.scrollingTimeout !== this.state.scrollingTimeout || nextProps.rowsCount !== this.props.rowsCount || nextProps.rowHeight !== this.props.rowHeight || nextProps.columns !== this.props.columns || nextProps.width !== this.props.width || nextProps.cellMetaData !== this.props.cellMetaData || this.props.colDisplayStart !== nextProps.colDisplayStart || this.props.colDisplayEnd !== nextProps.colDisplayEnd || this.props.colVisibleStart !== nextProps.colVisibleStart || this.props.colVisibleEnd !== nextProps.colVisibleEnd || !(0, _shallowEqual2['default'])(nextProps.style, this.props.style);
	    return shouldUpdate;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._currentRowsLength = 0;
	    this._currentRowsRange = { start: 0, end: 0 };
	    this._scroll = { scrollTop: 0, scrollLeft: 0 };
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    if (this._scroll.scrollTop !== 0 && this._scroll.scrollLeft !== 0) {
	      this.setScrollLeft(this._scroll.scrollLeft);
	    }
	    this.onRows();
	  },
	  onRows: function onRows() {
	    if (this._currentRowsRange !== { start: 0, end: 0 }) {
	      this.props.onRows(this._currentRowsRange);
	      this._currentRowsRange = { start: 0, end: 0 };
	    }
	  },
	  onScroll: function onScroll(e) {
	    if (ReactDOM.findDOMNode(this) !== e.target) {
	      return;
	    }
	    this.appendScrollShim();
	    var scrollLeft = e.target.scrollLeft;
	    var scrollTop = e.target.scrollTop;
	    var scroll = { scrollTop: scrollTop, scrollLeft: scrollLeft };
	    this._scroll = scroll;
	    this.props.onScroll(scroll);
	  },
	  getSubRows: function getSubRows(row) {
	    var subRowDetails = this.props.getSubRowDetails(row);
	    if (subRowDetails.expanded === true) {
	      return subRowDetails.children.map(function (r) {
	        return { row: r };
	      });
	    }
	  },
	  addSubRows: function addSubRows(rowsInput, row, i, displayEnd, treeDepth) {
	    var _this = this;

	    var subRowDetails = this.props.getSubRowDetails(row) || {};
	    var rows = rowsInput;
	    var increment = i;
	    if (increment < displayEnd) {
	      subRowDetails.treeDepth = treeDepth;
	      rows.push({ row: row, subRowDetails: subRowDetails });
	      increment++;
	    }
	    if (subRowDetails && subRowDetails.expanded) {
	      var subRows = this.getSubRows(row);
	      subRows.forEach(function (sr) {
	        var result = _this.addSubRows(rows, sr.row, increment, displayEnd, treeDepth + 1);
	        rows = result.rows;
	        increment = result.increment;
	      });
	    }
	    return { rows: rows, increment: increment };
	  },
	  getRows: function getRows(displayStart, displayEnd) {
	    this._currentRowsRange = { start: displayStart, end: displayEnd };
	    if (Array.isArray(this.props.rowGetter)) {
	      return this.props.rowGetter.slice(displayStart, displayEnd);
	    }
	    var rows = [];
	    var rowFetchIndex = displayStart;
	    var i = displayStart;
	    while (i < displayEnd) {
	      var row = this.props.rowGetter(rowFetchIndex);
	      if (this.props.getSubRowDetails) {
	        var treeDepth = 0;
	        var result = this.addSubRows(rows, row, i, displayEnd, treeDepth);
	        rows = result.rows;
	        i = result.increment;
	      } else {
	        rows.push({ row: row });
	        i++;
	      }
	      rowFetchIndex++;
	    }
	    return rows;
	  },
	  getScrollbarWidth: function getScrollbarWidth() {
	    var scrollbarWidth = 0;
	    // Get the scrollbar width
	    var canvas = ReactDOM.findDOMNode(this);
	    scrollbarWidth = canvas.offsetWidth - canvas.clientWidth;
	    return scrollbarWidth;
	  },
	  getScroll: function getScroll() {
	    var _ReactDOM$findDOMNode = ReactDOM.findDOMNode(this),
	        scrollTop = _ReactDOM$findDOMNode.scrollTop,
	        scrollLeft = _ReactDOM$findDOMNode.scrollLeft;

	    return { scrollTop: scrollTop, scrollLeft: scrollLeft };
	  },
	  isRowSelected: function isRowSelected(idx, row) {
	    var _this2 = this;

	    // Use selectedRows if set
	    if (this.props.selectedRows !== null) {
	      var selectedRows = this.props.selectedRows.filter(function (r) {
	        var rowKeyValue = row.get ? row.get(_this2.props.rowKey) : row[_this2.props.rowKey];
	        return r[_this2.props.rowKey] === rowKeyValue;
	      });
	      return selectedRows.length > 0 && selectedRows[0].isSelected;
	    }

	    // Else use new rowSelection props
	    if (this.props.rowSelection) {
	      var _props$rowSelection = this.props.rowSelection,
	          keys = _props$rowSelection.keys,
	          indexes = _props$rowSelection.indexes,
	          isSelectedKey = _props$rowSelection.isSelectedKey;

	      return RowUtils.isRowSelected(keys, indexes, isSelectedKey, row, idx);
	    }

	    return false;
	  },


	  _currentRowsLength: 0,
	  _currentRowsRange: { start: 0, end: 0 },
	  _scroll: { scrollTop: 0, scrollLeft: 0 },

	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    if (this._currentRowsLength !== 0) {
	      if (!this.refs) return;
	      for (var i = 0, len = this._currentRowsLength; i < len; i++) {
	        if (this.refs[i]) {
	          var row = this.getRowByRef(i);
	          if (row && row.setScrollLeft) {
	            row.setScrollLeft(scrollLeft);
	          }
	        }
	      }
	    }
	  },
	  getRowByRef: function getRowByRef(i) {
	    // check if wrapped with React DND drop target
	    var wrappedRow = this.refs[i].getDecoratedComponentInstance ? this.refs[i].getDecoratedComponentInstance(i) : null;
	    if (wrappedRow) {
	      return wrappedRow.refs.row;
	    }
	    return this.refs[i];
	  },
	  renderRow: function renderRow(props) {
	    var row = props.row;
	    if (row.__metaData && row.__metaData.isGroup) {
	      return React.createElement(_RowGroup2['default'], _extends({
	        key: props.key,
	        name: row.name
	      }, row.__metaData, {
	        row: props.row,
	        idx: props.idx,
	        height: props.height,
	        cellMetaData: this.props.cellMetaData,
	        renderer: this.props.rowGroupRenderer
	      }));
	    }
	    var RowsRenderer = this.props.rowRenderer;
	    if (typeof RowsRenderer === 'function') {
	      return React.createElement(RowsRenderer, props);
	    }

	    if (React.isValidElement(this.props.rowRenderer)) {
	      return React.cloneElement(this.props.rowRenderer, props);
	    }
	  },
	  renderPlaceholder: function renderPlaceholder(key, height) {
	    // just renders empty cells
	    // if we wanted to show gridlines, we'd need classes and position as with renderScrollingPlaceholder
	    return React.createElement(
	      'div',
	      { key: key, style: { height: height } },
	      this.props.columns.map(function (column, idx) {
	        return React.createElement('div', { style: { width: column.width }, key: idx });
	      })
	    );
	  },
	  render: function render() {
	    var _this3 = this;

	    var _state = this.state,
	        displayStart = _state.displayStart,
	        displayEnd = _state.displayEnd;
	    var _props = this.props,
	        rowHeight = _props.rowHeight,
	        rowsCount = _props.rowsCount;


	    var rows = this.getRows(displayStart, displayEnd).map(function (r, idx) {
	      return _this3.renderRow({
	        key: 'row-' + (displayStart + idx),
	        ref: idx,
	        idx: displayStart + idx,
	        visibleStart: _this3.props.visibleStart,
	        visibleEnd: _this3.props.visibleEnd,
	        row: r.row,
	        height: rowHeight,
	        onMouseOver: _this3.onMouseOver,
	        columns: _this3.props.columns,
	        isSelected: _this3.isRowSelected(displayStart + idx, r.row, displayStart, displayEnd),
	        expandedRows: _this3.props.expandedRows,
	        cellMetaData: _this3.props.cellMetaData,
	        subRowDetails: r.subRowDetails,
	        colVisibleStart: _this3.props.colVisibleStart,
	        colVisibleEnd: _this3.props.colVisibleEnd,
	        colDisplayStart: _this3.props.colDisplayStart,
	        colDisplayEnd: _this3.props.colDisplayEnd,
	        isScrolling: _this3.props.isScrolling
	      });
	    });

	    this._currentRowsLength = rows.length;

	    if (displayStart > 0) {
	      rows.unshift(this.renderPlaceholder('top', displayStart * rowHeight));
	    }

	    if (rowsCount - displayEnd > 0) {
	      rows.push(this.renderPlaceholder('bottom', (rowsCount - displayEnd) * rowHeight));
	    }

	    var style = {
	      position: 'absolute',
	      top: 0,
	      left: 0,
	      overflowX: 'auto',
	      overflowY: 'scroll',
	      width: this.props.totalWidth,
	      height: this.props.height
	    };

	    return React.createElement(
	      'div',
	      {
	        style: style,
	        onScroll: this.onScroll,
	        className: joinClasses('react-grid-Canvas', this.props.className, { opaque: this.props.cellMetaData.selected && this.props.cellMetaData.selected.active }) },
	      React.createElement(_RowsContainer2['default'], {
	        width: this.props.width,
	        rows: rows,
	        contextMenu: this.props.contextMenu,
	        rowIdx: this.props.cellMetaData.selected.rowIdx,
	        idx: this.props.cellMetaData.selected.idx })
	    );
	  }
	});

	module.exports = Canvas;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isValidElement = __webpack_require__(2).isValidElement;

	module.exports = function sameColumn(a, b) {
	  var k = void 0;

	  for (k in a) {
	    if (a.hasOwnProperty(k)) {
	      if (typeof a[k] === 'function' && typeof b[k] === 'function' || isValidElement(a[k]) && isValidElement(b[k])) {
	        continue;
	      }
	      if (!b.hasOwnProperty(k) || a[k] !== b[k]) {
	        return false;
	      }
	    }
	  }

	  for (k in b) {
	    if (b.hasOwnProperty(k) && !a.hasOwnProperty(k)) {
	      return false;
	    }
	  }

	  return true;
	};

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ColumnMetrics = __webpack_require__(43);
	var DOMMetrics = __webpack_require__(27);
	Object.assign = __webpack_require__(86);
	var PropTypes = __webpack_require__(2).PropTypes;
	var ColumnUtils = __webpack_require__(11);

	var Column = function Column() {
	  _classCallCheck(this, Column);
	};

	module.exports = {
	  mixins: [DOMMetrics.MetricsMixin],

	  propTypes: {
	    columns: PropTypes.arrayOf(Column),
	    minColumnWidth: PropTypes.number,
	    columnEquality: PropTypes.func,
	    onColumnResize: PropTypes.func
	  },

	  DOMMetrics: {
	    gridWidth: function gridWidth() {
	      return _reactDom2['default'].findDOMNode(this).parentElement.offsetWidth;
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      minColumnWidth: 80,
	      columnEquality: ColumnMetrics.sameColumn
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    this._mounted = true;
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.columns) {
	      if (!ColumnMetrics.sameColumns(this.props.columns, nextProps.columns, this.props.columnEquality) || nextProps.minWidth !== this.props.minWidth) {
	        var columnMetrics = this.createColumnMetrics(nextProps);
	        this.setState({ columnMetrics: columnMetrics });
	      }
	    }
	  },
	  getTotalWidth: function getTotalWidth() {
	    var totalWidth = 0;
	    if (this._mounted) {
	      totalWidth = this.DOMMetrics.gridWidth();
	    } else {
	      totalWidth = ColumnUtils.getSize(this.props.columns) * this.props.minColumnWidth;
	    }
	    return totalWidth;
	  },
	  getColumnMetricsType: function getColumnMetricsType(metrics) {
	    var totalWidth = metrics.totalWidth || this.getTotalWidth();
	    var currentMetrics = {
	      columns: metrics.columns,
	      totalWidth: totalWidth,
	      minColumnWidth: metrics.minColumnWidth
	    };
	    var updatedMetrics = ColumnMetrics.recalculate(currentMetrics);
	    return updatedMetrics;
	  },
	  getColumn: function getColumn(idx) {
	    var columns = this.state.columnMetrics.columns;
	    if (Array.isArray(columns)) {
	      return columns[idx];
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.get(idx);
	    }
	  },
	  getSize: function getSize() {
	    var columns = this.state.columnMetrics.columns;
	    if (Array.isArray(columns)) {
	      return columns.length;
	    } else if (typeof Immutable !== 'undefined') {
	      return columns.size;
	    }
	  },
	  metricsUpdated: function metricsUpdated() {
	    var columnMetrics = this.createColumnMetrics();
	    this.setState({ columnMetrics: columnMetrics });
	  },
	  createColumnMetrics: function createColumnMetrics() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

	    var gridColumns = this.setupGridColumns(props);
	    return this.getColumnMetricsType({
	      columns: gridColumns,
	      minColumnWidth: this.props.minColumnWidth,
	      totalWidth: props.minWidth
	    });
	  },
	  onColumnResize: function onColumnResize(index, width) {
	    var columnMetrics = ColumnMetrics.resizeColumn(this.state.columnMetrics, index, width);
	    this.setState({ columnMetrics: columnMetrics });
	    if (this.props.onColumnResize) {
	      this.props.onColumnResize(index, width);
	    }
	  }
	};

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var PropTypes = React.PropTypes;
	var createObjectWithProperties = __webpack_require__(20);
	__webpack_require__(21);

	// The list of the propTypes that we want to include in the Draggable div
	var knownDivPropertyKeys = ['onDragStart', 'onDragEnd', 'onDrag', 'style'];

	var Draggable = React.createClass({
	  displayName: 'Draggable',

	  propTypes: {
	    onDragStart: PropTypes.func,
	    onDragEnd: PropTypes.func,
	    onDrag: PropTypes.func,
	    component: PropTypes.oneOfType([PropTypes.func, PropTypes.constructor]),
	    style: PropTypes.object
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      onDragStart: function onDragStart() {
	        return true;
	      },
	      onDragEnd: function onDragEnd() {},
	      onDrag: function onDrag() {}
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      drag: null
	    };
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this.cleanUp();
	  },
	  onMouseDown: function onMouseDown(e) {
	    var drag = this.props.onDragStart(e);

	    if (drag === null && e.button !== 0) {
	      return;
	    }

	    window.addEventListener('mouseup', this.onMouseUp);
	    window.addEventListener('mousemove', this.onMouseMove);
	    window.addEventListener('touchend', this.onMouseUp);
	    window.addEventListener('touchmove', this.onMouseMove);

	    this.setState({ drag: drag });
	  },
	  onMouseMove: function onMouseMove(e) {
	    if (this.state.drag === null) {
	      return;
	    }

	    if (e.preventDefault) {
	      e.preventDefault();
	    }

	    this.props.onDrag(e);
	  },
	  onMouseUp: function onMouseUp(e) {
	    this.cleanUp();
	    this.props.onDragEnd(e, this.state.drag);
	    this.setState({ drag: null });
	  },
	  cleanUp: function cleanUp() {
	    window.removeEventListener('mouseup', this.onMouseUp);
	    window.removeEventListener('mousemove', this.onMouseMove);
	    window.removeEventListener('touchend', this.onMouseUp);
	    window.removeEventListener('touchmove', this.onMouseMove);
	  },
	  getKnownDivProps: function getKnownDivProps() {
	    return createObjectWithProperties(this.props, knownDivPropertyKeys);
	  },
	  render: function render() {
	    return React.createElement('div', _extends({}, this.getKnownDivProps(), {
	      onMouseDown: this.onMouseDown,
	      onTouchStart: this.onMouseDown,
	      className: 'react-grid-HeaderCell__draggable' }));
	  }
	});

	module.exports = Draggable;

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var PropTypes = React.PropTypes;
	var Header = __webpack_require__(176);
	var Viewport = __webpack_require__(186);
	var GridScrollMixin = __webpack_require__(175);
	var DOMMetrics = __webpack_require__(27);
	var cellMetaDataShape = __webpack_require__(17);
	__webpack_require__(34);

	var Grid = React.createClass({
	  displayName: 'Grid',

	  propTypes: {
	    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	    columnMetrics: PropTypes.object,
	    minHeight: PropTypes.number,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    headerRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    rowHeight: PropTypes.number,
	    rowRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	    emptyRowsView: PropTypes.func,
	    expandedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    selectedRows: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
	    rowSelection: React.PropTypes.oneOfType([React.PropTypes.shape({
	      indexes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
	    }), React.PropTypes.shape({
	      isSelectedKey: React.PropTypes.string.isRequired
	    }), React.PropTypes.shape({
	      keys: React.PropTypes.shape({
	        values: React.PropTypes.array.isRequired,
	        rowKey: React.PropTypes.string.isRequired
	      }).isRequired
	    })]),
	    rowsCount: PropTypes.number,
	    onRows: PropTypes.func,
	    sortColumn: React.PropTypes.string,
	    sortDirection: React.PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
	    rowOffsetHeight: PropTypes.number.isRequired,
	    onViewportKeydown: PropTypes.func.isRequired,
	    onViewportKeyup: PropTypes.func,
	    onViewportDragStart: PropTypes.func.isRequired,
	    onViewportDragEnd: PropTypes.func.isRequired,
	    onViewportDoubleClick: PropTypes.func.isRequired,
	    onColumnResize: PropTypes.func,
	    onSort: PropTypes.func,
	    cellMetaData: PropTypes.shape(cellMetaDataShape),
	    rowKey: PropTypes.string.isRequired,
	    rowScrollTimeout: PropTypes.number,
	    contextMenu: PropTypes.element,
	    getSubRowDetails: PropTypes.func,
	    draggableHeaderCell: PropTypes.func,
	    getValidFilterValues: PropTypes.func,
	    rowGroupRenderer: PropTypes.func,
	    overScan: PropTypes.object
	  },

	  mixins: [GridScrollMixin, DOMMetrics.MetricsComputatorMixin],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      rowHeight: 35,
	      minHeight: 350
	    };
	  },


	  getStyle: function getStyle() {
	    return {
	      overflow: 'hidden',
	      outline: 0,
	      position: 'relative',
	      minHeight: this.props.minHeight
	    };
	  },

	  render: function render() {
	    var headerRows = this.props.headerRows || [{ ref: 'row' }];
	    var EmptyRowsView = this.props.emptyRowsView;

	    return React.createElement(
	      'div',
	      { style: this.getStyle(), className: 'react-grid-Grid' },
	      React.createElement(Header, {
	        ref: 'header',
	        columnMetrics: this.props.columnMetrics,
	        onColumnResize: this.props.onColumnResize,
	        height: this.props.rowHeight,
	        totalWidth: this.props.totalWidth,
	        headerRows: headerRows,
	        sortColumn: this.props.sortColumn,
	        sortDirection: this.props.sortDirection,
	        draggableHeaderCell: this.props.draggableHeaderCell,
	        onSort: this.props.onSort,
	        onScroll: this.onHeaderScroll,
	        getValidFilterValues: this.props.getValidFilterValues,
	        cellMetaData: this.props.cellMetaData
	      }),
	      this.props.rowsCount >= 1 || this.props.rowsCount === 0 && !this.props.emptyRowsView ? React.createElement(
	        'div',
	        { ref: 'viewPortContainer', tabIndex: '0', onKeyDown: this.props.onViewportKeydown, onKeyUp: this.props.onViewportKeyup, onDoubleClick: this.props.onViewportDoubleClick, onDragStart: this.props.onViewportDragStart, onDragEnd: this.props.onViewportDragEnd },
	        React.createElement(Viewport, {
	          ref: 'viewport',
	          rowKey: this.props.rowKey,
	          width: this.props.columnMetrics.width,
	          rowHeight: this.props.rowHeight,
	          rowRenderer: this.props.rowRenderer,
	          rowGetter: this.props.rowGetter,
	          rowsCount: this.props.rowsCount,
	          selectedRows: this.props.selectedRows,
	          expandedRows: this.props.expandedRows,
	          columnMetrics: this.props.columnMetrics,
	          totalWidth: this.props.totalWidth,
	          onScroll: this.onScroll,
	          onRows: this.props.onRows,
	          cellMetaData: this.props.cellMetaData,
	          rowOffsetHeight: this.props.rowOffsetHeight || this.props.rowHeight * headerRows.length,
	          minHeight: this.props.minHeight,
	          rowScrollTimeout: this.props.rowScrollTimeout,
	          contextMenu: this.props.contextMenu,
	          rowSelection: this.props.rowSelection,
	          getSubRowDetails: this.props.getSubRowDetails,
	          rowGroupRenderer: this.props.rowGroupRenderer,
	          overScan: this.props.overScan
	        })
	      ) : React.createElement(
	        'div',
	        { ref: 'emptyView', className: 'react-grid-Empty' },
	        React.createElement(EmptyRowsView, null)
	      )
	    );
	  }
	});

	module.exports = Grid;

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ReactDOM = __webpack_require__(4);

	module.exports = {
	  componentDidMount: function componentDidMount() {
	    this._scrollLeft = this.refs.viewport ? this.refs.viewport.getScroll().scrollLeft : 0;
	    this._onScroll();
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this._onScroll();
	  },
	  componentWillMount: function componentWillMount() {
	    this._scrollLeft = undefined;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._scrollLeft = undefined;
	  },
	  onScroll: function onScroll(props) {
	    if (this._scrollLeft !== props.scrollLeft) {
	      this._scrollLeft = props.scrollLeft;
	      this._onScroll();
	    }
	  },
	  onHeaderScroll: function onHeaderScroll(e) {
	    var scrollLeft = e.target.scrollLeft;
	    if (this._scrollLeft !== scrollLeft) {
	      this._scrollLeft = scrollLeft;
	      this.refs.header.setScrollLeft(scrollLeft);
	      var canvas = ReactDOM.findDOMNode(this.refs.viewport.refs.canvas);
	      canvas.scrollLeft = scrollLeft;
	      this.refs.viewport.refs.canvas.setScrollLeft(scrollLeft);
	    }
	  },
	  _onScroll: function _onScroll() {
	    if (this._scrollLeft !== undefined) {
	      this.refs.header.setScrollLeft(this._scrollLeft);
	      if (this.refs.viewport) {
	        this.refs.viewport.setScrollLeft(this._scrollLeft);
	      }
	    }
	  }
	};

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(4);
	var joinClasses = __webpack_require__(10);
	var shallowCloneObject = __webpack_require__(46);
	var ColumnMetrics = __webpack_require__(43);
	var ColumnUtils = __webpack_require__(11);
	var HeaderRow = __webpack_require__(178);
	var getScrollbarSize = __webpack_require__(45);
	var PropTypes = React.PropTypes;
	var createObjectWithProperties = __webpack_require__(20);
	var cellMetaDataShape = __webpack_require__(17);
	__webpack_require__(21);

	// The list of the propTypes that we want to include in the Header div
	var knownDivPropertyKeys = ['height', 'onScroll'];

	var Header = React.createClass({
	  displayName: 'Header',

	  propTypes: {
	    columnMetrics: PropTypes.shape({ width: PropTypes.number.isRequired, columns: PropTypes.any }).isRequired,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    height: PropTypes.number.isRequired,
	    headerRows: PropTypes.array.isRequired,
	    sortColumn: PropTypes.string,
	    sortDirection: PropTypes.oneOf(['ASC', 'DESC', 'NONE']),
	    onSort: PropTypes.func,
	    onColumnResize: PropTypes.func,
	    onScroll: PropTypes.func,
	    draggableHeaderCell: PropTypes.func,
	    getValidFilterValues: PropTypes.func,
	    cellMetaData: PropTypes.shape(cellMetaDataShape)
	  },

	  getInitialState: function getInitialState() {
	    return { resizing: null };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps() {
	    this.setState({ resizing: null });
	  },


	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    var update = !ColumnMetrics.sameColumns(this.props.columnMetrics.columns, nextProps.columnMetrics.columns, ColumnMetrics.sameColumn) || this.props.totalWidth !== nextProps.totalWidth || this.props.headerRows.length !== nextProps.headerRows.length || this.state.resizing !== nextState.resizing || this.props.sortColumn !== nextProps.sortColumn || this.props.sortDirection !== nextProps.sortDirection;
	    return update;
	  },

	  onColumnResize: function onColumnResize(column, width) {
	    var state = this.state.resizing || this.props;

	    var pos = this.getColumnPosition(column);

	    if (pos != null) {
	      var _resizing = {
	        columnMetrics: shallowCloneObject(state.columnMetrics)
	      };
	      _resizing.columnMetrics = ColumnMetrics.resizeColumn(_resizing.columnMetrics, pos, width);

	      // we don't want to influence scrollLeft while resizing
	      if (_resizing.columnMetrics.totalWidth < state.columnMetrics.totalWidth) {
	        _resizing.columnMetrics.totalWidth = state.columnMetrics.totalWidth;
	      }

	      _resizing.column = ColumnUtils.getColumn(_resizing.columnMetrics.columns, pos);
	      this.setState({ resizing: _resizing });
	    }
	  },
	  onColumnResizeEnd: function onColumnResizeEnd(column, width) {
	    var pos = this.getColumnPosition(column);
	    if (pos !== null && this.props.onColumnResize) {
	      this.props.onColumnResize(pos, width || column.width);
	    }
	  },
	  getHeaderRows: function getHeaderRows() {
	    var _this = this;

	    var columnMetrics = this.getColumnMetrics();
	    var resizeColumn = void 0;
	    if (this.state.resizing) {
	      resizeColumn = this.state.resizing.column;
	    }
	    var headerRows = [];
	    this.props.headerRows.forEach(function (row, index) {
	      // To allow header filters to be visible
	      var rowHeight = 'auto';
	      if (row.rowType === 'filter') {
	        rowHeight = '500px';
	      }
	      var scrollbarSize = getScrollbarSize() > 0 ? getScrollbarSize() : 0;
	      var updatedWidth = isNaN(_this.props.totalWidth - scrollbarSize) ? _this.props.totalWidth : _this.props.totalWidth - scrollbarSize;
	      var headerRowStyle = {
	        position: 'absolute',
	        top: _this.getCombinedHeaderHeights(index),
	        left: 0,
	        width: updatedWidth,
	        overflowX: 'hidden',
	        minHeight: rowHeight
	      };

	      headerRows.push(React.createElement(HeaderRow, {
	        key: row.ref,
	        ref: row.ref,
	        rowType: row.rowType,
	        style: headerRowStyle,
	        onColumnResize: _this.onColumnResize,
	        onColumnResizeEnd: _this.onColumnResizeEnd,
	        width: columnMetrics.width,
	        height: row.height || _this.props.height,
	        columns: columnMetrics.columns,
	        resizing: resizeColumn,
	        draggableHeaderCell: _this.props.draggableHeaderCell,
	        filterable: row.filterable,
	        onFilterChange: row.onFilterChange,
	        sortColumn: _this.props.sortColumn,
	        sortDirection: _this.props.sortDirection,
	        onSort: _this.props.onSort,
	        onScroll: _this.props.onScroll,
	        getValidFilterValues: _this.props.getValidFilterValues
	      }));
	    });
	    return headerRows;
	  },
	  getColumnMetrics: function getColumnMetrics() {
	    var columnMetrics = void 0;
	    if (this.state.resizing) {
	      columnMetrics = this.state.resizing.columnMetrics;
	    } else {
	      columnMetrics = this.props.columnMetrics;
	    }
	    return columnMetrics;
	  },
	  getColumnPosition: function getColumnPosition(column) {
	    var columnMetrics = this.getColumnMetrics();
	    var pos = -1;
	    columnMetrics.columns.forEach(function (c, idx) {
	      if (c.key === column.key) {
	        pos = idx;
	      }
	    });
	    return pos === -1 ? null : pos;
	  },
	  getCombinedHeaderHeights: function getCombinedHeaderHeights(until) {
	    var stopAt = this.props.headerRows.length;
	    if (typeof until !== 'undefined') {
	      stopAt = until;
	    }

	    var height = 0;
	    for (var index = 0; index < stopAt; index++) {
	      height += this.props.headerRows[index].height || this.props.height;
	    }
	    return height;
	  },
	  getStyle: function getStyle() {
	    return {
	      position: 'relative',
	      height: this.getCombinedHeaderHeights()
	    };
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var node = ReactDOM.findDOMNode(this.refs.row);
	    node.scrollLeft = scrollLeft;
	    this.refs.row.setScrollLeft(scrollLeft);
	    if (this.refs.filterRow) {
	      var nodeFilters = ReactDOM.findDOMNode(this.refs.filterRow);
	      nodeFilters.scrollLeft = scrollLeft;
	      this.refs.filterRow.setScrollLeft(scrollLeft);
	    }
	  },
	  getKnownDivProps: function getKnownDivProps() {
	    return createObjectWithProperties(this.props, knownDivPropertyKeys);
	  },


	  // Set the cell selection to -1 x -1 when clicking on the header
	  onHeaderClick: function onHeaderClick() {
	    this.props.cellMetaData.onCellClick({ rowIdx: -1, idx: -1 });
	  },
	  render: function render() {
	    var className = joinClasses({
	      'react-grid-Header': true,
	      'react-grid-Header--resizing': !!this.state.resizing
	    });
	    var headerRows = this.getHeaderRows();

	    return React.createElement(
	      'div',
	      _extends({}, this.getKnownDivProps(), { style: this.getStyle(), className: className, onClick: this.onHeaderClick }),
	      headerRows
	    );
	  }
	});

	module.exports = Header;

/***/ },
/* 177 */
/***/ function(module, exports) {

	"use strict";

	var HeaderCellType = {
	  SORTABLE: 0,
	  FILTERABLE: 1,
	  NONE: 2,
	  CHECKBOX: 3
	};

	module.exports = HeaderCellType;

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var shallowEqual = __webpack_require__(78);
	var BaseHeaderCell = __webpack_require__(69);
	var getScrollbarSize = __webpack_require__(45);
	var ExcelColumn = __webpack_require__(13);
	var ColumnUtilsMixin = __webpack_require__(11);
	var SortableHeaderCell = __webpack_require__(189);
	var FilterableHeaderCell = __webpack_require__(188);
	var HeaderCellType = __webpack_require__(177);
	var createObjectWithProperties = __webpack_require__(20);
	__webpack_require__(21);

	var PropTypes = React.PropTypes;

	var HeaderRowStyle = {
	  overflow: React.PropTypes.string,
	  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	  height: React.PropTypes.number,
	  position: React.PropTypes.string
	};

	// The list of the propTypes that we want to include in the HeaderRow div
	var knownDivPropertyKeys = ['width', 'height', 'style', 'onScroll'];

	var HeaderRow = React.createClass({
	  displayName: 'HeaderRow',

	  propTypes: {
	    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	    height: PropTypes.number.isRequired,
	    columns: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
	    onColumnResize: PropTypes.func,
	    onSort: PropTypes.func.isRequired,
	    onColumnResizeEnd: PropTypes.func,
	    style: PropTypes.shape(HeaderRowStyle),
	    sortColumn: PropTypes.string,
	    sortDirection: React.PropTypes.oneOf(Object.keys(SortableHeaderCell.DEFINE_SORT)),
	    cellRenderer: PropTypes.func,
	    headerCellRenderer: PropTypes.func,
	    filterable: PropTypes.bool,
	    onFilterChange: PropTypes.func,
	    resizing: PropTypes.object,
	    onScroll: PropTypes.func,
	    rowType: PropTypes.string,
	    draggableHeaderCell: PropTypes.func
	  },

	  mixins: [ColumnUtilsMixin],

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return nextProps.width !== this.props.width || nextProps.height !== this.props.height || nextProps.columns !== this.props.columns || !shallowEqual(nextProps.style, this.props.style) || this.props.sortColumn !== nextProps.sortColumn || this.props.sortDirection !== nextProps.sortDirection;
	  },
	  getHeaderCellType: function getHeaderCellType(column) {
	    if (column.filterable) {
	      if (this.props.filterable) return HeaderCellType.FILTERABLE;
	    }

	    if (column.sortable) return HeaderCellType.SORTABLE;

	    return HeaderCellType.NONE;
	  },
	  getFilterableHeaderCell: function getFilterableHeaderCell(column) {
	    var FilterRenderer = FilterableHeaderCell;
	    if (column.filterRenderer !== undefined) {
	      FilterRenderer = column.filterRenderer;
	    }
	    return React.createElement(FilterRenderer, _extends({}, this.props, { onChange: this.props.onFilterChange }));
	  },
	  getSortableHeaderCell: function getSortableHeaderCell(column) {
	    var sortDirection = this.props.sortColumn === column.key ? this.props.sortDirection : SortableHeaderCell.DEFINE_SORT.NONE;
	    return React.createElement(SortableHeaderCell, { columnKey: column.key, onSort: this.props.onSort, sortDirection: sortDirection });
	  },
	  getHeaderRenderer: function getHeaderRenderer(column) {
	    var renderer = void 0;
	    if (column.headerRenderer && !this.props.filterable) {
	      renderer = column.headerRenderer;
	    } else {
	      var headerCellType = this.getHeaderCellType(column);
	      switch (headerCellType) {
	        case HeaderCellType.SORTABLE:
	          renderer = this.getSortableHeaderCell(column);
	          break;
	        case HeaderCellType.FILTERABLE:
	          renderer = this.getFilterableHeaderCell(column);
	          break;
	        default:
	          break;
	      }
	    }
	    return renderer;
	  },
	  getStyle: function getStyle() {
	    return {
	      overflow: 'hidden',
	      width: '100%',
	      height: this.props.height,
	      position: 'absolute'
	    };
	  },
	  getCells: function getCells() {
	    var cells = [];
	    var lockedCells = [];
	    for (var i = 0, len = this.getSize(this.props.columns); i < len; i++) {
	      var column = this.getColumn(this.props.columns, i);
	      var _renderer = this.getHeaderRenderer(column);
	      if (column.key === 'select-row' && this.props.rowType === 'filter') {
	        _renderer = React.createElement('div', null);
	      }
	      var _HeaderCell = column.draggable ? this.props.draggableHeaderCell : BaseHeaderCell;
	      var cell = React.createElement(_HeaderCell, {
	        ref: i,
	        key: i,
	        height: this.props.height,
	        column: column,
	        renderer: _renderer,
	        resizing: this.props.resizing === column,
	        onResize: this.props.onColumnResize,
	        onResizeEnd: this.props.onColumnResizeEnd
	      });
	      if (column.locked) {
	        lockedCells.push(cell);
	      } else {
	        cells.push(cell);
	      }
	    }

	    return cells.concat(lockedCells);
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    var _this = this;

	    this.props.columns.forEach(function (column, i) {
	      if (column.locked) {
	        _this.refs[i].setScrollLeft(scrollLeft);
	      }
	    });
	  },
	  getKnownDivProps: function getKnownDivProps() {
	    return createObjectWithProperties(this.props, knownDivPropertyKeys);
	  },
	  render: function render() {
	    var cellsStyle = {
	      width: this.props.width ? this.props.width + getScrollbarSize() : '100%',
	      height: this.props.height,
	      whiteSpace: 'nowrap',
	      overflowX: 'hidden',
	      overflowY: 'hidden'
	    };

	    var cells = this.getCells();
	    return React.createElement(
	      'div',
	      _extends({}, this.getKnownDivProps(), { className: 'react-grid-HeaderRow' }),
	      React.createElement(
	        'div',
	        { style: cellsStyle },
	        cells
	      )
	    );
	  }
	});

	module.exports = HeaderRow;

/***/ },
/* 179 */
/***/ function(module, exports) {

	"use strict";

	module.exports = {
	  Backspace: 8,
	  Tab: 9,
	  Enter: 13,
	  Shift: 16,
	  Ctrl: 17,
	  Alt: 18,
	  PauseBreak: 19,
	  CapsLock: 20,
	  Escape: 27,
	  PageUp: 33,
	  PageDown: 34,
	  End: 35,
	  Home: 36,
	  LeftArrow: 37,
	  UpArrow: 38,
	  RightArrow: 39,
	  DownArrow: 40,
	  Insert: 45,
	  Delete: 46,
	  0: 48,
	  1: 49,
	  2: 50,
	  3: 51,
	  4: 52,
	  5: 53,
	  6: 54,
	  7: 55,
	  8: 56,
	  9: 57,
	  a: 65,
	  b: 66,
	  c: 67,
	  d: 68,
	  e: 69,
	  f: 70,
	  g: 71,
	  h: 72,
	  i: 73,
	  j: 74,
	  k: 75,
	  l: 76,
	  m: 77,
	  n: 78,
	  o: 79,
	  p: 80,
	  q: 81,
	  r: 82,
	  s: 83,
	  t: 84,
	  u: 85,
	  v: 86,
	  w: 87,
	  x: 88,
	  y: 89,
	  z: 90,
	  LeftWindowKey: 91,
	  RightWindowKey: 92,
	  SelectKey: 93,
	  NumPad0: 96,
	  NumPad1: 97,
	  NumPad2: 98,
	  NumPad3: 99,
	  NumPad4: 100,
	  NumPad5: 101,
	  NumPad6: 102,
	  NumPad7: 103,
	  NumPad8: 104,
	  NumPad9: 105,
	  Multiply: 106,
	  Add: 107,
	  Subtract: 109,
	  DecimalPoint: 110,
	  Divide: 111,
	  F1: 112,
	  F2: 113,
	  F3: 114,
	  F4: 115,
	  F5: 116,
	  F6: 117,
	  F7: 118,
	  F8: 119,
	  F9: 120,
	  F10: 121,
	  F12: 123,
	  NumLock: 144,
	  ScrollLock: 145,
	  SemiColon: 186,
	  EqualSign: 187,
	  Comma: 188,
	  Dash: 189,
	  Period: 190,
	  ForwardSlash: 191,
	  GraveAccent: 192,
	  OpenBracket: 219,
	  BackSlash: 220,
	  CloseBracket: 221,
	  SingleQuote: 222
	};

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.OverflowCellComponent = undefined;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _focusableComponentWrapper = __webpack_require__(192);

	var _focusableComponentWrapper2 = _interopRequireDefault(_focusableComponentWrapper);

	__webpack_require__(51);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OverflowCell = function (_React$Component) {
	  _inherits(OverflowCell, _React$Component);

	  function OverflowCell() {
	    _classCallCheck(this, OverflowCell);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  OverflowCell.prototype.getStyle = function getStyle() {
	    var style = {
	      position: 'absolute',
	      width: this.props.column.width,
	      height: this.props.height,
	      left: this.props.column.left,
	      border: '1px solid #eee'
	    };
	    return style;
	  };

	  OverflowCell.prototype.render = function render() {
	    return _react2['default'].createElement('div', { tabIndex: '-1', style: this.getStyle(), width: '100%', className: 'react-grid-Cell' });
	  };

	  return OverflowCell;
	}(_react2['default'].Component);

	OverflowCell.isSelected = function (props) {
	  var cellMetaData = props.cellMetaData,
	      rowIdx = props.rowIdx,
	      idx = props.idx;

	  if (cellMetaData == null) {
	    return false;
	  }

	  var selected = cellMetaData.selected;


	  return selected && selected.rowIdx === rowIdx && selected.idx === idx;
	};

	OverflowCell.isScrolling = function (props) {
	  return props.cellMetaData.isScrollingHorizontallyWithKeyboard;
	};

	OverflowCell.propTypes = {
	  rowIdx: _react2['default'].PropTypes.number,
	  idx: _react2['default'].PropTypes.number,
	  height: _react2['default'].PropTypes.number,
	  column: _react2['default'].PropTypes.object,
	  cellMetaData: _react2['default'].PropTypes.object
	};

	OverflowCell.displayName = 'Cell';

	var OverflowCellComponent = OverflowCell;
	exports['default'] = (0, _focusableComponentWrapper2['default'])(OverflowCell);
	exports.OverflowCellComponent = OverflowCellComponent;

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _ExcelColumn = __webpack_require__(13);

	var _ExcelColumn2 = _interopRequireDefault(_ExcelColumn);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	exports['default'] = { ExcelColumn: _ExcelColumn2['default'] };

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _AppConstants = __webpack_require__(67);

	var _AppConstants2 = _interopRequireDefault(_AppConstants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(4);
	var BaseGrid = __webpack_require__(174);
	var Row = __webpack_require__(44);
	var ExcelColumn = __webpack_require__(13);
	var KeyboardHandlerMixin = __webpack_require__(70);
	var CheckboxEditor = __webpack_require__(74);
	var DOMMetrics = __webpack_require__(27);
	var ColumnMetricsMixin = __webpack_require__(172);
	var RowUtils = __webpack_require__(72);
	var ColumnUtils = __webpack_require__(11);
	var KeyCodes = __webpack_require__(179);

	__webpack_require__(34);
	__webpack_require__(87);

	if (!Object.assign) {
	  Object.assign = __webpack_require__(86);
	}

	var ReactDataGrid = React.createClass({
	  displayName: 'ReactDataGrid',


	  mixins: [ColumnMetricsMixin, DOMMetrics.MetricsComputatorMixin, KeyboardHandlerMixin],

	  propTypes: {
	    rowHeight: React.PropTypes.number.isRequired,
	    headerRowHeight: React.PropTypes.number,
	    minHeight: React.PropTypes.number.isRequired,
	    minWidth: React.PropTypes.number,
	    enableRowSelect: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.string]),
	    onRowUpdated: React.PropTypes.func,
	    rowGetter: React.PropTypes.func.isRequired,
	    rowsCount: React.PropTypes.number.isRequired,
	    toolbar: React.PropTypes.element,
	    enableCellSelect: React.PropTypes.bool,
	    columns: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.array]).isRequired,
	    onFilter: React.PropTypes.func,
	    onCellCopyPaste: React.PropTypes.func,
	    onCellsDragged: React.PropTypes.func,
	    onAddFilter: React.PropTypes.func,
	    onGridSort: React.PropTypes.func,
	    onDragHandleDoubleClick: React.PropTypes.func,
	    onGridRowsUpdated: React.PropTypes.func,
	    onRowSelect: React.PropTypes.func,
	    rowKey: React.PropTypes.string,
	    rowScrollTimeout: React.PropTypes.number,
	    onClearFilters: React.PropTypes.func,
	    contextMenu: React.PropTypes.element,
	    cellNavigationMode: React.PropTypes.oneOf(['none', 'loopOverRow', 'changeRow']),
	    onCellSelected: React.PropTypes.func,
	    onCellDeSelected: React.PropTypes.func,
	    onCellExpand: React.PropTypes.func,
	    enableDragAndDrop: React.PropTypes.bool,
	    onRowExpandToggle: React.PropTypes.func,
	    draggableHeaderCell: React.PropTypes.func,
	    getValidFilterValues: React.PropTypes.func,
	    rowSelection: React.PropTypes.shape({
	      enableShiftSelect: React.PropTypes.bool,
	      onRowsSelected: React.PropTypes.func,
	      onRowsDeselected: React.PropTypes.func,
	      showCheckbox: React.PropTypes.bool,
	      selectBy: React.PropTypes.oneOfType([React.PropTypes.shape({
	        indexes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
	      }), React.PropTypes.shape({
	        isSelectedKey: React.PropTypes.string.isRequired
	      }), React.PropTypes.shape({
	        keys: React.PropTypes.shape({
	          values: React.PropTypes.array.isRequired,
	          rowKey: React.PropTypes.string.isRequired
	        }).isRequired
	      })]).isRequired
	    }),
	    onRowClick: React.PropTypes.func,
	    onGridKeyUp: React.PropTypes.func,
	    onGridKeyDown: React.PropTypes.func,
	    rowGroupRenderer: React.PropTypes.func,
	    rowActionsCell: React.PropTypes.func,
	    onCheckCellIsEditable: React.PropTypes.func,
	    /* called before cell is set active, returns a boolean to determine whether cell is editable */
	    overScan: React.PropTypes.object
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      enableCellSelect: false,
	      tabIndex: -1,
	      rowHeight: 35,
	      enableRowSelect: false,
	      minHeight: 350,
	      rowKey: 'id',
	      rowScrollTimeout: 0,
	      cellNavigationMode: 'none',
	      overScan: {
	        colsStart: 5,
	        colsEnd: 5,
	        rowsStart: 5,
	        rowsEnd: 5
	      }
	    };
	  },


	  getInitialState: function getInitialState() {
	    var columnMetrics = this.createColumnMetrics();
	    var initialState = { columnMetrics: columnMetrics, selectedRows: [], copied: null, expandedRows: [], canFilter: false, columnFilters: {}, sortDirection: null, sortColumn: null, dragged: null, scrollOffset: 0, lastRowIdxUiSelected: -1 };
	    if (this.props.enableCellSelect) {
	      initialState.selected = { rowIdx: 0, idx: 0 };
	    } else {
	      initialState.selected = { rowIdx: -1, idx: -1 };
	    }
	    return initialState;
	  },

	  hasSelectedCellChanged: function hasSelectedCellChanged(selected) {
	    var previouslySelected = Object.assign({}, this.state.selected);
	    return previouslySelected.rowIdx !== selected.rowIdx || previouslySelected.idx !== selected.idx || previouslySelected.active === false;
	  },

	  onContextMenuHide: function onContextMenuHide() {
	    document.removeEventListener('click', this.onContextMenuHide);
	    var newSelected = Object.assign({}, this.state.selected, { contextMenuDisplayed: false });
	    this.setState({ selected: newSelected });
	  },

	  onColumnEvent: function onColumnEvent(ev, columnEvent) {
	    var idx = columnEvent.idx,
	        name = columnEvent.name;


	    if (name && typeof idx !== 'undefined') {
	      var column = this.getColumn(idx);

	      if (column && column.events && column.events[name] && typeof column.events[name] === 'function') {
	        var eventArgs = {
	          rowIdx: columnEvent.rowIdx,
	          idx: idx,
	          column: column
	        };

	        column.events[name](ev, eventArgs);
	      }
	    }
	  },

	  onSelect: function onSelect(selected) {
	    var _this = this;

	    if (this.state.selected.rowIdx !== selected.rowIdx || this.state.selected.idx !== selected.idx || this.state.selected.active === false) {
	      var _idx = selected.idx;
	      var _rowIdx = selected.rowIdx;
	      if (this.isCellWithinBounds(selected)) {
	        (function () {
	          var oldSelection = _this.state.selected;
	          _this.setState({ selected: selected }, function () {
	            if (typeof _this.props.onCellDeSelected === 'function') {
	              _this.props.onCellDeSelected(oldSelection);
	            }
	            if (typeof _this.props.onCellSelected === 'function') {
	              _this.props.onCellSelected(selected);
	            }
	          });
	        })();
	      } else if (_rowIdx === -1 && _idx === -1) {
	        // When it's outside of the grid, set rowIdx anyway
	        this.setState({ selected: { idx: _idx, rowIdx: _rowIdx } });
	      }
	    }
	  },

	  onCellClick: function onCellClick(cell) {
	    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx });

	    if (this.props.onRowClick && typeof this.props.onRowClick === 'function') {
	      this.props.onRowClick(cell.rowIdx, this.props.rowGetter(cell.rowIdx));
	    }
	  },

	  onCellContextMenu: function onCellContextMenu(cell) {
	    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx, contextMenuDisplayed: this.props.contextMenu });
	    if (this.props.contextMenu) {
	      document.addEventListener('click', this.onContextMenuHide);
	    }
	  },

	  onCellDoubleClick: function onCellDoubleClick(cell) {
	    this.onSelect({ rowIdx: cell.rowIdx, idx: cell.idx });
	    this.setActive('Enter');
	  },

	  onViewportDoubleClick: function onViewportDoubleClick() {
	    this.setActive();
	  },

	  onPressArrowUp: function onPressArrowUp(e) {
	    this.moveSelectedCell(e, -1, 0);
	  },
	  onPressArrowDown: function onPressArrowDown(e) {
	    this.moveSelectedCell(e, 1, 0);
	  },
	  onPressArrowLeft: function onPressArrowLeft(e) {
	    this.moveSelectedCell(e, 0, -1);
	  },
	  onPressArrowRight: function onPressArrowRight(e) {
	    this.moveSelectedCell(e, 0, 1);
	  },
	  onPressTab: function onPressTab(e) {
	    this.moveSelectedCell(e, 0, e.shiftKey ? -1 : 1);
	  },
	  onPressEnter: function onPressEnter(e) {
	    this.setActive(e.key);
	  },
	  onPressDelete: function onPressDelete(e) {
	    this.setActive(e.key);
	  },
	  onPressEscape: function onPressEscape(e) {
	    this.setInactive(e.key);
	    this.handleCancelCopy();
	  },
	  onPressBackspace: function onPressBackspace(e) {
	    this.setActive(e.key);
	  },
	  onPressChar: function onPressChar(e) {
	    if (this.isKeyPrintable(e.keyCode)) {
	      this.setActive(e.keyCode);
	    }
	  },
	  onPressKeyWithCtrl: function onPressKeyWithCtrl(e) {
	    var keys = {
	      KeyCode_c: 99,
	      KeyCode_C: 67,
	      KeyCode_V: 86,
	      KeyCode_v: 118
	    };

	    var rowIdx = this.state.selected.rowIdx;
	    var row = this.props.rowGetter(rowIdx);

	    var idx = this.state.selected.idx;
	    var col = this.getColumn(idx);

	    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect)) {
	      if (e.keyCode === keys.KeyCode_c || e.keyCode === keys.KeyCode_C) {
	        var _value = this.getSelectedValue();
	        this.handleCopy({ value: _value });
	      } else if (e.keyCode === keys.KeyCode_v || e.keyCode === keys.KeyCode_V) {
	        this.handlePaste();
	      }
	    }
	  },
	  onGridRowsUpdated: function onGridRowsUpdated(cellKey, fromRow, toRow, updated, action) {
	    var rowIds = [];

	    for (var i = fromRow; i <= toRow; i++) {
	      rowIds.push(this.props.rowGetter(i)[this.props.rowKey]);
	    }

	    this.props.onGridRowsUpdated({ cellKey: cellKey, fromRow: fromRow, toRow: toRow, rowIds: rowIds, updated: updated, action: action });
	  },
	  onCellCommit: function onCellCommit(commit) {
	    var selected = Object.assign({}, this.state.selected);
	    selected.active = false;
	    if (commit.key === 'Tab') {
	      selected.idx += 1;
	    }
	    var expandedRows = this.state.expandedRows;
	    // if(commit.changed && commit.changed.expandedHeight){
	    //   expandedRows = this.expandRow(commit.rowIdx, commit.changed.expandedHeight);
	    // }
	    this.setState({ selected: selected, expandedRows: expandedRows });

	    if (this.props.onRowUpdated) {
	      this.props.onRowUpdated(commit);
	    }

	    var targetRow = commit.rowIdx;

	    if (this.props.onGridRowsUpdated) {
	      this.onGridRowsUpdated(commit.cellKey, targetRow, targetRow, commit.updated, _AppConstants2['default'].UpdateActions.CELL_UPDATE);
	    }
	  },
	  onDragStart: function onDragStart(e) {
	    var idx = this.state.selected.idx;
	    // To prevent dragging down/up when reordering rows.
	    var isViewportDragging = e && e.target && e.target.className;
	    if (idx > -1 && isViewportDragging) {
	      var _value2 = this.getSelectedValue();
	      this.handleDragStart({ idx: this.state.selected.idx, rowIdx: this.state.selected.rowIdx, value: _value2 });
	      // need to set dummy data for FF
	      if (e && e.dataTransfer) {
	        if (e.dataTransfer.setData) {
	          e.dataTransfer.dropEffect = 'move';
	          e.dataTransfer.effectAllowed = 'move';
	          e.dataTransfer.setData('text/plain', '');
	        }
	      }
	    }
	  },
	  onToggleFilter: function onToggleFilter() {
	    var _this2 = this;

	    // setState() does not immediately mutate this.state but creates a pending state transition.
	    // Therefore if you want to do something after the state change occurs, pass it in as a callback function.
	    this.setState({ canFilter: !this.state.canFilter }, function () {
	      if (_this2.state.canFilter === false && _this2.props.onClearFilters) {
	        _this2.props.onClearFilters();
	      }
	    });
	  },
	  onDragHandleDoubleClick: function onDragHandleDoubleClick(e) {
	    if (this.props.onDragHandleDoubleClick) {
	      this.props.onDragHandleDoubleClick(e);
	    }

	    if (this.props.onGridRowsUpdated) {
	      var _onGridRowsUpdated;

	      var cellKey = this.getColumn(e.idx).key;
	      this.onGridRowsUpdated(cellKey, e.rowIdx, this.props.rowsCount - 1, (_onGridRowsUpdated = {}, _onGridRowsUpdated[cellKey] = e.rowData[cellKey], _onGridRowsUpdated), _AppConstants2['default'].UpdateActions.COLUMN_FILL);
	    }
	  },
	  onCellExpand: function onCellExpand(args) {
	    if (this.props.onCellExpand) {
	      this.props.onCellExpand(args);
	    }
	  },
	  onRowExpandToggle: function onRowExpandToggle(args) {
	    if (typeof this.props.onRowExpandToggle === 'function') {
	      this.props.onRowExpandToggle(args);
	    }
	  },
	  isCellWithinBounds: function isCellWithinBounds(_ref) {
	    var idx = _ref.idx,
	        rowIdx = _ref.rowIdx;

	    return idx >= 0 && rowIdx >= 0 && idx < ColumnUtils.getSize(this.state.columnMetrics.columns) && rowIdx < this.props.rowsCount;
	  },
	  handleDragStart: function handleDragStart(dragged) {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    if (this.isCellWithinBounds(dragged)) {
	      this.setState({ dragged: dragged });
	    }
	  },
	  handleDragEnd: function handleDragEnd() {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    var _state = this.state,
	        selected = _state.selected,
	        dragged = _state.dragged;

	    var column = this.getColumn(this.state.selected.idx);
	    if (selected && dragged && column) {
	      var cellKey = column.key;
	      var fromRow = selected.rowIdx < dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	      var toRow = selected.rowIdx > dragged.overRowIdx ? selected.rowIdx : dragged.overRowIdx;
	      if (this.props.onCellsDragged) {
	        this.props.onCellsDragged({ cellKey: cellKey, fromRow: fromRow, toRow: toRow, value: dragged.value });
	      }
	      if (this.props.onGridRowsUpdated) {
	        var _onGridRowsUpdated2;

	        this.onGridRowsUpdated(cellKey, fromRow, toRow, (_onGridRowsUpdated2 = {}, _onGridRowsUpdated2[cellKey] = dragged.value, _onGridRowsUpdated2), _AppConstants2['default'].UpdateActions.CELL_DRAG);
	      }
	    }
	    this.setState({ dragged: { complete: true } });
	  },
	  handleDragEnter: function handleDragEnter(row) {
	    if (!this.dragEnabled() || this.state.dragged == null) {
	      return;
	    }
	    var dragged = this.state.dragged;
	    dragged.overRowIdx = row;
	    this.setState({ dragged: dragged });
	  },
	  handleTerminateDrag: function handleTerminateDrag() {
	    if (!this.dragEnabled()) {
	      return;
	    }
	    this.setState({ dragged: null });
	  },
	  handlePaste: function handlePaste() {
	    if (!this.copyPasteEnabled() || !this.state.copied) {
	      return;
	    }
	    var selected = this.state.selected;
	    var cellKey = this.getColumn(this.state.selected.idx).key;
	    var textToCopy = this.state.textToCopy;
	    var fromRow = this.state.copied.rowIdx;
	    var toRow = selected.rowIdx;

	    if (this.props.onCellCopyPaste) {
	      this.props.onCellCopyPaste({ cellKey: cellKey, rowIdx: toRow, value: textToCopy, fromRow: fromRow, toRow: toRow });
	    }

	    if (this.props.onGridRowsUpdated) {
	      var _onGridRowsUpdated3;

	      this.onGridRowsUpdated(cellKey, toRow, toRow, (_onGridRowsUpdated3 = {}, _onGridRowsUpdated3[cellKey] = textToCopy, _onGridRowsUpdated3), _AppConstants2['default'].UpdateActions.COPY_PASTE);
	    }
	  },
	  handleCancelCopy: function handleCancelCopy() {
	    this.setState({ copied: null });
	  },
	  handleCopy: function handleCopy(args) {
	    if (!this.copyPasteEnabled()) {
	      return;
	    }
	    var textToCopy = args.value;
	    var selected = this.state.selected;
	    var copied = { idx: selected.idx, rowIdx: selected.rowIdx };
	    this.setState({ textToCopy: textToCopy, copied: copied });
	  },


	  handleSort: function handleSort(columnKey, direction) {
	    this.setState({ sortDirection: direction, sortColumn: columnKey }, function () {
	      this.props.onGridSort(columnKey, direction);
	    });
	  },

	  getSelectedRow: function getSelectedRow(rows, key) {
	    var _this3 = this;

	    var selectedRow = rows.filter(function (r) {
	      if (r[_this3.props.rowKey] === key) {
	        return true;
	      }
	      return false;
	    });
	    if (selectedRow.length > 0) {
	      return selectedRow[0];
	    }
	  },
	  useNewRowSelection: function useNewRowSelection() {
	    return this.props.rowSelection && this.props.rowSelection.selectBy;
	  },

	  // return false if not a shift select so can be handled as normal row selection
	  handleShiftSelect: function handleShiftSelect(rowIdx) {
	    if (this.state.lastRowIdxUiSelected > -1 && this.isSingleKeyDown(KeyCodes.Shift)) {
	      var _props$rowSelection$s = this.props.rowSelection.selectBy,
	          keys = _props$rowSelection$s.keys,
	          indexes = _props$rowSelection$s.indexes,
	          isSelectedKey = _props$rowSelection$s.isSelectedKey;

	      var isPreviouslySelected = RowUtils.isRowSelected(keys, indexes, isSelectedKey, this.props.rowGetter(rowIdx), rowIdx);

	      if (isPreviouslySelected) return false;

	      var handled = false;

	      if (rowIdx > this.state.lastRowIdxUiSelected) {
	        var rowsSelected = [];

	        for (var i = this.state.lastRowIdxUiSelected + 1; i <= rowIdx; i++) {
	          rowsSelected.push({ rowIdx: i, row: this.props.rowGetter(i) });
	        }

	        if (typeof this.props.rowSelection.onRowsSelected === 'function') {
	          this.props.rowSelection.onRowsSelected(rowsSelected);
	        }

	        handled = true;
	      } else if (rowIdx < this.state.lastRowIdxUiSelected) {
	        var _rowsSelected = [];

	        for (var _i = rowIdx; _i <= this.state.lastRowIdxUiSelected - 1; _i++) {
	          _rowsSelected.push({ rowIdx: _i, row: this.props.rowGetter(_i) });
	        }

	        if (typeof this.props.rowSelection.onRowsSelected === 'function') {
	          this.props.rowSelection.onRowsSelected(_rowsSelected);
	        }

	        handled = true;
	      }

	      if (handled) {
	        this.setState({ lastRowIdxUiSelected: rowIdx });
	      }

	      return handled;
	    }

	    return false;
	  },
	  handleNewRowSelect: function handleNewRowSelect(rowIdx, rowData) {
	    var _props$rowSelection$s2 = this.props.rowSelection.selectBy,
	        keys = _props$rowSelection$s2.keys,
	        indexes = _props$rowSelection$s2.indexes,
	        isSelectedKey = _props$rowSelection$s2.isSelectedKey;

	    var isPreviouslySelected = RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, rowIdx);

	    this.setState({ lastRowIdxUiSelected: isPreviouslySelected ? -1 : rowIdx, selected: { rowIdx: rowIdx, idx: 0 } });

	    if (isPreviouslySelected && typeof this.props.rowSelection.onRowsDeselected === 'function') {
	      this.props.rowSelection.onRowsDeselected([{ rowIdx: rowIdx, row: rowData }]);
	    } else if (!isPreviouslySelected && typeof this.props.rowSelection.onRowsSelected === 'function') {
	      this.props.rowSelection.onRowsSelected([{ rowIdx: rowIdx, row: rowData }]);
	    }
	  },

	  // columnKey not used here as this function will select the whole row,
	  // but needed to match the function signature in the CheckboxEditor
	  handleRowSelect: function handleRowSelect(rowIdx, columnKey, rowData, e) {
	    e.stopPropagation();

	    if (this.useNewRowSelection()) {
	      if (this.props.rowSelection.enableShiftSelect === true) {
	        if (!this.handleShiftSelect(rowIdx)) {
	          this.handleNewRowSelect(rowIdx, rowData);
	        }
	      } else {
	        this.handleNewRowSelect(rowIdx, rowData);
	      }
	    } else {
	      // Fallback to old onRowSelect handler
	      var _selectedRows = this.props.enableRowSelect === 'single' ? [] : this.state.selectedRows.slice(0);
	      var selectedRow = this.getSelectedRow(_selectedRows, rowData[this.props.rowKey]);
	      if (selectedRow) {
	        selectedRow.isSelected = !selectedRow.isSelected;
	      } else {
	        rowData.isSelected = true;
	        _selectedRows.push(rowData);
	      }
	      this.setState({ selectedRows: _selectedRows, selected: { rowIdx: rowIdx, idx: 0 } });
	      if (this.props.onRowSelect) {
	        this.props.onRowSelect(_selectedRows.filter(function (r) {
	          return r.isSelected === true;
	        }));
	      }
	    }
	  },


	  handleCheckboxChange: function handleCheckboxChange(e) {
	    var allRowsSelected = void 0;
	    if (e.currentTarget instanceof HTMLInputElement && e.currentTarget.checked === true) {
	      allRowsSelected = true;
	    } else {
	      allRowsSelected = false;
	    }
	    if (this.useNewRowSelection()) {
	      var _props$rowSelection$s3 = this.props.rowSelection.selectBy,
	          keys = _props$rowSelection$s3.keys,
	          indexes = _props$rowSelection$s3.indexes,
	          isSelectedKey = _props$rowSelection$s3.isSelectedKey;


	      if (allRowsSelected && typeof this.props.rowSelection.onRowsSelected === 'function') {
	        var _selectedRows2 = [];
	        for (var i = 0; i < this.props.rowsCount; i++) {
	          var rowData = this.props.rowGetter(i);
	          if (!RowUtils.isRowSelected(keys, indexes, isSelectedKey, rowData, i)) {
	            _selectedRows2.push({ rowIdx: i, row: rowData });
	          }
	        }

	        if (_selectedRows2.length > 0) {
	          this.props.rowSelection.onRowsSelected(_selectedRows2);
	        }
	      } else if (!allRowsSelected && typeof this.props.rowSelection.onRowsDeselected === 'function') {
	        var deselectedRows = [];
	        for (var _i2 = 0; _i2 < this.props.rowsCount; _i2++) {
	          var _rowData = this.props.rowGetter(_i2);
	          if (RowUtils.isRowSelected(keys, indexes, isSelectedKey, _rowData, _i2)) {
	            deselectedRows.push({ rowIdx: _i2, row: _rowData });
	          }
	        }

	        if (deselectedRows.length > 0) {
	          this.props.rowSelection.onRowsDeselected(deselectedRows);
	        }
	      }
	    } else {
	      var _selectedRows3 = [];
	      for (var _i3 = 0; _i3 < this.props.rowsCount; _i3++) {
	        var row = Object.assign({}, this.props.rowGetter(_i3), { isSelected: allRowsSelected });
	        _selectedRows3.push(row);
	      }
	      this.setState({ selectedRows: _selectedRows3 });
	      if (typeof this.props.onRowSelect === 'function') {
	        this.props.onRowSelect(_selectedRows3.filter(function (r) {
	          return r.isSelected === true;
	        }));
	      }
	    }
	  },

	  getScrollOffSet: function getScrollOffSet() {
	    var scrollOffset = 0;
	    var canvas = ReactDOM.findDOMNode(this).querySelector('.react-grid-Canvas');
	    if (canvas) {
	      scrollOffset = canvas.offsetWidth - canvas.clientWidth;
	    }
	    this.setState({ scrollOffset: scrollOffset });
	  },
	  getRowOffsetHeight: function getRowOffsetHeight() {
	    var offsetHeight = 0;
	    this.getHeaderRows().forEach(function (row) {
	      return offsetHeight += parseFloat(row.height, 10);
	    });
	    return offsetHeight;
	  },
	  getHeaderRows: function getHeaderRows() {
	    var rows = [{ ref: 'row', height: this.props.headerRowHeight || this.props.rowHeight, rowType: 'header' }];
	    if (this.state.canFilter === true) {
	      rows.push({
	        ref: 'filterRow',
	        filterable: true,
	        onFilterChange: this.props.onAddFilter,
	        height: 45,
	        rowType: 'filter'
	      });
	    }
	    return rows;
	  },

	  getInitialSelectedRows: function getInitialSelectedRows() {
	    var selectedRows = [];
	    for (var i = 0; i < this.props.rowsCount; i++) {
	      selectedRows.push(false);
	    }
	    return selectedRows;
	  },
	  getRowSelectionProps: function getRowSelectionProps() {
	    if (this.props.rowSelection) {
	      return this.props.rowSelection.selectBy;
	    }

	    return null;
	  },
	  getSelectedRows: function getSelectedRows() {
	    if (this.props.rowSelection) {
	      return null;
	    }

	    return this.state.selectedRows.filter(function (r) {
	      return r.isSelected === true;
	    });
	  },
	  getSelectedValue: function getSelectedValue() {
	    var rowIdx = this.state.selected.rowIdx;
	    var idx = this.state.selected.idx;
	    var cellKey = this.getColumn(idx).key;
	    var row = this.props.rowGetter(rowIdx);
	    return RowUtils.get(row, cellKey);
	  },
	  moveSelectedCell: function moveSelectedCell(e, rowDelta, cellDelta) {
	    // we need to prevent default as we control grid scroll
	    // otherwise it moves every time you left/right which is janky
	    e.preventDefault();
	    var rowIdx = void 0;
	    var idx = void 0;
	    var cellNavigationMode = this.props.cellNavigationMode;

	    if (cellNavigationMode !== 'none') {
	      var _calculateNextSelecti = this.calculateNextSelectionPosition(cellNavigationMode, cellDelta, rowDelta);

	      idx = _calculateNextSelecti.idx;
	      rowIdx = _calculateNextSelecti.rowIdx;
	    } else {
	      rowIdx = this.state.selected.rowIdx + rowDelta;
	      idx = this.state.selected.idx + cellDelta;
	    }
	    this.onSelect({ idx: idx, rowIdx: rowIdx });
	  },
	  getNbrColumns: function getNbrColumns() {
	    var _props = this.props,
	        columns = _props.columns,
	        enableRowSelect = _props.enableRowSelect;

	    return enableRowSelect ? columns.length + 1 : columns.length;
	  },
	  getDataGridDOMNode: function getDataGridDOMNode() {
	    if (!this._gridNode) {
	      this._gridNode = ReactDOM.findDOMNode(this);
	    }
	    return this._gridNode;
	  },
	  calculateNextSelectionPosition: function calculateNextSelectionPosition(cellNavigationMode, cellDelta, rowDelta) {
	    var _rowDelta = rowDelta;
	    var idx = this.state.selected.idx + cellDelta;
	    var nbrColumns = this.getNbrColumns();
	    if (cellDelta > 0) {
	      if (this.isAtLastCellInRow(nbrColumns)) {
	        if (cellNavigationMode === 'changeRow') {
	          _rowDelta = this.isAtLastRow() ? rowDelta : rowDelta + 1;
	          idx = this.isAtLastRow() ? idx : 0;
	        } else {
	          idx = 0;
	        }
	      }
	    } else if (cellDelta < 0) {
	      if (this.isAtFirstCellInRow()) {
	        if (cellNavigationMode === 'changeRow') {
	          _rowDelta = this.isAtFirstRow() ? rowDelta : rowDelta - 1;
	          idx = this.isAtFirstRow() ? 0 : nbrColumns - 1;
	        } else {
	          idx = nbrColumns - 1;
	        }
	      }
	    }
	    var rowIdx = this.state.selected.rowIdx + _rowDelta;
	    return { idx: idx, rowIdx: rowIdx };
	  },
	  isAtLastCellInRow: function isAtLastCellInRow(nbrColumns) {
	    return this.state.selected.idx === nbrColumns - 1;
	  },
	  isAtLastRow: function isAtLastRow() {
	    return this.state.selected.rowIdx === this.props.rowsCount - 1;
	  },
	  isAtFirstCellInRow: function isAtFirstCellInRow() {
	    return this.state.selected.idx === 0;
	  },
	  isAtFirstRow: function isAtFirstRow() {
	    return this.state.selected.rowIdx === 0;
	  },
	  openCellEditor: function openCellEditor(rowIdx, idx) {
	    var _this4 = this;

	    var row = this.props.rowGetter(rowIdx);
	    var col = this.getColumn(idx);

	    if (!ColumnUtils.canEdit(col, row, this.props.enableCellSelect)) {
	      return;
	    }

	    var selected = { rowIdx: rowIdx, idx: idx };
	    if (this.hasSelectedCellChanged(selected)) {
	      this.setState({ selected: selected }, function () {
	        _this4.setActive('Enter');
	      });
	    } else {
	      this.setActive('Enter');
	    }
	  },
	  scrollToColumn: function scrollToColumn(colIdx) {
	    var canvas = ReactDOM.findDOMNode(this).querySelector('.react-grid-Canvas');
	    if (canvas) {
	      var left = 0;
	      var locked = 0;

	      for (var i = 0; i < colIdx; i++) {
	        var column = this.getColumn(i);
	        if (column) {
	          if (column.width) {
	            left += column.width;
	          }
	          if (column.locked) {
	            locked += column.width;
	          }
	        }
	      }

	      var selectedColumn = this.getColumn(colIdx);
	      if (selectedColumn) {
	        var scrollLeft = left - locked - canvas.scrollLeft;
	        var scrollRight = left + selectedColumn.width - canvas.scrollLeft;

	        if (scrollLeft < 0) {
	          canvas.scrollLeft += scrollLeft;
	        } else if (scrollRight > canvas.clientWidth) {
	          var scrollAmount = scrollRight - canvas.clientWidth;
	          canvas.scrollLeft += scrollAmount;
	        }
	      }
	    }
	  },
	  setActive: function setActive(keyPressed) {
	    var rowIdx = this.state.selected.rowIdx;
	    var row = this.props.rowGetter(rowIdx);

	    var idx = this.state.selected.idx;
	    var column = this.getColumn(idx);

	    if (ColumnUtils.canEdit(column, row, this.props.enableCellSelect) && !this.isActive()) {
	      var _selected = Object.assign({}, this.state.selected, { idx: idx, rowIdx: rowIdx, active: true, initialKeyCode: keyPressed });
	      var showEditor = true;
	      if (typeof this.props.onCheckCellIsEditable === 'function') {
	        var args = Object.assign({}, { row: row, column: column }, _selected);
	        showEditor = this.props.onCheckCellIsEditable(args);
	      }
	      if (showEditor !== false) {
	        this.setState({ selected: _selected }, this.scrollToColumn(idx));
	        this.handleCancelCopy();
	      }
	    }
	  },
	  setInactive: function setInactive() {
	    var rowIdx = this.state.selected.rowIdx;
	    var row = this.props.rowGetter(rowIdx);

	    var idx = this.state.selected.idx;
	    var col = this.getColumn(idx);

	    if (ColumnUtils.canEdit(col, row, this.props.enableCellSelect) && this.isActive()) {
	      var _selected2 = Object.assign({}, this.state.selected, { idx: idx, rowIdx: rowIdx, active: false });
	      this.setState({ selected: _selected2 });
	    }
	  },
	  isActive: function isActive() {
	    return this.state.selected.active === true;
	  },


	  setupGridColumns: function setupGridColumns() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
	    var columns = props.columns;

	    if (this._cachedColumns === columns) {
	      return this._cachedComputedColumns;
	    }

	    this._cachedColumns = columns;

	    var cols = columns.slice(0);
	    var unshiftedCols = {};
	    if (this.props.rowActionsCell || props.enableRowSelect && !this.props.rowSelection || props.rowSelection && props.rowSelection.showCheckbox !== false) {
	      var headerRenderer = props.enableRowSelect === 'single' ? null : React.createElement(
	        'div',
	        { className: 'react-grid-checkbox-container' },
	        React.createElement('input', { className: 'react-grid-checkbox', type: 'checkbox', name: 'select-all-checkbox', id: 'select-all-checkbox', onChange: this.handleCheckboxChange }),
	        React.createElement('label', { htmlFor: 'select-all-checkbox', className: 'react-grid-checkbox-label' })
	      );
	      var Formatter = this.props.rowActionsCell ? this.props.rowActionsCell : CheckboxEditor;
	      var selectColumn = {
	        key: 'select-row',
	        name: '',
	        formatter: React.createElement(Formatter, { rowSelection: this.props.rowSelection }),
	        onCellChange: this.handleRowSelect,
	        filterable: false,
	        headerRenderer: headerRenderer,
	        width: 60,
	        locked: true,
	        getRowMetaData: function getRowMetaData(rowData) {
	          return rowData;
	        },
	        cellClass: this.props.rowActionsCell ? 'rdg-row-actions-cell' : ''
	      };
	      unshiftedCols = cols.unshift(selectColumn);
	      cols = unshiftedCols > 0 ? cols : unshiftedCols;
	    }
	    this._cachedComputedColumns = cols;

	    return this._cachedComputedColumns;
	  },

	  copyPasteEnabled: function copyPasteEnabled() {
	    return this.props.onCellCopyPaste !== null;
	  },

	  dragEnabled: function dragEnabled() {
	    return this.props.onGridRowsUpdated !== undefined || this.props.onCellsDragged !== undefined;
	  },

	  renderToolbar: function renderToolbar() {
	    var Toolbar = this.props.toolbar;
	    if (React.isValidElement(Toolbar)) {
	      return React.cloneElement(Toolbar, { columns: this.props.columns, onToggleFilter: this.onToggleFilter, numberOfRows: this.props.rowsCount });
	    }
	  },
	  render: function render() {
	    var cellMetaData = {
	      selected: this.state.selected,
	      dragged: this.state.dragged,
	      hoveredRowIdx: this.state.hoveredRowIdx,
	      onCellClick: this.onCellClick,
	      onCellContextMenu: this.onCellContextMenu,
	      onCellDoubleClick: this.onCellDoubleClick,
	      onCommit: this.onCellCommit,
	      onCommitCancel: this.setInactive,
	      copied: this.state.copied,
	      handleDragEnterRow: this.handleDragEnter,
	      handleTerminateDrag: this.handleTerminateDrag,
	      enableCellSelect: this.props.enableCellSelect,
	      onColumnEvent: this.onColumnEvent,
	      openCellEditor: this.openCellEditor,
	      onDragHandleDoubleClick: this.onDragHandleDoubleClick,
	      onCellExpand: this.onCellExpand,
	      onRowExpandToggle: this.onRowExpandToggle,
	      onRowHover: this.onRowHover,
	      getDataGridDOMNode: this.getDataGridDOMNode,
	      isScrollingVerticallyWithKeyboard: this.isKeyDown(40) || this.isKeyDown(38), // up or down
	      isScrollingHorizontallyWithKeyboard: this.isKeyDown(37) || this.isKeyDown(39) // left or right
	    };

	    var toolbar = this.renderToolbar();
	    var containerWidth = this.props.minWidth || this.DOMMetrics.gridWidth();
	    var gridWidth = containerWidth - this.state.scrollOffset;

	    // depending on the current lifecycle stage, gridWidth() may not initialize correctly
	    // this also handles cases where it always returns undefined -- such as when inside a div with display:none
	    // eg Bootstrap tabs and collapses
	    if (typeof containerWidth === 'undefined' || isNaN(containerWidth) || containerWidth === 0) {
	      containerWidth = '100%';
	    }
	    if (typeof gridWidth === 'undefined' || isNaN(gridWidth) || gridWidth === 0) {
	      gridWidth = '100%';
	    }
	    return React.createElement(
	      'div',
	      { className: 'react-grid-Container', style: { width: containerWidth } },
	      toolbar,
	      React.createElement(
	        'div',
	        { className: 'react-grid-Main' },
	        React.createElement(BaseGrid, _extends({
	          ref: 'base'
	        }, this.props, {
	          rowKey: this.props.rowKey,
	          headerRows: this.getHeaderRows(),
	          columnMetrics: this.state.columnMetrics,
	          rowGetter: this.props.rowGetter,
	          rowsCount: this.props.rowsCount,
	          rowHeight: this.props.rowHeight,
	          cellMetaData: cellMetaData,
	          selectedRows: this.getSelectedRows(),
	          rowSelection: this.getRowSelectionProps(),
	          expandedRows: this.state.expandedRows,
	          rowOffsetHeight: this.getRowOffsetHeight(),
	          sortColumn: this.state.sortColumn,
	          sortDirection: this.state.sortDirection,
	          onSort: this.handleSort,
	          minHeight: this.props.minHeight,
	          totalWidth: gridWidth,
	          onViewportKeydown: this.onKeyDown,
	          onViewportKeyup: this.onKeyUp,
	          onViewportDragStart: this.onDragStart,
	          onViewportDragEnd: this.handleDragEnd,
	          onViewportDoubleClick: this.onViewportDoubleClick,
	          onColumnResize: this.onColumnResize,
	          rowScrollTimeout: this.props.rowScrollTimeout,
	          contextMenu: this.props.contextMenu,
	          overScan: this.props.overScan }))
	      )
	    );
	  }
	});

	module.exports = ReactDataGrid;

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var Draggable = __webpack_require__(173);
	__webpack_require__(21);

	var ResizeHandle = React.createClass({
	  displayName: 'ResizeHandle',

	  style: {
	    position: 'absolute',
	    top: 0,
	    right: 0,
	    width: 6,
	    height: '100%'
	  },

	  render: function render() {
	    return React.createElement(Draggable, _extends({}, this.props, {
	      className: 'react-grid-HeaderCell__resizeHandle',
	      style: this.style
	    }));
	  }
	});

	module.exports = ResizeHandle;

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(10);

	var _classnames2 = _interopRequireDefault(_classnames);

	__webpack_require__(36);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RowGroup = function (_Component) {
	  _inherits(RowGroup, _Component);

	  function RowGroup() {
	    _classCallCheck(this, RowGroup);

	    var _this = _possibleConstructorReturn(this, _Component.call(this));

	    _this.checkFocus = _this.checkFocus.bind(_this);
	    _this.isSelected = _this.isSelected.bind(_this);
	    _this.onClick = _this.onClick.bind(_this);
	    _this.onRowExpandToggle = _this.onRowExpandToggle.bind(_this);
	    _this.onKeyDown = _this.onKeyDown.bind(_this);
	    _this.onRowExpandClick = _this.onRowExpandClick.bind(_this);
	    return _this;
	  }

	  RowGroup.prototype.componentDidMount = function componentDidMount() {
	    this.checkFocus();
	  };

	  RowGroup.prototype.componentDidUpdate = function componentDidUpdate() {
	    this.checkFocus();
	  };

	  RowGroup.prototype.isSelected = function isSelected() {
	    var meta = this.props.cellMetaData;
	    if (meta == null) {
	      return false;
	    }

	    return meta.selected && meta.selected.rowIdx === this.props.idx;
	  };

	  RowGroup.prototype.onClick = function onClick(e) {
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onCellClick && typeof meta.onCellClick === 'function') {
	      meta.onCellClick({ rowIdx: this.props.idx, idx: 0 }, e);
	    }
	  };

	  RowGroup.prototype.onKeyDown = function onKeyDown(e) {
	    if (e.key === 'ArrowLeft') {
	      this.onRowExpandToggle(false);
	    }
	    if (e.key === 'ArrowRight') {
	      this.onRowExpandToggle(true);
	    }
	    if (e.key === 'Enter') {
	      this.onRowExpandToggle(!this.props.isExpanded);
	    }
	  };

	  RowGroup.prototype.onRowExpandClick = function onRowExpandClick() {
	    this.onRowExpandToggle(!this.props.isExpanded);
	  };

	  RowGroup.prototype.onRowExpandToggle = function onRowExpandToggle(expand) {
	    var shouldExpand = expand == null ? !this.props.isExpanded : expand;
	    var meta = this.props.cellMetaData;
	    if (meta != null && meta.onRowExpandToggle && typeof meta.onRowExpandToggle === 'function') {
	      meta.onRowExpandToggle({ rowIdx: this.props.idx, shouldExpand: shouldExpand, columnGroupName: this.props.columnGroupName, name: this.props.name });
	    }
	  };

	  RowGroup.prototype.getClassName = function getClassName() {
	    return (0, _classnames2['default'])('react-grid-row-group', 'react-grid-Row', { 'row-selected': this.isSelected() });
	  };

	  RowGroup.prototype.checkFocus = function checkFocus() {
	    if (this.isSelected()) {
	      _reactDom2['default'].findDOMNode(this).focus();
	    }
	  };

	  RowGroup.prototype.render = function render() {
	    var style = {
	      height: '50px',
	      overflow: 'hidden',
	      border: '1px solid #dddddd',
	      paddingTop: '15px',
	      paddingLeft: '5px'
	    };
	    var rowGroupRendererProps = Object.assign({ onRowExpandClick: this.onRowExpandClick }, this.props);

	    return _react2['default'].createElement(
	      'div',
	      { style: style, className: this.getClassName(), onClick: this.onClick, onKeyDown: this.onKeyDown, tabIndex: -1 },
	      _react2['default'].createElement(this.props.renderer, rowGroupRendererProps)
	    );
	  };

	  return RowGroup;
	}(_react.Component);

	RowGroup.propTypes = {
	  name: _react.PropTypes.string.isRequired,
	  columnGroupName: _react.PropTypes.string.isRequired,
	  isExpanded: _react.PropTypes.bool.isRequired,
	  treeDepth: _react.PropTypes.number.isRequired,
	  height: _react.PropTypes.number.isRequired,
	  cellMetaData: _react.PropTypes.object,
	  idx: _react.PropTypes.number.isRequired,
	  renderer: _react.PropTypes.func
	};

	var DefaultRowGroupRenderer = function DefaultRowGroupRenderer(props) {
	  var treeDepth = props.treeDepth || 0;
	  var marginLeft = treeDepth * 20;

	  return _react2['default'].createElement(
	    'div',
	    null,
	    _react2['default'].createElement(
	      'span',
	      { className: 'row-expand-icon', style: { float: 'left', marginLeft: marginLeft, cursor: 'pointer' }, onClick: props.onRowExpandClick },
	      props.isExpanded ? String.fromCharCode('9660') : String.fromCharCode('9658')
	    ),
	    _react2['default'].createElement(
	      'strong',
	      null,
	      props.columnGroupName,
	      ' : ',
	      props.name
	    )
	  );
	};

	DefaultRowGroupRenderer.propTypes = {
	  onRowExpandClick: _react.PropTypes.func.isRequired,
	  isExpanded: _react.PropTypes.bool.isRequired,
	  treeDepth: _react.PropTypes.number.isRequired,
	  name: _react.PropTypes.string.isRequired,
	  columnGroupName: _react.PropTypes.string.isRequired
	};

	RowGroup.defaultProps = {
	  renderer: DefaultRowGroupRenderer
	};

	exports['default'] = RowGroup;

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var ScrollShim = {
	  appendScrollShim: function appendScrollShim() {
	    if (!this._scrollShim) {
	      var size = this._scrollShimSize();
	      var shim = document.createElement('div');
	      if (shim.classList) {
	        shim.classList.add('react-grid-ScrollShim'); // flow - not compatible with HTMLElement
	      } else {
	        shim.className += ' react-grid-ScrollShim';
	      }
	      shim.style.position = 'absolute';
	      shim.style.top = 0;
	      shim.style.left = 0;
	      shim.style.width = size.width + 'px';
	      shim.style.height = size.height + 'px';
	      _reactDom2['default'].findDOMNode(this).appendChild(shim);
	      this._scrollShim = shim;
	    }
	    this._scheduleRemoveScrollShim();
	  },
	  _scrollShimSize: function _scrollShimSize() {
	    return {
	      width: this.props.width,
	      height: this.props.length * this.props.rowHeight
	    };
	  },
	  _scheduleRemoveScrollShim: function _scheduleRemoveScrollShim() {
	    if (this._scheduleRemoveScrollShimTimer) {
	      clearTimeout(this._scheduleRemoveScrollShimTimer);
	    }
	    this._scheduleRemoveScrollShimTimer = setTimeout(this._removeScrollShim, 200);
	  },
	  _removeScrollShim: function _removeScrollShim() {
	    if (this._scrollShim) {
	      this._scrollShim.parentNode.removeChild(this._scrollShim);
	      this._scrollShim = undefined;
	    }
	  }
	};

	module.exports = ScrollShim;

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var Canvas = __webpack_require__(170);
	var ViewportScroll = __webpack_require__(187);
	var cellMetaDataShape = __webpack_require__(17);
	var PropTypes = React.PropTypes;

	var Viewport = React.createClass({
	  displayName: 'Viewport',

	  mixins: [ViewportScroll],

	  propTypes: {
	    rowOffsetHeight: PropTypes.number.isRequired,
	    totalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	    columnMetrics: PropTypes.object.isRequired,
	    rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
	    selectedRows: PropTypes.array,
	    rowSelection: React.PropTypes.oneOfType([React.PropTypes.shape({
	      indexes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
	    }), React.PropTypes.shape({
	      isSelectedKey: React.PropTypes.string.isRequired
	    }), React.PropTypes.shape({
	      keys: React.PropTypes.shape({
	        values: React.PropTypes.array.isRequired,
	        rowKey: React.PropTypes.string.isRequired
	      }).isRequired
	    })]),
	    expandedRows: PropTypes.array,
	    rowRenderer: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
	    rowsCount: PropTypes.number.isRequired,
	    rowHeight: PropTypes.number.isRequired,
	    onRows: PropTypes.func,
	    onScroll: PropTypes.func,
	    minHeight: PropTypes.number,
	    cellMetaData: PropTypes.shape(cellMetaDataShape),
	    rowKey: PropTypes.string.isRequired,
	    rowScrollTimeout: PropTypes.number,
	    contextMenu: PropTypes.element,
	    getSubRowDetails: PropTypes.func,
	    rowGroupRenderer: PropTypes.func
	  },

	  onScroll: function onScroll(scroll) {
	    this.updateScroll(scroll.scrollTop, scroll.scrollLeft, this.state.height, this.props.rowHeight, this.props.rowsCount);

	    if (this.props.onScroll) {
	      this.props.onScroll({ scrollTop: scroll.scrollTop, scrollLeft: scroll.scrollLeft });
	    }
	  },
	  getScroll: function getScroll() {
	    return this.refs.canvas.getScroll();
	  },
	  setScrollLeft: function setScrollLeft(scrollLeft) {
	    this.refs.canvas.setScrollLeft(scrollLeft);
	  },
	  render: function render() {
	    var style = {
	      padding: 0,
	      bottom: 0,
	      left: 0,
	      right: 0,
	      overflow: 'hidden',
	      position: 'absolute',
	      top: this.props.rowOffsetHeight
	    };
	    return React.createElement(
	      'div',
	      {
	        className: 'react-grid-Viewport',
	        style: style },
	      React.createElement(Canvas, {
	        ref: 'canvas',
	        rowKey: this.props.rowKey,
	        totalWidth: this.props.totalWidth,
	        width: this.props.columnMetrics.width,
	        rowGetter: this.props.rowGetter,
	        rowsCount: this.props.rowsCount,
	        selectedRows: this.props.selectedRows,
	        expandedRows: this.props.expandedRows,
	        columns: this.props.columnMetrics.columns,
	        rowRenderer: this.props.rowRenderer,
	        displayStart: this.state.displayStart,
	        displayEnd: this.state.displayEnd,
	        visibleStart: this.state.visibleStart,
	        visibleEnd: this.state.visibleEnd,
	        colVisibleStart: this.state.colVisibleStart,
	        colVisibleEnd: this.state.colVisibleEnd,
	        colDisplayStart: this.state.colDisplayStart,
	        colDisplayEnd: this.state.colDisplayEnd,
	        cellMetaData: this.props.cellMetaData,
	        height: this.state.height,
	        rowHeight: this.props.rowHeight,
	        onScroll: this.onScroll,
	        onRows: this.props.onRows,
	        rowScrollTimeout: this.props.rowScrollTimeout,
	        contextMenu: this.props.contextMenu,
	        rowSelection: this.props.rowSelection,
	        getSubRowDetails: this.props.getSubRowDetails,
	        rowGroupRenderer: this.props.rowGroupRenderer,
	        isScrolling: this.state.isScrolling || false
	      })
	    );
	  }
	});

	module.exports = Viewport;

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ColumnUtils = __webpack_require__(11);

	var _ColumnUtils2 = _interopRequireDefault(_ColumnUtils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(4);
	var DOMMetrics = __webpack_require__(27);
	var min = Math.min;
	var max = Math.max;
	var floor = Math.floor;
	var ceil = Math.ceil;

	module.exports = {
	  mixins: [DOMMetrics.MetricsMixin],

	  DOMMetrics: {
	    viewportHeight: function viewportHeight() {
	      return ReactDOM.findDOMNode(this).offsetHeight;
	    },
	    viewportWidth: function viewportWidth() {
	      return ReactDOM.findDOMNode(this).offsetWidth;
	    }
	  },

	  propTypes: {
	    rowHeight: React.PropTypes.number,
	    rowsCount: React.PropTypes.number.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      rowHeight: 30
	    };
	  },
	  getInitialState: function getInitialState() {
	    return this.getGridState(this.props);
	  },
	  getGridState: function getGridState(props) {
	    var totalNumberColumns = _ColumnUtils2['default'].getSize(props.columnMetrics.columns);
	    var canvasHeight = props.minHeight - props.rowOffsetHeight;
	    var renderedRowsCount = ceil((props.minHeight - props.rowHeight) / props.rowHeight);
	    var totalRowCount = min(renderedRowsCount * 4, props.rowsCount);
	    return {
	      displayStart: 0,
	      displayEnd: totalRowCount,
	      visibleStart: 0,
	      visibleEnd: totalRowCount,
	      height: canvasHeight,
	      scrollTop: 0,
	      scrollLeft: 0,
	      colVisibleStart: 0,
	      colVisibleEnd: totalNumberColumns,
	      colDisplayStart: 0,
	      colDisplayEnd: totalNumberColumns
	    };
	  },
	  getRenderedColumnCount: function getRenderedColumnCount(displayStart, width) {
	    var remainingWidth = width > 0 ? width : this.props.columnMetrics.totalWidth;
	    if (remainingWidth === 0) {
	      remainingWidth = ReactDOM.findDOMNode(this).offsetWidth;
	    }
	    var columnIndex = displayStart;
	    var columnCount = 0;
	    while (remainingWidth > 0) {
	      var column = _ColumnUtils2['default'].getColumn(this.props.columnMetrics.columns, columnIndex);

	      if (!column) {
	        break;
	      }

	      columnCount++;
	      columnIndex++;
	      remainingWidth -= column.width;
	    }
	    return columnCount;
	  },
	  getVisibleColStart: function getVisibleColStart(scrollLeft) {
	    var remainingScroll = scrollLeft;
	    var columnIndex = -1;
	    while (remainingScroll >= 0) {
	      columnIndex++;
	      remainingScroll -= _ColumnUtils2['default'].getColumn(this.props.columnMetrics.columns, columnIndex).width;
	    }
	    return columnIndex;
	  },
	  resetScrollStateAfterDelay: function resetScrollStateAfterDelay() {
	    if (this.resetScrollStateTimeoutId) {
	      clearTimeout(this.resetScrollStateTimeoutId);
	    }

	    this.resetScrollStateTimeoutId = setTimeout(this.resetScrollStateAfterDelayCallback, 500);
	  },
	  resetScrollStateAfterDelayCallback: function resetScrollStateAfterDelayCallback() {
	    this.resetScrollStateTimeoutId = null;
	    this.setState({
	      isScrolling: false
	    });
	  },
	  updateScroll: function updateScroll(scrollTop, scrollLeft, height, rowHeight, length, width) {
	    var isScrolling = true;
	    this.resetScrollStateAfterDelay();

	    var renderedRowsCount = ceil(height / rowHeight);

	    var visibleStart = max(0, floor(scrollTop / rowHeight));

	    var visibleEnd = min(visibleStart + renderedRowsCount, length);

	    var displayStart = max(0, visibleStart - this.props.overScan.rowsStart);

	    var displayEnd = min(visibleEnd + this.props.overScan.rowsEnd, length);

	    var totalNumberColumns = _ColumnUtils2['default'].getSize(this.props.columnMetrics.columns);
	    var colVisibleStart = max(0, this.getVisibleColStart(scrollLeft));
	    var renderedColumnCount = this.getRenderedColumnCount(colVisibleStart, width);
	    var colVisibleEnd = renderedColumnCount !== 0 ? colVisibleStart + renderedColumnCount : totalNumberColumns;
	    var colDisplayStart = max(0, colVisibleStart - this.props.overScan.colsStart);
	    var colDisplayEnd = min(colVisibleEnd + this.props.overScan.colsEnd, totalNumberColumns);

	    var nextScrollState = {
	      visibleStart: visibleStart,
	      visibleEnd: visibleEnd,
	      displayStart: displayStart,
	      displayEnd: displayEnd,
	      height: height,
	      scrollTop: scrollTop,
	      scrollLeft: scrollLeft,
	      colVisibleStart: colVisibleStart,
	      colVisibleEnd: colVisibleEnd,
	      colDisplayStart: colDisplayStart,
	      colDisplayEnd: colDisplayEnd,
	      isScrolling: isScrolling
	    };

	    this.setState(nextScrollState);
	  },
	  metricsUpdated: function metricsUpdated() {
	    var height = this.DOMMetrics.viewportHeight();
	    var width = this.DOMMetrics.viewportWidth();
	    if (height) {
	      this.updateScroll(this.state.scrollTop, this.state.scrollLeft, height, this.props.rowHeight, this.props.rowsCount, width);
	    }
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this.props.rowHeight !== nextProps.rowHeight || this.props.minHeight !== nextProps.minHeight || _ColumnUtils2['default'].getSize(this.props.columnMetrics.columns) !== _ColumnUtils2['default'].getSize(nextProps.columnMetrics.columns)) {
	      this.setState(this.getGridState(nextProps));
	    } else if (this.props.rowsCount !== nextProps.rowsCount) {
	      this.updateScroll(this.state.scrollTop, this.state.scrollLeft, this.state.height, nextProps.rowHeight, nextProps.rowsCount);
	      // Added to fix the hiding of the bottom scrollbar when showing the filters.
	    } else if (this.props.rowOffsetHeight !== nextProps.rowOffsetHeight) {
	      // The value of height can be positive or negative and will be added to the current height to cater for changes in the header height (due to the filer)
	      var _height = this.props.rowOffsetHeight - nextProps.rowOffsetHeight;

	      this.updateScroll(this.state.scrollTop, this.state.scrollLeft, this.state.height + _height, nextProps.rowHeight, nextProps.rowsCount);
	    }
	  }
	};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ExcelColumn = __webpack_require__(13);

	var FilterableHeaderCell = React.createClass({
	  displayName: 'FilterableHeaderCell',


	  propTypes: {
	    onChange: React.PropTypes.func.isRequired,
	    column: React.PropTypes.shape(ExcelColumn)
	  },

	  getInitialState: function getInitialState() {
	    return { filterTerm: '' };
	  },
	  handleChange: function handleChange(e) {
	    var val = e.target.value;
	    this.setState({ filterTerm: val });
	    this.props.onChange({ filterTerm: val, column: this.props.column });
	  },


	  renderInput: function renderInput() {
	    if (this.props.column.filterable === false) {
	      return React.createElement('span', null);
	    }

	    var inputKey = 'header-filter-' + this.props.column.key;
	    return React.createElement('input', { key: inputKey, type: 'text', className: 'form-control input-sm', placeholder: 'Search', value: this.state.filterTerm, onChange: this.handleChange });
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'div',
	        { className: 'form-group' },
	        this.renderInput()
	      )
	    );
	  }
	});

	module.exports = FilterableHeaderCell;

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var joinClasses = __webpack_require__(10);
	var DEFINE_SORT = {
	  ASC: 'ASC',
	  DESC: 'DESC',
	  NONE: 'NONE'
	};

	var SortableHeaderCell = React.createClass({
	  displayName: 'SortableHeaderCell',

	  propTypes: {
	    columnKey: React.PropTypes.string.isRequired,
	    column: React.PropTypes.shape({ name: React.PropTypes.node }),
	    onSort: React.PropTypes.func.isRequired,
	    sortDirection: React.PropTypes.oneOf(Object.keys(DEFINE_SORT))
	  },

	  onClick: function onClick() {
	    var direction = void 0;
	    switch (this.props.sortDirection) {
	      default:
	      case null:
	      case undefined:
	      case DEFINE_SORT.NONE:
	        direction = DEFINE_SORT.ASC;
	        break;
	      case DEFINE_SORT.ASC:
	        direction = DEFINE_SORT.DESC;
	        break;
	      case DEFINE_SORT.DESC:
	        direction = DEFINE_SORT.NONE;
	        break;
	    }
	    this.props.onSort(this.props.columnKey, direction);
	  },

	  getSortByText: function getSortByText() {
	    var unicodeKeys = {
	      ASC: '9650',
	      DESC: '9660'
	    };
	    return this.props.sortDirection === 'NONE' ? '' : String.fromCharCode(unicodeKeys[this.props.sortDirection]);
	  },

	  render: function render() {
	    var className = joinClasses({
	      'react-grid-HeaderCell-sortable': true,
	      'react-grid-HeaderCell-sortable--ascending': this.props.sortDirection === 'ASC',
	      'react-grid-HeaderCell-sortable--descending': this.props.sortDirection === 'DESC'
	    });

	    return React.createElement(
	      'div',
	      { className: className,
	        onClick: this.onClick,
	        style: { cursor: 'pointer' } },
	      this.props.column.name,
	      React.createElement(
	        'span',
	        { className: 'pull-right' },
	        this.getSortByText()
	      )
	    );
	  }
	});

	module.exports = SortableHeaderCell;
	module.exports.DEFINE_SORT = DEFINE_SORT;

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var joinClasses = __webpack_require__(10);
	var keyboardHandlerMixin = __webpack_require__(70);
	var SimpleTextEditor = __webpack_require__(76);
	var isFunction = __webpack_require__(47);
	__webpack_require__(34);

	var EditorContainer = React.createClass({
	  displayName: 'EditorContainer',

	  mixins: [keyboardHandlerMixin],

	  propTypes: {
	    rowIdx: React.PropTypes.number,
	    rowData: React.PropTypes.object.isRequired,
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired,
	    cellMetaData: React.PropTypes.shape({
	      selected: React.PropTypes.object.isRequired,
	      copied: React.PropTypes.object,
	      dragged: React.PropTypes.object,
	      onCellClick: React.PropTypes.func,
	      onCellDoubleClick: React.PropTypes.func,
	      onCommitCancel: React.PropTypes.func,
	      onCommit: React.PropTypes.func
	    }).isRequired,
	    column: React.PropTypes.object.isRequired,
	    height: React.PropTypes.number.isRequired
	  },

	  changeCommitted: false,

	  getInitialState: function getInitialState() {
	    return { isInvalid: false };
	  },


	  componentDidMount: function componentDidMount() {
	    var inputNode = this.getInputNode();
	    if (inputNode !== undefined) {
	      this.setTextInputFocus();
	      if (!this.getEditor().disableContainerStyles) {
	        inputNode.className += ' editor-main';
	        inputNode.style.height = this.props.height - 1 + 'px';
	      }
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (!this.changeCommitted && !this.hasEscapeBeenPressed()) {
	      this.commit({ key: 'Enter' });
	    }
	  },

	  createEditor: function createEditor() {
	    var _this = this;

	    var editorRef = function editorRef(c) {
	      return _this.editor = c;
	    };
	    var editorProps = {
	      ref: editorRef,
	      column: this.props.column,
	      value: this.getInitialValue(),
	      onCommit: this.commit,
	      rowMetaData: this.getRowMetaData(),
	      rowData: this.props.rowData,
	      height: this.props.height,
	      onBlur: this.commit,
	      onOverrideKeyDown: this.onKeyDown
	    };

	    var CustomEditor = this.props.column.editor;
	    // return custom column editor or SimpleEditor if none specified
	    if (React.isValidElement(CustomEditor)) {
	      return React.cloneElement(CustomEditor, editorProps);
	    }
	    if (isFunction(CustomEditor)) {
	      return React.createElement(CustomEditor, _extends({ ref: editorRef }, editorProps));
	    }

	    return React.createElement(SimpleTextEditor, { ref: editorRef, column: this.props.column, value: this.getInitialValue(), onBlur: this.commit, rowMetaData: this.getRowMetaData(), onKeyDown: function onKeyDown() {}, commit: function commit() {} });
	  },
	  onPressEnter: function onPressEnter() {
	    this.commit({ key: 'Enter' });
	  },
	  onPressTab: function onPressTab() {
	    this.commit({ key: 'Tab' });
	  },
	  onPressEscape: function onPressEscape(e) {
	    if (!this.editorIsSelectOpen()) {
	      this.props.cellMetaData.onCommitCancel();
	    } else {
	      // prevent event from bubbling if editor has results to select
	      e.stopPropagation();
	    }
	  },
	  onPressArrowDown: function onPressArrowDown(e) {
	    if (this.editorHasResults()) {
	      // dont want to propogate as that then moves us round the grid
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  onPressArrowUp: function onPressArrowUp(e) {
	    if (this.editorHasResults()) {
	      // dont want to propogate as that then moves us round the grid
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  onPressArrowLeft: function onPressArrowLeft(e) {
	    // prevent event propogation. this disables left cell navigation
	    if (!this.isCaretAtBeginningOfInput()) {
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  onPressArrowRight: function onPressArrowRight(e) {
	    // prevent event propogation. this disables right cell navigation
	    if (!this.isCaretAtEndOfInput()) {
	      e.stopPropagation();
	    } else {
	      this.commit(e);
	    }
	  },
	  editorHasResults: function editorHasResults() {
	    if (isFunction(this.getEditor().hasResults)) {
	      return this.getEditor().hasResults();
	    }

	    return false;
	  },
	  editorIsSelectOpen: function editorIsSelectOpen() {
	    if (isFunction(this.getEditor().isSelectOpen)) {
	      return this.getEditor().isSelectOpen();
	    }

	    return false;
	  },
	  getRowMetaData: function getRowMetaData() {
	    // clone row data so editor cannot actually change this
	    // convention based method to get corresponding Id or Name of any Name or Id property
	    if (typeof this.props.column.getRowMetaData === 'function') {
	      return this.props.column.getRowMetaData(this.props.rowData, this.props.column);
	    }
	  },
	  getEditor: function getEditor() {
	    return this.editor;
	  },
	  getInputNode: function getInputNode() {
	    return this.getEditor().getInputNode();
	  },
	  getInitialValue: function getInitialValue() {
	    var selected = this.props.cellMetaData.selected;
	    var keyCode = selected.initialKeyCode;
	    if (keyCode === 'Delete' || keyCode === 'Backspace') {
	      return '';
	    } else if (keyCode === 'Enter') {
	      return this.props.value;
	    }

	    var text = keyCode ? String.fromCharCode(keyCode) : this.props.value;
	    return text;
	  },
	  getContainerClass: function getContainerClass() {
	    return joinClasses({
	      'has-error': this.state.isInvalid === true
	    });
	  },
	  commit: function commit(args) {
	    var opts = args || {};
	    var updated = this.getEditor().getValue();
	    if (this.isNewValueValid(updated)) {
	      this.changeCommitted = true;
	      var cellKey = this.props.column.key;
	      this.props.cellMetaData.onCommit({ cellKey: cellKey, rowIdx: this.props.rowIdx, updated: updated, key: opts.key });
	    }
	  },
	  isNewValueValid: function isNewValueValid(value) {
	    if (isFunction(this.getEditor().validate)) {
	      var isValid = this.getEditor().validate(value);
	      this.setState({ isInvalid: !isValid });
	      return isValid;
	    }

	    return true;
	  },
	  setCaretAtEndOfInput: function setCaretAtEndOfInput() {
	    var input = this.getInputNode();
	    // taken from http://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
	    var txtLength = input.value.length;
	    if (input.setSelectionRange) {
	      input.setSelectionRange(txtLength, txtLength);
	    } else if (input.createTextRange) {
	      var fieldRange = input.createTextRange();
	      fieldRange.moveStart('character', txtLength);
	      fieldRange.collapse();
	      fieldRange.select();
	    }
	  },
	  isCaretAtBeginningOfInput: function isCaretAtBeginningOfInput() {
	    var inputNode = this.getInputNode();
	    return inputNode.selectionStart === inputNode.selectionEnd && inputNode.selectionStart === 0;
	  },
	  isCaretAtEndOfInput: function isCaretAtEndOfInput() {
	    var inputNode = this.getInputNode();
	    return inputNode.selectionStart === inputNode.value.length;
	  },
	  isBodyClicked: function isBodyClicked(e) {
	    var relatedTarget = this.getRelatedTarget(e);
	    return relatedTarget === null;
	  },
	  isViewportClicked: function isViewportClicked(e) {
	    var relatedTarget = this.getRelatedTarget(e);
	    return relatedTarget.className.indexOf('react-grid-Viewport') > -1;
	  },
	  isClickInisdeEditor: function isClickInisdeEditor(e) {
	    var relatedTarget = this.getRelatedTarget(e);
	    return e.currentTarget.contains(relatedTarget) || relatedTarget.className.indexOf('editing') > -1 || relatedTarget.className.indexOf('react-grid-Cell') > -1;
	  },
	  getRelatedTarget: function getRelatedTarget(e) {
	    return e.relatedTarget || e.explicitOriginalTarget || document.activeElement; // IE11
	  },
	  handleBlur: function handleBlur(e) {
	    e.stopPropagation();
	    if (this.isBodyClicked(e)) {
	      this.commit(e);
	    }

	    if (!this.isBodyClicked(e)) {
	      // prevent null reference
	      if (this.isViewportClicked(e) || !this.isClickInisdeEditor(e)) {
	        this.commit(e);
	      }
	    }
	  },
	  setTextInputFocus: function setTextInputFocus() {
	    var selected = this.props.cellMetaData.selected;
	    var keyCode = selected.initialKeyCode;
	    var inputNode = this.getInputNode();
	    inputNode.focus();
	    if (inputNode.tagName === 'INPUT') {
	      if (!this.isKeyPrintable(keyCode)) {
	        inputNode.focus();
	        inputNode.select();
	      } else {
	        inputNode.select();
	      }
	    }
	  },
	  hasEscapeBeenPressed: function hasEscapeBeenPressed() {
	    var pressed = false;
	    var escapeKey = 27;
	    if (window.event) {
	      if (window.event.keyCode === escapeKey) {
	        pressed = true;
	      } else if (window.event.which === escapeKey) {
	        pressed = true;
	      }
	    }
	    return pressed;
	  },
	  renderStatusIcon: function renderStatusIcon() {
	    if (this.state.isInvalid === true) {
	      return React.createElement('span', { className: 'glyphicon glyphicon-remove form-control-feedback' });
	    }
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: this.getContainerClass(), onBlur: this.handleBlur, onKeyDown: this.onKeyDown },
	      this.createEditor(),
	      this.renderStatusIcon()
	    );
	  }
	});

	module.exports = EditorContainer;

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  CheckboxEditor: __webpack_require__(74),
	  EditorBase: __webpack_require__(75),
	  SimpleTextEditor: __webpack_require__(76)
	};

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/prop-types */


	var focusableComponentWrapper = function focusableComponentWrapper(WrappedComponent) {
	  return function (_Component) {
	    _inherits(ComponentWrapper, _Component);

	    function ComponentWrapper() {
	      _classCallCheck(this, ComponentWrapper);

	      var _this = _possibleConstructorReturn(this, _Component.call(this));

	      _this.checkFocus = _this.checkFocus.bind(_this);
	      return _this;
	    }

	    ComponentWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	      return WrappedComponent.isSelected(this.props) !== WrappedComponent.isSelected(nextProps);
	    };

	    ComponentWrapper.prototype.componentDidMount = function componentDidMount() {
	      this.checkFocus();
	    };

	    ComponentWrapper.prototype.componentDidUpdate = function componentDidUpdate() {
	      this.checkFocus();
	    };

	    ComponentWrapper.prototype.checkFocus = function checkFocus() {
	      if (WrappedComponent.isSelected(this.props) && WrappedComponent.isScrolling(this.props)) {
	        this.focus();
	      }
	    };

	    ComponentWrapper.prototype.focus = function focus() {
	      _reactDom2['default'].findDOMNode(this).focus();
	    };

	    ComponentWrapper.prototype.render = function render() {
	      return _react2['default'].createElement(WrappedComponent, _extends({}, this.props, this.state));
	    };

	    return ComponentWrapper;
	  }(_react.Component);
	};

	exports['default'] = focusableComponentWrapper;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);

	var SimpleCellFormatter = React.createClass({
	  displayName: 'SimpleCellFormatter',

	  propTypes: {
	    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object, React.PropTypes.bool]).isRequired
	  },

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
	    return nextProps.value !== this.props.value;
	  },
	  render: function render() {
	    return React.createElement(
	      'div',
	      { title: this.props.value },
	      this.props.value
	    );
	  }
	});

	module.exports = SimpleCellFormatter;

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _GridPropHelpers = __webpack_require__(195);

	var _GridPropHelpers2 = _interopRequireDefault(_GridPropHelpers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	module.exports = {
	  test: { GridPropHelpers: _GridPropHelpers2['default'] }
	};

/***/ },
/* 195 */
/***/ function(module, exports) {

	'use strict';

	var _rows = [];
	for (var i = 0; i < 1000; i++) {
	  _rows.push({
	    id: i,
	    title: 'Title ' + i,
	    count: i * 1000
	  });
	}
	module.exports = {
	  columns: [{
	    key: 'id',
	    name: 'ID',
	    width: 100
	  }, {
	    key: 'title',
	    name: 'Title',
	    width: 100
	  }, {
	    key: 'count',
	    name: 'Count',
	    width: 100
	  }],
	  rowGetter: function rowGetter(i) {
	    return _rows[i];
	  },
	  rowsCount: function rowsCount() {
	    return _rows.length;
	  },
	  cellMetaData: {
	    selected: { idx: 2, rowIdx: 3 },
	    dragged: null,
	    copied: null
	  }
	};

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _RowComparer = __webpack_require__(71);

	var _RowComparer2 = _interopRequireDefault(_RowComparer);

	var _RowsContainer = __webpack_require__(73);

	var _RowsContainer2 = _interopRequireDefault(_RowsContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Grid = __webpack_require__(182);


	module.exports = Grid;
	module.exports.Row = __webpack_require__(44);
	module.exports.Cell = __webpack_require__(68);
	module.exports.HeaderCell = __webpack_require__(69);
	module.exports.RowComparer = _RowComparer2['default'];
	module.exports.RowsContainer = _RowsContainer2['default'];
	module.exports.editors = __webpack_require__(191);
	module.exports.utils = __webpack_require__(197);
	module.exports.shapes = __webpack_require__(181);
	module.exports._constants = __webpack_require__(67);
	module.exports._helpers = __webpack_require__(194);

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  isEmptyArray: __webpack_require__(198),
	  isEmptyObject: __webpack_require__(199),
	  isFunction: __webpack_require__(47),
	  isImmutableCollection: __webpack_require__(200),
	  getMixedTypeValueRetriever: __webpack_require__(201),
	  isColumnsImmutable: __webpack_require__(77)
	};

/***/ },
/* 198 */
/***/ function(module, exports) {

	"use strict";

	var isEmptyArray = function isEmptyArray(obj) {
	  return Array.isArray(obj) && obj.length === 0;
	};

	module.exports = isEmptyArray;

/***/ },
/* 199 */
/***/ function(module, exports) {

	"use strict";

	function isEmpty(obj) {
	  return Object.keys(obj).length === 0 && obj.constructor === Object;
	}

	module.exports = isEmpty;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _immutable = __webpack_require__(48);

	var isImmutableCollection = function isImmutableCollection(objToVerify) {
	  return _immutable.Iterable.isIterable(objToVerify);
	};

	module.exports = isImmutableCollection;

/***/ },
/* 201 */
/***/ function(module, exports) {

	"use strict";

	var getMixedTypeValueRetriever = function getMixedTypeValueRetriever(isImmutable) {
	  var retObj = {};
	  var retriever = function retriever(item, key) {
	    return item[key];
	  };
	  var immutableRetriever = function immutableRetriever(immutable, key) {
	    return immutable.get(key);
	  };

	  retObj.getValue = isImmutable ? immutableRetriever : retriever;

	  return retObj;
	};

	module.exports = getMixedTypeValueRetriever;

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".react-grid-Cell{background-color:#fff;padding-left:8px;padding-right:8px;border-right:1px solid #eee;border-bottom:1px solid #ddd}.react-grid-Cell:focus{outline:2px solid #66afe9;outline-offset:-2px}.react-grid-Cell:focus .drag-handle{position:absolute;bottom:-5px;right:-4px;background:#66afe9;width:8px;height:8px;border:1px solid #fff;border-right:0;border-bottom:0;z-index:8;cursor:crosshair;cursor:-webkit-grab}.react-grid-Cell:not(.editing) .react-grid-Cell__value{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;position:relative;top:50%;transform:translateY(-50%)}.react-grid-Cell.readonly{background-color:#000}.react-grid-Cell.copied{background:rgba(0,0,255,.2)!important;-webkit-transition:background .5s}.react-grid-Cell--locked:last-of-type{border-right:1px solid #ddd;box-shadow:none;z-index:99}.react-grid-Cell:hover:focus .drag-handle .glyphicon-arrow-down{display:\"block\"}.react-grid-Cell.is-dragged-over-down{border-right:1px dashed #000;border-left:1px dashed #000;border-bottom:1px dashed #000}.react-grid-Cell.is-dragged-over-up{border-right:1px dashed #000;border-left:1px dashed #000;border-top:1px dashed #000}.react-grid-Cell.is-dragged-over-up .drag-handle{top:-5px}.react-grid-Cell:hover{background:#eee}.react-grid-cell .form-control-feedback{color:#a94442;position:absolute;top:0;right:10px;z-index:1000000;display:block;width:34px;height:34px}.react-grid-Cell.was-dragged-over{border-right:1px dashed #000;border-left:1px dashed #000}.react-grid-Cell:hover:focus .drag-handle{position:absolute;bottom:-8px;right:-7px;background:#fff;width:16px;height:16px;border:1px solid #66afe9;z-index:8;cursor:crosshair;cursor:-webkit-grab}.react-grid-Row.row-selected .react-grid-Cell{background-color:#dbecfa}.react-grid-Cell.editing{padding:0;overflow:visible!important}.react-grid-Cell.editing .has-error input{border:2px solid red!important;border-radius:2px!important}.react-grid-Cell__value ul{margin-top:0;margin-bottom:0;display:inline-block}.react-grid-Cell__value .btn-sm{padding:0}.cell-tooltip{position:relative;display:inline-block}.cell-tooltip .cell-tooltip-text{visibility:hidden;width:150px;background-color:#000;color:#fff;text-align:center;border-radius:6px;padding:5px 0;position:absolute;z-index:1;bottom:-150%;left:50%;margin-left:-60px;opacity:0;transition:opacity 1s}.cell-tooltip:hover .cell-tooltip-text{visibility:visible;opacity:.8}.cell-tooltip .cell-tooltip-text:after{content:\" \";position:absolute;bottom:100%;left:50%;margin-left:-5px;border-width:5px;border-style:solid;border-color:transparent transparent #000}.react-grid-Canvas.opaque .react-grid-Cell.cell-tooltip:hover .cell-tooltip-text{visibility:hidden}", ""]);

	// exports


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".radio-custom,.react-grid-checkbox{opacity:0;position:absolute}.radio-custom,.radio-custom-label,.react-grid-checkbox,.react-grid-checkbox-label{display:inline-block;vertical-align:middle;margin:10px;cursor:pointer}.radio-custom-label,.react-grid-checkbox-label{position:relative}.radio-custom+.radio-custom-label:before,.react-grid-checkbox+.react-grid-checkbox-label:before{content:\"\";background:#fff;border:2px solid #ddd;display:inline-block;vertical-align:middle;width:20px;height:20px;text-align:center}.react-grid-checkbox:checked+.react-grid-checkbox-label:before{background:#639;box-shadow:inset 0 0 0 4px #fff}.radio-custom:focus+.radio-custom-label,.react-grid-checkbox:focus+.react-grid-checkbox-label{outline:1px solid #ddd}.react-grid-HeaderCell input[type=checkbox]{z-index:99999}.react-grid-HeaderCell>.react-grid-checkbox-container{padding:0 10px}.react-grid-HeaderCell>.react-grid-checkbox-container>.react-grid-checkbox-label{margin:0}.radio-custom+.radio-custom-label:before{border-radius:50%}.radio-custom:checked+.radio-custom-label:before{background:#ccc;box-shadow:inset 0 0 0 4px #fff}", ""]);

	// exports


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".react-grid-Container{clear:both;margin-top:0;padding:0}.react-grid-Main{background-color:#fff;color:inherit;padding:0;outline:1px solid #e7eaec;clear:both}.react-grid-Grid{border:1px solid #ddd}.react-grid-Canvas,.react-grid-Grid{background-color:#fff}.react-grid-Canvas.opaque .react-grid-Cell:not(.editing){opacity:.4;transition:opacity .25s ease-in-out;-moz-transition:opacity .25s ease-in-out;-webkit-transition:opacity .25s ease-in-out}.react-grid-Cell input.editor-main,select.editor-main{display:block;width:100%;height:34px;padding:6px 12px;font-size:14px;line-height:1.42857143;color:#555;background-color:#fff;background-image:none;border:1px solid #ccc;border-radius:4px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075);box-shadow:inset 0 1px 1px rgba(0,0,0,.075);-webkit-transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out;-o-transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}input.editor-main:focus,select.editor-main:focus{border-color:#66afe9;border:2px solid #66afe9;background:#eee;border-radius:4px}.react-grid-Cell input.editor-main::-moz-placeholder,select.editor-main::-moz-placeholder{color:#999;opacity:1}.react-grid-Cell input.editor-main:-ms-input-placeholder,select.editor-main:-ms-input-placeholder{color:#999}.react-grid-Cell input.editor-main::-webkit-input-placeholder,select.editor-main::-webkit-input-placeholder{color:#999}.react-grid-Cell input.editor-main[disabled],.react-grid-Cell input.editor-main[readonly],fieldset[disabled] .react-grid-Cell input.editor-main,fieldset[disabled] select.editor-main,select.editor-main[disabled],select.editor-main[readonly]{cursor:not-allowed;background-color:#eee;opacity:1}textarea.react-grid-Cell input.editor-main,textareaselect.editor-main{height:auto}.react-grid-ScrollShim{z-index:10002}", ""]);

	// exports


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".react-grid-Header{box-shadow:0 0 4px 0 #ddd;background:#f9f9f9}.react-grid-Header--resizing{cursor:ew-resize}.react-grid-HeaderCell,.react-grid-HeaderRow{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.react-grid-HeaderCell{background:#f9f9f9;padding:8px;font-weight:700;border-right:1px solid #ddd;border-bottom:1px solid #ddd}.react-grid-HeaderCell__value{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;position:relative;top:50%;transform:translateY(-50%)}.react-grid-HeaderCell__resizeHandle:hover{cursor:ew-resize;background:#ddd}.react-grid-HeaderCell--locked:last-of-type{box-shadow:none}.react-grid-HeaderCell--resizing .react-grid-HeaderCell__resizeHandle{background:#ddd}.react-grid-HeaderCell__draggable{cursor:col-resize}", ""]);

	// exports


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports


	// module
	exports.push([module.id, ".react-grid-Row.row-context-menu .react-grid-Cell,.react-grid-Row:hover .react-grid-Cell{background-color:#f2f2f2}.react-grid-Row:hover .rdg-row-index{display:none}.react-grid-Row:hover .rdg-actions-checkbox{display:block}.react-grid-Row:hover .rdg-drag-row-handle{cursor:move;cursor:grab;cursor:-moz-grab;cursor:-webkit-grab;width:12px;height:30px;margin-left:3px;background-image:url(\"data:image/svg+xml;base64, PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjlweCIgaGVpZ2h0PSIyOXB4IiB2aWV3Qm94PSIwIDAgOSAyOSIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMzkgKDMxNjY3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5kcmFnIGljb248L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iQWN0dWFsaXNhdGlvbi12MiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkRlc2t0b3AiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNS4wMDAwMDAsIC0yNjIuMDAwMDAwKSIgZmlsbD0iI0Q4RDhEOCI+CiAgICAgICAgICAgIDxnIGlkPSJJbnRlcmFjdGlvbnMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1LjAwMDAwMCwgMjU4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlJvdy1Db250cm9scyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9ImRyYWctaWNvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsIDIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSIyIiBjeT0iMiIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSI3IiBjeT0iMiIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSIyIiBjeT0iNyIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSI3IiBjeT0iNyIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSIyIiBjeT0iMTIiIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTMwIiBjeD0iNyIgY3k9IjEyIiByPSIyIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0zMCIgY3g9IjIiIGN5PSIxNyIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSI3IiBjeT0iMTciIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTMwIiBjeD0iMiIgY3k9IjIyIiByPSIyIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBpZD0iT3ZhbC0zMCIgY3g9IjciIGN5PSIyMiIgcj0iMiI+PC9jaXJjbGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtMzAiIGN4PSIyIiBjeT0iMjciIHI9IjIiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJPdmFsLTMwIiBjeD0iNyIgY3k9IjI3IiByPSIyIj48L2NpcmNsZT4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==\");background-repeat:no-repeat}.react-grid-Row.row-selected,.react-grid-Row .row-selected{background-color:#dbecfa}.react-grid-row-group .row-expand-icon:hover{color:#777}.react-grid-row-index{padding:0 18px}.rdg-row-index{display:block;text-align:center}.rdg-row-actions-cell{padding:0}.rdg-actions-checkbox{display:none;text-align:center}.rdg-actions-checkbox.selected{display:block}.rdg-dragging{cursor:-webkit-grabbing;cursor:-moz-grabbing;cursor:grabbing}.rdg-dragged-row{border-bottom:1px solid #000}", ""]);

	// exports


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	function invariant(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	module.exports = invariant;

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyMirror
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(207);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function (obj) {
	  var ret = {};
	  var key;
	  !(obj instanceof Object && !Array.isArray(obj)) ?  false ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : undefined;
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(14),
	    root = __webpack_require__(8);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(232),
	    hashDelete = __webpack_require__(233),
	    hashGet = __webpack_require__(234),
	    hashHas = __webpack_require__(235),
	    hashSet = __webpack_require__(236);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(14),
	    root = __webpack_require__(8);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(28),
	    stackClear = __webpack_require__(255),
	    stackDelete = __webpack_require__(256),
	    stackGet = __webpack_require__(257),
	    stackHas = __webpack_require__(258),
	    stackSet = __webpack_require__(259);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(8);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(14),
	    root = __webpack_require__(8);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 215 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(109),
	    isArray = __webpack_require__(12);

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	module.exports = baseGetAllKeys;


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(22),
	    isObjectLike = __webpack_require__(18);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(219),
	    isObjectLike = __webpack_require__(18);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(212),
	    equalArrays = __webpack_require__(79),
	    equalByTag = __webpack_require__(225),
	    equalObjects = __webpack_require__(226),
	    getTag = __webpack_require__(230),
	    isArray = __webpack_require__(12),
	    isBuffer = __webpack_require__(82),
	    isTypedArray = __webpack_require__(85);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = objIsArr ? arrayTag : getTag(object),
	      othTag = othIsArr ? arrayTag : getTag(other);

	  objTag = objTag == argsTag ? objectTag : objTag;
	  othTag = othTag == argsTag ? objectTag : othTag;

	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer(object)) {
	    if (!isBuffer(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(83),
	    isMasked = __webpack_require__(238),
	    isObject = __webpack_require__(26),
	    toSource = __webpack_require__(81);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(22),
	    isLength = __webpack_require__(84),
	    isObjectLike = __webpack_require__(18);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(111),
	    nativeKeys = __webpack_require__(250);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 223 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(8);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(35),
	    Uint8Array = __webpack_require__(213),
	    eq = __webpack_require__(25),
	    equalArrays = __webpack_require__(79),
	    mapToArray = __webpack_require__(249),
	    setToArray = __webpack_require__(66);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	    case numberTag:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq(+object, +other);

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var getAllKeys = __webpack_require__(227);

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      objProps = getAllKeys(object),
	      objLength = objProps.length,
	      othProps = getAllKeys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetAllKeys = __webpack_require__(216),
	    getSymbols = __webpack_require__(229),
	    keys = __webpack_require__(261);

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return baseGetAllKeys(object, keys, getSymbols);
	}

	module.exports = getAllKeys;


/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(35);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(107),
	    stubArray = __webpack_require__(262);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	module.exports = getSymbols;


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(209),
	    Map = __webpack_require__(49),
	    Promise = __webpack_require__(211),
	    Set = __webpack_require__(106),
	    WeakMap = __webpack_require__(214),
	    baseGetTag = __webpack_require__(22),
	    toSource = __webpack_require__(81);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 231 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(32);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	  this.size = 0;
	}

	module.exports = hashClear;


/***/ },
/* 233 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = hashDelete;


/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(32);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(32);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(32);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 237 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(224);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 239 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	  this.size = 0;
	}

	module.exports = listCacheClear;


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(29);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(29);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(29);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(29);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(210),
	    ListCache = __webpack_require__(28),
	    Map = __webpack_require__(49);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(31);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  var result = getMapData(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	module.exports = mapCacheDelete;


/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(31);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(31);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(31);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 249 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(112);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(80);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ },
/* 252 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 253 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 254 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(28);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	  this.size = 0;
	}

	module.exports = stackClear;


/***/ },
/* 256 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	module.exports = stackDelete;


/***/ },
/* 257 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 258 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(28),
	    Map = __webpack_require__(49),
	    MapCache = __webpack_require__(50);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache) {
	    var pairs = data.__data__;
	    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(218);

	/**
	 * Performs a deep comparison between two values to determine if they are
	 * equivalent.
	 *
	 * **Note:** This method supports comparing arrays, array buffers, booleans,
	 * date objects, error objects, maps, numbers, `Object` objects, regexes,
	 * sets, strings, symbols, and typed arrays. `Object` objects are compared
	 * by their own, not inherited, enumerable properties. Functions and DOM
	 * nodes are compared by strict equality, i.e. `===`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.isEqual(object, other);
	 * // => true
	 *
	 * object === other;
	 * // => false
	 */
	function isEqual(value, other) {
	  return baseIsEqual(value, other);
	}

	module.exports = isEqual;


/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	var arrayLikeKeys = __webpack_require__(108),
	    baseKeys = __webpack_require__(222),
	    isArrayLike = __webpack_require__(42);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
	}

	module.exports = keys;


/***/ },
/* 262 */
/***/ function(module, exports) {

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	module.exports = stubArray;


/***/ },
/* 263 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ }
/******/ ])
});
;