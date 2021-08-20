const DIG = require("discord-image-generation");
const Discord = require('discord.js');
const i18n = require("i18n")
module.exports = {
  async execute(client, message, args, lang) {
    let user = message.mentions.users.first()
    i18n.setLocale(lang)
    let avatar = await user ?.displayAvatarURL({ format: "png", size: 2048, dynamic: true });
    let photo = message.attachments.first() ?.contentType.startsWith("image") ? message.attachments.first() ?.proxyURL : null
    var image = photo || avatar;
    if (!image) {
      message.reply(i18n.__("commands.fun.mention"));
      return;
    }
    var { data, type } = await client.gif(image, new DIG.Trash().getImage);

    let attach = new Discord.MessageAttachment(data, `trash.${type}`);
    await message.reply({ files: [attach] });

  },
};
module.exports.help = {
  name: 'trash',
  category: 'fun',
  usage: "[user]",
  botpermissions: ["ATTACH_FILES"],
  cooldown: 1,
}
