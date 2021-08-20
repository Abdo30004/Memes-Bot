const Discord = require("discord.js");
const Shema = require("../../models/blacklist");
module.exports = {
  async execute(client, message, args) {
    let devs = client.config.devs
    let user = message.mentions.users.first() || client.users.fetch(args[0]).catch(err => null)
    if (!user) {
      return message.reply("**من فضلك منشن أو أكتب ايدي شخص**")
    }
    if (user.bot) {
      message.reply('**لا يمكن إعطاء بلاك ليست للبوتات**')
      return;
    }
    if (devs.includes(user.id)) {
      message.reply('**لا يمكن إعطاء بلاك ليست لمالكي البوت**')
      return;;
    }
    let data = await Shema.findOne({ _id: user.id });
    if (!data) {
      message.reply(`**هذا المستخدم غير موجود فالقائمة من قبل**`)
      return;
    }
    await Shema.findOneAndDelete({ _id: user.id })
    await message.reply(`**تم نزع ${user.tag} من البلاك ليست**`);


  }
}
  module.exports.help = {
    name: 'unblacklist',
    aliases: [],
    category: 'devs',
    description: "",

    cooldown: 1,
  }