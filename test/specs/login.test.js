//import required tools
var assert = require('assert');

//import modules
const LoginPage = require('../pageobjects/login.page');

describe('LoginTestSuite', function(){
    beforeEach(() => {
        var command = require('../support/commands')
    });

    //Test Login function
    it('Scenario : Login Test ', function(){
        LoginPage.open();
        const result = browser.getUrlAndTitle();
        assert.strictEqual(result.url, 'https://www.westwingnow.de/customer/account/login/');
        assert.strictEqual(result.title, 'Anmelden oder Konto erstellen | WestwingNow');
        LoginPage.accecptCookie();
        LoginPage.login('uvabharathirajendran@gmail.com', 'westWing@123');
        browser.pause(5000);
        const classNameAndText = LoginPage.getMyaccountElement();
        classNameAndText.moveTo();
        browser.pause(5000);
        //Check if when my account is hovered menu list is visible after login.
        //expect(LoginPage.isMenuAvailable()).to.equal(true);
        assert.strictEqual(LoginPage.getUserName(),'Uva Bharathi') // Check if the user name is correct after login.
    });
});
