const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class WishListPage extends Page {
    sku = '';
    get itemInWishList() { return $(`.blockListProduct.qaBlockListProduct[data-sku="${this.sku}"]`) }
    get productNameOfitem() { return $(`.blockListProduct.qaBlockListProduct[data-sku="${this.sku}"] .blockListProduct__name`) }
    get removeProduct() { return $(`.blockListProduct.qaBlockListProduct[data-sku="${this.sku}"] .blockListProduct__delete.qaBlockListProduct__delete`) }
    set skuID(skuId) {
        this.sku = skuId;
    }
    open() {
        return super.open('customer/wishlist/index/');
    }
    /**
     * To remove the item with given product id.
     * @param {*} sku - the product id.
     */
    removeItemFromWishListWithSKU(sku) {
        this.skuID = sku;
        this.removeProduct.click();
    }

    getItemNameWithProductId(pId){
        this.skuID = pId;
        this.productNameOfitem.getText();
    }

}
module.exports = new WishListPage();
