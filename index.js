"use strict";
var settings = {
    daysCount: 260,
    initialDeposit: 3000,
    calculateLotSize: function (deposit) { return deposit / 10000; },
    tradesPerDay: 1,
    rewardToRiskRatio: 3,
    winLossChance: 0.5,
    maximumLossFromTotalDeposit: 0.05
};
var result = {
    deposit: settings.initialDeposit,
    depositRecord: [],
    winOrLoss: []
};
function run(settings) {
    for (var day = 0; day < settings.daysCount; day++) {
        var profitOfTheDay = calculateProfitOfCurrentDay(settings);
        var newDeposit = result.deposit + profitOfTheDay;
        result.deposit = newDeposit;
        result.depositRecord.push(newDeposit);
    }
    console.log("start deposit: " + settings.initialDeposit + " | deposit after " + settings.daysCount + " days | end deposit: " + result.deposit);
    var finalProfitPercent = Math.floor(result.deposit / settings.initialDeposit * 100);
    console.log("profit after " + settings.daysCount + ": " + finalProfitPercent + "%");
    var numberOfWins = result.winOrLoss.reduce(function (count, current) { return (current ? count + 1 : count); }, 0);
    var percentOfWins = Math.floor(numberOfWins / result.winOrLoss.length * 100);
    console.log("percent of wins: " + percentOfWins + "%");
}
function calculateProfitOfCurrentDay(settings) {
    var win = generateBooleanBasedOnChance(settings.winLossChance);
    var maxAllowedLossInOneTrade = settings.maximumLossFromTotalDeposit * result.deposit;
    if (win) {
        result.winOrLoss.push(true);
        return settings.rewardToRiskRatio * maxAllowedLossInOneTrade;
    }
    else {
        result.winOrLoss.push(false);
        return maxAllowedLossInOneTrade * -1;
    }
}
function generateBooleanBasedOnChance(chanceOfWin) {
    return Math.random() <= chanceOfWin;
}
function calculateValueOfEachPip(settings) {
    return settings.calculateLotSize(result.deposit) * 10;
}
function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [a[j], a[i]], a[i] = _a[0], a[j] = _a[1];
    }
    return a;
    var _a;
}
run(settings);
//# sourceMappingURL=index.js.map