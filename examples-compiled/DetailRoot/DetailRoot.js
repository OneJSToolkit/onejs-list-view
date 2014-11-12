var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './DetailRootModel', '../onejs/View', '../onejs/DomUtils', '../ListView/ListView', './DetailRoot.css'], function (require, exports, DetailRootModel, View, DomUtils, ListView, DetailRootcss) {
    DomUtils.loadStyles(DetailRootcss.styles);
    var DetailRoot = (function (_super) {
        __extends(DetailRoot, _super);
        function DetailRoot() {
            _super.apply(this, arguments);
            this.viewName = 'DetailRoot';
            this.viewModelType = DetailRootModel;
            this.listView = this.addChild(new ListView());
            this._spec = {
                "type": 0,
                "tag": "div",
                "attr": {
                    "class": "c-DetailRoot"
                },
                "children": [
                    {
                        "type": 0,
                        "tag": "h1",
                        "children": [
                            {
                                "type": 1,
                                "value": "ListView: Detail Example"
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
                                "name": "listView",
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
                                        "value": "Loading..."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        }
        DetailRoot.prototype.onViewModelChanged = function (viewModel, args) {
            _super.prototype.onViewModelChanged.call(this, viewModel, args);
            this.listView.setData({ itemProvider: this.getValue('itemProvider'), layout: this.getValue('layout') });
        };
        return DetailRoot;
    })(View);
    return DetailRoot;
});
