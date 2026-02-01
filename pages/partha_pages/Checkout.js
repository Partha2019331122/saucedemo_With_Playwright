import { expect } from '@playwright/test';

export default class Checkout {
  constructor(page) {
    this.page = page;
    // Checkout Info page
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    // Checkout Overview page
    this.totalPrice = page.locator('[data-test="total-label"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.cartItemName = page.locator('[data-test="inventory-item-name"]');
    this.cartItemPrice = page.locator('[data-test="inventory-item-price"]');
    this.cartQuantity = page.locator('[data-test="item-quantity"]');
    // Checkout Complete page
    this.successText = page.locator('[data-test="complete-header"]');
    this.successIcon = page.locator('[data-test="pony-express"]');
    this.backBtn = page.locator('[data-test="back-to-products"]');
  }

  // Checkout Info
  async fillUpUserInfo(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postCode.fill(postalCode);
  }

  async clickContinueBtn() {
    await this.continueBtn.click();
  }

  // Checkout Overview
  async verifyProductDetails(productName, price) {
    await expect(this.cartItemName).toContainText(productName);
    await expect(this.cartQuantity).toHaveCount(1);
    await expect(this.cartItemPrice).toContainText(price);
  }

  async verifyTotalPrice(totalPriceAmount) {
    await expect(this.totalPrice).toContainText(totalPriceAmount);
  }

  async clickFinishBtn() {
    await this.finishBtn.click();
  }

  // Checkout Complete 
  async verifyCheckoutComplete(doneText) {
    await expect(this.successText).toContainText(doneText);
    await expect(this.successIcon).toBeVisible();
  }

  async backToProducts() {
    await this.backBtn.click();
  }
}
