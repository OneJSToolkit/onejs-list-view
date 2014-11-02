import DetailRootModel = require('./DetailRootModel');
import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import ListView = require('../ListView/ListView');
import DetailRootcss = require('./DetailRoot.css');

DomUtils.loadStyles(DetailRootcss.styles);

class DetailRoot extends View {
    viewName = 'DetailRoot';
    viewModelType = DetailRootModel;
    listView = <any>this.addChild(new ListView());

    onViewModelChanged(viewModel, args?: any) {
        super.onViewModelChanged(viewModel, args);
        this.listView.setData({ items: this.getValue('items'), layout: this.getValue('layout') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", ["class","c-DetailRoot"], [
            DomUtils.ce("h1", [], [
                DomUtils.ct("ListView: Detail Example")
            ]),
            DomUtils.ce("div", ["class","viewSurface"], [
                _this.listView.render()
            ])
        ]));
    }
}

export = DetailRoot;
