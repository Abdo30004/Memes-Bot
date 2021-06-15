const Img = require('image-generation-for-discord');
const Discord = require("discord.js");
module.exports = {

  async execute(client, message, args) {
if (!message.guild.me.hasPermission("ATTACH_FILES")) return message.channel.send("لا املك الصلاحيات الكافية")
    let user = message.member
    let user2 = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user2) {

      return message.channel.send("**من فضلك منشن شخص**")
    }
    let avatar = await user.user.avatarURL({ format: "png", size: 2048 });
    let avatar2 = await user2.user.avatarURL({ format: "png", size: 2048 });
    let img = await Img.batslap(avatar, avatar2);
    let attach = new Discord.MessageAttachment(img, `${user.user.username}-slap-${user2.user.username} .png`);
    await message.lineReplyNoMention(attach)
  },
};
module.exports.help = {
  name: 'batslap',
  aliases: ["slap", "كف", "ضرب"],
  category: 'fun',
  description:"يسمح لك بإعطاء كف لأحدهم",
  test:false,
  cooldown: 10,
}