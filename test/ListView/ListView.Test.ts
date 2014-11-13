///<reference path="./../../../../ext/mocha.d.ts" />
///<reference path="./../../../../ext/chai.d.ts" />
import chai = require('chai');
var expect = chai.expect;

import ListView = require('./../../ListView/ListView');
import List = require('./../../onejs/List');


describe('ListView', () => {
    var l: ListView;
    var container: HTMLElement;

    before(() => {
        l = new ListView();
        container = document.createElement('div');
        document.body.appendChild(container);
        container.appendChild(l.render());
    });

    it('has a ViewModel', () => {
        expect(l.viewModel).not.to.be.null;
    });

    describe('viewport', () => {
        before(() => {
            container.className = 'the-viewport';
            container.style.overflow = 'scroll';
            l.setData({ viewportClass: 'the-viewport' });
            l.activate();
        });

        describe('when the viewport has a scrollbar', () => {
            it('accounts for scrollbar width', () => {
                var actualElementWidth = container.getBoundingClientRect().width;
                expect(l._getViewportSize().width).to.be.below(actualElementWidth);
            });
        });

        describe('when padding is set on the viewport', () => {
            it('respects the viewport\'s padding', () => {
                var originalWidth = l._getViewportSize().width;
                container.style.padding = '30px';
                var paddedWidth = l._getViewportSize().width;
                expect(paddedWidth).to.equal(originalWidth - 60);
            });
        });
    });
});