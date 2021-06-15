const schema = require('../../models/prefix');
const Discord = require("discord.js")
module.exports = {

  async execute(client, message, args) {
    if (!message.guild.me.hasPermission("EMBED_LINKS") && !message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS")) {
      return message.channel.send("لا املك الصلاحيات الكافية")
    }
    if (!message.member.hasPermission('ADMINISTRATOR'))
      return message.channel.send(
        `**لا تملك الصلاحيات الكافية`
      );
    const prefix = args.join(" ");
    if (!prefix) return message.channel.send('من فضلك اختر بادئة');
    try {
      let data = await schema.findOne({ id: message.guild.id });
      if (!data) {
        let newData = await schema.create({
          id: message.guild.id,
          Prefix: prefix,
        })
        await newData.save()
      } else {
        await schema.deleteMany({ id: message.guild.id });
        await schema.updateOne({
          id: message.guild.id,
          Prefix: prefix,
        })
      }
      let embed = new Discord.MessageEmbed()
        .setDescription(`**تم تعيين \`${prefix}\` كبرفكس البوت الجديد**`)
      message.channel.send(embed);
    } catch (err) { console.error(err) }

  },
};
module.exports.help = {
  name: 'setprefix',
  category: 'public',
  description: "لتغيير البرفكس الخاص بسيرفرك",
  cooldown: 60
}