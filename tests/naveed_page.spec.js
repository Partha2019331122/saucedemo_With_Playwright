import { test, expect } from '@playwright/test';
import excelReader from '../utils/excelReader.js';
import LoginPage from '../pages/LoginPage.js'; 
import DashboardPage from '../pages/DashboardPage.js';
import CartPage from '../pages/CartPage.js';
import FillUpcheckOutInformation from '../pages/naveed_page/CheckoutInfo.js';
import CheckoutOverview from '../pages/naveed_page/CheckoutOverview.js';
import CheckoutComplete from '../pages/naveed_page/CheckoutComplete.js';

test.describe('Product Order', () => {
    let login, dashBoadrd, cartPg, checkOutIn, checkOutOver, checkOutComp;

    test.beforeEach(async ({ page }) => {
        login = new LoginPage(page);
        dashBoadrd = new DashboardPage(page);
        cartPg = new CartPage(page);
        checkOutIn = new FillUpcheckOutInformation(page);
        checkOutOver = new CheckoutOverview(page);
        checkOutComp = new CheckoutComplete(page);
    });

    test('Product Ordering Process', async({page}) => {
        const removeBtn = page.locator('[data-test="remove-sauce-labs-fleece-jacket"]');

        const loginData = excelReader.getLoginCredentials(0);
        const { username, password } = loginData;

        const productData = excelReader.getProductByIndex(3);
        const product = productData.productName;
        const price = productData.price;

        const firstName = "First Name";
        const lastName = "Last Name";
        const postalCode = "1A1A1A";
        const totalPrice_amount = "Total: $53.99"
        const doneText = "Thank you for your order!";

        await test.step('Login to Application', async () => {
            await login.navigateToLoginPage();
            await login.doLogin(username, password);
            await dashBoadrd.isOnDashboard();
        });

        await test.step('Dashboard Page & add to cart', async () => {
            await dashBoadrd.isProductDisplayed(product);
            await dashBoadrd.addProductToCartByName(product);
            await expect(removeBtn).toContainText('Remove');
            await dashBoadrd.verifyCartBadgeCount(1);
            await dashBoadrd.clickCartIcon();
        });

        await test.step('Cart Page & checkout', async () => {
            await cartPg.verifyCartPageVisible();
            await cartPg.getProductDetails(product);
            await cartPg.clickCheckout();
        });

        await test.step('Checkout info page', async () => {
            await checkOutIn.userInfo(firstName, lastName, postalCode);
            await checkOutIn.clickContinueBtn();
        });

        await test.step('Checkout overview page', async () => {        
            await checkOutOver.getProductDetails(product, price);
            await checkOutOver.totalPrc(totalPrice_amount);
            await checkOutOver.clickOnFinishBtn();
        });

        await test.step('Checkout complete', async () => {        
            await checkOutComp.checkoutCompletePage(doneText);
        });

        await test.step('Post conditions', async () => {        
            await dashBoadrd.verifyDashboardVisible();
            await dashBoadrd.verifyCartBadgeCount(0);
        });
    });
});