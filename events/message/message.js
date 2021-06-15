const Discord = require('discord.js');
const cooldowns = new Map();
const db = require("quick.db");
const pms = require("pretty-ms");
const chalk = require("chalk")
const top = require('top.gg-core');
const topgg = new top.Client(process.env.topgg);
const Prefixschema = require('../../models/prefix');
const Blacklistdata = require("../../models/blacklist");
module.exports = async (client, message, discord) => {
  if (message.author.bot) return;
  if (!message.channel.guild) return;
  let mention = `<@!${client.user.id}>`
  let prefixdata = await Prefixschema.findOne({ id: message.guild.id });
  var prefix;
  if (prefixdata === null) {
    prefix = client.config.prefix;
  } else {
    prefix = prefixdata.Prefix;
  }
  prefix = message.content.startsWith(mention) ? mention : prefix
  if (message.content.indexOf(prefix) !== 0) return;
  const devs = client.config.devs
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase()
  const command = client.commands.get(cmd) || client.commands.find(a => a.help.aliases && !a.help.aliases.includes("") && a.help.aliases.includes(cmd))
  if (!command) return;
  if (!message.guild.me.permissionsIn(message.channel).has("SEND_MESSAGES")) {
    try {
      return await message.react("❌")
    } catch {
      return
    }
  }
  if (!message.guild.me.permissionsIn(message.channel).has(command.help.myper)){

  }
  const voted = await topgg.isVoted(message.author.id)
  if (command) {
    const logs = client.channels.cache.get(client.config.log);

    let ldata = await Blacklistdata.findOne({ Id: message.author.id })
    if (ldata) {
      return await message.reply("**تم إعطاؤك بلاك ليست من البوت تواصل مع الدعم إن كان هذا القرار خاطئ**\
      https://discord.gg/5J53eVXYXA")
    }
    if (command.help.test && !devs.includes(message.author.id)) {
      return message.channel.send(`**تم تعطيل هذا الأمر مؤقتا**`)
    }
    if (command.help.category == "devs" && !devs.includes(message.author.id)) {
      return
    }
    console.log(chalk`{green.bold ${message.author.tag}} has used {red.bold ${command.help.name}} in {blue.bold ${message.guild.name}}`)

    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
      .setDescription(`${message.author.tag} has used ${command.help.name} in ${message.guild.name}`)
      .setTimestamp()
    logs.send(embed)
    let data = db.get("devonly")



    if (data && !devs.includes(message.author.id)) return message.reply("devs only")
  }
  if (!cooldowns.has(command.help.name)) {
    const coll = new Discord.Collection()
    cooldowns.set(command.help.name, coll)
  }
  const current_time = Date.now();
  const time_stamps = cooldowns.get(command.help.name);
  var cooldown_amount = (command.help.cooldown) * 1000
  if (voted) {
    cooldown_amount = cooldown_amount / 2
  }
  var msg
  if (time_stamps.has(message.author.id) && !devs.includes(message.author.id)) {
    const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
    if (current_time < expiration_time) {
      const time_left = pms(expiration_time - current_time)
      return message.reply(`**Please wait \`${time_left}\` 🕒**`).then(msg => {
        setTimeout(() => msg.delete()
          , cooldown_amount);
      })
    }
  }

  time_stamps.set(message.author.id, current_time)
  setTimeout(() => {
    time_stamps.delete(message.author.id)
  }
    , cooldown_amount);




  try {
    command.execute(client, message, args, voted);
  } catch (e) {
    console.log(e);
    message.channel.send(':x: | Something went wrong ```' + e + '```');
  }
}

