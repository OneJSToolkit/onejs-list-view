import Promise = require('../onejs/Promise');

class FlickrDataRequest {
    constructor(public key:string) {}

    generateCallbackFunction(callbackFn: (any) => any): string {
        var fn = (result) => {
            callbackFn(result);
        };

        if(!window['jsonpCallbacks']) {
            window['jsonpCallbacks'] = {};
            window['jsonpCallbacks']['index'] = 0;
        }

        var fnName = 'callback' + window['jsonpCallbacks'].index++;

        window['jsonpCallbacks'][fnName] = fn;
        return 'jsonpCallbacks.' + fnName;
    }

    getPhotos(term: string): Promise {
        return new Promise((complete) => {
            var callbackFunction = this.generateCallbackFunction(complete);
            var script = document.createElement('script');
            var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&sort=interestingness-desc&api_key=' + this.key + '&text=' + term + '&format=json&jsoncallback=' + callbackFunction;
            script.src = url;
            document.head.appendChild(script);
        });
    }
}

export = FlickrDataRequest;