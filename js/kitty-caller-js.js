const puppeteer = require('puppeteer');
const fs = require('fs');

const url = 'https://www.example.com'
const logFilePath = '../kitty-logger.txt'
const maxCalls = 100
let callsMade = 1

async function makeCall() {
    const browser = await puppeteer.launch({ headless: "new"});
    const page = await browser.newPage();

    // set the user agent to Mozilla 
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/73.0.3683.75 Safari/537.36');
    await page.setCacheEnabled(false);
    
    // get the http response code from the header and assign to a variable called response
    while (callsMade <= maxCalls) {
        const responseCode = (await page.goto(url)).status()
        // WATCHPOINT: waitForTimeout() function is deprecated. An alternative has to be found.
        await page.waitForTimeout(1000)
        await logMessage(callsMade, url, responseCode)
        callsMade++
    }
    
    await browser.close();
}

// Helper function to log the message to the console and to a file
async function logMessage(callCount, targetUrl, responseCode) {
    const message = `jsWpuppet - Call number ${callCount} ${targetUrl} - http_response_code: ${responseCode}`
    const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    const log = timestamp + ' - ' + message
    console.log(log)
    await fs.appendFileSync(logFilePath, log + '\n')
}

makeCall();