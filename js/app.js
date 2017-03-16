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

    self.loadPage = function (search) {

        var name = search || '';

        if (~name.indexOf('?page=')) {
            name = name.slice(6);
        } else {
            name = 'intro';
        }

        self.showPreloader();

        self.delay(function () {
            $.get(
                rootPath + 'pages/' + name + '.html',
                {},
                function (html) {
                    $content.find('.content-inner').html(html);
                    self.hidePreloader();
                }
            ).fail(function () {
                alert(messages.no_found);
            });
        }, 300);

    };

    self.bindStateChange = function () {
        History.Adapter.bind(window, 'statechange', function () {
            self.loadPage(document.location.search);
        });
    };

    self.bindLinks = function () {
        $('body').on('click', '.js-link', function () {
            var $self = $(this);
            History.pushState(null, $self.text(), $self.attr('href'));
            return false;
        });
    };

    self.showPreloader = function () {
        $content.find('.content-inner').removeClass('visible');
        $content.find('.preloader-cont').addClass('active');
    };

    self.hidePreloader = function () {
        $content.find('.preloader-cont').removeClass('active');
        $content.find('.content-inner').addClass('visible');
    };

    self.delay = function (func, ms) {
        setTimeout(func, ms);
    };

}