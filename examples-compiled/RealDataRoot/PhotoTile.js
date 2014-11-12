var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './PhotoTileModel', '../onejs/View', '../onejs/DomUtils', '../FadeImage/FadeImage', './PhotoTile.css'], function (require, exports, PhotoTileModel, View, DomUtils, FadeImage, PhotoTilecss) {
    DomUtils.loadStyles(PhotoTilecss.styles);
    var PhotoTile = (function (_super) {
        __extends(PhotoTile, _super);
        function PhotoTile() {
            _super.apply(this, arguments);
            this.viewName = 'PhotoTile';
            this.viewModelType = PhotoTileModel;
            this._childView0 = this.addChild(new FadeImage());
            this._spec = {
                "type": 0,
                "tag": "div",
                "attr": {
                    "class": "PhotoTile"
                },
                "children": [
                    {
                        "type": 6,
                        "name": "_childView0",
                        "children": []
                    },
                    {
                        "type": 0,
                        "tag": "div",
                        "attr": {
                            "class": "PhotoTile-namePlate"
                        },
                        "children": [
                            {
                                "type": 0,
                                "tag": "div",
                                "attr": {
                                    "class": "PhotoTile-title"
                                },
                                "binding": {
                                    "id": "0",
                                    "text": "title"
                                },
                                "children": []
                            }
                        ]
                    }
                ]
            };
        }
        PhotoTile.prototype.onInitialize = function () {
            _super.prototype.onInitialize.call(this);
            this._childView0.setData({ class: 'PhotoTile-image' });
        };
        PhotoTile.prototype.onViewModelChanged = function (viewModel, args) {
            _super.prototype.onViewModelChanged.call(this, viewModel, args);
            this._childView0.setData({ url: this.getValue('url()') });
        };
        return PhotoTile;
    })(View);
    return PhotoTile;
});
