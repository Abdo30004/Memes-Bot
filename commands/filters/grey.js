const DIG = require("discord-image-generation");
const Discord = require('discord.js');
module.exports = {
  async execute(client, message, args) {
    if (!message.guild.me.hasPermission("ATTACH_FILES")) return message.channel.send("لا املك الصلاحيات الكافية")
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    
    let avatar =await user.user.displayAvatarURL({ format: "png", size: 2048 });
    let photo=message.attachments.first()?.proxyURL
    var image=photo;
    if(!photo){
    image=avatar;
    }
     var img = await new DIG.Greyscale().getImage(image);
    let attach = new Discord.MessageAttachment(img, `${user.user.username} greyscale.png`);
    await message.channel.send(attach);


  },
};
module.exports.help = {
  name: 'greyscale',
  aliases: ["اسود"],
  category: 'filters',
  description: "لجعل أفتارك باللون الأسود",
  cooldown: 1,
}
