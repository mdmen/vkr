; (function () {

    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,
        overview: true,
        mouseWheel: true,
        keyboard: true,
        transition: 'slide',
        parallaxBackgroundImage: '../../img/topography.png',
        parallaxBackgroundHorizontal: 200,
        parallaxBackgroundVertical: 100
    });

    window.onload = function () {
        var reveal = document.querySelector('.reveal');
        reveal.classList.add('active');
    };

})();