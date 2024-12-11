const Validator = require("../../tools/Validator");
const { SetRequest, SetParams } = new Validator();

class RepositoryService {
	constructor(model, name) {
		this.model = model;
		this.name = name;
		this.redisTempDatas = [];
	}

	GetName() {
		return this.name;
	}

	GetTempDatas() {
		return this.redisTempDatas;
	}

	async SetTempSavesDatas() {
		setTimeout(async () => {
			this.redisTempDatas = await this.model.find().exec();
		}, 1000);
		console.log(`Save to temporary ${this.name}`);
	}

	async Create(data) {
		return await this.model.create(data);
	}

	async FindUsingAggregate($Pipeline) {
		return await this.model.aggregate([$Pipeline]);
	}

	async Find() {
		this.redisTempDatas = this.redisTempDatas.length ? this.redisTempDatas : await this.model.find().exec();
		return this.redisTempDatas;
	}

	async FindById(id) {
		return this.redisTempDatas.length ? this.redisTempDatas.filter((list) => list._id == id) : await this.model.findById(id).exec();
	}

	async FindByFilter(filter) {
		const { page, document } = filter;

		if (page && document) {
			return await this.model.aggregate([{ $match: filter }, { $skip: (parseInt(page) - 1) * parseInt(document) }, { $limit: parseInt(document) }]);
		}

		return await this.model.findOne(filter).exec();
	}

	async FindByIdAndUpdate(id, data) {
		return await this.model.findByIdAndUpdate(id, data).exec();
	}

	async FindOneAndUpdate(req, data) {
		const filter = SetParams(req) ? SetParams(req) : SetRequest(req);
		return await this.model.findOneAndUpdate(filter, data).exec();
	}

	async FindByIdAndRemove(id) {
		return await this.model.findByIdAndRemove(id).exec();
	}

	async FindOneAndRemove(req) {
		const filter = SetParams(req) ? SetParams(req) : SetRequest(req);
		return await this.model.findOneAndRemove(filter).exec();
	}
}

module.exports = RepositoryService;
