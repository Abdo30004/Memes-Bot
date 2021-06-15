var figlet = require('figlet');
var center = require('center-align');
const Discord = require('discord.js');
const db = require("quick.db")
const random = require('random');
const chalk = require("chalk")
const client = new Discord.Client();
module.exports = async (client) => {
  let logs = client.channels.cache.get(client.config.log);
  //console.clear()
  figlet('Memes Bot', { font: "Banner" }, async function(err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(center(chalk.red.bold(data)))
  });
  let info = {};
  info.guilds = client.guilds.cache.size;
  info.users = client.users.cache.size;
  console.log(`${client.user.tag} is here!`)
  console.table(info);

  setInterval(() => {
    let data = db.get("devonly")
    var status;
    if (!data) {


      status = "-help"
    }
    else if (data) {
      status = "🔨 البوت تحت الصيانة"
    }
    client.user.setActivity(status, { type: "PLAYING" });
    //client.user.setStatus("idle")
  }, 5000)
  let embed=new Discord.MessageEmbed()
  .setTitle("**I AM READY**")
  .setColor("BLUE")
  .setTimestamp()
  
  logs.send(embed)
}
