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

    _viewportSize;
    _visibleRange;

    _async = new Async(this);
    _viewportElement: HTMLElement;
    _surfaceElement: HTMLElement;
    _rowRepeaters: Repeater[] = [];
    _layout;
    _pageAheadPromise: Promise;

    _removeOffscreensImmediately = false;

    onRender() {
        return (this.element = DomUtils.ce('div', ['class', 'ListView'], [
            this._surfaceElement = DomUtils.ce('div', ['class', 'ListView-surface'])
        ]));
    }

    onActivate() {
        this._findElements();

        var scrollElement = this._viewportElement == document.body ? < any > window : this._viewportElement;

        this.activeEvents.on(scrollElement, 'scroll', this._onScroll);
        this.activeEvents.on(this._viewportElement, 'touchmove', this._onScroll);
        this._updateView();
    }

    onDeactivate() {
        this._viewportElement = null;
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
        if (this._pageAheadPromise) {
            this._pageAheadPromise.cancel();
            this._pageAheadPromise = null;
        }
        this._asyncUpdateView();
    }

    _findElements() {
        var viewportElement = this._surfaceElement;
        var viewModel = this.viewModel;
        var viewportClass = this.getValue(viewModel.viewportClass, true);

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
        var layout = this.getValue('layout', true);
        var items = this.getValue('items', true);

        if (layout != this._layout || !items) {
            this._layout = layout;
            this._surfaceElement.innerHTML = '';
            this._rowRepeaters = [];
            this.clearChildren();
        }

        if (items) {
            if (this._evaluateViewportSize()) {
                console.log('viewportSize has changed:' + this._viewportSize.width + 'x' + this._viewportSize.height);
                this._removeOffscreensImmediately = true;
            }

            layout.update(items, this._viewportSize);

            if (this._evaluateViewportSize()) {
                layout.update(items, this._viewportSize);
            }

            this._surfaceElement.style.width = layout.size.width + 'px';
            this._surfaceElement.style.height = layout.size.height + 'px';
            this._renderVisibles(layout.rows, this._viewportSize);
        }
    }

    _renderVisibles(rows, viewportSize) {
        var visibleRange = this._visibleRange = this._getVisibleRange(rows, viewportSize);

        if (visibleRange.start > -1) {
            console.log('Rendering visibles: ' + visibleRange.start + '-' + visibleRange.end);

            this._renderRange(rows, visibleRange);
            //this._removeRows(rows, visibleRange);

            if (this._removeOffscreensImmediately) {
                this._removeOffscreensImmediately = false;
                console.log('Removing immediately: ' + visibleRange.start + '-' + visibleRange.end);
                this._removeRows(rows, visibleRange);
            }

            console.log('Enqueueing off screen rendering.');

            this._enqueueOffScreenRenders(rows, visibleRange);
        }
    }

    _removeRows(rows, visibleRange) {
        var start = Math.max(0, visibleRange.start);
        var end = Math.min(rows.length - 1, visibleRange.end);

        console.log('Removing rows outside range ' + start + '-' + end);

        for (var index in this._rowRepeaters) {
            index = Number(index);

            if (index < start || index > end) {
                var repeater = this._rowRepeaters[index];

                console.log('removing row ' + index);

                delete this._rowRepeaters[index];
                this.removeChild(repeater);
                this._surfaceElement.removeChild(repeater.element);
                repeater.dispose();
            }
        }
    }

    _enqueueOffScreenRenders(rows, visibleRange) {
        var _this = this;
        var lastIndex = Math.min(visibleRange.end + 100, rows.length - 1);

        if (_this._pageAheadPromise) {
            _this._pageAheadPromise.cancel();
        }

        _this._pageAheadPromise = new Promise();

        for (var rowIndex = visibleRange.end + 1; rowIndex <= lastIndex; rowIndex++) {
            asyncRenderRow(rowIndex);
        }

        _this._pageAheadPromise = _this._pageAheadPromise
            .then(function() {
                _this._removeRows(rows, {
                    start: visibleRange.start - 100,
                    end: visibleRange.end + 100
                });
            }).then(function() {
                _this._pageAheadPromise = null;
            });

        function asyncRenderRow(index) {
            _this._pageAheadPromise = _this._pageAheadPromise
                .wait(0)
                .then(function() {

                    _this._renderRange(rows, {
                        start: index,
                        end: index
                    });

                });
        }
    }

    _renderRange(rows, range) {
        for (var rowIndex = range.start; rowIndex >= 0 && rowIndex <= range.end; rowIndex++) {
            var row = rows[rowIndex];
            var repeater = this._rowRepeaters[rowIndex];

            if (!repeater) {
                var repeater = this._rowRepeaters[rowIndex] = < Repeater > this.addChild(new Repeater(), this);

                console.log('rendering row' + rowIndex);

                repeater.baseClass = 'ListView-row';
                repeater.itemName = null;
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

    _evaluateViewportSize() {
        var sizeHashChanged = true;
        var viewportSize = this._getViewportSize();

        if (this._viewportSize &&
            this._viewportSize.width === viewportSize.width) {
            sizeHashChanged = false;
        } else {
            this._viewportSize = viewportSize;
        }
        return sizeHashChanged;
    }

    _getViewportSize() {
        var elementBounds = this.element.getBoundingClientRect();
        var viewportSize = {
            width: elementBounds.width,
            height: window.innerHeight,
            scrollTop: this._viewportElement.scrollTop
        };

        if (this._viewportElement !== document.body) {
            var bounds = this._viewportElement.getBoundingClientRect();

            viewportSize.width = bounds.width;
            viewportSize.height = bounds.height;
        }

        return viewportSize;
    }

    _getVisibleRange(rows, viewportSize) {
        var surfaceBounds = this._surfaceElement.getBoundingClientRect();
        var visibleTop = -surfaceBounds.top;
        var visibleBottom = visibleTop + viewportSize.height;

        var range = {
            start: -1,
            end: -1
        };

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];

            if (range.start < 0 && (row.top + row.height) >= visibleTop) {
                range.start = Math.max(0, i);
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

        styleString += 'transform: translate(' + position.left + 'px, ' + position.top + 'px)';
        styleString += 'left:' + position.left + 'px;';
        styleString += 'top:' + position.top + 'px;';

        element.setAttribute('style', styleString);
    }
}

export = ListView;