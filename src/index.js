const { JSDOM } = require("jsdom")
const { window } = new JSDOM()

const { Builder, By, Capabilities, until } = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")
const axios = require("axios")

const pokerstarsLinks = require("./bookmakers/pokerstars/index")

const main = async () => {
  const options = new chrome.Options()
  options.windowSize = { width: 1920, height: 1080 }
  const caps = new Capabilities().set("pageLoadStrategy", "normal")

  const driver = new Builder()
    .withCapabilities(caps)
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build()

  driver.manage().window().maximize()

  await pokerstarsLinks(driver, By, until).catch((err) => console.log(err))
}

main()
