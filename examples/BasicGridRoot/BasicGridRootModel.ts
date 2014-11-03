import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import RedditDataSource = require('../RedditDataSource/RedditDataSource');

class BasicGridRootModel extends ViewModel {
    items = new List<any>();
    
    _dataSource = new RedditDataSource();

    onInitialize() {
        console.log('Requesting data from reddit.');

        this._dataSource.getItems('aww')
            .then((list) => {
                console.log('Received response.');
                this.setData({ items: list });
            });
    }
}

export = BasicGridRootModel;