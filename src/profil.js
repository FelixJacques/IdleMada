class Profil {

  constructor(user) {
    this.id = user.member.id
    this.displayName = user.member.displayName
    this.online = true
    this.avatar = user.member.user.avatarURL()
    this.money = "64"
    this.dispense = "0"
    this.totalMoney = "64"
    this.cps = "0"
    this.prestige = 0
    this.upgradeId = []
    this.achivementsId = []
    this.succScore = 0
    this.totalItem = 0
    this.lucioThug = 0
    this.lucioGold = 0
    this.lucioRGB = 0
    this.genji = {number: 0, disco: true, multi: 1, totalCash: "0"}
    this.health = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.kana = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.gobelet = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.eater = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.levi = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.bot = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.helico = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.tatayeah = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.aykicat = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.bombe = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.belugod = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.widow = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.aimbot = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.nexus = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.shulker = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.leviator = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.guardian = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.bongo = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.gazette = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.cite = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.casino = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.academy = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.papa = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.vip = {number: 0, disco: false, multi: 1, totalCash: "0"}
    this.fragment = {number: 0, disco: false, multi: 1, totalCash: "0"}
  }
}

module.exports = Profil