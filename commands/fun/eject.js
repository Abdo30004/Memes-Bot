const Discord = require("discord.js")
module.exports = {

  async execute(client, message, args) {
    let user = message.mentions.users.first() || message.author
    let colors=["blue","green","black","yellow","red","pink","white","cyan","purple"]
    let url = await `https://vacefron.nl/api/ejected?name=${encodeURIComponent(user.username)}&impostor=true&crewmate=${colors[Math.floor(Math.random()*colors.length)]}`
    let img = new Discord.MessageAttachment(url, "ejected.png")
    await message.reply({ files: [img] })
  },
};
module.exports.help = {
  name: 'eject',
  usage: "[user]",

  aliases: [],
  category: 'fun',
}