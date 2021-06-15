const fetch = require("node-fetch");
async function gett(url) {
  if (!url) throw new Error("No url provided");
  let fetched = await fetch(url).then(res => res.json());
  let memes = fetched.map(body => body.link);
  return await memes
}

function validate(permission){
var array=[
  "ADMINISTRATOR",
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS",
  "VIEW_GUILD_INSIGHTS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS"
]
}
var memes = gett("https://arb-memes.com/memes-bot/test.php")
var videos =  gett("https://arb-memes.com/memes-bot/json_video.php")




module.exports = {
  memes: memes,
  videos: videos,
}