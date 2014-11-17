import EventGroup = require('../onejs/EventGroup');
import IItem = require('../onejs/IItem');
import IItemProvider = require('../ListView/IItemProvider');
import List = require('../onejs/List');
import RandomItem = require('./RandomItem');

var CHANGE_EVENT ='change';

class RandomItemProvider implements IItemProvider {
    items: List<RandomItem>;
    _i: number;
    _pseudoAsyncRequestCount = 0;
    events = new EventGroup(this);

    constructor() {
        this.items = new List<RandomItem>();
        this.events.declare([ CHANGE_EVENT ]);
        this.events.on(this.items, CHANGE_EVENT, this.fireChange);
    }

    fireChange() {
        this.events.raise(CHANGE_EVENT);
    }

    log(msg: string) {
        console.log('[RandomItemProvider] ' + msg);
    }

    sortBar(ascending) {
        this.items.array.sort((a,b) => { return a.bar - b.bar; });
        if(!ascending) {
            this.items.array.reverse();
        }
        this.fireChange();
    }

    sortFoo(ascending) {
        this.items.array.sort((a,b) => { return a.foo.localeCompare(b.foo); });
        if(!ascending) {
            this.items.array.reverse();
        }
        this.fireChange();
    }

    loadNextBatch() {
        // if we are already "loading" more items, ignore request
        if(this.isLoadingItems()) {
            this.log('not loading more items... already doing it.');
            return;
        }

        this.log('setting timeout to add more items...');
        this._pseudoAsyncRequestCount++;
        this.fireChange();      // Fire change event to let views
                                // update any loading animations
        setTimeout(() => {
            this.log('adding 5 more items...');
            this._pseudoAsyncRequestCount--;
            for(var i = 0; i < 5; i++) {
                this.items.push(new RandomItem(i));
            }
            this.log('now have ' + this.items.getCount() + ' items.');
        }, Math.random() * 500);
    }

    isLoadingItems(): boolean {
        return this._pseudoAsyncRequestCount !== 0;
    }
}

export = RandomItemProvider;