const Img = require('../../packages/img/index');
const Discord = require("discord.js");
const i18n = require("i18n")
module.exports = {

  async execute(client, message, css, lang) {
    i18n.setLocale(lang)
    var args = message.content.split(" ").slice(1).join(" ").split("|");
    let calm = args[1]
    let panic = args[0]
    let panic2 = args[2]
    if (!calm || !panic || !panic2) {
      return message.reply(i18n.__("commands.fun.panic", { prefix: client.guildsConfig.get(message.guild.id).prefix || "-" }))
    }
    let img = await Img.panik(panic.trim(), calm.trim(), panic2.trim());
    let attach = new Discord.MessageAttachment(img, `panic.png`);
      await message.reply({ files: [attach] })


  },
};
module.exports.help = {
  name: 'panic',
  aliases: ["مرعوب", "panic"],
  test: false,
  category: 'fun',
  botpermissions: ["ATTACH_FILES"],
 usage:"<panic comment | calm comment | panic comment>",
  cooldown: 1,
}
