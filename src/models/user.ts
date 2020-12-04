import { model as UserModel, Schema } from 'mongoose';

export default UserModel(
	'user',
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
