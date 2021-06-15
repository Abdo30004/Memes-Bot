const Discord = require("discord.js");
const Shema = require("../../models/blacklist");
module.exports = {
  async execute(client, message, args) {
    let devs = client.config.devs
    let user = message.mentions.users.first() || client.users.cache.get(args[0])
    let reason = args.slice(1).join(" ")
    if (!user) {
      return message.channel.send("**من فضلك منشن أو أكتب ايدي شخص**")
    }
    if (user.bot) return message.channel.send('**لا يمكنك إعطاء بلاك ليست للبوتات**')
    if (devs.includes(user.id)) return message.channel.send('**لا يمكنك إعطاء بلاك ليست لمالكي البوت**')
    if (!reason) reason = "No reason provided"
    let data = await Shema.findOne({ Id: user.id });
    if (!data) {
      let logs = client.channels.cache.get("849971085021413416")
      let newdata = await Shema.create({
        Id: user.id,
        Reason: reason,
        By: message.author.tag
      })
      await newdata.save()
      let log = new Discord.MessageEmbed()
        .setTitle(`**New User in the black list**`)
        .addField("**Id**", user.id)
        .addField("**name**", user.tag)
        .addField("**Reason**", reason)
        .setImage(user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
        .setTimestamp()
        .setFooter(`by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
      await message.channel.send(`**تم إضافة ${user.tag} إلى القائمة السوداء**`)
      await logs.send(log)
    } else {
      message.channel.send("**هذا المستخدم موجود فالقائمة السوداء من قبل**")
    }
  },
};
module.exports.help = {
  name: 'addblacklist',
  aliases: [],
  category: 'devs',
  description: "",

  cooldown: 1,
}