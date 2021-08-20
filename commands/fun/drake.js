const Img = require('../../packages/img/index');
const Discord = require("discord.js");
const i18n = require("i18n");
module.exports = {
  async execute(client, message, css, lang) {
    i18n.setLocale(lang);
    var args = message.content.split(" ").slice(1).join(" ").split(/\|/);
    let yeah = args[1]
    let nah = args[0]
    if (!nah || !yeah) {
      message.reply(i18n.__("commands.fun.drake", { prefix: client.guildsConfig.get(message.guild.id).prefix || "-" }))
      return
    }
    let img = await Img.drake(nah.trim(), yeah.trim());
    let attach = new Discord.MessageAttachment(img, `Drake_Meme.png`);
      await message.reply({ files: [attach] })


  },
};
module.exports.help = {
  name: 'drake',
 usage:"<Nah comment | Yah comment>",
  aliases: ["درايك"],
  test: false,
  category: 'fun',
  botpermissions: ["ATTACH_FILES"],
  cooldown: 1,
}