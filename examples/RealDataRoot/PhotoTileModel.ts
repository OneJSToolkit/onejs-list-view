import ViewModel = require('../onejs/ViewModel');

class PhotoTileModel extends ViewModel {
    id: string;
    owner: string;
    secret: string;
    server: string;
    farm: number;
    key: string;
    text: string;

    url(): string {
        if(this.secret) {
            return 'https://farm' + this.farm + '.staticflickr.com/' + this.server + '/' + this.id + '_' + this.secret + '_n.jpg';
        }
        return "http://placehold.it/300x300";
    }
}

export = PhotoTileModel;