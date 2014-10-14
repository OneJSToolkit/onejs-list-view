import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import GridLayout = require('./GridLayout');
import ILayout = require('./ILayout');

class ListViewModel extends ViewModel {
    viewportClass = 'listview-viewport';
    layout: ILayout = new GridLayout();
    items = new List();
}

export = ListViewModel;