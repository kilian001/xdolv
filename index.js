const Discord = require("discord.js");
const bot = new Discord.Client();
const colours = require("./colours.json");
const config = require("./config.json");
const fs = require("fs")

bot.commands = new Discord.Collection();

bot.login(process.env.TOKEN);

fs.readdir("./cmds/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Aucune commande trouver.")
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${f} Ok !`);
        bot.commands.set(props.help.name, props)
    })
})

bot.on("ready", async () => {
    console.log("[XDOLV] : En ligne");
    bot.user.setActivity("Kiki le bg")
});


bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = bot.commands.get(command.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, args)
});

bot.on('ready', async () => {
    let myGuild = bot.guilds.cache.get('800314758040911902')
    let DeleteChannel = myGuild.channels.cache.get('800811368311685120')

    DeleteChannel.bulkDelete(100)

    let OpenTicket = new Discord.MessageEmbed()
    .setDescription('Cliquez sur :`📑` pour ouvrir un ticket !')

    let guild = bot.guilds.cache.get('800314758040911902')
    let SendChannel = guild.channels.cache.get('800811368311685120')
    SendChannel.send(OpenTicket)
    .then(msg => msg.react('📑'))
})

bot.on('messageReactionAdd', async(reaction, user) => {
    const message= reaction.message;
    const member = message.guild.members.cache.get(user.id);

    if(user.bot) return;

    if(
        ["📑", "🔒"].includes(reaction.emoji.name)
    )   {
        switch(reaction.emoji.name) {
            case "📑":
            console.log('ticket crée !')

            if(reaction.message.channel.id !== "800811368311685120") return console.log('L\'émoji à été utiliser dans un autre salon')

            reaction.users.remove(user);

            let username = user.username;
            let categoryID = "800805501264461894";
            let channel = await message.guild.channels.create(`xdolvt-${username}`, {type: 'text', parent: message.guild.channels.cache.get(categoryID)})
            .catch(err => {
                message.channel.send('Il y a eu une erreur dans le [MessageReactionAdd]')
            });

            channel.updateOverwrite(message.guild.roles.everyone, {'VIEW_CHANNEL': false})
            channel.updateOverwrite(member, {
                'VIEW_CHANNEL': true,
                'SEND_MESSAGES': true,
                'ADD_REACTIONS': true
            });
            channel.updateOverwrite(message.guild.roles.cache.find(role => role.name == 'Staff'), {'VIEW_CHANNEL': true});

            var embed1 = new Discord.MessageEmbed()
            .setTitle('Bonjour,')
            .setDescription('Quel est ton probléme ?')

            channel.send(`${member}`)
            channel.send(embed1).then(async msg => msg.react('🔒'))

            let logchannel = message.guild.channels.cache.find(c => c.name == 'xdolv-log')
            if(!logchannel) return;
            logchannel.send(`Un membre à créer un ticket. \n Voici le salon ${channel}`)



            break;

            case "🔒":

            if(!message.channel.name.startsWith('xdolvt')) return;
            if(!member.hasPermission('ADMINISTRATOR')) return;

            message.channel.delete()
            let logchannel2 = message.guild.channels.cache.find(c => c.name == 'xdolv-log')
            if(!logchannel2) return;
            await logchannel2.send(`Un ticket viens d'étre fermer. \n Voici le salon ${message.channel.name}`)
            break;
        }
    }
})
