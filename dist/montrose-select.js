(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MontroseSelect = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],2:[function(require,module,exports){
'use strict';

var copy       = require('es5-ext/object/copy')
  , map        = require('es5-ext/object/map')
  , callable   = require('es5-ext/object/valid-callable')
  , validValue = require('es5-ext/object/valid-value')

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, bindTo) {
	var value = validValue(desc) && callable(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, (bindTo == null) ? this : this[bindTo]);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, bindTo*/) {
	var bindTo = arguments[1];
	return map(props, function (desc, name) {
		return define(name, desc, bindTo);
	});
};

},{"es5-ext/object/copy":16,"es5-ext/object/map":24,"es5-ext/object/valid-callable":29,"es5-ext/object/valid-value":30}],3:[function(require,module,exports){
'use strict';

var assign        = require('es5-ext/object/assign')
  , normalizeOpts = require('es5-ext/object/normalize-options')
  , isCallable    = require('es5-ext/object/is-callable')
  , contains      = require('es5-ext/string/#/contains')

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":13,"es5-ext/object/is-callable":19,"es5-ext/object/normalize-options":25,"es5-ext/string/#/contains":31}],4:[function(require,module,exports){
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear

'use strict';

var value = require('../../object/valid-value');

module.exports = function () {
	value(this).length = 0;
	return this;
};

},{"../../object/valid-value":30}],5:[function(require,module,exports){
'use strict';

var toPosInt = require('../../number/to-pos-integer')
  , value    = require('../../object/valid-value')

  , indexOf = Array.prototype.indexOf
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , abs = Math.abs, floor = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, l, fromIndex, val;
	if (searchElement === searchElement) { //jslint: ignore
		return indexOf.apply(this, arguments);
	}

	l = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < l; ++i) {
		if (hasOwnProperty.call(this, i)) {
			val = this[i];
			if (val !== val) return i; //jslint: ignore
		}
	}
	return -1;
};

},{"../../number/to-pos-integer":11,"../../object/valid-value":30}],6:[function(require,module,exports){
'use strict';

var toString = Object.prototype.toString

  , id = toString.call((function () { return arguments; }()));

module.exports = function (x) { return (toString.call(x) === id); };

},{}],7:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Math.sign
	: require('./shim');

},{"./is-implemented":8,"./shim":9}],8:[function(require,module,exports){
'use strict';

module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== 'function') return false;
	return ((sign(10) === 1) && (sign(-20) === -1));
};

},{}],9:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || (value === 0)) return value;
	return (value > 0) ? 1 : -1;
};

},{}],10:[function(require,module,exports){
'use strict';

var sign = require('../math/sign')

  , abs = Math.abs, floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if ((value === 0) || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};

},{"../math/sign":7}],11:[function(require,module,exports){
'use strict';

var toInteger = require('./to-integer')

  , max = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };

},{"./to-integer":10}],12:[function(require,module,exports){
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order

'use strict';

var callable = require('./valid-callable')
  , value    = require('./valid-value')

  , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== 'function') method = list[method];
		return call.call(method, list, function (key, index) {
			if (!propertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

},{"./valid-callable":29,"./valid-value":30}],13:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.assign
	: require('./shim');

},{"./is-implemented":14,"./shim":15}],14:[function(require,module,exports){
'use strict';

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};

},{}],15:[function(require,module,exports){
'use strict';

var keys  = require('../keys')
  , value = require('../valid-value')

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":21,"../valid-value":30}],16:[function(require,module,exports){
'use strict';

var assign = require('./assign')
  , value  = require('./valid-value');

module.exports = function (obj) {
	var copy = Object(value(obj));
	if (copy !== obj) return copy;
	return assign({}, obj);
};

},{"./assign":13,"./valid-value":30}],17:[function(require,module,exports){
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

'use strict';

var create = Object.create, shim;

if (!require('./set-prototype-of/is-implemented')()) {
	shim = require('./set-prototype-of/shim');
}

module.exports = (function () {
	var nullObject, props, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	props = {};
	desc = { configurable: false, enumerable: false, writable: true,
		value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === '__proto__') {
			props[name] = { configurable: true, enumerable: false, writable: true,
				value: undefined };
			return;
		}
		props[name] = desc;
	});
	Object.defineProperties(nullObject, props);

	Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
		enumerable: false, writable: false, value: nullObject });

	return function (prototype, props) {
		return create((prototype === null) ? nullObject : prototype, props);
	};
}());

},{"./set-prototype-of/is-implemented":27,"./set-prototype-of/shim":28}],18:[function(require,module,exports){
'use strict';

module.exports = require('./_iterate')('forEach');

},{"./_iterate":12}],19:[function(require,module,exports){
// Deprecated

'use strict';

module.exports = function (obj) { return typeof obj === 'function'; };

},{}],20:[function(require,module,exports){
'use strict';

var map = { function: true, object: true };

module.exports = function (x) {
	return ((x != null) && map[typeof x]) || false;
};

},{}],21:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.keys
	: require('./shim');

},{"./is-implemented":22,"./shim":23}],22:[function(require,module,exports){
'use strict';

module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};

},{}],23:[function(require,module,exports){
'use strict';

var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};

},{}],24:[function(require,module,exports){
'use strict';

var callable = require('./valid-callable')
  , forEach  = require('./for-each')

  , call = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var o = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, obj, index) {
		o[key] = call.call(cb, thisArg, value, key, obj, index);
	});
	return o;
};

},{"./for-each":18,"./valid-callable":29}],25:[function(require,module,exports){
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};

},{}],26:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.setPrototypeOf
	: require('./shim');

},{"./is-implemented":27,"./shim":28}],27:[function(require,module,exports){
'use strict';

var create = Object.create, getPrototypeOf = Object.getPrototypeOf
  , x = {};

module.exports = function (/*customCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf
	  , customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== 'function') return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
};

},{}],28:[function(require,module,exports){
// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554

'use strict';

var isObject      = require('../is-object')
  , value         = require('../valid-value')

  , isPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty = Object.defineProperty
  , nullDesc = { configurable: true, enumerable: false, writable: true,
		value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if ((prototype === null) || isObject(prototype)) return obj;
	throw new TypeError('Prototype must be null or an object');
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, 'level', { configurable: false,
		enumerable: false, writable: false, value: status.level });
}((function () {
	var x = Object.create(null), y = {}, set
	  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

	if (desc) {
		try {
			set = desc.set; // Opera crashes at this point
			set.call(x, y);
		} catch (ignore) { }
		if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
	}

	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 2 };

	x = {};
	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 1 };

	return false;
}())));

require('../create');

},{"../create":17,"../is-object":20,"../valid-value":30}],29:[function(require,module,exports){
'use strict';

module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

},{}],30:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{}],31:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? String.prototype.contains
	: require('./shim');

},{"./is-implemented":32,"./shim":33}],32:[function(require,module,exports){
'use strict';

var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};

},{}],33:[function(require,module,exports){
'use strict';

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],34:[function(require,module,exports){
'use strict';

var toString = Object.prototype.toString

  , id = toString.call('');

module.exports = function (x) {
	return (typeof x === 'string') || (x && (typeof x === 'object') &&
		((x instanceof String) || (toString.call(x) === id))) || false;
};

},{}],35:[function(require,module,exports){
'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , contains       = require('es5-ext/string/#/contains')
  , d              = require('d')
  , Iterator       = require('./')

  , defineProperty = Object.defineProperty
  , ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
	Iterator.call(this, arr);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else if (contains.call(kind, 'key')) kind = 'key';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(ArrayIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
		return i;
	}),
	toString: d(function () { return '[object Array Iterator]'; })
});

},{"./":38,"d":3,"es5-ext/object/set-prototype-of":26,"es5-ext/string/#/contains":31}],36:[function(require,module,exports){
'use strict';

var isArguments = require('es5-ext/function/is-arguments')
  , callable    = require('es5-ext/object/valid-callable')
  , isString    = require('es5-ext/string/is-string')
  , get         = require('./get')

  , isArray = Array.isArray, call = Function.prototype.call
  , some = Array.prototype.some;

module.exports = function (iterable, cb/*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = 'array';
	else if (isString(iterable)) mode = 'string';
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () { broken = true; };
	if (mode === 'array') {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			if (broken) return true;
		});
		return;
	}
	if (mode === 'string') {
		l = iterable.length;
		for (i = 0; i < l; ++i) {
			char = iterable[i];
			if ((i + 1) < l) {
				code = char.charCodeAt(0);
				if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};

},{"./get":37,"es5-ext/function/is-arguments":6,"es5-ext/object/valid-callable":29,"es5-ext/string/is-string":34}],37:[function(require,module,exports){
'use strict';

var isArguments    = require('es5-ext/function/is-arguments')
  , isString       = require('es5-ext/string/is-string')
  , ArrayIterator  = require('./array')
  , StringIterator = require('./string')
  , iterable       = require('./valid-iterable')
  , iteratorSymbol = require('es6-symbol').iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};

},{"./array":35,"./string":40,"./valid-iterable":41,"es5-ext/function/is-arguments":6,"es5-ext/string/is-string":34,"es6-symbol":47}],38:[function(require,module,exports){
'use strict';

var clear    = require('es5-ext/array/#/clear')
  , assign   = require('es5-ext/object/assign')
  , callable = require('es5-ext/object/valid-callable')
  , value    = require('es5-ext/object/valid-value')
  , d        = require('d')
  , autoBind = require('d/auto-bind')
  , Symbol   = require('es6-symbol')

  , defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) return new Iterator(list, context);
	defineProperties(this, {
		__list__: d('w', value(list)),
		__context__: d('w', context),
		__nextIndex__: d('w', 0)
	});
	if (!context) return;
	callable(context.on);
	context.on('_add', this._onAdd);
	context.on('_delete', this._onDelete);
	context.on('_clear', this._onClear);
};

defineProperties(Iterator.prototype, assign({
	constructor: d(Iterator),
	_next: d(function () {
		var i;
		if (!this.__list__) return;
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) return i;
		}
		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
		this._unBind();
	}),
	next: d(function () { return this._createResult(this._next()); }),
	_createResult: d(function (i) {
		if (i === undefined) return { done: true, value: undefined };
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d(function (i) { return this.__list__[i]; }),
	_unBind: d(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) return;
		this.__context__.off('_add', this._onAdd);
		this.__context__.off('_delete', this._onDelete);
		this.__context__.off('_clear', this._onClear);
		this.__context__ = null;
	}),
	toString: d(function () { return '[object Iterator]'; })
}, autoBind({
	_onAdd: d(function (index) {
		if (index >= this.__nextIndex__) return;
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty(this, '__redo__', d('c', [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) this.__redo__[i] = ++redo;
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d(function (index) {
		var i;
		if (index >= this.__nextIndex__) return;
		--this.__nextIndex__;
		if (!this.__redo__) return;
		i = this.__redo__.indexOf(index);
		if (i !== -1) this.__redo__.splice(i, 1);
		this.__redo__.forEach(function (redo, i) {
			if (redo > index) this.__redo__[i] = --redo;
		}, this);
	}),
	_onClear: d(function () {
		if (this.__redo__) clear.call(this.__redo__);
		this.__nextIndex__ = 0;
	})
})));

defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
	return this;
}));
defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));

},{"d":3,"d/auto-bind":2,"es5-ext/array/#/clear":4,"es5-ext/object/assign":13,"es5-ext/object/valid-callable":29,"es5-ext/object/valid-value":30,"es6-symbol":47}],39:[function(require,module,exports){
'use strict';

var isArguments    = require('es5-ext/function/is-arguments')
  , isString       = require('es5-ext/string/is-string')
  , iteratorSymbol = require('es6-symbol').iterator

  , isArray = Array.isArray;

module.exports = function (value) {
	if (value == null) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return (typeof value[iteratorSymbol] === 'function');
};

},{"es5-ext/function/is-arguments":6,"es5-ext/string/is-string":34,"es6-symbol":47}],40:[function(require,module,exports){
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , d              = require('d')
  , Iterator       = require('./')

  , defineProperty = Object.defineProperty
  , StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) return new StringIterator(str);
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, '__length__', d('', str.length));

};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

StringIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(StringIterator),
	_next: d(function () {
		if (!this.__list__) return;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
		return char;
	}),
	toString: d(function () { return '[object String Iterator]'; })
});

},{"./":38,"d":3,"es5-ext/object/set-prototype-of":26}],41:[function(require,module,exports){
'use strict';

var isIterable = require('./is-iterable');

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};

},{"./is-iterable":39}],42:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? Set : require('./polyfill');

},{"./is-implemented":43,"./polyfill":46}],43:[function(require,module,exports){
'use strict';

module.exports = function () {
	var set, iterator, result;
	if (typeof Set !== 'function') return false;
	set = new Set(['raz', 'dwa', 'trzy']);
	if (String(set) !== '[object Set]') return false;
	if (set.size !== 3) return false;
	if (typeof set.add !== 'function') return false;
	if (typeof set.clear !== 'function') return false;
	if (typeof set.delete !== 'function') return false;
	if (typeof set.entries !== 'function') return false;
	if (typeof set.forEach !== 'function') return false;
	if (typeof set.has !== 'function') return false;
	if (typeof set.keys !== 'function') return false;
	if (typeof set.values !== 'function') return false;

	iterator = set.values();
	result = iterator.next();
	if (result.done !== false) return false;
	if (result.value !== 'raz') return false;

	return true;
};

},{}],44:[function(require,module,exports){
// Exports true if environment provides native `Set` implementation,
// whatever that is.

'use strict';

module.exports = (function () {
	if (typeof Set === 'undefined') return false;
	return (Object.prototype.toString.call(Set.prototype) === '[object Set]');
}());

},{}],45:[function(require,module,exports){
'use strict';

var setPrototypeOf    = require('es5-ext/object/set-prototype-of')
  , contains          = require('es5-ext/string/#/contains')
  , d                 = require('d')
  , Iterator          = require('es6-iterator')
  , toStringTagSymbol = require('es6-symbol').toStringTag

  , defineProperty = Object.defineProperty
  , SetIterator;

SetIterator = module.exports = function (set, kind) {
	if (!(this instanceof SetIterator)) return new SetIterator(set, kind);
	Iterator.call(this, set.__setData__, set);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(SetIterator, Iterator);

SetIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(SetIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		return [this.__list__[i], this.__list__[i]];
	}),
	toString: d(function () { return '[object Set Iterator]'; })
});
defineProperty(SetIterator.prototype, toStringTagSymbol, d('c', 'Set Iterator'));

},{"d":3,"es5-ext/object/set-prototype-of":26,"es5-ext/string/#/contains":31,"es6-iterator":38,"es6-symbol":47}],46:[function(require,module,exports){
'use strict';

var clear          = require('es5-ext/array/#/clear')
  , eIndexOf       = require('es5-ext/array/#/e-index-of')
  , setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , callable       = require('es5-ext/object/valid-callable')
  , d              = require('d')
  , ee             = require('event-emitter')
  , Symbol         = require('es6-symbol')
  , iterator       = require('es6-iterator/valid-iterable')
  , forOf          = require('es6-iterator/for-of')
  , Iterator       = require('./lib/iterator')
  , isNative       = require('./is-native-implemented')

  , call = Function.prototype.call
  , defineProperty = Object.defineProperty, getPrototypeOf = Object.getPrototypeOf
  , SetPoly, getValues, NativeSet;

if (isNative) NativeSet = Set;

module.exports = SetPoly = function Set(/*iterable*/) {
	var iterable = arguments[0], self;
	if (!(this instanceof SetPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf) self = setPrototypeOf(new NativeSet(), getPrototypeOf(this));
	else self = this;
	if (iterable != null) iterator(iterable);
	defineProperty(self, '__setData__', d('c', []));
	if (!iterable) return self;
	forOf(iterable, function (value) {
		if (eIndexOf.call(this, value) !== -1) return;
		this.push(value);
	}, self.__setData__);
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(SetPoly, NativeSet);
	SetPoly.prototype = Object.create(NativeSet.prototype, { constructor: d(SetPoly) });
}

ee(Object.defineProperties(SetPoly.prototype, {
	add: d(function (value) {
		if (this.has(value)) return this;
		this.emit('_add', this.__setData__.push(value) - 1, value);
		return this;
	}),
	clear: d(function () {
		if (!this.__setData__.length) return;
		clear.call(this.__setData__);
		this.emit('_clear');
	}),
	delete: d(function (value) {
		var index = eIndexOf.call(this.__setData__, value);
		if (index === -1) return false;
		this.__setData__.splice(index, 1);
		this.emit('_delete', index, value);
		return true;
	}),
	entries: d(function () { return new Iterator(this, 'key+value'); }),
	forEach: d(function (cb/*, thisArg*/) {
		var thisArg = arguments[1], iterator, result, value;
		callable(cb);
		iterator = this.values();
		result = iterator._next();
		while (result !== undefined) {
			value = iterator._resolve(result);
			call.call(cb, thisArg, value, value, this);
			result = iterator._next();
		}
	}),
	has: d(function (value) {
		return (eIndexOf.call(this.__setData__, value) !== -1);
	}),
	keys: d(getValues = function () { return this.values(); }),
	size: d.gs(function () { return this.__setData__.length; }),
	values: d(function () { return new Iterator(this); }),
	toString: d(function () { return '[object Set]'; })
}));
defineProperty(SetPoly.prototype, Symbol.iterator, d(getValues));
defineProperty(SetPoly.prototype, Symbol.toStringTag, d('c', 'Set'));

},{"./is-native-implemented":44,"./lib/iterator":45,"d":3,"es5-ext/array/#/clear":4,"es5-ext/array/#/e-index-of":5,"es5-ext/object/set-prototype-of":26,"es5-ext/object/valid-callable":29,"es6-iterator/for-of":36,"es6-iterator/valid-iterable":41,"es6-symbol":47,"event-emitter":52}],47:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? Symbol : require('./polyfill');

},{"./is-implemented":48,"./polyfill":50}],48:[function(require,module,exports){
'use strict';

var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};

},{}],49:[function(require,module,exports){
'use strict';

module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};

},{}],50:[function(require,module,exports){
// ES2015 Symbol polyfill for environments that do not support it (or partially support it)

'use strict';

var d              = require('d')
  , validateSymbol = require('./validate-symbol')

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// If there's native implementation of given symbol, let's fallback to it
	// to ensure proper interoperability with other native functions e.g. Array.from
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

},{"./validate-symbol":51,"d":3}],51:[function(require,module,exports){
'use strict';

var isSymbol = require('./is-symbol');

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":49}],52:[function(require,module,exports){
'use strict';

var d        = require('d')
  , callable = require('es5-ext/object/valid-callable')

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

},{"d":3,"es5-ext/object/valid-callable":29}],53:[function(require,module,exports){
!function(global, factory) {
    'object' == typeof exports && 'undefined' != typeof module ? factory(exports) : 'function' == typeof define && define.amd ? define([ 'exports' ], factory) : factory(global.preact = global.preact || {});
}(this, function(exports) {
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
        this.key = attributes && attributes.key;
    }
    function h(nodeName, attributes) {
        var lastSimple, child, simple, i, children = [];
        for (i = arguments.length; i-- > 2; ) stack.push(arguments[i]);
        if (attributes && attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--; ) stack.push(child[i]); else if (null != child && child !== !1) {
            if ('number' == typeof child || child === !0) child = String(child);
            simple = 'string' == typeof child;
            if (simple && lastSimple) children[children.length - 1] += child; else {
                children.push(child);
                lastSimple = simple;
            }
        }
        var p = new VNode(nodeName, attributes || void 0, children);
        if (options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        if (props) for (var i in props) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        return extend({}, obj);
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function isFunction(obj) {
        return 'function' == typeof obj;
    }
    function isString(obj) {
        return 'string' == typeof obj;
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.');
        return function(e) {
            var t = e && e.target || this, state = {}, obj = state, v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e, i = 0;
            for (;i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
            obj[path[i]] = v;
            component.setState(state);
        };
    }
    function enqueueRender(component) {
        if (!component._dirty && (component._dirty = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p, list = items;
        items = [];
        while (p = list.pop()) if (p._dirty) renderComponent(p);
    }
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
    }
    function isSameNodeType(node, vnode) {
        if (isString(vnode)) return node instanceof Text;
        if (isString(vnode.nodeName)) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode); else ;
    }
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
    }
    function getNodeProps(vnode) {
        var props = clone(vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('class' === name && value && 'object' == typeof value) value = hashToClassName(value);
        if ('key' === name) ; else if ('class' === name && !isSvg) node.className = value || ''; else if ('style' === name) {
            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) node.innerHTML = value && value.__html || ''; else if ('o' == name[0] && 'n' == name[1]) {
            var l = node._listeners || (node._listeners = {});
            name = toLowerCase(name.substring(2));
            if (value) {
                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            l[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (null == value || value === !1) if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1])); else node.removeAttribute(name); else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value); else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](options.event && options.event(e) || e);
    }
    function collectNode(node) {
        removeNode(node);
        if (node instanceof Element) {
            node._component = node._componentConstructor = null;
            var _name = node.normalizedNodeName || toLowerCase(node.nodeName);
            (nodes[_name] || (nodes[_name] = [])).push(node);
        }
    }
    function createNode(nodeName, isSvg) {
        var name = toLowerCase(nodeName), node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        node.normalizedNodeName = name;
        return node;
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = parent instanceof SVGElement;
            hydrating = dom && !(ATTR_KEY in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (!--diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll) {
        var originalAttributes = vnode && vnode.attributes;
        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
        if (null == vnode) vnode = '';
        if (isString(vnode)) {
            if (dom && dom instanceof Text) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                if (dom) recollectNodeTree(dom);
                dom = document.createTextNode(vnode);
            }
            dom[ATTR_KEY] = !0;
            return dom;
        }
        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
        var out = dom, nodeName = String(vnode.nodeName), prevSvgMode = isSvgMode, vchildren = vnode.children;
        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
        if (!dom) out = createNode(nodeName, isSvgMode); else if (!isNamedNode(dom, nodeName)) {
            out = createNode(nodeName, isSvgMode);
            while (dom.firstChild) out.appendChild(dom.firstChild);
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
            recollectNodeTree(dom);
        }
        var fc = out.firstChild, props = out[ATTR_KEY];
        if (!props) {
            out[ATTR_KEY] = props = {};
            for (var a = out.attributes, i = a.length; i--; ) props[a[i].name] = a[i].value;
        }
        diffAttributes(out, vnode.attributes, props);
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll);
        if (originalAttributes && 'function' == typeof originalAttributes.ref) (props.ref = originalAttributes.ref)(out);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll) {
        var j, c, vchild, child, originalChildren = dom.childNodes, children = [], keyed = {}, keyedLen = 0, min = 0, len = originalChildren.length, childrenLen = 0, vlen = vchildren && vchildren.length;
        if (len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i], props = _child[ATTR_KEY], key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (hydrating || props) children[childrenLen++] = _child;
        }
        if (vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && key in keyed) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
                c = children[j];
                if (c && isSameNodeType(c, vchild)) {
                    child = c;
                    children[j] = void 0;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child); else if (child !== originalChildren[i]) {
                if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);
                dom.insertBefore(child, originalChildren[i] || null);
            }
        }
        if (keyedLen) for (var i in keyed) if (keyed[i]) recollectNodeTree(keyed[i]);
        while (min <= childrenLen) {
            child = children[childrenLen--];
            if (child) recollectNodeTree(child);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly); else {
            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
            if (!unmountOnly) collectNode(node);
            var c;
            while (c = node.lastChild) recollectNodeTree(c, unmountOnly);
        }
    }
    function diffAttributes(dom, attrs, old) {
        for (var _name in old) if (!(attrs && _name in attrs) && null != old[_name]) setAccessor(dom, _name, old[_name], old[_name] = void 0, isSvgMode);
        if (attrs) for (var _name2 in attrs) if (!('children' === _name2 || 'innerHTML' === _name2 || _name2 in old && attrs[_name2] === ('value' === _name2 || 'checked' === _name2 ? dom[_name2] : old[_name2]))) setAccessor(dom, _name2, old[_name2], old[_name2] = attrs[_name2], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list) list.push(component); else components[name] = [ component ];
    }
    function createComponent(Ctor, props, context) {
        var inst = new Ctor(props, context), list = components[Ctor.name];
        Component.call(inst, props, context);
        if (list) for (var i = list.length; i--; ) if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].nextBase;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component._disable) {
            component._disable = !0;
            if (component.__ref = props.ref) delete props.ref;
            if (component.__key = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.prevContext) component.prevContext = component.context;
                component.context = context;
            }
            if (!component.prevProps) component.prevProps = component.props;
            component.props = props;
            component._disable = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll); else enqueueRender(component);
            if (component.__ref) component.__ref(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component._disable) {
            var skip, rendered, inst, cbase, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, nextBase = component.nextBase, initialBase = isUpdate || nextBase, initialChildComponent = component._component;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0; else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                if (component.render) rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
                var toUnmount, base, childComponent = rendered && rendered.nodeName;
                if (isFunction(childComponent)) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__key) setComponentProps(inst, childProps, 1, context); else {
                        toUnmount = inst;
                        inst = createComponent(childComponent, childProps, context);
                        inst.nextBase = inst.nextBase || nextBase;
                        inst._parentComponent = component;
                        component._component = inst;
                        setComponentProps(inst, childProps, 0, context);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component, t = component;
                    while (t = t._parentComponent) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component); else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            var fn, cb = component._renderCallbacks;
            if (cb) while (fn = cb.pop()) fn.call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component, oldDom = dom, isDirectOwner = c && dom._componentConstructor === vnode.nodeName, isOwner = isDirectOwner, props = getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (c && !isDirectOwner) {
                unmountComponent(c, !0);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) {
                c.nextBase = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function unmountComponent(component, remove) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component._disable = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner, remove); else if (base) {
            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
            component.nextBase = base;
            if (remove) {
                removeNode(base);
                collectComponent(component);
            }
            var c;
            while (c = base.lastChild) recollectNodeTree(c, !remove);
        }
        if (component.__ref) component.__ref(null);
        if (component.componentDidUnmount) component.componentDidUnmount();
    }
    function Component(props, context) {
        this._dirty = !0;
        this.context = context;
        this.props = props;
        if (!this.state) this.state = {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent);
    }
    var options = {};
    var stack = [];
    var lcCache = {};
    var toLowerCase = function(s) {
        return lcCache[s] || (lcCache[s] = s.toLowerCase());
    };
    var resolved = 'undefined' != typeof Promise && Promise.resolve();
    var defer = resolved ? function(f) {
        resolved.then(f);
    } : setTimeout;
    var EMPTY = {};
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var NON_BUBBLING_EVENTS = {
        blur: 1,
        error: 1,
        focus: 1,
        load: 1,
        resize: 1,
        scroll: 1
    };
    var items = [];
    var nodes = {};
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        linkState: function(key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {});
            return c[key + eventPath] || (c[key + eventPath] = createLinkedState(this, key, eventPath));
        },
        setState: function(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function() {
            renderComponent(this, 2);
        },
        render: function() {}
    });
    exports.h = h;
    exports.cloneElement = cloneElement;
    exports.Component = Component;
    exports.render = render;
    exports.rerender = rerender;
    exports.options = options;
});

},{}],54:[function(require,module,exports){
'use strict'
/*eslint-env browser */

function getHead() {
  return document.head || document.getElementsByTagName('head')[0]
}

function attachAttributes(tag, attributes) {
  for (var key in attributes) if (attributes.hasOwnProperty(key)) {
    tag.setAttribute('data-' + key, attributes[key])
  }
}

module.exports = {
  /**
   * Create a <style>...</style> tag and add it to the document head
   * @param {string} cssText
   * @param {object?} attributes Optional data-* attribs
   * @return {window.Element}
   */
  createStyle: function (cssText, attributes) {
    var style = document.createElement('style')
    style.type = 'text/css'
    attachAttributes(style, attributes)
    if (style.sheet) { // for jsdom and IE9+
      style.innerHTML = cssText
      style.sheet.cssText = cssText
      getHead().appendChild(style)
    }
    else if (style.styleSheet) { // for IE8 and below
      getHead().appendChild(style)
      style.styleSheet.cssText = cssText
    }
    else { // for Chrome, Firefox, and Safari
      style.appendChild(document.createTextNode(cssText))
      getHead().appendChild(style)
    }
    return style
  }
}

},{}],55:[function(require,module,exports){
module.exports.tag = require('scssify').createStyle(".montrose-root input[type=\"radio\"],.montrose-root input[type=\"checkbox\"]{float:left;margin-right:0.5em}.montrose-root label{vertical-align:middle}.montrose{font-family:'Helvetica Neue', Helvetica, sans-serif;z-index:0;position:absolute;min-height:100%;min-width:100%;left:0;top:0;opacity:0;transition:0.5s}.montrose div,.montrose span,.montrose applet,.montrose object,.montrose iframe,.montrose h1,.montrose h2,.montrose h3,.montrose h4,.montrose h5,.montrose h6,.montrose p,.montrose blockquote,.montrose pre,.montrose a,.montrose abbr,.montrose acronym,.montrose address,.montrose big,.montrose cite,.montrose code,.montrose del,.montrose dfn,.montrose em,.montrose img,.montrose ins,.montrose kbd,.montrose q,.montrose s,.montrose samp,.montrose small,.montrose strike,.montrose strong,.montrose sub,.montrose sup,.montrose tt,.montrose var,.montrose b,.montrose u,.montrose i,.montrose center,.montrose dl,.montrose dt,.montrose dd,.montrose ol,.montrose ul,.montrose li,.montrose fieldset,.montrose form,.montrose label,.montrose legend,.montrose table,.montrose caption,.montrose tbody,.montrose tfoot,.montrose thead,.montrose tr,.montrose th,.montrose td,.montrose article,.montrose aside,.montrose canvas,.montrose details,.montrose embed,.montrose figure,.montrose figcaption,.montrose footer,.montrose header,.montrose hgroup,.montrose menu,.montrose nav,.montrose output,.montrose ruby,.montrose section,.montrose summary,.montrose time,.montrose mark,.montrose audio,.montrose video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}.montrose article,.montrose aside,.montrose details,.montrose figcaption,.montrose figure,.montrose footer,.montrose header,.montrose hgroup,.montrose menu,.montrose nav,.montrose section{display:block}.montrose body{line-height:1}.montrose ol,.montrose ul{list-style:none}.montrose blockquote,.montrose q{quotes:none}.montrose blockquote:before,.montrose blockquote:after,.montrose q:before,.montrose q:after{content:'';content:none}.montrose table{border-collapse:collapse;border-spacing:0}.montrose.visible{opacity:1}.montrose a:visited{color:inherit}.montrose a:hover{background-color:none}.montrose label{font-size:1em}.montrose input[type=\"number\"]{width:5em}.montrose input[type=\"text\"],.montrose input[type=\"date\"]{width:12.5em}.montrose input[type=\"text\"]{padding:0.25em}.montrose .pure-button{margin-left:5px}.montrose .montrose-overlay{z-index:1;opacity:0.3;min-height:100%;min-width:100%;overflow-x:hidden;transition:0.5s;position:absolute;background-color:black}.montrose .montrose-menu{z-index:2;position:absolute;border:1px solid #555;border-radius:4px;width:50%;max-width:525px;top:50%;left:50%;transform:translate(-50%, -50%);background-color:white;z-index:2}.montrose .montrose-section{padding:1.5em 1.5em 0 1.5em}.montrose .montrose-section:last-child{padding-bottom:1.5em}.montrose .montrose-row{overflow:auto;zoom:1;margin-bottom:1em}.montrose .montrose-row>label{float:left;width:25%;text-align:right;padding-right:1em;font-weight:bold;line-height:1.5em}.montrose .montrose-row .montrose-row{margin-bottom:0.5em}.montrose .montrose-field{float:left;width:70%}.montrose .montrose-field label{font-weight:normal;text-align:left;width:65%}.montrose .montrose-field label.montrose-inline{display:inline-block;width:auto;margin-right:1em}.montrose .montrose-field input.montrose-inline{margin-right:0.5em;margin-left:0.5em}.montrose .montrose-title{font-weight:bold;font-size:1.25rem;line-height:1.5rem}.montrose .montrose-close-link{float:right;text-decoration:none;font-weight:bold;font-size:1.5rem}.montrose .montrose-disabled-placeholder{color:transparent}@media only screen and (max-width: 64em){.montrose .montrose-menu{top:45%;width:75%;font-size:0.95em}}@media only screen and (max-width: 39.9375em){.montrose .montrose-menu{top:35%;width:90%;font-size:0.85em}}\n", {});
},{"scssify":54}],56:[function(require,module,exports){
module.exports.tag = require('scssify').createStyle("/*!\nPure v0.6.0\nCopyright 2014 Yahoo! Inc. All rights reserved.\nLicensed under the BSD License.\nhttps://github.com/yahoo/pure/blob/master/LICENSE.md\n*/.pure-button{display:inline-block;zoom:1;line-height:normal;white-space:nowrap;vertical-align:middle;text-align:center;cursor:pointer;-webkit-user-drag:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.pure-button::-moz-focus-inner{padding:0;border:0}.pure-button{font-family:inherit;font-size:100%;padding:.5em 1em;color:#444;color:rgba(0,0,0,0.8);border:1px solid #999;border:0 transparent;background-color:#E6E6E6;text-decoration:none;border-radius:2px}.pure-button-hover,.pure-button:hover,.pure-button:focus{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#1a000000', GradientType=0);background-image:-webkit-gradient(linear, 0 0, 0 100%, from(transparent), color-stop(40%, rgba(0,0,0,0.05)), to(rgba(0,0,0,0.1)));background-image:-webkit-linear-gradient(transparent, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.1));background-image:-moz-linear-gradient(top, rgba(0,0,0,0.05) 0, rgba(0,0,0,0.1));background-image:-o-linear-gradient(transparent, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.1));background-image:linear-gradient(transparent, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.1))}.pure-button:focus{outline:0}.pure-button-active,.pure-button:active{box-shadow:0 0 0 1px rgba(0,0,0,0.15) inset,0 0 6px rgba(0,0,0,0.2) inset;border-color:#000\\9}.pure-button[disabled],.pure-button-disabled,.pure-button-disabled:hover,.pure-button-disabled:focus,.pure-button-disabled:active{border:0;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);filter:alpha(opacity=40);-khtml-opacity:.4;-moz-opacity:.4;opacity:.4;cursor:not-allowed;box-shadow:none}.pure-button-hidden{display:none}.pure-button::-moz-focus-inner{padding:0;border:0}.pure-button-primary,.pure-button-selected,a.pure-button-primary,a.pure-button-selected{background-color:#0078e7;color:#fff}\n", {});
},{"scssify":54}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('./css/pure-buttons-min.css');

require('./css/index.scss');

var _montroseSelect = require('./montrose-select');

var _montroseSelect2 = _interopRequireDefault(_montroseSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _montroseSelect2.default;

},{"./css/index.scss":55,"./css/pure-buttons-min.css":56,"./montrose-select":67}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateInput = function (_Component) {
  _inherits(DateInput, _Component);

  function DateInput(props) {
    _classCallCheck(this, DateInput);

    var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this, props));

    _this.datePickerOptions = props.datePicker || {};
    return _this;
  }

  _createClass(DateInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onReady = this.datePickerOptions.onReady;


      if (onReady) {
        this.datePicker = onReady.call(this, this.base);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      var value = this.formatDate(event.target.value);
      this.props.onChange(value);
    }
  }, {
    key: 'formatDate',
    value: function formatDate(value) {
      var formatDate = this.datePickerOptions.formatDate;


      if (!value.length) {
        return value;
      }

      if (formatDate) {
        return formatDate(value);
      }

      return _utils.date.formatDate(_utils.date.parseDate(value));
    }
  }, {
    key: 'renderCustomDatePicker',
    value: function renderCustomDatePicker(_ref) {
      var name = _ref.name,
          className = _ref.className,
          isActive = _ref.isActive,
          datePicker = _ref.datePicker,
          formattedValue = _ref.formattedValue;

      return (0, _preact.h)('input', {
        className: className,
        type: datePicker.type || "text",
        name: name,
        value: formattedValue,
        disabled: !isActive,
        onChange: this.onChange.bind(this)
      });
    }
  }, {
    key: 'renderDefaultDatePicker',
    value: function renderDefaultDatePicker(_ref2) {
      var name = _ref2.name,
          className = _ref2.className,
          isActive = _ref2.isActive,
          formattedValue = _ref2.formattedValue;

      return isActive ? (0, _preact.h)('input', {
        className: className,
        type: 'date',
        name: name,
        value: formattedValue,
        onChange: this.onChange.bind(this)
      }) : (0, _preact.h)('input', {
        className: 'montrose-inline montrose-disabled-placeholder',
        type: 'date',
        disabled: 'true' });
    }
  }, {
    key: 'render',
    value: function render(props) {
      var datePicker = props.datePicker,
          value = props.value;

      var formattedValue = _utils.date.normalizeDateString(value);

      return datePicker ? this.renderCustomDatePicker(_extends({}, props, { formattedValue: formattedValue })) : this.renderDefaultDatePicker(_extends({}, props, { formattedValue: formattedValue }));
    }
  }]);

  return DateInput;
}(_preact.Component);

DateInput.defaultProp = {
  datePicker: null
};

exports.default = DateInput;

},{"../utils":70,"preact":53}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _components = require('../components');

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EndingPicker = function (_Component) {
  _inherits(EndingPicker, _Component);

  function EndingPicker(props) {
    _classCallCheck(this, EndingPicker);

    var _this = _possibleConstructorReturn(this, (EndingPicker.__proto__ || Object.getPrototypeOf(EndingPicker)).call(this, props));

    var total = props.total,
        until = props.until,
        starts = props.starts;


    _this.until = until || starts || _utils.date.formatDate(_utils.date.now());
    _this.total = total || 35;
    return _this;
  }

  _createClass(EndingPicker, [{
    key: 'onChooseNever',
    value: function onChooseNever() {
      this.onChoose({ total: null, until: null }, { endingChoice: 'never' });
    }
  }, {
    key: 'onChooseTotal',
    value: function onChooseTotal() {
      var total = this.props.total || this.total;

      this.onChoose({ total: total }, { endingChoice: 'total' });
    }
  }, {
    key: 'onChooseUntil',
    value: function onChooseUntil() {
      var until = this.props.until || this.until;

      this.onChoose({ until: until }, { endingChoice: 'until' });
    }
  }, {
    key: 'onChoose',
    value: function onChoose(_ref, state) {
      var total = _ref.total,
          until = _ref.until;

      if (!total) total = null;
      if (!until) until = null;

      this.props.onChange({ total: total, until: until }, state);
    }
  }, {
    key: 'onChangeTotal',
    value: function onChangeTotal(event) {
      var total = event.target.value;

      this.total = total;
      this.onChoose({ total: total });
    }
  }, {
    key: 'onChangeUntil',
    value: function onChangeUntil(dateString) {
      var until = dateString;

      this.until = until;
      this.onChoose({ until: until });
    }
  }, {
    key: 'render',
    value: function render(_ref2) {
      var total = _ref2.total,
          until = _ref2.until,
          starts = _ref2.starts,
          className = _ref2.className,
          datePicker = _ref2.datePicker,
          endingChoice = _ref2.endingChoice;

      var neverSelected = endingChoice === 'never';
      var totalSelected = endingChoice === 'total';
      var untilSelected = endingChoice === 'until';

      until = until || this.until;
      total = total || this.total;

      return (0, _preact.h)(
        'div',
        { className: className },
        (0, _preact.h)(
          'div',
          { className: 'montrose-row' },
          (0, _preact.h)(
            'label',
            { 'for': 'ends-never-radio' },
            (0, _preact.h)('input', {
              type: 'radio',
              id: 'ends-never-radio',
              value: 'never',
              checked: neverSelected,
              onChange: this.onChooseNever.bind(this)
            }),
            'Never'
          )
        ),
        (0, _preact.h)(
          'div',
          { className: 'montrose-row' },
          (0, _preact.h)(
            'label',
            { 'for': 'ends-total-radio' },
            (0, _preact.h)('input', {
              type: 'radio',
              name: 'ends-total-radio',
              value: 'total',
              checked: totalSelected,
              onChange: this.onChooseTotal.bind(this)
            }),
            'After',
            (0, _preact.h)('input', {
              type: 'number',
              className: 'montrose-inline',
              name: 'ends-total-input',
              value: totalSelected ? total : null,
              disabled: !totalSelected,
              onChange: this.onChangeTotal.bind(this)
            }),
            'times'
          )
        ),
        (0, _preact.h)(
          'div',
          { className: 'montrose-row' },
          (0, _preact.h)(
            'label',
            { 'for': 'ends-until-radio' },
            (0, _preact.h)('input', {
              type: 'radio',
              name: 'ends-until-radio',
              value: 'until',
              checked: untilSelected,
              onChange: this.onChooseUntil.bind(this)
            }),
            'On',
            (0, _preact.h)(_components.DateInput, {
              name: 'ends-until-input',
              className: 'montrose-inline',
              value: until,
              isActive: untilSelected,
              onChange: this.onChangeUntil.bind(this),
              datePicker: datePicker
            })
          )
        )
      );
    }
  }]);

  return EndingPicker;
}(_preact.Component);

EndingPicker.defaultProps = {
  endingChoice: 'never'
};

exports.default = EndingPicker;

},{"../components":66,"../utils":70,"preact":53}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FrequencySelect = function (_Component) {
  _inherits(FrequencySelect, _Component);

  function FrequencySelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FrequencySelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FrequencySelect.__proto__ || Object.getPrototypeOf(FrequencySelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      options: [{
        label: 'Daily',
        value: 'day'
      }, {
        label: 'Weekly',
        value: 'week'
      }, {
        label: 'Monthly',
        value: 'month'
      }, {
        label: 'Yearly',
        value: 'year'
      }]
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FrequencySelect, [{
    key: 'onChange',
    value: function onChange(event) {
      event.preventDefault();
      var frequency = event.target.value;
      var recurrence = void 0;

      if (frequency === 'week') {
        recurrence = { frequency: frequency };
      } else {
        recurrence = { frequency: frequency, day: null };
      }

      this.props.onChange(recurrence);
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions(options) {
      return options.map(function (_ref2, key) {
        var label = _ref2.label,
            value = _ref2.value;

        return (0, _preact.h)(
          'option',
          { key: key, value: value },
          label
        );
      });
    }
  }, {
    key: 'render',
    value: function render(_ref3, _ref4) {
      var name = _ref3.name,
          onChange = _ref3.onChange,
          selectedValue = _ref3.selectedValue,
          className = _ref3.className;
      var options = _ref4.options;

      return (0, _preact.h)(
        'label',
        null,
        (0, _preact.h)(
          'select',
          {
            className: className,
            name: name,
            value: selectedValue || options[0].value,
            onChange: this.onChange.bind(this)
          },
          this.renderOptions(options)
        )
      );
    }
  }]);

  return FrequencySelect;
}(_preact.Component);

exports.default = FrequencySelect;

},{"preact":53}],61:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FrequencySelect = function (_Component) {
  _inherits(FrequencySelect, _Component);

  function FrequencySelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FrequencySelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FrequencySelect.__proto__ || Object.getPrototypeOf(FrequencySelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FrequencySelect, [{
    key: 'onChange',
    value: function onChange(event) {
      event.preventDefault();
      var interval = parseInt(event.target.value, 10);
      this.props.onChange({ interval: interval });
    }
  }, {
    key: 'renderOptions',
    value: function renderOptions(options) {
      return options.map(function (value, key) {
        return (0, _preact.h)(
          'option',
          { key: key, value: value },
          value
        );
      });
    }
  }, {
    key: 'render',
    value: function render(_ref2, _ref3) {
      var name = _ref2.name,
          onChange = _ref2.onChange,
          selectedValue = _ref2.selectedValue,
          className = _ref2.className;
      var options = _ref3.options;

      var value = '' + selectedValue || options[0];

      return (0, _preact.h)(
        'label',
        null,
        (0, _preact.h)(
          'select',
          {
            className: className,
            name: name,
            value: value,
            onChange: this.onChange.bind(this)
          },
          this.renderOptions(options)
        )
      );
    }
  }]);

  return FrequencySelect;
}(_preact.Component);

exports.default = FrequencySelect;

},{"preact":53}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require("preact");

var LauncherLabel = function LauncherLabel(_ref) {
  var isEnabled = _ref.isEnabled,
      isChecked = _ref.isChecked,
      children = _ref.children,
      onChange = _ref.onChange,
      onLaunch = _ref.onLaunch;

  return (0, _preact.h)(
    "label",
    null,
    (0, _preact.h)("input", {
      type: "checkbox",
      checked: isChecked,
      onChange: onChange }),
    children,
    isEnabled ? (0, _preact.h)(
      "span",
      null,
      "\xA0",
      (0, _preact.h)(
        "a",
        { href: "#", onClick: onLaunch },
        "Edit"
      )
    ) : ''
  );
};

exports.default = LauncherLabel;

},{"preact":53}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _components = require('../components');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Menu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Menu.__proto__ || Object.getPrototypeOf(Menu)).call.apply(_ref, [this].concat(args))), _this), _this.state = { visible: false }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Menu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Flushes style changes
      // https://timtaubert.de/blog/2012/09/css-transitions-for-dynamically-created-dom-elements/
      window.getComputedStyle(this.base).opacity;
      this.setState({ visible: true });
    }
  }, {
    key: 'render',
    value: function render(_ref2, _ref3) {
      var frequency = _ref2.frequency,
          interval = _ref2.interval,
          starts = _ref2.starts,
          total = _ref2.total,
          until = _ref2.until,
          day = _ref2.day,
          datePicker = _ref2.datePicker,
          endingChoice = _ref2.endingChoice,
          onChange = _ref2.onChange,
          onSubmit = _ref2.onSubmit,
          onCancel = _ref2.onCancel;
      var visible = _ref3.visible;


      return (0, _preact.h)(
        'div',
        { className: (0, _classnames2.default)("montrose", { visible: visible }) },
        (0, _preact.h)('div', { className: 'montrose-overlay' }),
        (0, _preact.h)(
          'div',
          { className: 'montrose-menu' },
          (0, _preact.h)(
            'div',
            { className: 'montrose-row montrose-title-row montrose-section' },
            (0, _preact.h)(
              'a',
              { className: 'montrose-close-link', href: '#', onClick: onCancel },
              '\xD7'
            ),
            (0, _preact.h)(
              'h3',
              { className: 'montrose-title' },
              'Repeat'
            )
          ),
          (0, _preact.h)(
            'div',
            { 'class': 'montrose-section' },
            (0, _preact.h)(
              'div',
              { className: 'montrose-menu-repeats montrose-row' },
              (0, _preact.h)(
                'label',
                { 'for': 'montrose-select-frequency' },
                'Repeats:'
              ),
              (0, _preact.h)(
                'div',
                { className: 'montrose-field' },
                (0, _preact.h)(_components.FrequencySelect, {
                  name: 'montrose-select-frequency',
                  selectedValue: frequency,
                  onChange: onChange
                })
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'montrose-menu-repeats montrose-row' },
              (0, _preact.h)(
                'label',
                { 'for': 'montrose-select-interval' },
                'Repeat every:'
              ),
              (0, _preact.h)(
                'div',
                { className: 'montrose-field' },
                (0, _preact.h)(_components.IntervalSelect, {
                  name: 'montrose-select-interval',
                  selectedValue: interval,
                  onChange: onChange
                })
              )
            ),
            frequency === "week" ? (0, _preact.h)(
              'div',
              { className: 'montrose-menu-weekday montrose-row' },
              (0, _preact.h)(
                'label',
                null,
                'Repeat on:'
              ),
              (0, _preact.h)(
                'div',
                { className: 'montrose-field' },
                (0, _preact.h)(_components.WeekdaySelect, {
                  day: day,
                  starts: starts,
                  onChange: onChange
                })
              )
            ) : "",
            (0, _preact.h)(
              'div',
              { className: 'montrose-menu-start montrose-row' },
              (0, _preact.h)(
                'label',
                { 'for': 'montrose-input-start' },
                'Starts on:'
              ),
              (0, _preact.h)(
                'div',
                { className: 'montrose-field' },
                (0, _preact.h)('input', {
                  name: 'montrose-input-start',
                  type: 'text',
                  value: _utils.date.normalizeDateString(starts),
                  disabled: 'true'
                })
              )
            ),
            (0, _preact.h)(
              'div',
              { className: 'montrose-menu-end montrose-row' },
              (0, _preact.h)(
                'label',
                null,
                'Ends'
              ),
              (0, _preact.h)(_components.EndingPicker, {
                className: 'montrose-field',
                starts: starts,
                until: until,
                total: total,
                onChange: onChange,
                datePicker: datePicker,
                endingChoice: endingChoice
              })
            )
          ),
          (0, _preact.h)(
            'div',
            { 'class': 'montrose-row montrose-section' },
            (0, _preact.h)(
              'label',
              null,
              '\xA0'
            ),
            (0, _preact.h)(
              'button',
              { onClick: onSubmit, className: 'pure-button pure-button-primary' },
              'Done'
            ),
            (0, _preact.h)(
              'button',
              { onClick: onCancel, className: 'pure-button' },
              'Cancel'
            )
          )
        )
      );
    }
  }]);

  return Menu;
}(_preact.Component);

exports.default = Menu;

},{"../components":66,"../utils":70,"classnames":1,"preact":53}],64:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _components = require('../components');

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = function (_Component) {
  _inherits(Root, _Component);

  function Root(props) {
    _classCallCheck(this, Root);

    var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props));

    var recurrence = props.recurrence;

    recurrence = recurrence || {};
    var isEnabled = !!Object.keys(recurrence).length;
    recurrence = _extends(props.defaultRecurrence, recurrence);

    _this.state = _extends({}, recurrence, {
      isEnabled: isEnabled,
      isEditing: false
    });

    window.preactRoot = _this;
    return _this;
  }

  _createClass(Root, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var $app = this.props.$app;


      $app.didSetState = function (state) {
        _this2.setState(state);
      };
    }
  }, {
    key: 'toggle',
    value: function toggle(event) {
      event.preventDefault();

      var isEnabled = this.state.isEnabled;


      if (isEnabled) {
        this.setState({ isEnabled: false, isEditing: false });
        this.props.onFinish(null);
      } else {
        this.launch(event);
      }
    }
  }, {
    key: 'launch',
    value: function launch(event) {
      if (event) {
        event.preventDefault();
      }

      this.setState({ isEditing: true });

      this.props.onChange(this.getRecurrence());
    }
  }, {
    key: 'onCancel',
    value: function onCancel(event) {
      event && event.preventDefault();

      this.close();
    }
  }, {
    key: 'close',
    value: function close() {
      this.setState({ isEditing: false });
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      event && event.preventDefault();

      var recurrence = this.getRecurrence();

      this.setState(_extends({}, recurrence, { isEnabled: true }));
      this.props.onChange(recurrence);
      this.props.onFinish(recurrence);
      this.close();
    }
  }, {
    key: 'updateRecurrence',
    value: function updateRecurrence(recurrence, state) {
      this.setState(_extends({}, recurrence, state));
      this.props.onChange(this.getRecurrence());
    }
  }, {
    key: 'getRecurrence',
    value: function getRecurrence() {
      var state = this.state;
      var keys = Object.keys(Root.defaultProps.defaultRecurrence);

      return keys.reduce(function (recurrence, prop) {
        recurrence[prop] = state[prop];
        return recurrence;
      }, {});
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu(recurrence, _ref) {
      var datePicker = _ref.datePicker,
          isEditing = _ref.isEditing,
          endingChoice = _ref.endingChoice;

      if (!isEditing) {
        return '';
      }

      return (0, _preact.h)(_components.Menu, _extends({}, recurrence, {
        datePicker: datePicker,
        endingChoice: endingChoice,
        onChange: this.updateRecurrence.bind(this),
        onSubmit: this.onSubmit.bind(this),
        onCancel: this.onCancel.bind(this)
      }));
    }
  }, {
    key: 'render',
    value: function render(_ref2, _ref3) {
      var children = _ref2.children,
          datePicker = _ref2.datePicker;
      var isEditing = _ref3.isEditing,
          isEnabled = _ref3.isEnabled,
          endingChoice = _ref3.endingChoice;

      var isChecked = isEditing || isEnabled;
      var recurrence = this.getRecurrence();

      return (0, _preact.h)(
        'div',
        { className: 'montrose-root' },
        (0, _preact.h)(
          _components.LauncherLabel,
          {
            isChecked: isChecked,
            isEnabled: isEnabled,
            onChange: this.toggle.bind(this),
            onLaunch: this.launch.bind(this)
          },
          children
        ),
        this.renderMenu(recurrence, { datePicker: datePicker, endingChoice: endingChoice, isEditing: isEditing })
      );
    }
  }]);

  return Root;
}(_preact.Component);

Root.defaultProps = {
  defaultRecurrence: {
    frequency: 'week',
    interval: 3,
    starts: _utils.date.formatDate(_utils.date.now()),
    total: null,
    until: null,
    day: null
  },
  datePicker: null,
  onChange: function onChange() {},
  onFinish: function onFinish() {}
};

exports.default = Root;

},{"../components":66,"../utils":70,"preact":53}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _es6Set = require('es6-set');

var _es6Set2 = _interopRequireDefault(_es6Set);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeekdaySelect = function (_Component) {
  _inherits(WeekdaySelect, _Component);

  function WeekdaySelect(props) {
    _classCallCheck(this, WeekdaySelect);

    var _this = _possibleConstructorReturn(this, (WeekdaySelect.__proto__ || Object.getPrototypeOf(WeekdaySelect)).call(this, props));

    _this.allDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    var day = props.day,
        starts = props.starts;


    _this.state = {
      day: new _es6Set2.default(day || [_utils.date.parseDate(starts).getDay()])
    };
    return _this;
  }

  _createClass(WeekdaySelect, [{
    key: 'isChecked',
    value: function isChecked(selectedDays, value) {
      return _utils.array.contains(selectedDays, value);
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      var checkbox = event.target;
      var value = parseInt(checkbox.value, 10);
      var set = this.state.day;

      checkbox.checked ? set.add(value) : set.delete(value);

      this.setState({ day: set });

      this.props.onChange({ day: [].concat(_toConsumableArray(set)) });
    }
  }, {
    key: 'render',
    value: function render(_ref, state) {
      var _this2 = this;

      var name = _ref.name,
          day = _ref.day;

      day = day || [].concat(_toConsumableArray(state.day));

      return (0, _preact.h)(
        'div',
        null,
        this.allDays.map(function (label, index) {
          return (0, _preact.h)(
            'label',
            { key: index, className: 'montrose-inline' },
            (0, _preact.h)('input', {
              type: 'checkbox',
              value: index,
              name: name,
              checked: _this2.isChecked(day, index),
              onChange: _this2.onChange.bind(_this2)
            }),
            label
          );
        })
      );
    }
  }]);

  return WeekdaySelect;
}(_preact.Component);

exports.default = WeekdaySelect;

},{"../utils":70,"es6-set":42,"preact":53}],66:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekdaySelect = exports.Menu = exports.LauncherLabel = exports.Root = exports.IntervalSelect = exports.FrequencySelect = exports.EndingPicker = exports.DateInput = undefined;

var _DateInput = require('./DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _EndingPicker = require('./EndingPicker');

var _EndingPicker2 = _interopRequireDefault(_EndingPicker);

var _FrequencySelect = require('./FrequencySelect');

var _FrequencySelect2 = _interopRequireDefault(_FrequencySelect);

var _IntervalSelect = require('./IntervalSelect');

var _IntervalSelect2 = _interopRequireDefault(_IntervalSelect);

var _Root = require('./Root');

var _Root2 = _interopRequireDefault(_Root);

var _LauncherLabel = require('./LauncherLabel');

var _LauncherLabel2 = _interopRequireDefault(_LauncherLabel);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _WeekdaySelect = require('./WeekdaySelect');

var _WeekdaySelect2 = _interopRequireDefault(_WeekdaySelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.DateInput = _DateInput2.default;
exports.EndingPicker = _EndingPicker2.default;
exports.FrequencySelect = _FrequencySelect2.default;
exports.IntervalSelect = _IntervalSelect2.default;
exports.Root = _Root2.default;
exports.LauncherLabel = _LauncherLabel2.default;
exports.Menu = _Menu2.default;
exports.WeekdaySelect = _WeekdaySelect2.default;

},{"./DateInput":58,"./EndingPicker":59,"./FrequencySelect":60,"./IntervalSelect":61,"./LauncherLabel":62,"./Menu":63,"./Root":64,"./WeekdaySelect":65}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

var _components = require('./components');

var _utils = require('./utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MontroseSelect = function () {
  function MontroseSelect(options) {
    _classCallCheck(this, MontroseSelect);

    this.options = options || {};
    this.options = _extends(this.options, { $app: this });
    this.target = options.target;

    if (!this.target) {
      throw 'Expected MontroseSelect options to define a \'target\', but it was ' + options.target;
    }

    var innerHTML = this.target.innerHTML || "Repeat...";
    this.target.innerHTML = "";

    this.root = (0, _preact.render)((0, _preact.h)(
      _components.Root,
      this.options,
      innerHTML
    ), this.target);

    window.rootMontrose = this.root;
  }

  _createClass(MontroseSelect, [{
    key: 'set',
    value: function set() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var normalizedOptions = options || {};

      if (options.starts) {
        normalizedOptions = _extends(options, { starts: _utils.date.normalizeDateString(options.starts) });
      }

      if (options.until) {
        normalizedOptions = _extends(options, { until: _utils.date.normalizeDateString(options.until) });
      }

      if (this.root) {
        this.didSetState(normalizedOptions);
      }
    }
  }, {
    key: 'didSetState',
    value: function didSetState() {
      // template function
    }
  }]);

  return MontroseSelect;
}();

exports.default = MontroseSelect;

},{"./components":66,"./utils":70,"preact":53}],68:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    // http://stackoverflow.com/questions/1181575/determine-whether-an-array-contains-a-value
    contains: function contains(arr, needle) {
        // Per spec, the way to identify NaN is that it is not equal to itself
        var findNaN = needle !== needle;
        var indexOf;

        if (!findNaN && typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function indexOf(needle) {
                var i = -1,
                    index = -1;

                for (i = 0; i < arr.length; i++) {
                    var item = arr[i];

                    if (findNaN && item !== item || item === needle) {
                        index = i;
                        break;
                    }
                }

                return index;
            };
        }

        return indexOf.call(arr, needle) > -1;
    }
};

},{}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = {
  now: function now() {
    return this.parseDate(this.formatDate(new Date()));
  },
  formatDate: function formatDate(givenDate) {
    var date = new Date(givenDate.getTime());
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    return this.normalizeDateString(date.toISOString());
  },
  normalizeDateString: function normalizeDateString(string) {
    return string.substr(0, 10);
  },
  parseDate: function parseDate(string) {
    var dateString = this.normalizeDateString(string);

    var _dateString$split = dateString.split('-'),
        _dateString$split2 = _slicedToArray(_dateString$split, 3),
        year = _dateString$split2[0],
        offsetMonth = _dateString$split2[1],
        day = _dateString$split2[2];

    var month = offsetMonth - 1; // Date months are 0-based

    return new Date(year, month, day);
  },
  isValid: function isValid(date) {
    if (Object.prototype.toString.call(date) !== "[object Date]") {
      return false;
    }

    if (isNaN(date.getTime())) {
      return false;
    }

    return true;
  }
};

},{}],70:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.array = exports.date = exports.time = undefined;

var _time = require('./time');

var _time2 = _interopRequireDefault(_time);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _array = require('./array');

var _array2 = _interopRequireDefault(_array);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.time = _time2.default;
exports.date = _date2.default;
exports.array = _array2.default;

},{"./array":68,"./date":69,"./time":71}],71:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  getDaysInMonth: function getDaysInMonth(d) {
    var resultDate = this.getFirstDayOfMonth(d);
    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);
    return resultDate.getDate();
  },
  getFirstDayOfMonth: function getFirstDayOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  },
  getFirstWeekDay: function getFirstWeekDay(d) {
    return this.getFirstDayOfMonth(d).getDay();
  },
  getTimeMode: function getTimeMode(d) {
    return d.getHours() >= 12 ? 'pm' : 'am';
  },
  getFullMonth: function getFullMonth(d) {
    var month = d.getMonth();
    switch (month) {
      default:
        return 'Unknown';
      case 0:
        return 'January';
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
    }
  },
  getShortMonth: function getShortMonth(d) {
    var month = d.getMonth();
    switch (month) {
      default:
        return 'Unknown';
      case 0:
        return 'Jan';
      case 1:
        return 'Feb';
      case 2:
        return 'Mar';
      case 3:
        return 'Apr';
      case 4:
        return 'May';
      case 5:
        return 'Jun';
      case 6:
        return 'Jul';
      case 7:
        return 'Aug';
      case 8:
        return 'Sep';
      case 9:
        return 'Oct';
      case 10:
        return 'Nov';
      case 11:
        return 'Dec';
    }
  },
  getFullDayOfWeek: function getFullDayOfWeek(day) {
    switch (day) {
      default:
        return 'Unknown';
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
    }
  },
  getShortDayOfWeek: function getShortDayOfWeek(day) {
    switch (day) {
      default:
        return 'Unknown';
      case 0:
        return 'Sun';
      case 1:
        return 'Mon';
      case 2:
        return 'Tue';
      case 3:
        return 'Wed';
      case 4:
        return 'Thu';
      case 5:
        return 'Fri';
      case 6:
        return 'Sat';
    }
  },
  clone: function clone(d) {
    return new Date(d.getTime());
  },
  cloneAsDate: function cloneAsDate(d) {
    var clonedDate = this.clone(d);
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
  },
  isDateObject: function isDateObject(d) {
    return d instanceof Date;
  },
  addDays: function addDays(d, days) {
    var newDate = this.clone(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
  },
  addMonths: function addMonths(d, months) {
    var newDate = this.clone(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
  },
  addYears: function addYears(d, years) {
    var newDate = this.clone(d);
    newDate.setFullYear(d.getFullYear() + years);
    return newDate;
  },
  setDay: function setDay(d, day) {
    var newDate = this.clone(d);
    newDate.setDate(day);
    return newDate;
  },
  setMonth: function setMonth(d, month) {
    var newDate = this.clone(d);
    newDate.setMonth(month);
    return newDate;
  },
  setYear: function setYear(d, year) {
    var newDate = this.clone(d);
    newDate.setFullYear(year);
    return newDate;
  },
  setHours: function setHours(d, hours) {
    var newDate = this.clone(d);
    newDate.setHours(hours);
    return newDate;
  },
  setMinutes: function setMinutes(d, minutes) {
    var newDate = this.clone(d);
    newDate.setMinutes(minutes);
    return newDate;
  },
  toggleTimeMode: function toggleTimeMode(d) {
    var newDate = this.clone(d);
    var hours = newDate.getHours();

    newDate.setHours(hours - (hours > 12 ? -12 : 12));
    return newDate;
  },
  formatTime: function formatTime(date, format) {
    var hours = date.getHours();
    var mins = date.getMinutes().toString();

    if (format === 'ampm') {
      var isAM = hours < 12;
      var additional = isAM ? ' am' : ' pm';

      hours = hours % 12;
      hours = (hours || 12).toString();
      if (mins.length < 2) mins = '0' + mins;

      return hours + (mins === '00' ? '' : ':' + mins) + additional;
    }

    hours = hours.toString();
    if (hours.length < 2) hours = '0' + hours;
    if (mins.length < 2) mins = '0' + mins;
    return hours + ':' + mins;
  }
};

},{}]},{},[57])(57)
});