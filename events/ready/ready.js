var figlet = require('figlet');
var center = require('center-align');
const Discord = require('discord.js');
const db = require("quick.db")
const random = require('random');
const chalk = require("chalk");
const fetch=require("node-fetch")
module.exports = async (client) => {
  //console.clear()
  figlet('Memes Bot', { font: "Banner" }, async function (err, data) {
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
        let status="-help"//"-help";
fetch("https://memes-bot-1.herokuapp.com/")
    client.user.setActivity(status, { type: "PLAYING" });
  }, 5000)


  let embed = new Discord.MessageEmbed()
    .setTitle("**I AM READY**")
    .setColor("BLUE")
    .setTimestamp()

  client.logs.send({ embeds: [embed] })
}
