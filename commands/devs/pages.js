const Discord = require("discord.js")
let data = require("../../funcs.js");
module.exports = {
  async execute(client, message, args) {
    let devs = client.config.devs
    if (devs.includes(message.author.id)) {
      let memes = await data.memes
      var meme;
      if (!args[0] || isNaN(Number(args[0])) || Number(args[0]) < 1 || Number(args[0]) > memes.length) {
        meme = 1
      } else {
        meme = Number(args[0])
      }

      let embed = new Discord.MessageEmbed()
        .setColor("#ffd400")
        .setFooter(`meme ${meme} of ${memes.length}`)
        .setImage(memes[meme - 1])
      message.channel.send(embed).then(msg => {
        msg.react('◀').then(r => {
          msg.react('▶')
          setTimeout(() => {
            msg.delete
          }, 60 * 1000)
          const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
          const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
          const backwards = msg.createReactionCollector(backwardsFilter, { time: 2000000 });
          const forwards = msg.createReactionCollector(forwardsFilter, { time: 2000000 });
          backwards.on('collect', async (reaction, user) => {
            if (meme === 1) return;
            meme--;
            embed.setImage(memes[meme - 1]);
            embed.setFooter(`Page ${meme} of ${memes.length}`);
            msg.edit(embed)
            reaction.users.remove(user.id)
          })
          forwards.on('collect', async (reaction, user) => {
            if (meme === memes.length) return;
            meme++;
            embed.setImage(memes[meme - 1]);
            embed.setFooter(`Page ${meme} of ${memes.length}`);
            msg.edit(embed)
            reaction.users.remove(user.id)
          })
        })
      })

    }
  }
}
module.exports.help = {
  name: 'pages',
  aliases: [],
  category: 'devs',
}