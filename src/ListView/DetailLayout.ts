import BaseLayout = require('./BaseLayout');
import DetailRow = require('../DetailRow/DetailRow');
import DetailHeader = require('../DetailHeader/DetailHeader');
import ICellDefinition = require('./ICellDefinition');
import IColumnDefinition = require('./IColumnDefinition');
import List = require('../onejs/List');

class DetailLayout extends BaseLayout {

    _columns: List<IColumnDefinition>;

	constructor(columns?: List<IColumnDefinition>) {
		super();
        this._columns = columns || new List<IColumnDefinition>();
	}

    getHeaderLayout(firstItem): ICellDefinition {
        if (firstItem && this._columns.getCount() === 0) {
            this._updateColumnsFromItem(firstItem);
        }
        return {
            key: 'header',
            viewType: DetailHeader,
            viewData: {
                foo: 'bar',
                columns: this._columns
            },
            width: 99999,
            height: 30,
            lineBreak: true
        };
    }

    getPreItemLayout(item, index): ICellDefinition {
        return null;
    }

    getItemLayout(item, index): ICellDefinition {
        return {
            key: item.key,
            viewType: DetailRow,
            viewData: {
                item: item,
                columns: this._columns
            },
            className: index % 2 ? 'odd' : 'even',
            width: 99999,
            height: 30
        };
    }

    getFooterLayout(): ICellDefinition {
        return null;
    }

    _updateColumnsFromItem(item) {
        var columns = [];

        for (var propName in item) {
            if (propName != 'key' && typeof item[propName] !== 'object') {
                columns.push({
                    key: propName,
                    title: propName,
                    width: 150,
                    isVisible: true,
                    isSorted: false,
                    isAscending: false
                });                
            }
        }

        this._columns.array = columns;
        this._columns.change();
    }

}

export = DetailLayout;

