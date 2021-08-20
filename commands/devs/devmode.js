const db = require("quick.db")
module.exports = {
  execute: async (client, message, args) => {
    const devs = client.config.devs
    if (!client.config.devs.includes(message.author.id)) {
      return;
    }
    if (devs.includes(message.author.id)) {
      let mode = message.content.split(" ").slice(1, 2).join(" ")
      if (!mode) { return message.reply("**Use : ?devonly on ,?devonly off**") }
      let fetch = await db.fetch("devonly")
      if (fetch == null) {
        await db.set("devonly", false)
      } else if (mode == "on") {
        await db.set("devonly", true)
        message.reply("**Devonly mode on**")
      } else if (mode == "off") {
        await db.set("devonly", false)
        message.reply("**Devonly mode off**")
      } else {
        return message.reply("Bad request")
      }

    }
  }
};
module.exports.help = {
  name: "devonly",
  category: 'devs',
  aliases: ["devsonly", "donly"],
}