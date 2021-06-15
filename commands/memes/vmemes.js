const Discord = require('discord.js');
const random = require("random")
let data = require("../../funcs.js");
module.exports = {
  async execute(client, message, args) {
    let videos = await data.videos
    if (!message.guild.me.hasPermission("ATTACH_FILES") && !message.guild.me.permissionsIn(message.channel).has("ATTACH_FILES")) {
      return message.channel.send("لا املك الصلاحيات الكافية")
    }
    var video = videos[random.int((min = 0), (max = videos.length))]
    var attach = new Discord.MessageAttachment(video, "Video.mp4")
    await message.lineReplyNoMention(attach).catch(err => message.channel.send("**😢لم أتمكن من إيجاد ميم حاليًا حاول مرة اخرى**"))


  },
};
module.exports.help = {
  name: 'vmeme',
  aliases: ["vmemes"], // you can add more
  category: 'memes',
  cooldown: 14,
  help: "https://cdn.discordapp.com/attachments/836854460285583362/838010088856879104/eq.gif",
  description: "يرسل فيديو عشوائي",
}