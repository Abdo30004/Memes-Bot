const Discord = require("discord.js")
module.exports = {
  async execute(client, message, args) {
    if (!message.guild.me.hasPermission("EMBED_LINKS") && !message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
      return message.channel.send("لا املك الصلاحيات الكافية")
    }
    let embed = new Discord.MessageEmbed()

      .setTitle(client.user.username)
      .setDescription("** أول بوت ميمز عربي :pineapple:**")
      .addField("**Website**", `[**Click here**](${client.config.site})`)
      .addField("**Invite**", `[**Click here**](${client.config.invite})`)
      .addField("**Support**", `[**Click here**](https://discord.gg/5J53eVXYXA)`)
      .setImage("https://media.discordapp.net/attachments/836854460285583362/837677135564505088/qr-code_2.png?width=406&height=406")
      .setThumbnail(client.config.png)
      .setColor('#ffd400')
    message.channel.send(embed)


  },
};
module.exports.help = {
  name: 'invite',
  aliases: ["دعوة", "رابط"],
  category: 'public',
  cooldown: 7,
  description: "لدعوة البوت",
}