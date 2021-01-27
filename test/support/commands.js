var assert = require('assert');

module.exports = (function () {

    /* * * 
     * Def: Fetches the url and title of the page.
     * @param:  
     * @returns result element
     * * */
    browser.addCommand('getUrlAndTitle', function () {
        // `this` refers to the `browser` scope
        return {
            url: this.getUrl(),
            title: this.getTitle(),
        }
    })
    /**
     * Def: Function to validate the rewuired REST API calls while loading home page.
     * 
     */
    browser.addCommand('validateInitialLoadRequest', function () {
        this.setupInterceptor(); // capture ajax calls
        // expect GET request to API with 200 statusCode  and validate url
        this.expectRequest('GET', 'https://cdn.cookielaw.org/consent/4d196240-a73f-411e-9284-07754335d352/72eb7024-618e-49fc-92de-bd36f0774372/de.json', 200);
        this.expectRequest('GET', 'https://cdn.cookielaw.org/scripttemplates/6.4.0/assets/otCenterRounded.json', 200);
        this.expectRequest('GET', 'https://cdn.cookielaw.org/scripttemplates/6.4.0/assets/otPcTab.json', 200);
        this.expectRequest('GET', 'https://www.westwingnow.de/now-api/wishlist?country=de', 200);
        this.expectRequest('GET', 'https://www.westwingnow.de/now-api/cart/count?country=de', 200);
        this.expectRequest('GET', 'https://www.westwingnow.de/now-api/user/clubssopixelurl?country=de', 200);
        this.expectRequest('POST', 'https://sdk.api.appboy.eu/api/v3/content_cards/sync', 201);
        this.expectRequest('POST', 'https://sdk.api.appboy.eu/api/v3/data/', 201);
        this.pause(1000);
    })

    browser.addCommand('assertRequestCall', function () {
        this.assertRequests();
    })
    browser.addCommand('validateAddToWishList', function (flag) {
        var request = this.getRequests();
        if(flag){
            return request[2].response.body['data'];
        }
        else{
            assert.equal(request[0].method, 'GET');
            assert.equal(request[0].response.statusCode,200);
            return request[0].response.body['data'];
        } 
    })

    browser.addCommand('validateRemoveFromWishListRequests', function(){
        this.setupInterceptor(); 
        this.expectRequest('POST', '/customer/wishlist/removeproduct/', 200);
        this.expectRequest('GET', 'https://www.westwingnow.de/now-api/wishlist?country=de', 200);
        this.expectRequest('GET', 'https://www.westwingnow.de/now-api/wishlist?country=de', 200);
    })
})();