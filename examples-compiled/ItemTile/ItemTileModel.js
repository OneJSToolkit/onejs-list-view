var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/ViewModel'], function (require, exports, ViewModel) {
    var ItemTileModel = (function (_super) {
        __extends(ItemTileModel, _super);
        function ItemTileModel() {
            _super.apply(this, arguments);
            this.name = "foo";
        }
        ItemTileModel.prototype.onInitialize = function () {
            // this.selection = this.getParentValue('selection');
        };
        ItemTileModel.prototype.hasNameplate = function () {
            return true;
        };
        return ItemTileModel;
    })(ViewModel);
    return ItemTileModel;
});
