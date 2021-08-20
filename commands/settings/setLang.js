const Discord = require("discord.js");
const Schema = require('../../models/guild.js');
const i18n = require("i18n")
module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setPlaceholder(i18n.__("commands.setlanguage.placeholder"))
        .addOptions([
          {
            "label": "English",
            "value": "en",
            "emoji": "🇺🇸"
          },
          {
            "label": "العربية",
            "value": "ar",
            "emoji": "🇸🇦"
          }
        ])
        .setCustomId("language")
    )
    try {
      var msg = await message.reply({ content: i18n.__("commands.setlanguage.message"), components: [row] })
    } catch {
      var msg = await message.reply({ content: i18n.__("commands.setlanguage.message"), components: [row] })
    }

    let filter = (interaction) => interaction.user.id === message.author.id && interaction.customId === "language";

    let collector = msg.createMessageComponentCollector(filter, { time: 120 * 1000 });
    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate();
      msg.delete()
      let newdata = await Schema.findOneAndUpdate({ _id: message.guild.id }, { _id: message.guild.id, language: interaction.values[0] }, { upsert: true });
      newdata.save();
      client.set(message.guild.id, { language: interaction.values[0] })
      i18n.setLocale(interaction.values[0])
      return message.reply(i18n.__("commands.setlanguage.success"))

    })

  }
}
module.exports.help = {
  "name": "setlanguage",
  "aliases": ["setlang", "lang", "language","لغة"],
  "permissions": ["MANAGE_GUILD"],
  category: 'settings',
  cooldown: 30
}