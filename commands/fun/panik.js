const Img = require('../../packages/img/index');
const Discord = require("discord.js");
module.exports = {

    async execute(client, message) { 
      if (!message.guild.me.hasPermission("ATTACH_FILES")&&!message.guild.me.permissionsIn(message.channel).has("ATTACH_FILES")) return message.channel.send("لا املك الصلاحيات الكافية")
 var args=message.content.split(" ").slice(1).join(" ").split("|");
    let kalm=args[1]
    let panik=args[0]
    let panik2=args[2]
if(!kalm||!panik||!panik2){
  return message.channel.send(`**من فضلك استعمل**
  (prefix)panic panik | kalm | panik-2
  `)
}
     let img = await Img.panik(panik.trim(), kalm.trim(),panik2.trim());
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
