import BaseLayout = require('../ListView/BaseLayout');
import DataProvider = require('./FlickrDataRequest');
import DetailLayout = require('../ListView/DetailLayout');
import List = require('../onejs/List');
import PhotoGridLayout = require('./PhotoGridLayout');
import PhotoTileModel = require('./PhotoTileModel');
import ViewModel = require('../onejs/ViewModel');

class RealDataRootModel extends ViewModel {
    items: List<PhotoTileModel>;
    layout: BaseLayout;
    columns: string[];
    flickrApiKey: string;
    searchTerm: string;
    showDetails: boolean;

    constructor() {
        super();
        this.showDetails = false;
        this.layout = new PhotoGridLayout();
        this.items = new List<PhotoTileModel>();
        this.flickrApiKey = '';
        this.searchTerm = 'apple';
        for(var i = 0; i < 10; i++) {
            this.items.push(this.makeObject(i));
        }
    }

    search() {
        var d = new DataProvider(this.flickrApiKey);
        d.getPhotos(this.searchTerm).then((result) => {
            this.setData({ items: new List<PhotoTileModel>(result.photos.photo) });
        });
    }

    setData(data: any) {
        if(this.showDetails && this.layout instanceof PhotoGridLayout) {
            this.layout = new DetailLayout();
        }
        else if(!this.showDetails && this.layout instanceof DetailLayout) {
            this.layout = new PhotoGridLayout();
        }
        super.setData(data);
    }

    change() {
        console.log(this);
        if(this.showDetails && this.layout instanceof PhotoGridLayout) {
            this.layout = new DetailLayout();
        }
        else if(!this.showDetails && this.layout instanceof DetailLayout) {
            this.layout = new PhotoGridLayout();
        }
        super.change();
    }

    makeObject(i: number): PhotoTileModel {
        var x = new PhotoTileModel();
        x.id = '' + i;
        x.text = 'Item ' + i;
        return x;
    }
}

export = RealDataRootModel;