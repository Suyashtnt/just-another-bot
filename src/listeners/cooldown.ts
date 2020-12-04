import { Command, Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { formatMS } from '../utils';

export default class Cooldown extends Listener {
	public constructor() {
		super('cooldown', {
			emitter: 'commandHandler',
			event: 'cooldown',
			category: 'command',
		});
	}

	public exec(message: Message, command: Command, cooldown: number) {
		console.log('here');

		return message.channel.send(
			`${message.author}, can you not wait \`${formatMS(
				cooldown,
			)}\` before using \`${command}\` again?`,
		);
	}
}
