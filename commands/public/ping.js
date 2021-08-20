module.exports = {
  async execute(client, message, args) {
    let msg = await message.reply("pong!")
    let date = Date.now()
    msg.edit(`Ping : ${date - msg.createdAt}ms\nDiscord API : ${client.ws.ping}ms`, { code: "xl" })

  },
};
module.exports.help = {
  name: 'ping',
  aliases: ["latency", "time-taken"],
  category: 'public',
  test: false,
  cooldown: 1,
}