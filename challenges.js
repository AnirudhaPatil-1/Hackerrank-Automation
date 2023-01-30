const { linkSync } = require("fs");
const pup = require("puppeteer");
const { elementIsDisabled } = require("selenium-webdriver/lib/until");
let id = "seyavor657@fandua.com";
let pass = "seyavor657@fandua.com";
let challenges = require("./pepchallenge"); 

async function main(){
    let browser = await pup.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"]
    })

    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pass);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.click(".dropdown-handle.nav_link.toggle-wrap");
    // await tab.waitForNavigation({waitUntil: "networkidle2"});
    // await tab.waitForSelector("a[data-analytics='NavBarProfileDropDownAdministration']", {visible: true})
    await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
    // await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {visible: true}); 
    let linkLists = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await linkLists[1].click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible: true});
    // await tab.click(".btn.btn-green.backbone.pull-right");
    let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
    let createChallengeUrl = await tab.evaluate(function(ele){
        ele.getAttribute("href");
    }, createChallengeButton)
    console.log(createChallengeUrl);
}

async function createChallenge(){

}

main();