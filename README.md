# trackFocus

trackFocus adds a class to elements when they receive focus, allowing specific styling for keyboard versus mouse interaction.

Check out the <a href="http://ten1seven.github.io/trackFocus/">demo page</a>.

## How it works

- Watches the body for the `mousedown` and `keydown` events and stores as a variable.
- Watches the body for the `focusin` event and applies the correct class based on whether the previous event was from the mouse or keyboard.
- Watches the body for the `focusout` event and removes the mouse/keyboard class.
- Style the focus state as needed.

## Usage

- Include trackFocus.min.js (just 500 bytes).
- Style focus states.

## Compatibility

Works as-is in all modern browsers. For older browsers, like IE8, grab these polyfills:

- "classList":https://github.com/remy/polyfills/blob/master/classList.js by remy
- "EventListener":https://github.com/jonathantneal/EventListener by jonathantneal
- "focusin":https://gist.github.com/Yaffle/3207619 by Yaffle
- Or use the "bundled, minified version":https://github.com/ten1seven/trackFocus/blob/master/dest/javascripts/polyfills.min.js.
