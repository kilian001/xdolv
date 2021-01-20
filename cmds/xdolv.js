const Discord = require("discord.js");
const colours = require("../colours.json")

module.exports.run = async (bot, message, args) => {

    let aEmbed = new Discord.MessageEmbed()
        .setColor(colours.aqua)
        .setTitle("Information du serveur")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Nom du serveur**", `${message.guild.name}`, true)
        .addField("**Propriétaire du serveur**", `${message.guild.owner}`, true)
        .addField("**Nombre de membre**", `${message.guild.memberCount}`)
        .setFooter(`XDOLV`, bot.user.displayAvatarURL);
        message.channel.send(aEmbed)


}

module.exports.help = {
    name: "xdolv"
}