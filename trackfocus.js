(function() {

	/** variables */

	var allElements = [];
	var lastDeviceUsed = null;
	var lastDeviceUsedWhen = null;

	// colect dom elements
	var body = document.getElementsByTagName('body')[0];
	var allLinks = document.getElementsByTagName('a');
	var allInputs = document.getElementsByTagName('input');
	var allButtons = document.getElementsByTagName('button');
	var allTextareas = document.getElementsByTagName('textarea');

	// merge into a single array
	var makeArray = function() {
		pushToArray(allElements, allLinks);
		pushToArray(allElements, allInputs);
		pushToArray(allElements, allButtons);
		pushToArray(allElements, allTextareas);
	};


	/** events */

	var bindEvents = function() {
		app.dom.addEventListener(body, 'mousedown', function() {
			lastDeviceUsed = 'mouse';
			lastDeviceUsedWhen = new Date().getTime();
		});

		app.dom.addEventListener(body, 'keydown', function() {
			lastDeviceUsed = 'keyboard';
			lastDeviceUsedWhen = new Date().getTime();
		});

		for (var i = 0; i < allElements.length; i++) {
			app.dom.addEventListener(allElements[i], 'focus', addFocus);
			app.dom.addEventListener(allElements[i], 'blur', removeFocus);
		}
	};


	/** utilities */

	var addFocus = function() {
		if (lastDeviceUsed === 'mouse' || new Date().getTime() - 50 > lastDeviceUsedWhen) {
			app.dom.addClass(this, 'focus--mouse');
		}
	};

	var removeFocus = function() {
		app.dom.removeClass(this, 'focus--mouse');
	};

	var pushToArray = function(container, collection) {
		for (var i = 0; i < collection.length; i++) {
			container.push(collection[i]);
		}
	};


	/** init */

	var init = function() {
		makeArray();
		bindEvents();
	};

	init();

})();