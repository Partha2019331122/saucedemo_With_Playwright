export default class CheckoutComplete {
  constructor(page) {
    this.page = page;
    // Checkout Complete page
    this.successText = page.locator('[data-test="complete-header"]');
    this.successIcon = page.locator('[data-test="pony-express"]');
    this.backBtn = page.locator('[data-test="back-to-products"]');
  }

  // ----- Getters (for assertions in spec.js) -----

  getSuccessText() {
    return this.successText;
  }

  getSuccessIcon() {
    return this.successIcon;
  }

  // ----- Actions -----

  async backToProducts() {
    await this.backBtn.click();
  }
}
