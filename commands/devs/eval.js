const { inspect } = require("util")
const Discord = require('discord.js');
const moment = require("moment")
const db = require("quick.db");
module.exports = {

  execute: async (client, message, args) => {
    if(message.author.id!==="760952710383665192"){
   return;
   }
    const owner = client.config.devs
    if (owner.includes(message.author.id)) {
      try {
        const code = args.join(" ");
        if (!code) return message.channel.send(`**What do you want to eval **`)
        //let nope = ["client.token", "process.env"]
        let nope=[/process.env/gi,/client.token/gi]
        for(const no of nope){
        if (no.test(message.content))
        {return message.channel.send("**are you stupid ?**")
        }
        }
        let evaled = eval(code);
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

        await message.channel.send(embed).catch(err => message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``))


      } catch (err) {

        message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
      }
    }
  }
}
module.exports.help = {
  name: "eval",
  category: 'devs',
  aliases: ["ev", "iv"],
}
