export default class CheckoutOverview {
    constructor(page) {
        this.page = page;

        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishBtn = page.locator('[data-test="finish"]');
        this.cartItemName = page.locator('[data-test="inventory-item-name"]');
        this.cartItemPrice = page.locator('[data-test="inventory-item-price"]');
        this.cartQuantity = page.locator('[data-test="item-quantity"]');
    }

    getProductName() {
        return this.cartItemName;
    }

    getProductPrice() {
        return this.cartItemPrice;
    }

    getProductQuantity() {
        return this.cartQuantity;
    }

    getTotalPrice() {
        return this.totalPrice;
    }

    async clickFinishBtn() {
        await this.finishBtn.click();
    }
}
