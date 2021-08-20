const Discord = require("discord.js");
const canvacord = require("canvacord");
const i18n = require("i18n")
module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    var con = args.join(" ")
    if (!con) {
      message.reply(i18n.__("commands.fun.comment"))
      return;
    }
    let image = await canvacord.Canvas.ohno(con);
    let attach = new Discord.MessageAttachment(image, "ohno.png");
    await message.reply({ files: [attach] })


  },
};
module.exports.help = {
  name: 'ohno',
  aliases: [],
  category: 'fun',
  botpermissions: ["ATTACH_FILES"],
  usage: "<comment>",

  test: false,
  cooldown: 1,
}