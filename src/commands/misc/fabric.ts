import Command from '../../command';
import {Message} from 'discord.js';

export default class FabricCommand extends Command {
	constructor() {
		super('fabric', {
			aliases: ['fabric', 'fabric4life'],
			description: {
				text: 'fabric4life',
				usage: 'fabric',
			},
			category: 'misc',
		});
	}

	async exec(msg: Message) {
		await msg.channel.send('https://img.asie.pl/dTtp.mp4');
	}
}
