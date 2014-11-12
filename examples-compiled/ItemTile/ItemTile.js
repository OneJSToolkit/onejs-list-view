var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './ItemTileModel', '../onejs/DomUtils', './ItemTileBase', '../FadeImage/FadeImage', './ItemTile.css'], function (require, exports, ItemTileModel, DomUtils, ItemTileBase, FadeImage, ItemTilecss) {
    DomUtils.loadStyles(ItemTilecss.styles);
    var ItemTile = (function (_super) {
        __extends(ItemTile, _super);
        function ItemTile() {
            _super.apply(this, arguments);
            this.viewName = 'ItemTile';
            this.viewModelType = ItemTileModel;
            this._childView0 = this.addChild(new FadeImage());
            this._spec = {
                "type": 0,
                "tag": "div",
                "attr": {
                    "class": "ItemTile"
                },
                "binding": {
                    "id": "0",
                    "className": {
                        "isSelected": "isSelected"
                    }
                },
                "children": [
                    {
                        "type": 4,
                        "source": "thumbnail.url",
                        "children": [
                            {
                                "type": 6,
                                "name": "_childView0",
                                "children": []
                            }
                        ]
                    },
                    {
                        "type": 4,
                        "source": "hasNameplate",
                        "children": [
                            {
                                "type": 0,
                                "tag": "div",
                                "attr": {
                                    "class": "ItemTile-namePlate"
                                },
                                "children": [
                                    {
                                        "type": 4,
                                        "source": "$not(subTitle)",
                                        "children": [
                                            {
                                                "type": 0,
                                                "tag": "div",
                                                "attr": {
                                                    "class": "ItemTile-count"
                                                },
                                                "binding": {
                                                    "id": "1",
                                                    "text": "count"
                                                },
                                                "children": []
                                            },
                                            {
                                                "type": 0,
                                                "tag": "div",
                                                "attr": {
                                                    "class": "ItemTile-title"
                                                },
                                                "binding": {
                                                    "id": "2",
                                                    "text": "title"
                                                },
                                                "children": []
                                            }
                                        ]
                                    },
                                    {
                                        "type": 4,
                                        "source": "subTitle",
                                        "children": [
                                            {
                                                "type": 0,
                                                "tag": "div",
                                                "attr": {
                                                    "class": "ItemTile-title"
                                                },
                                                "binding": {
                                                    "id": "3",
                                                    "text": "title"
                                                },
                                                "children": []
                                            },
                                            {
                                                "type": 0,
                                                "tag": "div",
                                                "attr": {
                                                    "class": "ItemTile-count"
                                                },
                                                "binding": {
                                                    "id": "4",
                                                    "text": "count"
                                                },
                                                "children": []
                                            },
                                            {
                                                "type": 0,
                                                "tag": "div",
                                                "attr": {
                                                    "class": "ItemTile-subTitle"
                                                },
                                                "binding": {
                                                    "id": "5",
                                                    "text": "subTitle"
                                                },
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": 4,
                        "source": "isSelected",
                        "children": [
                            {
                                "type": 0,
                                "tag": "div",
                                "attr": {
                                    "class": "ItemTile-selectOverlay"
                                },
                                "children": []
                            }
                        ]
                    }
                ]
            };
        }
        ItemTile.prototype.onInitialize = function () {
            _super.prototype.onInitialize.call(this);
            this._childView0.setData({ class: 'ItemTile-image' });
        };
        ItemTile.prototype.onViewModelChanged = function (viewModel, args) {
            _super.prototype.onViewModelChanged.call(this, viewModel, args);
            this._childView0.setData({ url: this.getValue('thumbnail.url') });
        };
        return ItemTile;
    })(ItemTileBase);
    return ItemTile;
});
