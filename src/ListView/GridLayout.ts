import ILayout = require('./ILayout');
import ItemGrouping = require('./ItemGrouping');
import ItemTile = require('../ItemTile/ItemTile');
import List = require('../onejs/List');
import View = require('../onejs/View');
import ViewModel = require('../onejs/ViewModel');

class GridLayout implements ILayout {
    size = {
        width: 0,
        height: 0
    };

    rows = [];

    viewport = {
        width: 0,
        height: 0,
        visibleTop: 0,
        visibileBottom: 0
    };

    _cellsByKey = {};

    groupItems(items: List): List {
        return new List([new ItemGrouping(null, items)]);
    }

    getControlType(item) {
        return ItemTile;
    }

    getItemSize(item) {
        return {
            width: 250,
            height: 80
        }
    }

    reset() {
        this.size = {
            width: 0,
            height: 0
        }
        this.viewport = null;
	console.log("Resetting");
        this.rows = [];
    }

    // TODO - create constructor that takes the child control type

    _allItems(itemGroups: List, callback: (item: any) => any) {

	var count = itemGroups.getCount();
	for(var i = 0; i < count; i++) {
	    var itemGroup = itemGroups.getAt(i);
	    if(itemGroup.header) {
		callback(itemGroup.header);
	    }
	    var itemCount = itemGroup.items.getCount();
	    for(var j = 0; j < itemCount; j++) {
		callback(itemGroup.items.getAt(j));
	    }
	}
    }

    update(itemGroups: List, viewport) {
        // TODO: We should only rebuild the layout if an item has changed or the viewport width has changed.

        if (!this.viewport || this.viewport.width != viewport.width) {
            this.reset();

            this.viewport = viewport;

            this.size = {
                width: viewport.width,
                height: 0
            };

            var rowIndex = 0;
            var currentRow;

            this._allItems(itemGroups, (item) => {
                if (!currentRow) {
                    currentRow = this._createRow(rowIndex++);
                }

                this._addItemToRow(item, currentRow);

                if (this._isRowFull(currentRow)) {
                    this._finalizeRow(currentRow);
                    currentRow = null;
                }
            });

            this._finalizeRow(currentRow);
        }
    }

    _createRow(rowIndex) {
        var row = this.rows[rowIndex];

        if (!row) {
            var previousRow = this.rows[rowIndex - 1];

            row = this.rows[rowIndex] = {
                key: String(rowIndex),
                rowIndex: rowIndex,
                left: 0,
                top: previousRow ? previousRow.top + previousRow.height : 0,
                width: 0,
                height: 0,
                cells: []
            };
        } else {
            row.cells = [];
            row.width = 0;
            row.height = 0;
        }

        return row;
    }

    _isRowFull(row) {
        return row.width >= this.viewport.width;
    }

    _finalizeRow(row) {
        if (row && row.cells.length && row.width > this.viewport.width) {

            var scaleRatio = this.viewport.width / row.width;
            var previousCell;

            for (var i = 0; i < row.cells.length; i++) {
                var cell = row.cells[i];

                row.width -= cell.width;
                cell.width = Math.ceil(cell.width * scaleRatio);
                cell.left = previousCell ? previousCell.left + previousCell.width : 0;
                row.width += cell.width;
                cell.change();
                previousCell = cell;
            }

            if (previousCell && row.width > this.viewport.width) {
                previousCell.width -= (row.width - this.viewport.width);
                row.width = this.viewport.width;
            }

            this.size.height += row.height;
        }
    }

    _addItemToRow(item, row) {
        if (item) {

            var cell = this._cellsByKey[item.key];
            var cellSize = this.getItemSize(item);

            if (!cell) {

                cell = this._cellsByKey[item.key] = new ViewModel({
                    key: item.key,
                    controlType: this.getControlType(item),
                    item: item,
                    left: 0,
                    top: 0,
                    previousRowIndex: -1
                });
		console.log(cell);
            } else {
                // Update previousRowIndex if we are moving to a new row.
                if (cell.rowIndex != row.rowIndex) {
                    cell.previousRowIndex = cell.rowIndex;
                }
            }

            cell.rowIndex = row.rowIndex;
            cell.width = cellSize.width;
            cell.height = cellSize.height;

            if (row.cells.length) {
                var lastCell = row.cells[row.cells.length - 1];

                cell.left = lastCell.left + lastCell.width;
            }

            row.cells.push(cell);
            row.width += cell.width;
            row.height = Math.max(row.height, cell.height);
        }
    }
}

export = GridLayout;