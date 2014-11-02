import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import FadeImageCss = require('./FadeImage.css');
import Promise = require('../onejs/Promise');

DomUtils.loadStyles(FadeImageCss.styles);

var c_loadedUrls = {};

class FadeImage extends View {
    viewName = 'FadeImage';

    _currentUrl: string;
    _currentPromise: Promise;

    onRender() {
        this.element = DomUtils.ce('div', ['class', 'FadeImage ' + (this.getValue('class') || '')]);

        return this.element;
    }

    onActivate() {
        this.onViewModelChanged(this.viewModel);
    }

    onViewModelChanged(viewModel) {
        if (this.isActive) {
            var url = this.getValue('url');

            if (url && url != this._currentUrl) {
                this._cancelCurrentLoad();
                this._currentUrl = url;
                this._loadImage(url);
            }            
        }
    }

    onDeactivate() {
        this._cancelCurrentLoad();
    }

    _cancelCurrentLoad() {
        if (this._currentPromise) {
            this._currentPromise.cancel();
            //this._currentPromise = null;
        }
    }

    _loadImage(url) {
        var image = <HTMLImageElement>DomUtils.ce('img');
        var _this = this;

        function _onImageLoaded() {
            if (_this.isActive && _this._currentUrl === url) {
                _this._createImage(url);
            }
        }

        image.addEventListener('load', _onImageLoaded);
        image.src = url;

        // If browser cache causes the load event to not fire, ensure we create the image.
        if (image.complete) {
            image.removeEventListener('load', _onImageLoaded);
            this._createImage(url, true);
        }
    }

    _createImage(url, isFromCache?: boolean) {
        var image = DomUtils.ce('div', ['class', 'FadeImage-image' + (isFromCache ? ' isLoaded' : ''), 'style', 'background-image: url(\'' + url + '\')']);

        this.element.appendChild(image);

        this._currentPromise = Promise.timeout(10)
            .then(() => {
                DomUtils.toggleClass(image, 'isLoaded', true);
            })
            .wait(500)
            .then(() => {
                for (var i = 0; i < this.element.children.length - 2; i++) {
                    DomUtils.toggleClass(image, 'isLoaded', false);
                }
            })
            .wait(500)
            .then(() => {
                while (this.element.children.length > 1) {
                    this.element.removeChild(this.element.firstChild);
                }
            })
            .then(() => {
                this._currentPromise = null;
            });
    }

}

export = FadeImage;