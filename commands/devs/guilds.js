const Discord = require('discord.js')
module.exports = {

  async execute(client, message, args) {
    let devs = client.config.devs
    if (devs.includes(message.author.id)) {
      try {
        var x = 0;
        var y = 1;
        var icon = await client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(guild => guild.iconURL({ dynamic: true, format: "png" })).slice(x, y).join('')
        var array = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((guild) =>
          `**Guild Name :** ${guild.name}\n
          **Guild Id :** ${guild.id}\n
          **Guild Members :** ${guild.memberCount}\n
          **Guild Owner Id :** ${guild.ownerID}\n
					`)
        var guildssize = array.slice(x, y)
        const embed = new Discord.MessageEmbed()
          .setColor('GREEN')
          .setDescription(guildssize)
          .setThumbnail(icon)
          .setFooter(`Total guilds : ${client.guilds.cache.size}`)
        message.channel.send(embed).then(async msg => {
          await msg.react("◀")
          await msg.react("▶")
          const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
          const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
          const backwards = msg.createReactionCollector(backwardsFilter, { time: 2000000 });
          const forwards = msg.createReactionCollector(forwardsFilter, { time: 2000000 });
          forwards.on('collect', async (reaction, user) => {
            x = x + 1
            y = y + 1
            c = y
            if (y > array.length) y = array.length + 1
            if (y > array.length) x = y - 1

            icon = await client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(guild => guild.iconURL({ dynamic: true, format: "png" })).slice(x, y).join('')
            guildssize = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((guild) =>
              `**Guild Name :** ${guild.name}\n
          **Guild Id :** ${guild.id}\n
          **Guild Members :** ${guild.memberCount}\n
          **Guild Owner Id :** ${guild.ownerID}\n
					`).slice(x, y)
            embed.setDescription(guildssize)
            embed.setThumbnail(icon)
            msg.edit(embed)

            reaction.users.remove(user.id)
          })
          backwards.on('collect', async (reaction, user) => {
            x = x - 1
            y = y - 1
            if (x < 0) x = 0
            if (y < 1) y = 1
            icon = await client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(guild => guild.iconURL({ dynamic: true, format: "png" })).slice(x, y).join('')
            guildssize = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((guild) =>
              `**Guild Name :** ${guild.name}\n
          **Guild Id :** ${guild.id}\n
          **Guild Members :** ${guild.memberCount}\n
          **Guild Owner Id :** ${guild.ownerID}\n
					`).slice(x, y)
            embed.setThumbnail(icon)
            embed.setDescription(guildssize)
            msg.edit(embed)
            reaction.users.remove(user.id)
          }
          )

        })
      } catch (err) {
        return message.channel.send(`:x: - ${err.message} Try Again Later!`)
      }
    }
  },
};
module.exports.help = {
  name: 'guilds',
  aliases: [], // you can add more
  category: 'devs',
}