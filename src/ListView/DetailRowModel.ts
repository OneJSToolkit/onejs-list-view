import ViewModel = require('../onejs/ViewModel');
import Selection = require('../onejs/Selection');

class DetailRowModel extends ViewModel {

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


}

export = DetailRowModel;