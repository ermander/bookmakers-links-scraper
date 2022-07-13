const dataSample = require("./dataSample.js")

const tournaments = []

for (const data of dataSample) {
  if (tournaments.length !== 0) {
    const checkAlreadyExists = tournaments.find(
      (element) => element === data.competition
    )
    if (!checkAlreadyExists) tournaments.push(data.competition)
  } else {
    tournaments.push(data.competition)
  }
}

console.log(tournaments.length)
