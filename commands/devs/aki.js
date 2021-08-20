const Discord = require("discord.js");
const { Aki } = require('aki-api');

const i18n = require("i18n");
module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    const aki = new Aki(lang);
    await aki.start()
    let embed = new Discord.MessageEmbed()
      .setTitle(`Akinator#${aki.currentStep + 1} 🤔`)
    .setDescription(`**${aki.question}**`)
    .setFooter(`${i18n.__("commands.aki.progress")} ${Math.floor(aki.progress)}%`)
      .setColor("#f0d50c");


    let row = new Discord.MessageActionRow().addComponents([

      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel(i18n.__("commands.aki.buttons.yes"))
        .setCustomId("yes"),
      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel(i18n.__("commands.aki.buttons.no"))
        .setCustomId("no"),
      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel(i18n.__("commands.aki.buttons.idk"))
        .setCustomId("idk"),
      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel(i18n.__("commands.aki.buttons.probably"))
        .setCustomId("probably"),
      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel(i18n.__("commands.aki.buttons.probably_not"))
        .setCustomId("probably_not"),


    ])
    let row2 = new Discord.MessageActionRow().addComponents([new Discord.MessageButton()
      .setStyle("PRIMARY")
      .setLabel(i18n.__("commands.aki.buttons.back"))
      .setCustomId("back"),
    new Discord.MessageButton()
      .setStyle("DANGER")
      .setLabel(i18n.__("commands.aki.buttons.stop"))
      .setCustomId("stop")
    ])
    let msg = await message.reply({ embeds: [embed], components: [row, row2] })
    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = await msg.createMessageComponentCollector({ filter, idle: 3 * 60 * 1000 });
    collector.on('collect', async (interaction) => {
      await interaction.deferUpdate()
      if (interaction.customId === "stop") {
        collector.stop();
        msg.delete()
        message.reply(i18n.__("commands.aki.stoped"));
        return;
      }
      if (aki.currentStep >= 78 || aki.progress >= 90) {
        await aki.win();
        const guess = aki.answers[0]
        embed.setTitle(`${guess.name}${!guess.ranking ? "" : "#" + guess.ranking}`)
        embed.setDescription(guess.description)
        embed.setImage(guess.absolute_picture_path)
        embed.setFooter(i18n.__("commands.aki.footer"),client.user.displayAvatarURL({format:"png"}))
        msg.edit({ embeds: [embed], components: [] })
        return;
      }
      var answer;
      switch (interaction.customId) {
        case "yes":
          answer = 0
          break;
        case "no":
          answer = 1
          break;
        case "idk":
          answer = 2
          break;
        case "probably":
          answer = 3
          break;
        case "probably_not":
          answer = 4
          break;
        case "back":
          answer = "back"
          break;
        default:
          answer = 0
          break;
      }
      if (answer === "back") {
        if (aki.currentStep === 0) {
          return;
        }
        await aki.back()
      } else {
        await aki.step(answer)
      }
      var emoji
      if (aki.progress <= 20) {
        emoji = "🤔"
      } else if (aki.progress <= 40) {
        emoji = "🧐"
      } else if (aki.progress <= 60) {
        emoji = "😮"
      } else if (aki.progress <= 80) {
        emoji = "🥱"
      } else if (aki.progress <= 100) {
        emoji = "😎"
      }



      embed.setTitle(`Akinator#${aki.currentStep + 1} ${emoji}`)
      embed.setDescription(`**${aki.question}**`)
      embed.setFooter(`${i18n.__("commands.aki.progress")} ${Math.floor(aki.progress)}%`)


      msg.edit({ embeds: [embed] })
    })
    collector.on("end", () => {
      msg.edit({ content: i18n.__("commands.aki.time"), embeds: [], components: [] })
      return;
    })
  }
}
module.exports.help = {
  "name": "aki",
  category: "devs",
  test: true,
  botpermissions: ["EMBED_LINKS"]
}