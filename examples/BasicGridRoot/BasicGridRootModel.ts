import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import RedditDataSource = require('../RedditDataSource/RedditDataSource');

class BasicGridRootModel extends ViewModel {
    itemProvider = new RedditDataSource();
}

export = BasicGridRootModel;