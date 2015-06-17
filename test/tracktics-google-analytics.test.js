'use strict';

var trackticsGa = require('..');

function optsObj() {
    return {
        category: 'button'
    };
}

describe('Tracktics Google Analytics Plugin', function() {
    var subject, ga;

    beforeEach(function() {
        ga = jasmine.createSpy('ga');
    });

    function shouldImplementGoogleAnalytics() {

        describe('#trackPage()', function() {
            var url;

            beforeEach(function() {
                url = '/some/url';
                subject.trackPage(url);
            });

            it('should call ga with expected params', function() {
                expect(ga).toHaveBeenCalledWith('send', 'pageview', url);
            });
        });

        describe('#trackEvent()', function() {
            var action, options;

            beforeEach(function() {
                action = 'click';
            });

            describe('with minimum params', function() {

                beforeEach(function() {
                    options = optsObj();
                    subject.trackEvent(action, options);
                });

                it('should call ga with expected params', function() {
                    expect(ga).toHaveBeenCalledWith('send', 'event', 'button', action);
                });
            });

            describe('with minimum params and label', function() {

                beforeEach(function() {
                    options = optsObj();
                    options.label = 'nav buttons';
                    subject.trackEvent(action, options);
                });

                it('should call ga with expected params', function() {
                    expect(ga).toHaveBeenCalledWith('send', 'event', 'button', action, options.label);
                });
            });

            describe('with minimum params, label, and value', function() {

                beforeEach(function() {
                    options = optsObj();
                    options.label = 'nav buttons';
                    options.value = '4';
                    subject.trackEvent(action, options);
                });

                it('should call ga with expected params', function() {
                    expect(ga).toHaveBeenCalledWith('send', 'event', 'button', action, options.label, parseInt(options.value, 10));
                });
            });

            describe('with minimum params, label, and invalid value', function() {

                beforeEach(function() {
                    options = optsObj();
                    options.label = 'nav buttons';
                    options.value = 'a';
                    subject.trackEvent(action, options);
                });

                it('should call ga with expected params', function() {
                    expect(ga).toHaveBeenCalledWith('send', 'event', 'button', action, options.label, 0);
                });
            });
        });
    }

    describe('when window.ga is available', function() {

        beforeEach(function() {
            global.window.ga = ga;
            delete global.window.GoogleAnalyticsObject;

            subject = trackticsGa();
        });

        shouldImplementGoogleAnalytics();
    });

    describe('when window.GoogleAnalyticsObject is available', function() {

        beforeEach(function() {
            delete global.window.ga;
            global.window.GoogleAnalyticsObject = ga;

            subject = trackticsGa();
        });

        shouldImplementGoogleAnalytics();
    });

    describe('when window object with ga is specified', function() {

        beforeEach(function() {
            delete global.window.ga;
            delete global.window.GoogleAnalyticsObject;

            subject = trackticsGa({ ga: ga });
        });

        shouldImplementGoogleAnalytics();
    });

    describe('when ga is unavailable', function() {

        beforeEach(function() {
            delete global.window.ga;
            delete global.window.GoogleAnalyticsObject;

            subject = trackticsGa();
        });

        describe('#trackPage()', function() {
            var url;

            beforeEach(function() {
                url = '/some/url';
                subject.trackPage(url);
            });

            it('should not call ga', function() {
                expect(ga).not.toHaveBeenCalled();
            });
        });

        describe('#trackEvent()', function() {
            var action, options;

            beforeEach(function() {
                action = 'click';
                options = optsObj();

                subject.trackEvent(action, options);
            });

            it('should not call ga', function() {
                expect(ga).not.toHaveBeenCalled();
            });
        });
    });
});
