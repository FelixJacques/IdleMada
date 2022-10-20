const { DateTime } = require("luxon")
function achiv (user, kana) {
  return [
    {name: "Le début d’une grande aventure", cond: user.genji.number >= 1, id: 1},
    {name: "Une petite armée", cond: user.genji.number >= 50, id: 2},
    {name: "Invasion de genji", cond: user.genji.number >= 500 , id: 3},
    {name: "Genji land", cond: user.genji.number >= 1000 , id: 4},
    {name: "I need healing", cond: user.health.number >= 1 , id: 5},
    {name: "Is it enough ?", cond: user.health.number >= 50 , id: 6},
    {name: "I still need healing", cond: user.health.number >= 500 , id: 7},
    {name: "You need healing", cond: user.health.number >= 1000 , id: 8},
    {name: "T’es pas down ou quoi", cond: user.kana.number >= 1 , id: 9},
    {name: "In the desert", cond: user.kana.number >= 50 , id: 10},
    {name: "SIUUUUUUUUUU", cond: user.kana.number >= 500 , id: 11},
    {name: "Est ce qu’on m’entends bien ?", cond: user.gobelet.number >= 1 , id: 13},
    {name: "La zar est half", cond: user.gobelet.number >= 50 , id: 14},
    {name: "Baki enjoyer", cond: user.gobelet.number >= 500 , id: 15},
  ]
  
}

module.exports = achiv