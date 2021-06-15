const Discord = require("discord.js")
module.exports = {

    async execute(client, message, args) { 
 		let devs = client.config.devs
		if (devs.includes(message.author.id)) {
			let id = message.content.split(" ").slice(1).join("")
			if(!id) return message.channel.send(`اكتب ايدي سيرفر`)
			let guild =client.guilds.cache.get(`${id}`)
			if(!guild) return message.channel.send(`لم اجد السيرفر`)
       let embeds = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setTitle(`**هل انت متأكد **`)
			    message.channel.send(embeds).then(async (msg) => {
      try {
        await msg.react("✅")
        await msg.react("❎")
      } catch (err) {
         return 
      }
      const trueFilter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
      const True = await msg.createReactionCollector(trueFilter, { time: 2000000 });
      const falseFilter = (reaction, user) => reaction.emoji.name === '❎' && user.id === message.author.id;
      const False = await msg.createReactionCollector(falseFilter, { time: 2000000 });
      await True.on('collect', async (reaction, user) => {
          await guild.leave().then(()=>{
            msg.delete()
            message.channel.send(`تم طلعت من **${guild.name}**`)
          })
      })
      await False.on('collect', async (reaction, user) => {
        msg.delete()
         return message.channel.send(`**تم الغاء الأمر**`)
      })
    })
			
		}
 
   },
};
module.exports.help = {
    name: 'leave',
    aliases: [], 
    category: 'devs',
    cooldown:1,}