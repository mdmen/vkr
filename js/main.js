$(document).ready(function () {

    'use strict';

    var app = new App();

    app.init();

    //load intro by default
    app.loadPage(document.location.search || '?page=intro');

});