define(["require", "exports"], function (require, exports) {
    var RandomItem = (function () {
        function RandomItem(bar) {
            this.bar = bar;
            this.foo = 'generated at ' + new Date();
            this.key = bar;
        }
        return RandomItem;
    })();
    return RandomItem;
});
