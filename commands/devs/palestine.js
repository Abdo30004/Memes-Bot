const Discord = require('discord.js');
const Canvas = require("canvas")
var streamToBuffer = require('stream-to-buffer')

const jimp = require("jimp")
async function palestine(url) {
  let palestine = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/839835418860978226/844231949454409748/international-2657331_1920.png`);
  const image = await Canvas.loadImage(await ((await jimp.read(url)).resize(480, 480)).getBufferAsync("image/png"))
  let canvas = Canvas.createCanvas(480, 480)
  let ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0)
  ctx.drawImage(palestine, 0, 0)
  return canvas.toBuffer()
}
module.exports = {

  async execute(client, message, args) {


    let user = message.mentions.members.first() || message.member
    let avatar = await user.user.displayAvatarURL({ format: "png", dynamic: true });
    let buffer = await palestine(avatar);


    let attach = new Discord.MessageAttachment(buffer, "palestine.png")
    await message.reply({ files: [attach] });



},
};
module.exports.help = {
  name: 'palestine',
  aliases: ["فلسطين"],
  category: 'devs',
  usage: "[user]",
  botpermissions: ["ATTACH_FILES"],
  cooldown: 1,
}