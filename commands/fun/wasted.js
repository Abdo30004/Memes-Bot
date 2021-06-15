const Discord = require("discord.js");
const canvacord = require("canvacord")
module.exports = {
  async execute(client, message, args) {
    var user = message.mentions.users.first() || message.author
    var avatar = await user.displayAvatarURL({ format: "png" })
    let image = await canvacord.Canvas.wasted(avatar);
    let attachment = new Discord.MessageAttachment(image, "wasted.png");
    await message.lineReplyNoMention(attachment).catch(err => console.log(err))

  },
};
module.exports.help = {
  name: 'wasted',
  aliases: [],
  category: 'fun',
  description: "يمكنك من عمل صورة wasted",
  test: false,
  cooldown: 1,
}