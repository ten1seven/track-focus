/*! track-focus v 0.1 | Author: Jeremy Fields [jeremy.fields@vget.com], 2014 | License: MIT */
// inspired by: http://irama.org/pkg/keyboard-focus-0.3/jquery.keyboard-focus.js

(function(body) {

	var lastDeviceUsed;

	var preFocus = function(event) {
		lastDeviceUsed = (event.type === 'mousedown') ? 'mouse' : 'keyboard';
	};

	var addFocus = function(event) {
		event.target.classList.add('focus--' + lastDeviceUsed);
	};

	var removeFocus = function(event) {
		event.target.classList.remove('focus--keyboard');
		event.target.classList.remove('focus--mouse');
	};

	var bindEvents = function() {
		body.addEventListener('keydown', preFocus);
		body.addEventListener('mousedown', preFocus);
		body.addEventListener('focusin', addFocus);
		body.addEventListener('focusout', removeFocus);
	};

	bindEvents();

})(document.body);
