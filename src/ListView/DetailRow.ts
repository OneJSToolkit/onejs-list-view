import DetailCell = require('./DetailCell');
import DetailRowModel = require('./DetailRowModel');
import DetailRowcss = require('./DetailRow.css');
import DomUtils = require('../onejs/DomUtils');
import Repeater = require('../onejs/Repeater');
import View = require('../onejs/View');

DomUtils.loadStyles(DetailRowcss.styles);

class DetailRow extends View {
    viewName = 'DetailRow';
    viewModelType = DetailRowModel;
    repeater: Repeater;
    _surfaceElement: HTMLElement;
    className = 'c-DetailRow';

    onRender() {
        return (this.element = DomUtils.ce('div', ['class', this._getClassName()], [
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
		content: _this.viewModel[columnNames[i]],
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

    onViewModelChanged() {
	var _this = this;
	if(_this.element) {
	    _this.element.className = _this._getClassName();
	}
    }

    columnNames() {
        return this.parent.parent.parent.viewModel.layout.columns;
    }

    _getClassName() {
	if(this.viewModel && this.viewModel.threshold && typeof this.viewModel.threshold.name !== 'undefined') {
	    return this.className + ' ' + this.viewModel.threshold.name;
	}
	return this.className;
    }

    // TODO - what do do with these bindings?
    // TODO - constructor should take a reference to the layout

    _bindings = [
        {
            "id": "0"
        }
    ];
}

export = DetailRow;
