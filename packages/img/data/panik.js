const { wrapText } = require('../functions/canvas')
const path = require('path');
const { createCanvas, loadImage } = require('canvas');
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Almarai-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji');
async function panik(panik, kalm, panik2) {
    if (!panik || !kalm || !panik2) throw new Error(`Please provide a panik kalm and a panik 2.`)

    try {
        const base = await loadImage(`https://raw.githubusercontent.com/caseyCantCode/discordImageGenImages/main/panik-kalm-panik.png`);
        const canvas = createCanvas(base.width, base.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(base, 0, 0);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.font = `40px Noto`
        let fontSize = 40;
        while (ctx.measureText(panik).width > 1136) {
            fontSize--;
            ctx.font = `${fontSize}px Noto`
        }
        const panikLines = await wrapText(ctx, panik, 284);
        const panikTopMost = 130 - (((fontSize * panikLines.length) / 2) + ((10 * (panikLines.length - 1)) / 2));
        for (let i = 0; i < panikLines.length; i++) {
            const height = panikTopMost + ((fontSize + 10) * i);
            await fillTextWithTwemoji(ctx,panikLines[i], 150, height);
        }
        ctx.font = `40px Noto`
        fontSize = 40;
        while (ctx.measureText(kalm).width > 1136) {
            fontSize--;
            ctx.font = `${fontSize}px Noto`
        }
        const kalmLines = await wrapText(ctx, kalm, 284);
        const kalmTopMost = 430 - (((fontSize * kalmLines.length) / 2) + ((10 * (kalmLines.length - 1)) / 2));
        for (let i = 0; i < kalmLines.length; i++) {
            const height = kalmTopMost + ((fontSize + 10) * i);
            await fillTextWithTwemoji(ctx,kalmLines[i], 150, height);
        }
        ctx.font = `40px Noto`
        fontSize = 40;
        while (ctx.measureText(panik2).width > 1136) {
            fontSize--;
            ctx.font = `${fontSize}px Noto`
        }
        const panik2Lines = await wrapText(ctx, panik2, 284);
        const panik2TopMost = 730 - (((fontSize * panik2Lines.length) / 2) + ((10 * (panik2Lines.length - 1)) / 2));
        for (let i = 0; i < panik2Lines.length; i++) {
            const height = panik2TopMost + ((fontSize + 10) * i);
            await fillTextWithTwemoji(ctx,panik2Lines[i], 150, height);
        }
        return canvas.toBuffer()
    } catch (err) {
        throw new Error(`Sorry there was an error: ${err}`)
    }
}
module.exports = panik
