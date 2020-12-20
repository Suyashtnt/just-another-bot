import { log } from 'console';
import Command from '../../command';
import { BaseGuildEmoji, Guild, Message } from 'discord.js';
import fetch from 'node-fetch';

export default class MoveEmojiCommand extends Command {
	constructor() {
		super('moveEmoji', {
			aliases: ['mve1', 'moveEmoji'],
			args: [
				{
					id: 'val',
					type: 'emoji',
				},
				{
					id: 'guild',
					type: 'guild',
				},
			],
			description: {
				text: 'copies an emoji to another server',
				usage: 'moveEmoji `[emoji]` `[guildId]`',
			},
			category: 'emoji',
			cooldown: 5000,
		});
	}

	async exec(msg: Message, { val, guild }: { val: BaseGuildEmoji; guild: Guild }) {
		if (!val) return msg.channel.send('pls actually put in an emoji');
		if (!guild) return msg.channel.send('that guild doesnt exist or im not in it!');
		const member = await guild.members.fetch(msg.author);
		log(member);
		if (!member) return msg.channel.send('you are not in that guild');
		if (!member.permissions.has('MANAGE_EMOJIS'))
			return msg.channel.send('you cant copy to that server!');

		console.log((await msg.channel.send('transferring')).content);

		const b64 = await (await fetch(val.url)).buffer();
		console.log('here');

		await guild.emojis.create(b64, val.name);
		await msg.channel.send('done!');
	}
}
