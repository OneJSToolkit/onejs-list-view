import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import DetailLayout = require('../ListView/DetailLayout');
import GridLayout = require('../ListView/GridLayout');
import Threshold = require('../ListView/Threshold');
import IItem = require('../onejs/IItem');
import SimpleItemTile = require('./SimpleItemTile');

class ResponsiveRootModel extends ViewModel {
    items: List<IItem>;
    gridLayout: GridLayout;
    detailLayout: DetailLayout;
    columns: string[];
    thresholds: List<Threshold>;

    constructor() {
        super();
	this.columns = ['index', 'text', 'somethingRandom'];
	this.thresholds = this.makeThresholds();
	this.detailLayout = new DetailLayout(this.columns// , this.thresholds
					    ); 
	this.gridLayout = new GridLayout(SimpleItemTile); 
        this.items = new List<IItem>();
        for(var i = 0; i < 100; i++) {
            this.items.push(this.makeObject(i));
        }
    }

    makeObject(i: number): any {
        return {
	    index: i,
            text: 'Item ' + i,
	    somethingRandom: Math.random() * 1000,
            key: i
        };
    }

    makeThresholds(): List<Threshold> {
	return new List([
	    new Threshold(0, 480, 'small'),
	    new Threshold(480, 9999, 'full')
	]);
    }
}

export = ResponsiveRootModel;