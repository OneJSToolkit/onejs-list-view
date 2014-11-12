define(["require", "exports"], function (require, exports) {
    var BaseLayout = (function () {
        function BaseLayout() {
            this.size = {
                width: 0,
                height: 0
            };
            this.rows = [];
            this.viewport = {
                width: 0,
                height: 0,
                visibleTop: 0,
                visibileBottom: 0
            };
            this._cellsByKey = {};
        }
        BaseLayout.prototype.getHeaderLayout = function (firstItem) {
            return null;
        };
        BaseLayout.prototype.getPreItemLayout = function (item, index) {
            return null;
        };
        BaseLayout.prototype.getItemLayout = function (item, index) {
            return null;
        };
        BaseLayout.prototype.getFooterLayout = function () {
            return null;
        };
        BaseLayout.prototype.reset = function () {
            this.size = {
                width: 0,
                height: 0
            };
            this.viewport = null;
            this.rows = [];
        };
        BaseLayout.prototype.update = function (items, viewport) {
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
        };
        BaseLayout.prototype._createCell = function (cellLayout, item, index) {
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
        };
        BaseLayout.prototype._createRow = function () {
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
        };
        BaseLayout.prototype._isRowFull = function () {
            var row = this._currentRow;
            return row && row.width >= this.viewport.width;
        };
        BaseLayout.prototype._finalizeRow = function () {
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
        };
        BaseLayout.prototype._addCellToRow = function (cell, row) {
            if (cell.width || cell.height) {
                cell.rowIndex = row.rowIndex;
                if (row.cells.length) {
                    var lastCell = row.cells[row.cells.length - 1];
                    cell.left = lastCell.left + lastCell.width;
                }
                else {
                    cell.left = 0;
                }
                row.cells.push(cell);
                row.width += cell.width || 0;
                row.height = Math.max(row.height, cell.height || 0);
            }
        };
        BaseLayout.prototype._logRows = function () {
            for (var rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
                var rowInfo = 'row ' + rowIndex + ': ';
                var row = this.rows[rowIndex];
                for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                    var cell = row.cells[cellIndex];
                    rowInfo += cell.item.text + ' (' + cell.left + ' ' + cell.width + 'x' + cell.height + ') ';
                }
                console.log(rowInfo);
            }
        };
        return BaseLayout;
    })();
    return BaseLayout;
});
