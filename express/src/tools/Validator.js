const IsSet = (key) => {
	if (key === "" || key === " ") {
		return false;
	}

	if (typeof key === "undefined" || key === null || key === undefined) {
		return false;
	}

	if (typeof key === "bool" || typeof key === "boolean") {
		return key;
	}

	return true;
}

const IsSetObject = (key) => {
	return !IsSet(key) ? false : Object.keys(key).length;
};

const IsValidRequest = (format, syntax) => {
	return IsSetObject(syntax) ? Object.keys(syntax).filter((key) => format.includes(key)) : false;
}

class Validator {
	IsSet = IsSet;
	IsSetObject = IsSetObject;
	IsValidRequest = IsValidRequest;

	SetObject(parent, append) {
		return Object.assign(parent, append);
	}

	SetRequest(req) {
		const { body } = req;
		let validData = IsValidRequest(['data'], body).length ? JSON.parse(body.data) : {};
		validData = !IsValidRequest(['datas'], validData) ? body : JSON.parse(body.datas);
		
		return validData;
	}

	SetParams(req) {
		const { query, params } = req;

		let validReq = IsSetObject(query) ? query : false;
		validReq = !validReq && IsSetObject(params) ? params : validReq;

		return validReq;
	}

	IsValidString(check, value) {
		if (check === "name") {
			return /^[a-zA-Z\s]+$/.exec(value);
		}
		if (check === "username") {
			return /^[a-zA-Z0-9_]{1,21}$/.exec(value);
		}
		if (check === "email") {
			return /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.exec(value);
		}
	}
}

module.exports = Validator;
