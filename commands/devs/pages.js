const Discord = require("discord.js")
const axios=require("axios")
module.exports = {
  async execute(client, message, args) {
    const { data } = await axios.get("https://arb-memes.com/memes-bot/test.php");
      let memes = data.map(body => body.link)
    let devs = client.config.devs
    if (devs.includes(message.author.id)) {
      let number = isNaN(args[0]) ? 0 : Number(args[0]) > memes.length - 1 || Number(args[0]) < 0 ? memes.length - 1 : Number(args[0])
      let row = new Discord.MessageActionRow().addComponents([
        new Discord.MessageButton()
          .setLabel("previous")
          .setEmoji("◀")
          .setCustomId("previous")
          .setStyle("SUCCESS"),

        new Discord.MessageButton()
          .setLabel("next")
          .setEmoji("▶")
          .setCustomId("next")
          .setStyle("SUCCESS")
      ])

      let embed = new Discord.MessageEmbed()
        .setColor("#ffd400")
        .setFooter(`meme ${number + 1} of ${memes.length}`)
        .setImage(memes[number])

      let msg = await message.reply({ embeds: [embed], components:[row] });

      const filter = (interaction) => interaction.user.id === message.author.id;

      const collector = msg.createMessageComponentCollector(filter, { time: 2000000 });

      collector.on('collect', async (interaction) => {
        await interaction.deferUpdate()
        switch (interaction.customId) {
          case "previous":
            number -= 1
            if (number < 0) {
              number = memes.length - 1
            }
            break;
          case "next":
            number += 1
            if (number > memes.length - 1) {
              number = 0
            }
            break;
        }
        embed.setImage(memes[number]);
        embed.setFooter(`Page ${number+1} of ${memes.length}`);
        msg.edit({ embeds: [embed] })
      })



    }
  }
}
module.exports.help = {
  name: 'pages',
  aliases: [],
  category: 'devs',
}
