
const Discord = require('discord.js');
const schema = require('../../models/prefix');
module.exports = {
  execute: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS") && !message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
       return message.channel.send("لا املك الصلاحيات الكافية") 
       }
    var prefixdata = await schema.findOne({ id: message.guild.id });
    var prefix;
    if (prefixdata === null) {
      prefix = client.config.prefix;
    } else {
      prefix = prefixdata.Prefix
    }
    const devs = client.config.devs
    if (!args[0]) {
      let embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Commands help')
        .addField(`** <:circle:852213932001460294>  Public || الأوامر العامة**`, `>>> ${client.commands.filter(cmd => cmd.help.category == "public").map(cmd => `\`${prefix}${cmd.help.name}\` **${cmd.help.description}**\n`).join(" ")}`, false
        )
        .addField(`**<:circle:852213932001460294>  Memes || أوامر الميمز**`, `>>> ${client.commands.filter(cmd => cmd.help.category == "memes").map(cmd => `\`${prefix}${cmd.help.name}\` **${cmd.help.description}**\n`).join(" ")}`)
        .addField(`**<:circle:852213932001460294>  Fun || أوامر الصور**`, `>>> ${client.commands.filter(cmd => cmd.help.category == "fun").map(cmd => `\`${prefix}${cmd.help.name}\` **${cmd.help.description}**\n`).join(" ")}`)
        .addField(`**<:circle:852213932001460294>  Games || أوامر الألعاب**`, `>>> ${client.commands.filter(cmd => cmd.help.category == "games").map(cmd => `\`${prefix}${cmd.help.name}\` **${cmd.help.description}**\n`).join(" ")}`)
        .addField(`**<:circle:852213932001460294>  Filters || أوامر الفلاتر**`, `>>> ${client.commands.filter(cmd => cmd.help.category == "filters").map(cmd => `\`${prefix}${cmd.help.name}\` **${cmd.help.description}**\n`).join(" ")}`)
        .setThumbnail(client.user.avatarURL({ format: "png" }))

        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: "png" }))


      if (devs.includes(message.author.id)) {
        embed.addField(
          `Developer Commands`, `${client.commands.filter(cmd => cmd.help.category == "devs").map(cmd => `\`${prefix}${cmd.help.name}\``)}`)
      }

      try {
        await message.lineReplyNoMention(embed)
      } catch (err) {
        return
      }
    } else {
      const command = client.commands.get(args.join(" ").toLowerCase()) || client.commands.find(a => a.aliases && a.aliases.includes(args.join(" ").toLowerCase()))

      if (!command) return message.channel.send(`❗ - I did not found this command !`);

      if (command && command.help.category != "devs") {
        let name = command.help.name
        var aliases;
        try {
          aliases = command.help.aliases.map(a => `${prefix}${a}`).join(",")
        } catch (err) {
          aliases = "لا توجد الإختصارات"
        }
        var image = await `https://api.abderrahmane300.repl.co/memes-bot/${command.help.name}.gif`
        var description = command.help.description
        if (!name) return
        if (!aliases) { aliases = "لا توجد الإختصارات" }
        if (!description) { description = "لا يوجد وصف" }
        let embed = new Discord.MessageEmbed()
          .setTitle(`**Help for command ${name}**`)
          .addField("**Aliases | الإختصارات**", aliases)
          .addField("**Description | الوصف**", `**${description}**`)
          .setImage(image ? image : null)
          .setColor('#ffd400')
        message.channel.send(embed)

      }

    }
  }

};
module.exports.help = {
  name: "Oldhelp",
  category: 'devs',
  cooldown: 7,
  description: "لعرض اوامر البوت",
}
