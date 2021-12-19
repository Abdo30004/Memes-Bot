const Discord = require('discord.js');
const random = require("random");
const i18n = require("i18n");
module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    var meme = await client.util.getMeme(lang)
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setStyle("LINK")
        .setLabel(i18n.__("commands.meme.button"))
        .setURL(meme)
        .setEmoji("🔻")
    )
    var membed = new Discord.MessageEmbed()

      .setTitle(`**${i18n.__("commands.meme.title")} 😂**`)
      .setColor("#ffd400")
      .setImage(meme)
      .setFooter(`${i18n.__("commands.meme.rights", { user: client.user.username })}`, client.config.png)
    await message.reply({ embeds: [membed], components: [row] })


  },
};
module.exports.help = {
  name: 'meme',
  aliases: ["meme", "ميمز"],
  category: 'memes',
  botpermissions: ["EMBED_LINKS"],
  cooldown: 14,

}
