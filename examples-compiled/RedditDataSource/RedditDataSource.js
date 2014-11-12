define(["require", "exports", '../onejs/DataRequest', '../onejs/EventGroup', '../onejs/List', '../onejs/Promise'], function (require, exports, DataRequest, EventGroup, List, Promise) {
    var CHANGE_EVENT = 'change';
    var RedditDataSource = (function () {
        function RedditDataSource() {
            this._pendingRequests = {};
            this._subRedditLists = {};
            this._paginationTokens = {};
            this.subreddit = 'aww';
            this._events = new EventGroup(this);
            this.items = new List();
            this._events.declare([CHANGE_EVENT]);
            this._events.on(this.items, CHANGE_EVENT, this._fireChange);
        }
        RedditDataSource.prototype.loadNextBatch = function () {
            var _this = this;
            this.log("Asked to fetch another batch!");
            this.getItems(this.subreddit).then(function (list) {
                _this.items.setRange(0, list.array);
            });
        };
        RedditDataSource.prototype.log = function (msg) {
            console.log('[RandomItemProvider] ' + msg);
        };
        RedditDataSource.prototype.isLoadingItems = function () {
            for (var url in this._pendingRequests) {
                if (this._pendingRequests.hasOwnProperty(url)) {
                    return true;
                }
            }
            return false;
        };
        RedditDataSource.prototype._fireChange = function () {
            this._events.raise(CHANGE_EVENT);
        };
        RedditDataSource.prototype.getItems = function (subRedditName, options) {
            var _this = this;
            var url = this._getFetchUrl(subRedditName, options);
            var requestPromise = this._pendingRequests[url];
            if (!requestPromise) {
                requestPromise = this._pendingRequests[url] = new Promise(function (done, error) {
                    _this._pendingRequests[url] = {}; // A big ugly, but
                    // this code executes
                    // before the lvalue
                    // is assigned.
                    _this._fireChange(); // Let UI update loading animation
                    DataRequest.send(url).then(function (response) {
                        var list = _this._subRedditLists[subRedditName];
                        if (!list) {
                            list = _this._subRedditLists[subRedditName] = new List();
                        }
                        _this._paginationTokens[subRedditName] = response.data.after;
                        list.setRange(list.getCount(), _this._parseResponse(response));
                        delete _this._pendingRequests[url];
                        done(list);
                    });
                });
            }
            return requestPromise;
        };
        RedditDataSource.prototype._getFetchUrl = function (subRedditName, options) {
            var url = 'http://www.reddit.com/r/' + subRedditName + '.json?limit=50';
            for (var option in options) {
                url += '&' + option + '=' + options[option];
            }
            if (this._paginationTokens[subRedditName]) {
                url += '&after=' + this._paginationTokens[subRedditName];
            }
            return url;
        };
        RedditDataSource.prototype._parseResponse = function (response) {
            var parsedResponse = [];
            for (var i = 0; i < response.data.children.length; i++) {
                var child = response.data.children[i].data;
                var item = {
                    key: child.id,
                    title: child.title,
                    subTitle: child.domain,
                    author: child.author,
                    url: child.url,
                    count: child.ups,
                    thumbnail: null
                };
                if (child.thumbnail && child.thumbnail.indexOf('http') === 0) {
                    var url = child.thumbnail;
                    // Try to find a better thumbnail.
                    if (child.media && child.media.oembed && child.media.oembed.thumbnail_url) {
                        url = child.media.oembed.thumbnail_url;
                    }
                    else if (child.url.indexOf('i.imgur.com/') > -1) {
                        url = child.url.substr(0, child.url.lastIndexOf('.')) + 'l' + child.url.substr(child.url.lastIndexOf('.'));
                    }
                    item.thumbnail = {
                        url: url
                    };
                }
                parsedResponse.push(item);
            }
            return parsedResponse;
        };
        return RedditDataSource;
    })();
    return RedditDataSource;
});
