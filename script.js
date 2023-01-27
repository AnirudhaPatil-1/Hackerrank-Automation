// const { text } = require("cheerio/lib/api/manipulation");
const pup = require("puppeteer");
let id = "seyavor657@fandua.com";
let pass = "seyavor657@fandua.com";

let browserPromise = pup.launch({
    headless: false,
    defaultViewport: false
});
// console.log(browserPromise);
//OUTPUT -> Promise { <pending> }
let tab;
browserPromise.then(function(browser){
    let pagesPromise = browser.pages();
    return pagesPromise;
}).then(function(pages){
    tab = pages[0];
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
}).then(function(){
    let idPromise = tab.type('#input-1',id);
    return idPromise;
}).then(function(){
    let passPromise = tab.type('#input-2',pass);
    return passPromise;
}).then(function(){
    let  loginPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginPromise;
}).then(function(){
    let waitPromise =  tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.recommended-prep-kit-card-cta.ui-btn-link.ui-btn-styled", {visible: true});
    return waitPromise;
}).then(function(){
    let IpkClickPromise = tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.recommended-prep-kit-card-cta.ui-btn-link.ui-btn-styled");
    return IpkClickPromise;
}).then(function(){
    let waitPromise = tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled", {visible: true});
    return waitPromise;
}).then(function(){
    // console.log("warm up challenges");
}).then(function(){
    let allUrlsPromise = tab.$$(".ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled");
    return allUrlsPromise;
}).then(function(data){
    // console.log(data.length);
    let urlFetchPromises = [];
    let count = 0;
    for(let i of  data){
        if(count < 4){
            let urlFetchPromise = tab.evaluate(function(ele){
                return ele.getAttribute("href");
            }, i);
            urlFetchPromises.push(urlFetchPromise);
        }
        count++;
    }  
    return Promise.all(urlFetchPromises); 
}).then(function(data){
    // console.log(data);
    // console.log()
    let problemSolvedPromise = solveQuestion("https://www.hackerrank.com" + data[0]);
    for(let i = 1; i <= data.length; i++){
        // console.log(`value of i: ${i}`)
        problemSolvedPromise = problemSolvedPromise.then(function(){
            return solveQuestion("https://www.hackerrank.com" + data[i]);
        })


    }
}).then(function(){
    console.log("CODE WORKING");
}).catch(function(err){
    console.log(`ERROR OCCURED ${err}`);
})

function solveQuestion(url){
    // console.log( `url: ${url}`);
    let problemUrl = url;
    let editoralUrl = url.replace("?", "/editorial?");
    return new Promise(function(resolve, reject){
        tab.goto(editoralUrl).then(function(){
            let languagesPromise = tab.$$(".hackdown-content h3");
            return languagesPromise;
        }).then(function(data){
            let languagesPromise = [];
            for(let i of data){
                let languagePromise = tab.evaluate(function(ele){
                    return ele.textContent;
                }, i);
                languagesPromise.push(languagePromise);
            }
            return Promise.all(languagesPromise);
        }).then(function(data){
            // console.log(data);
            for(let i in data){
                if(data[i] == "C++"){
                    let finalAnswerPromise = tab.$$(".highlight").then(function(answers){
                        let answerPromise = tab.evaluate(function(ele){
                            return ele.textContent;
                        }, answers[i]);
                        return answerPromise;
                    });
                    return finalAnswerPromise;
                }
            }
        }).then(function(data){
            console.log(data);
        }).then(function(){
            resolve();
        })
    })
    
}