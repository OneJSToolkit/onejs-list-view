import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import ItemTile = require('../ItemTile/ItemTile');

class ListViewCell extends View {
    viewName = 'ListViewCell';

    cellControl;
    cellType;

    left = '0';
    top = '0';
    width = '0';
    height = '0';

    onRender() {
        var children = this.cellControl ? [ this.cellControl.render() ] : null;

        this.element = DomUtils.ce('div', ['class', 'cell'], children);

        this.update();

        return this.element;
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

                if (this.element) {
                    if (this.element.childNodes.length) {
                        this.element.replaceChild(this.cellControl.render(), this.element.childNodes[0]);
                        if (this.state == 2) {
                            this.cellControl.activate();
                        }
                    }
                }
            } else {
                this.cellControl.setData(cellItem.item);
            }
        }
    }

    onUpdate() {
        var item = this.getValue('item');

        if (this.element && item) {
            var elStyle = this.element.style;

            elStyle.left = item.left + 'px';
            elStyle.top = item.top + 'px';
            elStyle.width = item.width + 'px';
            elStyle.height = item.height + 'px';
        }
    }

}

export = ListViewCell;