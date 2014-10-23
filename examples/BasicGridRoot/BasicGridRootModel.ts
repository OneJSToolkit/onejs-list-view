import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');

class BasicGridRootModel extends ViewModel {
    items: List<any>;

    constructor() {
        super();
        this.items = new List<any>();
        for(var i = 0; i < 1000; i++) {
            this.items.push(this.makeObject(i));
        }
    }

    makeObject(i: number): any {
        return {
            text: 'Item ' + i,
            key: i
        };
    }
}

export = BasicGridRootModel;