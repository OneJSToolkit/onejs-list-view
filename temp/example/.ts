import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');

class  extends View {
    viewName = '';

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("html", [], [
            DomUtils.ce("head", [], [
                DomUtils.ce("title", [], [
                    DomUtils.ct("Basic Grid - OneJS ListView")
                ]),
                DomUtils.ce("link", ["rel","stylesheet","href","./demo.css","type","text/css"]),
                DomUtils.ce("script", ["type","text/javascript","src","../examples-compiled/require.js"]),
                DomUtils.ce("script", ["type","text/javascript"], [
                    DomUtils.ct("\n      requirejs.config({\n        baseUrl: '../examples-compiled',\n        deps: [ 'grid' ]\n      });\n    ")
                ])
            ]),
            DomUtils.ce("body", [], [
                DomUtils.ce("div", ["id","content"])
            ])
        ]));
    }
}

export = ;
