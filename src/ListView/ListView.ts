import View = require('../onejs/View');
import Async = require('../onejs/Async');
import Promise = require('../onejs/Promise');
import Repeater = require('../onejs/Repeater');
import DomUtils = require('../onejs/DomUtils');
import ListViewModel = require('./ListViewModel');
import ListViewCss = require('./ListView.css');
import ListViewCell = require('./ListViewCell');

DomUtils.loadStyles(ListViewCss.styles);

var SURFACE_ID_SUFFIX = '-surface';

class ListView extends View {
    viewName = 'ListView';
    viewModelType = ListViewModel;
    visibleRange;

    _async = new Async(this);
    _viewportElement: HTMLElement;
    _surfaceElement: HTMLElement;
    _rowRepeaters: Repeater[] = [];
    _layout;
    _pageAheadPromise: Promise;

    onRender() {
        return (this.element = DomUtils.ce('div', ['class', 'c-ListView'], [
            DomUtils.ce('div', ['class', 'surface'])
        ]));
    }

    onActivate() {
        this._findElements();

        var scrollElement = this._viewportElement == document.body ? <any> window : this._viewportElement;

        this.activeEvents.on(scrollElement, 'scroll', this._onScroll);
        this.activeEvents.on(this._viewportElement, 'touchmove', this._onScroll);
        this._updateView();
    }

    onDeactivate() {
        this._surfaceElement = this._viewportElement = null;
    }

    onViewModelChanged() {

        if (this._layout) {
            this._layout.reset();
        }

        if (this.state == 2) {
            this._asyncUpdateView();
        }
    }

    onResize() {
        this._asyncUpdateView(120);
    }

    _onScroll(eventArgs) {
        this._asyncUpdateView();
    }

    _findElements() {
        var viewportElement = this._surfaceElement = < HTMLElement > this.element.firstChild;
        var viewModel = this.viewModel;

        while (viewportElement &&
            viewportElement !== document.body &&
            viewportElement.className !== viewModel.viewportClass) {
            viewportElement = < HTMLElement > viewportElement.parentNode;

            if (!viewportElement.style || !viewportElement.tagName) {
                viewportElement = document.body;
            }
        }

        this._viewportElement = viewportElement;
    }

    _updateAttempts = 0;

    _asyncUpdateView(throttleDelay ? : number) {
        throttleDelay = (throttleDelay === undefined) ? 60 : throttleDelay;

        this._async.throttle('updateView', throttleDelay, 400, this._updateView);
    }

    _updateView() {
	this._updateAttempts++;

        var layout = this._layout;
        var items = this.viewModel.items;
        var viewport = this._getViewportSize();

        if (this.viewModel.layout != layout || !items) {
            layout = this._layout = this.viewModel.layout;
            this.clearChildren();
            this._surfaceElement.innerHTML = '';
            this._rowRepeaters = [];
        }

        if (items) {
            layout.update(items, viewport);

            this._surfaceElement.style.height = layout.size.height + 'px';
            viewport = this._getViewportSize();

            // Re-evaluate layout if viewport changed.
            layout.update(items, viewport);

            this._renderVisibles(layout.rows, viewport);            
        }
    }

    _getViewportSize() {
        // body has scrolltop, documentElement has correct size.
        var viewportElement = this._viewportElement;
        var sizeElement = viewportElement === document.body ? document.documentElement : viewportElement;
        var rootBounds = this.element.getBoundingClientRect();

        return {
            width: rootBounds.width || 0,
            height: (sizeElement.clientHeight - rootBounds.top) || 0,
            scrollTop: viewportElement.scrollTop || 0
        };
    }

    _renderVisibles(rows, viewportSize) {
        var visibleRange = this.visibleRange = this._getVisibleRange(rows);
        
        //visibleRange.end = Math.min(visibleRange.start + 1, rows.length - 1);

        this._renderRange(rows, visibleRange);
        this._removeRows(rows, visibleRange);
        //this._enqueueOffScreenRenders(rows, visibleRange);
    }

    _removeRows(rows, visibleRange) {
        var start = Math.max(0, visibleRange.start - 10);
        var end = Math.min(rows.length - 1, visibleRange.end + 10);

        for (var index in this._rowRepeaters) {
            index = Number(index);

            if (index < start || index > end) {
                var repeater = this._rowRepeaters[index];

                delete this._rowRepeaters[index];
                this.removeChild(repeater);
                this._surfaceElement.removeChild(repeater.element);
                repeater.dispose();
            }
        }
    }

    _enqueueOffScreenRenders(rows, visibleRange) {
        var _this = this;
        var lastIndex = Math.min(visibleRange.end + 10, rows.length - 1);

        if (_this._pageAheadPromise) {
            _this._pageAheadPromise.cancel();
        }

        var promiseChain = _this._pageAheadPromise = new Promise();

        for (var rowIndex = visibleRange.end + 1; rowIndex <= lastIndex; rowIndex++) {
            asyncRenderRow(rowIndex);
        }

        _this._pageAheadPromise.then(function() {
            _this._pageAheadPromise = null;
        });

        function asyncRenderRow(index) {
            promiseChain = promiseChain.then(function() {
                return Promise.timeout(100).then(function() {
                    _this._renderRange(rows, {
                        start: index,
                        end: index
                    });
                });

            });
        }
    }

    _renderRange(rows, range) {
        for (var rowIndex = range.start; rowIndex >= 0 && rowIndex <= range.end; rowIndex++) {
            
            console.log('rendering row' + rowIndex);

            var row = rows[rowIndex];
            var repeater = this._rowRepeaters[rowIndex];

            if (!repeater) {
                var repeater = this._rowRepeaters[rowIndex] = < Repeater > this.addChild(new Repeater(), this);

                repeater.baseClass = 'row';
                repeater.childViewType = ListViewCell;
                repeater.setData({
                    items: row.cells
                });
                repeater.render();

                this._positionElement(repeater.element, row);
                this._surfaceElement.appendChild(repeater.element);
                repeater.activate();
            } else {
                this._positionElement(repeater.element, row);
                repeater.setData({
                    items: row.cells
                });
            }
        }
    }

    _getVisibleRange(rows) {
        var visibleTop = this._viewportElement.scrollTop;
        var visibleBottom = visibleTop + this._viewportElement.clientHeight;
        var range = {
            start: -1,
            end: -1
        };

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];

            if (range.start < 0 && row.top >= visibleTop) {
                range.start = Math.max(0, i - 1);
            }
            if ((i == (rows.length - 1)) || (range.end < 0 && (row.top) > visibleBottom)) {
                range.end = Math.max(0, i);
                break;
            }
        }

        return range;
    }

    _positionElement(element, position) {
        var styleString = '';

        styleString += 'width:' + position.width + 'px;';
        styleString += 'height:' + position.height + 'px;';

        styleString += 'left:' + position.left + 'px;';
        styleString += 'top:' + position.top + 'px;';

        element.setAttribute('style', styleString);
    }
}

export = ListView;