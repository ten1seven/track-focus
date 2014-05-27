var app = app || {};

'use strict';

app.dom = {
	hasClass: function(elem, className) {
		return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	},

	addClass: function(elem, className) {
		if (!app.dom.hasClass(elem, className)) {
			elem.className += ' ' + className;
		}
	},

	removeClass: function(elem, className) {
		var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';

		if (app.dom.hasClass(elem, className)) {
			while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
				newClass = newClass.replace(' ' + className + ' ', ' ');
			}
			elem.className = newClass.replace(/^\s+|\s+$/g, '');
		}
	},

	toggleClass: function(elem, className) {
		var action = (app.dom.hasClass(elem, className)) ? 'removeClass' : 'addClass';
		app.dom[action](elem, className);
	},

	swapClass: function(elem, oldClass, newClass, addIfAbsent) {
		if (app.dom.hasClass(elem, oldClass)) {
			var classStr = elem.getAttribute('class');
			classStr = classStr.replace(oldClass, newClass);

			elem.setAttribute('class', classStr);
		} else if (addIfAbsent) {
			app.dom.addClass(elem, newClass);
		}
	},

	addEventListener: function(el, eventName, handler) {
		if (el.addEventListener) {
			el.addEventListener(eventName, handler);
		} else {
			el.attachEvent('on' + eventName, function() {
				handler.call(el);
			});
		}
	}
};