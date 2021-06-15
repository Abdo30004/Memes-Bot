const Discord = require("discord.js");
module.exports = async (client, guild) => {
  let logs = client.channels.cache.get(client.config.log);
  let embed = new Discord.MessageEmbed()
    .setTitle("**I am in new Guild**")
    .setDescription(`
  **Name** : ${guild.name}

  **Id** : ${guild.id}

  **Members**: ${guild.memberCount}

  **Owner** : ${guild.ownerID}
  `)
    .setImage(guild.iconURL({ format: "png", dynamic: true }))
    .setColor("GREEN")
  logs.send(embed)
}