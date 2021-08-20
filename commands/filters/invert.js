const DIG = require("discord-image-generation");
const Discord = require('discord.js');
module.exports = {
  async execute(client, message, args) {
    let user = message.mentions.members.first() || message.member

    let avatar = await user.user.displayAvatarURL({ format: "png", size: 2048,dynamic:true });
    let photo = message.attachments.first() ?.contentType.startsWith("image") ? message.attachments.first() ?.proxyURL : null
    var image = photo || avatar;
    var {data,type} = await client.gif(image,new DIG.Invert().getImage);
   
    let attach = new Discord.MessageAttachment(data, `greyscale.${type}`);
    await message.reply({ files: [attach] });



  },
};
module.exports.help = {
  name: 'invert',
  usage: "[user]",
  botpermissions: ["ATTACH_FILES"],
  category: 'filters',
    cooldown: 1,
}
