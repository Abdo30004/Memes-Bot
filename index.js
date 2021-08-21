
"use strict";
console.clear()

const Discord = require('discord.js')
console.log(`${Discord.version}`)
const mongoose = require('mongoose');
const fs = require('fs');
const ascii = require("ascii-table");
const express = require("express");
const chalk = require("chalk");
const top = require('top.gg-core');
const i18n = require("i18n");
const path = require("path");
const translate = require('@vitalets/google-translate-api');
const download = require("download");
const { Decoder } = require('@canvacord/gif');
const Encoder = require('gifencoder');
const Canvas = require("canvas");
const client = new Discord.Client({
  intents: [
    'GUILDS',
    'GUILD_EMOJIS_AND_STICKERS',
    'GUILD_INTEGRATIONS',
    'GUILD_WEBHOOKS',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
  ],
  restTimeOffest: 0,
  allowedMentions: {
    parse: ["users"],
    repliedUser: false,
  },
  failIfNotExists: false
});

client.config = require('./config/bot.js');
client.util = require("./funcs.js");
client.logs = new Discord.WebhookClient({ id: "869244075486875740", token: process.env.webhook })
client.translate = async (word) => {
  let translated = await translate(`${word}`, { from: "ar", to: 'en' });
  console.log(translated)
  return translated.text
}
client.topgg = new top.Client(process.env.topgg);

process.on('unhandledRejection', up => { console.error(up) })

client.gif = async (url, filter = (image) => image) => {
  const type = url.includes(".gif") ? "gif" : "png"
  if (type === "png") {
    return { data: await filter(url), type };

  }
  const buffer = await download(url);
  const decoder = new Decoder(buffer);
  const rawFrames = decoder.decode();
  const frames = decoder.toPNG(rawFrames);
  var gFrames = []
  for (const frame of frames) {
    gFrames.push(await filter(frame))
  }
  //const gFrames = await Promise.all(frames.(frame=>filter(frame)))

  const size = await Canvas.loadImage(gFrames[0]);

  const GIF = new Encoder(size.width, size.height);
  GIF.start();
  GIF.setRepeat(0);
  GIF.setQuality(10);
  //GIF.setDelay(100);

  for (const gFrame of gFrames) {
    const base = await Canvas.loadImage(gFrame);
    const canvas = Canvas.createCanvas(base.width, base.height);
    const ctx = canvas.getContext(`2d`);
    ctx.drawImage(base, 0, 0, base.width, base.height);
    GIF.addFrame(ctx);

  }

  GIF.finish();

  return { data: GIF.out.getData(), type };
}

client.set = (id, data) => {
  if (!id || !client.guilds.cache.get(id)) {
    throw Error(`Provide a guild id`)
  }
  if (!data) {
    data = {}
  }
  client.guildsConfig.set(id, Object.assign(client.guildsConfig.get(id), data))
  return true
}
client.get = (id) => {
  if (!id || !client.guilds.cache.get(id)) {
    throw Error(`Provide a guild id`)
  }
  return client.guildsConfig.get(id)
}

let Events = new ascii("Events");
Events.setHeading("Event", "file", "Load");
let Commands = new ascii("Commands");
Commands.setHeading("Commands", "category", "Load");

let SlashCommands = new ascii("SlashCommands");
SlashCommands.setHeading("Commands", "category", "Load");

/*
topgg.post({ servers: client.guilds.cache.size })
topgg.on('posted', data => {
  console.log(`Posted on top.gg`);
});*/


const app = express();
app.listen(process.env.PORT || 3000, () => {
  console.log(`port : 3000`)
})

app.get("/", (req, res) => {
  res.json("hellow world")
})
app.get("/ping", (res, req) => {
  res.json({ "ping": client.ws.ping })
})
app.get("/commands", (req, res) => {
  res.json(client.commands)
})

i18n.configure({
  locales: ["ar", "en"],
  directory: path.join(__dirname, "Locales"),
  defaultLocale: "la",
  retryInDefaultLocale: true,
  objectNotation: true,

  register: global,
  logWarnFn: function (msg) {
    console.log("warn", msg);
  },
  /*logDebugFn: function (msg) {
    console.log('debug', msg)
  },*/
  logErrorFn: function (msg) {
    throw Error(msg)
  },

  missingKeyFn: function (locale, value) {
    return "No Value"
  },
  mustacheConfig: {
    tags: ["{", "}"],
    disable: false
  }
});


client.commands = new Discord.Collection();
client.guildsConfig = new Discord.Collection();

try {
  let events = fs.readdirSync("./events/");
  for (const event of events) {
    let eventname = event.split(".")[0]
    let files = fs.readdirSync(`./events/${event}`).filter(file => file.endsWith(".js"));
    for (const file of files) {
      let eventfile = require(`./events/${event}/${file}`);
      try {
        client.on(eventname, eventfile.bind(null, client))
        Events.addRow(eventname, file, '✅')
      } catch (err) {
        Events.addRow(eventname, file, '❌')
        throw Error(`err ${err}`)
        continue;
      }
    }
  }
} catch (err) {
  throw Error(`
  Message:${err.message}
----------------------------------------------------------
  Stack:${err.stack}  
  `);
}


try {
  let categories = fs.readdirSync("./commands/");
  for (const category of categories) {

    let files = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith(".js"))
    for (const file of files) {

      const command = require(`./commands/${category}/${file}`);
      if (command.help ?.name) {




        client.commands.set(command.help ?.name, command)
        Commands.addRow(file, command.help ?.category ? command.help ?.category : "None", '✅');
      } else {
        Commands.addRow(file, command.help ?.category ?? "none", `❌`);

        continue;
      }
    }
  }
} catch (err) {
  throw Error(`
  Message:${err.message}
----------------------------------------------------------
  Stack:${err.stack}  
  `);
}


console.log(chalk.white.bold(Events.toString()));
console.log(chalk.white.bold(Commands.toString()));
console.log(chalk.white.bold(SlashCommands.toString()));


client.on("error", err => {
  console.log(err)
})
client.on("warn", warn => {
  console.log(warn)
})

async function start() {
  await client.login(process.env.token)
  await mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

}

start()





