///<reference path="./../../../../ext/mocha.d.ts" />
///<reference path="./../../../../ext/chai.d.ts" />
import chai = require('chai');
var expect = chai.expect;

import GridLayout = require('./../../ListView/GridLayout');
import ItemGrouping = require('./../../ListView/ItemGrouping');
import List = require('./../../onejs/List');
import Threshold = require('./../../ListView/Threshold');


describe('GridLayout', () => {
    // TODO: move to ItemGrouping
    // describe('._allItems', () => {
    //     it('calls the callback once for each item', () => {
    //         var gridLayout = new GridLayout();
    //         var list = new List<any>([1,2,3,4,5]);
    //         var result: List<any> = gridLayout.groupItems(list);
    // 	    var hits = 0;
    // 	    gridLayout._allItems(result, () => {
    // 		hits++;
    // 	    });
    // 	    expect(hits).to.equal(5);
    //     });
    // });

    describe('_selectThreshold', () => {
        var l: GridLayout;
        var v: any;

        before(() => {
            l = new GridLayout();

            v = {
                width: 100,
                height: 100,
                scrollTop: 18
            };
        });

        it('returns correct threshold', () => {
            var t = new List([
                new Threshold(0, 200, 'mini'),
                new Threshold(200, 480, 'small'),
                new Threshold(480, 9999, 'full')
            ]);
            var result = l._selectThreshold(v, t);
            expect(result.name).to.equal('mini');
        });

        it('returns no threshold if no thresholds match', () => {
            var t = new List([
                new Threshold(480, 9999, 'full')
            ]);
            var result = l._selectThreshold(v, t);
            expect(result).to.be.null;
        });

        it('returns first threshold if multiple thresholds match', () => {
            var t = new List([
                new Threshold(0, 200, 'foo'),
                new Threshold(100, 480, 'bar'),
                new Threshold(101, 9999, 'baz')
            ]);
            var result = l._selectThreshold(v, t);
            expect(result.name).to.equal('foo');
        });

	it('does not fail if either value is null', () => {
	    var result: Threshold;
            var t = new List([
                new Threshold(480, 9999, 'full')
	    ]);

	    result = l._selectThreshold(v, null);
            expect(result).to.be.null;

	    result = l._selectThreshold(null, t);
            expect(result).to.be.null;

	    result = l._selectThreshold(null, null);
            expect(result).to.be.null;

	    result = l._selectThreshold({}, t);
            expect(result).to.be.null;

	    result = l._selectThreshold(v, undefined);
            expect(result).to.be.null;
	});
    });
});