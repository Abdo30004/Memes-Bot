const Discord = require("discord.js");
const axios = require("axios")
const i18n = require("i18n");
module.exports = {
  async execute(client, message, args, lang) {
    i18n.setLocale(lang)
    let mention = `<@!${client.user.id}>`
    const Config = client.guildsConfig.get(message.guild.id)

    var prefix = message.content.startsWith(mention) ? mention : Config.prefix || client.config.prefix
    let type = message.content.slice(prefix.length).split(/ +/g)[0];
    type == "serie" ? type = "series" : null
    type == "movies" ? type = "movie" : null
    var movie = args.join(" ")
    if (!movie) {
      //message.reply(i18n.__("commands.fun.comment"))
      return;
    }
    console.log(type)
    const url = `http://www.omdbapi.com/?t=${encodeURI(await client.translate(movie))}&apikey=bf9b12b9&type=${type}`

    let data = (await axios.get(url)).data
    return console.log(data)

    try {
      await message.reply({ embeds: [attach] })
    } catch {
      await message.channel.send({ embeds: [attach] })
    }

  },
};
module.exports.help = {
  name: 'movie',
  
  aliases: ["serie", "movies", "series"],
  botpermissions: ["EMBED_LINKS"],
  category: 'devs', test: true,
  cooldown: 1,
}