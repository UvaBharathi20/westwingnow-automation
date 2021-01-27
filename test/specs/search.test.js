//import required tools
var assert = require('assert');

//import modules
const LoginPage = require('../pageobjects/login.page');
const HomePage = require('../pageobjects/home.page');
const SearchPage = require('../pageobjects/search.result.page');
const WishListPage = require('../pageobjects/wishlist.page');


describe('HomePageTestSuite', function () {
    /**
     * Login to your account before executing the test.
     */
    beforeEach(() => {
        var command = require('../support/commands');
        //User should login before executing test cases
        LoginPage.open();
        LoginPage.accecptCookie();
        LoginPage.login('uvabharathirajendran@gmail.com', 'westWing@123');
        browser.pause(2000);
    })
    //Test the features present in home page - https://www.westwingnow.de/
    /**
     * Test the following flow:
     * Login into account.
     * Go to main apge search for "Mobel" and click the first option that displays in the search result.
     * For the list of items displayed add the first item to wishlist. Get item details. And remove it from the wishlist.
     */
    it('Scenario : Search Test ', function () {
        HomePage.open();
        browser.pause(5000);
        //browser.validateInitialLoadRequest();
        //browser.assertRequestCall();
        HomePage.searchForProduct('Möbel');
        browser.waitUntil(
            () => HomePage.isSearchSuggestionAvailable(),
            {
                timeout: 7000,
                timeoutMsg: 'expected Suggestion list to appear within 7 seconds.'
            }
        );
        //Choose the first item displayed in search suggestion.
        HomePage.selectFromSearchResult(0);
        var item = SearchPage.addFirstProductFromSearchResultToWishList();
        //After adding to wishlist get the product name
        var result = browser.validateAddToWishList(item.flag);
        var productId = '';
        if (item.flag) {
            productId = result['meta']['default_simple_sku'];
        }
        else {
            productId = result['products'];
        }
        //Open wishlist page.
        WishListPage.open();
        browser.pause(5000);
        //Remove the item from wishlist.
        browser.validateRemoveFromWishListRequests();
        WishListPage.removeItemFromWishListWithSKU(productId.toString());
        browser.pause(7000);
        //Validate remove request calls.
        browser.assertRequestCall();
    })
})