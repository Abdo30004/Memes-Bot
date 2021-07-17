const DIG = require("discord-image-generation");
const Discord = require('discord.js');
module.exports = {
  async execute(client, message, args) {
    if (!message.guild.me.hasPermission("ATTACH_FILES")) return message.channel.send("لا املك الصلاحيات الكافية")
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    
    let avatar =await user.user.displayAvatarURL({ format: "png", size: 2048 });
    let photo=message.attachments.first()?.proxyURL
    var image=photo;
    var level=10;
    if(!photo){
    image=avatar;
     if(!isNaN(Number(args.join("")))) {
level=Number(args.join(""));
}
    }
  if(level>200){
level=200
}
     var img = await new DIG.Blur().getImage(image,level);
    let attach = new Discord.MessageAttachment(img, `${user.user.username} blur.png`);
    await message.channel.send(attach);


  },
};
module.exports.help = {
  name: 'blur',
  aliases: ["تغبيش"],
  category: 'filters',
  description: "لتغبيش أفتارك وجعله غير واضح",
  cooldown: 1,
}
