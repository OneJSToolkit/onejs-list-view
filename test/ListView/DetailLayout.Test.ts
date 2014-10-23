///<reference path="./../../../../ext/mocha.d.ts" />
///<reference path="./../../../../ext/chai.d.ts" />
import chai = require('chai');
var expect = chai.expect;

import DetailLayout = require('./../../ListView/DetailLayout');
import ItemGrouping = require('./../../ListView/ItemGrouping');
import List = require('./../../onejs/List');

describe('DetailLayout', () => {
    describe('.groupItems', () => {
        it('returns a group with a header and all items', () => {
	    var a = { x: 1 };
	    var b = { x: 2 };
	    var c = { x: 3 };
	    var detailLayout = new DetailLayout(['x']);
	    var list = new List<any>([a,b,c]);
	    var result: ItemGrouping = detailLayout.groupItems(list).getAt(0);
	    expect(result.header).not.to.be.null;
	    expect(result.items).to.equal(list);
        });
    });

    describe('._allItems', () => {
        it('calls the callback once for each item', () => {
	    var a = { x: 1 };
	    var b = { x: 2 };
	    var c = { x: 3 };
	    var detailLayout = new DetailLayout(['x']);
	    var list = new List<any>([a,b,c]);
	    var result: List<ItemGrouping> = detailLayout.groupItems(list);
	    var hits = 0;
	    detailLayout._allItems(result, () => {
		hits++;
	    });
	    expect(hits).to.equal(4);
        });
    });
});