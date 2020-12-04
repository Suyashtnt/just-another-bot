import { MongooseProvider } from 'discord-akairo';
import { Client } from './client';
import config from './config';
import guildModel from './models/guild';
import userModel from './models/user';

(async () => {
	const client = new Client(
		'r!',
		new MongooseProvider(guildModel),
		new MongooseProvider(userModel),
	);
	await client.login(config.token).then(() => console.log('loaded'));
})();
