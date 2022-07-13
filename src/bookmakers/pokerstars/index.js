async function pokerstarsLinks(driver, By, until) {
  await driver.get("https://www.pokerstarssports.it/#/soccer/competitions")
  await driver.findElement(By.id("onetrust-accept-btn-handler")).click()

  const links = await driver.wait(
    until.elementsLocated(By.className("competitionContent__item__link"))
  )
  const competitions = []

  for (const link of links) {
    const competitionInfoes = await link.getAttribute("innerText")
    competitions.push({
      competitionId: await link.getAttribute("data-leagueid"),
      tournament: competitionInfoes.trim(),
    })
  }
}

module.exports = pokerstarsLinks
