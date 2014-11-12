define(["require", "exports", 'BasicGridRoot/BasicGridRoot'], function (require, exports, AppRoot) {
    if (document.body) {
        initialize();
    }
    else {
        document.onload = initialize;
    }
    function initialize() {
        var app = new AppRoot();
        var element = document.getElementById('content');
        // Wire up dispose on unload.
        window.addEventListener('unload', function () {
            app.dispose();
        });
        // Wire up resize on window resize.
        window.addEventListener('resize', function () {
            app.resize();
        });
        element.appendChild(app.render());
        app.activate();
    }
});
