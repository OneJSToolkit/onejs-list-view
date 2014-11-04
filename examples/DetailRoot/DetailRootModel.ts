import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import DetailLayout = require('../ListView/DetailLayout');
import RedditDataSource = require('../RedditDataSource/RedditDataSource');

class DetailRootModel extends ViewModel {
    itemProvider = new RedditDataSource();

    layout: DetailLayout;
    columns: string[];

    constructor() {
        super();
        this.layout = new DetailLayout();
    }
}

export = DetailRootModel;