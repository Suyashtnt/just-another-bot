import {AkairoClient, CommandHandler, ListenerHandler, MongooseProvider} from 'discord-akairo';
import mongoose from 'mongoose';
import yn from 'yn';
import config from './config';

export class Client extends AkairoClient {
	commandHandler: CommandHandler;
	listenerHandler: ListenerHandler;

	constructor(
		prefix: string,
		public guildSettings: MongooseProvider,
		public userSettings: MongooseProvider,
	) {
		super({
			ownerID: '544194482527010836',
		}, {
			ws: {
				intents: ['DIRECT_MESSAGES', 'GUILDS', "GUILD_MESSAGES", "GUILD_MEMBERS"]
			}
		});

		this.commandHandler = new CommandHandler(this, {
			directory: './src/commands',
			prefix: (msg) => {
				if (msg.guild) {
					return this.guildSettings.get(msg.guild.id, 'prefix', prefix);
				}
				return prefix;
			},
			ignoreCooldown: (msg) => process.argv.slice(2)[0] === 'dev' || msg.author.id === this.ownerID,
			defaultCooldown: 1000,
		});

		this.commandHandler.resolver.addType('bool', (_, phrase) => {
			if (!phrase) return null;
			const bool = yn(phrase);
			return bool ? bool : null;
		});

		this.commandHandler.loadAll();
		this.listenerHandler = new ListenerHandler(this, {
			directory: './src/listeners',
		});
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
		});
		this.listenerHandler.loadAll();
	}

	async login(token?: string) {
		console.log('starting');
		await mongoose.connect(config.mongoUrl, {
			useUnifiedTopology: true,
		});
		await this.guildSettings.init();
		await this.userSettings.init();
		console.log('connected to db');
		return super.login(token);
	}
}
