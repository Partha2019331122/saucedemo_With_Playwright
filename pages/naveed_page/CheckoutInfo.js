export default class FillUpcheckOutInformation{
    constructor (page){
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
    }

    async FillUpUserInfo(firstName, lastName, postalCode){
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postCode.fill(postalCode);
    }

    async clickContinueBtn(){
        await this.continueBtn.click();
    }
}