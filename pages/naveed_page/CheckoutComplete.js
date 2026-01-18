import { expect } from '@playwright/test';

export default class CheckoutComplete{
    constructor (page){
        this.page = page;
        this.success_Text = page.locator('[data-test="complete-header"]');
        this.icon = page.locator('[data-test="pony-express"]');
        this.backBtn = page.locator('[data-test="back-to-products"]');
       
    }

    async checkoutCompletePage(doneText){
        await expect(this.success_Text).toContainText(doneText);
        await expect(this.icon).toBeVisible();
        await this.backBtn.click();
    }
}