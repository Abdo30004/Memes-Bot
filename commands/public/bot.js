const Discord = require('discord.js');

module.exports = {
  execute: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("لا املك الصلاحيات الكافية")

    var prefix = client.config.prefix
    const devs = client.config.devs

    let embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('**Bot Info**')
      .addField(`**Bot owners**`, devs.sort((a, b) => b - a).map(devs => `<@!${devs}>`).join(" |"), true)
      .addField(`**Bot users**`, client.users.cache.size)
      .addField(`**Bot guilds**`, client.guilds.cache.size)
      .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
      .addField(`**Bot language**`, `**java script(node.js)**`)
      .addField(`**Bot library**`, `**discord.js**`).setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: "png" }))
    message.channel.send(embed)
  }
}
module.exports.help = {
  name: "bot",
  category: 'public',
  cooldown: 7,
  description: "لعرض معلومات البوت",
}