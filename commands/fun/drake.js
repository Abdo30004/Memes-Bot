const Img = require('../../packages/img/index');
const Discord = require("discord.js");
module.exports = {

    async execute(client, message) { 
      if (!message.guild.me.hasPermission("ATTACH_FILES")&&!message.guild.me.permissionsIn(message.channel).has("ATTACH_FILES")) return message.channel.send("لا املك الصلاحيات الكافية")
 var args=message.content.split(" ").slice(1).join(" ").split("|");
    let yeah=args[1]
    let nah=args[0]
if(!nah||!yeah){
  return message.channel.send(`**من فضلك استعمل**
  (prefix)drake nah | yeah
  `)
}
     let img = await Img.drake(nah.trim(), yeah.trim());
    let attach = new Discord.MessageAttachment(img, `${nah}-drake-${yeah} .png`);
    await message.lineReplyNoMention(attach)
 
   },
};
module.exports.help = {
    name: 'drake',
    aliases: ["درايك"], 
    test:false,
    category: 'fun',
    description:"يمكنك عمل ميم drake",
    cooldown:1,}