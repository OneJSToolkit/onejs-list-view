import ViewModel = require('../onejs/ViewModel');

class ItemTileModel extends ViewModel {
    selection: Selection;

    name = "foo";

    onInitialize() {
        // this.selection = this.getParentValue('selection');
    }

    hasNameplate() {
        return true;
    }
}

export = ItemTileModel;