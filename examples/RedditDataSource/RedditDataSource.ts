import Promise = require('../onejs/Promise');
import DataRequest = require('../onejs/DataRequest');
import List = require('../onejs/List');

class RedditDataSource {
    _pendingRequests = {};
    _subRedditLists = {};

    getItems(subRedditName? : string, options ? : any): Promise {
        var url = this._getFetchUrl(subRedditName, options);
        var requestPromise = < Promise > this._pendingRequests[url];

        if (!requestPromise) {
            requestPromise = this._pendingRequests[url] = new Promise((done, error) => {
                DataRequest.send(url).then((response) => {
                    var list = this._subRedditLists[subRedditName];

                    if (!list) {
                        list = this._subRedditLists[subRedditName] = new List<any>();
                    }

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