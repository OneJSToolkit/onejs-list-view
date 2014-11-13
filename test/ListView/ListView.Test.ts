///<reference path="./../../../../ext/mocha.d.ts" />
///<reference path="./../../../../ext/chai.d.ts" />
import chai = require('chai');
var expect = chai.expect;

import ListView = require('./../../ListView/ListView');
import List = require('./../../onejs/List');


describe('ListView', () => {
    it('has a ViewModel', () => {
        var l = new ListView();
        expect(l.viewModel).not.to.be.null;
    });
});