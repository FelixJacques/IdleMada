const Discord = require("discord.js")
const bot = new Discord.Client({intents: 3276799})
const Profil = require('./src/profil')
const Farm = require('./src/farm/farm')
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require('discord.js')
const fs = require("fs")
var approx = require('approximate-number');

require("dotenv").config()

let prefix = "$"
let listeProfiles = []
let colorRouge = "#ED4245"
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
          desc += `**${farm.name}**\n\`${approx(hexToInt(farm.cost), approxOpts)}\` <:aykicash:1031462420025180160>\n`
        }
        if(user[listeFarm[i].farm].disco == false && user[listeFarm[i - 1].farm].disco == true) {
          desc += `*Débloqué prochainement*\n\`???\`\n`
        }
      }

      embedShop.setDescription(desc)

      interaction.reply({embeds: [embedShop], ephemeral: true})
}

function upgrades(user, interaction) {
  let embedUp = new EmbedBuilder()
      .setTitle(`Améliorations de ${user.displayName}`)
      .setColor(colorshop)

  interaction.reply({embeds: [embedUp], ephemeral: true})
}

function updateProfil(profil) {
  let embedProfil = new EmbedBuilder()
  .setTitle(`Profil de ${profil.displayName}  ||  *Prestige ${profil.prestige}* 💎`)
  .setThumbnail(`https://cdn.discordapp.com/avatars/${profil.id}/${lastProfil.dex.user.avatar}.png?size=256`)
  .addFields(
    {name: `AykiCash <:aykicash:1031462420025180160> `, value: `\`${approx(hexToInt(profil.money), approxOpts)}\``},
    {name: `Revenus 📈`, value: `\`+ ${approx(hexToInt(profil.cps), approxOpts)} / sec\``},
    {name: `Meilleur item ⭐`, value: "Little Genji"}
  )
  .setColor(colorTurq)

  return embedProfil
}

function profilCmd(user, interaction) {
  let embedProfil = new EmbedBuilder()
  .setTitle(`Profil de ${user.displayName}  ||  *Prestige ${user.prestige}* 💎`)
  .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${interaction.options._hoistedOptions.length == 1 ? interaction.options._hoistedOptions[0].user.avatar : interaction.member.user.avatar}.png?size=256`)
  .addFields(
    {name: `AykiCash <:aykicash:1031462420025180160> `, value: `\`${approx(hexToInt(user.money), approxOpts)}\``},
    {name: `Revenus 📈`, value: `\`+ ${approx(hexToInt(user.cps), approxOpts)} / sec\``},
    {name: `Meilleur item ⭐`, value: "Little Genji"}
  )
  .setColor(colorTurq)
  
  return embedProfil
}

setInterval(() => {
  go ++
  listeProfiles.forEach(profil => {
    let profit = parseFloat(((hexToInt(Farm.prototype.genji().cps) * profil.genji.multi) * profil.genji.number) + ((hexToInt(Farm.prototype.health().cps) * profil.health.multi) * profil.health.number) + ((hexToInt(Farm.prototype.kana().cps) * profil.kana.multi) * profil.kana.number)
    + ((hexToInt(Farm.prototype.pizza().cps) * profil.pizza.multi) * profil.pizza.number) + ((hexToInt(Farm.prototype.levi().cps) * profil.levi.multi) * profil.levi.number) + ((hexToInt(Farm.prototype.bot().cps) * profil.bot.multi) * profil.bot.number) + ((hexToInt(Farm.prototype.helico().cps) * profil.helico.multi) * profil.helico.number)
    + ((hexToInt(Farm.prototype.tatayeah().cps) * profil.tatayeah.multi) * profil.tatayeah.number) + ((hexToInt(Farm.prototype.aykicat().cps) * profil.aykicat.multi) * profil.aykicat.number) + ((hexToInt(Farm.prototype.bombe().cps) * profil.bombe.multi) * profil.bombe.number)
    + ((hexToInt(Farm.prototype.belugods().cps) * profil.belugod.multi) * profil.belugod.number) + ((hexToInt(Farm.prototype.widow().cps) * profil.widow.multi) * profil.widow.number) + ((hexToInt(Farm.prototype.nexus().cps) * profil.nexus.multi) * profil.nexus.number) + ((hexToInt(Farm.prototype.shulker().cps) * profil.shulker.multi) * profil.shulker.number)
    + ((hexToInt(Farm.prototype.academy().cps) * profil.academy.multi) * profil.academy.number)).toFixed(0)

    profil.cps = intToHex(profit)
    profil.totalMoney = intToHex(BigInt(hexToInt(profil.money)) + BigInt(hexToInt(profil.dispense)))
    profil.money = intToHex(BigInt(hexToInt(profil.money)) < 1000000 ? intToHex(parseInt(hexToInt(profil.money)) + parseInt((gainPrestige ** profil.prestige) * parseInt(hexToInt(profil.cps)))) : intToHex(BigInt(hexToInt(profil.money)) + BigInt(Math.ceil((parseInt(gainPrestige ** profil.prestige)) * (BigInt(hexToInt(profil.cps)))))))

    profil.genji.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.genji().cps) * profil.genji.multi) * profil.genji.number) + BigInt(hexToInt(profil.genji.totalCash)))
    profil.health.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.health().cps) * profil.health.multi) * profil.health.number) + BigInt(hexToInt(profil.health.totalCash)))
    profil.kana.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.kana().cps) * profil.kana.multi) * profil.kana.number) + BigInt(hexToInt(profil.kana.totalCash)))
    profil.pizza.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.pizza().cps) * profil.pizza.multi) * profil.pizza.number) + BigInt(hexToInt(profil.pizza.totalCash)))
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
    profil.academy.totalCash = intToHex(BigInt((hexToInt(Farm.prototype.academy().cps) * profil.academy.multi) * profil.academy.number) + BigInt(hexToInt(profil.academy.totalCash)))

    if(lastProfil && go >= 5) {
      lasMsgProfil.edit({embeds: [updateProfil(lastProfil.prm)]})      
      go = 0
    }
  })

  fs.writeFileSync('./data/data.json', JSON.stringify(listeProfiles), "utf8" , function(err) {
    if(err) throw err;})

  fs.writeFileSync('./data/data2.json', JSON.stringify(listeProfiles), "utf8" , function(err) {
    if(err) throw err;})
}, 1000);

bot.on("ready", async () => {
  console.log("Bot Online")
  console.log(new Date().toLocaleString())

  const guildId = "828485314304933931"
  const guild = bot.guilds.cache.get(guildId)
  let commands

  if(guild) {
    commands = guild.commands
  }else{
    commands = bot.application.commands
  }

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
    name: "shop",
    description: "Ouvre l'interface de la boutique"
  })

  commands.create({
    name: "up",
    description: "Ouvre l'interface des améliorations"
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
        .setColor(colorRouge)]})
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
            .setCustomId(`upgrade-${interaction.user.id}`)
            .setLabel('⬆️ Améliorations')
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
        .setColor(colorRouge)],ephemeral: true})
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
        .setColor(colorRouge)],ephemeral: true})
      return
    }else{
      upgrades(user, interaction)
    }
  }

  if(interaction.isButton()) {
    if(interaction.customId == "stats") { //stats
      let user = listeProfiles.find(user => {
        if(interaction.message.embeds[0].title.includes(user.displayName)) {
          return true
        }
        return false
      })

      interaction.reply({embeds: [new EmbedBuilder()
        .setTitle(`Stats de ${user.displayName}`)
        .setColor("#2168db")
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
    }else if(interaction.customId.endsWith(interaction.user.id) && interaction.customId.startsWith("upgrade")) { //upgrades
      let user = listeProfiles.find(user => {
        if(interaction.message.embeds[0].title.includes(user.displayName)) {
          return true
        }
        return false
      })
      upgrades(user, interaction)
    }else{
      if(interaction.customId.startsWith("shop")) {
        return interaction.reply({content: "Tu ne peux pas voir la boutique des autres.", ephemeral: true})
      }else if(interaction.customId.startsWith("upgrade")) {
        return interaction.reply({content: "Tu ne peux pas voir les améliorations des autres.", ephemeral: true})
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