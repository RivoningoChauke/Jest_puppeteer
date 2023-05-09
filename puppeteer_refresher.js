const puppeteer = require("puppeteer");

//asynchronous IIFE (IMMEDIATELY INVOKED FUNCTION EXPRESSION)

(
    async()=>{
        const browser = await puppeteer.launch({
            headless: false
        });

        const page = await browser.newPage(); //it create new page

        //go to the new page

        await page.goto('https://google.com')

        const searchSelector = 'input[title="Search"]'  //attribute with title search

        await page.waitForSelector(searchSelector)

        await page.click(searchSelector, {clickCount: 1})

        await page.type(searchSelector, "Pizza restaurants")

        await page.keyboard.press("Enter")

        console.log("done with automation")
    }
)()