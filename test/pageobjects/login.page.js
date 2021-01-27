const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername() { return $('#LoginForm_email') }
    get inputPassword() { return $('#LoginForm_password') }
    get btnSubmit() { return $('.ga-checkout__forms__btn_login.checkout__forms__btn.btn-primary') }
    get CookieButton() { return $('button#onetrust-accept-btn-handler') }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    login(username, password) {
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        browser.pause(2000);
        this.btnSubmit.click();
        browser.pause(2000);
    }

    /**
     * Accept cookies pop up shown.
     */
    accecptCookie() {
        browser.pause(10000);
        if (this.CookieButton.isExisting()) {
          this.CookieButton.click();
        }
        browser.pause(2000);
        //const cookie = this.CookieButton;
        //cookie.waitForExist({ timeout: 7000 });
        //cookie.click();
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open() {
        return super.open('customer/account/login/');
    }
}

module.exports = new LoginPage();
