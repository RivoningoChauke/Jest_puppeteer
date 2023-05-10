const puppeteer = require("puppeteer");
const { describe } = require("yargs");
let browser;
let page;
let url = "http://127.0.0.1:5500/public/index.html";
let TIMEOUT = 3000


function delay(ms){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve("done")
        }, ms)
    })
}

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 70,
    })

    page = await browser.newPage();

    await page.goto(url)
})

describe('Testing User Creation Functionality', () => {
    const firstNameSelector = "#first_name"
    const lastNameSelector = "#last_name"
    const ageSelector = "#age";
    const buttonSelector = "#InputCont button";
    const errorElements = ".error li"
    const pageTitle = "Awesome Website"

    test('page should have corrrect title', async () => {
        const title = await page.title(); //string

        expect(title).toBe("Awesome Website")
    });
})
