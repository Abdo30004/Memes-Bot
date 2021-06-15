const Discord = require('discord.js');

module.exports = {
    async execute(client, message, args) { 
 let embed =new Discord.MessageEmbed()
 .setTitle(`**Copyrights الحقوق**`)
 .setDescription(`**كل الميمز التي يعرضها البوت من موقع [ميمز عربي](https://arb-memes.com/) بما فيه الفيديوهات و الصور
 و يمثل ${client.user.username} الممثل الرسمي للموقع في منصة ديسكورد

 يحق لك تحميل الميمز للإستعمال الشخصي و نشره بين الأصدقاء لكن يمنع منعا باتا اخد الميمز للإستعمالات التجارية ( بوت ميمز ثاني ,حساب ينشر ميمز , موقع او مدونة ميمز ثانية ...إلخ ) إلا بإذن من مدراء الموقع

 : يمكنك التواصل معنا عبر 
 
[Support Server](https://discord.gg/5J53eVXYXA)
[instagram](https://www.instagram.com/arabic_mimz/)
 **`)
 .setColor("#090909")
 .setImage(client.user.displayAvatarURL({format:"png",size:2048}))
 message.lineReplyNoMention(embed)
   },
};
module.exports.help = {
  name: 'copyrights',
  aliases: [],
  category: 'public',
  description: "الحقوق",
  test :false,
  cooldown: 1,
}