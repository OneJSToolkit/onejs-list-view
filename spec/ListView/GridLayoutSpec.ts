///<reference path="./../../../../ext/mocha.d.ts" />
///<reference path="./../../../../ext/chai.d.ts" />
import chai = require('chai');
var expect = chai.expect;

import GridLayout = require('./../../ListView/GridLayout');
import ItemGrouping = require('./../../ListView/ItemGrouping');
import List = require('./../../onejs/List');

describe('GridLayout', () => {
    describe('.groupItems', () => {
        it('returns a group with no header and all items', () => {
            var gridLayout = new GridLayout();
            var list = new List([1,2,3,4,5]);
            var result: ItemGrouping = gridLayout.groupItems(list).getAt(0);
            expect(result.header).to.be.null;
            expect(result.items).to.equal(list);
        });
    });

    describe('._allItems', () => {
        it('calls the callback once for each item', () => {
            var gridLayout = new GridLayout();
            var list = new List([1,2,3,4,5]);
            var result: List = gridLayout.groupItems(list);
	    var hits = 0;
	    gridLayout._allItems(result, () => {
		hits++;
	    });
	    expect(hits).to.equal(5);
        });
    });
});