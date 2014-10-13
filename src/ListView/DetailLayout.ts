import GridLayout = require('./GridLayout');
import DetailRow = require('../DetailRow/DetailRow');

class DetailLayout extends GridLayout {

    getControlType(item) {
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