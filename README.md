# westwingnow-automation

This is the automation framework for westwingnow application.
Please set up webdriverio prior to running automation. Use link https://webdriver.io/docs/gettingstarted.html

Install WebdriverIO CLI
If you want to use WebdriverIO in your project for integration testing, we recommend using the test runner. It comes with lots of useful features that makes your life easier.

Since WebdriverIO version 5, the testrunner is in the @wdio/cli NPM package.

Now, install the CLI:

$ npm i --save-dev @wdio/cli

## Dependencies
Intercept [https://webdriver.io/docs/wdio-intercept-service.html]

Run the individual test using below commands,

npx wdio wdio.conf.js --spec test/specs/login.test.js 
npx wdio wdio.conf.js --spec test/specs/search.test.js
