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

fs.readFile('./data/data.json', "utf8", (err, JsonString) => {
  if(err) {
    console.log(err)
  }else{
    listeProfiles = JSON.parse(JsonString)
  }
})

function profil(player) {
  let embedProfil = new EmbedBuilder()
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
    description: "Affiche ton profil"
  })
})

bot.on('interactionCreate', async (interaction) => {
  if(!interaction.isCommand()) {
    return
  }

  const { commandName, options } = interaction

  if(commandName == "p") {
    interaction.reply({
      content: "Test",
      ephemeral: false
    })
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

  if(cmd == "profil" || cmd == "p") {

  }
})

bot.login(process.env.BOT_TOKEN)