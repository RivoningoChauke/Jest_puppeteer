const puppeteer = require("puppeteer");

//asynchronous IIFE (IMMEDIATELY INVOKED FUNCTION EXPRESSION)

(
    async()=>{
        const browser = await puppeteer.launch({
            headless: false
        });
    }
)