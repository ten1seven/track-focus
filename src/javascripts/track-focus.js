// inspired by: http://irama.org/pkg/keyboard-focus-0.3/jquery.keyboard-focus.js

(function() {

	var lastDeviceUsed;

	var preFocus = function(event) {
		lastDeviceUsed = event.type;
	};

	var addFocus = function(event) {
		event.target.classList.add('focus--' + lastDeviceUsed);
	};

	var removeFocus = function(event) {
		event.target.classList.remove('focus--keydown');
		event.target.classList.remove('focus--mousedown');
	};

	var bindEvents = function() {
		document.body.addEventListener('keydown', preFocus);
		document.body.addEventListener('mousedown', preFocus);
		document.body.addEventListener('focusin', addFocus);
		document.body.addEventListener('focusout', removeFocus);
	};

	bindEvents();

})();
