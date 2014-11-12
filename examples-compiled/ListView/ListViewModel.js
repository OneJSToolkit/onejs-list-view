var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/ViewModel', '../onejs/List', './GridLayout'], function (require, exports, ViewModel, List, GridLayout) {
    var ListViewModel = (function (_super) {
        __extends(ListViewModel, _super);
        function ListViewModel() {
            _super.apply(this, arguments);
            this.viewportClass = 'listview-viewport';
            this.layout = new GridLayout();
            this.items = new List();
        }
        return ListViewModel;
    })(ViewModel);
    return ListViewModel;
});
