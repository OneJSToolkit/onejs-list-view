import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import ItemTile = require('../ItemTile/ItemTile');

class ListViewCell extends View {
    viewName = 'ListViewCell';

    viewType;
    viewInstance;

    left = '0';
    top = '0';
    width = '0';
    height = '0';

    onRender() {
        var children = this.viewInstance ? [ this.viewInstance.render() ] : null;

        this.element = DomUtils.ce('div', {'class': 'ListView-cell'}, children);

        this.update();

        return this.element;
    }

    onViewModelChanged(viewModel, args?) {
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
        } else {
            if (this.viewInstance) {
                this.viewInstance.setData(viewModel.item);
            }
        }
    }

    onUpdate() {
        var viewModel = this.viewModel;

        if (this.element) {
            var elStyle = this.element.style;

            //      elStyle.transform = 'translate(' + viewModel.left + 'px, ' + viewModel.top + 'px)';

            //            elStyle.left = viewModel.left + 'px';
            //          elStyle.top = viewModel.top + 'px';

            this.element.className = 'ListView-cell ' + (viewModel.className || '');
            elStyle.width = viewModel.width + 'px';
            elStyle.height = viewModel.height + 'px';

            this.element['data-item-key'] = viewModel.key;
        }
    }

}

export = ListViewCell;