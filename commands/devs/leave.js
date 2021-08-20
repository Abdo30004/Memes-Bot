const Discord = require("discord.js");
const moment = require("moment");
module.exports = {

  async execute(client, message, args) {
    if (!client.config.devs.includes(message.author.id)) {
      return;
    }
    let devs = client.config.devs
    if (devs.includes(message.author.id)) {
      let id = args.join(" ")
      if (!id) {
        message.reply(`**اكتب ايدي سيرفر**`)
        return;
      }
      let guild = client.guilds.cache.get(`${id}`)
      if (!guild) {
        message.reply(`لم اجد السيرفر`)
        return;
      }
      let icon = guild.iconURL({ dynamic: true, format: "png" });
      let owner = await client.users.fetch(guild.ownerId).catch(() => null)
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
        .setFooter(`By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: "png" }));
      let row = new Discord.MessageActionRow().addComponents([
        new Discord.MessageButton().setStyle("DANGER").setCustomId("cancel").setLabel("Cancel"), new Discord.MessageButton().setStyle("SUCCESS").setCustomId("leave").setLabel("Leave")
      ])
      let msg = await message.reply({ embeds: [embed], components: [row] });
      const filter = (interaction) => interaction.user.id === message.author.id;
      const collector = await msg.createMessageComponentCollector({ filter, time: 2000000 });
      collector.on('collect', async (interaction) => {
        await interaction.deferReply()
        switch (interaction.customId) {
          case "leave":
            await guild.leave()
            interaction.editReply(`**لقد خرجت من ${guild.name}**`)
            break;
          case "cancel":
            await interaction.editReply(`**تم الإلغاء بنجاح**`)
            break;
        }

      })

    }

  },
};
module.exports.help = {
  name: 'leave',
  aliases: [],
  category: 'devs',
  cooldown: 1,
}