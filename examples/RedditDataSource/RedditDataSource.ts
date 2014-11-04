import DataRequest = require('../onejs/DataRequest');
import EventGroup = require('../onejs/EventGroup');
import IItem = require('../onejs/IItem');
import IItemProvider = require('../ListView/IItemProvider');
import List = require('../onejs/List');
import Promise = require('../onejs/Promise');

var CHANGE_EVENT ='change';

class RedditDataSource implements IItemProvider {
    _pendingRequests = {};
    _subRedditLists = {};
    _paginationTokens = {};

    subreddit = 'aww';

    items: List<IItem>;
    _events = new EventGroup(this);

    constructor() {
        this.items = new List<any>();
        this._events.declare([ CHANGE_EVENT ]);
        this._events.on(this.items, CHANGE_EVENT, this._fireChange);
    }

    loadNextBatch() {
        this.log("Asked to fetch another batch!");
        this.getItems(this.subreddit).then((list: List<any>) => {
            this.items.setRange(0, list.array);
        });
    }

    log(msg: string) {
        console.log('[RandomItemProvider] ' + msg);
    }

    isLoadingItems(): boolean {
        for(var url in this._pendingRequests) {
            if(this._pendingRequests.hasOwnProperty(url)) {
                return true;
            }
        }
        return false;
    }

    _fireChange() {
        this._events.raise(CHANGE_EVENT);
    }


    getItems(subRedditName? : string, options ? : any): Promise {
        var url = this._getFetchUrl(subRedditName, options);
        var requestPromise = < Promise > this._pendingRequests[url];
        if (!requestPromise) {
            requestPromise = this._pendingRequests[url] = new Promise((done, error) => {
                this._pendingRequests[url] = {}; // A big ugly, but
                                                 // this code executes
                                                 // before the lvalue
                                                 // is assigned.
                this._fireChange(); // Let UI update loading animation
                DataRequest.send(url).then((response) => {
                    var list = this._subRedditLists[subRedditName];

                    if (!list) {
                        list = this._subRedditLists[subRedditName] = new List<any>();
                    }

                    this._paginationTokens[subRedditName] = response.data.after;

                    list.setRange(list.getCount(), this._parseResponse(response));

                    delete this._pendingRequests[url];

                    done(list);
                });
            });
        }

        return requestPromise;
    }

    _getFetchUrl(subRedditName ? : string, options ? : any): string {
        var url = 'http://www.reddit.com/r/' + subRedditName + '.json?limit=50';

        for (var option in options) {
            url += '&' + option + '=' + options[option];
        }

        if (this._paginationTokens[subRedditName]) {
            url += '&after=' + this._paginationTokens[subRedditName];
        }

        return url;
    }

    _parseResponse(response) {
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
                } else if (child.url.indexOf('i.imgur.com/') > -1) {
                    url = child.url.substr(0, child.url.lastIndexOf('.')) + 'l' + child.url.substr(child.url.lastIndexOf('.'));
                }

                item.thumbnail = {
                    url: url
                };
            }

            parsedResponse.push(item);
        }

        return parsedResponse;
    }
}

export = RedditDataSource;