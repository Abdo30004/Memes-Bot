const Img = require('image-generation-for-discord');
const Discord = require("discord.js");
const i18n = require("i18n");
module.exports = {

  async execute(client, message, args, lang) {
    i18n.setLocale(lang);
    let user = message.member
    let user2 = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!user2) {
      return message.reply(i18n.__("commands.fun.mention"))
    }
    let avatar = await user.user.avatarURL({ format: "png", size: 2048 });
    let avatar2 = await user2.user.avatarURL({ format: "png", size: 2048 });
    let img = await Img.batslap(avatar, avatar2);
    let attach = new Discord.MessageAttachment(img, `${user.user.username}-slap-${user2.user.username} .png`);
    await message.reply({ files: [attach] })

  },
};
module.exports.help = {
  name: 'batslap',
  aliases: ["slap", "كف", "ضرب"],
  category: 'fun',
  usage: "<user>",
  botpermissions: ["ATTACH_FILES"],
  test: false,
  cooldown: 10,
}