const Discord = require('discord.js');
const pretty=require("pretty-ms");
module.exports = {
  execute: async (client, message, args) => {
    if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("لا املك الصلاحيات الكافية")

    var prefix = client.config.prefix
    const devs = client.config.devs

    let embed = new Discord.MessageEmbed()
      .setColor("#040404")
      .setTitle('**Bot Info**')
      .addField(`**Bot owners**`, devs.sort((a, b) => b - a).map(devs => `<@!${devs}>`).join(" |"), true)
      .addField(`**Bot Developer**`,"<@!760952710383665192>", true)
      .addField(`**Bot users**`, client.guilds.cache.map(guild=>guild.memberCount).reduce((a,b)=>a+b),true)
      .addField(`**Bot guilds**`, client.guilds.cache.size,true)
      .addField(`**Bot Commands**`, client.commands.filter(command=>command.help.category && command.help.category !== "devs").size,true)
      .setThumbnail(client.user.displayAvatarURL({ format: "png" }))
      .addField(`**Bot language**`, `**Java script (node.js)**`,true)
      .addField(`**Bot library**`, `**Discord.js**`,true)
      .addField("**Node.js Version**", `${process.version}`, true)
      .addField("**System**", `${process.platform}`, true)
      .addField("**Uptime**", `${pretty(client.uptime)}`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: "png" }))
    message.channel.send(embed)
  }
}
module.exports.help = {
  name: "bot",
  category: 'public',
  cooldown: 7,
  description: "لعرض معلومات البوت",
}
