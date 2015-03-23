# Track Focus

_I created a newer version of trackFocus that includes more generic event detection (including touch and pointer), only adds a single attribute to the body instead of littering the DOM with classes and exposes a small API for scripting. Check out [What Input?](https://github.com/ten1seven/what-input)._

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

- <a href="https://github.com/remy/polyfills/blob/master/classList.js">classList</a> by remy
- <a href="https://github.com/jonathantneal/EventListener">EventListener</a> by jonathantneal
- <a href="https://gist.github.com/Yaffle/3207619">focusin</a> by Yaffle
- Or use the <a href="https://github.com/ten1seven/trackFocus/blob/master/dest/javascripts/polyfills.min.js">bundled, minified version</a>.
