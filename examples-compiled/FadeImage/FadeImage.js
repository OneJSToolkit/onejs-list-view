var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/View', '../onejs/DomUtils', './FadeImage.css', '../onejs/Promise'], function (require, exports, View, DomUtils, FadeImageCss, Promise) {
    DomUtils.loadStyles(FadeImageCss.styles);
    var c_loadedUrls = {};
    var FadeImage = (function (_super) {
        __extends(FadeImage, _super);
        function FadeImage() {
            _super.apply(this, arguments);
            this.viewName = 'FadeImage';
        }
        FadeImage.prototype.onRender = function () {
            this.element = DomUtils.ce('div', ['class', 'FadeImage ' + (this.getValue('class') || '')]);
            return this.element;
        };
        FadeImage.prototype.onActivate = function () {
            this.onViewModelChanged(this.viewModel);
        };
        FadeImage.prototype.onViewModelChanged = function (viewModel) {
            if (this.isActive) {
                var url = this.getValue('url');
                if (url && url != this._currentUrl) {
                    this._cancelCurrentLoad();
                    this._currentUrl = url;
                    this._loadImage(url);
                }
            }
        };
        FadeImage.prototype.onDeactivate = function () {
            this._cancelCurrentLoad();
        };
        FadeImage.prototype._cancelCurrentLoad = function () {
            if (this._currentPromise) {
                this._currentPromise.cancel();
            }
        };
        FadeImage.prototype._loadImage = function (url) {
            var image = DomUtils.ce('img');
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
        };
        FadeImage.prototype._createImage = function (url, isFromCache) {
            var _this = this;
            var image = DomUtils.ce('div', ['class', 'FadeImage-image' + (isFromCache ? ' isLoaded' : ''), 'style', 'background-image: url(\'' + url + '\')']);
            this.element.appendChild(image);
            this._currentPromise = Promise.timeout(10).then(function () {
                DomUtils.toggleClass(image, 'isLoaded', true);
            }).wait(500).then(function () {
                for (var i = 0; i < _this.element.children.length - 2; i++) {
                    DomUtils.toggleClass(image, 'isLoaded', false);
                }
            }).wait(500).then(function () {
                while (_this.element.children.length > 1) {
                    _this.element.removeChild(_this.element.firstChild);
                }
            }).then(function () {
                _this._currentPromise = null;
            });
        };
        return FadeImage;
    })(View);
    return FadeImage;
});
