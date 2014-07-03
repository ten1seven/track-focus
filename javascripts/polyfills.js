// EventListener | MIT/GPL2 | github.com/jonathantneal/EventListener

this.Element && Element.prototype.attachEvent && !Element.prototype.addEventListener && (function () {
	function addToPrototype(name, method) {
		Window.prototype[name] = HTMLDocument.prototype[name] = Element.prototype[name] = method;
	}

	// add
	addToPrototype("addEventListener", function (type, listener) {
		var
		target = this,
		listeners = target.addEventListener.listeners = target.addEventListener.listeners || {},
		typeListeners = listeners[type] = listeners[type] || [];

		// if no events exist, attach the listener
		if (!typeListeners.length) {
			target.attachEvent("on" + type, typeListeners.event = function (event) {
				var documentElement = target.document && target.document.documentElement || target.documentElement || { scrollLeft: 0, scrollTop: 0 };

				// polyfill w3c properties and methods
				event.currentTarget = target;
				event.pageX = event.clientX + documentElement.scrollLeft;
				event.pageY = event.clientY + documentElement.scrollTop;
				event.preventDefault = function () { event.returnValue = false };
				event.relatedTarget = event.fromElement || null;
				event.stopImmediatePropagation = function () { immediatePropagation = false; event.cancelBubble = true };
				event.stopPropagation = function () { event.cancelBubble = true };
				event.target = event.srcElement || target;
				event.timeStamp = +new Date;

				// create an cached list of the master events list (to protect this loop from breaking when an event is removed)
				for (var i = 0, typeListenersCache = [].concat(typeListeners), typeListenerCache, immediatePropagation = true; immediatePropagation && (typeListenerCache = typeListenersCache[i]); ++i) {
					// check to see if the cached event still exists in the master events list
					for (var ii = 0, typeListener; typeListener = typeListeners[ii]; ++ii) {
						if (typeListener == typeListenerCache) {
							typeListener.call(target, event);

							break;
						}
					}
				}
			});
		}

		// add the event to the master event list
		typeListeners.push(listener);
	});

	// remove
	addToPrototype("removeEventListener", function (type, listener) {
		var
		target = this,
		listeners = target.addEventListener.listeners = target.addEventListener.listeners || {},
		typeListeners = listeners[type] = listeners[type] || [];

		// remove the newest matching event from the master event list
		for (var i = typeListeners.length - 1, typeListener; typeListener = typeListeners[i]; --i) {
			if (typeListener == listener) {
				typeListeners.splice(i, 1);

				break;
			}
		}

		// if no events exist, detach the listener
		if (!typeListeners.length && typeListeners.event) {
			target.detachEvent("on" + type, typeListeners.event);
		}
	});

	// dispatch
	addToPrototype("dispatchEvent", function (eventObject) {
		var
		target = this,
		type = eventObject.type,
		listeners = target.addEventListener.listeners = target.addEventListener.listeners || {},
		typeListeners = listeners[type] = listeners[type] || [];

		try {
			return target.fireEvent("on" + type, eventObject);
		} catch (error) {
			if (typeListeners.event) {
				typeListeners.event(eventObject);
			}

			return;
		}
	});

	// CustomEvent
	Object.defineProperty(Window.prototype, "CustomEvent", {
		get: function () {
			var self = this;

			return function CustomEvent(type, eventInitDict) {
				var event = self.document.createEventObject(), key;

				event.type = type;
				for (key in eventInitDict) {
					if (key == 'cancelable'){
						event.returnValue = !eventInitDict.cancelable;
					} else if (key == 'bubbles'){
						event.cancelBubble = !eventInitDict.bubbles;
					} else if (key == 'detail'){
						event.detail = eventInitDict.detail;
					}
				}
				return event;
			};
		}
	});

	// ready
	function ready(event) {
		if (ready.interval && document.body) {
			ready.interval = clearInterval(ready.interval);

			document.dispatchEvent(new CustomEvent("DOMContentLoaded"));
		}
	}

	ready.interval = setInterval(ready, 1);

	window.addEventListener("load", ready);
})();

!this.CustomEvent && (function() {
	// CustomEvent for browsers which don't natively support the Constructor method
	window.CustomEvent = function CustomEvent(type, eventInitDict) {
		var event;
		eventInitDict = eventInitDict || {bubbles: false, cancelable: false, detail: undefined};

		try {
			event = document.createEvent('CustomEvent');
			event.initCustomEvent(type, eventInitDict.bubbles, eventInitDict.cancelable, eventInitDict.detail);
		} catch (error) {
			// for browsers which don't support CustomEvent at all, we use a regular event instead
			event = document.createEvent('Event');
			event.initEvent(type, eventInitDict.bubbles, eventInitDict.cancelable);
			event.detail = eventInitDict.detail;
		}

		return event;
	};
})();
// classList
// via: https://github.com/remy/polyfills/blob/master/classList.js
(function () {

	if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;

	var prototype = Array.prototype,
		push = prototype.push,
		splice = prototype.splice,
		join = prototype.join;

	function DOMTokenList(el) {
		this.el = el;
		// The className needs to be trimmed and split on whitespace
		// to retrieve a list of classes.
		var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
		for (var i = 0; i < classes.length; i++) {
			push.call(this, classes[i]);
		}
	};

	DOMTokenList.prototype = {
		add: function(token) {
			if(this.contains(token)) return;
			push.call(this, token);
			this.el.className = this.toString();
		},
		contains: function(token) {
			return this.el.className.indexOf(token) != -1;
		},
		item: function(index) {
			return this[index] || null;
		},
		remove: function(token) {
			if (!this.contains(token)) return;
			for (var i = 0; i < this.length; i++) {
				if (this[i] == token) break;
			}
			splice.call(this, i, 1);
			this.el.className = this.toString();
		},
		toString: function() {
			return join.call(this, ' ');
		},
		toggle: function(token) {
			if (!this.contains(token)) {
				this.add(token);
			} else {
				this.remove(token);
			}

			return this.contains(token);
		}
	};

	window.DOMTokenList = DOMTokenList;

	function defineElementGetter (obj, prop, getter) {
		if (Object.defineProperty) {
			Object.defineProperty(obj, prop,{
				get : getter
			});
		} else {
			obj.__defineGetter__(prop, getter);
		}
	}

	defineElementGetter(Element.prototype, 'classList', function () {
		return new DOMTokenList(this);
	});

})();

// focusin/out
// via: https://gist.github.com/Yaffle/3207619
(function () {

	'use strict';

	var custom = false;

	function simulateFocusInOut(event) {
		// CustomEvent is not supported under FF < 6
		var e = document.createEvent('Event');
		e.initEvent(event.type === 'focus' ? 'focusin' : 'focusout', true, false);
		custom = true;
		event.target.dispatchEvent(e);
	}

	function off(event) {
		if (!custom) {
			// to prevent firing of native 'focusin'/'focusout'
			event.stopPropagation();
		}
		custom = false;
	}

	if ('\v' !== 'v' && document.addEventListener) {
		document.addEventListener('focus', simulateFocusInOut, true);
		document.addEventListener('blur', simulateFocusInOut, true);
		document.addEventListener('focusin', off, true);
		document.addEventListener('focusout', off, true);
	}

}());
