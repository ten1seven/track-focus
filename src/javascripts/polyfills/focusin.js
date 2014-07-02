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
