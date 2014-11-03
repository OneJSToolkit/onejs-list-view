import GridLayout = require('../ListView/GridLayout');
import ICellDefinition = require('../ListView/ICellDefinition');
import PhotoTile = require('./PhotoTile');

class PhotoGridLayout extends GridLayout {
    getItemLayout(item, index): ICellDefinition {
        var size = this._getSize(this.viewport.width);

        return {
            key: item.id,
            viewType: PhotoTile,
            viewData: item,
            className: size.className,
            width: size.width,
            height: size.height
        };
    }
}

export = PhotoGridLayout;