var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/Async', '../onejs/DomUtils', './ListViewCell', './ListView.css', './ListViewModel', '../onejs/Promise', '../onejs/Repeater', '../onejs/View'], function (require, exports, Async, DomUtils, ListViewCell, ListViewCss, ListViewModel, Promise, Repeater, View) {
    DomUtils.loadStyles(ListViewCss.styles);
    var SURFACE_ID_SUFFIX = '-surface';
    var RenderResult = (function () {
        function RenderResult(rowsAboveViewport, rowsInViewport, rowsBelowViewport) {
            this.rowsAboveViewport = rowsAboveViewport;
            this.rowsInViewport = rowsInViewport;
            this.rowsBelowViewport = rowsBelowViewport;
        }
        RenderResult.prototype.renderedToEnd = function () {
            return this.rowsBelowViewport <= 1;
        };
        return RenderResult;
    })();
    var ListView = (function (_super) {
        __extends(ListView, _super);
        function ListView() {
            _super.apply(this, arguments);
            this.viewName = 'ListView';
            this.viewModelType = ListViewModel;
            this._async = new Async(this);
            this._rowRepeaters = [];
            this._removeOffscreensImmediately = false;
            this._updateAttempts = 0;
        }
        ListView.prototype.onRender = function () {
            return (this.element = DomUtils.ce('div', ['class', 'ListView'], [
                this._surfaceElement = DomUtils.ce('div', ['class', 'ListView-surface'])
            ]));
        };
        ListView.prototype.onActivate = function () {
            this._findElements();
            var scrollElement = this._viewportElement == document.body ? window : this._viewportElement;
            this.activeEvents.on(scrollElement, 'scroll', this._onScroll);
            this.activeEvents.on(this._viewportElement, 'touchmove', this._onScroll);
            this._updateView();
        };
        ListView.prototype.onDeactivate = function () {
            this._viewportElement = null;
        };
        ListView.prototype.onViewModelChanged = function () {
            if (this._layout) {
                this._layout.reset();
            }
            if (this.state == 2) {
                this._asyncUpdateView();
            }
        };
        ListView.prototype.onResize = function () {
            this._asyncUpdateView(120);
        };
        ListView.prototype._onScroll = function (eventArgs) {
            if (this._pageAheadPromise) {
                this._pageAheadPromise.cancel();
                this._pageAheadPromise = null;
            }
            this._asyncUpdateView();
        };
        ListView.prototype._findElements = function () {
            var viewportElement = this._surfaceElement;
            var viewModel = this.viewModel;
            var viewportClass = this.getValue(viewModel.viewportClass, true);
            while (viewportElement && viewportElement !== document.body && viewportElement.className !== viewModel.viewportClass) {
                viewportElement = viewportElement.parentNode;
                if (!viewportElement.style || !viewportElement.tagName) {
                    viewportElement = document.body;
                }
            }
            this._viewportElement = viewportElement;
        };
        ListView.prototype._asyncUpdateView = function (throttleDelay) {
            throttleDelay = (throttleDelay === undefined) ? 60 : throttleDelay;
            this._async.throttle('updateView', throttleDelay, 400, this._updateView);
        };
        ListView.prototype._updateView = function () {
            var layout = this.getValue('layout', true);
            var items = this.getValue('items', true);
            var itemProvider = this.getValue('itemProvider', true);
            if (layout != this._layout || !(items || itemProvider)) {
                this._layout = layout;
                this._surfaceElement.innerHTML = '';
                this._rowRepeaters = [];
                this.clearChildren();
            }
            if (itemProvider) {
                items = itemProvider.items;
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
                var renderResult = this._renderVisibles(layout.rows, this._viewportSize);
                if (itemProvider && renderResult.renderedToEnd()) {
                    itemProvider.loadNextBatch();
                }
            }
        };
        ListView.prototype._renderVisibles = function (rows, viewportSize) {
            var visibleRange = this._visibleRange = this._getVisibleRange(rows, viewportSize);
            if (visibleRange.start > -1) {
                console.log('Rendering visibles: ' + visibleRange.start + '-' + visibleRange.end);
                this._renderRange(rows, visibleRange);
                if (this._removeOffscreensImmediately) {
                    this._removeOffscreensImmediately = false;
                    console.log('Removing immediately: ' + visibleRange.start + '-' + visibleRange.end);
                    this._removeRows(rows, visibleRange);
                }
                console.log('Enqueueing off screen rendering.');
                this._enqueueOffScreenRenders(rows, visibleRange);
            }
            return new RenderResult(visibleRange.start, (visibleRange.end - visibleRange.start) + 1, rows.length - (visibleRange.end + 1));
        };
        ListView.prototype._removeRows = function (rows, visibleRange) {
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
        };
        ListView.prototype._enqueueOffScreenRenders = function (rows, visibleRange) {
            var _this = this;
            var lastIndex = Math.min(visibleRange.end + 100, rows.length - 1);
            if (_this._pageAheadPromise) {
                _this._pageAheadPromise.cancel();
            }
            _this._pageAheadPromise = new Promise();
            for (var rowIndex = visibleRange.end + 1; rowIndex <= lastIndex; rowIndex++) {
                asyncRenderRow(rowIndex);
            }
            _this._pageAheadPromise = _this._pageAheadPromise.then(function () {
                _this._removeRows(rows, {
                    start: visibleRange.start - 100,
                    end: visibleRange.end + 100
                });
            }).then(function () {
                _this._pageAheadPromise = null;
            });
            function asyncRenderRow(index) {
                _this._pageAheadPromise = _this._pageAheadPromise.wait(0).then(function () {
                    _this._renderRange(rows, {
                        start: index,
                        end: index
                    });
                });
            }
        };
        ListView.prototype._renderRange = function (rows, range) {
            for (var rowIndex = range.start; rowIndex >= 0 && rowIndex <= range.end; rowIndex++) {
                var row = rows[rowIndex];
                var repeater = this._rowRepeaters[rowIndex];
                if (!repeater) {
                    var repeater = this._rowRepeaters[rowIndex] = this.addChild(new Repeater(), this);
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
                }
                else {
                    this._positionElement(repeater.element, row);
                    repeater.setData({
                        items: row.cells
                    });
                }
            }
        };
        ListView.prototype._evaluateViewportSize = function () {
            var sizeHashChanged = true;
            var viewportSize = this._getViewportSize();
            if (this._viewportSize && this._viewportSize.width === viewportSize.width) {
                sizeHashChanged = false;
            }
            else {
                this._viewportSize = viewportSize;
            }
            return sizeHashChanged;
        };
        ListView.prototype._getViewportSize = function () {
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
        };
        ListView.prototype._getVisibleRange = function (rows, viewportSize) {
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
        };
        ListView.prototype._positionElement = function (element, position) {
            var styleString = '';
            styleString += 'width:' + position.width + 'px;';
            styleString += 'height:' + position.height + 'px;';
            //styleString += 'transform: translate(' + position.left + 'px, ' + position.top + 'px);';
            styleString += 'left:' + position.left + 'px;';
            styleString += 'top:' + position.top + 'px;';
            element.setAttribute('style', styleString);
        };
        return ListView;
    })(View);
    return ListView;
});
