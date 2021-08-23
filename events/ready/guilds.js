const Shema=require("../../models/guild.js")
module.exports=async (client)=>{
const guilds=[...client.guilds.cache.values()];
for (const guild of guilds){
  let data =await Shema.findOne({_id:guild.id})
  if(!data){
    data=await Shema.create({
      _id:guild.id
    });
   data.save()
  }
  data.__v=undefined
  client.guildsConfig.set(guild.id,data)






}
}