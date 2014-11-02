import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import DataRequest = require('../onejs/DataRequest');

class BasicGridRootModel extends ViewModel {
    items: List < any > ;

    constructor() {
        super();
        this.items = new List < any > ();
        /*
        for (var i = 0; i < 1000; i++) {
            this.items.push(this.makeObject(i));
        }*/
    }

    onInitialize() {
        var _this = this;

        console.log('Requesting data from reddit.');
        DataRequest.send('http://www.reddit.com/r/aww.json?limit=50')
            .then(function(response) {
                console.log('Got response.');
                _this.items.array = _this.parseResponse(response);
                _this.items.change();
            });
    }

    parseResponse(response) {
        var parsedResponse = [];


        for (var i = 0; i < response.data.children.length; i++)
        {
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
    }

    makeObject(i: number): any {
        return {
            key: i,
            title: 'Item ' + i + ' long obnoxious truncated text here.',
            subTitle: i % 3 === 2 ? 'Subtitle here, more stuff here that will be truncated' : '',
            count: 0
        };
    }
}

export = BasicGridRootModel;