
const Discord = require("discord.js");
const schema = require('../../models/prefix');

module.exports = {
  async execute(client, message, args) {
    String.prototype.title = function() {
      return this.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
    var dev = client.config.devs.includes(message.author.id)
    var prefixdata = await schema.findOne({ id: message.guild.id });
    var prefix;
    if (prefixdata === null) {
      prefix = client.config.prefix;
    } else {
      prefix = prefixdata.Prefix
    }
    var list = [...new Set(client.commands.filter(cmd => cmd.help.category && cmd.help.category != "devs").map(cmd => cmd.help.category))]
    if(!args[0]){
    let mainE = new Discord.MessageEmbed()
      .setTitle(`**Commands Help**`)
      .setDescription(`
**Public Commands** : :busts_in_silhouette: \n
**Memes Commands** : :joy: \n
**Fun Commands** : :sparkles: \n
**Games Commands** :video_game: \n
**Filters Commands** :mage: \n

`)
    let msg = await message.channel.send(mainE)
    try {
      await msg.react("853250870400385044")
      await msg.react("853250871139237898")
      await msg.react("✨")
      await msg.react("🎮")
      await msg.react("853250920879882301")
    } catch (err) {
      return
    }
    if (dev) {
      await msg.react("852213932001460294")    
    }
    let filter = (reaction, user) => user.id == message.author.id
    const collector = msg.createReactionCollector(filter, { time: 60 * 60 * 1000 })
    collector.on("collect", (reaction, user) => {
      var category;
      switch (reaction.emoji.name) {
        case "👥":
          category = "public"
          break;
        case "😂":
          category = "memes"
          break;
        case "✨":
          category = "fun"
          break;
        case "🎮":
          category = "games"
          break;
        case "🧙":
          category = "filters"
          break;
        case "circle":
          category = "devs"
          break;
      }
      var embed = new Discord.MessageEmbed()
        .setTitle(`**<:circle:852213932001460294> ${category} Commands Help <:circle:852213932001460294>**`.title())
        .setDescription(`>>> ${client.commands.filter(cmd =>cmd.help.category == category).map(cmd =>
          `\`${prefix}${cmd.help.name}\` **${cmd.help.description}**\n\n`
        ).join(" ")}`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: "png" }))
      reaction.users.remove(user.id)
      msg.edit(embed)
    })
    } else {
      const command = client.commands.get(args.join(" ").toLowerCase()) || client.commands.find(a => a.aliases && a.aliases.includes(args.join(" ").toLowerCase()))

      if (!command) return message.channel.send(`❗ - I did not found this command !`);

      if (command && command.help.category != "devs") {
        let name = command.help.name
        var aliases;
        try {
          aliases = command.help.aliases.map(a => `${prefix}${a}`).join(",")
        } catch (err) {
          aliases = "لا توجد الإختصارات"
        }
        var image = await `https://api.abderrahmane300.repl.co/memes-bot/${command.help.name}.gif`
        var description = command.help.description
        if (!name) return
        if (!aliases) { aliases = "لا توجد الإختصارات" }
        if (!description) { description = "لا يوجد وصف" }
        let embed = new Discord.MessageEmbed()
          .setTitle(`**Help for command ${name}**`)
          .addField("**Aliases | الإختصارات**", aliases)
          .addField("**Description | الوصف**", `**${description}**`)
          .setImage(image ? image : null)
          .setColor('#ffd400')
        message.channel.send(embed)

      }
    }
  },
};
module.exports.help = {
  name: 'new-help',
  aliases: [],
  category: 'devs',
  description: "",
  test: false,
  cooldown: 1,
}
