import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import IItem = require('../onejs/IItem');
import RedditDataSource = require('../RedditDataSource/RedditDataSource');
import GridLayout = require('../ListView/GridLayout');
import FlickrDataProvider = require('../RealDataRoot/FlickrDataRequest');

class BasicGridRootModel extends ViewModel {
    itemProvider = new RedditDataSource();
    layout = new GridLayout();

    itemProvider2 = new RedditDataSource();

    items = new List<IItem>();
    items2 = new List<IItem>();

    constructor() {
        super();
        this.itemProvider2.subreddit = 'jokes'
    }

    findKey(element): string {
        if(!element) {
            return null;
        }
        if(element['data-item-key']) {
            return element['data-item-key'];
        }
        return this.findKey(element.parentNode);
    }

    foo(event) {
        var itemKey = this.findKey(event.target);
        if(itemKey) {
            this.items.push({ key: itemKey, theKey: itemKey });
        }
    }

    bar() {
        var itemKey = this.findKey(event.target);
        if(itemKey) {
            this.items2.push({ key: itemKey, theKey: itemKey });
        }
    }
}

export = BasicGridRootModel;