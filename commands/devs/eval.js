const { inspect } = require("util")
const Discord = require('discord.js');
const moment = require("moment")
const db = require("quick.db");
module.exports = {

  execute: async (client, message, args) => {
    if (!client.config.devs.includes(message.author.id)) {
      return;
    }
    if (message.author.id !== "760952710383665192") {
      return;
    }
    const owner = client.config.devs
    if (owner.includes(message.author.id)) {
      const code = args.join(" ");
      if (!code) return message.reply(`**What do you want to eval **`)
      //let nope = ["client.token", "process.env"]
      let nope = [/process.env/gi, /client.token/gi]
      for (const no of nope) {
        if (no.test(message.content)) {
          return message.reply("**are you stupid ?**")
        }
      }
      try {
        var evaled = await eval(code);
        if (typeof evaled !== "string")
          evaled = inspect(evaled)
        let embed = new Discord.MessageEmbed()
          .setTitle("Eval Result")
          .setDescription(`
        **Input** :inbox_tray:
        \`\`\`js\n ${code} \`\`\`
        **Output** :outbox_tray:
        \`\`\`js\n ${evaled} \`\`\`
        `)

        await message.reply({ embeds: [embed] }).catch(err => message.reply(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``))


      } catch (err) {

        message.reply(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
        return;
      }
    }
  }
}
module.exports.help = {
  name: "eval",
  botpermissions: ["EMBED_LINKS"],

  category: 'devs',
  aliases: ["ev", "iv"],
}
