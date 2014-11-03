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
        this.flickrApiKey = 'ac0929e61d7be3a4f742ef5823cd3b7d';
        this.searchTerm = 'apple';
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
}

export = RealDataRootModel;