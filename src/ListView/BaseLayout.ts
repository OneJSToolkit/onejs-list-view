import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import View = require('../onejs/View');
import ICellDefinition = require('./ICellDefinition');

class BaseLayout {
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
    _currentRow;

    getHeaderLayout(firstItem): ICellDefinition {
        return null;
    }

    getPreItemLayout(item, index): ICellDefinition {
        return null;
    }

    getItemLayout(item, index): ICellDefinition {
        return null;
    }

    getFooterLayout(): ICellDefinition {
        return null;
    }

    reset() {
        this.size = {
            width: 0,
            height: 0
        }
        this.viewport = null;
        this.rows = [];
    }

    update(items: List < any > , viewport) {
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
            var item;
            var previousItem = null;

            this._currentRow = null;
            this._createCell(this.getHeaderLayout(items.getAt(0)));

            for (var i = 0; i < itemCount; i++) {
                item = items.getAt(i);
                this._createCell(this.getPreItemLayout(item, i), item, i);
                this._createCell(this.getItemLayout(item, i), item, i);
                previousItem = item;
            }

            this._finalizeRow();
            this._createCell(this.getFooterLayout());
        }
    }

    _createCell(cellLayout: ICellDefinition, item ? : any, index ? : number) {
        if (cellLayout) {
            if (this._currentRow && (cellLayout.lineBreak || this._isRowFull())) {
                this._finalizeRow();
            }

            if (!this._currentRow) {
                this._currentRow = this._createRow();
            }

            this._addCellToRow(cellLayout, this._currentRow);

            if (cellLayout.lineBreak) {
                this._finalizeRow();
            }
        }
    }

    _createRow() {
        var rowIndex = this.rows.length;
        var previousRow = this.rows[rowIndex - 1];

        return this.rows[rowIndex] = {
            key: String(rowIndex),
            rowIndex: rowIndex,
            left: 0,
            top: previousRow ? previousRow.top + previousRow.height : 0,
            width: 0,
            height: 0,
            cells: []
        };
    }

    _isRowFull() {
        var row = this._currentRow;

        return row && row.width >= this.viewport.width;
    }

    _finalizeRow() {
        var row = this._currentRow;

        if (row) {
            this._currentRow = null;

            if (row.cells.length && row.width > this.viewport.width) {
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
            }

            this.size.height += row.height;
        }
    }

    _addCellToRow(cell, row) {
        if (cell.width || cell.height) {
            cell.rowIndex = row.rowIndex;

            if (row.cells.length) {
                var lastCell = row.cells[row.cells.length - 1];

                cell.left = lastCell.left + lastCell.width;
            } else {
                cell.left = 0;
            }

            row.cells.push(cell);

            row.width += cell.width || 0;
            row.height = Math.max(row.height, cell.height || 0);
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
}

export = BaseLayout;