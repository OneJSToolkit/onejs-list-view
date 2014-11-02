import ItemTileModel = require('./ItemTileModel');
import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import ItemTilecss = require('./ItemTile.css');

DomUtils.loadStyles(ItemTilecss.styles);

class ItemTile extends View {
    viewName = 'ItemTile';
    viewModelType = ItemTileModel;

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", ["class","ItemTile"], [
            DomUtils.ce("span", [], [], bindings[0])
        ]));
    }

    _bindings = [
        {
            "id": "0",
            "text": "text"
        }
    ];
}

export = ItemTile;
