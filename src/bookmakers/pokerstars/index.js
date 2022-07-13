const urls = require("./urls.json")

async function pokerstarsLinks(driver, By, until, axios) {
  const competitions = {
    soccer: [],
    tennis: [],
    basketball: [],
    volleyball: [],
  }

  await driver.get("https://www.pokerstarssports.it/#/soccer/competitions")
  await driver.findElement(By.id("onetrust-accept-btn-handler")).click()

  for (const url of Object.values(urls)) {
    await driver.get(url)

    const sportName = url.split("/")[4].split("/")[0]

    const links = await driver.wait(
      until.elementsLocated(By.className("competitionContent__item__link"))
    )

    for (const link of links) {
      const competitionInfoes = await link.getAttribute("innerText")
      competitions[`${sportName}`].push({
        competitionId: await link.getAttribute("data-leagueid"),
        tournament: competitionInfoes.trim(),
      })
    }
  }

  // Post to API
  return
}

module.exports = pokerstarsLinks
