const { JSDOM } = require("jsdom")
const { window } = new JSDOM()

const { Builder, By, Capabilities, until } = require("selenium-webdriver")
const chrome = require("selenium-webdriver/chrome")
const axios = require("axios")

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

  await driver.get("https://www.goldbet.it/scommesse/sport")

  // Accepting the coockies button
  await driver
    .wait(until.elementLocated(By.id("onetrust-accept-btn-handler")))
    .click()
  /*
    Per ogni nazione bisogna trovare: idTournament, tournamentName, idCategory
  */

  const sidebar = await driver.findElement(By.className("main-sidebar"))
  const sports = await sidebar.findElements(
    By.css("ul.sidebar-menu > li.treeview")
  )
  const sportsNames = await Promise.all(
    sports.map(async (sport) => {
      const name = await sport.findElement(By.css("a"))
      return name.getAttribute("title")
    })
  )

  const liTags = await sidebar.findElements(
    By.css("ul.treeview-menu > li.info-label")
  )

  for (const liTag of liTags) {
    let tournamentName = await liTag
      .findElement(By.css("a"))
      .getAttribute("title")

    const queryInfoes = await liTag.findElement(By.css("span.getTorneoInfo"))

    const idDiscipline = await queryInfoes.getAttribute("iddisc")
    const idTournament = await queryInfoes.getAttribute("idtor")
    const idCategory = await queryInfoes.getAttribute("idcat")

    console.log(tournamentName, idDiscipline, idTournament, idCategory)

    console.log(tournamentName)
  }
}

main()
