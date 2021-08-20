const Discord = require("discord.js")
module.exports = {
  async execute(client, message, args) {
    let embed = new Discord.MessageEmbed()
      .setTitle(client.user.username)
      .setDescription("** أول بوت ميمز عربي :pineapple:**")
      .addField("**Website**", `[**Click here**](${client.config.site})`)
      .addField("**Invite**", `[**Click here**](${client
        .generateInvite({ scopes: ["applications.commands", "bot"], permissions: '116800' })})`)
      .addField("**Support**", `[**Click here**](https://discord.gg/5J53eVXYXA)`)
      .setImage("https://media.discordapp.net/attachments/836854460285583362/837677135564505088/qr-code_2.png?width=406&height=406")
      .setThumbnail(client.config.png)
      .setColor("#f0d50c")
    message.reply({ embeds: [embed] })


  },
};
module.exports.help = {
  name: 'invite',
  aliases: ["دعوة", "رابط"],
  category: 'public',
  botpermissions: ["EMBED_LINKS"],

  cooldown: 7,
}