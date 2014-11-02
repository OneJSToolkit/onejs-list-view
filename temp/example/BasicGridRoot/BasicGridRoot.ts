import BasicGridRootModel = require('./BasicGridRootModel');
import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import ListView = require('../ListView/ListView');
import BasicGridRootcss = require('./BasicGridRoot.css');

DomUtils.loadStyles(BasicGridRootcss.styles);

class BasicGridRoot extends View {
    viewName = 'BasicGridRoot';
    viewModelType = BasicGridRootModel;
    _childView0 = <any>this.addChild(new ListView());

    onViewModelChanged(viewModel, args?: any) {
        super.onViewModelChanged(viewModel, args);
        this._childView0.setData({ items: this.getValue('items') });
    }

    onRender(): HTMLElement {
        var _this = this;
        var bindings = _this._bindings;

        return (_this.element = DomUtils.ce("div", ["class","c-BasicGridRoot"], [
            DomUtils.ce("h1", [], [
                DomUtils.ct("ListView: Grid Example")
            ]),
            DomUtils.ce("div", ["class","viewSurface"], [
                _this._childView0.render()
            ])
        ]));
    }
}

export = BasicGridRoot;
