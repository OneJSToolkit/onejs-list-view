var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../ListView/GridLayout', './PhotoTile'], function (require, exports, GridLayout, PhotoTile) {
    var PhotoGridLayout = (function (_super) {
        __extends(PhotoGridLayout, _super);
        function PhotoGridLayout() {
            _super.apply(this, arguments);
        }
        PhotoGridLayout.prototype.getItemLayout = function (item, index) {
            var size = this._getSize(this.viewport.width);
            return {
                key: item.id,
                viewType: PhotoTile,
                viewData: item,
                className: size.className,
                width: size.width,
                height: size.height
            };
        };
        return PhotoGridLayout;
    })(GridLayout);
    return PhotoGridLayout;
});
