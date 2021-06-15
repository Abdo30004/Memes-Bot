const Discord = require("discord.js");
const canvacord = require("canvacord")
module.exports = {
  async execute(client, message, args) {
    var con=args.join(" ")
    if(!con) return message.channel.send("**اكتب الكلام من فضلك**")

    let image = await canvacord.Canvas.clyde(con);
    let attachment = new Discord.MessageAttachment(image, "clyde.png");
    await message.lineReplyNoMention(attachment).catch(err => console.log(err))

  },
};
module.exports.help = {
  name: 'clyde',
  aliases: [],
  category: 'fun',
  description: "يمكنك من الكلام عن طريق البوت clyde",
  test: false,
  cooldown: 1,
}