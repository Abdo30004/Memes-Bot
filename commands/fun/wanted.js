const Discord = require("discord.js");
const canvacord = require("canvacord")
module.exports = {
  async execute(client, message, args) {
    var user = message.mentions.users.first() || message.author
    var avatar = await user.displayAvatarURL({ format: "png" })
    let image = await canvacord.Canvas.wanted(avatar);
    let attach = new Discord.MessageAttachment(image, "wanted.png");
      await message.reply({ files: [attach] })


  },
};
module.exports.help = {
  name: 'wanted',
  aliases: [],
  botpermissions: ["ATTACH_FILES"],
  category: 'fun',
  usage:"[user]",
  test: false,
  cooldown: 1,
}