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

    onRender() {
        return (this.element = DomUtils.ce('div', ['class', 'c-DetailRow'], [
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

    columnNames() {
        return this.parent.parent.parent.viewModel.layout.columns;
    }

    // TODO - Build a repeater
    // TODO - Render a DetailCell for each column
    // TODO - what do do with these bindings?
    // TODO - constructor should take a reference to the layout

    _bindings = [
        {
            "id": "0"
        }
    ];
}

export = DetailRow;
