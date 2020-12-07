import Command from '../../command';
import { Message } from 'discord.js';

export default class DehoistCommand extends Command {
	constructor() {
		super('dehoist', {
			aliases: ['dehoist'],
			clientPermissions: ['MANAGE_NICKNAMES'],
			userPermissions: ['ADMINISTRATOR'],
			description: {
				text: 'removes `!` from the start of all users',
				usage: 'dehoist',
			},
			category: 'admin',
			cooldown: 1000 * 60 * 60 * 24,
			channel: 'guild',
		});
	}

	async exec(msg: Message) {
		const members = await msg.guild.members.fetch();

		for (let i = 0; i < 4; i++) {
			await Promise.all(
				members.map(async (member) => {
					if (member.displayName.startsWith('!')) {
						try {
							await member.setNickname(
								member.displayName.startsWith('!')
									? member.displayName.split('!')[1]
									: member.displayName.split('! ')[1],
							);
						} catch (_) {
							// i mean do you need to know the error?
						}
					}
				}),
			);
		}
		await msg.channel.send('dehoisted!');
	}
}
