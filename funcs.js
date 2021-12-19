const axios = require("axios")

const getVideo = async (lang = "ar") => {

  var video;
  switch (lang) {
    case "ar": {
      const { data } = await axios.get("https://arb-memes.com/memes-bot/json_video.php");
      let videos = data.map(body => body.link)
      video = videos[Math.floor(Math.random() * videos.length)]
      break;
    }
    case "en":
      const { data } = await axios.get('https://www.reddit.com/r/dankvideos/random/.json')

      video = data[0].data.children[0].data.secure_media.reddit_video.fallback_url;
      break;
  }
  return video
}

const getMeme = async (lang = "ar") => {
  var meme;
  switch (lang) {
    case "ar": {
      const { data } = await axios.get("https://arb-memes.com/memes-bot/test.php");
      let memes = data.map(body => body.link)
      meme = memes[Math.floor(Math.random() * memes.length)];
      break;
    }
    case "en": {
      const { data } = await axios.get('https://www.reddit.com/r/memes/random/.json')

      meme = data[0].data.children[0].data.url;
      break;
    }
  }


  return meme
}


module.exports = {
  getVideo,
  getMeme
}
