const Schema = require('../../models/guild.js');
const Discord = require("discord.js")
const i18n = require('i18n')
module.exports = {

  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    const prefix = args.join(" ");

    if (!prefix) {
      return message.reply(i18n.__("commands.setprefix.error"));
    }

    let data = await Schema.findOneAndUpdate({
      _id: message.guild.id
    }, {
        _id: message.guild.id,
        prefix: prefix
      }, {
        upsert: true
      })
    data.save();

    client.set(message.guild.id,{prefix})
    let embed = new Discord.MessageEmbed()
      .setDescription(i18n.__("commands.setprefix.success", { prefix: prefix }))
      .setColor("#f0d50c")

    message.reply({ embeds: [embed] });


  },
};
module.exports.help = {
  name: 'setprefix',
  category: 'settings',
  usage: "<prefix>",
  aliases: ["prefix"],
  botpermissions: ["EMBED_LINKS"],

  permissions: ["MANAGE_GUILD"],
  cooldown: 60
}
