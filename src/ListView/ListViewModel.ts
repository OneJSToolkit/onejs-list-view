import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import GridLayout = require('./GridLayout');

class ListViewModel extends ViewModel {
    viewportClass = 'listview-viewport';
    layout = new GridLayout();
    items = new List();
}

export = ListViewModel;