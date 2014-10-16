///<reference path="./../../../ext/mocha.d.ts" />
///<reference path="./../../../ext/chai.d.ts" />
import chai = require('chai');
var expect = chai.expect;

describe('ListView', () => {
    it('runs tests', () => {
	expect(1).to.equal(1);
    });

    it('also fails', () => {
	expect(0).to.equal(1);
    });
});