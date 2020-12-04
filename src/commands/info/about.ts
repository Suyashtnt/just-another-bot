import Command from '../../command';
import { Message, MessageEmbed } from 'discord.js';

export default class AboutCommand extends Command {
	constructor() {
		super('about', {
			aliases: ['about'],
			description: {
				text: 'about this bot',
				usage: `about`,
			},
			category: 'info',
		});
	}

	exec(msg: Message) {
		msg.channel.send(
			new MessageEmbed()
				.setTitle('about')
				.setDescription(
					'A bot for a bot jam hosted by [salvage](https://discord.gg/XSCH8vFFqs). Its mainly focused on emojis and fun stuff but has some other things aswell.',
				),
		)
	}
}
