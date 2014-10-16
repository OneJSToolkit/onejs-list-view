import List = require('../onejs/List');
import ItemGroupHeader = require('./ItemGroupHeader');

class ItemGrouping {
    header: ItemGroupHeader;
    items: List;

    constructor(header: ItemGroupHeader, items: List) {
        this.header = header;
        this.items = items;
    }
}

export = ItemGrouping;