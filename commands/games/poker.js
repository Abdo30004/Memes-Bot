const fetch = require("node-fetch");
const Discord = require("discord.js");
const i18n = require("i18n");
module.exports = {
  async execute(client, message, args,lang) {
    i18n.setLocale(lang)
    let channel = message.member.voice.channel
    if (!channel) {
      message.reply(i18n.__("commands.games.voice"))
      return;
    }
    let embed = new Discord.MessageEmbed();
    let fetched = await fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
      method: "POST",
      body: JSON.stringify({
        max_age: 0,
        max_uses: 0,
        target_application_id: "755827207812677713",
        target_type: 2,
        temporary: false,
        validate: null
      }),
      headers: {
        "Authorization": `Bot ${client.token}`,
        "Content-Type": "application/json"
      }
    })
    let invite = await fetched.json();

    embed.setDescription(`[**${i18n.__("commands.games.success", { game: "poker" })}**](https://discord.gg/${invite.code})`)
    embed.setColor("#f0d50c")
      message.reply({ embeds: [embed] })


  },
};
module.exports.help = {
  name: 'poker',
  aliases: ["pk"],
  botpermissions: ["EMBED_LINKS"],
  usage:"(only in voice channel)",

  category: 'games',
    test: false,
  cooldown: 1,
}