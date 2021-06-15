const Discord = require("discord.js");
const canvacord = require("canvacord")
module.exports = {
  async execute(client, message, args) {
    var user = message.mentions.users.first();
    var con=message.content.split(" ").slice(2).join(" ")
    if (!user) {
      user = message.author
   con=message.content.split(" ").slice(1).join(" ")
    }
    if(!con) return message.channel.send("**اكتب التعليق من فضلك**")
    var ops = {
      username: user.username, content: con,
      avatar: user.displayAvatarURL({ dynamic: false, format: 'png' }), dark: true
    }
    let image = await canvacord.Canvas.youtube(ops);
    let attachment = new Discord.MessageAttachment(image, "youtube.png");
    await message.lineReplyNoMention(attachment).catch(err => console.log(err))

  },
};
module.exports.help = {
  name: 'comment',
  aliases: ["ytc", "yt-comment"],
  category: 'fun',
  description: "يمكنك من عمل تعليق على يوتوب",
  test: false,
  cooldown: 1,
}