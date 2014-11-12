var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './LoadingRootModel', '../onejs/View', '../onejs/DomUtils', '../ListView/ListView', './LoadingRoot.css'], function (require, exports, LoadingRootModel, View, DomUtils, ListView, LoadingRootcss) {
    DomUtils.loadStyles(LoadingRootcss.styles);
    var LoadingRoot = (function (_super) {
        __extends(LoadingRoot, _super);
        function LoadingRoot() {
            _super.apply(this, arguments);
            this.viewName = 'LoadingRoot';
            this.viewModelType = LoadingRootModel;
            this.listView = this.addChild(new ListView());
            this._spec = {
                "type": 0,
                "tag": "div",
                "attr": {
                    "class": "c-LoadingRoot"
                },
                "children": [
                    {
                        "type": 0,
                        "tag": "h1",
                        "children": [
                            {
                                "type": 1,
                                "value": "ListView: Loading Example"
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
                                        "value": "Loading more data, hang on one sec..."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        }
        LoadingRoot.prototype.onViewModelChanged = function (viewModel, args) {
            _super.prototype.onViewModelChanged.call(this, viewModel, args);
            this.listView.setData({ itemProvider: this.getValue('itemProvider'), layout: this.getValue('layout') });
        };
        return LoadingRoot;
    })(View);
    return LoadingRoot;
});
