import Command from '../../command';
import { Message, MessageEmbed } from 'discord.js';
import * as api from 'imageapi.js';

export default class MemeCommand extends Command {
	constructor() {
		super('meme', {
			aliases: ['meme'],
			cooldown: 1000 * 5,
			description: {
				text: 'random m e m e',
				usage: 'meme',
			},
			category: 'misc',
		});
	}

	async exec(msg: Message) {
		const post = await api.advanced('memes');
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setDescription(
				`upvotes: ${post.upvotes} | downvotes: ${post.downvotes} | up:down percentage: ${post.upvoteRatio}% | by [u/${post.author}](https://reddit.com/u/${post.author})`,
			)
			.setImage(post.img)
			.setFooter(
				'from r/memes using imageapi.js | percentage may seem wrong but its what the reddit API says',
			);

		msg.channel.send(embed);
	}
}
