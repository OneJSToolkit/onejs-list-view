var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/ViewModel'], function (require, exports, ViewModel) {
    var DetailHeaderModel = (function (_super) {
        __extends(DetailHeaderModel, _super);
        function DetailHeaderModel() {
            _super.apply(this, arguments);
            this.parentValues = [
                'selection'
            ];
        }
        DetailHeaderModel.prototype.getClass = function (column) {
            var className = 'DetailHeader-cell ' + column.key;
            if (column.isSorted) {
                className += ' isSorted';
                className += (column.isDescending) ? ' isDescending' : 'isAscending';
            }
            return className;
        };
        DetailHeaderModel.prototype.getStyle = function (column) {
            return 'width: ' + column.width + 'px';
        };
        return DetailHeaderModel;
    })(ViewModel);
    return DetailHeaderModel;
});
