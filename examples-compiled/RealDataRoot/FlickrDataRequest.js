define(["require", "exports", '../onejs/Promise'], function (require, exports, Promise) {
    var FlickrDataRequest = (function () {
        function FlickrDataRequest(key) {
            this.key = key;
        }
        FlickrDataRequest.prototype.generateCallbackFunction = function (callbackFn) {
            var fn = function (result) {
                callbackFn(result);
            };
            if (!window['jsonpCallbacks']) {
                window['jsonpCallbacks'] = {};
                window['jsonpCallbacks']['index'] = 0;
            }
            var fnName = 'callback' + window['jsonpCallbacks'].index++;
            window['jsonpCallbacks'][fnName] = fn;
            return 'jsonpCallbacks.' + fnName;
        };
        FlickrDataRequest.prototype.getPhotos = function (term) {
            var _this = this;
            return new Promise(function (complete) {
                var callbackFunction = _this.generateCallbackFunction(complete);
                var script = document.createElement('script');
                var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&sort=interestingness-desc&api_key=' + _this.key + '&text=' + term + '&format=json&jsoncallback=' + callbackFunction;
                script.src = url;
                document.head.appendChild(script);
            });
        };
        return FlickrDataRequest;
    })();
    return FlickrDataRequest;
});
