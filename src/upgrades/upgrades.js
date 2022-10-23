function upgrades(user) {
  return [
    {id: 1, name: "Double jump", farm: "genji", cond: user.genji.number >= 10, number: "10", up: 2, type: "cps", prix: "3E8"},
    {id: 2, name: "Wallclimb", farm: "genji", cond: user.genji.number >= 50, number: "50", up: 2, type: "cps", prix: "2710"},
    {id: 3, name: "Deflect", farm: "genji", cond: user.genji.number >= 100, number: "100", up: 2, type: "cps", prix: "186A0"},
    {id: 4, name: "Nanoblade", farm: "genji", cond: user.genji.number >= 200, number: "200", up: 2, type: "cost", prix: "989680"},
    {id: 5, name: "Pocket Mercy", farm: "genji", cond: user.genji.number >= 500, number: "500", up: 5, type: "cps", prix: "3B9ACA00"},

    {id: 6, name: "Mini pack", farm: "health", cond: user.health.number >= 10, number: "10", up: 2, type: "cps", prix: "9C4"},
    {id: 7, name: "normal pack", farm: "health", cond: user.health.number >= 50, number: "50", up: 2, type: "cps", prix: "61A8"},
    {id: 8, name: "Big pack", farm: "health", cond: user.health.number >= 100, number: "100", up: 2, type: "cps", prix: "3D090"},
    {id: 9, name: "Mega pack", farm: "health", cond: user.health.number >= 200, number: "200", up: 2, type: "cost", prix: "17D7840"},
    {id: 10, name: "Sombra hack", farm: "health", cond: user.health.number >= 500, number: "500", up: 5, type: "cps", prix: "9502F900"},

    {id: 11, name: "Duo avec Flyson", farm: "kana", cond: user.kana.number >= 10, number: "10", up: 2, type: "cps", prix: "2710"},
    {id: 12, name: "Duo avec Pappu", farm: "kana", cond: user.kana.number >= 50, number: "50", up: 2, type: "cps", prix: "186A0"},
    {id: 13, name: "Duo avec Opsi", farm: "kana", cond: user.kana.number >= 100, number: "100", up: 2, type: "cps", prix: "F4240"},
    {id: 14, name: "Duo avec Snow", farm: "kana", cond: user.kana.number >= 200, number: "200", up: 2, type: "cost", prix: "5F5E100"},
    {id: 15, name: "Soloq warrior", farm: "kana", cond: user.kana.number >= 500, number: "500", up: 5, type: "cps", prix: "2540BE400"},

    {id: 16, name: "Gobelet en plastique", farm: "gobelet", cond: user.gobelet.number >= 10, number: "10", up: 2, type: "cps", prix: "C350"},
    {id: 17, name: "Gobelet en bois", farm: "gobelet", cond: user.gobelet.number >= 50, number: "50", up: 2, type: "cps", prix: "7A120"},
    {id: 18, name: "Gobelet en acier", farm: "gobelet", cond: user.gobelet.number >= 100, number: "100", up: 2, type: "cps", prix: "4C4B40"},
    {id: 19, name: "Gobelet en diamant", farm: "gobelet", cond: user.gobelet.number >= 200, number: "200", up: 2, type: "cost", prix: "1DCD6500"},
    {id: 20, name: "Gobelet en antimatière", farm: "gobelet", cond: user.gobelet.number >= 500, number: "500", up: 5, type: "cps", prix: "BA43B7400"},

    {id: 21, name: "Frites", farm: "eater", cond: user.eater.number >= 10, number: "10", up: 2, type: "cps", prix: "30D40"},
    {id: 22, name: "Burger", farm: "eater", cond: user.eater.number >= 50, number: "50", up: 2, type: "cps", prix: "1E8480"},
    {id: 23, name: "Pizza", farm: "eater", cond: user.eater.number >= 100, number: "100", up: 2, type: "cps", prix: "1312D00"},
    {id: 24, name: "Tempura", farm: "eater", cond: user.eater.number >= 200, number: "200", up: 2, type: "cost", prix: "77359400"},
    {id: 25, name: "Raclette des eater", farm: "eater", cond: user.eater.number >= 500, number: "500", up: 5, type: "cps", prix: "2E90EDD000"},

    {id: 26, name: "levi da", farm: "levi", cond: user.levi.number >= 10, number: "10", up: 2, type: "cps", prix: "F4240"},
    {id: 27, name: "yoku shaberu na, buta yarou", farm: "levi", cond: user.levi.number >= 50, number: "50", up: 2, type: "cps", prix: "989680"},
    {id: 28, name: "yume wo akiramete shindekure", farm: "levi", cond: user.levi.number >= 100, number: "100", up: 2, type: "cps", prix: "5F5E100"},
    {id: 29, name: "KENNYYYYYYYY", farm: "levi", cond: user.levi.number >= 200, number: "200", up: 2, type: "cost", prix: "2540BE400"},
    {id: 30, name: "oioioi erwin pepe, peepee", farm: "levi", cond: user.levi.number >= 500, number: "500", up: 5, type: "cps", prix: "E8D4A51000"},

    {id: 31, name: "Mieux qu’OPGG", farm: "bot", cond: user.bot.number >= 10, number: "10", up: 2, type: "cps", prix: "4C4B40"},
    {id: 32, name: "Mieux qu’Overbuff", farm: "bot", cond: user.bot.number >= 50, number: "50", up: 2, type: "cps", prix: "2FAF080"},
    {id: 33, name: "Mieux qu’Omnicmeta", farm: "bot", cond: user.bot.number >= 100, number: "100", up: 2, type: "cps", prix: "1DCD6500"},
    {id: 34, name: "Mieux que Trackergg", farm: "bot", cond: user.bot.number >= 200, number: "200", up: 2, type: "cost", prix: "BA43B7400"},
    {id: 35, name: "Tease Overstats 2 ", farm: "bot", cond: user.bot.number >= 500, number: "500", up: 5, type: "cps", prix: "48C27395000"},

    //pandoux

    {id: 36, name: "Modèle Frogger", farm: "helico", cond: user.bot.number >= 10, number: "10", up: 2, type: "cps", prix: "1C9C380"},
    {id: 37, name: "Modèle Buzzard", farm: "helico", cond: user.bot.number >= 50, number: "50", up: 2, type: "cps", prix: "11E1A300"},
    {id: 38, name: "Modèle Havok", farm: "helico", cond: user.bot.number >= 100, number: "100", up: 2, type: "cps", prix: "B2D05E00"},
    {id: 39, name: "Modèle Akula", farm: "helico", cond: user.bot.number >= 200, number: "200", up: 2, type: "cost", prix: "45D964B800"},
    {id: 40, name: "Modèle Ribbit", farm: "helico", cond: user.bot.number >= 500, number: "500", up: 5, type: "cps", prix: "1B48EB57E000"},

    {id: 41, name: "Variante HP", farm: "tatayeah", cond: user.bot.number >= 10, number: "10", up: 2, type: "cps", prix: "8F0D180"},
    {id: 42, name: "Variante Razer", farm: "tatayeah", cond: user.bot.number >= 50, number: "50", up: 2, type: "cps", prix: "59682F00"},
    {id: 43, name: "Variante Corsair", farm: "tatayeah", cond: user.bot.number >= 100, number: "100", up: 2, type: "cps", prix: "37E11D600"},
    {id: 44, name: "Variante Logitech", farm: "tatayeah", cond: user.bot.number >= 200, number: "200", up: 2, type: "cost", prix: "15D3EF79800"},
    {id: 45, name: "Variante touchpad cheap de pc portable", farm: "tatayeah", cond: user.bot.number >= 500, number: "500", up: 5, type: "cps", prix: "886C98B76000"},

    {id: 46, name: "Courir", farm: "aykicat", cond: user.bot.number >= 10, number: "10", up: 2, type: "cps", prix: "4D7C6D00"},
    {id: 47, name: "Chasser", farm: "aykicat", cond: user.bot.number >= 50, number: "50", up: 2, type: "cps", prix: "306DC4200"},
    {id: 48, name: "Dormir", farm: "aykicat", cond: user.bot.number >= 100, number: "100", up: 2, type: "cps", prix: "1E449A9400"},
    {id: 49, name: "Griffer", farm: "aykicat", cond: user.bot.number >= 200, number: "200", up: 2, type: "cost", prix: "BD2CC61D000"},
    {id: 50, name: "Vomir sur le lit d’ayki", farm: "aykicat", cond: user.bot.number >= 500, number: "500", up: 5, type: "cps", prix: "49E57D6354000"},
    
    {id: 51, name: "Boosters améliorés", farm: "bombe", cond: user.bot.number >= 10, number: "10", up: 2, type: "cps", prix: "1DCD65000"},
    {id: 52, name: "Canons plus puissants ", farm: "bombe", cond: user.bot.number >= 50, number: "50", up: 2, type: "cps", prix: "12A05F2000"},
    {id: 53, name: "Fuselage aérodynamique", farm: "bombe", cond: user.bot.number >= 100, number: "100", up: 2, type: "cps", prix: "BA43B74000"},
    {id: 54, name: "Séquence A-D au point", farm: "bombe", cond: user.bot.number >= 200, number: "200", up: 2, type: "cost", prix: "48C273950000"},
    {id: 55, name: "Tout ça pour rien", farm: "bombe", cond: user.bot.number >= 500, number: "500", up: 5, type: "cps", prix: "1C6BF526340000"},

    {id: 46, name: "Courir", farm: "aykicat", cond: user.bot.number >= 10, number: "10", up: 2, type: "cps", prix: "4D7C6D00"},
    {id: 47, name: "Chasser", farm: "aykicat", cond: user.bot.number >= 50, number: "50", up: 2, type: "cps", prix: "306DC4200"},
    {id: 48, name: "Dormir", farm: "aykicat", cond: user.bot.number >= 100, number: "100", up: 2, type: "cps", prix: "1E449A9400"},
    {id: 49, name: "Griffer", farm: "aykicat", cond: user.bot.number >= 200, number: "200", up: 2, type: "cost", prix: "BD2CC61D000"},
    {id: 50, name: "Vomir sur le lit d’ayki", farm: "aykicat", cond: user.bot.number >= 500, number: "500", up: 5, type: "cps", prix: "49E57D6354000"},






  ]
}

module.exports = upgrades