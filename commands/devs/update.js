const got = require("got")
const fs = require("fs")

module.exports = {
    async execute(client, message, args) { 
      const devs = client.config.devs  
      if (devs.includes(message.author.id)) {
    const url = "https://arb-memes.com/memes-bot/json_img.php";
    const url2 = "https://arb-memes.com/memes-bot/json_video.php"
    const json = await got(url)
      .then(response => fs.writeFile("./data/memes.json", (response.body), (err) => {
        if (err) {
          console.error(err);
          message.channel.send("**🔴 لقد حدث خطأ اثناء تحديث الميمز**")

        }
        if (!err) {
          message.channel.send("**🟢 تم تحديث الميمز بنجاح**")
        }
      })
      ).catch((e) => { console.error(err) })
    const json2 = await got(url2)
      .then(response => fs.writeFile("./data/videos.json", (response.body), (err) => {
        if (err) {
          console.error(err);
          message.channel.send("**🔴 لقد حدث خطأ اثناء تحديث الفيديوهات**")

        }
        if (!err) {
          message.channel.send("**🟢 تم تحديث الفيديوهات بنجاح**")
        }
      })
      ).catch((e) => { console.error(err) })

   }
}
}
module.exports.help = {
    name: 'update',
    aliases: [], // you can add more
    category: '',}