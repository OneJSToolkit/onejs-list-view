import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import DetailLayout = require('./DetailLayout');

class ListViewModel extends ViewModel {
    viewportClass = 'listview-viewport';
    layout = new DetailLayout();
    items = new List();
}

export = ListViewModel;