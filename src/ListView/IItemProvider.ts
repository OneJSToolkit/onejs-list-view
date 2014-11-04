import IItem = require('../onejs/IItem');
import List = require('../onejs/List');

interface IItemProvider {
    items: List<IItem>;
    loadNextBatch();
    isLoadingItems(): boolean;
}

export = IItemProvider;