import { test, expect } from '@playwright/test';
import excelReader from '../utils/excelReader.js';
import LoginPage from '../pages/LoginPage.js'; 
import DashboardPage from '../pages/DashboardPage.js';
import CartPage from '../pages/CartPage.js';
import Checkout from '../pages/partha_pages/Checkout.js';

test('Page Objet Model', async ({ page }) => {
  // 1. Navigate to Application
  // 2. Login to Application
  const loginCredentials = excelReader.getLoginCredentials(0);
  const username =loginCredentials.username;
  const password =loginCredentials.password;
  const login = new LoginPage(page);
  const dashBoard = new DashboardPage(page);
  await test.step('Navigate & Login to Application', async() =>{
    await login.navigateToLoginPage();
    await login.doLogin(username,password);
    await dashBoard.isOnDashboard();
  });

  // 3. Verify Product Availability on Inventory Page

  /* Sauce Labs Fleece Jacket	
  It's not every day that you come across a midweight quarter-zip fleece jacket	
  $49.99*/

  const product = excelReader.getProductByIndex(3);
  const productName = product.productName;
  const price = product.price;

  await test.step('Verify Product Availability', async() =>{
    await dashBoard.isProductDisplayed(productName);
  });

  // 4. Add Product to Cart
  await test.step('Add Product to Cart', async() =>{
    await dashBoard.addProductToCartByName(productName);

    await expect(
      page.locator(`[data-test="remove-sauce-labs-fleece-jacket"]`)
    ).toHaveText('Remove');
  });

  //5. Verify Cart Badge Increment
  await test.step('Verify Cart Badge Increment', async() =>{
    await dashBoard.verifyCartBadgeCount(1);
  });

  //6. Navigate to Cart Page
  await test.step('Navigate to Cart Page', async() =>{
    await dashBoard.clickCartIcon();  
  });

  //7. Verify Product Details on Cart Page
  const cartPage = new CartPage(page);
  await test.step('Verify Product Details on Cart Page', async () => {
    await cartPage.verifyCartPageVisible();
    await cartPage.getProductDetails(productName);
  });

  //8. Proceed to Checkout
  await test.step('Proceed to Checkout', async () => {
    await cartPage.clickCheckout();
  });
  
  //9. Fill Checkout Information
  const checkOut = new Checkout(page);
  await test.step('Fill Checkout Information', async () => {
    await checkOut.fillUpUserInfo('Partha','Sarothi','3570');
    await checkOut.clickContinueBtn();
  });

  //10. Verify Checkout Overview Details
  const totalPriceAmount = "Total: $53.99";
  await test.step('Verify Checkout Overview', async () => {        
    await checkOut.verifyProductDetails(productName, price);
    await checkOut.verifyTotalPrice(totalPriceAmount);
    await checkOut.clickFinishBtn();
  });
  
  //11. Complete the Order
  //12. Verify Order Completion Page
  const doneText = "Thank you for your order!";
  await test.step('Complete the Order & Verify', async () => {        
    await checkOut.verifyCheckoutComplete(doneText);
    await checkOut.backToProducts();
  });

  //13. Navigate Back to Dashboard
  await test.step('Navigate to Dashboard & Post conditions', async () => {        
    await dashBoard.verifyDashboardVisible();
    await dashBoard.verifyCartBadgeCount(0);
  });

});