import ViewModel = require('../onejs/ViewModel');
import Selection = require('../onejs/Selection');

class DetailRowModel extends ViewModel {

    parentValues = [
        'selection'
    ];

    getIconClass(type) {
    	return 'DetailRow-cell icon ' + type;
    }

}

export = DetailRowModel;