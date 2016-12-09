/*
Phantom login
I decided to write a running script for PhantomJS which will login to websites using provided username and password
saving everything in html.
*/

var steps = [];
var testindex = 0;
var loadInProgress = false; //This is set to true when a page is still loading
var urlSite = "www.meusite.com.br";

/*********SETTINGS*********************/
var webPage = require('webpage');
var page = webPage.create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false; //Script is much faster with this field set to false
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;
/*********SETTINGS END*****************/

console.log('All settings loaded');
page.onConsoleMessage = function(msg) {
    console.log(msg);
};


steps = [

    //Step 
    function() {
        console.log('Step 1 - Open');
        page.open(urlSite, function(status) {});
    },
    //Step 2 
    function() {
        console.log('Step 2');
        page.evaluate(function() {
            document.getElementById("doc").value = "";
            document.getElementById("confirm").click();
        });

    },
    //Step 3
    function() {
        console.log('Step 3');
        page.evaluate(function() {
            document.getElementById("user").value = "";
            document.getElementById("pass").value = "";
            document.getElementById("login").click(); //our submit form

        });
    },
    function() {
        console.log('Step 4');
        var fs = require('fs');
        var result = page.evaluate(function() {
            return document.querySelectorAll("html")[0].outerHTML;
        });
        fs.write('page.html', result, 'w');
    },
];


//Execute steps one by one
interval = setInterval(executeRequestsStepByStep, 3000);

function executeRequestsStepByStep() {
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        //console.log("step " + (testindex + 1));
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        console.log("tasks completed!");
        phantom.exit();
    }
}

page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('Loading started');
};
page.onLoadFinished = function() {
    loadInProgress = false;
    console.log('Loading finished');
};
page.onConsoleMessage = function(msg) {
    console.log(msg);
};
