import { expect } from '@playwright/test';

export default class CheckoutOverview{
    constructor (page){
        this.page = page;
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishBtn = page.locator('[data-test="finish"]');
        this.cartItemName = page.locator('[data-test="inventory-item-name"]');
        this.cartItemPrice = page.locator('[data-test="inventory-item-price"]');
        this.cartQuantity = page.locator('[data-test="item-quantity"]');
    }

    async totalPrc(totalPrice_amount){
        await expect(this.totalPrice).toContainText(totalPrice_amount);
    }

    async clickOnFinishBtn(){
        await this.finishBtn.click();
    }

    async getProductDetails(productName, price) {
        await expect(this.cartItemName).toContainText(productName);
        await expect(this.cartQuantity).toHaveCount(1);
        await expect(this.cartItemPrice).toContainText(price);
    }
}