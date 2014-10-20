import AppRoot = require('ResponsiveRoot/ResponsiveRoot');

if (document.body) {
    initialize();
}
else {
    document.onload = initialize;
}

function initialize() {
    var app = new AppRoot();
    var element = document.getElementById('content-full');

    // Wire up dispose on unload.
    window.addEventListener('unload', function() {
        app.dispose();
    });

    // Wire up resize on window resize.
    window.addEventListener('resize', function() {
        app.resize();
    });

    element.appendChild(app.render());
    app.activate();
}
