import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Perms extends Listener {
	constructor() {
		super('perms', {
			emitter: 'commandHandler',
			event: 'missingPermissions',
			category: 'command',
		});
	}

	async exec(
		message: Message,
		command: Command,
		type: 'client' | 'user',
		missing: string[],
	) {
		const casedPerms = missing
			.map((item: string) => {
				return item[0].toUpperCase() + item.slice(1).toLowerCase();
			})
			.join(', ')
			.replace('_', ' ');

		await message.channel.send(
			`${
				type === 'client' ? "I'm" : "You're"
			} missing the following perms needed to run \`${
				command.aliases[0]
			}\`: ${casedPerms}`,
		);
	}
}
