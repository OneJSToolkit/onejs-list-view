var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './BaseLayout', '../ItemTile/ItemTile'], function (require, exports, BaseLayout, ItemTile) {
    var GridLayout = (function (_super) {
        __extends(GridLayout, _super);
        function GridLayout() {
            _super.apply(this, arguments);
            this._sizeStops = [
                {
                    viewportWidth: 99999,
                    width: 350,
                    height: 200
                },
                {
                    viewportWidth: 770,
                    width: 250,
                    height: 160
                },
                {
                    viewportWidth: 400,
                    className: 'smallForm',
                    width: 99999,
                    height: 180
                }
            ];
        }
        /*
          getPreItemLayout(item, index): ICellDefinition {
          // Example of doing grouping line breaks and adding spacing.
    
          var layout = null;
    
          if (item && item.title && item.title.indexOf('a') === -1) {
          layout = {
          height: 50,
          lineBreak: true
          };
          }
    
          return layout;
          }
        */
        GridLayout.prototype.getItemLayout = function (item, index) {
            var size = this._getSize(this.viewport.width);
            return {
                key: item.key,
                viewType: ItemTile,
                viewData: item,
                className: size.className,
                width: size.width,
                height: size.height
            };
        };
        GridLayout.prototype._getSize = function (width) {
            // Example of returning a tile size relative to viewport size.
            if (this._viewportWidth != width) {
                var sizeStops = this._sizeStops;
                this._viewportWidth = width;
                for (var i = 0; i < sizeStops.length; i++) {
                    this._currentSize = sizeStops[i];
                    if (sizeStops[i + 1] && sizeStops[i + 1].viewportWidth < width) {
                        break;
                    }
                }
            }
            return this._currentSize;
        };
        return GridLayout;
    })(BaseLayout);
    return GridLayout;
});
