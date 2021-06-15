const Discord = require("discord.js");
const canvacord = require("canvacord")
module.exports = {
  async execute(client, message, args) {
    var user = message.mentions.users.first()||message.author
    var avatar=await user.displayAvatarURL({format:"png"})
    let image = await canvacord.Canvas.wanted(avatar);
    let attachment = new Discord.MessageAttachment(image, "wanted.png");
    await message.lineReplyNoMention(attachment).catch(err => console.log(err))

  },
};
module.exports.help = {
  name: 'wanted',
  aliases: [],
  category: 'fun',
  description: "يمكنك من عمل صورة wanted",
  test: false,
  cooldown: 1,
}