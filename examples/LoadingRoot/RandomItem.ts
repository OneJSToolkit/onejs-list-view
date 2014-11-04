import IItem = require('../onejs/IItem');

class RandomItem implements IItem {
    foo: string;
    key: number;

    constructor(public bar: number) {
        this.foo = 'generated at ' + new Date();
        this.key = bar;
    }
}

export = RandomItem;