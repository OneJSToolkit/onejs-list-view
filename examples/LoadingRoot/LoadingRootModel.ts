import ViewModel = require('../onejs/ViewModel');
import List = require('../onejs/List');
import DetailLayout = require('../ListView/DetailLayout');
import IItemProvider = require('../ListView/IItemProvider');
import RandomItemProvider = require('./RandomItemProvider');
import IColumnDefinition = require('../ListView/IColumnDefinition');

class DetailRootModel extends ViewModel {
    itemProvider: RandomItemProvider;
    layout: DetailLayout;
    columnDefinition: List<any>;

    constructor() {
        super();
        this.itemProvider = new RandomItemProvider();
        this.buildColumnsDefinition();
        this.layout = new DetailLayout(this.columnDefinition);
    }

    sortBar(isAscending) {
        this.columnDefinition.getAt(0).isSorted = true;
        this.columnDefinition.getAt(1).isSorted = false;
        this.columnDefinition.getAt(2).isSorted = false;
        this.itemProvider.sortBar(isAscending);
        this.columnDefinition.change();
    }

    sortFoo(isAscending) {
        this.columnDefinition.getAt(0).isSorted = false;
        this.columnDefinition.getAt(1).isSorted = true;
        this.columnDefinition.getAt(2).isSorted = false;
        this.itemProvider.sortFoo(isAscending);
        this.columnDefinition.change();
    }

    buildColumnsDefinition() {
        this.columnDefinition = new List<any>([
            {
                key: 'bar',
                title: "Index",
                width: 150,
                isVisible: true,
                isSorted: false,
                isAscending: false,
                sort: (columnDef) => { this.sortBar(columnDef.isAscending); }
            },
            {
                key: 'foo',
                title: "Foo",
                width: 450,
                isVisible: true,
                isSorted: false,
                isAscending: false,
                isSortable: true,
                sort: (columnDef) => { this.sortFoo(columnDef.isAscending); }
            },
            {
                key: 'baz',
                title: "BAZ",
                width: 150,
                isVisible: true,
                isSorted: false,
                isAscending: false,
                isSortable: false
            },
        ]);
    }
}

export = DetailRootModel;