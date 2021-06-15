const Img = require('image-generation-for-discord');
const Discord = require("discord.js")
module.exports = {
  async execute(client, message, args) {
if (!message.guild.me.hasPermission("ATTACH_FILES")) return message.channel.send("لا املك الصلاحيات الكافية")
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member

    let avatar = await user.user.avatarURL({ format: "png", size: 2048 });
    let img = await Img.motionblur(avatar);
    let attach = new Discord.MessageAttachment(img, `motion blur.png`);
    await message.channel.send(attach)
  },
};
module.exports.help = {
  name: 'motionblur',
  aliases: [],
  category: 'filters',
  test:false,
  description:"يسمح لك بإضافة تأثير الحركة على أفتارك ",
  cooldown: 1,
}