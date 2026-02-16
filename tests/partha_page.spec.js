import { test, expect } from '@playwright/test';
import excelReader from '../utils/excelReader.js';
import LoginPage from '../pages/LoginPage.js';
import DashboardPage from '../pages/DashboardPage.js';
import CartPage from '../pages/CartPage.js';
import CheckoutInfo from '../pages/partha_pages/CheckoutInfo.js'
import CheckoutOverview from '../pages/partha_pages/CheckoutOverview.js';
import CheckoutComplete from '../pages/partha_pages/CheckoutComplete.js';

test.describe('SauceDemo POM Flow', () => {
  test('Page Objet Model', async ({ page }) => {
   
    const loginCredentials = excelReader.getLoginCredentials(0);
    const username = loginCredentials.username;
    const password = loginCredentials.password;
    const login = new LoginPage(page);
    const dashBoard = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const checkOutInfo = new CheckoutInfo(page);
    const checkOutOverview = new CheckoutOverview(page);
    const checkOutComplete = new CheckoutComplete(page);

    // 1. Navigate to Application
    // 2. Login to Application
    await test.step('Navigate & Login to Application', async () => {
      await login.navigateToLoginPage();
      await login.doLogin(username, password);
      await dashBoard.isOnDashboard();
    });

    // 3. Verify Product Availability on Inventory Page
    // 4. Add Product to Cart
    const product = excelReader.getProductByIndex(3);
    const productName = product.productName;
    const price = product.price;

    await test.step('Verify Product Availability & Add Product to Cart', async () => {
      await dashBoard.isProductDisplayed(productName);
      await dashBoard.addProductToCartByName(productName);
      await expect(
        page.locator(`[data-test="remove-sauce-labs-fleece-jacket"]`)
      ).toHaveText('Remove');
    });

    //5. Verify Cart Badge Increment 
    //6. Navigate to Cart Page
    await test.step('Verify Cart Badge Increment & Navigate to Cart Page', async () => {
      await dashBoard.verifyCartBadgeCount(1);
      await dashBoard.clickCartIcon();
    });

    //7. Verify Product Details on Cart Page
    //8. Proceed to Checkout
    await test.step('Verify Product Details on Cart Page & Proceed to Checkout', async () => {
      await cartPage.verifyCartPageVisible();
      await cartPage.getProductDetails(productName);
      await cartPage.clickCheckout();
    });

    //9. Fill Checkout Information
    await test.step('Fill Checkout Information', async () => {
      await checkOutInfo.fillUpUserInfo('Partha', 'Sarothi', '3570');
      await checkOutInfo.clickContinueBtn();
    });

    //10. Verify Checkout Overview Details
    const totalPriceAmount = "Total: $53.99";
    await test.step('Verify Checkout Overview', async () => {
      await expect(checkOutOverview.getProductName()).toContainText(productName);
      await expect(checkOutOverview.getProductQuantity()).toHaveCount(1);
      await expect(checkOutOverview.getProductPrice()).toContainText(price);
      await expect(checkOutOverview.getTotalPrice()).toContainText(totalPriceAmount);
      await checkOutOverview.clickFinishBtn();
    });

    //11. Complete the Order
    //12. Verify Order Completion Page
    const doneText = "Thank you for your order!";
    await test.step('Complete the Order & Verify', async () => {
      await expect(checkOutComplete.getSuccessText()).toContainText(doneText);
      await expect(checkOutComplete.getSuccessIcon()).toBeVisible();
      await checkOutComplete.backToProducts();
    });

    //13. Navigate Back to Dashboard
    await test.step('Navigate to Dashboard & Post conditions', async () => {
      await dashBoard.verifyDashboardVisible();
      await dashBoard.verifyCartBadgeCount(0);
    });

  });

});