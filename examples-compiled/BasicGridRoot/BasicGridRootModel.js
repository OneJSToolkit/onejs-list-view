var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/ViewModel', '../RedditDataSource/RedditDataSource'], function (require, exports, ViewModel, RedditDataSource) {
    var BasicGridRootModel = (function (_super) {
        __extends(BasicGridRootModel, _super);
        function BasicGridRootModel() {
            _super.apply(this, arguments);
            this.itemProvider = new RedditDataSource();
        }
        return BasicGridRootModel;
    })(ViewModel);
    return BasicGridRootModel;
});
