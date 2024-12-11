const ResponseCode = require("../../apps/configs/ResponseCode.js");

const { graphqlHTTP } = require("express-graphql");
const Control = require("../middlewares/Control.js");

class ServiceInterfaces {
	constructor(modelService) {
		this._Service = modelService;
	}

	async SetupData() {
		setTimeout(async () => {
			await this._Service.SetTempSavesDatas();
		}, 1000)
	}

	SetupRouter() {
		const section_control = `control`;
		const update_data = `${section_control}/update`;
		const update_filter = `filter/${section_control}/update`;
		const delete_data = `${section_control}/delete`;
		const delete_filter = `filter/${section_control}/delete`;

		const { Router } = require("express");
		const router = new Router();

		// router.all(/control/g, async (req, res, next) => {
		// 	setTimeout(async () => {
		// 		await this._Service.SetTempSavesDatas();
		// 	}, 1000)
		// 	next();
		// });

		router.post(`/${section_control}/create`, async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.CreateData(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (typeof Callback == "string") {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.get("/all", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.GetDatas(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: `Berhasil mengambil data`, datas: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.get("/details/:id", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.GetDataByID(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback.length) {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: `Berhasil mengambil data`, datas: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.get("/filter", async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.GetDataByFilter(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (Callback) {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: `Berhasil mengambil data`, datas: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.put(`/${update_data}/:id`, async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.UpdateDataByID(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (typeof Callback == "string") {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.post(`/${update_data}/:id`, async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.UpdateDataByID(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (typeof Callback == "string") {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.put(`/${update_filter}`, async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.UpdateDataByFilter(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (typeof Callback == "string") {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.post(`/${update_filter}`, async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.UpdateDataByFilter(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (typeof Callback == "string") {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.delete(`/${delete_data}/:id`, async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.DeleteDataByID(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (typeof Callback == "string") {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.post(`/${delete_data}/:id`, async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.DeleteDataByID(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (typeof Callback == "string") {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.delete(`/${delete_filter}`, async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.DeleteDataByFilter(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (typeof Callback == "string") {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		router.post(`/${delete_filter}`, async (req, res) => {
			try {
				const [isValid, Callback] = await this._Service
					.DeleteDataByFilter(req, res)
					.then((result) => [true, result])
					.catch((err) => [false, err]);

				if (!isValid) {
					if (typeof Callback === "string" || !Callback.length) {
						throw new Error(Callback);
					}

					if (typeof Callback === "object" || Callback.length) {
						const [msg, format] = Callback;
						return res.status(ResponseCode.NOT_FOUND).json({ status: ResponseCode.NOT_FOUND, message: `Gagal memproses ${msg}`, format });
					}
				}

				if (typeof Callback == "string") {
					return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: Callback });
				}
				return res.status(ResponseCode.OKE).json({ status: ResponseCode.OKE, message: "Tidak ada data." });
			} catch (err) {
				return res.status(ResponseCode.SERVER_ERROR).json({ status: ResponseCode.SERVER_ERROR, message: `Gagal memproses ${err}` });
			}
		});

		return router;
	}
}

module.exports = ServiceInterfaces;
