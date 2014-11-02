import GridLayout = require('./GridLayout');
import DetailRow = require('../DetailRow/DetailRow');
import DetailHeader = require('../DetailHeader/DetailHeader');

class DetailLayout extends GridLayout {

    constructor(columns: any[]) {
        super();

	}

    getControlType(item) {

        return DetailRow;
    }

    getGroupName(item) {
        return 'default';
    }

    getHeaderControlType(groupName) {
        return DetailHeader;
    }

    getItemSize(item) {

        return {       	
            width: 999999,
            height: 30
        };
    }
}

export = DetailLayout;

