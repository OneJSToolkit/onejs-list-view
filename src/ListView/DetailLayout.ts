import DetailHeader = require('./DetailHeader');
import DetailRow = require('./DetailRow');
import GridLayout = require('./GridLayout');
import ItemGroupHeader = require('./ItemGroupHeader');
import ItemGrouping = require('./ItemGrouping');
import View = require('../onejs/View');
import List = require('../onejs/List');

class DetailLayout extends GridLayout {

    columns: string[];

    constructor(columns: string[]) {
        super();
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

    getItemSize(item) {
        return {
            width: 999999,
            height: 30
        };
    }
}

export = DetailLayout;