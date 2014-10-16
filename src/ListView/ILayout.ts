import List = require('../onejs/List');
import ItemGrouping = require('./ItemGrouping');

interface ILayout {
    groupItems(items: List): List;
    getControlType(item);
}

export = ILayout;
