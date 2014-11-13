import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import RedditDataSource = require('../RedditDataSource/RedditDataSource');
import GridLayout = require('../ListView/GridLayout');

class BasicGridRootModel extends ViewModel {
    itemProvider = new RedditDataSource();
    layout = new GridLayout();
}

export = BasicGridRootModel;