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
    let image = await canvacord.Canvas.opinion(user.displayAvatarURL({format:"png"}), con);
    let attachment = new Discord.MessageAttachment(image, "opinion.png");
    await message.lineReplyNoMention(attachment).catch(err => console.log(err))

  },
};
module.exports.help = {
  name: 'opinion',
  aliases: [],
  category: 'fun',
  description: "يمكنك من عمل ميم",
  test: false,
  cooldown: 1,
}