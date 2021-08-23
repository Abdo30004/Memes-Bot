
const Discord = require("discord.js");
//var list = +help



String.prototype.title = function () {
  return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};
const i18n = require("i18n")


module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    var dev = client.config.devs.includes(message.author.id)
    var prefix = client.guildsConfig.get(message.guild.id).prefix
    let options = [
      {
        "label": i18n.__("commands.help.public.label"),
        "value": "public",
        "emoji": "870284655608340480",
        "description": i18n.__("commands.help.public.description"),
      },
      {
        "label": i18n.__("commands.help.memes.label"),
        "value": "memes",
        "emoji": "😂",
        "description": i18n.__("commands.help.memes.description"),

      },
      {
        "label": i18n.__("commands.help.fun.label"),
        "value": "fun",
        "emoji": "✨",
        "description": i18n.__("commands.help.fun.description"),

      },
      {
        "label": i18n.__("commands.help.games.label"),
        "value": "games",
        "emoji": "🎮",
        "description": i18n.__("commands.help.games.description"),

      },
      {
        "label": i18n.__("commands.help.filters.label"),
        "value": "filters",
        "emoji": "853250920879882301",
        "description": i18n.__("commands.help.filters.description"),

      },
      {
        "label": i18n.__("commands.help.settings.label"),
        "value": "settings",
        "emoji": "⚙️",
        "description": i18n.__("commands.help.settings.description"),
      }
    ]
    if (dev) {
      options.push({
        "label": "Developer Commands", "value": "devs", "emoji": "🛠️"
      })
    }
    let row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setPlaceholder("Choose Category")
        .addOptions(options)
        .setCustomId("category"))
    let row2 = new Discord.MessageActionRow().addComponents(new Discord.MessageButton()
      .setCustomId("Delete")
      .setLabel("Delete")
      .setStyle("DANGER")
      .setEmoji("🗑️")
    )



    if (!args[0]) {
      let mainE = new Discord.MessageEmbed()
        .setTitle(`**Commands Help**`)
        .setDescription(` \`${prefix}help [command/category]\`

__Categories :__

**\`${i18n.__("commands.help.public.label")}\`** : <:public:870284655608340480>
**\`${i18n.__("commands.help.memes.label")}\`** : 😂 
**\`${i18n.__("commands.help.fun.label")}\`** : ✨ 
**\`${i18n.__("commands.help.games.label")}\`** : 🎮 
**\`${i18n.__("commands.help.filters.label")}\`** :
**\`${i18n.__("commands.help.settings.label")}\`** : ⚙️

`).setFooter(`${prefix}help`, client.user.displayAvatarURL({ format: "png" })).setTimestamp().setColor("#f0d50c")



      var msg = await message.reply({ embeds: [mainE], components: [row, row2] })
      let filter = (interaction) => interaction
      const collector = msg.createMessageComponentCollector({ filter, idle: 3 * 60 * 1000 })
      collector.on("collect", async (interaction) => {
        i18n.setLocale(lang)

        if (interaction.user.id !== message.author.id) {
          await interaction.deferReply({ ephemeral: true });
        } else {
          await interaction.deferUpdate()
        }
        if (interaction.isButton()) {
          if (interaction.user.id !== message.author.id) {
            interaction.editReply(`You can not do this`);
          } else {
            msg.delete();
          }
          return;
        }
        var category = interaction.values[0];
        let description = ">>> "
        client.commands.filter(cmd => cmd.help.category == category).forEach(cmd => {
          if (cmd.help.category !== "devs") {
            description += ` \` ${prefix}${cmd.help.name}\` **${i18n.__(`commands.${cmd.help.name}.description`) !== "No Value" ? i18n.__(`commands.${cmd.help.name}.description`) : "No description"}**\n\n `
          } else {
            description += ` \` ${prefix}${cmd.help.name}\`**\n\n `
          }
        })
        var embed = new Discord.MessageEmbed()
          .setTitle(`**<:circle:852213932001460294> ${category} Commands Help <:circle:852213932001460294>**`.title())
          .setColor("#f0d50c")
          .setDescription(description)
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: "png" }))
        if (interaction.user.id !== message.author.id) {
          interaction.editReply({ embeds: [embed] })
        } else {
          msg.edit({ embeds: [embed] })
        }
      })
      collector.on("end", async (collected) => {
        await msg.edit({ components: [] })
      })
    } else {
      const command = client.commands.get(args.join(" ").toLowerCase()) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args.join(" ").toLowerCase()))
      const category = [...new Set(client.commands.filter(cmd => cmd.help.category && cmd.help.category != "devs").map(cmd => cmd.help.category))].includes(args.join(" ").toLowerCase()) ? args.join(" ").toLowerCase() : null


      if (category) {
        let description = ""
        client.commands.filter(cmd => cmd.help.category == category).forEach(cmd => {
          description += `\` ${prefix}${cmd.help.name}\`,`
        })

        let embed = new Discord.MessageEmbed()
          .setTitle(`${category.title()} Commands`)
          .setDescription(description)
        message.reply({ embeds: [embed] })
        return;
      }
      if (!command || command.help.category === "devs") return message.reply(i18n.__("commands.help.notfound"));

      if (command && command.help.category != "devs") {
        let name = command.help.name
        var aliases;
        try {
          aliases = command.help.aliases.map(a => `\`${prefix}${a}\``).join("/")
        } catch (err) {
          aliases = "لا توجد الإختصارات"
        }
        var description = i18n.__(`commands.${command.help.name}.description`) !== "No Value" ? i18n.__(`commands.${command.help.name}.description`) : "No description"
        var usage = `${prefix}${command.help.name}${command.help.usage ? " " + command.help.usage : ""}`
        if (!name) return
        if (!aliases) {
          aliases = "لا توجد الإختصارات"
        }
        let embed = new Discord.MessageEmbed()
          .setTitle(`**Help for command ${name}**`)
          .addField("**Usage :**", `**\`${usage}\`**`)
          .addField("**Aliases :**", `${aliases}`)
          .addField("**Description :**", `**\`${description}\`**`)
          .setColor("#f0d50c").setFooter(`${prefix}help`, client.user.displayAvatarURL({ format: "png" }))
        if (command.help.permissions) {
          embed.addField("**Required Permission :**", `\`${command.help.permissions}\``)
        }
        if (command.help.botpermissions) {
          embed.addField("**Bot Required Permission :**", `\`${command.help.botpermissions}\``)
        }
        message.reply({ embeds: [embed] })


      }
    }
  },
};

module.exports.help = {
  name: 'help',
  usage: "[command/categoty]",
  aliases: ["اوامر", "الاوامر"],
  botpermissions: ["EMBED_LINKS", "USE_EXTERNAL_EMOJIS"],

  category: 'public',
  test: false,
  cooldown: 1,
}

    /*.setDescription(`>>> ${client.commands.filter(cmd =>cmd.help.category == category).map(cmd =>
            `\`${prefix}${cmd.help.name}\` **${cmd.help.description}**\n\n`
          ).join(" ")}`)*/