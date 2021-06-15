const Canvas = require(`canvas`);
const Discord = require('discord.js');
async function palestine(image) {
  if (!image) throw new Error(`Invalid image`);
  let palestine = await Canvas.loadImage(`https://cdn.discordapp.com/attachments/839835418860978226/844231949454409748/international-2657331_1920.png`);
  let img = await Canvas.loadImage(await image);
  const canvas = Canvas.createCanvas(480, 480);
  const ctx = canvas.getContext(`2d`);
  ctx.drawImage(img, 0, 0, 480, 480);
  ctx.drawImage(palestine, 0, 0, 480, 480);
  return canvas.toBuffer();
}
module.exports = {

  async execute(client, message, args) {
    if (!message.guild.me.hasPermission("ATTACH_FILES")) return message.channel.send("لا املك الصلاحيات الكافية")
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    let avatar = await user.user.displayAvatarURL({ format: "png" });
    let img = await palestine(avatar)
    let attach = new Discord.MessageAttachment(img, "img.png")
    message.channel.send(attach)

  },
};
module.exports.help = {
  name: 'palestine',
  aliases: ["فلسطين"],
  category: 'filters',
  description:"لدمج أفتارك مع العلم الفلسطيني",
  cooldown: 1,}