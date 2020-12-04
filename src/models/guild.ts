import { model as GuildModel, Schema } from 'mongoose';

export default GuildModel(
	'guild',
	new Schema(
		{
			id: {
				type: String,
				required: true,
			},
			settings: {
				type: Object,
				require: true,
			},
		},
		{ minimize: false },
	),
);
