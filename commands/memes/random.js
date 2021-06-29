const Discord = require('discord.js');
const random = require("random");
let data = require("../../funcs.js");
module.exports = {
  async execute(client, message, args) {
    let memes = await data.memes
    let embed = new Discord.MessageEmbed()
      .setTitle("😂 ميمز عشوائية")
      .setColor("#ffd400")
      .addField('** «——————»  **', '** **')
      .addField('**اضغط على الايموجي مرتين للتنقل بين الميمز**', '** **')
      .setDescription(`[**رابط الموقع**](https://arb-memes.com/)`)
      .setThumbnail("https://media.discordapp.net/attachments/754299533264945153/835520481959346196/icon.png")

      .setImage(await memes[random.int((min = 0), (max = memes.length))])
    try{
    let msg=await message.author.send(embed);
    } catch (err){
     message.channel.send(`**للأسف خاصك مغلق لا أستطيع إرسال الميمز :x: **`);
      return;
    }
    await message.channel.send(`**تم إرسال الميمز في خاصك ✅**`)
      try {
        await msg.react('😂')
      } catch (err) {
        return console.error(err)
      }
      const memeFilter = (reaction, user) => reaction.emoji.name === '😂' && user.id === message.author.id;
      const meme = msg.createReactionCollector(memeFilter, { time: 2000000 });
      meme.on('collect', async (reaction, user) => {
        embed.setImage(await memes[random.int((min = 0), (max = memes.length))]);
        msg.edit(embed)


      });
    

  },
};
module.exports.help = {
  name: 'random',
  aliases: [],
  category: 'memes',
  cooldown: 10,
  help: "https://cdn.discordapp.com/attachments/839014654029725737/839108442906951712/random.gif",
  description: 'ارسال ميم عشوائي فالخاص',
}
