const i18n = require("i18n");
const Shema = require("../../models/guild.js");
const Discord = require("discord.js");
const funcs = require("../../funcs.js")

module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang);
    const channel = message.guild.channels.cache.get(client.guildsConfig.get(message.guild.id).channel)
    if (!channel) {
      message.reply(i18n.__('commands.setmemes.channel'))
      return;
    }
    const state = args.join(" ") ?.toLowerCase()
    if (!["on", "off"].includes(state)) {
      message.reply(i18n.__('commands.setmemes.args'))
      return;
    }
    const autopost = state === "on" ? true : false
    console.log(autopost)
    let newdata = await Shema.findOneAndUpdate({ _id: message.guild.id }, {
      _id: message.guild.id,
      autopost
    })

    newdata.save();
    client.set(message.guild.id, { autopost })
    let embed = new Discord.MessageEmbed()
      .setDescription(i18n.__(`commands.setmemes.${state}`, { channel: channel.name }))
      .setColor("#f0d50c")

    message.reply({ embeds: [embed] })


    if (!autopost) {
      clearInterval(client.guildsConfig.get(message.guild.id).interval)
    }

    if (autopost) {
      clearInterval(client.guildsConfig.get(message.guild.id).interval)
      await channel.send({ embeds: [{ description: i18n.__("commands.setchannel.message"),color:'#f0d50c' }] })
      const interval = setInterval(async () => {
        let meme = await funcs.getMeme(client.get(message.guild.id).language)
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

      }, client.get(message.guild.id).time)
      client.set(message.guild.id, { interval })
    }






  },
};
module.exports.help = {
  name: "setmemes",
  aliases: ['setautomemes', "autopost"],
  category: 'settings',
  botpermissions: [],
  test: false,
  cooldown: 1,
  botpermissions: ["EMBED_LINKS"],
  permissions: ["MANAGE_GUILD"],
}