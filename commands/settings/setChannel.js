const Schema = require('../../models/guild.js');
const Discord = require("discord.js")
const i18n = require('i18n')
let funcs = require("../../funcs.js");

module.exports = {

  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args.join(" "))

    if (!channel) {
      message.reply(i18n.__("commands.setchannel.error")); return;
    }
    /*
    if (channel.id === client.get(message.guild.id).channel) {
      message.reply(i18n.__("commands.setchannel.same")); return;

    }*/


    for (const permission of ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "READ_MESSAGE_HISTORY"]) {
      if (message.guild.me.permissionsIn(channel).has(Discord.Permissions.FLAGS[permission])) {
        continue;
      }
      message.reply({ embeds: [{ description: i18n.__("commands.setchannel.permission", { channel: channel.id, permission }) }] })
      return;

    }



    let data = await Schema.findOneAndUpdate({
      _id: message.guild.id
    }, {
        _id: message.guild.id,
        channel: channel.id,
        autopost: true
      }, {
        upsert: true
      })
    data.save();
    clearInterval(client.guildsConfig.get(message.guild.id).interval)
    client.set(message.guild.id, {
      channel: channel.id, autopost: true
    })

    let embed = new Discord.MessageEmbed()
      .setDescription(i18n.__("commands.setchannel.success", { channel: channel.id }))
      .setColor("#17ff00")
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: "png" }))
      .setTimestamp()

    await message.reply({ embeds: [embed] })
    await channel.send({ embeds: [{ description: i18n.__("commands.setchannel.message"),color:'#f0d50c' }] })

    const interval = setInterval(async () => {
          i18n.setLocale(client.get(message.guild.id).language)

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
    //console.log()




  },
};
module.exports.help = {
  name: 'setchannel',
  category: 'settings',
  usage: "<channel>",
  aliases: ["channel", "memeschannel"],
  botpermissions: ["EMBED_LINKS"],

  permissions: ["MANAGE_GUILD"],
  cooldown: 60
}
