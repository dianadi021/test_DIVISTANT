const moment = require("moment");
const Converter = require("./Converter.js");

class Generator extends Converter {
	GetIDNDate(isFormat = false, date) {
		if (!isFormat) {
			return !date ? moment.tz("Asia/Jakarta") : moment.tz(date, "Asia/Jakarta");
		}
		return !date ? moment.tz("Asia/Jakarta").format("MM/DD/YYYY HH:mm:ss") : moment.tz(date, "Asia/Jakarta").format("MM/DD/YYYY HH:mm:ss");
	}

	async GetUniqCode(model, length = 12) {
		const $Project = { $project: { uniqcode: 1 } };
		const datasCode = await model.aggregate([$Project]);
		const uniqDate = new Date().getTime().toString(24);
		const char = "1234567890qwertyuiopQWERTYUIOPasdfghjklASDFGHJKLzxcvbnmZXCVBNM";

		let isDone = false;
		let fixedUniqcode = "";

		while (!isDone) {
			for (let i = 0; i < length; i++) {
				const randomIndex = Math.floor(Math.random() * ((i * char.length) / new Date().getDay()));
				if (randomIndex < char.length) {
					fixedUniqcode += char[randomIndex];
				} else {
					i--;
				}
			}

			fixedUniqcode = (uniqDate + fixedUniqcode).toString(length);
			const isDupplicate = datasCode.filter((list) => list.uniqcode === fixedUniqcode);
			if (!isDupplicate.length) {
				isDone = true;
				break;
			} else {
				fixedUniqcode = "";
			}
		}

		return fixedUniqcode;
	}
}

module.exports = Generator;
