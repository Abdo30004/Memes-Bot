const Discord = require("discord.js");
const Shema = require("../../models/blacklist");
const moment = require("moment")
module.exports = {
  async execute(client, message, args) {
    if(!client.config.devs.includes(message.author.id)){
    return;
  }
    async function embed(user) {
      let avatar = user.displayAvatarURL({ dynamic: true, format: "png" });
      let data = await Shema.findOne({ _id: user.id });
      let by = await client.users.fetch(data ?.by).catch(err => null)
      let embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, avatar)
        .addFields([
          {
            "name": "Id :",
            "value": user.id
          }, {
            "name": "Reason :",
            "value": data ?.reason || "No reason"
          }, {
            "name": "From",
            "value": `${moment(data.at).fromNow()}`
          }
        ])
        .setFooter(`This user has been blacklisted by ${by.tag}`, by.displayAvatarURL({ dynamic: true, format: "png" }))
        .setTimestamp(data.at)
      return embed
    }
    const data = await Shema.find({});
    if (!data.length) {
      message.reply(`**لا يوجد أشخاص فالقائمة السوداء حاليا**`)
      return;
    }

    let users = await Promise.all(data.map(data => client.users.fetch(data._id)))
    let number = isNaN(args[0]) ? 0 : Number(args[0]) > users.length - 1||Number(args[0])<0 ? users.length - 1 : Number(args[0])
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
    let msg = await message.reply({ embeds: [await embed(users[number])], components: [row] });
    let filter = (interaction) => interaction.user.id === message.author.id;
    let collector = msg.createMessageComponentCollector( {filter ,time: 120 * 1000 });

    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate()
      switch (interaction.customId) {
        case "previous":
          number -= 1
          if (number < 0) {
            number = users.length - 1
          }
          break;
        case "next":
          number += 1
          if (number > users.length - 1) {
            number = 0
          }
          break;
      }
      msg.edit({ embeds: [await embed(users[number])] })
    })

  },
};
module.exports.help = {
  name: 'blacklists',
  aliases: [],
  category: 'devs',
  description: "",
  test: false,
  cooldown: 1,
}