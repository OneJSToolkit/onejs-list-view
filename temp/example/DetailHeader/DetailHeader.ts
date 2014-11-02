import DetailHeaderModel = require('./DetailHeaderModel');
import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import DetailHeadercss = require('./DetailHeader.css');

DomUtils.loadStyles(DetailHeadercss.styles);

class DetailHeader extends View {
    viewName = 'DetailHeader';
    viewModelType = DetailHeaderModel;

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", ["class","DetailHeader"], [
            DomUtils.ce("span", ["class","DetailHeader-cell DetailHeader-rowCheck"], [], bindings[0]),
            DomUtils.ce("span", ["class","DetailHeader-cell isSorted descended","tabindex","0","style","width: 200px"], [
                DomUtils.ct("Name")
            ]),
            DomUtils.ce("span", ["class","DetailHeader-cell","tabindex","0","style","width: 150px"], [
                DomUtils.ct("Date modified")
            ]),
            DomUtils.ce("span", ["class","DetailHeader-cell","tabindex","0","style","width: 150px"], [
                DomUtils.ct("Sharing")
            ]),
            DomUtils.ce("span", ["class","DetailHeader-cell","tabindex","0","style","width: 150px"], [
                DomUtils.ct("Size")
            ])
        ]));
    }

    _bindings = [
        {
            "id": "0",
            "className": {
                "isAllSelected": "selection.isAllSelected"
            },
            "events": {
                "click": [
                    "selection.toggleAllSelected"
                ]
            }
        }
    ];
}

export = DetailHeader;
