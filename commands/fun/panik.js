const Img = require('../../packages/img/index');
const Discord = require("discord.js");
module.exports = {

    async execute(client, message) { 
      if (!message.guild.me.hasPermission("ATTACH_FILES")&&!message.guild.me.permissionsIn(message.channel).has("ATTACH_FILES")) return message.channel.send("لا املك الصلاحيات الكافية")
 var args=message.content.split(" ").slice(1).join(" ").split("|");
    let kalm=args[1]
    let panic=args[0]
    let panic2=args[2]
if(!kalm||!panic||!panic2){
  return message.channel.send(`**من فضلك استعمل**
  (prefix)panic panic | kalm | panic2
  `)
}
     let img = await Img.panic(panic.trim(), kalm.trim(),panic2.trim());
    let attach = new Discord.MessageAttachment(img, `panic.png`);
    await message.lineReplyNoMention(attach)
 
   },
};
module.exports.help = {
    name: 'panic',
    aliases: ["مرعوب"], 
    test:false,
    category: 'fun',
    description:"يمكنك عمل ميم panic",
    cooldown:1,}
