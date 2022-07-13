const { JSDOM } = require("jsdom")
const { window } = new JSDOM()

const { Builder, By, Capabilities, until } = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")
const axios = require("axios")

const pokerstarsLinks = require("./bookmakers/pokerstars/index")
const williamhillLinks = require("./bookmakers/william hill/index")

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

  await pokerstarsLinks(driver, By, until, axios).catch((err) =>
    console.log(err)
  )
  await williamhillLinks(driver, By, until, axios).catch((err) =>
    console.log(err)
  )
}

main()

// href="/betting/it-it/football/competitions/OB_TY344/UEFA-Champions-League/matches/OB_MGMB/Esito-Finale"
// href="/betting/it-it/football/competitions/OB_TY295/Inghilterra-Premier-League/matches/OB_MGMB/Esito-Finale"
// https://sports.williamhill.it/data/foq01/it-it/pages/competitions/OB_TY295
// https://sports.williamhill.it/data/foq01/it-it/pages/competitions/OB_TY344/matches
