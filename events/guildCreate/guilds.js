const Shema = require("../../models/guild.js")
module.exports = async (client, guild) => {
  let data = await Shema.findOne({ _id: guild.id })
  if (data) {
    let newdata = await Shema.findOneAndUpdate({ _id: guild.id }, { _id: guild.id, channel: null }, { upsert: true })
    newdata.save()
    client.guildsConfig.set(guild.id, newdata)

  } else {
    let newdata =await Shema.create({ _id: guild.id })
    newdata.save()
    client.guildsConfig.set(guild.id, newdata)

  }
}