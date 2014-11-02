import DetailRowModel = require('./DetailRowModel');
import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import DetailRowcss = require('./DetailRow.css');

DomUtils.loadStyles(DetailRowcss.styles);

class DetailRow extends View {
    viewName = 'DetailRow';
    viewModelType = DetailRowModel;

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", ["class","DetailRow"], [
            DomUtils.ce("span", ["class","DetailRow-cell DetailRow-rowCheck"], [], bindings[1]),
            DomUtils.ce("span", ["style","width: 20px"], [], bindings[2]),
            DomUtils.ce("span", ["class","DetailRow-cell name","style","width: 170px"], [], bindings[3]),
            DomUtils.ce("span", ["class","DetailRow-cell","style","width: 150px"], [], bindings[4]),
            DomUtils.ce("span", ["class","DetailRow-cell","style","width: 150px"], [], bindings[5])
        ], bindings[0]));
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "isSelected": "selection.isSelected(key)"
            },
            "events": {
                "click": [
                    "$view.events.raise('loadItem', key, true)"
                ]
            }
        },
        {
            "id": "1",
            "events": {
                "click": [
                    "selection.toggle(key)"
                ]
            }
        },
        {
            "id": "2",
            "attr": {
                "class": "getIconClass(type)"
            }
        },
        {
            "id": "3",
            "text": "name"
        },
        {
            "id": "4",
            "text": "dateModified"
        },
        {
            "id": "5",
            "text": "sharing"
        }
    ];
}

export = DetailRow;
