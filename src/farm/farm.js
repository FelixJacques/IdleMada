const genji = require('./1genji')
const health = require('./2health')
const kana = require('./3kana')
const pizza = require('./5eater')
const levi = require('./6levi')
const bot = require('./7bot')
const helico = require('./8helico')
const tatayeah = require('./9tatayeah')
const aykicat = require('./10aykicat')
const bombe = require('./11bombe')
const belugod = require('./12belugod')
const widow = require('./13widow')
const nexus = require('./15nexus')
const shulker = require('./16shulker')
const academy = require('./23academy')


class Farm{

  getAll(){
    return [this.genji(), this.health(), this.kana(), this.pizza(), this.levi(), this.bot(), this.helico(), this.tatayeah(), this.aykicat(), this.bombe(), this.belugods(), this.widow(), this.nexus(),
    this.shulker(), this.academy()]
  }

  genji(){
    return new genji()
  }

  health(){
    return new health()
  }

  kana(){
    return new kana()
  }

  pizza(){
    return new pizza()
  }

  levi(){
    return new levi()
  }

  bot(){
    return new bot()
  }

  helico(){
    return new helico()
  }

  tatayeah(){
    return new tatayeah()
  }

  aykicat(){
    return new aykicat()
  }

  bombe(){
    return new bombe()
  }

  belugods(){
    return new belugod()
  }

  widow(){
    return new widow()
  }

  nexus(){
    return new nexus()
  }

  shulker(){
    return new shulker()
  }

  academy(){
    return new academy()
  }
}

module.exports = Farm