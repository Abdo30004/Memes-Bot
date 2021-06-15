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
message.channel.send(`**هذا المستخدم غير موجود فالقائمة من قبل**`)
    } else {
      await Shema.findOneAndDelete({Id:user.id})
      await message.channel.send(`**تم نزع ${user.tag} من البلاك ليست**`)
    }
  },
};
module.exports.help = {
  name: 'unblacklist',
  aliases: [],
  category: 'devs',
  description: "",

  cooldown: 1,
}