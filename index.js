const Discord = require("discord.js")
const bot = new Discord.Client({intents: 3276799})
const Profil = require('./src/profil')
const {EmbedBuilder, ActionRow, SelectMenuBuilder} = require('discord.js')
const fs = require("fs")
var approx = require('approximate-number');

require("dotenv").config()

let prefix = "$"

bot.on("ready", async () => {
  console.log("Bot Online")
  console.log(new Date().toLocaleString())
})

bot.on("messageCreate", async (message) => {
  
})
 
bot.login(process.env.BOT_TOKEN)