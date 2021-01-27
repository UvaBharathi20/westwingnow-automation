/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {

    /**
     * define selectors using getter methods
     */

    get searchBar() { return $('input[data-testid="search-input"]') }
    get suggestionsForSearch() { return $('div[data-testid="suggestions"]') }
    get searchIcon() { return $('svg[data-testid="header-search-icon"]') }
    get myAccount() { return $('.IconsButtonTray__MenuLabel-sc-1k6jcrl-2=Mein Konto') }
    get userName() { return $('.IconsButtonTray__MenuLabel-sc-1k6jcrl-2.IconsButtonTray__MenuSubLabel-sc-1k6jcrl-3') }
    get logo() { return $('.OneHeader__StyledWestwingNowLogo-d0qgmn-5') }
    get menuSectionElement() { return $('.MenuSection__StyledMenuSectionList-sc-147xlho-1') }
    get menuItemElements() { return $('.HybridLink__StyledAnchor-sc-17cu3nf-0.hodTuY.MenuItem__StyledMenuLink-sc-1yqmfy7-0') }
    get itemFromSearchSuggestion() { return '.Item__StyledWrapper-sc-184dx11-0' }
    get searchSuggestionGroup() { return $('.Suggestions__SuggestionWrapper-sc-1633i26-0.cBaYEu.qa-header-search-suggestion') }
    get accountWishlist() { return $('.icon-wishlist') }

    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open(path = "") {
        return browser.url(`https://www.westwingnow.de/${path}`)
    }

    /**
     * Gets the search bar element and enters the product to searched.
     * @param {*} product the name of the product to be searched.
     */
    searchForProduct(product) {
        this.searchBar.setValue(product);
    }

    /**
     * Clicks on the main page logo.
     */
    clickLogo() {
        this.logo.click();
    }
    /**
     * Get the user name of the logged in user.
     */
    getUserName() {
        return this.userName.getText();
    }
    /***
     * 
     */
    getMyaccountElement() {
        return this.myAccount;
    }
    /**
     * Check if the account menu is available.
     */
    isMenuAvailable() {
        return this.menuSectionElement.isExisting();
    }
    /**
     * Check if the search result menu is avaialble.
     */
    isSearchSuggestionAvailable() {
        return this.searchSuggestionGroup.isExisting();
    }

    /**
     * 
     * @param {*} ele The element which has multiple instance.
     * @param {*} n The index of the element to be choosen.
     */
    getElementWithIndex(ele, n) {
        browser.pause(1000);
        return $$(ele)[n];
    }

    /**
     * Choose the nth element for the given element
     * @param {*} n the index of the element to be choosen, 
     * @param ele The element which has multiple instance.
     */
    selectElementWithIndex(ele, n) {
        this.getElementWithIndex(ele, n).click();
    }
    /**
     * choose the required element from search menu list.
     */
    selectFromSearchResult(index) {
        this.selectElementWithIndex(this.itemFromSearchSuggestion, index);
        browser.pause(2000);
    }
}
