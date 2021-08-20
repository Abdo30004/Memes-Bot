const Img = require('image-generation-for-discord');
const Discord = require("discord.js")
module.exports = {
  async execute(client, message, args) {

    let user = message.mentions.members.first() || message.member

    let avatar = await user.user.avatarURL({ format: "png", size: 2048});
    let img =await Img.motionblur(avatar);
    let attach = new Discord.MessageAttachment(img, `motion blur.png`);
    await message.reply({ files: [attach] });

  },
};
module.exports.help = {
  name: 'motionblur',
  aliases: [],
  category: 'filters',
  test: false,
  usage: "[user]",

  botpermissions: ["ATTACH_FILES"],
  cooldown: 1,
}