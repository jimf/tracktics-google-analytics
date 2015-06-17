# Tracktics Google Analytics Plugin

[Tracktics][tracktics] plugin for providing Google Analytics support.

[![npm Version][npm-badge]][npm]
[![Build Status][build-badge]][build-status]
[![Test Coverage][coverage-badge]][coverage-result]
[![Dependency Status][dep-badge]][dep-status]

## Installation

Install using npm:

    $ npm install tracktics-google-analytics

## Usage

Basic usage that integrates with Google Analytics in a simple jQuery app:

```html
<button id="purchase-button"
        type="button"
        data-tracktics-on="click"
        data-tracktics-category="button">Purchase</button>
```

```js
'use strict';

var $ = require('jquery'),
    tracktics = require('tracktics'),
    tracker = tracktics();

// Register the Google Analytics plugin.
tracker.use(require('tracktics-google-analytics')());

$(document).ready(function() {
    // Add event listeners for mouse events on elements that have had
    // data-tracktics-* attributes defined.
    tracker.bind();
});
```

## Declarative Analytics Tracking

In addition to the attributes `data-tracktics-on` and `data-tracktics-event`
provided by Tracktics, tracktics-google-analytics supports the following:

### `data-tracktics-category` (*required*)

The only additionally required attribute for Google Analytics functionality,
`data-tracktics-category` is used to specify category data for the event.
Typically category is the object that was interacted with (e.g., "button").

### `data-tracktics-label`

Used to specify label data for the event. This is useful for further
categorizing events (e.g., "nav buttons").

### `data-tracktics-value`

Used to specify value data for the event. Value must be a non-negative number.
Useful for passing counts (e.g., 4 times).

## API

### `tracktics-google-analytics([windowObject])`

```js
var tracktics = require('tracktics'),
    trackticsGa = require('tracktics-google-analytics'),
    tracker = tracktics();

tracker.use(trackticsGa());
```

The main tracktics-google-analytics export, `tracktics-google-analytics` is a
factory function for generating tracktics-google-analytics plugin instances.
Calling this method returns an object that implements page and event tracking
for Google Analytics. The plugin will intelligently look for a ga function in
the global window namespace, but if `ga` cannot be found, or the wrong `ga` is
found, `ga` can be manually specified by providing a window object placeholder
to the function.

### `#trackPage(url)`

Method for manual page tracking.

### `#trackEvent(action, options)`

Method for manual event tracking. Available options:

 - `category` *(required)*
 - `label`
 - `value`

## License

MIT

[build-badge]: https://img.shields.io/travis/jimf/tracktics-google-analytics/master.svg
[build-status]: https://travis-ci.org/jimf/tracktics-google-analytics
[npm-badge]: https://img.shields.io/npm/v/tracktics-google-analytics.svg
[npm]: https://www.npmjs.org/package/tracktics-google-analytics
[coverage-badge]: https://img.shields.io/coveralls/jimf/tracktics-google-analytics.svg
[coverage-result]: https://coveralls.io/r/jimf/tracktics-google-analytics
[dep-badge]: https://img.shields.io/david/jimf/tracktics-google-analytics.svg
[dep-status]: https://david-dm.org/jimf/tracktics-google-analytics
[tracktics]: https://github.com/jimf/tracktics
