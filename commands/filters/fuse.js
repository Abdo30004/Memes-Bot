const Img = require('image-generation-for-discord');
const Discord = require("discord.js")
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
    let img = await Img.avatarfusion(avatar, avatar2);
    let attach = new Discord.MessageAttachment(img, `${user.user.username}-fuse-${user2.user.username} .png`);
    await message.channel.send(attach)
  },
};
module.exports.help = {
  name: 'fuse',
  aliases: ["دمج"],
  category: 'fun',
  test:false,
  description:"يسمح لك بدمج أفتارك مع أحدهم ",
  cooldown: 1,}
