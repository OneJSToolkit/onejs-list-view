var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/ViewModel', '../ListView/DetailLayout', '../RedditDataSource/RedditDataSource'], function (require, exports, ViewModel, DetailLayout, RedditDataSource) {
    var DetailRootModel = (function (_super) {
        __extends(DetailRootModel, _super);
        function DetailRootModel() {
            _super.call(this);
            this.itemProvider = new RedditDataSource();
            this.layout = new DetailLayout();
        }
        return DetailRootModel;
    })(ViewModel);
    return DetailRootModel;
});
