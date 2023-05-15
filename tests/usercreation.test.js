const puppeteer = require("puppeteer")
let browser;
let page;
let url = "http://127.0.0.1:5500/public/index.html";
let TIMEOUT = 30000


function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("done")
        }, ms)
    })
}

function getErrors(errorSelectors) {
    const errorList = document.querySelectorAll(errorSelectors)
    if (errorList.length > 0) {
        return [...errorList].map(error => error.textContent)
    }

    return []
}

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 70,
    })

    page = await browser.newPage();

    await page.goto(url)
})

afterAll(async () => {
    await browser.close()
})


describe('Testing User Creation Functionality', () => {

    const firstNameSelector = "#first_name"
    const lastNameSelector = "#last_name"
    const ageInputSelector = "#age";
    const buttonSelector = ".InputCont button";
    const errorSelectors = ".error li";
    const pageTitle = "Awesome Website"
    const userSelector = ".userlist ul .names"
    const ageItemSelector = ".userlist ul .ageitem"

    test('Page should have the correct title', async () => {
        const title = await page.title(); // string

        expect(title).toBe(pageTitle)
    });

    test('Should throw three errors if no input has been filled', async () => {

        await page.waitForSelector(firstNameSelector);
        await page.click(buttonSelector);
        const errorsRecieved = await page.evaluate(getErrors, errorSelectors)

        expect(errorsRecieved).toEqual(["First Name is required", "Last Name is required", "Age is required"])
    });

    test('should only show 2 errors "last name" and  "age"', async () => {

        await page.type(firstNameSelector, "Rivoningo")
        await page.click(buttonSelector);
        const errorsRecieved = await page.evaluate(getErrors, errorSelectors)
        expect(errorsRecieved).toEqual(['Last Name is required', 'Age is required'])
    });

    test("Successfully added a user", async () => {
        await page.type(lastNameSelector, "Mashamba")
        await page.type(ageInputSelector, "98");

        await page.click(buttonSelector)

        await delay(1000)
        const errorsRecieved = await page.evaluate(getErrors, errorSelectors)

        expect(errorsRecieved).toEqual([])

        const userData = await page.evaluate((selectors) => {
            const { userSelector, ageItemSelector } = selectors;
            const allAges = [...document.querySelectorAll(ageItemSelector)].map(element => element.textContent);
            const allUsers = [...document.querySelectorAll(userSelector)].map(element => element.textContent);

            return {
                allAges,
                allUsers
            }

        }, {
            userSelector,
            ageItemSelector
        })


        expect(userData).toEqual({
            allAges: ["98"],
            allUsers: ["Rivoningo Mashamba"]
        })
    })
});

