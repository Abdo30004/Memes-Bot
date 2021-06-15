const Discord = require("discord.js")

module.exports = {
  async execute(client, message, args) {
    if (!message.guild.me.hasPermission("EMBED_LINKS") && !message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
      return message.channel.send("لا املك الصلاحيات الكافية")
    }
    let embed = new Discord.MessageEmbed()
      .setTitle(client.user.username)
      .setDescription("** أول موقع ميمز عربي  :pineapple:**")
      .addField("**Website**", `[**Click here**](${client.config.site})`)
      .addField("**Support**", `[**Click here**](https://discord.gg/5J53eVXYXA)`)
      .setImage("https://cdn.discordapp.com/attachments/836854460285583362/838019371656937502/qr-code.png")
      .setThumbnail(client.config.png)
      .setColor('#ffd400')
    message.channel.send(embed)


  },
};
module.exports.help = {
  name: 'website',
  aliases: ["موقع", "site"],
  category: 'public',
  cooldown: 7,
  description: "لعرض موقع الميمز",
}