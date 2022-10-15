const genji = require('./1genji')
const health = require('./2health')
const kana = require('./3kana')
const pizza = require('./4pizza')
const levi = require('./5levi')
const bot = require('./6bot')
const helico = require('./7helico')
const tatayeah = require('./8tatayeah')
const aykicat = require('./9aykicat')
const bombe = require('./10bombe')
const belugod = require('./11belugod')
const widow = require('./12widow')
const nexus = require('./13nexus')
const shulker = require('./14shulker')
const academy = require('./15academy')


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