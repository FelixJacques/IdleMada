const Discord = require("discord.js")
const bot = new Discord.Client({intents: 3276799})
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ActivityType} = require('discord.js')
const Pagination = require('customizable-discordjs-pagination')
const fs = require("fs")
const { DateTime } = require("luxon")
const progressbar = require('string-progressbar');
var approx = require('approximate-number');

const Profil = require('./src/profil')
const Farm = require('./src/farm/farm')
const Upgrades = require('./src/upgrades/upgrades')
const achiv = require('./src/succes')

require("dotenv").config()

let test = false
if(test == true) {
  var guildId = "828485314304933931"
  var channelId = "828518673244618752"
}else{
  var guildId = "267769973709996032"
  var channelId = "1034148414277025914"
}
let tryCode = []
let acheteursKana = []
let acheteursEater = []
let prefix = "!"
let listeProfiles = []
let colorRouge = "#ED4245"
let colorVert = "#28eb73"
let colorTurq = "#00ffdd"
let colorshop = "#4e46bd"
let colorgold = "#ffdd00"
let basePrestige = 1000000
let augPrestige = 1.07
let gainPrestige = 1.02
let lasMsgProfil = null
let lastProfil = null
let go = 0
let users = []
let approxOpts = {separator: " ", min10k: true, capital: true, decimal: 2}

fs.readFile('./data/data.json', "utf8", (err, JsonString) => {
  if(err) {
    console.log(err)
  }else{
    listeProfiles = JSON.parse(JsonString)
  }
})

function intToHex(int) {
  return (int).toString(16)
}

function hexToInt(hexa) {
  let hex = (hexa).toString(16)
  if (hex.length % 2) { hex = '0' + hex; }
  let bn = BigInt('0x' + hex);
  return bn.toString(10); 
}

function shop(user, interaction) {
  let embedShop = new EmbedBuilder()
      .setTitle(`Boutique de ${user.displayName}`)
      .setColor(colorshop)

      let listeFarm = Farm.prototype.getAll()
      let desc = "Utilisez **/item** [nom de l'objet] pour ouvrir l'interface de l'objet.\n─────────────────────────────────────\n\n"
      let farm = null
      for (let i = 0; i < listeFarm.length; i++) {
        farm = listeFarm[i]
        if(user[farm.farm].disco == true) {
          desc += `**${farm.name}**: \`${approx(Math.round(((hexToInt(farm.cost) * (1.15 ** (user[farm.farm].number + 1) - 1.15 ** user[farm.farm].number)) / 0.15) * 1), approxOpts)}\` <:aykicash:1031518293456076800>\n\n`
        }
        if(user[listeFarm[i].farm].disco == false && user[listeFarm[i - 1].farm].disco == true) {
          desc += `*Débloqué prochainement*\n\`???\`\n`
        }
      }

      embedShop.setDescription(desc)

      interaction.reply({embeds: [embedShop], ephemeral: true})
}

function succes(user, interaction, userDem) {

  let page1 = new EmbedBuilder()
  .setTitle(`Succès de ${user.displayName}`)
  .setColor(colorgold)
  .setThumbnail(user.avatar)
  .setDescription(`Obtenus: \`${user.achivementsId.length} / ${achiv(user).length + 20}\`\n\n🏆 Score: \`${user.succScore}\``)

  let listeAchGen = []
  let listeAch = []
  achiv(user).forEach(ach => {
    if(ach.farm == null) {
      listeAchGen.push(ach)
    }else if(ach.name == "Kana Time") {
      if((userDem[ach.farm].disco == true && user[ach.farm].disco) || ((user.id == userDem.id) && user.achivementsId.includes(121))) {
        listeAch.push(ach)
      }
      
    }else if(ach.name == "C’est l’heure de manger !") {
      if((userDem[ach.farm].disco == true && user[ach.farm].disco) || ((user.id == userDem.id) && user.achivementsId.includes(122))) {
        listeAch.push(ach)
      }
    
    }else if((userDem[ach.farm].disco == true && user[ach.farm].disco) || ((user.id == userDem.id) && user.achivementsId.includes(ach.id))) {
      listeAch.push(ach)
    }

  });
  let desc = ""
  let x = 0
  let pages = [page1]
  for (let i = 0; i < Math.ceil(listeAch.length / 15); i++) {
    desc = ""
    x = i * 15
    for (let a = 0; a < (listeAch.length - x > 15 ? 15 : listeAch.length - x); a++) {
      if(user.achivementsId.includes(listeAch[a + x].id)) {
        desc += `✅ **__${listeAch[a + x].name}__** (+${listeAch[a + x].score})\n||*${listeAch[a + x].desc}*||\n\n`
      }else{
        desc += `🔒 __${listeAch[a + x].name}__ (+${listeAch[a + x].score})\n||*${listeAch[a + x].desc}*||\n\n`
      }
    }

    pages.push(new EmbedBuilder()
    .setTitle(`Succès de ${user.displayName}`)
    .setColor(colorgold)
    .setThumbnail(user.avatar)
    .setDescription(desc))
  }
  let specialAchId = [{id: 16, type: "gobelet"},{id: 23, type: "levi"},{id: 27, type: "bot"},{id: 31, type: "helico"},{id: 35, type: "tatayeah"},{id: 39, type: "aykicat"},{id: 43, type: "bombe"},{id: 51,type: "widow"},
  {id: 55,type: "aimbot"},{id: 58, type: "nexus"},{id: 62,type: "shulker"},{id: 66, type: "leviator"},{id: 70, type: "guardian"},{id: 74, type: "bongo"},{id: 78, type: "gazette"},{id: 82, type: "cite"},{id: 86, type: "casino"},{id: 90, type: "academy"},{id: 94, type: "papa"}]

  let has = false
  let descr = ""
  for (let a = 0; a < specialAchId.length; a++) {
    has = false
    if(user[specialAchId[a].type].disco == true || user.achivementsId.includes(specialAchId[a].id)) {
      if(userDem != undefined) {
        if(userDem[specialAchId[a].type].disco == true) {
          if(user.achivementsId.includes(specialAchId[a].id)) {
            has = true
          }
        }else{
          if(user.id == userDem.id && user.achivementsId.includes(specialAchId[a].id)) {
            has = true
          }
        }
      }else{
        if(user.achivementsId.includes(specialAchId[a].id)) {
          has = true
        }
      }
      switch (specialAchId[a].type) {
        case "gobelet":
          if(has){
            descr += `✅ **__Je procrastine__** (+500)\n||*Claim le code secret du Gobelet indésirable*||\n\n`
          }else{
            descr += `🔒 __Je procrastine__ (+500)\n||*Claim le code secret du Gobelet indésirable*||\n\n`
          }
          break
        
        case "levi":
          if(has){
            descr += `✅ **__Mon nom__** (+ 200)\n||*Claim le nom de Levi*||\n\n`
          }else{
            descr += `🔒 __Mon nom__ (+200)\n||*Claim le nom de Levi*||\n\n`
          }
          break

        case "bot":
          if(has){
            descr += `✅ **__Mon créateur__** (+200)\n||*Claim le nom du créateur du Bot Overstats*||\n\n`
          }else{
            descr += `🔒 __Mon créateur__ (+200)\n||*Claim le nom du créateur du Bot Overstats*||\n\n`
          }
          break

        case "helico":
          if(has){
            descr += `✅ **__T’es trop chiant !__** (+500)\n||*Claim le code secret de l’Hélico*||\n\n`
          }else{
            descr += `🔒 __T’es trop chiant !__ (+500)\n||*Claim le code secret de l’Hélico*||\n\n`
          }
          break

        case "tatayeah":
          if(has){
            descr += `✅ **__Mon niveau dans les mémoires__** (+500)\n||*Claim le code secret de Tatayet*||\n\n`
          }else{
            descr += `🔒 __Mon niveau dans les mémoires__ (+500)\n||*Claim le code secret de Tatayet*||\n\n`
          }
          break

        case "aykicat":
          if(has){
            descr += `✅ **__L’identifiant du chat__** (+500)\n||*Claim le code secret d’Aykicat*||\n\n`
          }else{
            descr += `🔒 __L’identifiant du chat__ (+500)\n||*Claim le code secret d’Aykicat*||\n\n`
          }
          break

        case "bombe":
          if(has){
            descr += `✅ **__Le ballon du lobby__** (+500)\n||*Claim le code secret de la Bombe*||\n\n`
          }else{
            descr += `🔒 __Le ballon du lobby__ (+500)\n||*Claim le code secret de la Bombe*||\n\n`
          }
          break
        
        case "widow":
          if(has){
            descr += `✅ **__Le tag universel__** (+500)\n||*Claim le code secret de Takmany*||\n\n`
          }else{
            descr += `🔒 __Le tag universel__ (+500)\n||*Claim le code secret de Takmany*||\n\n`
          }
          break

        case "aimbot":
          if(has){
            descr += `✅ **__Mon animal__** (+500)\n||*Claim le code secret de Livs*||\n\n`
          }else{
            descr += `🔒 __Mon animal__ (+500)\n||*Claim le code secret de Livs*||\n\n`
          }
          break
        
        case "nexus":
          if(has){
            descr += `✅ **__Il faut juste descendre__** (+500)\n||*Claim le code secret du Nexus*||\n\n`
          }else{
            descr += `🔒 __Il faut juste descendre__ (+500)\n||*Claim le code secret du Nexus*||\n\n`
          }
          break
        
        case "shulker":
          if(has){
            descr += `✅ **__Le coût des 6 renards multipliés__** (+500)\n||*Claim le code secret de Shulker Fox*||\n\n`
          }else{
            descr += `🔒 __Le coût des 6 renards multipliés__ (+500)\n||*Claim le code secret de Shulker Fox*||\n\n`
          }
          break

        case "leviator":
          if(has){
            descr += `✅ **__Le 3ème concurrent GX__** (+500)\n||*Claim le nom du concurrent de Léviator*||\n\n`
          }else{
            descr += `🔒 __Le 3ème concurrent GX__ (+500)\n||*Claim le nom du concurrent de Léviator*||\n\n`
          }
          break

        case "guardian":
          if(has){
            descr += `✅ **__Le poisson du sacrifice__** (+500)\n||*Claim le nom du poisson sacrifié*||\n\n`
          }else{
            descr += `🔒 __Le poisson du sacrifice__ (+500)\n||*Claim le nom du poisson sacrifié*||\n\n`
          }
          break

        case "bongo":
          if(has){
            descr += `✅ **__Son premier pokémon__** (+500)\n||*Claim le nom du pokémon de Gongo the Bongo*||\n\n`
          }else{
            descr += `🔒 __Son premier pokémon__ (+500)\n||*Claim le nom du pokémon de Gongo the Bongo*||\n\n`
          }
          break

        case "gazette":
          if(has){
            descr += `✅ **__Le 4ème mot__** (+500)\n||*Claim le mot secret de la Gazette*||\n\n`
          }else{
            descr += `🔒 __Le 4ème mot__ (+500)\n||*Claim le mot secret de la Gazette*||\n\n`
          }
          break

        case "cite":
          if(has){
            descr += `✅ **__Le rôle d’une pelle__** (+500)\n||*Claim le nom de l’objet ayant bâti Pandoutayah*||\n\n`
          }else{
            descr += `🔒 __Le rôle d’une pelle__ (+500)\n||*Claim le nom de l’objet ayant bâti Pandoutayah*||\n\n`
          }
          break
          
        case "casino":
          if(has){
            descr += `✅ **__Le mythique ancestral__** (+500)\n||*Claim le nom du seul Pokétron mythique encore existant*||\n\n`
          }else{
            descr += `🔒 __Le mythique ancestral__ (+500)\n||*Claim le nom du seul Pokétron mythique encore existant*||\n\n`
          }
          break

        case "academy":
          if(has){
            descr += `✅ **__La naissance du projet__** (+500)\n||*Claim le code secret de la Mada Academy*||\n\n`
          }else{
            descr += `🔒 __La naissance du projet__ (+500)\n||*Claim le code secret de la Mada Academy*||\n\n`
          }
          break

        case "papa":
          if(has){
            descr += `✅ **__C’3st quoi le code s’il te plaît__** (+500)\n||*Claim le code secret du Papa*||\n\n`
          }else{
            descr += `🔒 __C’3st quoi le code s’il te plaît__ (+500)\n||*Claim le code secret du Papa*||\n\n`
          }
          break
      }
    }
  };
  if(descr != "") {
    pages.push(new EmbedBuilder()
    .setTitle(`Succès spéciaux de ${user.displayName}`)
    .setColor(colorgold)
    .setThumbnail(user.avatar)
    .setDescription(descr))
  }
  let descGen = ""
  listeAchGen.forEach(ach => {
    if(user.achivementsId.includes(ach.id)) {
      descGen += `✅ **__${ach.name}__** (+${ach.score})\n||*${ach.desc}*||\n\n`
    }else{
      descGen += `🔒 __${ach.name}__ (+${ach.score})\n||*${ach.desc}*||\n\n`
    }
  })

  pages.push(new EmbedBuilder()
  .setTitle(`Succès généraux de ${user.displayName}`)
  .setColor(colorgold)
  .setThumbnail(user.avatar)
  .setDescription(descGen))

  const buttons = [
    {emoji: '⬅', style: Discord.ButtonStyle.Primary},
    {emoji: '❌', style: Discord.ButtonStyle.Primary},
    {emoji: '➡', style: Discord.ButtonStyle.Primary},
  ]

  new Pagination().setCommand(interaction).setPages(pages).setButtons(buttons).send()

}

function profilCmd(user, interaction = undefined) {
  let listeFarm = Farm.prototype.getAll()
  let lastItem = null
  let nouvelItem = null
  let itemList = []
  for (let i = 0; i < listeFarm.length; i++) {
    if(user[listeFarm[i].farm].number > 0) {
      itemList.push(listeFarm[i])
    }
  }

  if(itemList.length == 0) {
    lastItem = "Aucun Item"

  }else{
    lastItem = itemList[itemList.length - 1].name
  }

  for (let i = 0; i < listeFarm.length; i++) {
    if((hexToInt(listeFarm[i].cost) * 0.8 < hexToInt(user.money)) && (user[listeFarm[i].farm].disco == true) && (user[listeFarm[i].farm].number == 0)) {
      nouvelItem = listeFarm[i]
      break
    }
  }

  let embedProfil = new EmbedBuilder()
  .setTitle(`Profil de ${user.displayName}  ||  *Prestige ${user.prestige}* 💎`)
  .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${interaction == undefined ? lastProfil.dex.user.avatar : interaction.options._hoistedOptions.length == 1 ? interaction.options._hoistedOptions[0].user.avatar : interaction.member.user.avatar}.png?size=256`)
  .addFields(
    {name: `AykiCash <:aykicash:1031518293456076800> `, value: `\`${approx(hexToInt(user.money), approxOpts)}\``},
    {name: `Revenus 📈`, value: `\`+ ${approx(Math.round(parseFloat((gainPrestige ** user.prestige) * parseInt(hexToInt(user.cps)))), approxOpts)} / sec\` (x ${approx((Math.round((gainPrestige ** user.prestige) * 100)), approxOpts)}%💎)`},
    {name: `Meilleur item ⭐`, value: `||${lastItem}||\n${nouvelItem ? "*Nouvel item disponible dans la boutique !*" : ""}`}
  )
  .setColor(colorTurq)
  
  return embedProfil
}

setInterval(() => {

  if(Math.floor(Math.random() * 400) == 69) { //300) == 69) {
    bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder().setTitle("Un Lucio Thug est apparu!").setDescription("Temps avant expiration: \`30sec\`\n\nClique sur **Attraper** pour instantanément gagner **15%** de tes aykicash actuels en bonus!").setColor("#e3a600").setImage("https://media.giphy.com/media/f4JAcG9w0YnFVy3wx6/giphy.gif")], fetchReply: true,
    components: [
      new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId(`claimThug`)
        .setLabel("Attraper")
        .setStyle("Success")   
      )
    ]}).then(sent => {
      setTimeout(() => {
        if(bot.channels.cache.get(channelId).messages.cache.get(sent.id) == undefined) return
        sent.delete()
      }, 30000);
    })    
  }

  if(Math.floor(Math.random() * 8000) == 420) { //15000) == 420) {
    bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder().setTitle("Un Lucio RGB est apparu!").setDescription("Temps avant expiration: \`45sec\`\n\nClique sur **Attraper** pour instantanément gagner **100%** de tes aykicash actuels en bonus!").setColor("#e3a600").setImage("https://media.giphy.com/media/lVV0vRmFjiajt0MaGo/giphy.gif")], fetchReply: true,
    components: [
      new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId(`claimRGB`)
        .setLabel("Attraper")
        .setStyle("Success")   
      )
    ]}).then(sent => {
      setTimeout(() => {
        if(bot.channels.cache.get(channelId).messages.cache.get(sent.id) == undefined) return
        sent.delete()
      }, 45000);
    }) 
  }

  if(Math.floor(Math.random() * 15000) == 777) { //100000) == 69420) {
    bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder().setTitle("Un Lucio Doré est apparu!").setDescription("Temps avant expiration: \`1min\`\n\nClique sur **Attraper** pour instantanément gagner **777%** de tes aykicash actuels en bonus!").setColor("#e3a600").setImage("https://media.giphy.com/media/evLrefMs7zA8qfZfvF/giphy.gif")], fetchReply: true,
    components: [
      new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId(`claimGold`)
        .setLabel("Attraper")
        .setStyle("Success")   
      )
    ]}).then(sent => {
      setTimeout(() => {
        if(bot.channels.cache.get(channelId).messages.cache.get(sent.id) == undefined) return
        sent.delete()
      }, 60000);
    }) 
  }
}, 5000);

setInterval(() => {
  let topic = "Classement:\n"
  listeProfiles.sort((a, b) => parseInt(hexToInt(a.prestige)) < parseInt(hexToInt(b.prestige)) ? 1 : -1).slice(0, 10)
  let number = listeProfiles.length > 10 ? 10 : listeProfiles.length
  for (let i = 0; i < number; i++) {
    topic = topic  + (`${listeProfiles[i].displayName}: ${listeProfiles[i].prestige} 💎 ${approx(parseInt(hexToInt(listeProfiles[i].money)) , approxOpts)} <:aykicash:1031518293456076800> ,\n`) 
  }

  bot.channels.cache.get(channelId).setTopic(topic)
}, 300000);

setInterval(() => {
  go ++
  listeProfiles.forEach(profil => {
    let profit = parseFloat(((hexToInt(Farm.prototype.genji().cps) * profil.genji.multi) * profil.genji.number) + ((hexToInt(Farm.prototype.health().cps) * profil.health.multi) * profil.health.number) + ((hexToInt(Farm.prototype.kana().cps) * profil.kana.multi) * profil.kana.number)
    + ((hexToInt(Farm.prototype.gobelet().cps) * profil.gobelet.multi) * profil.gobelet.number) + ((hexToInt(Farm.prototype.eater().cps) * profil.eater.multi) * profil.eater.number) + ((hexToInt(Farm.prototype.levi().cps) * profil.levi.multi) * profil.levi.number) + ((hexToInt(Farm.prototype.bot().cps) * profil.bot.multi) * profil.bot.number)
    + ((hexToInt(Farm.prototype.helico().cps) * profil.helico.multi) * profil.helico.number) + ((hexToInt(Farm.prototype.tatayeah().cps) * profil.tatayeah.multi) * profil.tatayeah.number) + ((hexToInt(Farm.prototype.aykicat().cps) * profil.aykicat.multi) * profil.aykicat.number) + ((hexToInt(Farm.prototype.bombe().cps) * profil.bombe.multi) * profil.bombe.number)
    + ((hexToInt(Farm.prototype.belugods().cps) * profil.belugod.multi) * profil.belugod.number) + ((hexToInt(Farm.prototype.widow().cps) * profil.widow.multi) * profil.widow.number) + ((hexToInt(Farm.prototype.aimbot().cps) * profil.aimbot.multi) * profil.aimbot.number) + ((hexToInt(Farm.prototype.nexus().cps) * profil.nexus.multi) * profil.nexus.number) 
    + ((hexToInt(Farm.prototype.shulker().cps) * profil.shulker.multi) * profil.shulker.number) + ((hexToInt(Farm.prototype.leviator().cps) * profil.leviator.multi) * profil.leviator.number) + ((hexToInt(Farm.prototype.guardian().cps) * profil.guardian.multi) * profil.guardian.number) + ((hexToInt(Farm.prototype.bongo().cps) * profil.bongo.multi) * profil.bongo.number)
    + ((hexToInt(Farm.prototype.gazette().cps) * profil.gazette.multi) * profil.gazette.number) + ((hexToInt(Farm.prototype.cite().cps) * profil.cite.multi) * profil.cite.number) + ((hexToInt(Farm.prototype.casino().cps) * profil.casino.multi) * profil.casino.number) 
    + ((hexToInt(Farm.prototype.academy().cps) * profil.academy.multi) * profil.academy.number) + ((hexToInt(Farm.prototype.papa().cps) * profil.papa.multi) * profil.papa.number) + ((hexToInt(Farm.prototype.vip().cps) * profil.vip.multi) * profil.vip.number) + ((hexToInt(Farm.prototype.fragment().cps) * profil.fragment.multi) * profil.fragment.number)).toFixed(0)

    profil.cps = intToHex(profit)
    profil.totalMoney = intToHex(parseInt(hexToInt(profil.money)) + parseInt(hexToInt(profil.dispense)))
    profil.money = intToHex(parseInt(hexToInt(profil.money)) + Math.round((gainPrestige ** profil.prestige) * parseInt(hexToInt(profil.cps))))

    profil.genji.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.genji().cps) * profil.genji.multi) * profil.genji.number) + BigInt(hexToInt(profil.genji.totalCash)))
    profil.health.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.health().cps) * profil.health.multi) * profil.health.number) + BigInt(hexToInt(profil.health.totalCash)))
    profil.kana.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.kana().cps) * profil.kana.multi) * profil.kana.number) + BigInt(hexToInt(profil.kana.totalCash)))
    profil.gobelet.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.gobelet().cps) * profil.gobelet.multi) * profil.gobelet.number) + BigInt(hexToInt(profil.gobelet.totalCash)))
    profil.eater.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.eater().cps) * profil.eater.multi) * profil.eater.number) + BigInt(hexToInt(profil.eater.totalCash)))
    profil.levi.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.levi().cps) * profil.levi.multi) * profil.levi.number) + BigInt(hexToInt(profil.levi.totalCash)))
    profil.bot.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.bot().cps) * profil.bot.multi) * profil.bot.number) + BigInt(hexToInt(profil.bot.totalCash)))
    profil.helico.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.helico().cps) * profil.helico.multi) * profil.helico.number) + BigInt(hexToInt(profil.helico.totalCash)))
    profil.tatayeah.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.tatayeah().cps) * profil.tatayeah.multi) * profil.tatayeah.number) + BigInt(hexToInt(profil.tatayeah.totalCash)))
    profil.aykicat.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.aykicat().cps) * profil.aykicat.multi) * profil.aykicat.number) + BigInt(hexToInt(profil.aykicat.totalCash)))
    profil.bombe.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.bombe().cps) * profil.bombe.multi) * profil.bombe.number) + BigInt(hexToInt(profil.bombe.totalCash)))
    profil.belugod.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.belugods().cps) * profil.belugod.multi) * profil.belugod.number) + BigInt(hexToInt(profil.belugod.totalCash)))
    profil.widow.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.widow().cps) * profil.widow.multi) * profil.widow.number) + BigInt(hexToInt(profil.widow.totalCash)))
    profil.nexus.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.nexus().cps) * profil.nexus.multi) * profil.nexus.number) + BigInt(hexToInt(profil.nexus.totalCash)))
    profil.shulker.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.shulker().cps) * profil.shulker.multi) * profil.shulker.number) + BigInt(hexToInt(profil.shulker.totalCash)))
    profil.leviator.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.leviator().cps) * profil.leviator.multi) * profil.leviator.number) + BigInt(hexToInt(profil.leviator.totalCash)))
    profil.guardian.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.guardian().cps) * profil.guardian.multi) * profil.guardian.number) + BigInt(hexToInt(profil.guardian.totalCash)))
    profil.bongo.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.bongo().cps) * profil.bongo.multi) * profil.bongo.number) + BigInt(hexToInt(profil.bongo.totalCash)))
    profil.gazette.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.gazette().cps) * profil.gazette.multi) * profil.gazette.number) + BigInt(hexToInt(profil.gazette.totalCash)))
    profil.cite.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.cite().cps) * profil.cite.multi) * profil.cite.number) + BigInt(hexToInt(profil.cite.totalCash)))
    profil.casino.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.casino().cps) * profil.casino.multi) * profil.casino.number) + BigInt(hexToInt(profil.casino.totalCash)))
    profil.academy.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.academy().cps) * profil.academy.multi) * profil.academy.number) + BigInt(hexToInt(profil.academy.totalCash)))
    profil.papa.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.papa().cps) * profil.papa.multi) * profil.papa.number) + BigInt(hexToInt(profil.papa.totalCash)))
    profil.vip.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.vip().cps) * profil.vip.multi) * profil.vip.number) + BigInt(hexToInt(profil.vip.totalCash)))
    profil.fragment.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.fragment().cps) * profil.fragment.multi) * profil.fragment.number) + BigInt(hexToInt(profil.fragment.totalCash)))

    if(lastProfil && go >= 2) {
      lasMsgProfil.edit({embeds: [profilCmd(lastProfil.prm)]})      
      go = 0
    }

    Farm.prototype.getAll().forEach(farm => {
      if((hexToInt(farm.cost) * 0.8 < hexToInt(profil.money)) && (profil[farm.farm].disco == false)) {
        profil[farm.farm].disco = true
      }
    });

  })

  fs.writeFileSync('./data/data.json', JSON.stringify(listeProfiles), "utf8" , function(err) {
    if(err) throw err;})

  fs.writeFileSync('./data/data2.json', JSON.stringify(listeProfiles), "utf8" , function(err) {
    if(err) throw err;})
}, 1000);

setInterval(() => {
  for (let i = 0; i < listeProfiles.length; i++) {
    achiv(listeProfiles[i]).forEach(ach => {
      if(ach.cond == true && !listeProfiles[i].achivementsId.includes(ach.id)) {
        listeProfiles[i].achivementsId.push(ach.id)
        listeProfiles[i].succScore += ach.score

        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __${ach.name}__ ◄**\n\n + ${ach.score} Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: listeProfiles[i].avatar, name: `${listeProfiles[i].displayName} a débloqué un succès`})]})
      }
    })

    for (let i = 0; i < acheteursEater.length; i++) {
      if(DateTime.now().setZone("CET").hour == 12 && DateTime.now().setZone("CET").minute >= 0 && DateTime.now().setZone("CET").minute <= 12) {
        if(!acheteursEater[i].achivementsId.includes(20)) {
          listeProfiles[i].achivementsId.push(20)
          listeProfiles[i].succScore += 200

          bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
            .setDescription(`**► __C’est l’heure de manger !__ ◄**\n\n + 200 Points de succès`)
            .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
            .setColor(colorgold)
            .setAuthor({iconURL: listeProfiles[i].avatar, name: `${listeProfiles[i].displayName} a débloqué un succès`})
          ]})
        }
      }
      acheteursEater = []
    }

    for (let i = 0; i < acheteursKana.length; i++) {
      if(DateTime.now().setZone("CET").hour == 4 && DateTime.now().setZone("CET").minute >= 0 && DateTime.now().setZone("CET").minute <= 20) {
        if(!acheteursKana[i].achivementsId.includes(12)) {
          listeProfiles[i].achivementsId.push(12)
          listeProfiles[i].succScore += 200
  
          bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
            .setDescription(`**► __Kana Time__ ◄**\n\n + 200 Points de succès`)
            .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
            .setColor(colorgold)
            .setAuthor({iconURL: listeProfiles[i].avatar, name: `${listeProfiles[i].displayName} a débloqué un succès`})
          ]})
        }
      }
      acheteursKana = []
    }
  }
}, 5000);

bot.on("ready", async () => {
  console.log("Bot Online")
  console.log(new Date().toLocaleString())
  bot.user.setPresence({
    activities: [{name: "!play", type: ActivityType.Playing}],
    status: "online"
  })

  const guild = bot.guilds.cache.get(guildId)
  let commands

  if(guild) {
    commands = guild.commands
  }else{
    commands = bot.application.commands
  }

  /*guild.commands.fetch("1033630654346305627").then(command => {
    command.delete()
  })*/

  commands.create({
    name: "p",
    description: "Affiche le profil",
    options: [
      {
        name: "user",
        description: "Voir le profil d'un autre joueur",
        required: false,
        type: Discord.ApplicationCommandOptionType.User
      }
    ]
  })

  commands.create({
    name: "prestige",
    description: "Te permet de passer aux prochains prestiges",
  })

  commands.create({
    name: "item",
    description: "Ouvre l'interface d'un objet",
    options : [
      {
        name: "objet",
        description: "Nom de l'objet a afficher",
        required: true,
        type: Discord.ApplicationCommandOptionType.String
      }
    ]
  })

  commands.create({
    name: "shop",
    description: "Ouvre l'interface de la boutique"
  })

  commands.create({
    name: "claim",
    description: "Entrez un code secret",
    options: [
      {
        name: "code",
        description: "pensez vous avoir déchiffré une énigme ?",
        required: true,
        type: Discord.ApplicationCommandOptionType.String
      }
    ]
  })

  /*commands.create({
    name: "buy",
    description: "Achète les objets de la boutique",
    options: [
      {
        name: "objet",
        description: "Nom de l'objet a acheter",
        required: true,
        type: Discord.ApplicationCommandOptionType.String
      },{
        name: "nombre",
        description: "Nombre d'objet a acheter",
        required: false,
        type: Discord.ApplicationCommandOptionType.String
      }
    ]
  })*/
})

bot.on('interactionCreate', async (interaction) => {
  if(!interaction.isCommand() && !interaction.isButton()) {
    return
  }
  
  if(interaction.channelId != channelId) return

  const { commandName } = interaction

  if(commandName == "p") {
    let user = null
    if(interaction.options._hoistedOptions.length != 1) {
      user = listeProfiles.find(name => {
        if(name.id == interaction.member.id) {
          return true
        }
        return false
      })
    }else{
      user = listeProfiles.find(name => {
        if(name.id == interaction.options._hoistedOptions[0].user.id) {
          return true
        }
        return false
      })
    }

    if(user == undefined) {
      interaction.reply({embeds: [new EmbedBuilder()
        .setDescription(`<@${interaction.member.id}> Aucun profil associé avec ce compte.`)
        .setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })    
        return
    }

    if(interaction.options._hoistedOptions.length == 0) {
      await interaction.reply({
        embeds: [
          profilCmd(user, interaction)
        ],
        fetchReply: true,
        components:[
          new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
            .setCustomId(`shop-${interaction.user.id}`)
            .setLabel('🛒 Boutique')
            .setStyle('Secondary'),
  
            new ButtonBuilder()
            .setCustomId(`succes-${interaction.user.id}`)
            .setLabel('🏆 Succès')
            .setStyle('Secondary'),
  
            new ButtonBuilder()
            .setCustomId('stats')
            .setLabel('📊 Statistiques')
            .setStyle('Secondary')
          )
        ]
      }).then(sent => {
        lasMsgProfil = sent
        lastProfil = {prm: user, dex: interaction.member}
        setTimeout(() => {
          if(sent.id == lasMsgProfil.id) {
            lastProfil = null
            lasMsgProfil = null
            sent.delete()
          }else{
            sent.delete()
          }
        }, 180000);
      })
    }else{
      await interaction.reply({
        embeds: [
          profilCmd(user, interaction)
        ],
        fetchReply: true,
        components:[
          new ActionRowBuilder()
          .addComponents(

            new ButtonBuilder()
            .setCustomId(`succes-${interaction.user.id}`)
            .setLabel('🏆 Succès')
            .setStyle('Secondary'),

            new ButtonBuilder()
            .setCustomId('stats')
            .setLabel('📊 Statistiques')
            .setStyle('Secondary'),
          )
        ],
        fetchReply: true
      }).then(sent => {
        lasMsgProfil = sent
        lastProfil = {prm: user, dex: interaction.options._hoistedOptions[0]}
        setTimeout(() => {
          if(sent.id == lasMsgProfil.id) {
            lasMsgProfil = null
            lastProfil = null
            sent.delete()
          }else{
            sent.delete()
          }
        }, 180000);
      })
    }
  }

  if(commandName == "claim") {
    let user = listeProfiles.find(user => {
      if(user.id == interaction.user.id) {
        return true
      }
      return false
    })

    if(user == undefined) {
      interaction.reply({embeds: [new EmbedBuilder()
        .setDescription(`<@${interaction.member.id}> Aucun profil associé avec ce compte.`)
        .setColor(colorRouge)], fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })    
      return
    }

    let code = interaction.options._hoistedOptions[0].value.toLowerCase()

    if(code == "pcl41mth1sp") {
      if(!user.achivementsId.includes(16)) {
        user.achivementsId.push(16)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Je procrastine__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }else{
        interaction.reply({embeds: [new EmbedBuilder().setTitle("Tu as déjà réclamé ce code!")]})
      }

    }else if(code == "ackerman") {
      if(!user.achivementsId.includes(23)) {
        user.achivementsId.push(23)
        user.succScore += 200
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Mon nom__ ◄**\n\n + 200 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "maladarix") {
      if(!user.achivementsId.includes(27)) {
        user.achivementsId.push(27)
        user.succScore += 200
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Mon créateur__ ◄**\n\n + 200 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "64zj0234") {
      if(!user.achivementsId.includes(31)) {
        user.achivementsId.push(31)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __T’es trop chiant !__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "1383") {
      if(!user.achivementsId.includes(35)) {
        user.achivementsId.push(35)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Mon niveau dans les mémoires__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "430125201099849739") {
      if(!user.achivementsId.includes(39)) {
        user.achivementsId.push(39)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __L’identifiant du chat__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "ysrotcodeht"|| code == "ysrotcddeht" || code == "ysrdtcddeht" || code == "ysrotcooeht" || code == "ysrdtcodeht") {
      if(!user.achivementsId.includes(43)) {
        user.achivementsId.push(43)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Le ballon du lobby__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "2234") {
      if(!user.achivementsId.includes(51)) {
        user.achivementsId.push(51)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Le tag universel__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "hazarie") {
      if(!user.achivementsId.includes(55)) {
        user.achivementsId.push(55)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Mon animal__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "d4n3xsus") {
      if(!user.achivementsId.includes(58)) {
        user.achivementsId.push(58)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Il faut juste descendre__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "119070") {
      if(!user.achivementsId.includes(62)) {
        user.achivementsId.push(62)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Le coût des 6 renards multipliés__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "boumata" || code == "boumata gx" || code == "boumatagx") {
      if(!user.achivementsId.includes(66)) {
        user.achivementsId.push(66)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Le 3ème concurrent GX__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "jelly") {
      if(!user.achivementsId.includes(70)) {
        user.achivementsId.push(70)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Le poisson du sacrifice__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "vibraninf") {
      if(!user.achivementsId.includes(74)) {
        user.achivementsId.push(74)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Son premier pokémon__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "primogem"|| code == "primogems") {
      if(!user.achivementsId.includes(78)) {
        user.achivementsId.push(78)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Le 4ème mot__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "fondation" || code == "pelle de la fondation" || code == "la pelle de la fondation" || code == "pelle fondation") {
      if(!user.achivementsId.includes(82)) {
        user.achivementsId.push(82)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Le rôle d’une pelle__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "ekeho") {
      if(!user.achivementsId.includes(86)) {
        user.achivementsId.push(86)
        user.succScore += 1000
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __Le mythique ancestra__ ◄**\n\n + 1000 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "4c4dmy1sh3re") {
      if(!user.achivementsId.includes(90)) {
        user.achivementsId.push(90)
        user.succScore += 5000
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        }) 
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __La naissance du projet__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }

    }else if(code == "suff1sait2demand3r") {
      if(!user.achivementsId.includes(94)) {
        user.achivementsId.push(94)
        user.succScore += 500
        interaction.reply({content: ".", fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 10);
        })    
        bot.channels.cache.get(channelId).send({embeds: [new EmbedBuilder()
          .setDescription(`**► __C’3st quoi le code s’il te plaît__ ◄**\n\n + 500 Points de succès`)
          .setThumbnail("https://media.tenor.com/Ru7fdBnFsdYAAAAi/mercy-overwatch.gif")
          .setColor(colorgold)
          .setAuthor({iconURL: user.avatar, name: `${user.displayName} a débloqué un succès`})
        ]})
      }
    }else{
      interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Code Inconnu`).setColor(colorRouge)], fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })

      fs.readFile('./data/tryCode.json', "utf8", (err, JsonString) => {
        if(err) {
          console.log(err)
        }else{
          tryCode = JSON.parse(JsonString)
        }
      })

      tryCode.push({id: interaction.member.id, code: code})

      fs.writeFileSync('./data/tryCode.json', JSON.stringify(tryCode), "utf8" , function(err) {
        if(err) throw err;})

      tryCode = []
    }
  }

  if(commandName == "prestige") {
    let user = listeProfiles.find(user => {
      if(user.id == interaction.user.id) {
        return true
      }
      return false
    })

    if(user == undefined) {
      interaction.reply({embeds: [new EmbedBuilder()
        .setDescription(`<@${interaction.member.id}> Aucun profil associé avec ce compte.`)
        .setColor(colorRouge)], fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })    
      return
    }
    let numPrestige = 0
    let prixPres = 0
    numPrestige = -1
      prixPres = 0
      let currentPrice = (augPrestige ** user.prestige) * basePrestige
      do  {
        prixPres += currentPrice;
        currentPrice *= augPrestige;
        numPrestige++;

      }while (Math.round(prixPres) <= (hexToInt(user.money)))
      prixPres = Math.round((basePrestige * (augPrestige ** (user.prestige + numPrestige) - augPrestige ** user.prestige)) / (augPrestige - 1))

    if(numPrestige == 0) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu n'as pas assez d'argent!\n\n${approx(hexToInt(user.money), approxOpts)}/${approx(Math.round((basePrestige * (augPrestige ** (user.prestige + 1) - augPrestige ** user.prestige)) / (augPrestige - 1)), approxOpts)}\n${progressbar.splitBar(Math.round((basePrestige * (augPrestige ** (user.prestige + 1) - augPrestige ** user.prestige)) / (augPrestige - 1)), hexToInt(user.money), 20)}`).setColor(colorRouge)], fetchReply: true}).then(sent => {
      setTimeout(() => {
        sent.delete()
      }, 3000);
    })

    interaction.reply({embeds: [new EmbedBuilder()
      .setTitle(`Prestige || ${user.displayName}`)
      .setDescription(`Chaque prestige augmente de 2% le revenu total.\n\n + ${numPrestige} 💎`)
      .setThumbnail(user.avatar)
      .addFields(
        {name: "Tu perds:", value: "-Tout ton aykicash\n-Tout tes items", inline: false},
        {name: "Tu gardes:", value: "-Tes succès\n-Les améliorations", inline: false},
        {name: "Coût:", value: `\`${approx(prixPres, approxOpts)}\`$`, inline: false}
      ).setColor("#d184fa")
    ],components: [
      new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
        .setCustomId(`acceptPrestige ${interaction.member.id} ${numPrestige}`)
        .setEmoji("✅")
        .setStyle("Success")
        ,
        new ButtonBuilder()
        .setCustomId(`denyPrestige ${interaction.member.id}`)
        .setLabel("Fermer")
        .setStyle("Secondary")    
      )
    ]})
  }

  if(commandName == "shop") {
    let user = listeProfiles.find(user => {
      if(user.id == interaction.user.id) {
        return true
      }
      return false
    })

    if(user == undefined) {
      interaction.reply({embeds: [new EmbedBuilder()
        .setDescription(`<@${interaction.member.id}> Aucun profil associé avec ce compte.`)
        .setColor(colorRouge)],ephemeral: false, fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })    
      return
    }else{
      shop(user, interaction)
    }
  }

  if(commandName == "item") {
    let user = listeProfiles.find(user => {
      if(user.id == interaction.user.id) {
        return true
      }
      return false
    })

    if(user == undefined) {
      interaction.reply({embeds: [new EmbedBuilder()
        .setDescription(`<@${interaction.member.id}> Aucun profil associé avec ce compte.`)
        .setColor(colorRouge)],ephemeral: false, fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })    
      return
    }
    let type = undefined
    switch (interaction.options._hoistedOptions[0].value.toLowerCase()) {
      case "genji":
      case "little":
      case "little genji":
        type = Farm.prototype.genji()
        break;
      
      case "health":
      case "pack":
      case "heal":
      case "healthpack":
      case "healpack":
        type = Farm.prototype.health()
        break

      case "kana":
      case "kanasheeesh":
      case "kanasheesh":
      case "kanashesh":
      case "sheeesh" :
      case "sheesh" :
      case "shesh" :
      
        type = Farm.prototype.kana()
        break

      case "gobelet" :
      case "goblet" :
      case "pappusu" :
      case "papusu" :
      case "le gobelet de pappusu":
      case "gobelet de pappusu" :
      case "goblet de pappusu" :
      case "gobelet papusu" :
      case "bobelet de pappu" :
      case "gobelet pappusu" :
      

      type = Farm.prototype.gobelet()
      break

      case "eater":
      case "z":
      case "zeater":
      case "z-eater":
      case "zeklown" :

        type = Farm.prototype.eater()
        break
      

      case "levi":
      case "smol":
      case "smol levi":
      case "livai" :
      case "smol livai" :
      case "rivaille" :    
      case "smol rivaille" :  
      case "levai" :  
      case "smol levai" :  

        type = Farm.prototype.levi()
        break

      case "bot":
      case "overstats":
      case "bot overstats":

        type = Farm.prototype.bot()
        break

      case "helico":
      case "pandoux":
      case "helico de pandoux" :
      case "l'helico de pandoux" :
      case "helico pandoux" :

        type = Farm.prototype.helico()
        break

      case "tatayeah":
      case "souris":
      case "tatayeet" :
      case "souris de tatayeah" :
      case "tatayet" :  
      case "souris de tatayet" :    
      case "la souris de tatayet" :
      case "la souris de tatayeah" :
      case "la souris de tatayeet" :
      case "souris de tatayeet" :

        type = Farm.prototype.tatayeah()
        break

      case "aykicat":
      case "aykikat":
      case "cat":
        type = Farm.prototype.aykicat()
        break

      case "bombe":
      case "hiesko":
      case "bombe d'hiesko":
      case "la bombe d'hiesko" :
      case "la bombe" :   
      case "heisko" :
      case "la bombe de hiesko" : 
      case "bombe de hiesko" :
      case "la bombe d hiesko" : 
      case "bombe d hiesko" : 

        type = Farm.prototype.bombe()
        break

      case "belugods":
      case "belugod" : 
      case "sponsor" : 
      case "sponsor belugods" : 
      case "sponsor belugod" : 
      case "belu" : 

        type = Farm.prototype.belugods()
        break

      case "widow":
      case "tak":
      case "widow de tak" :
      case "takmany" :
      case "la widow de tak" :
      case "la widow de takmany" :
      case "widow de takmany" :

        type = Farm.prototype.widow()
        break

      case "l'aimbot de livs" :
      case "aimbot de livs" :
      case "aimbot" :
      case "livs" :
      case "l aimbot de livs" :
        type = Farm.prototype.aimbot()
        break


      case "nexus":
      case "nexsus":
        type = Farm.prototype.nexus()
        break
      
      case "shulker":
      case "shulker fox":
      case "renard":
      case "renard dans un shulker":
      case "shulker box":
      case "fox":
        type = Farm.prototype.shulker()
        break

      case "la carte legendaire leviator":
      case "carte legendaire leviator":
      case "carte légendaire léviator":
      case "la carte":
      case "leviator":
      case "léviator":
      case "la carte legendaire":
      case "la carte légendaire":
      case "la carte légendaire léviator":
      case "carte" :

        type = Farm.prototype.leviator()
        break

      case "la farm à guardian d'illeria":
      case "farm à guardian d'illeria":
      case "farm à guardian d illeria":
      case "la farm à guardian d illeria":
      case "farm":
      case "guardian":
      case "illeria":
      case "la farm à guardian":
      case "farm à guardian":
      case "farm a guardian":
      case "la farm a guardian d'illeria":
      case "farm a guardian d'illeria":

        type = Farm.prototype.guardian()
        break
      
      case "gongo the bongo":
      case "gongo":
      case "bongo":
      case "gongo bongo":
        type = Farm.prototype.bongo()
        break

      case "les lacs suspendus de pandoutayah":
      case "pandoutayah":
      case "lac":
      case "lacs":
      case "lacs suspendus":
      case "lacs suspendus de pandoutayah":
      case "les lacs":
        type = Farm.prototype.cite()
        break

      case "casino pokemon" :
      case "casino":
      case "pokemon":
      case "le casino":
      case "le casino pokemon":
        type = Farm.prototype.casino
        break

      case "mada academy":
      case "academy":
      case "mada":
      case "la mada academy":
        type = Farm.prototype.academy()
        break

      case "papa genji":
      case "aykira":
      case "papa":

        type = Farm.prototype.papa()
        break

      case "pass vip madamada" :
      case "pass":
      case "vip":

        type = Farm.prototype.vip()
        break

      case "fragment de matiere condensée" :
      case "fragment":
      case "fragment de matière":
      case "fragment de matiere":
      case "fragment de matiere condensee":
      case "fragment de matière condensee":
        type = Farm.prototype.fragment()
        break
    }

    if(type == undefined || user[type.farm].disco == false) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Objet Inconnu`).setColor(colorRouge)], fetchReply: true}).then(sent => {
      setTimeout(() => {
        sent.delete()
      }, 3000);
    })    

    interaction.reply({embeds: [new EmbedBuilder()
      .setTitle(type.name)
      .setDescription(type.des)
      .addFields(
        {name: "Prix unitaire", value: `\`${approx(Math.round(((hexToInt(type.cost) * (1.15 ** (user[type.farm].number + parseInt(1)) - 1.15 ** user[type.farm].number)) / 0.15) * 1), approxOpts)}\` <:aykicash:1031518293456076800>`, inline: true},
        {name: "CPS", value: `\`+${approx(hexToInt(type.cps), approxOpts)} /sec\``, inline: true},
        {name: "Inventaire", value: `\`${user[type.farm].number}\``, inline: true}
      )
      .setImage(type.img)
      .setColor(colorshop)
    ],
    components: [
      new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId(`+1 ${type.farm}`)
          .setLabel("+1")
          .setStyle("Secondary"),

          new ButtonBuilder()
          .setCustomId(`+10 ${type.farm}`)
          .setLabel("+10")
          .setStyle("Secondary"),

          new ButtonBuilder()
          .setCustomId(`+100 ${type.farm}`)
          .setLabel("+100")
          .setStyle("Secondary"),

          new ButtonBuilder()
          .setCustomId(`max ${type.farm}`)
          .setLabel("Max")
          .setStyle("Secondary"),

          new ButtonBuilder()
          .setCustomId(`upgrades ${type.farm} ${type.name}`)
          .setLabel("⬆️ Améliorations")
          .setStyle("Success")
        )
    ],
    ephemeral: true})
  }

  if(commandName == "buy") {
    let user = listeProfiles.find(user => {
      if(user.id == interaction.user.id) {
        return true
      }
      return false
    })

    if(user == undefined) {
      interaction.reply({embeds: [new EmbedBuilder()
        .setDescription(`<@${interaction.member.id}> Aucun profil associé avec ce compte.`)
        .setColor(colorRouge)],ephemeral: false, fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })    
      return
    }

    let nombre = 0
    let max = false
    let type = undefined

    if(interaction.options._hoistedOptions.length < 2) {
      nombre = 1
    }else if(interaction.options._hoistedOptions[1].name == "nombre") {
      if(interaction.options._hoistedOptions[1].value <= 0 || interaction.options._hoistedOptions[1].value > 1000) {

        interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Le nombre d'objet doit être entre 0 et 1000`).setColor(colorRouge),], ephemeral: false, fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })    
        return

      }else if(interaction.options._hoistedOptions[1].value == "max") {
        max = true

      }else if(isNaN(interaction.options._hoistedOptions[1].value)){
        interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Argument impossible`).setColor(colorRouge),], ephemeral: false, fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })    
        return

      }else{
        nombre = interaction.options._hoistedOptions[1].value
      }
    }

    switch (interaction.options._hoistedOptions[0].value.toLowerCase()) {
      case "genji":
      case "little":
      case "little genji":
        type = Farm.prototype.genji()
        break;
      
      case "health":
      case "pack":
      case "heal":
      case "healthpack":
      case "healpack":
        type = Farm.prototype.health()
        break

      case "kana":
      case "kanasheeesh":
      case "kanasheesh":
      case "kanashesh":
      case "sheeesh" :
      case "sheesh" :
      case "shesh" :
      
        type = Farm.prototype.kana()
        break

      case "gobelet" :
      case "goblet" :
      case "pappusu" :
      case "papusu" :
      case "le gobelet de pappusu":
      case "gobelet de pappusu" :
      case "goblet de pappusu" :
      case "gobelet papusu" :
      case "bobelet de pappu" :
      case "gobelet pappusu" :
      

      type = Farm.prototype.gobelet()
      break

      case "eater":
      case "z":
      case "zeater":
      case "z-eater":
      case "zeklown" :

        type = Farm.prototype.eater()
        break
      

      case "levi":
      case "smol":
      case "smol levi":
      case "livai" :
      case "smol livai" :
      case "rivaille" :    
      case "smol rivaille" :  
      case "levai" :  
      case "smol levai" :  

        type = Farm.prototype.levi()
        break

      case "bot":
      case "overstats":
      case "bot overstats":

        type = Farm.prototype.bot()
        break

      case "helico":
      case "pandoux":
      case "helico de pandoux" :
      case "l'helico de pandoux" :
      case "helico pandoux" :

        type = Farm.prototype.helico()
        break

      case "tatayeah":
      case "souris":
      case "tatayeet" :
      case "souris de tatayeah" :
      case "tatayet" :  
      case "souris de tatayet" :    
      case "la souris de tatayet" :
      case "la souris de tatayeah" :
      case "la souris de tatayeet" :
      case "souris de tatayeet" :

        type = Farm.prototype.tatayeah()
        break

      case "aykicat":
      case "aykikat":
      case "cat":
        type = Farm.prototype.aykicat()
        break

      case "bombe":
      case "hiesko":
      case "bombe d'hiesko":
      case "la bombe d'hiesko" :
      case "la bombe" :   
      case "heisko" :
      case "la bombe de hiesko" : 
      case "bombe de hiesko" :
      case "la bombe d hiesko" : 
      case "bombe d hiesko" : 

        type = Farm.prototype.bombe()
        break

      case "belugods":
      case "belugod" : 
      case "sponsor" : 
      case "sponsor belugods" : 
      case "sponsor belugod" : 
      case "belu" : 

        type = Farm.prototype.belugods()
        break

      case "widow":
      case "tak":
      case "widow de tak" :
      case "takmany" :
      case "la widow de tak" :
      case "la widow de takmany" :
      case "widow de takmany" :

        type = Farm.prototype.widow()
        break

      case "l'aimbot de livs" :
      case "aimbot de livs" :
      case "aimbot" :
      case "livs" :
      case "l aimbot de livs" :
        type = Farm.prototype.aimbot()
        break


      case "nexus":
      case "nexsus":
        type = Farm.prototype.nexus()
        break
      
      case "shulker":
      case "shulker fox":
      case "renard":
      case "renard dans un shulker":
      case "shulker box":
      case "fox":
        type = Farm.prototype.shulker()
        break

      case "la carte legendaire leviator":
      case "carte legendaire leviator":
      case "carte légendaire léviator":
      case "la carte":
      case "leviator":
      case "léviator":
      case "la carte legendaire":
      case "la carte légendaire":
      case "la carte légendaire léviator":
      case "carte" :

        type = Farm.prototype.leviator()
        break

      case "la farm à guardian d'illeria":
      case "farm à guardian d'illeria":
      case "farm à guardian d illeria":
      case "la farm à guardian d illeria":
      case "farm":
      case "guardian":
      case "illeria":
      case "la farm à guardian":
      case "farm à guardian":
      case "farm a guardian":
      case "la farm a guardian d'illeria":
      case "farm a guardian d'illeria":

        type = Farm.prototype.guardian()
        break
      
      case "gongo the bongo":
      case "gongo":
      case "bongo":
      case "gongo bongo":
        type = Farm.prototype.bongo()
        break

      case "les lacs suspendus de pandoutayah":
      case "pandoutayah":
      case "lac":
      case "lacs":
      case "lacs suspendus":
      case "lacs suspendus de pandoutayah":
      case "les lacs":
        type = Farm.prototype.cite()
        break

      case "casino pokemon" :
      case "casino":
      case "pokemon":
      case "le casino":
      case "le casino pokemon":
        type = Farm.prototype.casino
        break

      case "mada academy":
      case "academy":
      case "mada":
      case "la mada academy":
        type = Farm.prototype.academy()
        break

      case "papa genji":
      case "aykira":
      case "papa":

        type = Farm.prototype.papa()
        break

      case "pass vip madamada" :
      case "pass":
      case "vip":

        type = Farm.prototype.vip()
        break

      case "fragment de matiere condensée" :
      case "fragment":
      case "fragment de matière":
      case "fragment de matiere":
      case "fragment de matiere condensee":
      case "fragment de matière condensee":
        type = Farm.prototype.fragment()
        break
    }

    if(type == undefined || user[type.farm].disco == false) return interaction.reply({fetchReply: true, embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Objet Inconnu`).setColor(colorRouge)]}).then(sent => {
      setTimeout(() => {
        sent.delete()
      }, 3000);
    })

      let prix = hexToInt(type.cost)
      let bonus = 1
      if(max == true) {
        nombre = -1
          let coutTotal = 0
          let currentPrice = ((1.15 ** user[type.farm].number) * prix) * bonus
          do  {
              coutTotal += currentPrice;
              currentPrice *= 1.15;
              nombre++;

          }while (Math.round(coutTotal) <= parseInt(hexToInt(user.money)))
      }

      let cost = Math.round(((prix * (1.15 ** (user[type.farm].number + parseInt(nombre)) - 1.15 ** user[type.farm].number)) / 0.15) * bonus)

      if(cost == 0) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu n'as pas assez d'argent`).setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })    

      if(cost > hexToInt(user.money)) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu n'as pas assez d'argent`).setDescription(`${approx(hexToInt(user.money), approxOpts)}/${approx(cost, approxOpts)}\n${progressbar.splitBar(cost, parseInt(hexToInt(user.money)), 20)}`).setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })

      user[type.farm].number += parseInt(nombre)
      user.money = intToHex(hexToInt(user.money) - cost)
      user.dispense = intToHex(parseInt(hexToInt(user.dispense) + cost))

      if(type.farm == "kana") {
        acheteursKana.push(user)
      }else if(type.farm == "eater") {
        acheteursEater.push(user)
      }

      interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${user.id}> a acheté **${nombre} ${type.name}** pour **${approx(cost, approxOpts)}** <:aykicash:1031518293456076800>`).setColor(colorVert).setImage(type.img)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 5000);
      })
  }

  if(interaction.isButton()) {
    if(interaction.customId.split(" ")[0] == `acceptPrestige`) {
      if(interaction.customId.split(" ")[1] == interaction.member.id) {

        interaction.message.delete()

        let user = listeProfiles.find(user => {
          if(user.id == interaction.user.id) {
            return true
          }
          return false
        })
    
        if(user == undefined) {
          interaction.reply({embeds: [new EmbedBuilder()
            .setDescription(`<@${interaction.member.id}> Aucun profil associé avec ce compte.`)
            .setColor(colorRouge)],ephemeral: false, fetchReply: true}).then(sent => {
              setTimeout(() => {
                sent.delete()
              }, 3000);
            })    
          return
        }

        user.totalItem = 0
        user.prestige += parseInt(interaction.customId.split(" ")[2])
        user.money = "64"
        user.cps = "0"

        Farm.prototype.getAll().forEach(farm => {
          user[farm.farm].disco = false
          user[farm.farm].number = 0
        });

        interaction.channel.send({embeds: [new EmbedBuilder().setDescription(`**${user.displayName}** a atteint le niveau **${user.prestige}** de prestige!💎`).setColor(colorgold)], fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })

      }else{
        interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu n'as pas accès a ce bouton`).setColor(colorRouge)], fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })
      }
    }else if(interaction.customId.split(" ")[0] == `denyPrestige`) {
      if(interaction.customId.split(" ")[1] == interaction.member.id) {
        interaction.message.delete()
      }else{
        interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu n'as pas accès a ce bouton`).setColor(colorRouge)], fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })
      }
    }else if(interaction.customId == "stats") { //stats
      let user = listeProfiles.find(user => {
        if(interaction.message.embeds[0].title.includes(user.displayName)) {
          return true
        }
        return false
      })

      let userInteract = listeProfiles.find(user => {
        if(interaction.member.id == user.id) {
          return true
        }
        return false
      })

      if(userInteract == undefined || user == undefined) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Il te faut un profil MadaIdle! Tape !play pour commencer.`).setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })
      let desc = `**Argent Total:** \`${approx(hexToInt(user.totalMoney), approxOpts)}\` <:aykicash:1031518293456076800>\n\n**🏆 Score Succès :** \`${user.succScore}\`\n\n**<:LucioThug:887848266597822535> Lucio Thug attrapés :** \`${user.lucioThug}\`\n\n**<:LucioRGB:887845591160348744> Lucio RGB attrapés :** \`${user.lucioRGB}\`\n\n**<:LucioGolden:887847813550055474> Lucio Gold attrapés :** \`${user.lucioGold}\`\n\n`

      for (let i = 0; i < Farm.prototype.getAll().length; i++) {
        let farm = Farm.prototype.getAll()[i]
        if(user[farm.farm].number > 0) {
          if(userInteract[farm.farm].disco == true) {
            desc += `**${farm.name}** x ${user[farm.farm].number}\nCPS total: \`+ ${approx(hexToInt(farm.cps) * user[farm.farm].number, approxOpts)} (x ${user[farm.farm].multi})\`\nRevenus totaux: \`${approx(hexToInt(user[farm.farm].totalCash), approxOpts)} $\`\n\n`
          }
          if(user[farm.farm].number > 0 && userInteract[farm.farm].disco == false && userInteract[Farm.prototype.getAll()[i -1].farm].disco == true) {
            desc += `Ce joueur possède d'autres items que tu n'as pas encore découvert.`
          }
        }
      }

      if(desc == "") {
        desc = "Aucun objet"
      }

      interaction.reply({embeds: [new EmbedBuilder()
        .setTitle(`Stats de ${user.displayName}`)
        .setColor("#8c7be0")
        .setDescription(desc)
        .setThumbnail(bot.users.cache.get(user.id).avatarURL())
      ], ephemeral: true})

    }else if(interaction.customId.endsWith(interaction.user.id) && interaction.customId.startsWith("shop")) { //shop
      let user = listeProfiles.find(user => {
        if(interaction.message.embeds[0].title.includes(user.displayName)) {
          return true
        }
        return false
      })
      shop(user, interaction)
    }else if(interaction.customId.startsWith("succes")) { //succes
      let user = listeProfiles.find(user => {
        if(interaction.message.embeds[0].title.includes(user.displayName)) {
          return true
        }
        return false
      })

      let userInteract = listeProfiles.find(user => {
        if(interaction.member.id == user.id) {
          return true
        }
        return false
      })

      if(userInteract == undefined || user == undefined) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Il te faut un profil MadaIdle! Tape !play pour commencer.`).setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })

      succes(user, interaction, userInteract)
    }else if(interaction.customId.split(" ")[0] == "+1") {
      let user = listeProfiles.find(user => {
        if(interaction.user.id == user.id) {
          return true
        }
        return false
      })

      let type = Farm.prototype.getAll()[Farm.prototype.getAll().findIndex(farm => farm.farm == interaction.customId.split(" ")[1])]
      let cost = Math.round(((hexToInt(type.cost) * (1.15 ** (user[type.farm].number + parseInt(1)) - 1.15 ** user[type.farm].number)) / 0.15))

      if(cost > hexToInt(user.money)) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu n'as pas assez d'argent`).setDescription(`${approx(hexToInt(user.money), approxOpts)}/${approx(cost, approxOpts)}\n${progressbar.splitBar(cost, parseInt(hexToInt(user.money)), 20)}`).setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })

      user.totalItem ++
      user[type.farm].number += parseInt(1)
      user.money = intToHex(hexToInt(user.money) - cost)
      user.dispense = intToHex(parseInt(hexToInt(user.dispense)) + cost)

      if(type.farm == "kana") {
        acheteursKana.push(user)
      }
      
      interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${user.id}> a acheté **1 ${type.name}** pour **${approx(cost, approxOpts)}** <:aykicash:1031518293456076800>`).setColor(colorVert).setImage(type.img)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 5000);
      })


    }else if(interaction.customId.split(" ")[0] == "+10") {
      let user = listeProfiles.find(user => {
        if(interaction.user.id == user.id) {
          return true
        }
        return false
      })

      let type = Farm.prototype.getAll()[Farm.prototype.getAll().findIndex(farm => farm.farm == interaction.customId.split(" ")[1])]
      let cost = Math.round(((hexToInt(type.cost) * (1.15 ** (user[type.farm].number + parseInt(10)) - 1.15 ** user[type.farm].number)) / 0.15))

      if(cost > hexToInt(user.money)) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu n'as pas assez d'argent`).setDescription(`${approx(hexToInt(user.money), approxOpts)}/${approx(cost, approxOpts)}\n${progressbar.splitBar(cost, parseInt(hexToInt(user.money)), 20)}`).setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })

      user.totalItem += 10
      user[type.farm].number += parseInt(10)
      user.money = intToHex(hexToInt(user.money) - cost)
      user.dispense = intToHex(parseInt(hexToInt(user.dispense)) + cost)

      if(type.farm == "kana") {
        acheteursKana.push(user)
      }

      interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${user.id}> a acheté **10 ${type.name}** pour **${approx(cost, approxOpts)}** <:aykicash:1031518293456076800>`).setColor(colorVert).setImage(type.img)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 5000);
      })


    }else if(interaction.customId.split(" ")[0] == "+100") {
      let user = listeProfiles.find(user => {
        if(interaction.user.id == user.id) {
          return true
        }
        return false
      })

      let type = Farm.prototype.getAll()[Farm.prototype.getAll().findIndex(farm => farm.farm == interaction.customId.split(" ")[1])]
      let cost = Math.round(((hexToInt(type.cost) * (1.15 ** (user[type.farm].number + parseInt(100)) - 1.15 ** user[type.farm].number)) / 0.15))

      if(cost > hexToInt(user.money)) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu n'as pas assez d'argent`).setDescription(`${approx(hexToInt(user.money), approxOpts)}/${approx(cost, approxOpts)}\n${progressbar.splitBar(cost, parseInt(hexToInt(user.money)), 20)}`).setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })

      user.totalItem += 100
      user[type.farm].number += parseInt(100)
      user.money = intToHex(hexToInt(user.money) - cost)
      user.dispense = intToHex(parseInt(hexToInt(user.dispense)) + cost)

      if(type.farm == "kana") {
        acheteursKana.push(user)
      }

      interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${user.id}> a acheté **100 ${type.name}** pour **${approx(cost, approxOpts)}** <:aykicash:1031518293456076800>`).setColor(colorVert).setImage(type.img)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 5000);
      })
      

    }else if(interaction.customId.split(" ")[0] == "max") {
      let user = listeProfiles.find(user => {
        if(interaction.user.id == user.id) {
          return true
        }
        return false
      })

      let type = Farm.prototype.getAll()[Farm.prototype.getAll().findIndex(farm => farm.farm == interaction.customId.split(" ")[1])]

      let nombre = 0
      let bonus = 1
      
      nombre = -1
        let coutTotal = 0
        let currentPrice = ((1.15 ** user[type.farm].number) * hexToInt(type.cost)) * bonus
        do  {
            coutTotal += currentPrice;
            currentPrice *= 1.15;
            nombre++;

        }while (Math.round(coutTotal) <= parseInt(hexToInt(user.money)))

      let cost = Math.round(((hexToInt(type.cost) * (1.15 ** (user[type.farm].number + parseInt(nombre)) - 1.15 ** user[type.farm].number)) / 0.15) * bonus)

      if(cost == 0) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu n'as pas assez d'argent`).setColor(colorRouge)], fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })

      user.totalItem += nombre
      user[type.farm].number += parseInt(nombre)
      user.money = intToHex(hexToInt(user.money) - cost)
      user.dispense = intToHex(parseInt(hexToInt(user.dispense)) + cost)

      if(type.farm == "kana") {
        acheteursKana.push(user)
      }

      interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${user.id}> a acheté **${nombre} ${type.name}** pour **${approx(cost, approxOpts)}** <:aykicash:1031518293456076800>`).setColor(colorVert).setImage(type.img)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 5000);
      })
    }else if(interaction.customId == "claimThug") {
      let user = listeProfiles.find(user => {
        if(user.id == interaction.user.id) {
          return true
        }
        return false
      })
  
      if(user == undefined) {
        interaction.reply({embeds: [new EmbedBuilder()
          .setDescription(`<@${interaction.member.id}> Aucun profil associé avec ce compte.`)
          .setColor(colorRouge)], fetchReply: true}).then(sent => {
            setTimeout(() => {
              sent.delete()
            }, 3000);
          })    
        return
      }

      interaction.message.edit({embeds: [new EmbedBuilder().setTitle("Un Lucio Thug est apparu!").setDescription("Temps avant expiration: \`30sec\`\n\nClique sur **Attraper** pour instantanément gagner **15%** de tes aykicash actuels en bonus!").setColor("#e3a600").setImage("https://media.giphy.com/media/f4JAcG9w0YnFVy3wx6/giphy.gif")], fetchReply: true,
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId(`claimThug`)
          .setLabel("Attraper")
          .setStyle("Success") 
          .setDisabled(true)  
        )
      ]})

      users.push(user)

      setTimeout(() => {
        if(users.length == 0) return
        interaction.message.delete()
        users[0].lucioThug ++
        users[0].money = intToHex(Math.round(parseFloat(hexToInt(users[0].money) * 1.15)))
        interaction.channel.send({embeds: [new EmbedBuilder().setDescription(`<@${users[0].id}> A attrapé un **Lucio Thug**!\nIl lui rapporte **${approx(parseInt((hexToInt(users[0].money) * 1.15)) - hexToInt(users[0].money), approxOpts)}** <:aykicash:1031518293456076800>`).setColor(colorVert).setThumbnail("https://i.imgur.com/5xmeXyu.png")]})
        users = []
      }, 2000);

    }else if(interaction.customId == "claimRGB") {
      let user = listeProfiles.find(user => {
        if(user.id == interaction.user.id) {
          return true
        }
        return false
      })
  
      if(user == undefined) {
        interaction.reply({embeds: [new EmbedBuilder()
          .setDescription(`<@${interaction.member.id}> Aucun profil associé avec ce compte.`)
          .setColor(colorRouge)], fetchReply: true}).then(sent => {
            setTimeout(() => {
              sent.delete()
            }, 3000);
          })    
        return
      }

      interaction.message.edit({embeds: [new EmbedBuilder().setTitle("Un Lucio RGB est apparu!").setDescription("Temps avant expiration: \`45sec\`\n\nClique sur **Attraper** pour instantanément gagner **100%** de tes aykicash actuels en bonus!").setColor("#e3a600").setImage("https://media.giphy.com/media/lVV0vRmFjiajt0MaGo/giphy.gif")], fetchReply: true,
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId(`claimRGB`)
          .setLabel("Attraper")
          .setStyle("Success")
          .setDisabled(true)  
        )
      ]})

      users.push(user)

      setTimeout(() => {
        if(users.length == 0) return
        interaction.message.delete()
        users[0].lucioRGB ++
        users[0].money = intToHex(Math.round(parseFloat(hexToInt(users[0].money) * 2)))
        interaction.channel.send({embeds: [new EmbedBuilder().setDescription(`<@${users[0].id}> A attrapé un **Lucio RGB**!\nIl lui rapporte **${approx(parseInt((hexToInt(users[0].money) * 2)) - hexToInt(users[0].money), approxOpts)}** <:aykicash:1031518293456076800>`).setColor(colorVert).setThumbnail("https://i.imgur.com/veauIgY.png")]})
        users = []
      }, 2000);

    }else if(interaction.customId == "claimGold") {
      let user = listeProfiles.find(user => {
        if(user.id == interaction.user.id) {
          return true
        }
        return false
      })
  
      if(user == undefined) {
        interaction.reply({embeds: [new EmbedBuilder()
          .setDescription(`<@${interaction.member.id}> Aucun profil associé avec ce compte.`)
          .setColor(colorRouge)], fetchReply: true}).then(sent => {
            setTimeout(() => {
              sent.delete()
            }, 3000);
          })    
        return
      }

      interaction.message.edit({embeds: [new EmbedBuilder().setTitle("Un Lucio Doré est apparu!").setDescription("Temps avant expiration: \`1min\`\n\nClique sur **Attraper** pour instantanément gagner **777%** de tes aykicash actuels en bonus!").setColor("#e3a600").setImage("https://media.giphy.com/media/evLrefMs7zA8qfZfvF/giphy.gif")], fetchReply: true,
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId(`claimGold`)
          .setLabel("Attraper")
          .setStyle("Success")
          .setDisabled(true)
        )
      ]})

      users.push(user)
      
      setTimeout(() => {
        if(users.length == 0) return
        interaction.message.delete()
        users[0].lucioGold ++
        users[0].money = intToHex(Math.round(parseFloat(hexToInt(users[0].money) * 7.77)))
        interaction.channel.send({embeds: [new EmbedBuilder().setDescription(`<@${users[0].id}> A attrapé un **Lucio Doré**!!!!\nIl lui rapporte **${approx(parseInt((hexToInt(users[0].money) * 7.77)) - hexToInt(users[0].money), approxOpts)}** <:aykicash:1031518293456076800>`).setColor(colorVert).setThumbnail("https://i.imgur.com/tUUfGxu.png")]})
        users = []
      }, 2000);

    }else if(interaction.customId.startsWith("upgrades")) {
      let user = listeProfiles.find(user => {
        if(user.id == interaction.user.id) {
          return true
        }
        return false
      })
      let desc = ""
      let farmType = interaction.customId.split(" ")[1]

      let farm = Farm.prototype.getAll().find(farm => {
        if(farm.farm == farmType) {
          return true
        }
        return false
      })
      let up = []
      Upgrades(user).forEach(upgrade => {
        if(upgrade.farm == farmType) {
          up.push(upgrade)
          if(user.upgradeId.includes(upgrade.id)) {
            desc += `✅ **${upgrade.name}**\n**Effet: **\`${upgrade.type == "cps" ? "CPS x" : "coût /"} ${upgrade.up}\`\n\n`
          }else{
            if(upgrade.cond == true) {
              desc += `🟥 **${upgrade.name}** (${upgrade.number})\n**Effet: **\`${upgrade.type == "cps" ? "CPS x" : "Coût /"} ${upgrade.up}\`\n**Prix <:aykicash:1031518293456076800>:** \`${approx(hexToInt(upgrade.prix), approxOpts)}\`\n\n`
            }else{
              desc += `🔒 **${upgrade.name}** (${upgrade.number})\n**Effet: **\`${upgrade.type == "cps" ? "CPS x" : "Coût /"} ${upgrade.up}\`\n**Prix <:aykicash:1031518293456076800>:** \`${approx(hexToInt(upgrade.prix), approxOpts)}\`\n\n`
            }
          }
        }
      });

      interaction.reply({embeds: [new EmbedBuilder()
      .setTitle(`Améliorations pour ${interaction.customId.split(`upgrades ${interaction.customId.split(" ")[1]} `)[1]}`)
      .setColor(colorshop)
      .setThumbnail(farm.img)
      .setDescription(desc)
    ],ephemeral:  true,
      components: [
      new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId(`1 ${up[0].id}`)
          .setEmoji("1️⃣")
          .setStyle("Secondary"),

          new ButtonBuilder()
          .setCustomId(`2 ${up[1].id}`)
          .setEmoji("2️⃣")
          .setStyle("Secondary"),

          new ButtonBuilder()
          .setCustomId(`3 ${up[2].id}`)
          .setEmoji("3️⃣")
          .setStyle("Secondary"),

          new ButtonBuilder()
          .setCustomId(`4 ${up[3].id}`)
          .setEmoji("4️⃣")
          .setStyle("Secondary"),

          new ButtonBuilder()
          .setCustomId(`5 ${up[4].id}`)
          .setEmoji("5️⃣")
          .setStyle("Secondary")
        )
    ],})
    }else if(interaction.customId.startsWith("1") || interaction.customId.startsWith("2") || interaction.customId.startsWith("3") || interaction.customId.startsWith("4") || interaction.customId.startsWith("5")) {
      let user = listeProfiles.find(user => {
        if(user.id == interaction.user.id) {
          return true
        }
        return false
      })

      let upgrade = Upgrades(user).find(upgrade => {
        if(upgrade.id == interaction.customId.split(" ")[1]) {
          return true
        }
        return false
      })

      if(user.upgradeId.includes(parseInt(interaction.customId.split(" ")[1]))) {
        interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu as déjà cette amélioration!`).setColor(colorRouge)], fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })
        return
      }

      if(upgrade.cond == false || parseInt(hexToInt(upgrade.prix)) > parseInt(hexToInt(user.money))) return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu ne peux pas acheter cette amélioration!`).setColor(colorRouge)], fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })

      user.dispense = intToHex(parseInt(hexToInt(user.dispense)) + parseInt(hexToInt(upgrade.prix)))
      user.money = hexToInt(user.money) - (hexToInt(upgrade.prix))
      user.upgradeId.push(upgrade.id)
      if(upgrade.type == "cps") {
        user[upgrade.farm].multi = user[upgrade.farm].multi * upgrade.up
      }

      interaction.reply({content: ".", fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 100);
      })
      interaction.channel.send({embeds: [new EmbedBuilder().setDescription(`**${user.displayName}** a acheté l'amélioration **${upgrade.name}**!`).setColor(colorVert)]})
    }
    
    else{
      if(interaction.customId.startsWith("shop")) {
        return interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${interaction.member.id}> Tu ne peux pas voir la boutique des autres.`).setColor(colorRouge)], fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })
      }
    }
  }
})

bot.on("messageCreate", async (message) => {
  if(message.author.bot) return
  if(message.channel.type == "dm") return
  try {
    var taggerUser = message.mentions.members.first()
  } catch (error) {}

  if(!message.content.startsWith(prefix)) return

  let MessageArray = message.content.split(" ")
  let cmd = MessageArray[0].slice(prefix.length)
  let args = MessageArray.slice(1)

  if(cmd == "play") {
    for (let i = 0; i < listeProfiles.length; i++) {
      if(listeProfiles[i].id == message.member.id) {
        message.channel.send({embeds: [new EmbedBuilder()
        .setDescription(`<@${listeProfiles[i].id}> Tu es déjà inscrit! Utilise \`/p\` pour voir ton profil.`)
        .setColor(colorRouge)]})
        return
      }
    }

    message.react("👍")
    message.channel.send(`Bienvenue sur **IdleMada**! Utilise \`/p\` pour voir ton profil. Voici 100 Aykicash <:aykicash:1031518293456076800> pour commencer!`)
    listeProfiles.push(new Profil(message))
    fs.writeFile('./data/data.json', JSON.stringify(listeProfiles), "utf8" , function(err) {
      if(err) throw err;})
  }
})

bot.on("guildMemberUpdate", (oldMember, newMember) => {
  for (let i = 0; i < listeProfiles.length; i++) {
    if(listeProfiles[i].displayName == oldMember.displayName) {
      listeProfiles[i].displayName = newMember.displayName
    }
  }
})

bot.login(process.env.BOT_TOKEN)