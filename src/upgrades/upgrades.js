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

    {id: 36, name: "Modèle Frogger", farm: "helico", cond: user.helico.number >= 10, number: "10", up: 2, type: "cps", prix: "1C9C380"},
    {id: 37, name: "Modèle Buzzard", farm: "helico", cond: user.helico.number >= 50, number: "50", up: 2, type: "cps", prix: "11E1A300"},
    {id: 38, name: "Modèle Havok", farm: "helico", cond: user.helico.number >= 100, number: "100", up: 2, type: "cps", prix: "B2D05E00"},
    {id: 39, name: "Modèle Akula", farm: "helico", cond: user.helico.number >= 200, number: "200", up: 2, type: "cost", prix: "45D964B800"},
    {id: 40, name: "Modèle Ribbit", farm: "helico", cond: user.helico.number >= 500, number: "500", up: 5, type: "cps", prix: "1B48EB57E000"},

    {id: 41, name: "Variante HP", farm: "tatayeah", cond: user.tatayeah.number >= 10, number: "10", up: 2, type: "cps", prix: "8F0D180"},
    {id: 42, name: "Variante Razer", farm: "tatayeah", cond: user.tatayeah.number >= 50, number: "50", up: 2, type: "cps", prix: "59682F00"},
    {id: 43, name: "Variante Corsair", farm: "tatayeah", cond: user.tatayeah.number >= 100, number: "100", up: 2, type: "cps", prix: "37E11D600"},
    {id: 44, name: "Variante Logitech", farm: "tatayeah", cond: user.tatayeah.number >= 200, number: "200", up: 2, type: "cost", prix: "15D3EF79800"},
    {id: 45, name: "Variante touchpad cheap de pc portable", farm: "tatayeah", cond: user.tatayeah.number >= 500, number: "500", up: 5, type: "cps", prix: "886C98B76000"},

    {id: 46, name: "Courir", farm: "aykicat", cond: user.aykicat.number >= 10, number: "10", up: 2, type: "cps", prix: "4D7C6D00"},
    {id: 47, name: "Chasser", farm: "aykicat", cond: user.aykicat.number >= 50, number: "50", up: 2, type: "cps", prix: "306DC4200"},
    {id: 48, name: "Dormir", farm: "aykicat", cond: user.aykicat.number >= 100, number: "100", up: 2, type: "cps", prix: "1E449A9400"},
    {id: 49, name: "Griffer", farm: "aykicat", cond: user.aykicat.number >= 200, number: "200", up: 2, type: "cost", prix: "BD2CC61D000"},
    {id: 50, name: "Vomir sur le lit d’ayki", farm: "aykicat", cond: user.aykicat.number >= 500, number: "500", up: 5, type: "cps", prix: "49E57D6354000"},
    
    {id: 51, name: "Boosters améliorés", farm: "bombe", cond: user.bombe.number >= 10, number: "10", up: 2, type: "cps", prix: "1DCD65000"},
    {id: 52, name: "Canons plus puissants", farm: "bombe", cond: user.bombe.number >= 50, number: "50", up: 2, type: "cps", prix: "12A05F2000"},
    {id: 53, name: "Fuselage aérodynamique", farm: "bombe", cond: user.bombe.number >= 100, number: "100", up: 2, type: "cps", prix: "BA43B74000"},
    {id: 54, name: "Séquence A-D au point", farm: "bombe", cond: user.bombe.number >= 200, number: "200", up: 2, type: "cost", prix: "48C273950000"},
    {id: 55, name: "Tout ça pour rien", farm: "bombe", cond: user.bombe.number >= 500, number: "500", up: 5, type: "cps", prix: "1C6BF526340000"},

    {id: 56, name: "Shikusagi le capitaine", farm: "belugod", cond: user.belugod.number >= 10, number: "10", up: 2, type: "cps", prix: "BA43B7400"},
    {id: 57, name: "Kreda le gars sûr", farm: "belugod", cond: user.belugod.number >= 50, number: "50", up: 2, type: "cps", prix: "746A528800"},
    {id: 58, name: "Tarebou le sauveur", farm: "belugod", cond: user.belugod.number >= 100, number: "100", up: 2, type: "cps", prix: "48C27395000"},
    {id: 59, name: "Saxo et Passino les carry", farm: "belugod", cond: user.belugod.number >= 200, number: "200", up: 2, type: "cost", prix: "1C6BF52634000"},
    {id: 60, name: "Pandoux le stagiaire", farm: "belugod", cond: user.belugod.number >= 500, number: "500", up: 5, type: "cps", prix: "B1A2BC2EC50000"},

//widow de tak

    {id: 61, name: "Crosshair au point", farm: "widow", cond: user.widow.number >= 10, number: "10", up: 2, type: "cps", prix: "45D964B800"},
    {id: 62, name: "Bien positionné", farm: "widow", cond: user.widow.number >= 50, number: "50", up: 2, type: "cps", prix: "2BA7DEF3000"},
    {id: 63, name: "Hookjump", farm: "widow", cond: user.widow.number >= 100, number: "100", up: 2, type: "cps", prix: "1B48EB57E000"},
    {id: 64, name: "Puissance de tir maximale", farm: "widow", cond: user.widow.number >= 200, number: "200", up: 2, type: "cost", prix: "AA87BEE538000"},
    {id: 65, name: "Mur détruit", farm: "widow", cond: user.widow.number >= 500, number: "500", up: 5, type: "cps", prix: "429D069189E0000"},

//aimbot de livs

    {id: 66, name: "Auto flick", farm: "aimbot", cond: user.aimbot.number >= 10, number: "10", up: 2, type: "cps", prix: "246139CA800"},
    {id: 67, name: "Auto track", farm: "aimbot", cond: user.aimbot.number >= 50, number: "50", up: 2, type: "cps", prix: "16BCC41E9000"},
    {id: 68, name: "Auto move", farm: "aimbot", cond: user.aimbot.number >= 100, number: "100", up: 2, type: "cps", prix: "E35FA931A000"},
    {id: 69, name: "Auto damage boost", farm: "aimbot", cond: user.aimbot.number >= 200, number: "200", up: 2, type: "cost", prix: "58D15E17628000"},
    {id: 70, name: "Auto ban", farm: "aimbot", cond: user.aimbot.number >= 500, number: "500", up: 5, type: "cps", prix: "22B1C8C1227A0000"},

//nexSUS
  
    {id: 71, name: "Vérins hydrauliques", farm: "nexus", cond: user.nexus.number >= 10, number: "10", up: 2, type: "cps", prix: "12309CE54000"},
    {id: 72, name: "Arbalétrier sphérique", farm: "nexus", cond: user.nexus.number >= 50, number: "50", up: 2, type: "cps", prix: "B5E620F48000"},
    {id: 73, name: "Stylobates hydrofuge", farm: "nexus", cond: user.nexus.number >= 100, number: "100", up: 2, type: "cps", prix: "71AFD498D0000"},
    {id: 74, name: "Armatures en titane", farm: "nexus", cond: user.nexus.number >= 200, number: "200", up: 2, type: "cost", prix: "2C68AF0BB140000"},
    {id: 75, name: "Alliance avec la BedoCorp", farm: "nexus", cond: user.nexus.number >= 500, number: "500", up: 5, type: "cps", prix: "1158E460913D00000"},
    
//shulker

    {id: 76, name: "Un Main tank à 300 ms", farm: "shulker", cond: user.shulker.number >= 10, number: "10", up: 2, type: "cps", prix: "886C98B76000"},
    {id: 77, name: "Un Offtank TTS", farm: "shulker", cond: user.shulker.number >= 50, number: "50", up: 2, type: "cps", prix: "5543DF729C000"},
    {id: 78, name: "Un Hitscan sur Doom", farm: "shulker", cond: user.shulker.number >= 100, number: "100", up: 2, type: "cps", prix: "354A6BA7A18000"},
    {id: 79, name: "Un Bamboo là", farm: "shulker", cond: user.shulker.number >= 200, number: "200", up: 2, type: "cost", prix: "14D1120D7B160000"},
    {id: 80, name: "Une backline en frontline", farm: "shulker", cond: user.shulker.number >= 500, number: "500", up: 5, type: "cps", prix: "821AB0D4414980000"},

//leviator
  
    {id: 81, name: "Édition brillante", farm: "leviator", cond: user.leviator.number >= 10, number: "10", up: 2, type: "cps", prix: "49E57D6354000"},
    {id: 82, name: "Édition première", farm: "leviator", cond: user.leviator.number >= 50, number: "50", up: 2, type: "cps", prix: "2E2F6E5E148000"},
    {id: 83, name: "Édition shiny", farm: "leviator", cond: user.leviator.number >= 100, number: "100", up: 2, type: "cps", prix: "1CDDA4FACCD0000"},
    {id: 84, name: "Édition Onizuka", farm: "leviator", cond: user.leviator.number >= 200, number: "200", up: 2, type: "cost", prix: "B469471F80140000"},
    {id: 85, name: "Édition Among Us", farm: "leviator", cond: user.leviator.number >= 500, number: "500", up: 5, type: "cps", prix: "46791FC84E07D00000"},

// illerua

    {id: 86, name: "Farm à morue", farm: "guardian", cond: user.guardian.number >= 10, number: "10", up: 2, type: "cps", prix: "2386F26FC10000"},
    {id: 87, name: "Farm à saumon", farm: "guardian", cond: user.guardian.number >= 50, number: "50", up: 2, type: "cps", prix: "16345785D8A0000"},
    {id: 88, name: "Farm à lanterne", farm: "guardian", cond: user.guardian.number >= 100, number: "100", up: 2, type: "cps", prix: "DE0B6B3A7640000"},
    {id: 89, name: "Farm à prismarine", farm: "guardian", cond: user.guardian.number >= 200, number: "200", up: 2, type: "cost", prix: "56BC75E2D63100000"},
    {id: 90, name: "Farm à XP", farm: "guardian", cond: user.guardian.number >= 500, number: "500", up: 5, type: "cps", prix: "21E19E0C9BAB2400000"},

    {id: 91, name: "Gongi", farm: "bongo", cond: user.bongo.number >= 10, number: "10", up: 2, type: "cps", prix: "13FBE85EDC90000"},
    {id: 91, name: "Gingo", farm: "bongo", cond: user.bongo.number >= 50, number: "50", up: 2, type: "cps", prix: "C7D713B49DA0000"},
    {id: 93, name: "Ganja", farm: "bongo", cond: user.bongo.number >= 100, number: "100", up: 2, type: "cps", prix: "7CE66C50E2840000"},
    {id: 94, name: "Gonjo", farm: "bongo", cond: user.bongo.number >= 200, number: "200", up: 2, type: "cost", prix: "30CA024F987B900000"},
    {id: 95, name: "Gengi", farm: "bongo", cond: user.bongo.number >= 500, number: "500", up: 5, type: "cps", prix: "130EE8E7179044400000"},


    //gazette

    {id: 96, name: "Les photos de la semaine", farm: "gazette", cond: user.gazette.number >= 10, number: "10", up: 2, type: "cps", prix: "B1A2BC2EC500000"},
    {id: 97, name: "Le Shimada de la semaine", farm: "gazette", cond: user.gazette.number >= 50, number: "50", up: 2, type: "cps", prix: "6F05B59D3B200000"},
    {id: 98, name: "Le meme de la semaine", farm: "gazette", cond: user.gazette.number >= 100, number: "100", up: 2, type: "cps", prix: "4563918244F400000"},
    {id: 99, name: "Le Mada croisé de la semaine", farm: "gazette", cond: user.gazette.number >= 200, number: "200", up: 2, type: "cost", prix: "1B1AE4D6E2EF5000000"},
    {id: 100, name: "Le mot de la rédaction", farm: "gazette", cond: user.gazette.number >= 500, number: "500", up: 5, type: "cps", prix: "A968163F0A57B4000000"},

    {id: 101, name: "La visite guidée", farm: "cite", cond: user.cite.number >= 10, number: "10", up: 2, type: "cps", prix: "6124FEE993BC0000"},
    {id: 102, name: "L’entrée par la grotte", farm: "cite", cond: user.cite.number >= 50, number: "50", up: 2, type: "cps", prix: "3CB71F51FC5580000"},
    {id: 103, name: "Le chemin en bois", farm: "cite", cond: user.cite.number >= 100, number: "100", up: 2, type: "cps", prix: "25F273933DB5700000"},
    {id: 104, name: "La récitation de la prière", farm: "cite", cond: user.cite.number >= 200, number: "200", up: 2, type: "cost", prix: "ED2B525841ADFC00000"},
    {id: 105, name: "Le don au grand Panda", farm: "cite", cond: user.cite.number >= 500, number: "500", up: 5, type: "cps", prix: "5CA4EC2A79A7F67000000"},

    {id: 106, name: "Capturer un pokémon standard", farm: "casino", cond: user.casino.number >= 10, number: "10", up: 2, type: "cps", prix: "340AAD21B3B700000"},
    {id: 107, name: "Capturer un pokémon sub-légendaire", farm: "casino", cond: user.casino.number >= 50, number: "50", up: 2, type: "cps", prix: "2086AC351052600000"},
    {id: 108, name: "Capturer un pokémon légendaire", farm: "casino", cond: user.casino.number >= 100, number: "100", up: 2, type: "cps", prix: "14542BA12A337C00000"},
    {id: 109, name: "Capturer un pokémon fabuleux", farm: "casino", cond: user.casino.number >= 200, number: "200", up: 2, type: "cost", prix: "7F0E10AF47C1C7000000"},
    {id: 110, name: "Capturer une ultra-chimère", farm: "casino", cond: user.casino.number >= 500, number: "500", up: 5, type: "cps", prix: "31A17E847807B1BC000000"},

    {id: 111, name: "Pas sur le point", farm: "academy", cond: user.academy.number >= 10, number: "10", up: 2, type: "cps", prix: "1B1AE4D6E2EF500000"},
    {id: 112, name: "Deux K Huit", farm: "academy", cond: user.academy.number >= 50, number: "50", up: 2, type: "cps", prix: "10F0CF064DD59200000"},
    {id: 113, name: "Bilou en France", farm: "academy", cond: user.academy.number >= 100, number: "100", up: 2, type: "cps", prix: "A968163F0A57B400000"},
    {id: 114, name: "Les compagnons ninja", farm: "academy", cond: user.academy.number >= 200, number: "200", up: 2, type: "cost", prix: "422CA8B0A00A425000000"},
    {id: 115, name: "Le chat à l’intérieur d’une boîte500", farm: "academy", cond: user.academy.number >= 500, number: "500", up: 5, type: "cps", prix: "19D971E4FE8401E74000000"},

    {id: 116, name: "One piece enjoyer", farm: "papa", cond: user.papa.number >= 10, number: "10", up: 2, type: "cps", prix: "D8D726B7177A800000"},
    {id: 117, name: "Nissan GTR enjoyer", farm: "papa", cond: user.papa.number >= 50, number: "50", up: 2, type: "cps", prix: "878678326EAC9000000"},
    {id: 118, name: "Nimzowitsch-Larsen Attack enjoyer", farm: "papa", cond: user.papa.number >= 100, number: "100", up: 2, type: "cps", prix: "54B40B1F852BDA000000"},
    {id: 119, name: "Arriver en retard au scrim enjoyer", farm: "papa", cond: user.papa.number >= 200, number: "200", up: 2, type: "cost", prix: "2116545850052128000000"},
    
    {id: 120, name: "VIP +", farm: "vip", cond: user.vip.number >= 10, number: "10", up: 2, type: "cps", prix: "65A4DA25D3016C00000"},
    {id: 121, name: "MVP", farm: "vip", cond: user.vip.number >= 50, number: "50", up: 2, type: "cps", prix: "3F870857A3E0E3800000"},
    {id: 122, name: "MVP +", farm: "vip", cond: user.vip.number >= 100, number: "100", up: 2, type: "cps", prix: "27B46536C66C8E3000000"},
    {id: 123, name: "MVP ++", farm: "vip", cond: user.vip.number >= 200, number: "200", up: 2, type: "cost", prix: "F8277896582678AC000000"},

    {id: 124, name: "Fragmentation chromatique", farm: "fragment", cond: user.fragment.number >= 3, number: "3", up: 2, type: "cost", prix: "D3C21BCECCEDA1000000"},
  ]
}

module.exports = upgrades