const Discord = require('discord.js');
const random = require("random")
const i18n = require("i18n")
module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    var video = await client.util.getVideo()

    var attach = new Discord.MessageAttachment(video, "meme.mp4")
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setStyle("LINK")
        .setLabel(i18n.__("commands.meme.button"))
        .setURL(video)
        .setEmoji("🔻")
    )

    await message.reply({ files: [attach], components: [row] });





  },
};
module.exports.help = {
  name: 'vmeme',
  aliases: ["vmemes", "فيديو", "فديو"], // you can add more
  category: 'memes',
  botpermissions: ["ATTACH_FILES"],
  cooldown: 14,

}
