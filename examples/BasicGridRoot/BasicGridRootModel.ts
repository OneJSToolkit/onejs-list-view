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

        DataRequest.send('http://www.reddit.com/r/pics.json?limit=1000')
            .then(function(response) {
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
                item.thumbnail = {
                    url: child.thumbnail
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