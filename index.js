const Discord = require("discord.js")
const bot = new Discord.Client({intents: 3276799})
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require('discord.js')
const Pagination = require('customizable-discordjs-pagination')
const fs = require("fs")
const { DateTime } = require("luxon")
const progressbar = require('string-progressbar');
var approx = require('approximate-number');

const Profil = require('./src/profil')
const Farm = require('./src/farm/farm')
const achiv = require('./src/succes')

require("dotenv").config()

let test = true
if(test == true) {
  var guildId = "828485314304933931"
  var channelId = "828518673244618752"
}else{
  var guildId = "267769973709996032"
  var channelId = ""
}
let acheteursKana = []
let acheteursEater = []
let prefix = "$"
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
      let desc = ""
      let farm = null
      for (let i = 0; i < listeFarm.length; i++) {
        farm = listeFarm[i]
        if(user[farm.farm].disco == true) {
          desc += `**${farm.name}**\n\`${approx(hexToInt(farm.cost), approxOpts)}\` <:aykicash:1031518293456076800>\n\n`
        }
        if(user[listeFarm[i].farm].disco == false && user[listeFarm[i - 1].farm].disco == true) {
          desc += `*Débloqué prochainement*\n\`???\`\n`
        }
      }

      embedShop.setDescription(desc)

      interaction.reply({embeds: [embedShop], ephemeral: true})
}

function succes(user, interaction) {

  let page1 = new EmbedBuilder()
  .setTitle(`Succès de ${user.displayName}`)
  .setColor(colorgold)
  .setThumbnail(user.avatar)
  .setDescription(`Obtenus: \`${user.achivementsId.length} / ${achiv(user).length + 20}\`\n\nScore: \`${user.succScore}\``)

  let listeAch = []
  achiv(user).forEach(ach => {
    if(user[ach.farm].disco == true) {
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

    if(user[specialAchId[a].type].disco == true) {
      if(user.achivementsId.includes(specialAchId[a].id)) {
        has = true
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

  const buttons = [
    {emoji: '⬅', style: Discord.ButtonStyle.Primary},
    {emoji: '➡', style: Discord.ButtonStyle.Primary},
  ]

  //const selectMenu = {enable: true, pageOnly: true, placeholder: "Page"}

  new Pagination().setCommand(interaction).setPages(pages).setButtons(buttons)/*.setSelectMenu(selectMenu)*/.send()

}

function profilCmd(user, interaction = undefined) {
  let listeFarm = Farm.prototype.getAll()
  let lastItem = null
  let nouvelItem = null
  for (let i = 0; i < listeFarm.length; i++) {
    if(user[listeFarm[i].farm].number == 0 && i == 0) {
      lastItem = "Aucun Item"
      break
    }else{
      if(user[listeFarm[i].farm].number == 0 && user[listeFarm[i - 1].farm].number > 0) {
        lastItem = listeFarm[i - 1].name
        break
      }
    }

    if(lastItem == null) {
      lastItem = "Aucun Item"
    }
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
    {name: `Revenus 📈`, value: `\`+ ${approx(hexToInt(user.cps), approxOpts)} / sec\``},
    {name: `Meilleur item ⭐`, value: `||${lastItem}||\n${nouvelItem ? "*Nouvel item disponible !*" : ""}`}
  )
  .setColor(colorTurq)
  
  return embedProfil
}

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
    profil.totalMoney = intToHex(BigInt(hexToInt(profil.money)) + BigInt(hexToInt(profil.dispense)))
    profil.money = intToHex(BigInt(hexToInt(profil.money)) < 1000000 ? intToHex(parseInt(hexToInt(profil.money)) + parseInt((gainPrestige ** profil.prestige) * parseInt(hexToInt(profil.cps)))) : intToHex(BigInt(hexToInt(profil.money)) + BigInt(Math.ceil((parseInt(gainPrestige ** profil.prestige)) * (hexToInt(profil.cps))))))

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

    if(lastProfil && go >= 5) {
      lasMsgProfil.edit({embeds: [profilCmd(lastProfil.prm)]})      
      go = 0
    }

    Farm.prototype.getAll().forEach(farm => {
      if((hexToInt(farm.cost) * 0.8 < hexToInt(profil.money)) && (profil[farm.farm].disco == false)) {
        profil[farm.farm].disco = true
        console.log(`Découvert ${farm.farm}`)
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

  const guild = bot.guilds.cache.get(guildId)
  let commands

  if(guild) {
    commands = guild.commands
  }else{
    commands = bot.application.commands
  }

  /*guild.commands.fetch("1032172194454839306").then(command => {
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
    name: "item",
    description: "Ouvre l'interface d'un objet",
    options : [
      {
        name: "objet",
        description: "Nom de l'object a afficher",
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
    name: "up",
    description: "Ouvre l'interface des améliorations"
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

  commands.create({
    name: "buy",
    description: "Achète les objets de la boutique",
    options: [
      {
        name: "objet",
        description: "Nom de l'object a acheter",
        required: true,
        type: Discord.ApplicationCommandOptionType.String
      },{
        name: "nombre",
        description: "Nombre d'object a acheter",
        required: false,
        type: Discord.ApplicationCommandOptionType.String
      }
    ]
  })
})

bot.on('interactionCreate', async (interaction) => {
  if(!interaction.isCommand() && !interaction.isButton()) {
    return
  }
  const { commandName, options } = interaction

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
        .setDescription("Aucun profil associé avec ce compte.")
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
            .setCustomId('stats')
            .setLabel('📊 Statistiques')
            .setStyle('Secondary')
          )
        ],
        fetchReply: true
      }).then(sent => {
        lasMsgProfil = sent
        lastProfil = {prm: user, dex: interaction.options._hoistedOptions[0]}
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
        .setDescription("Aucun profil associé avec ce compte.")
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
      console.log("allo")
      if(!user.achivementsId.includes(51)) {
        user.achivementsId.push(51)
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
      interaction.reply({embeds: [new EmbedBuilder().setTitle("Code Inconnu").setColor(colorRouge)], fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })    
    }
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
        .setDescription("Aucun profil associé avec ce compte.")
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

  if(commandName == "up") {
    let user = listeProfiles.find(user => {
      if(user.id == interaction.user.id) {
        return true
      }
      return false
    })

    if(user == undefined) {
      interaction.reply({embeds: [new EmbedBuilder()
        .setDescription("Aucun profil associé avec ce compte.")
        .setColor(colorRouge)],ephemeral: false, fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })    
      return
    }else{
      succes(user, interaction)
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
        .setDescription("Aucun profil associé avec ce compte.")
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
      case "gobelet de pappusu" :
      case "goblet de pappusu" :
      case "gobelet papusu" :
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
        type = Farm.prototype.helico()
        break

      case "tatayeah":
      case "souris":
        type = Farm.prototype.tatayeah()
        break

      case "aykicat":
        type = Farm.prototype.aykicat()
        break

      case "bombe":
      case "hiesko":
        type = Farm.prototype.bombe()
        break

      case "belugods":
        type = Farm.prototype.belugods()
        break

      case "widow":
      case "tak":
        type = Farm.prototype.widow()
        break

      case "nexus":
        type = Farm.prototype.nexus()
        break
      
      case "shulker":
        type = Farm.prototype.shulker()
        break

      case "academy":
      case "mada":
        type = Farm.prototype.academy()
        break
    }
    if(type == undefined || user[type.farm].disco == false) return interaction.reply({embeds: [new EmbedBuilder().setTitle("Object Inconnu").setColor(colorRouge)], fetchReply: true}).then(sent => {
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
          .setCustomId("upgrades")
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
        .setDescription("Aucun profil associé avec ce compte.")
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

        interaction.reply({embeds: [new EmbedBuilder().setTitle("Le nombre d'object doit être entre 0 et 1000").setColor(colorRouge),], ephemeral: false, fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })    
        return

      }else if(interaction.options._hoistedOptions[1].value == "max") {
        max = true

      }else if(isNaN(interaction.options._hoistedOptions[1].value)){
        interaction.reply({embeds: [new EmbedBuilder().setTitle("Argument impossible").setColor(colorRouge),], ephemeral: false, fetchReply: true}).then(sent => {
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
        type = Farm.prototype.health()
        break

      case "kana":
      case "kanasheah":
        type = Farm.prototype.kana()
        break

      case "eater":
        type = Farm.prototype.eater()
        break

      case "levi":
      case "smol":
        type = Farm.prototype.levi()
        break
      case "tatayeah":
      case "souris":
        type = Farm.prototype.tatayeah()
        break

      case "aykicat":
        type = Farm.prototype.aykicat()
        break

      case "bombe":
      case "hiesco":
        type = Farm.prototype.bombe()
        break

      case "belugods":
        type = Farm.prototype.belugods()
        break

      case "widow":
      case "tak":
        type = Farm.prototype.widow()
        break

      case "nexus":
        type = Farm.prototype.nexus()
        break
      
      case "shulker":
        type = Farm.prototype.shulker()
        break

      case "academy":
      case "mada":
        type = Farm.prototype.academy()
        break

      case "bot":
      case "overstats":
        type = Farm.prototype.bot()
        break

      case "helico":
      case "pandoux":
        type = Farm.prototype.helico()
        break
    }

 

    if(type == undefined || user[type.farm].disco == false) return interaction.reply({fetchReply: true, embeds: [new EmbedBuilder().setTitle("Objet Inconnu").setColor(colorRouge)]}).then(sent => {
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

      if(cost == 0) return interaction.reply({embeds: [new EmbedBuilder().setTitle("Tu n'as pas asser d'argent").setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })    

      if(cost > hexToInt(user.money)) return interaction.reply({embeds: [new EmbedBuilder().setTitle("Tu n'as pas asser d'argent").setDescription(`${approx(hexToInt(user.money), approxOpts)}/${approx(cost, approxOpts)}\n${progressbar.splitBar(cost, parseInt(hexToInt(user.money)), 20)}`).setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
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
    if(interaction.customId == "stats") { //stats
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

      if(userInteract == undefined || user == undefined) return interaction.reply({embeds: [new EmbedBuilder().setTitle("Il te faut un profil MadaIdle! Tape /play pour commencer.").setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })
      let desc = `**Argent Total:** \`${approx(hexToInt(user.totalMoney), approxOpts)}\` <:aykicash:1031518293456076800>\n\n`

      for (let i = 0; i < Farm.prototype.getAll().length; i++) {
        let farm = Farm.prototype.getAll()[i]
        if(user[farm.farm].number > 0) {
          if(userInteract[farm.farm].disco == true) {
            desc += `**${farm.name}** x ${user[farm.farm].number}\nCPS total: \`+ ${approx(hexToInt(farm.cps) * user[farm.farm].number, approxOpts)}\`\nRevenus totaux: \`${approx(hexToInt(user[farm.farm].totalCash), approxOpts)} $\`\n\n`
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
    }else if(interaction.customId.endsWith(interaction.user.id) && interaction.customId.startsWith("succes")) { //succes
      let user = listeProfiles.find(user => {
        if(interaction.message.embeds[0].title.includes(user.displayName)) {
          return true
        }
        return false
      })
      succes(user, interaction)
    }else if(interaction.customId.split(" ")[0] == "+1") {
      let user = listeProfiles.find(user => {
        if(interaction.user.id == user.id) {
          return true
        }
        return false
      })

      let type = Farm.prototype.getAll()[Farm.prototype.getAll().findIndex(farm => farm.farm == interaction.customId.split(" ")[1])]
      let cost = Math.round(((hexToInt(type.cost) * (1.15 ** (user[type.farm].number + parseInt(1)) - 1.15 ** user[type.farm].number)) / 0.15) * user[type.farm].multi)

      if(cost > hexToInt(user.money)) return interaction.reply({embeds: [new EmbedBuilder().setTitle("Tu n'as pas asser d'argent").setDescription(`${approx(hexToInt(user.money), approxOpts)}/${approx(cost, approxOpts)}\n${progressbar.splitBar(cost, parseInt(hexToInt(user.money)), 20)}`).setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })
      user[type.farm].number += parseInt(1)
      user.money = intToHex(hexToInt(user.money) - cost)
      user.dispense = intToHex(parseInt(hexToInt(user.dispense) + cost))

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
      let cost = Math.round(((hexToInt(type.cost) * (1.15 ** (user[type.farm].number + parseInt(10)) - 1.15 ** user[type.farm].number)) / 0.15) * user[type.farm].multi)

      if(cost > hexToInt(user.money)) return interaction.reply({embeds: [new EmbedBuilder().setTitle("Tu n'as pas asser d'argent").setDescription(`${approx(hexToInt(user.money), approxOpts)}/${approx(cost, approxOpts)}\n${progressbar.splitBar(cost, parseInt(hexToInt(user.money)), 20)}`).setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })
      user[type.farm].number += parseInt(10)
      user.money = intToHex(hexToInt(user.money) - cost)
      user.dispense = intToHex(parseInt(hexToInt(user.dispense) + cost))

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
      let cost = Math.round(((hexToInt(type.cost) * (1.15 ** (user[type.farm].number + parseInt(100)) - 1.15 ** user[type.farm].number)) / 0.15) * user[type.farm].multi)

      if(cost > hexToInt(user.money)) return interaction.reply({embeds: [new EmbedBuilder().setTitle("Tu n'as pas asser d'argent").setDescription(`${approx(hexToInt(user.money), approxOpts)}/${approx(cost, approxOpts)}\n${progressbar.splitBar(cost, parseInt(hexToInt(user.money)), 20)}`).setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })
      user[type.farm].number += parseInt(100)
      user.money = intToHex(hexToInt(user.money) - cost)
      user.dispense = intToHex(parseInt(hexToInt(user.dispense) + cost))

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

      if(cost == 0) return interaction.reply({embeds: [new EmbedBuilder().setTitle("Tu n'as pas asser d'argent").setColor(colorRouge)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 3000);
      })

      user[type.farm].number += parseInt(nombre)
      user.money = intToHex(hexToInt(user.money) - cost)
      user.dispense = intToHex(parseInt(hexToInt(user.dispense) + cost))

      if(type.farm == "kana") {
        acheteursKana.push(user)
      }

      interaction.reply({embeds: [new EmbedBuilder().setDescription(`<@${user.id}> a acheté **${nombre} ${type.name}** pour **${approx(cost, approxOpts)}** <:aykicash:1031518293456076800>`).setColor(colorVert).setImage(type.img)], ephemeral: false, fetchReply: true}).then(sent => {
        setTimeout(() => {
          sent.delete()
        }, 5000);
      })
    }
    
    
    else{
      if(interaction.customId.startsWith("shop")) {
        return interaction.reply({embeds: [new EmbedBuilder().setTitle("Tu ne peux pas voir la boutique des autres.").setColor(colorRouge)], fetchReply: true}).then(sent => {
          setTimeout(() => {
            sent.delete()
          }, 3000);
        })
      }else if(interaction.customId.startsWith("succes")) {
        return interaction.reply({embeds: [new EmbedBuilder().setTitle("Tu ne peux pas voir les succès des autres.").setColor(colorRouge)], fetchReply: true}).then(sent => {
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
        .setDescription(`Tu es déja inscrit! Fait **${prefix}profil**`)
        .setColor(colorRouge)]})
        return
      }
    }

    message.react("👍")
    listeProfiles.push(new Profil(message))
    console.log(listeProfiles)
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