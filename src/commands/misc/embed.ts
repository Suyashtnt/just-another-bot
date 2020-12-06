import Command from '../../command';
import {Message, MessageEmbed} from 'discord.js';

export default class EmbedCommand extends Command {
	constructor() {
		super('embed', {
			aliases: ['embed'],
			args: [
				{
					id: 'title',
					default: 'title',
				},
				{
					id: 'desc',
					default: '',
				},
				{
					id: 'colour',
					type: 'color',
					default: '#FFFFFF',
				},
				{
					id: 'image',
					default: null,
				},
			],
			separator: '|',
			description: {
				text: 'creates an embed',
				usage: `embed [title] | [desc?] | [colour?] | [image?]`,
			},
			category: 'misc',
			cooldown: 1000 * 60,
		});
	}

	async exec(msg: Message, args: any) {
		const embed = new MessageEmbed()
			.setTitle(args.title)
			.setDescription(args.desc)
			.setColor(args.colour);
		if (args.image) embed.setImage(args.image);

		await msg.channel.send(embed);
	}
}
