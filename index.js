const settings = {
  daysCount: 4 * 4,
  initialDeposit: 3000,
  calculateLotSize: initialDeposite => initialDeposite / 6000,
  tradsPerDay: 1,
  rewardToRiskRatio: 1,
  winLossChance: 50 / 100,
  maximumLossFromTotalDeposit: 0.05
}

const result = {
  profite: [],
  deposite: settings.initialDeposit,
  depositeRecord: []
}

function run(settings) {
  for (let day = 0; day < settings.daysCount; day++) {
    // calculate profite of the day
    const profiteOfTheDay =
      calculateProfitOfCurrentDay(settings) * calulateValueOfEachPip(settings)
    // add profite of the day to deposite
    const newDeposite = result.deposite + profiteOfTheDay
    // set values
    result.deposite = newDeposite

    result.depositeRecord.push(newDeposite)
  }

  console.log(
    `start deposite: ${settings.initialDeposit} | deposite after ${
      settings.daysCount
    } days | end deposite: ${result.deposite}`
  )
  console.log(
    `profite after ${settings.daysCount}: ${parseInt(
      result.deposite / settings.initialDeposit * 100
    )}%`
  )
}

function calculateProfitOfCurrentDay(settings) {
  const win = generateBooleanBasedOnChance(settings.winLossChance)

  const maxAllowedLossInOneTrade =
    settings.maximumLossFromTotalDeposit * result.deposite

  if (win) {
    return settings.rewardToRiskRatio * maxAllowedLossInOneTrade
  } else {
    return maxAllowedLossInOneTrade
  }
}

function generateBooleanBasedOnChance(chanceOfWin) {
  const numberOfwins = chanceOfWin * 100

  const pool = shuffle([
    ...Array(numberOfwins).fill(true),
    ...Array(100 - numberOfwins).fill(false)
  ])

  const randomPoll = Math.floor(Math.random() * 100)

  return pool[randomPoll]
}

function calulateValueOfEachPip(settings) {
  return settings.calculateLotSize(result.deposite) * 10
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

run(settings)
