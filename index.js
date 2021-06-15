const Discord = require('discord.js');require('discord-reply')
const client = new Discord.Client({
  disableMentions:"everyone",
  shards:"auto",
  restTimeOffset:0,
});
const mongoose = require('mongoose');
const fs = require('fs');
const ascii = require("ascii-table");
const express=require("express");
const chalk=require("chalk");
client.config = require('./config/bot.js');
const { AutoPoster } = require('topgg-autoposter');
const top = require('top.gg-core');
//const topgg = new top.Client(process.env.topgg);

let table = new ascii("Commands");
table.setHeading("Commands", "category","Load");
let table2 = new ascii("Events");
table2.setHeading("Event", "file","Load");

const app = express();
const ap = AutoPoster(process.env.topgg, client);
ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
});

const webhook = new top.Webhook('topggonly');

app.listen(process.env.PORT||3000,()=>{
console.log(`port : 3000`)
})
app.get("/",(req,res)=>{
res.json("hellow world")
})

app.post('/dblwebhook', webhook.advanced(), (req, res) => {
    let vote=req.vote
    let votes=client.channels.cache.get("851119328040583199");
  let msg=`**شكرا لك <@${vote.user}> للتصويت للبوت :rose:**`
  votes.send(msg)
});




client.commands = new Discord.Collection();
try {
let events=fs.readdirSync("./events/");
for (const event of events){
  var eventname=event.split(".")[0]
  var files=fs.readdirSync(`./events/${event}`).filter(file => file.endsWith(".js"));
  for(const file of files){
   var eventfile = require(`./events/${event}/${file}`);
   try{
   client.on(eventname, eventfile.bind(null, client))
   table2.addRow(eventname,file,'✅')
   } catch (err){
   table2.addRow(eventname,file,'❌')
   continue;
   }
  }
}
} catch(err){
 console.error(err);
}
try {
let categories=fs.readdirSync("./commands/");
for(const category of categories){

  var files=fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith(".js"))
  for(const file of files){

 const command = require(`./commands/${category}/${file}`);
 if(command.help.name){
   if(!command.help.description){
     command.help.description="None"
   } 
   client.commands.set(command.help.name, command)
     table.addRow(file,command.help.category ?command.help.category : "None",'✅');
  } else {
    table.addRow(file,"None", `❌`);

    continue; 
    }
}
}
} catch(err){
 console.error(err);
}
console.clear()
console.log(chalk.white.bold(table2.toString()))
console.log(chalk.white.bold(table.toString()))


client.on("error",err=>{
  console.log(err)
})

async function start(){
await client.login(process.env.token)
await mongoose.connect(process.env.mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
});

}
start()



/*
fs.readdir('./events/', (err, categories) => {
  if (err) return console.log(err);
  categories.forEach(category => {
    let categoryName = category.split('.')[0];
    fs.readdir(`./events/${category}`, (error, files) => {
      if (error) { return console.log("error i can not find commands"); };
      files.filter(file => file.endsWith(".js")).forEach(file => {
        var event = require(`./events/${category}/${file}`);
        client.on(categoryName, event.bind(null, client))
      })
    })
  })
})
*/
/*fs.readdir("./commands/", (err, categories) => {
  if (err) console.log(err)
  categories.forEach(category => {
    let categoryName = category.split('.')[0];
    fs.readdir(`./commands/${category}`, (error, files) => {
      if (error) { return console.log("error i can not find commands"); };
      files.filter(file => file.endsWith(".js")).forEach(file => {
        const command = require(`./commands/${category}/${file}`);

        client.commands.set(command.help.name, command)
      })
    })

  })
})*/




