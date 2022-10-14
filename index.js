const Discord = require("discord.js")
const bot = new Discord.Client({intents: 3276799})
const Profil = require('./src/profil')
const {EmbedBuilder, ActionRow, SelectMenuBuilder} = require('discord.js')
const fs = require("fs")
var approx = require('approximate-number');

require("dotenv").config()

let prefix = "$"
let colorRouge = "#ED4245"
let colorVert = "#57F287"   
let colorTurq = "#00ffdd"    
let colorJaune = "#F1C40F"
let infoChan = "828518673244618752"
let liste = ["un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix"]
let listeProfiles = []
let lastProfilMsg = null
let lastChartMsg = null
let lastChart = null
let lastProfil = null
let reactionPrestige = null
let prixPres = 0
let numPrestige = 0
let basePrestige = 1000000
let augPrestige = 1.07
let gainPrestige = 1.02
let variables = []
let mapAchievements = []

fs.readFile('./data/data.json', "utf8", (err, JsonString) => {
  if(err) {
    console.log(err)
  }else{
    listeProfiles = JSON.parse(JsonString)
  }
})

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function intToHex(int) {
  return (int).toString(16)
}

function hexToInt(hexa) {
  let hex = (hexa).toString(16)
  if (hex.length % 2) { hex = '0' + hex; }
  let bn = BigInt('0x' + hex);
  return bn.toString(10); 
}

function msgProfil(profil, prof) {
  let embedprofil = new EmbedBuilder()
  .setTitle(`Profil de ${prof.displayName}\n**${profil.online ? "En ligne 🟢" : "Hors ligne 🔴"}**  ||  Prestige ${numberWithCommas(profil.prestige)} 💎` )
  .setThumbnail(prof.user.avatarURL())
  .addFields(
    {name: "Argent 💰", value: `${approx(parseInt(hexToInt(profil.money)), {separator: " ", min10k: true, capital: true, decimal: 2})} $`, inline: false},
    {name: "Revenus 💸",value: `${approx((profil.cps * (profil.online ? 1 : 0.05)), {separator: " ", min10k: true, capital: true, decimal: 2})} $ / sec\n (${approx((profil.cps * (gainPrestige ** profil.prestige)) * (profil.online ? 1 : 0.05) , {separator: " ", min10k: true, capital: true, decimal: 2})} $) (+${approx(((gainPrestige ** profil.prestige * 100) - 100) , {separator: " ", min10k: true, capital: true, decimal: profil.cps > 10000 ? 0 : 2})}%💎)`, inline: false},
    {name: "Argent dépensé 📉", value: `${approx(parseInt(hexToInt(profil.dispense, {separator: " ", min10k: true, capital: true, decimal: 2})))} $`, inline: false}
  )
  .setColor(colorTurq)

  for (let a = 0; a < liste.length; a++) {
    let bonus = 0
    if(profil[liste[a]].number > 0) {
      for (let b = 0; b < upgrade.prototype.getAll(profil).length; b++) {
        if(upgrade.prototype.getAll(profil)[b].type == liste[a]) {
          if(upgrade.prototype.getAll(profil)[b].bonusType == "cost") {
            if(profil.upgradeId == undefined) break
            if(profil.upgradeId.includes(upgrade.prototype.getAll(profil)[b].id)) {
              bonus = upgrade.prototype.getAll(profil)[b].data.bonus
            }
          }
        }
      }
      embedprofil.addField(roles.prototype.getAll(profil)[a].name, "Prix: " +`\`${approx(hexToInt(Math.round(((hexToInt(profil[liste[a]].data.cost) * (1.15 ** (profil[liste[a]].number + 1) - 1.15 ** profil[liste[a]].number)) / 0.15) * (bonus > 0 ? bonus : 1 ))) , {separator: " ", min10k: true, capital: true, decimal: 2} )} $${bonus > 0 ? ` (${bonus * 100} %)` : ""}\`\n` + "Revenus: " + `\`+${approx(profil[liste[a]].data.profit, {separator: " ", min10k: true, capital: true, decimal: 2})}/sec\`\n` + "Tu possède: " + `\`${numberWithCommas(profil[liste[a]].number)}\`\n` + `Cps: \`+${approx((profil[liste[a]].number * profil[liste[a]].data.profit).toFixed(1), {separator: " ", min10k: true, capital: true, decimal: 2})}${profil[liste[a]].multi > 1 ? ` (x${profil[liste[a]].multi})` : ""}\`` )
    }
    if(profil[liste[a]].number > 0 && profil[liste[a + 1]] != undefined) {
      if(profil[liste[a]].number > 0 && profil[liste[a + 1]].number == 0) {
        embedprofil.addField("===Prochain objet===", `**${roles.prototype.getAll()[a + 1].name}**\nPrix: \`${approx(hexToInt(profil[liste[a + 1]].data.cost), {separator: " ", min10k: true, capital: true, decimal: 2})}$\`\n Cps: \`+${approx(profil[liste[a + 1]].data.profit, {separator: " ", min10k: true, capital: true, decimal: 2})}\``)
      }
    }
  }
  return embedprofil
}

function deleteMsg(sent, message) {
  sent.delete();
  setTimeout(function () {
    message.delete()
  }, 6000);
}

bot.on("ready", async () => {
  console.log("Bot Online")
  console.log(new Date().toLocaleString())
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

  if(cmd == "test") {
    message.channel.send("hey! <:spec:830121185885945880>")
  }
  
  if(cmd == "play") {
    for (let i = 0; i < listeProfiles.length; i++) {
      if(listeProfiles[i].name == message.member.displayName) {
        message.channel.send({embeds: [new EmbedBuilder()
        .setDescription("Tu es déjà inscrit")]})
        return
      }
    }
    
    message.react("👍")
    listeProfiles.push(new Profil(message, "F", "0", 0, [], []))
    console.log(listeProfiles)
    fs.writeFile('./data/data.json', JSON.stringify(listeProfiles), "utf8" , function(err) {
      if(err) throw err;})
  }

  else if(cmd == "profil" || cmd == "p") {
    fs.readFile('./data/data.json', "utf8", (err, JsonString) => {
      if(err) {
        console.log(err)
      }else{
        listeProfiles = JSON.parse(JsonString)
      }
    })
    let profil = message.member
    if(taggerUser != undefined) {
      profil = taggerUser
    }

    for (let i = 0; i < listeProfiles.length; i++) {
      if(listeProfiles[i].id == profil.id) {
        message.channel.send({embeds: [msgProfil(listeProfiles[i], profil)]}).then(sent => {
          lastProfilMsg = sent
        })
        lastProfil = {prm: listeProfiles[i].name, dex: profil}
        return
        
      }
      if(i + 1 == listeProfiles.length) return message.channel.send({embeds: new EmbedBuilder()
        .setDescription("Aucun profil associé avec ce compte")
        .setColor(colorRouge)}).then((sent) => {deleteMsg(sent, message)})
    }
  }
})
 
bot.login(process.env.BOT_TOKEN)