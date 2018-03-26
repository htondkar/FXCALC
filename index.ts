type settings = {
  daysCount: number
  initialDeposit: number
  calculateLotSize: (deposit: number) => number
  tradesPerDay: number
  rewardToRiskRatio: number
  winLossChance: number
  maximumLossFromTotalDeposit: number
}

type result = {
  deposit: number
  depositRecord: number[]
  winOrLoss: boolean[]
}

interface Array<T> {
  fill(value: T): Array<T>
}

const settings: settings = {
  daysCount: 260,
  initialDeposit: 3000,
  calculateLotSize: deposit => deposit / 10000,
  tradesPerDay: 1,
  rewardToRiskRatio: 3,
  winLossChance: 0.5,
  maximumLossFromTotalDeposit: 0.05
}

const result: result = {
  deposit: settings.initialDeposit,
  depositRecord: [],
  winOrLoss: []
}

function run(settings: settings): void {
  for (let day = 0; day < settings.daysCount; day++) {
    // calculate profit of the day
    const profitOfTheDay = calculateProfitOfCurrentDay(settings)
    // add profit of the day to deposit
    const newDeposit = result.deposit + profitOfTheDay
    // set values
    result.deposit = newDeposit

    result.depositRecord.push(newDeposit)
  }

  console.log(
    `start deposit: ${settings.initialDeposit} | deposit after ${
      settings.daysCount
    } days | end deposit: ${result.deposit}`
  )

  const finalProfitPercent = Math.floor(result.deposit / settings.initialDeposit * 100)

  console.log(`profit after ${settings.daysCount}: ${finalProfitPercent}%`)

  const numberOfWins = result.winOrLoss.reduce(
    (count, current) => (current ? count + 1 : count),
    0
  )

  const percentOfWins = Math.floor(numberOfWins / result.winOrLoss.length * 100)

  console.log(`percent of wins: ${percentOfWins}%`)
}

function calculateProfitOfCurrentDay(settings: settings): number {
  const win = generateBooleanBasedOnChance(settings.winLossChance)

  const maxAllowedLossInOneTrade = settings.maximumLossFromTotalDeposit * result.deposit

  if (win) {
    result.winOrLoss.push(true)
    return settings.rewardToRiskRatio * maxAllowedLossInOneTrade
  } else {
    result.winOrLoss.push(false)
    return maxAllowedLossInOneTrade * -1
  }
}

function generateBooleanBasedOnChance(chanceOfWin: number): boolean {
  return Math.random() <= chanceOfWin

  // const numberOfWins = chanceOfWin * 100

  // const pool = shuffle([
  //   ...Array(numberOfWins).fill(true),
  //   ...Array(100 - numberOfWins).fill(false)
  // ])

  // const randomPoll = Math.floor(Math.random() * 100)

  // return pool[randomPoll]
}

function calculateValueOfEachPip(settings: settings): number {
  return settings.calculateLotSize(result.deposit) * 10
}

function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

run(settings)
