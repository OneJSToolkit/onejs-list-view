import View = require('../onejs/View');
import DomUtils = require('../onejs/DomUtils');
import FadeImageCss = require('./FadeImage.css');

DomUtils.loadStyles(FadeImageCss.styles);

var c_loadedUrls = {};

class FadeImage extends View {
    viewName = 'FadeImage';

    className: string;
    currentSrc: string;

    onRender() {

        this.element = DomUtils.ce('div', ['class', 'c-FadeImage ' + (this.getValue('className') || '')]);

        this._evaluateSrc();

        return this.element;
    }

    onActivate() {
        this._evaluateSrc();
    }

    _evaluateSrc() {
        var newSrc = this.getValue('src');

        if (newSrc !== this.currentSrc) {
            this.currentSrc = newSrc;

            if (newSrc) {
                var img = document.createElement('img');
                
                if (c_loadedUrls[newSrc]) {
                    img.className = 'isLoaded';
                } else {
                    this.activeEvents.on(img, 'load', this._onImageLoaded);
                }
                this.element.appendChild(img);
                img.src = newSrc;
            } else {
                this.element.innerHTML = '';
            }
        }
    }

    _onImageLoaded(ev) {
        ev.srcElement.className = 'isLoaded';
        c_loadedUrls[ev.srcElement.src] = true;
    }
}

export = FadeImage;