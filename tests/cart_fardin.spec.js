import { test, expect } from './fixtures/authFixture.js';
import excelReader from '../utils/excelReader.js';
import logger from '../helpers/logger.js';


test.describe('Login, Add Item to the Cart, Open cart and Verfiy', () => {
    test('should login, add product to cart, open cart and verify', async ({ page }) => {
        const url = 'https://www.saucedemo.com/';
        // goto the website using the url
        await page.goto(url);
            
         const title = 'Swag Labs';
         // Expect a title "to contain" a string.
         await expect(page.getByText(title)).toBeVisible();
            
         const username = 'standard_user';
         const password = 'secret_sauce';
            
         await page.getByPlaceholder('Username').fill(username);
         await page.getByPlaceholder('Password').fill(password);
            
         // Click the Login button.
         await page.getByRole('button', { name: 'Login' }).click();
         
            
         // Assert that the "Products" title is visible to confirm successful login
         await expect(page.locator('span', { hasText: 'Products' })).toBeVisible();
            
         const itemName = 'Sauce Labs Backpack';
         const item = page.locator('.inventory_item_description').filter({
             has: page.locator('.inventory_item_name', { hasText: itemName })
         });
        
         await item.getByRole('button', { name: 'Add to cart' }).click();
        
         await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

         const cartItem = page.locator('.cart_item').filter({
             has: page.locator('.inventory_item_name', { hasText: itemName })
         });
    });


});
