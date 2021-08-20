const Discord = require("discord.js")

module.exports = {
  async execute(client, message, args) {
    let embed = new Discord.MessageEmbed()
      .setTitle(client.user.username)
      .setDescription("** أول موقع ميمز عربي  :pineapple:**")
      .addField("**Website**", `[**Click here**](${client.config.site})`)
      .addField("**Support**", `[**Click here**](https://discord.gg/5J53eVXYXA)`)
      .setImage("https://cdn.discordapp.com/attachments/836854460285583362/838019371656937502/qr-code.png")
      .setThumbnail(client.config.png)
      .setColor("#f0d50c")
    message.reply({ embeds: [embed] })


  },
};
module.exports.help = {
  name: 'website',
  botpermissions: ["EMBED_LINKS"],
  aliases: ["موقع", "site"],
  category: 'public',
  cooldown: 7,
}