import DetailCell = require('./DetailCell');
import DetailHeaderModel = require('./DetailHeaderModel');
import DetailHeadercss = require('./DetailHeader.css');
import DomUtils = require('../onejs/DomUtils');
import Repeater = require('../onejs/Repeater');
import View = require('../onejs/View');

DomUtils.loadStyles(DetailHeadercss.styles);

class DetailHeader extends View {
    viewName = 'DetailHeader';
    viewModelType = DetailHeaderModel;
    repeater: Repeater;
    _surfaceElement: HTMLElement;

    onRender() {
        return (this.element = DomUtils.ce('div', ['class', 'c-DetailHeader'], [
            DomUtils.ce('div', ['class', 'surface'])
        ]));
    }

    onActivate() {
        var _this = this;
        this._surfaceElement = <HTMLElement> this.element.firstChild;

        var cells = [];
        var columnNames = _this.columnNames();
        for(var i = 0; i < columnNames.length; i++) {
            cells.push({
		content: columnNames[i],
		columnName: columnNames[i]
	    });
        }

        _this.repeater = <Repeater> this.addChild(new Repeater(), this);
        _this.repeater.baseClass = 'detail-row-repeater';
        _this.repeater.childViewType = DetailCell;
        _this.repeater.setData({
            items: cells
        });
        _this.repeater.render();

        _this._surfaceElement.appendChild(_this.repeater.element);
        _this.repeater.activate();
    }

    columnNames() {
        return this.parent.parent.parent.viewModel.layout.columns;
    }
}

export = DetailHeader;
