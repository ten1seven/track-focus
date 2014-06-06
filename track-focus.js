(function() {

	/** variables */

	var domElements = [];
	var lastDeviceUsed = null;
	var lastDeviceUsedWhen = null;

	// merge into a single array
	var makeArray = function() {
		pushToArray(domElements, document.getElementsByTagName('a'));
		pushToArray(domElements, document.getElementsByTagName('input'));
		pushToArray(domElements, document.getElementsByTagName('button'));
		pushToArray(domElements, document.getElementsByTagName('textarea'));
	};


	/** events */

	var bindEvents = function() {
		bean.on(document.getElementsByTagName('body')[0], {
			'mousedown.trackfocus': function() {
				lastDeviceUsed = 'mouse';
				lastDeviceUsedWhen = new Date().getTime();
			},
			'keydown.trackfocus': function() {
				lastDeviceUsed = 'keyboard';
				lastDeviceUsedWhen = new Date().getTime();
			}
		});


		for (var i = 0; i < domElements.length; i++) {
			bean.on(domElements[i], 'focus.trackfocus', addFocus);
			bean.on(domElements[i], 'blur.trackfocus', removeFocus);
		}
	};


	/** utilities */

	var addFocus = function() {
		if (lastDeviceUsed === 'mouse' || new Date().getTime() - 50 > lastDeviceUsedWhen) {
			addClass(this, 'focus--mouse');
		}
	};

	var removeFocus = function() {
		removeClass(this, 'focus--mouse');
	};

	var pushToArray = function(container, collection) {
		for (var i = 0; i < collection.length; i++) {
			container.push(collection[i]);
		}
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

	var init = function() {
		makeArray();
		bindEvents();
	};

	init();

})();