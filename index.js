'use strict';

/**
 * Returns whether value is defined.
 *
 * @param {*} val Variable to test
 * @return {boolean}
 */
function isDefined(val) {
    return typeof val !== 'undefined';
}

/**
 * Parser for ga value param. Must be a number. Returns 0 if not a number.
 *
 * @param {*} val Value to parse
 * @return {number}
 */
function parseValue(val) {
    val = parseInt(val, 10);
    return isNaN(val) ? 0 : val;
}

/**
 * Main export function. Returns a Google Analytics provider instance.
 *
 * @param {object} [windowObject] Window object override
 * @return {object}
 */
module.exports = function(windowObject) {

    /**
     * Helper function for locating a Google Analytics function and passing
     * args to it.
     *
     * @param {string} command
     * @param {string} hitType
     * @param {string} eventCategory
     * @param {string} eventAction
     * @param {string} [eventLabel]
     * @param {number} [eventValue]
     */
    function vendor() {
        var window = windowObject || global.window,
            ga;

        if (window.GoogleAnalyticsObject && window.GoogleAnalyticsObject !== 'ga') {
            ga = window.GoogleAnalyticsObject;
        } else {
            ga = window.ga;
        }

        if (typeof ga === 'function') {
            ga.apply(null, Array.prototype.slice.call(arguments));
        }
    }

    return {
        name: 'Google Analytics',

        /**
         * Google Analytics page-tracking implementation.
         *
         * @param {string} url URL to track
         */
        trackPage: function trackPage(url) {
            vendor('send', 'pageview', url);
        },

        /**
         * Google Analytics event-tracking implementation.
         *
         * {@link https://developers.google.com/analytics/devguides/collection/analyticsjs/events}
         *
         * @param {string} action The type of interaction (e.g., "click")
         * @param {object} options
         * @param {object} options.category GA category detail
         * @param {string} [options.label] GA label detail
         * @param {number|string} [options.value] GA value detail
         */
        trackEvent: function trackEvent(action, options) {
            var args = ['send', 'event', options.category, action];

            if (isDefined(options.label)) {
                args.push(options.label);

                if (isDefined(options.value)) {
                    args.push(parseValue(options.value));
                }
            }

            vendor.apply(null, args);
        }
    };
};
