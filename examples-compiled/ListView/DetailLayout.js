var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './BaseLayout', '../DetailRow/DetailRow', '../DetailHeader/DetailHeader', '../onejs/List'], function (require, exports, BaseLayout, DetailRow, DetailHeader, List) {
    var DetailLayout = (function (_super) {
        __extends(DetailLayout, _super);
        function DetailLayout(columns) {
            _super.call(this);
            this._columns = columns || new List();
        }
        DetailLayout.prototype.getHeaderLayout = function (firstItem) {
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
        };
        DetailLayout.prototype.getPreItemLayout = function (item, index) {
            return null;
        };
        DetailLayout.prototype.getItemLayout = function (item, index) {
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
        };
        DetailLayout.prototype.getFooterLayout = function () {
            return null;
        };
        DetailLayout.prototype._updateColumnsFromItem = function (item) {
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
        };
        return DetailLayout;
    })(BaseLayout);
    return DetailLayout;
});
