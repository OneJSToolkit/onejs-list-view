var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './BasicGridRootModel', '../onejs/View', '../onejs/DomUtils', '../ListView/ListView', './BasicGridRoot.css'], function (require, exports, BasicGridRootModel, View, DomUtils, ListView, BasicGridRootcss) {
    DomUtils.loadStyles(BasicGridRootcss.styles);
    var BasicGridRoot = (function (_super) {
        __extends(BasicGridRoot, _super);
        function BasicGridRoot() {
            _super.apply(this, arguments);
            this.viewName = 'BasicGridRoot';
            this.viewModelType = BasicGridRootModel;
            this._childView0 = this.addChild(new ListView());
            this._spec = {
                "type": 0,
                "tag": "div",
                "attr": {
                    "class": "c-BasicGridRoot"
                },
                "children": [
                    {
                        "type": 0,
                        "tag": "h1",
                        "children": [
                            {
                                "type": 1,
                                "value": "ListView: Grid Example"
                            }
                        ]
                    },
                    {
                        "type": 0,
                        "tag": "div",
                        "attr": {
                            "class": "viewSurface"
                        },
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
                        "source": "itemProvider.isLoadingItems()",
                        "children": [
                            {
                                "type": 0,
                                "tag": "div",
                                "attr": {
                                    "class": "loading"
                                },
                                "children": [
                                    {
                                        "type": 1,
                                        "value": "Loading more data, hang on one sec..."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        }
        BasicGridRoot.prototype.onViewModelChanged = function (viewModel, args) {
            _super.prototype.onViewModelChanged.call(this, viewModel, args);
            this._childView0.setData({ itemProvider: this.getValue('itemProvider') });
        };
        return BasicGridRoot;
    })(View);
    return BasicGridRoot;
});
