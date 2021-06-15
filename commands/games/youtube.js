const fetch=require("node-fetch");
const Discord=require("discord.js");
module.exports = {
  async execute(client, message, args) {
    let channel = message.member.voice.channel
    if (!channel) return message.reply("**لا يمكنك استعمال الأمر خارج قناة صوتية**")
    let embed = new Discord.MessageEmbed();
    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
      method: "POST",
      body: JSON.stringify({
        max_age: 0,
        max_uses: 0,
        target_application_id: "755600276941176913",
        target_type: 2,
        temporary: false,
        validate: null
      }),
      headers: {
        "Authorization": `Bot ${client.token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(invite => {
        embed.setDescription(`[**إضغط هنا لمشاهدة youtube**](https://discord.gg/${invite.code})`)
        embed.setColor("RED")
        message.channel.send(embed)
      })

  },
};
module.exports.help = {
  name: 'youtube',
  aliases: ["yt"],
  category: 'games',
  description: "مشاهدة يوتوب مع أصدقائك",
  test: false,
  cooldown: 1,
}