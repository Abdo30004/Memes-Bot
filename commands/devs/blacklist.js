const Discord = require("discord.js");
const Shema = require("../../models/blacklist");
module.exports = {
  async execute(client, message, args) {
    let devs = client.config.devs
    if (!client.config.devs.includes(message.author.id)) {
      return;
    }
    let user = message.mentions.users.first() ||await client.users.fetch(args[0]).catch(err => null);

    let reason = args.slice(1).join(" ") || "No reason provided"
    if (!user) {
      message.reply("**من فضلك منشن أو أكتب ايدي شخص**")
      return;
    }
    if (user.bot) {
      message.reply('**لا يمكنك إعطاء بلاك ليست للبوتات**')
      return;
    }
    if (devs.includes(user.id)) {
      message.reply('**لا يمكنك إعطاء بلاك ليست لمالكي البوت**')
      return;
    }

    let data = await Shema.findOne({ _id: user.id });
    if (data) {
      message.reply("**هذا المستخدم موجود فالقائمة السوداء من قبل**")
      retunr;
    }

    let logs = client.channels.cache.get("849971085021413416")
    let newdata = await Shema.create({
      _id: user.id,
      reason: reason,
      by: message.author.id
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
    await message.reply(`**تم إضافة ${user.tag} إلى القائمة السوداء**`)
    //await logs.send(log)



  },
};
module.exports.help = {
  name: 'blacklist',
  aliases: [],
  category: 'devs',
  description: "",
}