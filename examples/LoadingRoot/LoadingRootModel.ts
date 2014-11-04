import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import GridLayout = require('../ListView/GridLayout');
import IItemProvider = require('../ListView/IItemProvider');
import RandomItemProvider = require('./RandomItemProvider');

class DetailRootModel extends ViewModel {
    itemProvider: IItemProvider;
    layout: GridLayout;

    constructor() {
        super();
	this.itemProvider = new RandomItemProvider();
        this.layout = new GridLayout();
    }
}

export = DetailRootModel;