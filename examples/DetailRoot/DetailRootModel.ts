import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import DetailLayout = require('../ListView/DetailLayout');

class DetailRootModel extends ViewModel {
    items: List < any > ;
    layout: DetailLayout;
    columns: string[];

    constructor() {
        super();
        this.columns = ['index', 'text', 'somethingRandom'];
        this.layout = new DetailLayout(this.columns);
        this.items = new List < any > ();
        for (var i = 0; i < 100; i++) {
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
}

export = DetailRootModel;