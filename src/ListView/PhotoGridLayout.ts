import ItemTile = require('../ItemTile/ItemTile');
import GridLayout = require('./GridLayout');

class PhotoGridLayout extends GridLayout {

    getControlType(item) {
        return ItemTile;
    }

    getItemSize(item) {

    	if (item && item.image) {
    		return item.image;
    	}
    else {
    	return {
    		width: 200,
    		height: 200
    	}
    }
    }
}

export = PhotoGridLayout;