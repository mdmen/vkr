/**
 * dependencies: jQuery, history.js, materialize.js
 * @constructor
 */
function App() {

    'use strict';

    var self = this,
        $content = $('.content'),
        rootPath = '/vkr/',
        messages = {
            no_found: 'Страница не найдена'
        };

    self.init = function () {

        History.Adapter.bind(window, 'statechange', function () {
            self.loadPage(document.location.search);
        });

        $('body').on('click', '.js-link', function () {
            var $self = $(this);
            History.pushState(null, $self.text(), $self.attr('href'));
            return false;
        });

    };

    self.loadPage = function (search, title) {

        var name = search || '';

        name = (~name.indexOf('?page=')) ? name.slice(6) : 'intro';

        self.showPreloader();

        self.getPageContent(name, getPageCallback, title);

    };

    self.getPageContent = function(name, callback, title) {
        self.delay(function () {
            $.get(
                rootPath + 'pages/' + name + '.html',
                {},
                callback.bind(null, name, title)
            ).fail(function () {
                alert(messages.no_found);
            });
        }, 300);
    };

    self.showPreloader = function () {
        $content.find('.content-inner').removeClass('visible');
        $content.find('.preloader-cont, ' +
            '.preloader-wrapper').addClass('active');
    };

    self.hidePreloader = function () {
        $content.find('.preloader-cont, ' +
            '.preloader-wrapper').removeClass('active');
        $content.find('.content-inner').addClass('visible');
    };

    self.delay = function (func, ms) {
        setTimeout(func, ms);
    };

    function getPageCallback() {

        var html = arguments[2] || '',
            title = arguments[1],
            search = arguments[0];

        $content.find('.content-inner').html(html);
        self.hidePreloader();
        $('.parallax').parallax();
        if (title) {
            History.pushState(null, title, search);
        }
    }

}