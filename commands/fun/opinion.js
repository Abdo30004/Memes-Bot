const Discord = require("discord.js");
const canvacord = require("canvacord")
const i18n=require("i18n")
module.exports = {
  async execute(client, message, args,lang) {
    i18n.setLocale(lang)
    var user = message.mentions.users.first();
    var con = message.content.split(" ").slice(2).join(" ")
    if (!user) {
      user = message.author
      con = message.content.split(" ").slice(1).join(" ")
    }
    if (!con) {
      message.reply(i18n.__("commands.fun.comment"))
      return
    }
    let image = await canvacord.Canvas.opinion(user.displayAvatarURL({ format: "png" }), con);
    let attach = new Discord.MessageAttachment(image, "opinion.png");
      await message.reply({ files: [attach] })


  },
};
module.exports.help = {
  name: 'opinion',
  aliases: [],
  category: 'fun',
  botpermissions: ["ATTACH_FILES"],
  usage:"<comment> or <user> <comment>",
  test: false,
  cooldown: 1,
}