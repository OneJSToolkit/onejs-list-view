import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import ItemTile = require('../ItemTile/ItemTile');

class ListViewCell extends View {
    viewName = 'ListViewCell';

    cellContainer: HTMLElement;

    cellControl;
    cellType;

    left = '0';
    top = '0';
    width = '0';
    height = '0';
    rowIndex = -1;

    isAnimatingInLeft = false;
    isAnimatingInRight = false;
    isAnimatingOutLeft = false;
    isAnimatingOutRight = false;
    isNewItem = false;
    isRemovedItem = false;


    onRender() {
        var children = this.cellControl ? [this.cellControl.render()] : null;

        return (this.element = DomUtils.ce('div', ['class', 'cellClip'], [
            (this.cellContainer = DomUtils.ce('div', ['class', 'cell'], children, this._bindings[1]))
            ], this._bindings[0]));
    }

    onViewModelChanged(viewModel, args?) {
        var cellItem = this.getValue('item');

        if (cellItem) {
            if (this.cellType !== cellItem.controlType) {
                this.cellType = cellItem.controlType;

                if (this.cellControl) {
                    this.removeChild(this.cellControl);

                }

                this.cellControl = this.addChild(new this.cellType());
                this.cellControl.setData(cellItem.item);
                this.rowIndex = cellItem.rowIndex;


                if (this.rowIndex != cellItem.rowIndex) {
                    this.isAnimatingInLeft = (cellItem.previousRowIndex >= 0 && cellItem.rowIndex > cellItem.previousRowIndex);
                    this.isAnimatingInRight = (cellItem.previousRowIndex >= 0 && cellItem.rowIndex < cellItem.previousRowIndex);
                }

                this.isNewItem = (cellItem.previousRowIndex == -1);

                if (this.cellContainer) {
                    if (this.cellContainer.childNodes.length) {
                        this.cellContainer.replaceChild(this.cellControl.renderElement(), this.cellContainer.childNodes[0]);
                        if (this.state == 2) {
                            this.cellControl.activate();
                        }
                    }
                }
            } else {
                this.cellControl.setData(cellItem.item);
            }

            this.left = cellItem.left + 'px';
            this.top = cellItem.top + 'px';
            this.width = cellItem.width + 'px';
            this.height = cellItem.height + 'px';
        }
    }

    onRepeaterRemove() {
        var _this = this;
        var cellItem = this.getValue('item');

        _this.isAnimatingInRight = _this.isAnimatingInLeft = _this.isNewItem = false;

        if (cellItem.rowIndex == -1) {
            this.isRemovedItem = true;
        } else {
            _this.isAnimatingOutLeft = (cellItem.rowIndex < this.rowIndex);
            _this.isAnimatingOutRight = (cellItem.rowIndex > this.rowIndex);
        }

        _this.update();
    }


    _bindings = [{
        id: 0,
        className: {
            animInLeft: '$view.isAnimatingInLeft',
            animInRight: '$view.isAnimatingInRight',
            animOutLeft: '$view.isAnimatingOutLeft',
            animOutRight: '$view.isAnimatingOutRight',
            animNew: '$view.isNewItem',
            animRemove: '$view.isRemovedItem'
        }
    }, {
        id: 1,
        css: {
            left: '$view.left',
            top: '$view.top',
            width: '$view.width',
            height: '$view.height'
        }
    }];

}

export = ListViewCell;