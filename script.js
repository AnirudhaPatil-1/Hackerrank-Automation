const pup = require("puppeteer");

let browserPromise = pup.launch({
    headless: false,
    defaultViewport: false
});
console.log(browserPromise);
//OUTPUT -> Promise { <pending> }

// browserPromise.then(function(browser){
//     let pagesPromise = browser.pages();
//     return pagesPromise;
// }).then(function(pages){
//     tab = pages[0];
//     tab.goto("https://www.hackerrank.com/auth/login");
// })