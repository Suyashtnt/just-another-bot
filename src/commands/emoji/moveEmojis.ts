import Command from '../../command';
import {Guild, Message} from 'discord.js';
import fetch from 'node-fetch';

export default class MoveEmojiCommand extends Command {
	constructor() {
		super('moveEmojis', {
			aliases: ['mve', 'moveEmojis'],
			args: [
				{
					id: 'guildToMoveTo',
					type: 'guild',
				},
			],
			description: {
				text: '~~moves~~ _copies_ all emojis from this server to another',
				usage: `moveEmojis [guildId]`,
			},
			clientPermissions: ['MANAGE_EMOJIS'],
			category: 'emoji',
			cooldown: 1000 * 60 * 60 * 24,
		});
	}

	async exec(msg: Message, args: { guildToMoveTo: Guild }) {
		if (!args.guildToMoveTo)
			return msg.channel.send('that guild doesnt exist or im not in it!');
		const memberOnOtherServer = await args.guildToMoveTo.members.fetch(msg.author);
		if (!memberOnOtherServer) return await msg.channel.send('you are not in that guild');
		if (!memberOnOtherServer.permissions.has('MANAGE_EMOJIS'))
			return await msg.channel.send('you cant copy to that server!');
		console.log((await msg.channel.send('transferring. This may take up to an hour bc rate limiting.')).content);

		try {
			await Promise.all(
				(
					await Promise.all(
						msg.guild.emojis.cache.map(async (val) => {
							const b64 = await (await fetch(val.url)).buffer();

							return {
								emoji: b64,
								name: val.name,
							};
						}),
					)
				).map(async (emoji) => {
					await args.guildToMoveTo.emojis
						.create(emoji.emoji, emoji.name)
				}),
			);

			await msg.channel.send('done!');
		} catch (err) {
			await msg.channel.send('oh no! ' + err);
		}
	}
}
