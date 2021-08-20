const Discord = require("discord.js");
const canvacord = require("canvacord")
const i18n = require("i18n")
module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    var con = args.join(" ")
    if (!con) {
      message.reply(i18n.__("commands.fun.comment"))

      return;
    }
    let image = await canvacord.Canvas.clyde(con);
    let attach = new Discord.MessageAttachment(image, "clyde.png");

      await message.reply({ files: [attach] })


  },
};
module.exports.help = {
  name: 'clyde',
  aliases: [],
  usage:"<comment>",

  botpermissions: ["ATTACH_FILES"],
  category: 'fun',
  test: false,
  cooldown: 1,
}