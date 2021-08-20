const Discord = require("discord.js");
const canvacord = require("canvacord")
const i18n = require("i18n")
module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    var user = message.mentions.members.first();
    var con = message.content.split(" ").slice(2).join(" ")
    if (!user) {
      user = message.member
      con = message.content.split(" ").slice(1).join(" ")
    }
    if (!con) {
      message.reply(i18n.__("commands.fun.comment"))
      return;
    }
    var color = user.roles.cache ?.sort((a, b) => b.position - a.position).filter(role => role.hexColor !== "#000000").first() ?.hexColor || "#FFFFFF"
    var ops = {
      color,
      username: user.user.username, message: con,
      image: user.user.displayAvatarURL({ dynamic: false, format: 'png' })
    }

    let image = await canvacord.Canvas.quote(ops);
    let attach = new Discord.MessageAttachment(image, `${user.user.username}.png`);
    await message.reply({ files: [attach] })


  },
};
module.exports.help = {
  name: 'quote',
  category: 'fun',
  botpermissions: ["ATTACH_FILES"],
  usage: "<comment> or <user> <comment>",

  test: false,
  cooldown: 1,
}