var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/View', '../onejs/DomUtils'], function (require, exports, View, DomUtils) {
    var ListViewCell = (function (_super) {
        __extends(ListViewCell, _super);
        function ListViewCell() {
            _super.apply(this, arguments);
            this.viewName = 'ListViewCell';
            this.left = '0';
            this.top = '0';
            this.width = '0';
            this.height = '0';
        }
        ListViewCell.prototype.onRender = function () {
            var children = this.viewInstance ? [this.viewInstance.render()] : null;
            this.element = DomUtils.ce('div', ['class', 'ListView-cell'], children);
            this.update();
            return this.element;
        };
        ListViewCell.prototype.onViewModelChanged = function (viewModel, args) {
            if (this.viewType !== viewModel.viewType) {
                this.viewType = viewModel.viewType;
                if (this.viewInstance) {
                    this.removeChild(this.viewInstance);
                }
                this.viewInstance = this.addChild(new this.viewType());
                this.viewInstance.setData(viewModel.viewData);
                if (this.element) {
                    if (this.element.childNodes.length) {
                        this.element.replaceChild(this.viewInstance.render(), this.element.childNodes[0]);
                        if (this.state == 2) {
                            this.viewInstance.activate();
                        }
                    }
                }
            }
            else {
                if (this.viewInstance) {
                    this.viewInstance.setData(viewModel.item);
                }
            }
        };
        ListViewCell.prototype.onUpdate = function () {
            var viewModel = this.viewModel;
            if (this.element) {
                var elStyle = this.element.style;
                //      elStyle.transform = 'translate(' + viewModel.left + 'px, ' + viewModel.top + 'px)';
                //            elStyle.left = viewModel.left + 'px';
                //          elStyle.top = viewModel.top + 'px';
                this.element.className = 'ListView-cell ' + (viewModel.className || '');
                elStyle.width = viewModel.width + 'px';
                elStyle.height = viewModel.height + 'px';
            }
        };
        return ListViewCell;
    })(View);
    return ListViewCell;
});
