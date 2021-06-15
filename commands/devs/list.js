const Discord = require("discord.js");
const Shema = require("../../models/blacklist");
module.exports = {
    async execute(client, message, args) { 
 const data=await Shema.find({});
 let array=data.map(data=>`${data.Id}/**${data.Reason}**/${data.By}\n`)
 let list=`\`\`\n${array}\`\``
 message.channel.send(list)
   },
};
module.exports.help = {
  name: 'blacklist',
  aliases: [],
  category: 'devs',
  description: "",
  test :false,
  cooldown: 1,
}