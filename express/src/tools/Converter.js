const Crypto = require("crypto");
const ConvertToHash = (method, value) => {
	const hash = Crypto.createHash(method);
	return hash.update(value).digest("base64");
};

class Converter {
	EncodePassword(value) {
		const md5 = ConvertToHash("md5", value);
		const sha1 = ConvertToHash("sha1", md5);
		const sha256 = ConvertToHash("sha256", sha1);
		return ConvertToHash("sha512", sha256);
	}

	GetIDR(value) {
		return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);
	}
}

module.exports = Converter;
