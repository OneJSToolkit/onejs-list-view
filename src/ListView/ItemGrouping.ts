import List = require('../onejs/List');
import ItemGroupHeader = require('./ItemGroupHeader');
import IItem = require('../onejs/IItem');

class ItemGrouping {
    header: ItemGroupHeader;
    items: List<IItem>;

    constructor(header: ItemGroupHeader, items: List<IItem>) {
        this.header = header;
        this.items = items;
    }
}

export = ItemGrouping;