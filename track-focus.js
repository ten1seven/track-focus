(function() {

	/** variables */

	var lastDeviceUsed = null;
	var lastDeviceUsedWhen = null;


	/** events */

	var bindEvents = function() {
		bean.on(document.body, {
			'mousedown.trackfocus': function() {
				lastDeviceUsed = 'mouse';
				lastDeviceUsedWhen = new Date().getTime();
			},
			'keydown.trackfocus': function() {
				lastDeviceUsed = 'keyboard';
				lastDeviceUsedWhen = new Date().getTime();
			},
			'focusin.trackfocus': addFocus,
			'focusout.trackfocus': removeFocus
		});
	};


	/** utilities */

	var addFocus = function(event) {
		if (lastDeviceUsed === 'mouse' || new Date().getTime() - 50 > lastDeviceUsedWhen) {
			addClass(event.target, 'focus--mouse');
		}
	};

	var removeFocus = function(event) {
		removeClass(event.target, 'focus--mouse');
	};

	// dom utilities
	var hasClass = function(elem, className) {
		return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	};

	var addClass = function(elem, className) {
		if (!hasClass(elem, className)) {
			elem.className += ' ' + className;
		}
	};

	var removeClass = function(elem, className) {
		var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';

		if (hasClass(elem, className)) {
			while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
				newClass = newClass.replace(' ' + className + ' ', ' ');
			}
			elem.className = newClass.replace(/^\s+|\s+$/g, '');
		}
	};


	/** init */

	bindEvents();

})();


/*jslint plusplus: true, regexp: true, vars: true, white: true */
/*global document*/

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