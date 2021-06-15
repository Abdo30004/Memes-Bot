const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const { wrapText } = require('../functions/canvas');
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Almarai-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });

const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');

async function drake(nah, yeah) {
  if (!nah || !yeah) throw new Error(`Please provide a nah text and a yeah text.`)

  try {
    const base = await loadImage(`https://raw.githubusercontent.com/caseyCantCode/discordImageGenImages/main/drakeposting.png`);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = '50px Noto';
    let fontSize = 50;
    while (ctx.measureText(nah).width > 3003) {
      fontSize--;
      ctx.font = `${fontSize}px Noto`;
    }
    const nahLines = await wrapText(ctx, nah, 462);
    const nahTopMost = 256 - (((fontSize * nahLines.length) / 2) + ((10 * (nahLines.length - 1)) / 2));
    for (let i = 0; i < nahLines.length; i++) {
      const height = nahTopMost + ((fontSize + 10) * i);
      await fillTextWithTwemoji(ctx,nahLines[i], 768, height);
    }
    ctx.font = '50px Noto';
    fontSize = 50;
    while (ctx.measureText(yeah).width > 3003) {
      fontSize--;
      ctx.font = `${fontSize}px Noto`;
    }
    const yeahLines = await wrapText(ctx, yeah, 462);
    const yeahTopMost = 768 - (((fontSize * yeahLines.length) / 2) + ((10 * (yeahLines.length - 1)) / 2));
    for (let i = 0; i < yeahLines.length; i++) {
      const height = yeahTopMost + ((fontSize + 10) * i);
      await fillTextWithTwemoji(ctx,yeahLines[i], 768, height);
    }
    return canvas.toBuffer()
  } catch (e) {
    throw new Error(`Sorry there was an error: ${e}`)
  }
}
module.exports = spong