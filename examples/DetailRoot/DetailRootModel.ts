import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import DetailLayout = require('../ListView/DetailLayout');
import RedditDataSource = require('../RedditDataSource/RedditDataSource');

class DetailRootModel extends ViewModel {
    items = new List<any>();
    layout: DetailLayout;
    columns: string[];

    _dataSource = new RedditDataSource();

    constructor() {
        super();
        this.layout = new DetailLayout();
    }

    onInitialize() {
        console.log('Requesting data from reddit.');

        this._dataSource.getItems('aww')
            .then((list) => {
                console.log('Received response.');
                this.setData({ items: list });
            });
    }
}

export = DetailRootModel;