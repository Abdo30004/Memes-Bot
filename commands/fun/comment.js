const Discord = require("discord.js");
const canvacord = require("canvacord")
const i18n = require("i18n")
module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    var user = message.mentions.users.first();
    var con = message.content.split(" ").slice(2).join(" ")
    if (!user) {
      user = message.author
      con = message.content.split(" ").slice(1).join(" ")
    }
    if (!con) {
      message.reply(i18n.__("commands.fun.comment"))
      return;
    }
    var ops = {
      username: user.username, content: con,
      avatar: user.displayAvatarURL({ dynamic: false, format: 'png' }), dark: true
    }
    let image = await canvacord.Canvas.youtube(ops);
    let attach = new Discord.MessageAttachment(image, "youtube.png");

      await message.reply({ files: [attach] })


  },
};
module.exports.help = {
  name: 'comment',
  aliases: ["ytc", "yt-comment"],
  category: 'fun',
  botpermissions: ["ATTACH_FILES"],
      usage:"<comment>",

  test: false,
  cooldown: 1,
}