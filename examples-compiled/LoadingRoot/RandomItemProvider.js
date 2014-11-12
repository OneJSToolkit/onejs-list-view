define(["require", "exports", '../onejs/EventGroup', '../onejs/List', './RandomItem'], function (require, exports, EventGroup, List, RandomItem) {
    var CHANGE_EVENT = 'change';
    var RandomItemProvider = (function () {
        function RandomItemProvider() {
            this._pseudoAsyncRequestCount = 0;
            this.events = new EventGroup(this);
            this.items = new List();
            this.events.declare([CHANGE_EVENT]);
            this.events.on(this.items, CHANGE_EVENT, this.fireChange);
        }
        RandomItemProvider.prototype.fireChange = function () {
            this.events.raise(CHANGE_EVENT);
        };
        RandomItemProvider.prototype.log = function (msg) {
            console.log('[RandomItemProvider] ' + msg);
        };
        RandomItemProvider.prototype.loadNextBatch = function () {
            var _this = this;
            // if we are already "loading" more items, ignore request
            if (this.isLoadingItems()) {
                this.log('not loading more items... already doing it.');
                return;
            }
            this.log('setting timeout to add more items...');
            this._pseudoAsyncRequestCount++;
            this.fireChange(); // Fire change event to let views
            // update any loading animations
            setTimeout(function () {
                _this.log('adding 5 more items...');
                _this._pseudoAsyncRequestCount--;
                for (var i = 0; i < 5; i++) {
                    _this.items.push(new RandomItem(i));
                }
                _this.log('now have ' + _this.items.getCount() + ' items.');
            }, Math.random() * 3000);
        };
        RandomItemProvider.prototype.isLoadingItems = function () {
            return this._pseudoAsyncRequestCount !== 0;
        };
        return RandomItemProvider;
    })();
    return RandomItemProvider;
});
