import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';

export default class GuildListener extends Listener {
	public constructor() {
		super('guild', {
			emitter: 'client',
			event: 'guildCreate',
			category: 'command',
		});
	}

	public exec(guild: Guild) {
		console.log(`added to guild: ${guild.name}`);
	}
}
