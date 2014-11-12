var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './DetailRowModel', '../onejs/View', '../onejs/DomUtils', './DetailRow.css'], function (require, exports, DetailRowModel, View, DomUtils, DetailRowcss) {
    DomUtils.loadStyles(DetailRowcss.styles);
    var DetailRow = (function (_super) {
        __extends(DetailRow, _super);
        function DetailRow() {
            _super.apply(this, arguments);
            this.viewName = 'DetailRow';
            this.viewModelType = DetailRowModel;
            this._spec = {
                "type": 0,
                "tag": "div",
                "attr": {
                    "class": "DetailRow"
                },
                "binding": {
                    "id": "0",
                    "className": {
                        "isSelected": "selection.isSelected(key)"
                    }
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
                                    "id": "1",
                                    "text": "getTextValue(column)",
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
        return DetailRow;
    })(View);
    return DetailRow;
});
