var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './RealDataRootModel', '../onejs/View', '../onejs/DomUtils', '../ListView/ListView', './RealDataRoot.css'], function (require, exports, RealDataRootModel, View, DomUtils, ListView, RealDataRootcss) {
    DomUtils.loadStyles(RealDataRootcss.styles);
    var RealDataRoot = (function (_super) {
        __extends(RealDataRoot, _super);
        function RealDataRoot() {
            _super.apply(this, arguments);
            this.viewName = 'RealDataRoot';
            this.viewModelType = RealDataRootModel;
            this.listView = this.addChild(new ListView());
            this._spec = {
                "type": 0,
                "tag": "div",
                "attr": {
                    "class": "c-RealDataRoot"
                },
                "children": [
                    {
                        "type": 0,
                        "tag": "h1",
                        "children": [
                            {
                                "type": 1,
                                "value": "ListView: Real Data Example"
                            }
                        ]
                    },
                    {
                        "type": 0,
                        "tag": "div",
                        "attr": {
                            "class": "launch"
                        },
                        "children": [
                            {
                                "type": 0,
                                "tag": "div",
                                "attr": {
                                    "class": "field"
                                },
                                "children": [
                                    {
                                        "type": 0,
                                        "tag": "label",
                                        "children": [
                                            {
                                                "type": 1,
                                                "value": "\r\n          Search term"
                                            },
                                            {
                                                "type": 0,
                                                "tag": "br",
                                                "children": []
                                            },
                                            {
                                                "type": 0,
                                                "tag": "input",
                                                "attr": {
                                                    "type": "text"
                                                },
                                                "binding": {
                                                    "id": "0",
                                                    "attr": {
                                                        "value": "searchTerm"
                                                    }
                                                },
                                                "children": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": 0,
                                "tag": "div",
                                "attr": {
                                    "class": "field"
                                },
                                "children": [
                                    {
                                        "type": 0,
                                        "tag": "button",
                                        "binding": {
                                            "id": "1",
                                            "events": {
                                                "click": [
                                                    "search"
                                                ]
                                            }
                                        },
                                        "children": [
                                            {
                                                "type": 1,
                                                "value": "Search!"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "type": 0,
                                "tag": "div",
                                "attr": {
                                    "class": "field"
                                },
                                "children": [
                                    {
                                        "type": 0,
                                        "tag": "label",
                                        "children": [
                                            {
                                                "type": 0,
                                                "tag": "input",
                                                "attr": {
                                                    "type": "checkbox"
                                                },
                                                "binding": {
                                                    "id": "2",
                                                    "attr": {
                                                        "checked": "showDetails"
                                                    }
                                                },
                                                "children": []
                                            },
                                            {
                                                "type": 1,
                                                "value": "\r\n          Render details list\r\n        "
                                            }
                                        ]
                                    }
                                ]
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
                    }
                ]
            };
        }
        RealDataRoot.prototype.onViewModelChanged = function (viewModel, args) {
            _super.prototype.onViewModelChanged.call(this, viewModel, args);
            this.listView.setData({ items: this.getValue('items'), layout: this.getValue('layout') });
        };
        return RealDataRoot;
    })(View);
    return RealDataRoot;
});
