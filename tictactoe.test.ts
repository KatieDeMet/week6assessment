import { Builder, Capabilities, By } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:4000')
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {

    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();
    
});

test('click upper left square', async () => {
    await driver.findElement(By.id('cell-0')).click()
    await driver.sleep(2000)
})

test('click upper right square', async () => {
    await driver.findElement(By.id('cell-2')).click()
    await driver.sleep(2000)
})

test('test bottom right square', async () => {
    await driver.findElement(By.id('cell-8')).click()
    await driver.sleep(2000)
})

test('test that computer adds o', async () => {
    let oCount = 0
    let xCount = 0
    for(let i = 0; i < 9; i++) {
        let cellContent = await driver.findElement(By.id('cell-' + i)).getText()
        if(cellContent === 'O' || cellContent === 'o') {
            oCount++
        } else if(cellContent === 'X' || cellContent === 'x') {
            xCount++
        }
    }
    expect(oCount).toEqual(xCount)
})
