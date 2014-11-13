import ViewModel = require('../onejs/ViewModel');
import Selection = require('../onejs/Selection');

class DetailRowModel extends ViewModel {

    parentValues = [
        'selection'
    ];

    item;
    columns;

    getClass(column) {
        var className = 'DetailRow-cell ' + column.key;

        return className;
    }

    getStyle(column) {
        return 'width: ' + column.width + 'px';
    }

    getTextValue(column) {
        var val = '';

        if (this.item && column) {
            val = this.item[column.key];
        }

        return val;
    }

}

export = DetailRowModel;