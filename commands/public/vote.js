const Discord = require("discord.js");
const i18n = require("i18n")
const axios = require("axios")
module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang)

    let user = message.mentions.users.first() || await client.users.fetch(args.join(" ")).catch(err => null) || message.author
    if (user.bot) {
      message.reply(`**Bots can't vote :face_with_raised_eyebrow: **`);
      return;
    }

    let voted = await client.topgg.isVoted(user.id)
    let link = `[__top.gg__](https://top.gg/bot/836645198271610950/vote)`
    let msg = voted ? i18n.__("commands.vote.voted", {link}) : i18n.__("commands.vote.not_voted",{link})
    let embed = new Discord.MessageEmbed()
      .setAuthor(`${user.tag}`, user.displayAvatarURL({ dynamic: true, format: "png" }))
      .setDescription(msg)
      .setTimestamp()
      .setColor("#f0d50c")
    await message.reply({ embeds: [embed] })
  }
}
module.exports.help = {
  "name": "vote",
  aliases: ["voted", "check"],
  usage: "[user]",
  botpermissions: ["EMBED_LINKS"],
  cooldown: 10,
  category: "public"


}