const puppeteer = require('puppeteer');
const fs = require('fs');

const url = 'https://www.marktplaats.nl/v/dieren-en-toebehoren/katten-en-kittens-raskatten-korthaar/m2027638977-britse-korthaar-x-ragdoll-kittens-all-male?utm_medium=social&utm_campaign=socialbuttons&utm_source=whatsapp-desktop'
const logFilePath = '../kitty-logger.txt'
const maxCalls = 100
let callsMade = 1

// Make the call. Log the response code in the header and the call number in a log file with a timestamep e.g. 2019-01-01 12:00:00 - Call number 1 http_response_code: 200
async function makeCall() {
    const browser = await puppeteer.launch({ headless: "new"});
    const page = await browser.newPage();

    // set the user agent to Mozilla 
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/73.0.3683.75 Safari/537.36');
    await page.setCacheEnabled(false);
    
    // get the http response code from the header and assign to a variable called response
    while (callsMade <= maxCalls) {
        const responseCode = (await page.goto(url)).status()
        await page.waitForTimeout(1000)
        // console.log(` Call number ${callsMade} - http_response_code: ${responseCode}`)
        await logMessage(callsMade, url, responseCode)
        callsMade++
    }
    // close the browser
    await browser.close();
}

async function logMessage(callCount, targetUrl, responseCode) {
    const message = `jsWpuppet - Call number ${callCount} ${targetUrl} - http_response_code: ${responseCode}`
    const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    const log = timestamp + ' - ' + message
    console.log(log)
    await fs.appendFileSync(logFilePath, log + '\n')
}

makeCall();