var srcFolder = "../../../src/node_modules/";
const { Builder }= require(srcFolder + "selenium-webdriver");

(async function(){
let driver = await new Builder().withCapabilities({
            'browserName': 'chrome',
            'platformName': 'Windows 10',
            'browserVersion': 'latest',
            'goog:chromeOptions' : { 'w3c' : true },
            'sauce:options': {
                'username': process.env.SAUCE_USER,
                'accessKey': process.env.SAUCE_ACCESS_KEY,
                'build': process.env.GIT_HASH,
                'name': 'test',
                /* As a best practice, set important test metadata and execution options
                such as build info, tags for reporting, and timeout durations.
                */
                'maxDuration': 100,
                'idleTimeout': 1000,
                'tags': tags
            }
        }).usingServer("https://ondemand.saucelabs.com/wd/hub").build();

await driver.getSession().then(function (sessionid) {
  driver.sessionID = sessionid.id_;
  console.log(driver.sessionID);
});
let baseUrl = "http://localhost:9001/tests/frontend";
await driver.get(baseUrl);

})()
