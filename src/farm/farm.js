const un = require('./1')
const deux = require('./2')
const trois = require('./3')
const quatre = require('./4')
const cinq = require('./5')
const six = require('./6')
const sept = require('./7')
const huit = require('./8')
const neuf = require('./9')
const dix = require('./10')

class Farm{

  getAll(){
    return [this.getUn(), this.getDeux(), this.getTrois(), this.getQuatre(), this.getCinq(), this.getSix(), this.getSept(), this.getHuit(), this.getNeuf(), this.getDix]
  }

  getUn(){
    return new un()
  }

  getDeux(){
    return new deux()
  }

  getTrois(){
    return new trois()
  }

  getQuatre(){
    return new quatre()
  }

  getCinq(){
    return new cinq()
  }

  getSix(){
    return new six()
  }

  getSept(){
    return new sept()
  }

  getHuit(){
    return new huit()
  }

  getNeuf(){
    return new neuf()
  }

  getDix(){
    return new dix()
  }
}

module.exports = Farm