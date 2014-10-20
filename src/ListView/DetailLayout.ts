import DetailHeader = require('./DetailHeader');
import DetailRow = require('./DetailRow');
import GridLayout = require('./GridLayout');
import ItemGroupHeader = require('./ItemGroupHeader');
import ItemGrouping = require('./ItemGrouping');
import Threshold = require('./Threshold');
import List = require('../onejs/List');
import View = require('../onejs/View');
import ViewModel = require('../onejs/ViewModel');

class DetailLayout extends GridLayout {

    columns: string[];

    constructor(columns: string[], thresholds?: List) {
        super(null, thresholds);
        this.columns = columns;
    }

    groupItems(items): List {
	return new List([new ItemGrouping(new ItemGroupHeader(), items)]);
    }

    getControlType(item) {
	if(item instanceof ItemGroupHeader) {
	    return DetailHeader;
	}
        return DetailRow;
    }

    getCellSize(cell: any, threshold?: Threshold): any {
	var height = 30;
	if(threshold && threshold.name === 'small') {
	    height = this.columns.length * 30;
	}
        return {
            width: 999999,
            height: height
        };
    }
}

export = DetailLayout;