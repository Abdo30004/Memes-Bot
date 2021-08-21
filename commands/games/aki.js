const Discord = require("discord.js");
const { Aki } = require('aki-api');
const games = new Map()
const i18n = require("i18n");
module.exports = {
  async execute(client, message, args, lang) {

    i18n.setLocale(lang)
    if (games.get(message.author.id)) {
      message.reply(i18n.__("commands.aki.already"))
      return;
    }
    const aki = new Aki(lang);
    await aki.start()

    games.set(message.author.id, true);


    let embed = new Discord.MessageEmbed()
      .setTitle(`Akinator#${aki.currentStep + 1} 🤔`)
      .setDescription(`**${aki.question}**`)
      .setFooter(`${i18n.__("commands.aki.progress")} ${Math.floor(aki.progress)}%`, client.user.displayAvatarURL({ format: "png" }))
      .setColor("#f0d50c");


    let row = new Discord.MessageActionRow().addComponents([

      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel(i18n.__("commands.aki.buttons.yes"))
        .setCustomId("yes")
        .setEmoji("✅"),
      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel(i18n.__("commands.aki.buttons.no"))
        .setCustomId("no")
        .setEmoji("❌"),

      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel(i18n.__("commands.aki.buttons.idk"))
        .setCustomId("idk")
        .setEmoji("❓"),

      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel(i18n.__("commands.aki.buttons.probably"))
        .setCustomId("probably")
        .setEmoji("👍"),

      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel(i18n.__("commands.aki.buttons.probably_not"))
        .setCustomId("probably_not")
        .setEmoji("👎")



    ])
    let row2 = new Discord.MessageActionRow().addComponents([new Discord.MessageButton()
      .setStyle("PRIMARY")
      .setLabel(i18n.__("commands.aki.buttons.back"))
      .setCustomId("back")
      .setEmoji("◀️"),
    new Discord.MessageButton()
      .setStyle("DANGER")
      .setLabel(i18n.__("commands.aki.buttons.stop"))
      .setCustomId("stop")
      .setEmoji("⛔")
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
        games.delete(message.author.id)

        return;
      }
      if (aki.currentStep >= 78 || aki.progress >= 90) {
        await aki.win();
        const guess = aki.answers[0]
        if (!guess) {
          embed.setTitle("You have win");
          msg.edit({ embeds: [embed], components: [] });
          games.delete(message.author.id);
          return;
        }
        embed.setTitle(`${guess.name}${!guess.ranking ? "" : "#" + guess.ranking}`)
        embed.setDescription(`**${guess.description}**`)
        embed.setImage(guess.absolute_picture_path)
        embed.setFooter(i18n.__("commands.aki.footer"), client.user.displayAvatarURL({ format: "png" }))
        msg.edit({ embeds: [embed], components: [] })
        games.delete(message.author.id)

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
      embed.setFooter(`${i18n.__("commands.aki.progress")} ${Math.floor(aki.progress)}%`, client.user.displayAvatarURL({ format: "png" }))
      msg.edit({ embeds: [embed] })
    })
    collector.on("end", () => {
      games.delete(message.author.id)
      msg.edit({ content: i18n.__("commands.aki.time"), embeds: [], components: [] }).catch(err => null)
      return;
    })
  }
}
module.exports.help = {
  "name": "aki",
  category: "games",
  alises: ["المارد", "تخمين", "akinator"],
  test: false,
  botpermissions: ["EMBED_LINKS"]
}