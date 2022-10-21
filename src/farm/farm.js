const genji = require('./1genji')
const health = require('./2health')
const kana = require('./3kana')
const gobelet = require('./4.gobelet')
const eater = require('./5eater')
const levi = require('./6levi')
const bot = require('./7bot')
const helico = require('./8helico')
const tatayeah = require('./9tatayeah')
const aykicat = require('./10aykicat')
const bombe = require('./11bombe')
const belugod = require('./12belugod')
const widow = require('./13widow')
const aimbot = require('./14aimbot')
const nexus = require('./15nexus')
const shulker = require('./16shulker')
const leviator = require('./17leviator')
const guardian = require('./18illeria')
const bongo = require('./19gongo')
const gazette = require('./20gazette')
const cite = require('./21pandoutayah')
const casino = require('./22casino')
const academy = require('./23academy')
const papa = require('./24papa')
const vip = require('./25vip')
const fragment = require('./26fragment')



class Farm{

  getAll(){
    return [this.genji(), this.health(), this.kana(), this.gobelet(), this.eater(), this.levi(), this.bot(), this.helico(), this.tatayeah(), this.aykicat(), this.bombe(), this.belugods(), this.widow(), this.aimbot(), this.nexus(),
    this.shulker(), this.leviator(), this.guardian(), this.bongo(), this.gazette(), this.cite(), this.casino(), this.academy(), this.papa(), this.vip(), this.fragment()]
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

  gobelet(){
    return new gobelet()
  }

  eater(){
    return new eater()
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

  aimbot(){
    return new aimbot()
  }

  nexus(){
    return new nexus()
  }

  shulker(){
    return new shulker()
  }

  leviator(){
    return new leviator()
  }

  guardian(){
    return new guardian()
  }

  bongo(){
    return new bongo()
  }

  gazette(){
    return new gazette()
  }

  cite(){
    return new cite()
  }

  casino(){
    return new casino()
  }

  academy(){
    return new academy()
  }

  papa(){
    return new papa()
  }

  vip(){
    return new vip()
  }

  fragment(){
    return new fragment()
  }
}

module.exports = Farm