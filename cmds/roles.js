const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    message.delete()

    let RolesEmbed = new Discord.MessageEmbed()
    .setTitle("XDOLV")
    .setColor("#2ac075")
    .setDescription("<:au:801132304000876544> **- Among US**\n" +
    "<:rl:801132817005543474> **- Rocket League**"
    )

    message.channel.send(RolesEmbed).then(async msg => {
        msg.react("801132304000876544")
        msg.react("801132817005543474")
        })

}

module.exports.help = {
    name: "roles"
}
