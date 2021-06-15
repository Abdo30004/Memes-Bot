const Img = require('image-generation-for-discord');
const Discord = require("discord.js");
module.exports = {
    async execute(client, message, args) { 

    let text=args.join(" ")

     let img = await Img.danger(text);
    let attach = new Discord.MessageAttachment(img, `danger.png`);
    await message.channel.send(attach)
 
   },
};
module.exports.help = {
  name: 'test',
  aliases: [],
  category: '',
  description: "",
  test :true,
  cooldown: 1,
}