const isUsingRedis = process.env.IS_USING_REDIS;

let Redis = undefined;
if (isUsingRedis === "true") {
	const setRedis = require("../configs/Redis.js");
	Redis = new setRedis();
}

const { GraphQLSchema, GraphQLObjectType, GraphQLList } = require("graphql");

class SetupGraphQL {
	constructor(Repository, NameQueryType, ModelType) {
		this.NameQueryType = NameQueryType;
		this.Repository = Repository;
		this.ModelType = ModelType;
	}

	GetQuery() {
		return new GraphQLObjectType({
			name: this.NameQueryType,
			fields: {
				Roles: {
					type: new GraphQLList(this.ModelType),
					resolve: async () => {
						return new Promise(async (resolve, reject) => {
							if (!isUsingRedis) {
								const dataRoles = await this.Repository.Find();
								if (dataRoles.length) {
									resolve(dataRoles);
								}
								reject(`Tidak ada data tersimpan.`);
							}

							const cachedData = await Redis.GetCache(this.Repository.GetName());

							if (cachedData) {
								resolve(cachedData);
							}

							const dataRoles = await this.Repository.Find();
							await Redis.SetCache(this.Repository.GetName(), dataRoles);

							if (dataRoles.length) {
								resolve(dataRoles);
							}
							reject(`Tidak ada data tersimpan.`);
						});
					},
				},
			},
		});
	}

	GetGraphQLSchema(GetQuery) {
		return new GraphQLSchema({
			query: GetQuery,
		});
	}
}

module.exports = SetupGraphQL;
