const item = require('./farm/farm')
class Profil {

  constructor(message, money, dispense, prestige, achievements, upId) {

    this.name = (message.member.nickname) ? message.member.nickname : message.author.username
    this.id = message.author.id
    this.online = true
    this.timeOut = 0
    this.money = money
    this.dispense = dispense
    this.totalmoney = "F"
    this.cps = 0
    this.argentDonne = 0
    this.moneyInvest = "0"
    this.prestige = prestige
    this.upgradeId = upId
    this.achievements = achievements
    this.un = {number: 0, multi:1, data: item.prototype.getUn().data}
    this.deux = {number: 0, multi:1, data: item.prototype.getDeux().data}
    this.trois = {number: 0, multi:1, data: item.prototype.getTrois().data}
    this.quatre = {number: 0, multi:1, data: item.prototype.getQuatre().data}
    this.cinq = {number: 0, multi:1, data: item.prototype.getCinq().data}
    this.six = {number: 0, multi:1, data: item.prototype.getSix().data}
    this.sept = {number: 0, multi:1, data: item.prototype.getSept().data}
    this.huit = {number: 0, multi:1, data: item.prototype.getHuit().data}
    this.neuf = {number: 0, multi:1, data: item.prototype.getNeuf().data}
    this.dix = {number: 0, multi:1, data: item.prototype.getDix().data}
  }
}

module.exports = Profil