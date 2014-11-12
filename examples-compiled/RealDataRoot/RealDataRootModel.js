var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './FlickrDataRequest', '../ListView/DetailLayout', '../onejs/List', './PhotoGridLayout', '../onejs/ViewModel'], function (require, exports, DataProvider, DetailLayout, List, PhotoGridLayout, ViewModel) {
    var RealDataRootModel = (function (_super) {
        __extends(RealDataRootModel, _super);
        function RealDataRootModel() {
            _super.call(this);
            this.showDetails = false;
            this.layout = new PhotoGridLayout();
            this.items = new List();
            this.flickrApiKey = 'ac0929e61d7be3a4f742ef5823cd3b7d';
            this.searchTerm = 'apple';
        }
        RealDataRootModel.prototype.search = function () {
            var _this = this;
            var d = new DataProvider(this.flickrApiKey);
            d.getPhotos(this.searchTerm).then(function (result) {
                _this.setData({ items: new List(result.photos.photo) });
            });
        };
        RealDataRootModel.prototype.setData = function (data) {
            if (this.showDetails && this.layout instanceof PhotoGridLayout) {
                this.layout = new DetailLayout();
            }
            else if (!this.showDetails && this.layout instanceof DetailLayout) {
                this.layout = new PhotoGridLayout();
            }
            _super.prototype.setData.call(this, data);
        };
        RealDataRootModel.prototype.change = function () {
            console.log(this);
            if (this.showDetails && this.layout instanceof PhotoGridLayout) {
                this.layout = new DetailLayout();
            }
            else if (!this.showDetails && this.layout instanceof DetailLayout) {
                this.layout = new PhotoGridLayout();
            }
            _super.prototype.change.call(this);
        };
        return RealDataRootModel;
    })(ViewModel);
    return RealDataRootModel;
});
