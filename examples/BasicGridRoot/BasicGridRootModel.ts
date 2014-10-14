import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');

class BasicGridRootModel extends ViewModel {
    items: List;

    constructor() {
        super();
        this.items = new List();
        for(var i = 0; i < 100; i++) {
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