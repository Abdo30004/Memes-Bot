const Shema = require("../../models/guild.js")
const Discord = require("discord.js")
const i18n = require("i18n")
const funcs = require("../../funcs.js")
const util = require("util");
const wait = util.promisify(setTimeout)
module.exports = async (client) => {
  await wait(5 * 1000)
  const guilds = [...client.guilds.cache.values()];
  loop1: for (const guild of guilds) {

    let data = await Shema.findOne({ _id: guild.id })
    if (!data) {
      continue;
    }
    i18n.setLocale(data.language)
    const channel = guild.channels.cache.get(data.channel)
    if (!channel || !data.autopost) {
      continue;
    }
    for (const permission of ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "READ_MESSAGE_HISTORY"]) {
      if (guild.me.permissionsIn(channel).has(Discord.Permissions.FLAGS[permission])) {
        continue;
      }
      channel.send(i18n.__("ready.permission", { permission })).catch(console.error)
      continue loop1;
    }
    const interval = setInterval(async () => {
      let meme = await funcs.getMeme(client.guildsConfig.get(guild.id).language)
      let row = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setStyle("LINK")
          .setLabel(i18n.__("commands.meme.button"))
          .setURL(meme)
          .setEmoji("851856874458054726")
      )
      var membed = new Discord.MessageEmbed()

        .setTitle(`**${i18n.__("commands.meme.title")} 😂**`)
        .setColor("#ffd400")
        .setImage(meme)
        .setFooter(`${i18n.__("commands.meme.rights", { user: client.user.username })}`, client.config.png)

      await channel.send({ embeds: [membed], components: [row] })

    }, client.get(guild.id).time)

    setTimeout(() => { client.set(guild.id, { interval }) }, 3000)






  }
}