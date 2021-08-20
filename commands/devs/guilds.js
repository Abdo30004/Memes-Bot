const Discord = require("discord.js");
const moment = require("moment")
module.exports = {
  async execute(client, message, args) {
    if (!client.config.devs.includes(message.author.id)) {
      return;
    }
    async function embed(guild, number) {
      let icon = guild.iconURL({ dynamic: true, format: "png" });
      let owner = await client.users.fetch(guild.ownerId)
      let config = client.guildsConfig.get(message.guild.id)
      let embed = new Discord.MessageEmbed()
        .setTitle(guild.name)
        .setURL(icon)
        .addFields([
          {
            "name": "Id :",
            "value": `${guild.id}`
          }, {
            "name": "Prefix :",
            "value": `${config.prefix}`
          }, {
            "name": "Language :",
            "value": `${config.language}`
          }, {
            "name": "Members :",
            "value": `${guild.memberCount}`
          }, {
            "name": "Created",
            "value": `${moment(guild.createdAt).fromNow()}`
          },
          {
            "name": "Owner id",
            "value": `${owner.id}`
          },
          {
            "name": "Owner tag",
            "value": `${owner.tag}`
          }
        ])
        .setThumbnail(icon)
        .setTimestamp(guild.createdAt)
        .setFooter(`Guild ${number + 1} of ${client.guilds.cache.size}`)
      return embed
    }

    let guilds = [...client.guilds.cache.values()]
    let number = isNaN(args[0]) ? 0 : Number(args[0]) > guilds.length - 1 || Number(args[0]) < 0 ? guilds.length - 1 : Number(args[0])
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

    let msg = await message.reply({ embeds: [await embed(guilds[number], number)], components: [row] });
    let filter = (interaction) => interaction.user.id === message.author.id;
    let collector = msg.createMessageComponentCollector(filter, { time: 120 * 1000 });

    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate()
      switch (interaction.customId) {
        case "previous":
          number -= 1
          if (number < 0) {
            number = guilds.length - 1
          }
          break;
        case "next":
          number += 1
          if (number > guilds.length - 1) {
            number = 0
          }
          break;
      }
      msg.edit({ embeds: [await embed(guilds[number], number)] })
    })

  },
};
module.exports.help = {
  name: 'guilds',
  aliases: [],
  category: 'devs',
  description: "",
  test: false,
  cooldown: 1,
}