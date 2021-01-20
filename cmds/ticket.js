const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    message.delete()
    if(!message.member.hasPermission("ADMINISTRATOR")) return;

    let OpenTicket = new Discord.MessageEmbed()
    .setDescription('Cliquez sur :`📑` pour ouvrir un ticket !')

    let myGuild = bot.guilds.cache.get('800314758040911902')
    let SendChannel = myGuild.channels.cache.get('800811368311685120')
    SendChannel.send(OpenTicket)
    .then(msg => msg.react('📑'))

}


module.exports.help = {
    name: "openticket"
}