import Command from '../../command';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
	constructor() {
		super('ping', {
			aliases: ['ping', 'p'],
			description: {
				text: 'gets the bots bing',
				usage: 'ping',
			},
			category: 'info',
		});
	}

	async exec(message: Message) {
		const sent = await message.reply('ping?');
		const timeDiff =
			(sent.editedAt || sent.createdAt).valueOf() -
			(message.editedAt || message.createdAt).valueOf();
		return message.reply([
			'Pong!',
			`🔂 **RTT**: ${timeDiff} ms`,
			`💟 **Heartbeat**: ${Math.round(this.client.ws.ping)} ms`,
		]);
	}
}
