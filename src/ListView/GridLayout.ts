import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import View = require('../onejs/View');
import ItemTile = require('../ItemTile/ItemTile');
import ItemGroupHeader = require('./ItemGroupHeader');
import ItemGrouping = require('./ItemGrouping');
import Threshold = require('./Threshold');

class GridLayout {
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

    getControlType(item): any {
        return this.controlType;
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
        this.rows = [];
    }

    update(items: List<any>, viewport) {
      */
    // TODO move to a static on ItemGrouping
    _allItems(itemGroups: List<ItemGrouping>, callback: (item: any) => any) {
        // TODO: We should only rebuild the layout if an item has changed or the viewport width has changed.

        if (!this.viewport || this.viewport.width != viewport.width) {
            this.reset();

            this.viewport = viewport;

            this.size = {
                width: viewport.width,
                height: 0
            };

            var itemCount = items.getCount();
            var itemIndex = 0;
            var rowIndex = 0;
            var currentRow;

            while (itemIndex < itemCount) {
                if (!currentRow) {
                    currentRow = this._createRow(rowIndex++);
                }

                this._addItemToRow(items.getAt(itemIndex), currentRow);

                if (this._isRowFull(currentRow)) {
                    this._finalizeRow(currentRow);
                    currentRow = null;
                }

                itemIndex++;
            }

            this._finalizeRow(currentRow);
            this._logRows();
        }
    }

    _logRows() {
        for (var rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
            var rowInfo = 'row ' + rowIndex + ': ';
            var row = this.rows[rowIndex];

            for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                var cell = row.cells[cellIndex];
                rowInfo += cell.item.text + ' (' + cell.left + ' ' + cell.width + 'x' + cell.height + ') ';
            }

            console.log(rowInfo);
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
        if (row && row.cells.length) {

            var scaleRatio = this.viewport.width / row.width;
            var previousCell;

            for (var i = 0; i < row.cells.length; i++) {
                var cell = row.cells[i];

                row.width -= cell.width;
                cell.width = Math.ceil(cell.width * scaleRatio);
                cell.left = previousCell ? previousCell.left + previousCell.width : 0;
                row.width += cell.width;

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

                cell = this._cellsByKey[item.key] = {
                    key: item.key,
                    controlType: this.getControlType(item),
                    item: item,
                    left: 0,
                    top: 0,
                    previousRowIndex: -1
                };
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
            else {
                cell.left = 0;
            }

            row.cells.push(cell);
            row.width += cell.width;
            row.height = Math.max(row.height, cell.height);
        }
    }
    _selectThreshold(viewport: any, thresholds: List<Threshold>): Threshold {
}

export = GridLayout;