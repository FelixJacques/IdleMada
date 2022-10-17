const Discord = require("discord.js")
const bot = new Discord.Client({intents: 3276799})
const Profil = require('./src/profil')
const {EmbedBuilder} = require('discord.js')
const fs = require("fs")
var approx = require('approximate-number');

require("dotenv").config()

let prefix = "$"
let listeProfiles = []
let colorRouge = "#ED4245"
let colorTurq = "#00ffdd"
let colorshop = "#4e46bd"
let colorgold = "#ffdd00"
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

function profil(user, interaction) {
  let embedProfil = new EmbedBuilder()
  .setTitle(`Profil de ${user.displayName}  ||  *Prestige ${user.prestige}* 💎`)
  .setThumbnail(`https://cdn.discordapp.com/avatars/${user.id}/${interaction.options._hoistedOptions.length == 1 ? interaction.options._hoistedOptions[0].user.avatar : interaction.member.user.avatar}.png?size=256`)
  .addFields(
    {name: `AykiCash <:aykicash:1031462420025180160> `, value: `\`${approx(hexToInt(user.money), approxOpts)}\``},
    {name: `Revenus 📈`, value: `\`+ ${approx(hexToInt("78"), approxOpts)} / sec\``},
    {name: `Meilleur item ⭐`, value: "Little Genji"}
  )
  .setColor(colorTurq)
  
  return embedProfil
}

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
    description: "Affiche ton profil",
    options: [
      {
        name: "user",
        description: "Voir le profil d'un autre joueur",
        required: false,
        type: Discord.ApplicationCommandOptionType.User
      }
    ]
  })
})

bot.on('interactionCreate', async (interaction) => {
  if(!interaction.isCommand()) {
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
      interaction.reply("\u200b")
      setTimeout(() => {
        interaction.channel.send({embeds: [new EmbedBuilder()
          .setDescription("Aucun profil associé avec ce compte.")
          .setColor(colorRouge)]})
      }, 500);
      return
    }
    
    interaction.reply("\u200b")
    setTimeout(() => {
      interaction.channel.send({embeds: [profil(user, interaction)]})
    }, 500);
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

bot.login(process.env.BOT_TOKEN)