const Discord = require("discord.js");
const canvacord = require("canvacord")
module.exports = {
  async execute(client, message, args) {
    var user = message.mentions.users.first() || message.author
    var avatar = await user.displayAvatarURL({ format: "png" })
    let image = await canvacord.Canvas.wasted(avatar);
    let attach = new Discord.MessageAttachment(image, "wasted.png");
    await message.reply({ files: [attach] })


  },
};
module.exports.help = {
  name: 'wasted',
  aliases: [],
  usage: "[user]",
  botpermissions: ["ATTACH_FILES"],
  category: 'fun',
  test: false,
  cooldown: 1,
}