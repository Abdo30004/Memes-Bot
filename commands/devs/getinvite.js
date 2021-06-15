module.exports = {

    async execute(client, message, args) { 
 		let devs = ["760952710383665192"]
		if (devs.includes(message.author.id)) {
			let id = message.content.split(" ").slice(1).join("")
			if(!id) return message.channel.send(`اكتب ايدي سيرفر`)
			let guild =client.guilds.cache.get(`${id}`)
			if(!guild) return message.channel.send(`لم اجد السيرفر`)
			var url;
			await guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('CREATE_INSTANT_INVITE')).createInvite({ maxAge: 0 }).then(invite => url =invite.url).catch(err=>{message.channel.send(`${err}`)})
			message.channel.send(url)
		}
 
   },
};
module.exports.help = {
    name: 'getinvite',
    aliases: [], 
    category: 'devs',
    cooldown:1,}