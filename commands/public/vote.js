module.exports = {
  async execute(client, message, args, voted) {
    if (voted) {
      message.channel.send("**:rose: شكرا لقد صوتت بالفعل للبوت :rose:**")
    } else {
      message.channel.send("**للأسف لم تصوت للبوت** \
   https://top.gg/bot/836645198271610950/vote")
    }

  },
};
module.exports.help = {
  name: 'vote',
  aliases: ["تصويت"],
  category: 'public',
  description: "يمكنك من معرفة إذا صوتت للبوت على top.gg",
  test: false,
  cooldown: 1,
}