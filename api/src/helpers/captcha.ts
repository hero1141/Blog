
export default class Captcha {
	buffer: string;
	static createCaptcha() {
		return new Promise((resolve, reject) => {
			let defs = Object.assign(defaults)
			let canvas = new Canvas(defs.size.width, defs.size.height)
			let ctx = canvas.getContext('2d')		
			const text = prepareText(defs);
			drawCaptcha(ctx, defs, text);
			canvas.toBuffer(function (err, buf) {
				if (!err) resolve({
					buffer: buf,
					text,
				});
				return reject(err);
			})
		})
	}
}

const { Canvas } = require('canvas')
const Image = Canvas.Image
const strPool = 'qwertyuiopasdfghjklzxcvbnm';
const defaults = {
	charPool: (strPool + strPool.toUpperCase() + '1234567890').split(''),
	size: {
		width: 100,
		height: 32
	},
	textPos: {
		left: 10,
		top: 26
	},
	rotate: .01,
	charLength: 6,
	font: '22px Unifont',
	strokeStyle: '#ffffff',
	bgColor: '#000000',
	confusion: true,
	cRotate: -.05
}

function getRandomText(pool, len) {
	let lenp = pool.length;
	let res = '';
	for (let i = 0; i < len; i++) {
		res += pool[Math.floor(Math.random() * lenp)]
	}
	return res
}

function drawCaptcha(ctx, defs, text) {
	ctx.fillStyle = defs.bgColor
	ctx.fillRect(0, 0, defs.size.width, defs.size.height)
	ctx.beginPath()
	ctx.strokeStyle = defs.strokeStyle
	ctx.font = defs.font
	ctx.rotate(defs.rotate)
	ctx.strokeText(text, defs.textPos.left, defs.textPos.top)
}

function prepareText(defs) {
	let len = defs.charLength
	let pool = defs.charPool
	return getRandomText(pool, len);
	
}
