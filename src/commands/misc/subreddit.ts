import Command from '../../command';
import { Message, MessageEmbed } from 'discord.js';
import * as api from 'imageapi.js';

export default class RedditCommand extends Command {
	constructor() {
		super('reddit', {
			aliases: ['subreddit', 'reddit', 'sub'],
			cooldown: 1000 * 5,
			description: {
				text: 'random post from a subreddit',
				usage: 'reddit [sub]',
			},
			args: [
				{
					id: 'subreddit',
				},
			],
			category: 'misc',
		});
	}

	async exec(msg: Message, args: any) {
		const post = await api.advanced(args.subreddit);
		const embed = new MessageEmbed()
			.setTitle(post.title)
			.setDescription(
				`upvotes: ${post.upvotes} | downvotes: ${post.downvotes} | up:down percentage: ${post.upvoteRatio}% | by [u/${post.author}](https://reddit.com/u/${post.author})`,
			)
			.setImage(post.img)
			.setFooter(
				`from r/${args.subreddit} using imageapi.js | percentage may seem wrong but its what the reddit API says`,
			);

		await msg.channel.send(embed);
	}
}
