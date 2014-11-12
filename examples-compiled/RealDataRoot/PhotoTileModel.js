var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", '../onejs/ViewModel'], function (require, exports, ViewModel) {
    var PhotoTileModel = (function (_super) {
        __extends(PhotoTileModel, _super);
        function PhotoTileModel() {
            _super.apply(this, arguments);
        }
        PhotoTileModel.prototype.url = function () {
            if (this.secret) {
                return 'https://farm' + this.farm + '.staticflickr.com/' + this.server + '/' + this.id + '_' + this.secret + '_n.jpg';
            }
            return "http://placehold.it/300x300";
        };
        return PhotoTileModel;
    })(ViewModel);
    return PhotoTileModel;
});
