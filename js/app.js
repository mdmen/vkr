
function App() {
    var self = this;

    this._delay = function (func, ms) {
        setTimeout(func, ms);
    };

    this._getPageCallback = function () {
        var self = this;
        var html = arguments[2] || '';
        var title = arguments[1] || '';
        var search = arguments[0] || '';

        $('.content').find('.content-inner').html(html);

        $('.content').imagesLoaded(function () {
            $('.parallax').parallax();
            $('ul.tabs').tabs();

            self.hidePreloader();
            self.showContent();

            var $lessonImages = $('.lesson-wrapper img[data-src]');

            $lessonImages.each(function () {
                $(this).wrap('<div class="lesson-image-wrap container"></div>');
            });

            $('img[data-src]').Lazy({
                effect: 'fadeIn',
                effectTime: 300
            });

            $lessonImages.materialbox();
        });

        if (title) {
            History.pushState(null, title, search);
        }
    }

    History.Adapter.bind(window, 'statechange', function () {
        self.loadPage(document.location.search);
    });

    $('body').on('click', '.js-link', function () {
        var $self = $(this);

        History.pushState(null, $self.text(), $self.attr('href'));

        return false;
    });
}

App.prototype.loadPage = function (search, title) {
    var name = search || '';

    name = (~name.indexOf('?page=')) ? name.slice(6) : 'intro';

    this.hideContent();
    this.showPreloader();
    this.getPageContent(name, this._getPageCallback.bind(this), title);
};

App.prototype.getPageContent = function (name, callback, title) {
    var self = this;

    self._delay(function () {
        $.get(
            location.pathname + 'pages/' + name + '.html',
            {},
            callback.bind(null, name, title)
        ).fail(function () {
            alert('Страница не найдена');
        });
    }, 300);
};

App.prototype.hideContent = function () {
    $('.content').find('.content-inner').removeClass('visible');
};

App.prototype.showContent = function () {
    $('.content').find('.content-inner').addClass('visible');
};

App.prototype.showPreloader = function () {
    $('.content').find('.preloader-cont, ' +
        '.preloader-wrapper').addClass('active');
};

App.prototype.hidePreloader = function () {
    $('.content').find('.preloader-cont, ' +
        '.preloader-wrapper').removeClass('active');
};