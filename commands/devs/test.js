const Discord = require('discord.js');
const random = require("random")
let data = require("../../funcs.js");

module.exports = {
  async execute(client, message, args) {
    if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("لا املك الصلاحيات الكافية")
    let list = await data.memes
    let meme = await list[random.int((min = 0), (max = list.length))]

    await message.channel.send(meme)


  },
};
module.exports.help = {
  name: 'test-meme',
  category:"devs"
}