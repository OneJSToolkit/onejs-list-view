var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/ViewModel'], function (require, exports, ViewModel) {
    var DetailRowModel = (function (_super) {
        __extends(DetailRowModel, _super);
        function DetailRowModel() {
            _super.apply(this, arguments);
            this.parentValues = [
                'selection'
            ];
        }
        DetailRowModel.prototype.getClass = function (column) {
            var className = 'DetailRow-cell ' + column.key;
            return className;
        };
        DetailRowModel.prototype.getStyle = function (column) {
            return 'width: ' + column.width + 'px';
        };
        DetailRowModel.prototype.getTextValue = function (column) {
            var val = '';
            if (this.item && column) {
                val = this.item[column.key];
            }
            return val;
        };
        return DetailRowModel;
    })(ViewModel);
    return DetailRowModel;
});
