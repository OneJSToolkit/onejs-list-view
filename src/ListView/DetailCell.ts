import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');

class DetailCell extends View {
    viewName = 'DetailCell';
    className = 'c-DetailCell';

    content: any;

    onRender() {
        var text = DomUtils.ct(this.viewModel.item.content);

        return (this.element = DomUtils.ce('div', ['class', this.className + ' ' + this.viewModel.item.columnName], [text], this._bindings[0]));
    }

    _bindings = [{
        id: 0
    }];
}

export = DetailCell;