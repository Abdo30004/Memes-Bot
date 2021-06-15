const Discord = require("discord.js");
const canvacord = require("canvacord")
module.exports = {
  async execute(client, message, args) {
    var con=args.join(" ")
    if(!con) return message.channel.send("**اكتب الكلام من فضلك**")

    let image = await canvacord.Canvas.ohno(con);
    let attachment = new Discord.MessageAttachment(image, "ohno.png");
    await message.lineReplyNoMention(attachment).catch(err => console.log(err))

  },
};
module.exports.help = {
  name: 'ohno',
  aliases: [],
  category: 'fun',
  description: "يمكنك من عمل  ميم عن طريق البوت ",
  test: false,
  cooldown: 1,
}