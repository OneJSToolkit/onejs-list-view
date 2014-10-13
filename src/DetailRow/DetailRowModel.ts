import ViewModel = require('../onejs/ViewModel');
import Selection = require('../onejs/Selection');
import ItemHelper = require('../Utilities/ItemHelper');

class DetailRowModel extends ViewModel {
	ItemHelper = ItemHelper;

    parentValues = [
        'selection'
    ];

    getIconClass(type) {
    	return 'DetailRow-cell icon ' + type;
    }

    formatDate(dateString) {
        var d = new Date(dateString);

        function addZero(n) {
            return n < 10 ? '0' + n : '' + n;
        }

        return addZero(d.getMonth() + 1) + "/" + addZero(d.getDate()) + "/" + d.getFullYear();
    }

    formatSharing(sharingString) {
    	return 'Just me';
    }

}

export = DetailRowModel;