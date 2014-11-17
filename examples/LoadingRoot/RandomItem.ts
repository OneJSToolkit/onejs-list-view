import IItem = require('../onejs/IItem');

class RandomItem implements IItem {
    foo: string;
    key: number;
    baz: string;

    constructor(public bar: number) {
        this.foo = 'generated at ' + new Date();
        this.key = bar;
        this.baz = "Just text";
    }
}

export = RandomItem;