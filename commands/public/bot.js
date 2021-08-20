const Discord = require('discord.js');
const pretty = require("pretty-ms");
module.exports = {
  execute: async (client, message, args) => {
    const devs = client.config.devs

    let embed = new Discord.MessageEmbed()
      .setColor("#040404")
      .setTitle('**Bot Info**')
      .addField(`**Bot owners**`, devs.sort((a, b) => b - a).map(devs => `<@!${devs}>`).join(" |"), true)
      .addField(`**Bot Developer**`, "<@!760952710383665192>", true)
      .addField(`**Bot users**`, `${client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b)}`, true)
      .addField(`**Bot guilds**`, `${client.guilds.cache.size}`, true)
      .addField(`**Bot Commands**`, `${client.commands.filter(command => command.help.category && command.help.category !== "devs").size}`, true)
      .addField(`**Bot language**`, `**Java script (node.js)**`, true)
      .addField(`**Bot library**`, `**Discord.js v${Discord.version}**`, true)
      .addField("**Node.js Version**", `${process.version}`, true)
      .addField("**System**", `${process.platform}`, true)
      .addField("**Uptime**", `${pretty(client.uptime)}`)
      .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: "png" }))
      .setColor("#f0d50c")
      message.reply({ embeds: [embed] })

  }
}
module.exports.help = {
  name: "bot",
  category: 'public',
  botpermissions: ["EMBED_LINKS"],

  cooldown: 7,
}
