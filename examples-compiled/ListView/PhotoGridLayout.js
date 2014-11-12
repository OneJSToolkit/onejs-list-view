var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../ItemTile/ItemTile', './GridLayout'], function (require, exports, ItemTile, GridLayout) {
    var PhotoGridLayout = (function (_super) {
        __extends(PhotoGridLayout, _super);
        function PhotoGridLayout() {
            _super.apply(this, arguments);
        }
        PhotoGridLayout.prototype.getControlType = function (item) {
            return ItemTile;
        };
        PhotoGridLayout.prototype.getItemSize = function (item) {
            if (item && item.image) {
                return item.image;
            }
            else {
                return {
                    width: 200,
                    height: 200
                };
            }
        };
        return PhotoGridLayout;
    })(GridLayout);
    return PhotoGridLayout;
});
