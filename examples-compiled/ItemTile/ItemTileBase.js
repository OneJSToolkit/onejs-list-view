var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/View'], function (require, exports, View) {
    var ItemTileBase = (function (_super) {
        __extends(ItemTileBase, _super);
        function ItemTileBase() {
            _super.apply(this, arguments);
        }
        ItemTileBase.prototype.not = function (val) {
            return !val;
        };
        return ItemTileBase;
    })(View);
    return ItemTileBase;
});
