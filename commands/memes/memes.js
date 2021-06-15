const Discord = require('discord.js');
const random = require("random")
let data = require("../../funcs.js");

module.exports = {
  async execute(client, message, args) {

    if (!message.guild.me.hasPermission("EMBED_LINKS") && !message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
      return message.channel.send("لا املك الصلاحيات الكافية")
    }
    let list = await data.memes
    let meme = await list[random.int((min = 0), (max = list.length))]

    var membed = new Discord.MessageEmbed()

      .setTitle("**ميم عشوائي 😂**")
      .setDescription(`[**Download**](${meme})`)
      .setColor("#ffd400")
      .setImage(meme)
      .setFooter(`كل الحقوق محفوظة لموقع ميمز عربي`, client.config.png)
    try {
      await message.lineReplyNoMention(membed)
    } catch (err) {
      console.log(err)
      await message.channel.send("**لم اجد ميم حاليا استعمل الأمر مرة اخرى** \
      **إن تكرر هذا الخطأ كثيرا يرجى التواصل معنا عبر سيرفر السبورت**")
    }


  },
};
module.exports.help = {
  name: 'meme',
  aliases: ["memes", "ميمز"],
  category: 'memes',
  cooldown: 14,
  help: "https://cdn.discordapp.com/attachments/836854460285583362/837695688144977930/1.gif",
  description: "يرسل ميمز عشوائي",
}