import ViewModel = require('../onejs/ViewModel');

class DetailHeaderModel extends ViewModel {
	parentValues = [
		'selection'
	];

	columns = [
		{
			name: '',
			type: 'check',
			width: 100
		},
		{
			name: 'Name',
			isSorted: true,
			isAscending: false,
			width: 100
		},
		{
			name: 'Date modified',
			isSorted: false,
			isAscending: false,
			width: 100
		},
		{
			name: 'Sharing',
			isSorted: false,
			isAscending: false,
			width: 100
		},
		{
			name: 'Size',
			isSorted: false,
			isAscending: false,
			width: 100
		}
	];
}

export = DetailHeaderModel;