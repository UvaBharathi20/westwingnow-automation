const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SearchResultPage extends Page {
    get resultPageTitle() { return $('h1.RegularTitle__StyledPageTitle-zjo017-0') }
    get wishlistElement() { return '.WishlistIcon__StyledWishlistIconWrapper-sc-75dklq-0[data-testid="wishlist-icon"]' }
    get productTitleElement() { return 'div[data-testid="product-title"]' }
    get wishListData() { return '.WishlistIcon__StyledWishlistIconWrapper-sc-75dklq-0[data-testid="wishlist-icon"] svg' }

    /**
     * Function to add the first search result to wishlist.
     */
    addFirstProductFromSearchResultToWishList() {
        browser.pause(2000);
        var ind = 0;
        var product_name = this.getNameOfproductBeingAddedtoWishlist(0);
        var flag = this.isAddedToWishlist(ind);
        browser.setupInterceptor(); // capture ajax calls palced when wishlist icon is clicked
        if (!flag) {
            this.addToWishlistSearchResultWithIndex(ind);
        }
        else {
            this.getElementWithIndex(this.productTitleElement, ind).click();
        }
        browser.pause(5000);
        return { flag, product_name };
    }

    /**
     * Get the wishlist details.
     * @param {*} index index of the element for which wishlist details need to be obtained. 
     */
    getWishListDetails(index) {
        return this.getElementWithIndex(this.wishListData, index);
    }

    /**
     * to check if the required product is already in wishlist. If not added then add to wishlist.
     * @param {*} index The index of the element to be added to wishlist
     */
    isAddedToWishlist(index) {
        if (this.getWishListDetails(index).getAttribute('data-is-selected') == 'true') {
            console.log('Product already in wishlist');
            return true;
        }
        else {
            console.log('Add product to wishlist');
            return false;
        }
    }
    /**
     * 
     * @param {*} index index of the element added to wishlist for which the name has to be obtained.
     */
    getNameOfproductBeingAddedtoWishlist(index) {
        return this.getElementWithIndex(this.productTitleElement, index).getText();
    }
    /**
     * 
     * @param {*} index index of the element to be added to wishlist.
     */
    addToWishlistSearchResultWithIndex(index) {
        this.selectElementWithIndex(this.wishlistElement, index);
    }
}
module.exports = new SearchResultPage();
