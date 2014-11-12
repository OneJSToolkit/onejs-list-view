var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './DetailHeaderModel', '../onejs/View', '../onejs/DomUtils', './DetailHeader.css'], function (require, exports, DetailHeaderModel, View, DomUtils, DetailHeadercss) {
    DomUtils.loadStyles(DetailHeadercss.styles);
    var DetailHeader = (function (_super) {
        __extends(DetailHeader, _super);
        function DetailHeader() {
            _super.apply(this, arguments);
            this.viewName = 'DetailHeader';
            this.viewModelType = DetailHeaderModel;
            this._spec = {
                "type": 0,
                "tag": "div",
                "attr": {
                    "class": "DetailHeader"
                },
                "children": [
                    {
                        "type": 5,
                        "source": "columns",
                        "iterator": "column",
                        "children": [
                            {
                                "type": 0,
                                "tag": "span",
                                "binding": {
                                    "id": "0",
                                    "text": "column.title",
                                    "attr": {
                                        "class": "getClass(column)",
                                        "style": "getStyle(column)"
                                    }
                                },
                                "children": []
                            }
                        ]
                    }
                ]
            };
        }
        return DetailHeader;
    })(View);
    return DetailHeader;
});
