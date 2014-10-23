import GridLayout = require('./GridLayout');
import DetailRow = require('../DetailRow/DetailRow');
import ItemGroupHeader = require('./ItemGroupHeader');
import ItemGrouping = require('./ItemGrouping');
import List = require('../onejs/List');

class DetailLayout extends GridLayout {

    constructor(columns: any[]) {
        super();
    }

    groupItems(items): List<ItemGrouping> {
        return new List<ItemGrouping>([new ItemGrouping(new ItemGroupHeader(), items)]);
    }

    getControlType(item) {
        if(item instanceof ItemGroupHeader) {
            return DetailRow;	// TODO DetailHeader
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