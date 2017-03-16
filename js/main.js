
$(document).ready(function () {

    'use strict';

    var app = new App();

    app.bindStateChange();
    app.bindLinks();

    //load intro by default
    app.loadPage(document.location.search);

});