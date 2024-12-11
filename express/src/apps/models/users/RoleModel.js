const { GraphQLObjectType, GraphQLString, GraphQLInt } = require("graphql");
const { mongoose } = require("../../database/Connect.js");
const { Schema, model: Model } = mongoose;

const $getDataSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		level: { type: Number, required: true, unique: true },
		description: { type: String },
	},
	{ timestamps: true },
	{
		writeConcern: {
			w: "majority",
			j: true,
			wtimeout: 1000,
		},
	}
);

class RoleModel {
	constructor(name, level, description) {
		this.name = name;
		this.level = level;
		this.description = description;
	}

	GetMongoose = mongoose;

	GetDataFormat = {
		name: { type: "String", required: true, unique: true },
		level: { type: "Number", required: true, unique: true },
		description: { type: "String" },
	};

	GetGraphQLModel() {
		return new GraphQLObjectType({
			name: "Role",
			fields: {
				id: { type: GraphQLString },
				name: { type: GraphQLString },
				level: { type: GraphQLInt },
				description: { type: GraphQLString },
			},
		});
	}

	GetDataModel = new Model("Role", $getDataSchema);
}

module.exports = RoleModel;
