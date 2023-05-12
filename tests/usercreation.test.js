const puppeteer = require("puppeteer");
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

    function getErrors(errorSelectors) {
        const errorList = document.querySelectorAll(errorSelectors)
        if (errorList.length > 0) {
            return [...errorList].map(error => error.textContent)
        }
    
        console.log(getErrors());
    }
    
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
    const ageInputSelector = "#age";
    const buttonSelector = ".InputCont button";
    const errorSelectors = ".error li"
    const pageTitle = "Awesome Website"
    const userSelector = ".userlist ul .names"
    const ageItemSelector = ".userlist ul .ageitem"


    test('page should have corrrect title', async () => {
        const title = await page.title(); //string

        expect(title).toBe(pageTitle)
    });

    test('Should throw three errors if no input has been filled', async () => {

        await page.waitForSelector(firstNameSelector);
        await page.click(buttonSelector);
        const errorsRecived = await page.evaluate(getErrors, errorSelectors)

        expect(errorsReceived).toEqual(["First Name is required", "Last Name is required", "Age is required"])
    });

    test('should only show 2 errors "last name" and "age"', async () => {
        await page.type(firstNameSelector, "Rivoningo")
        await page.click(buttonSelector)
        const errorsReceived = await page.evaluate(getErrors, errorSelectors)
        expect(errorsReceived).toEqual(['Last Name is required', 'Age is required'])
    });

    test("Successfully added a user", async () => {
        await page.type(lastNameSelector, "Mashamba")
        await page.type(ageInputSelector, "28");

        await page.click(buttonSelector)

        await delay(1000)
        const errorsReceived =await page.evaluate(getErrors, errorSelectors)

        expect(errorsReceived).toEqual([])

        const userData = await page((selectors) => {
            const {userSelector, ageItemSelector} = selectors;
            const allAges = [...document.querySelectorAll(ageItemSelector)].map(element => element.textContent);
            const allUsers = [...document.querySelectorAll(userSelector)].map(element => element.textContent);

            return{
                allAges,
                allUsers
            }
        }, {
            userSelector,
            ageItemSelector
        })

        expect(userData).toEqual({
            allAges: ["28"],
            allUsers: ["Rivoningo Mashamba"]
        })

    })
})

afterAll(async () => { (): void | PromiseLike<void>
    await browser.close()
})
