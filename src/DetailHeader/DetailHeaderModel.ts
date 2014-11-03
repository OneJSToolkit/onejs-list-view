import ViewModel = require('../onejs/ViewModel');

class DetailHeaderModel extends ViewModel {
	parentValues = [
		'selection'
	];
 
	getClass(column) {
		var className = 'DetailHeader-cell ' + column.key;

		if (column.isSorted) {
			className += ' isSorted';

			className += (column.isDescending) ? ' isDescending' : 'isAscending';
		}

		return className;
	}

	getStyle(column) {
		return 'width: ' + column.width + 'px';
	}
}

export = DetailHeaderModel;